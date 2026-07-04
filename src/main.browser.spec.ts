import { beforeEach, expect, test } from 'vitest'

beforeEach(() => {
  document.body.innerHTML = '<div id="app"></div>'
})

test('should render Hello World structural markup inside the root app node', async () => {
  await import('./main')

  const heading = document.querySelector('#app main h1')
  const paragraph = document.querySelector('#app main p')

  expect(heading).toBeTruthy()
  expect(heading?.textContent).toBe('Hello World')

  expect(paragraph).toBeTruthy()
  expect(paragraph?.textContent).toContain('Vanilla TypeScript portfolio boilerplate')
})
