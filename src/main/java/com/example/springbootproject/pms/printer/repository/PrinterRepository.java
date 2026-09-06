package com.example.springbootproject.pms.printer.repository;

import com.example.springbootproject.pms.printer.entity.Printer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PrinterRepository extends JpaRepository<Printer, Long> {

    List<Printer> findByUseYnOrderByPrinterNameAsc(
            String useYn
    );
}
