const express = require("express");
const labRoute = express.Router();
const pool = require("./connecting");

//http://localhost:3000/
labRoute.get("/", (req, res) => {
  res.send("it lives!");
});

//displays cart items with /cartItems
labRoute.get("/cart-items", (req, res) => {
  let sql = "SELECT * FROM shopping_cart";
  pool.query(sql).then(result => {
    res.json(result.rows);
  });
});

//displays cart item when calling for Id# /cartItems/4
labRoute.get("/cart-items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let sql = "SELECT * FROM shopping_cart WHERE id = $1::int";
  let params = [id];
  pool.query(sql, params).then(result => {
    // if the array is not empty...
    if (result.rows.length !== 0) {
      // send the first (and only) row
      res.json(result.rows[0]);
    } else {
      // else not found
      res.status(404);
      res.send("No such Item.");
    }
  });
});

//adds  "post" new items to cartitems with Postman
labRoute.post("/cart-items", (req, res) => {
  const item = req.body;

  // added "RETURNING *" in order to get the newly created row
  let sql = `INSERT INTO shoppping_cart (product, price, quantity)
  VALUES ($1::TEXT, $2::INT, $3::INT) RETURNING *`;
  let params = [item.product, item.price, item.quantity];
  pool.query(sql, params).then(result => {
    res.status(201);
    res.json(result.rows[0]);
  });
});

cartRoutes.put("/cart-items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = req.body;
  let sql =
    "UPDATE shopping_cart SET product=$1::TEXT, price=$2::INT, quantity=$3::INT WHERE id=$4::INT RETURNING *";
  let params = [item.product, item.price, item.quantity, id];
  pool.query(sql, params).then(result => {
    res.json(result.rows[0]);
  });
});
cartRoutes.delete("/cart-items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let sql = "DELETE FROM shopping_cart WHERE id=$1::INT";
  let params = [id];
  pool.query(sql, params).then(result => {
    res.sendStatus(204);
  });
});

module.exports = labRoute;
