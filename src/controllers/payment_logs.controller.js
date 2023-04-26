import { pool } from '../db.js';
//general
export const getPaymentLog = async (req, res) => {
    const id = req.params.id
    try{
        const [rows] = await pool.query("SELECT * FROM payment_logs_view WHERE payment_logs_id = ?",[id]);
        res.status(rows.length < 1 ? 404:200).json(rows.length < 1 ? {Message:"Tarjeta Not Found"}:rows);
    }catch (e){
        return res.status(500).send({error:e.message});
    } 
}

export const withCodeGetPaymentLog = async (req, res) => {
    const {code} = req.params;
    const arrayCode = code.split(".")
    const arraysInputs = code.split(".").fill("binary ?").join(",")
    console.log("SELECT * FROM payment_logs_view WHERE payment_logs_code in ("+arraysInputs+") "+arrayCode)
    try{
        const [rows] = await pool.query("SELECT * FROM payment_logs_view WHERE payment_logs_code in ("+arraysInputs+")",arrayCode);
        res.status(rows.length < 1 ? 404:200).json(rows.length < 1 ? {Message:"Tarjeta Not Found"}:rows);
    }catch (e){
        return res.status(500).send({error:e.message});
    } 
}

export const searchPaymentLog = async (req, res) => {
    const search = "%"+req.params.search+"%"
    
    try{
        const [rows] = await pool.query("SELECT * FROM payment_logs_view WHERE user_id = ? AND (payment_logs_num LIKE ? OR customer LIKE ?)",[req.user.user_id,search,search]);
        res.status(rows.length < 1 ? 404:200).json(rows.length < 1 ? {Message:"Tarjeta Not Found"}:rows);
    }catch (e){
        return res.status(500).send({error:e.message});
    } 
}
export const getPaymentLogs = async (req, res) => {
    try{
        console.log(req.user)
        const [rows] = await pool.query("SELECT * FROM payment_logs_view where user_id = ?",[req.user.user_id]);
        res.status(rows.length < 1 ? 404:200).json(rows.length < 1 ? {Message:"Tarjeta Not Found"}:rows);
    }catch (e){
        return res.status(500).send({error:e.message});
    } 
}
export const addPaymentLog = async (req, res) => {
    try {
        const large = 9;
        var map = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var payment_logs_code = '';
       
  
    for(let i = 0; i < large; i++) {
        payment_logs_code += map.charAt(Math.floor(Math.random() * map.length));
    }
        const {producto,  payment_logs_num,  customer, price, product_quantity, start_date_payment_logs} = req.body;
        const values = [producto, req.user.user_id, payment_logs_num, payment_logs_code, customer, price, product_quantity, start_date_payment_logs];
     
        const [rows] = await pool.query('INSERT INTO payment_logs (producto, user_id, payment_logs_num, payment_logs_code, customer, price, product_quantity, start_date_payment_logs)     VALUES (?,?,?,?,?,?,?,?);',values);
        res.send({id:rows.insertId});
    } catch (e) {
        return res.status(500).send({error:e.message});
    }
   
}
export const updatePaymentLog = async (req, res) => {
    const id = req.params.id
    const {producto, user_id, payment_logs_num, payment_logs_code, customer, price, product_quantity, start_date_payment_logs,finalized} = req.body;
    const values = [producto, user_id, payment_logs_num, payment_logs_code, customer, price, product_quantity, start_date_payment_logs,finalized,id];
    let query =  `  UPDATE payment_logs SET 
                    producto                  = IFNULL(?,producto),
                    user_id                   = IFNULL(?,user_id),
                    payment_logs_num          = IFNULL(?,payment_logs_num),
                    payment_logs_code         = IFNULL(?,payment_logs_code), 
                    customer                  = IFNULL(?,customer), 
                    price                     = IFNULL(?,price),
                    product_quantity          = IFNULL(?,product_quantity),
                    start_date_payment_logs   = IFNULL(?,start_date_payment_logs),
                    finalized                 = IFNULL(?,finalized) 
                    WHERE (payment_logs_id = ?);`;

    try{
        const [result] = await pool.query(query,values);
        if(result.affectedRows <= 0 ) return res.status(404).send({message:'Tarjeta not found'});
        const [rows] = await pool.query("SELECT * FROM payment_logs_view WHERE payment_logs_id = ?",[id]);
        res.json(rows[0]);
    }catch (e){
        return res.status(500).send({error:e.message});
    } 
}
export const deletePaymentLog = async (req, res) => {
    try{
        const [result2] = await pool.query('DELETE FROM payments WHERE (payment_logs_id = ?)',[req.params.id])
        const [result] = await pool.query('DELETE FROM payment_logs WHERE (payment_logs_id = ?);',[req.params.id])
        return res.status(result.affectedRows <= 0 ? 404:204).send(result.affectedRows <= 0 ? "tarjeta not found":"")
    }catch (e){
        return res.status(500).send({error:e.message});
    } 
}

//manager
export const getPaymentLogsManager= async (req, res) => {
    const id = req.params.id;
    try{

        const [rows] = await pool.query("SELECT * FROM payment_logs_view WHERE user_id = ? ",[id]);
        res.status(rows.length < 1 ? 404:200).json(rows.length < 1 ? {Message:"Tarjeta Not Found"}:rows);

    }catch (e){
        return res.status(500).send({error:e.message});
    } 
}