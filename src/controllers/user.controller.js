import { pool } from '../db.js';

export const addManager = async (req, res) => {
    const {username,email,password} = req.body
    const data = [username, email, password]
    try {
        const [rows] = await pool.query('INSERT INTO users (type_user, username, email, password) VALUES ("manager",?,?,sha(?))',data);
        res.send({id:rows.insertId});  
    } catch (error) {
        return res.status(500).send({error:error.message});
    }
    
   
}