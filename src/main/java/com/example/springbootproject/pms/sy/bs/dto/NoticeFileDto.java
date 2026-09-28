package com.example.springbootproject.pms.sy.bs.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class NoticeFileDto {

    private Long file_id;

    private Long notice_id;

    private String original_name;

    private String object_name;

    private String content_type;

    private Long file_size;

    private LocalDateTime created_at;
}