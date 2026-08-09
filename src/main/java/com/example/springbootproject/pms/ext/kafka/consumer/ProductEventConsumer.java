package com.example.springbootproject.pms.ext.kafka.consumer;

import com.example.springbootproject.pms.ext.dto.Product;
import com.example.springbootproject.pms.ext.dto.ProductDocument;
import com.example.springbootproject.pms.ext.kafka.dto.ProductEvent;
import com.example.springbootproject.pms.ext.service.dao.oracle.ProductMapper;
import com.example.springbootproject.pms.ext.service.repository.ProductSearchRepository;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class ProductEventConsumer {

    private final ProductMapper productMapper;
    private final ProductSearchRepository productSearchRepository;

    public ProductEventConsumer(
            ProductMapper productMapper,
            ProductSearchRepository productSearchRepository
    ) {
        this.productMapper = productMapper;
        this.productSearchRepository = productSearchRepository;
    }

    @KafkaListener(
            topics = "product-events",
            groupId = "product-search"
    )
    public void consume(ProductEvent event) {

        System.out.println(
                "Kafka 상품 이벤트 수신 = " + event
        );

        if ("CREATE".equals(event.getEventType())
                || "UPDATE".equals(event.getEventType())) {

            Product product =
                    productMapper.findById(
                            event.getProductId()
                    );

            if (product == null) {
                System.out.println(
                        "상품을 찾을 수 없음 : "
                                + event.getProductId()
                );
                return;
            }

            ProductDocument document =
                    new ProductDocument(
                            product.getProductId(),
                            product.getProductName(),
                            product.getPrice(),
                            product.getStock()
                    );

            productSearchRepository.save(document);

            System.out.println(
                    "Elasticsearch 상품 저장 완료 = "
                            + product.getProductId()
            );
        }

        if ("DELETE".equals(event.getEventType())) {

            productSearchRepository.deleteById(
                    event.getProductId()
            );

            return;
        }

    }
}