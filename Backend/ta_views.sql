CREATE OR REPLACE INDEX strid ON sales(store_id);
CREATE OR REPLACE INDEX pid ON sales(product_id);
CREATE OR REPLACE INDEX dates ON sales(date);

CREATE OR REPLACE TABLE calendar(d DATE PRIMARY KEY);

DELIMITER //
CREATE OR REPLACE PROCEDURE ALLDATES()
    DETERMINISTIC MODIFIES SQL DATA READS SQL DATA
BEGIN
    SET @startdate=(SELECT min(s.date) d FROM sales s);
    SET @enddate=(SELECT max(s.date) d FROM sales s);
    SET @cur = @startdate;
    CREATE OR REPLACE TABLE calendar(d DATE PRIMARY KEY);

    WHILE @cur < @enddate DO
        INSERT INTO calendar value (@cur);
        SET @cur=DATE_ADD(@cur, INTERVAL 1 DAY);
    END WHILE;
    INSERT INTO calendar value(@enddate);
END;//

DELIMITER ;
CALL ALLDATES();

CREATE OR REPLACE VIEW ta_d AS
    SELECT count(s.product_id) transaction, s.date
    FROM sales s
    GROUP BY s.date;

CREATE OR REPLACE VIEW ta_d_city AS
    SELECT count(s.product_id) transaction, s.date, sc.city_id
    FROM sales s
    RIGHT JOIN store_cities sc on s.store_id = sc.store_id
    GROUP BY sc.city_id, s.date;

CREATE OR REPLACE VIEW ta_d_store AS
    SELECT count(s.product_id) transaction, s.date, sc.store_id
    FROM sales s
    RIGHT JOIN store_cities sc on s.store_id = sc.store_id
    GROUP BY sc.store_id, s.date;

-- Product specific ta counters
CREATE OR REPLACE VIEW ta_d_pp_h1 AS
    SELECT count(s.product_id) transaction, s.date, p.hierarchy1_id AS h1_id
    FROM sales s
    JOIN product_hierarchy p
    ON s.product_id = p.product_id
    WHERE s.product_id = p.product_id
    GROUP BY s.date, p.hierarchy1_id;

CREATE OR REPLACE VIEW ta_d_pp_h2 AS
    SELECT count(s.product_id) transaction, s.date, p.hierarchy2_id AS h2_id
    FROM sales s
    JOIN product_hierarchy p
    ON s.product_id = p.product_id
    WHERE s.product_id = p.product_id
    GROUP BY s.date, p.hierarchy2_id;

CREATE OR REPLACE VIEW ta_d_pp_h3 AS
    SELECT count(s.product_id) transaction, s.date, p.hierarchy3_id AS h3_id
    FROM sales s
    JOIN product_hierarchy p
    ON s.product_id = p.product_id
    WHERE s.product_id = p.product_id
    GROUP BY s.date, p.hierarchy3_id;

CREATE OR REPLACE VIEW ta_d_pp_h4 AS
    SELECT count(s.product_id) transaction, s.date, p.hierarchy4_id AS h4_id
    FROM sales s
    JOIN product_hierarchy p
    ON s.product_id = p.product_id
    WHERE s.product_id = p.product_id
    GROUP BY s.date, p.hierarchy4_id;


CREATE OR REPLACE VIEW ta_d_pp_h5 AS
    SELECT count(s.product_id) transaction, s.date, p.hierarchy5_id AS h1_id
    FROM sales s
    JOIN product_hierarchy p
    ON s.product_id = p.product_id
    WHERE s.product_id = p.product_id
    GROUP BY s.date, p.hierarchy5_id;

-- per city
CREATE OR REPLACE VIEW ta_d_pp_h1_c AS
    SELECT count(*) transaction, s.date, p.hierarchy1_id as h1_id, c.city_id
    FROM sales s, product_hierarchy p, store_cities c
    WHERE s.product_id = p.product_id AND s.store_id = c.store_id
    GROUP BY s.date, p.hierarchy1_id, c.city_id;

CREATE OR REPLACE VIEW ta_d_pp_h2_c AS
    SELECT count(*) transaction, s.date, p.hierarchy2_id as h2_id, c.city_id
    FROM sales s, product_hierarchy p, store_cities c
    WHERE s.product_id = p.product_id AND s.store_id = c.store_id
    GROUP BY s.date, p.hierarchy1_id, c.city_id;

CREATE OR REPLACE VIEW ta_d_pp_h3_c AS
    SELECT count(*) transaction, s.date, p.hierarchy3_id as h3_id, c.city_id
    FROM sales s, product_hierarchy p, store_cities c
    WHERE s.product_id = p.product_id AND s.store_id = c.store_id
    GROUP BY s.date, p.hierarchy3_id, c.city_id;

CREATE OR REPLACE VIEW ta_d_pp_h4_c AS
    SELECT count(*) transaction, s.date, p.hierarchy4_id as h4_id, c.city_id
    FROM sales s, product_hierarchy p, store_cities c
    WHERE s.product_id = p.product_id AND s.store_id = c.store_id
    GROUP BY s.date, p.hierarchy4_id, c.city_id;

CREATE OR REPLACE VIEW ta_d_pp_h5_c AS
    SELECT count(*) transaction, s.date, p.hierarchy5_id as h5_id, c.city_id
    FROM sales s, product_hierarchy p, store_cities c
    WHERE s.product_id = p.product_id AND s.store_id = c.store_id
    GROUP BY s.date, p.hierarchy5_id, c.city_id;
