package com.example.springbootproject.pms.ext.service.repository;

import com.example.springbootproject.pms.ext.dto.ProductDocument;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;

public interface ProductSearchRepository
        extends ElasticsearchRepository<ProductDocument, Long> {

    Page<ProductDocument> findByProductNameContaining(
            String keyword,
            Pageable pageable
    );
    @Query("""
    {
      "wildcard": {
        "productName.keyword": {
          "value": "*?0*"
        }
      }
    }
    """)
    List<ProductDocument> searchByProductName(String keyword);
}