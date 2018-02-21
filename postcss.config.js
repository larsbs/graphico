const path = require('path');


module.exports = {
  plugins: {
    'postcss-cssnext': {
      features: {
        customProperties: false,
      },
      browsers: [
        '> 1%',
        'last 2 versions',
        'not ie < 11',
      ],
    },
  },
};
