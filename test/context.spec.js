/*
* context
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const test = require('japa')
const Context = require('..')
const { join } = require('path')

test.group('Context', () => {
  test('initiate new context with base path', (assert) => {
    const ctx = new Context(__dirname)
    assert.deepEqual(ctx.state, {
      paths: {
        basePath: __dirname,
        distPathRef: 'dist',
        apiPathRef: '__api',
        assetsPathRef: '__assets'
      }
    })
  })

  test('set without name should raise errors', (assert) => {
    const ctx = new Context(__dirname)
    const fn = () => ctx.set('hello', 'world')
    assert.throw(fn, 'Set operation on context, requires the library name for debugging')
  })

  test('set without key should raise errors', (assert) => {
    const ctx = new Context(__dirname)
    const fn = () => ctx.set('hello', null, 'bar')
    assert.throw(fn, 'Define key to be set')
  })

  test('allow null as value', (assert) => {
    const ctx = new Context(__dirname)
    ctx.set('core', 'foo', null)
    assert.deepEqual(ctx.state, {
      paths: {
        basePath: __dirname,
        distPathRef: 'dist',
        apiPathRef: '__api',
        assetsPathRef: '__assets'
      },
      foo: null
    })
  })

  test('allow objects as value', (assert) => {
    const ctx = new Context(__dirname)
    ctx.set('core', 'key', { foo: 'bar' })
    assert.deepEqual(ctx.state, {
      paths: {
        basePath: __dirname,
        distPathRef: 'dist',
        apiPathRef: '__api',
        assetsPathRef: '__assets'
      },
      key: { foo: 'bar' }
    })
  })

  test('allow array as value', (assert) => {
    const ctx = new Context(__dirname)
    ctx.set('core', 'key', [{ foo: 'bar' }])
    assert.deepEqual(ctx.state, {
      paths: {
        basePath: __dirname,
        distPathRef: 'dist',
        apiPathRef: '__api',
        assetsPathRef: '__assets'
      },
      key: [{ foo: 'bar' }]
    })
  })

  test('mutating state should not mutate the internal state of context', (assert) => {
    const ctx = new Context(__dirname)
    ctx.state.basePath = 'foo'
    assert.deepEqual(ctx.state, {
      paths: {
        basePath: __dirname,
        distPathRef: 'dist',
        apiPathRef: '__api',
        assetsPathRef: '__assets'
      }
    })
  })

  test('raise error when base path is missing', (assert) => {
    const ctx = () => new Context()
    assert.throw(ctx, 'Context needs an absolute basePath to start with')
  })

  test('raise error when base path is not absolute', (assert) => {
    const ctx = () => new Context('foo/bar')
    assert.throw(ctx, 'Context needs an absolute basePath to start with')
  })

  test('define custom dist dir', (assert) => {
    const ctx = new Context(__dirname, '.')
    assert.equal(ctx.get('paths').apiPath(), join(__dirname, '__api'))
  })
})
