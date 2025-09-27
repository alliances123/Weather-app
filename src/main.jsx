import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { store } from './app/store.js'
import { Provider } from 'react-redux'
import './index.css'
import makeServer from "./server.js"

if (process.env.NODE_ENV === "development") {
  makeServer()
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
