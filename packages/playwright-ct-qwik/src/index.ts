/* eslint-disable @typescript-eslint/no-var-requires */

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

const {
  test,
  expect,
  devices,
  defineConfig: originalDefineConfig,
} = require('@playwright/experimental-ct-core');
import path from 'path';

const plugin = async () => {
  // Only fetch upon request to avoid resolution in workers.
  const { createPlugin } = require('@playwright/experimental-ct-core/plugin');
  return createPlugin(path.join(__dirname, 'register-source.mjs'), () =>
    import('@builder.io/qwik/optimizer').then((plugin) => plugin.qwikVite()),
  );
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const defineConfig = (config: any, ...configs: any[]) =>
  originalDefineConfig({ ...config, _plugins: [plugin] }, ...configs);

module.exports = { test, expect, devices, defineConfig };
