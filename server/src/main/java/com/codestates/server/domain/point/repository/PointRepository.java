package com.codestates.server.domain.point.repository;

import com.codestates.server.domain.point.entity.Point;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PointRepository extends JpaRepository<Point,Long> {

}
