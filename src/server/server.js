const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// Possible random values
const clients = ["Global Inc", "SoftCom", "ABC Corp", "DataWorks", "InnoWare", "NextGen Ltd", "BrightPath", "Tech Solutions", "FutureTech", "XYZ Ltd"];
const products = ["Cloud Hosting", "AI Service", "Data Backup", "Payment Gateway", "Monitoring", "ERP System", "Analytics", "CRM Tool", "Security Suite", "Web Hosting"];
const feeTypes = ["Subscription", "One-Time"];
const fileTypes = ["XLSX", "CSV", "PDF", "JSON", "DOCX"];
const statuses = ["Active", "Pending", "Completed", "Cancelled"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Generate 100,000 mock records
const data = Array.from({ length: 100000 }, (_, i) => ({
  caseId: i + 1,
  client: clients[Math.floor(Math.random() * clients.length)],
  product: products[Math.floor(Math.random() * products.length)],
  feeType: feeTypes[Math.floor(Math.random() * feeTypes.length)],
  fileType: fileTypes[Math.floor(Math.random() * fileTypes.length)],
  quantity: Math.floor(Math.random() * 50) + 1, // random 1–50
  status: statuses[Math.floor(Math.random() * statuses.length)],
  month: months[Math.floor(Math.random() * months.length)],
}));

// API with pagination + filters
app.get("/api/data", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 100;

  // Extract filters from query params
  const { client, product, feeType, fileType, status, month } = req.query;

  // Apply filtering
  let filteredData = data;

  if (client) filteredData = filteredData.filter(d => d.client === client);
  if (product) filteredData = filteredData.filter(d => d.product === product);
  if (feeType) filteredData = filteredData.filter(d => d.feeType === feeType);
  if (fileType) filteredData = filteredData.filter(d => d.fileType === fileType);
  if (status) filteredData = filteredData.filter(d => d.status === status);
  if (month) filteredData = filteredData.filter(d => d.month === month);

  const total = filteredData.length;

  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  res.json({
    total,
    page,
    limit,
    data: paginatedData,
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
