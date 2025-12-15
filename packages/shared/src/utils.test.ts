import { isValidEmail, generateId, parseJSON, sleep } from './utils';

describe('utils', () => {
  describe('isValidEmail', () => {
    it('should validate correct email addresses', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
    });

    it('should reject invalid email addresses', () => {
      expect(isValidEmail('invalid')).toBe(false);
      expect(isValidEmail('test@')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
    });
  });

  describe('generateId', () => {
    it('should generate unique IDs', () => {
      const id1 = generateId();
      const id2 = generateId();
      expect(id1).not.toBe(id2);
      expect(typeof id1).toBe('string');
      expect(id1.length).toBeGreaterThan(0);
    });
  });

  describe('parseJSON', () => {
    it('should parse valid JSON', () => {
      const obj = { name: 'test', value: 123 };
      const result = parseJSON(JSON.stringify(obj));
      expect(result).toEqual(obj);
    });

    it('should return null for invalid JSON', () => {
      expect(parseJSON('invalid json')).toBeNull();
      expect(parseJSON('')).toBeNull();
    });
  });

  describe('sleep', () => {
    it('should delay execution', async () => {
      const start = Date.now();
      await sleep(100);
      const end = Date.now();
      expect(end - start).toBeGreaterThanOrEqual(100);
    });
  });
});
