# Sayata Fullstack Home Assignment
##### By Joey Havia
This Home assignment objective is to build submission managment system.

## Features

- Display all Submissions
- Create new submission
- Bind existing submission
- Upload signed application to an existing submission

## Tech

Dillinger uses a number of open source projects to work properly:

- ReactJS - Frontend - Web Framework written in Javascript.
- Flask - Server side -  framework written in Python. 
- 
## Installation

This application requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and devDependencies and start the server.
1.Unzip 'Joey-Sayata-assignment.zip'
2.Open server/src/config.json:
a. Set value for both variables DB_PATH , UPLOAD_PATH

Example:
```sh
{
    "DB_PATH": "C:\\SOMEUSER\\USER\\sayata-fullstack-assignment\\server\\mock_data_csv.csv",
    "UPLOAD_PATH": "C:\\SOMEUSER\\USER\\sayata-fullstack-assignment\\server\\server\\uploads"
}
```
** if needed - create a folder for saving all uploads.
3.Start the server:
```sh
cd server
pip install -r requirements.txt
cd src
python main.py
```
4.Start the client
```sh
cd client
npm install
npm start
```

## Limitations:
1. I did not have enough time to make the Submission table clickable ,hence clicking on the table will not move you to "Bind Submission " page ,  but you can press on 'upload file ' on a record in the table that has no file there and you will move to "Bind Submission " page and you will be able to upload and bind the application there .
2. Download already binded application file feature - did not have enough time to do it as well . 

