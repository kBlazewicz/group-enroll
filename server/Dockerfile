FROM maven:3.9.1-amazoncorretto-17 AS MAVEN_BUILD
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src /app/src/
RUN mvn package

FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=MAVEN_BUILD /app/target/server-0.0.1-SNAPSHOT.jar .
EXPOSE 8080
CMD ["java", "-jar", "server-0.0.1-SNAPSHOT.jar"]
