// require("dotenv").config();

// const express = require("express");
// const mongoose = require("mongoose");
// const path = require("path");

// const app = express();

// // ✅ Use dynamic port (IMPORTANT for deployment)
// const PORT = process.env.PORT || 3000;

// // ✅ Import model
// const Food = require("./models/schema");

// // ✅ View engine setup
// app.set("views", path.join(__dirname, "public"));
// app.set("view engine", "ejs");

// // ✅ Static files
// app.use(express.static("public"));

// // ✅ MongoDB connection using ENV variable
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("DB connected ✅"))
//   .catch((err) => console.log(err));

// // ✅ Home route
// app.get("/", (req, res) => {
//   // If using HTML:
//   res.sendFile(path.join(__dirname, "public", "index.html"));

//   // 👉 OR if you convert to EJS:
//   // res.render("index");
// });

// // ✅ Vegetables route (with pagination)
// app.get("/vegetables", async (req, res) => {
//   try {
//     let page = parseInt(req.query.page) || 1;
//     let limit = 5;
//     let skip = (page - 1) * limit;

//     const foods = await Food.find({ category: "vegetable" })
//       .skip(skip)
//       .limit(limit);

//     const total = await Food.countDocuments({ category: "vegetable" });

//     res.render("vegetables", {
//       foods,
//       currentPage: page,
//       totalPages: Math.ceil(total / limit),
//     });
//   } catch (err) {
//     console.log(err);
//     res.send("Error loading vegetables");
//   }
// });

// // ✅ Fruits route (with pagination)
// app.get("/fruits", async (req, res) => {
//   try {
//     let page = parseInt(req.query.page) || 1;
//     let limit = 5;
//     let skip = (page - 1) * limit;

//     const foods = await Food.find({ category: "fruit" })
//       .skip(skip)
//       .limit(limit);

//     const total = await Food.countDocuments({ category: "fruit" });

//     res.render("fruits", {
//       foods,
//       currentPage: page,
//       totalPages: Math.ceil(total / limit),
//     });
//   } catch (err) {
//     console.log(err);
//     res.send("Error loading fruits");
//   }
// });

// // ✅ Start server (NO open package)
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


// const express = require("express");
// const mongoose = require("mongoose");
// const open = require("open");
// const path = require("path");
// const app = express();
// const PORT = 3000;
// const Food = require("./models/schema");

// require("dotenv").config();

// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");
// app.use(express.static("public"));

// // Connect DB
// mongoose
//   .connect(process.env.MONGO_URI)
//    .then(() => console.log("DB connected ✅"))
//    .catch((err) => console.log(err));


//   app.get("/", (req, res) => {
//   res.render("index.html");
// });


// app.get("/vegetables", async (req, res) => {
//   try {
//     // 1. Get page from URL (default = 1)
//     let page = parseInt(req.query.page) || 1;

//     // 2. Set limit (items per page)
//     let limit = 5;

//     // 3. Calculate skip
//     let skip = (page - 1) * limit;

//     // 4. Fetch paginated data (category = vegetable)
//     const foods = await Food.find({ category: "vegetable" })
//       .skip(skip)
//       .limit(limit);

//     // 5. Count total documents
//     const total = await Food.countDocuments({ category: "vegetable" });

//     // 6. Render with extra data
//     res.render("vegetables", {
//       foods,
//       currentPage: page,
//       totalPages: Math.ceil(total / limit)
//     });

//   } catch (err) {
//     console.log(err);
//     res.send("Error loading vegetables");
//   }
// });

// app.get("/fruits", async (req, res) => {
//   try {
//     // 1. Get page from URL (default = 1)
//     let page = parseInt(req.query.page) || 1;

//     // 2. Set limit (items per page)
//     let limit = 5;
//     // 3. Calculate skip
//     let skip = (page - 1) * limit;

//     // 4. Fetch paginated data
//     const foods = await Food.find({ category: "fruit" })
//       .skip(skip)
//       .limit(limit);

//     // 5. Count total documents
//     const total = await Food.countDocuments({ category: "fruit" });

//     // 6. Render with extra data
//     res.render("fruits", {
//       foods,
//       currentPage: page,
//       totalPages: Math.ceil(total / limit)
//     });

//   } catch (err) {
//     console.log(err);
//     res.send("Error loading fruits");
//   }
// });



// app.listen(PORT, async () => {
//   console.log("Server running on port 3000");
//   await open(`http://localhost:${PORT}`);
// });


require("dotenv").config(); // ✅ must be at top

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// ✅ Use dynamic port (IMPORTANT for Render)
const PORT = process.env.PORT || 3000;

// ✅ Import model
const Food = require("./models/schema");

// ✅ Static folder (fix for CSS, JS, images)
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// ✅ MongoDB connection (using env variable)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected ✅"))
  .catch((err) => console.log(err));

// ================= ROUTES =================

// ✅ Home route (serving HTML from public)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ✅ Vegetables route
app.get("/vegetables", async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let limit = 5;
    let skip = (page - 1) * limit;

    const foods = await Food.find({ category: "vegetable" })
      .skip(skip)
      .limit(limit);

    const total = await Food.countDocuments({ category: "vegetable" });

    res.render("vegetables", {
      foods,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.log(err);
    res.send("Error loading vegetables");
  }
});

// ✅ Fruits route
app.get("/fruits", async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let limit = 5;
    let skip = (page - 1) * limit;

    const foods = await Food.find({ category: "fruit" })
      .skip(skip)
      .limit(limit);

    const total = await Food.countDocuments({ category: "fruit" });

    res.render("fruits", {
      foods,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.log(err);
    res.send("Error loading fruits");
  }
});

// ================= SERVER =================

// ❌ removed "open" package (breaks deployment)
// ✅ simple server start
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});