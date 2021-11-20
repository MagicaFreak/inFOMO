from fastapi import FastAPI
import uvicorn

app = FastAPI()


@app.get("/")
async def index():
    return {"message": "Hello World"}


@app.get("/sales")
async def sales():
    return {"message": "Hello World"}


@app.get("/products")
async def products():
    return {"message": "Hello World"}


@app.get("/shops")
async def shops():
    return {"message": "Hello World"}


@app.get("/citys")
async def citys():
    return {"message": "Hello World"}


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
