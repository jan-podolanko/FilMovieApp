import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
	}
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
}
/* new Login({
	target: document.body,
	props: {
	}
}); */

export default app;