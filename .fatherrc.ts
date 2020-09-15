// import url from '@rollup/plugin-url';
import alias from '@rollup/plugin-alias';

export default {
  entry: 'src/index.ts',
  esm: 'rollup',
  cssModules: true,
  extraRollupPlugins: [
    alias({
      entries: [
        { find: '@/', replacement: './src' },
      ]
    })
  ],
  doc: {
    host: "0.0.0.0"
  }
}