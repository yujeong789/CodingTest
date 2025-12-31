package com.test.vote.vote.controller;

import com.test.vote.vote.dto.VoteRequest;
import com.test.vote.vote.service.VoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class VoteController {

    private final VoteService voteService;

    // 투표하기
    @PostMapping("/vote")
    public ResponseEntity<Void> vote(@RequestBody VoteRequest request) {
        voteService.vote(request.getMenu());
        return ResponseEntity.ok().build();
    }

    // 결과 조회
    @GetMapping("/result")
    public ResponseEntity<Map<String, Integer>> getResult() {
        return ResponseEntity.ok(voteService.getResults());
    }
}
