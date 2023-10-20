package com.looklook.demo.repository;

import com.looklook.demo.domain.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item,Long>  {

}