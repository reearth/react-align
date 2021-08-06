const postcss = require('rollup-plugin-postcss');
const cssnano = require('cssnano');
const svgr = require("@svgr/rollup").default

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
            svgr()
        );
        return config;
    },
};