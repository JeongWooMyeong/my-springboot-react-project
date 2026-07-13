package com.example.springbootproject.pms.pp.po.service.impl;

import com.example.springbootproject.pms.pp.po.dto.Pppo2000DetailDto;
import com.example.springbootproject.pms.pp.po.dto.Pppo2000Dto;
import com.example.springbootproject.pms.pp.po.service.Pppo2000Service;
import com.example.springbootproject.pms.pp.po.service.dao.Pppo2000Mapper;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.itextpdf.io.image.ImageData;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfPage;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.kernel.pdf.canvas.PdfCanvas;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Image;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.util.List;
import java.util.Map;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@Service
@RequiredArgsConstructor
public class Pppo2000ServiceImpl implements Pppo2000Service {

    private final Pppo2000Mapper pppo2000Mapper;

    @Override
    public List<Pppo2000Dto> getRequestList() {
        return pppo2000Mapper.selectRequestList();
    }

    @Override
    public Pppo2000DetailDto getRequestDetail(String ordno) {
        return pppo2000Mapper.selectRequestDetail(ordno);
    }

    @Override
    public List<Pppo2000Dto> searchRequests(String jijumcd, String status) {
        return pppo2000Mapper.searchRequests(jijumcd, status);
    }

    @Override
    public byte[] generatePdf(String ordno) {

        Pppo2000DetailDto detail = pppo2000Mapper.selectRequestDetail(ordno);

        try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {

            PdfDocument pdfDoc = new PdfDocument(new PdfWriter(baos));
            Document document = new Document(pdfDoc);

            ObjectMapper mapper = new ObjectMapper();

            Map<String, Object> data =
                    mapper.readValue(detail.getData(), Map.class);

            List<Map<String, Object>> fields =
                    mapper.readValue(detail.getCanvasData(), List.class);


            PdfPage page = pdfDoc.addNewPage();


            float pageWidth = page.getPageSize().getWidth();
            float pageHeight = page.getPageSize().getHeight();


            // ==========================
            // Konva Stage 기준
            // ==========================
            float canvasWidth = 800f;
            float canvasHeight = 600f;


            // Stage -> PDF Scale
            float scaleX = pageWidth / canvasWidth;
            float scaleY = pageHeight / canvasHeight;



            for (Map<String, Object> field : fields) {


                String type = (String) field.get("type");
                String fieldName = (String) field.get("fieldName");


                // ======================
                // TEXT
                // ======================
                if ("text".equals(type)) {


                    String value = (String) data.get(fieldName);

                    if (value == null) {
                        value = "";
                    }


                    float x =
                            ((Number) field.get("x")).floatValue()
                                    * scaleX;


                    float y =
                            ((Number) field.get("y")).floatValue()
                                    * scaleY;


                    float fontSize =
                            ((Number) field.get("fontSize")).floatValue()
                                    * scaleY;


                    float yPdf =
                            pageHeight - y - fontSize;



                    PdfCanvas canvas = new PdfCanvas(page);


                    canvas.beginText()
                            .setFontAndSize(
                                    PdfFontFactory.createFont(),
                                    fontSize
                            )
                            .moveText(x, yPdf)
                            .showText(value)
                            .endText();


                }



                // ======================
                // IMAGE
                // ======================
                else if ("image".equals(type)) {


                    String imageUrl =
                            (String) data.get(fieldName);


                    if (imageUrl == null) {
                        continue;
                    }


                    float x =
                            ((Number) field.get("x")).floatValue()
                                    * scaleX;


                    float y =
                            ((Number) field.get("y")).floatValue()
                                    * scaleY;


                    float boxWidth =
                            ((Number) field.get("width")).floatValue()
                                    * scaleX;


                    float boxHeight =
                            ((Number) field.get("height")).floatValue()
                                    * scaleY;



                    // Canvas 좌표 -> PDF 좌표
                    float yPdf =
                            pageHeight - y - boxHeight;



                    ImageData imageData =
                            ImageDataFactory.create(imageUrl);



                    Image image =
                            new Image(imageData);



                    /*
                     * ⭐ 원본 비율 유지
                     * object-fit: contain 과 동일
                     */
                    image.scaleToFit(
                            boxWidth,
                            boxHeight
                    );



                    float imageWidth =
                            image.getImageScaledWidth();


                    float imageHeight =
                            image.getImageScaledHeight();



                    // 영역 중앙 배치
                    float offsetX =
                            (boxWidth - imageWidth) / 2;


                    float offsetY =
                            (boxHeight - imageHeight) / 2;



                    image.setFixedPosition(
                            x + offsetX,
                            yPdf + offsetY
                    );



                    document.add(image);

                }

            }


            document.close();

            return baos.toByteArray();


        } catch (Exception e) {

            throw new RuntimeException(
                    "PDF 생성 실패",
                    e
            );
        }
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
    }
}