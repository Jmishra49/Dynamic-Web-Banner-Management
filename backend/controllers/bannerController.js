const db = require("../models/bannerModel");

// Get banner information
exports.getBanner = (req, res) => {
  db.query("SELECT * FROM banners WHERE id = 1", (err, result) => {
    if (err) throw err;
    res.json(result[0]);
  });
};

// Update banner information
exports.updateBanner = (req, res) => {
  const { description, timer, link, visibility } = req.body;
  db.query(
    "UPDATE banners SET description = ?, timer = ?, link = ?, visibility = ? WHERE id = 1",
    [description, timer, link, visibility],
    (err, result) => {
      if (err) throw err;
      res.json({ message: "Banner updated" });
    }
  );
};
