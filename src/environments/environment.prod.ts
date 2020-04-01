import * as npm from '../../package.json';

export const environment = {
  production: true,
  proxy: true,
  version: npm.version
};
