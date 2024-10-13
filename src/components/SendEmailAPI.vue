<script setup>
import { ref } from 'vue'
import axios from 'axios';

const sendEmail = async (email, date) => {
  try {
    const response = await axios.post('/api/send-email', { email, date });
    if (response.data.success) {
      return response.data;
    } else {
      throw new Error(response.data.message || 'Failed to send email');
    }
  } catch (error) {
    console.error('Error sending email:', error);
    throw error.response?.data || error;
  }
};

defineExpose({ sendEmail });
</script>