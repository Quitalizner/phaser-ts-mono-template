# Phaser

Uses Webpack, TypeScript, Phaser, Babel, Autoprefixer, and HMR.

- [Getting started](#getting-started)
	- [Installation](#installation)
	- [Starting the development server](#starting-the-development-server)
	- [Building for production](#building-for-production)
	- [Running in production](#running-in-production)
- [Usage](#usage)
	- [Browsers list](#browsers-list)

---

## Getting started

### Installation

```bash
npm install
```

---

### Starting the development server

Run the `dev` script to start a live development server with hot module replacement. Then check the output for a link
to the app, which is usually `http://localhost:8080/`:

```bash
npm run dev
```

---

### Building for production

Run the `build` script to bundle the app for production. The bundle will be created at `dist`
and will contain all files you need to host the app:

```bash
npm run build
```

---

## Usage

### Browsers list

The bundle will be compiled to run on the browsers specified in `package.json`:

```json
"browserslist": [
    "defaults"
]
```

The default value is recommended. If you wish to customize this, please refer to the list of
[example browserslist queries](https://github.com/browserslist/browserslist#full-list).

> 💡 **Note:** This template includes `core-js` and `regenerator-runtime` which means your source code will be
> transpiled and polyfilled to run on old browsers automatically.

---