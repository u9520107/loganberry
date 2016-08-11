import { expect } from 'chai';
import Loganberry from '../src/loganberry';
import { getKey } from 'data-types/key-value-map';
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
    afterEach(() => {
      Loganberry.level = logLevel.all;
      Loganberry.writers.forEach(writer => Loganberry.removeWriter(writer));
      Loganberry.addWriter(consoleWriter);
    });
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
    it('should filter log enters with lower level value', () => {
      Loganberry.removeWriter(consoleWriter);
      const logger = new Loganberry();
      let hasRun = false;
      const testWriter = () => {
        hasRun = true;
      };
      Loganberry.addWriter(testWriter);
      Loganberry.level = logLevel.warning;
      logger.info('test');
      expect(hasRun).to.be.false;
      logger.fatal('test');
      expect(hasRun).to.be.true;
    });
  });

  it('should have property `writers` which to defaults to [consoleWriter]', () => {
    expect(Loganberry.writers).to.exist;
    expect(Loganberry.writers).to.deep.equal([consoleWriter]);
  });

  it('should have method `addWriter`', () => {
    expect(Loganberry.addWriter).to.be.a('function');
  });
  describe('method `addWriter`', () => {
    afterEach(() => {
      Loganberry.writers.forEach(writer => Loganberry.removeWriter(writer));
      Loganberry.addWriter(consoleWriter);
    });
    it('should be able to add new writer to `writers`', () => {
      const testWriter = () => { };
      expect(() => Loganberry.addWriter(testWriter)).to.not.throw();
      expect(Loganberry.writers).to.deep.equal([consoleWriter, testWriter]);
    });
    it('added writer should be called with log entries', () => {
      let hasRun = false;
      const prefix = 't1';
      const level = logLevel.info;
      const message = { text: 'hello world' };
      const testWriter = msg => {
        hasRun = true;
        expect(msg).to.deep.equal({
          prefix,
          level: logLevel::getKey(level),
          msg: message,
          timestamp: msg.timestamp,
        });
      };
      Loganberry.removeWriter(consoleWriter);
      Loganberry.addWriter(testWriter);
      const logger = new Loganberry({
        prefix,
        level,
      });
      logger.info(message);
      expect(hasRun).to.be.true;
    });
  });

  it('should have method `removeWriter`', () => {
    expect(Loganberry.removeWriter).to.be.a('function');
  });
  describe('method `removeWriter`', () => {
    afterEach(() => {
      Loganberry.writers.forEach(writer => Loganberry.removeWriter(writer));
      Loganberry.addWriter(consoleWriter);
    });
    it('should remove writer from writers', () => {
      expect(() => Loganberry.removeWriter(consoleWriter)).to.not.throw();
      expect(Loganberry.writers).to.deep.equal([]);
    });
    it('removed writers should not be called', () => {
      Loganberry.removeWriter(consoleWriter);
      let hasRun = false;
      const testWriter = () => {
        hasRun = true;
      };
      let controlHasRun = false;
      const controlWriter = () => {
        controlHasRun = true;
      };
      Loganberry.addWriter(testWriter);
      Loganberry.addWriter(controlWriter);
      Loganberry.removeWriter(testWriter);
      const logger = new Loganberry();
      logger.info('test');
      expect(hasRun).to.be.false;
      expect(controlHasRun).to.be.true;
    });
  });

  describe('loganberry instance', () => {
    before(() => {
      Loganberry.removeWriter(consoleWriter);
    });
    after(() => {
      Loganberry.addWriter(consoleWriter);
    });
    afterEach(() => {
      Loganberry.writers.forEach(writer => Loganberry.removeWriter(writer));
    });
    it('should have a `prefix` property', () => {
      const nullLogger = new Loganberry({ prefix: null });
      const testLogger = new Loganberry({ prefix: 'test' });
      expect(nullLogger.prefix).to.be.null;
      expect(testLogger.prefix).to.equal('test');
    });
    it('prefix should be passed to writers as log entry property', () => {
      const prefix = 't2';
      let hasRun = false;
      const testWriter = entry => {
        hasRun = true;
        expect(entry.prefix).to.equal(prefix);
      };
      Loganberry.addWriter(testWriter);
      const logger = new Loganberry({ prefix });
      logger.info('test');
      expect(hasRun).to.be.true;
    });
    describe('log functions', () => {
      afterEach(() => {
        Loganberry.writers.forEach(writer => Loganberry.removeWriter(writer));
      });
      const prefix = 't3';
      const logger = new Loganberry({ prefix });
      const message = { test: true };
      it('loganberry instance should have a `log` method', () => {
        expect(logger.log).to.be.a('function');
      });
      it('log method should call writers with log entry objects', () => {
        let hasRun = false;
        const testWriter = entry => {
          hasRun = true;
          expect(entry.timestamp).to.be.a('number');
          expect(entry.prefix).to.equal(prefix);
          expect(entry.msg).to.equal(message);
          expect(entry.level).to.equal(logLevel::getKey(logLevel.info));
        };
        Loganberry.addWriter(testWriter);
        logger.log(message, logLevel.info);
        expect(hasRun).to.be.true;
      });
      it('should do nothing if parameter `level` is NaN', () => {
        let hasRun = false;
        const testWriter = () => {
          hasRun = true;
        };
        Loganberry.addWriter(testWriter);
        logger.log(message, 'isNaN');
        expect(hasRun).to.be.false;
      });

      it('`trace` method', () => {
        let hasRun = false;
        const testWriter = entry => {
          hasRun = true;
          expect(entry.level).to.equal(logLevel::getKey(logLevel.trace));
        };
        Loganberry.addWriter(testWriter);
        logger.trace(message);
        expect(hasRun).to.be.true;
      });
      it('`debug` method', () => {
        let hasRun = false;
        const testWriter = entry => {
          hasRun = true;
          expect(entry.level).to.equal(logLevel::getKey(logLevel.debug));
        };
        Loganberry.addWriter(testWriter);
        logger.debug(message);
        expect(hasRun).to.be.true;
      });
      it('`info` method', () => {
        let hasRun = false;
        const testWriter = entry => {
          hasRun = true;
          expect(entry.level).to.equal(logLevel::getKey(logLevel.info));
        };
        Loganberry.addWriter(testWriter);
        logger.info(message);
        expect(hasRun).to.be.true;
      });
      it('`warning` method', () => {
        let hasRun = false;
        const testWriter = entry => {
          hasRun = true;
          expect(entry.level).to.equal(logLevel::getKey(logLevel.warning));
        };
        Loganberry.addWriter(testWriter);
        logger.warning(message);
        expect(hasRun).to.be.true;
      });
      it('`error` method', () => {
        let hasRun = false;
        const testWriter = entry => {
          hasRun = true;
          expect(entry.level).to.equal(logLevel::getKey(logLevel.error));
        };
        Loganberry.addWriter(testWriter);
        logger.error(message);
        expect(hasRun).to.be.true;
      });
      it('`fatal` method', () => {
        let hasRun = false;
        const testWriter = entry => {
          hasRun = true;
          expect(entry.level).to.equal(logLevel::getKey(logLevel.fatal));
        };
        Loganberry.addWriter(testWriter);
        logger.fatal(message);
        expect(hasRun).to.be.true;
      });
    });

    it('should have an `enums` property that has logLevel enum object', () => {
      const logger = new Loganberry();
      expect(logger.enums).to.exist;
      expect(logger.enums.logLevel).to.equal(logLevel);
    });

    it('should have a `level` property', () => {
      const logger = new Loganberry();
      expect(logger.level).to.exist;
    });
    describe('level', () => {
      afterEach(() => {
        Loganberry.writers.forEach(writer => Loganberry.removeWriter(writer));
        Loganberry.level = logLevel.all;
      });
      it('should filter log entries with lower level', () => {
        let hasRun = false;
        const testWriter = () => {
          hasRun = true;
        };
        Loganberry.addWriter(testWriter);

        const logger = new Loganberry({ level: logLevel.info });
        logger.trace('test');
        expect(hasRun).to.be.false;
        logger.info('test');
        expect(hasRun).to.be.true;
      });

      it('can be set to logLevel values', () => {
        const logger = new Loganberry();
        logger.level = logLevel.info;
        expect(logger.level).to.equal(logLevel.info);
      });

      it('ignores value when set to non-logLevel values', () => {
        const logger = new Loganberry();
        expect(() => {
          logger.level = 'bad value';
        }).to.not.throw();
        expect(logger.level).to.equal(logLevel.all);
      });
    });
  });
});
