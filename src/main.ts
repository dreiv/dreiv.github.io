import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')

if (app) {
  app.innerHTML = `
    <main>
      <h1>Hello World</h1>
      <p>Vanilla TypeScript portfolio boilerplate running at maximum performance.</p>
    </main>
  `
}
