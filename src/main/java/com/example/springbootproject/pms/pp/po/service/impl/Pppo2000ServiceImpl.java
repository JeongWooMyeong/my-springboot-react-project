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
import java.util.ArrayList;
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


        Pppo2000DetailDto detail =
                pppo2000Mapper.selectRequestDetail(ordno);


        try(ByteArrayOutputStream baos =
                    new ByteArrayOutputStream()) {


            ObjectMapper mapper =
                    new ObjectMapper();



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
             * ==========================
             * 렌더 순서 정렬
             *
             * BACKGROUND
             * FIXED IMAGE
             * FIELD IMAGE
             * TEXT
             *
             * ==========================
             */


            List<Map<String,Object>> renderFields =
                    new ArrayList<>();


            fields.stream()
                    .filter(f ->
                            "BACKGROUND".equals(
                                    String.valueOf(
                                            f.get("imageType")
                                    )
                            )
                    )
                    .forEach(renderFields::add);



            fields.stream()
                    .filter(f ->
                            !"BACKGROUND".equals(
                                    String.valueOf(
                                            f.get("imageType")
                                    )
                            )
                    )
                    .sorted((a,b)->{

                        String ta =
                                String.valueOf(
                                        a.get("type")
                                );

                        String tb =
                                String.valueOf(
                                        b.get("type")
                                );


                        // TEXT 마지막
                        if("text".equals(ta)
                                && !"text".equals(tb)){
                            return 1;
                        }

                        if(!"text".equals(ta)
                                && "text".equals(tb)){
                            return -1;
                        }

                        return 0;

                    })
                    .forEach(renderFields::add);





            /*
             * ==========================
             * PDF SIZE
             * mm -> pt
             * ==========================
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
                            new PdfWriter(
                                    baos
                            )
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
             * ==========================
             * Canvas 800 x 600
             * ==========================
             */


            float canvasWidth = 800f;
            float canvasHeight = 600f;



            float scaleX =
                    pdfWidth / canvasWidth;


            float scaleY =
                    pdfHeight / canvasHeight;





            for(Map<String,Object> field :
                    renderFields) {



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





                /*
                 * ==========================
                 * IMAGE
                 * ==========================
                 */


                if("image".equals(type)) {


                    String imageUrl = null;



                    String imageType =
                            String.valueOf(
                                    field.get("imageType")
                            );



                    if(
                            "BACKGROUND".equals(imageType)
                                    ||
                                    "FIXED".equals(imageType)
                    ) {

                        imageUrl =
                                String.valueOf(
                                        field.get("imageUrl")
                                );

                    }
                    else if(
                            "FIELD".equals(imageType)
                    ) {


                        Object img =
                                data.get(fieldName);


                        if(img != null){

                            imageUrl =
                                    img.toString();

                        }

                    }



                    if(
                            imageUrl == null
                                    ||
                                    "null".equals(imageUrl)
                    ){
                        continue;
                    }



                    if(imageUrl.startsWith("/")){

                        imageUrl =
                                "http://localhost:8081"
                                        + imageUrl;

                    }



                    Image image =
                            new Image(
                                    ImageDataFactory.create(
                                            new URL(imageUrl)
                                    )
                            );



                    float pdfY =
                            pdfHeight
                                    -
                                    y
                                    -
                                    height;



                    if(
                            "BACKGROUND".equals(imageType)
                    ){

                        // 배경은 영역 강제 채움

                        image.scaleAbsolute(
                                width,
                                height
                        );


                        image.setFixedPosition(
                                x,
                                pdfY
                        );


                    }
                    else {


                        image.scaleToFit(
                                width,
                                height
                        );


                        float imgWidth =
                                image.getImageScaledWidth();


                        float imgHeight =
                                image.getImageScaledHeight();



                        image.setFixedPosition(
                                x +
                                        (width-imgWidth)/2,

                                pdfY +
                                        (height-imgHeight)/2
                        );

                    }



                    document.add(image);



                }





                /*
                 * ==========================
                 * TEXT
                 * ==========================
                 */


                else if("text".equals(type)){



                    Object obj =
                            data.get(fieldName);



                    String value =
                            obj == null
                                    ?
                                    ""
                                    :
                                    obj.toString();



                    if(value.isEmpty()){


                        Object text =
                                field.get("text");


                        if(text != null){

                            value =
                                    text.toString();

                        }

                    }





                    String fontFamily =
                            String.valueOf(
                                    field.get("fontFamily")
                            );



                    PdfFont pdfFont;



                    Sytm3000Dto font =
                            sytm3000Mapper
                                    .selectFontByFamily(
                                            fontFamily
                                    );



                    if(font != null){


                        String path =
                                font.getFontfilepath();



                        if(path.startsWith("/")){

                            path =
                                    FONT_BASE_PATH
                                            + path;

                        }



                        pdfFont =
                                PdfFontFactory.createFont(
                                        path,
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




                    float fontSize = 20;



                    Object fs =
                            field.get("fontSize");


                    if(fs != null){

                        fontSize =
                                ((Number)fs)
                                        .floatValue();

                    }



                    fontSize *= scaleX;




                    String wrapped =
                            wrapText(
                                    value,
                                    pdfFont,
                                    fontSize,
                                    width
                            );



                    fontSize =
                            getFitFontSize(
                                    wrapped,
                                    pdfFont,
                                    width,
                                    height,
                                    fontSize
                            );



                    wrapped =
                            wrapText(
                                    value,
                                    pdfFont,
                                    fontSize,
                                    width
                            );



                    float pdfY =
                            pdfHeight
                                    -
                                    y
                                    -
                                    height;




                    Paragraph paragraph =
                            new Paragraph();



                    for(String line :
                            wrapped.split("\n")) {


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