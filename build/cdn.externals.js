const package = require('../package.json');
const dependencies = {
  ...package.devDependencies,
  ...package.dependencies
};
const baseUrl = 'https://npm.curiocdn.com/npm/';
const externalsConfig = {
  react: {
    jsLink: 'react@VERSION/umd/react.production.min.js',
    external: {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react'
    }
  },
  'react-router-dom': {
    jsLink: 'react-router-dom@VERSION/umd/react-router-dom.min.js',
    external: {
      root: 'ReactRouterDOM',
      commonjs: 'react-router-dom',
      commonjs2: 'react-router-dom',
      amd: 'react-router-dom'
    }
  },
  'react-dom': {
    jsLink: 'react-dom@VERSION/umd/react-dom.production.min.js',
    external: {
      root: 'ReactDOM',
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom'
    }
  },
  lodash: {
    jsLink: 'lodash@VERSION/lodash.min.js',
    external: {
      commonjs: 'lodash',
      amd: 'lodash',
      root: '_' // 指向全局变量
    }
  },
  antd: {
    cssLink: 'antd@VERSION/dist/antd.min.css',
    jsLink: 'antd@VERSION/dist/antd.min.js',
    external: 'antd'
  },
  moment: {
    jsLink: 'moment@VERSION/min/moment.min.js',
    defaultVersion: '2.18.1',
    external: 'moment'
  },
  'prop-types': {
    jsLink: 'prop-types@VERSION/prop-types.min.js',
    defaultVersion: '15.5.10'
  },
  immer: {
    jsLink: 'immer@VERSION/dist/immer.umd.js',
    external: 'Immer'
  },
  'react-color': {
    jsLink: 'react-color@3.0.0-beta.3/dist/react-color.min.js',
    external: 'ReactColor'
  },
  'react-image-crop': {
    jsLink: 'react-image-crop@VERSION/dist/ReactCrop.min.js',
    cssLink: 'react-image-crop@VERSION/dist/ReactCrop.css',
    external: 'ReactCrop'
  },
  'object-path': {
    jsLink: 'object-path@VERSION/index.js',
    external: 'ObjectPath'
  },
  axios: {
    jsLink: 'axios@VERSION/dist/axios.min.js',
    external: 'axios'
  },
  'highlight.js': {
    jsLink: 'highlight.js@VERSION/lib/highlight.js',
    external: 'hljs'
  },
  marked: {
    jsLink: 'marked@VERSION/marked.min.js',
    external: 'marked'
  },
  redux: {
    jsLink: 'redux@VERSION/dist/redux.min.js',
    external: {
      root: 'Redux',
      commonjs: 'redux',
      commonjs2: 'redux',
      amd: 'redux'
    }
  },
  'react-redux': {
    jsLink: 'react-redux@VERSION/dist/react-redux.min.js',
    external: {
      root: 'ReactRedux',
      commonjs: 'react-redux',
      commonjs2: 'react-redux',
      amd: 'react-redux'
    }
  }
};
module.exports = (externalList, config = {}) => {
  if (!Array.isArray(externalList)) {
    throw 'externalList 传入必须是一个数组';
  }
  const externals = {};
  const files = { css: [], js: [] };
  externalList.forEach(item => {
    let curExternalConfig = externalsConfig[item];
    if (!curExternalConfig) throw `缺少${item}包的配置参数,请添加`;
    let version =
      dependencies[item] ||
      (config[item] && config[item].version) ||
      curExternalConfig.defaultVersion;
    version = version.replace('^', '');
    if (version) {
      if (curExternalConfig.external)
        externals[item] = curExternalConfig.external;
      if (curExternalConfig.jsLink)
        files.js.push(
          baseUrl + curExternalConfig.jsLink.replace('VERSION', version)
        );
      if (curExternalConfig.cssLink)
        files.css.push(
          baseUrl + curExternalConfig.cssLink.replace('VERSION', version)
        );
    }
  });
  return {
    externals,
    files
  };
};
