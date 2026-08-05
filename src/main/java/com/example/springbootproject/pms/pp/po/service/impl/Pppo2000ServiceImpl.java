package com.example.springbootproject.pms.pp.po.service.impl;

import com.example.springbootproject.pms.pp.po.dto.Pppo2000DetailDto;
import com.example.springbootproject.pms.pp.po.dto.Pppo2000Dto;
import com.example.springbootproject.pms.pp.po.dto.Pppo2000PreviewDto;
import com.example.springbootproject.pms.pp.po.event.ApprovalEvent;
import com.example.springbootproject.pms.pp.po.event.ApprovalHistoryEvent;
import com.example.springbootproject.pms.pp.po.pdf.PdfGenerator;
import com.example.springbootproject.pms.pp.po.producer.ApprovalHistoryProducer;
import com.example.springbootproject.pms.pp.po.producer.ApprovalProducer;
import com.example.springbootproject.pms.pp.po.service.Pppo2000Service;
import com.example.springbootproject.pms.pp.po.service.dao.mssql.Pppo2000Mapper;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@Service
@RequiredArgsConstructor
public class Pppo2000ServiceImpl implements Pppo2000Service {

    private final PdfGenerator PdfGenerators;
    private final Pppo2000Mapper pppo2000Mapper;
    private final ApprovalProducer approvalProducer;
    private final ApprovalHistoryProducer approvalHistoryProducer;

    @Override
    public List<Pppo2000Dto> getRequestList() {
        return pppo2000Mapper.selectRequestList();
    }

    @Override
    public Pppo2000DetailDto getRequestDetail(String ordno) {
        return pppo2000Mapper.selectRequestDetail(ordno);
    }

    @Override
    public List<Pppo2000DetailDto> selectRequestDetailList(String ordno) {
        return pppo2000Mapper.selectRequestDetailList(ordno);
    }


    @Override
    public Pppo2000PreviewDto getRequestDetailList(String ordno) {

        List<Pppo2000DetailDto> list =
                pppo2000Mapper.selectRequestDetailList(ordno);

        if(list.isEmpty()){
            return null;
        }

        Pppo2000DetailDto first =
                list.get(0);

        Pppo2000PreviewDto result =
                new Pppo2000PreviewDto();


        result.setOrdno(
                first.getOrdno()
        );

        result.setCanvasData(
                first.getCanvasData()
        );

        result.setPaperwidth(
                first.getPaperwidth()
        );

        result.setPaperheight(
                first.getPaperheight()
        );

        List<Map<String,Object>> dataList =
                new ArrayList<>();

        ObjectMapper mapper =
                new ObjectMapper();

        for(Pppo2000DetailDto dto : list){


            try {


                Map<String,Object> data =
                        mapper.readValue(
                                dto.getData(),
                                Map.class
                        );


                dataList.add(data);



            } catch(Exception e){


                throw new RuntimeException(
                        "데이터 변환 실패",
                        e
                );


            }

        }



        result.setData(dataList);



        return result;

    }

    @Override
    public List<Pppo2000Dto> searchRequests(String jijumcd, String status) {
        return pppo2000Mapper.searchRequests(jijumcd, status);
    }

    @Override
    public byte[] generatePdf(String ordno) {


        List<Pppo2000DetailDto> detailList =
                pppo2000Mapper.selectRequestDetailList(ordno);



        return PdfGenerators.generate(
                detailList
        );


    }

    @Override
    public byte[] generateZip(List<String> ordnos) {
        try (ByteArrayOutputStream baos = new ByteArrayOutputStream();
             ZipOutputStream zos = new ZipOutputStream(baos)) {

            for (String ordno : ordnos) {
                byte[] pdfBytes = generatePdf(ordno);
                ZipEntry entry = new ZipEntry(ordno + ".pdf");
                zos.putNextEntry(entry);
                zos.write(pdfBytes);
                zos.closeEntry();
            }

            zos.finish();
            return baos.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("ZIP 생성 실패", e);
        }
    }

    @Override
    public void updateOrdstate(List<String> ordnos, Integer ordstate) {
        if (ordnos == null || ordnos.isEmpty()) return;
        pppo2000Mapper.updateOrdstate(ordnos, ordstate);

        // Kafka 이벤트 발행
        ApprovalEvent event =
                new ApprovalEvent(
                        ordnos,
                        ordstate
                );


        approvalProducer.send(event);

        // Kafka 이벤트 발행
        for(String ordno : ordnos){

            ApprovalHistoryEvent events =
                    new ApprovalHistoryEvent(
                            ordno,
                            10,       // 기존 상태
                            ordstate,
                            "admin"
                    );


            approvalHistoryProducer.send(events);
        }
    }
}