package com.example.springbootproject.pms.printer.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "PRINTER",
        schema = "dbo"
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Printer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "printer_id")
    private Long printerId;

    @Column(
            name = "printer_name",
            nullable = false,
            length = 200,
            unique = true
    )
    private String printerName;

    @Column(
            name = "description",
            length = 500
    )
    private String description;

    @Column(
            name = "use_yn",
            nullable = false,
            length = 1
    )
    private String useYn;

    @Column(
            name = "created_at",
            nullable = false
    )
    private LocalDateTime createdAt;

    @Column(
            name = "updated_at",
            nullable = false
    )
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate(){
        LocalDateTime now = LocalDateTime.now();

        if(useYn == null){
            useYn = "Y";
        }

        if(createdAt == null){
            createdAt = now;
        }

        if(updatedAt == null){
            updatedAt = now;
        }
    }

    @PreUpdate
    protected void onUpdate(){
        updatedAt = LocalDateTime.now();
    }

}
