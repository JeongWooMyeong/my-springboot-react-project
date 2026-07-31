package com.example.springbootproject.pms.pp.po.service.impl;

import com.example.springbootproject.pms.pp.po.dto.Pppo2000DetailDto;
import com.example.springbootproject.pms.pp.po.dto.Pppo2000Dto;
import com.example.springbootproject.pms.pp.po.event.ApprovalEvent;
import com.example.springbootproject.pms.pp.po.event.ApprovalHistoryEvent;
import com.example.springbootproject.pms.pp.po.producer.ApprovalHistoryProducer;
import com.example.springbootproject.pms.pp.po.producer.ApprovalProducer;
import com.example.springbootproject.pms.pp.po.service.Pppo2000Service;
import com.example.springbootproject.pms.pp.po.service.dao.Pppo2000Mapper;
import com.example.springbootproject.pms.sy.tm.dto.Sytm3000Dto;
import com.example.springbootproject.pms.sy.tm.service.dao.Sytm3000Mapper;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.itextpdf.io.font.PdfEncodings;
import com.itextpdf.io.image.ImageData;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.geom.Rectangle;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfPage;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.kernel.pdf.canvas.PdfCanvas;
import com.itextpdf.layout.Canvas;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Image;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Text;
import com.itextpdf.layout.layout.LayoutArea;
import com.itextpdf.layout.layout.LayoutContext;
import com.itextpdf.layout.layout.LayoutResult;
import com.itextpdf.layout.properties.OverflowPropertyValue;
import com.itextpdf.layout.properties.Property;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.net.URL;
import java.util.List;
import java.util.Map;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@Service
@RequiredArgsConstructor
public class Pppo2000ServiceImpl implements Pppo2000Service {

    private final Pppo2000Mapper pppo2000Mapper;
    private final Sytm3000Mapper sytm3000Mapper;
    private final ApprovalProducer approvalProducer;
    private final ApprovalHistoryProducer approvalHistoryProducer;
    private static final String FONT_BASE_PATH =
            "C:/Project/SpringBootProject";

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
        //테스트 heartbeat


        /*try {

            Thread.sleep(600000); // 테스트용 10분 지연

        } catch (InterruptedException e) {

            Thread.currentThread().interrupt();

        }*/

        Pppo2000DetailDto detail =
                pppo2000Mapper.selectRequestDetail(ordno);


