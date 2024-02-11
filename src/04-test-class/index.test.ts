import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
} from './index';

import lodash from 'lodash';

jest.mock('lodash');

const mockedLodash = jest.mocked(lodash);

describe('BankAccount', () => {
  let account = getBankAccount(0);

  beforeEach(() => {
    account = getBankAccount(100);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(101)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const toTransfer = getBankAccount(100);
    expect(() => account.transfer(101, toTransfer)).toThrow();
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(99, account)).toThrow();
  });

  test('should deposit money', () => {
    expect(account.deposit(1).getBalance()).toBe(101);
  });

  test('should withdraw money', () => {
    expect(account.withdraw(100).getBalance()).toBe(0);
  });

  test('should transfer money', () => {
    const toTransfer = getBankAccount(100);
    account.transfer(99, toTransfer);

    expect(account.getBalance()).toBe(1);
    expect(toTransfer.getBalance()).toBe(199);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    mockedLodash.random.mockReturnValue(1);

    const result = await account.fetchBalance();

    expect(typeof result).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(100);

    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(100);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);

    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
