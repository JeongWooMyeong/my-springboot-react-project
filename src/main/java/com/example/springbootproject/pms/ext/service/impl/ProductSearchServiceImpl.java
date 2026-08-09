package com.example.springbootproject.pms.ext.service.impl;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch._types.FieldValue;
import co.elastic.clients.elasticsearch._types.SortOrder;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import co.elastic.clients.elasticsearch.core.search.Hit;
import com.example.springbootproject.pms.ext.dto.Product;
import com.example.springbootproject.pms.ext.dto.ProductDocument;
import com.example.springbootproject.pms.ext.dto.ProductSearchCondition;
import com.example.springbootproject.pms.ext.dto.ProductSearchResponse;
import com.example.springbootproject.pms.ext.query.ProductSearchQueryBuilder;
import com.example.springbootproject.pms.ext.service.ProductSearchService;
import com.example.springbootproject.pms.ext.service.dao.oracle.ProductMapper;
import com.example.springbootproject.pms.ext.service.repository.ProductSearchRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProductSearchServiceImpl implements ProductSearchService {

    private final ProductMapper productMapper;
    private final ProductSearchRepository repository;
    private final ElasticsearchClient elasticsearchClient;
    private final ProductSearchQueryBuilder queryBuilder;

    public ProductSearchServiceImpl(
            ProductMapper productMapper,
            ProductSearchRepository repository,
            ElasticsearchClient elasticsearchClient,
            ProductSearchQueryBuilder queryBuilder

    ) {
        this.productMapper = productMapper;
        this.repository = repository;
        this.elasticsearchClient = elasticsearchClient;
        this.queryBuilder = queryBuilder;
    }

    // Elasticsearch 검색
//    @Override
//    public Page<ProductDocument> search(String keyword, Pageable pageable) {
//        return repository.findByProductNameContaining(keyword, pageable);
//    }
//    @Override
//    public List<ProductDocument> search(String keyword) {
//        return repository.searchByProductName(keyword);
//    }
    @Override
    public ProductSearchResponse search(
            ProductSearchCondition condition,
            int size,
            Long cursor
    ) throws IOException {

        // 검색 조건 → Elasticsearch Query 생성
        Query query =
                queryBuilder.build(condition);


        SearchResponse<ProductDocument> response =
                elasticsearchClient.search(s -> {

                    s.index("products")
                            .size(size)

                            // QueryBuilder가 만든 검색 조건
                            .query(query)

                            // 상품 ID 기준 정렬
                            .sort(sort -> sort
                                    .field(field -> field
                                            .field("productId")
                                            .order(SortOrder.Asc)
                                    )
                            );


                    // 다음 페이지
                    if (cursor != null) {

                        s.searchAfter(
                                FieldValue.of(cursor)
                        );
                    }

                    return s;

                }, ProductDocument.class);


        List<ProductDocument> products =
                new ArrayList<>();


        for (Hit<ProductDocument> hit :
                response.hits().hits()) {

            if (hit.source() != null) {

                products.add(
                        hit.source()
                );
            }
        }


        // 다음 cursor
        Long nextCursor = null;

        if (!products.isEmpty()) {

            nextCursor =
                    products
                            .get(products.size() - 1)
                            .getProductId();
        }


        // 다음 페이지 존재 여부
        boolean hasNext =
                products.size() == size;


        return new ProductSearchResponse(
                products,
                nextCursor,
                hasNext
        );
    }

    // Oracle → Elasticsearch 초기 적재
    @Override
    public void initialize() {

        Long lastId = 0L;
        int batchSize = 10000;

        while (true) {

            // Oracle에서 10,000건씩 조회
            List<Product> products =
                    productMapper.findProductsForIndex(
                            lastId,
                            batchSize
                    );

            // 더 이상 데이터가 없으면 종료
            if (products.isEmpty()) {
                break;
            }

            // Product → ProductDocument 변환
            List<ProductDocument> documents = products.stream()
                    .map(product -> new ProductDocument(
                            product.getProductId(),
                            product.getProductName(),
                            product.getPrice(),
                            product.getStock()
                    ))
                    .toList();

            // Elasticsearch에 10,000건 저장
            repository.saveAll(documents);

            // 마지막 상품 ID 저장
            lastId = products.get(products.size() - 1)
                    .getProductId();

            System.out.println(
                    "ES 초기 적재 완료 : lastId = " + lastId
            );
        }
    }
}