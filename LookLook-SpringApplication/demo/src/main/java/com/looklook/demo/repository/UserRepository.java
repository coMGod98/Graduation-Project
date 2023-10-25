package com.looklook.demo.repository;

import com.looklook.demo.domain.LookLookUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.lang.reflect.Member;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<LookLookUser, Long> {

    Optional<LookLookUser> findByUserId(String userId);

    List<LookLookUser> findAll();

    boolean existsByUserId(String userId);
    void deleteById(Long id);
}