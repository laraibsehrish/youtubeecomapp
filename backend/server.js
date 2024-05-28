import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import morgan from 'morgan'
import authRoutes from './routes/authRoute.js'

//configure env
dotenv.config();

connectDB();
const app=express()
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use("/api/v1/auth", authRoutes);

app.get('/',(req,res)=>{
    res.send(
        {
            message: 'welcome to e commerce app'
        }
    )
})
//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});