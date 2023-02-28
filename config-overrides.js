const path = require('path');

module.exports = {
    webpack: function (config) {
        // your webpack configs
        return config;
    },
    // the paths config used when your React app is builded
    paths: function (paths) {
        // reading the build path from the selected .env file
        const buildPath = process.env.REACT_APP_BUILD_PATH;
        // defining "build" as a fallback path
        paths.appBuild = path.resolve(__dirname, buildPath ? buildPath : 'build');

        return paths;
    },
};
