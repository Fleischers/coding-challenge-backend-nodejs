const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);
chai.should();

describe("GET /", () => {
  it("should get Hello Bikes", (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message.should.be.equal('Hello Bikes');
        done();
      });
  });

  after((done) => {
    done();
  });
});
