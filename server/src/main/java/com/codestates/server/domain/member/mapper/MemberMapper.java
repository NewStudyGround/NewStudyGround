package com.codestates.server.domain.member.mapper;


import com.codestates.server.domain.member.dto.*;
import com.codestates.server.domain.member.entity.Member;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MemberMapper {

    Member memberPostDtoToMember(MemberPostDto memberPostDto);

    Member memberPatchDtoToMember(MemberPatchDto memberPatchDto);

    Member memberImagePatchDtoToMember(MemberImagePatchDto memberImagePatchDto);

    MemberResponseDto memberToMemberResponseDto(Member member);

    List<MemberResponseDto> membersTomemberResponseDto(List<Member> members);

    MemberBoardResponseDto memberToMemberBoardResponseDto(Member member);

    MemberAdminResponseDto memberToMemberAdminResponseDto(Member member);

    List<MemberAdminListResponseDto> membersToMemberAdminListResponseDto(List<Member> members);
}
