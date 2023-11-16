FROM openjdk:11-jdk

# ⭐ 'ARG' 예약어를 통해 인자로 전달 받아야 한다.
ARG ADMIN_EMAIL \
    AWS_ACCESS_KEY \
    AWS_SECRET_KEY \
    EMAIL_PASSWORD \
    JWT_SECRET_KEY \
    KAKAO_CLIENT_ID \
    KAKAO_CLIENT_SECRET \
    RDS_USERNAME \
    RDS_PASSWORD


# ⭐ 'ENV' 예약어를 통해 전달받은 값을 실제 값과 매칭시켜야 한다.
ENV ADMIN_EMAIL=${ADMIN_EMAIL} \
    AWS_ACCESS_KEY=${AWS_ACCESS_KEY} \
    AWS_SECRET_KEY=${AWS_SECRET_KEY} \
    EMAIL_PASSWORD=${EMAIL_PASSWORD} \
    JWT_SECRET_KEY=${JWT_SECRET_KEY} \
    KAKAO_CLIENT_ID=${KAKAO_CLIENT_ID} \
    KAKAO_CLIENT_SECRET=${KAKAO_CLIENT_SECRET} \
    RDS_USERNAME=${RDS_USERNAME} \
    RDS_PASSWORD=${RDS_PASSWORD}

# (2) COPY에서 사용될 경로 변수
ARG JAR_FILE=/server/build/libs/*.jar

# (3) jar 빌드 파일을 도커 컨테이너로 복사
COPY ${JAR_FILE} app.jar

# (4) jar 파일 실행
ENTRYPOINT ["java", "-Dspring.profiles.active=docker", "-jar", "app.jar"]