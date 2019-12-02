const express = require("express");
const cors = require("cors");
const labRoute= require("./route");


const app = express();
app.use(express.json());
app.use(cors());
app.use("/", labRoute);

const port = 3000;
app.listen(port, () => {
    console.log(`Server stared http://localhost:${port}`);
});