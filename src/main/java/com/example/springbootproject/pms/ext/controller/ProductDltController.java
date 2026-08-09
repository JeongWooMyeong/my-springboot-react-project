package com.example.springbootproject.pms.ext.controller;

import com.example.springbootproject.pms.ext.kafka.dto.ProductEvent;
import com.example.springbootproject.pms.ext.service.ProductDltService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/kafka/dlt")
public class ProductDltController {

    private final ProductDltService productDltService;

    public ProductDltController(
            ProductDltService productDltService
    ) {
        this.productDltService = productDltService;
    }

    @PostMapping("/retry/{productId}")
    public void retry(
            @PathVariable Long productId
    ) {

        productDltService.retry(productId);
    }
}