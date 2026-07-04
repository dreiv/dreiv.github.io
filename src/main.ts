import './style.css'

interface Route {
  title: string
  render: () => string
}

const renderPortfolio = (): string => `
  <section class="fade-in">
    <h2>Portfolio</h2>
    <p>Engineering robust, highly optimized web architectures with a focus on web performance and clean developer tooling.</p>
    <div class="projects-grid">
      <!-- Add projects here -->
    </div>
  </section>
`

const renderBlog = (): string => `
  <section class="fade-in">
    <h2>Blog</h2>
    <p>Articles on frontend architecture, deep-diving into low-overhead engineering.</p>
    <ul class="posts-list">
      <!-- Add blog posts here -->
    </ul>
  </section>
`

const routes: Record<string, Route> = {
  '#portfolio': { title: 'Portfolio | dreiv', render: renderPortfolio },
  '#blog': { title: 'Blog | dreiv', render: renderBlog },
}

const router = (): void => {
  const app = document.querySelector<HTMLDivElement>('#app')
  if (!app) return

  const hash = window.location.hash || '#portfolio'
  const route = routes[hash] || routes['#portfolio']

  if (route) {
    document.title = route.title
    app.innerHTML = `
      <header>
        <nav>
          <a href="#portfolio" class="${hash === '#portfolio' ? 'active' : ''}">Portfolio</a>
          <a href="#blog" class="${hash === '#blog' ? 'active' : ''}">Blog</a>
        </nav>
      </header>
      <main>
        ${route.render()}
      </main>
    `
  }
}

window.addEventListener('hashchange', router)
window.addEventListener('DOMContentLoaded', router)
