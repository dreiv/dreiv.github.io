import { beforeEach, expect, test } from 'vitest'

beforeEach(() => {
  document.body.innerHTML = `
    <div id="app">
      <header>
        <nav aria-label="Main Navigation">
          <ul id="main-nav">
             <li><a href="#home" class="nav-link">Home</a></li>
             <li><a href="#blog" class="nav-link">Blog</a></li>
          </ul>
        </nav>
      </header>
      <main id="content"></main>
    </div>
  `
})

test('should render structural layout and navigation links', async () => {
  await import('./main')

  const nav = document.querySelector('nav')
  const homeLink = document.querySelector('a[href="#home"]')

  expect(nav).toBeTruthy()
  expect(homeLink).toBeTruthy()
  expect(homeLink?.textContent).toBe('Home')
})
