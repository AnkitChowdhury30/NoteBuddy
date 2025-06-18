import express from "express"
import cors from "cors"
import dotenv from "dotenv";

import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./cofig/db.js";
import rateLimiter from "./middlewares/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001


// ye req ko access kerne mai kaam ayega controller mai create notes function mai
app.use(cors({
  origin:"http://localhost:5173"
}));
app.use(express.json());
app.use(rateLimiter);


app.use("/api/notes",notesRoutes);

connectDB().then(()=>{
  app.listen(PORT,()=>{
    console.log("Server is running on PORT :",PORT);
  })
})
