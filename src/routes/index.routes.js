import {  Router } from "express";
import {readTable} from "../database";

const router = Router()

router.get("/", (req, res) => {
    res.json("Hello world!");
});

router.get("/table/:table", async (req, res) => {
    const table = req.params.table;

    var data = await readTable(table)
    
    res.json(data);

})

router.get("/create/table/:name/:yields",(req, res) =>{
    const name = req.params.name;
    const yields = req.params.yields;
    const final = yields.split(",");
    console.log(final);

    res.json({name:name, yields:final})


} )

router.get("/db", (req,res)=>{
    res.sendFile("fundrates.db", {root:"."});
})

export default router;