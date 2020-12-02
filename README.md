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

DB server is hosted using AWS RDS (MySQL). 

```
DB Server Information : 
app/config/db.config.js
```
4. Start the server(drop table if exist + intitialise data):

```bash
npm start
```
### Initialised Data
(students are all not suspended by default)

| Teacher                       | Student(s)                                                      
| :---------------------------- | :---------------------------------------------------------------------------------------------------------------
| teacherken@gmail.com          | commonstudent1@gmail.com,commonstudent2@gmail.com,student_only_under_teacher_ken@gmail.com, studentbob@gmail.com                               
| teacherjoe@gmail.com          | commonstudent1@gmail.com,commonstudent2@gmail.com                   
| teacherpam@gmail.com          | studentmary@gmail.com,studentagnes@gmail.com,studentmiche@gmail.com           




5. Check that the development server is running by sending a GET request to `127.0.0.1:3000` where `3000` is the default port.

```json
{
  "message": "Welcome"
}
```
## Live Server
This API is also hosted on AWS ELASTIC BEANSTALK with AWS CodePipeline using Github
http://orsongovtech-env.eba-ecmcmpip.us-east-1.elasticbeanstalk.com/


### Test Cases Available


| Method | Route                         | Description                                                       
| :----- | :---------------------------- | :---------------------------------------------------------------- 
| GET    | /api/commonstudents           | commonstudents from teacherken                                   
| GET    | /api/commonstudents           | commonstudents from teacherken and teacherjoe                    
| POST   | /api/register                 | Teacher Ken wants to register studentjon and studenthon           
| GET    | /api/register                 | Teacher Ken wants to register studentjon and studenthon again 
| POST   | /api/register                 | Teacher Ken wants to register student with invalid email format  
| POST   | /api/suspend | Suspend student mary  
| POST   | /api/suspend | Suspend invalid student hahha@gg.com  
| POST   | /api/retrievefornotifications| Teacher Ken sending notifications to his students and agnes and miche 
| POST   | /api/retrievefornotifications| Teacher Ken sending notifications to his students only  
| POST   | /api/retrievefornotifications| Teacher Ken sending notifications to his students and mary  


## Running unit test

Run the following command in the project directory to run unit test:

```bash
npm test
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
| GET    | /api/students     | Retrieve all students                               |
| DELETE    | /api/deleteStudent/id     | Delete student by ID                             |


### Utility routes - Teacher

| Method | Route            | Description                                         |
| :----- | :--------------- | :-------------------------------------------------- |
| GET    | /api/teachers     | Retrieve all teachers                               |

## Built with

- [Node.js](https://nodejs.org/en/download/)
- [Express](https://expressjs.com/)
- [MySQL](https://dev.mysql.com/downloads/mysql/)
- [Sequelize.js](https://sequelize.org/)
- [Mocha.js](https://mochajs.org/)
- [Chai.js](https://www.chaijs.com/)

## Author

- [Orson Oh Ming Xuan](https://github.com/e0176881)
