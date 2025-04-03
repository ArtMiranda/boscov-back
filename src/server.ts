import express from "express";
import { setupSwagger } from "./config/swagger";
import errorMiddleware from "./infrastructure/http/error.middleware";
import authRoutes from "./presentation/routes/auth/auth.routes";
import userRoutes from "./presentation/routes/user/user.routes";
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

setupSwagger(app);

app.use(errorMiddleware);

app.listen(3333, () => {
  console.log("Server running on port 3333");
});
