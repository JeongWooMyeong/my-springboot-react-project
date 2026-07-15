package com.example.springbootproject.pms.pp.po.service.impl;

import com.example.springbootproject.pms.pp.po.dto.Pppo2000DetailDto;
import com.example.springbootproject.pms.pp.po.dto.Pppo2000Dto;
import com.example.springbootproject.pms.pp.po.service.Pppo2000Service;
import com.example.springbootproject.pms.pp.po.service.dao.Pppo2000Mapper;
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


        Pppo2000DetailDto detail =
                pppo2000Mapper.selectRequestDetail(ordno);


        try(ByteArrayOutputStream baos = new ByteArrayOutputStream()) {


            /*
             * ============================
             * 한글 폰트
             * ============================
             */
            PdfFont koreanFont =
                    PdfFontFactory.createFont(
                            "fonts/NanumGothic.ttf",
                            PdfEncodings.IDENTITY_H,
                            PdfFontFactory.EmbeddingStrategy.PREFER_EMBEDDED
                    );



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
             * 용지 크기 생성
             * mm -> pt
             * ============================
             */
            float mmToPt = 72f / 25.4f;


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
             * ============================
             * Konva 기준
             * ============================
             */
            float stageWidth = 800f;
            float stageHeight = 600f;



            /*
             * Canvas -> PDF Scale
             */
            float scaleX =
                    pdfWidth / stageWidth;


            float scaleY =
                    pdfHeight / stageHeight;




            for(Map<String,Object> field : fields){



                String type =
                        (String)field.get("type");



                String fieldName =
                        (String)field.get("fieldName");





                /*
                 * ==========================
                 * TEXT
                 * ==========================
                 */
                if("text".equals(type)){



                    String value =
                            (String)data.get(fieldName);



                    if(value == null || value.isEmpty()){

                        value =
                                (String)field.get("text");

                    }



                    if(value == null){
                        value="";
                    }





                    float x =
                            ((Number)field.get("x"))
                                    .floatValue()
                                    * scaleX;



                    float y =
                            ((Number)field.get("y"))
                                    .floatValue()
                                    * scaleY;



                    float width =
                            ((Number)field.get("width"))
                                    .floatValue()
                                    * scaleX;



                    float height =
                            ((Number)field.get("height"))
                                    .floatValue()
                                    * scaleY;




                    float originalFontSize =
                            ((Number)field.get("fontSize"))
                                    .floatValue()
                                    * scaleY;




                    /*
                     * Preview와 동일한
                     * 자동 폰트 축소
                     */
                    float fontSize =
                            getFitFontSize(
                                    value,
                                    width,
                                    height,
                                    originalFontSize
                            );





                    /*
                     * Konva Top 기준
                     * PDF Bottom 기준 변환
                     */
                    float pdfY =
                            pdfHeight
                                    - y
                                    - height;





                    Paragraph paragraph =
                            new Paragraph(value)
                                    .setFont(koreanFont)
                                    .setFontSize(fontSize)
                                    .setMargin(0)
                                    .setPadding(0)
                                    .setMultipliedLeading(1.2f);





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
                 * ==========================
                 * IMAGE
                 * ==========================
                 */
                else if("image".equals(type)){



                    String imageUrl =
                            (String)data.get(fieldName);



                    if(imageUrl == null){
                        continue;
                    }





                    float x =
                            ((Number)field.get("x"))
                                    .floatValue()
                                    * scaleX;



                    float y =
                            ((Number)field.get("y"))
                                    .floatValue()
                                    * scaleY;



                    float width =
                            ((Number)field.get("width"))
                                    .floatValue()
                                    * scaleX;



                    float height =
                            ((Number)field.get("height"))
                                    .floatValue()
                                    * scaleY;




                    float pdfY =
                            pdfHeight
                                    - y
                                    - height;






                    Image image =
                            new Image(
                                    ImageDataFactory.create(imageUrl)
                            );





                    /*
                     * contain
                     */
                    image.scaleToFit(
                            width,
                            height
                    );



                    float imageWidth =
                            image.getImageScaledWidth();



                    float imageHeight =
                            image.getImageScaledHeight();





                    float offsetX =
                            (width - imageWidth) / 2;



                    float offsetY =
                            (height - imageHeight) / 2;





                    image.setFixedPosition(
                            x + offsetX,
                            pdfY + offsetY
                    );



                    document.add(image);


                }


            }



            document.close();


            return baos.toByteArray();



        }catch(Exception e){


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
    private float getFitFontSize(
            String text,
            float width,
            float height,
            float fontSize
    ){


        float size = fontSize;



        while(size > 8){


            float charsPerLine =
                    width / (size * 0.55f);



            int lineCount =
                    (int)Math.ceil(
                            text.length()
                                    / charsPerLine
                    );



            float textHeight =
                    lineCount
                            * size
                            * 1.2f;




            if(textHeight <= height){

                break;

            }



            size -= 1;

        }



        return size;

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