/* eslint-disable @typescript-eslint/no-var-requires */
import {
  test as baseTest,
  devices,
  expect,
  defineConfig as originalDefineConfig,
} from '@playwright/test';
import path from 'path';

const { fixtures } = require('@playwright/experimental-ct-core/lib/mount');

process.env['NODE_ENV'] = 'test';

function plugin() {
  const {
    createPlugin,
  } = require('@playwright/experimental-ct-core/lib/vitePlugin');
  return createPlugin(path.join(__dirname, 'registerSource.mjs'), () => {
    // import('').then((m) => m.default)
  });
}

const test = baseTest.extend(fixtures);
const defineConfig = (config: any) =>
  originalDefineConfig({ ...config, _plugins: [plugin] });

export { test, expect, devices, defineConfig };
