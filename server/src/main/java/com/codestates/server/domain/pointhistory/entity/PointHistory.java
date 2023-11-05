package com.codestates.server.domain.pointhistory.entity;

import com.codestates.server.domain.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
public class PointHistory {

    public PointHistory(Long point, Member member, PointHistoryType pointHistoryType) {
        this.point = point;
        this.member = member;
        this.pointHistoryType = pointHistoryType;
    }

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
