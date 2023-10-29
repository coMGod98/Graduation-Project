package com.looklook.demo.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QLookLookUser is a Querydsl query type for LookLookUser
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QLookLookUser extends EntityPathBase<LookLookUser> {

    private static final long serialVersionUID = -57132981L;

    public static final QLookLookUser lookLookUser = new QLookLookUser("lookLookUser");

    public final StringPath address = createString("address");

    public final EnumPath<Authority> authority = createEnum("authority", Authority.class);

    public final StringPath email = createString("email");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath password = createString("password");

    public final StringPath phoneNumber = createString("phoneNumber");

    public final StringPath sex = createString("sex");

    public final StringPath userId = createString("userId");

    public final StringPath userName = createString("userName");

    public QLookLookUser(String variable) {
        super(LookLookUser.class, forVariable(variable));
    }

    public QLookLookUser(Path<? extends LookLookUser> path) {
        super(path.getType(), path.getMetadata());
    }

    public QLookLookUser(PathMetadata metadata) {
        super(LookLookUser.class, metadata);
    }

}

