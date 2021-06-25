// const postcss = require('rollup-plugin-postcss');
// const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const svg = require("rollup-plugin-svg");

module.exports = {
    rollup(config) {
        config.plugins.push(
            svg()
        );
        return config;
    },
};