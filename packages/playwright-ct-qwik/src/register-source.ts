/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Copyright (c) Microsoft Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// @ts-check
// This file is injected into the registry as text, no dependencies are allowed.

import { JSXOutput, render } from '@builder.io/qwik';
import { QWIK_LOADER } from '@builder.io/qwik/loader';
import {
  Component,
  JsonObject,
} from '@playwright/experimental-ct-core/types/component';
/**
 * @param {any} component
 * @returns {component is JsxComponent}
 */
// function isJsxComponent(component) {
//   return typeof component === 'object' && component && component.__pw_type === 'jsx';
// }

export function addQwikLoader() {
  const scriptEl = document.createElement('script');
  const inlineScript = document.createTextNode(QWIK_LOADER);
  scriptEl.appendChild(inlineScript);
  document.body.appendChild(scriptEl);
}

addQwikLoader();

const __pwUnmountKey = Symbol('unmountKey');

window.playwrightMount = async (
  component: Component,
  rootElement: HTMLElement,
  hooksConfig: JsonObject
) => {
  // if (!isJsxComponent(component))
  //   throw new Error('Object mount notation is not supported');

  let componentToRender = component as unknown as JSXOutput;
  for (const hook of window['__pw_hooks_before_mount'] || []) {
    const wrapper = await hook({ component, hooksConfig });
    if (wrapper) {
      componentToRender = wrapper;
    }
  }

  const { cleanup } = await render(rootElement, componentToRender);

  (rootElement as any)[__pwUnmountKey] = cleanup;

  for (const hook of window['__pw_hooks_after_mount'] || [])
    await hook({ hooksConfig });
};

window.playwrightUnmount = async (rootElement) => {
  const cleanup = (rootElement as any)[__pwUnmountKey];
  if (!cleanup) throw new Error('Component was not mounted');

  cleanup();
};

window.playwrightUpdate = async (
  rootElement: HTMLElement,
  component: Component
) => {
  // if (!isJsxComponent(component))
  //   throw new Error('Object mount notation is not supported');

  window.playwrightUnmount(rootElement);
  window.playwrightMount(component, rootElement, {});
};
