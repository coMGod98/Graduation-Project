package com.looklook.demo.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QItem is a Querydsl query type for Item
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QItem extends EntityPathBase<Item> {

    private static final long serialVersionUID = -1345881451L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QItem item = new QItem("item");

    public final QBaseEntity _super = new QBaseEntity(this);

    public final EnumPath<Category> category = createEnum("category", Category.class);

    public final StringPath color = createString("color");

    //inherited
    public final StringPath createdBy = _super.createdBy;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath itemDetail = createString("itemDetail");

    public final StringPath itemName = createString("itemName");

    public final EnumPath<ItemSellStatus> itemSellStatus = createEnum("itemSellStatus", ItemSellStatus.class);

    //inherited
    public final StringPath modifiedBy = _super.modifiedBy;

    public final StringPath pgender = createString("pgender");

    public final NumberPath<Integer> price = createNumber("price", Integer.class);

    public final DateTimePath<java.time.LocalDateTime> regTime = createDateTime("regTime", java.time.LocalDateTime.class);

    public final StringPath size = createString("size");

    public final NumberPath<Integer> stock = createNumber("stock", Integer.class);

    public final DateTimePath<java.time.LocalDateTime> updateTime = createDateTime("updateTime", java.time.LocalDateTime.class);

    public final QLookLookUser user;

    public QItem(String variable) {
        this(Item.class, forVariable(variable), INITS);
    }

    public QItem(Path<? extends Item> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QItem(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QItem(PathMetadata metadata, PathInits inits) {
        this(Item.class, metadata, inits);
    }

    public QItem(Class<? extends Item> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new QLookLookUser(forProperty("user")) : null;
    }

}

