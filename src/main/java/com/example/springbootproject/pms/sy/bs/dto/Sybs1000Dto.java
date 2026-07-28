package com.example.springbootproject.pms.sy.bs.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class Sybs1000Dto {
    private Long notice_id;

    private String title;

    private String content;

    private String writer;

    private Integer view_count;

    private Boolean is_pinned;

    private Boolean is_deleted;

    private LocalDateTime created_at;

    private LocalDateTime updated_at;
}
