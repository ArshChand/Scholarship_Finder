from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.db import db

router = APIRouter()

class StudentProfile(BaseModel):
    name: str
    age: int
    gpa: float
    location: str
    special_category: str = None

@router.post("/")
async def create_student_profile(profile: StudentProfile):
    student = profile.model_dump()
    result = await db.students.insert_one(student)
    return {"message": "Student profile created successfully", "id": str(result.inserted_id)}

@router.get("/")
async def get_all_students():
    students = []
    async for student in db.students.find():
        student["_id"] = str(student["_id"])
        students.append(student)
    return students


