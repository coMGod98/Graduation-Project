package com.looklook.demo.repository;

import com.looklook.demo.domain.Item;
import com.looklook.demo.domain.ItemImg;
import com.looklook.demo.dto.ItemFormDto;
import com.looklook.demo.dto.ItemSellStatus;


import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.TestPropertySource;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;


@Transactional
@TestPropertySource(locations = "classpath:application-test.properties")
@SpringBootTest
public class ItemRepositoryTest {

    @Autowired
    ItemRepository itemRepository;

    @Test
    @DisplayName("상품 등록 테스트")
    //@WithMockUser(username = "admin", roles = "ADMIN")
    void saveItem() throws Exception {

        ItemFormDto item = new ItemFormDto();
        item.setItemName("테스트");
        item.setItemSellStatus(ItemSellStatus.SELL);
        item.setItemDetail("테스트 상품");
        item.setPrice(1000);
        item.setStock(100);

    }
}
