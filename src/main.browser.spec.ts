import { beforeEach, expect, test } from 'vitest'

beforeEach(() => {
  document.body.innerHTML = '<div id="app"></div>'
})

test('should render structural layout and navigation links', async () => {
  await import('./main')

  window.dispatchEvent(new Event('DOMContentLoaded'))

  const nav = document.querySelector('#app header nav')
  const portfolioLink = document.querySelector('a[href="#portfolio"]')

  expect(nav).toBeTruthy()
  expect(portfolioLink).toBeTruthy()
  expect(portfolioLink?.textContent).toBe('Portfolio')
})
