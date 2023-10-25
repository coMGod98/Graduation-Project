package com.looklook.demo.repository;

import com.looklook.demo.domain.LookLookUser;
import org.springframework.data.jpa.repository.JpaRepository;

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
    LookLookUser findByUserId(String userId);
}