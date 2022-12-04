import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  console.log("Hello customers");
  res.send("Hello customers");
});

export default router;
