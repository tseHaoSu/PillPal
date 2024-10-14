import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

console.log("Starting server...");

// Parse request body
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  console.log("Received request on root route");
  res.send("Hello from Node.js!");
});

app.post("/send-email", async (req, res) => {
  console.log("Received request to send email");
  const { email, date } = req.body;
  const subject = "Medical Data Request";
  const text = `Medical data requested for date: ${date}`;

  console.log(`Sending email to: ${email}, for date: ${date}`);

  try {
    const response = await axios.post(
      "https://api.sendgrid.com/v3/mail/send",
      {
        personalizations: [{ to: [{ email: email }] }],
        from: { email: "eastinsu55@gmail.com" },
        subject: subject,
        content: [{ type: "text/plain", value: text }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Email sent successfully");
    res.status(response.status).send({ message: "Email sent successfully" });
  } catch (error) {
    console.error(
      "SendGrid API error:",
      error.response ? error.response.data : error.message
    );
    res
      .status(error.response ? error.response.status : 500)
      .send(error.response ? error.response.data : { message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
