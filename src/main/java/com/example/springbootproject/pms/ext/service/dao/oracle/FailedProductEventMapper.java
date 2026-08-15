package com.example.springbootproject.pms.ext.service.dao.oracle;

import com.example.springbootproject.pms.ext.kafka.dto.FailedProductEvent;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface FailedProductEventMapper {
    //DLT 이벤트를 DB에 저장
    void save(FailedProductEvent event);
    //관리자가 재처리할 실패 이벤트 조회
    FailedProductEvent findById(Long id);
    //resolve()
    //    ↓
    //재처리 성공 후 FAILED → RESOLVED
    void resolve(Long id);

    List<FailedProductEvent> findAll();
}
