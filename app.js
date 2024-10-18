const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to log when .use is being used and check if the file exists
app.use("/fonts", (req, res, next) => {
  console.log(`Middleware used for path: ${req.path}`);

  // Correct the file path by removing the leading '/font' from req.path
  const filePath = path.join(
    __dirname,
    "fonts",
    req.path.replace(/^\/font/, "")
  );
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.log(`File does not exist: ${filePath}`);
    } else {
      console.log(`File exists: ${filePath}`);
    }
    next();
  });
});

// Set up CORS to allow requests only from onetrust.com
app.use(
  cors({
    origin: /\.onetrust\.com$/,
  })
);

// Serve font files from the 'fonts' directory
app.use("/fonts", express.static(path.join(__dirname, "fonts")));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
