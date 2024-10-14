import axios from "axios";

const API_URL = "http://localhost:3000"; 

export const sendEmail = async (to, subject, text) => {
  try {
    const response = await axios.post(
      `${API_URL}/send-email`,
      { to, subject, text },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Email sending error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
