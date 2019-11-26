const express = require("express");
const labRoute = express.Router();

//http://localhost:3000/
labRoute.get("/", (req, res) => {
  res.send("it lives!");
});

const cartItems= [
  { id: 1, product: "cookies", price: 2, quanitiy: 10 },
  { id: 2, product: "candy", price: 1, quanitiy: 2 },
  { id: 3, product: "soda", price: 1, quanitiy: 10 },
  { id: 4, product: "ham", price: 6, quanitiy: 11 },
  { id: 5, product: "bread", price: 2, quanitiy: 6 },
  { id: 6, product: "water", price: 1, quanitiy: 7 },
  { id: 7, product: "potato", price: 3, quanitiy: 5 }
];

let nextId = 8;

//displays cart items with /cartItems
labRoute.get("/cartItems", (req, res) => {
  res.json(cartItems);
});

//displays cart item when calling for Id# /cartItems/4
labRoute.get("/cartItems/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log(id);
  let founditem = cartItems.find(aItem => aItem.id === id);
  if (founditem) {
    res.json(founditem);
  } else {
    res.status(404); // not found
    res.send(`no item with id ${id}`);
  }
});


//adds  "post" new items to cartitems with Postman
labRoute.post("/cartItems", (req, res) => {
  const item = req.body;
item.id = nextId;
  nextId++;
  cartItems.push(item);

  res.status(201);
  res.json(item);
});


//edit items with postman "Put"
labRoute.put("/cartItems/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const item = req.body;
    cartItems.id = id;
    // Find Index by ID
    const index = cartItems.findIndex(i => i.id === id);
    // Replace at index
    cartItems.splice(index, 1, item);
    res.json(item);
  });




//removes items with Postman "delete"

  
labRoute.delete("/cartItems/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = cartItems.findIndex(i => i.id === id);
    // If found...
    if (index !== -1) {
        cartItems.splice(index, 1);
    }
    // Set response code to 204. Send no content.
    res.sendStatus(204);
  });



//make it possible to access fish route in other places
module.exports = labRoute;
