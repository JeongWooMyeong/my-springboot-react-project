package com.example.springbootproject.pms.ext.service.impl;

import com.example.springbootproject.pms.ext.kafka.dto.ProductEvent;
import com.example.springbootproject.pms.ext.service.ProductDltService;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class ProductDltServiceImpl implements ProductDltService {

    private static final String PRODUCT_TOPIC =
            "product-events";

    private final KafkaTemplate<String, ProductEvent> kafkaTemplate;

    private final Map<Long, ProductEvent> dltEvents =
            new ConcurrentHashMap<>();

    public ProductDltServiceImpl(
            KafkaTemplate<String, ProductEvent> kafkaTemplate
    ) {
        this.kafkaTemplate = kafkaTemplate;
    }

    @Override
    public void saveDltEvent(ProductEvent event) {

        dltEvents.put(
                event.getProductId(),
                event
        );

        System.out.println(
                "DLT 이벤트 저장 = productId: "
                        + event.getProductId()
        );
    }

    @Override
    public void retry(Long productId) {

        ProductEvent event =
                dltEvents.get(productId);

        if (event == null) {
            throw new RuntimeException(
                    "재처리할 DLT 이벤트가 없습니다. productId="
                            + productId
            );
        }

        kafkaTemplate.send(
                PRODUCT_TOPIC,
                event
        );

        dltEvents.remove(productId);

        System.out.println(
                "DLT 재처리 요청 = productId: "
                        + productId
        );
    }
}