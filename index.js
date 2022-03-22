const express = require("express");
const request = require("request-promise");

const app = express();
const PORT = process.env.PORT || 5000;

const apiKey = "e41c88df35c52167a29a7072c0ac10c6";
const baseUrl = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Amazon Scraper api by Abdo");
});

// GET Product Details
app.get("/products/:productId", async (req, res) => {
  const { productId } = req.params;

  try {
    const response = await request(
      `${baseUrl}&url=http://www.amazon.com/dp/${productId}`
    );
    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});



// GET Product Reviews
 
 app.get("/products/:productId/reviews", async (req, res) => {
   const { productId } = req.params;
 
   try {
     const response = await request(
       `${baseUrl}&url=http://www.amazon.com/product-reviews/${productId}`
     );
     res.json(JSON.parse(response));
   } catch (error) {
     res.json(error);
   }
 });
 

 // GET  Product offers
 app.get("/products/:productId/offers", async (req, res) => {
  const { productId } = req.params;

  try {
    const response = await request(
      `${baseUrl}&url=http://www.amazon.com/gp/offer-listing/${productId}`
    );
    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
