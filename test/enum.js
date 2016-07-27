import { expect } from 'chai';
import Enum, { hasValue, getKey } from '../src/lib/enum';

describe('Enum', () => {
  it('should be a constructor function', () => {
    expect(Enum).to.be.a('function');
    expect(new Enum({})).to.be.a('object');
  });
  describe('enum instance', () => {
    const def = {
      a: true,
      b: false,
    };
    const result = new Enum(def);
    it('should shape similar to the definition object', () => {
      expect(result).to.deep.equal(def);
    });
    it('should not allow new properties to be set', () => {
      expect(() => {
        result.c = true;
      }).to.throw();
    });
    it('should not allow existing properties to be set', () => {
      expect(() => {
        result.a = 3;
      }).to.throw();
    });
  });
  describe('getKey', () => {
    const def = {
      keyString: 'value1',
      keySymbol: Symbol(),
      keyNumber: 3,
      keyBoolean: true,
      keyFunction: () => { },
      keyObject: {},
      keyArray: [],
    };
    const result = new Enum(def);
    it('should be a function', () => {
      expect(getKey).to.be.a('function');
    });
    it('should retrive the key of a enum value', () => {
      for (const key in def) {
        if (def.hasOwnProperty(key)) {
          expect(result::getKey(result[key])).to.equal(key);
        }
      }
    });
    it('should return undefined for a non-existing value', () => {
      expect(result::getKey('badValue')).to.be.undefined;
    });
  });

  describe('hasValue', () => {
    const def = {
      keyString: 'value1',
      keySymbol: Symbol(),
      keyNumber: 3,
      keyBoolean: true,
      keyFunction: () => { },
      keyObject: {},
      keyArray: [],
    };
    const result = new Enum(def);
    it('should be a function', () => {
      expect(hasValue).to.be.a('function');
    });
    it('should return true if enum instance as value', () => {
      for (const key in def) {
        if (def.hasOwnProperty(key)) {
          expect(result::hasValue(result[key])).to.be.true;
        }
      }
    });
    it('should result false if enum instance does not have value', () => {
      expect(result::hasValue('badValue')).to.be.false;
    });
  });
});

