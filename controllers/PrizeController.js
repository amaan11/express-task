import express from "express";
import { get, map } from "lodash";

const router = express.Router();
const fetch = require("node-fetch");

const _laureateurl = "http://api.nobelprize.org/v1/laureate.json";

const response = [];

const getLaureat = () => {
  return fetch(_laureateurl)
    .then(response => response.json())
    .then(response => {
      return response;
    })
    .catch(error => console("error"));
};

router.get("/prize", async (req, res, next) => {
  const query = get(req, "query", null);
  const laureats = await getLaureat();

  if (!query) {
    return res.status(500).json("QueryParam Cannot Be Empty");
  }
  const laureatResponse = laureats.laureates;

  if (Object.keys(laureatResponse).length > 0) {
    map(Object.keys(laureatResponse), laureat => {
      const singleLauret = laureatResponse[laureat];
      if (singleLauret.firstname.substring(query)) {
        const prizes = singleLauret.prizes;
        if (Object.keys(prizes).length > 0) {
          map(Object.keys(prizes), (key, index) => {
            const prizeRes = prizes[key];
            response.push({
              dob: singleLauret.born,
              countryWon: get(sinleLauret, "bornCountry", null),
              field: get(prizeRes, "category", null),
              year: get(prizeRes, "year", null)
            });
          });
        }
      }
    });
  }
  return res.status(200).json(response);
});

module.exports = router;
