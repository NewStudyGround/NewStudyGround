package com.codestates.server.global.mail.event;

import com.codestates.server.domain.member.entity.Member;
import lombok.Getter;
import org.springframework.context.ApplicationEvent;

/**
 * 회원가입 이벤트
 */
@Getter
public class MemberRegistrationEvent extends ApplicationEvent {

    private final Member member;

    public MemberRegistrationEvent(Member member) {
        super(member);
        this.member = member;
    }

}
