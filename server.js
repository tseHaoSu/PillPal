import express from "express";
import { sendTestEmail } from "./src/api/send-email.js";


const app = express();
const port = process.env.PORT || 3000;

//parse request body
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Node.js!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.post("/api/send-email", async (req, res) => {
  try {
    const result = await sendTestEmail();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
});
