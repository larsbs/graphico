const path = require('path');


module.exports = {
  plugins: {
    'postcss-preset-env': {
      browsers: [
        '> 1%',
        'last 2 versions',
        'not ie < 11',
      ],
    },
  },
};
