import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
    plugins: [solidPlugin()],
    server: {
        port: 3000,
    },
    build: {
        target: 'esnext',
    },
    test: {
        globals: true,
        environment: 'jsdom',
        transformMode: {
            web: [/\.tsx?$/],
        },
        setupFiles: 'src/setupVitest.js',
        deps: {
            inline: [/solid-js/, /solid-testing-library/],
        },
        coverage: {
            provider: 'c8', //'istanbul', // or 'c8'
            reporter: ['text', 'json', 'html'],
            exclude: [
                'node_modules/',
                'src/setupTests.ts',
            ],
        },
    },
    resolve: {
        conditions: ['development', 'browser'],
    },
});
