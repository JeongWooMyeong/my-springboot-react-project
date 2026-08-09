package com.example.springbootproject.pms.ext.service;

import com.example.springbootproject.pms.ext.dto.ProductDocument;
import com.example.springbootproject.pms.ext.dto.ProductSearchCondition;
import com.example.springbootproject.pms.ext.dto.ProductSearchResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.io.IOException;
import java.util.List;

public interface ProductSearchService {

    ProductSearchResponse search(
            ProductSearchCondition condition,
            int size,
            Long cursor
    ) throws IOException;
    void initialize();
}