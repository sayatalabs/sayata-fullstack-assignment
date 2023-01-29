import pytest

from src.db import SubmissionDB
from src.models import CreateSubmission, UpdateSubmission

submission_service = SubmissionDB()


def create_submission():
    new_submission = CreateSubmission(
        companyName="Test Company",
        physicalAddress="123 Test Street",
        annualRevenue=1000000.00,
    )
    return submission_service.create(new_submission)


@pytest.fixture
def setup():
    item = create_submission()
    yield item
    submission_service.delete_all()


def test_list_submissions(setup):
    create_submission()
    assert len(submission_service.list()) == 2


def test_update_submission(setup):
    submission = setup
    updated_submission = UpdateSubmission(
        id=submission.id, application="test.pdf"
    )
    submission_service.update(updated_submission)
    updated_db_submission = submission_service.get(submission.id)
    assert updated_db_submission.application == "test.pdf"


def test_delete_submission(setup):
    submission = setup
    submission_service.delete(submission.id)
    assert len(submission_service.list()) == 0
