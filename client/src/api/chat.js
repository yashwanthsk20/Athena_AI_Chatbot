import axios from "axios";

const fetchChatMessages = async (token) => {
  try {
    const { data } = await axios.get(
      "http://localhost:5000/api/v1/chats/retrieve",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data; // Expected successful response
  } catch (error) {
    console.error("Fetch Chat Messages Error:", error);

    // Handle server errors
    if (error.response) {
      return {
        message: error.response.data?.message || "Failed to fetch messages.",
        success: false,
        data: null,
      };
    }

    // Handle network errors
    if (error.request) {
      return {
        message: "No response from server. Please check your connection.",
        success: false,
        data: null,
      };
    }

    // Handle other errors
    return {
      message: "Unexpected error occurred.",
      success: false,
      data: null,
    };
  }
};

const sendMessage = async (token, prompt) => {
  try {
    const { data } = await axios.post(
      "http://localhost:5000/api/v1/chats/send",
      { prompt },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data; // Expected successful response
  } catch (error) {
    console.error("Send Message Error:", error);

    // Handle server errors
    if (error.response) {
      return {
        message: error.response.data?.message || "Failed to send message.",
        success: false,
        data: null,
      };
    }

    // Handle network errors
    if (error.request) {
      return {
        message: "No response from server. Please check your connection.",
        success: false,
        data: null,
      };
    }

    // Handle other errors
    return {
      message: "Unexpected error occurred.",
      success: false,
      data: null,
    };
  }
};

export { fetchChatMessages, sendMessage };
