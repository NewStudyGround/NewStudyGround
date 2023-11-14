FROM openjdk:11-jdk
# ARG JAR_FILE=build/libs/*.jar
ARG JAR_FILE=./server/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java", "-Dspring.profiles.active=docker", "-jar", "app.jar"]
