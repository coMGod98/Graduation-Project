-- 회원 테이블에 관리자 계정 1번으로
INSERT INTO users (username, userid, userpw, authority)
VALUES ('admin', 'admin0000', '$2a$10$Naqxf0wgmdyA9Q4YHZaeM.Fwwp14ZlN3YOfwY92Gi9v9NQyEQ/yj.', 'ROLE_ADMIN');

INSERT INTO users (username, userid, userpw, authority, email, pnumber, sex, address)
VALUES ('testuser', 'testuser0000', '$2a$10$Naqxf0wgmdyA9Q4YHZaeM.Fwwp14ZlN3YOfwY92Gi9v9NQyEQ/yj.', 'ROLE_USER', 'test123@looklook.com', '01012345678', 'MALE', '경기도 성남시');



-- 상품 테이블
INSERT INTO item(item_name, category, stock, price, pgender, item_detail, uid)
VALUES ('샘플 상품 1','101',3, 10000, 'MAN', '상품 설명', 2);
INSERT INTO item(item_name, category, stock, price, pgender, item_detail, uid)
VALUES ('샘플 상품 2','201',5, 21000, 'WOMAN', '상품 설명', 2);


-- -- 상품 사이즈
INSERT INTO item_size (size_Name, product_id)
VALUES
    ('S', 1),
    ('M', 1),
    ('XL',1),
    ('L', 2);
--
-- -- 상품 색상
INSERT INTO item_color (color, product_id)
VALUES
    ('black', 1),
    ('white', 1),
    ('grey',1),
    ('red', 2),
    ('yellow', 2);