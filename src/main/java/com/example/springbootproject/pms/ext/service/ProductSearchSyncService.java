package com.example.springbootproject.pms.ext.service;

public interface ProductSearchSyncService {

    void sync(Long productId);

    void delete(Long productId);
}