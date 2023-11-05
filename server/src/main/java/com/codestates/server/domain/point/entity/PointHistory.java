package com.codestates.server.domain.point.entity;

import com.codestates.server.domain.member.entity.Member;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class PointHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Long point;

    @ManyToOne
    private Member member;

    @Column
    private PointHistoryType pointHistoryType;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}
