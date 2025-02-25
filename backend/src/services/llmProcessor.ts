import axios from "axios";

export const processImage = async (imageUrl: string) => {
    try {
        const response = await axios.post("http://llm-service:5000/process", { image_url: imageUrl });
        return response.data;
    } catch (error) {
        console.error("Error processing image:", error);
        throw new Error("LLM service failed.");
    }
};
