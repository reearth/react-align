const postcss = require('rollup-plugin-postcss');
const cssnano = require('cssnano');
const svg = require("rollup-plugin-svg");

module.exports = {
    rollup(config, options) {
        config.plugins.push(
            postcss({
                plugins: [
                    cssnano({
                        preset: 'default',
                    }),
                ],
                // only write out CSS for the first bundle (avoids pointless extra files):
                extract: !!options.writeMeta,
            }),
            svg()
        );
        return config;
    },
};