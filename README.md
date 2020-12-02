# GovTech Node.js API Asessment

## Getting started

Instructions to run project on your local machine for development and testing purposes. 

### Prerequisites

- [Node.js](https://nodejs.org/en/download/)
- [MySQL](https://dev.mysql.com/downloads/mysql/)

### Installing

1. Clone the repository:

```bash
git clone https://github.com/e0176881/orsonassignment
```

2. Install dependencies:

```bash
cd ${path-to-project}
npm install
```
3. MySQL DB Information (Local MySQL Server is optional) : 

DB is hosted on AWS RDS. DB server information can be found at app/config/db.config.js

```
DB Login Information : 
Host : database-govtech.clb6lncxxr3e.us-east-1.rds.amazonaws.com
Username : admin
Password : 11111111
DB Name : testdb
```

```bash
mysql -u admin -p11111111 -h database-govtech.clb6lncxxr3e.us-east-1.rds.amazonaws.com testdb 
```

4. Start the server & drop tables and intitialise data:

```bash
npm start
```

5. Check that the development server is running by sending a GET request to `127.0.0.1:3000` where `3000` is the default port.

```json
{
  "message": "Welcome"
}
```

### Test Cases

Web API| URL | Description
------------ | ------------- | -------------
User Register| /api/v1/user/register | -
User Login | /api/v1/user/login | -


## Running unit test

Run the following command in the project directory to run unit test:

```bash
npm run test
```

## Routes

### Main API routes

| Method | Route                         | Description                                                       |
| :----- | :---------------------------- | :---------------------------------------------------------------- |
| POST   | /api/register                 | Register one or more students to a specified teacher              |
| GET    | /api/commonstudents           | Retrieve students who are registered to all of the given teachers |
| POST   | /api/suspend                  | Suspend a specified student                                       |
| POST   | /api/retrievefornotifications | Retrieve a list of students who can receive a given notification  |

### Utility routes - Student

| Method | Route            | Description                                         |
| :----- | :--------------- | :-------------------------------------------------- |
| GET    | /api/student     | Retrieve all students                               |


### Utility routes - Teacher

| Method | Route            | Description                                         |
| :----- | :--------------- | :-------------------------------------------------- |
| GET    | /api/teacher     | Retrieve all teachers                               |


## Deployment / Server environment
This API is hosted on AWS ELASTIC BEANSTALK with AWS CodePipeline using Github
http://orsongovtech-env.eba-ecmcmpip.us-east-1.elasticbeanstalk.com/


## Built with

- [Node.js](https://nodejs.org/en/download/)
- [Express](https://expressjs.com/)
- [MySQL](https://dev.mysql.com/downloads/mysql/)
- [Sequelize.js](https://sequelize.org/)
- [Mocha.js](https://mochajs.org/)
- [Chai.js](https://www.chaijs.com/)

## Author

- [Orson Oh Ming Xuan](https://github.com/e0176881)
