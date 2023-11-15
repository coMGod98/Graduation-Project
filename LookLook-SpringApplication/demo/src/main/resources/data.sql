-- 회원 테이블에 관리자 계정 1번으로
INSERT INTO users (username, userid, userpw, authority)
VALUES ('admin', 'admin0000', '$2a$10$Naqxf0wgmdyA9Q4YHZaeM.Fwwp14ZlN3YOfwY92Gi9v9NQyEQ/yj.', 'ROLE_ADMIN');

-- 회원 테이블 구매자&판매자
INSERT INTO users (username, userid, userpw, authority, email, pnumber, sex, address)
VALUES
    ('testuser1', 'testuser0001', '$2a$10$Naqxf0wgmdyA9Q4YHZaeM.Fwwp14ZlN3YOfwY92Gi9v9NQyEQ/yj.', 'ROLE_USER', 'test123@looklook.com', '01012345678', 'FEMALE', '경기도 성남시'),
    ('testuser2', 'testuser0002', '$2a$10$Naqxf0wgmdyA9Q4YHZaeM.Fwwp14ZlN3YOfwY92Gi9v9NQyEQ/yj.', 'ROLE_USER', 'test123@looklook.com', '01012345678', 'FEMALE', '경기도 성남시'),
    ('testuser3', 'testuser0003', '$2a$10$Naqxf0wgmdyA9Q4YHZaeM.Fwwp14ZlN3YOfwY92Gi9v9NQyEQ/yj.', 'ROLE_USER', 'test123@looklook.com', '01012345678', 'MALE', '경기도 성남시'),
    ('testuser4', 'testuser0004', '$2a$10$Naqxf0wgmdyA9Q4YHZaeM.Fwwp14ZlN3YOfwY92Gi9v9NQyEQ/yj.', 'ROLE_USER', 'test123@looklook.com', '01012345678', 'FEMALE', '경기도 성남시'),
    ('testuser5', 'testuser0005', '$2a$10$Naqxf0wgmdyA9Q4YHZaeM.Fwwp14ZlN3YOfwY92Gi9v9NQyEQ/yj.', 'ROLE_USER', 'test123@looklook.com', '01012345678', 'MALE', '경기도 성남시'),
    ('testuser6', 'testuser0006', '$2a$10$Naqxf0wgmdyA9Q4YHZaeM.Fwwp14ZlN3YOfwY92Gi9v9NQyEQ/yj.', 'ROLE_USER', 'test123@looklook.com', '01012345678', 'FEMALE', '경기도 성남시'),
    ('testuser7', 'testuser0007', '$2a$10$Naqxf0wgmdyA9Q4YHZaeM.Fwwp14ZlN3YOfwY92Gi9v9NQyEQ/yj.', 'ROLE_USER', 'test123@looklook.com', '01012345678', 'MALE', '경기도 성남시'),
    ('testuser8', 'testuser0008', '$2a$10$Naqxf0wgmdyA9Q4YHZaeM.Fwwp14ZlN3YOfwY92Gi9v9NQyEQ/yj.', 'ROLE_USER', 'test123@looklook.com', '01012345678', 'FEMALE', '경기도 성남시'),
    ('testuser9', 'testuser0009', '$2a$10$Naqxf0wgmdyA9Q4YHZaeM.Fwwp14ZlN3YOfwY92Gi9v9NQyEQ/yj.', 'ROLE_USER', 'test123@looklook.com', '01012345678', 'MALE', '경기도 성남시'),
    ('testuser10', 'testuser0010', '$2a$10$Naqxf0wgmdyA9Q4YHZaeM.Fwwp14ZlN3YOfwY92Gi9v9NQyEQ/yj.', 'ROLE_USER', 'test123@looklook.com', '01012345678', 'FEMALE', '경기도 성남시');


