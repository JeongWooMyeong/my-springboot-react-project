package com.example.springbootproject.pms.ext.controller;

import com.example.springbootproject.pms.ext.dto.ProductDocument;
import com.example.springbootproject.pms.ext.dto.ProductSearchCondition;
import com.example.springbootproject.pms.ext.dto.ProductSearchResponse;
import com.example.springbootproject.pms.ext.service.ProductSearchService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/es/products")
public class ProductSearchController {

    private final ProductSearchService productSearchService;

    public ProductSearchController(
            ProductSearchService productSearchService
    ) {
        this.productSearchService = productSearchService;
    }

    @GetMapping("/search")
    public ProductSearchResponse search(
            ProductSearchCondition condition,
            @RequestParam(defaultValue = "50") int size,
            @RequestParam(required = false) Long cursor
    ) throws IOException {

        return productSearchService.search(
                condition,
                size,
                cursor
        );
    }

    @PostMapping("/initialize")
    public String initialize() {

        productSearchService.initialize();

        return "Elasticsearch 초기 적재 완료";
    }
}