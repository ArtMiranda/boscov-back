import express from "express";
import errorHandler from "./infrastructure/http/Error.middleware";
import userRoutes from "./presentation/routes/User.routes";
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors(
  {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }
));

app.use("/user", userRoutes);

app.use(errorHandler);

app.listen(3333, () => {
  console.log("Server running on port 3333");
});
