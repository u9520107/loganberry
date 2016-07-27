const hasOwnProperty = {}.hasOwnProperty;
const DEFINITION = Symbol();
const VALUEMAP = Symbol();

/**
 * @class Enum
 * @description Simple Enum class
 */
export default class Enum {
  /**
   * @constructor
   * @param {Object} definition
   */
  constructor(definition) {
    this[DEFINITION] = Object.assign({}, definition);
    this[VALUEMAP] = new Map();

    for (const key in definition) {
      /* istanbul ignore else */
      if (hasOwnProperty.call(definition, key)) {
        Object.defineProperty(this, key, {
          get() {
            return this[DEFINITION][key];
          },
          enumerable: true,
        });
        this[VALUEMAP].set(this[DEFINITION][key], key);
      }
    }
    Object.freeze(this);
  }
}
/**
 * @function hasValue
 * @param {any} value
 * @return {Boolean}
 * @description Determines if the value set of the enum object contains the value
 */
export function hasValue(value) {
  return this[VALUEMAP].has(value);
}
/**
 * @function getKey
 * @param {any} value
 * @return {String}
 * @description Returns the key of the values passed for the enum
 */
export function getKey(value) {
  return this[VALUEMAP].get(value);
}
