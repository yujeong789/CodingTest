package com.test.vote.vote.service;

import com.test.vote.vote.entity.VoteEntity;
import com.test.vote.vote.repository.VoteRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class VoteService {

    private final VoteRepository voteRepository;

    @PostConstruct
    public void init() {
        // 초기 데이터 세팅 (DB에 데이터가 없을 때만)
        if (voteRepository.count() == 0) {
            voteRepository.save(new VoteEntity("짜장면", 0));
            voteRepository.save(new VoteEntity("짬뽕", 0));
        }
    }

    // 투표하기
    @Transactional
    public void vote(String menu) {
        Optional<VoteEntity> optionalVote = voteRepository.findById(menu);
        if (optionalVote.isPresent()) {
            VoteEntity vote = optionalVote.get();
            vote.setVoteCount(vote.getVoteCount() + 1);
            // JPA 변경 감지로 인해 save 호출 불필요 (Transactional)
        } else {
            // 없는 메뉴가 들어오면 새로 생성 (선택 사항)
            voteRepository.save(new VoteEntity(menu, 1));
        }
    }

    // 결과 조회
    @Transactional(readOnly = true)
    public Map<String, Integer> getResults() {
        List<VoteEntity> allVotes = voteRepository.findAll();
        Map<String, Integer> results = new HashMap<>();
        for (VoteEntity vote : allVotes) {
            results.put(vote.getMenuName(), vote.getVoteCount());
        }
        return results;
    }
}
