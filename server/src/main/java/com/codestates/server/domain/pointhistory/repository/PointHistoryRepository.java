package com.codestates.server.domain.pointhistory.repository;

import com.codestates.server.domain.pointhistory.entity.PointHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PointHistoryRepository extends JpaRepository<PointHistory,Long> {

}
