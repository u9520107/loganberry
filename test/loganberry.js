import { expect } from 'chai';
import Loganberry from '../src/loganberry';
import { getKey } from '../src/lib/enum';
import logLevel from '../src/enum/log-level';

import consoleWriter from '../src/lib/console-writer';

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
  });

  it('should be able to accept `level` options', () => {
    const level = Loganberry.enums.logLevel.warning;
    const logger = new Loganberry({
      level,
    });
    expect(logger.level).to.equal(level);
  });

  it('should have an `enums` property that has logLevel enum object', () => {
    expect(Loganberry.enums).to.exist;
    expect(Loganberry.enums.logLevel).to.equal(logLevel);
  });

  it('should have property `level`', () => {
    expect(Loganberry.level).to.exist;
  });
  describe('property `level`', () => {
    it('should default to logLevel.all', () => {
      expect(Loganberry.level).to.equal(logLevel.all);
    });
    it('should be able to be set to other logLevel values', () => {
      expect(() => {
        Loganberry.level = logLevel.info;
      }).to.not.throw();
      expect(Loganberry.level).to.equal(logLevel.info);
      Loganberry.level = logLevel.all;
    });
    it('should ignore values if set to non-logLevel values', () => {
      Loganberry.level = 'wrong value';
      expect(Loganberry.level).to.equal(logLevel.all);
    });
  });
  it('should have property `writers` which to defaults to [consoleWriter]', () => {
    expect(Loganberry.writers).to.exist;
    expect(Loganberry.writers).to.deep.equal([consoleWriter]);
  });

  it(
    'should have method `addWriter` and `removeWriter` which would add and remove a writer',
    () => {
      expect(Loganberry.addWriter).to.be.a('function');
      const writer = () => { };
      expect(() => {
        Loganberry.addWriter(writer);
      }).to.not.throw();
      expect(Loganberry.writers).to.deep.equal([consoleWriter, writer]);
      Loganberry.removeWriter(writer);
      expect(Loganberry.writers).to.deep.equal([consoleWriter]);
    }
  );

  // it('test', () => {
  //   const logger = new Loganberry({ prefix: 'RC' });
  //   logger.level = logger.enums.logLevel.warning;
  //   logger.fatal('something is very wrong');
  //   logger.info({
  //     time: new Date(),
  //   });
  // });
});
