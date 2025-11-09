const app = require("./app");
const connectDB = require("./config/db");
require("dotenv").config({ quiet: true });
const port = process.env.PORT;
connectDB();
app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
