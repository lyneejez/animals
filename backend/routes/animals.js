const connection = require('../db/db');
const express = require("express")
const router = express.Router();


router.get("/", (req, res)=>{
    const sql =`
    SELECT
        a.*,
        c.name AS category,
        cl.name AS classification
    FROM animals a
    INNER JOIN classifications cl on cl.id = a.classification_id
    INNER JOIN categories c on c.id = a.category_id
    ORDER BY a.title
    `;

    return connection.query(sql, function(err,results){
        if(err){
            return res.status(400).json({error:err});
        }
        res.status(200).json(results)
    });
})

router.get("/:id", (req, res)=>{
    id = req.params.id
    const sql =`
     SELECT
        a.*,
        c.name AS category,
        cl.name AS classification
    FROM animals a
    INNER JOIN classifications cl on cl.id = a.classification_id
    INNER JOIN categories c on c.id = a.category_id
    WHERE a.id = ${id}
    ORDER BY a.title
    `;

    return connection.query(sql, function(err,results){
        if(err){
            return res.status(400).json({error:err});
        }
        res.status(200).json(results)
    });
})

router.post("/create", (req, res)=> {
    const{title,category_id,classification_id} =req.body;
    const sql= `INSERT INTO animals(title,category_id,classification_id) VALUES ('${title}', '${category_id}', '${classification_id}');`;
    console.log({body: req.body})
    console.log({sql})
        return connection.query(sql, function(err,results){
            if(err){
                return res.status(400).json({error:err});
            }
            res.status(200).json(results)
        });
 })

 router.patch("/:id/edit", (req, res) => {
    const animals = req.body;
    const updateColumns = Object.entries(animals).map(a =>{
        const [column,value] = a
        return `${column} = '${value}'`;
    });

    const sql = `UPDATE animals SET ${updateColumns.join (',')} WHERE id = ${req.params.id}`;
// console.log({sql})
    connection.query(sql, function(err, results) {
        if (err) {
            return res.status(400).json({ error: err });
        }
        res.status(200).json(results);
    });
})



router.delete("/:id", (req, res)=>{
    const sql=`DELETE FROM animals WHERE id=${req.params.id}`
        return connection.query(sql, function(err,results){
            if(err){
                return res.status(400).json({error:err});
            }
            res.status(200).json(results)
        });
})
   
    
    
module.exports = router