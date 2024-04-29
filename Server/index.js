import express from "express";
import cors from "cors";
import { generatePassword } from "./controller.js";
const app = express();

app.use(express.json());

const options = {
  origin: "http://localhost:5173",
  methods:["POst"]
};

app.use(cors(options));

app.post("/genaratepassword", generatePassword);

app.listen(3000, () => {
  console.log("server running")
});
