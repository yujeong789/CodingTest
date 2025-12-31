package com.test.vote.vote.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.test.vote.vote.dto.VoteRequest;
import com.test.vote.vote.service.VoteService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean; // 주의: Spring Boot 버전에 따라 패키지가 다를 수 있음. 
// 보통은 @MockBean을 쓰지만, 간단하게 @Import나 @Service 자체를 테스트할 수도 있음.
// 여기서는 통합 테스트 대신 단위 테스트로 Controller만 검증하거나, Service까지 포함해서 검증.
// 간단하게 SpringBootTest로 통합 테스트를 작성하겠습니다.

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class VoteApiTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    public void voteAndCheckResult() {
        String voteUrl = "http://localhost:" + port + "/api/vote";
        String resultUrl = "http://localhost:" + port + "/api/result";

        // 1. 짜장면 투표
        VoteRequest request = new VoteRequest("짜장면");
        ResponseEntity<Void> response = restTemplate.postForEntity(voteUrl, request, Void.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);

        // 2. 결과 조회
        ResponseEntity<Map> resultResponse = restTemplate.getForEntity(resultUrl, Map.class);
        assertThat(resultResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        
        Map<String, Integer> body = resultResponse.getBody();
        assertThat(body).containsEntry("짜장면", 1);
        
        // 3. 짬뽕 투표
        restTemplate.postForEntity(voteUrl, new VoteRequest("짬뽕"), Void.class);
        
        // 4. 다시 결과 조회
        resultResponse = restTemplate.getForEntity(resultUrl, Map.class);
        body = resultResponse.getBody();
        assertThat(body).containsEntry("짜장면", 1);
        assertThat(body).containsEntry("짬뽕", 1);
    }
}

