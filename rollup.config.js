import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import resolve from 'rollup-plugin-node-resolve';
import vue from 'rollup-plugin-vue';
import alias from 'rollup-plugin-alias';
import pkg from './package.json';

export default [{
  input: 'src/index.vue',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      sourcemap: true
    }
  ],
  plugins: [
    external(),
    resolve(),
    vue(),
    alias({
      vue: require.resolve('vue/dist/vue.esm.js')
    }),
    commonjs({
      include: ['node_modules/**']
    })
  ]
}];
