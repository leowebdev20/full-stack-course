import express from "express";
import { multiplicator } from "./multiplier";

const app = express();
app.use(express.json());

app.get("/ping", (_req, res) => {
  res.send("pooong");
});
app.post("/calculate", (req, res) => {
  const { value1, value2, op } = req.body;
  const result = multiplicator(value1, value2, op);
  res.send({ result });
});
const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
