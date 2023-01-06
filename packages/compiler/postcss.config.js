module.exports = {
  plugins: {
    [require.resolve('autoprefixer')]: {},
    [require.resolve('cssnano')]: {
      preset: 'default'
    },
    // 'postcss-pxtorpx-pro': {
    //   multiplier: 3,
    //   replace: true,

    // }
    [require.resolve('postcss-pxtorpx')]: {
      multiplier: 1,
      minPixelValue: 2,
      propList: ['*']
    }
  }
};
