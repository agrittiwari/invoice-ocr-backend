FROM python:3.9
WORKDIR /app
COPY . .
RUN pip install -r requirements.txt
CMD ["uvicorn", "process_invoice:app", "--host", "0.0.0.0", "--port", "5000"]
