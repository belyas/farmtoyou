import add from './add';
import httpMocks from 'node-mocks-http';
import createRandomProduct from '../../../utils/generateFakeData';
import index from './index';

jest.mock('../../../utils/supabaseClient.js', () => ({
  supabase: {
    from() {
      return {
        insert() {
          return '';
        },
      };
    },
  },
}));
//Attemp to setup fake db and mock supabase. Need further investigation
// const setUpProductsDatabase = () => {
//   const products = [];
//   const product = createRandomProduct();
//   product.farmer_id = 1;
//   products.push(product);
//   console.log('products', products);
// };
// beforeAll(() => {
//   return setUpProductsDatabase();
// });
// beforeEach(() => {
//   jest.clearAllMocks();
// });

describe('Test add products', () => {
  it('Request method must be POST', async () => {
    const getReq = httpMocks.createRequest({
      method: 'GET',
    });
    const res = httpMocks.createResponse();
    const getResult = await add(getReq, res);

    expect(getResult.statusCode).toEqual(405);
  });

  it('Request body must not be empty', async () => {
    const emptyReq = httpMocks.createRequest({
      method: 'POST',
      body: '',
    });

    const res = httpMocks.createResponse();
    const emptyReqResult = await add(emptyReq, res);

    expect(emptyReqResult.statusCode).toEqual(400);
  });
  it('All fields must not be empty', async () => {
    const reqBody = {
      title: 'A fake product',
      farmer_id: 2,
      items: 'apples x1 kg, carrots x1 kg, brocolli x 1',
      price: '',
      delivery_date: 'Friday',
      subscription_frequency: 2,
      subscription_start: '2023-02-04',
      subscription_end: '2023-07-04',
      photo: 'farmer 2 basket 1',
      organic: false,
    };
    const someEmptyFieldsReq = httpMocks.createRequest({
      method: 'POST',
      body: reqBody,
    });
    const res = httpMocks.createResponse();
    const someEmptyReqResult = await add(someEmptyFieldsReq, res);
    expect(someEmptyReqResult.statusCode).toEqual(400);
  });
  it('With valid input, add should query supabase and return 200', async () => {
    const supabase = require('../../../utils/supabaseClient.js').supabase;

    const product = createRandomProduct();
    const req = httpMocks.createRequest({
      method: 'POST',
      body: product,
    });
    const res = httpMocks.createResponse();
    const result = await add(req, res);
    expect(result.statusCode).toEqual(200);
  });
});

describe('test get products', () => {
  it('Request method must be GET', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
    });
    const res = httpMocks.createResponse();
    const result = await index(req, res);
    expect(result.statusCode).toEqual(405);
  });
  it('With GET request,must provide valid farmer_id', async () => {
    const req = httpMocks.createRequest({
      method: 'GET',
      query: '',
    });
    const res = httpMocks.createResponse();
    const result = await index(req, res);
    expect(result.statusCode).toEqual(400);
  });
  it('With GET request,must provide valid farmer_id', async () => {
    const req = httpMocks.createRequest({
      method: 'GET',
      query: 'b',
    });
    const res = httpMocks.createResponse();
    const result = await index(req, res);
    expect(result.statusCode).toEqual(400);
  });
  it('With valid GET request, if farmer does not exists,return 404', async () => {
    //todo need to mock supabase
    const req = httpMocks.createRequest({
      method: 'GET',
      query: '3',
    });
    const res = httpMocks.createResponse();
    const result = await index(req, res);
    expect(result.statusCode).toEqual(404);
  });
  it('With valid GET request, if farmer exists,return 200', async () => {
    //todo need to mock supabase
    const req = httpMocks.createRequest({
      method: 'GET',
      query: '1',
    });
    const res = httpMocks.createResponse();
    const result = await index(req, res);
    expect(result.statusCode).toEqual(200);
  });
});
