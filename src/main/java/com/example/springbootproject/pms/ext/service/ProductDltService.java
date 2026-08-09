package com.example.springbootproject.pms.ext.service;

import com.example.springbootproject.pms.ext.kafka.dto.ProductEvent;

public interface ProductDltService {

    void saveDltEvent(ProductEvent event);

    void retry(Long productId);
}
