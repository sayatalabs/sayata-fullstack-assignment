import pytest

from .api_client import SayataApiClient

api_client = SayataApiClient()


def setup_module():
    if not api_client.health():
        raise ConnectionError("API Server is not running or unreachable")


@pytest.fixture
def setup():
    data = {
        "company_name": "Test Company",
        "physical_address": "123 Test Street",
        "annual_revenue": 1000000.00,
    }
    item = api_client.create_submission(data)
    yield item
    response = api_client.delete_submission(item.json()["id"])
    assert response.status_code == 200


def test_list_submissions(setup):
    response = api_client.list_submissions()
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_get_submission(setup):
    response = api_client.get_submission(setup.json()["id"])
    assert response.status_code == 200
    assert response.json()["company_name"] == "Test Company"
    assert response.json()["physical_address"] == "123 Test Street"
    assert response.json()["annual_revenue"] == 1000000.00


def test_update_submission(setup):
    data = {
        "id": setup.json()["id"],
        "signed_application": "test.pdf",
    }
    response = api_client.update_submission(setup.json()["id"], data)
    assert response.status_code == 200
    assert response.json()["signed_application"] == "test.pdf"
