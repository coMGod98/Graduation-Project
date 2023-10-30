package com.looklook.demo.repository;

import com.looklook.demo.domain.Item;
import com.looklook.demo.domain.ItemSellStatus;
import com.looklook.demo.domain.QItem;
import com.looklook.demo.domain.QItemImg;
import com.looklook.demo.dto.ItemSearchDto;
import com.looklook.demo.dto.MainItemDto;
import com.looklook.demo.dto.QMainItemDto;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Wildcard;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.thymeleaf.util.StringUtils;

import javax.persistence.EntityManager;
import java.time.LocalDateTime;
import java.util.List;


public class ItemRepositoryCustomImpl implements ItemRepositoryCustom{  //ItemRepositoryCustom 상속

    private JPAQueryFactory queryFactory;       //동적 쿼리 생성 -> JPAQueryFactory클래스 사용

    //생성자 DI를 통해 entityManager 주입
    public ItemRepositoryCustomImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }   //JPAQueryFactory 생성자로 EntityMAnager 객체 넣어줌

    //상품 등록일에 대한 조회 조건
    private BooleanExpression regDtsAfter(String searchDateType) {
        //SearchDateType 값에 따라 dateTime의 값을 이전 시간 값으로 세팅 후, 해당 시간 이후로 등록된 상품만 조회
        LocalDateTime dateTime = LocalDateTime.now();

        if (StringUtils.equals("all", searchDateType) || searchDateType == null) {
            return null;
        } else if (StringUtils.equals("1d",searchDateType)) {
            dateTime = dateTime.minusDays(1);
        } else if (StringUtils.equals("1w",searchDateType)) {
            dateTime = dateTime.minusWeeks(1);
        } else if (StringUtils.equals("1m",searchDateType)) {
            dateTime = dateTime.minusMonths(1);
        } else if (StringUtils.equals("1y",searchDateType)) {
            dateTime = dateTime.minusYears(1);
        }

        return QItem.item.regTime.after(dateTime);
    }

    // 상품 상태에 대한 조회 조건 BooleanExpression
    private BooleanExpression searchSellStatusEq(ItemSellStatus searchSellStatus){
        return searchSellStatus == null ? null : QItem.item.itemSellStatus.eq(searchSellStatus);
    }         //상품 판매 조건이 null일 경우 null 리턴. 결과값이 null이면 where절에서 해당조건은 무시됨


    // 상품명 또는 등록자 아이디에 대한 조회 조건 BooleanExpression
    private BooleanExpression searchByLike(String searchBy, String searchQuery) {
        if (StringUtils.equals("itemName", searchBy)) {
            return QItem.item.itemName.like("%" + searchQuery + "%");
        } else if (StringUtils.equals("createdBy", searchBy)) {
            return QItem.item.createdBy.like("%" + searchQuery + "%");
        }
        return null;
    }//searchBy값에 따라 상품명에 검색어를 포함하고 있는 상품 또는 상품 생성자의 아이디에 검색어를 포함하고 있는 상품을 조회하도록 조건값 반환

    //검색어가 포함된 상품 조회 조건 booleanExpression
    private BooleanBuilder itemNameLike(String searchQuery) {
        BooleanBuilder builder=new BooleanBuilder();

        builder.or(QItem.item.itemName.like("%" + searchQuery + "%"));
        return builder;
       }




    @Override
    public Page<Item> getAdminItemPage(ItemSearchDto itemSearchDto, Pageable pageable) {

        // queryFactory 를 이용하여 쿼리문 생성
        List<Item> content = queryFactory       //queryFactory 이용해서 쿼리 생성
                .selectFrom(QItem.item)     //상품 데이터 조회하기 위해 Qitem이 item 지정
                .where(regDtsAfter(itemSearchDto.getSearchDateType()),     //BooleanExpression 반환 조건문
                        searchSellStatusEq(itemSearchDto.getSearchSellStatus()),
                        //searchByCategory(itemSearchDto.getSearchItemCategory(), itemSearchDto.getSearchQuery()),
                        searchByLike(itemSearchDto.getSearchBy(), itemSearchDto.getSearchQuery()))
                .orderBy(QItem.item.id.desc())
                .offset(pageable.getOffset())   //데이터를 가지고 올 시작 인덱스 지정
                .limit(pageable.getPageSize())  //한번에 가지고 올 최대 개수 지정
                .fetch();

        long total = queryFactory
                .select(Wildcard.count).from(QItem.item)
                .where(regDtsAfter(itemSearchDto.getSearchDateType()),
                        searchSellStatusEq(itemSearchDto.getSearchSellStatus()),
                        searchByLike(itemSearchDto.getSearchBy(), itemSearchDto.getSearchQuery()))
                .fetchOne();

        return new PageImpl<>(content, pageable, total);        //8
    }





    //상품의 카테고리가 포함된 상품 검색 조건 booleanExpression
    private BooleanBuilder itemCategoryLike(String searchQuery){
        BooleanBuilder builder = new BooleanBuilder();

        builder.or(QItem.item.category.like("%" + searchQuery + "%"));
        return builder;
    }

    @Override
    public Page<MainItemDto> getMainItemPage(ItemSearchDto itemSearchDto, Pageable pageable){

        QItem item=QItem.item;
        QItemImg itemImg=QItemImg.itemImg;

        List<MainItemDto> content = queryFactory
                .select(
                        new QMainItemDto(
                                item.id,
                                item.itemName,
                                item.category,
                                item.itemDetail,
                                itemImg.imgUrl,
                                item.price)
                )
                .from(itemImg)
                .join(itemImg.item, item)
                .where(itemImg.repImgYn.eq("Y"))
                .where(itemNameLike(itemSearchDto.getSearchQuery())
                        .or(itemCategoryLike(itemSearchDto.getSearchQuery())))
                .orderBy(item.id.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        long total = queryFactory
                .select(Wildcard.count)
                .from(itemImg)
                .join(itemImg.item, item)
                .where(itemImg.repImgYn.eq("Y"))
                .where(itemNameLike(itemSearchDto.getSearchQuery())
                        .or(itemCategoryLike(itemSearchDto.getSearchQuery())))
                .fetchOne();


        return new PageImpl<>(content, pageable, total);
    }

    private BooleanExpression searchByCategory(String searchItemCategory, String searchQuery){

        if(StringUtils.equals("[MAN]", searchItemCategory)){
            return QItem.item.category.like("[MAN]" + searchQuery);
        } else if(StringUtils.equals("[WOMAN]", searchItemCategory)){
            return QItem.item.category.like("[WOMAN]" + searchQuery);
        } else if(StringUtils.equals("[SHOES]", searchItemCategory)) {
            return QItem.item.category.like("[SHOES]" + searchQuery);
        } else if(StringUtils.equals("[OUTER]", searchItemCategory)) {
            return QItem.item.category.like("[OUTER]" + searchQuery);
        } else if(StringUtils.equals("[ACCESSORY]", searchItemCategory)) {
            return QItem.item.category.like("[ACCESSORY]" + searchQuery);
        }
        return null;
    }

}
