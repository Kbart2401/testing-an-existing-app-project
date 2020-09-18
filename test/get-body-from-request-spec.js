const EventEmitter = require('events');
const { expect } = require('chai');
const { getBodyFromRequest } = require('../get-body-from-request');
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
    expect.fail('please write this test');
  });
});
