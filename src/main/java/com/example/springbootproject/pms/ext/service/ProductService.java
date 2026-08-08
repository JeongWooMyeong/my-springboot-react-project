package com.example.springbootproject.pms.ext.service;

import com.example.springbootproject.pms.ext.dto.Product;
import com.example.springbootproject.pms.ext.dto.ProductPageResponse;

import java.util.List;

public interface ProductService {
    ProductPageResponse getProducts(int page, int size);
    Product getProduct(Long productId);
    Product getProductByName(String name);
    void addProduct(Product product);
    void updateProduct(Product product);
    void removeProduct(Long productId);
}