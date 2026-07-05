const validRoutes = ['home', 'about', 'projects', 'blog', 'contact']
const defaultRoute = 'home'

const menuToggle = document.getElementById('menu-toggle') as HTMLButtonElement | null
const mainNav = document.getElementById('main-nav') as HTMLElement | null

// --- Mobile Menu Interaction ---
if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true'
    menuToggle.setAttribute('aria-expanded', (!isExpanded).toString())
    mainNav.classList.toggle('hidden')
  })
}

// --- Global Keyboard Event Listener ---
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mainNav && !mainNav.classList.contains('hidden')) {
    mainNav.classList.add('hidden')
    if (menuToggle) {
      menuToggle.setAttribute('aria-expanded', 'false')
      menuToggle.focus()
    }
  }
})

// --- Dynamic Router Logic ---
function handleNavigation() {
  const rawHash = window.location.hash.replace('#', '')
  const currentRoute = validRoutes.includes(rawHash) ? rawHash : defaultRoute

  const updateDOM = () => {
    document.querySelectorAll('.route-view').forEach((el) => {
      const section = el as HTMLElement
      if (section.id === currentRoute) {
        section.classList.remove('hidden')
        const heading = section.querySelector('h2')
        if (heading && rawHash !== '') {
          heading.focus()
        }
      } else {
        section.classList.add('hidden')
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

    if (mainNav && !mainNav.classList.contains('hidden') && window.innerWidth < 768) {
      mainNav.classList.add('hidden')
      if (menuToggle) {
        menuToggle.setAttribute('aria-expanded', 'false')
      }
    }
  }

  if (!document.startViewTransition) {
    updateDOM()
    return
  }

  document.startViewTransition(() => updateDOM())
}

// Intercept browser back/forward buttons and hash mutations
window.addEventListener('hashchange', handleNavigation)
handleNavigation()
