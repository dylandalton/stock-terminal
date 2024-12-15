import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux';
import store from './state/store';
import App from './App';

async function enableMocking() {
  console.log("Outside: ", import.meta.env.VITE_API_MOCK);
  console.log("MODE: ", import.meta.env.MODE);
  console.log("NODE_ENV: ", process.env.NODE_ENV);

  if (import.meta.env.MODE === 'development' && import.meta.env.VITE_API_MOCK === 'true') { 
    console.log("Inside");
    const { worker } = await import('./mocks/browser')
    // `worker.start()` returns a Promise that resolves
    // once the Service Worker is up and ready to intercept requests.

    // Attach event listeners for detailed logging
    worker.events.on('request:start', (req) => {
      console.log('🟡 MSW Request started:', req.request.url);
    });

    worker.events.on('request:unhandled', (req) => {
      console.warn('🔴 MSW Unhandled Request:', req.request.url);
    });

    worker.events.on('response:mocked', (res) => {
      console.log('🟢 MSW Mocked Response:', {res});
    });

    return worker.start({onUnhandledRequest: 'warn'})
  } else if(import.meta.env.NODE_ENV === 'test' && import.meta.env.VITE_API_MOCK === 'false'){
    console.log("Entered into test mode.");
  }
}

async function initApp() {
  await enableMocking();
  const root = createRoot(document.getElementById('root')!);
  root.render(
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>,
  );
}

initApp();