-- 상품 테이블
-- 여성
INSERT INTO item (item_name, category, price, pgender, item_detail, uid, reg_time)
VALUES
    ('유희 크롭 셔츠','101', 23000, 'WOMAN', '상품 설명', 2, '2023-11-11'),
    ('제로스트릿 타이 블라우스','101', 23000, 'WOMAN', '상품 설명', 2, '2023-11-11'),
    ('밀리언코르 로고 자수 니트 집업','102', 54000, 'WOMAN', '상품 설명', 2, '2023-11-11'),
    ('썸플레이스 그래픽 오버핏 풀오버 울 니트','102', 38000, 'WOMAN', '상품 설명', 2, '2023-11-11'),
    ('사라21 숏슬리브','103',29000, 'WOMAN', '상품 설명', 2, '2023-11-11'),
    ('해피니스 러블리 패치 슬림 핏 티셔츠','103', 21000, 'WOMAN', '상품 설명', 2, '2023-11-11'),
    ('셀린느 다크 유니언 워시 데님 틀레어 팬츠','104', 39000, 'WOMAN', '상품 설명', 2, '2023-11-11'),
    ('시크릿밴드 라이트워싱 컷팅슬림부츠컷 팬츠','104', 43000, 'WOMAN', '상품 설명', 2, '2023-11-11'),
    ('트리밍버드 코듀로이 미니스커트','105', 59000, 'WOMAN', '상품 설명', 2, '2023-11-11'),
    ('위세임 랩 레더 바이커 스커트','105', 32000, 'WOMAN', '상품 설명', 2, '2023-11-11'),
    ('칸디니 네이비 집업 플레어 원피스','106', 54000, 'WOMAN', '상품 설명', 2, '2023-11-11'),
    ('아모멘토 맥시 원피스','106', 154000, 'WOMAN', '상품 설명', 2, '2023-11-11');


-- 남성
INSERT INTO item (item_name, category, price, pgender, item_detail, uid, reg_time)
VALUES
    ('라퍼지스토어 솔리드 오버핏 옥스포드 타이셔츠','201', 49000, 'MAN', '오버핏 셔츠', 2, '2023-11-11'),
    ('베르드누아 브렌슨 오버핏 셔츠','201', 67000, 'MAN', '상품 설명', 2, '2023-11-11'),
    ('메쉬 그래픽 니트','202', 53000, 'MAN', '상품 설명', 2, '2023-11-11'),
    ('그램 아운스 파운드 프레젠트 박스 니트','202', 81000, 'MAN', '상품 설명', 2, '2023-11-11'),
    ('로버스트 헤비 오버핏 반팔티셔츠','203', 23000, 'MAN', '상품 설명', 2, '2023-11-11'),
    ('무신사 스탠다드 레이어드 크루넥 반팔 티셔츠','203', 20000, 'MAN', '상품 설명', 2, '2023-11-11'),
    ('톤즈 컴포트 워싱 수트셋업','204', 69000, 'MAN', '상품 설명', 2, '2023-11-11'),
    ('유니온 라운지 자켓','204', 81000, 'MAN', '상품 설명', 2, '2023-11-11'),
    ('바이오스톤 워싱 와이드 데님 팬츠','205', 69000, 'MAN', '상품 설명', 2, '2023-11-11'),
    ('포트너스 투턱 와이드 블랙 진','205', 62000, 'MAN', '상품 설명', 2, '2023-11-11');

