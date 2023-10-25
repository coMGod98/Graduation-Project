//item테이블
CREATE TABLE item (
                      item_id BIGINT NOT NULL,
                      item_detail LONGTEXT NOT NULL,
                      item_name VARCHAR(255) NOT NULL,
                      price INTEGER NOT NULL,
                      stock_number INTEGER NOT NULL,
                      item_sell_status VARCHAR(255),
                      update_time DATETIME,
                      PRIMARY KEY (item_id)
);      //예전 코드임, 다시 업데이트 해서 올릴 예정
ALTER TABLE item
    ADD CONSTRAINT fk_item_users FOREIGN KEY (sid) REFERENCES users (uid);



//users테이블
CREATE TABLE users (
                       uid bigint not null,
                       username varchar(30),
                       userid varchar(30),
                       userpw varchar(30),
                       sex varchar(30),
                       pnumber varchar(30),
                       address varchar(30),
                       email varchar(30),
                       primary key (uid)
);




//cart테이블
create table cart(
                     cart_id bigint,
                     uid bigint
);
ALTER TABLE cart
    ADD CONSTRAINT fk_cart_users FOREIGN KEY (uid) REFERENCES users (uid);




//cart_item테이블
create table cart_item(
                     cart_item_id bigint,
                     count integer,
                     cart_id bigint,
                     item_id bigint
);
ALTER TABLE cart_item
    ADD CONSTRAINT fk_cart_item_item FOREIGN KEY (item_id) REFERENCES item (item_id);
ALTER TABLE cart_item
    ADD CONSTRAINT fk_cart_item_cart FOREIGN KEY (cart_id) REFERENCES cart (cart_id);




//orders테이블
//order테이블은 예약어라 나중에 오류 날까봐 orders 테이블로 바꿈
create table orders(
                        order_id bigint not null,
                        uid bigint not null,
                        order_date datetime not null,
                        address  varchar(255) not null,
                        order_status varchar(30) not null,
                        primary key (order_id)
);
ALTER TABLE orders
    ADD CONSTRAINT fk_order_users FOREIGN KEY (uid) REFERENCES users (uid);




//order_item테이블
create table order_item(
                           order_item_id bigint,
                           order_id bigint,
                           count int,
                           order_price int,
                           reg_time datetime(6),
                           update_time datetime(6),
                           item_item_id bigint,
                           primary key(order_item_id)
);
ALTER TABLE order_item
    ADD CONSTRAINT fk_order_item_orders FOREIGN KEY (order_id) REFERENCES orders (order_id);



//item_img테이블
create table item_img (
                          item_img_id bigint not null,
                          img_name varchar(30) not null,
                          ori_img_name varchar(30) not null,
                          img_url varchar(255) not null,
                          rep_img varchar(30) not null,
                          detail_img varchar(30) not null,
                          item_id bigint not null,
                          primary key(item_img_id)
);
ALTER TABLE order_item
    ADD CONSTRAINT fk_img_url_item FOREIGN KEY (item_id) REFERENCES item (item_id);

