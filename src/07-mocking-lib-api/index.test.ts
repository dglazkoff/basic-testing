import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('lodash', () => ({
  throttle: (fn: () => unknown) => fn,
}));

jest.mock('axios');
const mockedAxios = jest.mocked(axios);

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  test('should create instance with provided base url', async () => {
    const mockedAxiosCreate = mockedAxios.create.mockReturnValueOnce({
      get: jest.fn().mockReturnValue(Promise.resolve({ data: 'test' })),
    } as unknown as AxiosInstance);

    await throttledGetDataFromApi('/test');

    expect(mockedAxiosCreate).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const mockedGet = jest
      .fn()
      .mockReturnValue(Promise.resolve({ data: 'test' }));
    mockedAxios.create.mockReturnValueOnce({
      get: mockedGet,
    } as unknown as AxiosInstance);

    await throttledGetDataFromApi('/test');

    expect(mockedGet).toBeCalledWith('/test');
  });

  test('should return response data', async () => {
    mockedAxios.create.mockReturnValueOnce({
      get: jest.fn().mockReturnValue(Promise.resolve({ data: 'test' })),
    } as unknown as AxiosInstance);

    const result = await throttledGetDataFromApi('/test');

    expect(result).toBe('test');
  });
});
