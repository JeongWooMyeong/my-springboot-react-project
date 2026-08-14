package com.example.springbootproject.pms.ext.kafka.consumer;

import com.example.springbootproject.pms.ext.dto.Product;
import com.example.springbootproject.pms.ext.dto.ProductDocument;
import com.example.springbootproject.pms.ext.kafka.dto.ProductEvent;
import com.example.springbootproject.pms.ext.service.ProductSearchSyncService;
import com.example.springbootproject.pms.ext.service.dao.oracle.ProductMapper;
import com.example.springbootproject.pms.ext.service.repository.ProductSearchRepository;
import org.springframework.kafka.annotation.DltHandler;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.annotation.RetryableTopic;
import org.springframework.retry.annotation.Backoff;
import org.springframework.stereotype.Component;

@Component
public class ProductEventConsumer {

    private final ProductSearchSyncService productSearchSyncService;

    public ProductEventConsumer(
            ProductSearchSyncService productSearchSyncService
    ) {
        this.productSearchSyncService =
                productSearchSyncService;
    }

    @RetryableTopic(
            attempts = "4",
            backoff = @Backoff(
                    delay = 2000,
                    multiplier = 2
            ),
            dltTopicSuffix = ".DLT"
    )
    @KafkaListener(
            topics = "product-events",
            groupId = "product-search"
    )
    public void consume(ProductEvent event) {

        if ("CREATE".equals(event.getEventType())
                || "UPDATE".equals(event.getEventType())) {

            productSearchSyncService.sync(
                    event.getProductId()
            );

        } else if ("DELETE".equals(event.getEventType())) {

            productSearchSyncService.delete(
                    event.getProductId()
            );
        }
    }
}