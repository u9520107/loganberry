import { expect } from 'chai';
import Loganberry from '../src/loganberry';
import { getKey } from '../src/lib/enum';
/* global describe it */

import consoleWriter from '../src/lib/console-writer';
Loganberry.removeWriter(consoleWriter);

describe('Loganberry', () => {
  it('should be a constructor function', () => {
    expect(Loganberry).to.be.a('function');
    expect(new Loganberry()).to.be.a('object');
  });
  it('should be able to accept `prefix` option', () => {
    const prefix = 'test-prefix';
    const logger = new Loganberry({
      prefix,
    });
    expect(logger.prefix).to.equal(prefix);
    let writerUsed = false;
    const writer = (msg) => {
      writerUsed = true;
      expect(msg.prefix).to.equal(prefix);
    };
    Loganberry.addWriter(writer);
    logger.info('test');
    Loganberry.removeWriter(writer);
    expect(writerUsed).to.equal(true);
  });
  it('should be able to accept `level` options', () => {
    const level = Loganberry.enums.logLevel.warning;
    const logger = new Loganberry({
      level,
    });
    expect(logger.level).to.equal(level);
    let hadWarning = false;
    const warningWriter = (msg) => {
      hadWarning = true;
      expect(msg.level).to.equal(Loganberry.enums.logLevel::getKey(level));
    };
    Loganberry.addWriter(warningWriter);
    logger.warning('test');
    Loganberry.addWriter(warningWriter);
    expect(hadWarning).to.equal(true);
  });

  it('test', () => {
    const logger = new Loganberry({ prefix: 'RC' });
    logger.level = logger.enums.logLevel.warning;
    logger.fatal('something is very wrong');
    logger.info({
      time: new Date(),
    });
  });
});
