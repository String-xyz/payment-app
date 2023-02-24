import './style.css'
import { setupIframe } from './iframe'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Payment iFrame Example</h1>
    <button>PAY NOW</button>
</div>
  </div>
`
setupIframe(document.querySelector<HTMLDivElement>('#app')!)
