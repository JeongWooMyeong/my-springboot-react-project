package com.example.springbootproject.pms.sy.tm.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class Sytm2000Dto {

    private Long id;

    private String title;

    private String canvasData;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}