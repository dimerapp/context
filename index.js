/*
* context
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const { paths } = require('@dimerapp/utils')
const debug = require('debug')('dimer:context')
const { isAbsolute } = require('path')

/**
 * Manage state that needs to be passed through a pipeline.
 *
 * @class Context
 *
 * @param {String} basePath
 */
class Context {
  constructor (basePath) {
    if (!basePath || !isAbsolute(basePath)) {
      throw new Error('Context needs an absolute basePath to start with')
    }

    this._internalState = new Map()
    this.set('core', 'paths', paths(basePath))
  }

  /**
   * An object representation of context state
   *
   * @method state
   *
   * @return {Object}
   */
  get state () {
    return Array.from(this._internalState).reduce((result, [key, value]) => {
      result[key] = value
      return result
    }, {})
  }

  /**
   * Set value for a key inside the context state. If value
   * exists, will be overrided
   *
   * @method set
   *
   * @param  {String} name
   * @param  {String} key
   * @param  {Mixed} value
   */
  set (name, key, value) {
    if (typeof (value) === 'undefined') {
      value = key
      key = name
      name = null
    }

    if (!name) {
      throw new Error('Set operation on context, requires the library name for debugging')
    }

    if (!key) {
      throw new Error('Define key to be set')
    }

    debug('%s: %s => %O', name, key, value)
    this._internalState.set(key, value)
  }

  /**
   * Returns value from the context state
   *
   * @method get
   *
   * @param  {String} key
   *
   * @return {Mixed}
   */
  get (key) {
    return this._internalState.get(key)
  }

  /**
   * Remove value from the context state
   *
   * @method remove
   *
   * @param  {String} key
   *
   * @return {void}
   */
  remove (key) {
    this._internalState.delete(key)
  }
}

module.exports = Context
