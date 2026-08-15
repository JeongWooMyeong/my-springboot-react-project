package com.example.springbootproject.pms.ext.service;

import com.example.springbootproject.pms.ext.kafka.dto.FailedProductEvent;
import com.example.springbootproject.pms.ext.kafka.dto.ProductEvent;

import java.util.List;

public interface ProductDltService {

    void saveDltEvent(ProductEvent event);

    void retry(Long productId);

    List<FailedProductEvent> findAll();

}
