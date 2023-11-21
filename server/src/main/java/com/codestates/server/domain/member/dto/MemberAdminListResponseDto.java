package com.codestates.server.domain.member.dto;

import lombok.Getter;
import lombok.Setter;

// 관리자 페이지에서 리스트형태로 회원 정보 보일 것들
@Getter
@Setter
public class MemberAdminListResponseDto {

    private String memberId;

    private String email;

    private String name;

    private String profileImage;

    private Long point;

}
