package com.example.springbootproject.pms.login.component;

import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class RefreshTokenStore {

    private final Map<String, String> store = new HashMap<>();

    public void save(String userid, String refreshToken) {
        store.put(userid, refreshToken);
    }

    public String get(String userid) {
        return store.get(userid);
    }

    public void delete(String userid) {
        store.remove(userid);
    }
}