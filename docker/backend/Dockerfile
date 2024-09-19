# Build stage
FROM maven:3.8.7-openjdk-18 AS build
WORKDIR /build
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

# Runtime stage
FROM amazoncorretto:17
ARG PROFILE=dev
ARG APP_VERSION=1.0.0
# define few things

WORKDIR /app
COPY --from=build /build/target/book-network-*.jar /app/

EXPOSE 8080

ENV DB_URL=jdbc:postgresql://postgres-sql-bsn:5432/book_db

ENV ACTIVE_PROFILE=${PROFILE}
ENV JAR_VERSION=${APP_VERSION}



CMD java -jar -Dspring.profiles.actives=${ACTIVE_PROFILE} -Dspring.datasource.url=${DB_URL} book-network-${APP_VERSION}.jar
