import { pool } from '../db.js';
// --------------- sistema de CRUD --------------------
export const getPayment = async (req, res) => {
    const id = req.params.id
    const [rows] = await pool.query("SELECT * FROM payments_view WHERE payment_logs_id = ?",[id]);
    if(rows.length >= 1){
        let [price] = await pool.query("SELECT * FROM payment_logs_view WHERE payment_logs_id = ?",[id]);
        price = price[0].price;
        let price1= price - (price *0.4)
        let price3= price - (price *0.3)  
        rows.map(obj => {
            price = price-obj.payment < 0 ? 0:price-obj.payment ;
            price1 = price1-obj.payment < 0 ? 0:price1-obj.payment ;
            price3 = price3-obj.payment < 0 ? 0:price3-obj.payment ;
            Object.assign(obj,{"price_": price,"price_1":price1,"price_3":price3})
        })
    }
    
    res.status(rows.length < 1 ? 404:200).json(rows.length < 1 ? {Message:"Tarjeta Not Found"}:rows)
}
export const withCodeGetPayment = async (req, res) => {
    const code = req.params.code
    const [rows] = await pool.query("SELECT * FROM payments_view WHERE payment_logs_code = binary ?",[code]);
    if(rows.length >= 1){
        let [price] = await pool.query("SELECT * FROM payment_logs_view WHERE payment_logs_code = binary ?",[code]);
        price = price[0].price;
        let price1= price - (price *0.4)
        let price3= price - (price *0.3)  
        rows.map(obj => {
            price = price-obj.payment < 0 ? 0:price-obj.payment ;
            price1 = price1-obj.payment < 0 ? 0:price1-obj.payment ;
            price3 = price3-obj.payment < 0 ? 0:price3-obj.payment ;
            Object.assign(obj,{"price_": price,"price_1":price1,"price_3":price3})
        })
    }
   
    
    res.status(rows.length < 1 ? 404:200).json(rows.length < 1 ? {Message:"Tarjeta Not Found"}:rows)
}
export const getPayments = async (req, res) => {
    const [rows] = await pool.query("SELECT * FROM payments_view;")
    //res.status(rows.length < 1 ? 404:200).json(rows.length < 1 ? {Message:"Pago Not Found"}:rows);
    res.json(rows);
}
export const addPayment = async (req, res) => {
    const {payment_logs_id, payment, payment_date} = req.body;
    const values = [payment_logs_id, payment, payment_date];
    const [rows] = await pool.query('INSERT INTO payments (payment_logs_id, payment, payment_date) VALUES (?, ?, ?);',values);
    res.send({id:rows.insertId});
}
export const updatePayment = async (req, res) => {
    const id = req.params.id
    const {payment, payment_date} = req.body;
    const values = [ payment, payment_date,id];
    const query =  `UPDATE payments SET payment = IFNULL(?,payment), payment_date = IFNULL(?,payment_date) WHERE (payment_id = ?);`;
    const [result] = await pool.query(query,values);

    if(result.affectedRows <= 0 ) return res.status(404).send({message:'Pago not found'});
    const [rows] = await pool.query("SELECT * FROM payments_view WHERE payment_id = ?",[id]);
    res.json(rows[0]);
}
export const deletePayment = async (req, res) => {
    const [result] = await pool.query('DELETE FROM payments WHERE (payment_id = ?)',[req.params.id])
    return res.status(result.affectedRows <= 0 ? 404:204).send(result.affectedRows <= 0 ? "Pago not found":"")
}
export const getPaymentList = async (req, res) => {
    const id = req.params.id
    const [rows] = await pool.query("SELECT * FROM payments WHERE payment_logs_id = ?",[id]);
    res.status(rows.length < 1 ? 404:200).json(rows.length < 1 ? {Message:"Tarjeta Not Found"}:rows)
}
