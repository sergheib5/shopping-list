import { describe, it, expect } from 'vitest';
import { STORES, getStoreColor } from './constants';

describe('constants', () => {
  describe('STORES', () => {
    it('should contain expected store names', () => {
      expect(STORES).toContain('Fresh Farm');
      expect(STORES).toContain('Aldi');
      expect(STORES).toContain('Costco');
      expect(STORES).toContain("Binny's");
      expect(STORES).toContain('Other');
    });

    it('should be an array', () => {
      expect(Array.isArray(STORES)).toBe(true);
    });
  });

  describe('getStoreColor', () => {
    it('should return correct color for Fresh Farm', () => {
      expect(getStoreColor('Fresh Farm')).toBe('#4caf50');
    });

    it('should return correct color for Aldi', () => {
      expect(getStoreColor('Aldi')).toBe('#2196f3');
    });

    it('should return correct color for Costco', () => {
      expect(getStoreColor('Costco')).toBe('#f44336');
    });

    it('should return correct color for Binny\'s', () => {
      expect(getStoreColor("Binny's")).toBe('#212121');
    });

    it('should return default color for Other', () => {
      expect(getStoreColor('Other')).toBe('#9e9e9e');
    });

    it('should return default color for unknown store', () => {
      expect(getStoreColor('Unknown Store')).toBe('#9e9e9e');
    });

    it('should return default color for null', () => {
      expect(getStoreColor(null)).toBe('#9e9e9e');
    });

    it('should return default color for undefined', () => {
      expect(getStoreColor(undefined)).toBe('#9e9e9e');
    });
  });
});
