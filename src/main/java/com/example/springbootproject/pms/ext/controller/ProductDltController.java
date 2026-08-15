package com.example.springbootproject.pms.ext.controller;

import com.example.springbootproject.pms.ext.kafka.dto.FailedProductEvent;
import com.example.springbootproject.pms.ext.kafka.dto.ProductEvent;
import com.example.springbootproject.pms.ext.service.ProductDltService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/kafka/dlt")
public class ProductDltController {

    private final ProductDltService productDltService;

    public ProductDltController(
            ProductDltService productDltService
    ) {
        this.productDltService = productDltService;
    }

    @PostMapping("/retry/{id}")
    public void retry(
            @PathVariable Long id
    ) {

        productDltService.retry(id);
    }

    // 전체 실패 이벤트 조회
    @GetMapping
    public List<FailedProductEvent> findAll() {
        return productDltService.findAll();
    }
}