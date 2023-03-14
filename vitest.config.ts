import { defineConfig } from 'vite';
import graphql from '@rollup/plugin-graphql';

export default defineConfig({
	test: {
		testTimeout: 2000,
		setupFiles: [],
		coverage: {
			reporter: ['text', 'html']
		},
		global: true,
		plugins: [graphql()]
	}
});
