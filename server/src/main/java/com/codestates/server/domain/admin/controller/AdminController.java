package com.codestates.server.domain.admin.controller;

import com.codestates.server.domain.answer.service.AnswerService;
import com.codestates.server.domain.board.entity.Board;
import com.codestates.server.domain.board.service.BoardService;
import com.codestates.server.domain.comment.service.CommentService;
import com.codestates.server.domain.member.dto.MemberAdminResponseDto;
import com.codestates.server.domain.member.entity.Member;
import com.codestates.server.domain.member.mapper.MemberMapper;
import com.codestates.server.domain.member.service.MemberService;
import com.codestates.server.global.dto.MultiResponseDto;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/admin/members")
@Validated
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AdminController {

    private final MemberService memberService;
    private final MemberMapper mapper;
    private final BoardService boardService;
    private final AnswerService answerService;
    private final CommentService commentService;

    /**
     * 관리자 회원 전체 조회 페이지
     */
    @GetMapping("/info")
    public ResponseEntity getMembers(@Positive @RequestParam int page,
                                     @Positive @RequestParam int size) {

        // 0부터 시작되기 때문에 page는 page-1
        Page<Member> memberPage = memberService.getMembers(page-1, size);
        List<Member> members = memberPage.getContent();

        return new ResponseEntity(new MultiResponseDto(mapper.membersToMemberAdminListResponseDto(members), memberPage), HttpStatus.OK);
    }

    /**
     * 관리자 회원 전체 조회 페이지
     * -> delete
     */
    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteMember(@PathVariable("member-id") @Positive Long memberId) {

        memberService.deleteMember(memberId);

        // 삭제 됐으니까 204 no content 응답 내보내가
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/{member-id}/manage")
    public ResponseEntity getMember(@PathVariable("member-id") @Positive Long memberId) {

        Member member = memberService.getMember(memberId);
        MemberAdminResponseDto response = mapper.memberToMemberAdminResponseDto(member);

        return new ResponseEntity(response, HttpStatus.OK);
    }

    @DeleteMapping("/{member-id}/boards/{board-id}")
    public ResponseEntity deleteBoard(@PathVariable("member-id") @Positive Long memberId,
                                      @PathVariable("board-id") @Positive Long boardId) {

        boardService.deleteAdminBoard(memberId, boardId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/{member-id}/answers/{answer-id}")
    public ResponseEntity deleteAnswer(@PathVariable("member-id") @Positive Long memberId,
                                       @PathVariable("answer-id") @Positive Long answerId) {

        answerService.deleteAdminAnswer(memberId, answerId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/{member-id}/comment/{comment-id}")
    public ResponseEntity deleteComment(@PathVariable("member-id") @Positive Long memberId,
                                        @PathVariable("comment-id") @Positive Long commentId){

        commentService.deleteAdminComment(memberId, commentId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);

    }

}
