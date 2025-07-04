import express from "express"
import cors from "cors"
import dotenv from "dotenv";
import path from "path"

import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./cofig/db.js";
import rateLimiter from "./middlewares/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001
const __dirname=path.resolve();

// ye req ko access kerne mai kaam ayega controller mai create notes function mai
if(process.env.NODE_ENV !=="production"){
app.use(cors({
  origin:"http://localhost:5173"
}));
}
app.use(express.json());
app.use(rateLimiter);


app.use("/api/notes",notesRoutes);

if(process.env.NODE_ENV ==="production"){
app.use(express.static(path.join(__dirname,"../Frontend/dist")))

app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"../Frontend","dist","index.html"));
})
}

connectDB().then(()=>{
  app.listen(PORT,()=>{
    console.log("Server is running on PORT :",PORT);
  })
})
