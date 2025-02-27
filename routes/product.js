var express = require("express");
var router = express.Router();

const products = {
    "products": [
        {
            "id": 11,
            "title": "perfume Oil",
            "price": 13
        },
        {
            "id": 12,
            "title": "Brown Perfume",
            "price": 40
        },
        {
            "id": 13,
            "title": "Fog Scent Xpressio Perfume",
            "price": 13
        },
        {
            "id": 14,
            "title": "Non-Alcoholic Concentrated Perfume Oil",
            "price": 120
        },
        {
            "id": 15,
            "title": "Eau De Perfume Spray",
            "price": 30
        },
        {
            "id": 16,
            "title": "Hyaluronic Acid Serum",
            "price": 19
        },
        {
            "id": 17,
            "title": "Tree Oil 30ml",
            "price": 12
        },
        {
            "id": 18,
            "title": "Oil Free Moisturizer 100ml",
            "price": 40
        },
        {
            "id": 19,
            "title": "Skin Beauty Serum.",
            "price": 46
        },
        {
            "id": 20,
            "title": "Freckle Treatment Cream- 15gm",
            "price": 70
        }
    ],
    "total": 100,
    "skip": 10,
    "limit": 10
}
 
  router.get('/', (req, res) => {
    res.json(products);
  });

module.exports = router;
