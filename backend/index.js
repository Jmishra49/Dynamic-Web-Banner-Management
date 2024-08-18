const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bannerRoutes = require("./routes/bannerRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/banner", bannerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
