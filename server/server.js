import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import conn from './database/conn.js';
import route from './routes/AuthRouter.js';
const PORT=1001
const app=express()

app.use(express.json())
conn()
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));

app.use(route)
app.listen(PORT,()=>console.log(`server started on port number ${PORT}`))
