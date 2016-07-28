# loganberry

[![Build Status](https://travis-ci.org/u9520107/loganberry.svg?branch=master)](https://travis-ci.org/u9520107/loganberry)
[![Coverage Status](https://coveralls.io/repos/github/u9520107/loganberry/badge.svg?branch=master)](https://coveralls.io/github/u9520107/loganberry?branch=master)

Simple logging library.

Install
---
```bash
npm install --save loganberry
```

Usage
---
```javascript
import Loganberry from 'loganberry';

const logger = new Loganberry({
    prefix: 'custom_tag',
    level: Loganberry.enums.logLevel.info,
});

logger.warning('This is a warning');

```
