import { expect } from 'chai';
import consoleWriter from '../src/lib/console-writer';
import chalk from 'chalk';

describe('consoleWriter', () => {
  it('should be a function', () => {
    expect(consoleWriter).to.be.a('function');
  });
  it('should print logs to console with proper prefix', () => {
    const oldLog = console.log;
    console.log = (tags, msg) => {
      expect(tags).to.equal(`[${chalk.gray('test')}][${chalk.cyan('INFO')}]`);
      expect(msg).to.equal('test');
    };
    consoleWriter({
      prefix: 'test',
      msg: 'test',
      level: 'info',
    });
    console.log = oldLog;
  });
  it('should print logs to console when there is no prefix', () => {
    const oldLog = console.log;
    console.log = (tags, msg) => {
      expect(tags).to.equal(`[${chalk.cyan('INFO')}]`);
      expect(msg).to.equal('test');
    };
    consoleWriter({
      msg: 'test',
      level: 'info',
    });
    console.log = oldLog;
  });
});
