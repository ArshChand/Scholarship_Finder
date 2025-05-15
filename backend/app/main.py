from fastapi import FastAPI
from app.db import db
from app.routes import students

app = FastAPI()
app.include_router(students.router, prefix="/students")

@app.get("/")
def read_root():
    return {"message": "Scholarship Finder API"}

@app.get("/test-db")
async def test_db():
    try:
        collections = await db.list_collection_names()
        return {"status": "connected","collections": collections}
    except Exception as e:
        return {"status": "failed","error": str(e)}
