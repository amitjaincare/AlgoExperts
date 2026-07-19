from sqlalchemy.orm import Session
import models
import schemas

def create_lead(db: Session, lead: schemas.LeadCreate):
    db_lead = models.Lead(
        name=lead.name,
        mobile=lead.mobile,
        email=lead.email,
        city=lead.city,
        market=lead.market,
        experience=lead.experience,
        message=lead.message
    )

    db.add(db_lead)
    db.commit()
    db.refresh(db_lead)

    return db_lead