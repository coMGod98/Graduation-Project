CREATE TABLE item (
                      item_id BIGINT NOT NULL,
                      item_detail LONGTEXT NOT NULL,
                      item_nm VARCHAR(255) NOT NULL,
                      price INTEGER NOT NULL,
                      stock_number INTEGER NOT NULL,
                      item_sell_status VARCHAR(255),
                      update_time DATETIME,
                      reg_time DATETIME,
                      PRIMARY KEY (item_id)
) ENGINE=InnoDB;