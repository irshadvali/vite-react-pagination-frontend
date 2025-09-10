const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// Generate 100,000 mock records
const data = Array.from({ length: 100000 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`
}));

// API with pagination (100 per page)
app.get("/api/data", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 100;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedData = data.slice(startIndex, endIndex);

  res.json({
    total: data.length,
    page,
    limit,
    data: paginatedData
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
