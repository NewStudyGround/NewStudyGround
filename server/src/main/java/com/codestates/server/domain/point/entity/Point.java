package com.codestates.server.domain.point.entity;

import com.codestates.server.domain.member.entity.Member;

import javax.persistence.*;

@Entity
public class Point {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Member member;

    @Column
    private PointType pointType;
}
