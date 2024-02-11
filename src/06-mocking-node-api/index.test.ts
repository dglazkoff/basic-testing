// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';

jest.mock('path');
jest.mock('fs');
jest.mock('fs/promises');

const mockedPath = jest.mocked(path);
const mockedFS = jest.mocked(fs);
const mockedFSPromises = jest.mocked(fsPromises);

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    doStuffByTimeout(jest.fn(), 1000);
    expect(jest.getTimerCount()).toBe(1);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    expect(callback).not.toBeCalled();

    doStuffByTimeout(callback, 1000);
    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(999);
    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(1);
    expect(callback).toBeCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    doStuffByInterval(jest.fn(), 1000);
    expect(jest.getTimerCount()).toBe(1);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    expect(callback).not.toBeCalled();

    doStuffByInterval(callback, 1000);
    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(999);
    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(1);
    expect(callback).toBeCalledTimes(1);

    jest.advanceTimersByTime(1000);
    expect(callback).toBeCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should call join with pathToFile', async () => {
    await readFileAsynchronously('file.txt');

    expect(mockedPath.join).toBeCalledWith(__dirname, 'file.txt');
  });

  test('should return null if file does not exist', async () => {
    mockedFS.existsSync.mockReturnValue(false);
    const result = await readFileAsynchronously('file.txt');

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    mockedFS.existsSync.mockReturnValue(true);
    mockedFSPromises.readFile.mockReturnValue(
      Promise.resolve(new Buffer('file content')),
    );
    const result = await readFileAsynchronously('file.txt');

    expect(result).toBe('file content');
  });
});
