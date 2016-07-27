import { expect } from 'chai';
import SymbolMap from '../src/lib/symbol-map';

describe('SymbolMap', () => {
  it('should be a constructor function', () => {
    expect(SymbolMap).to.be.a('function');
    expect(new SymbolMap([])).to.be.a('object');
  });
  describe('symbolMap instance', () => {
    const keys = ['one', 'two'];
    const symbolMap = new SymbolMap(keys);
    it('should have property keys as defined by keys', () => {
      keys.forEach(key => {
        expect(symbolMap[key]).to.exist;
      });
    });
    it('should have property value of type Symbol', () => {
      keys.forEach(key => {
        expect(symbolMap[key]).to.be.a('symbol');
      });
    });
  });
});
