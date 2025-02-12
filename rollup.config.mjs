import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
/**
 * @type {import('rollup').RollupOptions}
 */
export default {
	input: 'src/index.js',
	output: [{
        file: 'dist/index.js',
		format: 'esm',
        sourcemap: true
	}, {
        file: 'dist/index.cjs',
        format: 'cjs',
        sourcemap: true
    }],
    plugins: [
        nodeResolve(),
        commonjs(),
        json()
    ]
};