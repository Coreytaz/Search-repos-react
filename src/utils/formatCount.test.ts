import { describe, expect, it } from 'vitest';
import { formatCount } from './formatCount';

describe('formatCount', () => {
  it('keeps small counts accurate', () => {
    expect(formatCount(0)).toBe('0');
    expect(formatCount(123)).toBe('123');
  });

  it('formats thousands and millions without truncation', () => {
    expect(formatCount(1234)).toBe('1.2K');
    expect(formatCount(1500000)).toBe('1.5M');
  });
});
