package com.codestates.server.domain.member.dto;

import com.codestates.server.domain.answer.entity.Answer;
import com.codestates.server.domain.board.entity.Board;
import com.codestates.server.domain.comment.entity.Comment;
import com.codestates.server.domain.pointhistory.entity.PointHistory;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class MemberAdminResponseDto {

    private String memberId;

    private String email;

    private String name;

    private String phone;

    private String profileImage;

    private Long point;

    private List<PointHistory> pointHistories;

    private List<Board> boards;

    private List<Answer> answers;

    private List<Comment> comments;
}
