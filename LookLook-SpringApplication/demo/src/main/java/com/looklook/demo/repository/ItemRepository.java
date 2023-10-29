package com.looklook.demo.repository;

import com.looklook.demo.domain.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface ItemRepository extends JpaRepository<Item,Long>, QuerydslPredicateExecutor<Item>, ItemRepositoryCustom {
    
}