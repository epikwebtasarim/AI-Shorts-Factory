const express = require("express");
const app = express();
const PORT = process.env.PORT || 10000;

// Ana route
app.get("/", (req, res) => {
  res.send("✅ AI Shorts Factory Running on Render");
});

// Sunucu başlat
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
