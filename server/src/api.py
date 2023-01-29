from flask import Blueprint, jsonify, request
from pydantic import ValidationError

from src.db import SubmissionDB
from src.models import CreateSubmission, UpdateSubmission
from src.utils import setup_logger

logger = setup_logger()

blueprint = Blueprint("api", __name__, url_prefix="/api")

submission_service = SubmissionDB()


@blueprint.route("/submissions", methods=["GET"])
def list_submissions():
    try:
        submissions = submission_service.list()
        return jsonify([item.dict() for item in submissions.values()]), 200
    except Exception as e:
        logger.exception("Unhandled exception in list submissions")
        return jsonify({"error": repr(e)}), 500


@blueprint.route("/submissions/<id_>", methods=["GET"])
def get_submission(id_):
    try:
        if not (submission := submission_service.get(id_)):
            return jsonify({"error": "Submission not found"}), 404
        return jsonify(submission.dict()), 200
    except Exception as e:
        logger.exception("Unhandled exception in get submission")
        return jsonify({"error": repr(e)}), 500


@blueprint.route("/submissions", methods=["POST"])
def create_submission():
    try:
        data = request.get_json()
        submission = CreateSubmission(**data)
        new_submission = submission_service.create(submission)
        return jsonify(new_submission.dict()), 201
    except ValidationError as e:
        msg = f"Invalid submission data: {e}"
        logger.error(msg, e)
        return jsonify({"error": msg}), 422
    except Exception as e:
        logger.exception("Unhandled exception")
        return jsonify({"error": repr(e)}), 500


@blueprint.route("/submissions/<id_>", methods=["PUT"])
def update_submission(id_):
    try:
        data = request.get_json()
        data.update({"id": id_})
        submission = UpdateSubmission(**data)
        updated_submission = submission_service.update(submission)
        return jsonify(updated_submission.dict()), 200
    except Exception as e:
        return jsonify({"error": repr(e)}), 500


@blueprint.route("/submissions/<id_>", methods=["DELETE"])
def delete_submission(id_):
    try:
        submission_service.delete(id_)
        return jsonify({"message": "Submission deleted"}), 200
    except Exception as e:
        return jsonify({"error": repr(e)}), 500


@blueprint.route("/submissions/<id_>/upload", methods=["POST"])
def bind_submission(id_):
    try:
        data = request.get_json()
        logger.info(f"Binding submission {data['submissionId']} to user {data['userId']} with file {request.files['file_upload']}")

        f = request.files["file_upload"]
        f.save("new_file.pdf")
        return jsonify({"status": "ok"}), 200
    except Exception as e:
        return jsonify({"error": repr(e)}), 500


@blueprint.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"}), 200
