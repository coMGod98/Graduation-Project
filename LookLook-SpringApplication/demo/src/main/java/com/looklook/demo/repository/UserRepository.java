package com.looklook.demo.repository;

import com.looklook.demo.domain.LookLookUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.lang.reflect.Member;
import java.util.Optional;

//@Repository
//public class UserRepository {
//    @PersistenceContext
//    private EntityManager em;
//
//    public void save(LookLookUser user){
//        em.persist(user);
//    }
//
//    public LookLookUser findOne(Long id){
//        return em.find(LookLookUser.class, id);
//    }
//
//    public LookLookUser findByUserId(String userId) {
//        return em.find(LookLookUser.class, userId);
//    }
//}

public interface UserRepository extends JpaRepository<LookLookUser, Long> {
    Optional<LookLookUser> findByUserId(String userId);
}