package com.test.vote.vote.repository;

import com.test.vote.vote.entity.VoteEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VoteRepository extends JpaRepository<VoteEntity, String> {
}

