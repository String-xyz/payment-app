import './style.css'
import { setupIframe } from './iframe'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Payment iFrame Example</h1>
</div>
  </div>
`
setupIframe(document.querySelector<HTMLDivElement>('#app')!)
