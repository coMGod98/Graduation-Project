package com.looklook.demo.repository;

import com.looklook.demo.domain.LookLookUser;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<LookLookUser, Long> {

    Optional<LookLookUser> findByUserId(String userId);

    boolean existsByUserId(String userId);

    Optional<LookLookUser> findById(Long id);



}