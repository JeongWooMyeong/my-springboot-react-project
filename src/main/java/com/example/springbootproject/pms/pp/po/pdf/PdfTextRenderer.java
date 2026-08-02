package com.example.springbootproject.pms.pp.po.pdf;


import com.example.springbootproject.pms.sy.tm.dto.Sytm3000Dto;


import com.example.springbootproject.pms.sy.tm.service.dao.Sytm3000Mapper;
import com.itextpdf.io.font.PdfEncodings;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.pdf.PdfPage;
import com.itextpdf.kernel.pdf.canvas.PdfCanvas;
import com.itextpdf.layout.Canvas;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Text;
import com.itextpdf.kernel.geom.Rectangle;

import org.springframework.stereotype.Component;


import java.util.Map;



@Component
public class PdfTextRenderer {


    private final Sytm3000Mapper sytm3000Mapper;



    private static final String FONT_BASE_PATH =
            "C:/Project/SpringBootProject";



    public PdfTextRenderer(
            Sytm3000Mapper sytm3000Mapper
    ){

        this.sytm3000Mapper =
                sytm3000Mapper;

    }







    public void render(

            PdfPage page,

            Map<String,Object> field,

            Map<String,Object> data,

            float pdfWidth,

            float pdfHeight,

            float scaleX,

            float scaleY


    ) throws Exception {



        String fieldName =
                String.valueOf(
                        field.get("fieldName")
                );




        float x =

                ((Number)field.get("x"))
                        .floatValue()
                        *
                        scaleX;



        float y =

                ((Number)field.get("y"))
                        .floatValue()
                        *
                        scaleY;



        float width =

                ((Number)field.get("width"))
                        .floatValue()
                        *
                        scaleX;



        float height =

                ((Number)field.get("height"))
                        .floatValue()
                        *
                        scaleY;







        /*
         * 데이터 값
         */

        Object obj =
                data.get(fieldName);



        String value =

                obj == null

                        ?

                        ""

                        :

                        obj.toString();





        /*
         * 기본 TEXT
         */

        if(value.isEmpty()){


            Object text =
                    field.get("text");



            if(text != null){

                value =
                        text.toString();

            }

        }






        /*
         * 폰트 생성
         */

        String fontFamily =

                String.valueOf(
                        field.get("fontFamily")
                );



        PdfFont pdfFont =
                createFont(
                        fontFamily
                );







        /*
         * 폰트 사이즈
         */

        float fontSize = 20;



        Object fs =
                field.get("fontSize");



        if(fs != null){


            fontSize =

                    ((Number)fs)
                            .floatValue();


        }



        fontSize *= scaleX;







        /*
         * 줄바꿈
         */

        String wrapped =

                PdfRenderUtil.wrapText(

                        value,

                        pdfFont,

                        fontSize,

                        width

                );







        /*
         * 영역 맞춤
         */

        fontSize =

                PdfRenderUtil.getFitFontSize(

                        wrapped,

                        pdfFont,

                        width,

                        height,

                        fontSize

                );







        wrapped =

                PdfRenderUtil.wrapText(

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
                wrapped.split("\n")){


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







    private PdfFont createFont(
            String fontFamily
    ) throws Exception {



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
                                +
                                path;


            }




            return PdfFontFactory.createFont(

                    path,

                    PdfEncodings.IDENTITY_H,

                    PdfFontFactory.EmbeddingStrategy.PREFER_EMBEDDED

            );


        }






        return PdfFontFactory.createFont(

                "fonts/NanumGothic.ttf",

                PdfEncodings.IDENTITY_H,

                PdfFontFactory.EmbeddingStrategy.PREFER_EMBEDDED

        );



    }



}