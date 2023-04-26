import { pool } from '../db.js';
//------------------- pagos por fecha ---------------------
// pagos en la semana
export const weeklyPayments = async (req, res) => { // monto de pagos en la semana
    const manager_id = req.user.user_id;
    
    const [rows] = await pool.query("SELECT * FROM weekly_payments where manager_id = ?;",[manager_id]);
    res.status(rows.length < 1 ? 404:200).json(rows.length < 1 ? {Message:"Sin registros"}:rows);
}
export const weeklyCustomerPayments = async (req, res) => { //clientes que pagaron en la semana
    const manager_id = req.user.user_id;
    
    const [rows] = await pool.query("SELECT * FROM weekly_customer_payments where manager_id = ?;",[manager_id]);
    res.status(rows.length < 1 ? 404:200).json(rows.length < 1 ? {Message:"Sin registros"}:rows);
}
export const weeklyCustomerNotPayments = async (req, res) => { //clientes que pagaron en la semana
    const manager_id = req.user.user_id;
    
    const [rows] = await pool.query("SELECT * FROM weekly_customer_payments where manager_id = ?;",[manager_id]);
    
   
            let [notPaymentLogs] = await pool.query("SELECT * FROM payment_logs_view where user_id = ?;", [manager_id] )
            for (const registro of rows ){
                notPaymentLogs = notPaymentLogs.filter(word => word.payment_logs_id != registro.payment_logs_id);
            }
                
            if(notPaymentLogs < 1 ){
                res.status(404).json({Message:rows});
            }else{
                res.json(notPaymentLogs);
            }
        
}
export const paymentsGroupedByDays = async (req, res) => { //monto de pagos agrupado en dias
    const {dateType,month,year} = req.params;
    const manager_id = req.user.user_id;
    if(!dateType){
        res.status(404).json({Message:"Se requiere dateType"})  
    }else{
        let rows
        if (dateType=='month'){
            if(!month)      return res.status(404).json({Message:"Se requiere month"}) ;
            if(!year)       return res.status(404).json({Message:"Se requiere year"}) ;
            rows = await pool.query( "SELECT * FROM payments_grouped_by_days where month(payment_date) = ? AND year(payment_date) = ? AND manager_id = ?;",[month,year,manager_id]); 
        }else if (dateType=='year'){
            if(!year)       return res.status(404).json({Message:"Se requiere year"}) ;
            rows = await pool.query( "SELECT * FROM payments_grouped_by_days where year(payment_date) = ? AND manager_id = ?;",[year,manager_id]);
        }else if (dateType=='all'){
            rows = await pool.query("SELECT * FROM payments_grouped_by_days where manager_id = ?;", [manager_id]);
        }else{
            res.status(404).json({Message:"dateType : ("+dateType+") no valido. Opciones: month, year, all"}) 
        }
        rows = rows[0];
        res.status(rows.length < 1 ? 404:200).json(rows.length < 1 ? {Message:"Sin registros"}:rows);
    
    }
    
}
export const paymentsGroupedByMonth = async (req, res) => { //monto de pagos agrupado en meses
    const {dateType,year} = req.params;
    const manager_id = req.user.user_id;
    if(!dateType){
        res.status(404).json({Message:"Se requiere dateType"})  
    }else{
        let rows
        if (dateType=='year'){
            if(!year)       return res.status(404).json({Message:"Se requiere year"}) ;
            
            rows = await pool.query( "SELECT * FROM payments_grouped_by_month where year(payment_date) = ? AND manager_id = ?;",[year,manager_id]);
        }else if (dateType=='all'){
            
            rows = await pool.query("SELECT * FROM payments_grouped_by_days where manager_id = ?;", [manager_id]);
        }else{
            res.status(404).json({Message:"dateType : ("+dateType+") no valido. Opciones: year, all"}) 
        }
        rows = rows[0];
        res.status(rows.length < 1 ? 404:200).json(rows.length < 1 ? {Message:"Sin registros"}:rows);
    
    }
    
}
export const customerWhoPaid = async (req, res) => { //lista de usuarios que han pagado
    const {dateType,month,year} = req.params;
    const manager_id = req.user.user_id;
    try{
    if(!dateType){
        res.status(404).json({Message:"Se requiere dateType"})  
    }else{
        let rows
        if (dateType=='month'){
            if(!month)      return res.status(404).json({Message:"Se requiere month"}) ;
            if(!year)       return res.status(404).json({Message:"Se requiere year"}) ;
            
            rows = await pool.query("SELECT * FROM customer_who_paid where month(payment_date)=? AND year(payment_date) = ? AND manager_id = ?;",[month,year,manager_id]); 
        }else if (dateType=='year'){
            if(!year)       return res.status(404).json({Message:"Se requiere year"}) ;
            
            rows = await pool.query("SELECT * FROM customer_who_paid where year(payment_date) = ? AND manager_id = ?;",[year,manager_id]);
        }else if (dateType=='all'){
            
            rows = await pool.query("SELECT * FROM customer_who_paid where manager_id = ?;", [manager_id]);
        }else{
            res.status(404).json({Message:"dateType : ("+dateType+") no valido. Opciones: month, year, all"}) 
        }
        rows = rows[0];
        res.status(rows.length < 1 ? 404:200).json(rows.length < 1 ? {Message:"Sin registros"}:rows);
    
    }
}catch (e){
    return res.status(500).send({error:e.message});
} 
}
export const customerWhoNotPaid = async (req, res) => { //lista de usuarios que han pagado
    const {dateType,month,year} = req.params;
    const manager_id = req.user.user_id;
    try{
    if(!dateType){
        res.status(404).json({Message:"Se requiere dateType"})  
    }else{
        let rows
        if (dateType=='month'){
            if(!month)      return res.status(404).json({Message:"Se requiere month"}) ;
            if(!year)       return res.status(404).json({Message:"Se requiere year"}) ;
            rows = await pool.query("SELECT * FROM customer_who_paid where month(payment_date)=? AND year(payment_date) = ? AND manager_id = ?;",[month,year,manager_id]); 
        }else if (dateType=='year'){
            if(!year)       return res.status(404).json({Message:"Se requiere year"}) ;
            
            rows = await pool.query("SELECT * FROM customer_who_paid where year(payment_date) = ? AND manager_id = ?;",[year,manager_id]);
        }else if (dateType=='all'){
            
            rows = await pool.query("SELECT * FROM customer_who_paid where manager_id = ?;", [manager_id]);
        }else{
            res.status(404).json({Message:"dateType : ("+dateType+") no valido. Opciones: month, year, all"}) 
        }
            rows = rows[0];
            let [notPaymentLogs] = await pool.query("SELECT * FROM payment_logs_view where user_id = ?;", [manager_id] )
            for (const registro of rows ){
                notPaymentLogs = notPaymentLogs.filter(word => word.payment_logs_id != registro.payment_logs_id);
            }
            if(notPaymentLogs < 1 ){
                res.status(404).json({Message:rows});
            }else{
                res.json(notPaymentLogs);
            }
        
        
    }
}catch (e){
    return res.status(500).send({error:e.message});
} 
}
