const signupQuery = "INSERT INTO user_tbl (username,first_name,last_name,email_id,password) values ($1,$2,$3,$4,$5)";
const loginUserQuery = "SELECT id FROM user_tbl WHERE username = $1 OR email_id = $1";
const loginQuery = "SELECT id, username, first_name, last_name, email_id FROM user_tbl WHERE id = $1 AND (username = $2 OR email_id = $2) AND password = $3";
const chackUsername = "SELECT username FROM user_tbl WHERE username = $1";
const chackemail = "SELECT email_id FROM user_tbl WHERE email_id = $1";
const changepassQuery = "UPDATE user_tbl SET password = $1 WHERE id = $2";
module.exports={
    signupQuery,
    loginUserQuery,
    loginQuery,
    chackUsername,
    chackemail,
    changepassQuery
}