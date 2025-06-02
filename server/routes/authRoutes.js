import express from 'express';
import {connectToDatabase} from '../lib/db.js';
import bcrypt from 'bcrypt';
const router =express.Router()

router.post('/register', async (req, res) =>{
    const{username , email , password} = req.body;
    console.log(username)
    try{
        const db= await connectToDatabase();
        console.log('db connected');
         const [rows] = await db.query('SELECT * from users WHERE email = ?', [email])
         console.log('email check rows:', rows)
         if(rows.length > 0) {
            return res.status(409).json({message: 'user already exists'});
         }

         const hashedPassword = await bcrypt.hash(password, 10);
         await db.query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
             [username, email , hashedPassword]
            );

        res.status(201).json({ message: "user created successfully"})
    } catch(err){
        console.error('internal error', err)
        res.status(500).json(err)
    }
})

export default router;  