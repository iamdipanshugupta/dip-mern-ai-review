import express from "express";
import dotenv from "dotenv";
import router from "./router/routes.js";
import cors from "cors";   // ✅ add this

dotenv.config();
const app = express();

// ✅ Enable CORS for your frontend domain
app.use(cors({
  origin: "https://dip-mern-ai-review-1.onrender.com", 
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json());   
app.use("/ai", router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
