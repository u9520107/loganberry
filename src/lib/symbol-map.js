import Enum from './enum';

/**
 * @class SymbolMap
 * @description Helper class for making a symbol map object
 */
export default class SymbolMap extends Enum {
  /**
   * @constructor
   * @param {[String]} keys
   */
  constructor(keys) {
    const definition = {};
    keys.forEach(key => {
      definition[key] = Symbol(key);
    });
    super(definition);
  }
}
