package com.example.springbootproject.pms.ext.service.impl;

import com.example.springbootproject.pms.ext.dto.Product;
import com.example.springbootproject.pms.ext.service.ProductService;
import com.example.springbootproject.pms.ext.service.dao.oracle.ProductMapper;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductMapper productMapper;

    public ProductServiceImpl(ProductMapper productMapper) {
        this.productMapper = productMapper;
    }

    // 전체 조회
    @Override
    @Cacheable(value = "productList")
    public List<Product> getProducts() {
        System.out.println("DB에서 전체 조회");
        return productMapper.findAll();
    }

    // ID 조회
    @Override
    @Cacheable(value = "product", key = "#productId")
    public Product getProduct(Long productId) {
        System.out.println("DB에서 상품 조회");
        return productMapper.findById(productId);
    }

    // 이름 조회
    @Override
    @Cacheable(value = "productByName", key = "#name")
    public Product getProductByName(String name) {
        System.out.println("DB에서 이름 조회");
        return productMapper.findByName(name);
    }

    // 등록
    @Override
    @CacheEvict(value = "productList", allEntries = true)
    public void addProduct(Product product) {
        productMapper.insert(product);
    }

    // 수정
    @Override
    @Caching(evict = {
            @CacheEvict(value = "product", key = "#product.productId"),
            @CacheEvict(value = "productList", allEntries = true),
            @CacheEvict(value = "productByName", allEntries = true)
    })
    public void updateProduct(Product product) {
        productMapper.update(product);
    }

    // 삭제
    @Override
    @Caching(evict = {
            @CacheEvict(value = "product", key = "#productId"),
            @CacheEvict(value = "productList", allEntries = true),
            @CacheEvict(value = "productByName", allEntries = true)
    })
    public void removeProduct(Long productId) {
        productMapper.delete(productId);
    }
}