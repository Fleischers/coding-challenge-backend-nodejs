const chai = require('chai');
const chaiHttp = require('chai-http');

let app, instance;

chai.use(chaiHttp);
chai.should();

describe('Express is running in production mode', () => {

  before(() => {
    process.env.NODE_ENV = 'production';
    app = require('../src/app');
    app.set('env', 'production');
    instance = app.run();
  });

  it('should get /status', (done) => {
    chai.request(app)
      .get('/status')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.status.should.be.equal('OK');
        done();
      });
  });

  it('should attempt to access any not defined route', (done) => {
    chai.request(app)
      .get('/404')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.message.should.be.equal('Resource is not found');
        done();
      });
  });

  it('should get catch-all error message when something broke on Not Found catcher', (done) => {

    app._router.stack.some((route) => {
      if (route.handle.name === 'catchNotFound') {
        route.handle = function catchNotFoundMock() {
          throw new Error('something broke');
        };
        return true;
      } else {
        return false;
      }
    });

    chai.request(app)
      .get('/500s')
      .end((err, res) => {
        res.should.have.status(500);
        res.body.message.should.be.equal('The server is experiencing issues');
        done();
      });
  });

  after(() => {
    instance.close();
  });

});

describe('Express is recreated and is running in development mode', () => {
  before(() => {
    process.env.NODE_ENV = 'development';
    delete require.cache[require.resolve('../src/app')];
    delete require.cache[require.resolve('../src/logger')];
    app = require('../src/app');
    app.set('env', 'development');
    instance = app.run();
  });

  it('should get /404 again on a new server without 500 error', (done) => {
    chai.request(app)
      .get('/404again')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it('should ensure we are running in development env', () => {
    app.get('env').should.be.equal('development');
  });

  after(() => {
    instance.close();
  });
});
