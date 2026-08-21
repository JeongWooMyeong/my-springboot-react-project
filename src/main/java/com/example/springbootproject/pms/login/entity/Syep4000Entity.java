package com.example.springbootproject.pms.login.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;


@Entity
@Table(name = "SYEP4000T")
@Getter
@Setter
public class Syep4000Entity {

    @Id
    @Column(name = "UserId")
    private String userid;

    @Column(name = "UserName")
    private String username;

    @Column(name = "JijumCd")
    private String jijumcd;

    @Column(name = "CoId")
    private String coid;
}