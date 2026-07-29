package com.example.springbootproject.pms.pp.po.event;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
//@NoArgsConstructor는 Lombok이 기본 생성자를 자동으로 만들어주는 어노테이션
@NoArgsConstructor
@AllArgsConstructor
public class ApprovalHistoryEvent {

    private String ordno;

    private Integer beforeState;

    private Integer afterState;

    private String userId;

}