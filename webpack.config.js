module.exports = {
    entry: './src/index.ts',
    output: {
        path: __dirname + '/',
        filename: 'index.js',
    },  
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"],
        alias: {
            "@": __dirname + '/src/lib'
        }
    },
    // Enable sourcemaps for debugging webpack's output.
    // devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                loaders: ['babel-loader'],
            },
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },
}