-- 아우터
INSERT INTO item (item_name, category, price, pgender, item_detail, uid, reg_time)
VALUES
    ('케이투 씬에어 숏패딩','301', 321000, 'WOMAN', '상품 설명', 2, '2023-11-11'),
    ('데일리 푸퍼 리버서블 플리스 숏패딩','301', 149000, 'WOMAN', '상품 설명', 2, '2023-11-11'),
    ('트릴리온 울 부클 카라 가디건','302', 89000, 'WOMAN', '상품 설명', 2, '2023-11-11'),
    ('무신사 스탠다드 미니멀 가디건','302', 71000, 'WOMAN', '상품 설명', 2, '2023-11-11'),
    ('크로스드레슬리 샤이닝 스타 집업','303', 59000, 'WOMAN', '상품 설명', 2, '2023-11-11'),
    ('토피 스웻 후드 집업','303', 39000, 'WOMAN', '상품 설명', 2, '2023-11-11'),
    ('모즈모즈 어깨자수 오버핏 투웨이 후드집업','303', 39900, 'WOMAN', '상품 설명', 2, '2023-11-11'),
    ('비콜렉터 겨울 싱글 코트','304', 129000, 'WOMAN', '상품 설명', 2, '2023-11-11'),
    ('아이스가든에이오공팔 벨 슬리브 코트','304', 119000, 'WOMAN', '상품 설명', 2, '2023-11-11'),
    ('멜란지마스터 울 오버핏 싱글 코트','304', 89000, 'WOMAN', '상품 설명', 2, '2023-11-11'),
    ('라퍼지스토어 솔라노 윈드 자켓','305', 43800, 'WOMAN', '상품 설명', 2, '2023-11-11'),
    ('에즈카톤 스카이 라이트 자켓','305', 48900, 'WOMAN', '상품 설명', 2, '2023-11-11'),
    ('플레이스 스튜디오 비건 레더 오버핏 블루종','306', 89000, 'WOMAN', '상품 설명', 2, '2023-11-11'),
    ('아비렉스 에이징 램스킨 라이더 자켓','306', 78000, 'WOMAN', '상품 설명', 2, '2023-11-11');

-- 신발
INSERT INTO item (item_name, category, price, pgender, item_detail, uid, reg_time)
VALUES
    ('더브라운 정장화','401', 87200, 'WOMAN', '상품 설명', 2, '2023-11-11'),
    ('버튼서울 플레인 토 더비 슈즈','401', 179000, 'WOMAN', '상품 설명', 2, '2023-11-11'),
    ('커스텀에이드 라운드토 청키 메리제인 루디','402', 58000, 'WOMAN', '상품 설명', 2, '2023-11-11'),
    ('제메타 스카이 퍼 메리제인 힐','402', 89000, 'WOMAN', '상품 설명', 2, '2023-11-11'),
    ('스노우피크 필드 토 슈즈','403', 59000, 'WOMAN', '상품 설명', 2, '2023-11-11'),
    ('끌로에 로엔 발레리나 플랫 슈즈','403', 78000, 'WOMAN', '상품 설명', 2, '2023-11-11'),
    ('스베이버 멀티카모 아웃도어 샌들','404', 39000, 'WOMAN', '상품 설명', 2, '2023-11-11'),
    ('우포스 클로그','404', 59000, 'WOMAN', '상품 설명', 2, '2023-11-11'),
    ('디스커버리 샌들','405', 39000, 'WOMAN', '상품 설명', 2, '2023-11-11'),
    ('아디다스 알파바운스 슬라이드','405', 44900, 'WOMAN', '상품 설명', 2, '2023-11-11'),
    ('오즈어그웨어 어덜트 스쿠페트 슬리퍼','406', 139000, 'WOMAN', '상품 설명', 2, '2023-11-11'),
    ('커스텀에이드 코만도 워커','406', 86800, 'WOMAN', '상품 설명', 2, '2023-11-11');

-- 패션소품
INSERT INTO item (item_name, category, price, pgender, item_detail, uid, reg_time)
VALUES
    ('조셉앤스테이시 에코백','501', 19000, 'WOMAN', '상품 설명', 2, '2023-11-11'),
    ('에스에스알엘 듀얼 포켓 백팩','501', 69000, 'WOMAN', '상품 설명', 2, '2023-11-11'),
    ('리끌로우 안경','503', 24900, 'WOMAN', '상품 설명', 2, '2023-11-11'),
    ('비브이에이치 선글라스','503', 29200, 'WOMAN', '상품 설명', 2, '2023-11-11'),
    ('비에프엘 아날로그 수능시계','502', 19000, 'WOMAN', '상품 설명', 2, '2023-11-11'),
    ('이세이 미야케 SILAN001','502', 536000, 'WOMAN', '상품 설명', 2, '2023-11-11'),
    ('도프제이슨 미니멀 스퀘어 벨트','504', 54000, 'WOMAN', '상품 설명', 2, '2023-11-11'),
    ('지오다노 베이직 레더 벨트','504', 39000, 'WOMAN', '상품 설명', 2, '2023-11-11'),
    ('비자르 주얼리 바로크 진주 목걸이','505', 145000, 'WOMAN', '상품 설명', 2, '2023-11-11'),
    ('클레멍스 주얼리 라이픈 프루츠 실버링','505', 68000, 'WOMAN', '상품 설명', 2, '2023-11-11');


