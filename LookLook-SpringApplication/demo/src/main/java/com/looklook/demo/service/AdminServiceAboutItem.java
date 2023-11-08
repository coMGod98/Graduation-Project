package com.looklook.demo.service;

import com.looklook.demo.domain.Item;
import com.looklook.demo.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AdminServiceAboutItem {
    private final ItemRepository itemRepository;

    @Autowired
    public AdminServiceAboutItem(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    public List<Item> getAllItems() {
        List<Item> items = itemRepository.findAll();
        return items;
    }
}