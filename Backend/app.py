from fastapi import FastAPI
import uvicorn
from datetime import date

import evaluation as eva
import view_aggregation as va

app = FastAPI()
conn = va.init_aggregate_tables_pd()


@app.get("/")
async def index():
    return eva.eval_general_sales_prev_week(date(2018, 4, 8), conn)


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
    va.cleanup(conn)
