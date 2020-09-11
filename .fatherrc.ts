import url from '@rollup/plugin-url';

export default {
  entry: 'src/index.ts',
  esm: 'rollup',
  cssModules: true,
  extraRollupPlugins: [],
  doc: {
    host: "0.0.0.0"
  }
}