package com.example.springbootproject.pms.printer.service;

import com.example.springbootproject.pms.printer.entity.Printer;
import com.example.springbootproject.pms.printer.repository.PrinterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PrinterService {

    private final PrinterRepository printerRepository;

    public List<Printer> getPrinters() {

        return printerRepository
                .findByUseYnOrderByPrinterNameAsc("Y");
    }
}