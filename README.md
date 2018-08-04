<div align="center">
  <div>
    <img width="500" src="https://res.cloudinary.com/adonisjs/image/upload/q_100/v1532274184/Dimer_Readme_Banner_lyy7wv.svg" alt="Dimer App">
  </div>
  <br>
  <p>
    <a href="https://dimerapp.com/what-is-dimer">
      Dimer is an open source project and CMS to help you publish your documentation online.
    </a>
  </p>
  <br>
  <p>
    <sub>We believe every project/product is incomplete without documentation. <br /> We want to help you publish user facing documentation, without worrying <code>about tools or code</code> to write.</sub>
  </p>
  <br>
</div>

# Dimer Context
> Runtime context for dimer

[![travis-image]][travis-url]
[![npm-image]][npm-url]

Dimer is a combination of several small modules, joining together to build the final app. Passing user options from top-level to all these libraries can be daunting and hence a `context` is used to read and write runtime values.

At the lowest level, context starts with the `basePath` and new values are added, as it is passed through several modules.
Also you can debug the actions taken on the context by defining `DEBUG` environment variable.

```shell
DEBUG=dimer:context node yourapp.js
```

## Installation

```js
npm i @dimerapp/context

# Yarn
yarn add @dimerapp/context
```

## Usage

```js
const Context = require('@dimerapp/context')
const ctx = new Context(__dirname)

// later pass around other libs
const config = new (require('@dimerapp/config-parser'))(ctx)
const store = new (require('@dimerapp/datastore'))(ctx)
```

## API
The following methods are available to read/write to the context.

##### constructor(basePath, [distPath = 'dist'])

```js
const ctx = new Context(__dirname, 'dist')
```

#### set(lib, key, value)
The `lib` option is required for debugging, so that context can log name of the library, which has mutated the state.

```js
ctx.set('config-parser', 'config', value)
```

#### get(key)
Get value for a given key. **We recommend you not to mutate the return value** and instead transform it.

```js
ctx.get('config')
```

#### remove(key)
Remove value for a given key

```js
ctx.remove('config')
```

## Change log

The change log can be found in the [CHANGELOG.md](https://github.com/dimerapp/context/CHANGELOG.md) file.

## Contributing

Everyone is welcome to contribute. Please take a moment to review the [contributing guidelines](CONTRIBUTING.md).

## Authors & License
[thetutlage](https://github.com/thetutlage) and [contributors](https://github.com/dimerapp/context/graphs/contributors).

MIT License, see the included [MIT](LICENSE.md) file.

[travis-image]: https://img.shields.io/travis/dimerapp/context/master.svg?style=flat-square&logo=travis
[travis-url]: https://travis-ci.org/dimerapp/context "travis"

[npm-image]: https://img.shields.io/npm/v/@dimerapp/context.svg?style=flat-square&logo=npm
[npm-url]: https://npmjs.org/package/@dimerapp/context "npm"
