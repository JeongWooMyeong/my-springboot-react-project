package com.example.springbootproject.pms.ext.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Product {
    private Long productId;     // 상품 ID
    private String productName; // 상품명
    private Double price;       // 가격
    private Integer stock;      // 재고

    // 기본 생성자
    public Product() {}

    // 전체 필드 생성자
    public Product(Long productId, String productName, Double price, Integer stock) {
        this.productId = productId;
        this.productName = productName;
        this.price = price;
        this.stock = stock;
    }

    @Override
    public String toString() {
        return "Product{" +
                "productId=" + productId +
                ", productName='" + productName + '\'' +
                ", price=" + price +
                ", stock=" + stock +
                '}';
    }
}