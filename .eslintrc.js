// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  'globals': {
    'ol': true,
    '$': true,
    'HMap': true,
    'config': true,
    'Viewer': true,
    'olPlot': true,
    'WindLayer': true,
    'olcs': true,
    'Fd3DViewer': true,
    'TweenLite': true,
    'Freedo': true,
    'SinoVMS': true,
    'VMSPlayWnd': true,
    'VMSPlayWnd1': true,
    'VMSPlayWnd2': true,
    'VMSPlayWnd3': true,
    'VMSPlayDetail': true
  }
}
