package com.example.springbootproject.pms.pp.po.event;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ApprovalEvent {

    private List<String> ordnos;

    private Integer ordstate;

}