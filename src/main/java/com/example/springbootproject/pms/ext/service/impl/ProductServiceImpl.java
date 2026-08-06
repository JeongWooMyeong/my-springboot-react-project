package com.example.springbootproject.pms.ext.service.impl;

import com.example.springbootproject.pms.ext.dto.Product;
import com.example.springbootproject.pms.ext.service.ProductService;
import com.example.springbootproject.pms.ext.service.dao.oracle.ProductMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductMapper productMapper;

    public ProductServiceImpl(ProductMapper productMapper) {
        this.productMapper = productMapper;
    }

    @Override
    public List<Product> getProducts() {
        return productMapper.findAll();
    }

    @Override
    public Product getProduct(Long productId) {
        return productMapper.findById(productId);
    }

    @Override
    public Product getProductByName(String name) {
        return productMapper.findByName(name);
    }

    @Override
    public void addProduct(Product product) {
        productMapper.insert(product);
    }

    @Override
    public void updateProduct(Product product) {
        productMapper.update(product);
    }

    @Override
    public void removeProduct(Long productId) {
        productMapper.delete(productId);
    }
}