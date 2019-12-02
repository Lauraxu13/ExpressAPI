  
CREATE TABLE shopping_cart (
	id SERIAL PRIMARY KEY,
	product VARCHAR(40),
	price SMALLINT,
    quanity SMALLINT
);

INSERT INTO shopping_cart (product, price, quanity)
VALUES ('coffee', 3, 5), 
('tuna', 2,10), 
('catFood', 6,4),
('apple', 1,20);