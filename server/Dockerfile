FROM maven:3.9.1-amazoncorretto-17 AS MAVEN_BUILD
COPY pom.xml /build/
COPY src /build/src/
WORKDIR /build/
RUN mvn package

FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=MAVEN_BUILD /build/target/server-0.0.1-SNAPSHOT.jar /app/
EXPOSE 8080
CMD ["java", "-jar", "server-0.0.1-SNAPSHOT.jar"]
