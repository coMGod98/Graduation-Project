-- 회원 테이블에 관리자 계정 1번으로
INSERT INTO USERS (USERNAME, USERID, USERPW, AUTHORITY)
VALUES ('admin', 'admin0000', '$2a$10$Naqxf0wgmdyA9Q4YHZaeM.Fwwp14ZlN3YOfwY92Gi9v9NQyEQ/yj.', 'ROLE_ADMIN');

INSERT INTO USERS (USERNAME, USERID, USERPW, AUTHORITY, EMAIL, PNUMBER, SEX, ADDRESS)
VALUES ('testuser', 'testuser0000', '$2a$10$Naqxf0wgmdyA9Q4YHZaeM.Fwwp14ZlN3YOfwY92Gi9v9NQyEQ/yj.', 'ROLE_USER', 'test123@looklook.com', '01012345678', 'MALE', '경기도 성남시');



-- 상품 테이블
INSERT INTO ITEM(ITEM_NAME, CATEGORY, STOCK, PRICE, PGENDER, ITEM_DETAIL, uid)
VALUES ('샘플 상품 1','101',3, 10000, 'MAN', '상품 설명', 2);
INSERT INTO ITEM(ITEM_NAME, CATEGORY, STOCK, PRICE, PGENDER, ITEM_DETAIL, uid)
VALUES ('샘플 상품 2','201',5, 21000, 'WOMAN', '상품 설명', 2);


-- -- 상품 사이즈
INSERT INTO ITEM_SIZE (size_Name, product_id)
VALUES
    ('S', 1),
    ('M', 1),
    ('XL',1),
    ('L', 2);
--
-- -- 상품 색상
INSERT INTO ITEM_Color (color, product_id)
VALUES
    ('black', 1),
    ('white', 1),
    ('grey',1),
    ('red', 2),
    ('yellow', 2);