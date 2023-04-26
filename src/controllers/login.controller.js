import { pool } from '../db.js';
import jwt  from "jsonwebtoken";
export const login = async (req, res) => {
    const {email,password} = req.body
    let rowsEmail;
    try {
         [rowsEmail] = await pool.query("SELECT * FROM users where email  = ?",[email]);
    }  catch (error) {
        return res.status(500).send({error:error.message});
    }
  
    if(rowsEmail.length > 0){
        let rowsPassword;
        try {
             [rowsPassword] = await pool.query("SELECT * FROM users where email = ? and password = sha(?)",[email,password]);
       
        }  catch (error) {
            return res.status(500).send({error:error.message});
        }
        
        if(rowsPassword.length > 0){
            const {user_id} = rowsPassword[0]
            const token = jwt.sign({user_id},"secret_pasword_mobemmanuel")
            res.json({text:"logeado",token});

        }else{
            res.status(404).json({text : "contraseña incorrecta"});
        }
    }else{
        res.status(404).json({text : "email no encontrado"});
    }
    
}