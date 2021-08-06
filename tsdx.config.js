const postcss = require('rollup-plugin-postcss');
const cssnano = require('cssnano');
const svg = require("rollup-plugin-svg");

module.exports = {
    rollup(config) {
        config.plugins.push(
            postcss({
                plugins: [
                    cssnano({
                        preset: 'default',
                    }),
                ],
                inject: true,
                extract: false
            }),
            svg()
        );
        return config;
    },
};