import os
import csv
from flask import Blueprint, jsonify,current_app,request,Response
from flask_cors import  cross_origin
from werkzeug.utils import secure_filename
from db_helpers import read_data_from_file_db,write_sumbission_to_file_db,convert_json_to_submission


blueprint = Blueprint('api', __name__, url_prefix='/api')
CSV_DATABASE_PATH=r"C:\Users\JOE\Documents\GitHub\sayata-fullstack-assignment\server\mock_data_csv.csv"
UPLOAD_PATH = r'C:\Users\JOE\Documents\GitHub\sayata-fullstack-assignment\server\uploads'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

# Avoid Cross-origin problems:
@blueprint.after_request 
def after_request(response):
    header = response.headers
    header['Access-Control-Allow-Origin','Access-Control-Allow-Headers'] = '*'
    return response

@blueprint.route('/submissions', methods=['GET'])
@cross_origin()
def list_submissions():
    current_app.logger.info('START: list_submissions')
    try:
        data_from_db = read_data_from_file_db()
        current_app.logger.info('GET list submissions - Success!')
        return jsonify(data_from_db)
    except TypeError as e:
        current_app.logger.error(e)


@blueprint.route('/submission/<submission_id>', methods=['GET'])
@cross_origin()
def get_submission_by_id(submission_id):
    """
    This approuch is not very Effiecent. 
    the only reason i used it is the fact there is no Database in the assigment,
    so i used a CSV file as a database, the problem with that is if i want to find specific 
    row , i will need to read all the file and then scan it.
    
   
    in real life,Will run a SQL/NoSQL query.
    """
    current_app.logger.info('START: get_submission_by_id for id: {}'.format(submission_id))
    try:
        data = read_data_from_file_db()
    except TypeError as e:
        current_app.logger.error(e) 
    for obj in data:
        if obj['submission_id'] == submission_id:
            current_app.logger.info('Find Submission: {}'.format(obj))
            return jsonify(obj)
    return Response('Something Went Wrong',status=500)


@blueprint.route('/create', methods=['POST'])
@cross_origin()
def create_submission():
    current_app.logger.info('START: create_submission')
    data = request.json
    submission = convert_json_to_submission(data)
    if submission:
        if write_sumbission_to_file_db(submission) != 0:
            return Response(str(submission.submission_id),status=200)
        else:
            return Response('Something Went Wrong',status=500)


def allowed_file(filename):
	return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@blueprint.route('/file-upload', methods=['POST'])
@cross_origin()
def upload_file():
    with current_app.app_context():
        current_app.logger.info('START: upload_file')
        current_app.config['UPLOAD_FOLDER'] = UPLOAD_PATH
        # check if the post request has the file part
        if 'file' not in request.files:
            current_app.logger.error('upload_file - No file part in the request')
            resp = jsonify({'message' : 'No file part in the request'})
            resp.status_code = 400
            return resp
        file = request.files['file']
        if file.filename == '':
            current_app.logger.error('upload_file - No file selected for uploading')
            resp = jsonify({'message' : 'No file selected for uploading'})
            resp.status_code = 400
            return resp
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(current_app.config['UPLOAD_FOLDER'], filename))
            current_app.logger.info('upload_file - File successfully uploaded')
            resp = jsonify({'message' : 'File successfully uploaded'})
            resp.status_code = 200
            return resp
        else:
            resp = jsonify({'message' : 'Allowed file types are txt, pdf, png, jpg, jpeg, gif'})
            current_app.logger.error('upload_file - Allowed file types are txt, pdf, png, jpg, jpeg, gif')
            resp.status_code = 400
            return resp

@blueprint.route('/bind-submission/<submission_id>/<file_name>', methods=['GET'])
@cross_origin()
def mark_submission_as_bind(submission_id,file_name):
    current_app.logger.info('START: mark_submission_as_bind ID:{} FileName: {}'.format(submission_id,file_name))
    data = read_data_from_file_db()
    for obj in data:
        if obj['submission_id'] == submission_id:
            current_app.logger.info('Find Submission: {}'.format(obj))
            obj['status'] = "BOND"
            obj['application'] = file_name
    with open(CSV_DATABASE_PATH, 'w') as writeFile:
        keys = data[0].keys()
        dict_writer = csv.DictWriter(writeFile, keys)
        dict_writer.writeheader()
        dict_writer.writerows(data)
    resp = jsonify({'message' : 'Submission {} updated to Bond'.format(submission_id)})
    resp.status_code = 200
    return resp