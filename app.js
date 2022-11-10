const express =require("express");
const app= express();
const dotenv= require("dotenv");
const dbitem=require("./product");
const { response } = require("express");
dotenv.config();
const PORT=3000;

app.use(express.json())
app.get("/",(req,res)=>{
    res.send("Hello my name is ADitya ")
})
app.post("/add",dbitem.createItem)
app.get("/all",dbitem.getItems)
app.get('/Item/:id',dbitem.getItemById)
app.put("/updateItem/:id",dbitem.updateItem)
app.delete("/deleteItem/:id",dbitem.deleteItems)
app.listen( PORT,()=>{
    console.log("SErVEr os Running "+`${PORT}`);
})