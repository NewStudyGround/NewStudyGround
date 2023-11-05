package com.codestates.server.domain.pointhistory.service;

import com.codestates.server.domain.member.repository.MemberRepository;
import com.codestates.server.domain.member.service.MemberService;
import com.codestates.server.domain.pointhistory.entity.PointHistory;
import com.codestates.server.domain.pointhistory.repository.PointHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PointHistoryService {

    private final PointHistoryRepository pointHistoryRepository;

    public void savePointHistory(PointHistory pointHistory){

        pointHistoryRepository.save(pointHistory);
    }
}
