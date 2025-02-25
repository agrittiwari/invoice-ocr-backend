from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import torch
from transformers import AutoProcessor, LlavaForConditionalGeneration
from PIL import Image
import requests
from io import BytesIO

app = FastAPI()

processor = AutoProcessor.from_pretrained("llava-hf/llava-1.5-7b-hf")
model = LlavaForConditionalGeneration.from_pretrained("llava-hf/llava-1.5-7b-hf")

class ImageRequest(BaseModel):
    image_url: str

@app.post("/process")
async def process_invoice(request: ImageRequest):
    try:
        response = requests.get(request.image_url)
        image = Image.open(BytesIO(response.content))

        inputs = processor(image, return_tensors="pt")
        generated = model.generate(**inputs)
        extracted_text = processor.decode(generated[0], skip_special_tokens=True)

        return {
            "rawText": extracted_text,
            "structuredData": {"invoiceNumber": "12345"}
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
