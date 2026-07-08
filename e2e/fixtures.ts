import { test as base, expect } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

type MyFixtures = {
  makeAxeBuilder: () => AxeBuilder;
};

export const test = base.extend<MyFixtures>({
  makeAxeBuilder: async ({ page }, use) => {
    const makeAxeBuilder = () =>
      new AxeBuilder({ page }).withTags([
        'wcag2a',
        'wcag2aa',
        'wcag21a',
        'wcag21aa',
        'best-practice',
      ]);

    await use(makeAxeBuilder);
  },
});

export { expect };
