const EventEmitter = require('events');
const { expect } = require('chai');
const { getBodyFromRequest } = require('../get-body-from-request');
const { get } = require('http');
describe("The getBodyFromRequest function", () => {
  let fakeReq = null;

  beforeEach(() => {
    fakeReq = new EventEmitter();
  });

  it('returns an empty string for no body', done => {
    const bodyPromise = getBodyFromRequest(fakeReq);
    fakeReq.emit('end');
    
    bodyPromise
      .then(body => {
        expect(body).to.eql('')
      }).then(body => done())
      .catch(body => done(`Failed. Got "${body}"`));
  });

  it('returns the data read from the stream', done => {
    const bodyPromise = getBodyFromRequest(fakeReq);
    const data1 = "This is some";
    const data2 = " data from the browser";

    fakeReq.emit("data", data1);
    fakeReq.emit("data", data2);

    fakeReq.emit("end");

    bodyPromise
      .then(body => {
        expect(body).to.equal(data1 + data2)
      })
      .then(done)
      .catch(body => done(`Failed. Got "${body}"`))
  });
});
