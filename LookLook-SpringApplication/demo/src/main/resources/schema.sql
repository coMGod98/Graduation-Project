CREATE TABLE USERS (
                       UID BIGINT AUTO_INCREMENT PRIMARY KEY,
                       USERNAME VARCHAR(255),
                       USERID VARCHAR(255) UNIQUE,
                       USERPW VARCHAR(255),
                       AUTHORITY VARCHAR(255),
                       SEX VARCHAR(255),
                       PNUMBER VARCHAR(255),
                       ADDRESS VARCHAR(255),
                       EMAIL VARCHAR(255)
);
