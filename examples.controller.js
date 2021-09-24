const pool = require("./db").pool;
const queries = require("./example.queries");

const getAllUser = async(req,res)=>{
    try {
      console.log("Get request to show all data from user_tbl.");
      const allUsers = await pool.query(queries.getAllUser);
      if(allUsers.rowCount > 0){
        res.status(200).json(allUsers.rows);
      }
      else{
        res.status(404).json({"status":"failed","msg":"No data found!"});
      }
    } catch (err) {
      console.log("Error: ",err.message)
      res.status(404).json({"status":"failed","msg":"Internal error!"});
    }
  };

  const postSingleUserByUsername = async(req,res)=>{
    try {
      console.log("Post request to show all data of single user from user_tbl.");
      const {username}=req.body;
      const singleUsers = await pool.query(queries.getSingleUserByUsername,[username]);
      if(singleUsers.rowCount > 0){
        res.status(200).json(singleUsers.rows);
      }
      else{
        res.status(404).json({"status":"failed","msg":"No data found!"});
      }
    } catch (err) {
      console.log("Error: ",err.message)
      res.status(404).json({"status":"failed","msg":"Internal error!"});
    }
  };

  const getSingleUserByUsername = async(req,res)=>{
    try {
      console.log("Get request to show all data of single user from user_tbl.");
      const {username}=req.params;
      const singleUsers = await pool.query(queries.getSingleUserByUsername,[username]);
      if(singleUsers.rowCount > 0){
        res.status(200).json(singleUsers.rows);
      }
      else{
        res.status(404).json({"status":"failed","msg":"No data found!"});
      }
    } catch (err) {
      console.log("Error: ",err.message)
      res.status(404).json({"status":"failed","msg":"Internal error!"});
    }
  };

  const updateUserById = async(req,res)=>{
    try {
      console.log("put request to updating the user from user_tbl.");
      const {id}=req.params;
      const {username,password}=req.body;
      const updateQuery = await pool.query(queries.updateUserById,[id,username,MD5(password).toString()]);
      if(updateQuery.rowCount > 0){
        res.status(200).json(updateQuery.rows);
      }
      else{
        res.status(404).json({"status":"failed","msg":"No data found!"});
      }
    } catch (err) {
      console.log("Error: ",err.message)
      res.status(404).json({"status":"failed","msg":"Internal error!"});
    }
  };

  const deleteUserById = async(req,res)=>{
    try {
      console.log("Delete request to deleting the user from user_tbl.");
      const {id}=req.params;
      const deleteQuery = await pool.query(deleteUserById,[id]);
      res.status(200).json({"status":"success","msg":"user deleted from table."});
    } catch (err) {
      console.log("Error: ",err.message)
      res.status(404).json({"status":"failed","msg":"Internal error!"});
    }
  };

module.exports = {
    getAllUser,
    postSingleUserByUsername,
    getSingleUserByUsername,
    updateUserById,
    deleteUserById
};