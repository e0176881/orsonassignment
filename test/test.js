process.env.NODE_ENV = "test";
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server");

const should = chai.should();

chai.use(chaiHttp);
before(function (done) {
  app.on("ready", function () {
    done();
  });
});
describe("/GET commonstudents from teacherken", () => {
  it("should return 4 students", (done) => {
    chai
      .request(app)
      .get("/api/commonstudents?teacher=teacherken%40gmail.com")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.students.length.should.be.eql(4);
        done();
      });
  });
});

describe("/GET commonstudents from teacherken and teacherjoe", () => {
  it("should return 2 students", (done) => {
    chai
      .request(app)
      .get(
        "/api/commonstudents?teacher=teacherken%40gmail.com&teacher=teacherjoe%40gmail.com"
      )
      .end((err, res) => {
        res.should.have.status(200);
        res.body.students.length.should.be.eql(2);
        done();
      });
  });
});

describe("/POST Teacher Ken wants to register studentjon and studenthon", () => {
  it("should return 204", (done) => {
    let request = {
      teacher: "teacherken@gmail.com",
      students: ["studentjon@gmail.com", "studenthon@gmail.com"],
    };
    chai
      .request(app)
      .post("/api/register")
      .send(request)
      .end((err, res) => {
        res.should.have.status(204);
        done();
      });
  });
});

describe("/POST Teacher Ken wants to register studentjon and studenthon again", () => {
  it("should return 400 email already exist", (done) => {
    let request = {
      teacher: "teacherken@gmail.com",
      students: ["studentjon@gmail.com", "studenthon@gmail.com"],
    };
    chai
      .request(app)
      .post("/api/register")
      .send(request)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

describe("/POST Teacher Ken wants to register student with invalid email format", () => {
  it("should return 400 email invalid format", (done) => {
    let request = {
      teacher: "teacherken@gmail.com",
      students: ["haha.com"],
    };
    chai
      .request(app)
      .post("/api/register")
      .send(request)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

describe("/POST Suspend student mary", () => {
  it("should return 204", (done) => {
    let request = {
      student: "studentmary@gmail.com",
    };
    chai
      .request(app)
      .post("/api/suspend")
      .send(request)
      .end((err, res) => {
        res.should.have.status(204);
        done();
      });
  });
});

describe("/POST Suspend invalid student hahha@gg.com ", () => {
  it("should return 204", (done) => {
    let request = {
      student: "haha@gg.com",
    };
    chai
      .request(app)
      .post("/api/suspend")
      .send(request)
      .end((err, res) => {
        res.should.have.status(500);
        done();
      });
  });
});

describe("/POST Teacher ken sending notifications to his students and agnes and miche", () => {
  it("should return 204", (done) => {
    let request = {
      teacher: "teacherken@gmail.com",
      notification:
        "Hello students! @studentagnes@gmail.com @studentmiche@gmail.com",
    };
    chai
      .request(app)
      .post("/api/retrievefornotifications")
      .send(request)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.recipients.length.should.be.eql(8);
        done();
      });
  });
});

describe("/POST Teacher ken sending notifications to his students only", () => {
  it("should return 204", (done) => {
    let request = {
      teacher: "teacherken@gmail.com",
      notification: "Hey everybody",
    };
    chai
      .request(app)
      .post("/api/retrievefornotifications")
      .send(request)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.recipients.length.should.be.eql(6);
        done();
      });
  });
});

describe("/POST Teacher ken sending notifications to his students and mary", () => {
  it("should return 204", (done) => {
    let request = {
      teacher: "teacherken@gmail.com",
      notification: "Hey everybody",
    };
    chai
      .request(app)
      .post("/api/retrievefornotifications")
      .send(request)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.recipients.length.should.be.eql(6);
        done();
      });
  });
});
