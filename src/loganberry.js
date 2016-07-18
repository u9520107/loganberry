import chalk from 'chalk';

const PREFIX = Symbol();

const logLevels = {
  none: 0,
  trace: 1,
  debug: 2,
  info: 3,
  warning: 4,
  error: 5,
  fatal: 6,
};
Object.freeze(logLevels);


let LOG_LEVEL = logLevels.info;
const CUSTOM_LOGGERS = new Set();


export default class LoganBerry {
  constructor(prefix = '') {
    this[PREFIX] = prefix;
  }
  get prefix() {
    return this[PREFIX];
  }

  static get logLevel() {
    return LOG_LEVEL;
  }
  get logLevel() {
    return LOG_LEVEL;
  }
  static set logLevel(value) {
    if (typeof value === 'number') {
      LOG_LEVEL = value;
    }
  }
  set logLevel(value) {
    if (!isNaN(value)) {
      LOG_LEVEL = value;
    }
  }


  static log(msg, data = null, level = logLevels.info, prefix = '') {
    if (!msg) return;
    if (LOG_LEVEL < level) return;

    const entry = {
      prefix,
      level,
      msg,
    };
    if (data) {
      entry.data = data;
    }
  }
  log(msg, data, level) {
    LoganBerry.log(msg, data, level, this.prefix);
  }
  static trace(msg, data, prefix) {
    this.log(msg, data, logLevels.trace, prefix);
  }
  trace(msg, data) {
    LoganBerry.log(msg, data, logLevels.trace, this.prefix);
  }
  static debug(msg, data, prefix) {
    this.log(msg, data, logLevels.debug, prefix);
  }
  debug(msg, data) {
    LoganBerry.log(msg, data, logLevels.debug, this.prefix);
  }
  static info(msg, data, prefix) {
    this.log(msg, data, logLevels.info, prefix);
  }
  info(msg, data) {
    LoganBerry.log(msg, data, logLevels.info, this.prefix);
  }
  static warning(msg, data, prefix) {
    this.log(msg, data, logLevels.warning, prefix);
  }
  warning(msg, data) {
    LoganBerry.log(msg, data, logLevels.warning, this.prefix);
  }
  static error(msg, data, prefix) {
    this.log(msg, data, logLevels.error, prefix);
  }
  error(msg, data) {
    LoganBerry.log(msg, data, logLevels.error, this.prefix);
  }
  static fatal(msg, data, prefix) {
    this.log(msg, data, logLevels.fatal, prefix);
  }
  fatal(msg, data) {
    LoganBerry.log(msg, data, logLevels.fatal, this.prefix);
  }
}

