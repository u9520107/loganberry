import Enum, { getKey, hasValue } from './lib/enum';
import SymbolMap from './lib/symbol-map';
import logLevel from './enum/log-level';
import consoleWriter from './lib/console-writer';

const symbols = new SymbolMap([
  'prefix',
  'level',
]);

const enums = new Enum({
  logLevel,
});

const globalSettings = {
  writers: new Set([consoleWriter]),
  level: logLevel.all,
};
export default class Loganberry {
  constructor(options = {}) {
    const {
      prefix = null,
      level = logLevel.all,
    } = options;
    this[symbols.prefix] = prefix;
    this[symbols.level] = level;
  }
  static get enums() {
    return enums;
  }
  get enums() {
    return enums;
  }

  static get level() {
    return globalSettings.level;
  }
  static set level(value) {
    if (logLevel::hasValue(value)) {
      globalSettings.level = value;
    }
  }

  static get writers() {
    return [...globalSettings.writers];
  }
  static addWriter(writer) {
    globalSettings.writers.add(writer);
  }
  static removeWriter(writer) {
    globalSettings.writers.delete(writer);
  }

  get level() {
    return this[symbols.level];
  }
  set level(value) {
    if (logLevel::hasValue(value)) {
      this[symbols.level] = value;
    }
  }

  get prefix() {
    return this[symbols.prefix];
  }

  log(msg, level) {
    if (isNaN(level) || level < Math.max(this[symbols.level], globalSettings.level)) return;
    const timestamp = Date.now();
    globalSettings.writers.forEach(writer => {
      writer({
        prefix: this[symbols.prefix],
        msg,
        level: logLevel::getKey(level),
        timestamp,
      });
    });
  }

  trace(msg) {
    this.log(msg, logLevel.trace);
  }

  debug(msg) {
    this.log(msg, logLevel.debug);
  }

  info(msg) {
    this.log(msg, logLevel.info);
  }

  warning(msg) {
    this.log(msg, logLevel.warning);
  }

  error(msg) {
    this.log(msg, logLevel.error);
  }

  fatal(msg) {
    this.log(msg, logLevel.fatal);
  }

}
