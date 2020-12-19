# JavaScript Library Repository Template
Repository template for a JavaScript Library compiled with WebPack.

Open the [LIVE DEMO](https://hlhielkema.github.io/__libname__/) to try it yourself.

## How to use the template
- Create a new **Git repository**.
- Copy all contents of this repository to the new repository.
- Install NPM packages: `npm install`.
- Replace `__libname__` by the name of the lib.
- Enable **GitHub pages** for the `\docs` directory.

## Directory structure

- dist - *compiled library js and css*
- docs - *Demo website*
- node_modules - *Node.js modules installed by NPM.*
- src - *Library source files*

## Build library

**Build library:**
``` ps1
npm run build
```

**Copy library js/css to `/docs` for the demo:**
``` ps1
node updatedemo.js
```