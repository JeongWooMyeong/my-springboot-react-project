package com.example.springbootproject.pms.ext.service;

import com.example.springbootproject.pms.ext.dto.Product;

import java.util.List;

public interface ProductService {
    List<Product> getProducts();
    Product getProduct(Long productId);
    void addProduct(Product product);
    void updateProduct(Product product);
    void removeProduct(Long productId);
}