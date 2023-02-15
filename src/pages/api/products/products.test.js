import add from './add';
import request from 'supertest';
import httpMocks from 'node-mocks-http';

//add needs a req and res

//test 1 req object includes a method with a value POST

describe('test add products', () => {
  it('Request method must be POST', async () => {
    const req = httpMocks.createRequest({
      method: 'GET',
    });
    const res = httpMocks.createResponse();

    const result = await add(req, res);

    expect(result.statusCode).toEqual(400);
  });
});
