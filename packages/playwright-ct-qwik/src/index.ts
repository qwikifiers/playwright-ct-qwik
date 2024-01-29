/* eslint-disable @typescript-eslint/no-var-requires */
// /* eslint-disable @typescript-eslint/no-var-requires */
// import {
//   test as baseTest,
//   devices,
//   expect,
//   defineConfig as originalDefineConfig,
// } from '@playwright/test';
// import path from 'path';

// const { fixtures } = require('@playwright/experimental-ct-core/lib/mount');

// process.env['NODE_ENV'] = 'test';

// function plugin() {
//   const {
//     createPlugin,
//   } = require('@playwright/experimental-ct-core/lib/vitePlugin');
//   return createPlugin(path.join(__dirname, 'registerSource.mjs'), () => {
//     // import('').then((m) => m.default)
//   });
// }

// const test = baseTest.extend(fixtures);
// const defineConfig = (config: any) =>
//   originalDefineConfig({ ...config, _plugins: [plugin] });

// export { test, expect, devices, defineConfig };

// ---------- NEW STUFF ---------

/**
 * Copyright (c) Microsoft Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const { test, expect, devices, defineConfig: originalDefineConfig } = require('@playwright/experimental-ct-core');
import path from 'path';

const plugin = async () => {
  // Only fetch upon request to avoid resolution in workers.
  const { createPlugin } = require('@playwright/experimental-ct-core/plugin');
  return createPlugin(
    path.join(__dirname, 'register-source.mjs'),
    () => import('@builder.io/qwik/optimizer').then(plugin => plugin.qwikVite()));
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const defineConfig = (config: any, ...configs: any[]) => originalDefineConfig({ ...config, _plugins: [plugin] }, ...configs);

module.exports = { test, expect, devices, defineConfig };
