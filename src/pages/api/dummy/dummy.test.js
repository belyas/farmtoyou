import dummy from './dummy';

describe('Dummy test', () => {
  it('should call status with 400 status code', () => {
    const statusMock = jest.fn(() => ({ json: () => {} }));

    dummy({ method: 'get' }, { status: statusMock });

    expect(statusMock).toHaveBeenCalled();
  });
});
