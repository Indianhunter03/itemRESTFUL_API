const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "Aadi0830",
  port: 5432,
});
var ids= Math.floor(Math.random(1700*(Math.random())));
var sku= 2*(ids+(Math.random())*1000);
sku=Math.floor(sku);
 console.log(ids+"   "+sku);
const createItem = (req, res) => {
  const {id, name,brand,sku,category,manufacturer,hsnCode,weight,dimension } = req.body;

  pool.query("INSERT INTO items ( id,name,brand,category,manufacturer,hsnCode,weight,dimension) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING * ",
    [id, name,brand,sku,category,manufacturer,hsnCode,weight,dimension],
    (err, result) => {
      if (err) {
        console.log(err);
        throw err;
      }

      res.status(200).json({
        
        data: result.rows[0]
      });
    }
  );
};


const getItems = (req,res) => {
    pool.query('SELECT * FROM items', (err,result) =>{
        if(err){
            throw err
        }

        res.json({
            data : result.rows
        })
    })
}
const getItemById = (request, response) => {
  
  const id = request.params.id;
  
 console.log('id is '+id)
  pool.query('SELECT * FROM Item WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const updateItem = (req,res) => {
  {
    const ids = request.params.id;
    const {id, name,brand,category,manufacturer,hsnCode,weight,dimension} = request.body
    console.log('id is '+ids)
  
    pool.query('update items set id=$1, name=$2, brand=$3, category=$4, manufactures=$5, hsncode=$6, weight=$9, dimension=$9',[id, name,brand,category,manufacturer,hsnCode,weight,dimension], (error,results)=>
    {
      if(error){
        throw error
      }
      response.status(200).send(`Item modified with ${ids}`)
    })
  }
  
    }




const deleteItems = (req,res) => {
    const id = parseInt(req.params.id)

    pool.query('DELETE FROM items WHERE id=$1',[id], (err,result) => {
        if(err){
            throw err
        }
        res.json({
            msg: `Employee with ${id} Deleted successfuly`
        })
    })
}

module.exports = {
    createItem, getItems,updateItem,deleteItems,getItemById
}