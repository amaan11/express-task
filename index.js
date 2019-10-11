import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import PrizeController from "./controllers/PrizeController";

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cors());
app.use(PrizeController);

const port = process.env.PORT || "8000";

app.listen(port);
