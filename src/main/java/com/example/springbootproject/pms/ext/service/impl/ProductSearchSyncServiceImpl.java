package com.example.springbootproject.pms.ext.service.impl;

import com.example.springbootproject.pms.ext.dto.Product;
import com.example.springbootproject.pms.ext.dto.ProductDocument;
import com.example.springbootproject.pms.ext.service.ProductSearchSyncService;
import com.example.springbootproject.pms.ext.service.dao.oracle.ProductMapper;
import com.example.springbootproject.pms.ext.service.repository.ProductSearchRepository;
import org.springframework.stereotype.Service;

@Service
public class ProductSearchSyncServiceImpl
        implements ProductSearchSyncService {

    private final ProductMapper productMapper;
    private final ProductSearchRepository productSearchRepository;

    public ProductSearchSyncServiceImpl(
            ProductMapper productMapper,
            ProductSearchRepository productSearchRepository
    ) {
        this.productMapper = productMapper;
        this.productSearchRepository = productSearchRepository;
    }

    @Override
    public void sync(Long productId) {

        Product product =
                productMapper.findById(productId);

        if (product == null) {
            throw new RuntimeException(
                    "상품을 찾을 수 없습니다. productId="
                            + productId
            );
        }

        // ===== Retry / DLT 테스트 =====
//        if (productId.equals(1000005L)) {
//            throw new RuntimeException(
//                    "Retry 테스트 : productId=" + productId
//            );
//        }


        ProductDocument document =
                new ProductDocument(
                        product.getProductId(),
                        product.getProductName(),
                        product.getPrice(),
                        product.getStock()
                );

        productSearchRepository.save(document);
    }

    @Override
    public void delete(Long productId) {

        productSearchRepository.deleteById(productId);
    }
}