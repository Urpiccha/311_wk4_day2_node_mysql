const mysql = require("mysql");
const pool = require("../sql/connection");
const { handleSQLError } = require("../sql/error");

const getAllUsers = (req, res) => {
	// SELECT ALL USERS
	pool.query("SELECT * FROM users", (err, rows) => {
		if (err) return handleSQLError(res, err);
		return res.json(rows);
	});
};

const getUserById = (req, res) => {
	let sql = "SELECT * FROM users WHERE id = ?";
	sql = mysql.format(sql, [req.params.id]);
	pool.query(sql, (err, rows) => {
		if (err) return handleSQLError(res, err);
		return res.json(rows);
	});
};

const createUser = (req, res) => {
	let sql = "INSERT INTO users(first_name, last_name) VALUES (?, ?)";
	sql = mysql.format(sql, ["Bogus", "User"]);

	pool.query(sql, (err, results) => {
		if (err) return handleSQLError(res, err);
		return res.json({ newId: results.insertId });
	});
};

const updateUserById = (req, res) => {
	// UPDATE USERS AND SET FIRST AND LAST NAME WHERE ID = <REQ PARAMS ID>
	let sql = "UPDATE users SET first_name = ?, last_name = ? WHERE id = ?";
	// WHAT GOES IN THE BRACKETS
	sql = mysql.format(sql, [
		req.body.first_name,
		req.body.last_name,
		req.params.id
	]);

	pool.query(sql, (err, results) => {
		if (err) return handleSQLError(res, err);
		return res.status(204).json();
	});
};

const deleteUserByFirstName = (req, res) => {
	// DELETE FROM USERS WHERE FIRST NAME = <REQ PARAMS FIRST_NAME>
	let sql = "DELETE FROM users WHERE first_name = ?";
	// WHAT GOES IN THE BRACKETS
	sql = mysql.format(sql, ["newuser"]);

	pool.query(sql, (err, results) => {
		if (err) return handleSQLError(res, err);
		return res.json({ message: `Deleted ${results.affectedRows} user(s)` });
	});
};

module.exports = {
	getAllUsers,
	getUserById,
	createUser,
	updateUserById,
	deleteUserByFirstName
};
