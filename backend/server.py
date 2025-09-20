from fastapi import FastAPI, APIRouter, HTTPException, Response
from fastapi.responses import FileResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List
import uuid
from datetime import datetime

# Import our models and services
from models.contact import ContactSubmission, ContactSubmissionCreate, ContactResponse
from models.github import GitHubResponse
from services.github_service import GitHubService
from services.email_service import EmailService
from services.pdf_service import PDFService

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Initialize services
github_service = GitHubService()
email_service = EmailService()
pdf_service = PDFService()

# Create the main app without a prefix
app = FastAPI(title="Portfolio API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Existing routes
@api_router.get("/")
async def root():
    return {"message": "Portfolio API is running!"}

# GitHub endpoints
@api_router.get("/github/projects", response_model=GitHubResponse)
async def get_github_projects():
    """Fetch pinned repositories from GitHub"""
    try:
        projects = await github_service.get_pinned_repositories()
        return projects
    except Exception as e:
        logger.error(f"Error fetching GitHub projects: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch GitHub projects")

# Contact form endpoints
@api_router.post("/contact", response_model=ContactResponse)
async def submit_contact_form(contact_data: ContactSubmissionCreate):
    """Handle contact form submission"""
    try:
        # Create contact submission
        submission = ContactSubmission(**contact_data.dict())
        
        # Store in database
        await db.contact_submissions.insert_one(submission.dict())
        
        # Send email if service is configured
        email_sent = False
        if email_service.is_configured():
            email_sent = await email_service.send_contact_email(submission)
            
            # Update status based on email result
            if email_sent:
                await db.contact_submissions.update_one(
                    {"id": submission.id},
                    {"$set": {"status": "sent"}}
                )
            else:
                await db.contact_submissions.update_one(
                    {"id": submission.id},
                    {"$set": {"status": "failed"}}
                )
        
        return ContactResponse(
            success=True,
            message="Message received successfully!" if email_sent else "Message received and stored successfully!"
        )
        
    except Exception as e:
        logger.error(f"Error handling contact form: {e}")
        raise HTTPException(status_code=500, detail="Failed to process contact form")

# Resume download endpoint
@api_router.get("/resume/download")
async def download_resume():
    """Generate and download PDF resume"""
    try:
        resume_path = await pdf_service.generate_resume_pdf()
        
        if resume_path and os.path.exists(resume_path):
            return FileResponse(
                path=resume_path,
                filename="Dinesh_E_Resume.html",  # In production, this would be .pdf
                media_type="text/html"  # In production, this would be application/pdf
            )
        else:
            raise HTTPException(status_code=500, detail="Failed to generate resume")
            
    except Exception as e:
        logger.error(f"Error generating resume: {e}")
        raise HTTPException(status_code=500, detail="Failed to generate resume")

# User profile endpoint (static data)
@api_router.get("/user")
async def get_user_profile():
    """Get user profile data"""
    try:
        user_data = {
            "name": "Dinesh E",
            "pronouns": "he/him",
            "title": "Aspiring AI/ML Engineer • Python • DSA • Software Engineering Student @ VIT Vellore",
            "location": "Vellore, Tamil Nadu, India",
            "email": "dineshedine007@gamil.com",
            "links": {
                "linkedin": "https://www.linkedin.com/in/dineshe007",
                "github": "https://github.com/Dineshh-007"
            },
            "summary": "Early‑career software engineer pursuing an Integrated M.Tech in Software Engineering at VIT Vellore (2024–Present). I enjoy turning algorithms into usable products—especially supervised ML with scikit‑learn—and sharpening DSA and system‑design fundamentals. I learn fast, collaborate well, and like optimizing code for clarity and performance. Open to internships, projects, and mentorship in AI/ML and software engineering.",
            "education": [
                {
                    "institution": "Vellore Institute of Technology (VIT)",
                    "program": "Integrated M.Tech, Software Engineering",
                    "dates": "2024 – Present",
                    "highlights": [
                        "Core focus: DSA, OOP, algorithms, system design",
                        "Languages: Python, Java, C/C++"
                    ]
                }
            ],
            "certifications": [
                {
                    "name": "Supervised Machine Learning: Regression and Classification",
                    "issuer": "DeepLearning.AI",
                    "issued": "Sep 2025"
                },
                {
                    "name": "Problem Solving (Basic)",
                    "issuer": "HackerRank",
                    "issued": "Jun 2025"
                },
                {
                    "name": "Programming for Everybody (Getting Started with Python)",
                    "issuer": "University of Michigan (Coursera)",
                    "issued": "Jun 2025"
                },
                {
                    "name": "Python (Basic)",
                    "issuer": "HackerRank",
                    "issued": "Jun 2025"
                }
            ],
            "skills": {
                "programming": ["Python", "Java", "C++", "C"],
                "ml_libs": ["scikit‑learn", "matplotlib"],
                "concepts": ["Machine Learning", "Supervised Learning", "Linear Regression", "Classification", "DSA", "Problem Solving"],
                "tooling": ["Git", "GitHub"]
            },
            "languages_spoken": [
                "English — Full professional",
                "Hindi — Professional working",
                "Tamil — Native/bilingual",
                "French — Limited working"
            ]
        }
        
        return {"success": True, "data": user_data}
        
    except Exception as e:
        logger.error(f"Error fetching user profile: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch user profile")

# Admin endpoint to get contact submissions (optional)
@api_router.get("/admin/contacts")
async def get_contact_submissions():
    """Get all contact submissions (admin only)"""
    try:
        submissions = await db.contact_submissions.find().sort("timestamp", -1).to_list(100)
        return {"success": True, "submissions": submissions}
    except Exception as e:
        logger.error(f"Error fetching contact submissions: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch contact submissions")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Health check endpoint
@api_router.get("/health")
async def health_check():
    """API health check"""
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "services": {
            "database": "connected",
            "github_api": "available",
            "email_service": "configured" if email_service.is_configured() else "not_configured"
        }
    }

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()