        try(ByteArrayOutputStream baos = new ByteArrayOutputStream()) {


            ObjectMapper mapper = new ObjectMapper();


            Map<String,Object> data =
                    mapper.readValue(
                            detail.getData(),
                            Map.class
                    );


            List<Map<String,Object>> fields =
                    mapper.readValue(
                            detail.getCanvasData(),
                            List.class
                    );



            /*
             * ============================
             * 용지 크기
             * DB mm -> PDF pt
             * ============================
             */
            float mmToPt =
                    72f / 25.4f;



            float pdfWidth =
                    detail.getPaperwidth()
                            * mmToPt;


            float pdfHeight =
                    detail.getPaperheight()
                            * mmToPt;




            PdfDocument pdfDoc =
                    new PdfDocument(
                            new PdfWriter(baos)
                    );



            PageSize pageSize =
                    new PageSize(
                            pdfWidth,
                            pdfHeight
                    );



            Document document =
                    new Document(
                            pdfDoc,
                            pageSize
                    );



            PdfPage page =
                    pdfDoc.addNewPage(
                            pageSize
                    );




            /*
             * TemplateEditor
             * px -> PDF pt 변환
             */
            float pxToPt =
                    72f / 96f;



            for(Map<String,Object> field : fields){



                String type =
                        String.valueOf(
                                field.get("type")
                        );



                String fieldName =
                        String.valueOf(
                                field.get("fieldName")
                        );



                float x =
                        ((Number)field.get("x"))
                                .floatValue()
                                * pxToPt;



                float y =
                        ((Number)field.get("y"))
                                .floatValue()
                                * pxToPt;



                float width =
                        ((Number)field.get("width"))
                                .floatValue()
                                * pxToPt;



                float height =
                        ((Number)field.get("height"))
                                .floatValue()
                                * pxToPt;




                /*
                 * ========================
                 * TEXT
                 * ========================
                 */
                if("text".equals(type)){



                    Object obj =
                            data.get(fieldName);



                    String value =
                            obj == null
                                    ? ""
                                    : obj.toString();



                    if(value.isEmpty()){

                        Object text =
                                field.get("text");

                        if(text != null){

                            value =
                                    text.toString();

                        }

                    }





                    /*
                     * =========================================
                     * 2026-07-23
                     *
                     * 저장된 fontFamily 기준
                     * TB_FONT 조회 후 TTF 적용
                     * =========================================
                     */


                    PdfFont pdfFont;



                    String fontFamily =
                            String.valueOf(
                                    field.get("fontFamily")
                            );



                    if(
                            fontFamily != null &&
                                    !"null".equals(fontFamily)
                    ){


                        Sytm3000Dto font =
                                sytm3000Mapper
                                        .selectFontByFamily(
                                                fontFamily
                                        );



                        if(font != null){



                            String fontPath =
                                    font.getFontfilepath();



                            /*
                             * 예:
                             * /upload/fonts/NanumPen.ttf
                             *
                             * 실제 서버 경로에 맞게 변경
                             */
                            if(fontPath.startsWith("/")){

                                fontPath = FONT_BASE_PATH + fontPath;

                            }



                            pdfFont =
                                    PdfFontFactory.createFont(
                                            fontPath,
                                            PdfEncodings.IDENTITY_H,
                                            PdfFontFactory.EmbeddingStrategy.PREFER_EMBEDDED
                                    );


                        }
                        else {


                            pdfFont =
                                    PdfFontFactory.createFont(
                                            "fonts/NanumGothic.ttf",
                                            PdfEncodings.IDENTITY_H,
                                            PdfFontFactory.EmbeddingStrategy.PREFER_EMBEDDED
                                    );

                        }


                    }
                    else {


                        pdfFont =
                                PdfFontFactory.createFont(
                                        "fonts/NanumGothic.ttf",
                                        PdfEncodings.IDENTITY_H,
                                        PdfFontFactory.EmbeddingStrategy.PREFER_EMBEDDED
                                );

                    }





                    /*
                     * 저장된 fontSize 적용
                     */
                    float fontSize = 20;



                    Object fs =
                            field.get("fontSize");



                    if(fs != null){

                        fontSize =
                                ((Number)fs).floatValue();

                    }



                    fontSize *= pxToPt;





                    /*
                     * 줄바꿈
                     */
                    String wrappedText =
                            wrapText(
                                    value,
                                    pdfFont,
                                    fontSize,
                                    width
                            );




                    /*
                     * 영역 초과시 축소
                     */
                    fontSize =
                            getFitFontSize(
                                    wrappedText,
                                    pdfFont,
                                    width,
                                    height,
                                    fontSize
                            );





                    wrappedText =
                            wrapText(
                                    value,
                                    pdfFont,
                                    fontSize,
                                    width
                            );




                    float pdfY =
                            pdfHeight
                                    - y
                                    - height;




                    Paragraph paragraph =
                            new Paragraph();



                    for(String line :
                            wrappedText.split("\n")){


                        paragraph.add(
                                new Text(line)
                                        .setFont(pdfFont)
                                        .setFontSize(fontSize)
                        );


                        paragraph.add("\n");

                    }





                    paragraph
                            .setMargin(0)
                            .setPadding(0)
                            .setFixedLeading(
                                    fontSize * 1.2f
                            );





                    Canvas canvas =
                            new Canvas(
                                    new PdfCanvas(page),
                                    new Rectangle(
                                            x,
                                            pdfY,
                                            width,
                                            height
                                    )
                            );



                    canvas.add(paragraph);

                    canvas.close();


                }





                /*
                 * ========================
                 * IMAGE
                 * ========================
                 */
                else if("image".equals(type)){



                    Object img =
                            data.get(fieldName);



                    if(img == null)
                        continue;



                    String imageUrl =
                            img.toString();




                    if(imageUrl.startsWith("/")){

                        imageUrl =
                                "http://localhost:8081"
                                        + imageUrl;

                    }





                    float pdfY =
                            pdfHeight
                                    -
                                    y
                                    -
                                    height;





                    Image image =
                            new Image(
                                    ImageDataFactory.create(
                                            new URL(imageUrl)
                                    )
                            );




                    image.scaleToFit(
                            width,
                            height
                    );




                    float imgWidth =
                            image.getImageScaledWidth();



                    float imgHeight =
                            image.getImageScaledHeight();




                    image.setFixedPosition(
                            x + (width-imgWidth)/2,
                            pdfY + (height-imgHeight)/2
                    );



                    document.add(image);


                }


            }



            document.close();



            return baos.toByteArray();


        }
        catch(Exception e){


            throw new RuntimeException(
                    "PDF 생성 실패",
                    e
            );

        }

    }



    /*
     * ====================================
     * 텍스트 영역 맞춤 폰트 계산
     * Preview와 동일
     * ====================================
     */
    /*
     * ====================================
     * PDF 텍스트 영역 맞춤 폰트 계산
     * iText 실제 폭 기준
     * ====================================
     */
    private float getFitFontSize(
            String text,
            PdfFont font,
            float width,
            float height,
            float fontSize
    ){

        float size = fontSize;


        while(size > 5){


            float totalHeight = 0;


            String[] lines =
                    text.split("\n");


            for(String line : lines){

                totalHeight += size * 1.2f;

            }



            if(totalHeight <= height){

                break;

            }


            size -= 1;

        }


        return size;
    }

    private String wrapText(
            String text,
            PdfFont font,
            float fontSize,
            float width
    ){

        StringBuilder result =
                new StringBuilder();

        float currentWidth = 0;


        // Konva 기준 한글 폭 보정
        float charWidth = fontSize;



        for(char ch : text.toCharArray()){


            if(currentWidth + charWidth > width){

                result.append("\n");

                currentWidth = 0;
            }


            result.append(ch);

            currentWidth += charWidth;

        }


        return result.toString();
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