import os
import requests
from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI, Depends, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session

from database import engine, Base, get_db
import models
import schemas
import crud
from fastapi.middleware.cors import CORSMiddleware

TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID")

def send_telegram_message(text):

    if not TELEGRAM_BOT_TOKEN:
        print("❌ Telegram Bot Token missing")
        return

    if not TELEGRAM_CHAT_ID:
        print("❌ Telegram Chat ID missing")
        return

    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"

    response = requests.post(
        url,
        json={
            "chat_id": TELEGRAM_CHAT_ID,
            "text": text
        },
        timeout=10
    )

    print("Telegram Response:")
    print(response.text)

Base.metadata.create_all(bind=engine)

app = FastAPI(title="AlgoExperts API")

app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory="templates")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://algoexperts-1.onrender.com",
        "http://localhost:5500",
        "http://127.0.0.1:5500"
    ],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "AlgoExperts API Running Successfully"}


@app.post("/lead")
def create_lead(lead: schemas.LeadCreate, db: Session = Depends(get_db)):
    saved_lead = crud.create_lead(db, lead)

    message = f"""
🟢 New Lead Received

👤 Name: {lead.name}
📞 Mobile: {lead.mobile}
📧 Email: {lead.email}

💬 Message:
{lead.message}
"""

    try:
        send_telegram_message(message)
    except Exception as e:
        print("Telegram Error:", e)

    return saved_lead


@app.get("/leads")
def get_leads(db: Session = Depends(get_db)):
    return db.query(models.Lead).all()


@app.get("/admin", response_class=HTMLResponse)
def admin(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="admin.html",
        context={}
    )