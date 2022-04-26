import App from './App.svelte';
import Login from './Login.svelte';

const app = new App({
	target: document.body,
	props: {
	}
});

new Login({
	target: document.body,
	props: {
	}
});

export default app;