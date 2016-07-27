import chalk from 'chalk';

const levelTags = {
  trace: chalk.blue('TRACE'),
  debug: chalk.green('DEBUG'),
  info: chalk.cyan('INFO'),
  warning: chalk.magenta('WARNING'),
  error: chalk.yellow('ERROR'),
  fatal: chalk.red('FATAL'),
};

export default function consoleWriter(entry) {
  /* istanbul ignore else */
  if (typeof console !== 'undefined' && typeof console.log === 'function') {
    console.log(
      `${(
        entry.prefix ?
          `[${chalk.gray(entry.prefix)}]` :
          ''
      )}[${levelTags[entry.level]}]`, entry.msg
    );
  }
}
