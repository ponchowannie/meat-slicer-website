// filepath: /Users/poncho/Public/Coding/meat-slicer-website/src/utils/api.js
import axios from "axios";

export const sendSlicingRequest = async (axis, slices) => {
  try {
    const response = await axios.post("http://127.0.0.1:5000/slice", {
      axis,
      slices,
    });
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error sending slicing request:", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};