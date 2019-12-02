
const pool = require("./connecting");

let sql = "SELECT * FROM shopping_cart";
pool.query(sql).then(result => {
  console.log(result.rows);
});

function findById(id) {
  let sql = "SELECT * FROM shopping_cart WHERE id = $1::int";
  let params = [ id ];
  pool.query(sql, params).then(result => {
    console.log(result.rows);
  });
}
findById(2);

function addItem(item) {
  let sql = `INSERT INTO shopping_cart (product, price, quanitiy)
             VALUES ($1::TEXT, $2::INT, $3::INT)`;
  let params = [ item.product, item.price, item. quanity ];
  pool.query(sql, params).then(result => {
    console.log(result.rows);
  });
}
addItem({ product:"Tea", price:5 ,quanitiy:10 });