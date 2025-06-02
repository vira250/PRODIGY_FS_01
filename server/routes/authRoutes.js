import express from 'express';
import {connectToDatabase} from '../lib/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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


router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt for email:', email);

  try {
    const db = await connectToDatabase();
    console.log('DB connected');

    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    console.log('Email check rows:', rows);

    if (rows.length === 0) {
      return res.status(401).json({ message: 'User does not exist' });
    }

    const isMatch = await bcrypt.compare(password, rows[0].password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: rows[0].id }, process.env.JWT_KEY, { expiresIn: '3h' });

    return res.status(200).json({ token: token });
  } catch (err) {
    console.error('Internal error', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const verifyToken = async(req, res, next) =>{
   try{
    const token = req.headers['authorization']?.split(" ")[1];
    if(!token){
        return res.status(403).json({message: 'Access denied. No token provided.'})
    }
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userId = decoded.id;
    next();
   } catch(err){
    return res.status(401).json({ message: 'No token, authorization denied' });
   }
}
router.get('/home' , verifyToken, async(req, res) =>{
    try{
        const db = await connectToDatabase();
        const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [req.userId]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'User does not exist' });
        }

        return res.status(201).json({user: rows[0]})
    } catch(err){
        return res.status(500).json({ message: 'Internal server error' });
    }
})

export default router;  