import { query } from 'express';
import { pool } from '../db.js';

export const getTargeta = async (req, res) => {
    const id = req.params.id
    try{
        const [rows] = await pool.query("SELECT * FROM tarjetas WHERE Tarjeta_Id = ?",[id]);
        res.status(rows.length < 1 ? 404:200).json(rows.length < 1 ? {Message:"Tarjeta Not Found"}:rows);
    }catch (e){
        return res.status(500).send({message:'Error: problemas en el servidor, intentelo más tarde'});
    } 
}
export const getTargetas = async (req, res) => {
    try{
        const [rows] = await pool.query("SELECT * FROM tarjetas");
        res.status(rows.length < 1 ? 404:200).json(rows.length < 1 ? {Message:"Tarjeta Not Found"}:rows);
    }catch (e){
        return res.status(500).send({message:'Error: problemas en el servidor, intentelo más tarde'});
    } 
}
export const addTargeta = async (req, res) => {
    const {Producto, Usuario_Id, Numero_Tarjeta, Codigo_Tarjeta, Nombre_De_Cliente, Precio, Cantidad_De_Producto, Fecha_De_Inicio} = req.body;
    const values = [Producto, Usuario_Id, Numero_Tarjeta, Codigo_Tarjeta, Nombre_De_Cliente, Precio, Cantidad_De_Producto, Fecha_De_Inicio];
    try{
        const [rows] = await pool.query('INSERT INTO tarjeta (Producto, Usuario_Id, Numero_Tarjeta, Codigo_Tarjeta, Nombre_De_Cliente, Precio, Cantidad_De_Producto, Fecha_De_Inicio) VALUES (?, ?, ?, ?, ?, ?, ?, ?);',values);
        res.send({id:rows.insertId});
    }catch (e){
        return res.status(500).send({message:'Error: problemas en el servidor, intentelo más tarde'});
    } 
}
export const updateTargeta = async (req, res) => {
    const {Producto, Usuario_Id, Numero_Tarjeta, Codigo_Tarjeta, Nombre_De_Cliente, Precio, Cantidad_De_Producto, Fecha_De_Inicio} = req.body;
    const id = req.params.id
    const values = [Producto, Usuario_Id, Numero_Tarjeta, Codigo_Tarjeta, Nombre_De_Cliente, Precio, Cantidad_De_Producto, Fecha_De_Inicio,id];
    let query =  `  UPDATE tarjeta SET 
                    Producto             = IFNULL(?,Producto),
                    Usuario_Id           = IFNULL(?,Usuario_Id),
                    Numero_Tarjeta       = IFNULL(?,Numero_Tarjeta),
                    Codigo_Tarjeta       = IFNULL(?,Codigo_Tarjeta ),
                    Nombre_De_Cliente    = IFNULL(?,Nombre_De_Cliente),
                    Precio               = IFNULL(?,Precio ),
                    Cantidad_De_Producto = IFNULL(?,Cantidad_De_Producto),
                    Fecha_De_Inicio      = IFNULL(?,Fecha_De_Inicio) 
                    WHERE   (Tarjeta_Id = ? );`;

    try{
        const [result] = await pool.query(query,values);
        if(result.affectedRows <= 0 ) return res.status(404).send({message:'Tarjeta not found'});
        const [rows] = await pool.query("SELECT * FROM tarjetas WHERE Tarjeta_Id = ?",[id]);
        res.json(rows[0]);
    }catch (e){
        return res.status(500).send({message:'Error: problemas en el servidor, intentelo más tarde'});
    } 
}
export const deleteTargeta = async (req, res) => {
    try{
        const [result] = await pool.query('UPDATE tarjeta SET Eliminado = 1 WHERE (Tarjeta_Id = ?);',[req.params.id])
        return res.status(result.affectedRows <= 0 ? 404:204).send(result.affectedRows <= 0 ? "tarjeta not found":"")
        res.send("Tarjeta deleted")
    }catch (e){
        return res.status(500).send({message:'Error: problemas en el servidor, intentelo más tarde'});
    } 
}