INSERT INTO item_img (file_path, item_id, represent)
values
    ('/resources/static/img/1/main/detail_3471407_16933801249965_500.jpg',1, 'main'),
    ('/resources/static/img/1/detailed/3471407_16933801180003_500.jpg',1, 'detailed'),

    ('/resources/static/img/2/main/detail_3457284_16916462085353_60.jpg',2, 'main'),
    ('/resources/static/img/2/detailed/KakaoTalk_20231109_215349121.jpg',2, 'detailed'),

    ('/resources/static/img/3/main/detail_1288192_16921776392986_60.jpg',3, 'main'),
    ('/resources/static/img/3/detailed/1288192_16921776280835_60.jpg',3, 'detailed'),

    ('/resources/static/img/4/main/3493308_16928520201814_500.jpg',4, 'main'),
    ('/resources/static/img/4/detailed/KakaoTalk_20231109_215603270.jpg',4, 'detailed'),

    ('/resources/static/img/5/main/1421004_2_60.jpg',5, 'main'),
    ('/resources/static/img/5/detailed/KakaoTalk_20231109_215814291.jpg',5, 'detailed'),

    ('/resources/static/img/6/main/2086653_1_60.jpg',6, 'main'),
    ('/resources/static/img/6/detailed/detail_3339075_16856010296698_500.jpg',6, 'detailed'),

    ('/resources/static/img/7/main/detail_2309517_8_60.jpg',7, 'main'),
    ('/resources/static/img/7/detailed/detail_3308778_16890381149581_500.jpg',7, 'detailed'),

    ('/resources/static/img/8/main/2170163_1_60.jpg',8, 'main'),
    ('/resources/static/img/8/detailed/KakaoTalk_20231109_214853601.jpg',8, 'detailed'),

    ('/resources/static/img/9/main/3467143_16946722273730_60.jpg',9, 'main'),
    ('/resources/static/img/9/detailed/detail_3467143_16928621905156_60.jpg',9, 'detailed'),

    ('/resources/static/img/10/main/3482985_16926173934045_500.png',10, 'main'),
    ('/resources/static/img/10/detailed/detail_3482985_16926174176461_big.png',10, 'detailed'),

    ('/resources/static/img/11/main/3471407_16933801180003_60.jpg',11, 'main'),
    ('/resources/static/img/11/detailed/detail_3471407_16933801249965_60.jpg',11, 'detailed'),

    ('/resources/static/img/12/main/2712339_16916400901807_60.jpg',12, 'main'),
    ('/resources/static/img/12/detailed/detail_2706665_2_big.jpg',12, 'detailed'),

    ('/resources/static/img/13/main/3464265_16921746160868_60.jpg',13, 'main'),
    ('/resources/static/img/13/detailed/tie_sh_wh_02_1.jpg',13, 'detailed'),

    ('/resources/static/img/14/main/3222963_16817991152687_500.jpg',14, 'main'),
    ('/resources/static/img/14/detailed/detail_3222963_16811842528569_big.jpg',14, 'detailed'),

    ('/resources/static/img/15/main/3457284_16916461931402_500.jpg',15, 'main'),
    ('/resources/static/img/15/detailed/KakaoTalk_20231109_215349121.jpg',15, 'detailed'),

    ('/resources/static/img/16/main/3571792_16953717480655_500.png',16, 'main'),
    ('/resources/static/img/16/detailed/detail_3571792_16953717554485_500.png',16, 'detailed'),

    ('/resources/static/img/17/main/detail_3339075_16856010277288_60.jpg',17, 'main'),
    ('/resources/static/img/17/detailed/detail_3339075_16856010286640_60.jpg',17, 'detailed'),

    ('/resources/static/img/18/main/3308778_16890381100706_60.jpg',18, 'main'),
    ('/resources/static/img/18/detailed/detail_2086653_22_500.jpg',18, 'detailed'),

    ('/resources/static/img/19/main/3461979_16917376578056_60.jpg',19, 'main'),
    ('/resources/static/img/19/detailed/detail_3083811_16764250961938_500.jpg',19, 'detailed'),

    ('/resources/static/img/20/main/2170163_1_500.jpg',20, 'main'),
    ('/resources/static/img/20/detailed/2021101410171600000040978.jpg',20, 'detailed'),

    ('/resources/static/img/21/main/3509931_16934828920527_60.jpg',21, 'main'),
    ('/resources/static/img/21/detailed/detail_2351467_1_500.jpg',21, 'detailed'),

    ('/resources/static/img/22/main/3577885_16981300319059_60.jpg',22, 'main'),
    ('/resources/static/img/22/detailed/detail_2150457_4_500.jpg',22, 'detailed'),

    ('/resources/static/img/23/main/2730626_1_60.jpg',23, 'main'),
    ('/resources/static/img/23/detailed/detail_2059078_16969904260415_60.jpg',23, 'detailed'),

    ('/resources/static/img/24/main/2653651_16993345595367_60.jpg',24, 'main'),
    ('/resources/static/img/24/detailed/2653637_16981913630018_500.jpg',24, 'detailed'),

    ('/resources/static/img/25/main/3539143_16941551580080_60.jpg',25, 'main'),
    ('/resources/static/img/25/detailed/3539140_16941551866676_big.jpg',25, 'detailed'),

    ('/resources/static/img/26/main/3558386_16953840296956_60.jpg',26, 'main'),
    ('/resources/static/img/26/detailed/detail_2100442_11_500.jpg',26, 'detailed'),

    ('/resources/static/img/27/main/3072390_16945658227692_60.jpg',27, 'main'),
    ('/resources/static/img/27/detailed/2023102411415200000057624.jpg',27, 'detailed'),

    ('/resources/static/img/28/main/1778404_1_60.jpg',28, 'main'),
    ('/resources/static/img/28/detailed/2023062110354200000062849.jpg',28, 'detailed'),

    ('/resources/static/img/29/main/2361183_1_60.jpg',29, 'main'),
    ('/resources/static/img/29/detailed/2772377_1_big.jpg',29, 'detailed'),

    ('/resources/static/img/30/main/3005484_16728054297615_60.jpg',30, 'main'),
    ('/resources/static/img/30/detailed/detail_3627704_16977194177089_big.jpg',30, 'detailed'),

    ('/resources/static/img/31/main/2154553_1_60.jpg',31, 'main'),
    ('/resources/static/img/31/detailed/detail_2154553_5_big.jpg',31, 'detailed'),

    ('/resources/static/img/32/main/2700037_2_60.jpg',32, 'main'),
    ('/resources/static/img/32/detailed/detail_2626660_7_500.jpg',32, 'detailed'),

    ('/resources/static/img/33/main/3417474_16909467843075_60.jpg',33, 'main'),
    ('/resources/static/img/33/detailed/solrano_bk_02.jpg',33, 'detailed'),

    ('/resources/static/img/34/main/3585578_16953413094883_60.jpg',34, 'main'),
    ('/resources/static/img/34/detailed/3585577_16953413037353_500.jpg',34, 'detailed'),

    ('/resources/static/img/35/main/2140335_9_60.jpg',35, 'main'),
    ('/resources/static/img/35/detailed/detail_2140335_5_500.jpg',35, 'detailed'),

    ('/resources/static/img/36/main/2952716_1_60.jpg',36, 'main'),
    ('/resources/static/img/36/detailed/detail_2952716_2_big.jpg',36, 'detailed'),

    ('/resources/static/img/39/main/1970571_1_60.jpg',37, 'main'),
    ('/resources/static/img/39/detailed/detail_1970571_1_big.jpg',37, 'detailed'),

    ('/resources/static/img/40/main/3191978_16801112725946_60.jpg',38, 'main'),
    ('/resources/static/img/40/detailed/detail_3191978_16801112832425_500.jpg',38, 'detailed'),

    ('/resources/static/img/41/main/3610046_16965788554574_60.jpg',39, 'main'),
    ('/resources/static/img/41/detailed/2023100616550500000072486.jpg',39, 'detailed'),

    ('/resources/static/img/42/main/2884490_1_60.jpg',40, 'main'),
    ('/resources/static/img/42/detailed/2884490_1_big.jpg',40, 'detailed'),

    ('/resources/static/img/43/main/2444955_1_60.jpg',41, 'main'),
    ('/resources/static/img/43/detailed/KakaoTalk_20231109_222423466.jpg',41, 'detailed'),

    ('/resources/static/img/44/main/2030531_1_60.jpg',42, 'main'),
    ('/resources/static/img/44/detailed/detail_2018669_29_500.jpg',42, 'detailed'),

    ('/resources/static/img/45/main/65208_1_60.jpg',43, 'main'),
    ('/resources/static/img/45/detailed/2020072614562000000017260.jpg',43, 'detailed'),

    ('/resources/static/img/46/main/1480943_3_60.jpg',44, 'main'),
    ('/resources/static/img/46/detailed/detail_1480943_3_big.jpg',44, 'detailed'),

    ('/resources/static/img/47/main/detail_1717611_2_60.jpg',45, 'main'),
    ('/resources/static/img/47/detailed/1717611_2_big.jpg',45, 'detailed'),

    ('/resources/static/img/48/main/1129750_1_60.jpg',46, 'main'),
    ('/resources/static/img/48/detailed/497858_6_500.jpg',46, 'detailed'),

    ('/resources/static/img/49/main/3547871_16956257284572_60.jpg',47, 'main'),
    ('/resources/static/img/49/detailed/detail_3547834_16956265658471_big.jpg',47, 'detailed'),

    ('/resources/static/img/50/main/1128656_1_60.jpg',48, 'main'),
    ('/resources/static/img/50/detailed/detail_2113397_3_500.jpg',48, 'detailed'),

    ('/resources/static/img/51/main/1580216_16792775908166_60.jpg',49, 'main'),
    ('/resources/static/img/51/detailed/detail_2948129_16855811773768_500.jpg',49, 'detailed'),

    ('/resources/static/img/52/main/1564324_1_60.jpg',50, 'main'),
    ('/resources/static/img/52/detailed/detail_1564324_10_500.jpg',50, 'detailed'),

    ('/resources/static/img/53/main/1515680_16975932356396_60.jpg',51, 'main'),
    ('/resources/static/img/53/detailed/detail_1515680_16975931907429_500.jpg',51, 'detailed'),

    ('/resources/static/img/54/main/2064798_1_60.jpg',52, 'main'),
    ('/resources/static/img/54/detailed/detail_1496749_1_500.jpg',52, 'detailed'),

    ('/resources/static/img/55/main/2208843_1_60.jpg',53, 'main'),
    ('/resources/static/img/55/detailed/7005F.jpg',53, 'detailed'),

    ('/resources/static/img/56/main/3402906_16890533855419_60.jpg',54, 'main'),
    ('/resources/static/img/56/detailed/SILAN001.jpg',54, 'detailed'),

    ('/resources/static/img/57/main/1648533_2_60.jpg',55, 'main'),
    ('/resources/static/img/57/detailed/KakaoTalk_20231109_231734696.jpg',55, 'detailed'),

    ('/resources/static/img/58/main/1961481_1_60.jpg',56, 'main'),
    ('/resources/static/img/58/detailed/KakaoTalk_20231109_231734696_01.jpg',56, 'detailed'),

    ('/resources/static/img/59/main/detail_1169561_2_60.jpg',57, 'main'),
    ('/resources/static/img/59/detailed/KakaoTalk_20231109_231734696_02.jpg',57, 'detailed'),

    ('/resources/static/img/60/main/detail_1827591_3_60.jpg',58, 'main'),
    ('/resources/static/img/60/detailed/KakaoTalk_20231109_231734696_03.jpg',58, 'detailed');


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
