# lemmik

## Installation

Lemmik can run in two modes:

- **Node server mode**, which will work JS-less for logged out browsing, but
  requires a VPS to host. It's mainly intended for instances to install as a
  replacement for/additional choice next to the default Lemmy frontend.

  - This mode can additionally be "locked down" into a specific instance.

- **Single page application mode**, which _requires_ JS for everything, however
  it can be hosted almost everywhere you can think of, often for free.

  - This mode has no logged out browsing capabilities.
  - This mode may be limited by restrictive CORS policies.

In both cases, logged in browsing _requires_ JS, simply because I do not want to
bother with trusting anybody but the visitor's own browser with their token.

### Preparation

```sh
$ git clone https://github.com/ShittyKopper/lemmik
$ cd lemmik
$ npm ci
```

### Node server mode

```sh
$ npm run build:node
# The built site will be output at ./build/
```

The resulting output requires node 18.11 or greater (via
`--experimental-global-webcrypto` argument) to run (node 20 or greater does not
need any extra flags). If you can't install that, use the `VITE_NODE_POLYFILL=1`
environment variable to enable polyfills for older node versions.

The node server is configured via environment variables. See `.env.example` for
more information. Note that dotenv files are NOT loaded by default. If you do not
have any other way of getting environment variables in, you can start the server
like so:

```sh
$ node -r dotenv/config build/index.js
```

### SPA mode

```sh
# copy .env.example over to .env and edit all UI_ variables to your liking. they
# will be "baked in" the output.

$ npm run build:spa
# The built site will be output at ./build/
```

This requires a host that will attempt to rewrite all failed requests to
`index.html` for fancy URLs. Certain hosts use different files for that (`200.html`
seems like a common one) If you know your host uses a different file than
`index.html`, use the environment variable `VITE_SPA_FALLBACK` to specify it.
