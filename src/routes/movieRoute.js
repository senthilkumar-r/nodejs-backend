import express from "express";
const router = express.Router();

// Sample movie data
const movies = [
  { id: 1, title: "Inception", director: "Christopher Nolan" },
  { id: 2, title: "The Matrix", director: "Lana Wachowski, Lilly Wachowski" },
];

router.get("/", (req, res) => {
  res.json(movies);
});

export default router;
