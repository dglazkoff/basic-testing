// Uncomment the code below and write your tests
import { Action, simpleCalculator } from './index';

/*
const testCases = [
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    { a: 2, b: 2, action: Action.Add, expected: 4 },
    { a: 3, b: 2, action: Action.Add, expected: 5 },
    // continue cases for other actions    
]; */

describe('simpleCalculator', () => {
  test.each([
    { a: 0, b: 0, action: Action.Add, result: 0 },
    { a: 2, b: 2, action: Action.Add, result: 4 },
    { a: 9999, b: 99999, action: Action.Add, result: 109998 },
  ])('add $a $b give $result', ({ a, b, action, result }) => {
    expect(simpleCalculator({ a, b, action })).toBe(result);
  });

  test.each([
    { a: 0, b: -1, action: Action.Subtract, result: 1 },
    { a: 2, b: 2, action: Action.Subtract, result: 0 },
    { a: -1, b: 1, action: Action.Subtract, result: -2 },
  ])('subtract $a $b give $result', ({ a, b, action, result }) => {
    expect(simpleCalculator({ a, b, action })).toBe(result);
  });

  test.each([
    { a: 0, b: 0, action: Action.Multiply, result: 0 },
    { a: 0, b: 1, action: Action.Multiply, result: 0 },
    { a: -2, b: -2, action: Action.Multiply, result: 4 },
    { a: -2, b: 2, action: Action.Multiply, result: -4 },
  ])('multiply $a $b give $result', ({ a, b, action, result }) => {
    expect(simpleCalculator({ a, b, action })).toBe(result);
  });

  test.each([
    { a: 1, b: 0, action: Action.Divide, result: Infinity },
    { a: 0, b: 1, action: Action.Divide, result: 0 },
    { a: 2, b: 2, action: Action.Divide, result: 1 },
    { a: 6, b: 3, action: Action.Divide, result: 2 },
  ])('divide $a $b give $result', ({ a, b, action, result }) => {
    expect(simpleCalculator({ a, b, action })).toBe(result);
  });

  test.each([
    { a: 6, b: 0, action: Action.Exponentiate, result: 1 },
    { a: 1, b: 9999, action: Action.Exponentiate, result: 1 },
    { a: 2, b: 3, action: Action.Exponentiate, result: 8 },
  ])('exponentiate $a $b give $result', ({ a, b, action, result }) => {
    expect(simpleCalculator({ a, b, action })).toBe(result);
  });

  test.each([null, undefined, 'Sum'])(
    'should return null for invalid action',
    (action) => {
      expect(simpleCalculator({ a: 2, b: 2, action })).toBeNull();
    },
  );

  test.each([
    { a: '1', b: '1' },
    { a: '1', b: 1 },
    { a: 1, b: '1' },
    { a: 1, b: null },
    { a: 1, b: undefined },
    { a: 1, b: true },
    { a: 1, b: [] },
  ])('should return null for invalid arguments $a $b', ({ a, b }) => {
    expect(simpleCalculator({ a, b, action: Action.Add })).toBeNull();
  });
});
