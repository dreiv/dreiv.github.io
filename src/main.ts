const validRoutes = ['home', 'about', 'projects', 'contact']
const defaultRoute = 'home'

const mainNav = document.getElementById('main-nav') as HTMLElement | null

export function handleNavigation() {
  const rawHash = window.location.hash.replace('#', '')
  const currentRoute = validRoutes.includes(rawHash) ? rawHash : defaultRoute

  const updateDOM = () => {
    document.querySelectorAll('.route-view').forEach((el) => {
      const section = el as HTMLElement
      if (section.id === currentRoute) {
        section.classList.remove('hidden')
        const heading = section.querySelector('h2') || section.querySelector('h1')
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

    // If open on a mobile viewport layout, shut the popover container cleanly on link click
    if (mainNav && window.innerWidth < 768 && mainNav.matches(':popover-open')) {
      mainNav.hidePopover()
    }
  }

  if (!document.startViewTransition) {
    updateDOM()
    return
  }

  document.startViewTransition(() => updateDOM())
}

window.addEventListener('hashchange', handleNavigation)
handleNavigation()

// --- Fade-In-Slide Scroll Reveal Animation Engine ---
const observerOptions: IntersectionObserverInit = {
  root: null,
  rootMargin: '0px',
  threshold: 0.15, // Triggers when 15% of the block is visible
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible')

      observer.unobserve(entry.target)
    }
  })
}, observerOptions)

document.querySelectorAll('.reveal-block').forEach((block) => {
  observer.observe(block)
})
