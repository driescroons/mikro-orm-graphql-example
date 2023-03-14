import { defineConfig } from 'vite';

export default defineConfig({
	test: {
		testTimeout: 2000,
		setupFiles: [],
		coverage: {
			reporter: ['text', 'html']
		},
		global: true
	}
});
