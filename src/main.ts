import './style.css'

interface Route {
  title: string
  render: () => string
}

const renderPortfolio = (): string => `
  <section class="fade-in">
    <h2>Portfolio</h2>
    <p>Engineering robust, highly optimized web architectures.</p>
  </section>
`

const renderBlog = (): string => `
  <section class="fade-in">
    <h2>Blog</h2>
    <p>Articles on frontend architecture and low-overhead engineering.</p>
  </section>
`

const routes: Record<string, Route> = {
  '#portfolio': { title: 'Portfolio | dreiv', render: renderPortfolio },
  '#blog': { title: 'Blog | dreiv', render: renderBlog },
}

const router = (): void => {
  const content = document.querySelector<HTMLElement>('#content')
  const navLinks = document.querySelectorAll<HTMLAnchorElement>('#main-nav a')

  if (!content) return

  const hash = window.location.hash || '#portfolio'
  const route = routes[hash] || routes['#portfolio']

  if (route) {
    document.title = route.title
    content.innerHTML = route.render()

    navLinks.forEach((link) => {
      if (link.getAttribute('href') === hash) {
        link.classList.add('active')
      } else {
        link.classList.remove('active')
      }
    })
  }
}

window.addEventListener('hashchange', router)
router()
