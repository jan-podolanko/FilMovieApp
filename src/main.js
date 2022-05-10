import Login from './components/Login.svelte';

const app = new Login({
	target: document.body,
	props: {
	}
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
}
/* const  Login({
	target: document.body,
	props: {
	}
}); */

export default app;