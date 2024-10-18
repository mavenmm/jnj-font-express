const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Set up CORS to allow requests only from onetrust.com
app.use(
  cors({
    origin: /\.onetrust\.com$/,
  })
);

// Serve font files from the 'fonts' directory
app.use("/font", express.static(path.join(__dirname, "fonts")));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
