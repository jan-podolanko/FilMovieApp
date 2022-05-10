import Login from './components/Login.svelte';

const app = new Login({
	target: document.body,
	props: {
	}
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
}

export default app;