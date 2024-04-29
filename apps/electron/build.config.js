const path = require('path');
require('dotenv').config();

/** @type {import('electron-builder').Configuration} */
const config = {
  productName: "motionOne_electronApp",
  appId: "motionOne_electronApp",
  asar: true,
  protocols: {
    name: "motionOne_electronApp",
    schemes: [ 
      'motionOne_electronApp',
    ],
  },
  // icon: path.join(__dirname, 'src-electron', 'assets', 'icons', 'app-icon.png'),
  mac: {
    target: [
      "default",
    ],
  },
  dmg: {
    title: "tournant",
  },
  win: {
    target: [
      "zip",
      "nsis",
    ],
  },
  linux: {
    target: [
      "AppImage",
      "deb",
      "rpm",
      "zip",
      "tar.gz",
    ],
  },
  nsis: {
    oneClick: false,
    installerLanguages: [
      "en_US",
      "ko_KR",
    ],
    language: "1042",
  },
  files: [
    "dist/**/*",
    "package.json",
  ],
  extraMetadata: {
    main: `dist/main.js`,
  },
  directories: {
    output: "build",
    app: ".",
  },
};

module.exports = config;