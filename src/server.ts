import express from "express";
import "reflect-metadata";
import { setupSwagger } from "./config/swagger";
import errorMiddleware from "./infrastructure/http/error.middleware";
import authRoutes from "./presentation/routes/auth/auth.routes";
import movieGenreRoutes from "./presentation/routes/movie-genre/movie-genre.routes";
import movieRoutes from "./presentation/routes/movie/movie.routes";
import reviewRoutes from "./presentation/routes/review/review.routes";
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
app.use("/api/genre", movieGenreRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/movie", movieRoutes);

setupSwagger(app);

app.use(errorMiddleware);

app.listen(3333, () => {
  console.log("Server running on port 3333");
});
