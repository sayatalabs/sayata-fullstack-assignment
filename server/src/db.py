from datetime import datetime
from typing import Dict, Optional
from uuid import uuid4

from src.models import Submission, CreateSubmission, UpdateSubmission

test_id = uuid4()
SUBMISSIONS_DB: Dict[str, Submission] = {}


def seed_data(items: Optional[int] = None):
    if items:
        submission_service = SubmissionDB()
        import faker

        for _ in range(items):
            fake_data = CreateSubmission(
                companyName=faker.Faker().company(),
                physicalAddress=faker.Faker().address(),
                annualRevenue=faker.Faker().pyfloat(positive=True, right_digits=2, min_value=10000, max_value=1000000000),
            )
            submission_service.create(fake_data)


class SubmissionDB:
    @staticmethod
    def get(id_: str) -> Optional[Submission]:
        return SUBMISSIONS_DB.get(id_)

    @staticmethod
    def create(submission: CreateSubmission) -> Submission:
        new_submission = Submission(**submission.dict())
        SUBMISSIONS_DB[submission.id] = new_submission
        return new_submission

    @staticmethod
    def update(submission: UpdateSubmission) -> Submission:
        updated_submission: Submission = SUBMISSIONS_DB[submission.id].copy(
            update=submission.dict(exclude_unset=True)
        )
        updated_submission.updatedAt = datetime.utcnow()
        SUBMISSIONS_DB[submission.id] = Submission(**updated_submission.dict())
        return updated_submission

    @staticmethod
    def delete(id_: str):
        del SUBMISSIONS_DB[id_]

    @staticmethod
    def delete_all():
        SUBMISSIONS_DB.clear()

    @staticmethod
    def list() -> Dict[str, Submission]:
        return SUBMISSIONS_DB
