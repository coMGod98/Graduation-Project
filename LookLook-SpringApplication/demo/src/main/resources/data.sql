-- 회원 테이블에 관리자 계정 1번으로
INSERT INTO users (uid, username, userid, userpw, authority)
VALUES (1, 'admin', 'admin0000', '$2a$10$Naqxf0wgmdyA9Q4YHZaeM.Fwwp14ZlN3YOfwY92Gi9v9NQyEQ/yj.', 'ROLE_ADMIN');

INSERT INTO users (uid, username, userid, userpw, authority, email, pnumber, sex, address)
VALUES (2, 'testuser', 'testuser0000', '$2a$10$Naqxf0wgmdyA9Q4YHZaeM.Fwwp14ZlN3YOfwY92Gi9v9NQyEQ/yj.', 'ROLE_USER', 'test123@looklook.com', '01012345678', 'MALE', '경기도 성남시');



-- 상품 테이블
--남성
INSERT INTO item(item_name, category, stock, price, pgender, item_detail, uid)
VALUES ('솔리드 오버핏 옥스포드 타이셔츠','101',3, 49000, 'MAN', '오버핏 셔츠', 2);
INSERT INTO item(item_name, category, stock, price, pgender, item_detail, uid)
VALUES ('브렌슨 오버핏 셔츠','101',3, 31000, 'MAN', '상품 설명', 2);
INSERT INTO item(item_name, category, stock, price, pgender, item_detail, uid)
VALUES ('메쉬 그래픽 니트','102',3, 53000, 'MAN', '상품 설명', 2);
INSERT INTO item(item_name, category, stock, price, pgender, item_detail, uid)
VALUES ('프레젠트 박스 니트','102',3, 43000, 'MAN', '상품 설명', 2);
INSERT INTO item(item_name, category, stock, price, pgender, item_detail, uid)
VALUES ('로버스트 헤비 오버핏 반팔티셔츠','103',3, 23000, 'MAN', '상품 설명', 2);
INSERT INTO item(item_name, category, stock, price, pgender, item_detail, uid)
VALUES ('레이어드 크루넥 반팔 티셔츠','103',3, 20000, 'MAN', '상품 설명', 2);
INSERT INTO item(item_name, category, stock, price, pgender, item_detail, uid)
VALUES ('셀비 쓰리버튼 울 수트','104',3, 69000, 'MAN', '상품 설명', 2);
INSERT INTO item(item_name, category, stock, price, pgender, item_detail, uid)
VALUES ('유니온 라운지 자켓','104',3, 81000, 'MAN', '상품 설명', 2);
INSERT INTO item(item_name, category, stock, price, pgender, item_detail, uid)
VALUES ('와이드 데님 팬츠','105',3, 69000, 'MAN', '상품 설명', 2);
INSERT INTO item(item_name, category, stock, price, pgender, item_detail, uid)
VALUES ('미드 라이즈 와이드 진','105',3, 62000, 'MAN', '상품 설명', 2);
INSERT INTO item(item_name, category, stock, price, pgender, item_detail, uid)
--여성
VALUES ('유희 크롭 셔츠','201',5, 23000, 'WOMAN', '상품 설명', 2);
INSERT INTO item(item_name, category, stock, price, pgender, item_detail, uid)
VALUES ('제로스트릿 타이 블라우스','201',5, 21000, 'WOMAN', '상품 설명', 2);
INSERT INTO item(item_name, category, stock, price, pgender, item_detail, uid)
VALUES ('밀리언코르 로고 자수 니트 집업','202',5, 54000, 'WOMAN', '상품 설명', 2);
INSERT INTO item(item_name, category, stock, price, pgender, item_detail, uid)
VALUES ('썸플레이스 그래픽 오버핏 풀오버 울 니트','202',5, 38000, 'WOMAN', '상품 설명', 2);
INSERT INTO item(item_name, category, stock, price, pgender, item_detail, uid)
VALUES ('사라21 숏슬리브','203',5,29000, 'WOMAN', '상품 설명', 2);
INSERT INTO item(item_name, category, stock, price, pgender, item_detail, uid)
VALUES ('해피니스 러블리 패치 슬림 핏 티셔츠','203',5, 21000, 'WOMAN', '상품 설명', 2);
INSERT INTO item(item_name, category, stock, price, pgender, item_detail, uid)
VALUES ('다크 유니언 워시 데님 팬츠','204',5, 39000, 'WOMAN', '상품 설명', 2);
INSERT INTO item(item_name, category, stock, price, pgender, item_detail, uid)
VALUES ('슬림 부츠컷 데님 팬츠','204',5, 43000, 'WOMAN', '상품 설명', 2);
INSERT INTO item(item_name, category, stock, price, pgender, item_detail, uid)
VALUES ('트리닝버드 코듀로이 미니스커트','205',5, 59000, 'WOMAN', '상품 설명', 2);
INSERT INTO item(item_name, category, stock, price, pgender, item_detail, uid)
VALUES ('레더 바이커 스커트','205',5, 32000, 'WOMAN', '상품 설명', 2);
INSERT INTO item(item_name, category, stock, price, pgender, item_detail, uid)
VALUES ('칸디니 네이비 집업 플레어 원피스','206',5, 54000, 'WOMAN', '상품 설명', 2);
INSERT INTO item(item_name, category, stock, price, pgender, item_detail, uid)
VALUES ('아모멘토 아노락 드레스','206',5, 54000, 'WOMAN', '상품 설명', 2);
--아우터
INSERT INTO item(item_name, category, stock, price, pgender, item_detail, uid)
VALUES ('케이투 씬에어 숏패딩','301',5, 321000, 'WOMAN', '상품 설명', 2);
INSERT INTO item(item_name, category, stock, price, pgender, item_detail, uid)
VALUES ('데일리 푸퍼 리버서블 플리스 숏패딩','301',5, 149000, 'WOMAN', '상품 설명', 2);
INSERT INTO item(item_name, category, stock, price, pgender, item_detail, uid)
VALUES ('울 부클 카라 가디건','302',5, 89000, 'WOMAN', '상품 설명', 2);
INSERT INTO item(item_name, category, stock, price, pgender, item_detail, uid)
VALUES ('넘버링 자카드 니트 집업 가디건','302',5, 71000, 'WOMAN', '상품 설명', 2);
INSERT INTO item(item_name, category, stock, price, pgender, item_detail, uid)
VALUES ('샤이닝 스타 집업','303',5, 59000, 'WOMAN', '상품 설명', 2);
INSERT INTO item(item_name, category, stock, price, pgender, item_detail, uid)
VALUES ('토피 스웻 후드 집업','303',5, 39000, 'WOMAN', '상품 설명', 2);
INSERT INTO item(item_name, category, stock, price, pgender, item_detail, uid)
VALUES ('모즈모즈 어깨자수 오버핏 투웨이 후드집업','303',5, 39900, 'WOMAN', '상품 설명', 2);
INSERT INTO item(item_name, category, stock, price, pgender, item_detail, uid)
VALUES ('로제프란츠 울 맥시 코트','304',5, 129000, 'WOMAN', '상품 설명', 2);
INSERT INTO item(item_name, category, stock, price, pgender, item_detail, uid)
VALUES ('아이스가든에이오공팔 벨 슬리브 코트','304',5, 119000, 'WOMAN', '상품 설명', 2);
INSERT INTO item(item_name, category, stock, price, pgender, item_detail, uid)
VALUES ('멜란지마스터 울 오버핏 싱글 코트','304',5, 89000, 'WOMAN', '상품 설명', 2);
INSERT INTO item(item_name, category, stock, price, pgender, item_detail, uid)
VALUES ('라퍼지스토어 솔라노 윈드 자켓','305',5, 43800, 'WOMAN', '상품 설명', 2);
INSERT INTO item(item_name, category, stock, price, pgender, item_detail, uid)
VALUES ('에즈카톤 스카이 라이트 자켓','305',5, 48900, 'WOMAN', '상품 설명', 2);
INSERT INTO item(item_name, category, stock, price, pgender, item_detail, uid)
VALUES ('플레이스 스튜디오 비건 레더 오버핏 블루종','306',5, 89000, 'WOMAN', '상품 설명', 2);
INSERT INTO item(item_name, category, stock, price, pgender, item_detail, uid)
VALUES ('아비렉스 에이징 렘스킨 라이더 자켓','306',5, 78000, 'WOMAN', '상품 설명', 2);
INSERT INTO item(item_name, category, stock, price, pgender, item_detail, uid)
VALUES ('썸플레이스 울 더블 카라 스웨트 숏 무스탕','307',5, 129000, 'WOMAN', '상품 설명', 2);
INSERT INTO item(item_name, category, stock, price, pgender, item_detail, uid)
VALUES ('라인 스튜디오 원 하이넥 레더 무스탕','307',5, 109000, 'WOMAN', '상품 설명', 2);
--신발
INSERT INTO item(item_name, category, stock, price, pgender, item_detail, uid)
VALUES ('더브라운 정장화','401',5, 87200, 'WOMAN', '상품 설명', 2);
INSERT INTO item(item_name, category, stock, price, pgender, item_detail, uid)
VALUES ('버튼서울 플렝니 토 더비 슈즈','401',5, 179000, 'WOMAN', '상품 설명', 2);
INSERT INTO item(item_name, category, stock, price, pgender, item_detail, uid)
VALUES ('커스텀에이드 라운드토 힐','402',5, 58000, 'WOMAN', '상품 설명', 2);
INSERT INTO item(item_name, category, stock, price, pgender, item_detail, uid)
VALUES ('제메타 스카이 퍼 메리제인 힐','402',5, 89000, 'WOMAN', '상품 설명', 2);
INSERT INTO item(item_name, category, stock, price, pgender, item_detail, uid)
VALUES ('스노우피크 필드 토 슈즈','403',5, 59000, 'WOMAN', '상품 설명', 2);
INSERT INTO item(item_name, category, stock, price, pgender, item_detail, uid)
VALUES ('끌로에 로엔 발레리나 플렛 슈즈','403',5, 78000, 'WOMAN', '상품 설명', 2);
INSERT INTO item(item_name, category, stock, price, pgender, item_detail, uid)
VALUES ('스베이퍼 멀티카모 아웃도어 샌들','404',5, 39000, 'WOMAN', '상품 설명', 2);
INSERT INTO item(item_name, category, stock, price, pgender, item_detail, uid)
VALUES ('우포스 클로그','404',5, 59000, 'WOMAN', '상품 설명', 2);
INSERT INTO item(item_name, category, stock, price, pgender, item_detail, uid)
VALUES ('디스커버리 샌들','405',5, 39000, 'WOMAN', '상품 설명', 2);
INSERT INTO item(item_name, category, stock, price, pgender, item_detail, uid)
VALUES ('우포스 샌들','405',5, 69000, 'WOMAN', '상품 설명', 2);
INSERT INTO item(item_name, category, stock, price, pgender, item_detail, uid)
VALUES ('오즈어그웨이','406',5, 139000, 'WOMAN', '상품 설명', 2);
INSERT INTO item(item_name, category, stock, price, pgender, item_detail, uid)
VALUES ('커스텀에이드','406',5, 86800, 'WOMAN', '상품 설명', 2);
--패션소품
INSERT INTO item(item_name, category, stock, price, pgender, item_detail, uid)
VALUES ('마리페 에코백','501',5, 19000, 'WOMAN', '상품 설명', 2);
INSERT INTO item(item_name, category, stock, price, pgender, item_detail, uid)
VALUES ('에스에스알엘','501',5, 69000, 'WOMAN', '상품 설명', 2);
INSERT INTO item(item_name, category, stock, price, pgender, item_detail, uid)
VALUES ('리끌로우 안경','503',5, 24900, 'WOMAN', '상품 설명', 2);
INSERT INTO item(item_name, category, stock, price, pgender, item_detail, uid)
VALUES ('원브릘리언트 선글라스','503',5, 28000, 'WOMAN', '상품 설명', 2);
INSERT INTO item(item_name, category, stock, price, pgender, item_detail, uid)
VALUES ('비에프엘 아날로그 수능시계','502',5, 19000, 'WOMAN', '상품 설명', 2);
INSERT INTO item(item_name, category, stock, price, pgender, item_detail, uid)
VALUES ('이세이 미야케','502',5, 536000, 'WOMAN', '상품 설명', 2);
INSERT INTO item(item_name, category, stock, price, pgender, item_detail, uid)
VALUES ('도프제이슨 미니멀 스퀘어 벨트','504',5, 54000, 'WOMAN', '상품 설명', 2);
INSERT INTO item(item_name, category, stock, price, pgender, item_detail, uid)
VALUES ('지오다노 베이직 레더 벨트','504',5, 39000, 'WOMAN', '상품 설명', 2);
INSERT INTO item(item_name, category, stock, price, pgender, item_detail, uid)
VALUES ('비자르 주얼리 바로크 진주 목걸이','505',5, 145000, 'WOMAN', '상품 설명', 2);
INSERT INTO item(item_name, category, stock, price, pgender, item_detail, uid)
VALUES ('플레멍스 주얼리 라이픈 프루츠 실버링','505',5, 68000, 'WOMAN', '상품 설명', 2);

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