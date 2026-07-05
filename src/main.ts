import './style.css'

const validRoutes = ['home', 'about', 'projects', 'blog', 'contact']
const defaultRoute = 'home'

function handleNavigation() {
  const rawHash = window.location.hash.replace('#', '')
  const currentRoute = validRoutes.includes(rawHash) ? rawHash : defaultRoute

  document.querySelectorAll('.route-view').forEach((el) => {
    const section = el as HTMLElement
    if (section.id === currentRoute) {
      section.classList.remove('hidden')
      section.classList.add('animate-in', 'fade-in', 'duration-300') // Optional Tailwind micro-interaction

      const heading = section.querySelector('h2')
      if (heading && rawHash !== '') {
        heading.focus()
      }
    } else {
      section.classList.add('hidden')
      section.classList.remove('animate-in', 'fade-in', 'duration-300')
    }
  })

  document.querySelectorAll('.nav-link').forEach((el) => {
    const link = el as HTMLAnchorElement
    if (link.getAttribute('href') === `#${currentRoute}`) {
      link.setAttribute('aria-current', 'page')
      link.classList.add('underline', 'decoration-2', 'underline-offset-4')
    } else {
      link.removeAttribute('aria-current')
      link.classList.remove('underline', 'decoration-2', 'underline-offset-4')
    }
  })
}

window.addEventListener('hashchange', handleNavigation)
window.addEventListener('DOMContentLoaded', handleNavigation)
