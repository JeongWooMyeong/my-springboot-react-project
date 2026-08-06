package com.example.springbootproject.pms.ext.service.dao.oracle;

import com.example.springbootproject.pms.ext.dto.Product;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ProductMapper {
    List<Product> findAll();
    Product findById(Long productId);
    void insert(Product product);
    void update(Product product);
    void delete(Long productId);
}