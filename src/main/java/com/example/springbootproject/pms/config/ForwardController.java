package com.example.springbootproject.pms.config;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/*
react router 로 가게
서버 재시작시 404 에러 해결
 */

@Controller
public class ForwardController {
    @RequestMapping(value = "/{path:[^\\.]*}")
    public String forward() {
        return "forward:/index.html";
    }
}
