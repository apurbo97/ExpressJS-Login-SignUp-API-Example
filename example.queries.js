const getAllUser = "SELECT * FROM user_tbl";
const getSingleUserByUsername = "SELECT * FROM user_tbl where username = $1";
const updateUserById = "UPDATE user_tbl SET username = $2, password = $3 where id = $1 RETURNING *";
const deleteUserById = "DELETE FROM user_tbl WHERE id = $1"

module.exports = {
    getAllUser,
    getSingleUserByUsername,
    updateUserById,
    deleteUserById
};