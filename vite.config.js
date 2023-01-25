import { sveltekit } from '@sveltejs/kit/vite';
import env from 'vite-plugin-environment';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		sveltekit(),
		env('all'),
	],
	server:{
		port:3000,
		strictPort:false,
	},
	test: {
		globals: true,
		environment: "jsdom",
	},
};

export default config;
