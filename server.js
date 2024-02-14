import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET;
const PORT = process.env.PORT || 4004;

app.listen(PORT, () => {
  console.log(` Server run on port ${PORT}`);
});
