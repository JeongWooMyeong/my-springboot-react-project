package com.example.springbootproject.pms.printer.controller;

import com.example.springbootproject.pms.printer.entity.Printer;
import com.example.springbootproject.pms.printer.service.PrinterService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/printers")
public class PrinterController {

    private final PrinterService printerService;

    @GetMapping
    public List<Printer> getPrinters() {

        return printerService.getPrinters();
    }
}