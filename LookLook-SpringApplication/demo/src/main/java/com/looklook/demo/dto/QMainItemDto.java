package com.looklook.demo.dto;

import com.querydsl.core.types.Expression;
import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.ConstructorExpression;
import javax.annotation.processing.Generated;

/**
 * com.looklook.demo.dto.QMainItemDto is a Querydsl Projection type for MainItemDto
 */
@Generated("com.querydsl.codegen.DefaultProjectionSerializer")
public class QMainItemDto extends ConstructorExpression<MainItemDto> {

    private static final long serialVersionUID = -1494838116L;

    public QMainItemDto(Expression<Long> id, Expression<String> itemName, Expression<String> category, Expression<String> itemDetail, Expression<String> imgUrl, Expression<Integer> price) {
        super(MainItemDto.class, new Class<?>[]{long.class, String.class, String.class, String.class, int.class}, id, itemName, itemDetail, imgUrl, price);
    }

}

