const express = require("express");
const mongoose = require("mongoose");
const open = require("open");
const path = require("path");
const app = express();
const PORT = 3000;
const Food = require("./models/schema");

require("dotenv").config();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("public"));

// Connect DB
mongoose
  .connect(
    "mongodb+srv://hv04090_db_user:EgoOKMfN0FCuUlW4@cluster0.dqnyl0f.mongodb.net/diabeticDB?retryWrites=true&w=majority",
  )
  .then(() => {
    console.log("DB connected ✅");
  })
  .catch((err) => console.log(err));


  app.get("/", (req, res) => {
  res.render("index.html");
});


app.get("/vegetables", async (req, res) => {
  try {
    // 1. Get page from URL (default = 1)
    let page = parseInt(req.query.page) || 1;

    // 2. Set limit (items per page)
    let limit = 5;

    // 3. Calculate skip
    let skip = (page - 1) * limit;

    // 4. Fetch paginated data (category = vegetable)
    const foods = await Food.find({ category: "vegetable" })
      .skip(skip)
      .limit(limit);

    // 5. Count total documents
    const total = await Food.countDocuments({ category: "vegetable" });

    // 6. Render with extra data
    res.render("vegetables", {
      foods,
      currentPage: page,
      totalPages: Math.ceil(total / limit)
    });

  } catch (err) {
    console.log(err);
    res.send("Error loading vegetables");
  }
});

app.get("/fruits", async (req, res) => {
  try {
    // 1. Get page from URL (default = 1)
    let page = parseInt(req.query.page) || 1;

    // 2. Set limit (items per page)
    let limit = 5;
    // 3. Calculate skip
    let skip = (page - 1) * limit;

    // 4. Fetch paginated data
    const foods = await Food.find({ category: "fruit" })
      .skip(skip)
      .limit(limit);

    // 5. Count total documents
    const total = await Food.countDocuments({ category: "fruit" });

    // 6. Render with extra data
    res.render("fruits", {
      foods,
      currentPage: page,
      totalPages: Math.ceil(total / limit)
    });

  } catch (err) {
    console.log(err);
    res.send("Error loading fruits");
  }
});



app.listen(PORT, async () => {
  console.log("Server running on port 3000");
  await open(`http://localhost:${PORT}`);
});


