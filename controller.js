const pool = require("./db").pool;
const queries = require("./queries");
const MD5 = require("crypto-js/md5");
const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = "tfglit774rt98oo[0opilhbyxsetwex46ucvobou%$RTOIBHJT&DFUYGkyw876y23";

const signUp = async(req,res) => {
    try{
      flag = true;
      console.log("Post request for inserting data",req.body);
      const {username,first_name,last_name,email_id,password,cpassword} = req.body;

      if(username === '' || typeof username !== 'string'){
        flag = false;
        res.status(404).json({"status":"failed","msg":"Invalid username."});
      }
      else if(username.length < 5){
        flag = false;
        res.status(404).json({"status":"failed","msg":"Username must contain 5 character."});
      }
      else if(first_name === '' || typeof first_name !== 'string'){
        flag = false;
        res.status(404).json({"status":"failed","msg":"Please provide proper firstname."});
      }
      else if(last_name === '' || typeof last_name !== 'string'){
        flag = false;
        res.status(404).json({"status":"failed","msg":"Please provide proper lastname."});
      }
      else if(email_id === '' || typeof email_id !== 'string' || !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email_id))){
        flag = false;
        res.status(404).json({"status":"failed","msg":"Please provide proper email ID."});
      }
      else if(password === '' || typeof password !== 'string' || password.length < 8){
        flag = false;
        res.status(404).json({"status":"failed","msg":"Please provide proper confirm password, must be atleast 8 char."});
      }
      else if(cpassword === '' || typeof cpassword !== 'string' || cpassword.length < 8){
        flag = false;
        res.status(404).json({"status":"failed","msg":"Please provide proper confirm password, must be atleast 8 char."});
      }
      else if(password !== cpassword ){
        flag = false;
        res.status(404).json({"status":"failed","msg":"Password did not match."});
      }
      else{
        if(flag){
          const chackUsername = await pool.query(queries.chackUsername,[username]);
            if(chackUsername.rowCount > 0){
              flag = false;
              res.status(404).json({"status":"failed","msg":"Username already exist."});
            }
        }
        if(flag){
          console.log('email')
          const chackemail = await pool.query(queries.chackemail,[email_id])
            if(chackemail.rowCount > 0){
              console.log('email1',flag)
              flag = false;
              console.log('email2',flag)
              res.status(404).json({"status":"failed","msg":"Email already exist."});
            }
        }
        if(flag){
          console.log('signupQuery',flag)
          const signupQuery = await pool.query(queries.signupQuery,[username,first_name,last_name,email_id,MD5(password).toString()],
            (error, results) => { 
              if (error) throw error;
              res.status(200).json({"status":"success","msg":"Sign up completed successfully!..","results":results});
            })
        }
        else{
          res.status(404).json({"status":"failed","msg":"Internal error!"});
        }
      }
    }
    catch(err){
      console.log("Error: ",err.message)
      res.status(404).json({"status":"failed","msg":"Internal error!"});
    }
  };


  const login = async(req,res)=>{
    try {
      console.log("Post request for user login.");
      const {username,password}=req.body;

      if(username === '' || typeof username !== 'string' || username.length < 5){
        res.status(404).json({"status":"failed","msg":"Invalid username."});
      }

      if(password === '' || typeof password !== 'string' || password.length < 8){
        res.status(404).json({"status":"failed","msg":"Please provide proper confirm password, must be atleast 8 char"});
      }

    //   const bcryptpassword = await bcrypt.hash(password,5);
    //   console.log(bcryptpassword);
      const loginUserQuery = await pool.query(queries.loginUserQuery,[username]);

      if(loginUserQuery.rowCount > 0){
        const id = loginUserQuery.rows[0]['id']
        const loginQuery = await pool.query(queries.loginQuery,[id,username,MD5(password).toString()]);
        if(loginQuery.rowCount > 0){

            const jwtToken = jwt.sign({
                id: loginQuery.rows[0]['id'],
                username:loginQuery.rows[0]['username'],
                first_name:loginQuery.rows[0]['first_name'],
                last_name:loginQuery.rows[0]['last_name'],
                email_id:loginQuery.rows[0]['email_id'],
            },
            JWT_SECRET_KEY
            );
            console.log('jwtToken',jwtToken);
            res.status(200).json({data:jwtToken,"userData":loginQuery.rows});
        }
        else{
            res.status(404).json({"status":"failed","msg":"Incorrect password!"});
        }
      }
      else{
        res.status(404).json({"status":"failed","msg":"Incorrect username/email id!"});
      }
    } catch (err) {
      console.log("Error: ",err.message)
      res.status(404).json({"status":"failed","msg":"Internal error!"});
    }
  };


  const changepassword = async(req,res)=>{
    const {token,oldpassword,password,cpassword} = req.body;
    try {
      flag = true;
      const user_token = jwt.verify(token,JWT_SECRET_KEY);
      console.log('user data',user_token);
      const id = user_token.id;

      if(oldpassword === '' || typeof oldpassword !== 'string' ){
        flag = false;
        res.status(404).json({"status":"failed","msg":"Please provide proper old password."});
      }
      else if(password === '' || typeof password !== 'string' || password.length < 8){
        flag = false;
        res.status(404).json({"status":"failed","msg":"Please provide proper password."});
      }
      else if(cpassword === '' || typeof cpassword !== 'string' || password.length < 8){
        flag = false;
        res.status(404).json({"status":"failed","msg":"Please provide proper confirm password."});
      }
      else if(password !== cpassword ){
        flag = false;
        res.status(404).json({"status":"failed","msg":"Password did not match."});
      }
      else{
        if(flag){
          console.log('signupQuery',flag)
          const changepassQuery = await pool.query(queries.changepassQuery,[MD5(password).toString(),id],
            (error, results) => { 
              if (error) throw error;
              res.status(200).json({"status":"success","msg":"Password reset successfully!..","results":results});
            })
        }
        else{
          res.status(404).json({"status":"failed","msg":"Internal error!"});
        }
      }

    } catch (error) {
      console.log("Error: ",err.message)
      res.status(404).json({"status":"failed","msg":"Internal error!"});
    }

    

  };
  
  module.exports={
    signUp,
    login,
    changepassword
  }