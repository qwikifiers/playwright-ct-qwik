// eslint-disable-next-line @nx/enforce-module-boundaries
import { test, expect } from '../../../../../dist/packages/playwright-ct-qwik/';
import { DemoTest } from './demo-test';

test.use({ viewport: { width: 500, height: 500 } });

test('should work', async ({ mount }) => {
  const component = await mount(<DemoTest />);
  await expect(component).toContainText('Hello from playwright-ct-qwik');
});
