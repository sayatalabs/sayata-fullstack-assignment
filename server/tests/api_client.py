import requests
from requests import Response

TEST_HOST = "http://localhost:8000"


class SayataApiClient:
    def __init__(self, host: str = TEST_HOST):
        self.host = host

    def list_submissions(self) -> Response:
        response = requests.get(f"{self.host}/api/submissions")
        return response

    def create_submission(self, data: dict) -> Response:
        response = requests.post(f"{self.host}/api/submissions", json=data)
        return response

    def get_submission(self, id_: str) -> Response:
        response = requests.get(f"{self.host}/api/submissions/{id_}")
        return response

    def update_submission(self, id_: str, data: dict) -> Response:
        response = requests.put(f"{self.host}/api/submissions/{id_}", json=data)
        return response

    def delete_submission(self, id_: str) -> Response:
        response = requests.delete(f"{self.host}/api/submissions/{id_}")
        return response

    def bind_submission(self, id_: str, file_path: str):
        files = {"file_upload": open(file_path, "rb")}
        response = requests.post(f"{self.host}/api/bind", files=files)
        return response.json()

    def health(self) -> bool:
        try:
            response = requests.get(f"{self.host}/api/health")
            return response.ok is True
        except requests.exceptions.ConnectionError:
            return False
