/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Built-in value references. */
var Symbol$1 = root.Symbol;

/** Used for built-in method references. */
var objectProto$f = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$c = objectProto$f.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$f.toString;

/** Built-in value references. */
var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty$c.call(value, symToStringTag$1),
      tag = value[symToStringTag$1];

  try {
    value[symToStringTag$1] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}

/** Used for built-in method references. */
var objectProto$e = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto$e.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/** `Object#toString` result references. */
var symbolTag$3 = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag$3);
}

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/** Used to convert symbols to primitives and strings. */
var symbolProto$2 = Symbol$1 ? Symbol$1.prototype : undefined,
    symbolToString = symbolProto$2 ? symbolProto$2.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -Infinity) ? '-0' : result;
}

/** Used to match a single whitespace character. */
var reWhitespace = /\s/;

/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
 * character of `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the index of the last non-whitespace character.
 */
function trimmedEndIndex(string) {
  var index = string.length;

  while (index-- && reWhitespace.test(string.charAt(index))) {}
  return index;
}

/** Used to match leading whitespace. */
var reTrimStart = /^\s+/;

/**
 * The base implementation of `_.trim`.
 *
 * @private
 * @param {string} string The string to trim.
 * @returns {string} Returns the trimmed string.
 */
function baseTrim(string) {
  return string
    ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '')
    : string;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

/** Used as references for various `Number` constants. */
var INFINITY$1 = 1 / 0,
    MAX_INTEGER = 1.7976931348623157e+308;

/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY$1 || value === -INFINITY$1) {
    var sign = (value < 0 ? -1 : 1);
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */
function toInteger(value) {
  var result = toFinite(value),
      remainder = result % 1;

  return result === result ? (remainder ? result - remainder : result) : 0;
}

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag$2 = '[object Function]',
    genTag$1 = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag$2 || tag == genTag$1 || tag == asyncTag || tag == proxyTag;
}

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/** Used for built-in method references. */
var funcProto$1 = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString$1 = funcProto$1.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString$1.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto$d = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$b = objectProto$d.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty$b).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/* Built-in method references that are verified to be native. */
var WeakMap$1 = getNative(root, 'WeakMap');

/** Built-in value references. */
var objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate = (function() {
  function object() {}
  return function(proto) {
    if (!isObject(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object;
    object.prototype = undefined;
    return result;
  };
}());

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply$1(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

/**
 * This method returns `undefined`.
 *
 * @static
 * @memberOf _
 * @since 2.3.0
 * @category Util
 * @example
 *
 * _.times(2, _.noop);
 * // => [undefined, undefined]
 */
function noop() {
  // No operation performed.
}

/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800,
    HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut(func) {
  var count = 0,
      lastCalled = 0;

  return function() {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString = !defineProperty ? identity : function(func, string) {
  return defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = shortOut(baseSetToString);

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */
function baseIsNaN(value) {
  return value !== value;
}

/**
 * A specialized version of `_.indexOf` which performs strict equality
 * comparisons of values, i.e. `===`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function strictIndexOf(array, value, fromIndex) {
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  return value === value
    ? strictIndexOf(array, value, fromIndex)
    : baseFindIndex(array, baseIsNaN, fromIndex);
}

/**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludes(array, value) {
  var length = array == null ? 0 : array.length;
  return !!length && baseIndexOf(array, value, 0) > -1;
}

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER$1 = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER$1 : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/** Used for built-in method references. */
var objectProto$c = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$a = objectProto$c.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty$a.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax$2 = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(func, start, transform) {
  start = nativeMax$2(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax$2(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply$1(func, this, otherArgs);
  };
}

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/** Used for built-in method references. */
var objectProto$b = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$b;

  return value === proto;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/** `Object#toString` result references. */
var argsTag$3 = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag$3;
}

/** Used for built-in method references. */
var objectProto$a = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$9 = objectProto$a.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable$1 = objectProto$a.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty$9.call(value, 'callee') &&
    !propertyIsEnumerable$1.call(value, 'callee');
};

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

/** Detect free variable `exports`. */
var freeExports$2 = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule$2 = freeExports$2 && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports$2 = freeModule$2 && freeModule$2.exports === freeExports$2;

/** Built-in value references. */
var Buffer$1 = moduleExports$2 ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer$1 ? Buffer$1.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

/** `Object#toString` result references. */
var argsTag$2 = '[object Arguments]',
    arrayTag$2 = '[object Array]',
    boolTag$3 = '[object Boolean]',
    dateTag$3 = '[object Date]',
    errorTag$2 = '[object Error]',
    funcTag$1 = '[object Function]',
    mapTag$6 = '[object Map]',
    numberTag$3 = '[object Number]',
    objectTag$3 = '[object Object]',
    regexpTag$3 = '[object RegExp]',
    setTag$6 = '[object Set]',
    stringTag$3 = '[object String]',
    weakMapTag$2 = '[object WeakMap]';

var arrayBufferTag$3 = '[object ArrayBuffer]',
    dataViewTag$4 = '[object DataView]',
    float32Tag$2 = '[object Float32Array]',
    float64Tag$2 = '[object Float64Array]',
    int8Tag$2 = '[object Int8Array]',
    int16Tag$2 = '[object Int16Array]',
    int32Tag$2 = '[object Int32Array]',
    uint8Tag$2 = '[object Uint8Array]',
    uint8ClampedTag$2 = '[object Uint8ClampedArray]',
    uint16Tag$2 = '[object Uint16Array]',
    uint32Tag$2 = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag$2] = typedArrayTags[float64Tag$2] =
typedArrayTags[int8Tag$2] = typedArrayTags[int16Tag$2] =
typedArrayTags[int32Tag$2] = typedArrayTags[uint8Tag$2] =
typedArrayTags[uint8ClampedTag$2] = typedArrayTags[uint16Tag$2] =
typedArrayTags[uint32Tag$2] = true;
typedArrayTags[argsTag$2] = typedArrayTags[arrayTag$2] =
typedArrayTags[arrayBufferTag$3] = typedArrayTags[boolTag$3] =
typedArrayTags[dataViewTag$4] = typedArrayTags[dateTag$3] =
typedArrayTags[errorTag$2] = typedArrayTags[funcTag$1] =
typedArrayTags[mapTag$6] = typedArrayTags[numberTag$3] =
typedArrayTags[objectTag$3] = typedArrayTags[regexpTag$3] =
typedArrayTags[setTag$6] = typedArrayTags[stringTag$3] =
typedArrayTags[weakMapTag$2] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

/** Detect free variable `exports`. */
var freeExports$1 = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule$1 = freeExports$1 && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports$1 && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule$1 && freeModule$1.require && freeModule$1.require('util').types;

    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10.
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

/** Used for built-in method references. */
var objectProto$9 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$8 = objectProto$9.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((hasOwnProperty$8.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

/** Used for built-in method references. */
var objectProto$8 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$7 = objectProto$8.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty$7.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$2 = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto$7 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$6 = objectProto$7.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED$2 ? undefined : result;
  }
  return hasOwnProperty$6.call(data, key) ? data[key] : undefined;
}

/** Used for built-in method references. */
var objectProto$6 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$5 = objectProto$6.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty$5.call(data, key);
}

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED$1 : value;
  return this;
}

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/* Built-in method references that are verified to be native. */
var Map$1 = getNative(root, 'Map');

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map$1 || ListCache),
    'string': new Hash
  };
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/** Error message constants. */
var FUNC_ERROR_TEXT$2 = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT$2);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Expose `MapCache`.
memoize.Cache = MapCache;

/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;

/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
function memoizeCapped(func) {
  var result = memoize(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  var cache = result.cache;
  return result;
}

/** Used to match property names within property paths. */
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoizeCapped(function(string) {
  var result = [];
  if (string.charCodeAt(0) === 46 /* . */) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value, object) {
  if (isArray(value)) {
    return value;
  }
  return isKey(value, object) ? [value] : stringToPath(toString(value));
}

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -Infinity) ? '-0' : result;
}

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = castPath(path, object);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush$1(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

/** Built-in value references. */
var spreadableSymbol = Symbol$1 ? Symbol$1.isConcatSpreadable : undefined;

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable(value) {
  return isArray(value) || isArguments(value) ||
    !!(spreadableSymbol && value && value[spreadableSymbol]);
}

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1,
      length = array.length;

  predicate || (predicate = isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];
    if (predicate(value)) {
      {
        arrayPush$1(result, value);
      }
    } else {
      result[result.length] = value;
    }
  }
  return result;
}

/**
 * Flattens `array` a single level deep.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to flatten.
 * @returns {Array} Returns the new flattened array.
 * @example
 *
 * _.flatten([1, [2, [3, [4]], 5]]);
 * // => [1, 2, [3, [4]], 5]
 */
function flatten(array) {
  var length = array == null ? 0 : array.length;
  return length ? baseFlatten(array) : [];
}

/**
 * A specialized version of `baseRest` which flattens the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @returns {Function} Returns the new function.
 */
function flatRest(func) {
  return setToString(overRest(func, undefined, flatten), func + '');
}

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function baseSlice(array, start, end) {
  var index = -1,
      length = array.length;

  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : ((end - start) >>> 0);
  start >>>= 0;

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

/**
 * Casts `array` to a slice if it's needed.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {number} start The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the cast slice.
 */
function castSlice(array, start, end) {
  var length = array.length;
  end = end === undefined ? length : end;
  return (!start && end >= length) ? array : baseSlice(array, start, end);
}

/** Used to compose unicode character classes. */
var rsAstralRange$2 = '\\ud800-\\udfff',
    rsComboMarksRange$3 = '\\u0300-\\u036f',
    reComboHalfMarksRange$3 = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange$3 = '\\u20d0-\\u20ff',
    rsComboRange$3 = rsComboMarksRange$3 + reComboHalfMarksRange$3 + rsComboSymbolsRange$3,
    rsVarRange$2 = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsZWJ$2 = '\\u200d';

/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
var reHasUnicode = RegExp('[' + rsZWJ$2 + rsAstralRange$2  + rsComboRange$3 + rsVarRange$2 + ']');

/**
 * Checks if `string` contains Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a symbol is found, else `false`.
 */
function hasUnicode(string) {
  return reHasUnicode.test(string);
}

/**
 * Converts an ASCII `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function asciiToArray(string) {
  return string.split('');
}

/** Used to compose unicode character classes. */
var rsAstralRange$1 = '\\ud800-\\udfff',
    rsComboMarksRange$2 = '\\u0300-\\u036f',
    reComboHalfMarksRange$2 = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange$2 = '\\u20d0-\\u20ff',
    rsComboRange$2 = rsComboMarksRange$2 + reComboHalfMarksRange$2 + rsComboSymbolsRange$2,
    rsVarRange$1 = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsAstral = '[' + rsAstralRange$1 + ']',
    rsCombo$2 = '[' + rsComboRange$2 + ']',
    rsFitz$1 = '\\ud83c[\\udffb-\\udfff]',
    rsModifier$1 = '(?:' + rsCombo$2 + '|' + rsFitz$1 + ')',
    rsNonAstral$1 = '[^' + rsAstralRange$1 + ']',
    rsRegional$1 = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    rsSurrPair$1 = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    rsZWJ$1 = '\\u200d';

/** Used to compose unicode regexes. */
var reOptMod$1 = rsModifier$1 + '?',
    rsOptVar$1 = '[' + rsVarRange$1 + ']?',
    rsOptJoin$1 = '(?:' + rsZWJ$1 + '(?:' + [rsNonAstral$1, rsRegional$1, rsSurrPair$1].join('|') + ')' + rsOptVar$1 + reOptMod$1 + ')*',
    rsSeq$1 = rsOptVar$1 + reOptMod$1 + rsOptJoin$1,
    rsSymbol = '(?:' + [rsNonAstral$1 + rsCombo$2 + '?', rsCombo$2, rsRegional$1, rsSurrPair$1, rsAstral].join('|') + ')';

/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
var reUnicode = RegExp(rsFitz$1 + '(?=' + rsFitz$1 + ')|' + rsSymbol + rsSeq$1, 'g');

/**
 * Converts a Unicode `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function unicodeToArray(string) {
  return string.match(reUnicode) || [];
}

/**
 * Converts `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function stringToArray(string) {
  return hasUnicode(string)
    ? unicodeToArray(string)
    : asciiToArray(string);
}

/**
 * Creates a function like `_.lowerFirst`.
 *
 * @private
 * @param {string} methodName The name of the `String` case method to use.
 * @returns {Function} Returns the new case function.
 */
function createCaseFirst(methodName) {
  return function(string) {
    string = toString(string);

    var strSymbols = hasUnicode(string)
      ? stringToArray(string)
      : undefined;

    var chr = strSymbols
      ? strSymbols[0]
      : string.charAt(0);

    var trailing = strSymbols
      ? castSlice(strSymbols, 1).join('')
      : string.slice(1);

    return chr[methodName]() + trailing;
  };
}

/**
 * Converts the first character of `string` to upper case.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.upperFirst('fred');
 * // => 'Fred'
 *
 * _.upperFirst('FRED');
 * // => 'FRED'
 */
var upperFirst = createCaseFirst('toUpperCase');

/**
 * Converts the first character of `string` to upper case and the remaining
 * to lower case.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to capitalize.
 * @returns {string} Returns the capitalized string.
 * @example
 *
 * _.capitalize('FRED');
 * // => 'Fred'
 */
function capitalize(string) {
  return upperFirst(toString(string).toLowerCase());
}

/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1,
      length = array == null ? 0 : array.length;
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}

/**
 * The base implementation of `_.propertyOf` without support for deep paths.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyOf(object) {
  return function(key) {
    return object == null ? undefined : object[key];
  };
}

/** Used to map Latin Unicode letters to basic Latin letters. */
var deburredLetters = {
  // Latin-1 Supplement block.
  '\xc0': 'A',  '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
  '\xe0': 'a',  '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
  '\xc7': 'C',  '\xe7': 'c',
  '\xd0': 'D',  '\xf0': 'd',
  '\xc8': 'E',  '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
  '\xe8': 'e',  '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
  '\xcc': 'I',  '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
  '\xec': 'i',  '\xed': 'i', '\xee': 'i', '\xef': 'i',
  '\xd1': 'N',  '\xf1': 'n',
  '\xd2': 'O',  '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
  '\xf2': 'o',  '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
  '\xd9': 'U',  '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
  '\xf9': 'u',  '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
  '\xdd': 'Y',  '\xfd': 'y', '\xff': 'y',
  '\xc6': 'Ae', '\xe6': 'ae',
  '\xde': 'Th', '\xfe': 'th',
  '\xdf': 'ss',
  // Latin Extended-A block.
  '\u0100': 'A',  '\u0102': 'A', '\u0104': 'A',
  '\u0101': 'a',  '\u0103': 'a', '\u0105': 'a',
  '\u0106': 'C',  '\u0108': 'C', '\u010a': 'C', '\u010c': 'C',
  '\u0107': 'c',  '\u0109': 'c', '\u010b': 'c', '\u010d': 'c',
  '\u010e': 'D',  '\u0110': 'D', '\u010f': 'd', '\u0111': 'd',
  '\u0112': 'E',  '\u0114': 'E', '\u0116': 'E', '\u0118': 'E', '\u011a': 'E',
  '\u0113': 'e',  '\u0115': 'e', '\u0117': 'e', '\u0119': 'e', '\u011b': 'e',
  '\u011c': 'G',  '\u011e': 'G', '\u0120': 'G', '\u0122': 'G',
  '\u011d': 'g',  '\u011f': 'g', '\u0121': 'g', '\u0123': 'g',
  '\u0124': 'H',  '\u0126': 'H', '\u0125': 'h', '\u0127': 'h',
  '\u0128': 'I',  '\u012a': 'I', '\u012c': 'I', '\u012e': 'I', '\u0130': 'I',
  '\u0129': 'i',  '\u012b': 'i', '\u012d': 'i', '\u012f': 'i', '\u0131': 'i',
  '\u0134': 'J',  '\u0135': 'j',
  '\u0136': 'K',  '\u0137': 'k', '\u0138': 'k',
  '\u0139': 'L',  '\u013b': 'L', '\u013d': 'L', '\u013f': 'L', '\u0141': 'L',
  '\u013a': 'l',  '\u013c': 'l', '\u013e': 'l', '\u0140': 'l', '\u0142': 'l',
  '\u0143': 'N',  '\u0145': 'N', '\u0147': 'N', '\u014a': 'N',
  '\u0144': 'n',  '\u0146': 'n', '\u0148': 'n', '\u014b': 'n',
  '\u014c': 'O',  '\u014e': 'O', '\u0150': 'O',
  '\u014d': 'o',  '\u014f': 'o', '\u0151': 'o',
  '\u0154': 'R',  '\u0156': 'R', '\u0158': 'R',
  '\u0155': 'r',  '\u0157': 'r', '\u0159': 'r',
  '\u015a': 'S',  '\u015c': 'S', '\u015e': 'S', '\u0160': 'S',
  '\u015b': 's',  '\u015d': 's', '\u015f': 's', '\u0161': 's',
  '\u0162': 'T',  '\u0164': 'T', '\u0166': 'T',
  '\u0163': 't',  '\u0165': 't', '\u0167': 't',
  '\u0168': 'U',  '\u016a': 'U', '\u016c': 'U', '\u016e': 'U', '\u0170': 'U', '\u0172': 'U',
  '\u0169': 'u',  '\u016b': 'u', '\u016d': 'u', '\u016f': 'u', '\u0171': 'u', '\u0173': 'u',
  '\u0174': 'W',  '\u0175': 'w',
  '\u0176': 'Y',  '\u0177': 'y', '\u0178': 'Y',
  '\u0179': 'Z',  '\u017b': 'Z', '\u017d': 'Z',
  '\u017a': 'z',  '\u017c': 'z', '\u017e': 'z',
  '\u0132': 'IJ', '\u0133': 'ij',
  '\u0152': 'Oe', '\u0153': 'oe',
  '\u0149': "'n", '\u017f': 's'
};

/**
 * Used by `_.deburr` to convert Latin-1 Supplement and Latin Extended-A
 * letters to basic Latin letters.
 *
 * @private
 * @param {string} letter The matched letter to deburr.
 * @returns {string} Returns the deburred letter.
 */
var deburrLetter = basePropertyOf(deburredLetters);

/** Used to match Latin Unicode letters (excluding mathematical operators). */
var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;

/** Used to compose unicode character classes. */
var rsComboMarksRange$1 = '\\u0300-\\u036f',
    reComboHalfMarksRange$1 = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange$1 = '\\u20d0-\\u20ff',
    rsComboRange$1 = rsComboMarksRange$1 + reComboHalfMarksRange$1 + rsComboSymbolsRange$1;

/** Used to compose unicode capture groups. */
var rsCombo$1 = '[' + rsComboRange$1 + ']';

/**
 * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
 * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
 */
var reComboMark = RegExp(rsCombo$1, 'g');

/**
 * Deburrs `string` by converting
 * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
 * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
 * letters to basic Latin letters and removing
 * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to deburr.
 * @returns {string} Returns the deburred string.
 * @example
 *
 * _.deburr('déjà vu');
 * // => 'deja vu'
 */
function deburr(string) {
  string = toString(string);
  return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '');
}

/** Used to match words composed of alphanumeric characters. */
var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;

/**
 * Splits an ASCII `string` into an array of its words.
 *
 * @private
 * @param {string} The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */
function asciiWords(string) {
  return string.match(reAsciiWord) || [];
}

/** Used to detect strings that need a more robust regexp to match words. */
var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;

/**
 * Checks if `string` contains a word composed of Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a word is found, else `false`.
 */
function hasUnicodeWord(string) {
  return reHasUnicodeWord.test(string);
}

/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
    rsDingbatRange = '\\u2700-\\u27bf',
    rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
    rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
    rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
    rsPunctuationRange = '\\u2000-\\u206f',
    rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
    rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
    rsVarRange = '\\ufe0e\\ufe0f',
    rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;

/** Used to compose unicode capture groups. */
var rsApos$1 = "['\u2019]",
    rsBreak = '[' + rsBreakRange + ']',
    rsCombo = '[' + rsComboRange + ']',
    rsDigits = '\\d+',
    rsDingbat = '[' + rsDingbatRange + ']',
    rsLower = '[' + rsLowerRange + ']',
    rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
    rsFitz = '\\ud83c[\\udffb-\\udfff]',
    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
    rsNonAstral = '[^' + rsAstralRange + ']',
    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    rsUpper = '[' + rsUpperRange + ']',
    rsZWJ = '\\u200d';

/** Used to compose unicode regexes. */
var rsMiscLower = '(?:' + rsLower + '|' + rsMisc + ')',
    rsMiscUpper = '(?:' + rsUpper + '|' + rsMisc + ')',
    rsOptContrLower = '(?:' + rsApos$1 + '(?:d|ll|m|re|s|t|ve))?',
    rsOptContrUpper = '(?:' + rsApos$1 + '(?:D|LL|M|RE|S|T|VE))?',
    reOptMod = rsModifier + '?',
    rsOptVar = '[' + rsVarRange + ']?',
    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
    rsOrdLower = '\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])',
    rsOrdUpper = '\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])',
    rsSeq = rsOptVar + reOptMod + rsOptJoin,
    rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq;

/** Used to match complex or compound words. */
var reUnicodeWord = RegExp([
  rsUpper + '?' + rsLower + '+' + rsOptContrLower + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')',
  rsMiscUpper + '+' + rsOptContrUpper + '(?=' + [rsBreak, rsUpper + rsMiscLower, '$'].join('|') + ')',
  rsUpper + '?' + rsMiscLower + '+' + rsOptContrLower,
  rsUpper + '+' + rsOptContrUpper,
  rsOrdUpper,
  rsOrdLower,
  rsDigits,
  rsEmoji
].join('|'), 'g');

/**
 * Splits a Unicode `string` into an array of its words.
 *
 * @private
 * @param {string} The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */
function unicodeWords(string) {
  return string.match(reUnicodeWord) || [];
}

/**
 * Splits `string` into an array of its words.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to inspect.
 * @param {RegExp|string} [pattern] The pattern to match words.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Array} Returns the words of `string`.
 * @example
 *
 * _.words('fred, barney, & pebbles');
 * // => ['fred', 'barney', 'pebbles']
 *
 * _.words('fred, barney, & pebbles', /[^, ]+/g);
 * // => ['fred', 'barney', '&', 'pebbles']
 */
function words(string, pattern, guard) {
  string = toString(string);
  pattern = pattern;

  if (pattern === undefined) {
    return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
  }
  return string.match(pattern) || [];
}

/** Used to compose unicode capture groups. */
var rsApos = "['\u2019]";

/** Used to match apostrophes. */
var reApos = RegExp(rsApos, 'g');

/**
 * Creates a function like `_.camelCase`.
 *
 * @private
 * @param {Function} callback The function to combine each word.
 * @returns {Function} Returns the new compounder function.
 */
function createCompounder(callback) {
  return function(string) {
    return arrayReduce(words(deburr(string).replace(reApos, '')), callback, '');
  };
}

/**
 * Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the camel cased string.
 * @example
 *
 * _.camelCase('Foo Bar');
 * // => 'fooBar'
 *
 * _.camelCase('--foo-bar--');
 * // => 'fooBar'
 *
 * _.camelCase('__FOO_BAR__');
 * // => 'fooBar'
 */
var camelCase = createCompounder(function(result, word, index) {
  word = word.toLowerCase();
  return result + (index ? capitalize(word) : word);
});

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE$1 = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map$1 || (pairs.length < LARGE_ARRAY_SIZE$1 - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;
    Buffer ? Buffer.allocUnsafe : undefined;

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  {
    return buffer.slice();
  }
}

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

/** Used for built-in method references. */
var objectProto$5 = Object.prototype;

/** Built-in value references. */
var propertyIsEnumerable = objectProto$5.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush$1(result, symbolsFunc(object));
}

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView');

/* Built-in method references that are verified to be native. */
var Promise$1 = getNative(root, 'Promise');

/* Built-in method references that are verified to be native. */
var Set$1 = getNative(root, 'Set');

/** `Object#toString` result references. */
var mapTag$5 = '[object Map]',
    objectTag$2 = '[object Object]',
    promiseTag = '[object Promise]',
    setTag$5 = '[object Set]',
    weakMapTag$1 = '[object WeakMap]';

var dataViewTag$3 = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map$1),
    promiseCtorString = toSource(Promise$1),
    setCtorString = toSource(Set$1),
    weakMapCtorString = toSource(WeakMap$1);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag$3) ||
    (Map$1 && getTag(new Map$1) != mapTag$5) ||
    (Promise$1 && getTag(Promise$1.resolve()) != promiseTag) ||
    (Set$1 && getTag(new Set$1) != setTag$5) ||
    (WeakMap$1 && getTag(new WeakMap$1) != weakMapTag$1)) {
  getTag = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag$2 ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag$3;
        case mapCtorString: return mapTag$5;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag$5;
        case weakMapCtorString: return weakMapTag$1;
      }
    }
    return result;
  };
}

/** Used for built-in method references. */
var objectProto$4 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$4 = objectProto$4.hasOwnProperty;

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      result = new array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty$4.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

/** Built-in value references. */
var Uint8Array$1 = root.Uint8Array;

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array$1(result).set(new Uint8Array$1(arrayBuffer));
  return result;
}

/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */
function cloneDataView(dataView, isDeep) {
  var buffer = cloneArrayBuffer(dataView.buffer) ;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}

/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}

/** Used to convert symbols to primitives and strings. */
var symbolProto$1 = Symbol$1 ? Symbol$1.prototype : undefined,
    symbolValueOf$1 = symbolProto$1 ? symbolProto$1.valueOf : undefined;

/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */
function cloneSymbol(symbol) {
  return symbolValueOf$1 ? Object(symbolValueOf$1.call(symbol)) : {};
}

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = cloneArrayBuffer(typedArray.buffer) ;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

/** `Object#toString` result references. */
var boolTag$2 = '[object Boolean]',
    dateTag$2 = '[object Date]',
    mapTag$4 = '[object Map]',
    numberTag$2 = '[object Number]',
    regexpTag$2 = '[object RegExp]',
    setTag$4 = '[object Set]',
    stringTag$2 = '[object String]',
    symbolTag$2 = '[object Symbol]';

var arrayBufferTag$2 = '[object ArrayBuffer]',
    dataViewTag$2 = '[object DataView]',
    float32Tag$1 = '[object Float32Array]',
    float64Tag$1 = '[object Float64Array]',
    int8Tag$1 = '[object Int8Array]',
    int16Tag$1 = '[object Int16Array]',
    int32Tag$1 = '[object Int32Array]',
    uint8Tag$1 = '[object Uint8Array]',
    uint8ClampedTag$1 = '[object Uint8ClampedArray]',
    uint16Tag$1 = '[object Uint16Array]',
    uint32Tag$1 = '[object Uint32Array]';

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag$2:
      return cloneArrayBuffer(object);

    case boolTag$2:
    case dateTag$2:
      return new Ctor(+object);

    case dataViewTag$2:
      return cloneDataView(object);

    case float32Tag$1: case float64Tag$1:
    case int8Tag$1: case int16Tag$1: case int32Tag$1:
    case uint8Tag$1: case uint8ClampedTag$1: case uint16Tag$1: case uint32Tag$1:
      return cloneTypedArray(object);

    case mapTag$4:
      return new Ctor;

    case numberTag$2:
    case stringTag$2:
      return new Ctor(object);

    case regexpTag$2:
      return cloneRegExp(object);

    case setTag$4:
      return new Ctor;

    case symbolTag$2:
      return cloneSymbol(object);
  }
}

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate(getPrototype(object))
    : {};
}

/** `Object#toString` result references. */
var mapTag$3 = '[object Map]';

/**
 * The base implementation of `_.isMap` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 */
function baseIsMap(value) {
  return isObjectLike(value) && getTag(value) == mapTag$3;
}

/* Node.js helper references. */
var nodeIsMap = nodeUtil && nodeUtil.isMap;

/**
 * Checks if `value` is classified as a `Map` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 * @example
 *
 * _.isMap(new Map);
 * // => true
 *
 * _.isMap(new WeakMap);
 * // => false
 */
var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;

/** `Object#toString` result references. */
var setTag$3 = '[object Set]';

/**
 * The base implementation of `_.isSet` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 */
function baseIsSet(value) {
  return isObjectLike(value) && getTag(value) == setTag$3;
}

/* Node.js helper references. */
var nodeIsSet = nodeUtil && nodeUtil.isSet;

/**
 * Checks if `value` is classified as a `Set` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 * @example
 *
 * _.isSet(new Set);
 * // => true
 *
 * _.isSet(new WeakSet);
 * // => false
 */
var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;

/** `Object#toString` result references. */
var argsTag$1 = '[object Arguments]',
    arrayTag$1 = '[object Array]',
    boolTag$1 = '[object Boolean]',
    dateTag$1 = '[object Date]',
    errorTag$1 = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag$2 = '[object Map]',
    numberTag$1 = '[object Number]',
    objectTag$1 = '[object Object]',
    regexpTag$1 = '[object RegExp]',
    setTag$2 = '[object Set]',
    stringTag$1 = '[object String]',
    symbolTag$1 = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag$1 = '[object ArrayBuffer]',
    dataViewTag$1 = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag$1] = cloneableTags[arrayTag$1] =
cloneableTags[arrayBufferTag$1] = cloneableTags[dataViewTag$1] =
cloneableTags[boolTag$1] = cloneableTags[dateTag$1] =
cloneableTags[float32Tag] = cloneableTags[float64Tag] =
cloneableTags[int8Tag] = cloneableTags[int16Tag] =
cloneableTags[int32Tag] = cloneableTags[mapTag$2] =
cloneableTags[numberTag$1] = cloneableTags[objectTag$1] =
cloneableTags[regexpTag$1] = cloneableTags[setTag$2] =
cloneableTags[stringTag$1] = cloneableTags[symbolTag$1] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag$1] = cloneableTags[funcTag] =
cloneableTags[weakMapTag] = false;

/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Deep clone
 *  2 - Flatten inherited properties
 *  4 - Clone symbols
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, bitmask, customizer, key, object, stack) {
  var result;
  if (result !== undefined) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
  } else {
    var tag = getTag(value),
        isFunc = tag == funcTag || tag == genTag;

    if (isBuffer(value)) {
      return cloneBuffer(value);
    }
    if (tag == objectTag$1 || tag == argsTag$1 || (isFunc && !object)) {
      result = (isFunc) ? {} : initCloneObject(value);
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag);
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new Stack);
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  if (isSet(value)) {
    value.forEach(function(subValue) {
      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
    });
  } else if (isMap(value)) {
    value.forEach(function(subValue, key) {
      result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
    });
  }

  var keysFunc = (getAllKeys)
    ;

  var props = isArr ? undefined : keysFunc(value);
  arrayEach(props || value, function(subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
  });
  return result;
}

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
    CLONE_SYMBOLS_FLAG = 4;

/**
 * This method is like `_.clone` except that it recursively clones `value`.
 *
 * @static
 * @memberOf _
 * @since 1.0.0
 * @category Lang
 * @param {*} value The value to recursively clone.
 * @returns {*} Returns the deep cloned value.
 * @see _.clone
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var deep = _.cloneDeep(objects);
 * console.log(deep[0] === objects[0]);
 * // => false
 */
function cloneDeep(value) {
  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
}

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$5 = 1,
    COMPARE_UNORDERED_FLAG$3 = 2;

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$5,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Check that cyclic values are equal.
  var arrStacked = stack.get(array);
  var othStacked = stack.get(other);
  if (arrStacked && othStacked) {
    return arrStacked == other && othStacked == array;
  }
  var index = -1,
      result = true,
      seen = (bitmask & COMPARE_UNORDERED_FLAG$3) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!cacheHas(seen, othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$4 = 1,
    COMPARE_UNORDERED_FLAG$2 = 2;

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    mapTag$1 = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag$1 = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]';

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol$1 ? Symbol$1.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array$1(object), new Uint8Array$1(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag$1:
      var convert = mapToArray;

    case setTag$1:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG$4;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG$2;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$3 = 1;

/** Used for built-in method references. */
var objectProto$3 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$3 = objectProto$3.hasOwnProperty;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$3,
      objProps = getAllKeys(object),
      objLength = objProps.length,
      othProps = getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty$3.call(other, key))) {
      return false;
    }
  }
  // Check that cyclic values are equal.
  var objStacked = stack.get(object);
  var othStacked = stack.get(other);
  if (objStacked && othStacked) {
    return objStacked == other && othStacked == object;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$2 = 1;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    objectTag = '[object Object]';

/** Used for built-in method references. */
var objectProto$2 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$2 = objectProto$2.hasOwnProperty;

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = objIsArr ? arrayTag : getTag(object),
      othTag = othIsArr ? arrayTag : getTag(other);

  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;

  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG$2)) {
    var objIsWrapped = objIsObj && hasOwnProperty$2.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty$2.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$1 = 1,
    COMPARE_UNORDERED_FLAG$1 = 2;

/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length,
      length = index;

  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if ((data[2])
          ? data[1] !== object[data[0]]
          : !(data[0] in object)
        ) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var stack = new Stack;
      var result; 
      if (!(result === undefined
            ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG$1 | COMPARE_UNORDERED_FLAG$1, customizer, stack)
            : result
          )) {
        return false;
      }
    }
  }
  return true;
}

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && !isObject(value);
}

/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData(object) {
  var result = keys(object),
      length = result.length;

  while (length--) {
    var key = result[length],
        value = object[key];

    result[length] = [key, value, isStrictComparable(value)];
  }
  return result;
}

/**
 * A specialized version of `matchesProperty` for source values suitable
 * for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function matchesStrictComparable(key, srcValue) {
  return function(object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue &&
      (srcValue !== undefined || (key in Object(object)));
  };
}

/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatches(source) {
  var matchData = getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }
  return function(object) {
    return object === source || baseIsMatch(object, source, matchData);
  };
}

/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath(object, path, hasFunc) {
  path = castPath(path, object);

  var index = -1,
      length = path.length,
      result = false;

  while (++index < length) {
    var key = toKey(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && isLength(length) && isIndex(key, length) &&
    (isArray(object) || isArguments(object));
}

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */
function hasIn(object, path) {
  return object != null && hasPath(object, path, baseHasIn);
}

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatchesProperty(path, srcValue) {
  if (isKey(path) && isStrictComparable(srcValue)) {
    return matchesStrictComparable(toKey(path), srcValue);
  }
  return function(object) {
    var objValue = get(object, path);
    return (objValue === undefined && objValue === srcValue)
      ? hasIn(object, path)
      : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
  };
}

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyDeep(path) {
  return function(object) {
    return baseGet(object, path);
  };
}

/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ];
 *
 * _.map(objects, _.property('a.b'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
 * // => [1, 2]
 */
function property(path) {
  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
}

/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */
function baseIteratee(value) {
  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
  if (typeof value == 'function') {
    return value;
  }
  if (value == null) {
    return identity;
  }
  if (typeof value == 'object') {
    return isArray(value)
      ? baseMatchesProperty(value[0], value[1])
      : baseMatches(value);
  }
  return property(value);
}

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

/** Error message constants. */
var FUNC_ERROR_TEXT$1 = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax$1 = Math.max,
    nativeMin$1 = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT$1);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax$1(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin$1(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Creates a `_.find` or `_.findLast` function.
 *
 * @private
 * @param {Function} findIndexFunc The function to find the collection index.
 * @returns {Function} Returns the new find function.
 */
function createFind(findIndexFunc) {
  return function(collection, predicate, fromIndex) {
    var iterable = Object(collection);
    if (!isArrayLike(collection)) {
      var iteratee = baseIteratee(predicate);
      collection = keys(collection);
      predicate = function(key) { return iteratee(iterable[key], key, iterable); };
    }
    var index = findIndexFunc(collection, predicate, fromIndex);
    return index > -1 ? iterable[iteratee ? collection[index] : index] : undefined;
  };
}

/**
 * This method is like `_.find` except that it returns the index of the first
 * element `predicate` returns truthy for instead of the element itself.
 *
 * @static
 * @memberOf _
 * @since 1.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @param {number} [fromIndex=0] The index to search from.
 * @returns {number} Returns the index of the found element, else `-1`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'active': false },
 *   { 'user': 'fred',    'active': false },
 *   { 'user': 'pebbles', 'active': true }
 * ];
 *
 * _.findIndex(users, function(o) { return o.user == 'barney'; });
 * // => 0
 *
 * // The `_.matches` iteratee shorthand.
 * _.findIndex(users, { 'user': 'fred', 'active': false });
 * // => 1
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.findIndex(users, ['active', false]);
 * // => 0
 *
 * // The `_.property` iteratee shorthand.
 * _.findIndex(users, 'active');
 * // => 2
 */
function findIndex(array, predicate, fromIndex) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return -1;
  }
  var index = 0 ;
  return baseFindIndex(array, baseIteratee(predicate), index);
}

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * This method is like `_.findIndex` except that it iterates over elements
 * of `collection` from right to left.
 *
 * @static
 * @memberOf _
 * @since 2.0.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @param {number} [fromIndex=array.length-1] The index to search from.
 * @returns {number} Returns the index of the found element, else `-1`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'active': true },
 *   { 'user': 'fred',    'active': false },
 *   { 'user': 'pebbles', 'active': false }
 * ];
 *
 * _.findLastIndex(users, function(o) { return o.user == 'pebbles'; });
 * // => 2
 *
 * // The `_.matches` iteratee shorthand.
 * _.findLastIndex(users, { 'user': 'barney', 'active': true });
 * // => 0
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.findLastIndex(users, ['active', false]);
 * // => 2
 *
 * // The `_.property` iteratee shorthand.
 * _.findLastIndex(users, 'active');
 * // => 0
 */
function findLastIndex(array, predicate, fromIndex) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return -1;
  }
  var index = length - 1;
  if (fromIndex !== undefined) {
    index = toInteger(fromIndex);
    index = fromIndex < 0
      ? nativeMax(length + index, 0)
      : nativeMin(index, length - 1);
  }
  return baseFindIndex(array, baseIteratee(predicate), index, true);
}

/**
 * This method is like `_.find` except that it iterates over elements of
 * `collection` from right to left.
 *
 * @static
 * @memberOf _
 * @since 2.0.0
 * @category Collection
 * @param {Array|Object} collection The collection to inspect.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @param {number} [fromIndex=collection.length-1] The index to search from.
 * @returns {*} Returns the matched element, else `undefined`.
 * @example
 *
 * _.findLast([1, 2, 3, 4], function(n) {
 *   return n % 2 == 1;
 * });
 * // => 3
 */
var findLast = createFind(findLastIndex);

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto$1.hasOwnProperty;

/**
 * The base implementation of `_.has` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHas(object, key) {
  return object != null && hasOwnProperty$1.call(object, key);
}

/**
 * Checks if `path` is a direct property of `object`.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = { 'a': { 'b': 2 } };
 * var other = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.has(object, 'a');
 * // => true
 *
 * _.has(object, 'a.b');
 * // => true
 *
 * _.has(object, ['a', 'b']);
 * // => true
 *
 * _.has(other, 'a');
 * // => false
 */
function has(object, path) {
  return object != null && hasPath(object, path, baseHas);
}

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    setTag = '[object Set]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if `value` is an empty object, collection, map, or set.
 *
 * Objects are considered empty if they have no own enumerable string keyed
 * properties.
 *
 * Array-like values such as `arguments` objects, arrays, buffers, strings, or
 * jQuery-like collections are considered empty if they have a `length` of `0`.
 * Similarly, maps and sets are considered empty if they have a `size` of `0`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
 * @example
 *
 * _.isEmpty(null);
 * // => true
 *
 * _.isEmpty(true);
 * // => true
 *
 * _.isEmpty(1);
 * // => true
 *
 * _.isEmpty([1, 2, 3]);
 * // => false
 *
 * _.isEmpty({ 'a': 1 });
 * // => false
 */
function isEmpty(value) {
  if (value == null) {
    return true;
  }
  if (isArrayLike(value) &&
      (isArray(value) || typeof value == 'string' || typeof value.splice == 'function' ||
        isBuffer(value) || isTypedArray(value) || isArguments(value))) {
    return !value.length;
  }
  var tag = getTag(value);
  if (tag == mapTag || tag == setTag) {
    return !value.size;
  }
  if (isPrototype(value)) {
    return !baseKeys(value).length;
  }
  for (var key in value) {
    if (hasOwnProperty.call(value, key)) {
      return false;
    }
  }
  return true;
}

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, array buffers, booleans,
 * date objects, error objects, maps, numbers, `Object` objects, regexes,
 * sets, strings, symbols, and typed arrays. `Object` objects are compared
 * by their own, not inherited, enumerable properties. Functions and DOM
 * nodes are compared by strict equality, i.e. `===`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.isEqual(object, other);
 * // => true
 *
 * object === other;
 * // => false
 */
function isEqual(value, other) {
  return baseIsEqual(value, other);
}

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsFinite = root.isFinite;

/**
 * Checks if `value` is a finite primitive number.
 *
 * **Note:** This method is based on
 * [`Number.isFinite`](https://mdn.io/Number/isFinite).
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a finite number, else `false`.
 * @example
 *
 * _.isFinite(3);
 * // => true
 *
 * _.isFinite(Number.MIN_VALUE);
 * // => true
 *
 * _.isFinite(Infinity);
 * // => false
 *
 * _.isFinite('3');
 * // => false
 */
function isFinite(value) {
  return typeof value == 'number' && nativeIsFinite(value);
}

/**
 * Checks if `value` is `null` or `undefined`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is nullish, else `false`.
 * @example
 *
 * _.isNil(null);
 * // => true
 *
 * _.isNil(void 0);
 * // => true
 *
 * _.isNil(NaN);
 * // => false
 */
function isNil(value) {
  return value == null;
}

/**
 * The base implementation of `_.set`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @param {Function} [customizer] The function to customize path creation.
 * @returns {Object} Returns `object`.
 */
function baseSet(object, path, value, customizer) {
  if (!isObject(object)) {
    return object;
  }
  path = castPath(path, object);

  var index = -1,
      length = path.length,
      lastIndex = length - 1,
      nested = object;

  while (nested != null && ++index < length) {
    var key = toKey(path[index]),
        newValue = value;

    if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
      return object;
    }

    if (index != lastIndex) {
      var objValue = nested[key];
      newValue = undefined;
      if (newValue === undefined) {
        newValue = isObject(objValue)
          ? objValue
          : (isIndex(path[index + 1]) ? [] : {});
      }
    }
    assignValue(nested, key, newValue);
    nested = nested[key];
  }
  return object;
}

/**
 * The base implementation of  `_.pickBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} paths The property paths to pick.
 * @param {Function} predicate The function invoked per property.
 * @returns {Object} Returns the new object.
 */
function basePickBy(object, paths, predicate) {
  var index = -1,
      length = paths.length,
      result = {};

  while (++index < length) {
    var path = paths[index],
        value = baseGet(object, path);

    if (predicate(value, path)) {
      baseSet(result, castPath(path, object), value);
    }
  }
  return result;
}

/**
 * The base implementation of `_.pick` without support for individual
 * property identifiers.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} paths The property paths to pick.
 * @returns {Object} Returns the new object.
 */
function basePick(object, paths) {
  return basePickBy(object, paths, function(value, path) {
    return hasIn(object, path);
  });
}

/**
 * Creates an object composed of the picked `object` properties.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The source object.
 * @param {...(string|string[])} [paths] The property paths to pick.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * _.pick(object, ['a', 'c']);
 * // => { 'a': 1, 'c': 3 }
 */
var pick = flatRest(function(object, paths) {
  return object == null ? {} : basePick(object, paths);
});

/**
 * Sets the value at `path` of `object`. If a portion of `path` doesn't exist,
 * it's created. Arrays are created for missing index properties while objects
 * are created for all other missing properties. Use `_.setWith` to customize
 * `path` creation.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.set(object, 'a[0].b.c', 4);
 * console.log(object.a[0].b.c);
 * // => 4
 *
 * _.set(object, ['x', '0', 'y', 'z'], 5);
 * console.log(object.x[0].y.z);
 * // => 5
 */
function set(object, path, value) {
  return object == null ? object : baseSet(object, path, value);
}

/**
 * Converts `string` to
 * [start case](https://en.wikipedia.org/wiki/Letter_case#Stylistic_or_specialised_usage).
 *
 * @static
 * @memberOf _
 * @since 3.1.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the start cased string.
 * @example
 *
 * _.startCase('--foo-bar--');
 * // => 'Foo Bar'
 *
 * _.startCase('fooBar');
 * // => 'Foo Bar'
 *
 * _.startCase('__FOO_BAR__');
 * // => 'FOO BAR'
 */
var startCase = createCompounder(function(result, word, index) {
  return result + (index ? ' ' : '') + upperFirst(word);
});

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide `options` to indicate whether `func`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */
function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}

/**
 * Converts `string`, as a whole, to lower case just like
 * [String#toLowerCase](https://mdn.io/toLowerCase).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the lower cased string.
 * @example
 *
 * _.toLower('--Foo-Bar--');
 * // => '--foo-bar--'
 *
 * _.toLower('fooBar');
 * // => 'foobar'
 *
 * _.toLower('__FOO_BAR__');
 * // => '__foo_bar__'
 */
function toLower(value) {
  return toString(value).toLowerCase();
}

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Creates a set object of `values`.
 *
 * @private
 * @param {Array} values The values to add to the set.
 * @returns {Object} Returns the new set.
 */
var createSet = !(Set$1 && (1 / setToArray(new Set$1([,-0]))[1]) == INFINITY) ? noop : function(values) {
  return new Set$1(values);
};

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * The base implementation of `_.uniqBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 */
function baseUniq(array, iteratee, comparator) {
  var index = -1,
      includes = arrayIncludes,
      length = array.length,
      isCommon = true,
      result = [],
      seen = result;

  if (length >= LARGE_ARRAY_SIZE) {
    var set = iteratee ? null : createSet(array);
    if (set) {
      return setToArray(set);
    }
    isCommon = false;
    includes = cacheHas;
    seen = new SetCache;
  }
  else {
    seen = iteratee ? [] : result;
  }
  outer:
  while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value) : value;

    value = (value !== 0) ? value : 0;
    if (isCommon && computed === computed) {
      var seenIndex = seen.length;
      while (seenIndex--) {
        if (seen[seenIndex] === computed) {
          continue outer;
        }
      }
      if (iteratee) {
        seen.push(computed);
      }
      result.push(value);
    }
    else if (!includes(seen, computed, comparator)) {
      if (seen !== result) {
        seen.push(computed);
      }
      result.push(value);
    }
  }
  return result;
}

/**
 * This method is like `_.uniq` except that it accepts `iteratee` which is
 * invoked for each element in `array` to generate the criterion by which
 * uniqueness is computed. The order of result values is determined by the
 * order they occur in the array. The iteratee is invoked with one argument:
 * (value).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 * @example
 *
 * _.uniqBy([2.1, 1.2, 2.3], Math.floor);
 * // => [2.1, 1.2]
 *
 * // The `_.property` iteratee shorthand.
 * _.uniqBy([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
 * // => [{ 'x': 1 }, { 'x': 2 }]
 */
function uniqBy(array, iteratee) {
  return (array && array.length) ? baseUniq(array, baseIteratee(iteratee)) : [];
}

// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
    // find the complete implementation of crypto (msCrypto) on IE11.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

var REGEX = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

function validate(uuid) {
  return typeof uuid === 'string' && REGEX.test(uuid);
}

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

var byteToHex = [];

for (var i$5 = 0; i$5 < 256; ++i$5) {
  byteToHex.push((i$5 + 0x100).toString(16).substr(1));
}

function stringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!validate(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

function v4(options, buf, offset) {
  options = options || {};
  var rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  return stringify(rnds);
}

//? We kept it as number so that we could disable only the unrequired features,
//? since the "Builder" mode will contain all the features of the "Preview" mode.
var ILivePreviewModeConfig;
(function (ILivePreviewModeConfig) {
    ILivePreviewModeConfig[ILivePreviewModeConfig["PREVIEW"] = 1] = "PREVIEW";
    ILivePreviewModeConfig[ILivePreviewModeConfig["BUILDER"] = 2] = "BUILDER";
})(ILivePreviewModeConfig || (ILivePreviewModeConfig = {}));
var ILivePreviewWindowType;
(function (ILivePreviewWindowType) {
    ILivePreviewWindowType["PREVIEW"] = "preview";
    ILivePreviewWindowType["PREVIEW_SHARE"] = "preview-share";
    ILivePreviewWindowType["BUILDER"] = "builder";
    ILivePreviewWindowType["INDEPENDENT"] = "independent";
})(ILivePreviewWindowType || (ILivePreviewWindowType = {}));

function getUserInitData() {
    return {
        ssr: true,
        enable: true,
        debug: false,
        cleanCslpOnProduction: true,
        editButton: {
            enable: true,
            exclude: [],
            position: "top",
            includeByQueryParameter: true,
        },
        editInVisualBuilderButton: {
            enable: true,
            position: "bottom-right"
        },
        mode: "preview",
        stackDetails: {
            apiKey: "",
            environment: "",
            branch: "",
        },
        clientUrlParams: {
            protocol: "https",
            host: "app.contentstack.com",
            port: 443,
        },
        stackSdk: {
            live_preview: {},
            environment: "",
        },
        runScriptsOnUpdate: false,
    };
}
function getDefaultConfig() {
    return {
        ssr: true,
        enable: true,
        debug: false,
        cleanCslpOnProduction: true,
        editButton: {
            enable: true,
            exclude: [],
            position: "top",
            includeByQueryParameter: true,
        },
        editInVisualBuilderButton: {
            enable: true,
            position: "bottom-right"
        },
        hash: "",
        mode: 1,
        windowType: ILivePreviewWindowType.INDEPENDENT,
        stackDetails: {
            apiKey: "",
            environment: "",
            contentTypeUid: "",
            entryUid: "",
            locale: "en-us",
            branch: "main",
            masterLocale: "en-us",
        },
        clientUrlParams: {
            protocol: "https",
            host: "app.contentstack.com",
            port: 443,
            url: "https://app.contentstack.com:443",
        },
        stackSdk: {
            live_preview: {},
            headers: {
                api_key: "",
            },
            environment: "",
        },
        runScriptsOnUpdate: false,
        onChange() {
            return;
        },
        elements: {
            highlightedElement: null,
        },
        collab: {
            enable: false,
            fromShare: false,
            pauseFeedback: false,
            isFeedbackMode: false,
            inviteMetadata: {
                currentUser: {
                    email: "",
                    uid: "",
                },
                users: [],
                inviteUid: "",
            },
            payload: [],
        },
    };
}

var n$3,l$3,u$5,t$3,i$4,o$3,r$2,f$4,e$4,c$5={},s$4=[],a$4=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,h$3=Array.isArray;function v$4(n,l){for(var u in l)n[u]=l[u];return n}function p$4(n){var l=n.parentNode;l&&l.removeChild(n);}function y$3(l,u,t){var i,o,r,f={};for(r in u)"key"==r?i=u[r]:"ref"==r?o=u[r]:f[r]=u[r];if(arguments.length>2&&(f.children=arguments.length>3?n$3.call(arguments,2):t),"function"==typeof l&&null!=l.defaultProps)for(r in l.defaultProps) void 0===f[r]&&(f[r]=l.defaultProps[r]);return d$4(l,f,i,o,null)}function d$4(n,t,i,o,r){var f={type:n,props:t,key:i,ref:o,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,constructor:void 0,__v:null==r?++u$5:r,__i:-1,__u:0};return null==r&&null!=l$3.vnode&&l$3.vnode(f),f}function _$2(){return {current:null}}function g$4(n){return n.children}function b$3(n,l){this.props=n,this.context=l;}function m$3(n,l){if(null==l)return n.__?m$3(n.__,n.__i+1):null;for(var u;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e)return u.__e;return "function"==typeof n.type?m$3(n):null}function w$4(n,u,t){var i,o=n.__v,r=o.__e,f=n.__P;if(f)return (i=v$4({},o)).__v=o.__v+1,l$3.vnode&&l$3.vnode(i),M$1(f,i,o,n.__n,void 0!==f.ownerSVGElement,32&o.__u?[r]:null,u,null==r?m$3(o):r,!!(32&o.__u),t),i.__v=o.__v,i.__.__k[i.__i]=i,i.__d=void 0,i.__e!=r&&k$3(i),i}function k$3(n){var l,u;if(null!=(n=n.__)&&null!=n.__c){for(n.__e=n.__c.base=null,l=0;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e){n.__e=n.__c.base=u.__e;break}return k$3(n)}}function x$2(n){(!n.__d&&(n.__d=true)&&i$4.push(n)&&!C$2.__r++||o$3!==l$3.debounceRendering)&&((o$3=l$3.debounceRendering)||r$2)(C$2);}function C$2(){var n,u,t,o=[],r=[];for(i$4.sort(f$4);n=i$4.shift();)n.__d&&(t=i$4.length,u=w$4(n,o,r)||u,0===t||i$4.length>t?(j$2(o,u,r),r.length=o.length=0,u=void 0,i$4.sort(f$4)):u&&l$3.__c&&l$3.__c(u,s$4));u&&j$2(o,u,r),C$2.__r=0;}function P$2(n,l,u,t,i,o,r,f,e,a,h){var v,p,y,d,_,g=t&&t.__k||s$4,b=l.length;for(u.__d=e,S(u,l,g),e=u.__d,v=0;v<b;v++)null!=(y=u.__k[v])&&"boolean"!=typeof y&&"function"!=typeof y&&(p=-1===y.__i?c$5:g[y.__i]||c$5,y.__i=v,M$1(n,y,p,i,o,r,f,e,a,h),d=y.__e,y.ref&&p.ref!=y.ref&&(p.ref&&N$1(p.ref,null,y),h.push(y.ref,y.__c||d,y)),null==_&&null!=d&&(_=d),65536&y.__u||p.__k===y.__k?e=$$1(y,e,n):"function"==typeof y.type&&void 0!==y.__d?e=y.__d:d&&(e=d.nextSibling),y.__d=void 0,y.__u&=-196609);u.__d=e,u.__e=_;}function S(n,l,u){var t,i,o,r,f,e=l.length,c=u.length,s=c,a=0;for(n.__k=[],t=0;t<e;t++)null!=(i=n.__k[t]=null==(i=l[t])||"boolean"==typeof i||"function"==typeof i?null:"string"==typeof i||"number"==typeof i||"bigint"==typeof i||i.constructor==String?d$4(null,i,null,null,i):h$3(i)?d$4(g$4,{children:i},null,null,null):void 0===i.constructor&&i.__b>0?d$4(i.type,i.props,i.key,i.ref?i.ref:null,i.__v):i)?(i.__=n,i.__b=n.__b+1,f=I$1(i,u,r=t+a,s),i.__i=f,o=null,-1!==f&&(s--,(o=u[f])&&(o.__u|=131072)),null==o||null===o.__v?(-1==f&&a--,"function"!=typeof i.type&&(i.__u|=65536)):f!==r&&(f===r+1?a++:f>r?s>e-r?a+=f-r:a--:a=f<r&&f==r-1?f-r:0,f!==t+a&&(i.__u|=65536))):(o=u[t])&&null==o.key&&o.__e&&0==(131072&o.__u)&&(o.__e==n.__d&&(n.__d=m$3(o)),O$1(o,o,false),u[t]=null,s--);if(s)for(t=0;t<c;t++)null!=(o=u[t])&&0==(131072&o.__u)&&(o.__e==n.__d&&(n.__d=m$3(o)),O$1(o,o));}function $$1(n,l,u){var t,i;if("function"==typeof n.type){for(t=n.__k,i=0;t&&i<t.length;i++)t[i]&&(t[i].__=n,l=$$1(t[i],l,u));return l}n.__e!=l&&(u.insertBefore(n.__e,l||null),l=n.__e);do{l=l&&l.nextSibling;}while(null!=l&&8===l.nodeType);return l}function H$1(n,l){return l=l||[],null==n||"boolean"==typeof n||(h$3(n)?n.some(function(n){H$1(n,l);}):l.push(n)),l}function I$1(n,l,u,t){var i=n.key,o=n.type,r=u-1,f=u+1,e=l[u];if(null===e||e&&i==e.key&&o===e.type)return u;if(t>(null!=e&&0==(131072&e.__u)?1:0))for(;r>=0||f<l.length;){if(r>=0){if((e=l[r])&&0==(131072&e.__u)&&i==e.key&&o===e.type)return r;r--;}if(f<l.length){if((e=l[f])&&0==(131072&e.__u)&&i==e.key&&o===e.type)return f;f++;}}return  -1}function T$2(n,l,u){"-"===l[0]?n.setProperty(l,null==u?"":u):n[l]=null==u?"":"number"!=typeof u||a$4.test(l)?u:u+"px";}function A$2(n,l,u,t,i){var o;n:if("style"===l)if("string"==typeof u)n.style.cssText=u;else {if("string"==typeof t&&(n.style.cssText=t=""),t)for(l in t)u&&l in u||T$2(n.style,l,"");if(u)for(l in u)t&&u[l]===t[l]||T$2(n.style,l,u[l]);}else if("o"===l[0]&&"n"===l[1])o=l!==(l=l.replace(/(PointerCapture)$|Capture$/i,"$1")),l=l.toLowerCase()in n?l.toLowerCase().slice(2):l.slice(2),n.l||(n.l={}),n.l[l+o]=u,u?t?u.u=t.u:(u.u=Date.now(),n.addEventListener(l,o?L$1:D$2,o)):n.removeEventListener(l,o?L$1:D$2,o);else {if(i)l=l.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if("width"!==l&&"height"!==l&&"href"!==l&&"list"!==l&&"form"!==l&&"tabIndex"!==l&&"download"!==l&&"rowSpan"!==l&&"colSpan"!==l&&"role"!==l&&l in n)try{n[l]=null==u?"":u;break n}catch(n){}"function"==typeof u||(null==u||false===u&&"-"!==l[4]?n.removeAttribute(l):n.setAttribute(l,u));}}function D$2(n){if(this.l){var u=this.l[n.type+false];if(n.t){if(n.t<=u.u)return}else n.t=Date.now();return u(l$3.event?l$3.event(n):n)}}function L$1(n){if(this.l)return this.l[n.type+true](l$3.event?l$3.event(n):n)}function M$1(n,u,t,i,o,r,f,e,c,s){var a,p,y,d,_,m,w,k,x,C,S,$,H,I,T,A=u.type;if(void 0!==u.constructor)return null;128&t.__u&&(c=!!(32&t.__u),r=[e=u.__e=t.__e]),(a=l$3.__b)&&a(u);n:if("function"==typeof A)try{if(k=u.props,x=(a=A.contextType)&&i[a.__c],C=a?x?x.props.value:a.__:i,t.__c?w=(p=u.__c=t.__c).__=p.__E:("prototype"in A&&A.prototype.render?u.__c=p=new A(k,C):(u.__c=p=new b$3(k,C),p.constructor=A,p.render=q$2),x&&x.sub(p),p.props=k,p.state||(p.state={}),p.context=C,p.__n=i,y=p.__d=!0,p.__h=[],p._sb=[]),null==p.__s&&(p.__s=p.state),null!=A.getDerivedStateFromProps&&(p.__s==p.state&&(p.__s=v$4({},p.__s)),v$4(p.__s,A.getDerivedStateFromProps(k,p.__s))),d=p.props,_=p.state,p.__v=u,y)null==A.getDerivedStateFromProps&&null!=p.componentWillMount&&p.componentWillMount(),null!=p.componentDidMount&&p.__h.push(p.componentDidMount);else {if(null==A.getDerivedStateFromProps&&k!==d&&null!=p.componentWillReceiveProps&&p.componentWillReceiveProps(k,C),!p.__e&&(null!=p.shouldComponentUpdate&&!1===p.shouldComponentUpdate(k,p.__s,C)||u.__v===t.__v)){for(u.__v!==t.__v&&(p.props=k,p.state=p.__s,p.__d=!1),u.__e=t.__e,u.__k=t.__k,u.__k.forEach(function(n){n&&(n.__=u);}),S=0;S<p._sb.length;S++)p.__h.push(p._sb[S]);p._sb=[],p.__h.length&&f.push(p);break n}null!=p.componentWillUpdate&&p.componentWillUpdate(k,p.__s,C),null!=p.componentDidUpdate&&p.__h.push(function(){p.componentDidUpdate(d,_,m);});}if(p.context=C,p.props=k,p.__P=n,p.__e=!1,$=l$3.__r,H=0,"prototype"in A&&A.prototype.render){for(p.state=p.__s,p.__d=!1,$&&$(u),a=p.render(p.props,p.state,p.context),I=0;I<p._sb.length;I++)p.__h.push(p._sb[I]);p._sb=[];}else do{p.__d=!1,$&&$(u),a=p.render(p.props,p.state,p.context),p.state=p.__s;}while(p.__d&&++H<25);p.state=p.__s,null!=p.getChildContext&&(i=v$4(v$4({},i),p.getChildContext())),y||null==p.getSnapshotBeforeUpdate||(m=p.getSnapshotBeforeUpdate(d,_)),P$2(n,h$3(T=null!=a&&a.type===g$4&&null==a.key?a.props.children:a)?T:[T],u,t,i,o,r,f,e,c,s),p.base=u.__e,u.__u&=-161,p.__h.length&&f.push(p),w&&(p.__E=p.__=null);}catch(n){u.__v=null,c||null!=r?(u.__e=e,u.__u|=c?160:32,r[r.indexOf(e)]=null):(u.__e=t.__e,u.__k=t.__k),l$3.__e(n,u,t);}else null==r&&u.__v===t.__v?(u.__k=t.__k,u.__e=t.__e):u.__e=z$2(t.__e,u,t,i,o,r,f,c,s);(a=l$3.diffed)&&a(u);}function j$2(n,u,t){for(var i=0;i<t.length;i++)N$1(t[i],t[++i],t[++i]);l$3.__c&&l$3.__c(u,n),n.some(function(u){try{n=u.__h,u.__h=[],n.some(function(n){n.call(u);});}catch(n){l$3.__e(n,u.__v);}});}function z$2(l,u,t,i,o,r,f,e,s){var a,v,y,d,_,g,b,w=t.props,k=u.props,x=u.type;if("svg"===x&&(o=true),null!=r)for(a=0;a<r.length;a++)if((_=r[a])&&"setAttribute"in _==!!x&&(x?_.localName===x:3===_.nodeType)){l=_,r[a]=null;break}if(null==l){if(null===x)return document.createTextNode(k);l=o?document.createElementNS("http://www.w3.org/2000/svg",x):document.createElement(x,k.is&&k),r=null,e=false;}if(null===x)w===k||e&&l.data===k||(l.data=k);else {if(r=r&&n$3.call(l.childNodes),w=t.props||c$5,!e&&null!=r)for(w={},a=0;a<l.attributes.length;a++)w[(_=l.attributes[a]).name]=_.value;for(a in w)_=w[a],"children"==a||("dangerouslySetInnerHTML"==a?y=_:"key"===a||a in k||A$2(l,a,null,_,o));for(a in k)_=k[a],"children"==a?d=_:"dangerouslySetInnerHTML"==a?v=_:"value"==a?g=_:"checked"==a?b=_:"key"===a||e&&"function"!=typeof _||w[a]===_||A$2(l,a,_,w[a],o);if(v)e||y&&(v.__html===y.__html||v.__html===l.innerHTML)||(l.innerHTML=v.__html),u.__k=[];else if(y&&(l.innerHTML=""),P$2(l,h$3(d)?d:[d],u,t,i,o&&"foreignObject"!==x,r,f,r?r[0]:t.__k&&m$3(t,0),e,s),null!=r)for(a=r.length;a--;)null!=r[a]&&p$4(r[a]);e||(a="value",void 0!==g&&(g!==l[a]||"progress"===x&&!g||"option"===x&&g!==w[a])&&A$2(l,a,g,w[a],false),a="checked",void 0!==b&&b!==l[a]&&A$2(l,a,b,w[a],false));}return l}function N$1(n,u,t){try{"function"==typeof n?n(u):n.current=u;}catch(n){l$3.__e(n,t);}}function O$1(n,u,t){var i,o;if(l$3.unmount&&l$3.unmount(n),(i=n.ref)&&(i.current&&i.current!==n.__e||N$1(i,null,u)),null!=(i=n.__c)){if(i.componentWillUnmount)try{i.componentWillUnmount();}catch(n){l$3.__e(n,u);}i.base=i.__P=null,n.__c=void 0;}if(i=n.__k)for(o=0;o<i.length;o++)i[o]&&O$1(i[o],u,t||"function"!=typeof n.type);t||null==n.__e||p$4(n.__e),n.__=n.__e=n.__d=void 0;}function q$2(n,l,u){return this.constructor(n,u)}function B$2(u,t,i){var o,r,f,e;l$3.__&&l$3.__(u,t),r=(o="function"==typeof i)?null:i&&i.__k||t.__k,f=[],e=[],M$1(t,u=(!o&&i||t).__k=y$3(g$4,null,[u]),r||c$5,c$5,void 0!==t.ownerSVGElement,!o&&i?[i]:r?null:t.firstChild?n$3.call(t.childNodes):null,f,!o&&i?i:r?r.__e:t.firstChild,o,e),u.__d=void 0,j$2(f,u,e);}function E$2(n,l){B$2(n,l,E$2);}function F$2(l,u,t){var i,o,r,f,e=v$4({},l.props);for(r in l.type&&l.type.defaultProps&&(f=l.type.defaultProps),u)"key"==r?i=u[r]:"ref"==r?o=u[r]:e[r]=void 0===u[r]&&void 0!==f?f[r]:u[r];return arguments.length>2&&(e.children=arguments.length>3?n$3.call(arguments,2):t),d$4(l.type,e,i||l.key,o||l.ref,null)}function G$1(n,l){var u={__c:l="__cC"+e$4++,__:n,Consumer:function(n,l){return n.children(l)},Provider:function(n){var u,t;return this.getChildContext||(u=[],(t={})[l]=this,this.getChildContext=function(){return t},this.shouldComponentUpdate=function(n){this.props.value!==n.value&&u.some(function(n){n.__e=true,x$2(n);});},this.sub=function(n){u.push(n);var l=n.componentWillUnmount;n.componentWillUnmount=function(){u.splice(u.indexOf(n),1),l&&l.call(n);};}),n.children}};return u.Provider.__=u.Consumer.contextType=u}n$3=s$4.slice,l$3={__e:function(n,l,u,t){for(var i,o,r;l=l.__;)if((i=l.__c)&&!i.__)try{if((o=i.constructor)&&null!=o.getDerivedStateFromError&&(i.setState(o.getDerivedStateFromError(n)),r=i.__d),null!=i.componentDidCatch&&(i.componentDidCatch(n,t||{}),r=i.__d),r)return i.__E=i}catch(l){n=l;}throw n}},u$5=0,t$3=function(n){return null!=n&&null==n.constructor},b$3.prototype.setState=function(n,l){var u;u=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=v$4({},this.state),"function"==typeof n&&(n=n(v$4({},u),this.props)),n&&v$4(u,n),null!=n&&this.__v&&(l&&this._sb.push(l),x$2(this));},b$3.prototype.forceUpdate=function(n){this.__v&&(this.__e=true,n&&this.__h.push(n),x$2(this));},b$3.prototype.render=g$4,i$4=[],r$2="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,f$4=function(n,l){return n.__v.__b-l.__v.__b},C$2.__r=0,e$4=0;

var t$2,r$1,u$4,i$3,o$2=0,f$3=[],c$4=[],e$3=l$3,a$3=e$3.__b,v$3=e$3.__r,l$2=e$3.diffed,m$2=e$3.__c,s$3=e$3.unmount,d$3=e$3.__;function h$2(n,t){e$3.__h&&e$3.__h(r$1,n,o$2||t),o$2=0;var u=r$1.__H||(r$1.__H={__:[],__h:[]});return n>=u.__.length&&u.__.push({__V:c$4}),u.__[n]}function p$3(n){return o$2=1,y$2(D$1,n)}function y$2(n,u,i){var o=h$2(t$2++,2);if(o.t=n,!o.__c&&(o.__=[i?i(u):D$1(void 0,u),function(n){var t=o.__N?o.__N[0]:o.__[0],r=o.t(t,n);t!==r&&(o.__N=[r,o.__[1]],o.__c.setState({}));}],o.__c=r$1,!r$1.u)){var f=function(n,t,r){if(!o.__c.__H)return  true;var u=o.__c.__H.__.filter(function(n){return !!n.__c});if(u.every(function(n){return !n.__N}))return !c||c.call(this,n,t,r);var i=false;return u.forEach(function(n){if(n.__N){var t=n.__[0];n.__=n.__N,n.__N=void 0,t!==n.__[0]&&(i=true);}}),!(!i&&o.__c.props===n)&&(!c||c.call(this,n,t,r))};r$1.u=true;var c=r$1.shouldComponentUpdate,e=r$1.componentWillUpdate;r$1.componentWillUpdate=function(n,t,r){if(this.__e){var u=c;c=void 0,f(n,t,r),c=u;}e&&e.call(this,n,t,r);},r$1.shouldComponentUpdate=f;}return o.__N||o.__}function _$1(n,u){var i=h$2(t$2++,3);!e$3.__s&&C$1(i.__H,u)&&(i.__=n,i.i=u,r$1.__H.__h.push(i));}function A$1(n,u){var i=h$2(t$2++,4);!e$3.__s&&C$1(i.__H,u)&&(i.__=n,i.i=u,r$1.__h.push(i));}function F$1(n){return o$2=5,q$1(function(){return {current:n}},[])}function T$1(n,t,r){o$2=6,A$1(function(){return "function"==typeof n?(n(t()),function(){return n(null)}):n?(n.current=t(),function(){return n.current=null}):void 0},null==r?r:r.concat(n));}function q$1(n,r){var u=h$2(t$2++,7);return C$1(u.__H,r)?(u.__V=n(),u.i=r,u.__h=n,u.__V):u.__}function x$1(n,t){return o$2=8,q$1(function(){return n},t)}function P$1(n){var u=r$1.context[n.__c],i=h$2(t$2++,9);return i.c=n,u?(null==i.__&&(i.__=true,u.sub(r$1)),u.props.value):n.__}function V$1(n,t){e$3.useDebugValue&&e$3.useDebugValue(t?t(n):n);}function g$3(){var n=h$2(t$2++,11);if(!n.__){for(var u=r$1.__v;null!==u&&!u.__m&&null!==u.__;)u=u.__;var i=u.__m||(u.__m=[0,0]);n.__="P"+i[0]+"-"+i[1]++;}return n.__}function j$1(){for(var n;n=f$3.shift();)if(n.__P&&n.__H)try{n.__H.__h.forEach(z$1),n.__H.__h.forEach(B$1),n.__H.__h=[];}catch(t){n.__H.__h=[],e$3.__e(t,n.__v);}}e$3.__b=function(n){r$1=null,a$3&&a$3(n);},e$3.__=function(n,t){n&&t.__k&&t.__k.__m&&(n.__m=t.__k.__m),d$3&&d$3(n,t);},e$3.__r=function(n){v$3&&v$3(n),t$2=0;var i=(r$1=n.__c).__H;i&&(u$4===r$1?(i.__h=[],r$1.__h=[],i.__.forEach(function(n){n.__N&&(n.__=n.__N),n.__V=c$4,n.__N=n.i=void 0;})):(i.__h.forEach(z$1),i.__h.forEach(B$1),i.__h=[],t$2=0)),u$4=r$1;},e$3.diffed=function(n){l$2&&l$2(n);var t=n.__c;t&&t.__H&&(t.__H.__h.length&&(1!==f$3.push(t)&&i$3===e$3.requestAnimationFrame||((i$3=e$3.requestAnimationFrame)||w$3)(j$1)),t.__H.__.forEach(function(n){n.i&&(n.__H=n.i),n.__V!==c$4&&(n.__=n.__V),n.i=void 0,n.__V=c$4;})),u$4=r$1=null;},e$3.__c=function(n,t){t.some(function(n){try{n.__h.forEach(z$1),n.__h=n.__h.filter(function(n){return !n.__||B$1(n)});}catch(r){t.some(function(n){n.__h&&(n.__h=[]);}),t=[],e$3.__e(r,n.__v);}}),m$2&&m$2(n,t);},e$3.unmount=function(n){s$3&&s$3(n);var t,r=n.__c;r&&r.__H&&(r.__H.__.forEach(function(n){try{z$1(n);}catch(n){t=n;}}),r.__H=void 0,t&&e$3.__e(t,r.__v));};var k$2="function"==typeof requestAnimationFrame;function w$3(n){var t,r=function(){clearTimeout(u),k$2&&cancelAnimationFrame(t),setTimeout(n);},u=setTimeout(r,100);k$2&&(t=requestAnimationFrame(r));}function z$1(n){var t=r$1,u=n.__c;"function"==typeof u&&(n.__c=void 0,u()),r$1=t;}function B$1(n){var t=r$1;n.__c=n.__(),r$1=t;}function C$1(n,t){return !n||n.length!==t.length||t.some(function(t,r){return t!==n[r]})}function D$1(n,t){return "function"==typeof t?t(n):t}

const i$2=Symbol.for("preact-signals");function t$1(){if(r>1){r--;return}let i,t=false;while(void 0!==s$2){let o=s$2;s$2=void 0;f$2++;while(void 0!==o){const n=o.o;o.o=void 0;o.f&=-3;if(!(8&o.f)&&v$2(o))try{o.c();}catch(o){if(!t){i=o;t=true;}}o=n;}}f$2=0;r--;if(t)throw i}let n$2,s$2;let r=0,f$2=0,e$2=0;function c$3(i){if(void 0===n$2)return;let t=i.n;if(void 0===t||t.t!==n$2){t={i:0,S:i,p:n$2.s,n:void 0,t:n$2,e:void 0,x:void 0,r:t};if(void 0!==n$2.s)n$2.s.n=t;n$2.s=t;i.n=t;if(32&n$2.f)i.S(t);return t}else if(-1===t.i){t.i=0;if(void 0!==t.n){t.n.p=t.p;if(void 0!==t.p)t.p.n=t.n;t.p=n$2.s;t.n=void 0;n$2.s.n=t;n$2.s=t;}return t}}function u$3(i){this.v=i;this.i=0;this.n=void 0;this.t=void 0;}u$3.prototype.brand=i$2;u$3.prototype.h=function(){return  true};u$3.prototype.S=function(i){if(this.t!==i&&void 0===i.e){i.x=this.t;if(void 0!==this.t)this.t.e=i;this.t=i;}};u$3.prototype.U=function(i){if(void 0!==this.t){const t=i.e,o=i.x;if(void 0!==t){t.x=o;i.e=void 0;}if(void 0!==o){o.e=t;i.x=void 0;}if(i===this.t)this.t=o;}};u$3.prototype.subscribe=function(i){return E$1(()=>{const t=this.value,o=n$2;n$2=void 0;try{i(t);}finally{n$2=o;}})};u$3.prototype.valueOf=function(){return this.value};u$3.prototype.toString=function(){return this.value+""};u$3.prototype.toJSON=function(){return this.value};u$3.prototype.peek=function(){const i=n$2;n$2=void 0;try{return this.value}finally{n$2=i;}};Object.defineProperty(u$3.prototype,"value",{get(){const i=c$3(this);if(void 0!==i)i.i=this.i;return this.v},set(i){if(i!==this.v){if(f$2>100)throw new Error("Cycle detected");this.v=i;this.i++;e$2++;r++;try{for(let i=this.t;void 0!==i;i=i.x)i.t.N();}finally{t$1();}}}});function d$2(i){return new u$3(i)}function v$2(i){for(let t=i.s;void 0!==t;t=t.n)if(t.S.i!==t.i||!t.S.h()||t.S.i!==t.i)return  true;return  false}function l$1(i){for(let t=i.s;void 0!==t;t=t.n){const o=t.S.n;if(void 0!==o)t.r=o;t.S.n=t;t.i=-1;if(void 0===t.n){i.s=t;break}}}function y$1(i){let t,o=i.s;while(void 0!==o){const i=o.p;if(-1===o.i){o.S.U(o);if(void 0!==i)i.n=o.n;if(void 0!==o.n)o.n.p=i;}else t=o;o.S.n=o.r;if(void 0!==o.r)o.r=void 0;o=i;}i.s=t;}function a$2(i){u$3.call(this,void 0);this.x=i;this.s=void 0;this.g=e$2-1;this.f=4;}(a$2.prototype=new u$3).h=function(){this.f&=-3;if(1&this.f)return  false;if(32==(36&this.f))return  true;this.f&=-5;if(this.g===e$2)return  true;this.g=e$2;this.f|=1;if(this.i>0&&!v$2(this)){this.f&=-2;return  true}const i=n$2;try{l$1(this);n$2=this;const i=this.x();if(16&this.f||this.v!==i||0===this.i){this.v=i;this.f&=-17;this.i++;}}catch(i){this.v=i;this.f|=16;this.i++;}n$2=i;y$1(this);this.f&=-2;return  true};a$2.prototype.S=function(i){if(void 0===this.t){this.f|=36;for(let i=this.s;void 0!==i;i=i.n)i.S.S(i);}u$3.prototype.S.call(this,i);};a$2.prototype.U=function(i){if(void 0!==this.t){u$3.prototype.U.call(this,i);if(void 0===this.t){this.f&=-33;for(let i=this.s;void 0!==i;i=i.n)i.S.U(i);}}};a$2.prototype.N=function(){if(!(2&this.f)){this.f|=6;for(let i=this.t;void 0!==i;i=i.x)i.t.N();}};Object.defineProperty(a$2.prototype,"value",{get(){if(1&this.f)throw new Error("Cycle detected");const i=c$3(this);this.h();if(void 0!==i)i.i=this.i;if(16&this.f)throw this.v;return this.v}});function w$2(i){return new a$2(i)}function _(i){const o=i.u;i.u=void 0;if("function"==typeof o){r++;const s=n$2;n$2=void 0;try{o();}catch(t){i.f&=-2;i.f|=8;g$2(i);throw t}finally{n$2=s;t$1();}}}function g$2(i){for(let t=i.s;void 0!==t;t=t.n)t.S.U(t);i.x=void 0;i.s=void 0;_(i);}function p$2(i){if(n$2!==this)throw new Error("Out-of-order effect");y$1(this);n$2=i;this.f&=-2;if(8&this.f)g$2(this);t$1();}function b$2(i){this.x=i;this.u=void 0;this.s=void 0;this.o=void 0;this.f=32;}b$2.prototype.c=function(){const i=this.S();try{if(8&this.f)return;if(void 0===this.x)return;const t=this.x();if("function"==typeof t)this.u=t;}finally{i();}};b$2.prototype.S=function(){if(1&this.f)throw new Error("Cycle detected");this.f|=1;this.f&=-9;_(this);l$1(this);r++;const i=n$2;n$2=this;return p$2.bind(this,i)};b$2.prototype.N=function(){if(!(2&this.f)){this.f|=2;this.o=s$2;s$2=this;}};b$2.prototype.d=function(){this.f|=8;if(!(1&this.f))g$2(this);};function E$1(i){const t=new b$2(i);try{t.c();}catch(i){t.d();throw i}return t.d.bind(t)}

function c$2(t,e){l$3[t]=e.bind(null,l$3[t]||(()=>{}));}let d$1;function h$1(t){if(d$1)d$1();d$1=t&&t.S();}function p$1({data:t}){const i=useSignal(t);i.value=t;const o=q$1(()=>{let t=this.__v;while(t=t.__)if(t.__c){t.__c.__$f|=4;break}this.__$u.c=()=>{var t;if(!t$3(o.peek())&&3===(null==(t=this.base)?void 0:t.nodeType))this.base.data=o.peek();else {this.__$f|=1;this.setState({});}};return w$2(()=>{let t=i.value.value;return 0===t?0:true===t?"":t||""})},[]);return o.value}p$1.displayName="_st";Object.defineProperties(u$3.prototype,{constructor:{configurable:true,value:void 0},type:{configurable:true,value:p$1},props:{configurable:true,get(){return {data:this}}},__b:{configurable:true,value:1}});c$2("__b",(t,i)=>{if("string"==typeof i.type){let t,e=i.props;for(let n in e){if("children"===n)continue;let o=e[n];if(o instanceof u$3){if(!t)i.__np=t={};t[n]=o;e[n]=o.peek();}}}t(i);});c$2("__r",(t,i)=>{h$1();let e,n=i.__c;if(n){n.__$f&=-2;e=n.__$u;if(void 0===e)n.__$u=e=function(t){let i;E$1(function(){i=this;});i.c=()=>{n.__$f|=1;n.setState({});};return i}();}h$1(e);t(i);});c$2("__e",(t,i,e,n)=>{h$1();t(i,e,n);});c$2("diffed",(t,i)=>{h$1();let e;if("string"==typeof i.type&&(e=i.__e)){let t=i.__np,n=i.props;if(t){let i=e.U;if(i)for(let e in i){let n=i[e];if(void 0!==n&&!(e in t)){n.d();i[e]=void 0;}}else {i={};e.U=i;}for(let o in t){let r=i[o],f=t[o];if(void 0===r){r=v$1(e,o,f,n);i[o]=r;}else r.o(f,n);}}}t(i);});function v$1(t,i,e,n){const o=i in t&&void 0===t.ownerSVGElement,r=d$2(e);return {o:(t,i)=>{r.value=t;n=i;},d:E$1(()=>{const e=r.value.value;if(n[i]!==e){n[i]=e;if(o)t[i]=e;else if(e)t.setAttribute(i,e);else t.removeAttribute(i);}})}}c$2("unmount",(t,i)=>{if("string"==typeof i.type){let t=i.__e;if(t){const i=t.U;if(i){t.U=void 0;for(let t in i){let e=i[t];if(e)e.d();}}}}else {let t=i.__c;if(t){const i=t.__$u;if(i){t.__$u=void 0;i.d();}}}t(i);});c$2("__h",(t,i,e,n)=>{if(n<3||9===n)i.__$f|=2;t(i,e,n);});b$3.prototype.shouldComponentUpdate=function(t,i){const e=this.__$u;if(!(e&&void 0!==e.s||4&this.__$f))return  true;if(3&this.__$f)return  true;for(let t in i)return  true;for(let i in t)if("__source"!==i&&t[i]!==this.props[i])return  true;for(let i in this.props)if(!(i in t))return  true;return  false};function useSignal(t){return q$1(()=>d$2(t),[])}

var a$1=new WeakMap,o$1=new WeakMap,s$1=new WeakMap,u$2=new WeakSet,c$1=new WeakMap,f$1=/^\$/,i$1=Object.getOwnPropertyDescriptor,g$1=function(e){if(!k$1(e))throw new Error("This object can't be observed.");return o$1.has(e)||o$1.set(e,v(e,d)),o$1.get(e)};var v=function(e,t){var r=new Proxy(e,t);return u$2.add(r),r},y=function(){throw new Error("Don't mutate the signals directly.")},w$1=function(e){return function(t,u,c){var g;var p=e||"$"===u[0];if(!e&&p&&Array.isArray(t)){if("$"===u)return s$1.has(t)||s$1.set(t,v(t,m$1)),s$1.get(t);p="$length"===u;}a$1.has(c)||a$1.set(c,new Map);var h=a$1.get(c),y=p?u.replace(f$1,""):u;if(h.has(y)||"function"!=typeof(null==(g=i$1(t,y))?void 0:g.get)){var w=Reflect.get(t,y,c);if(p&&"function"==typeof w)return;if("symbol"==typeof y&&b$1.has(y))return w;h.has(y)||(k$1(w)&&(o$1.has(w)||o$1.set(w,v(w,d)),w=o$1.get(w)),h.set(y,d$2(w)));}else h.set(y,w$2(function(){return Reflect.get(t,y,c)}));return p?h.get(y):h.get(y).value}},d={get:w$1(false),set:function(e,n,s,u){var l;if("function"==typeof(null==(l=i$1(e,n))?void 0:l.set))return Reflect.set(e,n,s,u);a$1.has(u)||a$1.set(u,new Map);var g=a$1.get(u);if("$"===n[0]){s instanceof u$3||y();var p=n.replace(f$1,"");return g.set(p,s),Reflect.set(e,p,s.peek(),u)}var h=s;k$1(s)&&(o$1.has(s)||o$1.set(s,v(s,d)),h=o$1.get(s));var w=!(n in e),m=Reflect.set(e,n,s,u);return g.has(n)?g.get(n).value=h:g.set(n,d$2(h)),w&&c$1.has(e)&&c$1.get(e).value++,Array.isArray(e)&&g.has("length")&&(g.get("length").value=e.length),m},deleteProperty:function(e,t){"$"===t[0]&&y();var r=a$1.get(o$1.get(e)),n=Reflect.deleteProperty(e,t);return r&&r.has(t)&&(r.get(t).value=void 0),c$1.has(e)&&c$1.get(e).value++,n},ownKeys:function(e){return c$1.has(e)||c$1.set(e,d$2(0)),c$1._=c$1.get(e).value,Reflect.ownKeys(e)}},m$1={get:w$1(true),set:y,deleteProperty:y},b$1=new Set(Object.getOwnPropertyNames(Symbol).map(function(e){return Symbol[e]}).filter(function(e){return "symbol"==typeof e})),R$1=new Set([Object,Array]),k$1=function(e){return "object"==typeof e&&null!==e&&R$1.has(e.constructor)&&!u$2.has(e)};

const handleClientUrlParams = (userConfig) => {
    const config = Config.get();
    const clientUrlParams = config.clientUrlParams;
    Config.set("clientUrlParams.host", userConfig.host ?? config.clientUrlParams.host);
    Config.set("clientUrlParams.protocol", userConfig.protocol ?? clientUrlParams.protocol);
    Config.set("clientUrlParams.port", userConfig.port ?? clientUrlParams.port);
    if (userConfig.protocol !== undefined && userConfig.port === undefined) {
        switch (userConfig.protocol) {
            case "http": {
                Config.set("clientUrlParams.port", 80);
                break;
            }
            case "https": {
                Config.set("clientUrlParams.port", 443);
                break;
            }
        }
    }
    let host = config.clientUrlParams.host;
    // build url
    if (typeof host == "string" && host.endsWith("/")) {
        host = host.slice(0, -1);
        Config.set("clientUrlParams.host", host);
    }
    const url = `${clientUrlParams.protocol}://${config.clientUrlParams.host}:${clientUrlParams.port}`;
    Config.set("clientUrlParams.url", url);
};
// TODO: add documentation mentioning that you cannot pass stack sdk in the init data
const handleInitData = (initData) => {
    const config = Config.get();
    const stackSdk = initData.stackSdk || config.stackSdk;
    Config.set("enable", initData.enable ?? stackSdk.live_preview?.enable ?? config.enable);
    Config.set("ssr", stackSdk.live_preview?.ssr ??
        initData.ssr ??
        (typeof initData.stackSdk === "object" ? false : true) ??
        true);
    Config.set("runScriptsOnUpdate", initData.runScriptsOnUpdate ??
        stackSdk.live_preview?.runScriptsOnUpdate ??
        config.runScriptsOnUpdate);
    Config.set("stackSdk", initData.stackSdk ?? config.stackSdk);
    Config.set("cleanCslpOnProduction", initData.cleanCslpOnProduction ??
        stackSdk.live_preview?.cleanCslpOnProduction ??
        config.cleanCslpOnProduction);
    Config.set("editButton", {
        enable: initData.editButton?.enable ??
            stackSdk.live_preview?.editButton?.enable ??
            config.editButton.enable,
        // added extra check if exclude data passed by user is array or not
        exclude: Array.isArray(initData.editButton?.exclude) &&
            initData.editButton?.exclude
            ? initData.editButton?.exclude
            : Array.isArray(stackSdk.live_preview?.exclude) &&
                stackSdk.live_preview?.exclude
                ? stackSdk.live_preview?.exclude
                : (config.editButton.exclude ?? []),
        position: initData.editButton?.position ??
            stackSdk.live_preview?.position ??
            config.editButton.position ??
            "top",
        includeByQueryParameter: initData.editButton?.includeByQueryParameter ??
            stackSdk.live_preview?.includeByQueryParameter ??
            config.editButton.includeByQueryParameter ??
            true,
    });
    Config.set("editInVisualBuilderButton", {
        enable: initData.editInVisualBuilderButton?.enable ??
            stackSdk.live_preview?.editInVisualBuilderButton?.enable ??
            config.editInVisualBuilderButton.enable,
        position: initData.editInVisualBuilderButton?.position ??
            stackSdk.live_preview?.position ??
            config.editInVisualBuilderButton.position ??
            "bottom-right",
    });
    // client URL params
    handleClientUrlParams(initData.clientUrlParams ??
        stackSdk.live_preview?.clientUrlParams ??
        config.clientUrlParams);
    if (initData.mode) {
        switch (initData.mode) {
            case "preview": {
                Config.set("mode", ILivePreviewModeConfig.PREVIEW);
                break;
            }
            case "builder": {
                Config.set("mode", ILivePreviewModeConfig.BUILDER);
                break;
            }
            default: {
                throw new TypeError("Live Preview SDK: The mode must be either 'builder' or 'preview'");
            }
        }
    }
    Config.set("debug", initData.debug ?? stackSdk.live_preview?.debug ?? config.debug);
    handleStackDetails(initData, stackSdk);
};
function handleStackDetails(initData, stackSdk) {
    const config = Config.get();
    Config.set("stackDetails.apiKey", initData.stackDetails?.apiKey ?? config.stackDetails.apiKey);
    Config.set("stackDetails.environment", initData.stackDetails?.environment ??
        stackSdk.environment ??
        config.stackDetails.environment);
    Config.set("stackDetails.branch", initData.stackDetails?.branch ??
        stackSdk.branch ??
        stackSdk.headers?.branch ??
        config.stackDetails.branch);
    Config.set("stackDetails.locale", initData.stackDetails?.locale ?? config.stackDetails.locale);
    if (config.mode >= ILivePreviewModeConfig.BUILDER) {
        if (!config.stackDetails.environment) {
            throw Error("Live preview SDK: environment is required");
        }
        if (!config.stackDetails.apiKey) {
            throw Error("Live preview SDK: api key is required");
        }
    }
}

class Config {
    static replace(userInput = getUserInitData()) {
        handleInitData(userInput);
    }
    static set(key, value) {
        if (!has(this.config.state, key)) {
            throw new Error(`Invalid key: ${key}`);
        }
        set(this.config.state, key, value);
    }
    static get() {
        return this.config.state;
    }
    static reset() {
        set(this.config, "state", getDefaultConfig());
    }
}
Config.config = {
    state: g$1(getDefaultConfig()),
};
/**
 * Updates the configuration from the URL parameters.
 * It will receive live_preview containing the hash, content_type_uid and entry_uid.
 */
function updateConfigFromUrl() {
    const searchParams = new URLSearchParams(window.location.search);
    setConfigFromParams(searchParams.toString());
}
/**
 * Sets the live preview hash, content_type_uid and entry_uid
 * from the query param to config.
 *
 * @param params query param in an object form, query string.
 *
 * @example
 * ```js
 * setConfigFromParams({
 *      live_preview: "hash",
 *      content_type_uid: "content_type_uid",
 *      entry_uid: "entry_uid",
 * });
 * ```
 *
 * @example
 * ```js
 * setConfigFromParams("?live_preview=hash&content_type_uid=content_type_uid&entry_uid=entry_uid");
 * ```
 * Basically anything that can be passed to `URLSearchParams` constructor.
 */
function setConfigFromParams(params = {}) {
    const urlParams = new URLSearchParams(params);
    const live_preview = urlParams.get("live_preview");
    const content_type_uid = urlParams.get("content_type_uid");
    const entry_uid = urlParams.get("entry_uid");
    const stackSdkLivePreview = Config.get().stackSdk.live_preview;
    if (live_preview) {
        Config.set("hash", live_preview);
        stackSdkLivePreview.hash = live_preview;
        stackSdkLivePreview.live_preview = live_preview;
    }
    if (content_type_uid) {
        Config.set("stackDetails.contentTypeUid", content_type_uid);
        stackSdkLivePreview.content_type_uid = content_type_uid;
    }
    if (entry_uid) {
        Config.set("stackDetails.entryUid", entry_uid);
        stackSdkLivePreview.entry_uid = entry_uid;
    }
    Config.set("stackSdk.live_preview", stackSdkLivePreview);
}

class PublicLogger {
    static logEvent(logCallback, message) {
        if (typeof process !== "undefined" &&
            process?.env?.NODE_ENV !== "test") {
            logCallback("Live_Preview_SDK:", ...message);
        }
    }
    static error(...data) {
        this.logEvent(console.error, data);
    }
    static warn(...data) {
        this.logEvent(console.warn, data);
    }
    static debug(...data) {
        this.logEvent(console.debug, data);
    }
}

function addLivePreviewQueryTags(link) {
    try {
        const docUrl = new URL(document.location.href);
        const newUrl = new URL(link);
        const livePreviewHash = docUrl.searchParams.get("live_preview");
        const ctUid = docUrl.searchParams.get("content_type_uid");
        const entryUid = docUrl.searchParams.get("entry_uid");
        const previewTimestamp = docUrl.searchParams.get("preview_timestamp");
        if (livePreviewHash) {
            newUrl.searchParams.set("live_preview", livePreviewHash);
        }
        if (ctUid && entryUid) {
            newUrl.searchParams.set("content_type_uid", ctUid);
            newUrl.searchParams.set("entry_uid", entryUid);
        }
        if (previewTimestamp) {
            newUrl.searchParams.set("preview_timestamp", previewTimestamp);
        }
        return newUrl.href;
    }
    catch (error) {
        PublicLogger.error("Error while adding live preview to URL");
        return link;
    }
}

function hasWindow$1() {
    return typeof window !== "undefined";
}
function addParamsToUrl() {
    // Setting the query params to all the click events related to current domain
    window.addEventListener("click", (event) => {
        const clickedElement = event.target;
        const anchorElement = clickedElement.closest('a');
        // Only proceed if the clicked element is either an anchor or a direct/indirect child of an anchor
        if (!anchorElement || !anchorElement.contains(clickedElement)) {
            return;
        }
        const targetHref = anchorElement.href;
        const docOrigin = document.location.origin;
        if (targetHref &&
            targetHref.includes(docOrigin) &&
            !targetHref.includes("live_preview")) {
            const newUrl = addLivePreviewQueryTags(targetHref);
            anchorElement.href = newUrl || targetHref;
        }
    });
}
function isOpeningInTimeline() {
    if (hasWindow$1()) {
        const urlParams = new URLSearchParams(window.location.search);
        const previewTimestamp = urlParams.get("preview_timestamp");
        return !!previewTimestamp;
    }
    return false;
}
function isOpenInBuilder() {
    if (hasWindow$1()) {
        const urlParams = new URLSearchParams(window.location.search);
        const builder = urlParams.get("builder");
        return !!builder;
    }
    return false;
}

function inIframe() {
    try {
        return window.self !== window.top;
    }
    catch (e) {
        return true;
    }
}
function isOpeningInNewTab() {
    try {
        if (hasWindow$1()) {
            return !!window.opener;
        }
        return false;
    }
    catch (e) {
        return false;
    }
}

let e$1={data:""},t=t=>"object"==typeof window?((t?t.querySelector("#_goober"):window._goober)||Object.assign((t||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:t||e$1,l=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,a=/\/\*[^]*?\*\/|  +/g,n$1=/\n+/g,o=(e,t)=>{let r="",l="",a="";for(let n in e){let c=e[n];"@"==n[0]?"i"==n[1]?r=n+" "+c+";":l+="f"==n[1]?o(c,n):n+"{"+o(c,"k"==n[1]?"":t)+"}":"object"==typeof c?l+=o(c,t?t.replace(/([^,])+/g,e=>n.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):n):null!=c&&(n=/^--/.test(n)?n:n.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=o.p?o.p(n,c):n+":"+c+";");}return r+(t&&a?t+"{"+a+"}":a)+l},c={},s=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+s(e[r]);return t}return e},i=(e,t,r,i,p)=>{let u=s(e),d=c[u]||(c[u]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return "go"+r})(u));if(!c[d]){let t=u!==e?e:(e=>{let t,r,o=[{}];for(;t=l.exec(e.replace(a,""));)t[4]?o.shift():t[3]?(r=t[3].replace(n$1," ").trim(),o.unshift(o[0][r]=o[0][r]||{})):o[0][t[1]]=t[2].replace(n$1," ").trim();return o[0]})(e);c[d]=o(p?{["@keyframes "+d]:t}:t,r?"":"."+d);}let f=r&&c.g?c.g:null;return r&&(c.g=c[d]),((e,t,r,l)=>{l?t.data=t.data.replace(l,e):-1===t.data.indexOf(e)&&(t.data=r?e+t.data:t.data+e);})(c[d],t,i,f),d},p=(e,t,r)=>e.reduce((e,l,a)=>{let n=t[a];if(n&&n.call){let e=n(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;n=t?"."+t:e&&"object"==typeof e?e.props?"":o(e,""):false===e?"":e;}return e+l+(null==n?"":n)},"");function u$1(e){let r=this||{},l=e.call?e(r.p):e;return i(l.unshift?l.raw?p(l,[].slice.call(arguments,1),r.p):l.reduce((e,t)=>Object.assign(e,t&&t.call?t(r.p):t),{}):l,t(r.target),r.g,r.o,r.k)}let b=u$1.bind({g:1}),h=u$1.bind({k:1});function m(e,t,r,l){o.p=t;}

function cslpTagStyles() {
    return {
        "cslp-edit-mode": u$1 `
            outline: 1px dashed #6c5ce7 !important;
        `,
        "cslp-tooltip": u$1 `
            padding: 0;
            display: flex;
            outline: none;
            border: none;
            z-index: 200 !important;
            position: fixed;
            margin: 0;
            height: 35px;
            width: 72px;
            background: white;
            font-weight: 400 !important;
            color: #718096 !important;
            transition: background 0.2s;
            text-align: center !important;
            border-radius: 8px !important;
            font-size: 14px !important;
            justify-content: space-around;
            align-items: center;
            box-shadow: 0px 8px 20px 0px #2222221a;
            box-sizing: border-box;
            top: -100%;
            & div {
                display: flex;
                justify-content: space-around;
                border-radius: 6px !important;
                cursor: pointer;
            }

            & div.cslp-tooltip-child:hover {
                background: #edf2f7;
            }

            & div.cslp-tooltip-child:active:hover {
                background: #c7d0e1;
            }

            & > div {
                display: flex;
                justify-content: space-evenly;
                white-space: nowrap;
                width: 70px;
            }

            & .cslp-tooltip-child.singular {
                padding: 9px 1px;
            }
        `,
        multiple: u$1 `
            & div.cslp-tooltip-child {
                padding: 9px;
            }

            & div.cslp-tooltip-child:before {
                opacity: 0;
                font-size: 12px;
                font-weight: 400;
                pointer-events: none;
                content: attr(data-title);
                color: white;
                padding: 5px 10px;
                border-radius: 4px;
                position: absolute;
                background: #4a5568;
                top: -30px;
                transition: 0.2s all ease-in-out;
            }

            & div.cslp-tooltip-child:hover:before {
                opacity: 1;
            }
        `,
    };
}

/**
 * Extracts details from a CSLP value string.
 * @param cslpValue The CSLP value string to extract details from.
 * @returns An object containing the extracted details.
 */
function extractDetailsFromCslp(cslpValue) {
    let [cslpVersion, cslpData] = cslpValue.split(":");
    // If the cslpVersion is greater than 2 letter which means it is v1 version of cslp data
    if (cslpVersion.length > 2) {
        cslpData = cslpVersion;
        cslpVersion = "v1";
    }
    const [content_type_uid, entryInfo, locale, ...fieldPath] = cslpData.split(".");
    let entry_uid;
    let variant;
    switch (cslpVersion) {
        case "v2": {
            const [uid, variant_uid] = entryInfo.split("_");
            entry_uid = uid;
            variant = variant_uid;
            break;
        }
        default: {
            entry_uid = entryInfo;
            break;
        }
    }
    const instancePathWithInstance = fieldPath.join(".");
    const calculatedPath = fieldPath.filter((path) => {
        const isEmpty = isNil(path);
        const isNumber = isFinite(+path);
        return (!isEmpty && !isNumber) || false;
    });
    const multipleFieldMetadata = getMultipleFieldMetadata(content_type_uid, entry_uid, locale, fieldPath);
    /**
     * The index in the end of the field does not represent a field.
     * It represents the index of the field in the multiple field.
     * Hence, we pop it out.
     */
    if (isFinite(+fieldPath[fieldPath.length - 1])) {
        fieldPath.pop();
    }
    return {
        entry_uid,
        content_type_uid,
        variant,
        locale,
        cslpValue: cslpValue,
        fieldPath: calculatedPath.join("."),
        fieldPathWithIndex: fieldPath.join("."),
        multipleFieldMetadata: multipleFieldMetadata,
        instance: {
            fieldPathWithIndex: instancePathWithInstance,
        },
    };
}
/**
 * Returns the parent path details of a given field path in CSLP format.
 * @param content_type_uid - The UID of the content type.
 * @param entry_uid - The UID of the entry.
 * @param locale - The locale of the entry.
 * @param fieldPath - The field path to get the parent path details for.
 * @returns The parent path details in CSLP format, or null if the field path does not have a parent.
 */
function getParentPathDetails(content_type_uid, entry_uid, locale, fieldPath) {
    const index = findLastIndex(fieldPath, (path) => isFinite(+path));
    if (index === -1)
        return null;
    const parentPath = fieldPath.slice(0, index);
    return {
        parentPath: parentPath.join("."),
        parentCslpValue: [
            content_type_uid,
            entry_uid,
            locale,
            ...parentPath,
        ].join("."),
    };
}
/**
 * Returns metadata for a multiple field in a content entry.
 * @summary ONLY USE THESE RETURNED VALUES WHEN FIELD IS MULTIPLE
 * @summary IT GIVES WRONG DATA IF FIELD IS NOT MULTIPLE
 * @param content_type_uid - The UID of the content type.
 * @param entry_uid - The UID of the content entry.
 * @param locale - The locale of the content entry.
 * @param fieldPath - The path of the multiple field.
 * @returns The metadata for the multiple field.
 */
function getMultipleFieldMetadata(content_type_uid, entry_uid, locale, fieldPath) {
    const parentDetails = getParentPathDetails(content_type_uid, entry_uid, locale, fieldPath);
    const index = findLast(fieldPath, (path) => isFinite(+path));
    return {
        parentDetails: parentDetails,
        index: isNil(index) ? -1 : +index,
    };
}
//TODO: move this to editbutton
/**
 * Adds an outline to the clicked element and triggers a callback function.
 * @param e - The MouseEvent object representing the click event.
 * @param callback - An optional callback function that will be called with the CSLP tag and highlighted element as arguments.
 */
function addCslpOutline(e, callback) {
    const elements = Config.get().elements;
    let trigger = true;
    const eventTargets = e.composedPath();
    for (const eventTarget of eventTargets) {
        const element = eventTarget;
        if (element.nodeName === "BODY")
            break;
        if (typeof element?.getAttribute !== "function")
            continue;
        const cslpTag = element.getAttribute("data-cslp");
        if (trigger && cslpTag) {
            if (elements.highlightedElement)
                elements.highlightedElement.classList.remove(cslpTagStyles()["cslp-edit-mode"]);
            element.classList.add(cslpTagStyles()["cslp-edit-mode"]);
            const updatedElements = elements;
            updatedElements.highlightedElement =
                element;
            Config.set("elements", updatedElements);
            callback?.({
                cslpTag: cslpTag,
                highlightedElement: element,
            });
            trigger = false;
        }
        else if (!trigger) {
            element.classList.remove(cslpTagStyles()["cslp-edit-mode"]);
        }
    }
}

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var dist$1 = {exports: {}};

var dist = dist$1.exports;

var hasRequiredDist;

function requireDist () {
	if (hasRequiredDist) return dist$1.exports;
	hasRequiredDist = 1;
	(function (module, exports) {
		!function(e,t){module.exports=t();}(dist,(()=>{return e={706:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:true}),t.Config=void 0;var n=r(450),o=r(666),i=r(628),s=function(){function e(){this.config=(0, o.getDefaultConfig)();}return e.prototype.replace=function(e){!function(e,t){var r,o,s,u;if(t.debug=null!==(r=e.debug)&&void 0!==r?r:t.debug,""===e.channelId)throw new Error((0, i.getErrorMessage)(n.ERROR_MESSAGES.common.channelIdRequired));t.channelId=null!==(o=e.channelId)&&void 0!==o?o:t.channelId,t.suppressErrors=null!==(s=e.suppressErrors)&&void 0!==s?s:t.suppressErrors,t.targetOrigin=null!==(u=e.targetOrigin)&&void 0!==u?u:t.targetOrigin,e.target?t.targetWindow=e.target:window?t.targetWindow=window:t.targetWindow={postMessage:function(){}};}(e,this.config);},e.prototype.set=function(e,t){this.config[e]=t;},e.prototype.get=function(e){return this.config[e]},e.prototype.getAll=function(){return this.config},e.prototype.reset=function(){this.config=(0, o.getDefaultConfig)();},e}();t.Config=s;},851:(e,t)=>{Object.defineProperty(t,"__esModule",{value:true}),t.ERROR_CODES=t.ERROR_MESSAGES=void 0,t.ERROR_MESSAGES={common:{windowClosed:"The window closed before the response was received",windowNotFound:"The window was not found.",channelIdRequired:"The channelId is required"},sendEvent:{receiverReturnedError:"The receiver returned an error",eventCancelled:"The event was cancelled",noAckReceived:"The ACK was not received"},receiveEvent:{noRequestListenerFound:function(e){return 'No request listener found for event "'.concat(e,'"')},codeReturnedError:"The code returned an error",noResponseListenerFound:function(e){return 'No response listener found for hash "'.concat(e,'"')},noAckListenerFound:function(e){return 'No ack listener found for hash "'.concat(e,'"')},unknownNature:function(e){return 'The nature "'.concat(e,'" is unknown')}},registerEvent:{eventAlreadyRegistered:function(e){return 'The event "'.concat(e,'" is already registered')}},unregisterEvent:{eventDoesNotExist:function(e){return 'The event "'.concat(e,'" does not exist')}}},t.ERROR_CODES={common:{windowClosed:"WINDOW_CLOSED",windowNotFound:"WINDOW_NOT_FOUND"},sendEvent:{receiverReturnedError:"RECEIVER_RETURNED_ERROR",eventCancelled:"EVENT_CANCELLED",noAckReceived:"NO_ACK_RECEIVED"},receiveEvent:{noRequestListenerFound:"NO_REQUEST_LISTENER_FOUND",codeReturnedError:"CODE_RETURNED_ERROR",noResponseListenerFound:"NO_RESPONSE_LISTENER_FOUND",noAckListenerFound:"NO_ACK_LISTENER_FOUND",unknownNature:"UNKNOWN_NATURE"},registerEvent:{eventAlreadyRegistered:"EVENT_ALREADY_REGISTERED"},unregisterEvent:{eventDoesNotExist:"EVENT_DOES_NOT_EXIST"}};},450:function(e,t,r){var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){ void 0===n&&(n=r);var o=Object.getOwnPropertyDescriptor(t,r);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:true,get:function(){return t[r]}}),Object.defineProperty(e,n,o);}:function(e,t,r,n){ void 0===n&&(n=r),e[n]=t[r];}),o=this&&this.__exportStar||function(e,t){for(var r in e)"default"===r||Object.prototype.hasOwnProperty.call(t,r)||n(t,e,r);};Object.defineProperty(t,"__esModule",{value:true}),t.EVENT_MANAGER_NAME=t.ANY_ORIGIN=t.RESPONSE_CYCLE=void 0,t.RESPONSE_CYCLE=500,t.ANY_ORIGIN="*",t.EVENT_MANAGER_NAME="contentstack-adv-post-message",o(r(851),t);},666:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:true}),t.getDefaultConfig=void 0;var n=r(450);t.getDefaultConfig=function(){return {targetOrigin:n.ANY_ORIGIN,targetWindow:{postMessage:function(){}},debug:false,channelId:"",suppressErrors:false}};},156:function(e,t,r){var n=this&&this.__assign||function(){return n=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},n.apply(this,arguments)},o=this&&this.__createBinding||(Object.create?function(e,t,r,n){ void 0===n&&(n=r);var o=Object.getOwnPropertyDescriptor(t,r);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:true,get:function(){return t[r]}}),Object.defineProperty(e,n,o);}:function(e,t,r,n){ void 0===n&&(n=r),e[n]=t[r];}),i=this&&this.__exportStar||function(e,t){for(var r in e)"default"===r||Object.prototype.hasOwnProperty.call(t,r)||o(t,e,r);},s=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(o,i){function s(e){try{a(n.next(e));}catch(e){i(e);}}function u(e){try{a(n.throw(e));}catch(e){i(e);}}function a(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t);}))).then(s,u);}a((n=n.apply(e,t||[])).next());}))},u=this&&this.__generator||function(e,t){var r,n,o,i,s={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function u(u){return function(a){return function(u){if(r)throw new TypeError("Generator is already executing.");for(;i&&(i=0,u[0]&&(s=0)),s;)try{if(r=1,n&&(o=2&u[0]?n.return:u[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,u[1])).done)return o;switch(n=0,o&&(u=[2&u[0],o.value]),u[0]){case 0:case 1:o=u;break;case 4:return s.label++,{value:u[1],done:!1};case 5:s.label++,n=u[1],u=[0];continue;case 7:u=s.ops.pop(),s.trys.pop();continue;default:if(!((o=(o=s.trys).length>0&&o[o.length-1])||6!==u[0]&&2!==u[0])){s=0;continue}if(3===u[0]&&(!o||u[1]>o[0]&&u[1]<o[3])){s.label=u[1];break}if(6===u[0]&&s.label<o[1]){s.label=o[1],o=u;break}if(o&&s.label<o[2]){s.label=o[2],s.ops.push(u);break}o[2]&&s.ops.pop(),s.trys.pop();continue}u=t.call(e,s);}catch(e){u=[6,e],n=0;}finally{r=o=0;}if(5&u[0])throw u[1];return {value:u[0]?u[1]:void 0,done:true}}([u,a])}}};Object.defineProperty(t,"__esModule",{value:true}),t.EventManager=void 0;var a=r(834),c=r(706),d=r(450),l=r(897),f=r(628),h=r(768),g=r(610),p=r(574),v=function(){function e(e,t){if(void 0===t&&(t={}),this.requestMessageHandlers=new Map,this.responseMessageHandlers=new Map,!e)throw new Error((0, f.getErrorMessage)(d.ERROR_MESSAGES.common.channelIdRequired));this.config=new c.Config,this.config.replace(n(n({},t),{channelId:e})),this.logger=new f.Logger(this.config),this.postMessage=new l.PostMessage(this.logger,this.config),this.handleIncomingMessage=this.handleIncomingMessage.bind(this),this.send=this.send.bind(this),this.on=this.on.bind(this),this.unregisterEvent=this.unregisterEvent.bind(this),window?window.addEventListener("message",this.handleIncomingMessage):this.logger.debug((0, f.getErrorMessage)(d.ERROR_MESSAGES.common.windowNotFound));}return e.prototype.handleIncomingMessage=function(e){return s(this,void 0,void 0,(function(){var t,r,n,o,i,s,c,l,h,g,v,E,y=this;return u(this,(function(u){if(t=e.data,r=t.type,n=t.channel,o=t.payload,i=t.eventManager,s=t.metadata,c=t.error,i!==d.EVENT_MANAGER_NAME||n!==this.config.get("channelId"))return [2];switch(l=s.hash,h=s.nature){case p.EditorPostMessageNature.REQUEST:return this.logger.debug("REQUEST received",e.data),this.config.get("targetWindow").closed&&this.logger.error((0, f.getErrorMessage)(d.ERROR_MESSAGES.common.windowClosed)),this.postMessage.sendAck({type:r,hash:l}),this.requestMessageHandlers.has(r)?(g=this.requestMessageHandlers.get(r).handler,v={data:o},[2,a.ZalgoPromise.all([a.ZalgoPromise.try((function(){return g(v)})).then((function(e){y.postMessage.sendResponse({type:r,hash:l,payload:e,error:void 0});})).catch((function(e){y.logger.error((0, f.getErrorMessage)(d.ERROR_MESSAGES.receiveEvent.codeReturnedError),e);}))])]):(this.logger.debug((0, f.getErrorMessage)(d.ERROR_MESSAGES.receiveEvent.noRequestListenerFound(r))),this.postMessage.sendResponse({type:r,hash:l,payload:void 0,error:{code:d.ERROR_CODES.receiveEvent.noRequestListenerFound,message:(0, f.getErrorMessage)(d.ERROR_MESSAGES.receiveEvent.noRequestListenerFound(r))}}),[2]);case p.EditorPostMessageNature.RESPONSE:if(this.logger.debug("RESPONSE received",e.data),!this.responseMessageHandlers.has(l))return this.logger.error((0, f.getErrorMessage)(d.ERROR_MESSAGES.receiveEvent.noResponseListenerFound(l))),[2];E=this.responseMessageHandlers.get(l),c?E.promise.reject(c):E.promise.resolve(o);break;case p.EditorPostMessageNature.ACK:if(this.logger.debug("ACK received",e.data),!this.responseMessageHandlers.has(l))return this.logger.error((0, f.getErrorMessage)(d.ERROR_MESSAGES.receiveEvent.noAckListenerFound(l))),[2];(E=this.responseMessageHandlers.get(l)).hasReceivedAck=true;break;default:this.logger.error((0, f.getErrorMessage)(d.ERROR_MESSAGES.receiveEvent.unknownNature(h)),e.data);}return [2]}))}))},e.prototype.send=function(e,t){return s(this,void 0,void 0,(function(){var r,n,o,i,s,c=this;return u(this,(function(u){return r=new a.ZalgoPromise,n=(0, g.uniqueId)(e),o={type:e,promise:r,hasCancelled:false,hasReceivedAck:false},this.responseMessageHandlers.set(n,o),i=1e3,s=(0, h.safeInterval)((function(){return c.config.get("targetWindow").closed?r.reject(new Error((0, f.getErrorMessage)(d.ERROR_MESSAGES.common.windowClosed))):(i=Math.max(i-d.RESPONSE_CYCLE,0),!o.hasReceivedAck&&i<=0?r.reject((0, f.getErrorMessage)(d.ERROR_MESSAGES.sendEvent.noAckReceived)):void 0)}),d.RESPONSE_CYCLE),r.finally((function(){c.responseMessageHandlers.delete(n),s.cancel();})).catch((function(e){c.logger.debug((0, f.getErrorMessage)(d.ERROR_MESSAGES.sendEvent.receiverReturnedError),e);})),this.postMessage.sendRequest({type:e,hash:n,error:void 0,payload:t}),[2,r]}))}))},e.prototype.on=function(e,t){var r=this;this.requestMessageHandlers.has(e)&&this.logger.error((0, f.getErrorMessage)(d.ERROR_MESSAGES.registerEvent.eventAlreadyRegistered(e)));var n={handler:t};return this.requestMessageHandlers.set(e,n),{unregister:function(){r.unregisterEvent(e);}}},e.prototype.unregisterEvent=function(e){this.requestMessageHandlers.has(e)?(this.logger.debug("Unregistering event",e),this.requestMessageHandlers.delete(e)):this.logger.error((0, f.getErrorMessage)(d.ERROR_MESSAGES.unregisterEvent.eventDoesNotExist(e)));},e.prototype.updateConfig=function(e){this.config.replace(e);},e.prototype.destroy=function(e){this.requestMessageHandlers.clear(),this.responseMessageHandlers.clear(),(null==e?void 0:e.soft)||window.removeEventListener("message",this.handleIncomingMessage);},e}();t.EventManager=v,i(r(574),t);},897:function(e,t,r){var n=this&&this.__assign||function(){return n=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},n.apply(this,arguments)};Object.defineProperty(t,"__esModule",{value:true}),t.PostMessage=void 0;var o=r(574),i=function(){function e(e,t){this.logger=e,this.sendResponse=this.sendResponse.bind(this),this.sendRequest=this.sendRequest.bind(this),this.sendAck=this.sendAck.bind(this),this.getMessage=this.getMessage.bind(this),this.config=t.getAll();}return e.prototype.sendRequest=function(e){var t=n(n({},e),{nature:o.EditorPostMessageNature.REQUEST});this.logger.debug("Sending REQUEST",t);var r=this.getMessage(t);this.config.targetWindow.postMessage(r,this.config.targetOrigin);},e.prototype.sendResponse=function(e){var t=n(n({},e),{nature:o.EditorPostMessageNature.RESPONSE});this.logger.debug("Sending RESPONSE",t);var r=this.getMessage(t);this.config.targetWindow.postMessage(r,this.config.targetOrigin);},e.prototype.sendAck=function(e){var t=n(n({},e),{payload:void 0,error:void 0,nature:o.EditorPostMessageNature.ACK});this.logger.debug("Sending ACK",t);var r=this.getMessage(t);this.config.targetWindow.postMessage(r,this.config.targetOrigin);},e.prototype.getMessage=function(e){var t=e.nature,r=e.hash,n=e.payload,o=e.type,i=e.error;return {eventManager:"contentstack-adv-post-message",metadata:{hash:r,nature:t},channel:this.config.channelId,error:i,payload:n,type:o}},e}();t.PostMessage=i;},255:(e,t)=>{Object.defineProperty(t,"__esModule",{value:true});},884:(e,t)=>{Object.defineProperty(t,"__esModule",{value:true});},574:function(e,t,r){var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){ void 0===n&&(n=r);var o=Object.getOwnPropertyDescriptor(t,r);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:true,get:function(){return t[r]}}),Object.defineProperty(e,n,o);}:function(e,t,r,n){ void 0===n&&(n=r),e[n]=t[r];}),o=this&&this.__exportStar||function(e,t){for(var r in e)"default"===r||Object.prototype.hasOwnProperty.call(t,r)||n(t,e,r);};Object.defineProperty(t,"__esModule",{value:true}),o(r(884),t),o(r(145),t),o(r(255),t);},145:(e,t)=>{var r;Object.defineProperty(t,"__esModule",{value:true}),t.EditorPostMessageNature=void 0,function(e){e.ACK="ACK",e.RESPONSE="RESPONSE",e.REQUEST="REQUEST";}(r||(t.EditorPostMessageNature=r={}));},628:function(e,t,r){var n=this&&this.__spreadArray||function(e,t,r){if(r||2===arguments.length)for(var n,o=0,i=t.length;o<i;o++)!n&&o in t||(n||(n=Array.prototype.slice.call(t,0,o)),n[o]=t[o]);return e.concat(n||Array.prototype.slice.call(t))};Object.defineProperty(t,"__esModule",{value:true}),t.getErrorMessage=t.Logger=void 0;var o=r(450),i=function(){function e(e){this.config=e,this.prefix=o.EVENT_MANAGER_NAME,this.log=this.log.bind(this),this.info=this.info.bind(this),this.debug=this.debug.bind(this),this.error=this.error.bind(this);}return e.prototype.log=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];console.log.apply(console,n([this.prefix],e,false));},e.prototype.info=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];console.info.apply(console,n([this.prefix],e,false));},e.prototype.debug=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this.config.get("debug")&&console.debug.apply(console,n(n([this.prefix,"DEBUG:"],e,false),[this.getDebugOptions()],false));},e.prototype.error=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this.config.get("suppressErrors")||console.error.apply(console,n([this.prefix],e,false));},e.prototype.getDebugOptions=function(){return {targetOrigin:this.config.get("targetOrigin"),targetWindow:this.config.get("targetWindow")}},e}();t.Logger=i,t.getErrorMessage=function(e){return o.EVENT_MANAGER_NAME+": "+e};},768:(e,t)=>{Object.defineProperty(t,"__esModule",{value:true}),t.safeInterval=void 0,t.safeInterval=function(e,t){var r;return function n(){r=setTimeout((function(){e(),n();}),t);}(),{cancel:function(){clearTimeout(r);}}};},610:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:true}),t.uniqueId=void 0;var n=r(831);t.uniqueId=function(e){var t=(0, n.v4)().split("-")[0];return e?"".concat(e,"-").concat(t):t};},831:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:true}),Object.defineProperty(t,"NIL",{enumerable:true,get:function(){return u.default}}),Object.defineProperty(t,"parse",{enumerable:true,get:function(){return l.default}}),Object.defineProperty(t,"stringify",{enumerable:true,get:function(){return d.default}}),Object.defineProperty(t,"v1",{enumerable:true,get:function(){return n.default}}),Object.defineProperty(t,"v3",{enumerable:true,get:function(){return o.default}}),Object.defineProperty(t,"v4",{enumerable:true,get:function(){return i.default}}),Object.defineProperty(t,"v5",{enumerable:true,get:function(){return s.default}}),Object.defineProperty(t,"validate",{enumerable:true,get:function(){return c.default}}),Object.defineProperty(t,"version",{enumerable:true,get:function(){return a.default}});var n=f(r(518)),o=f(r(948)),i=f(r(73)),s=f(r(186)),u=f(r(808)),a=f(r(775)),c=f(r(37)),d=f(r(910)),l=f(r(792));function f(e){return e&&e.__esModule?e:{default:e}}},311:(e,t)=>{function r(e){return 14+(e+64>>>9<<4)+1}function n(e,t){const r=(65535&e)+(65535&t);return (e>>16)+(t>>16)+(r>>16)<<16|65535&r}function o(e,t,r,o,i,s){return n((u=n(n(t,e),n(o,s)))<<(a=i)|u>>>32-a,r);var u,a;}function i(e,t,r,n,i,s,u){return o(t&r|~t&n,e,t,i,s,u)}function s(e,t,r,n,i,s,u){return o(t&n|r&~n,e,t,i,s,u)}function u(e,t,r,n,i,s,u){return o(t^r^n,e,t,i,s,u)}function a(e,t,r,n,i,s,u){return o(r^(t|~n),e,t,i,s,u)}Object.defineProperty(t,"__esModule",{value:true}),t.default=void 0;t.default=function(e){if("string"==typeof e){const t=unescape(encodeURIComponent(e));e=new Uint8Array(t.length);for(let r=0;r<t.length;++r)e[r]=t.charCodeAt(r);}return function(e){const t=[],r=32*e.length,n="0123456789abcdef";for(let o=0;o<r;o+=8){const r=e[o>>5]>>>o%32&255,i=parseInt(n.charAt(r>>>4&15)+n.charAt(15&r),16);t.push(i);}return t}(function(e,t){e[t>>5]|=128<<t%32,e[r(t)-1]=t;let o=1732584193,c=-271733879,d=-1732584194,l=271733878;for(let t=0;t<e.length;t+=16){const r=o,f=c,h=d,g=l;o=i(o,c,d,l,e[t],7,-680876936),l=i(l,o,c,d,e[t+1],12,-389564586),d=i(d,l,o,c,e[t+2],17,606105819),c=i(c,d,l,o,e[t+3],22,-1044525330),o=i(o,c,d,l,e[t+4],7,-176418897),l=i(l,o,c,d,e[t+5],12,1200080426),d=i(d,l,o,c,e[t+6],17,-1473231341),c=i(c,d,l,o,e[t+7],22,-45705983),o=i(o,c,d,l,e[t+8],7,1770035416),l=i(l,o,c,d,e[t+9],12,-1958414417),d=i(d,l,o,c,e[t+10],17,-42063),c=i(c,d,l,o,e[t+11],22,-1990404162),o=i(o,c,d,l,e[t+12],7,1804603682),l=i(l,o,c,d,e[t+13],12,-40341101),d=i(d,l,o,c,e[t+14],17,-1502002290),c=i(c,d,l,o,e[t+15],22,1236535329),o=s(o,c,d,l,e[t+1],5,-165796510),l=s(l,o,c,d,e[t+6],9,-1069501632),d=s(d,l,o,c,e[t+11],14,643717713),c=s(c,d,l,o,e[t],20,-373897302),o=s(o,c,d,l,e[t+5],5,-701558691),l=s(l,o,c,d,e[t+10],9,38016083),d=s(d,l,o,c,e[t+15],14,-660478335),c=s(c,d,l,o,e[t+4],20,-405537848),o=s(o,c,d,l,e[t+9],5,568446438),l=s(l,o,c,d,e[t+14],9,-1019803690),d=s(d,l,o,c,e[t+3],14,-187363961),c=s(c,d,l,o,e[t+8],20,1163531501),o=s(o,c,d,l,e[t+13],5,-1444681467),l=s(l,o,c,d,e[t+2],9,-51403784),d=s(d,l,o,c,e[t+7],14,1735328473),c=s(c,d,l,o,e[t+12],20,-1926607734),o=u(o,c,d,l,e[t+5],4,-378558),l=u(l,o,c,d,e[t+8],11,-2022574463),d=u(d,l,o,c,e[t+11],16,1839030562),c=u(c,d,l,o,e[t+14],23,-35309556),o=u(o,c,d,l,e[t+1],4,-1530992060),l=u(l,o,c,d,e[t+4],11,1272893353),d=u(d,l,o,c,e[t+7],16,-155497632),c=u(c,d,l,o,e[t+10],23,-1094730640),o=u(o,c,d,l,e[t+13],4,681279174),l=u(l,o,c,d,e[t],11,-358537222),d=u(d,l,o,c,e[t+3],16,-722521979),c=u(c,d,l,o,e[t+6],23,76029189),o=u(o,c,d,l,e[t+9],4,-640364487),l=u(l,o,c,d,e[t+12],11,-421815835),d=u(d,l,o,c,e[t+15],16,530742520),c=u(c,d,l,o,e[t+2],23,-995338651),o=a(o,c,d,l,e[t],6,-198630844),l=a(l,o,c,d,e[t+7],10,1126891415),d=a(d,l,o,c,e[t+14],15,-1416354905),c=a(c,d,l,o,e[t+5],21,-57434055),o=a(o,c,d,l,e[t+12],6,1700485571),l=a(l,o,c,d,e[t+3],10,-1894986606),d=a(d,l,o,c,e[t+10],15,-1051523),c=a(c,d,l,o,e[t+1],21,-2054922799),o=a(o,c,d,l,e[t+8],6,1873313359),l=a(l,o,c,d,e[t+15],10,-30611744),d=a(d,l,o,c,e[t+6],15,-1560198380),c=a(c,d,l,o,e[t+13],21,1309151649),o=a(o,c,d,l,e[t+4],6,-145523070),l=a(l,o,c,d,e[t+11],10,-1120210379),d=a(d,l,o,c,e[t+2],15,718787259),c=a(c,d,l,o,e[t+9],21,-343485551),o=n(o,r),c=n(c,f),d=n(d,h),l=n(l,g);}return [o,c,d,l]}(function(e){if(0===e.length)return [];const t=8*e.length,n=new Uint32Array(r(t));for(let r=0;r<t;r+=8)n[r>>5]|=(255&e[r/8])<<r%32;return n}(e),8*e.length))};},140:(e,t)=>{Object.defineProperty(t,"__esModule",{value:true}),t.default=void 0;var r={randomUUID:"undefined"!=typeof crypto&&crypto.randomUUID&&crypto.randomUUID.bind(crypto)};t.default=r;},808:(e,t)=>{Object.defineProperty(t,"__esModule",{value:true}),t.default=void 0,t.default="00000000-0000-0000-0000-000000000000";},792:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:true}),t.default=void 0;var n,o=(n=r(37))&&n.__esModule?n:{default:n};t.default=function(e){if(!(0, o.default)(e))throw TypeError("Invalid UUID");let t;const r=new Uint8Array(16);return r[0]=(t=parseInt(e.slice(0,8),16))>>>24,r[1]=t>>>16&255,r[2]=t>>>8&255,r[3]=255&t,r[4]=(t=parseInt(e.slice(9,13),16))>>>8,r[5]=255&t,r[6]=(t=parseInt(e.slice(14,18),16))>>>8,r[7]=255&t,r[8]=(t=parseInt(e.slice(19,23),16))>>>8,r[9]=255&t,r[10]=(t=parseInt(e.slice(24,36),16))/1099511627776&255,r[11]=t/4294967296&255,r[12]=t>>>24&255,r[13]=t>>>16&255,r[14]=t>>>8&255,r[15]=255&t,r};},656:(e,t)=>{Object.defineProperty(t,"__esModule",{value:true}),t.default=void 0,t.default=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;},858:(e,t)=>{let r;Object.defineProperty(t,"__esModule",{value:true}),t.default=function(){if(!r&&(r="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!r))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return r(n)};const n=new Uint8Array(16);},42:(e,t)=>{function r(e,t,r,n){switch(e){case 0:return t&r^~t&n;case 1:case 3:return t^r^n;case 2:return t&r^t&n^r&n}}function n(e,t){return e<<t|e>>>32-t}Object.defineProperty(t,"__esModule",{value:true}),t.default=void 0;t.default=function(e){const t=[1518500249,1859775393,2400959708,3395469782],o=[1732584193,4023233417,2562383102,271733878,3285377520];if("string"==typeof e){const t=unescape(encodeURIComponent(e));e=[];for(let r=0;r<t.length;++r)e.push(t.charCodeAt(r));}else Array.isArray(e)||(e=Array.prototype.slice.call(e));e.push(128);const i=e.length/4+2,s=Math.ceil(i/16),u=new Array(s);for(let t=0;t<s;++t){const r=new Uint32Array(16);for(let n=0;n<16;++n)r[n]=e[64*t+4*n]<<24|e[64*t+4*n+1]<<16|e[64*t+4*n+2]<<8|e[64*t+4*n+3];u[t]=r;}u[s-1][14]=8*(e.length-1)/Math.pow(2,32),u[s-1][14]=Math.floor(u[s-1][14]),u[s-1][15]=8*(e.length-1)&4294967295;for(let e=0;e<s;++e){const i=new Uint32Array(80);for(let t=0;t<16;++t)i[t]=u[e][t];for(let e=16;e<80;++e)i[e]=n(i[e-3]^i[e-8]^i[e-14]^i[e-16],1);let s=o[0],a=o[1],c=o[2],d=o[3],l=o[4];for(let e=0;e<80;++e){const o=Math.floor(e/20),u=n(s,5)+r(o,a,c,d)+l+t[o]+i[e]>>>0;l=d,d=c,c=n(a,30)>>>0,a=s,s=u;}o[0]=o[0]+s>>>0,o[1]=o[1]+a>>>0,o[2]=o[2]+c>>>0,o[3]=o[3]+d>>>0,o[4]=o[4]+l>>>0;}return [o[0]>>24&255,o[0]>>16&255,o[0]>>8&255,255&o[0],o[1]>>24&255,o[1]>>16&255,o[1]>>8&255,255&o[1],o[2]>>24&255,o[2]>>16&255,o[2]>>8&255,255&o[2],o[3]>>24&255,o[3]>>16&255,o[3]>>8&255,255&o[3],o[4]>>24&255,o[4]>>16&255,o[4]>>8&255,255&o[4]]};},910:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:true}),t.default=void 0,t.unsafeStringify=s;var n,o=(n=r(37))&&n.__esModule?n:{default:n};const i=[];for(let e=0;e<256;++e)i.push((e+256).toString(16).slice(1));function s(e,t=0){return (i[e[t+0]]+i[e[t+1]]+i[e[t+2]]+i[e[t+3]]+"-"+i[e[t+4]]+i[e[t+5]]+"-"+i[e[t+6]]+i[e[t+7]]+"-"+i[e[t+8]]+i[e[t+9]]+"-"+i[e[t+10]]+i[e[t+11]]+i[e[t+12]]+i[e[t+13]]+i[e[t+14]]+i[e[t+15]]).toLowerCase()}t.default=function(e,t=0){const r=s(e,t);if(!(0, o.default)(r))throw TypeError("Stringified UUID is invalid");return r};},518:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:true}),t.default=void 0;var n,o=(n=r(858))&&n.__esModule?n:{default:n},i=r(910);let s,u,a=0,c=0;t.default=function(e,t,r){let n=t&&r||0;const d=t||new Array(16);let l=(e=e||{}).node||s,f=void 0!==e.clockseq?e.clockseq:u;if(null==l||null==f){const t=e.random||(e.rng||o.default)();null==l&&(l=s=[1|t[0],t[1],t[2],t[3],t[4],t[5]]),null==f&&(f=u=16383&(t[6]<<8|t[7]));}let h=void 0!==e.msecs?e.msecs:Date.now(),g=void 0!==e.nsecs?e.nsecs:c+1;const p=h-a+(g-c)/1e4;if(p<0&&void 0===e.clockseq&&(f=f+1&16383),(p<0||h>a)&&void 0===e.nsecs&&(g=0),g>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");a=h,c=g,u=f,h+=122192928e5;const v=(1e4*(268435455&h)+g)%4294967296;d[n++]=v>>>24&255,d[n++]=v>>>16&255,d[n++]=v>>>8&255,d[n++]=255&v;const E=h/4294967296*1e4&268435455;d[n++]=E>>>8&255,d[n++]=255&E,d[n++]=E>>>24&15|16,d[n++]=E>>>16&255,d[n++]=f>>>8|128,d[n++]=255&f;for(let e=0;e<6;++e)d[n+e]=l[e];return t||(0, i.unsafeStringify)(d)};},948:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:true}),t.default=void 0;var n=i(r(25)),o=i(r(311));function i(e){return e&&e.__esModule?e:{default:e}}var s=(0, n.default)("v3",48,o.default);t.default=s;},25:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:true}),t.URL=t.DNS=void 0,t.default=function(e,t,r){function n(e,n,s,u){var a;if("string"==typeof e&&(e=function(e){e=unescape(encodeURIComponent(e));const t=[];for(let r=0;r<e.length;++r)t.push(e.charCodeAt(r));return t}(e)),"string"==typeof n&&(n=(0, i.default)(n)),16!==(null===(a=n)||void 0===a?void 0:a.length))throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");let c=new Uint8Array(16+e.length);if(c.set(n),c.set(e,n.length),c=r(c),c[6]=15&c[6]|t,c[8]=63&c[8]|128,s){u=u||0;for(let e=0;e<16;++e)s[u+e]=c[e];return s}return (0, o.unsafeStringify)(c)}try{n.name=e;}catch(e){}return n.DNS=s,n.URL=u,n};var n,o=r(910),i=(n=r(792))&&n.__esModule?n:{default:n};const s="6ba7b810-9dad-11d1-80b4-00c04fd430c8";t.DNS=s;const u="6ba7b811-9dad-11d1-80b4-00c04fd430c8";t.URL=u;},73:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:true}),t.default=void 0;var n=s(r(140)),o=s(r(858)),i=r(910);function s(e){return e&&e.__esModule?e:{default:e}}t.default=function(e,t,r){if(n.default.randomUUID&&!t&&!e)return n.default.randomUUID();const s=(e=e||{}).random||(e.rng||o.default)();if(s[6]=15&s[6]|64,s[8]=63&s[8]|128,t){r=r||0;for(let e=0;e<16;++e)t[r+e]=s[e];return t}return (0, i.unsafeStringify)(s)};},186:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:true}),t.default=void 0;var n=i(r(25)),o=i(r(42));function i(e){return e&&e.__esModule?e:{default:e}}var s=(0, n.default)("v5",80,o.default);t.default=s;},37:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:true}),t.default=void 0;var n,o=(n=r(656))&&n.__esModule?n:{default:n};t.default=function(e){return "string"==typeof e&&o.default.test(e)};},775:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:true}),t.default=void 0;var n,o=(n=r(37))&&n.__esModule?n:{default:n};t.default=function(e){if(!(0, o.default)(e))throw TypeError("Invalid UUID");return parseInt(e.slice(14,15),16)};},994:function(e){e.exports=function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:false,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=true,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:true,get:n});},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:true});},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:true,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return {}.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){function n(e){try{if(!e)return !1;if("undefined"!=typeof Promise&&e instanceof Promise)return !0;if("undefined"!=typeof window&&"function"==typeof window.Window&&e instanceof window.Window)return !1;if("undefined"!=typeof window&&"function"==typeof window.constructor&&e instanceof window.constructor)return !1;var t={}.toString;if(t){var r=t.call(e);if("[object Window]"===r||"[object global]"===r||"[object DOMWindow]"===r)return !1}if("function"==typeof e.then)return !0}catch(e){return  false}return  false}r.r(t),r.d(t,"ZalgoPromise",(function(){return l}));var o,i=[],s=[],u=0;function a(){if(!u&&o){var e=o;o=null,e.resolve();}}function c(){u+=1;}function d(){u-=1,a();}var l=function(){function e(e){var t=this;if(this.resolved=void 0,this.rejected=void 0,this.errorHandled=void 0,this.value=void 0,this.error=void 0,this.handlers=void 0,this.dispatching=void 0,this.stack=void 0,this.resolved=false,this.rejected=false,this.errorHandled=false,this.handlers=[],e){var r,n,o=false,i=false,s=false;c();try{e((function(e){s?t.resolve(e):(o=!0,r=e);}),(function(e){s?t.reject(e):(i=!0,n=e);}));}catch(e){return d(),void this.reject(e)}d(),s=true,o?this.resolve(r):i&&this.reject(n);}}var t=e.prototype;return t.resolve=function(e){if(this.resolved||this.rejected)return this;if(n(e))throw new Error("Can not resolve promise with another promise");return this.resolved=true,this.value=e,this.dispatch(),this},t.reject=function(e){var t=this;if(this.resolved||this.rejected)return this;if(n(e))throw new Error("Can not reject promise with another promise");if(!e){var r=e&&"function"==typeof e.toString?e.toString():{}.toString.call(e);e=new Error("Expected reject to be called with Error, got "+r);}return this.rejected=true,this.error=e,this.errorHandled||setTimeout((function(){t.errorHandled||function(e,t){if(-1===i.indexOf(e)){i.push(e),setTimeout((function(){throw e}),1);for(var r=0;r<s.length;r++)s[r](e,t);}}(e,t);}),1),this.dispatch(),this},t.asyncReject=function(e){return this.errorHandled=true,this.reject(e),this},t.dispatch=function(){var t=this.resolved,r=this.rejected,o=this.handlers;if(!this.dispatching&&(t||r)){this.dispatching=true,c();for(var i=function(e,t){return e.then((function(e){t.resolve(e);}),(function(e){t.reject(e);}))},s=0;s<o.length;s++){var u=o[s],a=u.onSuccess,l=u.onError,f=u.promise,h=void 0;if(t)try{h=a?a(this.value):this.value;}catch(e){f.reject(e);continue}else if(r){if(!l){f.reject(this.error);continue}try{h=l(this.error);}catch(e){f.reject(e);continue}}if(h instanceof e&&(h.resolved||h.rejected)){var g=h;g.resolved?f.resolve(g.value):f.reject(g.error),g.errorHandled=true;}else n(h)?h instanceof e&&(h.resolved||h.rejected)?h.resolved?f.resolve(h.value):f.reject(h.error):i(h,f):f.resolve(h);}o.length=0,this.dispatching=false,d();}},t.then=function(t,r){if(t&&"function"!=typeof t&&!t.call)throw new Error("Promise.then expected a function for success handler");if(r&&"function"!=typeof r&&!r.call)throw new Error("Promise.then expected a function for error handler");var n=new e;return this.handlers.push({promise:n,onSuccess:t,onError:r}),this.errorHandled=true,this.dispatch(),n},t.catch=function(e){return this.then(void 0,e)},t.finally=function(t){if(t&&"function"!=typeof t&&!t.call)throw new Error("Promise.finally expected a function");return this.then((function(r){return e.try(t).then((function(){return r}))}),(function(r){return e.try(t).then((function(){throw r}))}))},t.timeout=function(e,t){var r=this;if(this.resolved||this.rejected)return this;var n=setTimeout((function(){r.resolved||r.rejected||r.reject(t||new Error("Promise timed out after "+e+"ms"));}),e);return this.then((function(e){return clearTimeout(n),e}))},t.toPromise=function(){if("undefined"==typeof Promise)throw new TypeError("Could not find Promise");return Promise.resolve(this)},t.lazy=function(){return this.errorHandled=true,this},e.resolve=function(t){return t instanceof e?t:n(t)?new e((function(e,r){return t.then(e,r)})):(new e).resolve(t)},e.reject=function(t){return (new e).reject(t)},e.asyncReject=function(t){return (new e).asyncReject(t)},e.all=function(t){var r=new e,o=t.length,i=[].slice();if(!o)return r.resolve(i),r;for(var s=function(e,t,n){return t.then((function(t){i[e]=t,0==(o-=1)&&r.resolve(i);}),(function(e){n.reject(e);}))},u=0;u<t.length;u++){var a=t[u];if(a instanceof e){if(a.resolved){i[u]=a.value,o-=1;continue}}else if(!n(a)){i[u]=a,o-=1;continue}s(u,e.resolve(a),r);}return 0===o&&r.resolve(i),r},e.hash=function(t){var r={},o=[],i=function(e){if(t.hasOwnProperty(e)){var i=t[e];n(i)?o.push(i.then((function(t){r[e]=t;}))):r[e]=i;}};for(var s in t)i(s);return e.all(o).then((function(){return r}))},e.map=function(t,r){return e.all(t.map(r))},e.onPossiblyUnhandledException=function(e){return function(e){return s.push(e),{cancel:function(){s.splice(s.indexOf(e),1);}}}(e)},e.try=function(t,r,n){if(t&&"function"!=typeof t&&!t.call)throw new Error("Promise.try expected a function");var o;c();try{o=t.apply(r,n||[]);}catch(t){return d(),e.reject(t)}return d(),e.resolve(o)},e.delay=function(t){return new e((function(e){setTimeout(e,t);}))},e.isPromise=function(t){return !!(t&&t instanceof e)||n(t)},e.flush=function(){return t=o=o||new e,a(),t;var t;},e}();}]);},834:(e,t,r)=>{e.exports=r(994);}},t={},function r(n){var o=t[n];if(void 0!==o)return o.exports;var i=t[n]={exports:{}};return e[n].call(i.exports,i,i.exports,r),i.exports}(156);var e,t;}));
		
	} (dist$1));
	return dist$1.exports;
}

var distExports = requireDist();

const LIVE_PREVIEW_POST_MESSAGE_EVENTS = {
    INIT: "init",
    ON_CHANGE: "client-data-send",
    HISTORY: "history",
    CHECK_ENTRY_PAGE: "check-entry-page",
    URL_CHANGE: "url-change",
    VARIANT_PATCH: "variant-patch-update",
};
const LIVE_PREVIEW_CHANNEL_ID = "live-preview";

let livePreviewPostMessage;
if (typeof window !== "undefined") {
    const eventOptions = {
        target: window.parent,
        debug: false,
        suppressErrors: true
    };
    if (isOpeningInNewTab()) {
        eventOptions.target = window.opener;
    }
    livePreviewPostMessage = new distExports.EventManager(LIVE_PREVIEW_CHANNEL_ID, eventOptions);
}
var livePreviewPostMessage$1 = livePreviewPostMessage;

const EDIT_BUTTON_TOOLTIP_ID = "cslp-tooltip";

function calculateEditButtonPosition(currentHoveredElement, cslpButtonPosition) {
    const editButtonPosition = {
        upperBoundOfTooltip: 0,
        leftBoundOfTooltip: 0,
    };
    const currentRectOfElement = currentHoveredElement.getBoundingClientRect();
    try {
        const buttonMeasurementValues = {
            width: 72,
            halfWidth: 36,
            height: 40,
            basicMargin: 5,
            widthWithMargin: 77,
        };
        switch (cslpButtonPosition) {
            case "top-center":
                editButtonPosition.upperBoundOfTooltip =
                    currentRectOfElement.top - buttonMeasurementValues.height;
                editButtonPosition.leftBoundOfTooltip =
                    currentRectOfElement.width / 2 -
                        buttonMeasurementValues.halfWidth +
                        currentRectOfElement.left;
                break;
            case "top-right":
                editButtonPosition.upperBoundOfTooltip =
                    currentRectOfElement.top - buttonMeasurementValues.height;
                editButtonPosition.leftBoundOfTooltip =
                    currentRectOfElement.right - buttonMeasurementValues.width;
                break;
            case "right":
                editButtonPosition.upperBoundOfTooltip =
                    currentRectOfElement.top -
                        buttonMeasurementValues.basicMargin;
                editButtonPosition.leftBoundOfTooltip =
                    currentRectOfElement.right +
                        buttonMeasurementValues.basicMargin;
                break;
            case "bottom":
                editButtonPosition.upperBoundOfTooltip =
                    currentRectOfElement.bottom +
                        buttonMeasurementValues.basicMargin;
                editButtonPosition.leftBoundOfTooltip =
                    currentRectOfElement.left -
                        buttonMeasurementValues.basicMargin;
                break;
            case "bottom-left":
                editButtonPosition.upperBoundOfTooltip =
                    currentRectOfElement.bottom +
                        buttonMeasurementValues.basicMargin;
                editButtonPosition.leftBoundOfTooltip =
                    currentRectOfElement.left -
                        buttonMeasurementValues.basicMargin;
                break;
            case "bottom-center":
                editButtonPosition.upperBoundOfTooltip =
                    currentRectOfElement.bottom +
                        buttonMeasurementValues.basicMargin;
                editButtonPosition.leftBoundOfTooltip =
                    currentRectOfElement.width / 2 -
                        buttonMeasurementValues.halfWidth +
                        currentRectOfElement.left;
                break;
            case "bottom-right":
                editButtonPosition.upperBoundOfTooltip =
                    currentRectOfElement.bottom +
                        buttonMeasurementValues.basicMargin;
                editButtonPosition.leftBoundOfTooltip =
                    currentRectOfElement.right - buttonMeasurementValues.width;
                break;
            case "left":
                editButtonPosition.upperBoundOfTooltip =
                    currentRectOfElement.top -
                        buttonMeasurementValues.basicMargin;
                editButtonPosition.leftBoundOfTooltip =
                    currentRectOfElement.left -
                        buttonMeasurementValues.widthWithMargin;
                break;
            // default position => top, top-left or any other string
            default:
                editButtonPosition.upperBoundOfTooltip =
                    currentRectOfElement.top - buttonMeasurementValues.height;
                editButtonPosition.leftBoundOfTooltip =
                    currentRectOfElement.left -
                        buttonMeasurementValues.basicMargin;
                break;
        }
        return editButtonPosition;
    }
    catch (error) {
        PublicLogger.error(error);
        return editButtonPosition;
    }
}
const createSingularEditButton = (editCallback) => {
    const singularEditButton = document.createElement("div");
    singularEditButton.classList.add("cslp-tooltip-child", "singular");
    singularEditButton.setAttribute("data-test-id", "cslp-singular-edit-button");
    singularEditButton.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.1 3.5L0.3 11.3C0.1 11.5 0 11.7 0 12V15C0 15.6 0.4 16 1 16H4C4.3 16 4.5 15.9 4.7 15.7L12.5 7.9L8.1 3.5Z" fill="#718096"></path>
      <path d="M15.7 3.3L12.7 0.3C12.3 -0.1 11.7 -0.1 11.3 0.3L9.5 2.1L13.9 6.5L15.7 4.7C16.1 4.3 16.1 3.7 15.7 3.3Z" fill="#718096"></path>
    </svg>Edit`;
    singularEditButton.addEventListener("click", editCallback);
    return singularEditButton;
};
const createMultipleEditButton = (editCallback, linkCallback) => {
    const multipleEditButton = document.createElement("div");
    multipleEditButton.classList.add("cslp-tooltip-child");
    multipleEditButton.setAttribute("data-title", "Edit");
    multipleEditButton.setAttribute("data-test-id", "cslp-multiple-edit-button");
    multipleEditButton.innerHTML = ` <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.1 3.5L0.3 11.3C0.1 11.5 0 11.7 0 12V15C0 15.6 0.4 16 1 16H4C4.3 16 4.5 15.9 4.7 15.7L12.5 7.9L8.1 3.5Z" fill="#718096"></path>
      <path d="M15.7 3.3L12.7 0.3C12.3 -0.1 11.7 -0.1 11.3 0.3L9.5 2.1L13.9 6.5L15.7 4.7C16.1 4.3 16.1 3.7 15.7 3.3Z" fill="#718096"></path>
    </svg>`;
    multipleEditButton.addEventListener("click", editCallback);
    const multipleExternalLinkButton = document.createElement("div");
    multipleExternalLinkButton.classList.add("cslp-tooltip-child");
    multipleExternalLinkButton.setAttribute("data-title", "Go to link");
    multipleExternalLinkButton.setAttribute("data-test-id", "cslp-multiple-external-link-button");
    multipleExternalLinkButton.innerHTML = ` <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.66654 2.66758H13.3332V13.3342H6.66654V16.0009H13.3332C14.0405 16.0009 14.7187 15.72 15.2188 15.2199C15.7189 14.7198 15.9999 14.0415 15.9999 13.3342V2.66758C15.9999 1.96034 15.7189 1.28206 15.2188 0.781964C14.7187 0.281867 14.0405 0.000915527 13.3332 0.000915527H2.66654C1.9593 0.000915527 1.28102 0.281867 0.780927 0.781964C0.280829 1.28206 -0.00012207 1.96034 -0.00012207 2.66758V9.33425H2.66654V2.66758Z" fill="#718096" />
      <path d="M6.94263 7.05734L0.999958 13L2.88529 14.8853L8.82796 8.94267L10.8853 11V5.00001H4.88529L6.94263 7.05734Z" fill="#718096" />
    </svg>`;
    multipleExternalLinkButton.addEventListener("click", linkCallback);
    const multipleEditFragment = document.createDocumentFragment();
    multipleEditFragment.appendChild(multipleEditButton);
    multipleEditFragment.appendChild(multipleExternalLinkButton);
    const multipleDiv = document.createElement("div");
    multipleDiv.appendChild(multipleEditFragment);
    multipleDiv.classList.add(cslpTagStyles()["multiple"]);
    return multipleDiv;
};
function getEditButtonPosition$1(currentHoveredElement, defaultPosition) {
    if (!currentHoveredElement)
        return { upperBoundOfTooltip: 0, leftBoundOfTooltip: 0 };
    const cslpButtonPosition = currentHoveredElement.getAttribute("data-cslp-button-position");
    if (cslpButtonPosition) {
        return calculateEditButtonPosition(currentHoveredElement, cslpButtonPosition);
    }
    // NOTE: position "top" and "top-left" will be the position of edit button if no default position passed in config
    return calculateEditButtonPosition(currentHoveredElement, defaultPosition || "top");
}
function shouldRenderEditButton() {
    const config = Config.get();
    if (!config.editButton.enable) {
        if (config.editButton.enable === undefined)
            PublicLogger.error("enable key is required inside editButton object");
        return false;
    }
    // return boolean in case of cslp-buttons query added in url
    try {
        const currentLocation = new URL(window.location.href);
        const cslpButtonQueryValue = currentLocation.searchParams.get("cslp-buttons");
        if (cslpButtonQueryValue !== null &&
            config.editButton.includeByQueryParameter !== false)
            return cslpButtonQueryValue === "false" ? false : true;
    }
    catch (error) {
        PublicLogger.error(error);
    }
    const iFrameCheck = inIframe();
    // case outside live preview
    if (!iFrameCheck &&
        config.editButton.exclude?.find((exclude) => exclude === "outsideLivePreviewPortal")) {
        return false;
    }
    // case if inside live preview
    if (iFrameCheck &&
        config.editButton.exclude?.find((exclude) => exclude === "insideLivePreviewPortal")) {
        return false;
    }
    else if (iFrameCheck) {
        // case if inside visual builder
        if (config.windowType === "builder") {
            return false;
        }
        // case if independent site
        return true;
    }
    // Priority list => 1. cslpEditButton query value 2.  Inside live preview  3. renderCslpButtonByDefault value selected by user
    return true;
}
function toggleEditButtonElement() {
    const render = shouldRenderEditButton();
    const exists = doesEditButtonExist();
    if (render && !exists) {
        LivePreviewEditButton.livePreviewEditButton =
            new LivePreviewEditButton();
    }
    else if (!render && exists) {
        LivePreviewEditButton.livePreviewEditButton?.destroy();
    }
}
function doesEditButtonExist() {
    return document.getElementById(EDIT_BUTTON_TOOLTIP_ID) !== null;
}
class LivePreviewEditButton {
    constructor() {
        this.tooltip = null;
        this.typeOfCurrentChild = "singular";
        this.tooltipChild = {
            singular: null,
            multiple: null,
        };
        this.createCslpTooltip = this.createCslpTooltip.bind(this);
        this.updateTooltipPosition = this.updateTooltipPosition.bind(this);
        this.addEditStyleOnHover = this.addEditStyleOnHover.bind(this);
        this.scrollHandler = this.scrollHandler.bind(this);
        this.generateRedirectUrl = this.generateRedirectUrl.bind(this);
        this.linkClickHandler = this.linkClickHandler.bind(this);
        this.destroy = this.destroy.bind(this);
        if (this.createCslpTooltip()) {
            this.updateTooltipPosition();
            window.addEventListener("scroll", this.updateTooltipPosition);
            window.addEventListener("mouseover", this.addEditStyleOnHover);
        }
    }
    createCslpTooltip() {
        const editButton = Config.get().editButton;
        if (!document.getElementById(EDIT_BUTTON_TOOLTIP_ID) &&
            editButton.enable &&
            shouldRenderEditButton()) {
            const tooltip = document.createElement("button");
            this.tooltip = tooltip;
            this.tooltip.classList.add(cslpTagStyles()["cslp-tooltip"]);
            this.tooltip.setAttribute("data-test-id", "cs-cslp-tooltip");
            this.tooltip.id = EDIT_BUTTON_TOOLTIP_ID;
            window.document.body.insertAdjacentElement("beforeend", this.tooltip);
            this.tooltipChild.singular = createSingularEditButton(this.scrollHandler);
            this.tooltipChild.multiple = createMultipleEditButton(this.scrollHandler, this.linkClickHandler);
            this.tooltip.appendChild(this.tooltipChild.singular);
            return true;
        }
        return false;
    }
    updateTooltipPosition() {
        if (!document.getElementById("cslp-tooltip")) {
            this.createCslpTooltip();
        }
        const editButton = Config.get().editButton;
        const elements = Config.get().elements;
        if (!elements.highlightedElement || !this.tooltip)
            return false;
        const currentRectOfElement = elements.highlightedElement.getBoundingClientRect();
        const currentRectOfParentOfElement = this.tooltip.parentElement?.getBoundingClientRect();
        if (currentRectOfElement && currentRectOfParentOfElement) {
            const editButtonPosition = getEditButtonPosition$1(elements.highlightedElement, editButton.position);
            let upperBoundOfTooltip = editButtonPosition.upperBoundOfTooltip;
            const leftBoundOfTooltip = editButtonPosition.leftBoundOfTooltip;
            // if scrolled and element is still visible, make sure tooltip is also visible
            if (upperBoundOfTooltip < 0) {
                if (currentRectOfElement.top < 0)
                    upperBoundOfTooltip = currentRectOfElement.top;
                else
                    upperBoundOfTooltip = 0;
            }
            this.tooltip.style.top = upperBoundOfTooltip + "px";
            this.tooltip.style.zIndex =
                elements.highlightedElement.style.zIndex || "200";
            this.tooltip.style.left = leftBoundOfTooltip + "px";
            if (this.tooltipChild.singular && this.tooltipChild.multiple) {
                if (elements.highlightedElement.hasAttribute("href") &&
                    this.typeOfCurrentChild !== "multiple") {
                    this.tooltip.innerHTML = "";
                    this.tooltip.appendChild(this.tooltipChild.multiple);
                    this.typeOfCurrentChild = "multiple";
                }
                else if (this.typeOfCurrentChild !== "singular") {
                    this.tooltip.innerHTML = "";
                    this.tooltip.appendChild(this.tooltipChild.singular);
                    this.typeOfCurrentChild = "singular";
                }
            }
            return true;
        }
        return false;
    }
    addEditStyleOnHover(e) {
        const updateStyles = this.shouldUpdateStyle(e);
        // Checks whether the mouse pointer is within the safe zone of the
        // element which was hovered on, since it also returns undefined when the
        // above can't be determined we can still add styles
        const shouldRedraw = typeof updateStyles === "undefined" ? true : updateStyles;
        if (!shouldRedraw) {
            return;
        }
        const updateTooltipPosition = ({ cslpTag, highlightedElement, }) => {
            if (this.updateTooltipPosition()) {
                this.tooltip?.setAttribute("current-data-cslp", cslpTag);
                this.tooltip?.setAttribute("current-href", highlightedElement.getAttribute("href") ?? "");
            }
        };
        const editButton = Config.get().editButton;
        const windowType = Config.get().windowType;
        if ((windowType === ILivePreviewWindowType.PREVIEW ||
            windowType === ILivePreviewWindowType.INDEPENDENT) &&
            editButton.enable) {
            addCslpOutline(e, updateTooltipPosition);
        }
    }
    shouldUpdateStyle(event) {
        const editButtonPos = Config.get().editButton.position;
        const editButtonDomRect = this.tooltip?.getBoundingClientRect();
        return isPointerWithinEditButtonSafeZone({
            event,
            editButtonPos,
            editButtonDomRect,
        });
    }
    scrollHandler() {
        if (!this.tooltip)
            return;
        const cslpTag = this.tooltip.getAttribute("current-data-cslp");
        if (cslpTag) {
            const { content_type_uid, entry_uid, locale, variant, fieldPathWithIndex, } = extractDetailsFromCslp(cslpTag);
            if (inIframe() || isOpeningInNewTab()) {
                livePreviewPostMessage$1?.send("scroll", {
                    field: fieldPathWithIndex,
                    content_type_uid,
                    entry_uid,
                    variant,
                    locale,
                });
            }
            else {
                try {
                    // Redirect to Contentstack edit page
                    const redirectUrl = this.generateRedirectUrl(content_type_uid, locale, entry_uid, variant, fieldPathWithIndex);
                    window.open(redirectUrl, "_blank");
                }
                catch (error) {
                    PublicLogger.error(error);
                }
            }
        }
    }
    /**
     * Generates the redirect URL for editing a specific entry in the Live Preview SDK.
     * @param content_type_uid - The UID of the content type.
     * @param locale - The locale of the entry (default: "en-us").
     * @param entry_uid - The UID of the entry.
     * @param preview_field - The field to be previewed.
     * @returns The redirect URL for editing the entry.
     */
    generateRedirectUrl(content_type_uid, locale = "en-us", entry_uid, variant, preview_field) {
        const config = Config.get();
        if (!config.stackDetails.apiKey) {
            throw `To use edit tags, you must provide the stack API key. Specify the API key while initializing the Live Preview SDK.

                ContentstackLivePreview.init({
                    ...,
                    stackDetails: {
                        apiKey: 'your-api-key'
                    },
                    ...
                })`;
        }
        if (!config.stackDetails.environment) {
            throw `To use edit tags, you must provide the preview environment. Specify the preview environment while initializing the Live Preview SDK.

                ContentstackLivePreview.init({
                    ...,
                    stackDetails: {
                        environment: 'Your-environment'
                    },
                    ...
                })`;
        }
        const protocol = String(config.clientUrlParams.protocol);
        const host = String(config.clientUrlParams.host);
        const port = String(config.clientUrlParams.port);
        const environment = String(config.stackDetails.environment);
        const branch = String(config.stackDetails.branch || "main");
        let urlHash = `!/stack/${config.stackDetails.apiKey}/content-type/${content_type_uid}/${locale ?? "en-us"}/entry/${entry_uid}`;
        if (variant) {
            urlHash += `/variant/${variant}/edit`;
        }
        else {
            urlHash += `/edit`;
        }
        const url = new URL(`${protocol}://${host}`);
        url.port = port;
        url.hash = urlHash;
        if (config.stackDetails.branch) {
            url.searchParams.append("branch", branch);
        }
        url.searchParams.append("preview-field", preview_field);
        url.searchParams.append("preview-locale", locale ?? "en-us");
        url.searchParams.append("preview-environment", environment);
        return `${url.origin}/${url.hash}${url.search}`;
    }
    linkClickHandler() {
        if (!this.tooltip)
            return;
        const hrefAttribute = this.tooltip.getAttribute("current-href");
        if (hrefAttribute) {
            window.location.assign(hrefAttribute);
        }
    }
    /**
     * Destroys the edit button by removing event listeners and removing the tooltip.
     */
    destroy() {
        window.removeEventListener("scroll", this.updateTooltipPosition);
        window.removeEventListener("mouseover", this.addEditStyleOnHover);
        this.tooltip?.remove();
    }
}
LivePreviewEditButton.livePreviewEditButton = null;
E$1(function handleWindowTypeChange() {
    // we need to specify when to run this effect.
    // here, we run it when the value of windowType changes
    if (typeof window === "undefined")
        return;
    Config.get().windowType;
    if (LivePreviewEditButton && !isOpeningInTimeline()) {
        toggleEditButtonElement();
    }
});
/**
 * Find first element with cslp on the event composed path,
 * do safe zone calculation for the element based on its
 * width and height, and return true if mouse pointer is
 * within the safe zone. Returns undefined when this cannot
 * be determined.
 */
function isPointerWithinEditButtonSafeZone({ event, editButtonDomRect, editButtonPos, }) {
    const SAFE_ZONE_RATIO = 0.1;
    const MAX_SAFE_ZONE_DISTANCE = 30;
    if (!editButtonDomRect || !editButtonPos) {
        return undefined;
    }
    if (!(editButtonDomRect.x > 0) || !(editButtonDomRect.y > 0)) {
        return undefined;
    }
    const isTop = editButtonPos.includes("top");
    const isLeft = editButtonPos.includes("left");
    const isBottom = editButtonPos.includes("bottom");
    const isVertical = isTop || isBottom;
    const cslpElement = event.composedPath().find((target) => {
        const element = target;
        if (element.nodeName === "BODY") {
            return false;
        }
        if (typeof element?.hasAttribute !== "function") {
            return false;
        }
        return element.hasAttribute("data-cslp");
    });
    if (!cslpElement) {
        return undefined;
    }
    const element = cslpElement;
    const elementRect = element.getBoundingClientRect();
    let safeZoneDistance = isVertical
        ? // if vertical positioning ("top"/"bottom")
            // button is rendered along the width
            elementRect.width * SAFE_ZONE_RATIO
        : // button is rendered along the height
            elementRect.height * SAFE_ZONE_RATIO;
    safeZoneDistance =
        safeZoneDistance > MAX_SAFE_ZONE_DISTANCE
            ? MAX_SAFE_ZONE_DISTANCE
            : safeZoneDistance;
    const tooltipX2 = editButtonDomRect.x + editButtonDomRect.width;
    const tooltipY2 = editButtonDomRect.y + editButtonDomRect.height;
    const safeX1 = editButtonDomRect.x - safeZoneDistance;
    const safeX2 = tooltipX2 + safeZoneDistance;
    const safeY1 = editButtonDomRect.y - safeZoneDistance;
    const safeY2 = tooltipY2 + safeZoneDistance;
    if (isTop || isBottom) {
        const verticalSafeDistance = isTop
            ? Math.abs(tooltipY2 - event.clientY)
            : Math.abs(editButtonDomRect.y - event.clientY);
        const isInSafeZone = event.clientX > safeX1 &&
            event.clientX < safeX2 &&
            verticalSafeDistance < safeZoneDistance;
        if (isInSafeZone) {
            return false;
        }
    }
    else {
        const horizontalSafeDistance = isLeft
            ? Math.abs(tooltipX2 - event.clientX)
            : Math.abs(editButtonDomRect.x - event.clientX);
        const isInSafeZone = event.clientY > safeY1 &&
            event.clientY < safeY2 &&
            horizontalSafeDistance < safeZoneDistance;
        if (isInSafeZone) {
            return false;
        }
    }
    return true;
}

const OnChangeLivePreviewPostMessageEventTypes = {
    HASH_CHANGE: "hash_change",
    URL_CHANGE: "url_change"
};

/**
 * Registers a post message event listener for history-related events.
 * The listener handles events for forward, backward, and reload actions on the browser history.
 */
function useHistoryPostMessageEvent() {
    livePreviewPostMessage$1?.on(LIVE_PREVIEW_POST_MESSAGE_EVENTS.HISTORY, (event) => {
        switch (event.data.type) {
            case "forward": {
                window.history.forward();
                break;
            }
            case "backward": {
                window.history.back();
                break;
            }
            case "reload": {
                window.history.go();
                break;
            }
            default: {
                const exhaustiveCheck = event.data.type;
                throw new Error(`Unhandled event: ${exhaustiveCheck}`);
            }
        }
    });
}
/**
 * Registers a post message event listener for updating the entry in the live preview.
 */
function useOnEntryUpdatePostMessageEvent() {
    livePreviewPostMessage$1?.on(LIVE_PREVIEW_POST_MESSAGE_EVENTS.ON_CHANGE, (event) => {
        try {
            const { ssr, onChange } = Config.get();
            const event_type = event.data._metadata?.event_type;
            console.log("event", event.data);
            setConfigFromParams({
                live_preview: event.data.hash,
            });
            // This section will run when there is a change in the entry and the website is CSR
            if (!ssr && !event_type) {
                onChange();
            }
            if (isOpeningInNewTab()) {
                if (!window) {
                    PublicLogger.error("window is not defined");
                    return;
                }
                ;
                // This section will run when there is a change in the entry and the website is SSR
                if (ssr && !event_type) {
                    if (window.location.href.includes("live_preview") && window.location.href.includes("content_type_uid") && window.location.href.includes("entry_uid")) {
                        console.log(" reload the page only");
                        window.location.reload();
                    }
                    else {
                        const url = new URL(window.location.href);
                        url.searchParams.set("live_preview", event.data.hash);
                        url.searchParams.set("content_type_uid", Config.get().stackDetails.contentTypeUid || event.data.content_type_uid || "");
                        url.searchParams.set("entry_uid", Config.get().stackDetails.entryUid || event.data.entry_uid || "");
                        console.log(" new url", url.toString());
                        window.location.href = url.toString();
                    }
                }
                // This section will run when the hash changes and the website is SSR or CSR
                if (event_type === OnChangeLivePreviewPostMessageEventTypes.HASH_CHANGE) {
                    const newUrl = new URL(window.location.href);
                    newUrl.searchParams.set("live_preview", event.data.hash);
                    window.history.pushState({}, "", newUrl.toString());
                }
                // This section will run when the URL of the page changes
                if (event_type === OnChangeLivePreviewPostMessageEventTypes.URL_CHANGE && event.data.url) {
                    window.location.href = event.data.url;
                }
            }
        }
        catch (error) {
            PublicLogger.error("Error handling live preview update:", error);
            return;
        }
    });
}
function sendInitializeLivePreviewPostMessageEvent() {
    livePreviewPostMessage$1
        ?.send(LIVE_PREVIEW_POST_MESSAGE_EVENTS.INIT, {
        config: {
            shouldReload: Config.get().ssr,
            href: window.location.href,
            sdkVersion: process?.env?.PACKAGE_VERSION,
            mode: Config.get().mode,
        },
    })
        .then((data) => {
        const { contentTypeUid, entryUid, windowType = ILivePreviewWindowType.PREVIEW, } = data || {};
        // TODO: This is a fix for the issue where we were calling sending init in the builder
        // Let's remove this condition when we fix it.
        if (Config?.get()?.windowType && Config.get().windowType === ILivePreviewWindowType.BUILDER) {
            return;
        }
        if (contentTypeUid && entryUid) {
            // TODO: we should not use this function. Instead we should have sideEffect run automatically when we set the config.
            setConfigFromParams({
                content_type_uid: contentTypeUid,
                entry_uid: entryUid,
            });
        }
        if (Config.get().ssr || isOpeningInTimeline() || isOpeningInNewTab()) {
            addParamsToUrl();
        }
        Config.set("windowType", windowType);
        // set timeout for client side (use to show warning: You are not editing this page)
        if (!Config.get().ssr) {
            setInterval(() => {
                sendCurrentPageUrlPostMessageEvent();
            }, 1500);
        }
        useHistoryPostMessageEvent();
        useOnEntryUpdatePostMessageEvent();
    })
        .catch((e) => {
        // TODO: add debug logs that runs conditionally
        // PublicLogger.debug("Error while sending init message", e);
    });
}
function sendCurrentPageUrlPostMessageEvent() {
    livePreviewPostMessage$1
        ?.send(LIVE_PREVIEW_POST_MESSAGE_EVENTS.CHECK_ENTRY_PAGE, {
        href: window.location.href,
    })
        .catch(() => {
        // TODO: add debug logs that runs conditionally
    });
}

/**
 * Removes the "data-cslp" and "data-cslp-button-position" attributes from all nodes with the "data-cslp" attribute.
 */
function removeDataCslp() {
    const nodes = document.querySelectorAll("[data-cslp]");
    nodes.forEach((node) => {
        node.removeAttribute("data-cslp");
        node.removeAttribute("data-cslp-button-position");
    });
}

function removeFromOnChangeSubscribers(callbackStack, callback) {
    if (typeof callback === "string") {
        if (!callbackStack[callback]) {
            PublicLogger.warn("No subscriber found with the given id.");
        }
        delete callbackStack[callback];
    }
    else if (typeof callback === "function") {
        const isCallbackDeleted = Object.entries(callbackStack).some(([uid, func]) => {
            if (func === callback) {
                delete callbackStack[uid];
                return true;
            }
            return false;
        });
        if (!isCallbackDeleted) {
            PublicLogger.warn("No subscriber found with the given callback.");
        }
    }
}

class LivePreview {
    constructor() {
        /**
         * @hideconstructor
         */
        this.subscribers = {};
        this.requestDataSync = this.requestDataSync.bind(this);
        this.subscribeToOnEntryChange =
            this.subscribeToOnEntryChange.bind(this);
        this.publish = this.publish.bind(this);
        this.unsubscribeOnEntryChange =
            this.unsubscribeOnEntryChange.bind(this);
        const config = Config.get();
        if (config.debug) {
            PublicLogger.debug("Contentstack Live Preview Debugging mode: config --", Config.config);
        }
        if (config.enable) {
            if (typeof document !== undefined) {
                if (document.readyState === "interactive" || document.readyState === "complete") {
                    this.requestDataSync();
                }
                else {
                    document.addEventListener("DOMContentLoaded", this.requestDataSync);
                }
            }
            else {
                window.addEventListener("load", this.requestDataSync);
            }
            // TODO: capetown: add test cases for this condition.
            // TODO: mjrf: Check if we need the second condition here.
            // We are already handling the functions separately in the visual builder.
            // render the hover outline only when edit button enable
            if (!isOpeningInTimeline() &&
                (config.editButton.enable ||
                    config.mode >= ILivePreviewModeConfig.BUILDER)) {
                LivePreviewEditButton.livePreviewEditButton =
                    new LivePreviewEditButton();
            }
        }
        else if (config.cleanCslpOnProduction) {
            removeDataCslp();
        }
    }
    // Request parent for data sync when document loads
    requestDataSync() {
        const config = Config.get();
        Config.set("onChange", this.publish);
        //! TODO: we replaced the handleOnChange() with this.
        //! I don't think we need this. Confirm and remove it.
        config.onChange();
        sendInitializeLivePreviewPostMessageEvent();
    }
    subscribeToOnEntryChange(callback, callbackUid) {
        this.subscribers[callbackUid] = callback;
        return callbackUid;
    }
    publish() {
        Object.values(this.subscribers).forEach((func) => {
            func();
        });
    }
    unsubscribeOnEntryChange(callback) {
        removeFromOnChangeSubscribers(this.subscribers, callback);
    }
}

function handlePageTraversal() {
    window.addEventListener("unload", () => {
        const targetURL = document.activeElement.href;
        if (targetURL) {
            livePreviewPostMessage$1?.send(LIVE_PREVIEW_POST_MESSAGE_EVENTS.URL_CHANGE, {
                targetURL,
            });
        }
    });
}

const TIMELINE_CHANNEL_ID = "timeline";
const timelinePostMessageEvents = {
    SEND_CURRENT_BASE_ROUTE: "send-current-base-route",
    SEND_CSLP_DATA: "send-cslp-data",
    DIFF_VALUE: "diff-value",
    REMOVE_DIFF: "remove-diff",
};

let timelinePostMessage;
if (typeof window !== "undefined") {
    timelinePostMessage = new distExports.EventManager(TIMELINE_CHANNEL_ID, {
        target: window.parent,
        debug: false,
    });
}
var timelinePostMessage$1 = timelinePostMessage;

const compareGlobalStyles = () => {
    const css = b;
    css `
        cs-compare {
            &.cs-compare--added {
                background: rgba(0, 122, 82, 0.2);
                border-bottom: 2px solid rgba(0, 122, 82);
            }

            &.cs-compare--removed {
                background: rgba(214, 36, 0, 0.2);
                text-decoration: line-through 2px solid rgba(214, 36, 0, 1);
            }
        }
        .cs-compare__void--added {
            background: rgba(0, 122, 82, 0.2);
            outline: 2px solid rgba(0, 122, 82);
        }

        .cs-compare__void--removed {
            background: rgba(214, 36, 0, 0.2);
            outline: 2px solid rgba(214, 36, 0, 1);
        }
    `;
};

const voidElements = new Set([
    "area",
    "base",
    "br",
    "col",
    "embed",
    "hr",
    "img",
    "input",
    "keygen",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr",
    "video"
]);
const LEAF_CSLP_SELECTOR = "[data-cslp]:not(:has([data-cslp]))";
const DIFF_WRAPPER = "cs-compare";
function registerCompareElement() {
    class Compare extends HTMLSpanElement {
        constructor() {
            super();
        }
    }
    if (!customElements.get(DIFF_WRAPPER)) {
        customElements.define(DIFF_WRAPPER, Compare, {
            extends: "span",
        });
    }
}
function handleWebCompare() {
    // Check if window and document are available
    if (typeof window === "undefined" || typeof document === "undefined") {
        // Server-side, don't execute client-specific logic
        return;
    }
    compareGlobalStyles();
    registerCompareElement();
    timelinePostMessage$1?.on(timelinePostMessageEvents.SEND_CURRENT_BASE_ROUTE, async () => {
        return { url: window.location.href.split("?")[0] };
    });
    timelinePostMessage$1?.on(timelinePostMessageEvents.SEND_CSLP_DATA, async () => {
        const elements = Array.from(document.querySelectorAll(LEAF_CSLP_SELECTOR));
        const map = {};
        for (const element of elements) {
            const cslp = element.getAttribute("data-cslp");
            if (element.hasAttributes() &&
                voidElements.has(element.tagName.toLowerCase())) {
                let attributes = "";
                for (const attr of element.attributes) {
                    attributes += `${attr.name} -> ${attr.value}\n`;
                }
                map[cslp] = attributes;
            }
            else {
                map[cslp] = element.innerHTML;
            }
        }
        return map;
    });
    const mergeColors = (className = ".cs-compare--added") => {
        const elements = Array.from(document.querySelectorAll(className));
        for (let i = 1; i < elements.length; i++) {
            const prev = elements[i - 1];
            const next = elements[i];
            if (prev.nextElementSibling === next)
                prev.appendChild(prev.nextSibling);
        }
    };
    timelinePostMessage$1?.on(timelinePostMessageEvents.DIFF_VALUE, async (event) => {
        const { diff, type } = event.data;
        const operation = type === "base" ? "removed" : "added";
        const elements = Array.from(document.querySelectorAll(LEAF_CSLP_SELECTOR));
        for (const element of elements) {
            const path = element.getAttribute("data-cslp");
            if (!diff[path])
                continue;
            if (voidElements.has(element.tagName.toLowerCase())) {
                element.classList.add(`cs-compare__void--${operation}`);
            }
            else {
                element.innerHTML = diff[path];
            }
        }
        mergeColors(`.cs-compare--${operation}`);
    });
    timelinePostMessage$1?.on(timelinePostMessageEvents.REMOVE_DIFF, async () => {
        // unwrap the cs-compare tags
        const elements = Array.from(document.querySelectorAll("cs-compare"));
        for (const element of elements) {
            const parent = element.parentElement;
            while (element.firstChild) {
                parent.insertBefore(element.firstChild, element);
            }
            parent.removeChild(element);
        }
        // remove classes cs-compare__void--added and cs-compare__void--removed
        const voidElements = Array.from(document.querySelectorAll(".cs-compare__void--added, .cs-compare__void--removed"));
        for (const element of voidElements) {
            element.classList.remove("cs-compare__void--added");
            element.classList.remove("cs-compare__void--removed");
        }
    });
}

var f=0;function u(e,t,n,o,i,u){var a,c,p={};for(c in t)"ref"==c?a=t[c]:p[c]=t[c];var l={type:e,props:p,key:n,ref:a,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,constructor:void 0,__v:--f,__i:-1,__u:0,__source:i,__self:u};if("function"==typeof e&&(a=e.defaultProps))for(c in a) void 0===p[c]&&(p[c]=a[c]);return l$3.vnode&&l$3.vnode(l),l}

var classnames = {exports: {}};

/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/

var hasRequiredClassnames;

function requireClassnames () {
	if (hasRequiredClassnames) return classnames.exports;
	hasRequiredClassnames = 1;
	(function (module) {
		/* global define */

		(function () {

			var hasOwn = {}.hasOwnProperty;

			function classNames () {
				var classes = '';

				for (var i = 0; i < arguments.length; i++) {
					var arg = arguments[i];
					if (arg) {
						classes = appendClass(classes, parseValue(arg));
					}
				}

				return classes;
			}

			function parseValue (arg) {
				if (typeof arg === 'string' || typeof arg === 'number') {
					return arg;
				}

				if (typeof arg !== 'object') {
					return '';
				}

				if (Array.isArray(arg)) {
					return classNames.apply(null, arg);
				}

				if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
					return arg.toString();
				}

				var classes = '';

				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes = appendClass(classes, key);
					}
				}

				return classes;
			}

			function appendClass (value, newClass) {
				if (!newClass) {
					return value;
				}
			
				if (value) {
					return value + ' ' + newClass;
				}
			
				return value + newClass;
			}

			if (module.exports) {
				classNames.default = classNames;
				module.exports = classNames;
			} else {
				window.classNames = classNames;
			}
		}()); 
	} (classnames));
	return classnames.exports;
}

var classnamesExports = requireClassnames();
var classNames = /*@__PURE__*/getDefaultExportFromCjs(classnamesExports);

/**
 * Returns the redirection URL for the Visual builder.
 * @returns {URL} The redirection URL.
 */
function getVisualBuilderRedirectionUrl() {
    const { stackDetails, clientUrlParams } = Config.get();
    const { branch, apiKey, environment, locale } = stackDetails;
    const { url: appUrl } = clientUrlParams;
    const searchParams = new URLSearchParams();
    if (branch) {
        searchParams.set("branch", branch);
    }
    if (environment) {
        searchParams.set("environment", environment);
    }
    searchParams.set("target-url", window.location.href);
    // get the locale from the data cslp attribute
    const elementWithDataCslp = document.querySelector(`[data-cslp]`);
    if (elementWithDataCslp) {
        const cslpData = elementWithDataCslp.getAttribute("data-cslp");
        const { locale } = extractDetailsFromCslp(cslpData);
        searchParams.set("locale", locale);
    }
    else if (locale) {
        searchParams.set("locale", locale);
    }
    const completeURL = new URL(`/#!/stack/${apiKey}/visual-builder?${searchParams.toString()}`, appUrl);
    return completeURL;
}

const tooltipBaseStyle = `
    pointer-events: all;
    svg {
        pointer-events: none;
    }
    &:before {
        content: attr(data-tooltip);
        position: absolute;
        bottom: 20px;
        margin-bottom: 24px;
        padding: 12px;
        border-radius: 4px;
        width: max-content;
        max-width: 200px;
        color: #fff;
        font-family: Inter;
        font-size: 0.75rem;
        font-style: normal;
        font-weight: 400;
        line-height: 132%; /* 0.99rem */
        letter-spacing: 0.015rem;
        background: #767676;
    }
    &:after {
        content: "";
        position: absolute;
        bottom: 28px;
        /* the arrow */
        border: 10px solid #000;
        border-color: #767676 transparent transparent transparent;
    }
`;
function visualBuilderStyles() {
    return {
        "visual-builder__container": u$1 `
            --outline-transition: all 0.15s ease-in;
            font-family: "Inter", sans-serif;
        `,
        "visual-builder__cursor": u$1 `
            visibility: hidden;
            height: 0;

            &.visible {
                visibility: visible;
                position: fixed;
                top: 0;
                left: 0;
                z-index: 2147483647 !important;

                color: #fff;

                height: auto;
                padding: 0 10px;

                display: flex;
                align-items: center;
                justify-content: center;

                pointer-events: none !important;
                position: fixed !important;
                cursor: none;
            }
        `,
        "tooltip-container": u$1 `
            position: absolute;
            background-color: #767676;
            color: white;
            padding: 12px;
            border-radius: 4px;
            font-size: 12px;
            line-height: 1.4;
            z-index: 1000;
            pointer-events: none;
            max-width: 250px;
            text-align: center;
        `,
        "tooltip-arrow": u$1 `
            position: absolute;
            background: #767676;
            width: 8px;
            height: 8px;
            transform: rotate(45deg);
        `,
        "toolbar-tooltip-content": u$1 `
            display: flex;
            flex-direction: column;
            gap: 4px;
        `,
        "toolbar-tooltip-content-item": u$1 `
            display: flex;
            align-items: center;
            justify-content: start;
            gap: 4px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;

            p {
                margin: 0;
                color: #fff;
                overflow: hidden;
                text-overflow: ellipsis;
                max-width: 100%;
            }
        `,
        "visual-builder__overlay__wrapper": u$1 `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            visibility: hidden;
            z-index: 99999;

            pointer-events: none;

            &.visible {
                visibility: visible;
            }
        `,
        "visual-builder__empty-block-plus-icon": u$1 `
            font-size: 22px;
            font-weight: 300;
            display: flex;
            align-items: center;
            justify-content: center;
        `,
        "visual-builder__overlay--outline": u$1 `
            position: absolute;
            outline: 4px solid #715cdd;
            transition: var(--outline-transition);
        `,
        "visual-builder__overlay": u$1 `
            background: rgba(0, 0, 0, 0.3);
            box-sizing: content-box;
            pointer-events: all;
            position: absolute;
            transition: var(--outline-transition);
        `,
        "visual-builder__add-button": u$1 `
            position: absolute;
            pointer-events: all;

            background: #ffffff;
            color: #475161;

            border-radius: 4px;
            border: 1px solid #6c5ce7;

            height: 32px;
            min-width: 32px;
            max-width: 180px;
            padding: 8px 6px;
            transform: translate(-50%, -50%);

            font-weight: 600;
            color: #6c5ce7;
            overflow: hidden;

            z-index: 2147483646 !important;

            display: grid;
            grid-template-columns: min-content 0fr;
            align-content: center;
            gap: 0;

            transition:
                grid-template-columns 0.25s,
                left 0.15s ease-in,
                top 0.15s ease-in,
                gap 0.15s ease-in;

            &:has(.visual-builder__add-button-label):hover {
                grid-template-columns: min-content 1fr;
                gap: 8px;
                padding: 8px 16px;
            }

            svg {
                fill: #6c5ce7;
            }

            &:disabled {
                border-color: #bbbec3;
                cursor: not-allowed;
            }

            &:disabled svg {
                fill: #bbbec3;
            }
        `,
        "visual-builder__add-button-label": u$1 `
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        `,
        "visual-builder__add-button--loading": u$1 `
            cursor: wait;
            /* we have not-allowed on disabled, so we need this */
            &:disabled {
                cursor: wait;
            }
        `,
        "visual-builder__start-editing-btn": u$1 `
            z-index: 1000;
            text-decoration: none;
            position: fixed;
            box-shadow:
                0px 4px 15px 0px rgba(108, 92, 231, 0.2),
                0px 3px 14px 3px rgba(0, 0, 0, 0.12),
                0px 8px 10px 1px rgba(0, 0, 0, 0.14);
            display: inline-flex;
            padding: 0.5rem 1rem;
            justify-content: center;
            align-items: center;
            gap: 0.5rem;

            border-radius: 4px;
            border: 1px solid transparent;
            background: #6c5ce7;
            transition:
                background-color 0.15s ease-in-out,
                border-color 0.15s ease-in-out,
                box-shadow 0.15s ease-in-out,
                -webkit-box-shadow 0.15s ease-in-out;

            &:hover {
                background-color: #5d50be;
            }
            &:focus {
                outline: none;
                box-shadow: 0 0 0 2px #ada4f4;
            }
            & > span {
                color: #fff;
                /* Body/P1 Bold */
                font-size: 1rem;
                font-family: Inter;
                font-weight: 600;
                line-height: 150%;
                letter-spacing: 0.01rem;
                text-transform: capitalize;
            }

            & > svg {
                color: #fff;
                font-size: 1rem;
                font-family: Inter;
                font-weight: 600;
                line-height: 150%;
                letter-spacing: 0.01rem;
                text-transform: capitalize;
            }
        `,
        "visual-builder__start-editing-btn__bottom-right": u$1 `
            bottom: 30px;
            right: 30px;
        `,
        "visual-builder__start-editing-btn__bottom-left": u$1 `
            bottom: 30px;
            left: 30px;
        `,
        "visual-builder__start-editing-btn__top-right": u$1 `
            top: 30px;
            right: 30px;
        `,
        "visual-builder__start-editing-btn__top-left": u$1 `
            top: 30px;
            left: 30px;
        `,
        "visual-builder__cursor-icon": u$1 `
            height: 40px;
            width: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #5d50be;
            border-radius: 50%;
            position: absolute;
            top: 0;
            left: 0;
        `,
        "visual-builder__cursor-pointer": u$1 `
            position: absolute;
            top: -8px;
            left: -8px;
        `,
        "visual-builder__cursor-icon--loader": u$1 `
            animation: visual-builder__spinner 1s linear infinite;
        `,
        "visual-builder__focused-toolbar": u$1 `
            position: absolute;
            transform: translateY(-100%);
            z-index: 100000;
            gap: 8px;
            width: 0;
            display: flex;
            align-items: end;
            transition: var(--outline-transition);
        `,
        "visual-builder__focused-toolbar__field-label-wrapper__current-field": u$1 `
            padding: 4px 8px !important;
            background: #6c5ce7;
            color: #fff;
            z-index: 1;
            border-radius: 2px !important;
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: fit-content;

            &:disabled {
                filter: contrast(0.7);
            }

            .visual-builder__focused-toolbar__text {
                padding-right: 3px;
                height: 16px;
            }
        `,
        "visual-builder__focused-toolbar__field-label-wrapper__parent-field": u$1 `
            pointer-events: none;
            color: #5d50be;
            padding: 4px !important;
            margin-bottom: 3px;
            display: none;
            width: fit-content;
            position: absolute;
            z-index: 100000;
        `,
        "field-label-dropdown-open": u$1 `
            .visual-builder__focused-toolbar__field-label-wrapper__parent-field {
                pointer-events: all;
                visibility: visible;
                display: initial;
            }

            .visual-builder__button--secondary:hover {
                background-color: #6c5ce7;
                color: #f9f8ff;
            }
        `,
        "visual-builder__focused-toolbar__field-label-wrapper": u$1 `
            display: flex;
            flex-direction: column-reverse;
            position: relative;
        `,
        "visual-builder__focused-toolbar__field-label-container": u$1 `
            display: flex;
            column-gap: 0.5rem;
            align-items: center;
        `,
        "visual-builder__button": u$1 `
            background-color: transparent;
            border: 1px solid transparent;
            border-radius: 4px;
            font-size: 16px;
            font-weight: 600;
            line-height: 100%;
            padding: 8px 16px;
            text-align: center;
            z-index: 2147483647 !important;
            transition:
                color 0.15s ease-in-out,
                background-color 0.15s ease-in-out,
                border-color 0.15s ease-in-out,
                box-shadow 0.15s ease-in-out;
            // vertical-align: middle;
            &:disabled {
                cursor: not-allowed;
                svg {
                    fill: #999;
                    path {
                        fill: #999;
                    }
                }
            }
        `,
        "visual-builder__button--primary": u$1 `
            background-color: #6c5ce7;
            color: #fff;

            &:hover {
                background-color: #5d50be;
            }
        `,
        "visual-builder__button--secondary": u$1 `
            background-color: #f9f8ff;
            border: 1px solid #6c5ce7;
            color: #6c5ce7;
        `,
        "visual-builder__button--edit": u$1 `
            svg {
                height: 16px;
                width: 16px;

                path {
                    fill: #475161;
                }
            }
        `,
        "visual-builder__button-loader": u$1 `
            svg.loader {
                height: 16px;
                width: 16px;

                path {
                    fill: #ffffff;
                }
            }
        `,
        "visual-builder__button--comment-loader": u$1 `
            cursor: wait !important;
            svg.loader {
                height: 16px;
                width: 16px;

                path {
                    fill: #475161;
                }
            }
        `,
        "visual-builder__field-icon": u$1 `
            svg {
                height: 16px;
                width: 16px;
                margin-right: 3px;
            }
        `,
        "visual-builder__content-type-icon": u$1 `
            svg {
                height: 16px;
                width: 16px;
                margin-right: 3px;
            }
        `,
        "visual-builder__caret-right-icon": u$1 `
            svg {
                height: 16px;
                width: 16px;
            }
        `,
        "visual-builder__reference-icon-container": u$1 `
            display: flex;
            align-items: center;

            .visual-builder__field-icon {
                svg {
                    margin-right: 0px;
                }            
            }
        `,
        "visual-builder__focused-toolbar__button-group": u$1 `
            display: flex;
            background: #fff;
            border-radius: 2px;
            height: 100%;
            padding: 4px !important;
            z-index: 2147483647 !important;

            &:has(.visual-builder__button) {
                padding: 2px;
                gap: 8px;
            }

            .visual-builder__button:enabled:hover {
                background-color: #f5f5f5;

                svg {
                    color: #5d50be;
                }
            }

            .visual-builder__button {
                background-color: #fff;
                border-color: transparent;
                color: #475161;
                padding: 4px;
                min-width: 32px;
                min-height: 32px;
            }
        `,
        "visual-builder__focused-toolbar__text": u$1 `
            font-family: Inter, "sans-serif";
            font-size: 0.75rem;
            font-style: normal;
            font-weight: 400;
            line-height: 150%;
            letter-spacing: 0.015rem;
            max-width: 150px;
            overflow: hidden;
            text-overflow: ellipsis;
            text-wrap: nowrap;
        `,
        "visual-builder__focused-toolbar__multiple-field-toolbar": u$1 `
            height: 40px;
            z-index: 2147483647 !important;

            svg {
                height: 100%;
                width: 100%;
            }
        `,
        "visual-builder__rotate--90": u$1 `
            transform: rotate(90deg);
        `,
        "visual-builder__focused-toolbar--field-disabled": u$1 `
            pointer-events: none;
            cursor: not-allowed;
            .visual-builder__focused-toolbar__field-label-wrapper__current-field {
                background: #909090;
            }
        `,
        "visual-builder__cursor-disabled": u$1 `
            .visual-builder__cursor-icon {
                background: #909090;
            }

            .visual-builder__cursor-pointer path {
                fill: #909090;
            }
        `,
        "visual-builder__tooltip": u$1 `
            ${tooltipBaseStyle}

            &:before {
                display: none;
            }

            &:hover:before,
            &:hover:after {
                display: block;
                z-index: 2147483647 !important;
            }

            &:after {
                display: none;
            }
        `,
        "visual-builder__tooltip--bottom": u$1 `
            &:before {
                bottom: -66px;
            }
            &:after {
                bottom: -6px;
                transform: rotate(180deg);
            }
        `,
        "visual-builder__tooltip--persistent": u$1 `
            ${tooltipBaseStyle}

            &:before {
                display: block;
            }

            &:after {
                display: block;
            }
        `,
        "visual-builder__empty-block": u$1 `
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            gap: 1rem;
            min-height: 100px;
        `,
        "visual-builder__empty-block-title": u$1 `
            font-size: 0.95rem;
            font-family: Inter;
            font-weight: 400;
            line-height: 100%;
            color: #647696;
        `,
        "visual-builder__empty-block-field-name": u$1 `
            font-weight: 700;
        `,
        "visual-builder__empty-block-add-button": u$1 `
            height: 32px;
            border-radius: 4px;
            background: #f9f8ff;
            border-color: #6c5ce7;
            border-width: 1px;
            padding: 0 16px;
            font-size: 0.9rem;
            font-family: Inter;
            font-weight: 600;
            color: #6c5ce7;
            letter-spacing: 0.01rem;
            display: inline-flex;
            align-items: center;
            justify-content: center;
        `,
        "visual-builder__hover-outline": u$1 `
            position: absolute;
            outline: 2px dashed #6c5ce7;
            transition: var(--outline-transition);
            z-index: 2147483646 !important;
        `,
        "visual-builder__hover-outline--hidden": u$1 `
            visibility: hidden;
        `,
        "visual-builder__hover-outline--unclickable": u$1 `
            pointer-events: none;
        `,
        "visual-builder__hover-outline--disabled": u$1 `
            outline: 2px dashed #909090;
        `,
        "visual-builder__default-cursor--disabled": u$1 `
            cursor: none;
        `,
        "visual-builder__draft-field": u$1 `
            outline: 2px dashed #eb5646;
        `,
        "visual-builder__variant-field": u$1 `
            outline: 2px solid #bd59fa;
        `,
        "visual-builder__pseudo-editable-element": u$1 `
            z-index: 99999 !important;
        `,
        // cslp error styles
        "visual-builder__button-error": u$1 `
            background-color: #ffeeeb;
            padding: 0px !important;
            &:hover {
                background-color: #ffeeeb;
            }
        `,
        "visual-builder__focused-toolbar__error": u$1 `
            display: flex;
            justify-content: center;
            align-items: center;
            column-gap: 3px;
            padding: 4px 8px;
        `,
        "visual-builder__focused-toolbar__error-text": u$1 `
            font-weight: 400;
            font-size: 12px;
            line-height: 18px;
            color: #a31b00;
        `,
        "visual-builder__focused-toolbar__error-toolip": u$1 `
            position: absolute;
            width: 400px;
            background-color: red;
            left: 0;
            top: -7px;
            transform: translateY(-100%);
            background-color: #767676;
            border-radius: 4px;
            box-shadow:
                0px 1px 10px 0px #6c5ce733,
                0px 5px 5px 0px #0000001f,
                0px 2px 4px 0px #00000024;
            padding: 12px;
            text-align: left;

            &:before {
                content: "";
                position: absolute;
                bottom: -3px;
                left: 4%;
                transform: translateX(-50%) rotate(45deg);
                width: 10px;
                height: 10px;
                background-color: #767676;
            }

            > p {
                margin: 0;
                color: #ffffff;
                font-size: 14px;
                font-weight: 600;
                line-height: 21px;
                margin-bottom: 4px;
            }

            > span {
                color: #ffffff;
                font-size: 12px;
                font-weight: 400;
                line-height: 18px;
            }
        `,
        "variant-field-revert-component": u$1 `
            position: relative;
            display: inline-block;
            z-index: 2147483647 !important;
        `,
        "variant-field-revert-component__dropdown-content": u$1 `
            position: absolute;
            top: -12px;
            left: -4px;
            background-color: #ffffff;
            min-width: max-content;
            box-shadow:
                0 4px 15px 0 rgba(108, 92, 231, 0.2),
                0 3px 14px 3px rgba(0, 0, 0, 0.12),
                0 8px 10px 1px rgba(0, 0, 0, 0.14);
            z-index: 2147483647 !important;
            margin-top: 4px;
            padding: 4px 0px;
            border-radius: 2px;
        `,
        "variant-field-revert-component__dropdown-content__list-item": u$1 `
            color: black;
            font-weight: 400;
            padding: 9.6px 16px;
            text-decoration: none;
            display: block;
            font-size: 0.75rem;
            height: 32px;
            line-height: 2rem;
            display: flex;
            align-items: center;
            z-index: 2147483647 !important;
            cursor: pointer;
            &:hover {
                background-color: #f1f1f1;
            }
            &:hover > span {
                color: #5d50be;
            }
            & > span {
                margin-top: 4px;
                margin-bottom: 4px;
            }
        `,
        "visual-builder__no-cursor-style": u$1 `
            cursor: none !important;
        `,
        "visual-builder__field-toolbar-container": u$1 `
            display: flex;
            flex-direction: column-reverse;
            z-index: 2147483647 !important;
            position: relative;
        `,
        "visual-builder__variant-button": u$1 `
            display: flex;
            min-width: 3rem !important;
            gap: 0.25rem;
            align-items: center;
            justify-content: center;
            display: flex;
            & svg path {
                fill: #475161;
            }
        `,
        "visual-builder__field-location-icons-container": u$1 `
            display: flex;
            gap: 0.25rem;
            align-items: center;
            justify-content: center;
            margin-left: 0.25rem;
            
        `,
        "visual-builder__field-location-icons-container__divider": u$1 `
            height: 32px !important;
            width: 1px;
            border-radius: 2px;
            background-color: #8a8f99;
        `,
        "visual-builder__field-location-icons-container__app-icon": u$1 `
            width: 24px;
            height: 24px;
            object-fit: cover;
        `,
        "visual-builder__field-location-app-list": u$1 `
            position: absolute;
            top: 0;
            background: #fff;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
            z-index: 1000;
            min-width: 230px;
            max-height: 250px;
            min-height: 250px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
        `,
        "visual-builder__field-location-app-list--left": u$1 `
            right: 100%;
            margin-right: 8px;
        `,
        "visual-builder__field-location-app-list--right": u$1 `
            left: 100%;
            margin-left: 8px;
        `,
        "visual-builder__field-location-app-list__search-container": u$1 `
            display: flex;
            align-items: center;
            padding: 10px 16px 0px 16px;
            border: none;
            border-bottom: 1px solid #f0f0f0;
        `,
        "visual-builder__field-location-app-list__search-input": u$1 `
            width: 100%;
            padding: 10px 12px;
            font-size: 14px;
            outline: none;
            box-sizing: border-box;
            border: none;
        `,
        "visual-builder__field-location-app-list__search-icon": u$1 `
            width: 14px;
            height: 14px;
        `,
        "visual-builder__field-location-app-list__content": u$1 `
            flex: 1;
            overflow-y: auto;
        `,
        "visual-builder__field-location-app-list__no-results": u$1 `
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            width: 100%;
            text-align: center;
        `,
        "visual-builder__field-location-app-list__no-results-text": u$1 `
            color: #373b40;
            font-weight: 400;
        `,
        "visual-builder__field-location-app-list__item": u$1 `
            display: flex;
            align-items: center;
            padding: 10px 16px;
            cursor: pointer;
            font-size: 14px;
        `,
        "visual-builder__field-location-app-list__item-icon-container": u$1 `
            width: 24px;
            height: 24px;
            margin-right: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
        `,
        "visual-builder__field-location-app-list__item-icon": u$1 `
            width: 24px;
            height: 24px;
            border-radius: 50%;
            object-fit: cover;
        `,
        "visual-builder__field-location-app-list__item-title": u$1 `
            color: #373b40;
            font-weight: 400;
        `,
    };
}
const VisualBuilderGlobalStyles = `
       @import url("https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap");

       [data-cslp] [contenteditable="true"] {
            outline: none;
        }

        @keyframes visual-builder__spinner {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }

`;

const generateIconStyles = ({ disabled = false }) => ({
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? "not-allowed" : "pointer",
});
function CaretIcon({ open = false }) {
    return (u("svg", { "data-testid": "visual-builder__caret-icon", width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", style: { transform: open ? "rotate(180deg)" : "rotate(0deg)" }, children: u("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M2.73483 5.73483C2.88128 5.58839 3.11872 5.58839 3.26517 5.73483L8 10.4697L12.7348 5.73483C12.8813 5.58839 13.1187 5.58839 13.2652 5.73483C13.4116 5.88128 13.4116 6.11872 13.2652 6.26517L8.26516 11.2652C8.11872 11.4116 7.88128 11.4116 7.73484 11.2652L2.73483 6.26517C2.58839 6.11872 2.58839 5.88128 2.73483 5.73483Z", fill: "white" }) }));
}
function DeleteIcon() {
    return (u("svg", { "data-testid": "visual-builder__delete-icon", width: "16", height: "16", viewBox: "0 0 16 16", fill: "currentColor", xmlns: "http://www.w3.org/2000/svg", children: [u("path", { d: "M6.5 6.125C6.70711 6.125 6.875 6.29289 6.875 6.5V10.5C6.875 10.7071 6.70711 10.875 6.5 10.875C6.29289 10.875 6.125 10.7071 6.125 10.5V6.5C6.125 6.29289 6.29289 6.125 6.5 6.125Z", fill: "currentColor" }), u("path", { d: "M9.875 6.5C9.875 6.29289 9.70711 6.125 9.5 6.125C9.29289 6.125 9.125 6.29289 9.125 6.5V10.5C9.125 10.7071 9.29289 10.875 9.5 10.875C9.70711 10.875 9.875 10.7071 9.875 10.5V6.5Z", fill: "currentColor" }), u("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M6.5 1.125C6.13533 1.125 5.78559 1.26987 5.52773 1.52773C5.26987 1.78559 5.125 2.13533 5.125 2.5V3.125H2.5C2.29289 3.125 2.125 3.29289 2.125 3.5C2.125 3.70711 2.29289 3.875 2.5 3.875H3.125V13C3.125 13.2321 3.21719 13.4546 3.38128 13.6187C3.54538 13.7828 3.76794 13.875 4 13.875H12C12.2321 13.875 12.4546 13.7828 12.6187 13.6187C12.7828 13.4546 12.875 13.2321 12.875 13V3.875H13.5C13.7071 3.875 13.875 3.70711 13.875 3.5C13.875 3.29289 13.7071 3.125 13.5 3.125H10.875V2.5C10.875 2.13533 10.7301 1.78559 10.4723 1.52773C10.2144 1.26987 9.86467 1.125 9.5 1.125H6.5ZM10.125 3.125V2.5C10.125 2.33424 10.0592 2.17527 9.94194 2.05806C9.82473 1.94085 9.66576 1.875 9.5 1.875H6.5C6.33424 1.875 6.17527 1.94085 6.05806 2.05806C5.94085 2.17527 5.875 2.33424 5.875 2.5V3.125H10.125ZM3.875 3.875V13C3.875 13.0332 3.88817 13.0649 3.91161 13.0884C3.93505 13.1118 3.96685 13.125 4 13.125H12C12.0332 13.125 12.0649 13.1118 12.0884 13.0884C12.1118 13.0649 12.125 13.0332 12.125 13V3.875H3.875Z", fill: "currentColor" })] }));
}
function FormIcon() {
    return (u("svg", { width: "17", height: "21", viewBox: "0 0 17 21", fill: "currentColor", xmlns: "http://www.w3.org/2000/svg", children: [u("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M5.75223 0.900517C5.05206 0.712906 4.33237 1.12842 4.14475 1.82859L3.44577 4.43724H1.75C1.02513 4.43724 0.4375 5.02486 0.4375 5.74974V19.2497C0.4375 19.9746 1.02513 20.5622 1.75 20.5622H12.25C12.9749 20.5622 13.5625 19.9746 13.5625 19.2497V17.3922L16.8225 5.22559C17.0101 4.52542 16.5946 3.80573 15.8945 3.61812L5.75223 0.900517ZM13.5625 13.0455L15.7359 4.93442C15.7627 4.8344 15.7033 4.73158 15.6033 4.70478L5.46106 1.98718C5.36104 1.96038 5.25822 2.01974 5.23142 2.11977L4.61046 4.43724H12.25C12.9749 4.43724 13.5625 5.02486 13.5625 5.74974V13.0455ZM1.5625 5.74974C1.5625 5.64618 1.64645 5.56224 1.75 5.56224H12.25C12.3536 5.56224 12.4375 5.64618 12.4375 5.74974V19.2497C12.4375 19.3533 12.3536 19.4372 12.25 19.4372H1.75C1.64645 19.4372 1.5625 19.3533 1.5625 19.2497V5.74974Z", fill: "currentColor" }), u("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M3.4375 8.74974C3.4375 8.43908 3.68934 8.18724 4 8.18724H10C10.3107 8.18724 10.5625 8.43908 10.5625 8.74974C10.5625 9.0604 10.3107 9.31224 10 9.31224H4C3.68934 9.31224 3.4375 9.0604 3.4375 8.74974Z", fill: "currentColor" }), u("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M3.4375 11.7497C3.4375 11.4391 3.68934 11.1872 4 11.1872H10C10.3107 11.1872 10.5625 11.4391 10.5625 11.7497C10.5625 12.0604 10.3107 12.3122 10 12.3122H4C3.68934 12.3122 3.4375 12.0604 3.4375 11.7497Z", fill: "currentColor" }), u("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M3.4375 14.7497C3.4375 14.4391 3.68934 14.1872 4 14.1872H10C10.3107 14.1872 10.5625 14.4391 10.5625 14.7497C10.5625 15.0604 10.3107 15.3122 10 15.3122H4C3.68934 15.3122 3.4375 15.0604 3.4375 14.7497Z", fill: "currentColor" })] }));
}
function MoveLeftIcon(props) {
    return (u("svg", { "data-testid": "visual-builder__move-left-icon", className: props.className, width: "16", height: "16", viewBox: "0 0 16 16", fill: "currentColor", xmlns: "http://www.w3.org/2000/svg", style: generateIconStyles(props), children: [u("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M2.125 8C2.125 7.79289 2.29289 7.625 2.5 7.625H13.5C13.7071 7.625 13.875 7.79289 13.875 8C13.875 8.20711 13.7071 8.375 13.5 8.375H2.5C2.29289 8.375 2.125 8.20711 2.125 8Z", fill: "currentColor" }), u("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M7.26516 3.23483C7.41161 3.38128 7.41161 3.61872 7.26516 3.76517L3.03033 8L7.26516 12.2348C7.41161 12.3813 7.41161 12.6187 7.26516 12.7652C7.11872 12.9116 6.88128 12.9116 6.73484 12.7652L2.23483 8.26516C2.08839 8.11872 2.08839 7.88128 2.23483 7.73484L6.73484 3.23483C6.88128 3.08839 7.11872 3.08839 7.26516 3.23483Z", fill: "currentColor" })] }));
}
function MoveRightIcon(props) {
    return (u("svg", { className: props.className, "data-testid": "visual-builder__move-right-icon", width: "16", height: "16", viewBox: "0 0 16 16", fill: "currentColor", xmlns: "http://www.w3.org/2000/svg", style: generateIconStyles(props), children: [u("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M2.125 8C2.125 7.79289 2.29289 7.625 2.5 7.625H13.5C13.7071 7.625 13.875 7.79289 13.875 8C13.875 8.20711 13.7071 8.375 13.5 8.375H2.5C2.29289 8.375 2.125 8.20711 2.125 8Z", fill: "currentColor" }), u("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M8.73484 3.23483C8.88128 3.08839 9.11872 3.08839 9.26516 3.23483L13.7652 7.73484C13.9116 7.88128 13.9116 8.11872 13.7652 8.26516L9.26516 12.7652C9.11872 12.9116 8.88128 12.9116 8.73484 12.7652C8.58839 12.6187 8.58839 12.3813 8.73484 12.2348L12.9697 8L8.73484 3.76517C8.58839 3.61872 8.58839 3.38128 8.73484 3.23483Z", fill: "currentColor" })] }));
}
function InfoIcon() {
    return (u("svg", { "data-testid": "visual-builder__info-icon", width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [u("path", { d: "M8 5.5C7.72386 5.5 7.5 5.72386 7.5 6C7.5 6.27614 7.72386 6.5 8 6.5C8.27614 6.5 8.5 6.27614 8.5 6C8.5 5.72386 8.27614 5.5 8 5.5Z", fill: "white" }), u("path", { d: "M8 10.875C7.79289 10.875 7.625 10.7071 7.625 10.5V7.5C7.625 7.29289 7.79289 7.125 8 7.125C8.20711 7.125 8.375 7.29289 8.375 7.5V10.5C8.375 10.7071 8.20711 10.875 8 10.875Z", fill: "white" }), u("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8ZM13.25 8C13.25 10.8995 10.8995 13.25 8 13.25C5.10051 13.25 2.75 10.8995 2.75 8C2.75 5.10051 5.10051 2.75 8 2.75C10.8995 2.75 13.25 5.10051 13.25 8Z", fill: "white" })] }));
}
function EditIcon() {
    return (u("svg", { "data-testid": "visual-builder__edit-icon", width: "24", height: "24", viewBox: "0 0 24 24", fill: "currentColor", xmlns: "http://www.w3.org/2000/svg", children: u("g", { id: "Edit", children: u("path", { id: "Edit_2", "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M3.58347 15.3803C3.35617 15.6076 3.22019 15.9104 3.20131 16.2313L3.00244 19.6122C2.95629 20.3967 3.60524 21.0456 4.38975 20.9995L7.7706 20.8006C8.0915 20.7817 8.39431 20.6458 8.62161 20.4185L20.6176 8.4225C21.1301 7.90993 21.1301 7.07891 20.6176 6.56634L17.4356 3.38436C16.923 2.8718 16.092 2.8718 15.5794 3.38436L3.58347 15.3803ZM4.32437 16.2974C4.32707 16.2515 4.3465 16.2083 4.37897 16.1758L14.2003 6.35446L17.4954 9.64949C17.5492 9.70337 17.6113 9.74403 17.6776 9.77148L7.82611 19.623C7.79364 19.6554 7.75038 19.6749 7.70454 19.6776L4.32369 19.8764C4.21161 19.883 4.11891 19.7903 4.1255 19.6782L4.32437 16.2974ZM18.4128 9.03624L19.8221 7.627C19.8953 7.55378 19.8953 7.43506 19.8221 7.36184L16.6401 4.17986C16.5669 4.10663 16.4481 4.10663 16.3749 4.17986L14.9958 5.55897L18.2908 8.854C18.3447 8.90788 18.3854 8.96996 18.4128 9.03624Z", fill: "currentColor" }) }) }));
}
function PlusIcon() {
    return (u("svg", { "data-testid": "visual-builder__plus-icon", xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 20 20", children: u("path", { d: "M10.4688 4.375C10.4688 4.11612 10.259 3.90625 10.0001 3.90625C9.74121 3.90625 9.53135 4.11612 9.53135 4.375V9.27307H4.37402C4.11514 9.27307 3.90527 9.48294 3.90527 9.74182C3.90527 10.0007 4.11514 10.2106 4.37402 10.2106H9.53135V15.625C9.53135 15.8839 9.74121 16.0937 10.0001 16.0937C10.259 16.0937 10.4688 15.8839 10.4688 15.625V10.2106H15.6259C15.8847 10.2106 16.0946 10.0007 16.0946 9.74182C16.0946 9.48294 15.8847 9.27307 15.6259 9.27307H10.4688V4.375Z" }) }));
}
function ReplaceAssetIcon() {
    return (u("svg", { width: "18", height: "18", viewBox: "-1 -1 20 20", fill: "currentColor", xmlns: "http://www.w3.org/2000/svg", children: [u("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M9.88235 1.23529C9.88235 0.942908 10.1194 0.705882 10.4118 0.705882H14.1641C14.8463 0.705882 15.3994 1.25894 15.3994 1.94118V6.47441L17.1363 5.06006C17.363 4.87544 17.6965 4.90958 17.8811 5.1363C18.0657 5.36303 18.0316 5.69649 17.8049 5.88111L15.2042 7.99876C15.0096 8.15728 14.7303 8.15728 14.5357 7.99876L11.9351 5.88111C11.7083 5.69649 11.6742 5.36303 11.8588 5.1363C12.0434 4.90958 12.3769 4.87544 12.6036 5.06006L14.3405 6.47441V1.94118C14.3405 1.84371 14.2615 1.76471 14.1641 1.76471H10.4118C10.1194 1.76471 9.88235 1.52768 9.88235 1.23529Z", fill: "currentColor" }), u("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M8.11765 16.7647C8.11765 17.0571 7.88062 17.2941 7.58824 17.2941H3.83592C3.15369 17.2941 2.60063 16.7411 2.60063 16.0588V11.5256L0.863711 12.9399C0.636985 13.1246 0.303523 13.0904 0.118903 12.8637C-0.0657165 12.637 -0.0315828 12.3035 0.195144 12.1189L2.79576 10.0012C2.99043 9.84272 3.26966 9.84272 3.46433 10.0012L6.06494 12.1189C6.29167 12.3035 6.3258 12.637 6.14118 12.8637C5.95656 13.0904 5.6231 13.1246 5.39637 12.9399L3.65945 11.5256V16.0588C3.65945 16.1563 3.73846 16.2353 3.83592 16.2353H7.58824C7.88062 16.2353 8.11765 16.4723 8.11765 16.7647Z", fill: "currentColor" }), u("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M8.11765 1.23529C8.11765 0.55306 7.56459 0 6.88236 0H1.23531C0.553077 0 1.69415e-05 0.55306 1.69415e-05 1.23529V6.88235C1.69415e-05 7.56459 0.553076 8.11765 1.23531 8.11765H6.88236C7.56459 8.11765 8.11765 7.56459 8.11765 6.88235V1.23529ZM6.88236 1.05882C6.97982 1.05882 7.05883 1.13783 7.05883 1.23529V6.88235C7.05883 6.97982 6.97982 7.05882 6.88236 7.05882H1.23531C1.13785 7.05882 1.05884 6.97982 1.05884 6.88235V1.23529C1.05884 1.13783 1.13785 1.05882 1.23531 1.05882H6.88236Z", fill: "currentColor" }), u("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M18 11.1176C18 10.4354 17.4469 9.88235 16.7647 9.88235H11.1176C10.4354 9.88235 9.88235 10.4354 9.88235 11.1176V16.7647C9.88235 17.4469 10.4354 18 11.1176 18H16.7647C17.4469 18 18 17.4469 18 16.7647V11.1176ZM16.7647 10.9412C16.8622 10.9412 16.9412 11.0202 16.9412 11.1176V16.7647C16.9412 16.8622 16.8622 16.9412 16.7647 16.9412H11.1176C11.0202 16.9412 10.9412 16.8622 10.9412 16.7647V11.1176C10.9412 11.0202 11.0202 10.9412 11.1176 10.9412H16.7647Z", fill: "currentColor" })] }));
}
function HighlightCommentIcon() {
    return (u("svg", { className: "collab-icon__svg", width: "50", height: "50", viewBox: "0 0 50 50", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [u("g", { className: "collab-icon__svg", filter: "url(#filter0_d_13652_461491)", children: u("circle", { className: "collab-icon__svg", cx: "25", cy: "21", r: "21", fill: "#777777", "fill-opacity": "0.84", "shape-rendering": "crispEdges" }) }), u("path", { className: "collab-icon__svg", d: "M21.4375 20C21.4375 19.6893 21.6893 19.4375 22 19.4375H28C28.3107 19.4375 28.5625 19.6893 28.5625 20C28.5625 20.3107 28.3107 20.5625 28 20.5625H22C21.6893 20.5625 21.4375 20.3107 21.4375 20Z", fill: "white" }), u("path", { className: "collab-icon__svg", d: "M21.4375 23C21.4375 22.6893 21.6893 22.4375 22 22.4375H28C28.3107 22.4375 28.5625 22.6893 28.5625 23C28.5625 23.3107 28.3107 23.5625 28 23.5625H22C21.6893 23.5625 21.4375 23.3107 21.4375 23Z", fill: "white" }), u("path", { className: "collab-icon__svg", "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M16 16.25C16 15.8358 16.3358 15.5 16.75 15.5H33.25C33.6642 15.5 34 15.8358 34 16.25V27.4423C34 27.8565 33.6642 28.1923 33.25 28.1923H27.9804C27.853 28.1923 27.7343 28.257 27.6652 28.3641L25.9633 31.0042C25.6651 31.4669 24.9866 31.4613 24.696 30.9938L23.1746 28.5464C23.0378 28.3262 22.7969 28.1923 22.5377 28.1923H16.75C16.3358 28.1923 16 27.8565 16 27.4423V16.25ZM17.125 27.0673V16.625H32.875V27.0673H27.9804C27.4707 27.0673 26.9958 27.3262 26.7197 27.7546L25.3387 29.8968L24.1301 27.9524C23.7879 27.402 23.1858 27.0673 22.5377 27.0673H17.125Z", fill: "white" }), u("circle", { className: "collab-icon__svg", cx: "34", cy: "15", r: "4", fill: "#EB5646" }), u("circle", { className: "collab-icon__svg", cx: "34", cy: "15", r: "4.5", stroke: "white", "stroke-opacity": "0.6" }), u("defs", { className: "collab-icon__svg", children: u("filter", { className: "collab-icon__svg", id: "filter0_d_13652_461491", x: "0", y: "0", width: "50", height: "50", filterUnits: "userSpaceOnUse", "color-interpolation-filters": "sRGB", children: [u("feFlood", { className: "collab-icon__svg", "flood-opacity": "0", result: "BackgroundImageFix" }), u("feColorMatrix", { className: "collab-icon__svg", in: "SourceAlpha", type: "matrix", values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0", result: "hardAlpha" }), u("feOffset", { className: "collab-icon__svg", dy: "4" }), u("feGaussianBlur", { className: "collab-icon__svg", stdDeviation: "2" }), u("feComposite", { className: "collab-icon__svg", in2: "hardAlpha", operator: "out" }), u("feColorMatrix", { className: "collab-icon__svg", type: "matrix", values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" }), u("feBlend", { className: "collab-icon__svg", mode: "normal", in2: "BackgroundImageFix", result: "effect1_dropShadow_13652_461491" }), u("feBlend", { className: "collab-icon__svg", mode: "normal", in: "SourceGraphic", in2: "effect1_dropShadow_13652_461491", result: "shape" })] }) })] }));
}
function ReadCommentIcon() {
    return (u("svg", { width: "24", height: "24", viewBox: "0 0 32 32", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [u("path", { d: "M11.25 12C11.25 11.5858 11.5858 11.25 12 11.25H20C20.4142 11.25 20.75 11.5858 20.75 12C20.75 12.4142 20.4142 12.75 20 12.75H12C11.5858 12.75 11.25 12.4142 11.25 12Z", fill: "#475161" }), u("path", { d: "M11.25 16C11.25 15.5858 11.5858 15.25 12 15.25H20C20.4142 15.25 20.75 15.5858 20.75 16C20.75 16.4142 20.4142 16.75 20 16.75H12C11.5858 16.75 11.25 16.4142 11.25 16Z", fill: "#475161" }), u("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M4 7C4 6.44772 4.44772 6 5 6H27C27.5523 6 28 6.44772 28 7V21.9231C28 22.4754 27.5523 22.9231 27 22.9231H19.9739C19.804 22.9231 19.6457 23.0094 19.5536 23.1522L17.2844 26.6723C16.8868 27.2892 15.9821 27.2818 15.5946 26.6584L13.5662 23.3952C13.3837 23.1016 13.0625 22.9231 12.7169 22.9231H5C4.44771 22.9231 4 22.4754 4 21.9231V7ZM5.5 21.4231V7.5H26.5V21.4231H19.9739C19.2942 21.4231 18.6611 21.7682 18.2929 22.3395L16.4516 25.1958L14.8401 22.6033C14.3839 21.8694 13.581 21.4231 12.7169 21.4231H5.5Z", fill: "#475161" })] }));
}
function AddCommentIcon() {
    return (u("svg", { width: "24", height: "24", viewBox: "0 0 32 32", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [u("path", { d: "M16 10.25C16.4142 10.25 16.75 10.5858 16.75 11V13.25H19C19.4142 13.25 19.75 13.5858 19.75 14C19.75 14.4142 19.4142 14.75 19 14.75H16.75V17C16.75 17.4142 16.4142 17.75 16 17.75C15.5858 17.75 15.25 17.4142 15.25 17V14.75H13C12.5858 14.75 12.25 14.4142 12.25 14C12.25 13.5858 12.5858 13.25 13 13.25H15.25V11C15.25 10.5858 15.5858 10.25 16 10.25Z", fill: "#475161" }), u("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M4 7C4 6.44772 4.44772 6 5 6H27C27.5523 6 28 6.44772 28 7V21.9231C28 22.4754 27.5523 22.9231 27 22.9231H19.9739C19.804 22.9231 19.6457 23.0094 19.5536 23.1522L17.2844 26.6723C16.8868 27.2892 15.9821 27.2818 15.5946 26.6584L13.5662 23.3952C13.3837 23.1016 13.0625 22.9231 12.7169 22.9231H5C4.44771 22.9231 4 22.4754 4 21.9231V7ZM5.5 21.4231V7.5H26.5V21.4231H19.9739C19.2942 21.4231 18.6611 21.7682 18.2929 22.3395L16.4516 25.1958L14.8401 22.6033C14.3839 21.8694 13.581 21.4231 12.7169 21.4231H5.5Z", fill: "#475161" })] }));
}
function WarningOctagonIcon() {
    return (u("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [u("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M8.49999 5.00389C8.71574 5.00389 8.89065 5.1788 8.89065 5.39456V9.04076C8.89065 9.25652 8.71574 9.43142 8.49999 9.43142C8.28423 9.43142 8.10932 9.25652 8.10932 9.04076V5.39456C8.10932 5.1788 8.28423 5.00389 8.49999 5.00389Z", fill: "#A31B00" }), u("path", { d: "M8.49999 12.0359C8.85958 12.0359 9.15109 11.7443 9.15109 11.3847C9.15109 11.0252 8.85958 10.7336 8.49999 10.7336C8.14039 10.7336 7.84888 11.0252 7.84888 11.3847C7.84888 11.7443 8.14039 12.0359 8.49999 12.0359Z", fill: "#A31B00" }), u("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M5.54062 2.26699C5.71157 2.09604 5.94343 2 6.18519 2L10.8148 2C11.0566 2 11.2884 2.09604 11.4594 2.26699L14.733 5.54062C14.904 5.71157 15 5.94343 15 6.18519L15 10.8148C15 11.0566 14.904 11.2884 14.733 11.4594L11.4594 14.733C11.2884 14.904 11.0566 15 10.8148 15L6.18519 15C5.94343 15 5.71157 14.904 5.54062 14.733L2.26699 11.4594C2.09604 11.2884 2 11.0566 2 10.8148L2 6.18519C2 5.94343 2.09604 5.71157 2.26699 5.54062L5.54062 2.26699ZM6.18519 2.78133C6.15065 2.78133 6.11753 2.79505 6.09311 2.81947L2.81947 6.09311C2.79505 6.11753 2.78133 6.15065 2.78133 6.18519V10.8148C2.78133 10.8493 2.79505 10.8825 2.81947 10.9069L6.09311 14.1805C6.11753 14.205 6.15065 14.2187 6.18519 14.2187H10.8148C10.8493 14.2187 10.8825 14.205 10.9069 14.1805L14.1805 10.9069C14.205 10.8825 14.2187 10.8493 14.2187 10.8148V6.18519C14.2187 6.15065 14.205 6.11753 14.1805 6.09311L10.9069 2.81947C10.8825 2.79505 10.8493 2.78133 10.8148 2.78133L6.18519 2.78133Z", fill: "#A31B00" })] }));
}
function MoreIcon() {
    return (u("svg", { width: "32", height: "32", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [u("circle", { cx: "12", cy: "6", r: "2", fill: "#475161" }), u("circle", { cx: "12", cy: "12", r: "2", fill: "#475161" }), u("circle", { cx: "12", cy: "18", r: "2", fill: "#475161" })] }));
}
function ContentTypeIcon() {
    return (u("div", { className: classNames("visual-builder__content-type-icon", visualBuilderStyles()["visual-builder__content-type-icon"]), children: u("svg", { width: "32", height: "32", viewBox: "0 0 32 32", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [u("path", { d: "M4 22L16 29L28 22", stroke: "#fff", "stroke-width": "1.5", "stroke-linecap": "round", "stroke-linejoin": "round" }), u("path", { d: "M4 16L16 23L28 16", stroke: "#fff", "stroke-width": "1.5", "stroke-linecap": "round", "stroke-linejoin": "round" }), u("path", { d: "M4 10L16 17L28 10L16 3L4 10Z", stroke: "#fff", "stroke-width": "1.5", "stroke-linecap": "round", "stroke-linejoin": "round" })] }) }));
}
function CaretRightIcon() {
    return (u("div", { className: classNames("visual-builder__caret-right-icon", visualBuilderStyles()["visual-builder__caret-right-icon"]), children: u("svg", { width: "32", height: "32", viewBox: "0 0 32 32", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: u("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M11.4697 5.46967C11.7626 5.17678 12.2374 5.17678 12.5303 5.46967L22.5303 15.4697C22.8232 15.7626 22.8232 16.2374 22.5303 16.5303L12.5303 26.5303C12.2374 26.8232 11.7626 26.8232 11.4697 26.5303C11.1768 26.2374 11.1768 25.7626 11.4697 25.4697L20.9393 16L11.4697 6.53033C11.1768 6.23744 11.1768 5.76256 11.4697 5.46967Z", fill: "#fff" }) }) }));
}

const positionStyles = {
    "bottom-right": visualBuilderStyles()['visual-builder__start-editing-btn__bottom-right'],
    "bottom-left": visualBuilderStyles()['visual-builder__start-editing-btn__bottom-left'],
    "top-left": visualBuilderStyles()['visual-builder__start-editing-btn__top-left'],
    "top-right": visualBuilderStyles()['visual-builder__start-editing-btn__top-right'],
};
function getEditButtonPosition(position) {
    const validPositions = ['bottom-left', 'bottom-right', 'top-left', 'top-right'];
    if (validPositions.includes(position)) {
        return position;
    }
    else {
        return "bottom-right";
    }
}
function StartEditingButtonComponent() {
    const config = Config.get();
    const enable = config.editInVisualBuilderButton.enable;
    const position = config.editInVisualBuilderButton.position || "bottom-right";
    function updateTargetUrl(e) {
        const targetElement = e.target;
        targetElement.setAttribute("href", getVisualBuilderRedirectionUrl().toString());
    }
    return enable ? (u("a", { href: getVisualBuilderRedirectionUrl().toString(), className: classNames("visual-builder__start-editing-btn", visualBuilderStyles()["visual-builder__start-editing-btn"], positionStyles[getEditButtonPosition(position)]), "data-testid": "vcms-start-editing-btn", onMouseEnter: (e) => updateTargetUrl(e), onFocus: (e) => updateTargetUrl(e), onClick: (e) => updateTargetUrl(e), children: [u(EditIcon, {}), u("span", { children: "Start Editing" })] })) : null;
}

/**
 * Generates a start editing button for the visual builder.
 *
 * @returns The generated HTMLAnchorElement representing the start editing button, or undefined if the button cannot be created.
 */
function generateStartEditingButton() {
    const existingButton = document.querySelector(".visual-builder__start-editing-btn");
    if (existingButton) {
        return existingButton;
    }
    const wrapper = document.createDocumentFragment();
    B$2(u(StartEditingButtonComponent, {}), wrapper);
    if (wrapper.children.length === 0) {
        return undefined;
    }
    document.body.appendChild(wrapper);
    const startEditingButton = document.querySelector(".visual-builder__start-editing-btn");
    return startEditingButton;
}

var FieldDataType;
(function (FieldDataType) {
    FieldDataType["CUSTOM_FIELD"] = "custom_field";
    FieldDataType["MULTILINE"] = "multiline";
    FieldDataType["HTML_RTE"] = "html_rte";
    FieldDataType["MARKDOWN_RTE"] = "markdown_rte";
    FieldDataType["SELECT"] = "select";
    FieldDataType["URL"] = "url";
    FieldDataType["SINGLELINE"] = "singleline";
    FieldDataType["JSON_RTE"] = "json_rte";
    FieldDataType["MODULAR_BLOCK"] = "modular_block";
    FieldDataType["LINK"] = "link";
    FieldDataType["ISODATE"] = "isodate";
    FieldDataType["BOOLEAN"] = "boolean";
    FieldDataType["BLOCK"] = "block";
    FieldDataType["NUMBER"] = "number";
    FieldDataType["REFERENCE"] = "reference";
    FieldDataType["GROUP"] = "group";
    FieldDataType["EXPERIENCE_CONTAINER"] = "experience_container";
    FieldDataType["FILE"] = "file";
    FieldDataType["GLOBAL_FIELD"] = "global_field";
    FieldDataType["TAXONOMY"] = "taxonomy";
})(FieldDataType || (FieldDataType = {}));

const numericInputRegex = /^-?\d*(\.\d*)?([eE][-+]?\d*)?$/;
const VISUAL_BUILDER_FIELD_TYPE_ATTRIBUTE_KEY = "data-cslp-field-type";
const VISUAL_BUILDER_CHANNEL_ID = "visual-builder";
const LIVE_PREVIEW_OUTLINE_WIDTH_IN_PX = 2;
// Minimum distance from top edge to prevent toolbar from being hidden
const TOP_EDGE_BUFFER = 42;
const RIGHT_EDGE_BUFFER = 180;
const TOOLBAR_EDGE_BUFFER = 8;
const DATA_CSLP_ATTR_SELECTOR = "data-cslp";
/**
 * The field that can be directly modified using contenteditable=true.
 * This includes all text fields like title and numbers.
 */
const ALLOWED_INLINE_EDITABLE_FIELD = [
    FieldDataType.SINGLELINE,
    FieldDataType.MULTILINE,
    FieldDataType.NUMBER,
];
const ALLOWED_MODAL_EDITABLE_FIELD = [
    FieldDataType.HTML_RTE,
    FieldDataType.MARKDOWN_RTE,
    FieldDataType.JSON_RTE,
    FieldDataType.CUSTOM_FIELD,
    FieldDataType.LINK,
    FieldDataType.ISODATE,
    FieldDataType.URL,
];
const ALLOWED_REPLACE_FIELDS = [
    FieldDataType.REFERENCE,
    FieldDataType.FILE,
];
[
    FieldDataType.GLOBAL_FIELD,
    FieldDataType.GROUP,
    FieldDataType.BLOCK,
];
const unicodeNonBreakingSpace = "\u00A0";
const mentionLimit = 20;
const maxMessageLength = 500;

let visualBuilderPostMessage;
if (typeof window !== "undefined") {
    visualBuilderPostMessage = new distExports.EventManager(VISUAL_BUILDER_CHANNEL_ID, {
        target: window.parent,
        debug: false,
        // suppressErrors: true,
    });
}
var visualBuilderPostMessage$1 = visualBuilderPostMessage;

var VisualBuilderPostMessageEvents;
(function (VisualBuilderPostMessageEvents) {
    VisualBuilderPostMessageEvents["INIT"] = "init";
    VisualBuilderPostMessageEvents["ADD_INSTANCE"] = "add-instance";
    VisualBuilderPostMessageEvents["UPDATE_FIELD"] = "update-field";
    VisualBuilderPostMessageEvents["SYNC_FIELD"] = "sync-field";
    VisualBuilderPostMessageEvents["OPEN_ASSET_MODAL"] = "open-asset-modal";
    VisualBuilderPostMessageEvents["OPEN_REFERENCE_MODAL"] = "open-reference-modal";
    VisualBuilderPostMessageEvents["OPEN_QUICK_FORM"] = "open-quick-form";
    VisualBuilderPostMessageEvents["TOGGLE_FORM"] = "toggle-quick-form";
    VisualBuilderPostMessageEvents["GET_FIELD_SCHEMA"] = "get-field-schema";
    VisualBuilderPostMessageEvents["GET_FIELD_DATA"] = "get-field-data";
    VisualBuilderPostMessageEvents["GET_FIELD_PATH_WITH_UID"] = "get-field-path-with-uid";
    VisualBuilderPostMessageEvents["GET_FIELD_DISPLAY_NAMES"] = "get-field-display-names";
    VisualBuilderPostMessageEvents["MOUSE_CLICK"] = "mouse-click";
    VisualBuilderPostMessageEvents["FOCUS_FIELD"] = "focus-field";
    VisualBuilderPostMessageEvents["OPEN_FIELD_EDIT_MODAL"] = "open-field-edit-modal";
    VisualBuilderPostMessageEvents["DELETE_INSTANCE"] = "delete-instance";
    VisualBuilderPostMessageEvents["MOVE_INSTANCE"] = "move-instance";
    VisualBuilderPostMessageEvents["GET_DISCUSSION_ID"] = "get-discussion-id-for-comment-modal";
    VisualBuilderPostMessageEvents["OPEN_FIELD_COMMENT_MODAL"] = "open-field-comment-modal";
    VisualBuilderPostMessageEvents["COLLAB_CREATE_THREAD"] = "collab-create-thread";
    VisualBuilderPostMessageEvents["COLLAB_CREATE_COMMENT"] = "collab-create-comment";
    VisualBuilderPostMessageEvents["COLLAB_FETCH_COMMENTS"] = "collab-fetch-comments";
    VisualBuilderPostMessageEvents["COLLAB_EDIT_COMMENT"] = "collab-edit-comment";
    VisualBuilderPostMessageEvents["COLLAB_DELETE_COMMENT"] = "collab-delete-comment";
    VisualBuilderPostMessageEvents["COLLAB_RESOLVE_THREAD"] = "collab-resolve-thread";
    VisualBuilderPostMessageEvents["COLLAB_DELETE_THREAD"] = "collab-delete-thread";
    VisualBuilderPostMessageEvents["COLLAB_MISSING_THREADS"] = "collab-missing-threads";
    VisualBuilderPostMessageEvents["FIELD_LOCATION_DATA"] = "field-location-data";
    VisualBuilderPostMessageEvents["FIELD_LOCATION_SELECTED_APP"] = "field-location-selected-app";
    // FROM visual builder
    VisualBuilderPostMessageEvents["GET_ALL_ENTRIES_IN_CURRENT_PAGE"] = "get-entries-in-current-page";
    VisualBuilderPostMessageEvents["HIDE_FOCUS_OVERLAY"] = "hide-focus-overlay";
    VisualBuilderPostMessageEvents["SHOW_DRAFT_FIELDS"] = "show-draft-fields";
    VisualBuilderPostMessageEvents["REMOVE_DRAFT_FIELDS"] = "remove-draft-fields";
    VisualBuilderPostMessageEvents["SHOW_VARIANT_FIELDS"] = "show-variant-fields";
    VisualBuilderPostMessageEvents["REMOVE_VARIANT_FIELDS"] = "remove-variant-fields";
    VisualBuilderPostMessageEvents["SET_AUDIENCE_MODE"] = "set-audience-mode";
    VisualBuilderPostMessageEvents["UPDATE_DISCUSSION_ID"] = "update-discussion-id-for-focus-field";
    VisualBuilderPostMessageEvents["SCROLL_TO_FIELD"] = "scroll-to-view-field-by-cslp-value";
    VisualBuilderPostMessageEvents["HIGHLIGHT_ACTIVE_COMMENTS"] = "highlight-active-comments-by-data-cs";
    VisualBuilderPostMessageEvents["REMOVE_HIGHLIGHTED_COMMENTS"] = "remove-highlighted-comments";
    VisualBuilderPostMessageEvents["GET_VARIANT_ID"] = "get-variant-id";
    VisualBuilderPostMessageEvents["GET_LOCALE"] = "get-locale";
    VisualBuilderPostMessageEvents["SEND_VARIANT_AND_LOCALE"] = "send-variant-and-locale";
    VisualBuilderPostMessageEvents["GET_CONTENT_TYPE_NAME"] = "get-content-type-name";
    VisualBuilderPostMessageEvents["REFERENCE_MAP"] = "get-reference-map";
    VisualBuilderPostMessageEvents["COLLAB_ENABLE"] = "collab-enable";
    VisualBuilderPostMessageEvents["COLLAB_DATA_UPDATE"] = "collab-data-update";
    VisualBuilderPostMessageEvents["COLLAB_DISABLE"] = "collab-disable";
    VisualBuilderPostMessageEvents["COLLAB_THREADS_REMOVE"] = "collab-threads-remove";
    VisualBuilderPostMessageEvents["COLLAB_THREAD_REOPEN"] = "collab-thread-reopen";
    VisualBuilderPostMessageEvents["COLLAB_THREAD_HIGHLIGHT"] = "collab-thread-highlight";
    VisualBuilderPostMessageEvents["TOGGLE_SCROLL"] = "toggle-scroll";
})(VisualBuilderPostMessageEvents || (VisualBuilderPostMessageEvents = {}));

/**
 * Represents a cache for field schemas. Field schemas are
 * used to easily get the field schema based on the field
 * Cslp.
 */
class FieldSchemaMap {
    static async fetchFieldSchema(content_type_uid) {
        if (!FieldSchemaMap.fieldSchemaPromise?.[content_type_uid]) {
            FieldSchemaMap.fieldSchemaPromise[content_type_uid] =
                visualBuilderPostMessage$1?.send(VisualBuilderPostMessageEvents.GET_FIELD_SCHEMA, {
                    contentTypeUid: content_type_uid,
                });
        }
        return FieldSchemaMap.fieldSchemaPromise[content_type_uid];
    }
    /**
     * Retrieves the schema field map for a given content type and field Cslp.
     * @param contentTypeUid - The unique identifier of the content type.
     * @param fieldCslp - The Cslp of the field.
     * @returns The schema field map.
     */
    static async getFieldSchema(contentTypeUid, fieldCslp) {
        if (FieldSchemaMap.hasFieldSchema(contentTypeUid, fieldCslp)) {
            return Promise.resolve(FieldSchemaMap.fieldSchema[contentTypeUid][fieldCslp]);
        }
        const data = await FieldSchemaMap.fetchFieldSchema(contentTypeUid);
        if (data?.fieldSchemaMap) {
            FieldSchemaMap.fieldSchema[contentTypeUid] = data.fieldSchemaMap;
        }
        return FieldSchemaMap?.fieldSchema?.[contentTypeUid]?.[fieldCslp] || null;
    }
    static hasFieldSchema(contentTypeUid, fieldCslp) {
        return has(FieldSchemaMap.fieldSchema, [contentTypeUid, fieldCslp]);
    }
    /**
     * Checks if two field schemas are equal.
     * @param firstFieldSchema - The first field schema to compare.
     * @param secondFieldSchema - The second field schema to compare.
     * @returns True if the field schemas are equal, false otherwise.
     */
    static areFieldSchemaEqual(firstFieldSchema, secondFieldSchema) {
        return isEqual(firstFieldSchema, secondFieldSchema);
    }
    /**
     * Sets the field schema for a given content type.
     * @param contentTypeUid The unique identifier of the content type.
     * @param fieldSchemaMap The map of individual field schemas.
     */
    static setFieldSchema(contentTypeUid, fieldSchemaMap) {
        FieldSchemaMap.fieldSchema[contentTypeUid] = fieldSchemaMap;
    }
    /**
     * Clears the field schema cache.
     */
    static clear() {
        FieldSchemaMap.fieldSchema = {};
        FieldSchemaMap.fieldSchemaPromise = {};
    }
}
FieldSchemaMap.fieldSchema = {};
FieldSchemaMap.fieldSchemaPromise = {};

function hasPostMessageError(obj) {
    return obj?.error === true;
}

/**
 * Retrieves the expected field data based on the provided field metadata.
 *
 * @param fieldMetadata The metadata of the field.
 * @param entryPath The path in the entry for which the value must be returned.
 * @returns A promise that resolves to the expected field data as a string.
 */
async function getFieldData(fieldMetadata, entryPath) {
    const data = await visualBuilderPostMessage$1?.send(VisualBuilderPostMessageEvents.GET_FIELD_DATA, { fieldMetadata, entryPath: entryPath ?? "" });
    if (hasPostMessageError(data)) {
        return "";
    }
    // toString from lodash
    // return toString(data?.fieldData);
    return data?.fieldData;
}

// @ts-nocheck
function getFieldType(fieldSchema) {
    if (!fieldSchema)
        return;
    if (Object.hasOwnProperty.call(fieldSchema, "extension_uid")) {
        return FieldDataType.CUSTOM_FIELD;
    }
    switch (fieldSchema.data_type) {
        case "text": {
            if (fieldSchema.field_metadata?.multiline) {
                return FieldDataType.MULTILINE;
            }
            else if (fieldSchema.field_metadata?.allow_rich_text) {
                return FieldDataType.HTML_RTE;
            }
            else if (fieldSchema.field_metadata?.markdown) {
                return FieldDataType.MARKDOWN_RTE;
            }
            else if (fieldSchema.enum) {
                return FieldDataType.SELECT;
            }
            else if (fieldSchema.uid === "url" &&
                fieldSchema.field_metadata?._default) {
                return FieldDataType.URL;
            }
            else {
                return FieldDataType.SINGLELINE;
            }
        }
        case "json": {
            if (fieldSchema.field_metadata?.allow_json_rte) {
                return FieldDataType.JSON_RTE;
            }
            break;
        }
        case "blocks": {
            return "modular_block";
        }
        case "link":
        case "isodate":
        case "boolean":
        case "block":
        case "number":
        case "reference":
        case "group":
        case "experience_container":
        case "file":
        case "taxonomy":
        case "global_field": {
            return FieldDataType[fieldSchema.data_type.toUpperCase()];
        }
    }
    return "";
}

function insertSpaceAtCursor(element) {
    // Check if the browser supports modern selection API
    const selection = window.getSelection();
    // Ensure there's a valid selection
    if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        // Create a text node with a space
        const spaceNode = document.createTextNode(unicodeNonBreakingSpace);
        // Delete any selected content first
        range.deleteContents();
        // Insert the space node
        range.insertNode(spaceNode);
        // Move cursor after the inserted space
        range.setStartAfter(spaceNode);
        range.setEndAfter(spaceNode);
        // Update the selection
        selection.removeAllRanges();
        selection.addRange(range);
    }
}

function handleFieldInput(e) {
    const event = e;
    const targetElement = event.target;
    const fieldType = targetElement.getAttribute(VISUAL_BUILDER_FIELD_TYPE_ATTRIBUTE_KEY);
    if (event.type === "input" &&
        ALLOWED_INLINE_EDITABLE_FIELD.includes(fieldType)) {
        if (!VisualBuilder.VisualBuilderGlobalState.value
            .focusFieldReceivedInput) {
            VisualBuilder.VisualBuilderGlobalState.value.focusFieldReceivedInput =
                true;
        }
        throttledFieldSync();
    }
}
const throttledFieldSync = throttle(() => {
    try {
        const visualBuilderContainer = document.querySelector(".visual-builder__container");
        if (!visualBuilderContainer)
            return;
        sendFieldEvent({
            visualBuilderContainer,
            eventType: VisualBuilderPostMessageEvents.SYNC_FIELD,
        });
    }
    catch (error) {
        console.error("Error in throttledFieldSync", error);
    }
}, 300);
function handleFieldKeyDown(e) {
    const event = e;
    const targetElement = event.target;
    const fieldType = targetElement.getAttribute(VISUAL_BUILDER_FIELD_TYPE_ATTRIBUTE_KEY);
    if (event
        .composedPath()
        .some((element) => element instanceof Element && element.tagName === "BUTTON")) {
        // custom space handling when a button is involved
        handleKeyDownOnButton(event);
    }
    if (fieldType === FieldDataType.NUMBER) {
        handleNumericFieldKeyDown(event);
    }
    else if (fieldType === FieldDataType.SINGLELINE) {
        handleSingleLineFieldKeyDown(event);
    }
}
// spaces do not work inside a button content-editable
// this adds a space and moves the cursor ahead, the
// button press event is also prevented, finally syncs the field
function handleKeyDownOnButton(e) {
    if (e.code === "Space" && e.target) {
        e.preventDefault();
        insertSpaceAtCursor(e.target);
        throttledFieldSync();
    }
}
function handleSingleLineFieldKeyDown(e) {
    if (e.code === "Enter") {
        e.preventDefault();
    }
}
function handleNumericFieldKeyDown(event) {
    const targetElement = event.target;
    const allowedKeys = [
        "Backspace",
        "Tab",
        "Enter",
        "End",
        "Home",
        "ArrowLeft",
        "ArrowRight",
        "Delete",
    ];
    if (event.ctrlKey ||
        event.metaKey ||
        event.altKey ||
        allowedKeys.includes(event.code)) {
        // Allow Ctrl, Cmd, Alt, and special keys
        return;
    }
    if (event.code.includes("Digit")) {
        return;
    }
    const nonNumericAllowedCharacters = ["-", ".", "e", "E"];
    if (!nonNumericAllowedCharacters.includes(event.key)) {
        event.preventDefault();
        return;
    }
    const selection = {
        startOffset: window.getSelection()?.getRangeAt(0).startOffset || 0,
        endOffset: window.getSelection()?.getRangeAt(0).endOffset || 0,
    };
    const existingInput = targetElement.textContent || "";
    const currentOutputArr = existingInput.split("");
    currentOutputArr.splice(selection.startOffset, selection.endOffset - selection.startOffset, event.key);
    const currentInput = currentOutputArr.join("");
    if (!numericInputRegex.test(currentInput)) {
        event.preventDefault();
    }
}

var DisableReason;
(function (DisableReason) {
    DisableReason["ReadOnly"] = "You have only read access to this field";
    DisableReason["LocalizedEntry"] = "Editing this field is restricted in localized entries";
    DisableReason["UnlinkedVariant"] = "This field is not editable as it is not linked to the selected variant";
    DisableReason["AudienceMode"] = "Open an Experience from Audience widget to start editing";
    DisableReason["DisabledVariant"] = "This field is not editable as it doesn't match the selected variant";
    DisableReason["UnlocalizedVariant"] = "This field is not editable as it is not localized";
    DisableReason["None"] = "";
    DisableReason["EntryUpdateRestricted"] = "You do not have permission to edit this entry";
})(DisableReason || (DisableReason = {}));
const getDisableReason = (flags) => {
    if (flags.updateRestrictDueToEntryUpdateRestriction) {
        return DisableReason.EntryUpdateRestricted;
    }
    if (flags.updateRestrictDueToRole)
        return DisableReason.ReadOnly;
    if (flags.updateRestrictDueToNonLocalizableFields)
        return DisableReason.LocalizedEntry;
    if (flags.updateRestrictDueToUnlocalizedVariant)
        return DisableReason.UnlocalizedVariant;
    if (flags.updateRestrictDueToUnlinkVariant)
        return DisableReason.UnlinkedVariant;
    if (flags.updateRestrictDueToAudienceMode)
        return DisableReason.AudienceMode;
    if (flags.updateRestrictDueToDisabledVariant)
        return DisableReason.DisabledVariant;
    return DisableReason.None;
};
const isFieldDisabled = (fieldSchemaMap, eventFieldDetails, entryPermissions) => {
    const { editableElement, fieldMetadata } = eventFieldDetails;
    const masterLocale = Config.get().stackDetails.masterLocale || "en-us";
    const { locale: cmsLocale, variant } = VisualBuilder.VisualBuilderGlobalState.value;
    const flags = {
        updateRestrictDueToRole: Boolean(fieldSchemaMap?.field_metadata?.updateRestrict),
        updateRestrictDueToUnlinkVariant: Boolean(fieldSchemaMap?.field_metadata?.isUnlinkedVariant),
        updateRestrictDueToUnlocalizedVariant: Boolean(variant && fieldMetadata.locale !== cmsLocale),
        updateRestrictDueToNonLocalizableFields: Boolean(fieldSchemaMap?.non_localizable &&
            masterLocale !== fieldMetadata.locale),
        updateRestrictDueToAudienceMode: false,
        updateRestrictDueToDisabledVariant: false,
    };
    if (entryPermissions && !entryPermissions.update) {
        flags.updateRestrictDueToEntryUpdateRestriction = true;
    }
    if (VisualBuilder.VisualBuilderGlobalState.value.audienceMode &&
        !editableElement.classList.contains("visual-builder__variant-field") &&
        !editableElement.classList.contains("visual-builder__base-field")) {
        if (editableElement.classList.contains("visual-builder__disabled-variant-field")) {
            flags.updateRestrictDueToDisabledVariant = true;
        }
        else {
            flags.updateRestrictDueToAudienceMode = true;
        }
    }
    const isDisabled = Object.values(flags).some(Boolean);
    const reason = getDisableReason(flags);
    return { isDisabled, reason };
};

function AddInstanceButtonComponent(props) {
    const fieldSchema = props.fieldSchema;
    const fieldMetadata = props.fieldMetadata;
    const index = props.index;
    const loading = props.loading;
    const onClick = async (event) => {
        loading.value = true;
        try {
            await visualBuilderPostMessage$1?.send(VisualBuilderPostMessageEvents.ADD_INSTANCE, {
                fieldMetadata,
                index,
            });
        }
        catch (error) {
            console.error("Visual Builder: Failed to add instance", error);
        }
        loading.value = false;
        props.onClick(event);
    };
    const buttonClassName = classNames("visual-builder__add-button", visualBuilderStyles()["visual-builder__add-button"], {
        "visual-builder__add-button--with-label": props.label,
    }, {
        [visualBuilderStyles()["visual-builder__add-button--loading"]]: loading.value,
    }, visualBuilderStyles()["visual-builder__tooltip"]);
    const maxInstances = fieldSchema && fieldSchema.data_type !== "block"
        ? fieldSchema.max_instance
        : undefined;
    const isMaxInstances = maxInstances
        ? props.value.length >= maxInstances
        : false;
    const disabled = loading.value || isMaxInstances;
    return (u("button", { className: buttonClassName, "data-tooltip": "Add section", "data-testid": "visual-builder-add-instance-button", disabled: disabled, title: maxInstances && isMaxInstances
            ? `Max ${maxInstances} instances allowed`
            : undefined, onClick: (e) => {
            const event = e;
            onClick(event);
        }, children: [u(PlusIcon, {}), props.label ? (u("span", { title: props.label, className: classNames("visual-builder__add-button-label", visualBuilderStyles()["visual-builder__add-button-label"]), children: props.label })) : null] }));
}

/**
 * Generates a button element, when clicked, sends the add instance message and
 * then calls the provided callback function.
 * @param onClickCallback - The function to be called when the button is clicked.
 * @returns The generated button element.
 */
function generateAddInstanceButton({ value, fieldSchema, fieldMetadata, index, loading, onClick, label, }) {
    const wrapper = document.createDocumentFragment();
    B$2(u(AddInstanceButtonComponent, { loading: loading, index: index, value: value, label: label, onClick: onClick, fieldSchema: fieldSchema, fieldMetadata: fieldMetadata }), wrapper);
    const button = wrapper.children[0];
    return button;
}
/**
 * Returns an array of HTMLButtonElement instances that can be used to add new instances to the visual builder.
 * @param visualBuilderContainer - The HTMLDivElement that contains the visual builder.
 * @param getAllButtons - If true, returns all add instance buttons. If false, returns only the previous and next buttons.
 * @returns An array of HTMLButtonElement instances or null if there are less than 2 buttons.
 */
function getAddInstanceButtons(visualBuilderContainer, getAllButtons = false) {
    const buttons = visualBuilderContainer.getElementsByClassName("visual-builder__add-button");
    if (getAllButtons) {
        return Array.from(buttons);
    }
    if (buttons.length < 2) {
        return null;
    }
    const previousButton = buttons[0];
    const nextButton = buttons[1];
    return [previousButton, nextButton];
}

/**
 * Gets the first and second child elements of the parent element.
 * @param parentElement The parent element that contains the child elements.
 * @param parentCslpValue The cslp value of the parent element.
 * @returns The first and second child elements and a function to remove the clone.
 */
function getChildElements(parentElement, parentCslpValue) {
    const childElements = parentElement.querySelectorAll(`[data-cslp^="${parentCslpValue + "."}"]`);
    // filter out elements that does not end with "." + number
    const filteredChildElements = Array.from(childElements).filter((childElement) => childElement.getAttribute("data-cslp")?.match(/\.\d+$/) !== null);
    const firstChild = filteredChildElements.at(0);
    if (!firstChild)
        return [null, null, () => { }];
    const secondChild = filteredChildElements.at(1);
    if (secondChild)
        return [firstChild, secondChild, () => { }];
    // create a dummy clone to get the direction
    const firstChildClone = document.createElement(firstChild.tagName);
    firstChildClone.setAttribute("class", firstChild.getAttribute("class") ?? "");
    const HIDE_ELEMENT_CSS = "overflow: hidden !important; width: 0 !important; height: 0 !important; padding: 0 !important; border: 0 !important;";
    firstChildClone.setAttribute("style", HIDE_ELEMENT_CSS);
    parentElement.appendChild(firstChildClone);
    function removeClone() {
        parentElement.removeChild(firstChildClone);
    }
    return [firstChild, firstChildClone, removeClone];
}

const validPositions = ["vertical", "horizontal", "none"];
function getChildrenDirection(editableElement, parentCslpValue) {
    if (!editableElement) {
        return "none";
    }
    const parentElement = editableElement.closest(`[data-cslp="${parentCslpValue}"]`);
    if (!parentElement) {
        return "none";
    }
    const directionFromParentElement = parentElement.getAttribute("data-add-direction");
    const isValidParentDirection = validPositions.includes(directionFromParentElement);
    if (directionFromParentElement && isValidParentDirection) {
        return directionFromParentElement;
    }
    const [firstChildElement, secondChildElement, removeClone] = getChildElements(parentElement, parentCslpValue);
    if (!firstChildElement)
        return "none";
    // get horizontal and vertical position differences
    const firstChildBounds = firstChildElement.getBoundingClientRect();
    const secondChildBounds = secondChildElement.getBoundingClientRect();
    const deltaX = Math.abs(firstChildBounds.left - secondChildBounds.left);
    const deltaY = Math.abs(firstChildBounds.top - secondChildBounds.top);
    const dir = deltaX > deltaY ? "horizontal" : "vertical";
    // remove the clone that was created in case there was only one child
    removeClone();
    return dir;
}

/**
 * Returns the CSLP data of the closest ancestor element with a `data-cslp` attribute
 * to the target element of a mouse event.
 * @param event - The mouse event.
 * @returns The CSLP data of the closest ancestor element with a `data-cslp` attribute,
 * along with metadata and schema information for the corresponding field.
 */
function getCsDataOfElement(event) {
    const targetElement = event.target;
    if (!targetElement) {
        return;
    }
    const editableElement = targetElement.closest("[data-cslp]");
    if (!editableElement) {
        return;
    }
    const cslpData = editableElement.getAttribute("data-cslp");
    if (!cslpData) {
        return;
    }
    const fieldMetadata = extractDetailsFromCslp(cslpData);
    return {
        editableElement: editableElement,
        cslpData,
        fieldMetadata,
    };
}
function getPrefix(cslp) {
    let prefix;
    if (cslp.startsWith("v2:")) {
        // v2: prefix is added to cslp in variant cases
        const variantPrefix = cslp.split(":")[1];
        const content_type_uid = variantPrefix.split(".")[0];
        const euid = variantPrefix.split(".")[1].split("_")[0]; //page.blt7a1e5b297a97bd12_cs8171e34d92207334.en-us
        const locale = variantPrefix.split(".")[2];
        prefix = `${content_type_uid}.${euid}.${locale}`;
    }
    else {
        prefix = cslp;
    }
    return prefix.split(".").slice(0, 3).join(".");
}
function getDOMEditStack(ele) {
    const cslpSet = [];
    let curr = ele.closest(`[${DATA_CSLP_ATTR_SELECTOR}]`);
    while (curr) {
        const cslp = curr.getAttribute(DATA_CSLP_ATTR_SELECTOR);
        const entryPrefix = getPrefix(cslp);
        const hasSamePrevPrefix = getPrefix(cslpSet.at(0) || "").startsWith(entryPrefix);
        if (!hasSamePrevPrefix) {
            cslpSet.unshift(cslp);
        }
        curr = curr.parentElement?.closest(`[${DATA_CSLP_ATTR_SELECTOR}]`);
    }
    return cslpSet.map((cslp) => extractDetailsFromCslp(cslp));
}

const modular_block = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.25 3.5625C2.25 2.83763 2.83763 2.25 3.5625 2.25H20.441C21.1659 2.25 21.7535 2.83763 21.7535 3.5625V20.441C21.7535 21.1659 21.1659 21.7535 20.441 21.7535H3.5625C2.83763 21.7535 2.25 21.1659 2.25 20.441V3.5625ZM3.375 12.5643V20.441C3.375 20.5446 3.45895 20.6285 3.5625 20.6285H11.4393V12.5643L3.375 12.5643ZM11.4393 11.4393L3.375 11.4393V3.5625C3.375 3.45895 3.45895 3.375 3.5625 3.375H11.4393V11.4393ZM12.5643 12.5643V20.6285H20.441C20.5446 20.6285 20.6285 20.5446 20.6285 20.441V12.5643L12.5643 12.5643ZM20.6285 11.4393L12.5643 11.4393V3.375H20.441C20.5446 3.375 20.6285 3.45895 20.6285 3.5625V11.4393Z" fill="white"/></svg>`;
const url = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.5747 8.4136C15.7945 8.63311 15.7948 8.98927 15.5753 9.2091L9.21902 15.5747C8.99952 15.7946 8.64336 15.7948 8.42353 15.5753C8.2037 15.3558 8.20344 14.9996 8.42294 14.7798L14.7792 8.41419C14.9987 8.19436 15.3549 8.1941 15.5747 8.4136Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M7.6251 10.0076C7.84477 10.2273 7.84477 10.5835 7.6251 10.8031L4.97197 13.4563C4.23333 14.1949 3.81836 15.1967 3.81836 16.2413C3.81836 17.2859 4.23333 18.2878 4.97197 19.0264C5.71062 19.765 6.71243 20.18 7.75704 20.18C8.27427 20.18 8.78644 20.0781 9.2643 19.8802C9.74216 19.6823 10.1764 19.3921 10.5421 19.0264L13.1952 16.3733C13.4149 16.1536 13.7711 16.1536 13.9907 16.3733C14.2104 16.5929 14.2104 16.9491 13.9907 17.1688L11.3376 19.8219C10.8674 20.2921 10.3092 20.6651 9.69482 20.9196C9.08047 21.174 8.42201 21.305 7.75704 21.305C6.41406 21.305 5.1261 20.7715 4.17648 19.8219C3.22685 18.8723 2.69336 17.5843 2.69336 16.2413C2.69336 14.8984 3.22685 13.6104 4.17648 12.6608L6.8296 10.0076C7.04927 9.78798 7.40543 9.78798 7.6251 10.0076Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M12.6608 4.17648C13.6104 3.22685 14.8984 2.69336 16.2413 2.69336C17.5843 2.69336 18.8723 3.22685 19.8219 4.17648C20.7715 5.1261 21.305 6.41406 21.305 7.75704C21.305 9.10001 20.7715 10.388 19.8219 11.3376L17.1688 13.9907C16.9491 14.2104 16.5929 14.2104 16.3733 13.9907C16.1536 13.7711 16.1536 13.4149 16.3733 13.1952L19.0264 10.5421C19.765 9.80345 20.18 8.80164 20.18 7.75704C20.18 6.71243 19.765 5.71062 19.0264 4.97197C18.2878 4.23333 17.2859 3.81836 16.2413 3.81836C15.1967 3.81836 14.1949 4.23333 13.4563 4.97197L10.8031 7.6251C10.5835 7.84477 10.2273 7.84477 10.0076 7.6251C9.78798 7.40543 9.78798 7.04927 10.0076 6.8296L12.6608 4.17648Z" fill="white"/></svg>`;
const FieldTypeIconsMap = {
    singleline: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.94958 7.8294C5.85419 7.6199 5.64077 7.48967 5.41084 7.50064C5.1809 7.51162 4.98086 7.66158 4.90585 7.87921L3.19036 12.8566L2.2835 15.3717C2.17813 15.664 2.32962 15.9863 2.62186 16.0917C2.9141 16.197 3.23643 16.0455 3.34181 15.7533L3.95144 14.0625H7.53908L8.29768 15.7888C8.42266 16.0732 8.75454 16.2025 9.03895 16.0775C9.32336 15.9525 9.4526 15.6206 9.32762 15.3362L8.22073 12.8173L8.21769 12.8105L5.94958 7.8294ZM7.03937 12.9375L5.51002 9.57881L4.35242 12.9375H7.03937Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M11.625 8.0625C11.625 7.75184 11.3732 7.5 11.0625 7.5C10.7518 7.5 10.5 7.75184 10.5 8.0625V15.5625C10.5 15.8732 10.7518 16.125 11.0625 16.125C11.3731 16.125 11.6249 15.8733 11.625 15.5627C12.0951 15.9158 12.6793 16.125 13.3125 16.125C14.8658 16.125 16.125 14.8658 16.125 13.3125C16.125 11.7592 14.8658 10.5 13.3125 10.5C12.6793 10.5 12.0951 10.7092 11.625 11.0623V8.0625ZM11.625 13.3116C11.625 13.3119 11.625 13.3122 11.625 13.3125C11.625 13.3128 11.625 13.3131 11.625 13.3134C11.6255 14.245 12.3808 15 13.3125 15C14.2445 15 15 14.2445 15 13.3125C15 12.3805 14.2445 11.625 13.3125 11.625C12.3808 11.625 11.6255 12.38 11.625 13.3116Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M19.9448 10.5025C20.4222 10.4825 20.8969 10.5844 21.324 10.7988C21.6017 10.9381 21.7138 11.2762 21.5744 11.5538C21.4351 11.8315 21.0971 11.9436 20.8194 11.8043C20.5631 11.6757 20.2783 11.6145 19.9919 11.6265C19.7054 11.6385 19.4267 11.7233 19.1821 11.8729C18.9375 12.0224 18.735 12.2319 18.5938 12.4814C18.4526 12.731 18.3773 13.0124 18.375 13.2991C18.3728 13.5858 18.4436 13.8684 18.5808 14.1201C18.718 14.3719 18.9171 14.5845 19.1593 14.738C19.4015 14.8914 19.6788 14.9806 19.9651 14.9972C20.2513 15.0137 20.5371 14.9571 20.7953 14.8326C21.0752 14.6977 21.4114 14.8151 21.5463 15.095C21.6812 15.3748 21.5637 15.711 21.2839 15.846C20.8534 16.0535 20.3772 16.1479 19.9001 16.1203C19.423 16.0927 18.9609 15.944 18.5572 15.6883C18.1535 15.4325 17.8217 15.0781 17.593 14.6585C17.3643 14.2389 17.2463 13.768 17.2501 13.2901C17.2539 12.8123 17.3794 12.3433 17.6147 11.9274C17.8501 11.5115 18.1875 11.1624 18.5952 10.9131C19.0029 10.6638 19.4673 10.5225 19.9448 10.5025Z" fill="white"/></svg>`,
    multiline: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M20.8125 6.75C20.8125 7.06066 20.5607 7.3125 20.25 7.3125L12.75 7.3125C12.4393 7.3125 12.1875 7.06066 12.1875 6.75C12.1875 6.43934 12.4393 6.1875 12.75 6.1875L20.25 6.1875C20.5607 6.1875 20.8125 6.43934 20.8125 6.75Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M20.8125 11.25C20.8125 11.5607 20.5607 11.8125 20.25 11.8125H12.75C12.4393 11.8125 12.1875 11.5607 12.1875 11.25C12.1875 10.9393 12.4393 10.6875 12.75 10.6875H20.25C20.5607 10.6875 20.8125 10.9393 20.8125 11.25Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M20.8125 15.75C20.8125 16.0607 20.5607 16.3125 20.25 16.3125L3.75 16.3125C3.43934 16.3125 3.1875 16.0607 3.1875 15.75C3.1875 15.4393 3.43934 15.1875 3.75 15.1875L20.25 15.1875C20.5607 15.1875 20.8125 15.4393 20.8125 15.75Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M20.8125 20.25C20.8125 20.5607 20.5607 20.8125 20.25 20.8125L3.75 20.8125C3.43934 20.8125 3.1875 20.5607 3.1875 20.25C3.1875 19.9393 3.43934 19.6875 3.75 19.6875L20.25 19.6875C20.5607 19.6875 20.8125 19.9393 20.8125 20.25Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M6.69958 4.0794C6.60419 3.8699 6.39077 3.73967 6.16084 3.75064C5.9309 3.76162 5.73086 3.91158 5.65585 4.12921L3.94036 9.10658L3.0335 11.6217C2.92813 11.914 3.07962 12.2363 3.37186 12.3417C3.6641 12.447 3.98643 12.2955 4.09181 12.0033L4.70145 10.3125H8.28908L9.04768 12.0388C9.17266 12.3232 9.50454 12.4525 9.78895 12.3275C10.0734 12.2025 10.2026 11.8706 10.0776 11.5862L8.97074 9.06732L8.96769 9.06052L6.69958 4.0794ZM7.78938 9.1875L6.26002 5.8288L5.10242 9.1875H7.78938Z" fill="white"/></svg>`,
    html_rte: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.5625 11.4375V5.0625H11.4375V10.7422L10.1108 8.0888C9.82462 7.51646 9.06183 7.39267 8.60936 7.84515L5.017 11.4375H3.5625ZM6.608 11.4375H10.5274L9.2209 8.82459L6.608 11.4375ZM3.375 3.9375C2.85723 3.9375 2.4375 4.35723 2.4375 4.875V11.625C2.4375 12.1428 2.85723 12.5625 3.375 12.5625H11.625C12.1428 12.5625 12.5625 12.1428 12.5625 11.625V4.875C12.5625 4.35723 12.1428 3.9375 11.625 3.9375H3.375Z" fill="white"/><path d="M6.11566 7.73132C6.59375 7.73132 6.98132 7.34375 6.98132 6.86566C6.98132 6.38757 6.59375 6 6.11566 6C5.63757 6 5.25 6.38757 5.25 6.86566C5.25 7.34375 5.63757 7.73132 6.11566 7.73132Z" fill="#475161"/><path fill-rule="evenodd" clip-rule="evenodd" d="M21.5625 6C21.5625 6.31066 21.3107 6.5625 21 6.5625L15 6.5625C14.6893 6.5625 14.4375 6.31066 14.4375 6C14.4375 5.68934 14.6893 5.4375 15 5.4375L21 5.4375C21.3107 5.4375 21.5625 5.68934 21.5625 6Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M21.5625 10.5C21.5625 10.8107 21.3107 11.0625 21 11.0625H15C14.6893 11.0625 14.4375 10.8107 14.4375 10.5C14.4375 10.1893 14.6893 9.9375 15 9.9375L21 9.9375C21.3107 9.9375 21.5625 10.1893 21.5625 10.5Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M21.5625 15C21.5625 15.3107 21.3107 15.5625 21 15.5625L3.75 15.5625C3.43934 15.5625 3.1875 15.3107 3.1875 15C3.1875 14.6893 3.43934 14.4375 3.75 14.4375L21 14.4375C21.3107 14.4375 21.5625 14.6893 21.5625 15Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M21.5625 19.5C21.5625 19.8107 21.3107 20.0625 21 20.0625L3.75 20.0625C3.43934 20.0625 3.1875 19.8107 3.1875 19.5C3.1875 19.1893 3.43934 18.9375 3.75 18.9375L21 18.9375C21.3107 18.9375 21.5625 19.1893 21.5625 19.5Z" fill="white"/></svg>`,
    json_rte: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.67113 7.5005C7.94625 7.5005 7.35863 8.08812 7.35863 8.813V9.87593C7.35863 10.1866 7.61047 10.4384 7.92113 10.4384C8.23179 10.4384 8.48363 10.1866 8.48363 9.87593V8.813C8.48363 8.70944 8.56757 8.6255 8.67113 8.6255H11.4375V15.6584H10.3575C10.0468 15.6584 9.79501 15.9103 9.79501 16.2209C9.79501 16.5316 10.0468 16.7834 10.3575 16.7834H13.9834C14.294 16.7834 14.5459 16.5316 14.5459 16.2209C14.5459 15.9103 14.294 15.6584 13.9834 15.6584H12.5625V8.6255H15.3293C15.4329 8.6255 15.5168 8.70945 15.5168 8.813V9.87593C15.5168 10.1866 15.7687 10.4384 16.0793 10.4384C16.39 10.4384 16.6418 10.1866 16.6418 9.87593V8.813C16.6418 8.08812 16.0542 7.5005 15.3293 7.5005H8.67113Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M6.97059 2.99805C5.00307 2.99805 3.40809 4.59303 3.40809 6.56055V9.51691C3.40809 10.5707 2.55381 11.425 1.5 11.425V12.55C2.55381 12.55 3.40809 13.4043 3.40809 14.4581V17.4145C3.40809 19.382 5.00307 20.977 6.97059 20.977H7.5V19.852H6.97059C5.6244 19.852 4.53309 18.7607 4.53309 17.4145V14.4581C4.53309 13.4391 4.03059 12.5375 3.25988 11.9875C4.03059 11.4375 4.53309 10.5359 4.53309 9.51691V6.56055C4.53309 5.21435 5.6244 4.12305 6.97059 4.12305H7.5V2.99805H6.97059Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M17.0294 2.99805C18.9969 2.99805 20.5919 4.59303 20.5919 6.56055V9.51691C20.5919 10.5707 21.4462 11.425 22.5 11.425V12.55C21.4462 12.55 20.5919 13.4043 20.5919 14.4581V17.4145C20.5919 19.382 18.9969 20.977 17.0294 20.977H16.5V19.852H17.0294C18.3756 19.852 19.4669 18.7607 19.4669 17.4145V14.4581C19.4669 13.4391 19.9694 12.5375 20.7401 11.9875C19.9694 11.4375 19.4669 10.5359 19.4669 9.51691V6.56055C19.4669 5.21435 18.3756 4.12305 17.0294 4.12305H16.5V2.99805H17.0294Z" fill="white"/></svg>`,
    markdown_rte: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.3163 16.1134L11.3051 11.4011L8.9938 15.2831H8.17475L5.87469 11.502V16.1134H4.16928V8.25951H5.67273L8.61232 13.1401L11.507 8.25951H12.9993L13.0217 16.1134H11.3163Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M1.6875 6C1.6875 5.27513 2.27513 4.6875 3 4.6875H21C21.7249 4.6875 22.3125 5.27513 22.3125 6V18C22.3125 18.7249 21.7249 19.3125 21 19.3125H3C2.27513 19.3125 1.6875 18.7249 1.6875 18V6ZM3 5.8125C2.89645 5.8125 2.8125 5.89645 2.8125 6V18C2.8125 18.1036 2.89645 18.1875 3 18.1875H21C21.1036 18.1875 21.1875 18.1036 21.1875 18V6C21.1875 5.89645 21.1036 5.8125 21 5.8125H3Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M18.1818 12.408H20.1013L17.4168 16.1134L14.7323 12.408H16.6518V8.27225H18.1818V12.408Z" fill="white"/></svg>`,
    select: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3 8.8125C2.89645 8.8125 2.8125 8.89645 2.8125 9V10.5C2.8125 10.8107 2.56066 11.0625 2.25 11.0625C1.93934 11.0625 1.6875 10.8107 1.6875 10.5V9C1.6875 8.27513 2.27513 7.6875 3 7.6875H4.5C4.81066 7.6875 5.0625 7.93934 5.0625 8.25C5.0625 8.56066 4.81066 8.8125 4.5 8.8125H3ZM6.9375 8.25C6.9375 7.93934 7.18934 7.6875 7.5 7.6875H10.5C10.8107 7.6875 11.0625 7.93934 11.0625 8.25C11.0625 8.56066 10.8107 8.8125 10.5 8.8125H7.5C7.18934 8.8125 6.9375 8.56066 6.9375 8.25ZM12.9375 8.25C12.9375 7.93934 13.1893 7.6875 13.5 7.6875H16.5C16.8107 7.6875 17.0625 7.93934 17.0625 8.25C17.0625 8.56066 16.8107 8.8125 16.5 8.8125H13.5C13.1893 8.8125 12.9375 8.56066 12.9375 8.25ZM18.9375 8.25C18.9375 7.93934 19.1893 7.6875 19.5 7.6875H21C21.7249 7.6875 22.3125 8.27513 22.3125 9V10.6875C22.3125 10.9982 22.0607 11.25 21.75 11.25C21.4393 11.25 21.1875 10.9982 21.1875 10.6875V9C21.1875 8.89645 21.1036 8.8125 21 8.8125H19.5C19.1893 8.8125 18.9375 8.56066 18.9375 8.25ZM2.25 12.9375C2.56066 12.9375 2.8125 13.1893 2.8125 13.5V15C2.8125 15.1036 2.89645 15.1875 3 15.1875H4.125C4.43566 15.1875 4.6875 15.4393 4.6875 15.75C4.6875 16.0607 4.43566 16.3125 4.125 16.3125H3C2.27513 16.3125 1.6875 15.7249 1.6875 15V13.5C1.6875 13.1893 1.93934 12.9375 2.25 12.9375ZM21.75 13.5C22.0607 13.5 22.3125 13.7518 22.3125 14.0625V15.75C22.3125 16.0607 22.0607 16.3125 21.75 16.3125C21.4393 16.3125 21.1875 16.0607 21.1875 15.75V14.0625C21.1875 13.7518 21.4393 13.5 21.75 13.5ZM5.8125 15.75C5.8125 15.4393 6.06434 15.1875 6.375 15.1875H8.625C8.93566 15.1875 9.1875 15.4393 9.1875 15.75C9.1875 16.0607 8.93566 16.3125 8.625 16.3125H6.375C6.06434 16.3125 5.8125 16.0607 5.8125 15.75ZM10.3125 15.75C10.3125 15.4393 10.5643 15.1875 10.875 15.1875H12C12.3107 15.1875 12.5625 15.4393 12.5625 15.75C12.5625 16.0607 12.3107 16.3125 12 16.3125H10.875C10.5643 16.3125 10.3125 16.0607 10.3125 15.75Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M13.4457 13.3706C13.3603 12.5628 14.2727 12.036 14.9296 12.5139L21.2889 17.1406C21.9906 17.6511 21.6818 18.7589 20.8172 18.8328L17.7404 19.0958L15.9742 21.6289C15.4779 22.3407 14.3642 22.0543 14.2729 21.1913L13.4457 13.3706ZM14.6089 13.6718L15.3388 20.5732L16.8678 18.3803C17.027 18.1519 17.2796 18.0061 17.557 17.9823L20.2207 17.7547L14.6089 13.6718Z" fill="white"/></svg>`,
    modular_block: modular_block,
    block: modular_block,
    number: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.46172 8.08704C6.45117 8.02147 6.42928 7.9597 6.39813 7.90379C6.35727 7.8301 6.3012 7.7682 6.23536 7.72082C6.16973 7.67343 6.09347 7.63985 6.01084 7.62433C5.94777 7.61236 5.88203 7.61108 5.81629 7.62183C5.78173 7.6274 5.74822 7.63611 5.71607 7.64767L3.47852 8.39352C3.18381 8.49176 3.02453 8.81031 3.12277 9.10503C3.22101 9.39975 3.53956 9.55903 3.83428 9.46079L5.3439 8.95758L5.3439 15.302H4.59375C4.28309 15.302 4.03125 15.5538 4.03125 15.8645C4.03125 16.1752 4.28309 16.427 4.59375 16.427H7.33594C7.6466 16.427 7.89844 16.1752 7.89844 15.8645C7.89844 15.5538 7.6466 15.302 7.33594 15.302H6.4689L6.4689 8.19029C6.4697 8.15613 6.46737 8.12159 6.46172 8.08704Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M9.51562 9.32004C9.51562 8.35585 10.2973 7.57422 11.2614 7.57422H12.8054C13.6809 7.57422 14.3906 8.28395 14.3906 9.15945V10.9828C14.3906 11.6816 13.9922 12.3191 13.3642 12.6254L12.2817 13.1533C12.2739 13.1571 12.266 13.1607 12.258 13.1641L11.3359 13.562C10.6003 13.8794 10.0831 14.537 9.93348 15.302H13.8281C14.1388 15.302 14.3906 15.5538 14.3906 15.8645C14.3906 16.1752 14.1388 16.427 13.8281 16.427H9.36208C9.03756 16.427 8.77241 16.1679 8.76493 15.8435C8.73182 14.4088 9.57261 13.0976 10.8902 12.5291L11.8003 12.1364L12.8711 11.6142C13.1125 11.4965 13.2656 11.2514 13.2656 10.9828V9.15945C13.2656 8.90527 13.0596 8.69922 12.8054 8.69922H11.2614C10.9186 8.69922 10.6406 8.97717 10.6406 9.32004C10.6406 9.6307 10.3888 9.88254 10.0781 9.88254C9.76746 9.88254 9.51562 9.6307 9.51562 9.32004Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M16.5938 7.62677C16.2831 7.62677 16.0312 7.87861 16.0312 8.18927C16.0312 8.49993 16.2831 8.75177 16.5938 8.75177H19.5938C19.6973 8.75177 19.7812 8.83572 19.7812 8.93927V11.4583H16.5938C16.2831 11.4583 16.0312 11.7101 16.0312 12.0208C16.0312 12.3315 16.2831 12.5833 16.5938 12.5833H19.7812V15.1023C19.7812 15.2059 19.6973 15.2898 19.5938 15.2898H16.5938C16.2831 15.2898 16.0312 15.5417 16.0312 15.8523C16.0312 16.163 16.2831 16.4148 16.5938 16.4148H19.5938C20.3186 16.4148 20.9062 15.8272 20.9062 15.1023V8.93927C20.9062 8.2144 20.3186 7.62677 19.5938 7.62677H16.5938Z" fill="white"/></svg>`,
    boolean: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.6875 12C1.6875 8.78984 4.28985 6.1875 7.5 6.1875H16.5C19.7102 6.1875 22.3125 8.78984 22.3125 12C22.3125 15.2102 19.7102 17.8125 16.5 17.8125H7.5C4.28985 17.8125 1.6875 15.2102 1.6875 12ZM7.5 7.3125C4.91117 7.3125 2.8125 9.41117 2.8125 12C2.8125 14.5888 4.91117 16.6875 7.5 16.6875H16.5C19.0888 16.6875 21.1875 14.5888 21.1875 12C21.1875 9.41117 19.0888 7.3125 16.5 7.3125H7.5Z" fill="white"/><path d="M19.5 12C19.5 13.6569 18.1569 15 16.5 15C14.8431 15 13.5 13.6569 13.5 12C13.5 10.3431 14.8431 9 16.5 9C18.1569 9 19.5 10.3431 19.5 12Z" fill="white"/></svg>`,
    isodate: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.18616 2.22852C7.49682 2.22852 7.74866 2.48036 7.74866 2.79102V3.90302H14.9956V2.79102C14.9956 2.48036 15.2474 2.22852 15.5581 2.22852C15.8688 2.22852 16.1206 2.48036 16.1206 2.79102V3.90302H18.9942C19.7191 3.90302 20.3067 4.49064 20.3067 5.21552V11.1632C20.3067 11.4739 20.0548 11.7257 19.7442 11.7257C19.4335 11.7257 19.1817 11.4739 19.1817 11.1632V9.48865L3.5625 9.48865V18.7853C3.5625 18.8888 3.64645 18.9728 3.75 18.9728H10.5349C10.8455 18.9728 11.0974 19.2246 11.0974 19.5353C11.0974 19.8459 10.8455 20.0978 10.5349 20.0978H3.75C3.02513 20.0978 2.4375 19.5102 2.4375 18.7853V5.21551C2.4375 4.49064 3.02513 3.90302 3.75 3.90302H6.62366V2.79102C6.62366 2.48036 6.8755 2.22852 7.18616 2.22852ZM14.9956 5.02802V6.13985C14.9956 6.45051 15.2474 6.70235 15.5581 6.70235C15.8688 6.70235 16.1206 6.45051 16.1206 6.13985V5.02802H18.9942C19.0977 5.02802 19.1817 5.11196 19.1817 5.21552V8.36365L3.5625 8.36365V5.21551C3.5625 5.11196 3.64645 5.02802 3.75 5.02802H6.62366V6.13985C6.62366 6.45051 6.8755 6.70235 7.18616 6.70235C7.49682 6.70235 7.74866 6.45051 7.74866 6.13985V5.02802H14.9956Z" fill="white"/><path d="M7.18589 12.0004C7.18589 12.4627 6.81106 12.8376 6.34868 12.8376C5.88631 12.8376 5.51147 12.4627 5.51147 12.0004C5.51147 11.538 5.88631 11.1631 6.34868 11.1631C6.81106 11.1631 7.18589 11.538 7.18589 12.0004Z" fill="white"/><path d="M11.3721 12.0004C11.3721 12.4627 10.9972 12.8376 10.5348 12.8376C10.0725 12.8376 9.69763 12.4627 9.69763 12.0004C9.69763 11.538 10.0725 11.1631 10.5348 11.1631C10.9972 11.1631 11.3721 11.538 11.3721 12.0004Z" fill="white"/><path d="M7.18589 16.1863C7.18589 16.6487 6.81106 17.0235 6.34868 17.0235C5.88631 17.0235 5.51147 16.6487 5.51147 16.1863C5.51147 15.724 5.88631 15.3491 6.34868 15.3491C6.81106 15.3491 7.18589 15.724 7.18589 16.1863Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M16.8141 13.4C14.8129 13.4 13.1906 15.0223 13.1906 17.0235C13.1906 19.0247 14.8129 20.6471 16.8141 20.6471C18.8153 20.6471 20.4376 19.0247 20.4376 17.0235C20.4376 15.0223 18.8153 13.4 16.8141 13.4ZM12.0656 17.0235C12.0656 14.401 14.1915 12.275 16.8141 12.275C19.4366 12.275 21.5626 14.401 21.5626 17.0235C21.5626 19.6461 19.4366 21.7721 16.8141 21.7721C14.1915 21.7721 12.0656 19.6461 12.0656 17.0235Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M16.6307 14.9959C16.9414 14.9959 17.1932 15.2478 17.1932 15.5584V17.2959L17.9186 17.6404C18.1992 17.7737 18.3186 18.1093 18.1853 18.3899C18.0521 18.6705 17.7165 18.7899 17.4359 18.6566L16.3894 18.1595C16.1932 18.0664 16.0682 17.8686 16.0682 17.6514V15.5584C16.0682 15.2478 16.3201 14.9959 16.6307 14.9959Z" fill="white"/></svg>`,
    file: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.25 3.5625C5.20027 3.5625 5.15258 3.58225 5.11742 3.61742C5.08225 3.65258 5.0625 3.70027 5.0625 3.75V20.25C5.0625 20.2997 5.08225 20.3474 5.11742 20.3826C5.15258 20.4177 5.20027 20.4375 5.25 20.4375H18.75C18.7997 20.4375 18.8474 20.4177 18.8826 20.3826C18.9177 20.3474 18.9375 20.2997 18.9375 20.25V8.483L14.017 3.5625H5.25ZM4.32192 2.82192C4.56806 2.57578 4.9019 2.4375 5.25 2.4375H14.25C14.3992 2.4375 14.5423 2.49676 14.6477 2.60225L19.8977 7.85225C20.0032 7.95774 20.0625 8.10082 20.0625 8.25V20.25C20.0625 20.5981 19.9242 20.9319 19.6781 21.1781C19.4319 21.4242 19.0981 21.5625 18.75 21.5625H5.25C4.9019 21.5625 4.56806 21.4242 4.32192 21.1781C4.07578 20.9319 3.9375 20.5981 3.9375 20.25V3.75C3.9375 3.4019 4.07578 3.06806 4.32192 2.82192Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M14.25 2.4375C14.5607 2.4375 14.8125 2.68934 14.8125 3V7.6875H19.5C19.8107 7.6875 20.0625 7.93934 20.0625 8.25C20.0625 8.56066 19.8107 8.8125 19.5 8.8125H14.25C13.9393 8.8125 13.6875 8.56066 13.6875 8.25V3C13.6875 2.68934 13.9393 2.4375 14.25 2.4375Z" fill="white"/></svg>`,
    link: url,
    url: url,
    reference: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.5 3.9375C4.81066 3.9375 5.0625 4.18934 5.0625 4.5V18.9375H19.5C19.8107 18.9375 20.0625 19.1893 20.0625 19.5C20.0625 19.8107 19.8107 20.0625 19.5 20.0625H4.5C4.18934 20.0625 3.9375 19.8107 3.9375 19.5V4.5C3.9375 4.18934 4.18934 3.9375 4.5 3.9375Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M15.3756 7.08021C15.6074 6.87343 15.963 6.89375 16.1698 7.12559L18.4198 9.64832C18.6151 9.86727 18.6093 10.1995 18.4065 10.4115L16.1565 12.7638C15.9417 12.9883 15.5857 12.9962 15.3612 12.7815C15.1367 12.5668 15.1288 12.2107 15.3435 11.9862L16.6836 10.5852H11.3182C9.52012 10.5852 8.0625 12.0428 8.0625 13.8409V15.75C8.0625 16.0607 7.81066 16.3125 7.5 16.3125C7.18934 16.3125 6.9375 16.0607 6.9375 15.75V13.8409C6.9375 11.4215 8.8988 9.46023 11.3182 9.46023H16.7446L15.3302 7.87441C15.1234 7.64256 15.1437 7.28699 15.3756 7.08021Z" fill="white"/></svg>`,
    group: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.8125 3.75C2.8125 3.23223 3.23223 2.8125 3.75 2.8125C4.26777 2.8125 4.6875 3.23223 4.6875 3.75C4.6875 4.26777 4.26777 4.6875 3.75 4.6875C3.23223 4.6875 2.8125 4.26777 2.8125 3.75ZM3.75 1.6875C4.69408 1.6875 5.49001 2.32181 5.73486 3.1875H18.2651C18.51 2.32181 19.3059 1.6875 20.25 1.6875C21.3891 1.6875 22.3125 2.61091 22.3125 3.75C22.3125 4.69408 21.6782 5.49002 20.8125 5.73486V18.2651C21.6782 18.51 22.3125 19.3059 22.3125 20.25C22.3125 21.3891 21.3891 22.3125 20.25 22.3125C19.3059 22.3125 18.51 21.6782 18.2651 20.8125H5.73486C5.49001 21.6782 4.69408 22.3125 3.75 22.3125C2.61091 22.3125 1.6875 21.3891 1.6875 20.25C1.6875 19.3059 2.32181 18.51 3.1875 18.2651V5.73486C2.32181 5.49001 1.6875 4.69408 1.6875 3.75C1.6875 2.61091 2.61091 1.6875 3.75 1.6875ZM20.25 4.6875C20.7678 4.6875 21.1875 4.26777 21.1875 3.75C21.1875 3.23223 20.7678 2.8125 20.25 2.8125C19.7322 2.8125 19.3125 3.23223 19.3125 3.75C19.3125 4.26777 19.7322 4.6875 20.25 4.6875ZM18.2651 4.3125C18.4594 4.99938 19.0006 5.54059 19.6875 5.73486V18.2651C19.0006 18.4594 18.4594 19.0006 18.2651 19.6875H5.73486C5.54059 19.0006 4.99938 18.4594 4.3125 18.2651V5.73486C4.99938 5.54059 5.54059 4.99938 5.73486 4.3125H18.2651ZM19.3125 20.25C19.3125 19.7322 19.7322 19.3125 20.25 19.3125C20.7678 19.3125 21.1875 19.7322 21.1875 20.25C21.1875 20.7678 20.7678 21.1875 20.25 21.1875C19.7322 21.1875 19.3125 20.7678 19.3125 20.25ZM4.6875 20.25C4.6875 19.7322 4.26777 19.3125 3.75 19.3125C3.23223 19.3125 2.8125 19.7322 2.8125 20.25C2.8125 20.7678 3.23223 21.1875 3.75 21.1875C4.26777 21.1875 4.6875 20.7678 4.6875 20.25ZM9.75 7.6875C9.75 6.96263 10.3376 6.375 11.0625 6.375H15.5625C16.2874 6.375 16.875 6.96263 16.875 7.6875V13.6875C16.875 14.4124 16.2874 15 15.5625 15H14.625V15.9375C14.625 16.6624 14.0374 17.25 13.3125 17.25H8.8125C8.08763 17.25 7.5 16.6624 7.5 15.9375V9.1875C7.5 8.46263 8.08763 7.875 8.8125 7.875H9.75V7.6875ZM9.75 9H8.8125C8.70895 9 8.625 9.08395 8.625 9.1875V15.9375C8.625 16.0411 8.70895 16.125 8.8125 16.125H13.3125C13.4161 16.125 13.5 16.0411 13.5 15.9375V15H11.0625C10.3376 15 9.75 14.4124 9.75 13.6875V9ZM11.0625 7.5C10.9589 7.5 10.875 7.58395 10.875 7.6875V13.6875C10.875 13.7911 10.9589 13.875 11.0625 13.875H15.5625C15.6661 13.875 15.75 13.7911 15.75 13.6875V7.6875C15.75 7.58395 15.6661 7.5 15.5625 7.5H11.0625Z" fill="white"/></svg>`,
    global_field: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.375 3C17.3456 3 21.375 7.02944 21.375 12C21.375 16.9706 17.3456 21 12.375 21C7.40444 21 3.375 16.9706 3.375 12C3.375 7.02944 7.40444 3 12.375 3ZM12.375 19.875C12.5009 19.875 12.7226 19.8185 13.0332 19.5032C13.3478 19.184 13.6828 18.6642 13.9882 17.9313C14.1866 17.455 14.3632 16.9113 14.5111 16.3125H10.2389C10.3868 16.9113 10.5634 17.455 10.7618 17.9313C11.0672 18.6642 11.4022 19.184 11.7168 19.5032C12.0274 19.8185 12.2491 19.875 12.375 19.875ZM10.0068 15.1875C9.84289 14.2154 9.75 13.1397 9.75 12C9.75 10.8603 9.84289 9.78464 10.0068 8.8125H14.7432C14.9071 9.78464 15 10.8603 15 12C15 13.1397 14.9071 14.2154 14.7432 15.1875H10.0068ZM15.6673 16.3125C15.3597 17.6622 14.9122 18.8021 14.3716 19.6197C16.2825 19.1203 17.9105 17.9212 18.9653 16.3125H15.6673ZM19.5782 15.1875H15.883C16.0394 14.1967 16.125 13.1223 16.125 12C16.125 10.8777 16.0394 9.80332 15.883 8.8125H19.5782C20.0101 9.78699 20.25 10.8655 20.25 12C20.25 13.1345 20.0101 14.213 19.5782 15.1875ZM8.86698 15.1875H5.17177C4.73991 14.213 4.5 13.1345 4.5 12C4.5 10.8655 4.73991 9.78699 5.17177 8.8125H8.86698C8.7106 9.80332 8.625 10.8777 8.625 12C8.625 13.1223 8.7106 14.1967 8.86698 15.1875ZM5.7847 16.3125H9.08273C9.39032 17.6622 9.83781 18.8021 10.3784 19.6197C8.46751 19.1203 6.83953 17.9212 5.7847 16.3125ZM10.2389 7.6875H14.5111C14.3632 7.08867 14.1866 6.54495 13.9882 6.06873C13.6828 5.33576 13.3478 4.81605 13.0332 4.49677C12.7226 4.18146 12.5009 4.125 12.375 4.125C12.2491 4.125 12.0274 4.18146 11.7168 4.49677C11.4022 4.81605 11.0672 5.33576 10.7618 6.06873C10.5634 6.54495 10.3868 7.08867 10.2389 7.6875ZM15.6673 7.6875H18.9653C17.9105 6.07879 16.2825 4.87965 14.3716 4.38032C14.9122 5.19795 15.3597 6.33778 15.6673 7.6875ZM10.3784 4.38032C9.83781 5.19795 9.39032 6.33778 9.08273 7.6875H5.7847C6.83953 6.07879 8.46751 4.87965 10.3784 4.38032Z" fill="white"/></svg>`,
    custom_field: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.25 3.9375H9.05319C9.16513 3.35112 9.45051 2.80685 9.87868 2.37868C10.4413 1.81607 11.2044 1.5 12 1.5C12.7956 1.5 13.5587 1.81607 14.1213 2.37868C14.5495 2.80685 14.8349 3.35112 14.9468 3.9375H18.75C19.4749 3.9375 20.0625 4.52513 20.0625 5.25V9.05319C20.6489 9.16513 21.1931 9.45051 21.6213 9.87868C22.1839 10.4413 22.5 11.2044 22.5 12C22.5 12.7956 22.1839 13.5587 21.6213 14.1213C21.1931 14.5495 20.6489 14.8349 20.0625 14.9468V18.75C20.0625 19.4749 19.4749 20.0625 18.75 20.0625H14.7137C14.4215 20.0625 14.1613 19.8779 14.0648 19.6021C13.3812 17.6489 10.6188 17.6489 9.93522 19.6021C9.83871 19.8779 9.57846 20.0625 9.28631 20.0625H5.25C4.52513 20.0625 3.9375 19.4749 3.9375 18.75V14.7343C3.9375 14.4269 4.13421 14.154 4.42585 14.0568C6.40245 13.3979 6.40245 10.6021 4.42585 9.94321C4.13421 9.846 3.9375 9.57307 3.9375 9.26566V5.25C3.9375 4.52513 4.52513 3.9375 5.25 3.9375ZM5.25 5.0625C5.14645 5.0625 5.0625 5.14645 5.0625 5.25V8.98259C7.69023 10.1082 7.69023 13.8918 5.0625 15.0174V18.75C5.0625 18.8536 5.14645 18.9375 5.25 18.9375H8.99033C10.1484 16.3704 13.8516 16.3704 15.0097 18.9375H18.75C18.8536 18.9375 18.9375 18.8536 18.9375 18.75V5.25C18.9375 5.14645 18.8536 5.0625 18.75 5.0625H5.25Z" fill="white"/></svg>`,
    experience_container: "",
    empty: "",
    loading: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="${classNames("visual-builder__cursor-icon--loader", visualBuilderStyles()["visual-builder__cursor-icon--loader"])}"><path d="M15.5023 18.3501C13.5466 19.6388 11.2007 20.2002 8.87354 19.9364C6.54637 19.6725 4.38563 18.6002 2.76808 16.9065C1.15053 15.2127 0.178807 13.0049 0.0223406 10.6681C-0.134126 8.33122 0.534595 6.0136 1.9119 4.1193C3.2892 2.22501 5.2877 0.874235 7.55893 0.302518C9.83015 -0.2692 12.23 -0.0255895 14.34 0.990871C16.45 2.00733 18.1363 3.73215 19.1048 5.86457C20.0734 7.997 20.2627 10.4017 19.6399 12.6595L17.7119 12.1276C18.2102 10.3214 18.0587 8.3976 17.2839 6.69166C16.509 4.98572 15.16 3.60586 13.472 2.7927C11.784 1.97953 9.86412 1.78464 8.04714 2.24201C6.23016 2.69939 4.63136 3.78001 3.52952 5.29544C2.42768 6.81088 1.8927 8.66498 2.01787 10.5345C2.14305 12.4039 2.92043 14.1702 4.21446 15.5252C5.5085 16.8802 7.23709 17.738 9.09883 17.9491C10.9606 18.1601 12.8373 17.711 14.4018 16.6801L15.5023 18.3501Z" fill="white"/></svg>`,
    taxonomy: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 1.52727C0 0.683783 0.683783 0 1.52727 0H22.4727C23.3162 0 24 0.683783 24 1.52727V5.01818C24 5.86167 23.3162 6.54545 22.4727 6.54545H4.8V11.3455H8.72727V10.2545C8.72727 9.41106 9.41106 8.72727 10.2545 8.72727H17.2364C18.0799 8.72727 18.7636 9.41106 18.7636 10.2545V13.7455C18.7636 14.5889 18.0799 15.2727 17.2364 15.2727H10.2545C9.41106 15.2727 8.72727 14.5889 8.72727 13.7455V12.6545H4.8V20.0727H8.72727V18.9818C8.72727 18.1383 9.41106 17.4545 10.2545 17.4545H17.2364C18.0799 17.4545 18.7636 18.1383 18.7636 18.9818V22.4727C18.7636 23.3162 18.0799 24 17.2364 24H10.2545C9.41106 24 8.72727 23.3162 8.72727 22.4727V21.3818H4.14545C3.78396 21.3818 3.49091 21.0888 3.49091 20.7273V6.54545H1.52727C0.683785 6.54545 0 5.86167 0 5.01818V1.52727ZM10.0364 22.4727C10.0364 22.5932 10.134 22.6909 10.2545 22.6909H17.2364C17.3569 22.6909 17.4545 22.5932 17.4545 22.4727V18.9818C17.4545 18.8613 17.3569 18.7636 17.2364 18.7636H10.2545C10.134 18.7636 10.0364 18.8613 10.0364 18.9818V22.4727ZM10.0364 13.7455V10.2545C10.0364 10.134 10.134 10.0364 10.2545 10.0364H17.2364C17.3569 10.0364 17.4545 10.134 17.4545 10.2545V13.7455C17.4545 13.866 17.3569 13.9636 17.2364 13.9636H10.2545C10.134 13.9636 10.0364 13.866 10.0364 13.7455ZM22.4727 5.23636H1.52727C1.40677 5.23636 1.30909 5.13868 1.30909 5.01818V1.52727C1.30909 1.40677 1.40677 1.30909 1.52727 1.30909H22.4727C22.5932 1.30909 22.6909 1.40677 22.6909 1.52727V5.01818C22.6909 5.13868 22.5932 5.23636 22.4727 5.23636Z" fill="white"/></svg>`,
    discussion: `<svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.15007 0.985773C1.1065 0.985773 1.06471 1.00308 1.03389 1.03389C1.00308 1.06471 0.985773 1.1065 0.985773 1.15007V14.1925C0.986259 14.2231 0.995289 14.253 1.01186 14.2788C1.02866 14.3049 1.05253 14.3258 1.08069 14.3389C1.10886 14.352 1.14017 14.3568 1.17098 14.3529C1.20142 14.349 1.23014 14.3366 1.25391 14.3172L1.25479 14.3165L3.95491 12.0514C4.00036 12.0132 4.05232 11.9836 4.1083 11.9639L4.41225 11.8571C4.46474 11.8387 4.51999 11.8293 4.57563 11.8293H15.6081C15.6517 11.8293 15.6934 11.812 15.7243 11.7812C15.7551 11.7503 15.7724 11.7086 15.7724 11.665V1.15007C15.7724 1.10649 15.7551 1.06471 15.7243 1.03389C15.6934 1.00308 15.6517 0.985773 15.6081 0.985773H1.15007ZM0.336848 0.336848C0.552527 0.121168 0.845051 0 1.15007 0H15.6081C15.9131 0 16.2056 0.121168 16.4213 0.336848C16.637 0.552528 16.7581 0.845053 16.7581 1.15007V11.665C16.7581 11.97 16.637 12.2625 16.4213 12.4782C16.2056 12.6939 15.9131 12.8151 15.6081 12.8151H4.6597L4.51972 12.8642L1.88326 15.076C1.71571 15.2146 1.51228 15.3029 1.29657 15.3306C1.08086 15.3583 0.861722 15.3243 0.664572 15.2325C0.467421 15.1407 0.300341 14.9949 0.182714 14.812C0.0650888 14.629 0.00173885 14.4165 1.54726e-05 14.199L0 14.1951V1.15007C0 0.845051 0.121168 0.552527 0.336848 0.336848Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.25746 5.09316C5.25746 4.82095 5.47813 4.60028 5.75034 4.60028H11.0078C11.28 4.60028 11.5007 4.82095 11.5007 5.09316C11.5007 5.36538 11.28 5.58605 11.0078 5.58605H5.75034C5.47813 5.58605 5.25746 5.36538 5.25746 5.09316Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.25746 7.72189C5.25746 7.44968 5.47813 7.229 5.75034 7.229H11.0078C11.28 7.229 11.5007 7.44968 11.5007 7.72189C11.5007 7.99411 11.28 8.21478 11.0078 8.21478H5.75034C5.47813 8.21478 5.25746 7.99411 5.25746 7.72189Z" fill="white"/></svg>`,
};
const cursor = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M0.0167948 0.602214C-0.0784404 0.246792 0.246794 -0.0784402 0.602216 0.0167948L15.6457 4.04767C16.0914 4.1671 16.1259 4.78625 15.6962 4.95447L8.17161 7.90048C8.04753 7.94906 7.94936 8.04723 7.90078 8.17131L4.95449 15.6962C4.78627 16.1259 4.16712 16.0914 4.04769 15.6457L0.0167948 0.602214Z" fill="#5D50BE"/></svg>`;
function generateCustomCursor({ fieldType, customCursor, fieldDisabled = false, }) {
    const icon = fieldType ? FieldTypeIconsMap[fieldType] : "";
    const prevDataIcon = customCursor.getAttribute("data-icon");
    if (prevDataIcon === fieldType) {
        return;
    }
    customCursor.innerHTML = `<div class="${classNames("visual-builder__cursor-wrapper", {
        "visual-builder__cursor-disabled": fieldDisabled,
        [visualBuilderStyles()["visual-builder__cursor-disabled"]]: fieldDisabled,
    })}"><div class="${classNames("visual-builder__cursor-pointer", visualBuilderStyles()["visual-builder__cursor-pointer"])}">${cursor}</div><div class="${classNames("visual-builder__cursor-icon", visualBuilderStyles()["visual-builder__cursor-icon"])}">${icon}</div>`;
    customCursor.setAttribute("data-icon", fieldType);
}
function getFieldIcon(fieldSchema) {
    const fieldType = getFieldType(fieldSchema);
    return FieldTypeIconsMap[fieldType];
}

/**
 * Adds a hover outline to the target element.
 * @param targetElement - The element to add the hover outline to.
 * @param isAnchorElement - Boolean to check for anchor elements.
 * @returns void
 */
function addHoverOutline(targetElement, disabled) {
    const targetElementDimension = targetElement.getBoundingClientRect();
    const hoverOutline = document.querySelector(".visual-builder__hover-outline");
    if (hoverOutline) {
        hoverOutline.classList.remove(visualBuilderStyles()["visual-builder__hover-outline--hidden"]);
        if (disabled) {
            hoverOutline.classList.add(visualBuilderStyles()["visual-builder__hover-outline--disabled"]);
        }
        else {
            hoverOutline.classList.remove(visualBuilderStyles()["visual-builder__hover-outline--disabled"]);
        }
        hoverOutline.style.top = `${targetElementDimension.top + window.scrollY}px`;
        hoverOutline.style.left = `${targetElementDimension.left}px`;
        hoverOutline.style.width = `${targetElementDimension.width}px`;
        hoverOutline.style.height = `${targetElementDimension.height}px`;
    }
}

const skeletonTileProgressSlide = h `
    0%, 100% {
        fill: #edf1f7;
    }
    60% {
        opacity: 0.4;
    }
`;
const dotKeyframes = h `
  0% {
    opacity: 0.2;
    transform: scale(0.8, 0.8);
  }

  50% {
    opacity: 1;
    transform: scale(1.2, 1.2);
  }

  100% {
    opacity: 0;
    transform: scale(1, 1);
  }
`;
function collabStyles() {
    return {
        "collab-indicator": u$1 `
            width: 2.25rem;
            height: 2.25rem;
            background-color: gray;
            border-radius: 50% 50% 50% 0%;
            border: 2px solid white;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        `,
        "collab-popup": u$1 `
            position: fixed;
            z-index: 1000;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            border: 1px solid #e5e7eb;
            overflow: auto;
        `,
        "collab-avatar": u$1 `
            background-color: #edf1f7;
            border: 1.5px solid #ffffff;
            border-radius: 50%;
            font-family: Inter;
            font-weight: 600;
            justify-content: center;
            position: relative;
        `,
        "collab-avatar--single": u$1 `
            border: none;
            font-size: 0.6875rem;
            height: 2rem;
            width: 2rem;
            border-radius: 22.5rem;
            border: 0.125rem solid #dde3ee;
            background: #ffffff;
            position: relative;
            overflow: hidden;

            &:hover .collab-avatar__image {
                filter: grayscale(0);
            }
        `,
        "collab-avatar__image": u$1 `
            filter: grayscale(1);
            transition: filter 300ms ease;
            border-radius: 50%;
            height: 0;
            left: 50%;
            min-width: 100%;
            position: absolute;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 0;
        `,
        "collab-avatar__link": u$1 `
            color: #475161;
            cursor: pointer;
            height: 100%;
            justify-content: center;
            overflow: hidden;
            text-decoration: none;
            text-transform: uppercase;
            transition:
                background-color 300ms ease,
                color 300ms ease;
            width: 100%;
            font-weight: 600;
            font-size: 0.75rem;
        `,
        "collab-tooltip--wrapper": u$1 `
            position: relative;
            display: inline-block;
        `,
        "collab-tooltip": u$1 `
            position: fixed;
            z-index: 2147483647 !important;
            padding: 8px 12px;
            font-size: 14px;
            color: #f7f9fc;
            background-color: #767676;
            border-radius: 4px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

            opacity: 0;
            animation: simpleFade 0.15s ease-in forwards;

            @keyframes simpleFade {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 1;
                }
            }
        `,
        "collab-tooltip--top": u$1 `
            &::before {
                content: "";
                position: absolute;
                bottom: -5px;
                left: 50%;
                transform: translateX(-50%);
                border-width: 5px 5px 0;
                border-style: solid;
                border-color: #767676 transparent transparent;
            }
        `,
        "collab-tooltip--bottom": u$1 `
            &::before {
                content: "";
                position: absolute;
                top: -5px;
                left: 50%;
                transform: translateX(-50%);
                border-width: 0 5px 5px;
                border-style: solid;
                border-color: transparent transparent #767676;
            }
        `,
        "collab-tooltip--left": u$1 `
            &::before {
                content: "";
                position: absolute;
                right: -5px;
                top: 50%;
                transform: translateY(-50%);
                border-width: 5px 0 5px 5px;
                border-style: solid;
                border-color: transparent transparent transparent #767676;
            }
        `,
        "collab-tooltip--right": u$1 `
            &::before {
                content: "";
                position: absolute;
                left: -5px;
                top: 50%;
                transform: translateY(-50%);
                border-width: 5px 5px 5px 0;
                border-style: solid;
                border-color: transparent #767676 transparent transparent;
            }
        `,
        "collab-icon": u$1 `
            height: 1.25rem;
            width: 1.25rem;
            cursor: pointer;
        `,
        "collab-icon-wrapper": u$1 `
            padding: 0 0.5rem;
        `,
        "collab-button--basestyle": u$1 `
            box-sizing: border-box;
            -moz-box-sizing: border-box;
            -webkit-box-sizing: border-box;
            background-color: transparent;
            border: 1px solid transparent;
            border-radius: 4px;
            cursor: pointer;
            font-family: Inter, sans-serif;
            font-size: 1rem;
            font-weight: 600;
            line-height: 1;
            min-height: 2rem;
            min-width: 2rem;
            padding: 0.5rem 1rem;
            position: relative;
            text-align: center;
            transition:
                color 0.15s ease-in-out,
                background-color 0.15s ease-in-out,
                border-color 0.15s ease-in-out,
                box-shadow 0.15s ease-in-out;
            vertical-align: middle;
            cursor: pointer;
            opacity: 1;
            pointer-events: auto;
        `,
        "collab-button--disabled": u$1 `
            cursor: not-allowed;
            opacity: 0.4;
            pointer-events: auto;
        `,
        "collab-button--loading": u$1 `
            cursor: default;
            pointer-events: none;
        `,
        "collab-button--loader": u$1 `
            display: flex;
            justify-content: center;
            text-align: center;
        `,
        "collab-button--loader--wrapper": u$1 `
            left: 50%;
            position: absolute;
            top: 50%;
            -webkit-transform: translateX(-50%) translateY(-50%);
            -moz-transform: translateX(-50%) translateY(-50%);
        `,
        "collab-button--loader--animation": u$1 `
            animation: ${dotKeyframes} 1.5s infinite ease-in-out;

            border-radius: 0.625rem;
            display: inline-block;
            height: 0.3125rem;
            margin-right: 0.25rem;
            width: 0.3125rem;

            &:nth-child(2) {
                animation-delay: 0.5s;
            }

            &:nth-child(3) {
                animation-delay: 1s;
                margin-right: 0;
            }
        `,
        "collab-button--visible": u$1 `
            visibility: visible;
        `,
        "collab-button--hidden": u$1 `
            visibility: hidden;
        `,
        "collab-button--loading--color": {
            primary: u$1 `
                background-color: #f9f8ff !important;
            `,
            secondary: u$1 `
                background-color: #6c5ce7 !important;
            `,
            tertiary: u$1 `
                background-color: #6c5ce7 !important;
            `,
            destructive: u$1 `
                background-color: #f9f8ff !important;
            `,
        },
        "collab-button--type": {
            primary: u$1 `
                background-color: #6c5ce7 !important;
                color: #ffffff;
                &:hover {
                    background-color: #5d50be !important;
                }
                &:focus {
                    box-shadow: 0px 0px 0px 2px #ada4f4 !important;
                }
                &:active {
                    background-color: #3e3871 !important;
                }
            `,
            secondary: u$1 `
                background-color: #f9f8ff !important;
                border: 1px solid #6c5ce7 !important;
                color: #6c5ce7 !important;
                &:hover {
                    border-color: #5d50be !important;
                    color: #5d50be !important;
                }
                &:focus {
                    box-shadow: 0px 0px 0px 2px #ada4f4 !important;
                }
                &:active {
                    border-color: #3e3871 !important;
                    color: #3e3871 !important;
                }
            `,
            tertiary: u$1 `
                color: #6c5ce7 !important;
                &:hover {
                    color: #5d50be !important;
                }
                &:focus {
                    box-shadow: 0px 0px 0px 2px #ada4f4 !important;
                }
            `,
            destructive: u$1 `
                background-color: #a31b00 !important;
                color: #ffffff !important;
                &:hover {
                    background-color: #701300 !important;
                }
                &:focus {
                    box-shadow: 0px 0px 0px 2px #ada4f4 !important;
                }
            `,
        },
        "collab-button--size": {
            large: u$1 `
                font-size: 1rem;
                min-height: 2.5rem;
                max-height: 2.5rem;
            `,
            regular: u$1 `
                margin-top: -1px;
            `,
            small: u$1 `
                font-size: 0.875rem;
                min-height: 2rem;
                max-height: 2rem;
                padding: 0.3125rem 1rem;
            `,
        },
        "collab-button--icon-allignment": {
            left: u$1 `
                svg:first-child {
                    float: left;
                    margin-left: 0;
                    margin-right: 0.5rem;
                }
            `,
            right: u$1 `
                svg:first-child {
                    float: right;
                    margin-left: 0.5rem;
                    margin-right: 0;
                }
            `,
            both: u$1 `
                svg:first-child {
                    float: left;
                    margin-right: 0.5rem;
                    margin-left: 0;
                }
                svg:last-child {
                    float: right;
                    margin-left: 0.5rem;
                    margin-right: 0;
                }
            `,
        },
        "collab-button-group": u$1 `
            display: flex;
            & > button {
                margin-right: 1rem;
                &:last-child {
                    margin-right: 0;
                }
            }
        `,
        "collab-skeletonTileSvgClass": u$1 `
            & > g rect {
                animation: ${skeletonTileProgressSlide} 1.8s infinite;
            }
        `,
        "collab-thread-body-comment--loader": u$1 `
            padding: 0.625rem;
        `,
        "collab-thread--wrapper": u$1 `
            cursor: default;
            position: relative;
            padding: 0 !important;
            font-family: Inter;
            color: #475161;
            width: 20.75rem;
        `,
        "collab-thread--container": u$1 `
            max-height: 23.125rem;
            display: flex;
            flex-direction: column;
            overflow: hidden;
        `,
        "collab-thread-header--wrapper": u$1 `
            height: 2.5rem;
            padding: 0.2rem 0.1rem 0rem 0.625rem;
        `,
        "collab-thread-header--container": u$1 `
            justify-content: space-between;
            width: 100%;
        `,
        "collab-thread-header--title": u$1 `
            font-weight: 600;
            font-size: 0.875rem;
        `,
        "collab-thread-header--resolve": u$1 `
            border-radius: 6px !important;
        `,
        "collab-thread-header--resolve--icon": u$1 `
            width: 1.25rem;
            height: 1.25rem;
            margin-right: 0.5rem !important;
        `,
        "collab-thread-header--resolve--text": u$1 `
            font-size: 0.875rem;
        `,
        "collab-thread-footer--wrapper": u$1 `
            height: 3.5rem;
            width: 100%;
            flex-direction: row-reverse;
            padding: 0 0.9375rem;
            flex-shrink: 0;
        `,
        "collab-thread-body--wrapper": u$1 `
            border: solid #edf1f7;
            border-width: 0.0625rem 0;
            flex: 1;
            overflow: auto;
            display: flex;
            flex-direction: column;
        `,
        "collab-thread-input-indicator--wrapper": u$1 `
            padding: 0 0.5rem;
            font-weight: 400;
            font-size: 0.875rem;
            line-height: 150%;
            letter-spacing: 0.01em;
            min-height: 1.3125rem !important;
        `,
        "collab-thread-input-indicator--error": u$1 `
            width: 100%;
            margin-right: 0.5rem;
            color: #d62400;
        `,
        "collab-thread-input-indicator--count": u$1 `
            color: #475161;
        `,
        "collab-thread-comment--user-details": u$1 `
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
        `,
        "collab-thread-comment--user-details__text": u$1 `
            padding-left: 0.625rem;
            flex-grow: 1;
            min-width: 0;
        `,
        "collab-thread-comment--user-name": u$1 `
            font-style: normal;
            font-weight: 600;
            font-size: 0.75rem;
            line-height: 150%;
            letter-spacing: 0.015rem;
            color: #475161;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        `,
        "collab-thread-comment--list": u$1 `
            max-height: 10.9rem;
            display: flex;
            overflow: auto;
            flex-flow: column-reverse;
        `,
        "collab-thread-comment-seperator": u$1 `
            width: 100%;
            height: 1.5rem;
            stroke-width: 0.0625rem;
            stroke: #dde3ee;
        `,
        "collab-thread-comment--time-details": u$1 `
            font-weight: 400;
            font-size: 0.75rem;
            line-height: 150%;
            font-style: Inter;
            letter-spacing: 0.015rem;
            color: #6e6b86;
        `,
        "collab-thread-comment--message": u$1 `
            font-weight: 400;
            font-size: 1rem;
            line-height: 1.5rem;
            color: #475161;
            word-break: break-all;
            width: calc(100% - 10px);
            min-height: 2.25rem;
            white-space: pre-wrap;

            b {
                color: #6c5ce7;
                font-weight: 400;
            }
        `,
        "collab-thread-comment--wrapper": u$1 `
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 0.625rem;
            padding: 0.625rem;
        `,
        "collab-thread-comment-action--wrapper": u$1 `
            margin-left: auto;
            display: flex;
        `,
        "collab-thread-body--input--wrapper": u$1 `
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
            grid-gap: 0.25rem;
        `,
        "collab-thread-body--input": u$1 `
            position: relative;
            overflow-y: visible;
        `,
        "collab-thread-body--input--textarea--wrapper": u$1 `
            width: 100%;
            transition: height 0.2s ease-in 0s;
        `,
        "collab-thread-body--input--textarea": u$1 `
            display: block;
            width: 100%;
            position: relative;
            top: 0;
            left: 0;
            box-sizing: border-box;
            background-color: #ffffff;
            font-family: inherit;
            font-size: 1rem;
            letter-spacing: inherit;
            height: 100%;
            bottom: 0;
            overflow: auto;
            resize: vertical;
            border-radius: 4px;
            border: 0.0625rem solid #dde3ee;
            line-height: 1.375rem;
            color: #222222;
            padding: 0.5rem 1rem;
            max-height: 6.25rem;
            min-height: 4.125rem;
            transition:
                border 0.2s ease,
                box-shadow 0.2s ease,
                background-color 0.2s ease;
        `,
        "collab-thread-body--input--textarea--focus": u$1 `
            background-color: #ffffff !important;
            border: 0.0625rem solid #5d50be !important;
            box-shadow: 0 0 0 0.0625rem #5d50be !important;
            border-radius: 4px !important;
            outline: none;
        `,
        "collab-thread-body--input--textarea--hover": u$1 `
            background-color: #edf1f7;
            border: 0.0625rem solid #5d50be !important;
            box-shadow: 0 0 0 0.0625rem #5d50be !important;
        `,
        "collab-thread-body--input--textarea--suggestionsList": u$1 `
            list-style: none;
            padding-inline: unset;
            position: fixed;
            background-color: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            box-shadow:
                0 4px 6px -1px rgba(0, 0, 0, 0.1),
                0 2px 4px -1px rgba(0, 0, 0, 0.06);
            max-height: 192px;
            overflow-y: auto;
            width: 256px;
            max-height: 160px;
            z-index: 50;
            animation: fadeIn 0.2s ease-in-out;

            @keyframes fadeIn {
                from {
                    opacity: 0;
                    transform: translateY(-4px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `,
        "collab-thread-body--input--textarea--suggestionsList--item": u$1 `
            width: 100%;
            padding: 8px 16px;
            text-align: left;
            border: none;
            background: none;
            cursor: pointer;
            font-size: 14px;
            transition: background-color 0.2s;

            &:hover {
                background-color: #f3f4f6;
                color: #5d50be;
            }
        `,
        "collab-thread-body--input--textarea--suggestionsList--item-selected": u$1 `
            background-color: #f3f4f6;
            color: #5d50be;
        `,
    };
}
const flexCentered = u$1 `
    display: flex;
    align-items: center;
    justify-content: center;
`;
const flexAlignCenter = u$1 `
    display: flex;
    align-items: center;
`;

function g(n,t){for(var e in t)n[e]=t[e];return n}function C(n,t){for(var e in n)if("__source"!==e&&!(e in t))return  true;for(var r in t)if("__source"!==r&&n[r]!==t[r])return  true;return  false}function E(n,t){this.props=n,this.context=t;}function w(n,e){function r(n){var t=this.props.ref,r=t==n.ref;return !r&&t&&(t.call?t(null):t.current=null),e?!e(this.props,n)||!r:C(this.props,n)}function u(e){return this.shouldComponentUpdate=r,y$3(n,e)}return u.displayName="Memo("+(n.displayName||n.name)+")",u.prototype.isReactComponent=true,u.__f=true,u}(E.prototype=new b$3).isPureReactComponent=true,E.prototype.shouldComponentUpdate=function(n,t){return C(this.props,n)||C(this.state,t)};var x=l$3.__b;l$3.__b=function(n){n.type&&n.type.__f&&n.ref&&(n.props.ref=n.ref,n.ref=null),x&&x(n);};var R="undefined"!=typeof Symbol&&Symbol.for&&Symbol.for("react.forward_ref")||3911;function N(n){function t(t){var e=g({},t);return delete e.ref,n(e,t.ref||null)}return t.$$typeof=R,t.render=t,t.prototype.isReactComponent=t.__f=true,t.displayName="ForwardRef("+(n.displayName||n.name)+")",t}var k=function(n,t){return null==n?null:H$1(H$1(n).map(t))},A={map:k,forEach:k,count:function(n){return n?H$1(n).length:0},only:function(n){var t=H$1(n);if(1!==t.length)throw "Children.only";return t[0]},toArray:H$1},O=l$3.__e;l$3.__e=function(n,t,e,r){if(n.then)for(var u,o=t;o=o.__;)if((u=o.__c)&&u.__c)return null==t.__e&&(t.__e=e.__e,t.__k=e.__k),u.__c(n,t);O(n,t,e,r);};var T=l$3.unmount;function F(n,t,e){return n&&(n.__c&&n.__c.__H&&(n.__c.__H.__.forEach(function(n){"function"==typeof n.__c&&n.__c();}),n.__c.__H=null),null!=(n=g({},n)).__c&&(n.__c.__P===e&&(n.__c.__P=t),n.__c=null),n.__k=n.__k&&n.__k.map(function(n){return F(n,t,e)})),n}function I(n,t,e){return n&&e&&(n.__v=null,n.__k=n.__k&&n.__k.map(function(n){return I(n,t,e)}),n.__c&&n.__c.__P===t&&(n.__e&&e.appendChild(n.__e),n.__c.__e=true,n.__c.__P=e)),n}function L(){this.__u=0,this.t=null,this.__b=null;}function U(n){var t=n.__.__c;return t&&t.__a&&t.__a(n)}function D(n){var e,r,u;function o(o){if(e||(e=n()).then(function(n){r=n.default||n;},function(n){u=n;}),u)throw u;if(!r)throw e;return y$3(r,o)}return o.displayName="Lazy",o.__f=true,o}function M(){this.u=null,this.o=null;}l$3.unmount=function(n){var t=n.__c;t&&t.__R&&t.__R(),t&&32&n.__u&&(n.type=null),T&&T(n);},(L.prototype=new b$3).__c=function(n,t){var e=t.__c,r=this;null==r.t&&(r.t=[]),r.t.push(e);var u=U(r.__v),o=false,i=function(){o||(o=true,e.__R=null,u?u(l):l());};e.__R=i;var l=function(){if(!--r.__u){if(r.state.__a){var n=r.state.__a;r.__v.__k[0]=I(n,n.__c.__P,n.__c.__O);}var t;for(r.setState({__a:r.__b=null});t=r.t.pop();)t.forceUpdate();}};r.__u++||32&t.__u||r.setState({__a:r.__b=r.__v.__k[0]}),n.then(i,i);},L.prototype.componentWillUnmount=function(){this.t=[];},L.prototype.render=function(n,e){if(this.__b){if(this.__v.__k){var r=document.createElement("div"),o=this.__v.__k[0].__c;this.__v.__k[0]=F(this.__b,r,o.__O=o.__P);}this.__b=null;}var i=e.__a&&y$3(g$4,null,n.fallback);return i&&(i.__u&=-33),[y$3(g$4,null,e.__a?null:n.children),i]};var V=function(n,t,e){if(++e[1]===e[0]&&n.o.delete(t),n.props.revealOrder&&("t"!==n.props.revealOrder[0]||!n.o.size))for(e=n.u;e;){for(;e.length>3;)e.pop()();if(e[1]<e[0])break;n.u=e=e[2];}};function W(n){return this.getChildContext=function(){return n.context},n.children}function P(n){var e=this,r=n.i;e.componentWillUnmount=function(){B$2(null,e.l),e.l=null,e.i=null;},e.i&&e.i!==r&&e.componentWillUnmount(),e.l||(e.i=r,e.l={nodeType:1,parentNode:r,childNodes:[],appendChild:function(n){this.childNodes.push(n),e.i.appendChild(n);},insertBefore:function(n,t){this.childNodes.push(n),e.i.appendChild(n);},removeChild:function(n){this.childNodes.splice(this.childNodes.indexOf(n)>>>1,1),e.i.removeChild(n);}}),B$2(y$3(W,{context:e.context},n.__v),e.l);}function j(n,e){var r=y$3(P,{__v:n,i:e});return r.containerInfo=e,r}(M.prototype=new b$3).__a=function(n){var t=this,e=U(t.__v),r=t.o.get(n);return r[0]++,function(u){var o=function(){t.props.revealOrder?(r.push(u),V(t,n,r)):u();};e?e(o):o();}},M.prototype.render=function(n){this.u=null,this.o=new Map;var t=H$1(n.children);n.revealOrder&&"b"===n.revealOrder[0]&&t.reverse();for(var e=t.length;e--;)this.o.set(t[e],this.u=[1,0,this.u]);return n.children},M.prototype.componentDidUpdate=M.prototype.componentDidMount=function(){var n=this;this.o.forEach(function(t,e){V(n,e,t);});};var z="undefined"!=typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103,B=/^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/,H=/^on(Ani|Tra|Tou|BeforeInp|Compo)/,Z=/[A-Z0-9]/g,Y="undefined"!=typeof document,$=function(n){return ("undefined"!=typeof Symbol&&"symbol"==typeof Symbol()?/fil|che|rad/:/fil|che|ra/).test(n)};function q(n,t,e){return null==t.__k&&(t.textContent=""),B$2(n,t),"function"==typeof e&&e(),n?n.__c:null}function G(n,t,e){return E$2(n,t),"function"==typeof e&&e(),n?n.__c:null}b$3.prototype.isReactComponent={},["componentWillMount","componentWillReceiveProps","componentWillUpdate"].forEach(function(t){Object.defineProperty(b$3.prototype,t,{configurable:true,get:function(){return this["UNSAFE_"+t]},set:function(n){Object.defineProperty(this,t,{configurable:true,writable:true,value:n});}});});var J=l$3.event;function K(){}function Q(){return this.cancelBubble}function X(){return this.defaultPrevented}l$3.event=function(n){return J&&(n=J(n)),n.persist=K,n.isPropagationStopped=Q,n.isDefaultPrevented=X,n.nativeEvent=n};var nn,tn={enumerable:false,configurable:true,get:function(){return this.class}},en=l$3.vnode;l$3.vnode=function(n){"string"==typeof n.type&&function(n){var t=n.props,e=n.type,u={};for(var o in t){var i=t[o];if(!("value"===o&&"defaultValue"in t&&null==i||Y&&"children"===o&&"noscript"===e||"class"===o||"className"===o)){var l=o.toLowerCase();"defaultValue"===o&&"value"in t&&null==t.value?o="value":"download"===o&&true===i?i="":"translate"===l&&"no"===i?i=false:"ondoubleclick"===l?o="ondblclick":"onchange"!==l||"input"!==e&&"textarea"!==e||$(t.type)?"onfocus"===l?o="onfocusin":"onblur"===l?o="onfocusout":H.test(o)?o=l:-1===e.indexOf("-")&&B.test(o)?o=o.replace(Z,"-$&").toLowerCase():null===i&&(i=void 0):l=o="oninput","oninput"===l&&u[o=l]&&(o="oninputCapture"),u[o]=i;}}"select"==e&&u.multiple&&Array.isArray(u.value)&&(u.value=H$1(t.children).forEach(function(n){n.props.selected=-1!=u.value.indexOf(n.props.value);})),"select"==e&&null!=u.defaultValue&&(u.value=H$1(t.children).forEach(function(n){n.props.selected=u.multiple?-1!=u.defaultValue.indexOf(n.props.value):u.defaultValue==n.props.value;})),t.class&&!t.className?(u.class=t.class,Object.defineProperty(u,"className",tn)):(t.className&&!t.class||t.class&&t.className)&&(u.class=u.className=t.className),n.props=u;}(n),n.$$typeof=z,en&&en(n);};var rn=l$3.__r;l$3.__r=function(n){rn&&rn(n),nn=n.__c;};var un=l$3.diffed;l$3.diffed=function(n){un&&un(n);var t=n.props,e=n.__e;null!=e&&"textarea"===n.type&&"value"in t&&t.value!==e.value&&(e.value=null==t.value?"":t.value),nn=null;};var on={ReactCurrentDispatcher:{current:{readContext:function(n){return nn.__n[n.__c].props.value}}}};function cn(n){return y$3.bind(null,n)}function fn(n){return !!n&&n.$$typeof===z}function an(n){return fn(n)&&n.type===g$4}function sn(n){return fn(n)?F$2.apply(null,arguments):n}function hn(n){return !!n.__k&&(B$2(null,n),true)}function vn(n){return n&&(n.base||1===n.nodeType&&n)||null}var dn=function(n,t){return n(t)},pn=function(n,t){return n(t)},mn=g$4;function yn(n){n();}function _n(n){return n}function bn(){return [false,yn]}var Sn=A$1,gn=fn;function Cn(n,t){var e=t(),r=p$3({h:{__:e,v:t}}),u=r[0].h,o=r[1];return A$1(function(){u.__=e,u.v=t,En(u)&&o({h:u});},[n,e,t]),_$1(function(){return En(u)&&o({h:u}),n(function(){En(u)&&o({h:u});})},[n]),e}function En(n){var t,e,r=n.v,u=n.__;try{var o=r();return !((t=u)===(e=o)&&(0!==t||1/t==1/e)||t!=t&&e!=e)}catch(n){return  true}}var wn={useState:p$3,useId:g$3,useReducer:y$2,useEffect:_$1,useLayoutEffect:A$1,useInsertionEffect:Sn,useTransition:bn,useDeferredValue:_n,useSyncExternalStore:Cn,startTransition:yn,useRef:F$1,useImperativeHandle:T$1,useMemo:q$1,useCallback:x$1,useContext:P$1,useDebugValue:V$1,version:"17.0.2",Children:A,render:q,hydrate:G,unmountComponentAtNode:hn,createPortal:j,createElement:y$3,createContext:G$1,createFactory:cn,cloneElement:sn,createRef:_$2,Fragment:g$4,isValidElement:fn,isElement:gn,isFragment:an,findDOMNode:vn,Component:b$3,PureComponent:E,memo:w,forwardRef:N,flushSync:pn,unstable_batchedUpdates:dn,StrictMode:mn,Suspense:L,SuspenseList:M,lazy:D,__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:on};

/*! @license DOMPurify 3.2.4 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.2.4/LICENSE */

const {
  entries,
  setPrototypeOf,
  isFrozen,
  getPrototypeOf,
  getOwnPropertyDescriptor
} = Object;
let {
  freeze,
  seal,
  create
} = Object; // eslint-disable-line import/no-mutable-exports
let {
  apply,
  construct
} = typeof Reflect !== 'undefined' && Reflect;
if (!freeze) {
  freeze = function freeze(x) {
    return x;
  };
}
if (!seal) {
  seal = function seal(x) {
    return x;
  };
}
if (!apply) {
  apply = function apply(fun, thisValue, args) {
    return fun.apply(thisValue, args);
  };
}
if (!construct) {
  construct = function construct(Func, args) {
    return new Func(...args);
  };
}
const arrayForEach = unapply(Array.prototype.forEach);
const arrayLastIndexOf = unapply(Array.prototype.lastIndexOf);
const arrayPop = unapply(Array.prototype.pop);
const arrayPush = unapply(Array.prototype.push);
const arraySplice = unapply(Array.prototype.splice);
const stringToLowerCase = unapply(String.prototype.toLowerCase);
const stringToString = unapply(String.prototype.toString);
const stringMatch = unapply(String.prototype.match);
const stringReplace = unapply(String.prototype.replace);
const stringIndexOf = unapply(String.prototype.indexOf);
const stringTrim = unapply(String.prototype.trim);
const objectHasOwnProperty = unapply(Object.prototype.hasOwnProperty);
const regExpTest = unapply(RegExp.prototype.test);
const typeErrorCreate = unconstruct(TypeError);
/**
 * Creates a new function that calls the given function with a specified thisArg and arguments.
 *
 * @param func - The function to be wrapped and called.
 * @returns A new function that calls the given function with a specified thisArg and arguments.
 */
function unapply(func) {
  return function (thisArg) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    return apply(func, thisArg, args);
  };
}
/**
 * Creates a new function that constructs an instance of the given constructor function with the provided arguments.
 *
 * @param func - The constructor function to be wrapped and called.
 * @returns A new function that constructs an instance of the given constructor function with the provided arguments.
 */
function unconstruct(func) {
  return function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    return construct(func, args);
  };
}
/**
 * Add properties to a lookup table
 *
 * @param set - The set to which elements will be added.
 * @param array - The array containing elements to be added to the set.
 * @param transformCaseFunc - An optional function to transform the case of each element before adding to the set.
 * @returns The modified set with added elements.
 */
function addToSet(set, array) {
  let transformCaseFunc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : stringToLowerCase;
  if (setPrototypeOf) {
    // Make 'in' and truthy checks like Boolean(set.constructor)
    // independent of any properties defined on Object.prototype.
    // Prevent prototype setters from intercepting set as a this value.
    setPrototypeOf(set, null);
  }
  let l = array.length;
  while (l--) {
    let element = array[l];
    if (typeof element === 'string') {
      const lcElement = transformCaseFunc(element);
      if (lcElement !== element) {
        // Config presets (e.g. tags.js, attrs.js) are immutable.
        if (!isFrozen(array)) {
          array[l] = lcElement;
        }
        element = lcElement;
      }
    }
    set[element] = true;
  }
  return set;
}
/**
 * Clean up an array to harden against CSPP
 *
 * @param array - The array to be cleaned.
 * @returns The cleaned version of the array
 */
function cleanArray(array) {
  for (let index = 0; index < array.length; index++) {
    const isPropertyExist = objectHasOwnProperty(array, index);
    if (!isPropertyExist) {
      array[index] = null;
    }
  }
  return array;
}
/**
 * Shallow clone an object
 *
 * @param object - The object to be cloned.
 * @returns A new object that copies the original.
 */
function clone(object) {
  const newObject = create(null);
  for (const [property, value] of entries(object)) {
    const isPropertyExist = objectHasOwnProperty(object, property);
    if (isPropertyExist) {
      if (Array.isArray(value)) {
        newObject[property] = cleanArray(value);
      } else if (value && typeof value === 'object' && value.constructor === Object) {
        newObject[property] = clone(value);
      } else {
        newObject[property] = value;
      }
    }
  }
  return newObject;
}
/**
 * This method automatically checks if the prop is function or getter and behaves accordingly.
 *
 * @param object - The object to look up the getter function in its prototype chain.
 * @param prop - The property name for which to find the getter function.
 * @returns The getter function found in the prototype chain or a fallback function.
 */
function lookupGetter(object, prop) {
  while (object !== null) {
    const desc = getOwnPropertyDescriptor(object, prop);
    if (desc) {
      if (desc.get) {
        return unapply(desc.get);
      }
      if (typeof desc.value === 'function') {
        return unapply(desc.value);
      }
    }
    object = getPrototypeOf(object);
  }
  function fallbackValue() {
    return null;
  }
  return fallbackValue;
}

const html$1 = freeze(['a', 'abbr', 'acronym', 'address', 'area', 'article', 'aside', 'audio', 'b', 'bdi', 'bdo', 'big', 'blink', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'content', 'data', 'datalist', 'dd', 'decorator', 'del', 'details', 'dfn', 'dialog', 'dir', 'div', 'dl', 'dt', 'element', 'em', 'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'img', 'input', 'ins', 'kbd', 'label', 'legend', 'li', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meter', 'nav', 'nobr', 'ol', 'optgroup', 'option', 'output', 'p', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'section', 'select', 'shadow', 'small', 'source', 'spacer', 'span', 'strike', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'tr', 'track', 'tt', 'u', 'ul', 'var', 'video', 'wbr']);
const svg$1 = freeze(['svg', 'a', 'altglyph', 'altglyphdef', 'altglyphitem', 'animatecolor', 'animatemotion', 'animatetransform', 'circle', 'clippath', 'defs', 'desc', 'ellipse', 'filter', 'font', 'g', 'glyph', 'glyphref', 'hkern', 'image', 'line', 'lineargradient', 'marker', 'mask', 'metadata', 'mpath', 'path', 'pattern', 'polygon', 'polyline', 'radialgradient', 'rect', 'stop', 'style', 'switch', 'symbol', 'text', 'textpath', 'title', 'tref', 'tspan', 'view', 'vkern']);
const svgFilters = freeze(['feBlend', 'feColorMatrix', 'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap', 'feDistantLight', 'feDropShadow', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode', 'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile', 'feTurbulence']);
// List of SVG elements that are disallowed by default.
// We still need to know them so that we can do namespace
// checks properly in case one wants to add them to
// allow-list.
const svgDisallowed = freeze(['animate', 'color-profile', 'cursor', 'discard', 'font-face', 'font-face-format', 'font-face-name', 'font-face-src', 'font-face-uri', 'foreignobject', 'hatch', 'hatchpath', 'mesh', 'meshgradient', 'meshpatch', 'meshrow', 'missing-glyph', 'script', 'set', 'solidcolor', 'unknown', 'use']);
const mathMl$1 = freeze(['math', 'menclose', 'merror', 'mfenced', 'mfrac', 'mglyph', 'mi', 'mlabeledtr', 'mmultiscripts', 'mn', 'mo', 'mover', 'mpadded', 'mphantom', 'mroot', 'mrow', 'ms', 'mspace', 'msqrt', 'mstyle', 'msub', 'msup', 'msubsup', 'mtable', 'mtd', 'mtext', 'mtr', 'munder', 'munderover', 'mprescripts']);
// Similarly to SVG, we want to know all MathML elements,
// even those that we disallow by default.
const mathMlDisallowed = freeze(['maction', 'maligngroup', 'malignmark', 'mlongdiv', 'mscarries', 'mscarry', 'msgroup', 'mstack', 'msline', 'msrow', 'semantics', 'annotation', 'annotation-xml', 'mprescripts', 'none']);
const text = freeze(['#text']);

const html = freeze(['accept', 'action', 'align', 'alt', 'autocapitalize', 'autocomplete', 'autopictureinpicture', 'autoplay', 'background', 'bgcolor', 'border', 'capture', 'cellpadding', 'cellspacing', 'checked', 'cite', 'class', 'clear', 'color', 'cols', 'colspan', 'controls', 'controlslist', 'coords', 'crossorigin', 'datetime', 'decoding', 'default', 'dir', 'disabled', 'disablepictureinpicture', 'disableremoteplayback', 'download', 'draggable', 'enctype', 'enterkeyhint', 'face', 'for', 'headers', 'height', 'hidden', 'high', 'href', 'hreflang', 'id', 'inputmode', 'integrity', 'ismap', 'kind', 'label', 'lang', 'list', 'loading', 'loop', 'low', 'max', 'maxlength', 'media', 'method', 'min', 'minlength', 'multiple', 'muted', 'name', 'nonce', 'noshade', 'novalidate', 'nowrap', 'open', 'optimum', 'pattern', 'placeholder', 'playsinline', 'popover', 'popovertarget', 'popovertargetaction', 'poster', 'preload', 'pubdate', 'radiogroup', 'readonly', 'rel', 'required', 'rev', 'reversed', 'role', 'rows', 'rowspan', 'spellcheck', 'scope', 'selected', 'shape', 'size', 'sizes', 'span', 'srclang', 'start', 'src', 'srcset', 'step', 'style', 'summary', 'tabindex', 'title', 'translate', 'type', 'usemap', 'valign', 'value', 'width', 'wrap', 'xmlns', 'slot']);
const svg = freeze(['accent-height', 'accumulate', 'additive', 'alignment-baseline', 'amplitude', 'ascent', 'attributename', 'attributetype', 'azimuth', 'basefrequency', 'baseline-shift', 'begin', 'bias', 'by', 'class', 'clip', 'clippathunits', 'clip-path', 'clip-rule', 'color', 'color-interpolation', 'color-interpolation-filters', 'color-profile', 'color-rendering', 'cx', 'cy', 'd', 'dx', 'dy', 'diffuseconstant', 'direction', 'display', 'divisor', 'dur', 'edgemode', 'elevation', 'end', 'exponent', 'fill', 'fill-opacity', 'fill-rule', 'filter', 'filterunits', 'flood-color', 'flood-opacity', 'font-family', 'font-size', 'font-size-adjust', 'font-stretch', 'font-style', 'font-variant', 'font-weight', 'fx', 'fy', 'g1', 'g2', 'glyph-name', 'glyphref', 'gradientunits', 'gradienttransform', 'height', 'href', 'id', 'image-rendering', 'in', 'in2', 'intercept', 'k', 'k1', 'k2', 'k3', 'k4', 'kerning', 'keypoints', 'keysplines', 'keytimes', 'lang', 'lengthadjust', 'letter-spacing', 'kernelmatrix', 'kernelunitlength', 'lighting-color', 'local', 'marker-end', 'marker-mid', 'marker-start', 'markerheight', 'markerunits', 'markerwidth', 'maskcontentunits', 'maskunits', 'max', 'mask', 'media', 'method', 'mode', 'min', 'name', 'numoctaves', 'offset', 'operator', 'opacity', 'order', 'orient', 'orientation', 'origin', 'overflow', 'paint-order', 'path', 'pathlength', 'patterncontentunits', 'patterntransform', 'patternunits', 'points', 'preservealpha', 'preserveaspectratio', 'primitiveunits', 'r', 'rx', 'ry', 'radius', 'refx', 'refy', 'repeatcount', 'repeatdur', 'restart', 'result', 'rotate', 'scale', 'seed', 'shape-rendering', 'slope', 'specularconstant', 'specularexponent', 'spreadmethod', 'startoffset', 'stddeviation', 'stitchtiles', 'stop-color', 'stop-opacity', 'stroke-dasharray', 'stroke-dashoffset', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'stroke-opacity', 'stroke', 'stroke-width', 'style', 'surfacescale', 'systemlanguage', 'tabindex', 'tablevalues', 'targetx', 'targety', 'transform', 'transform-origin', 'text-anchor', 'text-decoration', 'text-rendering', 'textlength', 'type', 'u1', 'u2', 'unicode', 'values', 'viewbox', 'visibility', 'version', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'width', 'word-spacing', 'wrap', 'writing-mode', 'xchannelselector', 'ychannelselector', 'x', 'x1', 'x2', 'xmlns', 'y', 'y1', 'y2', 'z', 'zoomandpan']);
const mathMl = freeze(['accent', 'accentunder', 'align', 'bevelled', 'close', 'columnsalign', 'columnlines', 'columnspan', 'denomalign', 'depth', 'dir', 'display', 'displaystyle', 'encoding', 'fence', 'frame', 'height', 'href', 'id', 'largeop', 'length', 'linethickness', 'lspace', 'lquote', 'mathbackground', 'mathcolor', 'mathsize', 'mathvariant', 'maxsize', 'minsize', 'movablelimits', 'notation', 'numalign', 'open', 'rowalign', 'rowlines', 'rowspacing', 'rowspan', 'rspace', 'rquote', 'scriptlevel', 'scriptminsize', 'scriptsizemultiplier', 'selection', 'separator', 'separators', 'stretchy', 'subscriptshift', 'supscriptshift', 'symmetric', 'voffset', 'width', 'xmlns']);
const xml = freeze(['xlink:href', 'xml:id', 'xlink:title', 'xml:space', 'xmlns:xlink']);

// eslint-disable-next-line unicorn/better-regex
const MUSTACHE_EXPR = seal(/\{\{[\w\W]*|[\w\W]*\}\}/gm); // Specify template detection regex for SAFE_FOR_TEMPLATES mode
const ERB_EXPR = seal(/<%[\w\W]*|[\w\W]*%>/gm);
const TMPLIT_EXPR = seal(/\$\{[\w\W]*/gm); // eslint-disable-line unicorn/better-regex
const DATA_ATTR = seal(/^data-[\-\w.\u00B7-\uFFFF]+$/); // eslint-disable-line no-useless-escape
const ARIA_ATTR = seal(/^aria-[\-\w]+$/); // eslint-disable-line no-useless-escape
const IS_ALLOWED_URI = seal(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i // eslint-disable-line no-useless-escape
);
const IS_SCRIPT_OR_DATA = seal(/^(?:\w+script|data):/i);
const ATTR_WHITESPACE = seal(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g // eslint-disable-line no-control-regex
);
const DOCTYPE_NAME = seal(/^html$/i);
const CUSTOM_ELEMENT = seal(/^[a-z][.\w]*(-[.\w]+)+$/i);

var EXPRESSIONS = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ARIA_ATTR: ARIA_ATTR,
  ATTR_WHITESPACE: ATTR_WHITESPACE,
  CUSTOM_ELEMENT: CUSTOM_ELEMENT,
  DATA_ATTR: DATA_ATTR,
  DOCTYPE_NAME: DOCTYPE_NAME,
  ERB_EXPR: ERB_EXPR,
  IS_ALLOWED_URI: IS_ALLOWED_URI,
  IS_SCRIPT_OR_DATA: IS_SCRIPT_OR_DATA,
  MUSTACHE_EXPR: MUSTACHE_EXPR,
  TMPLIT_EXPR: TMPLIT_EXPR
});

/* eslint-disable @typescript-eslint/indent */
// https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
const NODE_TYPE = {
  element: 1,
  text: 3,
  // Deprecated
  progressingInstruction: 7,
  comment: 8,
  document: 9};
const getGlobal = function getGlobal() {
  return typeof window === 'undefined' ? null : window;
};
/**
 * Creates a no-op policy for internal use only.
 * Don't export this function outside this module!
 * @param trustedTypes The policy factory.
 * @param purifyHostElement The Script element used to load DOMPurify (to determine policy name suffix).
 * @return The policy created (or null, if Trusted Types
 * are not supported or creating the policy failed).
 */
const _createTrustedTypesPolicy = function _createTrustedTypesPolicy(trustedTypes, purifyHostElement) {
  if (typeof trustedTypes !== 'object' || typeof trustedTypes.createPolicy !== 'function') {
    return null;
  }
  // Allow the callers to control the unique policy name
  // by adding a data-tt-policy-suffix to the script element with the DOMPurify.
  // Policy creation with duplicate names throws in Trusted Types.
  let suffix = null;
  const ATTR_NAME = 'data-tt-policy-suffix';
  if (purifyHostElement && purifyHostElement.hasAttribute(ATTR_NAME)) {
    suffix = purifyHostElement.getAttribute(ATTR_NAME);
  }
  const policyName = 'dompurify' + (suffix ? '#' + suffix : '');
  try {
    return trustedTypes.createPolicy(policyName, {
      createHTML(html) {
        return html;
      },
      createScriptURL(scriptUrl) {
        return scriptUrl;
      }
    });
  } catch (_) {
    // Policy creation failed (most likely another DOMPurify script has
    // already run). Skip creating the policy, as this will only cause errors
    // if TT are enforced.
    console.warn('TrustedTypes policy ' + policyName + ' could not be created.');
    return null;
  }
};
const _createHooksMap = function _createHooksMap() {
  return {
    afterSanitizeAttributes: [],
    afterSanitizeElements: [],
    afterSanitizeShadowDOM: [],
    beforeSanitizeAttributes: [],
    beforeSanitizeElements: [],
    beforeSanitizeShadowDOM: [],
    uponSanitizeAttribute: [],
    uponSanitizeElement: [],
    uponSanitizeShadowNode: []
  };
};
function createDOMPurify() {
  let window = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getGlobal();
  const DOMPurify = root => createDOMPurify(root);
  DOMPurify.version = '3.2.4';
  DOMPurify.removed = [];
  if (!window || !window.document || window.document.nodeType !== NODE_TYPE.document || !window.Element) {
    // Not running in a browser, provide a factory function
    // so that you can pass your own Window
    DOMPurify.isSupported = false;
    return DOMPurify;
  }
  let {
    document
  } = window;
  const originalDocument = document;
  const currentScript = originalDocument.currentScript;
  const {
    DocumentFragment,
    HTMLTemplateElement,
    Node,
    Element,
    NodeFilter,
    NamedNodeMap = window.NamedNodeMap || window.MozNamedAttrMap,
    HTMLFormElement,
    DOMParser,
    trustedTypes
  } = window;
  const ElementPrototype = Element.prototype;
  const cloneNode = lookupGetter(ElementPrototype, 'cloneNode');
  const remove = lookupGetter(ElementPrototype, 'remove');
  const getNextSibling = lookupGetter(ElementPrototype, 'nextSibling');
  const getChildNodes = lookupGetter(ElementPrototype, 'childNodes');
  const getParentNode = lookupGetter(ElementPrototype, 'parentNode');
  // As per issue #47, the web-components registry is inherited by a
  // new document created via createHTMLDocument. As per the spec
  // (http://w3c.github.io/webcomponents/spec/custom/#creating-and-passing-registries)
  // a new empty registry is used when creating a template contents owner
  // document, so we use that as our parent document to ensure nothing
  // is inherited.
  if (typeof HTMLTemplateElement === 'function') {
    const template = document.createElement('template');
    if (template.content && template.content.ownerDocument) {
      document = template.content.ownerDocument;
    }
  }
  let trustedTypesPolicy;
  let emptyHTML = '';
  const {
    implementation,
    createNodeIterator,
    createDocumentFragment,
    getElementsByTagName
  } = document;
  const {
    importNode
  } = originalDocument;
  let hooks = _createHooksMap();
  /**
   * Expose whether this browser supports running the full DOMPurify.
   */
  DOMPurify.isSupported = typeof entries === 'function' && typeof getParentNode === 'function' && implementation && implementation.createHTMLDocument !== undefined;
  const {
    MUSTACHE_EXPR,
    ERB_EXPR,
    TMPLIT_EXPR,
    DATA_ATTR,
    ARIA_ATTR,
    IS_SCRIPT_OR_DATA,
    ATTR_WHITESPACE,
    CUSTOM_ELEMENT
  } = EXPRESSIONS;
  let {
    IS_ALLOWED_URI: IS_ALLOWED_URI$1
  } = EXPRESSIONS;
  /**
   * We consider the elements and attributes below to be safe. Ideally
   * don't add any new ones but feel free to remove unwanted ones.
   */
  /* allowed element names */
  let ALLOWED_TAGS = null;
  const DEFAULT_ALLOWED_TAGS = addToSet({}, [...html$1, ...svg$1, ...svgFilters, ...mathMl$1, ...text]);
  /* Allowed attribute names */
  let ALLOWED_ATTR = null;
  const DEFAULT_ALLOWED_ATTR = addToSet({}, [...html, ...svg, ...mathMl, ...xml]);
  /*
   * Configure how DOMPurify should handle custom elements and their attributes as well as customized built-in elements.
   * @property {RegExp|Function|null} tagNameCheck one of [null, regexPattern, predicate]. Default: `null` (disallow any custom elements)
   * @property {RegExp|Function|null} attributeNameCheck one of [null, regexPattern, predicate]. Default: `null` (disallow any attributes not on the allow list)
   * @property {boolean} allowCustomizedBuiltInElements allow custom elements derived from built-ins if they pass CUSTOM_ELEMENT_HANDLING.tagNameCheck. Default: `false`.
   */
  let CUSTOM_ELEMENT_HANDLING = Object.seal(create(null, {
    tagNameCheck: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: null
    },
    attributeNameCheck: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: null
    },
    allowCustomizedBuiltInElements: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: false
    }
  }));
  /* Explicitly forbidden tags (overrides ALLOWED_TAGS/ADD_TAGS) */
  let FORBID_TAGS = null;
  /* Explicitly forbidden attributes (overrides ALLOWED_ATTR/ADD_ATTR) */
  let FORBID_ATTR = null;
  /* Decide if ARIA attributes are okay */
  let ALLOW_ARIA_ATTR = true;
  /* Decide if custom data attributes are okay */
  let ALLOW_DATA_ATTR = true;
  /* Decide if unknown protocols are okay */
  let ALLOW_UNKNOWN_PROTOCOLS = false;
  /* Decide if self-closing tags in attributes are allowed.
   * Usually removed due to a mXSS issue in jQuery 3.0 */
  let ALLOW_SELF_CLOSE_IN_ATTR = true;
  /* Output should be safe for common template engines.
   * This means, DOMPurify removes data attributes, mustaches and ERB
   */
  let SAFE_FOR_TEMPLATES = false;
  /* Output should be safe even for XML used within HTML and alike.
   * This means, DOMPurify removes comments when containing risky content.
   */
  let SAFE_FOR_XML = true;
  /* Decide if document with <html>... should be returned */
  let WHOLE_DOCUMENT = false;
  /* Track whether config is already set on this instance of DOMPurify. */
  let SET_CONFIG = false;
  /* Decide if all elements (e.g. style, script) must be children of
   * document.body. By default, browsers might move them to document.head */
  let FORCE_BODY = false;
  /* Decide if a DOM `HTMLBodyElement` should be returned, instead of a html
   * string (or a TrustedHTML object if Trusted Types are supported).
   * If `WHOLE_DOCUMENT` is enabled a `HTMLHtmlElement` will be returned instead
   */
  let RETURN_DOM = false;
  /* Decide if a DOM `DocumentFragment` should be returned, instead of a html
   * string  (or a TrustedHTML object if Trusted Types are supported) */
  let RETURN_DOM_FRAGMENT = false;
  /* Try to return a Trusted Type object instead of a string, return a string in
   * case Trusted Types are not supported  */
  let RETURN_TRUSTED_TYPE = false;
  /* Output should be free from DOM clobbering attacks?
   * This sanitizes markups named with colliding, clobberable built-in DOM APIs.
   */
  let SANITIZE_DOM = true;
  /* Achieve full DOM Clobbering protection by isolating the namespace of named
   * properties and JS variables, mitigating attacks that abuse the HTML/DOM spec rules.
   *
   * HTML/DOM spec rules that enable DOM Clobbering:
   *   - Named Access on Window (§7.3.3)
   *   - DOM Tree Accessors (§3.1.5)
   *   - Form Element Parent-Child Relations (§4.10.3)
   *   - Iframe srcdoc / Nested WindowProxies (§4.8.5)
   *   - HTMLCollection (§4.2.10.2)
   *
   * Namespace isolation is implemented by prefixing `id` and `name` attributes
   * with a constant string, i.e., `user-content-`
   */
  let SANITIZE_NAMED_PROPS = false;
  const SANITIZE_NAMED_PROPS_PREFIX = 'user-content-';
  /* Keep element content when removing element? */
  let KEEP_CONTENT = true;
  /* If a `Node` is passed to sanitize(), then performs sanitization in-place instead
   * of importing it into a new Document and returning a sanitized copy */
  let IN_PLACE = false;
  /* Allow usage of profiles like html, svg and mathMl */
  let USE_PROFILES = {};
  /* Tags to ignore content of when KEEP_CONTENT is true */
  let FORBID_CONTENTS = null;
  const DEFAULT_FORBID_CONTENTS = addToSet({}, ['annotation-xml', 'audio', 'colgroup', 'desc', 'foreignobject', 'head', 'iframe', 'math', 'mi', 'mn', 'mo', 'ms', 'mtext', 'noembed', 'noframes', 'noscript', 'plaintext', 'script', 'style', 'svg', 'template', 'thead', 'title', 'video', 'xmp']);
  /* Tags that are safe for data: URIs */
  let DATA_URI_TAGS = null;
  const DEFAULT_DATA_URI_TAGS = addToSet({}, ['audio', 'video', 'img', 'source', 'image', 'track']);
  /* Attributes safe for values like "javascript:" */
  let URI_SAFE_ATTRIBUTES = null;
  const DEFAULT_URI_SAFE_ATTRIBUTES = addToSet({}, ['alt', 'class', 'for', 'id', 'label', 'name', 'pattern', 'placeholder', 'role', 'summary', 'title', 'value', 'style', 'xmlns']);
  const MATHML_NAMESPACE = 'http://www.w3.org/1998/Math/MathML';
  const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
  const HTML_NAMESPACE = 'http://www.w3.org/1999/xhtml';
  /* Document namespace */
  let NAMESPACE = HTML_NAMESPACE;
  let IS_EMPTY_INPUT = false;
  /* Allowed XHTML+XML namespaces */
  let ALLOWED_NAMESPACES = null;
  const DEFAULT_ALLOWED_NAMESPACES = addToSet({}, [MATHML_NAMESPACE, SVG_NAMESPACE, HTML_NAMESPACE], stringToString);
  let MATHML_TEXT_INTEGRATION_POINTS = addToSet({}, ['mi', 'mo', 'mn', 'ms', 'mtext']);
  let HTML_INTEGRATION_POINTS = addToSet({}, ['annotation-xml']);
  // Certain elements are allowed in both SVG and HTML
  // namespace. We need to specify them explicitly
  // so that they don't get erroneously deleted from
  // HTML namespace.
  const COMMON_SVG_AND_HTML_ELEMENTS = addToSet({}, ['title', 'style', 'font', 'a', 'script']);
  /* Parsing of strict XHTML documents */
  let PARSER_MEDIA_TYPE = null;
  const SUPPORTED_PARSER_MEDIA_TYPES = ['application/xhtml+xml', 'text/html'];
  const DEFAULT_PARSER_MEDIA_TYPE = 'text/html';
  let transformCaseFunc = null;
  /* Keep a reference to config to pass to hooks */
  let CONFIG = null;
  /* Ideally, do not touch anything below this line */
  /* ______________________________________________ */
  const formElement = document.createElement('form');
  const isRegexOrFunction = function isRegexOrFunction(testValue) {
    return testValue instanceof RegExp || testValue instanceof Function;
  };
  /**
   * _parseConfig
   *
   * @param cfg optional config literal
   */
  // eslint-disable-next-line complexity
  const _parseConfig = function _parseConfig() {
    let cfg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    if (CONFIG && CONFIG === cfg) {
      return;
    }
    /* Shield configuration object from tampering */
    if (!cfg || typeof cfg !== 'object') {
      cfg = {};
    }
    /* Shield configuration object from prototype pollution */
    cfg = clone(cfg);
    PARSER_MEDIA_TYPE =
    // eslint-disable-next-line unicorn/prefer-includes
    SUPPORTED_PARSER_MEDIA_TYPES.indexOf(cfg.PARSER_MEDIA_TYPE) === -1 ? DEFAULT_PARSER_MEDIA_TYPE : cfg.PARSER_MEDIA_TYPE;
    // HTML tags and attributes are not case-sensitive, converting to lowercase. Keeping XHTML as is.
    transformCaseFunc = PARSER_MEDIA_TYPE === 'application/xhtml+xml' ? stringToString : stringToLowerCase;
    /* Set configuration parameters */
    ALLOWED_TAGS = objectHasOwnProperty(cfg, 'ALLOWED_TAGS') ? addToSet({}, cfg.ALLOWED_TAGS, transformCaseFunc) : DEFAULT_ALLOWED_TAGS;
    ALLOWED_ATTR = objectHasOwnProperty(cfg, 'ALLOWED_ATTR') ? addToSet({}, cfg.ALLOWED_ATTR, transformCaseFunc) : DEFAULT_ALLOWED_ATTR;
    ALLOWED_NAMESPACES = objectHasOwnProperty(cfg, 'ALLOWED_NAMESPACES') ? addToSet({}, cfg.ALLOWED_NAMESPACES, stringToString) : DEFAULT_ALLOWED_NAMESPACES;
    URI_SAFE_ATTRIBUTES = objectHasOwnProperty(cfg, 'ADD_URI_SAFE_ATTR') ? addToSet(clone(DEFAULT_URI_SAFE_ATTRIBUTES), cfg.ADD_URI_SAFE_ATTR, transformCaseFunc) : DEFAULT_URI_SAFE_ATTRIBUTES;
    DATA_URI_TAGS = objectHasOwnProperty(cfg, 'ADD_DATA_URI_TAGS') ? addToSet(clone(DEFAULT_DATA_URI_TAGS), cfg.ADD_DATA_URI_TAGS, transformCaseFunc) : DEFAULT_DATA_URI_TAGS;
    FORBID_CONTENTS = objectHasOwnProperty(cfg, 'FORBID_CONTENTS') ? addToSet({}, cfg.FORBID_CONTENTS, transformCaseFunc) : DEFAULT_FORBID_CONTENTS;
    FORBID_TAGS = objectHasOwnProperty(cfg, 'FORBID_TAGS') ? addToSet({}, cfg.FORBID_TAGS, transformCaseFunc) : {};
    FORBID_ATTR = objectHasOwnProperty(cfg, 'FORBID_ATTR') ? addToSet({}, cfg.FORBID_ATTR, transformCaseFunc) : {};
    USE_PROFILES = objectHasOwnProperty(cfg, 'USE_PROFILES') ? cfg.USE_PROFILES : false;
    ALLOW_ARIA_ATTR = cfg.ALLOW_ARIA_ATTR !== false; // Default true
    ALLOW_DATA_ATTR = cfg.ALLOW_DATA_ATTR !== false; // Default true
    ALLOW_UNKNOWN_PROTOCOLS = cfg.ALLOW_UNKNOWN_PROTOCOLS || false; // Default false
    ALLOW_SELF_CLOSE_IN_ATTR = cfg.ALLOW_SELF_CLOSE_IN_ATTR !== false; // Default true
    SAFE_FOR_TEMPLATES = cfg.SAFE_FOR_TEMPLATES || false; // Default false
    SAFE_FOR_XML = cfg.SAFE_FOR_XML !== false; // Default true
    WHOLE_DOCUMENT = cfg.WHOLE_DOCUMENT || false; // Default false
    RETURN_DOM = cfg.RETURN_DOM || false; // Default false
    RETURN_DOM_FRAGMENT = cfg.RETURN_DOM_FRAGMENT || false; // Default false
    RETURN_TRUSTED_TYPE = cfg.RETURN_TRUSTED_TYPE || false; // Default false
    FORCE_BODY = cfg.FORCE_BODY || false; // Default false
    SANITIZE_DOM = cfg.SANITIZE_DOM !== false; // Default true
    SANITIZE_NAMED_PROPS = cfg.SANITIZE_NAMED_PROPS || false; // Default false
    KEEP_CONTENT = cfg.KEEP_CONTENT !== false; // Default true
    IN_PLACE = cfg.IN_PLACE || false; // Default false
    IS_ALLOWED_URI$1 = cfg.ALLOWED_URI_REGEXP || IS_ALLOWED_URI;
    NAMESPACE = cfg.NAMESPACE || HTML_NAMESPACE;
    MATHML_TEXT_INTEGRATION_POINTS = cfg.MATHML_TEXT_INTEGRATION_POINTS || MATHML_TEXT_INTEGRATION_POINTS;
    HTML_INTEGRATION_POINTS = cfg.HTML_INTEGRATION_POINTS || HTML_INTEGRATION_POINTS;
    CUSTOM_ELEMENT_HANDLING = cfg.CUSTOM_ELEMENT_HANDLING || {};
    if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck)) {
      CUSTOM_ELEMENT_HANDLING.tagNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck;
    }
    if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)) {
      CUSTOM_ELEMENT_HANDLING.attributeNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck;
    }
    if (cfg.CUSTOM_ELEMENT_HANDLING && typeof cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements === 'boolean') {
      CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements = cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements;
    }
    if (SAFE_FOR_TEMPLATES) {
      ALLOW_DATA_ATTR = false;
    }
    if (RETURN_DOM_FRAGMENT) {
      RETURN_DOM = true;
    }
    /* Parse profile info */
    if (USE_PROFILES) {
      ALLOWED_TAGS = addToSet({}, text);
      ALLOWED_ATTR = [];
      if (USE_PROFILES.html === true) {
        addToSet(ALLOWED_TAGS, html$1);
        addToSet(ALLOWED_ATTR, html);
      }
      if (USE_PROFILES.svg === true) {
        addToSet(ALLOWED_TAGS, svg$1);
        addToSet(ALLOWED_ATTR, svg);
        addToSet(ALLOWED_ATTR, xml);
      }
      if (USE_PROFILES.svgFilters === true) {
        addToSet(ALLOWED_TAGS, svgFilters);
        addToSet(ALLOWED_ATTR, svg);
        addToSet(ALLOWED_ATTR, xml);
      }
      if (USE_PROFILES.mathMl === true) {
        addToSet(ALLOWED_TAGS, mathMl$1);
        addToSet(ALLOWED_ATTR, mathMl);
        addToSet(ALLOWED_ATTR, xml);
      }
    }
    /* Merge configuration parameters */
    if (cfg.ADD_TAGS) {
      if (ALLOWED_TAGS === DEFAULT_ALLOWED_TAGS) {
        ALLOWED_TAGS = clone(ALLOWED_TAGS);
      }
      addToSet(ALLOWED_TAGS, cfg.ADD_TAGS, transformCaseFunc);
    }
    if (cfg.ADD_ATTR) {
      if (ALLOWED_ATTR === DEFAULT_ALLOWED_ATTR) {
        ALLOWED_ATTR = clone(ALLOWED_ATTR);
      }
      addToSet(ALLOWED_ATTR, cfg.ADD_ATTR, transformCaseFunc);
    }
    if (cfg.ADD_URI_SAFE_ATTR) {
      addToSet(URI_SAFE_ATTRIBUTES, cfg.ADD_URI_SAFE_ATTR, transformCaseFunc);
    }
    if (cfg.FORBID_CONTENTS) {
      if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) {
        FORBID_CONTENTS = clone(FORBID_CONTENTS);
      }
      addToSet(FORBID_CONTENTS, cfg.FORBID_CONTENTS, transformCaseFunc);
    }
    /* Add #text in case KEEP_CONTENT is set to true */
    if (KEEP_CONTENT) {
      ALLOWED_TAGS['#text'] = true;
    }
    /* Add html, head and body to ALLOWED_TAGS in case WHOLE_DOCUMENT is true */
    if (WHOLE_DOCUMENT) {
      addToSet(ALLOWED_TAGS, ['html', 'head', 'body']);
    }
    /* Add tbody to ALLOWED_TAGS in case tables are permitted, see #286, #365 */
    if (ALLOWED_TAGS.table) {
      addToSet(ALLOWED_TAGS, ['tbody']);
      delete FORBID_TAGS.tbody;
    }
    if (cfg.TRUSTED_TYPES_POLICY) {
      if (typeof cfg.TRUSTED_TYPES_POLICY.createHTML !== 'function') {
        throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
      }
      if (typeof cfg.TRUSTED_TYPES_POLICY.createScriptURL !== 'function') {
        throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
      }
      // Overwrite existing TrustedTypes policy.
      trustedTypesPolicy = cfg.TRUSTED_TYPES_POLICY;
      // Sign local variables required by `sanitize`.
      emptyHTML = trustedTypesPolicy.createHTML('');
    } else {
      // Uninitialized policy, attempt to initialize the internal dompurify policy.
      if (trustedTypesPolicy === undefined) {
        trustedTypesPolicy = _createTrustedTypesPolicy(trustedTypes, currentScript);
      }
      // If creating the internal policy succeeded sign internal variables.
      if (trustedTypesPolicy !== null && typeof emptyHTML === 'string') {
        emptyHTML = trustedTypesPolicy.createHTML('');
      }
    }
    // Prevent further manipulation of configuration.
    // Not available in IE8, Safari 5, etc.
    if (freeze) {
      freeze(cfg);
    }
    CONFIG = cfg;
  };
  /* Keep track of all possible SVG and MathML tags
   * so that we can perform the namespace checks
   * correctly. */
  const ALL_SVG_TAGS = addToSet({}, [...svg$1, ...svgFilters, ...svgDisallowed]);
  const ALL_MATHML_TAGS = addToSet({}, [...mathMl$1, ...mathMlDisallowed]);
  /**
   * @param element a DOM element whose namespace is being checked
   * @returns Return false if the element has a
   *  namespace that a spec-compliant parser would never
   *  return. Return true otherwise.
   */
  const _checkValidNamespace = function _checkValidNamespace(element) {
    let parent = getParentNode(element);
    // In JSDOM, if we're inside shadow DOM, then parentNode
    // can be null. We just simulate parent in this case.
    if (!parent || !parent.tagName) {
      parent = {
        namespaceURI: NAMESPACE,
        tagName: 'template'
      };
    }
    const tagName = stringToLowerCase(element.tagName);
    const parentTagName = stringToLowerCase(parent.tagName);
    if (!ALLOWED_NAMESPACES[element.namespaceURI]) {
      return false;
    }
    if (element.namespaceURI === SVG_NAMESPACE) {
      // The only way to switch from HTML namespace to SVG
      // is via <svg>. If it happens via any other tag, then
      // it should be killed.
      if (parent.namespaceURI === HTML_NAMESPACE) {
        return tagName === 'svg';
      }
      // The only way to switch from MathML to SVG is via`
      // svg if parent is either <annotation-xml> or MathML
      // text integration points.
      if (parent.namespaceURI === MATHML_NAMESPACE) {
        return tagName === 'svg' && (parentTagName === 'annotation-xml' || MATHML_TEXT_INTEGRATION_POINTS[parentTagName]);
      }
      // We only allow elements that are defined in SVG
      // spec. All others are disallowed in SVG namespace.
      return Boolean(ALL_SVG_TAGS[tagName]);
    }
    if (element.namespaceURI === MATHML_NAMESPACE) {
      // The only way to switch from HTML namespace to MathML
      // is via <math>. If it happens via any other tag, then
      // it should be killed.
      if (parent.namespaceURI === HTML_NAMESPACE) {
        return tagName === 'math';
      }
      // The only way to switch from SVG to MathML is via
      // <math> and HTML integration points
      if (parent.namespaceURI === SVG_NAMESPACE) {
        return tagName === 'math' && HTML_INTEGRATION_POINTS[parentTagName];
      }
      // We only allow elements that are defined in MathML
      // spec. All others are disallowed in MathML namespace.
      return Boolean(ALL_MATHML_TAGS[tagName]);
    }
    if (element.namespaceURI === HTML_NAMESPACE) {
      // The only way to switch from SVG to HTML is via
      // HTML integration points, and from MathML to HTML
      // is via MathML text integration points
      if (parent.namespaceURI === SVG_NAMESPACE && !HTML_INTEGRATION_POINTS[parentTagName]) {
        return false;
      }
      if (parent.namespaceURI === MATHML_NAMESPACE && !MATHML_TEXT_INTEGRATION_POINTS[parentTagName]) {
        return false;
      }
      // We disallow tags that are specific for MathML
      // or SVG and should never appear in HTML namespace
      return !ALL_MATHML_TAGS[tagName] && (COMMON_SVG_AND_HTML_ELEMENTS[tagName] || !ALL_SVG_TAGS[tagName]);
    }
    // For XHTML and XML documents that support custom namespaces
    if (PARSER_MEDIA_TYPE === 'application/xhtml+xml' && ALLOWED_NAMESPACES[element.namespaceURI]) {
      return true;
    }
    // The code should never reach this place (this means
    // that the element somehow got namespace that is not
    // HTML, SVG, MathML or allowed via ALLOWED_NAMESPACES).
    // Return false just in case.
    return false;
  };
  /**
   * _forceRemove
   *
   * @param node a DOM node
   */
  const _forceRemove = function _forceRemove(node) {
    arrayPush(DOMPurify.removed, {
      element: node
    });
    try {
      // eslint-disable-next-line unicorn/prefer-dom-node-remove
      getParentNode(node).removeChild(node);
    } catch (_) {
      remove(node);
    }
  };
  /**
   * _removeAttribute
   *
   * @param name an Attribute name
   * @param element a DOM node
   */
  const _removeAttribute = function _removeAttribute(name, element) {
    try {
      arrayPush(DOMPurify.removed, {
        attribute: element.getAttributeNode(name),
        from: element
      });
    } catch (_) {
      arrayPush(DOMPurify.removed, {
        attribute: null,
        from: element
      });
    }
    element.removeAttribute(name);
    // We void attribute values for unremovable "is" attributes
    if (name === 'is') {
      if (RETURN_DOM || RETURN_DOM_FRAGMENT) {
        try {
          _forceRemove(element);
        } catch (_) {}
      } else {
        try {
          element.setAttribute(name, '');
        } catch (_) {}
      }
    }
  };
  /**
   * _initDocument
   *
   * @param dirty - a string of dirty markup
   * @return a DOM, filled with the dirty markup
   */
  const _initDocument = function _initDocument(dirty) {
    /* Create a HTML document */
    let doc = null;
    let leadingWhitespace = null;
    if (FORCE_BODY) {
      dirty = '<remove></remove>' + dirty;
    } else {
      /* If FORCE_BODY isn't used, leading whitespace needs to be preserved manually */
      const matches = stringMatch(dirty, /^[\r\n\t ]+/);
      leadingWhitespace = matches && matches[0];
    }
    if (PARSER_MEDIA_TYPE === 'application/xhtml+xml' && NAMESPACE === HTML_NAMESPACE) {
      // Root of XHTML doc must contain xmlns declaration (see https://www.w3.org/TR/xhtml1/normative.html#strict)
      dirty = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + dirty + '</body></html>';
    }
    const dirtyPayload = trustedTypesPolicy ? trustedTypesPolicy.createHTML(dirty) : dirty;
    /*
     * Use the DOMParser API by default, fallback later if needs be
     * DOMParser not work for svg when has multiple root element.
     */
    if (NAMESPACE === HTML_NAMESPACE) {
      try {
        doc = new DOMParser().parseFromString(dirtyPayload, PARSER_MEDIA_TYPE);
      } catch (_) {}
    }
    /* Use createHTMLDocument in case DOMParser is not available */
    if (!doc || !doc.documentElement) {
      doc = implementation.createDocument(NAMESPACE, 'template', null);
      try {
        doc.documentElement.innerHTML = IS_EMPTY_INPUT ? emptyHTML : dirtyPayload;
      } catch (_) {
        // Syntax error if dirtyPayload is invalid xml
      }
    }
    const body = doc.body || doc.documentElement;
    if (dirty && leadingWhitespace) {
      body.insertBefore(document.createTextNode(leadingWhitespace), body.childNodes[0] || null);
    }
    /* Work on whole document or just its body */
    if (NAMESPACE === HTML_NAMESPACE) {
      return getElementsByTagName.call(doc, WHOLE_DOCUMENT ? 'html' : 'body')[0];
    }
    return WHOLE_DOCUMENT ? doc.documentElement : body;
  };
  /**
   * Creates a NodeIterator object that you can use to traverse filtered lists of nodes or elements in a document.
   *
   * @param root The root element or node to start traversing on.
   * @return The created NodeIterator
   */
  const _createNodeIterator = function _createNodeIterator(root) {
    return createNodeIterator.call(root.ownerDocument || root, root,
    // eslint-disable-next-line no-bitwise
    NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT | NodeFilter.SHOW_PROCESSING_INSTRUCTION | NodeFilter.SHOW_CDATA_SECTION, null);
  };
  /**
   * _isClobbered
   *
   * @param element element to check for clobbering attacks
   * @return true if clobbered, false if safe
   */
  const _isClobbered = function _isClobbered(element) {
    return element instanceof HTMLFormElement && (typeof element.nodeName !== 'string' || typeof element.textContent !== 'string' || typeof element.removeChild !== 'function' || !(element.attributes instanceof NamedNodeMap) || typeof element.removeAttribute !== 'function' || typeof element.setAttribute !== 'function' || typeof element.namespaceURI !== 'string' || typeof element.insertBefore !== 'function' || typeof element.hasChildNodes !== 'function');
  };
  /**
   * Checks whether the given object is a DOM node.
   *
   * @param value object to check whether it's a DOM node
   * @return true is object is a DOM node
   */
  const _isNode = function _isNode(value) {
    return typeof Node === 'function' && value instanceof Node;
  };
  function _executeHooks(hooks, currentNode, data) {
    arrayForEach(hooks, hook => {
      hook.call(DOMPurify, currentNode, data, CONFIG);
    });
  }
  /**
   * _sanitizeElements
   *
   * @protect nodeName
   * @protect textContent
   * @protect removeChild
   * @param currentNode to check for permission to exist
   * @return true if node was killed, false if left alive
   */
  const _sanitizeElements = function _sanitizeElements(currentNode) {
    let content = null;
    /* Execute a hook if present */
    _executeHooks(hooks.beforeSanitizeElements, currentNode, null);
    /* Check if element is clobbered or can clobber */
    if (_isClobbered(currentNode)) {
      _forceRemove(currentNode);
      return true;
    }
    /* Now let's check the element's type and name */
    const tagName = transformCaseFunc(currentNode.nodeName);
    /* Execute a hook if present */
    _executeHooks(hooks.uponSanitizeElement, currentNode, {
      tagName,
      allowedTags: ALLOWED_TAGS
    });
    /* Detect mXSS attempts abusing namespace confusion */
    if (currentNode.hasChildNodes() && !_isNode(currentNode.firstElementChild) && regExpTest(/<[/\w]/g, currentNode.innerHTML) && regExpTest(/<[/\w]/g, currentNode.textContent)) {
      _forceRemove(currentNode);
      return true;
    }
    /* Remove any occurrence of processing instructions */
    if (currentNode.nodeType === NODE_TYPE.progressingInstruction) {
      _forceRemove(currentNode);
      return true;
    }
    /* Remove any kind of possibly harmful comments */
    if (SAFE_FOR_XML && currentNode.nodeType === NODE_TYPE.comment && regExpTest(/<[/\w]/g, currentNode.data)) {
      _forceRemove(currentNode);
      return true;
    }
    /* Remove element if anything forbids its presence */
    if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
      /* Check if we have a custom element to handle */
      if (!FORBID_TAGS[tagName] && _isBasicCustomElement(tagName)) {
        if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, tagName)) {
          return false;
        }
        if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(tagName)) {
          return false;
        }
      }
      /* Keep content except for bad-listed elements */
      if (KEEP_CONTENT && !FORBID_CONTENTS[tagName]) {
        const parentNode = getParentNode(currentNode) || currentNode.parentNode;
        const childNodes = getChildNodes(currentNode) || currentNode.childNodes;
        if (childNodes && parentNode) {
          const childCount = childNodes.length;
          for (let i = childCount - 1; i >= 0; --i) {
            const childClone = cloneNode(childNodes[i], true);
            childClone.__removalCount = (currentNode.__removalCount || 0) + 1;
            parentNode.insertBefore(childClone, getNextSibling(currentNode));
          }
        }
      }
      _forceRemove(currentNode);
      return true;
    }
    /* Check whether element has a valid namespace */
    if (currentNode instanceof Element && !_checkValidNamespace(currentNode)) {
      _forceRemove(currentNode);
      return true;
    }
    /* Make sure that older browsers don't get fallback-tag mXSS */
    if ((tagName === 'noscript' || tagName === 'noembed' || tagName === 'noframes') && regExpTest(/<\/no(script|embed|frames)/i, currentNode.innerHTML)) {
      _forceRemove(currentNode);
      return true;
    }
    /* Sanitize element content to be template-safe */
    if (SAFE_FOR_TEMPLATES && currentNode.nodeType === NODE_TYPE.text) {
      /* Get the element's text content */
      content = currentNode.textContent;
      arrayForEach([MUSTACHE_EXPR, ERB_EXPR, TMPLIT_EXPR], expr => {
        content = stringReplace(content, expr, ' ');
      });
      if (currentNode.textContent !== content) {
        arrayPush(DOMPurify.removed, {
          element: currentNode.cloneNode()
        });
        currentNode.textContent = content;
      }
    }
    /* Execute a hook if present */
    _executeHooks(hooks.afterSanitizeElements, currentNode, null);
    return false;
  };
  /**
   * _isValidAttribute
   *
   * @param lcTag Lowercase tag name of containing element.
   * @param lcName Lowercase attribute name.
   * @param value Attribute value.
   * @return Returns true if `value` is valid, otherwise false.
   */
  // eslint-disable-next-line complexity
  const _isValidAttribute = function _isValidAttribute(lcTag, lcName, value) {
    /* Make sure attribute cannot clobber */
    if (SANITIZE_DOM && (lcName === 'id' || lcName === 'name') && (value in document || value in formElement)) {
      return false;
    }
    /* Allow valid data-* attributes: At least one character after "-"
        (https://html.spec.whatwg.org/multipage/dom.html#embedding-custom-non-visible-data-with-the-data-*-attributes)
        XML-compatible (https://html.spec.whatwg.org/multipage/infrastructure.html#xml-compatible and http://www.w3.org/TR/xml/#d0e804)
        We don't need to check the value; it's always URI safe. */
    if (ALLOW_DATA_ATTR && !FORBID_ATTR[lcName] && regExpTest(DATA_ATTR, lcName)) ; else if (ALLOW_ARIA_ATTR && regExpTest(ARIA_ATTR, lcName)) ; else if (!ALLOWED_ATTR[lcName] || FORBID_ATTR[lcName]) {
      if (
      // First condition does a very basic check if a) it's basically a valid custom element tagname AND
      // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
      // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
      _isBasicCustomElement(lcTag) && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, lcTag) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(lcTag)) && (CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.attributeNameCheck, lcName) || CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.attributeNameCheck(lcName)) ||
      // Alternative, second condition checks if it's an `is`-attribute, AND
      // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
      lcName === 'is' && CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, value) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(value))) ; else {
        return false;
      }
      /* Check value is safe. First, is attr inert? If so, is safe */
    } else if (URI_SAFE_ATTRIBUTES[lcName]) ; else if (regExpTest(IS_ALLOWED_URI$1, stringReplace(value, ATTR_WHITESPACE, ''))) ; else if ((lcName === 'src' || lcName === 'xlink:href' || lcName === 'href') && lcTag !== 'script' && stringIndexOf(value, 'data:') === 0 && DATA_URI_TAGS[lcTag]) ; else if (ALLOW_UNKNOWN_PROTOCOLS && !regExpTest(IS_SCRIPT_OR_DATA, stringReplace(value, ATTR_WHITESPACE, ''))) ; else if (value) {
      return false;
    } else ;
    return true;
  };
  /**
   * _isBasicCustomElement
   * checks if at least one dash is included in tagName, and it's not the first char
   * for more sophisticated checking see https://github.com/sindresorhus/validate-element-name
   *
   * @param tagName name of the tag of the node to sanitize
   * @returns Returns true if the tag name meets the basic criteria for a custom element, otherwise false.
   */
  const _isBasicCustomElement = function _isBasicCustomElement(tagName) {
    return tagName !== 'annotation-xml' && stringMatch(tagName, CUSTOM_ELEMENT);
  };
  /**
   * _sanitizeAttributes
   *
   * @protect attributes
   * @protect nodeName
   * @protect removeAttribute
   * @protect setAttribute
   *
   * @param currentNode to sanitize
   */
  const _sanitizeAttributes = function _sanitizeAttributes(currentNode) {
    /* Execute a hook if present */
    _executeHooks(hooks.beforeSanitizeAttributes, currentNode, null);
    const {
      attributes
    } = currentNode;
    /* Check if we have attributes; if not we might have a text node */
    if (!attributes || _isClobbered(currentNode)) {
      return;
    }
    const hookEvent = {
      attrName: '',
      attrValue: '',
      keepAttr: true,
      allowedAttributes: ALLOWED_ATTR,
      forceKeepAttr: undefined
    };
    let l = attributes.length;
    /* Go backwards over all attributes; safely remove bad ones */
    while (l--) {
      const attr = attributes[l];
      const {
        name,
        namespaceURI,
        value: attrValue
      } = attr;
      const lcName = transformCaseFunc(name);
      let value = name === 'value' ? attrValue : stringTrim(attrValue);
      /* Execute a hook if present */
      hookEvent.attrName = lcName;
      hookEvent.attrValue = value;
      hookEvent.keepAttr = true;
      hookEvent.forceKeepAttr = undefined; // Allows developers to see this is a property they can set
      _executeHooks(hooks.uponSanitizeAttribute, currentNode, hookEvent);
      value = hookEvent.attrValue;
      /* Full DOM Clobbering protection via namespace isolation,
       * Prefix id and name attributes with `user-content-`
       */
      if (SANITIZE_NAMED_PROPS && (lcName === 'id' || lcName === 'name')) {
        // Remove the attribute with this value
        _removeAttribute(name, currentNode);
        // Prefix the value and later re-create the attribute with the sanitized value
        value = SANITIZE_NAMED_PROPS_PREFIX + value;
      }
      /* Work around a security issue with comments inside attributes */
      if (SAFE_FOR_XML && regExpTest(/((--!?|])>)|<\/(style|title)/i, value)) {
        _removeAttribute(name, currentNode);
        continue;
      }
      /* Did the hooks approve of the attribute? */
      if (hookEvent.forceKeepAttr) {
        continue;
      }
      /* Remove attribute */
      _removeAttribute(name, currentNode);
      /* Did the hooks approve of the attribute? */
      if (!hookEvent.keepAttr) {
        continue;
      }
      /* Work around a security issue in jQuery 3.0 */
      if (!ALLOW_SELF_CLOSE_IN_ATTR && regExpTest(/\/>/i, value)) {
        _removeAttribute(name, currentNode);
        continue;
      }
      /* Sanitize attribute content to be template-safe */
      if (SAFE_FOR_TEMPLATES) {
        arrayForEach([MUSTACHE_EXPR, ERB_EXPR, TMPLIT_EXPR], expr => {
          value = stringReplace(value, expr, ' ');
        });
      }
      /* Is `value` valid for this attribute? */
      const lcTag = transformCaseFunc(currentNode.nodeName);
      if (!_isValidAttribute(lcTag, lcName, value)) {
        continue;
      }
      /* Handle attributes that require Trusted Types */
      if (trustedTypesPolicy && typeof trustedTypes === 'object' && typeof trustedTypes.getAttributeType === 'function') {
        if (namespaceURI) ; else {
          switch (trustedTypes.getAttributeType(lcTag, lcName)) {
            case 'TrustedHTML':
              {
                value = trustedTypesPolicy.createHTML(value);
                break;
              }
            case 'TrustedScriptURL':
              {
                value = trustedTypesPolicy.createScriptURL(value);
                break;
              }
          }
        }
      }
      /* Handle invalid data-* attribute set by try-catching it */
      try {
        if (namespaceURI) {
          currentNode.setAttributeNS(namespaceURI, name, value);
        } else {
          /* Fallback to setAttribute() for browser-unrecognized namespaces e.g. "x-schema". */
          currentNode.setAttribute(name, value);
        }
        if (_isClobbered(currentNode)) {
          _forceRemove(currentNode);
        } else {
          arrayPop(DOMPurify.removed);
        }
      } catch (_) {}
    }
    /* Execute a hook if present */
    _executeHooks(hooks.afterSanitizeAttributes, currentNode, null);
  };
  /**
   * _sanitizeShadowDOM
   *
   * @param fragment to iterate over recursively
   */
  const _sanitizeShadowDOM = function _sanitizeShadowDOM(fragment) {
    let shadowNode = null;
    const shadowIterator = _createNodeIterator(fragment);
    /* Execute a hook if present */
    _executeHooks(hooks.beforeSanitizeShadowDOM, fragment, null);
    while (shadowNode = shadowIterator.nextNode()) {
      /* Execute a hook if present */
      _executeHooks(hooks.uponSanitizeShadowNode, shadowNode, null);
      /* Sanitize tags and elements */
      _sanitizeElements(shadowNode);
      /* Check attributes next */
      _sanitizeAttributes(shadowNode);
      /* Deep shadow DOM detected */
      if (shadowNode.content instanceof DocumentFragment) {
        _sanitizeShadowDOM(shadowNode.content);
      }
    }
    /* Execute a hook if present */
    _executeHooks(hooks.afterSanitizeShadowDOM, fragment, null);
  };
  // eslint-disable-next-line complexity
  DOMPurify.sanitize = function (dirty) {
    let cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let body = null;
    let importedNode = null;
    let currentNode = null;
    let returnNode = null;
    /* Make sure we have a string to sanitize.
      DO NOT return early, as this will return the wrong type if
      the user has requested a DOM object rather than a string */
    IS_EMPTY_INPUT = !dirty;
    if (IS_EMPTY_INPUT) {
      dirty = '<!-->';
    }
    /* Stringify, in case dirty is an object */
    if (typeof dirty !== 'string' && !_isNode(dirty)) {
      if (typeof dirty.toString === 'function') {
        dirty = dirty.toString();
        if (typeof dirty !== 'string') {
          throw typeErrorCreate('dirty is not a string, aborting');
        }
      } else {
        throw typeErrorCreate('toString is not a function');
      }
    }
    /* Return dirty HTML if DOMPurify cannot run */
    if (!DOMPurify.isSupported) {
      return dirty;
    }
    /* Assign config vars */
    if (!SET_CONFIG) {
      _parseConfig(cfg);
    }
    /* Clean up removed elements */
    DOMPurify.removed = [];
    /* Check if dirty is correctly typed for IN_PLACE */
    if (typeof dirty === 'string') {
      IN_PLACE = false;
    }
    if (IN_PLACE) {
      /* Do some early pre-sanitization to avoid unsafe root nodes */
      if (dirty.nodeName) {
        const tagName = transformCaseFunc(dirty.nodeName);
        if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
          throw typeErrorCreate('root node is forbidden and cannot be sanitized in-place');
        }
      }
    } else if (dirty instanceof Node) {
      /* If dirty is a DOM element, append to an empty document to avoid
         elements being stripped by the parser */
      body = _initDocument('<!---->');
      importedNode = body.ownerDocument.importNode(dirty, true);
      if (importedNode.nodeType === NODE_TYPE.element && importedNode.nodeName === 'BODY') {
        /* Node is already a body, use as is */
        body = importedNode;
      } else if (importedNode.nodeName === 'HTML') {
        body = importedNode;
      } else {
        // eslint-disable-next-line unicorn/prefer-dom-node-append
        body.appendChild(importedNode);
      }
    } else {
      /* Exit directly if we have nothing to do */
      if (!RETURN_DOM && !SAFE_FOR_TEMPLATES && !WHOLE_DOCUMENT &&
      // eslint-disable-next-line unicorn/prefer-includes
      dirty.indexOf('<') === -1) {
        return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(dirty) : dirty;
      }
      /* Initialize the document to work on */
      body = _initDocument(dirty);
      /* Check we have a DOM node from the data */
      if (!body) {
        return RETURN_DOM ? null : RETURN_TRUSTED_TYPE ? emptyHTML : '';
      }
    }
    /* Remove first element node (ours) if FORCE_BODY is set */
    if (body && FORCE_BODY) {
      _forceRemove(body.firstChild);
    }
    /* Get node iterator */
    const nodeIterator = _createNodeIterator(IN_PLACE ? dirty : body);
    /* Now start iterating over the created document */
    while (currentNode = nodeIterator.nextNode()) {
      /* Sanitize tags and elements */
      _sanitizeElements(currentNode);
      /* Check attributes next */
      _sanitizeAttributes(currentNode);
      /* Shadow DOM detected, sanitize it */
      if (currentNode.content instanceof DocumentFragment) {
        _sanitizeShadowDOM(currentNode.content);
      }
    }
    /* If we sanitized `dirty` in-place, return it. */
    if (IN_PLACE) {
      return dirty;
    }
    /* Return sanitized string or DOM */
    if (RETURN_DOM) {
      if (RETURN_DOM_FRAGMENT) {
        returnNode = createDocumentFragment.call(body.ownerDocument);
        while (body.firstChild) {
          // eslint-disable-next-line unicorn/prefer-dom-node-append
          returnNode.appendChild(body.firstChild);
        }
      } else {
        returnNode = body;
      }
      if (ALLOWED_ATTR.shadowroot || ALLOWED_ATTR.shadowrootmode) {
        /*
          AdoptNode() is not used because internal state is not reset
          (e.g. the past names map of a HTMLFormElement), this is safe
          in theory but we would rather not risk another attack vector.
          The state that is cloned by importNode() is explicitly defined
          by the specs.
        */
        returnNode = importNode.call(originalDocument, returnNode, true);
      }
      return returnNode;
    }
    let serializedHTML = WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML;
    /* Serialize doctype if allowed */
    if (WHOLE_DOCUMENT && ALLOWED_TAGS['!doctype'] && body.ownerDocument && body.ownerDocument.doctype && body.ownerDocument.doctype.name && regExpTest(DOCTYPE_NAME, body.ownerDocument.doctype.name)) {
      serializedHTML = '<!DOCTYPE ' + body.ownerDocument.doctype.name + '>\n' + serializedHTML;
    }
    /* Sanitize final string template-safe */
    if (SAFE_FOR_TEMPLATES) {
      arrayForEach([MUSTACHE_EXPR, ERB_EXPR, TMPLIT_EXPR], expr => {
        serializedHTML = stringReplace(serializedHTML, expr, ' ');
      });
    }
    return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(serializedHTML) : serializedHTML;
  };
  DOMPurify.setConfig = function () {
    let cfg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _parseConfig(cfg);
    SET_CONFIG = true;
  };
  DOMPurify.clearConfig = function () {
    CONFIG = null;
    SET_CONFIG = false;
  };
  DOMPurify.isValidAttribute = function (tag, attr, value) {
    /* Initialize shared config vars if necessary. */
    if (!CONFIG) {
      _parseConfig({});
    }
    const lcTag = transformCaseFunc(tag);
    const lcName = transformCaseFunc(attr);
    return _isValidAttribute(lcTag, lcName, value);
  };
  DOMPurify.addHook = function (entryPoint, hookFunction) {
    if (typeof hookFunction !== 'function') {
      return;
    }
    arrayPush(hooks[entryPoint], hookFunction);
  };
  DOMPurify.removeHook = function (entryPoint, hookFunction) {
    if (hookFunction !== undefined) {
      const index = arrayLastIndexOf(hooks[entryPoint], hookFunction);
      return index === -1 ? undefined : arraySplice(hooks[entryPoint], index, 1)[0];
    }
    return arrayPop(hooks[entryPoint]);
  };
  DOMPurify.removeHooks = function (entryPoint) {
    hooks[entryPoint] = [];
  };
  DOMPurify.removeAllHooks = function () {
    hooks = _createHooksMap();
  };
  return DOMPurify;
}
var purify = createDOMPurify();

var dayjs_min$1 = {exports: {}};

var dayjs_min = dayjs_min$1.exports;

var hasRequiredDayjs_min;

function requireDayjs_min () {
	if (hasRequiredDayjs_min) return dayjs_min$1.exports;
	hasRequiredDayjs_min = 1;
	(function (module, exports) {
		!function(t,e){module.exports=e();}(dayjs_min,(function(){var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",c="month",f="quarter",h="year",d="date",l="Invalid Date",$=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return "["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},m=function(t,e,n){var r=String(t);return !r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},v={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return (e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return -t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,c),s=n-i<0,u=e.clone().add(r+(s?-1:1),c);return +(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return {M:c,y:h,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:f}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},g="en",D={};D[g]=M;var p="$isDayjsObject",S=function(t){return t instanceof _||!(!t||!t[p])},w=function t(e,n,r){var i;if(!e)return g;if("string"==typeof e){var s=e.toLowerCase();D[s]&&(i=s),n&&(D[s]=n,i=s);var u=e.split("-");if(!i&&u.length>1)return t(u[0])}else {var a=e.name;D[a]=e,i=a;}return !r&&i&&(g=i),i||!r&&g},O=function(t,e){if(S(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},b=v;b.l=w,b.i=S,b.w=function(t,e){return O(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function M(t){this.$L=w(t.locale,null,true),this.parse(t),this.$x=this.$x||t.x||{},this[p]=true;}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(b.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match($);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.init();},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds();},m.$utils=function(){return b},m.isValid=function(){return !(this.$d.toString()===l)},m.isSame=function(t,e){var n=O(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return O(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<O(t)},m.$g=function(t,e,n){return b.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!b.u(e)||e,f=b.p(t),l=function(t,e){var i=b.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},$=function(t,e){return b.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,v="set"+(this.$u?"UTC":"");switch(f){case h:return r?l(1,0):l(31,11);case c:return r?l(1,M):l(0,M+1);case o:var g=this.$locale().weekStart||0,D=(y<g?y+7:y)-g;return l(r?m-D:m+(6-D),M);case a:case d:return $(v+"Hours",0);case u:return $(v+"Minutes",1);case s:return $(v+"Seconds",2);case i:return $(v+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,false)},m.$set=function(t,e){var n,o=b.p(t),f="set"+(this.$u?"UTC":""),l=(n={},n[a]=f+"Date",n[d]=f+"Date",n[c]=f+"Month",n[h]=f+"FullYear",n[u]=f+"Hours",n[s]=f+"Minutes",n[i]=f+"Seconds",n[r]=f+"Milliseconds",n)[o],$=o===a?this.$D+(e-this.$W):e;if(o===c||o===h){var y=this.clone().set(d,1);y.$d[l]($),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d;}else l&&this.$d[l]($);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[b.p(t)]()},m.add=function(r,f){var d,l=this;r=Number(r);var $=b.p(f),y=function(t){var e=O(l);return b.w(e.date(e.date()+Math.round(t*r)),l)};if($===c)return this.set(c,this.$M+r);if($===h)return this.set(h,this.$y+r);if($===a)return y(1);if($===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[$]||1,m=this.$d.getTime()+r*M;return b.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||l;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=b.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,c=n.months,f=n.meridiem,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].slice(0,s)},d=function(t){return b.s(s%12||12,t,"0")},$=f||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r};return r.replace(y,(function(t,r){return r||function(t){switch(t){case "YY":return String(e.$y).slice(-2);case "YYYY":return b.s(e.$y,4,"0");case "M":return a+1;case "MM":return b.s(a+1,2,"0");case "MMM":return h(n.monthsShort,a,c,3);case "MMMM":return h(c,a);case "D":return e.$D;case "DD":return b.s(e.$D,2,"0");case "d":return String(e.$W);case "dd":return h(n.weekdaysMin,e.$W,o,2);case "ddd":return h(n.weekdaysShort,e.$W,o,3);case "dddd":return o[e.$W];case "H":return String(s);case "HH":return b.s(s,2,"0");case "h":return d(1);case "hh":return d(2);case "a":return $(s,u,true);case "A":return $(s,u,false);case "m":return String(u);case "mm":return b.s(u,2,"0");case "s":return String(e.$s);case "ss":return b.s(e.$s,2,"0");case "SSS":return b.s(e.$ms,3,"0");case "Z":return i}return null}(t)||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,l){var $,y=this,M=b.p(d),m=O(r),v=(m.utcOffset()-this.utcOffset())*e,g=this-m,D=function(){return b.m(y,m)};switch(M){case h:$=D()/12;break;case c:$=D();break;case f:$=D()/3;break;case o:$=(g-v)/6048e5;break;case a:$=(g-v)/864e5;break;case u:$=g/n;break;case s:$=g/e;break;case i:$=g/t;break;default:$=g;}return l?$:b.a($)},m.daysInMonth=function(){return this.endOf(c).$D},m.$locale=function(){return D[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=w(t,e,true);return r&&(n.$L=r),n},m.clone=function(){return b.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),k=_.prototype;return O.prototype=k,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",c],["$y",h],["$D",d]].forEach((function(t){k[t[1]]=function(e){return this.$g(e,t[0],t[1])};})),O.extend=function(t,e){return t.$i||(t(e,_,O),t.$i=true),O},O.locale=w,O.isDayjs=S,O.unix=function(t){return O(1e3*t)},O.en=D[g],O.Ls=D,O.p={},O})); 
	} (dayjs_min$1));
	return dayjs_min$1.exports;
}

var dayjs_minExports = requireDayjs_min();
var dayjs = /*@__PURE__*/getDefaultExportFromCjs(dayjs_minExports);

const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};
/**
 * Generates the title for the thread based on the number of comments.
 * @param {number} commentCount - The number of comments.
 * @returns {string} The title for the thread.
 */
const getThreadTitle = (commentCount) => {
    if (commentCount === 0)
        return "Add New Comment";
    return commentCount === 1 ? "1 Comment" : `${commentCount} Comments`;
};
/**
 * returns the available email.
 * @param {IUserDTO} user - The user object.
 * @returns {string} The user's email.
 */
const getUserName = (user) => {
    return user.firstName && user.lastName
        ? `${user.firstName} ${user.lastName}`
        : user.firstName || user.lastName || user.email;
};
/**
 * Validates the comment length and the number of mentions.
 * @param {string} comment - The comment message.
 * @param {IMentionedList} toUsers - The list of mentioned users.
 * @returns {string} The error message if validation fails, otherwise an empty string.
 */
const validateCommentAndMentions = (comment, toUsers) => {
    if (comment.length > maxMessageLength) {
        return `Limit exceeded. You can have a maximum length of ${maxMessageLength} characters.`;
    }
    if (toUsers.length > mentionLimit) {
        return `Limit exceeded. You can tag a maximum of ${mentionLimit} users.`;
    }
    return "";
};
/**
 * Removes mentions that no longer exist in the message.
 * @param {string} message - The comment message.
 * @param {IMentionedList} toUsers - The list of mentioned users.
 * @returns {Object} The updated lists of mentioned users.
 */
const filterOutInvalidMentions = (message, toUsers) => {
    const to_users_temp = toUsers.filter((user) => message.includes(user.display));
    return {
        toUsers: uniqBy(to_users_temp, "id"),
    };
};
/**
 * Replaces mention placeholders with display names in the comment message.
 * @param {IMessageDTO | undefined} comment - The comment object.
 * @param {IUserState} userState - The user state containing user and role maps.
 * @param {"text" | "html"} profile - The format for the output message, either plain text or HTML.
 * @returns {string | undefined} The formatted message or undefined if the comment is not provided.
 */
const getMessageWithDisplayName = (comment, userState, profile) => {
    if (!comment)
        return undefined;
    let tempText = sanitizeData(comment.message).replace(/<[^>]*>/g, "");
    comment.toUsers?.forEach((user) => {
        const userPattern = new RegExp(`{{${user}}}`, "g");
        const userData = userState.userMap[user];
        const displayName = userData
            ? userData.display || getUserName(userData)
            : `unknown user`;
        const replacement = profile === "html"
            ? `<b class="collab-thread-comment--message">@${displayName}</b>`
            : `@${displayName}`;
        tempText = tempText.replace(userPattern, replacement);
    });
    return tempText;
};
/**
 * Sanitizes HTML content to prevent XSS attacks.
 * @param {any} dirty - The unsanitized HTML content.
 * @returns {string} The sanitized HTML content.
 */
const sanitizeData = (dirty) => {
    return purify.sanitize(dirty, { USE_PROFILES: { html: true } });
};
/**
 * Constructs the comment body with mentions replaced by their unique identifiers.
 * @param {ICommentState} state - The state containing the comment and mentions.
 * @returns {Object} The comment body containing the sanitized message and mentioned users.
 */
const getCommentBody = (state) => {
    let finalMessage = sanitizeData(state.message)
        .replace(/[^\S\r\n]+/g, " ")
        .replace(/ *\n */g, "\n")
        .replace(/<[^>]*>/g, "")
        .trim();
    const comment = {
        message: finalMessage,
        toUsers: [],
        images: [],
        createdBy: state.createdBy,
        author: state.author,
    };
    const updateMentionToUID = (entity, result) => {
        const displayName = entity.display;
        const escapedDisplayName = escapeRegExp(`@${displayName}`);
        const regexUser = new RegExp(escapedDisplayName, "g");
        finalMessage = finalMessage.replace(regexUser, `{{${entity.id}}}`);
        result.push(entity.id);
    };
    state.toUsers?.forEach((user) => updateMentionToUID(user, comment.toUsers));
    comment.message = finalMessage;
    return comment;
};
function normalizePath(path) {
    if (path === "/")
        return path;
    return path.endsWith("/") ? path.slice(0, -1) : path;
}
function fixSvgXPath(xpath) {
    if (!xpath)
        return "";
    return xpath.replace(/\/svg/g, "/*[name()='svg']");
}
/**
 * populate the position of the thread based on edges of the screen.
 * @param position
 * @param options
 * @returns
 */
function adjustPositionToViewport(position, options = {}) {
    const { top, left } = position;
    const viewportWidth = window.innerWidth;
    const safeMargin = options.safeMargin ?? 16;
    const topSafeMargin = options.topSafeMargin ?? 42;
    const threadWidth = options.threadWidth ?? 16;
    let adjustedLeft = left;
    let adjustedTop = top;
    // Adjust position if too close to right edge
    if (adjustedLeft + threadWidth > viewportWidth - safeMargin) {
        adjustedLeft = viewportWidth - safeMargin - threadWidth;
    }
    // Adjust position if too close to top edge
    if (adjustedTop - window.scrollY < topSafeMargin) {
        adjustedTop = window.scrollY + topSafeMargin;
    }
    return { top: adjustedTop, left: adjustedLeft };
}
function formatDate(dateString) {
    if (!dateString)
        return "";
    return dayjs(dateString).format("MMM DD, YYYY, hh:mm A");
}
/**
 * Calculates and updates tooltip position based on available viewport space.
 */
const positionTooltip = (tooltipRef, targetRef, position, setActualPosition) => {
    if (!tooltipRef.current || !targetRef.current)
        return;
    const targetRect = targetRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const margin = 8;
    const positions = {
        bottom: {
            top: targetRect.bottom + margin,
            left: targetRect.left + (targetRect.width - tooltipRect.width) / 2,
        },
        top: {
            top: targetRect.top - tooltipRect.height - margin,
            left: targetRect.left + (targetRect.width - tooltipRect.width) / 2,
        },
        left: {
            top: targetRect.top + (targetRect.height - tooltipRect.height) / 2,
            left: targetRect.left - tooltipRect.width - margin,
        },
        right: {
            top: targetRect.top + (targetRect.height - tooltipRect.height) / 2,
            left: targetRect.right + margin,
        },
    };
    let bestPosition = position;
    let coords = positions[position];
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const wouldBeOutsideViewport = {
        bottom: coords.top + tooltipRect.height > viewportHeight,
        top: coords.top < 0,
        left: coords.left < 0,
        right: coords.left + tooltipRect.width > viewportWidth,
    };
    const horizontalOutOfBounds = coords.left < 0 || coords.left + tooltipRect.width > viewportWidth;
    if (wouldBeOutsideViewport[position] || horizontalOutOfBounds) {
        const positionPriority = ["bottom", "top", "right", "left"];
        positionPriority.splice(positionPriority.indexOf(position), 1);
        positionPriority.push(position);
        for (const pos of positionPriority) {
            const testCoords = positions[pos];
            const isVisible = testCoords.top >= 0 &&
                testCoords.top + tooltipRect.height <= viewportHeight &&
                testCoords.left >= 0 &&
                testCoords.left + tooltipRect.width <= viewportWidth;
            if (isVisible) {
                bestPosition = pos;
                coords = testCoords;
                break;
            }
        }
    }
    if (coords.left < 0) {
        coords.left = margin;
    }
    else if (coords.left + tooltipRect.width > viewportWidth) {
        coords.left = viewportWidth - tooltipRect.width - margin;
    }
    if (coords.top < 0) {
        coords.top = margin;
    }
    else if (coords.top + tooltipRect.height > viewportHeight) {
        coords.top = viewportHeight - tooltipRect.height - margin;
    }
    setActualPosition(bestPosition);
    Object.assign(tooltipRef.current.style, {
        top: `${coords.top}px`,
        left: `${coords.left}px`,
    });
};

const Tooltip$1 = (props) => {
    const { content, children, position = "bottom", className, testId, ...otherProps } = props;
    const [isVisible, setIsVisible] = p$3(false);
    const [actualPosition, setActualPosition] = p$3(position);
    const tooltipRef = F$1(null);
    const targetRef = F$1(null);
    const prevChildrenRef = F$1(children);
    _$1(() => {
        if (prevChildrenRef.current !== children) {
            setIsVisible(false);
            prevChildrenRef.current = children;
        }
    }, [children]);
    _$1(() => {
        const updateTooltip = () => positionTooltip(tooltipRef, targetRef, position, setActualPosition);
        updateTooltip();
        window.addEventListener("scroll", updateTooltip);
        window.addEventListener("resize", updateTooltip);
        return () => {
            window.removeEventListener("scroll", updateTooltip);
            window.removeEventListener("resize", updateTooltip);
        };
    }, [isVisible, position]);
    return (u("div", { ref: targetRef, className: classNames("collab-tooltip--wrapper", collabStyles()["collab-tooltip--wrapper"], className), onMouseEnter: () => setIsVisible(true), onMouseLeave: () => setIsVisible(false), "data-testid": testId, ...otherProps, children: [children, isVisible && (u("div", { ref: tooltipRef, className: classNames("collab-tooltip", `collab-tooltip--${actualPosition}`, collabStyles()["collab-tooltip"], collabStyles()[`collab-tooltip--${actualPosition}`]), role: "tooltip", "aria-hidden": !isVisible, "data-position": actualPosition, children: content }))] }));
};
Tooltip$1.defaultProps = {
    testId: "collab-tooltip",
};

const iconComponents = {
    Cancel: (props) => (u("svg", { ...props, width: "32", height: "32", viewBox: "0 0 32 32", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: u("path", { class: "collab-icon__svg", d: "M25.5303 7.53033C25.8232 7.23744 25.8232 6.76256 25.5303 6.46967C25.2374 6.17678 24.7626 6.17678 24.4697 6.46967L16 14.9393L7.53033 6.46967C7.23744 6.17678 6.76256 6.17678 6.46967 6.46967C6.17678 6.76256 6.17678 7.23744 6.46967 7.53033L14.9393 16L6.46967 24.4697C6.17678 24.7626 6.17678 25.2374 6.46967 25.5303C6.76256 25.8232 7.23744 25.8232 7.53033 25.5303L16 17.0607L24.4697 25.5303C24.7626 25.8232 25.2374 25.8232 25.5303 25.5303C25.8232 25.2374 25.8232 24.7626 25.5303 24.4697L17.0607 16L25.5303 7.53033Z", fill: "#475161" }) })),
    Delete: (props) => (u("svg", { ...props, width: "32", height: "32", viewBox: "0 0 32 32", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [u("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", class: "collab-icon__svg", d: "M4.25 7C4.25 6.58579 4.58579 6.25 5 6.25H27C27.4142 6.25 27.75 6.58579 27.75 7C27.75 7.41421 27.4142 7.75 27 7.75H5C4.58579 7.75 4.25 7.41421 4.25 7Z", fill: "#475161" }), u("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", class: "collab-icon__svg", d: "M13 12.25C13.4142 12.25 13.75 12.5858 13.75 13V21C13.75 21.4142 13.4142 21.75 13 21.75C12.5858 21.75 12.25 21.4142 12.25 21V13C12.25 12.5858 12.5858 12.25 13 12.25Z", fill: "#475161" }), u("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", class: "collab-icon__svg", d: "M19 12.25C19.4142 12.25 19.75 12.5858 19.75 13V21C19.75 21.4142 19.4142 21.75 19 21.75C18.5858 21.75 18.25 21.4142 18.25 21V13C18.25 12.5858 18.5858 12.25 19 12.25Z", fill: "#475161" }), u("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", class: "collab-icon__svg", d: "M7 6.25C7.41421 6.25 7.75 6.58579 7.75 7V26C7.75 26.0663 7.77634 26.1299 7.82322 26.1768C7.87011 26.2237 7.93369 26.25 8 26.25H24C24.0663 26.25 24.1299 26.2237 24.1768 26.1768C24.2237 26.1299 24.25 26.0663 24.25 26V7C24.25 6.58579 24.5858 6.25 25 6.25C25.4142 6.25 25.75 6.58579 25.75 7V26C25.75 26.4641 25.5656 26.9092 25.2374 27.2374C24.9092 27.5656 24.4641 27.75 24 27.75H8C7.53587 27.75 7.09075 27.5656 6.76256 27.2374C6.43437 26.9092 6.25 26.4641 6.25 26V7C6.25 6.58579 6.58579 6.25 7 6.25Z", fill: "#475161" }), u("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", class: "collab-icon__svg", d: "M11.0555 3.05546C11.5712 2.53973 12.2707 2.25 13 2.25H19C19.7293 2.25 20.4288 2.53973 20.9445 3.05546C21.4603 3.57118 21.75 4.27065 21.75 5V7C21.75 7.41421 21.4142 7.75 21 7.75C20.5858 7.75 20.25 7.41421 20.25 7V5C20.25 4.66848 20.1183 4.35054 19.8839 4.11612C19.6495 3.8817 19.3315 3.75 19 3.75H13C12.6685 3.75 12.3505 3.8817 12.1161 4.11612C11.8817 4.35054 11.75 4.66848 11.75 5V7C11.75 7.41421 11.4142 7.75 11 7.75C10.5858 7.75 10.25 7.41421 10.25 7V5C10.25 4.27065 10.5397 3.57118 11.0555 3.05546Z", fill: "#475161" })] })),
    Edit: (props) => (u("svg", { ...props, width: "32", height: "32", viewBox: "0 0 32 32", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: u("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", class: "collab-icon__svg", d: "M4.7778 20.5072C4.47473 20.8102 4.29342 21.214 4.26826 21.6418L4.00309 26.1497C3.94156 27.1957 4.80682 28.0609 5.85284 27.9994L10.3606 27.7342C10.7885 27.7091 11.1922 27.5278 11.4953 27.2247L27.4899 11.2301C28.1733 10.5467 28.1733 9.43862 27.4899 8.7552L23.2473 4.51256C22.5639 3.82915 21.4558 3.82915 20.7724 4.51256L4.7778 20.5072ZM5.76567 21.7299C5.76926 21.6688 5.79516 21.6111 5.83846 21.5678L18.9336 8.4727L23.327 12.8661C23.3988 12.9379 23.4816 12.9921 23.57 13.0287L10.4347 26.164C10.3914 26.2073 10.3337 26.2332 10.2726 26.2368L5.76475 26.502C5.61532 26.5108 5.49171 26.3872 5.5005 26.2377L5.76567 21.7299ZM24.5503 12.0484L26.4293 10.1694C26.5269 10.0718 26.5269 9.9135 26.4293 9.81586L22.1866 5.57322C22.089 5.47559 21.9307 5.47559 21.8331 5.57322L19.9943 7.41204L24.3876 11.8054C24.4595 11.8772 24.5137 11.96 24.5503 12.0484Z", fill: "#475161" }) })),
    RightMarkActive: (props) => (u("svg", { ...props, xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", children: u("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", class: "collab-icon__svg", d: "M17.2065 5.29354C17.3895 5.4766 17.3895 5.7734 17.2065 5.95646L8.45646 14.7065C8.2734 14.8895 7.9766 14.8895 7.79354 14.7065L3.41854 10.3315C3.23549 10.1484 3.23549 9.8516 3.41854 9.66854C3.6016 9.48549 3.8984 9.48549 4.08146 9.66854L8.125 13.7121L16.5435 5.29354C16.7266 5.11049 17.0234 5.11049 17.2065 5.29354Z", fill: "#6C5CE7" }) })),
    Indicator: ({ active }) => (u("svg", { width: active ? "25" : "24", height: "24", viewBox: `0 0 ${active ? 25 : 24} 24`, fill: "none", class: "collab-icon", xmlns: "http://www.w3.org/2000/svg", style: { marginTop: "2px" }, children: [u("path", { class: "collab-icon__svg", d: "M8.4375 9C8.4375 8.68934 8.68934 8.4375 9 8.4375H15C15.3107 8.4375 15.5625 8.68934 15.5625 9C15.5625 9.31066 15.3107 9.5625 15 9.5625H9C8.68934 9.5625 8.4375 9.31066 8.4375 9Z", fill: "white" }), u("path", { class: "collab-icon__svg", d: "M8.4375 12C8.4375 11.6893 8.68934 11.4375 9 11.4375H15C15.3107 11.4375 15.5625 11.6893 15.5625 12C15.5625 12.3107 15.3107 12.5625 15 12.5625H9C8.68934 12.5625 8.4375 12.3107 8.4375 12Z", fill: "white" }), u("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", class: "collab-icon__svg", d: "M3 5.25C3 4.83579 3.33579 4.5 3.75 4.5H20.25C20.6642 4.5 21 4.83579 21 5.25V16.4423C21 16.8565 20.6642 17.1923 20.25 17.1923H14.9804C14.853 17.1923 14.7343 17.257 14.6652 17.3641L12.9633 20.0042C12.6651 20.4669 11.9866 20.4613 11.696 19.9938L10.1746 17.5464C10.0378 17.3262 9.79691 17.1923 9.53766 17.1923H3.75C3.33579 17.1923 3 16.8565 3 16.4423V5.25ZM4.125 16.0673V5.625H19.875V16.0673H14.9804C14.4707 16.0673 13.9958 16.3262 13.7197 16.7546L12.3387 18.8968L11.1301 16.9524C10.7879 16.402 10.1858 16.0673 9.53766 16.0673H4.125Z", fill: "white" }), active && (u("g", { children: [u("circle", { cx: "20", cy: "5", r: "4", fill: "#EB5646", class: "collab-icon__svg" }), u("circle", { cx: "20", cy: "5", r: "4.5", stroke: "white", "stroke-opacity": "0.6", class: "collab-icon__svg" })] }))] })),
};

const IconWrapper = ({ icon, className, onClick, testId, disabled, ...otherProps }) => {
    const IconComponent = iconComponents[icon];
    const handleClick = (e) => {
        if (disabled)
            return;
        onClick?.(e);
    };
    return (u("div", { className: classNames("collab-icon-wrapper", collabStyles()["collab-icon-wrapper"]), onClick: handleClick, "data-testid": testId, ...otherProps, children: IconComponent ? (u(IconComponent, { className: classNames("collab-icon", collabStyles()["collab-icon"], className) })) : null }));
};
const withTooltip = (Component) => ({ withTooltip = false, tooltipContent = "", testId = "collab-icon", ...props }) => {
    return withTooltip && tooltipContent ? (u("div", { "data-testid": testId, children: u(Tooltip$1, { content: tooltipContent, position: "bottom", testId: "collab-icon-tooltip", children: u(Component, { ...props }) }) })) : (u(Component, { ...props, testId: testId }));
};
const Icon = withTooltip(IconWrapper);

const AsyncLoader = ({ className, color = "primary", testId = "collab-async-loader", ...otherProps }) => {
    const combinedClassName = classNames(collabStyles()["collab-button--loader--animation"], collabStyles()["collab-button--loading--color"][color], "collab-button--loader--animation", `collab-button--loading--${color}`);
    return (u("div", { className: classNames("collab-button--loader", collabStyles()["collab-button--loader"], className), ...otherProps, "data-testid": testId, children: [u("div", { className: combinedClassName }), u("div", { className: combinedClassName }), u("div", { className: combinedClassName })] }));
};

const Button = ({ buttonType = "primary", children, className = "", testId, onClick, isLoading, loadingColor = "primary", disabled = false, type = "button", style, href, id, size = "large", icon, iconProps, iconAlignment = "left", }) => {
    const Element = href ? "a" : "button";
    let nestedChildren = children && wn.Children.toArray([children]);
    if (icon) {
        let iconChild = u(Icon, { icon: icon, ...iconProps });
        switch (iconAlignment) {
            case "left":
                nestedChildren = wn.Children.toArray([
                    iconChild,
                    nestedChildren,
                ]);
                break;
            case "right":
                nestedChildren = wn.Children.toArray([
                    nestedChildren,
                    iconChild,
                ]);
                break;
            case "both":
                nestedChildren = wn.Children.toArray([
                    iconChild,
                    nestedChildren,
                    iconChild,
                ]);
                break;
        }
    }
    const combinedClassName = classNames(collabStyles()["collab-button--basestyle"], collabStyles()["collab-button--type"][buttonType], collabStyles()["collab-button--size"][size], icon && collabStyles()["collab-button--icon-allignment"][iconAlignment], disabled && collabStyles()["collab-button--disabled"], isLoading && collabStyles()["collab-button--loading"], className, `collab-button collab-button--${buttonType} collab-button--${size} ${icon ? `collab-button--icon-${iconAlignment}` : ""} ${disabled ? "collab-button--disabled" : ""}
        ${isLoading ? "collab-button--loading" : ""}`);
    // Ensure style is valid
    const validStyle = Object.fromEntries(Object.entries(style || {}).filter(([_, value]) => value != null));
    return (u(Element, { className: combinedClassName, id: id, onClick: onClick, type: type, style: validStyle, disabled: disabled, href: href, "data-testid": testId, children: u("div", { className: classNames("flex-center", flexCentered), children: [isLoading && (u("div", { className: classNames(collabStyles()["collab-button--loader--wrapper"], "collab-button--loader--wrapper"), children: u(AsyncLoader, { color: loadingColor }) })), u("div", { className: classNames("flex-v-center", flexAlignCenter, {
                        [`${collabStyles()["collab-button--size"]["regular"]} collab-button--regular`]: size !== "small",
                    }, !isLoading
                        ? `${collabStyles()["collab-button--visible"]} collab-button--visible`
                        : `${collabStyles()["collab-button--hidden"]} collab-button--hidden`), children: nestedChildren })] }) }));
};

const ThreadActionBar = ({ commentCount, displayResolve, handleResolve, isResolving, }) => {
    return (u(g$4, { children: [u("div", { className: classNames("collab-thread-header--title", collabStyles()["collab-thread-header--title"]), children: getThreadTitle(commentCount) }), displayResolve && (u(Button, { buttonType: "tertiary", className: classNames("collab-thread-header--resolve", collabStyles()["collab-thread-header--resolve"]), icon: "RightMarkActive", iconProps: {
                    className: classNames(collabStyles()["collab-thread-header--resolve--icon"], "collab-thread-header--resolve--icon"),
                }, onClick: handleResolve, testId: "collab-thread-resolve-btn", isLoading: isResolving, loadingColor: "secondary", children: u("span", { className: classNames("collab-thread-header--resolve--text", collabStyles()["collab-thread-header--resolve--text"]), children: "Resolve" }) }))] }));
};

const ThreadHeader = wn.memo(({ onClose, displayResolve, onResolve, commentCount, activeThread }) => {
    const [isResolving, setIsResolving] = p$3(false);
    const handleResolve = x$1(async () => {
        if (isResolving)
            return;
        try {
            setIsResolving(true);
            const payload = {
                threadUid: activeThread._id,
                payload: { threadState: 2 },
            };
            await onResolve(payload);
        }
        finally {
            onClose(true);
            setIsResolving(false);
        }
    }, [activeThread, isResolving, onResolve, onClose]);
    return (u("div", { className: classNames("collab-thread-header--wrapper", "flex-v-center", collabStyles()["collab-thread-header--wrapper"], flexAlignCenter), children: u("div", { className: classNames("collab-thread-header--container", "flex-v-center", collabStyles()["collab-thread-header--container"], flexAlignCenter), children: u(ThreadActionBar, { commentCount: commentCount, displayResolve: displayResolve, handleResolve: handleResolve, isResolving: isResolving }) }) }));
});

const ButtonGroup = (props) => {
    const { className, children, style, testId, ...otherProps } = props;
    const classNames$1 = classNames("collab-button-group", collabStyles()["collab-button-group"], className);
    return (u("div", { className: classNames$1, style: style, "data-testid": testId, ...otherProps, children: children }));
};
ButtonGroup.defaultProps = {
    testId: "collab-button-group",
};

const ThreadFooter = ({ onClose, handleOnSaveRef, isDisabled, editComment, }) => {
    const [loading, setLoading] = p$3(false);
    const onSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();
        await handleOnSaveRef.current?.();
        setLoading(false);
    };
    return (u("div", { className: classNames("collab-thread-footer--wrapper", "flex-v-center", collabStyles()["collab-thread-footer--wrapper"], flexAlignCenter), children: u(ButtonGroup, { children: [u(Button, { type: "button", buttonType: "tertiary", testId: "thread-cancel-btn", onClick: () => onClose(false), children: "Cancel" }), u(Button, { type: "button", buttonType: "primary", onClick: onSubmit, testId: "thread-save-btn", disabled: isDisabled || loading, isLoading: loading, children: editComment === "" ? "Post" : "Update" })] }) }));
};

const SkeletonTile = (props) => {
    const { numberOfTiles, tileleftSpace, tileTopSpace, tileHeight, tileBottomSpace, tileWidth, testId, tileRadius = 7, } = props;
    const svgHeight = numberOfTiles * tileHeight +
        numberOfTiles * tileBottomSpace +
        numberOfTiles * tileTopSpace;
    const svgWidth = typeof tileWidth === "string" ? tileWidth : tileWidth + tileleftSpace;
    return (u("svg", { "data-testid": testId, height: svgHeight, width: svgWidth, className: classNames("collab-skeletonTileSvgClass", collabStyles()["collab-skeletonTileSvgClass"]), fill: "#EDF1F7", children: Array.from({ length: numberOfTiles }).map((_, index) => (u("g", { children: u("rect", { "data-testid": "rect", x: tileleftSpace, y: index * (tileHeight + tileBottomSpace) +
                    tileTopSpace, rx: tileRadius, width: tileWidth, height: tileHeight }) }, index))) }));
};
SkeletonTile.defaultProps = {
    testId: "collab-skeletonTile",
};

const ThreadBodyLoader = () => {
    return (u("div", { className: classNames("collab-thread-body-comment--loader", collabStyles()["collab-thread-body-comment--loader"]), children: [u("div", { style: { display: "flex" }, children: [u(SkeletonTile, { numberOfTiles: 1, tileHeight: 32, tileWidth: 32, tileBottomSpace: 0, tileTopSpace: 0, tileleftSpace: 0, tileRadius: 50 }), u(SkeletonTile, { numberOfTiles: 2, tileHeight: 10, tileWidth: 130, tileBottomSpace: 7, tileTopSpace: 3, tileleftSpace: 10 })] }), u(SkeletonTile, { numberOfTiles: 1, tileHeight: 14, tileWidth: 300, tileBottomSpace: 5, tileTopSpace: 0, tileleftSpace: 0 }), u(SkeletonTile, { numberOfTiles: 1, tileHeight: 14, tileWidth: 230, tileBottomSpace: 0, tileTopSpace: 0, tileleftSpace: 0 })] }));
};

/** @jsxImportSource preact */
const ThreadProvider = wn.createContext(null);

const useDynamicTextareaRows = (selector, dependency, defaultRows = 1, expandedRows = 3) => {
    _$1(() => {
        const textAreaElement = document.querySelector(selector);
        if (textAreaElement) {
            textAreaElement.setAttribute("rows", dependency.length > 0 ? `${expandedRows}` : `${defaultRows}`);
        }
        return () => {
            textAreaElement?.setAttribute("rows", `${defaultRows}`);
        };
    }, [dependency, selector, defaultRows, expandedRows]);
};

const initialState = {
    message: "",
    toUsers: [],
    images: [],
    createdBy: "",
    author: "",
};
const useCommentTextArea = (userState, comment, onClose) => {
    const [state, setState] = p$3(initialState);
    const [showSuggestions, setShowSuggestions] = p$3(false);
    const [cursorPosition, setCursorPosition] = p$3({
        top: 0,
        left: 0,
        showAbove: false,
    });
    const [searchTerm, setSearchTerm] = p$3("");
    const [selectedIndex, setSelectedIndex] = p$3(0);
    const [filteredUsers, setFilteredUsers] = p$3([]);
    const inputRef = F$1(null);
    const listRef = F$1(null);
    const itemRefs = F$1([]);
    const { error, setError, onCreateComment, onEditComment, editComment, setThreadState, activeThread, setActiveThread, createNewThread, } = P$1(ThreadProvider);
    useDynamicTextareaRows(".collab-thread-body--input--textarea", state.message);
    _$1(() => {
        itemRefs.current = itemRefs.current.slice(0, userState.mentionsList.length);
    }, [userState.mentionsList]);
    _$1(() => {
        const filteredUsersList = userState.mentionsList.filter((user) => {
            if (!searchTerm)
                return true;
            return user.display
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
        });
        setFilteredUsers(filteredUsersList);
    }, [searchTerm, userState.mentionsList]);
    _$1(() => {
        const textArea = document.getElementById("collab-thread-body--input--textarea");
        if (!textArea)
            return;
        const baseClasses = {
            focus: {
                base: "collab-thread-body--input--textarea--focus",
                goober: collabStyles()["collab-thread-body--input--textarea--focus"],
            },
            hover: {
                base: "collab-thread-body--input--textarea--hover",
                goober: collabStyles()["collab-thread-body--input--textarea--hover"],
            },
        };
        const handleFocus = () => {
            textArea.classList.add(baseClasses.focus.base, baseClasses.focus.goober);
        };
        const handleBlur = () => {
            textArea.classList.remove(baseClasses.focus.base, baseClasses.focus.goober);
        };
        const handleMouseEnter = () => {
            textArea.classList.add(baseClasses.hover.base, baseClasses.hover.goober);
        };
        const handleMouseLeave = () => {
            textArea.classList.remove(baseClasses.hover.base, baseClasses.hover.goober);
        };
        textArea.addEventListener("focus", handleFocus);
        textArea.addEventListener("blur", handleBlur);
        textArea.addEventListener("mouseenter", handleMouseEnter);
        textArea.addEventListener("mouseleave", handleMouseLeave);
        return () => {
            textArea.removeEventListener("focus", handleFocus);
            textArea.removeEventListener("blur", handleBlur);
            textArea.removeEventListener("mouseenter", handleMouseEnter);
            textArea.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);
    _$1(() => {
        if (!comment)
            return;
        const toUsers = [];
        comment?.toUsers?.forEach((userId) => {
            const user = userState.userMap[userId];
            toUsers.push({
                display: `${user.display || getUserName(user)}`,
                id: userId,
            });
        });
        setState({
            message: getMessageWithDisplayName(comment, userState, "text") ?? "",
            toUsers,
            images: comment?.images ?? [],
            createdBy: comment?.createdBy ?? "",
            author: comment?.author ?? "",
        });
    }, [comment, userState]);
    const findMentionSearchPosition = x$1((text, cursorPos) => {
        const textBeforeCursor = text.slice(0, cursorPos);
        const atSymbolIndex = textBeforeCursor.lastIndexOf("@");
        if (atSymbolIndex === -1)
            return null;
        const textBetweenAtAndCursor = textBeforeCursor.slice(atSymbolIndex + 1);
        if (textBetweenAtAndCursor.includes(" "))
            return null;
        return {
            start: atSymbolIndex,
            searchTerm: textBetweenAtAndCursor,
        };
    }, []);
    const calculatePosition = x$1((textarea, cursorPosition) => {
        const text = textarea?.value;
        const textBeforeCursor = text?.slice(0, cursorPosition);
        const lines = textBeforeCursor?.split("\n");
        const currentLineNumber = (lines?.length || 0) - 1;
        const currentLine = lines?.[currentLineNumber];
        const style = window.getComputedStyle(textarea);
        const lineHeight = parseInt(style.lineHeight);
        const paddingLeft = parseInt(style.paddingLeft);
        const paddingTop = parseInt(style.paddingTop);
        const span = document.createElement("span");
        span.style.font = style.font;
        span.style.visibility = "hidden";
        span.style.position = "absolute";
        span.style.whiteSpace = "pre";
        span.textContent = currentLine ? currentLine : "";
        document.body.appendChild(span);
        const left = Math.min(span.offsetWidth + paddingLeft, textarea.offsetWidth - 200);
        document.body.removeChild(span);
        const scrollTop = textarea.scrollTop;
        const currentLineY = currentLineNumber * lineHeight + paddingTop - scrollTop;
        const nextLineY = currentLineY + lineHeight;
        const viewportHeight = window.innerHeight;
        const suggestionsHeight = 160;
        const textareaRect = textarea.getBoundingClientRect();
        const absoluteTop = textareaRect.top + nextLineY;
        const spaceBelow = viewportHeight - absoluteTop;
        const showAbove = spaceBelow < suggestionsHeight;
        const top = showAbove ? currentLineY : nextLineY;
        return {
            top,
            left,
            showAbove,
            absoluteTop,
            scrollTop,
            currentLineNumber,
        };
    }, []);
    const insertMention = x$1((user) => {
        const mention = findMentionSearchPosition(state.message, inputRef.current?.selectionStart || 0);
        if (!mention)
            return;
        const beforeMention = state.message.slice(0, mention.start);
        const afterMention = state.message.slice(inputRef.current?.selectionStart || 0);
        const newValue = `${beforeMention}@${user.display} ${afterMention}`;
        const updatedMentions = filterOutInvalidMentions(newValue, [
            ...(state.toUsers || []),
            { display: user.display, id: user.uid || "" },
        ]);
        setState((prevState) => ({
            ...prevState,
            message: newValue,
            toUsers: updatedMentions.toUsers,
        }));
        setShowSuggestions(false);
        const ele = inputRef.current;
        if (ele) {
            ele.focus();
        }
    }, [state.message, state.toUsers, findMentionSearchPosition]);
    const handleInputChange = x$1((event) => {
        const target = event.target;
        if (!target)
            return;
        const newPlainTextValue = target.value;
        const trimmedValue = newPlainTextValue.trim();
        const newPosition = target.selectionStart;
        const mention = findMentionSearchPosition(newPlainTextValue, newPosition);
        if (mention) {
            setSearchTerm(mention.searchTerm);
            setShowSuggestions(true);
            setCursorPosition(calculatePosition(inputRef.current, newPosition));
            setSelectedIndex(0);
        }
        else {
            setShowSuggestions(false);
        }
        const errorMessage = validateCommentAndMentions(newPlainTextValue, state.toUsers ?? []);
        setError({
            hasError: errorMessage !== "" || trimmedValue === "",
            message: errorMessage,
        });
        setState((prevState) => ({
            ...prevState,
            message: newPlainTextValue,
        }));
    }, [state.toUsers, findMentionSearchPosition, calculatePosition, setError]);
    const handleKeyDown = x$1((e) => {
        if (e.key === "@") {
            const position = calculatePosition(inputRef.current, e.target.selectionStart);
            setCursorPosition(position);
            setSelectedIndex(0);
        }
        if (!showSuggestions)
            return;
        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setSelectedIndex((prev) => prev < filteredUsers.length - 1 ? prev + 1 : prev);
                break;
            case "ArrowUp":
                e.preventDefault();
                setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
                break;
            case "Enter":
                e.preventDefault();
                if (showSuggestions) {
                    insertMention(filteredUsers[selectedIndex]);
                }
                break;
            case "Escape":
                setShowSuggestions(false);
                inputRef.current?.focus();
                break;
        }
    }, [
        showSuggestions,
        filteredUsers,
        selectedIndex,
        insertMention,
        calculatePosition,
    ]);
    _$1(() => {
        itemRefs.current[selectedIndex]?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "nearest",
        });
    }, [selectedIndex]);
    const handleSubmit = x$1(async () => {
        if (error.hasError)
            return;
        try {
            let threadUID = activeThread?._id;
            if (activeThread?._id == "new") {
                let currentThread = await createNewThread();
                threadUID = currentThread?.thread?._id;
                setActiveThread(currentThread?.thread);
            }
            const commentState = {
                ...state,
                createdBy: userState.currentUser.uid,
                author: userState.currentUser.email,
            };
            const commentPayload = {
                ...getCommentBody(commentState),
            };
            const commentData = {
                threadUid: threadUID,
                commentPayload,
            };
            if (editComment) {
                let commentResponse = await onEditComment({
                    threadUid: threadUID,
                    commentUid: editComment,
                    payload: commentPayload,
                });
                setThreadState((prevState) => {
                    const updatedComments = cloneDeep(prevState.comments);
                    const commentIndex = findIndex(updatedComments, (c) => c._id === comment?._id);
                    updatedComments.splice(commentIndex, 1, commentResponse?.comment);
                    return {
                        ...prevState,
                        editComment: "",
                        comments: updatedComments,
                    };
                });
                onClose(false);
            }
            else {
                let commentResponse = await onCreateComment(commentData);
                setThreadState((prevState) => ({
                    ...prevState,
                    comments: [commentResponse.comment, ...prevState.comments],
                    commentCount: prevState.commentCount + 1,
                }));
                setState(initialState);
                onClose(false);
            }
        }
        catch (error) {
            console.error("Error submitting comment:", error);
        }
    }, [error.hasError, state, activeThread]);
    _$1(() => {
        if (state.message.length === 0) {
            setError({ hasError: true, message: "" });
        }
    }, [state.message, setError]);
    return {
        state,
        setState,
        error,
        showSuggestions,
        cursorPosition,
        selectedIndex,
        filteredUsers,
        inputRef,
        listRef,
        itemRefs,
        handleInputChange,
        handleKeyDown,
        handleSubmit,
        insertMention,
        maxMessageLength,
    };
};

const ErrorIndicator = ({ errorMessage, }) => (u("div", { className: classNames("collab-thread-input-indicator--error", collabStyles()["collab-thread-input-indicator--error"]), children: errorMessage }));
const CharacterCounter = ({ currentLength, maxLength }) => (u("div", { className: classNames("collab-thread-input-indicator--count", collabStyles()["collab-thread-input-indicator--count"]), children: [currentLength, "/", maxLength] }));
const MentionSuggestionsList = ({ filteredUsers, selectedIndex, cursorPosition, inputRef, listRef, itemRefs, insertMention, handleKeyDown, }) => {
    if (filteredUsers.length === 0)
        return null;
    return (u("ul", { className: classNames("collab-thread-body--input--textarea--suggestionsList", collabStyles()["collab-thread-body--input--textarea--suggestionsList"]), style: {
            ...(cursorPosition.showAbove
                ? {
                    bottom: `${window.innerHeight - (inputRef.current?.getBoundingClientRect().top || 0) - cursorPosition.top}px`,
                    top: "auto",
                }
                : {
                    top: `${(inputRef.current?.getBoundingClientRect().top || 0) + cursorPosition.top}px`,
                }),
        }, ref: listRef, children: filteredUsers.map((user, index) => (u("li", { onClick: () => insertMention(user), className: classNames("collab-thread-body--input--textarea--suggestionsList--item", collabStyles()["collab-thread-body--input--textarea--suggestionsList--item"], index === selectedIndex
                ? collabStyles()["collab-thread-body--input--textarea--suggestionsList--item-selected"]
                : ""), ref: (el) => (itemRefs.current[index] = el), onKeyDown: (e) => e.key === "Enter"
                ? insertMention(user)
                : handleKeyDown(e), tabIndex: -1, "aria-selected": index === selectedIndex, children: user.display === user.email ? (user.display.length > 20 ? (u(Tooltip$1, { content: user.display || "", children: (user.display || "").substring(0, 18) + "..." })) : (user.display)) : (u(Tooltip$1, { content: user.display + " - " + user.email || "", children: user.display.length > 20
                    ? (user.display || "").substring(0, 18) + "..."
                    : user.display })) }, user.uid))) }));
};
const CommentTextArea = wn.memo(({ userState, handleOnSaveRef, comment, onClose }) => {
    const { state, error, showSuggestions, cursorPosition, selectedIndex, filteredUsers, inputRef, listRef, itemRefs, handleInputChange, handleKeyDown, handleSubmit, insertMention, maxMessageLength, } = useCommentTextArea(userState, comment, onClose);
    const onChangeHandler = (event) => handleInputChange(event);
    const onKeyDownHandler = (event) => handleKeyDown(event);
    _$1(() => {
        handleOnSaveRef.current = handleSubmit;
    }, [handleSubmit, handleOnSaveRef]);
    return (u("div", { className: classNames("collab-thread-body--input--wrapper", collabStyles()["collab-thread-body--input--wrapper"]), children: [u("div", { className: classNames("collab-thread-body--input", collabStyles()["collab-thread-body--input"]), children: u("div", { className: classNames("collab-thread-body--input--textarea--wrapper", collabStyles()["collab-thread-body--input--textarea--wrapper"]), children: [u("textarea", { name: "collab-thread-body--input--textarea", id: "collab-thread-body--input--textarea", rows: 1, className: classNames("collab-thread-body--input--textarea", collabStyles()["collab-thread-body--input--textarea"]), value: state.message, onChange: onChangeHandler, onKeyDown: onKeyDownHandler, maxLength: maxMessageLength, placeholder: "Enter a comment or tag others using \u201C@\u201D", ref: inputRef }), showSuggestions && (u(MentionSuggestionsList, { filteredUsers: filteredUsers, selectedIndex: selectedIndex, cursorPosition: cursorPosition, inputRef: inputRef, listRef: listRef, itemRefs: itemRefs, insertMention: insertMention, handleKeyDown: handleKeyDown }))] }) }), u("div", { className: classNames("collab-thread-input-indicator--wrapper", "flex-v-center", collabStyles()["collab-thread-input-indicator--wrapper"], flexAlignCenter), children: [u(ErrorIndicator, { errorMessage: error.message }), u(CharacterCounter, { currentLength: state.message.length, maxLength: maxMessageLength })] })] }));
});

const CommentActionBar = ({ mode, commentUser, currentUser, commentUID, }) => {
    const { setThreadState, onDeleteComment, activeThread, onDeleteThread } = P$1(ThreadProvider);
    const [isDeleting, setIsDeleting] = p$3(false);
    const setEditComment = (uid) => {
        setThreadState((prevState) => ({
            ...prevState,
            editComment: uid || "",
        }));
    };
    const handleCancel = () => {
        setEditComment(null);
    };
    const handleCommentEdit = () => {
        if (commentUID) {
            setEditComment(commentUID);
        }
    };
    const handleCommentDelete = async () => {
        if (!commentUID || isDeleting) {
            return;
        }
        setIsDeleting(true);
        try {
            const deleteResponse = await onDeleteComment({
                threadUid: activeThread?._id,
                commentUid: commentUID,
            });
            setThreadState((prevState) => {
                const updatedComments = prevState.comments.filter((comment) => comment._id !== commentUID);
                if (prevState.commentCount - 1 === 0) {
                    onDeleteThread({ threadUid: activeThread?._id });
                }
                return {
                    ...prevState,
                    comments: updatedComments,
                    commentCount: prevState.commentCount - 1,
                };
            });
        }
        catch (error) {
        }
        finally {
            setIsDeleting(false);
        }
    };
    if (mode === "edit" && commentUID) {
        return (u("div", { className: classNames("collab-thread-comment-action--wrapper", collabStyles()["collab-thread-comment-action--wrapper"]), children: u(Icon, { icon: "Cancel", withTooltip: true, tooltipContent: "Cancel", onClick: handleCancel }) }));
    }
    if (commentUser?.uid !== currentUser?.uid || !commentUID) {
        return null;
    }
    return (u("div", { className: classNames("collab-thread-comment-action--wrapper", collabStyles()["collab-thread-comment-action--wrapper"]), "data-testid": "collab-thread-comment-action--wrapper", children: [u(Icon, { icon: "Edit", tooltipContent: "Edit", withTooltip: true, testId: "collab-thread-comment-edit", onClick: handleCommentEdit }), u(Icon, { icon: "Delete", tooltipContent: "Delete", withTooltip: true, testId: "collab-thread-comment-delete", onClick: handleCommentDelete, disabled: isDeleting })] }));
};

const CommentResolvedText = ({ comment, userState }) => {
    const sanitizedText = q$1(() => {
        return getMessageWithDisplayName(comment, userState, "html") ?? "";
    }, [comment.message, userState.userMap, comment.toUsers]);
    return (u("div", { "data-testid": "collab-thread-comment--message", className: classNames("collab-thread-comment--message", collabStyles()["collab-thread-comment--message"]), dangerouslySetInnerHTML: { __html: sanitizedText } }));
};

function getInitials(name) {
    if (!name)
        return "";
    const nameParts = name.trim().split(" ");
    if (nameParts.length === 1) {
        return name.substring(0, 2);
    }
    return nameParts[0][0] + nameParts[nameParts.length - 1][0];
}
function DisplayAvatarContent({ type, avatar, initials, }) {
    if (type === "image" && avatar.image) {
        return (u("img", { "data-testid": "collab-avatar-image", src: avatar.image, alt: avatar.name, className: classNames("collab-avatar__image", collabStyles()["collab-avatar__image"]) }));
    }
    return u("span", { className: `collab-avatar-link__initials`, children: initials });
}
function Avatar({ avatar, type = "text", testId = "collab-avatar", }) {
    const initials = getInitials(avatar.name);
    return (u("div", { "data-testid": testId, children: u(Tooltip$1, { content: avatar.name || avatar.email || "", position: "bottom", children: u("div", { className: classNames("collab-avatar", "collab-avatar--single", "flex-v-center", collabStyles()["collab-avatar"], collabStyles()["collab-avatar--single"], flexAlignCenter), children: u("span", { className: classNames("collab-avatar__link", "flex-v-center", collabStyles()["collab-avatar__link"], flexAlignCenter), children: u(DisplayAvatarContent, { type: type, avatar: avatar, initials: initials }) }) }) }) }));
}

const formatCommentDate = (comment) => {
    return comment ? formatDate(comment.updatedAt || comment.createdAt) : "";
};
const CommentCard = ({ userState, comment, onClose, handleOnSaveRef, mode, }) => {
    const [commentUser, setCommentUser] = p$3(null);
    const [isHovered, setIsHovered] = p$3(false);
    _$1(() => {
        setCommentUser(comment
            ? userState.userMap[comment.createdBy]
            : userState.currentUser);
    }, [comment, userState]);
    const formattedDate = q$1(() => formatCommentDate(comment), [comment]);
    if (!commentUser) {
        return u(ThreadBodyLoader, {}, "collab-thread-body--comment-loader");
    }
    return (u("div", { className: classNames("collab-thread-comment--wrapper", collabStyles()["collab-thread-comment--wrapper"]), onMouseEnter: () => setIsHovered(true), onMouseLeave: () => setIsHovered(false), children: [u("div", { className: classNames("collab-thread-comment--user-details", "flex-v-center", collabStyles()["collab-thread-comment--user-details"], flexAlignCenter), children: [u(Avatar, { avatar: {
                            name: getUserName(commentUser),
                            id: commentUser.uid,
                        } }), u("div", { className: classNames("collab-thread-comment--user-details__text", collabStyles()["collab-thread-comment--user-details__text"]), children: [u("div", { className: classNames("collab-thread-comment--user-name", collabStyles()["collab-thread-comment--user-name"]), children: getUserName(commentUser) }), comment && (u("div", { className: classNames("collab-thread-comment--time-details", collabStyles()["collab-thread-comment--time-details"]), children: formattedDate }))] }), isHovered && (u(CommentActionBar, { mode: mode, commentUser: commentUser, currentUser: userState.currentUser, commentUID: comment?._id }))] }), mode === "edit" ? (u(CommentTextArea, { onClose: onClose, userState: userState, handleOnSaveRef: handleOnSaveRef, comment: comment })) : (comment && (u(CommentResolvedText, { comment: comment, userState: userState })))] }));
};

const Loader = ({ isLoading, children }) => {
    return isLoading ? (u(ThreadBodyLoader, {}, "collab-thread-body--comment-loader")) : (u(g$4, { children: children }));
};
const CommentList = ({ comments, userState, onClose, handleOnSaveRef, editComment, fetchingMore, }) => {
    return (u("div", { className: classNames("collab-thread-comment--list", collabStyles()["collab-thread-comment--list"]), id: "collab-thread-comment--list", children: [comments?.map((comment) => (u(g$4, { children: [u("div", { className: classNames("collab-thread-comment-seperator", "flex-v-center", collabStyles()["collab-thread-comment-seperator"], flexAlignCenter), children: u("svg", { class: "collab-thread-comment-seperator--svg", xmlns: "http://www.w3.org/2000/svg", width: "100%", height: "2", viewBox: "0 0 332 2", fill: "none", preserveAspectRatio: "none", children: u("path", { d: "M0 1H332", stroke: "#DDE3EE", strokeDasharray: "2 2" }) }) }), u(CommentCard, { userState: userState, comment: comment, onClose: onClose, handleOnSaveRef: handleOnSaveRef, mode: editComment === comment._id ? "edit" : "view" })] }))), fetchingMore && u(ThreadBodyLoader, {})] }));
};
const ThreadBody = wn.memo(({ handleOnSaveRef, onClose, userState, isLoading, comments, fetchingMore, editComment, }) => {
    return (u("div", { className: classNames("collab-thread-body--wrapper", collabStyles()["collab-thread-body--wrapper"]), children: [u(Loader, { isLoading: isLoading, children: u(CommentList, { comments: comments, userState: userState, onClose: onClose, handleOnSaveRef: handleOnSaveRef, editComment: editComment, fetchingMore: fetchingMore }) }), editComment === "" && (u(CommentCard, { userState: userState, comment: null, onClose: onClose, handleOnSaveRef: handleOnSaveRef, mode: "edit" }))] }));
});

const scrollOffset = 3;
const useInfiniteScroll = ({ containerId, isFetching, canFetchMore, loadMore, offset, limit, }) => {
    const [fetchingState, setFetchingState] = p$3(isFetching);
    _$1(() => {
        const commentListContainer = document.getElementById(containerId);
        if (!commentListContainer)
            return;
        const scrollEvent = async () => {
            if (commentListContainer.scrollHeight +
                commentListContainer.scrollTop -
                commentListContainer.clientHeight <
                scrollOffset && // Adjust this offset if needed
                !fetchingState &&
                canFetchMore) {
                setFetchingState(true);
                try {
                    await loadMore(offset, limit);
                }
                finally {
                    setFetchingState(false);
                }
            }
        };
        commentListContainer.addEventListener("scroll", scrollEvent, true);
        return () => {
            commentListContainer.removeEventListener("scroll", scrollEvent, true);
        };
    }, [containerId, fetchingState, canFetchMore, loadMore, offset, limit]);
    return fetchingState;
};

const initialErrorState = {
    hasError: false,
    message: "",
};
const ThreadPopup = wn.memo(({ onCreateComment, onEditComment, onDeleteComment, onDeleteThread, onClose, onResolve, inviteMetadata, loadMoreMessages, activeThread, setActiveThread, createNewThread, }) => {
    const handleOnSaveRef = F$1(null);
    const [state, setState] = p$3({
        isLoading: false,
        commentCount: 0,
        comments: [],
        editComment: "",
        userState: {
            mentionsList: [],
            currentUser: inviteMetadata?.currentUser,
            userMap: {},
        },
    });
    const [error, setError] = p$3(initialErrorState);
    const isFetchingMore = useInfiniteScroll({
        containerId: "collab-thread-comment--list",
        isFetching: false,
        canFetchMore: state.commentCount > state.comments.length,
        loadMore: async (offset, limit) => {
            try {
                let payload = {
                    offset: offset,
                    limit: limit,
                    threadUid: activeThread?._id,
                };
                const res = await loadMoreMessages(payload);
                setState((prevState) => ({
                    ...prevState,
                    commentCount: res.count,
                    comments: [...prevState.comments, ...res.comments],
                }));
            }
            catch (error) {
                console.error(error);
            }
        },
        offset: state.comments.length,
        limit: 10,
    });
    _$1(() => {
        const userList = [];
        const userMap = {};
        inviteMetadata?.users?.forEach((user) => {
            if (user) {
                const userName = getUserName(user);
                userList.push({
                    display: userName,
                    email: user.email,
                    uid: user.uid,
                });
                userMap[user.uid] = { ...user, display: userName };
            }
        });
        setState((prevState) => ({
            ...prevState,
            userState: {
                mentionsList: userList,
                userMap,
                currentUser: inviteMetadata?.currentUser,
            },
        }));
    }, [inviteMetadata]);
    _$1(() => {
        if (!activeThread) {
            setState((prevState) => ({ ...prevState, isLoading: true }));
            return;
        }
        if (activeThread?._id == "new") {
            return;
        }
        const fetchInitialMessages = async () => {
            setState((prevState) => ({ ...prevState, isLoading: true }));
            try {
                let payload = {
                    offset: 0,
                    limit: 10,
                    threadUid: activeThread?._id,
                };
                const res = await loadMoreMessages(payload);
                setState((prevState) => ({
                    ...prevState,
                    isLoading: false,
                    commentCount: res.count,
                    comments: res.comments,
                }));
            }
            catch (error) {
                setState((prevState) => ({
                    ...prevState,
                    isLoading: false,
                }));
                console.error(error);
            }
        };
        fetchInitialMessages();
    }, []);
    const contextValue = q$1(() => ({
        inviteMetadata,
        userState: state.userState,
        commentCount: state.commentCount,
        setThreadState: setState,
        error,
        setError,
        onCreateComment,
        onEditComment,
        onDeleteComment,
        onDeleteThread,
        onClose,
        editComment: state.editComment,
        activeThread,
        setActiveThread,
        createNewThread,
    }), [
        inviteMetadata,
        state.userState,
        state.commentCount,
        error,
        state.editComment,
        activeThread,
    ]);
    return (u(ThreadProvider.Provider, { value: contextValue, children: u("div", { className: classNames("collab-thread--wrapper", collabStyles()["collab-thread--wrapper"]), children: [u(ThreadHeader, { onClose: onClose, onResolve: onResolve, displayResolve: !!activeThread && activeThread?._id !== "new", commentCount: state.commentCount, activeThread: activeThread }), u("div", { class: classNames("collab-thread--container", collabStyles()["collab-thread--container"]), children: [u(ThreadBody, { handleOnSaveRef: handleOnSaveRef, onClose: onClose, userState: state.userState, isLoading: state.isLoading, comments: state.comments, fetchingMore: isFetchingMore, editComment: state.editComment }), u(ThreadFooter, { onClose: onClose, handleOnSaveRef: handleOnSaveRef, isDisabled: error.hasError, editComment: state.editComment })] })] }) }));
});

const useCollabIndicator = ({ newThread, thread, }) => {
    const buttonRef = F$1(null);
    const popupRef = F$1(null);
    const config = Config.get();
    const [showPopup, setShowPopup] = p$3(newThread || false);
    const [activeThread, setActiveThread] = p$3(() => {
        if (newThread)
            return { _id: "new" };
        return thread || { _id: "new" };
    });
    const updatePopupPosition = () => {
        if (buttonRef.current && popupRef.current) {
            calculatePopupPosition(buttonRef.current, popupRef.current);
        }
    };
    _$1(() => {
        if (!showPopup)
            return;
        updatePopupPosition();
    }, [showPopup]);
    _$1(() => {
        const handleTogglePopup = (event) => {
            const { threadUid, action } = event.detail;
            const thread = document.querySelector(`div[threaduid='${threadUid}']`);
            handleEmptyThreads();
            const closestDiv = buttonRef.current?.closest("div[field-path]");
            if (closestDiv) {
                closestDiv.style.zIndex = "999";
            }
            setShowPopup(false);
            if (action === "open" &&
                thread &&
                thread.contains(buttonRef.current)) {
                setShowPopup(true);
                const closestDiv = buttonRef.current?.closest("div[field-path]");
                thread.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });
                if (closestDiv) {
                    closestDiv.style.zIndex = "1000";
                }
                if (config?.collab?.isFeedbackMode === true) {
                    Config.set("collab.isFeedbackMode", false);
                }
            }
        };
        document.addEventListener("toggleCollabPopup", handleTogglePopup);
        return () => {
            document.removeEventListener("toggleCollabPopup", handleTogglePopup);
        };
    }, []);
    const togglePopup = () => {
        if (!showPopup) {
            toggleCollabPopup({ threadUid: "", action: "close" });
            setShowPopup(true);
            const closestDiv = buttonRef.current?.closest("div[field-path]");
            if (closestDiv) {
                closestDiv.style.zIndex = "1000";
            }
        }
        else {
            setShowPopup(false);
            const closestDiv = buttonRef.current?.closest("div[field-path]");
            if (!closestDiv?.hasAttribute("threaduid"))
                closestDiv?.remove();
            if (config?.collab?.isFeedbackMode === false) {
                Config.set("collab.isFeedbackMode", true);
            }
        }
    };
    return {
        buttonRef,
        popupRef,
        showPopup,
        setShowPopup,
        activeThread,
        setActiveThread,
        togglePopup,
    };
};

const useCollabOperations = () => {
    const createComment = async (payload) => {
        const data = (await visualBuilderPostMessage$1?.send(VisualBuilderPostMessageEvents.COLLAB_CREATE_COMMENT, payload));
        if (!data)
            throw new Error("Failed to create comment");
        return data;
    };
    const editComment = async (payload) => {
        const data = (await visualBuilderPostMessage$1?.send(VisualBuilderPostMessageEvents.COLLAB_EDIT_COMMENT, payload));
        if (!data)
            throw new Error("Failed to update comment");
        return data;
    };
    const deleteComment = async (payload) => {
        const data = (await visualBuilderPostMessage$1?.send(VisualBuilderPostMessageEvents.COLLAB_DELETE_COMMENT, payload));
        if (!data)
            throw new Error("Failed to delete comment");
        return data;
    };
    const resolveThread = async (payload) => {
        const data = (await visualBuilderPostMessage$1?.send(VisualBuilderPostMessageEvents.COLLAB_RESOLVE_THREAD, payload));
        if (!data)
            throw new Error("Failed to resolve thread");
        return data;
    };
    const fetchComments = async (payload) => {
        return (await visualBuilderPostMessage$1?.send(VisualBuilderPostMessageEvents.COLLAB_FETCH_COMMENTS, payload));
    };
    const createNewThread = async (buttonRef, inviteMetadata) => {
        if (!buttonRef.current) {
            throw new Error("Button ref not found");
        }
        const parentDiv = buttonRef.current.closest("div[field-path]");
        if (!parentDiv) {
            throw new Error("Count not find parent div");
        }
        const fieldPath = parentDiv.getAttribute("field-path");
        const relative = parentDiv.getAttribute("relative");
        if (!fieldPath || !relative)
            throw new Error("Invalid field attributes");
        const match = relative?.match(/x: ([\d.]+), y: ([\d.]+)/);
        if (!match) {
            throw new Error("Invalid relative attribute");
        }
        const relativeX = parseFloat(match[1]);
        const relativeY = parseFloat(match[2]);
        const payload = {
            elementXPath: fieldPath,
            position: { x: relativeX, y: relativeY },
            author: inviteMetadata.currentUser.email,
            pageRoute: normalizePath(window.location.pathname),
            inviteUid: inviteMetadata.inviteUid,
            createdBy: inviteMetadata.currentUser.uid,
        };
        const data = (await visualBuilderPostMessage$1?.send(VisualBuilderPostMessageEvents.COLLAB_CREATE_THREAD, payload));
        parentDiv.setAttribute("threaduid", data.thread._id);
        return data;
    };
    const deleteThread = async (payload) => {
        const data = (await visualBuilderPostMessage$1?.send(VisualBuilderPostMessageEvents.COLLAB_DELETE_THREAD, payload));
        if (!data)
            throw new Error("Failed to delete thread");
        removeCollabIcon(payload.threadUid);
        const config = Config.get();
        if (config?.collab?.isFeedbackMode === false) {
            Config.set("collab.isFeedbackMode", true);
        }
        return data;
    };
    return {
        createComment,
        editComment,
        deleteComment,
        resolveThread,
        fetchComments,
        createNewThread,
        deleteThread,
    };
};

const CollabIndicator = (props) => {
    const config = Config.get();
    const [inviteMetadata, setInviteMetadata] = p$3(config?.collab?.inviteMetadata);
    _$1(() => {
        setInviteMetadata(config?.collab?.inviteMetadata);
    }, [config?.collab?.inviteMetadata]);
    const { buttonRef, popupRef, showPopup, setShowPopup, activeThread, setActiveThread, togglePopup, } = useCollabIndicator({
        newThread: props.newThread ?? false,
        thread: props.activeThread || { _id: "new" },
    });
    const { createComment, editComment, deleteComment, resolveThread, fetchComments, createNewThread, deleteThread, } = useCollabOperations();
    const handleClose = (isResolved = false) => {
        if (isResolved) {
            buttonRef.current?.closest("div[field-path]")?.remove();
        }
        handleEmptyThreads();
        setShowPopup(false);
        if (config?.collab?.isFeedbackMode === false) {
            Config.set("collab.isFeedbackMode", true);
        }
    };
    const IconComponent = iconComponents["Indicator"];
    return (u(g$4, { children: [u("button", { ref: buttonRef, "data-testid": "collab-indicator", className: classNames("collab-indicator", collabStyles()["collab-indicator"]), onClick: togglePopup, children: u(IconComponent, { active: !showPopup }) }), showPopup && (u("div", { ref: popupRef, className: classNames("collab-popup", collabStyles()["collab-popup"]), "data-testid": "collab-popup", children: u(ThreadPopup, { onCreateComment: createComment, onEditComment: editComment, onDeleteComment: deleteComment, onClose: handleClose, onResolve: resolveThread, inviteMetadata: inviteMetadata, loadMoreMessages: fetchComments, activeThread: activeThread, setActiveThread: setActiveThread, onDeleteThread: deleteThread, createNewThread: () => createNewThread(buttonRef, inviteMetadata) }) }))] }));
};

const popupTopOffset = 43;
const popupLeftOffset = 9;
const hiddenClass$1 = u$1 `
    display: none;
`;
function createPopupContainer(resolvedXPath, relativeX, relativeY, top, left, updateConfig, hidden, payload) {
    const popupContainer = document.createElement("div");
    popupContainer.setAttribute("field-path", resolvedXPath);
    popupContainer.setAttribute("relative", `x: ${relativeX}, y: ${relativeY}`);
    popupContainer.style.position = "absolute";
    popupContainer.style.top = `${top - popupTopOffset}px`;
    popupContainer.style.left = `${left - popupLeftOffset}px`;
    popupContainer.style.zIndex = updateConfig ? "1000" : "999";
    popupContainer.style.cursor = "pointer";
    popupContainer.className = "collab-thread";
    if (hidden)
        popupContainer.classList.add(hiddenClass$1);
    if (payload?._id)
        popupContainer.setAttribute("threaduid", payload._id);
    return popupContainer;
}
function appendPopupContainer(popupContainer) {
    const visualBuilderContainer = document.querySelector(".visual-builder__container");
    if (visualBuilderContainer) {
        let highlightCommentWrapper = visualBuilderContainer.querySelector(".visual-builder__collab-wrapper");
        if (!highlightCommentWrapper) {
            highlightCommentWrapper = document.createElement("div");
            highlightCommentWrapper.className =
                "visual-builder__collab-wrapper";
            visualBuilderContainer.appendChild(highlightCommentWrapper);
        }
        highlightCommentWrapper.appendChild(popupContainer);
    }
    else {
        document.body.appendChild(popupContainer);
    }
}
function generateThread(payload, options = {}) {
    const { isNewThread = false, updateConfig = false, hidden = false, } = options;
    const config = Config.get?.();
    let relativeX, relativeY, resolvedXPath;
    if (isNewThread) {
        ({ relativeX, relativeY, xpath: resolvedXPath } = payload);
    }
    else {
        const { position, elementXPath } = payload;
        ({ x: relativeX, y: relativeY } = position);
        resolvedXPath = elementXPath;
    }
    // Filter to remove already rendered threads
    if (payload?._id) {
        const existingThread = document.querySelector(`div[threaduid='${payload._id}']`);
        if (existingThread) {
            return undefined;
        }
    }
    const element = getElementByXpath(resolvedXPath);
    if (!element) {
        return payload._id;
    }
    const rect = element.getBoundingClientRect();
    let top = rect.top + window.scrollY + relativeY * rect.height;
    let left = rect.left + window.scrollX + relativeX * rect.width;
    const adjustedPosition = adjustPositionToViewport({ top, left });
    top = adjustedPosition.top;
    left = adjustedPosition.left;
    const popupContainer = createPopupContainer(resolvedXPath, relativeX, relativeY, top, left, updateConfig, hidden, payload);
    if (updateConfig && config?.collab?.enable) {
        if (config?.collab.isFeedbackMode) {
            Config.set("collab.isFeedbackMode", false);
        }
    }
    B$2(u(CollabIndicator, { activeThread: !isNewThread ? payload : undefined, newThread: isNewThread }), popupContainer);
    appendPopupContainer(popupContainer);
    return undefined;
}
function updateCollabIconPosition() {
    const icons = document.querySelectorAll(".visual-builder__collab-wrapper .collab-thread");
    const config = Config.get?.();
    if (config?.collab?.pauseFeedback)
        return;
    icons.forEach((icon) => {
        if (!(icon instanceof HTMLElement))
            return;
        const path = icon.getAttribute("field-path");
        const relative = icon.getAttribute("relative");
        if (!path || !relative) {
            console.error("Missing field-path or relative attribute.");
            return;
        }
        const match = relative.match(/x: ([\d.]+), y: ([\d.]+)/);
        if (!match) {
            console.error("Invalid relative attribute format.");
            return;
        }
        const relativeX = parseFloat(match[1]);
        const relativeY = parseFloat(match[2]);
        const targetElement = getElementByXpath(path);
        if (!targetElement) {
            icon.classList.add(hiddenClass$1);
            return;
        }
        const rect = targetElement.getBoundingClientRect();
        let left = rect.left + rect.width * relativeX + window.scrollX;
        let top = rect.top + rect.height * relativeY + window.scrollY;
        const adjustedPosition = adjustPositionToViewport({ top, left });
        top = adjustedPosition.top;
        left = adjustedPosition.left;
        icon.style.top = `${top - popupTopOffset}px`;
        icon.style.left = `${left - popupLeftOffset}px`;
        icon.classList.remove(hiddenClass$1);
    });
}
function updatePopupPositions() {
    const popups = document.querySelectorAll(".visual-builder__collab-wrapper .collab-thread .collab-popup");
    const config = Config.get?.();
    if (config?.collab?.pauseFeedback)
        return;
    popups.forEach((popup) => {
        if (popup && popup instanceof HTMLElement) {
            const parent = popup.closest(".visual-builder__collab-wrapper .collab-thread");
            if (!parent) {
                console.error("Parent element with class 'collab-thread' not found.");
                return;
            }
            const button = parent.querySelector(".visual-builder__collab-wrapper .collab-thread .collab-indicator");
            if (!button || !(button instanceof HTMLElement)) {
                console.error("Button with class 'collab-indicator' not found.");
                return;
            }
            calculatePopupPosition(button, popup);
        }
    });
}
function updateSuggestionListPosition() {
    const suggestionLists = document.querySelectorAll(".collab-thread-body--input--textarea--suggestionsList");
    if (!suggestionLists.length)
        return;
    suggestionLists.forEach((list) => {
        if (!(list instanceof HTMLElement))
            return;
        const textarea = document.querySelector(".collab-thread-body--input--textarea");
        if (!textarea)
            return;
        const positionData = list.getAttribute("data-position");
        const parsedData = positionData ? JSON.parse(positionData) : null;
        const showAbove = window.getComputedStyle(list).bottom !== "auto";
        const textareaRect = textarea.getBoundingClientRect();
        if (showAbove) {
            const lineHeight = parseInt(window.getComputedStyle(textarea).lineHeight) || 20;
            const paddingTop = parseInt(window.getComputedStyle(textarea).paddingTop) || 8;
            const cursorLineY = parsedData?.cursorLineY || paddingTop + lineHeight;
            list.style.position = "fixed";
            list.style.bottom = `${window.innerHeight - textareaRect.top - cursorLineY + lineHeight}px`;
            list.style.top = "auto";
        }
        else {
            const lineHeight = parseInt(window.getComputedStyle(textarea).lineHeight) || 20;
            const paddingTop = parseInt(window.getComputedStyle(textarea).paddingTop) || 8;
            const cursorLineY = parsedData?.cursorLineY || paddingTop + lineHeight;
            list.style.position = "fixed";
            list.style.top = `${textareaRect.top + cursorLineY}px`;
            list.style.bottom = "auto";
        }
        if (!positionData && textareaRect) {
            const lineHeight = parseInt(window.getComputedStyle(textarea).lineHeight) || 20;
            const paddingTop = parseInt(window.getComputedStyle(textarea).paddingTop) || 8;
            const positionInfo = {
                showAbove: showAbove,
                cursorLineY: paddingTop + lineHeight,
            };
            list.setAttribute("data-position", JSON.stringify(positionInfo));
        }
        const listRect = list.getBoundingClientRect();
        if (!showAbove && listRect.bottom > window.innerHeight) {
            const lineHeight = parseInt(window.getComputedStyle(textarea).lineHeight) || 20;
            const paddingTop = parseInt(window.getComputedStyle(textarea).paddingTop) || 8;
            const cursorLineY = parsedData?.cursorLineY || paddingTop + lineHeight;
            list.style.bottom = `${window.innerHeight - textareaRect.top - cursorLineY + lineHeight}px`;
            list.style.top = "auto";
            if (positionData) {
                const updatedData = JSON.parse(positionData);
                updatedData.showAbove = true;
                list.setAttribute("data-position", JSON.stringify(updatedData));
            }
        }
        else if (showAbove && listRect.top < 0) {
            const lineHeight = parseInt(window.getComputedStyle(textarea).lineHeight) || 20;
            const paddingTop = parseInt(window.getComputedStyle(textarea).paddingTop) || 8;
            const cursorLineY = parsedData?.cursorLineY || paddingTop + lineHeight;
            list.style.top = `${textareaRect.top + cursorLineY}px`;
            list.style.bottom = "auto";
            if (positionData) {
                const updatedData = JSON.parse(positionData);
                updatedData.showAbove = false;
                list.setAttribute("data-position", JSON.stringify(updatedData));
            }
        }
    });
}
function calculatePopupPosition(button, popup) {
    const buttonRect = button.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    let popupHeight = popup.offsetHeight || 198;
    let popupWidth = popup.offsetWidth || 334;
    const spaceAbove = buttonRect.top;
    const spaceBelow = viewportHeight - buttonRect.bottom;
    let top, left;
    if (spaceAbove >= popupHeight) {
        top = buttonRect.top - popupHeight - 8;
    }
    else if (spaceBelow >= popupHeight) {
        top = buttonRect.bottom + 8;
    }
    else {
        top =
            spaceBelow > spaceAbove
                ? buttonRect.bottom + 8
                : Math.max(buttonRect.top - popupHeight - 8, 0);
    }
    left = buttonRect.left + buttonRect.width / 2 - popupWidth / 2;
    top = Math.max(top, 0);
    left = Math.max(left, 0);
    left = Math.min(left, viewportWidth - popupWidth);
    popup.style.top = `${top}px`;
    popup.style.left = `${left}px`;
    requestAnimationFrame(() => {
        const newPopupHeight = popup.offsetHeight;
        if (newPopupHeight !== popupHeight) {
            calculatePopupPosition(button, popup);
        }
    });
}
function removeAllCollabIcons() {
    const icons = document.querySelectorAll(".visual-builder__collab-wrapper .collab-thread");
    icons?.forEach((icon) => icon?.remove());
}
function hideAllCollabIcons() {
    const icons = document.querySelectorAll(".visual-builder__collab-wrapper .collab-thread");
    icons?.forEach((icon) => icon?.classList.add(hiddenClass$1));
    toggleCollabPopup({ threadUid: "", action: "close" });
}
function showAllCollabIcons() {
    const icons = document.querySelectorAll(".visual-builder__collab-wrapper .collab-thread");
    icons?.forEach((icon) => icon?.classList.remove(hiddenClass$1));
}
function removeCollabIcon(threadUid) {
    const thread = document.querySelector(`div[threaduid='${threadUid}']`);
    thread?.remove();
}
function toggleCollabPopup({ threadUid = "", action, }) {
    document.dispatchEvent(new CustomEvent("toggleCollabPopup", {
        detail: { threadUid, action },
    }));
}
function HighlightThread(threadUid) {
    toggleCollabPopup({ threadUid, action: "open" });
}
function isCollabThread(target) {
    return Array.from(target.classList).some((className) => className.startsWith("collab"));
}
function handleMissingThreads(payload) {
    visualBuilderPostMessage$1?.send(VisualBuilderPostMessageEvents.COLLAB_MISSING_THREADS, payload);
}
function handleEmptyThreads() {
    const icons = document.querySelectorAll(".visual-builder__collab-wrapper .collab-thread");
    icons?.forEach((icon) => {
        if (!icon.hasAttribute("threaduid")) {
            icon.remove();
        }
    });
}
const retryConfig = {
    maxRetries: 5,
    retryDelay: 1000,
};
let isProcessingThreads = false;
const threadRenderStatus = new Map();
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
function getRenderStatus(threadId) {
    if (!threadRenderStatus.has(threadId)) {
        threadRenderStatus.set(threadId, {
            threadId,
            attempts: 0,
            isRendered: false,
        });
    }
    return threadRenderStatus.get(threadId);
}
function updateRenderStatus(threadId, isRendered) {
    const status = getRenderStatus(threadId);
    status.isRendered = isRendered;
    threadRenderStatus.set(threadId, status);
}
function clearThreadStatus(threadId) {
    threadRenderStatus.delete(threadId);
}
async function processThread(thread) {
    let status = getRenderStatus(thread._id);
    while (status.attempts < retryConfig.maxRetries) {
        try {
            const result = generateThread(thread);
            if (result === undefined) {
                updateRenderStatus(thread._id, true);
                return undefined;
            }
            status.attempts++;
            updateRenderStatus(thread._id, false);
            if (status.attempts < retryConfig.maxRetries) {
                await delay(retryConfig.retryDelay);
            }
        }
        catch (error) {
            console.error(`Error rendering thread ${thread._id}:`, error);
            status.attempts++;
            if (status.attempts >= retryConfig.maxRetries) {
                break;
            }
            await delay(retryConfig.retryDelay);
        }
    }
    return thread._id;
}
async function processThreadsBatch(threads) {
    if (isProcessingThreads)
        return [];
    try {
        isProcessingThreads = true;
        const unrenderedThreads = filterUnrenderedThreads(threads);
        if (unrenderedThreads.length === 0)
            return [];
        const missingThreadIds = (await Promise.all(unrenderedThreads.map((thread) => processThread(thread)))).filter(Boolean);
        missingThreadIds.forEach(clearThreadStatus);
        return missingThreadIds;
    }
    finally {
        isProcessingThreads = false;
    }
}
function filterUnrenderedThreads(threads) {
    return threads.filter((thread) => {
        const existingThread = document.querySelector(`[threaduid="${thread._id}"]`);
        if (existingThread) {
            updateRenderStatus(thread._id, true);
            return false;
        }
        return true;
    });
}
function getElementByXpath(xpath) {
    const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    return result.singleNodeValue;
}

async function getEntryPermissions({ entryUid, contentTypeUid, locale, }) {
    try {
        const permissions = await visualBuilderPostMessage$1?.send("get-permissions", {
            type: "entry",
            entryUid,
            contentTypeUid,
            locale,
        });
        if (permissions) {
            return permissions;
        }
    }
    catch (error) {
        console.debug("[Visual Builder] Error fetching permissions", error);
    }
    // allow editing when things go wrong,
    // e.g. when no permissions are received
    return {
        create: true,
        read: true,
        update: true,
        delete: true,
        publish: true,
    };
}

/**
 * Creates a cached async fetch function with support for any number of arguments
 * @param fetchFn - The async function to cache
 * @param uidResolver - Function that generates a unique ID from the arguments passed to fetchFn
 * @returns A cached version of the fetch function with the same signature
 */
function createCachedFetch(fetchFn, uidResolver = (...args) => JSON.stringify(args)) {
    // Cache storage
    const cache = new Map();
    // Track in-flight requests
    const pendingPromises = new Map();
    /**
     * The cached fetch function
     * @param args - Arguments to pass to the original fetch function
     * @returns Promise that resolves with the data
     */
    async function cachedFetch(...args) {
        // Generate unique ID for these arguments
        const uid = uidResolver(...args);
        // Return cached value if available
        if (cache.has(uid)) {
            return cache.get(uid);
        }
        // Return existing promise if request is already in progress
        if (pendingPromises.has(uid)) {
            return pendingPromises.get(uid);
        }
        // Create new promise for this request
        const promise = fetchFn(...args)
            .then((data) => {
            // Store result in cache
            cache.set(uid, data);
            // Remove from pending
            pendingPromises.delete(uid);
            return data;
        })
            .catch((error) => {
            // Clean up on error
            pendingPromises.delete(uid);
            throw error;
        });
        // Store the promise
        pendingPromises.set(uid, promise);
        return promise;
    }
    // Add clearCache method to the function
    cachedFetch.clearCache = () => {
        cache.clear();
        pendingPromises.clear();
    };
    return cachedFetch;
}

const getEntryPermissionsCached = createCachedFetch(getEntryPermissions, ({ entryUid, contentTypeUid, locale }) => `${entryUid}.${contentTypeUid}.${locale}`);

function handleDeleteInstance(fieldMetadata) {
    visualBuilderPostMessage$1
        ?.send(VisualBuilderPostMessageEvents.DELETE_INSTANCE, {
        data: fieldMetadata.fieldPathWithIndex +
            "." +
            fieldMetadata.multipleFieldMetadata.index,
        fieldMetadata: fieldMetadata,
    })
        .finally(closeOverlay);
}
function handleMoveInstance(fieldMetadata, direction) {
    //TODO: Disable first and last instance move
    visualBuilderPostMessage$1
        ?.send(VisualBuilderPostMessageEvents.MOVE_INSTANCE, {
        data: fieldMetadata.fieldPathWithIndex +
            "." +
            fieldMetadata.multipleFieldMetadata.index,
        direction: direction,
        fieldMetadata: fieldMetadata,
    })
        .finally(closeOverlay);
}
function closeOverlay() {
    document
        .querySelector(".visual-builder__overlay--top")
        ?.click();
}

// SVG components for use with Preact components
const fieldIcons = {
    link: EditIcon,
    json_rte: EditIcon,
    html_rte: EditIcon,
    markdown_rte: EditIcon,
    custom_field: EditIcon,
    isodate: EditIcon,
    url: EditIcon,
};

/**
 * Retrieves the discussion data based on the field metadata and field UID.
 *
 * @param params The parameters including field metadata and field UID.
 * @returns A promise that resolves to the discussion data as a string.
 */
async function getDiscussionIdByFieldMetaData(params) {
    const { fieldMetadata, fieldSchema } = params;
    // Send a message to get the discussion Data
    const discussion = (await visualBuilderPostMessage$1?.send(VisualBuilderPostMessageEvents.GET_DISCUSSION_ID, { fieldMetadata, fieldSchema })) ?? null;
    if (hasPostMessageError(discussion)) {
        return null;
    }
    return discussion;
}

function LoadingIcon() {
    return (u("svg", { viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", className: classNames("visual-builder__cursor-icon--loader loader", visualBuilderStyles()["visual-builder__cursor-icon--loader"]), children: u("path", { d: "M15.5023 18.3501C13.5466 19.6388 11.2007 20.2002 8.87354 19.9364C6.54637 19.6725 4.38563 18.6002 2.76808 16.9065C1.15053 15.2127 0.178807 13.0049 0.0223406 10.6681C-0.134126 8.33122 0.534595 6.0136 1.9119 4.1193C3.2892 2.22501 5.2877 0.874235 7.55893 0.302518C9.83015 -0.2692 12.23 -0.0255895 14.34 0.990871C16.45 2.00733 18.1363 3.73215 19.1048 5.86457C20.0734 7.997 20.2627 10.4017 19.6399 12.6595L17.7119 12.1276C18.2102 10.3214 18.0587 8.3976 17.2839 6.69166C16.509 4.98572 15.16 3.60586 13.472 2.7927C11.784 1.97953 9.86412 1.78464 8.04714 2.24201C6.23016 2.69939 4.63136 3.78001 3.52952 5.29544C2.42768 6.81088 1.8927 8.66498 2.01787 10.5345C2.14305 12.4039 2.92043 14.1702 4.21446 15.5252C5.5085 16.8802 7.23709 17.738 9.09883 17.9491C10.9606 18.1601 12.8373 17.711 14.4018 16.6801L15.5023 18.3501Z" }) }));
}

function CommentIcon(props) {
    const { fieldMetadata, fieldSchema, invertTooltipPosition = false } = props;
    const [activeDiscussion, setActiveDiscussion] = p$3(null);
    const [isLoading, setIsLoading] = p$3(false);
    // Fetch discussion data based on field metadata
    _$1(() => {
        const fetchDiscussionId = async () => {
            try {
                setIsLoading(true);
                const discussion = await getDiscussionIdByFieldMetaData({
                    fieldMetadata,
                    fieldSchema,
                });
                setActiveDiscussion(discussion);
            }
            catch (error) {
                console.error("Failed to fetch discussion ID:", error);
                setActiveDiscussion({ uid: "new" });
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchDiscussionId();
    }, [fieldMetadata]);
    // Set up message listener for receiving discussion ID
    _$1(() => {
        const handleReceiveDiscussionId = (response) => {
            const { entryId, discussion, contentTypeId, fieldPath } = response.data;
            if (fieldMetadata.entry_uid === entryId &&
                fieldMetadata.content_type_uid === contentTypeId &&
                fieldMetadata.fieldPathWithIndex === fieldPath) {
                setActiveDiscussion(discussion ?? { uid: "new" });
            }
        };
        const recieveDiscussionIDEvent = visualBuilderPostMessage$1?.on(VisualBuilderPostMessageEvents.UPDATE_DISCUSSION_ID, handleReceiveDiscussionId);
        // Cleanup: Remove message listener when the component unmounts
        return () => {
            recieveDiscussionIDEvent?.unregister();
        };
    }, []);
    // Handles opening the comment modal with the relevant field metadata and discussion data
    const handleCommentModal = async () => {
        visualBuilderPostMessage$1?.send(VisualBuilderPostMessageEvents.OPEN_FIELD_COMMENT_MODAL, {
            fieldMetadata,
            discussion: activeDiscussion,
            fieldSchema,
        });
    };
    if (isLoading) {
        return (u("button", { "data-testid": "visual-builder__focused-toolbar__multiple-field-toolbar__comment-button-loading", className: classNames("visual-builder__button visual-builder__button--secondary visual-builder__button--comment-loader", visualBuilderStyles()["visual-builder__button"], visualBuilderStyles()["visual-builder__button--secondary"], visualBuilderStyles()["visual-builder__button--comment-loader"]), children: u(LoadingIcon, {}) }));
    }
    if (!activeDiscussion?.uid) {
        return null;
    }
    return (u("button", { "data-testid": "visual-builder__focused-toolbar__multiple-field-toolbar__comment-button", className: classNames("visual-builder__button visual-builder__button--secondary", visualBuilderStyles()["visual-builder__button"], visualBuilderStyles()["visual-builder__button--secondary"], visualBuilderStyles()["visual-builder__tooltip"], {
            "visual-builder__tooltip--bottom": invertTooltipPosition,
            [visualBuilderStyles()["visual-builder__tooltip--bottom"]]: invertTooltipPosition,
        }), "data-tooltip": "Add comment", onClick: (e) => {
            e.preventDefault();
            e.stopPropagation();
            handleCommentModal();
        }, children: activeDiscussion?.uid === "new" ? u(AddCommentIcon, {}) : u(ReadCommentIcon, {}) }));
}

function VariantIcon() {
    return (u("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: u("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M4.41131 0.157165C4.34585 0.0589769 4.23565 0 4.11765 0C3.99964 0 3.88944 0.0589769 3.82398 0.157165L0.0592764 5.80422C-0.0197588 5.92278 -0.0197588 6.07722 0.0592764 6.19578L3.82398 11.8428C3.88944 11.941 3.99964 12 4.11765 12C4.23565 12 4.34585 11.941 4.41131 11.8428L6 9.4598L7.58869 11.8428C7.65415 11.941 7.76435 12 7.88235 12C8.00036 12 8.11056 11.941 8.17602 11.8428L11.9407 6.19578C12.0198 6.07722 12.0198 5.92278 11.9407 5.80422L8.17602 0.157165C8.11056 0.0589769 8.00036 0 7.88235 0C7.76435 0 7.65415 0.0589769 7.58869 0.157165L6 2.5402L4.41131 0.157165ZM5.57582 3.17647L4.11765 0.989215L0.777124 6L4.11765 11.0108L5.57582 8.82353L3.82398 6.19578C3.74495 6.07722 3.74495 5.92278 3.82398 5.80422L5.57582 3.17647ZM6 8.18726L4.54183 6L6 3.81274L7.45817 6L6 8.18726ZM6.42418 8.82353L8.17602 6.19578C8.25505 6.07722 8.25505 5.92278 8.17602 5.80422L6.42418 3.17647L7.88235 0.989215L11.2229 6L7.88235 11.0108L6.42418 8.82353Z", fill: "currentColor" }) }));
}

const useHandleOutsideClick = (ref, callback) => {
    _$1(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, callback]);
};

const BASE_VARIANT_STATUS = {
    isAddedInstances: false,
    isBaseModified: false,
    isDeletedInstances: false,
    isOrderChanged: false,
    fieldLevelCustomizations: false,
};
async function getFieldVariantStatus(fieldMetadata) {
    try {
        const result = await visualBuilderPostMessage$1?.send("get-field-variant-status", fieldMetadata);
        return result;
    }
    catch (error) {
        console.error("Failed to get field variant status:", error);
    }
}
const FieldRevertComponent = (props) => {
    const { fieldDataName, fieldMetadata, variantStatus = BASE_VARIANT_STATUS, isOpen, closeDropdown, } = props;
    const getDropdownItems = () => {
        const { isAddedInstances, isDeletedInstances, isBaseModified, isOrderChanged, fieldLevelCustomizations, } = variantStatus;
        const dropdownItems = [];
        if (isBaseModified) {
            dropdownItems.push({
                label: "Revert to base entry value",
                action: "revert_to_base_entry_value",
                id: `iframe-cs-variant-field-${fieldDataName}-revert`,
                testId: `iframe-cs-variant-field-${fieldDataName}-revert`,
                fieldDataName,
            });
        }
        if (isAddedInstances) {
            dropdownItems.push({
                label: "Revert added instances",
                action: "revert_added_instances",
                id: `iframe-cs-variant-field-${fieldDataName}-revert-added-instances`,
                testId: `iframe-cs-variant-field-${fieldDataName}-revert-added-instances`,
                fieldDataName,
            });
        }
        if (isDeletedInstances) {
            dropdownItems.push({
                label: "Restore deleted instances",
                action: "restore_deleted_instances",
                id: `iframe-cs-variant-field-${fieldDataName}-restore-deleted-instances`,
                testId: `iframe-cs-variant-field-${fieldDataName}-restore-deleted-instances`,
                fieldDataName,
            });
        }
        if (fieldLevelCustomizations) {
            dropdownItems.push({
                label: "Reset field-level customizations",
                action: "reset_field_level_customizations",
                id: `iframe-cs-variant-field-${fieldDataName}-reset-field-level-customizations`,
                testId: `iframe-cs-variant-field-${fieldDataName}-reset-field-level-customizations`,
                fieldDataName,
            });
        }
        if (isOrderChanged) {
            dropdownItems.push({
                label: "Restore sorted instances",
                action: "restore_sorted_instances",
                id: `iframe-cs-variant-field-${fieldDataName}-restore-sorted-instances`,
                testId: `iframe-cs-variant-field-${fieldDataName}-restore-sorted-instances`,
                fieldDataName,
            });
        }
        return dropdownItems;
    };
    const dropdownItems = getDropdownItems();
    function handleOnClick(item) {
        const { fieldDataName, action } = item;
        visualBuilderPostMessage$1?.send("send-variant-revert-action-trigger", {
            fieldDataName,
            action,
            euid: fieldMetadata.entry_uid,
            ct_uid: fieldMetadata.content_type_uid,
            locale: fieldMetadata.locale,
        });
    }
    return (u("div", { className: classNames("variant-field-revert-component", visualBuilderStyles()["variant-field-revert-component"]), onClick: (e) => e.stopPropagation(), children: isOpen && (u("div", { "data-testid": "variant-field-revert-component__dropdown-content", className: classNames("variant-field-revert-component__dropdown-content", visualBuilderStyles()["variant-field-revert-component__dropdown-content"]), children: dropdownItems.map((item) => (u("div", { className: classNames("variant-field-revert-component__dropdown-content__list-item", visualBuilderStyles()["variant-field-revert-component__dropdown-content__list-item"]), onClick: (e) => {
                    e.preventDefault();
                    handleOnClick(item);
                    closeDropdown();
                }, "data-testid": item.testId, children: u("span", { children: item.label }) }, item.id))) })) }));
};
const VariantRevertDropdown = (props) => {
    const { closeDropdown, invertTooltipPosition, toggleVariantDropdown, variantStatus = BASE_VARIANT_STATUS, disabled, } = props;
    const dropdownRef = F$1(null);
    useHandleOutsideClick(dropdownRef, closeDropdown);
    const hasDropdownItems = Object.values(variantStatus).some((value) => value);
    const buttonClassNames = classNames("visual-builder__button visual-builder__button--secondary", visualBuilderStyles()["visual-builder__button"], visualBuilderStyles()["visual-builder__button--secondary"], visualBuilderStyles()["visual-builder__tooltip"], {
        "visual-builder__tooltip--bottom": invertTooltipPosition,
        [visualBuilderStyles()["visual-builder__tooltip--bottom"]]: invertTooltipPosition,
    });
    if (!hasDropdownItems) {
        return (u("button", { className: classNames(buttonClassNames), style: { padding: "6px" }, "data-tooltip": "Variant", "data-testid": `visual-builder-canvas-variant-icon`, disabled: disabled, children: u(VariantIcon, {}) }));
    }
    return (u("div", { ref: dropdownRef, children: [u("button", { className: classNames(buttonClassNames, visualBuilderStyles()["visual-builder__variant-button"]), "data-tooltip": "Variant Revert", "data-testid": `visual-builder-canvas-variant-revert`, onClick: toggleVariantDropdown, disabled: disabled, children: [u(VariantIcon, {}), u(CaretIcon, { open: props.isOpen })] }), u(FieldRevertComponent, { ...props })] }));
};

const EmptyAppIcon = ({ id = "", ...props }) => {
    return (u("svg", { width: "35", height: "35", viewBox: "0 0 72 72", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props, children: [u("circle", { cx: "36", cy: "36", r: "36", fill: getColorFromString(id) }), u("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M32.0577 27.3091H25.7747C25.1627 27.3091 24.6667 27.8052 24.6667 28.4171V31.6933H25.4351C28.2423 31.6933 30.9099 33.6523 30.9099 36.8808C30.9099 40.0525 28.3048 42.1467 25.4351 42.1467H24.6667V47.2253C24.6667 47.8372 25.1627 48.3333 25.7747 48.3333H30.8533V47.5649C30.8533 44.6952 32.9475 42.0901 36.1192 42.0901C39.3477 42.0901 41.3067 44.7577 41.3067 47.5649V48.3333H44.5829C45.1948 48.3333 45.6909 47.8372 45.6909 47.2253V40.8782L47.9921 40.5598C49.9596 40.2875 51.3333 38.7771 51.3333 36.8808C51.3333 35.0149 49.9935 33.5515 47.9984 33.2804L45.6909 32.9668V28.4171C45.6909 27.8052 45.1948 27.3091 44.5829 27.3091H40.0974L39.7801 25.0065C39.5081 23.0327 38.0085 21.6667 36.1192 21.6667C34.1999 21.6667 32.6528 23.0659 32.3798 25.0128L32.0577 27.3091ZM38.64 51V47.5649C38.64 45.9382 37.5988 44.7567 36.1192 44.7567C34.6198 44.7567 33.52 45.9602 33.52 47.5649V51H25.7747C23.69 51 22 49.31 22 47.2253V39.48H25.4351C27.0398 39.48 28.2433 38.3802 28.2433 36.8808C28.2433 35.4012 27.0618 34.36 25.4351 34.36H22V28.4171C22 26.3324 23.69 24.6424 25.7747 24.6424H29.739C30.1842 21.4681 32.7819 19 36.1192 19C39.4662 19 41.9856 21.4774 42.4218 24.6424H44.5829C46.6676 24.6424 48.3576 26.3324 48.3576 28.4171V30.638C51.5153 31.0671 54 33.5263 54 36.8808C54 40.2256 51.5248 42.763 48.3576 43.2013V47.2253C48.3576 49.31 46.6676 51 44.5829 51H38.64Z", fill: "white" })] }));
};
const sumOfAscii = (str) => [...str].reduce((a, b) => a + b.charCodeAt(0), 0);
const getColorFromString = (str = "") => {
    const colorList = [
        "#99D8CE",
        "#6BC3FE",
        "#5060C1",
        "#835EC3",
        "#B16DBD",
        "#FF85BC",
        "#FF7E83",
        "#A2D959",
        "#59BA5E",
    ];
    return colorList[sumOfAscii(str) % colorList.length];
};

const normalize = (text) => text
    .toLowerCase()
    .replace(/[^a-z0-9 ]/gi, "")
    .trim();
const FieldLocationAppList = ({ apps, position, toolbarRef, domEditStack, setDisplayAllApps, }) => {
    const remainingApps = apps.filter((app, index) => index !== 0);
    const [search, setSearch] = p$3("");
    const filteredApps = q$1(() => {
        if (!search.trim())
            return remainingApps;
        const normalizedSearch = normalize(search);
        return remainingApps.filter((app) => {
            return (normalize(app.title).includes(normalizedSearch));
        });
    }, [search, remainingApps]);
    const handleAppClick = (app) => {
        visualBuilderPostMessage$1?.send(VisualBuilderPostMessageEvents.FIELD_LOCATION_SELECTED_APP, {
            app: app,
            position: toolbarRef.current?.getBoundingClientRect(),
            DomEditStack: domEditStack
        });
        setDisplayAllApps(false);
    };
    return (u("div", { className: classNames(visualBuilderStyles()["visual-builder__field-location-app-list"], {
            [visualBuilderStyles()["visual-builder__field-location-app-list--left"]]: position === "left",
            [visualBuilderStyles()["visual-builder__field-location-app-list--right"]]: position === "right",
        }), children: [u("div", { className: visualBuilderStyles()["visual-builder__field-location-app-list__search-container"], children: [u("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "none", xmlns: "http://www.w3.org/2000/svg", className: classNames("Search__search-icon Icon--mini", visualBuilderStyles()["visual-builder__field-location-app-list__search-icon"]), children: u("path", { d: "M12.438 12.438L9.624 9.624M6.25 10.75a4.5 4.5 0 100-9 4.5 4.5 0 000 9z", stroke: "#A9B6CB", strokeWidth: "2", strokeMiterlimit: "10", strokeLinecap: "round", strokeLinejoin: "round" }) }), u("input", { type: "text", value: search, onInput: (e) => setSearch(e.target.value), placeholder: "Search for Apps", className: visualBuilderStyles()["visual-builder__field-location-app-list__search-input"] })] }), u("div", { className: visualBuilderStyles()["visual-builder__field-location-app-list__content"], children: [filteredApps.length === 0 && (u("div", { className: visualBuilderStyles()["visual-builder__field-location-app-list__no-results"], children: u("span", { className: visualBuilderStyles()["visual-builder__field-location-app-list__no-results-text"], children: "No matching results found!" }) })), filteredApps.map((app) => (u("div", { className: visualBuilderStyles()["visual-builder__field-location-app-list__item"], onClick: () => handleAppClick(app), children: [u("div", { className: visualBuilderStyles()["visual-builder__field-location-app-list__item-icon-container"], children: app.icon ? (u("img", { src: app.icon, alt: app.title, className: visualBuilderStyles()["visual-builder__field-location-app-list__item-icon"] })) : (u(EmptyAppIcon, { id: app.app_installation_uid })) }), u("span", { className: visualBuilderStyles()["visual-builder__field-location-app-list__item-title"], children: app.title })] }, app.uid)))] })] }));
};

const FieldLocationIcon = ({ fieldLocationData, multipleFieldToolbarButtonClasses, handleMoreIconClick, moreButtonRef, toolbarRef, domEditStack }) => {
    if (!fieldLocationData?.apps || fieldLocationData?.apps?.length === 0) {
        return null;
    }
    const handleAppClick = (app) => {
        if (!toolbarRef.current)
            return;
        visualBuilderPostMessage$1?.send(VisualBuilderPostMessageEvents.FIELD_LOCATION_SELECTED_APP, {
            app,
            position: toolbarRef.current?.getBoundingClientRect(),
            DomEditStack: domEditStack
        });
    };
    return (u("div", { ref: toolbarRef, className: classNames(visualBuilderStyles()["visual-builder__field-location-icons-container"]), children: [u("hr", { className: visualBuilderStyles()["visual-builder__field-location-icons-container__divider"] }), u("button", { title: fieldLocationData.apps[0].title, className: multipleFieldToolbarButtonClasses, "data-tooltip": fieldLocationData.apps[0].title, onClick: (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAppClick(fieldLocationData.apps[0]);
                }, "data-testid": "field-location-icon", children: fieldLocationData.apps[0].icon ? (u("img", { src: fieldLocationData.apps[0].icon, alt: fieldLocationData.apps[0].title, className: visualBuilderStyles()["visual-builder__field-location-icons-container__app-icon"] })) : (u(EmptyAppIcon, { id: fieldLocationData.apps[0].app_installation_uid })) }, `${fieldLocationData.apps[0].uid}`), fieldLocationData.apps.length > 1 && (u("button", { ref: moreButtonRef, className: multipleFieldToolbarButtonClasses, "data-tooltip": "More", onClick: handleMoreIconClick, "data-testid": "field-location-more-button", children: u(MoreIcon, {}) }))] }));
};

const TOOLTIP_TOP_EDGE_BUFFER = 96;
function handleReplaceAsset(fieldMetadata) {
    // TODO avoid sending whole fieldMetadata
    visualBuilderPostMessage$1?.send(VisualBuilderPostMessageEvents.OPEN_ASSET_MODAL, {
        fieldMetadata,
    });
}
function handleReplaceReference(fieldMetadata) {
    const isMultipleInstance = fieldMetadata.multipleFieldMetadata.index > -1 &&
        fieldMetadata.fieldPathWithIndex ===
            fieldMetadata.multipleFieldMetadata.parentDetails?.parentPath;
    const entryPath = isMultipleInstance
        ? fieldMetadata.instance.fieldPathWithIndex
        : fieldMetadata.fieldPathWithIndex;
    visualBuilderPostMessage$1?.send(VisualBuilderPostMessageEvents.OPEN_REFERENCE_MODAL, {
        entry_uid: fieldMetadata.entry_uid,
        content_type_uid: fieldMetadata.content_type_uid,
        locale: fieldMetadata.locale,
        fieldPath: fieldMetadata.fieldPath,
        fieldPathWithIndex: fieldMetadata.fieldPathWithIndex,
        entryPath,
    });
}
function handleEdit(fieldMetadata) {
    visualBuilderPostMessage$1?.send(VisualBuilderPostMessageEvents.OPEN_FIELD_EDIT_MODAL, { fieldMetadata });
}
function handleFormFieldFocus(eventDetails) {
    const { editableElement } = eventDetails;
    return visualBuilderPostMessage$1?.send(VisualBuilderPostMessageEvents.FOCUS_FIELD, {
        DOMEditStack: getDOMEditStack(editableElement),
        toggleVisibility: true,
    });
}
function FieldToolbarComponent(props) {
    const { eventDetails, isVariant: isVariantOrParentOfVariant, entryPermissions, } = props;
    const { fieldMetadata, editableElement: targetElement } = eventDetails;
    const [isFormLoading, setIsFormLoading] = p$3(false);
    const [fieldLocationData, setFieldLocationData] = p$3(null);
    const [displayAllApps, setDisplayAllApps] = p$3(false);
    const moreButtonRef = F$1(null);
    const toolbarRef = F$1(null);
    const [appListPosition, setAppListPosition] = p$3("right");
    const parentPath = fieldMetadata?.multipleFieldMetadata?.parentDetails?.parentCslpValue ||
        "";
    const isVariant = !!fieldMetadata?.variant || isVariantOrParentOfVariant;
    const direction = getChildrenDirection(targetElement, parentPath);
    const [fieldSchema, setFieldSchema] = p$3(null);
    const [fieldVariantStatus, setFieldVariantStatus] = p$3(BASE_VARIANT_STATUS);
    const [isOpenVariantRevert, setIsOpenVariantRevert] = p$3(false);
    let isModalEditable = false;
    let isReplaceAllowed = false;
    let isMultiple = false;
    let Icon = null;
    let fieldType = null;
    let isWholeMultipleField = false;
    const APP_LIST_MIN_WIDTH = 230;
    let disableFieldActions = false;
    if (fieldSchema) {
        const { isDisabled } = isFieldDisabled(fieldSchema, {
            editableElement: targetElement,
            fieldMetadata,
        }, entryPermissions);
        disableFieldActions = isDisabled;
        fieldType = getFieldType(fieldSchema);
        Icon = fieldIcons[fieldType];
        isMultiple = fieldSchema.multiple || false;
        if (fieldType === FieldDataType.REFERENCE)
            isMultiple = fieldSchema
                .field_metadata.ref_multiple;
        // field is multiple but an instance is not selected
        // instead the whole field (all instances) is selected.
        // Currently, when whole featured_blogs is selected in canvas,
        // the fieldPathWithIndex and instance.fieldPathWithIndex are the same
        // cannot rely on -1 index, as the non-negative index then refers to the index of
        // the featured_blogs block in page_components
        // It is not needed except taxanomy.
        isWholeMultipleField =
            isMultiple &&
                (fieldMetadata.fieldPathWithIndex ===
                    fieldMetadata.instance.fieldPathWithIndex ||
                    fieldMetadata.multipleFieldMetadata?.index === -1);
        isModalEditable = ALLOWED_MODAL_EDITABLE_FIELD.includes(fieldType) && !isWholeMultipleField;
        isReplaceAllowed =
            ALLOWED_REPLACE_FIELDS.includes(fieldType) && !isWholeMultipleField;
        // if (
        //     DEFAULT_MULTIPLE_FIELDS.includes(fieldType) &&
        //     isWholeMultipleField &&
        //      !isVariant
        // ) {
        //     return null;
        // }
    }
    const domEditStack = getDOMEditStack(eventDetails.editableElement);
    const invertTooltipPosition = targetElement.getBoundingClientRect().top <= TOOLTIP_TOP_EDGE_BUFFER;
    const handleMoreIconClick = () => {
        if (toolbarRef.current) {
            const rect = toolbarRef.current.getBoundingClientRect();
            const spaceRight = window.innerWidth - rect.right;
            const spaceLeft = rect.left;
            let position = "";
            if (spaceRight < APP_LIST_MIN_WIDTH) {
                position = "left";
            }
            else if (spaceRight > APP_LIST_MIN_WIDTH) {
                position = "right";
            }
            else {
                position = spaceRight > spaceLeft ? "right" : "left";
            }
            setAppListPosition(position);
        }
        setDisplayAllApps(!displayAllApps);
    };
    const editButton = Icon ? (u("button", { "data-testid": "visual-builder__focused-toolbar__multiple-field-toolbar__edit-button", className: classNames("visual-builder__button visual-builder__button--secondary visual-builder__button--edit", visualBuilderStyles()["visual-builder__button"], visualBuilderStyles()["visual-builder__button--secondary"], visualBuilderStyles()["visual-builder__button--edit"], visualBuilderStyles()["visual-builder__tooltip"], {
            "visual-builder__tooltip--bottom": invertTooltipPosition,
            [visualBuilderStyles()["visual-builder__tooltip--bottom"]]: invertTooltipPosition,
        }), "data-tooltip": "Edit", onClick: (e) => {
            // TODO the listener for field path is attached to the common parent requiring
            // propagation to be stopped, should ideally only attach onClick to fieldpath dropdown
            e.preventDefault();
            e.stopPropagation();
            handleEdit(fieldMetadata);
        }, disabled: disableFieldActions, children: u(Icon, {}) })) : null;
    const replaceButton = fieldType ? (u("button", { className: classNames("visual-builder__replace-button visual-builder__button visual-builder__button--secondary", visualBuilderStyles()["visual-builder__button"], visualBuilderStyles()["visual-builder__button--secondary"], visualBuilderStyles()["visual-builder__tooltip"], {
            "visual-builder__tooltip--bottom": invertTooltipPosition,
            [visualBuilderStyles()["visual-builder__tooltip--bottom"]]: invertTooltipPosition,
        }), "data-tooltip": "Replace", "data-testid": `visual-builder-replace-${fieldType}`, onClick: (e) => {
            e.stopPropagation();
            e.preventDefault();
            if (fieldType === FieldDataType.REFERENCE) {
                handleReplaceReference(fieldMetadata);
                return;
            }
            else if (fieldType === FieldDataType.FILE) {
                handleReplaceAsset(fieldMetadata);
                return;
            }
        }, disabled: disableFieldActions, children: u(ReplaceAssetIcon, {}) })) : null;
    const formButton = (u("button", { className: classNames("visual-builder__replace-button visual-builder__button visual-builder__button--secondary", visualBuilderStyles()["visual-builder__button"], visualBuilderStyles()["visual-builder__button--secondary"], visualBuilderStyles()["visual-builder__tooltip"], {
            "visual-builder__tooltip--bottom": invertTooltipPosition,
            [visualBuilderStyles()["visual-builder__tooltip--bottom"]]: invertTooltipPosition,
        }, {
            [visualBuilderStyles()["visual-builder__button--comment-loader"]]: isFormLoading,
            "visual-builder__button--comment-loader": isFormLoading,
        }), "data-tooltip": "Form", "data-testid": `visual-builder-form`, onClick: async (e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsFormLoading(true);
            try {
                await handleFormFieldFocus(eventDetails);
            }
            finally {
                setIsFormLoading(false);
            }
        }, disabled: isFormLoading, children: isFormLoading ? u(LoadingIcon, {}) : u(FormIcon, {}) }));
    const toggleVariantDropdown = () => {
        setIsOpenVariantRevert(!isOpenVariantRevert);
    };
    const closeVariantDropdown = () => {
        setIsOpenVariantRevert(false);
    };
    (u("button", { className: classNames("visual-builder__variant-button visual-builder__button visual-builder__button--secondary", visualBuilderStyles()["visual-builder__button"], visualBuilderStyles()["visual-builder__button--secondary"], visualBuilderStyles()["visual-builder__tooltip"], visualBuilderStyles()["visual-builder__variant-button"], {
            "visual-builder__tooltip--bottom": invertTooltipPosition,
            [visualBuilderStyles()["visual-builder__tooltip--bottom"]]: invertTooltipPosition,
        }), "data-tooltip": "Variant Revert", "data-testid": `visual-builder-canvas-variant-revert`, onClick: toggleVariantDropdown, children: [u(VariantIcon, {}), u(CaretIcon, { open: isOpenVariantRevert })] }));
    // TODO sibling count is incorrect for this purpose
    const totalElementCount = targetElement?.parentNode?.childElementCount ?? 1;
    const indexOfElement = fieldMetadata?.multipleFieldMetadata?.index;
    const disableMoveLeft = indexOfElement === 0; // first element
    const disableMoveRight = indexOfElement === totalElementCount - 1; // last element
    _$1(() => {
        async function fetchFieldSchema() {
            const fieldSchema = await FieldSchemaMap.getFieldSchema(fieldMetadata.content_type_uid, fieldMetadata.fieldPath);
            if (fieldSchema) {
                setFieldSchema(fieldSchema);
            }
            const variantStatus = await getFieldVariantStatus(fieldMetadata);
            setFieldVariantStatus(variantStatus ?? BASE_VARIANT_STATUS);
        }
        fetchFieldSchema();
    }, [fieldMetadata]);
    _$1(() => {
        const event = visualBuilderPostMessage$1?.on(VisualBuilderPostMessageEvents.DELETE_INSTANCE, (args) => {
            if (args.data?.path ===
                fieldMetadata.instance.fieldPathWithIndex) {
                props.hideOverlay();
            }
        });
        return () => {
            event?.unregister();
        };
    }, []);
    _$1(() => {
        const fetchFieldLocationData = async () => {
            try {
                const event = await visualBuilderPostMessage$1?.send(VisualBuilderPostMessageEvents.FIELD_LOCATION_DATA, {
                    domEditStack: getDOMEditStack(eventDetails.editableElement)
                });
                setFieldLocationData(event);
            }
            catch (error) {
                console.error('Error fetching field location data:', error);
            }
        };
        fetchFieldLocationData();
    }, [eventDetails.editableElement]);
    const multipleFieldToolbarButtonClasses = classNames("visual-builder__button visual-builder__button--secondary", visualBuilderStyles()["visual-builder__button"], visualBuilderStyles()["visual-builder__button--secondary"], visualBuilderStyles()["visual-builder__tooltip"], {
        "visual-builder__tooltip--bottom": invertTooltipPosition,
        [visualBuilderStyles()["visual-builder__tooltip--bottom"]]: invertTooltipPosition,
    });
    return (u("div", { className: classNames("visual-builder__field-toolbar-container", visualBuilderStyles()["visual-builder__field-toolbar-container"]), children: [u("div", { className: classNames("visual-builder__focused-toolbar__multiple-field-toolbar", visualBuilderStyles()["visual-builder__focused-toolbar__multiple-field-toolbar"]), "data-testid": "visual-builder__focused-toolbar__multiple-field-toolbar", children: u("div", { className: classNames("visual-builder__focused-toolbar__button-group", visualBuilderStyles()["visual-builder__focused-toolbar__button-group"]), children: u(g$4, { children: [isVariant ? (u(VariantRevertDropdown, { fieldDataName: fieldMetadata.fieldPathWithIndex, fieldMetadata: fieldMetadata, variantStatus: fieldVariantStatus, isOpen: isOpenVariantRevert, closeDropdown: closeVariantDropdown, invertTooltipPosition: invertTooltipPosition, toggleVariantDropdown: toggleVariantDropdown, disabled: disableFieldActions })) : null, isMultiple && !isWholeMultipleField ? (u(g$4, { children: [u("button", { "data-testid": "visual-builder__focused-toolbar__multiple-field-toolbar__move-left-button", className: multipleFieldToolbarButtonClasses, "data-tooltip": direction === "vertical"
                                            ? "Move up"
                                            : "Move left", onClick: (e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            handleMoveInstance(fieldMetadata, "previous");
                                        }, disabled: disableFieldActions || disableMoveLeft, children: u(MoveLeftIcon, { className: classNames({
                                                "visual-builder__rotate--90": direction === "vertical",
                                                [visualBuilderStyles()["visual-builder__rotate--90"]]: direction === "vertical",
                                            }), disabled: disableFieldActions ||
                                                disableMoveLeft }) }), u("button", { "data-testid": "visual-builder__focused-toolbar__multiple-field-toolbar__move-right-button", className: multipleFieldToolbarButtonClasses, "data-tooltip": direction === "vertical"
                                            ? "Move down"
                                            : "Move right", onClick: (e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            handleMoveInstance(fieldMetadata, "next");
                                        }, disabled: disableFieldActions || disableMoveRight, children: u(MoveRightIcon, { className: classNames({
                                                "visual-builder__rotate--90": direction === "vertical",
                                                [visualBuilderStyles()["visual-builder__rotate--90"]]: direction === "vertical",
                                            }), disabled: disableFieldActions ||
                                                disableMoveRight }) }), isModalEditable ? editButton : null, formButton, isReplaceAllowed ? replaceButton : null, u("button", { "data-testid": "visual-builder__focused-toolbar__multiple-field-toolbar__delete-button", className: multipleFieldToolbarButtonClasses, "data-tooltip": "Delete", onClick: (e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            handleDeleteInstance(fieldMetadata);
                                        }, disabled: disableFieldActions, children: u(DeleteIcon, {}) })] })) : (u(g$4, { children: [isModalEditable ? editButton : null, isReplaceAllowed ? replaceButton : null, formButton, fieldSchema ? (u(CommentIcon, { fieldMetadata: fieldMetadata, fieldSchema: fieldSchema, invertTooltipPosition: invertTooltipPosition })) : null] })), u(FieldLocationIcon, { fieldLocationData: fieldLocationData, multipleFieldToolbarButtonClasses: multipleFieldToolbarButtonClasses, handleMoreIconClick: handleMoreIconClick, moreButtonRef: moreButtonRef, toolbarRef: toolbarRef, domEditStack: domEditStack })] }) }) }), displayAllApps && (u(FieldLocationAppList, { toolbarRef: toolbarRef, apps: fieldLocationData?.apps || [], position: appListPosition, domEditStack: domEditStack, setDisplayAllApps: setDisplayAllApps, displayAllApps: displayAllApps }))] }));
}

function CslpError({}) {
    const errorRef = F$1(null);
    const [showTooltip, setShowTooltip] = p$3(false);
    _$1(() => {
        const errorElement = errorRef.current;
        const showTooltip = () => {
            setShowTooltip(true);
        };
        const hideTooltip = () => {
            setShowTooltip(false);
        };
        if (errorElement) {
            errorElement.addEventListener("mouseenter", showTooltip);
            errorElement.addEventListener("mouseleave", hideTooltip);
        }
        return () => {
            if (errorElement) {
                errorElement.removeEventListener("mouseenter", showTooltip);
                errorElement.removeEventListener("mouseleave", hideTooltip);
            }
        };
    }, []);
    return (u("div", { className: classNames(visualBuilderStyles()["visual-builder__focused-toolbar__error"]), ref: errorRef, children: [u(WarningOctagonIcon, {}), u("span", { className: classNames(visualBuilderStyles()["visual-builder__focused-toolbar__error-text"]), children: "Error" }), showTooltip ? (u("div", { className: classNames(visualBuilderStyles()["visual-builder__focused-toolbar__error-toolip"]), children: [u("p", { children: "Invalid CSLP tag" }), u("span", { children: "The CSLP is invalid or incorrectly generated." })] })) : null] }));
}

/**
 * Custom positioning reference element.
 * @see https://floating-ui.com/docs/virtual-elements
 */

const min = Math.min;
const max = Math.max;
const round = Math.round;
const createCoords = v => ({
  x: v,
  y: v
});
const oppositeSideMap = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};
const oppositeAlignmentMap = {
  start: 'end',
  end: 'start'
};
function clamp(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === 'function' ? value(param) : value;
}
function getSide(placement) {
  return placement.split('-')[0];
}
function getAlignment(placement) {
  return placement.split('-')[1];
}
function getOppositeAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}
function getAxisLength(axis) {
  return axis === 'y' ? 'height' : 'width';
}
const yAxisSides = /*#__PURE__*/new Set(['top', 'bottom']);
function getSideAxis(placement) {
  return yAxisSides.has(getSide(placement)) ? 'y' : 'x';
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === 'x' ? alignment === (rtl ? 'end' : 'start') ? 'right' : 'left' : alignment === 'start' ? 'bottom' : 'top';
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.replace(/start|end/g, alignment => oppositeAlignmentMap[alignment]);
}
const lrPlacement = ['left', 'right'];
const rlPlacement = ['right', 'left'];
const tbPlacement = ['top', 'bottom'];
const btPlacement = ['bottom', 'top'];
function getSideList(side, isStart, rtl) {
  switch (side) {
    case 'top':
    case 'bottom':
      if (rtl) return isStart ? rlPlacement : lrPlacement;
      return isStart ? lrPlacement : rlPlacement;
    case 'left':
    case 'right':
      return isStart ? tbPlacement : btPlacement;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === 'start', rtl);
  if (alignment) {
    list = list.map(side => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, side => oppositeSideMap[side]);
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function getPaddingObject(padding) {
  return typeof padding !== 'number' ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  const {
    x,
    y,
    width,
    height
  } = rect;
  return {
    width,
    height,
    top: y,
    left: x,
    right: x + width,
    bottom: y + height,
    x,
    y
  };
}

function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === 'y';
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case 'top':
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case 'bottom':
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case 'right':
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case 'left':
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case 'start':
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case 'end':
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}

/**
 * Computes the `x` and `y` coordinates that will place the floating element
 * next to a given reference element.
 *
 * This export does not have any `platform` interface logic. You will need to
 * write one for the platform you are using Floating UI with.
 */
const computePosition$1 = async (reference, floating, config) => {
  const {
    placement = 'bottom',
    strategy = 'absolute',
    middleware = [],
    platform
  } = config;
  const validMiddleware = middleware.filter(Boolean);
  const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(floating));
  let rects = await platform.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x,
    y
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let middlewareData = {};
  let resetCount = 0;
  for (let i = 0; i < validMiddleware.length; i++) {
    const {
      name,
      fn
    } = validMiddleware[i];
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform,
      elements: {
        reference,
        floating
      }
    });
    x = nextX != null ? nextX : x;
    y = nextY != null ? nextY : y;
    middlewareData = {
      ...middlewareData,
      [name]: {
        ...middlewareData[name],
        ...data
      }
    };
    if (reset && resetCount <= 50) {
      resetCount++;
      if (typeof reset === 'object') {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x,
          y
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i = -1;
    }
  }
  return {
    x,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};

/**
 * Resolves with an object of overflow side offsets that determine how much the
 * element is overflowing a given clipping boundary on each side.
 * - positive = overflowing the boundary by that number of pixels
 * - negative = how many pixels left before it will overflow
 * - 0 = lies flush with the boundary
 * @see https://floating-ui.com/docs/detectOverflow
 */
async function detectOverflow(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x,
    y,
    platform,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = 'clippingAncestors',
    rootBoundary = 'viewport',
    elementContext = 'floating',
    altBoundary = false,
    padding = 0
  } = evaluate(options, state);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === 'floating' ? 'reference' : 'floating';
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform.getClippingRect({
    element: ((_await$platform$isEle = await (platform.isElement == null ? void 0 : platform.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || (await (platform.getDocumentElement == null ? void 0 : platform.getDocumentElement(elements.floating))),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === 'floating' ? {
    x,
    y,
    width: rects.floating.width,
    height: rects.floating.height
  } : rects.reference;
  const offsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(elements.floating));
  const offsetScale = (await (platform.isElement == null ? void 0 : platform.isElement(offsetParent))) ? (await (platform.getScale == null ? void 0 : platform.getScale(offsetParent))) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements,
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}

/**
 * Provides data to position an inner element of the floating element so that it
 * appears centered to the reference element.
 * @see https://floating-ui.com/docs/arrow
 */
const arrow$1 = options => ({
  name: 'arrow',
  options,
  async fn(state) {
    const {
      x,
      y,
      placement,
      rects,
      platform,
      elements,
      middlewareData
    } = state;
    // Since `element` is required, we don't Partial<> the type.
    const {
      element,
      padding = 0
    } = evaluate(options, state) || {};
    if (element == null) {
      return {};
    }
    const paddingObject = getPaddingObject(padding);
    const coords = {
      x,
      y
    };
    const axis = getAlignmentAxis(placement);
    const length = getAxisLength(axis);
    const arrowDimensions = await platform.getDimensions(element);
    const isYAxis = axis === 'y';
    const minProp = isYAxis ? 'top' : 'left';
    const maxProp = isYAxis ? 'bottom' : 'right';
    const clientProp = isYAxis ? 'clientHeight' : 'clientWidth';
    const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
    const startDiff = coords[axis] - rects.reference[axis];
    const arrowOffsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(element));
    let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;

    // DOM platform can return `window` as the `offsetParent`.
    if (!clientSize || !(await (platform.isElement == null ? void 0 : platform.isElement(arrowOffsetParent)))) {
      clientSize = elements.floating[clientProp] || rects.floating[length];
    }
    const centerToReference = endDiff / 2 - startDiff / 2;

    // If the padding is large enough that it causes the arrow to no longer be
    // centered, modify the padding so that it is centered.
    const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
    const minPadding = min(paddingObject[minProp], largestPossiblePadding);
    const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);

    // Make sure the arrow doesn't overflow the floating element if the center
    // point is outside the floating element's bounds.
    const min$1 = minPadding;
    const max = clientSize - arrowDimensions[length] - maxPadding;
    const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
    const offset = clamp(min$1, center, max);

    // If the reference is small enough that the arrow's padding causes it to
    // to point to nothing for an aligned placement, adjust the offset of the
    // floating element itself. To ensure `shift()` continues to take action,
    // a single reset is performed when this is true.
    const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
    const alignmentOffset = shouldAddOffset ? center < min$1 ? center - min$1 : center - max : 0;
    return {
      [axis]: coords[axis] + alignmentOffset,
      data: {
        [axis]: offset,
        centerOffset: center - offset - alignmentOffset,
        ...(shouldAddOffset && {
          alignmentOffset
        })
      },
      reset: shouldAddOffset
    };
  }
});

/**
 * Optimizes the visibility of the floating element by flipping the `placement`
 * in order to keep it in view when the preferred placement(s) will overflow the
 * clipping boundary. Alternative to `autoPlacement`.
 * @see https://floating-ui.com/docs/flip
 */
const flip$1 = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'flip',
    options,
    async fn(state) {
      var _middlewareData$arrow, _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform,
        elements
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = 'bestFit',
        fallbackAxisSideDirection = 'none',
        flipAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state);

      // If a reset by the arrow was caused due to an alignment offset being
      // added, we should skip any logic now since `flip()` has already done its
      // work.
      // https://github.com/floating-ui/floating-ui/issues/2549#issuecomment-1719601643
      if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      const side = getSide(placement);
      const initialSideAxis = getSideAxis(initialPlacement);
      const isBasePlacement = getSide(initialPlacement) === initialPlacement;
      const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== 'none';
      if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
        fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
      }
      const placements = [initialPlacement, ...fallbackPlacements];
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const sides = getAlignmentSides(placement, rects, rtl);
        overflows.push(overflow[sides[0]], overflow[sides[1]]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];

      // One or more sides is overflowing.
      if (!overflows.every(side => side <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter;
        const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
        const nextPlacement = placements[nextIndex];
        if (nextPlacement) {
          const ignoreCrossAxisOverflow = checkCrossAxis === 'alignment' ? initialSideAxis !== getSideAxis(nextPlacement) : false;
          if (!ignoreCrossAxisOverflow ||
          // We leave the current main axis only if every placement on that axis
          // overflows the main axis.
          overflowsData.every(d => d.overflows[0] > 0 && getSideAxis(d.placement) === initialSideAxis)) {
            // Try next placement and re-run the lifecycle.
            return {
              data: {
                index: nextIndex,
                overflows: overflowsData
              },
              reset: {
                placement: nextPlacement
              }
            };
          }
        }

        // First, find the candidates that fit on the mainAxis side of overflow,
        // then find the placement that fits the best on the main crossAxis side.
        let resetPlacement = (_overflowsData$filter = overflowsData.filter(d => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;

        // Otherwise fallback.
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case 'bestFit':
              {
                var _overflowsData$filter2;
                const placement = (_overflowsData$filter2 = overflowsData.filter(d => {
                  if (hasFallbackAxisSideDirection) {
                    const currentSideAxis = getSideAxis(d.placement);
                    return currentSideAxis === initialSideAxis ||
                    // Create a bias to the `y` side axis due to horizontal
                    // reading directions favoring greater width.
                    currentSideAxis === 'y';
                  }
                  return true;
                }).map(d => [d.placement, d.overflows.filter(overflow => overflow > 0).reduce((acc, overflow) => acc + overflow, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
                if (placement) {
                  resetPlacement = placement;
                }
                break;
              }
            case 'initialPlacement':
              resetPlacement = initialPlacement;
              break;
          }
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
};

const originSides = /*#__PURE__*/new Set(['left', 'top']);

// For type backwards-compatibility, the `OffsetOptions` type was also
// Derivable.

async function convertValueToCoords(state, options) {
  const {
    placement,
    platform,
    elements
  } = state;
  const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getSideAxis(placement) === 'y';
  const mainAxisMulti = originSides.has(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = evaluate(options, state);

  // eslint-disable-next-line prefer-const
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === 'number' ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: rawValue.mainAxis || 0,
    crossAxis: rawValue.crossAxis || 0,
    alignmentAxis: rawValue.alignmentAxis
  };
  if (alignment && typeof alignmentAxis === 'number') {
    crossAxis = alignment === 'end' ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}

/**
 * Modifies the placement by translating the floating element along the
 * specified axes.
 * A number (shorthand for `mainAxis` or distance), or an axes configuration
 * object may be passed.
 * @see https://floating-ui.com/docs/offset
 */
const offset$1 = function (options) {
  if (options === void 0) {
    options = 0;
  }
  return {
    name: 'offset',
    options,
    async fn(state) {
      var _middlewareData$offse, _middlewareData$arrow;
      const {
        x,
        y,
        placement,
        middlewareData
      } = state;
      const diffCoords = await convertValueToCoords(state, options);

      // If the placement is the same and the arrow caused an alignment offset
      // then we don't need to change the positioning coordinates.
      if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      return {
        x: x + diffCoords.x,
        y: y + diffCoords.y,
        data: {
          ...diffCoords,
          placement
        }
      };
    }
  };
};

/**
 * Optimizes the visibility of the floating element by shifting it in order to
 * keep it in view when it will overflow the clipping boundary.
 * @see https://floating-ui.com/docs/shift
 */
const shift$1 = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'shift',
    options,
    async fn(state) {
      const {
        x,
        y,
        placement
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: _ref => {
            let {
              x,
              y
            } = _ref;
            return {
              x,
              y
            };
          }
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const coords = {
        x,
        y
      };
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const crossAxis = getSideAxis(getSide(placement));
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      if (checkMainAxis) {
        const minSide = mainAxis === 'y' ? 'top' : 'left';
        const maxSide = mainAxis === 'y' ? 'bottom' : 'right';
        const min = mainAxisCoord + overflow[minSide];
        const max = mainAxisCoord - overflow[maxSide];
        mainAxisCoord = clamp(min, mainAxisCoord, max);
      }
      if (checkCrossAxis) {
        const minSide = crossAxis === 'y' ? 'top' : 'left';
        const maxSide = crossAxis === 'y' ? 'bottom' : 'right';
        const min = crossAxisCoord + overflow[minSide];
        const max = crossAxisCoord - overflow[maxSide];
        crossAxisCoord = clamp(min, crossAxisCoord, max);
      }
      const limitedCoords = limiter.fn({
        ...state,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      });
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x,
          y: limitedCoords.y - y,
          enabled: {
            [mainAxis]: checkMainAxis,
            [crossAxis]: checkCrossAxis
          }
        }
      };
    }
  };
};

function hasWindow() {
  return typeof window !== 'undefined';
}
function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || '').toLowerCase();
  }
  // Mocked nodes in testing environments may not be instances of Node. By
  // returning `#document` an infinite loop won't occur.
  // https://github.com/floating-ui/floating-ui/issues/2317
  return '#document';
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
  if (!hasWindow() || typeof ShadowRoot === 'undefined') {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
const invalidOverflowDisplayValues = /*#__PURE__*/new Set(['inline', 'contents']);
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !invalidOverflowDisplayValues.has(display);
}
const tableElements = /*#__PURE__*/new Set(['table', 'td', 'th']);
function isTableElement(element) {
  return tableElements.has(getNodeName(element));
}
const topLayerSelectors = [':popover-open', ':modal'];
function isTopLayer(element) {
  return topLayerSelectors.some(selector => {
    try {
      return element.matches(selector);
    } catch (_e) {
      return false;
    }
  });
}
const transformProperties = ['transform', 'translate', 'scale', 'rotate', 'perspective'];
const willChangeValues = ['transform', 'translate', 'scale', 'rotate', 'perspective', 'filter'];
const containValues = ['paint', 'layout', 'strict', 'content'];
function isContainingBlock(elementOrCss) {
  const webkit = isWebKit();
  const css = isElement(elementOrCss) ? getComputedStyle(elementOrCss) : elementOrCss;

  // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
  // https://drafts.csswg.org/css-transforms-2/#individual-transforms
  return transformProperties.some(value => css[value] ? css[value] !== 'none' : false) || (css.containerType ? css.containerType !== 'normal' : false) || !webkit && (css.backdropFilter ? css.backdropFilter !== 'none' : false) || !webkit && (css.filter ? css.filter !== 'none' : false) || willChangeValues.some(value => (css.willChange || '').includes(value)) || containValues.some(value => (css.contain || '').includes(value));
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else if (isTopLayer(currentNode)) {
      return null;
    }
    currentNode = getParentNode(currentNode);
  }
  return null;
}
function isWebKit() {
  if (typeof CSS === 'undefined' || !CSS.supports) return false;
  return CSS.supports('-webkit-backdrop-filter', 'none');
}
const lastTraversableNodeNames = /*#__PURE__*/new Set(['html', 'body', '#document']);
function isLastTraversableNode(node) {
  return lastTraversableNodeNames.has(getNodeName(node));
}
function getComputedStyle(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.scrollX,
    scrollTop: element.scrollY
  };
}
function getParentNode(node) {
  if (getNodeName(node) === 'html') {
    return node;
  }
  const result =
  // Step into the shadow DOM of the parent of a slotted node.
  node.assignedSlot ||
  // DOM Element detected.
  node.parentNode ||
  // ShadowRoot detected.
  isShadowRoot(node) && node.host ||
  // Fallback.
  getDocumentElement(node);
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    getFrameElement(win);
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], []);
  }
  return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, []));
}
function getFrameElement(win) {
  return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
}

function getCssDimensions(element) {
  const css = getComputedStyle(element);
  // In testing environments, the `width` and `height` properties are empty
  // strings for SVG elements, returning NaN. Fallback to `0` in this case.
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}

function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element;
}

function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $
  } = getCssDimensions(domElement);
  let x = ($ ? round(rect.width) : rect.width) / width;
  let y = ($ ? round(rect.height) : rect.height) / height;

  // 0, NaN, or Infinity should always fallback to 1.

  if (!x || !Number.isFinite(x)) {
    x = 1;
  }
  if (!y || !Number.isFinite(y)) {
    y = 1;
  }
  return {
    x,
    y
  };
}

const noOffsets = /*#__PURE__*/createCoords(0);
function getVisualOffsets(element) {
  const win = getWindow(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
    return false;
  }
  return isFixed;
}

function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x = (clientRect.left + visualOffsets.x) / scale.x;
  let y = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
    let currentWin = win;
    let currentIFrame = getFrameElement(currentWin);
    while (currentIFrame && offsetParent && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x *= iframeScale.x;
      y *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x += left;
      y += top;
      currentWin = getWindow(currentIFrame);
      currentIFrame = getFrameElement(currentWin);
    }
  }
  return rectToClientRect({
    width,
    height,
    x,
    y
  });
}

// If <html> has a CSS width greater than the viewport, then this will be
// incorrect for RTL.
function getWindowScrollBarX(element, rect) {
  const leftScroll = getNodeScroll(element).scrollLeft;
  if (!rect) {
    return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
  }
  return rect.left + leftScroll;
}

function getHTMLOffset(documentElement, scroll, ignoreScrollbarX) {
  if (ignoreScrollbarX === void 0) {
    ignoreScrollbarX = false;
  }
  const htmlRect = documentElement.getBoundingClientRect();
  const x = htmlRect.left + scroll.scrollLeft - (ignoreScrollbarX ? 0 :
  // RTL <body> scrollbar.
  getWindowScrollBarX(documentElement, htmlRect));
  const y = htmlRect.top + scroll.scrollTop;
  return {
    x,
    y
  };
}

function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    elements,
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isFixed = strategy === 'fixed';
  const documentElement = getDocumentElement(offsetParent);
  const topLayer = elements ? isTopLayer(elements.floating) : false;
  if (offsetParent === documentElement || topLayer && isFixed) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll, true) : createCoords(0);
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
  };
}

function getClientRects(element) {
  return Array.from(element.getClientRects());
}

// Gets the entire size of the scrollable document area, even extending outside
// of the `<html>` and `<body>` rect bounds if horizontally scrollable.
function getDocumentRect(element) {
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = element.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y = -scroll.scrollTop;
  if (getComputedStyle(body).direction === 'rtl') {
    x += max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}

function getViewportRect(element, strategy) {
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || visualViewportBased && strategy === 'fixed') {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x,
    y
  };
}

const absoluteOrFixed = /*#__PURE__*/new Set(['absolute', 'fixed']);
// Returns the inner client rect, subtracting scrollbars if present.
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === 'fixed');
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x = left * scale.x;
  const y = top * scale.y;
  return {
    width,
    height,
    x,
    y
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === 'viewport') {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === 'document') {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y,
      width: clippingAncestor.width,
      height: clippingAncestor.height
    };
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element);
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle(parentNode).position === 'fixed' || hasFixedPositionAncestor(parentNode, stopNode);
}

// A "clipping ancestor" is an `overflow` element with the characteristic of
// clipping (or hiding) child elements. This returns all clipping ancestors
// of the given element up the tree.
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element, []).filter(el => isElement(el) && getNodeName(el) !== 'body');
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle(element).position === 'fixed';
  let currentNode = elementIsFixed ? getParentNode(element) : element;

  // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === 'fixed') {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === 'static' && !!currentContainingBlockComputedStyle && absoluteOrFixed.has(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      // Drop non-containing blocks.
      result = result.filter(ancestor => ancestor !== currentNode);
    } else {
      // Record last containing block for next iteration.
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element, result);
  return result;
}

// Gets the maximum area that the element is visible in due to any number of
// clipping ancestors.
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === 'clippingAncestors' ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstClippingAncestor = clippingAncestors[0];
  const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top
  };
}

function getDimensions(element) {
  const {
    width,
    height
  } = getCssDimensions(element);
  return {
    width,
    height
  };
}

function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === 'fixed';
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);

  // If the <body> scrollbar appears on the left (e.g. RTL systems). Use
  // Firefox with layout.scrollbar.side = 3 in about:config to test this.
  function setLeftRTLScrollbarOffset() {
    offsets.x = getWindowScrollBarX(documentElement);
  }
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      setLeftRTLScrollbarOffset();
    }
  }
  if (isFixed && !isOffsetParentAnElement && documentElement) {
    setLeftRTLScrollbarOffset();
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
  const x = rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x;
  const y = rect.top + scroll.scrollTop - offsets.y - htmlOffset.y;
  return {
    x,
    y,
    width: rect.width,
    height: rect.height
  };
}

function isStaticPositioned(element) {
  return getComputedStyle(element).position === 'static';
}

function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement(element) || getComputedStyle(element).position === 'fixed') {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  let rawOffsetParent = element.offsetParent;

  // Firefox returns the <html> element as the offsetParent if it's non-static,
  // while Chrome and Safari return the <body> element. The <body> element must
  // be used to perform the correct calculations even if the <html> element is
  // non-static.
  if (getDocumentElement(element) === rawOffsetParent) {
    rawOffsetParent = rawOffsetParent.ownerDocument.body;
  }
  return rawOffsetParent;
}

// Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.
function getOffsetParent(element, polyfill) {
  const win = getWindow(element);
  if (isTopLayer(element)) {
    return win;
  }
  if (!isHTMLElement(element)) {
    let svgOffsetParent = getParentNode(element);
    while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
      if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
        return svgOffsetParent;
      }
      svgOffsetParent = getParentNode(svgOffsetParent);
    }
    return win;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
    return win;
  }
  return offsetParent || getContainingBlock(element) || win;
}

const getElementRects = async function (data) {
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  const floatingDimensions = await getDimensionsFn(data.floating);
  return {
    reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
    floating: {
      x: 0,
      y: 0,
      width: floatingDimensions.width,
      height: floatingDimensions.height
    }
  };
};

function isRTL(element) {
  return getComputedStyle(element).direction === 'rtl';
}

const platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement,
  isRTL
};

/**
 * Modifies the placement by translating the floating element along the
 * specified axes.
 * A number (shorthand for `mainAxis` or distance), or an axes configuration
 * object may be passed.
 * @see https://floating-ui.com/docs/offset
 */
const offset = offset$1;

/**
 * Optimizes the visibility of the floating element by shifting it in order to
 * keep it in view when it will overflow the clipping boundary.
 * @see https://floating-ui.com/docs/shift
 */
const shift = shift$1;

/**
 * Optimizes the visibility of the floating element by flipping the `placement`
 * in order to keep it in view when the preferred placement(s) will overflow the
 * clipping boundary. Alternative to `autoPlacement`.
 * @see https://floating-ui.com/docs/flip
 */
const flip = flip$1;

/**
 * Provides data to position an inner element of the floating element so that it
 * appears centered to the reference element.
 * @see https://floating-ui.com/docs/arrow
 */
const arrow = arrow$1;

/**
 * Computes the `x` and `y` coordinates that will place the floating element
 * next to a given reference element.
 */
const computePosition = (reference, floating, options) => {
  // This caches the expensive `getClippingElementAncestors` function so that
  // multiple lifecycle resets re-use the same result. It only lives for a
  // single call. If other functions become expensive, we can add them as well.
  const cache = new Map();
  const mergedOptions = {
    platform,
    ...options
  };
  const platformWithCache = {
    ...mergedOptions.platform,
    _c: cache
  };
  return computePosition$1(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache
  });
};

/**
 * A lightweight, reusable tooltip component for Preact powered by Floating UI.
 *
 * @param {object} props - The component props.
 * @param {preact.ComponentChildren} props.children - The single child element that triggers the tooltip.
 * @param {string | preact.VNode} props.content - The content to display inside the tooltip.
 * @param {'top'|'bottom'|'left'|'right'} [props.placement='top'] - The desired placement of the tooltip.
 */
const Tooltip = ({ children, content, placement = 'top-start' }) => {
    const [isVisible, setIsVisible] = p$3(false);
    // Create refs for the trigger and the floating tooltip elements
    const triggerRef = F$1(null);
    const tooltipRef = F$1(null);
    const arrowRef = F$1(null);
    const showTooltip = () => setIsVisible(true);
    const hideTooltip = () => setIsVisible(false);
    // This effect calculates the tooltip's position whenever it becomes visible
    // or if its content or placement changes.
    _$1(() => {
        if (!isVisible || !triggerRef.current || !tooltipRef.current) {
            return;
        }
        const trigger = triggerRef.current;
        const tooltip = tooltipRef.current;
        computePosition(trigger, tooltip, {
            placement,
            // Middleware runs in order to modify the position
            middleware: [
                offset(8), // Add 8px of space between the trigger and tooltip
                flip(), // Flip to the opposite side if it overflows
                shift({ padding: 5 }), // Shift to keep it in view
                ...(arrowRef.current ? [arrow({ element: arrowRef.current })] : []), // Handle arrow positioning
            ],
        }).then(({ x, y, placement, middlewareData }) => {
            // Apply the calculated coordinates to the tooltip element
            Object.assign(tooltip.style, {
                left: `${x}px`,
                top: `${y}px`,
            });
            // Position the arrow element
            if (middlewareData.arrow && arrowRef.current) {
                const { x: arrowX, y: arrowY } = middlewareData.arrow;
                const side = placement.split('-')[0];
                const staticSide = {
                    top: 'bottom',
                    right: 'left',
                    bottom: 'top',
                    left: 'right',
                }[side];
                const arrowElement = arrowRef.current;
                // Reset all positioning properties
                Object.assign(arrowElement.style, {
                    left: '',
                    top: '',
                    right: '',
                    bottom: '',
                });
                // For placements like top-start, bottom-start, etc., we want the arrow 
                // to be centered on the tooltip rather than pointing at the trigger center
                if (placement.includes('-start') || placement.includes('-end')) {
                    const tooltipRect = tooltip.getBoundingClientRect();
                    if (side === 'top' || side === 'bottom') {
                        // For top/bottom placements, center the arrow horizontally
                        arrowElement.style.left = `${14}px`; // 4px = half arrow width
                        if (arrowY != null) {
                            arrowElement.style.top = `${arrowY}px`;
                        }
                    }
                    else {
                        // For left/right placements, center the arrow vertically
                        arrowElement.style.top = `${tooltipRect.height / 2 - 4}px`; // 4px = half arrow height
                        if (arrowX != null) {
                            arrowElement.style.left = `${arrowX}px`;
                        }
                    }
                }
                else {
                    // For regular placements (top, bottom, left, right), use floating-ui's positioning
                    if (arrowX != null) {
                        arrowElement.style.left = `${arrowX}px`;
                    }
                    if (arrowY != null) {
                        arrowElement.style.top = `${arrowY}px`;
                    }
                }
                // Position arrow to overlap the tooltip's border
                arrowElement.style[staticSide] = '-4px';
            }
        });
    }, [isVisible, placement, content]);
    // We need to clone the child element to attach our ref and event listeners.
    // This ensures we don't wrap the child in an extra <div>.
    const triggerWithListeners = F$2(children, {
        ref: triggerRef,
        onMouseEnter: showTooltip,
        onMouseLeave: hideTooltip,
        onFocus: showTooltip,
        onBlur: hideTooltip,
        'aria-describedby': 'lightweight-tooltip' // for accessibility
    });
    return (u(g$4, { children: [triggerWithListeners, isVisible && (u("div", { ref: tooltipRef, role: "tooltip", id: "lightweight-tooltip", className: classNames("tooltip-container", visualBuilderStyles()["tooltip-container"]), children: [content, u("div", { ref: arrowRef, className: classNames("tooltip-arrow", visualBuilderStyles()["tooltip-arrow"]) })] }))] }));
};
function ToolbarTooltipContent({ contentTypeName, referenceFieldName }) {
    return (u("div", { className: classNames("toolbar-tooltip-content", visualBuilderStyles()["toolbar-tooltip-content"]), children: [contentTypeName && (u("div", { className: classNames("toolbar-tooltip-content-item", visualBuilderStyles()["toolbar-tooltip-content-item"]), children: [u(ContentTypeIcon, {}), u("p", { children: contentTypeName })] })), referenceFieldName && (u("div", { className: classNames("toolbar-tooltip-content-item", visualBuilderStyles()["toolbar-tooltip-content-item"]), children: [u("div", { dangerouslySetInnerHTML: { __html: FieldTypeIconsMap.reference }, className: classNames("visual-builder__field-icon", visualBuilderStyles()["visual-builder__field-icon"]) }), u("p", { children: referenceFieldName })] }))] }));
}
function ToolbarTooltip({ children, data, disabled = false }) {
    if (disabled) {
        return children;
    }
    const { contentTypeName, referenceFieldName } = data;
    return (u(Tooltip, { content: u(ToolbarTooltipContent, { contentTypeName: contentTypeName, referenceFieldName: referenceFieldName }), children: children }));
}

async function getFieldDisplayNames(fieldMetadata) {
    const result = await visualBuilderPostMessage$1?.send(VisualBuilderPostMessageEvents.GET_FIELD_DISPLAY_NAMES, fieldMetadata);
    return result;
}
async function getContentTypeName(contentTypeUid) {
    try {
        const result = await visualBuilderPostMessage$1?.send(VisualBuilderPostMessageEvents.GET_CONTENT_TYPE_NAME, {
            content_type_uid: contentTypeUid,
        });
        return result?.contentTypeName;
    }
    catch (e) {
        console.warn("[getFieldLabelWrapper] Error getting content type name", e);
        return "";
    }
}
async function getReferenceParentMap() {
    try {
        const result = await visualBuilderPostMessage$1?.send(VisualBuilderPostMessageEvents.REFERENCE_MAP, {}) ?? {};
        return result;
    }
    catch (e) {
        console.warn("[getFieldLabelWrapper] Error getting reference parent map", e);
        return {};
    }
}
function FieldLabelWrapperComponent(props) {
    const { eventDetails } = props;
    const [currentField, setCurrentField] = p$3({
        text: "",
        contentTypeName: "",
        icon: u(CaretIcon, {}),
        prefixIcon: null,
        disabled: false,
        isVariant: false,
        isReference: false,
        referenceFieldName: "",
        parentContentTypeName: "",
    });
    const [displayNames, setDisplayNames] = p$3({});
    const [dataLoading, setDataLoading] = p$3(true);
    const [error, setError] = p$3(false);
    const [isDropdownOpen, setIsDropdownOpen] = p$3(false);
    function calculateTopOffset(index) {
        const height = -30; // from bottom
        const offset = (index + 1) * height;
        return `${offset}px`;
    }
    _$1(() => {
        const fetchData = async () => {
            setDataLoading(true);
            const allPaths = uniqBy([
                props.fieldMetadata,
                ...props.parentPaths.map((path) => {
                    return extractDetailsFromCslp(path);
                }),
            ], "cslpValue");
            const [displayNames, fieldSchema, contentTypeName, referenceParentMap] = await Promise.all([
                getFieldDisplayNames(allPaths),
                FieldSchemaMap.getFieldSchema(props.fieldMetadata.content_type_uid, props.fieldMetadata.fieldPath),
                getContentTypeName(props.fieldMetadata.content_type_uid),
                getReferenceParentMap()
            ]);
            const entryUid = props.fieldMetadata.entry_uid;
            const referenceData = referenceParentMap[entryUid];
            const isReference = !!referenceData;
            let referenceFieldName = referenceData ? referenceData[0].referenceFieldName : "";
            let parentContentTypeName = referenceData ? referenceData[0].contentTypeTitle : "";
            if (isReference) {
                const domAncestor = eventDetails.editableElement.closest(`[data-cslp]:not([data-cslp^="${props.fieldMetadata.content_type_uid}"])`);
                if (domAncestor) {
                    const domAncestorCslp = domAncestor.getAttribute("data-cslp");
                    const domAncestorDetails = extractDetailsFromCslp(domAncestorCslp);
                    const domAncestorContentTypeUid = domAncestorDetails.content_type_uid;
                    const domAncestorContentParent = referenceData?.find(data => data.contentTypeUid === domAncestorContentTypeUid);
                    if (domAncestorContentParent) {
                        referenceFieldName = domAncestorContentParent.referenceFieldName;
                        parentContentTypeName = domAncestorContentParent.contentTypeTitle;
                    }
                }
            }
            if (hasPostMessageError(displayNames) || !fieldSchema) {
                setDataLoading(false);
                setError(true);
                return;
            }
            const entryPermissions = await getEntryPermissionsCached({
                entryUid: props.fieldMetadata.entry_uid,
                contentTypeUid: props.fieldMetadata.content_type_uid,
                locale: props.fieldMetadata.locale,
            });
            const { isDisabled: fieldDisabled, reason } = isFieldDisabled(fieldSchema, eventDetails, entryPermissions);
            const currentFieldDisplayName = displayNames?.[props.fieldMetadata.cslpValue] ??
                fieldSchema.display_name;
            const hasParentPaths = !!props?.parentPaths?.length;
            const isVariant = props.fieldMetadata.variant ? true : false;
            setCurrentField({
                text: currentFieldDisplayName,
                contentTypeName: contentTypeName ?? "",
                icon: fieldDisabled ? (u("div", { className: classNames(visualBuilderStyles()["visual-builder__tooltip--persistent"]), "data-tooltip": reason, children: u(InfoIcon, {}) })) : hasParentPaths ? (u(CaretIcon, {})) : (u(g$4, {})),
                isReference,
                prefixIcon: getFieldIcon(fieldSchema),
                disabled: fieldDisabled,
                referenceFieldName,
                parentContentTypeName,
                isVariant: isVariant,
            });
            if (displayNames) {
                setDisplayNames(displayNames);
            }
            if (Object.keys(displayNames || {})?.length === allPaths.length) {
                setDataLoading(false);
            }
        };
        try {
            fetchData();
        }
        catch (e) {
            console.warn("[getFieldLabelWrapper] Error fetching field label data", e);
        }
    }, [props]);
    const onParentPathClick = (cslp) => {
        const parentElement = props.getParentEditableElement(cslp);
        if (parentElement) {
            // emulate clicking on the parent element
            parentElement.click();
        }
    };
    function getCurrentFieldIcon() {
        if (error) {
            return null;
        }
        else if (dataLoading) {
            return u(LoadingIcon, {});
        }
        else {
            return currentField.icon;
        }
    }
    return (u("div", { className: classNames("visual-builder__focused-toolbar__field-label-container", visualBuilderStyles()["visual-builder__focused-toolbar__field-label-container"]), children: u(ToolbarTooltip, { data: { contentTypeName: currentField.parentContentTypeName, referenceFieldName: currentField.referenceFieldName }, disabled: !currentField.isReference || isDropdownOpen, children: u("div", { className: classNames("visual-builder__focused-toolbar__field-label-wrapper", visualBuilderStyles()["visual-builder__focused-toolbar__field-label-wrapper"], {
                    "visual-builder__focused-toolbar--field-disabled": currentField.disabled,
                }, {
                    [visualBuilderStyles()["visual-builder__focused-toolbar--field-disabled"]]: currentField.disabled,
                }, {
                    "field-label-dropdown-open": isDropdownOpen,
                    [visualBuilderStyles()["field-label-dropdown-open"]]: isDropdownOpen,
                }), onClick: () => setIsDropdownOpen((prev) => !prev), "data-testid": "visual-builder__focused-toolbar__field-label-wrapper", "data-hovered-cslp": props.fieldMetadata.cslpValue, children: [u("button", { className: classNames("visual-builder__focused-toolbar__field-label-wrapper__current-field visual-builder__button visual-builder__button--primary visual-builder__button-loader", visualBuilderStyles()["visual-builder__focused-toolbar__field-label-wrapper__current-field"], visualBuilderStyles()["visual-builder__button"], visualBuilderStyles()["visual-builder__button--primary"], visualBuilderStyles()["visual-builder__button-loader"], error &&
                            visualBuilderStyles()["visual-builder__button-error"]), disabled: dataLoading, children: [currentField.isReference && !dataLoading && !error ?
                                u("div", { className: classNames("visual-builder__reference-icon-container", visualBuilderStyles()["visual-builder__reference-icon-container"]), children: [u("div", { className: classNames("visual-builder__field-icon", visualBuilderStyles()["visual-builder__field-icon"]), dangerouslySetInnerHTML: {
                                                __html: FieldTypeIconsMap.reference,
                                            }, "data-testid": "visual-builder__field-icon-caret" }), u(CaretRightIcon, {})] }) : null, currentField.contentTypeName && !dataLoading && !error ?
                                u(g$4, { children: [u(ContentTypeIcon, {}), u("div", { className: classNames("visual-builder__focused-toolbar__text", visualBuilderStyles()["visual-builder__focused-toolbar__text"]), "data-testid": "visual-builder__focused-toolbar__ct-name", children: currentField.contentTypeName + " : " })] }) : null, currentField.prefixIcon ? (u("div", { className: classNames("visual-builder__field-icon", visualBuilderStyles()["visual-builder__field-icon"]), dangerouslySetInnerHTML: {
                                    __html: currentField.prefixIcon,
                                }, "data-testid": "visual-builder__field-icon" })) : null, currentField.text ? (u("div", { className: classNames("visual-builder__focused-toolbar__text", visualBuilderStyles()["visual-builder__focused-toolbar__text"]), "data-testid": "visual-builder__focused-toolbar__text", children: currentField.text })) : null, getCurrentFieldIcon(), error ? u(CslpError, {}) : null] }), props.parentPaths.map((path, index) => (u("button", { className: classNames("visual-builder__focused-toolbar__field-label-wrapper__parent-field visual-builder__button visual-builder__button--secondary visual-builder__focused-toolbar__text", visualBuilderStyles()["visual-builder__focused-toolbar__field-label-wrapper__parent-field"], visualBuilderStyles()["visual-builder__button"], visualBuilderStyles()["visual-builder__button--secondary"], visualBuilderStyles()["visual-builder__focused-toolbar__text"]), "data-target-cslp": path, style: { top: calculateTopOffset(index) }, onClick: () => onParentPathClick(path), children: displayNames[path] }, path)))] }) }) }));
}

function appendFocusedToolbar(eventDetails, focusedToolbarElement, hideOverlay, isVariant = false, options) {
    appendFieldPathDropdown(eventDetails, focusedToolbarElement, options);
    if (options?.isHover) {
        return;
    }
    appendFieldToolbar(eventDetails, focusedToolbarElement, hideOverlay, isVariant);
}
async function appendFieldToolbar(eventDetails, focusedToolbarElement, hideOverlay, isVariant = false, options) {
    const { isHover } = {};
    if (focusedToolbarElement.querySelector(".visual-builder__focused-toolbar__multiple-field-toolbar") && !isHover)
        return;
    const entryPermissions = await getEntryPermissionsCached({
        entryUid: eventDetails.fieldMetadata.entry_uid,
        contentTypeUid: eventDetails.fieldMetadata.content_type_uid,
        locale: eventDetails.fieldMetadata.locale,
    });
    const wrapper = document.createDocumentFragment();
    B$2(u(FieldToolbarComponent, { eventDetails: eventDetails, hideOverlay: hideOverlay, isVariant: isVariant, entryPermissions: entryPermissions }), wrapper);
    focusedToolbarElement.append(wrapper);
}
function appendFieldPathDropdown(eventDetails, focusedToolbarElement, options) {
    const { isHover } = options || {};
    const fieldLabelWrapper = document.querySelector(".visual-builder__focused-toolbar__field-label-wrapper");
    const { editableElement: targetElement, fieldMetadata } = eventDetails;
    if (fieldLabelWrapper) {
        if (isHover) {
            const fieldCslp = fieldLabelWrapper.getAttribute("data-hovered-cslp");
            if (fieldCslp === fieldMetadata.cslpValue) {
                return;
            }
            else {
                removeFieldToolbar(focusedToolbarElement);
            }
        }
        else {
            return;
        }
    }
    const targetElementDimension = targetElement.getBoundingClientRect();
    const distanceFromTop = targetElementDimension.top + window.scrollY - TOOLBAR_EDGE_BUFFER;
    // Position the toolbar at the top unless there's insufficient space or scrolling up is not possible (topmost element targetted).
    const adjustedDistanceFromTop = targetElementDimension.top + window.scrollY < TOP_EDGE_BUFFER
        ? distanceFromTop + targetElementDimension.height + TOP_EDGE_BUFFER
        : distanceFromTop;
    const distanceFromLeft = targetElementDimension.left - LIVE_PREVIEW_OUTLINE_WIDTH_IN_PX;
    const adjustedDistanceFromLeft = Math.max(distanceFromLeft, TOOLBAR_EDGE_BUFFER);
    const targetElementRightEdgeOffset = window.scrollX + window.innerWidth - targetElementDimension.left;
    if (targetElementRightEdgeOffset < RIGHT_EDGE_BUFFER) {
        // Overflow / Cutoff on right edge
        focusedToolbarElement.style.justifyContent = "flex-end";
        focusedToolbarElement.style.left = `${targetElementDimension.right + LIVE_PREVIEW_OUTLINE_WIDTH_IN_PX}px`;
    }
    else {
        focusedToolbarElement.style.justifyContent = "flex-start"; // default
        focusedToolbarElement.style.left = `${adjustedDistanceFromLeft}px`;
    }
    focusedToolbarElement.style.top = `${adjustedDistanceFromTop}px`;
    const parentPaths = collectParentCSLPPaths(targetElement, 2);
    const wrapper = document.createDocumentFragment();
    B$2(u(FieldLabelWrapperComponent, { fieldMetadata: fieldMetadata, eventDetails: eventDetails, parentPaths: parentPaths, getParentEditableElement: (cslp) => {
            const parentElement = targetElement.closest(`[${DATA_CSLP_ATTR_SELECTOR}="${cslp}"]`);
            return parentElement;
        } }), wrapper);
    focusedToolbarElement.appendChild(wrapper);
}
function collectParentCSLPPaths(targetElement, count) {
    const cslpPaths = [];
    let currentElement = targetElement.parentElement;
    while (count > 0 || currentElement === window.document.body) {
        if (!currentElement) {
            return cslpPaths;
        }
        if (currentElement.hasAttribute(DATA_CSLP_ATTR_SELECTOR)) {
            cslpPaths.push(currentElement.getAttribute(DATA_CSLP_ATTR_SELECTOR));
            count--;
        }
        currentElement = currentElement.parentElement;
    }
    return cslpPaths;
}
function removeFieldToolbar(toolbar) {
    toolbar.innerHTML = "";
    const toolbarEvents = [
        VisualBuilderPostMessageEvents.DELETE_INSTANCE,
        VisualBuilderPostMessageEvents.UPDATE_DISCUSSION_ID,
        VisualBuilderPostMessageEvents.FIELD_LOCATION_DATA
    ];
    toolbarEvents.forEach((event) => {
        //@ts-expect-error - We are accessing private method here, but it is necessary to clean up the event listeners.
        if (visualBuilderPostMessage$1?.requestMessageHandlers?.has(event)) {
            //@ts-expect-error - We are accessing private method here, but it is necessary to clean up the event listeners.
            visualBuilderPostMessage$1?.unregisterEvent?.(event);
        }
    });
}

const config = Config.get();
function resetCustomCursor(customCursor) {
    if (customCursor) {
        generateCustomCursor({
            fieldType: "empty",
            customCursor: customCursor,
        });
    }
}
function collabCustomCursor(customCursor) {
    if (!customCursor)
        return;
    generateCustomCursor({
        fieldType: "discussion",
        customCursor: customCursor,
    });
}
function handleCursorPosition(event, customCursor) {
    if (customCursor) {
        const mouseY = event.clientY;
        const mouseX = event.clientX;
        customCursor.style.left = `${mouseX}px`;
        customCursor.style.top = `${mouseY}px`;
    }
}
function addOutline(params) {
    if (!params) {
        return;
    }
    const { editableElement, eventDetails, content_type_uid, fieldPath, fieldMetadata, fieldDisabled } = params;
    if (!editableElement)
        return;
    addHoverOutline(editableElement, fieldDisabled);
    FieldSchemaMap.getFieldSchema(content_type_uid, fieldPath).then((fieldSchema) => {
        let entryAcl;
        if (!fieldSchema)
            return;
        getEntryPermissionsCached({
            entryUid: fieldMetadata.entry_uid,
            contentTypeUid: fieldMetadata.content_type_uid,
            locale: fieldMetadata.locale,
        })
            .then((data) => {
            entryAcl = data;
        })
            .catch((error) => {
            console.error("[Visual Builder] Error retrieving entry permissions:", error);
        })
            .finally(() => {
            const { isDisabled: fieldDisabled } = isFieldDisabled(fieldSchema, eventDetails, entryAcl);
            addHoverOutline(editableElement, fieldDisabled);
        });
    });
}
const debouncedAddOutline = debounce(addOutline, 50, { trailing: true });
const showOutline = (params) => debouncedAddOutline(params);
function hideDefaultCursor() {
    if (document?.body &&
        !document.body.classList.contains(visualBuilderStyles()["visual-builder__default-cursor--disabled"]))
        document.body.classList.add(visualBuilderStyles()["visual-builder__default-cursor--disabled"]);
}
function showDefaultCursor() {
    if (document?.body &&
        document.body.classList.contains(visualBuilderStyles()["visual-builder__default-cursor--disabled"]))
        document.body.classList.remove(visualBuilderStyles()["visual-builder__default-cursor--disabled"]);
}
function hideHoverOutline(visualBuilderContainer) {
    if (!visualBuilderContainer) {
        return;
    }
    const hoverOutline = visualBuilderContainer.querySelector(".visual-builder__hover-outline");
    if (!hoverOutline) {
        return;
    }
    hoverOutline.classList.add(visualBuilderStyles()["visual-builder__hover-outline--hidden"]);
}
function hideCustomCursor(customCursor) {
    showDefaultCursor();
    customCursor?.classList.remove("visible");
}
function showCustomCursor(customCursor) {
    hideDefaultCursor();
    if (config.collab.enable &&
        (!config.collab.isFeedbackMode || config.collab.pauseFeedback))
        return;
    customCursor?.classList.add("visible");
}
const debouncedRenderHoverToolbar = debounce(async (params) => {
    const eventDetails = getCsDataOfElement(params.event);
    if (!eventDetails ||
        !params.overlayWrapper ||
        !params.visualBuilderContainer ||
        !params.focusedToolbar) {
        return;
    }
    appendFieldPathDropdown(eventDetails, params.focusedToolbar, {
        isHover: true
    });
}, 50, { trailing: true });
const showHoverToolbar = async (params) => await debouncedRenderHoverToolbar(params);
function isOverlay(target) {
    return target.classList.contains("visual-builder__overlay");
}
function isContentEditable(target) {
    if (target.hasAttribute("contenteditable"))
        return target.getAttribute("contenteditable") === "true";
    return false;
}
function isFieldPathDropdown(target) {
    return target.classList.contains("visual-builder__focused-toolbar__field-label-wrapper") || target.classList.contains("visual-builder__focused-toolbar__field-label-wrapper__current-field");
}
function isFieldPathParent(target) {
    return target.classList.contains("visual-builder__focused-toolbar__field-label-wrapper__parent-field");
}
const throttledMouseHover = throttle(async (params) => {
    const eventDetails = getCsDataOfElement(params.event);
    const eventTarget = params.event.target;
    if (config?.collab.enable && config?.collab.pauseFeedback) {
        hideCustomCursor(params.customCursor);
        return;
    }
    if (!eventDetails) {
        if (eventTarget &&
            (isOverlay(eventTarget) ||
                isContentEditable(eventTarget) ||
                isCollabThread(eventTarget))) {
            handleCursorPosition(params.event, params.customCursor);
            hideCustomCursor(params.customCursor);
            return;
        }
        if (eventTarget &&
            (isFieldPathDropdown(eventTarget) || isFieldPathParent(eventTarget))) {
            params.customCursor && hideCustomCursor(params.customCursor);
            showOutline();
            showHoverToolbar({
                event: params.event,
                overlayWrapper: params.overlayWrapper,
                visualBuilderContainer: params.visualBuilderContainer,
                previousSelectedEditableDOM: VisualBuilder.VisualBuilderGlobalState.value
                    .previousSelectedEditableDOM,
                focusedToolbar: params.focusedToolbar,
                resizeObserver: params.resizeObserver,
            });
        }
        if (!config?.collab.enable) {
            resetCustomCursor(params.customCursor);
        }
        removeAddInstanceButtons({
            eventTarget: params.event.target,
            visualBuilderContainer: params.visualBuilderContainer,
            overlayWrapper: params.overlayWrapper,
        });
        handleCursorPosition(params.event, params.customCursor);
        if (config?.collab.enable && config?.collab.isFeedbackMode) {
            showCustomCursor(params.customCursor);
            collabCustomCursor(params.customCursor);
        }
        return;
    }
    const { editableElement, fieldMetadata } = eventDetails;
    const { content_type_uid, fieldPath } = fieldMetadata;
    if (VisualBuilder.VisualBuilderGlobalState.value
        .previousSelectedEditableDOM &&
        VisualBuilder.VisualBuilderGlobalState.value.previousSelectedEditableDOM.isSameNode(editableElement)) {
        hideCustomCursor(params.customCursor);
        return;
    }
    if (params.customCursor) {
        const elementUnderCursor = document.elementFromPoint(params.event.clientX, params.event.clientY);
        if (elementUnderCursor) {
            if (elementUnderCursor.nodeName === "A" ||
                elementUnderCursor.nodeName === "BUTTON") {
                elementUnderCursor.classList.add(visualBuilderStyles()["visual-builder__no-cursor-style"]);
            }
        }
        if (config?.collab.enable && config?.collab.isFeedbackMode) {
            collabCustomCursor(params.customCursor);
            handleCursorPosition(params.event, params.customCursor);
            showCustomCursor(params.customCursor);
            return;
        }
        else if (config?.collab.enable &&
            !config?.collab.isFeedbackMode) {
            hideCustomCursor(params.customCursor);
            return;
        }
        if (VisualBuilder.VisualBuilderGlobalState.value
            .previousHoveredTargetDOM !== editableElement) {
            resetCustomCursor(params.customCursor);
            removeAddInstanceButtons({
                eventTarget: params.event.target,
                visualBuilderContainer: params.visualBuilderContainer,
                overlayWrapper: params.overlayWrapper,
            });
        }
        if (!FieldSchemaMap.hasFieldSchema(content_type_uid, fieldPath)) {
            generateCustomCursor({
                fieldType: "loading",
                customCursor: params.customCursor,
            });
        }
        /**
         * We called it seperately inside the code block to ensure that
         * the code will not wait for the promise to resolve.
         * If we get a cache miss, we will send a message to the iframe
         * without blocking the code.
         */
        FieldSchemaMap.getFieldSchema(content_type_uid, fieldPath).then((fieldSchema) => {
            if (!fieldSchema)
                return;
            let entryAcl;
            getEntryPermissionsCached({
                entryUid: fieldMetadata.entry_uid,
                contentTypeUid: fieldMetadata.content_type_uid,
                locale: fieldMetadata.locale,
            })
                .then((data) => {
                entryAcl = data;
            })
                .catch((error) => {
                console.error("[Visual Builder] Error retrieving entry permissions:", error);
            })
                .finally(() => {
                if (!params.customCursor)
                    return;
                const { isDisabled: fieldDisabled } = isFieldDisabled(fieldSchema, eventDetails, entryAcl);
                const fieldType = getFieldType(fieldSchema);
                generateCustomCursor({
                    fieldType,
                    customCursor: params.customCursor,
                    fieldDisabled,
                });
            });
        });
        handleCursorPosition(params.event, params.customCursor);
        showCustomCursor(params.customCursor);
    }
    if (!editableElement.classList.contains(VB_EmptyBlockParentClass) &&
        !editableElement.classList.contains("visual-builder__empty-block")) {
        showOutline({
            editableElement,
            eventDetails,
            content_type_uid,
            fieldPath,
            fieldMetadata,
        });
        const isFocussed = VisualBuilder.VisualBuilderGlobalState.value.isFocussed;
        if (!isFocussed) {
            showHoverToolbar({
                event: params.event,
                overlayWrapper: params.overlayWrapper,
                visualBuilderContainer: params.visualBuilderContainer,
                previousSelectedEditableDOM: VisualBuilder.VisualBuilderGlobalState.value
                    .previousSelectedEditableDOM,
                focusedToolbar: params.focusedToolbar,
                resizeObserver: params.resizeObserver,
            });
        }
    }
    if (VisualBuilder.VisualBuilderGlobalState.value
        .previousHoveredTargetDOM === editableElement) {
        return;
    }
    VisualBuilder.VisualBuilderGlobalState.value.previousHoveredTargetDOM =
        editableElement;
}, 10);
const handleMouseHover = async (params) => await throttledMouseHover(params);

const WAIT_FOR_NEW_INSTANCE_TIMEOUT = 4000;
/**
 * The function that handles the add instance buttons for multiple fields.
 * @param eventDetails The details containing the field metadata and cslp value.
 * @param elements The elements object that contain the editable element and visual builder wrapper.
 * @param config The configuration object that contains the expected field data and disabled state.
 * @returns void
 */
function handleAddButtonsForMultiple(eventDetails, elements, config) {
    const { editableElement, visualBuilderContainer, resizeObserver } = elements;
    const { expectedFieldData, fieldSchema, disabled, label } = config;
    const parentCslpValue = eventDetails.fieldMetadata.multipleFieldMetadata?.parentDetails
        ?.parentCslpValue;
    if (!editableElement || !parentCslpValue) {
        return;
    }
    const direction = getChildrenDirection(editableElement, parentCslpValue);
    if (direction === "none" || !visualBuilderContainer) {
        return;
    }
    const targetDOMDimension = editableElement.getBoundingClientRect();
    removeAddInstanceButtons({
        visualBuilderContainer: visualBuilderContainer,
        eventTarget: null,
        overlayWrapper: null,
    }, true);
    const overlayWrapper = visualBuilderContainer.querySelector(".visual-builder__overlay__wrapper");
    const focusedToolbar = visualBuilderContainer.querySelector(".visual-builder__focused-toolbar");
    const hideOverlayAndHoverOutline = () => {
        hideHoverOutline(visualBuilderContainer);
        hideOverlay({
            visualBuilderContainer: visualBuilderContainer,
            visualBuilderOverlayWrapper: overlayWrapper,
            focusedToolbar: focusedToolbar,
            resizeObserver,
        });
    };
    if (disabled) {
        return;
    }
    // is whole field and not a single instance of the multiple field
    const isField = eventDetails.fieldMetadata.instance.fieldPathWithIndex ===
        eventDetails.fieldMetadata.fieldPathWithIndex;
    const prevIndex = isField
        ? 0
        : eventDetails.fieldMetadata.multipleFieldMetadata.index;
    const nextIndex = isField
        ? expectedFieldData.length
        : eventDetails.fieldMetadata.multipleFieldMetadata.index + 1;
    const parentCslp = isField ? eventDetails.cslpData : parentCslpValue;
    const onMessageSent = (index) => {
        hideOverlayAndHoverOutline();
        observeParentAndFocusNewInstance({
            parentCslp,
            index,
        });
    };
    // this is a shared loading state between the
    // next and previous button for the duration
    // between the add-instance post message being
    // sent and receiving a response for it.
    const loading = d$2(false);
    const previousButton = generateAddInstanceButton({
        fieldSchema,
        value: expectedFieldData,
        fieldMetadata: eventDetails.fieldMetadata,
        index: prevIndex,
        onClick: onMessageSent.bind(null, prevIndex),
        loading,
        label,
    });
    const nextButton = generateAddInstanceButton({
        fieldSchema,
        value: expectedFieldData,
        fieldMetadata: eventDetails.fieldMetadata,
        index: nextIndex,
        onClick: onMessageSent.bind(null, nextIndex),
        loading,
        label,
    });
    if (!visualBuilderContainer.contains(previousButton)) {
        visualBuilderContainer.appendChild(previousButton);
    }
    if (!visualBuilderContainer.contains(nextButton)) {
        visualBuilderContainer.appendChild(nextButton);
    }
    if (direction === "horizontal") {
        const middleHeight = targetDOMDimension.top +
            (targetDOMDimension.bottom - targetDOMDimension.top) / 2 +
            window.scrollY;
        previousButton.style.left = `${targetDOMDimension.left}px`;
        previousButton.style.top = `${middleHeight}px`;
        nextButton.style.left = `${targetDOMDimension.right}px`;
        nextButton.style.top = `${middleHeight}px`;
    }
    else {
        const middleWidth = targetDOMDimension.left +
            (targetDOMDimension.right - targetDOMDimension.left) / 2;
        previousButton.style.left = `${middleWidth}px`;
        previousButton.style.top = `${targetDOMDimension.top + window.scrollY}px`;
        nextButton.style.left = `${middleWidth}px`;
        nextButton.style.top = `${targetDOMDimension.bottom + window.scrollY}px`;
    }
}
function removeAddInstanceButtons(elements, forceRemoveAll = false) {
    const { visualBuilderContainer, overlayWrapper, eventTarget } = elements;
    if (!visualBuilderContainer) {
        return;
    }
    if (forceRemoveAll) {
        const addInstanceButtons = getAddInstanceButtons(visualBuilderContainer, true);
        addInstanceButtons?.forEach((button) => button.remove());
    }
    const addInstanceButtons = getAddInstanceButtons(visualBuilderContainer);
    if (!addInstanceButtons) {
        return;
    }
    const [previousButton, nextButton] = addInstanceButtons;
    if (overlayWrapper?.classList.contains("visible")) {
        return;
    }
    if (eventTarget &&
        (previousButton.contains(eventTarget) ||
            nextButton.contains(eventTarget))) {
        return;
    }
    nextButton.remove();
    previousButton.remove();
}
/**
 * This function observes the parent element and focuses the newly added instance.
 *
 * @param parentCslp The parent cslp value.
 * @param index The index of the new instance.
 * @returns void
 *
 * We can evolve the retry logic, as different use cases arise.
 * Currently, if the new element is not found after the first mutation, we until
 * WAIT_FOR_NEW_INSTANCE_TIMEOUT, expecting that the new instance/block will be
 * found in later mutations and we can focus + disconnect then.
 * We also ensure there is only one setTimeout scheduled.
 */
function observeParentAndFocusNewInstance({ parentCslp, index, }) {
    const parent = document.querySelector(`[data-cslp='${parentCslp}']`);
    if (parent) {
        const expectedCslp = [parentCslp, index].join(".");
        let hasObserverDisconnected = false;
        let timeoutId = null;
        const mutationObserver = new MutationObserver((_mutations, observer) => {
            const newInstance = parent.querySelector(`[data-cslp='${expectedCslp}']`);
            if (newInstance) {
                // this is how we also navigate to parent elements, but parent elements
                // are never primitive fields, the instances can be and this steals
                // focus from the form and puts it on the canvas.
                // So currently for a singleline multiple field, the form opens but we
                // come back to the canvas.
                // TODO - maybe we should not focus the content-editable
                // TODO - temp fix. We remove our empty block div once the new block arrives
                // but we focus the element before that and then the block shifts.
                // For some reason, the window resize event also does not trigger
                setTimeout(() => newInstance.click(), 350);
                observer.disconnect();
                hasObserverDisconnected = true;
                return;
            }
            if (!hasObserverDisconnected && !timeoutId) {
                // disconnect the observer whether we found the new instance or not
                // after timeout
                timeoutId = setTimeout(() => {
                    observer.disconnect();
                    hasObserverDisconnected = false;
                }, WAIT_FOR_NEW_INSTANCE_TIMEOUT);
            }
        });
        mutationObserver.observe(parent, {
            childList: true,
            // watch subtrees as there may be wrapper elements
            subtree: true,
            // we don't need to watch for attribute changes
            attributes: false,
        });
    }
}

function isFieldMultiple(fieldSchema) {
    return (fieldSchema &&
        (fieldSchema.multiple ||
            (fieldSchema.data_type === "reference" &&
                // @ts-expect-error field_metadata will contain ref_multiple
                // for reference fields
                fieldSchema.field_metadata.ref_multiple)));
}

function getCamelCaseStyles(styles) {
    return Object.keys(styles).reduce((acc, key) => {
        acc[camelCase(key)] = styles[key];
        return acc;
    }, {});
}

function getPsuedoEditableEssentialStyles({ rect, camelCase, }) {
    const overrides = {
        position: "absolute",
        top: `${rect.top + window.scrollY}px`,
        left: `${rect.left + window.scrollX}px`,
        height: "auto",
        "min-height": `${Math.abs(rect.height)}px`,
        "white-space": "normal",
        "text-transform": "none",
        "text-wrap-mode": "wrap",
        "text-overflow": "visible",
    };
    return camelCase ? getCamelCaseStyles(overrides) : overrides;
}

/**
 * Retrieves the computed style of an HTML element.
 *
 * @param element - The HTML element to retrieve the style from.
 * @returns An object representing the computed style of the element.
 */
function getStyleOfAnElement(element) {
    const styleSheetDeclaration = window.getComputedStyle(element);
    const styleSheetArray = Array.from(styleSheetDeclaration);
    const FILTER_STYLES = [
        "position",
        "left",
        "top",
        "right",
        "bottom",
        "text-overflow",
        // allows seeing the text from CMS field as-is
        "text-transform",
        "margin",
        "margin-block-end",
        "margin-block-start",
        "margin-inline-end",
        "margin-inline-start",
        "margin-left",
        "margin-right",
        "margin-top",
        "margin-bottom",
        "-webkit-user-modify",
        "cursor",
    ];
    const styles = {};
    styleSheetArray.forEach((style) => {
        if (!FILTER_STYLES.includes(style)) {
            const styleValue = styleSheetDeclaration.getPropertyValue(style);
            styles[style] = styleValue;
        }
    });
    return styles;
}

function getPsuedoEditableElementStyles(psuedoEditableElement, camelCase) {
    let styles = getStyleOfAnElement(psuedoEditableElement);
    // Get the offsetTop and offsetLeft of the editable element and set the position of the pseudo editable element
    // The pseudo editable element is positioned absolutely at the same location as the editable element
    const rect = psuedoEditableElement.getBoundingClientRect();
    if (camelCase) {
        styles = getCamelCaseStyles(styles);
    }
    const overrides = getPsuedoEditableEssentialStyles({ rect, camelCase });
    return { ...styles, ...overrides };
}

function PseudoEditableFieldComponent(props) {
    const styles = getPsuedoEditableElementStyles(props.editableElement, true);
    return (u("div", { className: classNames("visual-builder__pseudo-editable-element", visualBuilderStyles()["visual-builder__pseudo-editable-element"]), "data-testid": "visual-builder__pseudo-editable-element", style: styles, children: props.config.textContent }));
}

/**
 * Checks if the content of an element is truncated with ellipsis.
 *
 * @param element The HTML element to check.
 * @returns A boolean indicating whether the content is truncated with ellipsis.
 */
function isEllipsisActive(element) {
    return element.offsetWidth < element.scrollWidth;
}
/**
 * Generates a pseudo editable element based on the provided parameters.
 * The pseudo editable element is created as a <div> element with the provided text content,
 * positioned absolutely at the same location as the editable element.
 * The original editable element is hidden while the pseudo editable element is displayed.
 * It is used to edit the text content if the original editable element is not completely
 * visible.
 *
 * @param elements - An object containing the editable element.
 * @param elements.editableElement - The HTML element to be replaced with the pseudo editable element.
 * @param config - An object containing the configuration for the pseudo editable element.
 * @param config.textContent - The text content to be displayed in the pseudo editable element.
 *
 * @returns The generated pseudo editable element as an HTMLDivElement.
 */
function generatePseudoEditableElement(elements, config) {
    const { editableElement } = elements;
    const visualBuilderContainer = document.querySelector(".visual-builder__container");
    const wrapper = document.createDocumentFragment();
    B$2(u(PseudoEditableFieldComponent, { editableElement: editableElement, config: config }), wrapper);
    visualBuilderContainer?.appendChild(wrapper);
    const pseudoEditableElement = document.querySelector(".visual-builder__pseudo-editable-element");
    // TODO: set up a observer for UI shift.
    return pseudoEditableElement;
}

function getMultilinePlaintext(editableElement) {
    let newValue = '';
    let isOnFreshLine = true;
    // Recursive function to navigate childNodes and build linebreaks with text
    function parseChildNodesForValueAndLines(childNodes) {
        for (let i = 0; i < childNodes.length; i++) {
            const childNode = childNodes[i];
            if (childNode.nodeName === 'BR') {
                // BRs are always line breaks which means the next loop is on a fresh line
                newValue += '\n';
                isOnFreshLine = true;
                continue;
            }
            // We may or may not need to create a new line
            if (childNode.nodeName === 'DIV' && isOnFreshLine === false && i !== 0) {
                // Divs create new lines for themselves if they aren't already on one
                newValue += '\n';
            }
            // Whether we created a new line or not, we'll use it for this content so the next loop will not be on a fresh line:
            isOnFreshLine = false;
            // Add the text content if this is a text node:
            if (childNode.nodeType === 3 && childNode.textContent && childNode.textContent.trim() !== '') {
                newValue += childNode.textContent;
            }
            // If this node has children, get into them as well:
            parseChildNodesForValueAndLines(childNode.childNodes);
        }
    }
    parseChildNodesForValueAndLines(editableElement.childNodes);
    return newValue;
}

/**
 * Adjust the position of the field toolbar instead of clearing the innerhtml fo the focused toolbar.
 * By doing this, can avoid the re-rendering of the focus field toolbar.
 */
function positionToolbar({ focusedToolbar, selectedElementDimension, }) {
    if (focusedToolbar) {
        const targetElementRightEdgeOffset = window.scrollX + window.innerWidth - selectedElementDimension.left;
        const distanceFromTop = selectedElementDimension.top + window.scrollY - TOOLBAR_EDGE_BUFFER;
        // Adjust top position based on the available space
        const adjustedDistanceFromTop = selectedElementDimension.top + window.scrollY < TOP_EDGE_BUFFER
            ? distanceFromTop +
                selectedElementDimension.height +
                TOP_EDGE_BUFFER
            : distanceFromTop;
        const distanceFromLeft = selectedElementDimension.left - LIVE_PREVIEW_OUTLINE_WIDTH_IN_PX;
        const adjustedDistanceFromLeft = Math.max(distanceFromLeft, TOOLBAR_EDGE_BUFFER);
        // Handle right-edge overflow
        if (targetElementRightEdgeOffset < RIGHT_EDGE_BUFFER &&
            (focusedToolbar.style.justifyContent !== "flex-end" ||
                focusedToolbar.style.left !==
                    `${selectedElementDimension.right + LIVE_PREVIEW_OUTLINE_WIDTH_IN_PX}px`)) {
            focusedToolbar.style.justifyContent = "flex-end";
            focusedToolbar.style.left = `${selectedElementDimension.right + LIVE_PREVIEW_OUTLINE_WIDTH_IN_PX}px`;
        }
        else if (focusedToolbar.style.justifyContent !== "flex-start" ||
            focusedToolbar.style.left !== `${adjustedDistanceFromLeft}px`) {
            focusedToolbar.style.justifyContent = "flex-start"; // Default
            focusedToolbar.style.left = `${adjustedDistanceFromLeft}px`;
        }
        // Adjust top position if necessary
        if (focusedToolbar.style.top !== `${adjustedDistanceFromTop}px`) {
            focusedToolbar.style.top = `${adjustedDistanceFromTop}px`;
        }
    }
}
/**
 * This function can be used to re-draw/update the focussed state of an element.
 * The focussed state includes the overlay, psuedo-editable, toolbar, and multiple
 * instance add buttons. It is similar to handleBuilderInteraction but it does not
 * create new elements, it just updates the existing ones whenever possible.
 * NOTE: breakdown this function into multiple functions when the need arises
 */
async function updateFocussedState({ editableElement, visualBuilderContainer, overlayWrapper, focusedToolbar, resizeObserver, }) {
    let previousSelectedEditableDOM = VisualBuilder.VisualBuilderGlobalState.value
        .previousSelectedEditableDOM;
    if (!visualBuilderContainer ||
        !editableElement ||
        !previousSelectedEditableDOM ||
        !overlayWrapper) {
        return;
    }
    // prefer data-cslp-unique-id when available else use data-cslp.
    // unique ID is added on click when multiple elements with same
    // data-cslp are found.
    const previousSelectedElementCslp = editableElement?.getAttribute("data-cslp") || "";
    const previousSelectedElementCslpUniqueId = previousSelectedEditableDOM?.getAttribute("data-cslp-unique-id");
    const newPreviousSelectedElement = document.querySelector(`[data-cslp-unique-id="${previousSelectedElementCslpUniqueId}"]`) ||
        document.querySelector(`[data-cslp="${previousSelectedElementCslp}"]`);
    if (!newPreviousSelectedElement && resizeObserver) {
        hideFocusOverlay({
            visualBuilderOverlayWrapper: overlayWrapper,
            focusedToolbar,
            visualBuilderContainer,
            resizeObserver,
            noTrigger: true,
        });
        return;
    }
    if (newPreviousSelectedElement !== previousSelectedEditableDOM) {
        previousSelectedEditableDOM = newPreviousSelectedElement;
        VisualBuilder.VisualBuilderGlobalState.value.previousSelectedEditableDOM =
            previousSelectedEditableDOM;
    }
    const cslp = editableElement?.getAttribute("data-cslp") || "";
    const fieldMetadata = extractDetailsFromCslp(cslp);
    hideHoverOutline(visualBuilderContainer);
    // in every case, this function will bring cached values
    // and this should be quick
    const fieldSchema = await FieldSchemaMap.getFieldSchema(fieldMetadata.content_type_uid, fieldMetadata.fieldPath);
    const entryAcl = await getEntryPermissionsCached({
        entryUid: fieldMetadata.entry_uid,
        contentTypeUid: fieldMetadata.content_type_uid,
        locale: fieldMetadata.locale,
    });
    const { isDisabled } = isFieldDisabled(fieldSchema, { editableElement, fieldMetadata }, entryAcl);
    addFocusOverlay(previousSelectedEditableDOM, overlayWrapper, isDisabled);
    // update psuedo editable element if present
    const psuedoEditableElement = visualBuilderContainer.querySelector(".visual-builder__pseudo-editable-element");
    if (psuedoEditableElement) {
        const styles = getPsuedoEditableElementStyles(editableElement);
        const styleString = Object.entries(styles).reduce((acc, [key, value]) => {
            return `${acc}${key}:${value};`;
        }, "");
        psuedoEditableElement.style.cssText = styleString;
        // since we are copying styles from the editableEl
        // it will now have a visibility of hidden, which we added
        // when creating the pseudo editable element, so make the psuedo visible
        psuedoEditableElement.style.visibility = "visible";
    }
    const targetElementDimension = editableElement.getBoundingClientRect();
    if (targetElementDimension.width && targetElementDimension.height) {
        const selectedElement = VisualBuilder.VisualBuilderGlobalState.value
            .previousSelectedEditableDOM;
        if (!selectedElement)
            return;
        // position the focused tool bar
        positionToolbar({
            focusedToolbar: focusedToolbar,
            selectedElementDimension: selectedElement.getBoundingClientRect(),
        });
    }
    // re-add multiple instance add buttons
    const buttons = getAddInstanceButtons(visualBuilderContainer);
    const parentCslpValue = fieldMetadata.multipleFieldMetadata?.parentDetails?.parentCslpValue;
    if (buttons &&
        parentCslpValue &&
        buttons.length > 1 &&
        buttons[0] &&
        buttons[1]) {
        const [previousButton, nextButton] = buttons;
        const direction = getChildrenDirection(editableElement, parentCslpValue);
        const targetDOMDimension = editableElement.getBoundingClientRect();
        if (direction === "horizontal") {
            const middleHeight = targetDOMDimension.top +
                (targetDOMDimension.bottom - targetDOMDimension.top) / 2 +
                window.scrollY;
            previousButton.style.left = `${targetDOMDimension.left}px`;
            previousButton.style.top = `${middleHeight}px`;
            nextButton.style.left = `${targetDOMDimension.right}px`;
            nextButton.style.top = `${middleHeight}px`;
        }
        else if (direction === "vertical") {
            const middleWidth = targetDOMDimension.left +
                (targetDOMDimension.right - targetDOMDimension.left) / 2;
            previousButton.style.left = `${middleWidth}px`;
            previousButton.style.top = `${targetDOMDimension.top + window.scrollY}px`;
            nextButton.style.left = `${middleWidth}px`;
            nextButton.style.top = `${targetDOMDimension.bottom + window.scrollY}px`;
        }
    }
}
/**
 * This function is used to resize/reposition focus overlay and toolbar due to a
 * mutation in the DOM or due to changes in a different field (other than the focussed field).
 */
function updateFocussedStateOnMutation(focusOverlayWrapper, focusedToolbar, visualBuilderContainer, resizeObserver) {
    if (!focusOverlayWrapper)
        return;
    let selectedElement = VisualBuilder.VisualBuilderGlobalState.value
        .previousSelectedEditableDOM;
    if (!selectedElement)
        return;
    const selectedElementCslp = selectedElement?.getAttribute("data-cslp");
    const selectedElementCslpUniqueId = selectedElement?.getAttribute("data-cslp-unique-id");
    const newSelectedElement = document.querySelector(`[data-cslp-unique-id="${selectedElementCslpUniqueId}"]`) || document.querySelector(`[data-cslp="${selectedElementCslp}"]`);
    if (!newSelectedElement && resizeObserver) {
        hideFocusOverlay({
            visualBuilderOverlayWrapper: focusOverlayWrapper,
            focusedToolbar,
            visualBuilderContainer,
            resizeObserver,
            noTrigger: true,
        });
        return;
    }
    if (newSelectedElement !== selectedElement) {
        selectedElement = newSelectedElement;
        VisualBuilder.VisualBuilderGlobalState.value.previousSelectedEditableDOM =
            selectedElement;
    }
    const selectedElementDimension = selectedElement.getBoundingClientRect();
    /**
     * Update the focus outline if it exists.
     */
    const focusOutline = focusOverlayWrapper.querySelector(".visual-builder__overlay--outline");
    if (focusOutline) {
        const focusOutlineDimension = focusOutline.getBoundingClientRect();
        if (!isSameRect(selectedElementDimension, focusOutlineDimension)) {
            focusOutline.style.top = `${selectedElementDimension.top + window.scrollY}px`;
            focusOutline.style.left = `${selectedElementDimension.left}px`;
            focusOutline.style.width = `${selectedElementDimension.width}px`;
            focusOutline.style.height = `${selectedElementDimension.height}px`;
        }
    }
    /**
     * Update the focus overlays if they exists.
     */
    const focusedOverlayTop = focusOverlayWrapper.querySelector(".visual-builder__overlay--top");
    const focusedOverlayBottom = focusOverlayWrapper.querySelector(".visual-builder__overlay--bottom");
    const focusedOverlayLeft = focusOverlayWrapper.querySelector(".visual-builder__overlay--left");
    const focusedOverlayRight = focusOverlayWrapper.querySelector(".visual-builder__overlay--right");
    const distanceFromTop = selectedElementDimension.top + window.scrollY;
    if (focusedOverlayTop) {
        const dimension = focusedOverlayTop.getBoundingClientRect();
        if (dimension.height !== distanceFromTop) {
            focusedOverlayTop.style.height = `calc(${distanceFromTop}px)`;
        }
    }
    if (focusedOverlayBottom) {
        const dimension = focusedOverlayBottom.getBoundingClientRect();
        if (dimension.top !== selectedElementDimension.bottom ||
            dimension.height !==
                window.document.body.scrollHeight -
                    selectedElementDimension.bottom -
                    window.scrollY) {
            focusedOverlayBottom.style.top = `${selectedElementDimension.bottom + window.scrollY}px`;
            focusedOverlayBottom.style.height = `${window.document.body.scrollHeight -
                selectedElementDimension.bottom -
                window.scrollY}px`;
        }
    }
    if (focusedOverlayLeft) {
        const dimension = focusedOverlayLeft.getBoundingClientRect();
        if (dimension.top + window.scrollY !== distanceFromTop ||
            dimension.height !== selectedElementDimension.height ||
            dimension.width !== selectedElementDimension.left) {
            focusedOverlayLeft.style.top = `${distanceFromTop}px`;
            focusedOverlayLeft.style.height = `${selectedElementDimension.height}px`;
            focusedOverlayLeft.style.width = `${selectedElementDimension.left}px`;
        }
    }
    if (focusedOverlayRight) {
        const dimension = focusedOverlayRight.getBoundingClientRect();
        if (dimension.left !== selectedElementDimension.right ||
            dimension.top + window.scrollY !== distanceFromTop ||
            dimension.height !== selectedElementDimension.height ||
            dimension.width !==
                document.documentElement.clientWidth -
                    selectedElementDimension.right) {
            focusedOverlayRight.style.left = `${selectedElementDimension.right}px`;
            focusedOverlayRight.style.top = `${distanceFromTop}px`;
            focusedOverlayRight.style.height = `${selectedElementDimension.height}px`;
            focusedOverlayRight.style.width = `${document.documentElement.clientWidth -
                selectedElementDimension.right}px`;
        }
    }
    /**
     * Update the focus toolbar if it exists.
     */
    if (focusedToolbar) {
        const targetElementRightEdgeOffset = window.scrollX + window.innerWidth - selectedElementDimension.left;
        const distanceFromTop = selectedElementDimension.top + window.scrollY - TOOLBAR_EDGE_BUFFER;
        // Position the toolbar at the top unless there's insufficient space or scrolling up is not possible (topmost element targetted).
        const adjustedDistanceFromTop = selectedElementDimension.top + window.scrollY < TOP_EDGE_BUFFER
            ? distanceFromTop +
                selectedElementDimension.height +
                TOP_EDGE_BUFFER
            : distanceFromTop;
        const distanceFromLeft = selectedElementDimension.left - LIVE_PREVIEW_OUTLINE_WIDTH_IN_PX;
        const adjustedDistanceFromLeft = Math.max(distanceFromLeft, TOOLBAR_EDGE_BUFFER);
        if (targetElementRightEdgeOffset < RIGHT_EDGE_BUFFER &&
            (focusedToolbar.style.justifyContent !== "flex-end" ||
                focusedToolbar.style.left !==
                    `${selectedElementDimension.right +
                        LIVE_PREVIEW_OUTLINE_WIDTH_IN_PX}px`)) {
            // Overflow / Cutoff on right edge
            focusedToolbar.style.justifyContent = "flex-end";
            focusedToolbar.style.left = `${selectedElementDimension.right +
                LIVE_PREVIEW_OUTLINE_WIDTH_IN_PX}px`;
        }
        else if (focusedToolbar.style.justifyContent !== "flex-start" ||
            focusedToolbar.style.left !== `${adjustedDistanceFromLeft}px`) {
            focusedToolbar.style.justifyContent = "flex-start"; // default
            focusedToolbar.style.left = `${adjustedDistanceFromLeft}px`;
        }
        if (focusedToolbar.style.top !== `${adjustedDistanceFromTop}px`) {
            focusedToolbar.style.top = `${adjustedDistanceFromTop}px`;
        }
    }
    /**
     * Update the pseudo-editable if it exists.
     */
    if (visualBuilderContainer) {
        const psuedoEditableElement = visualBuilderContainer.querySelector(".visual-builder__pseudo-editable-element");
        const editableElement = selectedElement;
        const styles = getPsuedoEditableElementStyles(editableElement);
        const styleString = Object.entries(styles).reduce((acc, [key, value]) => {
            return `${acc}${key}:${value};`;
        }, "");
        if (psuedoEditableElement &&
            (psuedoEditableElement.style.cssText !== styleString ||
                psuedoEditableElement.style.visibility !== "visible")) {
            psuedoEditableElement.style.cssText = styleString;
            // since we are copying styles from the editableEl
            // it will now have a visibility of hidden, which we added
            // when creating the pseudo editable element, so make the psuedo visible
            psuedoEditableElement.style.visibility = "visible";
        }
    }
}
function isSameRect(rect1, rect2) {
    return (rect1.top === rect2.top &&
        rect1.left === rect2.left &&
        rect1.width === rect2.width &&
        rect1.height === rect2.height);
}

const pasteAsPlainText = debounce((e) => {
    e.preventDefault();
    const clipboardData = e.clipboardData;
    document.execCommand("inserttext", false, clipboardData?.getData("text/plain"));
}, 100, { leading: true });

function enableInlineEditing({ expectedFieldData, editableElement, fieldType, elements, }) {
    const { visualBuilderContainer, resizeObserver } = elements;
    let actualEditableField = editableElement;
    VisualBuilder.VisualBuilderGlobalState.value.focusFieldValue =
        actualEditableField?.innerText;
    const elementComputedDisplay = window.getComputedStyle(actualEditableField).display;
    let textContent = editableElement.innerText ||
        editableElement.textContent ||
        "";
    if (fieldType === FieldDataType.MULTILINE) {
        textContent = getMultilinePlaintext(actualEditableField);
        actualEditableField.addEventListener("paste", pasteAsPlainText);
    }
    const expectedTextContent = expectedFieldData;
    if ((expectedTextContent && textContent !== expectedTextContent) ||
        isEllipsisActive(editableElement)) {
        // TODO: Testing will be done in the E2E.
        const pseudoEditableField = generatePseudoEditableElement({ editableElement: editableElement }, { textContent: expectedFieldData });
        editableElement.style.visibility = "hidden";
        // set field type attribute to the pseudo editable field
        // ensures proper keydown handling similar to the actual editable field
        pseudoEditableField.setAttribute(VISUAL_BUILDER_FIELD_TYPE_ATTRIBUTE_KEY, fieldType);
        visualBuilderContainer.appendChild(pseudoEditableField);
        actualEditableField = pseudoEditableField;
        if (fieldType === FieldDataType.MULTILINE)
            actualEditableField.addEventListener("paste", pasteAsPlainText);
        // we will unobserve this in hideOverlay
        elements.resizeObserver.observe(pseudoEditableField);
    }
    else if (elementComputedDisplay === "inline") {
        // if the editable field is inline
        const onInlineElementInput = throttle(() => {
            const overlayWrapper = visualBuilderContainer.querySelector(".visual-builder__overlay__wrapper");
            const focusedToolbar = visualBuilderContainer.querySelector(".visual-builder__focused-toolbar");
            updateFocussedState({
                editableElement: actualEditableField,
                visualBuilderContainer,
                overlayWrapper,
                focusedToolbar,
                resizeObserver,
            });
        }, 200);
        actualEditableField.addEventListener("input", onInlineElementInput);
    }
    actualEditableField.setAttribute("contenteditable", "true");
    actualEditableField.addEventListener("input", handleFieldInput);
    actualEditableField.addEventListener("keydown", handleFieldKeyDown);
    // focus on the contenteditable element to start accepting input
    actualEditableField.focus();
    return;
}

/**
 * Handles inline editing for supported fields.
 */
function handleInlineEditableField({ fieldType, fieldSchema, fieldMetadata, expectedFieldData, editableElement, elements, }) {
    if (!ALLOWED_INLINE_EDITABLE_FIELD.includes(fieldType))
        return;
    // Instances of ALLOWED_INLINE_EDITABLE_FIELD will always have index at last
    const index = Number(fieldMetadata.instance.fieldPathWithIndex.split(".").at(-1));
    const isInstance = Number.isFinite(index);
    // CASE 1: Handle inline editing for multiple field
    if (isFieldMultiple(fieldSchema)) {
        let expectedFieldInstanceData = null;
        if (Array.isArray(expectedFieldData)) {
            // CASE: Selected element is the multiple field itself.
            // Inline Editing not allowed on field, only allowed on instance.
            // (We receive unreliable `multipleFieldMetadata` in this case)
            if (!isInstance) {
                return;
            }
            // CASE: Value does not exist for the provided instance's index
            if (index >= expectedFieldData.length) ;
            else {
                expectedFieldInstanceData = expectedFieldData.at(index);
            }
        }
        // CASE: ContentType's Field changed from single to multiple, while Entry's Field still single.
        else {
            expectedFieldInstanceData = expectedFieldData;
        }
        enableInlineEditing({
            fieldType,
            expectedFieldData: expectedFieldInstanceData,
            editableElement,
            elements,
        });
    }
    // CASE 2: Handle inline editing for a single field
    else {
        let expectedFieldInstanceData = null;
        // CASE: ContentType's Field changed from multiple to single, while Entry's Field still multiple.
        if (isInstance) {
            if (index !== 0) {
                // TODO: Handle this with UX
                // Let user know, CSLP is invalid due to change in Content Type
                return;
            }
            expectedFieldInstanceData = Array.isArray(expectedFieldData)
                ? expectedFieldData.at(0)
                : expectedFieldData;
        }
        enableInlineEditing({
            fieldType,
            expectedFieldData: expectedFieldInstanceData ?? expectedFieldData,
            editableElement,
            elements,
        });
    }
}

/**
 * It handles all the fields based on their data type and its "multiple" property.
 * @param eventDetails The event details object that contain cslp and field metadata.
 * @param elements The elements object that contain the visual builder wrapper.
 */
async function handleIndividualFields(eventDetails, elements) {
    const { fieldMetadata, editableElement } = eventDetails;
    const { visualBuilderContainer, lastEditedField, resizeObserver } = elements;
    const { content_type_uid, entry_uid, locale, fieldPath, fieldPathWithIndex, } = fieldMetadata;
    const [fieldSchema, expectedFieldData] = await Promise.all([
        FieldSchemaMap.getFieldSchema(content_type_uid, fieldPath),
        getFieldData({ content_type_uid, entry_uid, locale }, fieldPathWithIndex),
    ]);
    const fieldType = getFieldType(fieldSchema);
    const entryAcl = await getEntryPermissionsCached({
        entryUid: entry_uid,
        contentTypeUid: content_type_uid,
        locale,
    });
    const { isDisabled: disabled } = isFieldDisabled(fieldSchema, eventDetails, entryAcl);
    editableElement.setAttribute(VISUAL_BUILDER_FIELD_TYPE_ATTRIBUTE_KEY, fieldType);
    if (isFieldMultiple(fieldSchema)) {
        if (lastEditedField !== editableElement) {
            const addButtonLabel = fieldSchema.data_type === "blocks"
                ? // ? `Add ${fieldSchema.display_name ?? "Modular Block"}`
                    "Add Section"
                : undefined;
            handleAddButtonsForMultiple(eventDetails, {
                editableElement: eventDetails.editableElement,
                visualBuilderContainer: visualBuilderContainer,
                resizeObserver: resizeObserver,
            }, {
                fieldSchema,
                expectedFieldData,
                disabled,
                label: addButtonLabel,
            });
        }
    }
    if (disabled) {
        return;
    }
    handleInlineEditableField({
        fieldType,
        fieldSchema,
        fieldMetadata,
        expectedFieldData,
        editableElement: editableElement,
        elements,
    });
}
function cleanIndividualFieldResidual(elements) {
    const { overlayWrapper, visualBuilderContainer, focusedToolbar } = elements;
    removeAddInstanceButtons({
        eventTarget: null,
        visualBuilderContainer: visualBuilderContainer,
        overlayWrapper: overlayWrapper,
    }, true);
    const previousSelectedEditableDOM = VisualBuilder.VisualBuilderGlobalState.value
        .previousSelectedEditableDOM;
    if (previousSelectedEditableDOM) {
        previousSelectedEditableDOM.removeAttribute(VISUAL_BUILDER_FIELD_TYPE_ATTRIBUTE_KEY);
        previousSelectedEditableDOM.removeAttribute("contenteditable");
        previousSelectedEditableDOM.removeEventListener("input", handleFieldInput);
        previousSelectedEditableDOM.removeEventListener("keydown", handleFieldKeyDown);
        previousSelectedEditableDOM.removeEventListener("paste", pasteAsPlainText);
        // Note - this happens in two places, 1. hideOverlay and 2. here
        // TODO maybe see all usages of both functions and try to do it in one place
        elements.resizeObserver.unobserve(previousSelectedEditableDOM);
    }
    const pseudoEditableElement = visualBuilderContainer?.querySelector(".visual-builder__pseudo-editable-element");
    if (pseudoEditableElement) {
        elements.resizeObserver.unobserve(pseudoEditableElement);
        pseudoEditableElement.removeEventListener("paste", pasteAsPlainText);
        pseudoEditableElement.remove();
        if (previousSelectedEditableDOM) {
            previousSelectedEditableDOM.style.removeProperty("visibility");
        }
    }
    if (focusedToolbar) {
        removeFieldToolbar(focusedToolbar);
    }
}

const HighlightedCommentIcon = (props) => {
    const { data } = props;
    Config.get();
    const handleCommentModal = async () => {
        visualBuilderPostMessage$1?.send(VisualBuilderPostMessageEvents.OPEN_FIELD_COMMENT_MODAL, {
            fieldMetadata: data?.fieldMetadata,
            discussion: data?.discussion,
            fieldSchema: data?.fieldSchema,
            absolutePath: data.absolutePath,
        });
        toggleCollabPopup({ threadUid: "", action: "close" });
        Config.set("collab.isFeedbackMode", true);
    };
    return (u("div", { className: "collab-icon", onClick: handleCommentModal, children: u(HighlightCommentIcon, {}) }));
};

/**
 * Inserts highlighted comment icons based on an array of paths.
 *
 * This function locates elements in the DOM based on the `fieldMetadata.cslpValue`,
 * and appends a comment icon near each matching element.
 *
 * @param payload - Array of comment data with field metadata, schema, absolutePath and discussion ID.
 */
const highlighCommentOffset = 25;
function highlightCommentIconOnCanvas(payload) {
    const uniquePaths = {}; // Using object for uniqueness
    payload.forEach((data) => {
        const cslpValue = data?.fieldMetadata?.cslpValue;
        // Check if the cslpValue is already in the Object
        if (!cslpValue || uniquePaths[cslpValue]) {
            return; // Skip if the value is not unique
        }
        uniquePaths[cslpValue] = true; // Mark it as processed
        const element = document.querySelector(`[data-cslp="${cslpValue}"]`);
        if (element && element instanceof HTMLElement) {
            const { top, left } = element.getBoundingClientRect();
            const iconContainer = document.createElement("div");
            iconContainer.setAttribute("field-path", cslpValue);
            iconContainer.style.position = "fixed";
            iconContainer.style.top = `${top - highlighCommentOffset}px`;
            iconContainer.style.left = `${left - highlighCommentOffset}px`;
            iconContainer.style.zIndex = "900";
            iconContainer.style.cursor = "pointer";
            iconContainer.className = "highlighted-comment collab-icon";
            // Render the HighlightedCommentIcon using Preact's render method
            B$2(y$3(HighlightedCommentIcon, { data }), // Use h directly with Preact
            iconContainer);
            const visualBuilderContainer = document.querySelector(".visual-builder__container");
            if (visualBuilderContainer) {
                let highlightCommentWrapper = visualBuilderContainer.querySelector(".visual-builder__highlighted-comment-wrapper");
                if (!highlightCommentWrapper) {
                    highlightCommentWrapper = document.createElement("div");
                    highlightCommentWrapper.className =
                        "visual-builder__highlighted-comment-wrapper";
                    visualBuilderContainer.appendChild(highlightCommentWrapper);
                }
                highlightCommentWrapper.appendChild(iconContainer);
            }
        }
    });
}
/**
 * Update Highlighted comment position , whenever scroll or resize happen.
 */
function updateHighlightedCommentIconPosition() {
    // Query all elements with the .highlighted-comment class
    const icons = document.querySelectorAll(".highlighted-comment");
    icons.forEach((icon) => {
        if (icon && icon instanceof HTMLElement) {
            // Get the field-path attribute from the icon container
            const path = icon.getAttribute("field-path");
            if (path) {
                // Query the target element using the path
                const targetElement = document.querySelector(`[data-cslp="${path}"]`);
                if (targetElement && targetElement instanceof HTMLElement) {
                    // Get the target element's position relative to the viewport
                    const { top, left } = targetElement.getBoundingClientRect();
                    // Update the position of the icon container
                    icon.style.top = `${top - highlighCommentOffset}px`; // Adjust based on the target element's top
                    icon.style.left = `${left - highlighCommentOffset}px`; // Adjust based on the target element's left
                }
            }
        }
    });
}
function removeAllHighlightedCommentIcons() {
    const icons = document.querySelectorAll(".highlighted-comment");
    icons?.forEach((icon) => icon?.remove());
}
// Define a hidden class in goober
const hiddenClass = u$1 `
    display: none;
`;
/**
 * Toggle display style of a specific highlighted comment icon.
 *
 * @param path - The data-cslp attribute of the element whose corresponding highlighted comment icon should be toggled.
 * @param shouldShow - Boolean value to determine whether to show or hide the icon.
 * If true, the icon will be displayed. If false, the icon will be hidden.
 */
function toggleHighlightedCommentIconDisplay(path, shouldShow) {
    const icons = document.querySelectorAll(`.highlighted-comment[field-path="${path}"]`);
    icons.forEach((icon) => {
        {
            icon.classList.add(hiddenClass); // Hide the element using goober's hidden class
        }
    });
}
/**
 * Show all .highlighted-comment icons that have the hiddenClass applied.
 */
function showAllHiddenHighlightedCommentIcons() {
    // Query all elements that have both .highlighted-comment and hiddenClass
    const hiddenIcons = document.querySelectorAll(`.highlighted-comment.${hiddenClass}`);
    // Loop through each hidden icon and remove the hiddenClass
    hiddenIcons.forEach((icon) => {
        icon.classList.remove(hiddenClass); // Remove the hiddenClass to show the icon
    });
}

/**
 * Adds a focus overlay to the target element.
 * @param targetElement - The element to add the focus overlay to.
 * @param focusOverlayWrapper - The HTMLDivElement that contains the focus overlay.
 * @returns void
 */
function addFocusOverlay(targetElement, focusOverlayWrapper, disabled) {
    const targetElementDimension = targetElement.getBoundingClientRect();
    if (targetElementDimension.width === 0 ||
        targetElementDimension.height === 0)
        return;
    focusOverlayWrapper.classList.add("visible");
    const distanceFromTop = targetElementDimension.top + window.scrollY;
    const topOverlayDOM = focusOverlayWrapper.querySelector(".visual-builder__overlay--top");
    if (topOverlayDOM) {
        topOverlayDOM.style.top = "0";
        topOverlayDOM.style.left = "0";
        topOverlayDOM.style.width = "100%";
        topOverlayDOM.style.height = `calc(${distanceFromTop}px)`;
    }
    const bottomOverlayDOM = focusOverlayWrapper.querySelector(".visual-builder__overlay--bottom");
    if (bottomOverlayDOM) {
        bottomOverlayDOM.style.top = `${targetElementDimension.bottom + window.scrollY}px`;
        bottomOverlayDOM.style.height = `${window.document.body.scrollHeight -
            targetElementDimension.bottom -
            window.scrollY}px`;
        bottomOverlayDOM.style.left = "0";
        bottomOverlayDOM.style.width = "100%";
    }
    const leftOverlayDOM = focusOverlayWrapper.querySelector(".visual-builder__overlay--left");
    if (leftOverlayDOM) {
        leftOverlayDOM.style.left = "0";
        leftOverlayDOM.style.top = `${distanceFromTop}px`;
        leftOverlayDOM.style.height = `${targetElementDimension.height}px`;
        leftOverlayDOM.style.width = `${targetElementDimension.left}px`;
    }
    const rightOverlayDOM = focusOverlayWrapper.querySelector(".visual-builder__overlay--right");
    if (rightOverlayDOM) {
        rightOverlayDOM.style.left = `${targetElementDimension.right}px`;
        rightOverlayDOM.style.top = `${distanceFromTop}px`;
        rightOverlayDOM.style.height = `${targetElementDimension.height}px`;
        rightOverlayDOM.style.width = `${document.documentElement.clientWidth - targetElementDimension.right}px`;
    }
    const outlineDOM = focusOverlayWrapper.querySelector(".visual-builder__overlay--outline");
    if (outlineDOM) {
        outlineDOM.style.top = `${targetElementDimension.top + window.scrollY}px`;
        outlineDOM.style.height = `${targetElementDimension.height}px`;
        outlineDOM.style.width = `${targetElementDimension.width}px`;
        outlineDOM.style.left = `${targetElementDimension.left}px`;
        outlineDOM.style.outlineColor = disabled ? "#909090" : "#715cdd";
    }
}
/**
 * Hides the focus overlay and performs necessary cleanup actions when the user clicks outside of the focused element.
 * @param event - The mouse event that triggered the function.
 * @param elements - An object containing references to the focus overlay wrapper, the previously selected editable DOM element, and the visual builder wrapper.
 */
function hideFocusOverlay(elements) {
    const { visualBuilderContainer, visualBuilderOverlayWrapper, focusedToolbar, resizeObserver, noTrigger, } = elements;
    if (visualBuilderOverlayWrapper) {
        visualBuilderOverlayWrapper.classList.remove("visible");
        // Cleanup overlay styles: Top, Right, Bottom, Left & Outline
        visualBuilderOverlayWrapper.childNodes.forEach((childNode) => {
            if (childNode instanceof Element) {
                childNode.removeAttribute("style");
            }
        });
        if (!noTrigger &&
            // send update when focussed field has received input
            VisualBuilder.VisualBuilderGlobalState.value.focusFieldReceivedInput) {
            sendFieldEvent({
                visualBuilderContainer,
                eventType: VisualBuilderPostMessageEvents.UPDATE_FIELD,
            });
        }
        else if (noTrigger) {
            const { previousSelectedEditableDOM, focusFieldValue } = VisualBuilder.VisualBuilderGlobalState.value || {};
            if (previousSelectedEditableDOM &&
                "innerText" in previousSelectedEditableDOM &&
                focusFieldValue != null) {
                previousSelectedEditableDOM.innerText = focusFieldValue;
            }
        }
        VisualBuilder.VisualBuilderGlobalState.value.focusFieldValue = null;
        VisualBuilder.VisualBuilderGlobalState.value.focusFieldReceivedInput =
            false;
        cleanIndividualFieldResidual({
            overlayWrapper: visualBuilderOverlayWrapper,
            visualBuilderContainer: visualBuilderContainer,
            focusedToolbar: focusedToolbar,
            resizeObserver: resizeObserver,
        });
    }
}
function sendFieldEvent(options) {
    const { visualBuilderContainer, eventType } = options;
    const previousSelectedEditableDOM = VisualBuilder.VisualBuilderGlobalState.value
        .previousSelectedEditableDOM;
    const pseudoEditableElement = visualBuilderContainer?.querySelector("div.visual-builder__pseudo-editable-element");
    if (previousSelectedEditableDOM &&
        (previousSelectedEditableDOM.hasAttribute("contenteditable") ||
            pseudoEditableElement)) {
        const actualEditedElement = pseudoEditableElement ||
            previousSelectedEditableDOM;
        let data = "innerText" in actualEditedElement
            ? actualEditedElement.innerText
            : actualEditedElement.textContent;
        const fieldMetadata = extractDetailsFromCslp(previousSelectedEditableDOM.getAttribute("data-cslp"));
        FieldSchemaMap.getFieldSchema(fieldMetadata.content_type_uid, fieldMetadata.fieldPath)
            .then((fieldSchema) => {
            if (fieldSchema &&
                eventType === VisualBuilderPostMessageEvents.UPDATE_FIELD) {
                const fieldType = getFieldType(fieldSchema);
                if (fieldType && fieldType === FieldDataType.MULTILINE) {
                    data = getMultilinePlaintext(actualEditedElement);
                    actualEditedElement.innerText =
                        data;
                }
            }
        })
            .finally(() => {
            visualBuilderPostMessage$1?.send(eventType, {
                data,
                fieldMetadata,
            });
        });
    }
}
function hideOverlay(params) {
    VisualBuilder.VisualBuilderGlobalState.value.isFocussed = false;
    const focusElementObserver = VisualBuilder.VisualBuilderGlobalState.value.focusElementObserver;
    if (focusElementObserver) {
        focusElementObserver.disconnect();
        VisualBuilder.VisualBuilderGlobalState.value.focusElementObserver =
            null;
    }
    hideFocusOverlay({
        visualBuilderContainer: params.visualBuilderContainer,
        visualBuilderOverlayWrapper: params.visualBuilderOverlayWrapper,
        focusedToolbar: params.focusedToolbar,
        resizeObserver: params.resizeObserver,
        noTrigger: Boolean(params.noTrigger),
    });
    showAllHiddenHighlightedCommentIcons();
    if (!VisualBuilder.VisualBuilderGlobalState.value
        .previousSelectedEditableDOM)
        return;
    params.resizeObserver.unobserve(VisualBuilder.VisualBuilderGlobalState.value.previousSelectedEditableDOM);
    VisualBuilder.VisualBuilderGlobalState.value.previousSelectedEditableDOM =
        null;
}

function getEntryIdentifiersInCurrentPage() {
    const elementsWithCslp = Array.from(document.querySelectorAll("[data-cslp]"));
    const uniqueEntriesMap = new Map();
    elementsWithCslp.forEach((element) => {
        const cslpData = extractDetailsFromCslp(element.getAttribute("data-cslp"));
        uniqueEntriesMap.set(cslpData.entry_uid, {
            entryUid: cslpData.entry_uid,
            contentTypeUid: cslpData.content_type_uid,
            locale: cslpData.locale
        });
    });
    const uniqueEntriesArray = Array.from(uniqueEntriesMap.values());
    return {
        entriesInCurrentPage: uniqueEntriesArray,
    };
}

function VisualBuilderComponent(props) {
    if (!isOpenInBuilder()) {
        return null;
    }
    return (u(g$4, { children: [u("style", { dangerouslySetInnerHTML: {
                    __html: VisualBuilderGlobalStyles,
                } }), u("div", { className: classNames(visualBuilderStyles()["visual-builder__cursor"], "visual-builder__cursor"), "data-testid": "visual-builder__cursor" }), u("div", { className: classNames(visualBuilderStyles()["visual-builder__overlay__wrapper"], "visual-builder__overlay__wrapper"), "data-testid": "visual-builder__overlay__wrapper", onClick: (event) => {
                    const targetElement = event.currentTarget;
                    const focusedToolbar = document.querySelector(".visual-builder__focused-toolbar");
                    hideOverlay({
                        visualBuilderContainer: props.visualBuilderContainer,
                        visualBuilderOverlayWrapper: targetElement,
                        focusedToolbar: focusedToolbar,
                        resizeObserver: props.resizeObserver,
                    });
                }, children: [u("div", { className: classNames("visual-builder__overlay visual-builder__overlay--top", visualBuilderStyles()["visual-builder__overlay"]), "data-testid": "visual-builder__overlay--top" }), u("div", { "data-testid": "visual-builder__overlay--left", className: classNames("visual-builder__overlay visual-builder__overlay--left", visualBuilderStyles()["visual-builder__overlay"]) }), u("div", { "data-testid": "visual-builder__overlay--right", className: classNames("visual-builder__overlay visual-builder__overlay--right", visualBuilderStyles()["visual-builder__overlay"]) }), u("div", { "data-testid": "visual-builder__overlay--bottom", className: classNames("visual-builder__overlay visual-builder__overlay--bottom", visualBuilderStyles()["visual-builder__overlay"]) }), u("div", { "data-testid": "visual-builder__overlay--outline", className: classNames("visual-builder__overlay--outline", visualBuilderStyles()["visual-builder__overlay--outline"]) })] }), u("div", { className: classNames("visual-builder__hover-outline visual-builder__hover-outline--unclickable", visualBuilderStyles()["visual-builder__hover-outline"], visualBuilderStyles()["visual-builder__hover-outline--unclickable"]), "data-testid": "visual-builder__hover-outline" }), u("div", { className: classNames("visual-builder__focused-toolbar", visualBuilderStyles()["visual-builder__focused-toolbar"]), "data-testid": "visual-builder__focused-toolbar" })] }));
}

function initUI(props) {
    const visualBuilderDOM = document.querySelector(`.visual-builder__container`);
    const isInBuilder = isOpenInBuilder();
    if (!visualBuilderDOM && isInBuilder) {
        const visualBuilderContainer = document.createElement("div");
        visualBuilderContainer.classList.add(visualBuilderStyles()["visual-builder__container"], "visual-builder__container");
        visualBuilderContainer.setAttribute("data-testid", "visual-builder__container");
        document.body.appendChild(visualBuilderContainer);
        B$2(u(VisualBuilderComponent, { visualBuilderContainer: visualBuilderContainer, resizeObserver: props.resizeObserver }), visualBuilderContainer);
    }
    return;
}

function removeDraftFieldClass() {
    const draftFieldElements = document.querySelectorAll(`.${visualBuilderStyles()["visual-builder__draft-field"]}`);
    draftFieldElements.forEach((element) => {
        element.classList.remove(visualBuilderStyles()["visual-builder__draft-field"]);
    });
}
function addDraftFieldClass(fields) {
    fields.forEach((field) => {
        const element = document.querySelector(`[data-cslp="${field}"]`);
        if (element) {
            element.classList.add(visualBuilderStyles()["visual-builder__draft-field"]);
        }
    });
}
function useDraftFieldsPostMessageEvent() {
    visualBuilderPostMessage$1?.on(VisualBuilderPostMessageEvents.SHOW_DRAFT_FIELDS, (event) => {
        removeDraftFieldClass();
        addDraftFieldClass(event.data.fields);
    });
    visualBuilderPostMessage$1?.on(VisualBuilderPostMessageEvents.REMOVE_DRAFT_FIELDS, () => {
        removeDraftFieldClass();
    });
}

function useHideFocusOverlayPostMessageEvent({ visualBuilderContainer, overlayWrapper, focusedToolbar, resizeObserver, }) {
    visualBuilderPostMessage$1?.on(VisualBuilderPostMessageEvents.HIDE_FOCUS_OVERLAY, (args) => {
        if (Boolean(args?.data?.fromCollab)) {
            Config.set("collab.enable", true);
            Config.set("collab.pauseFeedback", true);
        }
        hideOverlay({
            visualBuilderOverlayWrapper: overlayWrapper,
            visualBuilderContainer,
            focusedToolbar,
            resizeObserver,
            noTrigger: Boolean(args?.data?.noTrigger),
        });
    });
}

const handleScrollToField = (event) => {
    const { content_type_uid, entry_uid, locale, path } = event.data.cslpData;
    const cslpValue = `${content_type_uid}.${entry_uid}.${locale}.${path}`;
    // Query the element using the generated cslpValue
    const element = document.querySelector(`[data-cslp="${cslpValue}"]`);
    if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
};
const useScrollToField = () => {
    visualBuilderPostMessage$1?.on(VisualBuilderPostMessageEvents.SCROLL_TO_FIELD, handleScrollToField);
};

function addVariantFieldClass(variant_uid, highlightVariantFields) {
    const elements = document.querySelectorAll(`[data-cslp]`);
    elements.forEach((element) => {
        const dataCslp = element.getAttribute("data-cslp");
        if (!dataCslp)
            return;
        if (dataCslp?.includes(variant_uid)) {
            highlightVariantFields &&
                element.classList.add(visualBuilderStyles()["visual-builder__variant-field"]);
            element.classList.add("visual-builder__variant-field");
        }
        else if (!dataCslp.startsWith("v2:")) {
            element.classList.add("visual-builder__base-field");
        }
        else {
            element.classList.add("visual-builder__disabled-variant-field");
        }
    });
}
function removeVariantFieldClass(onlyHighlighted = false) {
    if (onlyHighlighted) {
        const variantElements = document.querySelectorAll(`.${visualBuilderStyles()["visual-builder__variant-field"]}`);
        variantElements.forEach((element) => {
            element.classList.remove(visualBuilderStyles()["visual-builder__variant-field"]);
        });
    }
    else {
        const variantAndBaseFieldElements = document.querySelectorAll(".visual-builder__disabled-variant-field, .visual-builder__variant-field, .visual-builder__base-field");
        variantAndBaseFieldElements.forEach((element) => {
            element.classList.remove("visual-builder__disabled-variant-field", "visual-builder__variant-field", visualBuilderStyles()["visual-builder__variant-field"], "visual-builder__base-field");
        });
    }
}
function setAudienceMode(mode) {
    VisualBuilder.VisualBuilderGlobalState.value.audienceMode = mode;
}
function setVariant(uid) {
    VisualBuilder.VisualBuilderGlobalState.value.variant = uid;
}
function setLocale(locale) {
    VisualBuilder.VisualBuilderGlobalState.value.locale = locale;
}
function useVariantFieldsPostMessageEvent() {
    visualBuilderPostMessage$1?.on(VisualBuilderPostMessageEvents.GET_VARIANT_ID, (event) => {
        setVariant(event.data.variant);
        // clear field schema when variant is changed.
        // this is required as we cache field schema
        // which contain a key isUnlinkedVariant.
        // This key can change when variant is changed,
        // so clear the field schema cache
        FieldSchemaMap.clear();
    });
    visualBuilderPostMessage$1?.on(VisualBuilderPostMessageEvents.GET_LOCALE, (event) => {
        setLocale(event.data.locale);
    });
    visualBuilderPostMessage$1?.on(VisualBuilderPostMessageEvents.SET_AUDIENCE_MODE, (event) => {
        setAudienceMode(event.data.audienceMode);
    });
    visualBuilderPostMessage$1?.on(VisualBuilderPostMessageEvents.SHOW_VARIANT_FIELDS, (event) => {
        removeVariantFieldClass();
        addVariantFieldClass(event.data.variant_data.variant, event.data.variant_data.highlightVariantFields);
    });
    visualBuilderPostMessage$1?.on(VisualBuilderPostMessageEvents.REMOVE_VARIANT_FIELDS, (event) => {
        removeVariantFieldClass(event?.data?.onlyHighlighted);
    });
}

function EmptyBlock(props) {
    const { details } = props;
    const blockParentName = details.fieldSchema.display_name;
    async function sendAddInstanceEvent() {
        await visualBuilderPostMessage$1?.send(VisualBuilderPostMessageEvents.ADD_INSTANCE, {
            fieldMetadata: details.fieldMetadata,
            index: 0,
        });
        observeParentAndFocusNewInstance({
            parentCslp: details.fieldMetadata.cslpValue,
            index: 0,
        });
    }
    return (u("div", { className: classNames("visual-builder__empty-block", visualBuilderStyles()["visual-builder__empty-block"]), children: [u("div", { className: classNames("visual-builder__empty-block-title", visualBuilderStyles()["visual-builder__empty-block-title"]), children: ["This page doesn\u2019t have any", " ", u("span", { className: classNames("visual-builder__empty-block-field-name", visualBuilderStyles()["visual-builder__empty-block-field-name"]), children: startCase(toLower(blockParentName)) }), " ", "added. Click the button below to add one."] }), u("button", { className: classNames("visual-builder__empty-block-add-button", visualBuilderStyles()["visual-builder__empty-block-add-button"]), onClick: () => sendAddInstanceEvent(), type: "button", "data-testid": "visual-builder__empty-block-add-button", children: [u("span", { className: classNames("visual-builder__empty-block-plus-icon", visualBuilderStyles()["visual-builder__empty-block-plus-icon"]), children: "+" }), "\u00A0 Add ", blockParentName] })] }));
}

async function generateEmptyBlocks(emptyBlockParents) {
    for (const emptyBlockParent of emptyBlockParents) {
        const cslpData = emptyBlockParent.getAttribute("data-cslp");
        if (!cslpData) {
            return;
        }
        const fieldMetadata = extractDetailsFromCslp(cslpData);
        const fieldSchema = await FieldSchemaMap.getFieldSchema(fieldMetadata.content_type_uid, fieldMetadata.fieldPath);
        if (!fieldSchema) {
            return;
        }
        E$2(u(EmptyBlock, { details: {
                fieldSchema,
                fieldMetadata,
            } }), emptyBlockParent);
    }
}
function removeEmptyBlocks(emptyBlockParents) {
    emptyBlockParents?.forEach((emptyBlockParent) => {
        const emptyBlock = emptyBlockParent.querySelector(".visual-builder__empty-block");
        if (emptyBlock) {
            emptyBlock.remove();
        }
    });
}

function e(){return (e=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var r=arguments[n];for(var o in r)({}).hasOwnProperty.call(r,o)&&(e[o]=r[o]);}return e}).apply(null,arguments)}var n={ignoreId:false};function getXPath(r,o){var i=e({},n,o),a=r;if(a&&a.id&&!i.ignoreId)return '//*[@id="'+a.id+'"]';for(var d=[];a&&(Node.ELEMENT_NODE===a.nodeType||Node.TEXT_NODE===a.nodeType);){for(var t=0,N=false,l=a.previousSibling;l;)l.nodeType!==Node.DOCUMENT_TYPE_NODE&&l.nodeName===a.nodeName&&t++,l=l.previousSibling;for(l=a.nextSibling;l;){if(l.nodeName===a.nodeName){N=true;break}l=l.nextSibling;}var p=t||N?"["+(t+1)+"]":"",f=a.nodeType!=Node.TEXT_NODE?(a.prefix?a.prefix+":":"")+a.localName+p:"text()"+(p||"[1]");d.push(f),a=a.parentNode;}return d.length?"/"+d.reverse().join("/"):""}

function addOverlay(params) {
    if (!params.overlayWrapper || !params.editableElement)
        return;
    addFocusOverlay(params.editableElement, params.overlayWrapper, params.isFieldDisabled);
    params.resizeObserver.observe(params.editableElement);
}
function addFocusedToolbar(params) {
    const { editableElement } = params.eventDetails;
    if (!editableElement || !params.focusedToolbar)
        return;
    appendFocusedToolbar(params.eventDetails, params.focusedToolbar, params.hideOverlay, params.isVariant, params.options);
}
async function handleBuilderInteraction(params) {
    const eventTarget = params.event.target;
    const isAnchorElement = eventTarget instanceof HTMLAnchorElement;
    const elementHasCslp = eventTarget &&
        (eventTarget.hasAttribute("data-cslp") ||
            eventTarget.closest("[data-cslp]"));
    // if multiple elements with the same cslp element are found,
    // assign a unique ID to each element which we can use to identify
    // them in updateFocussedState and other places where we
    // would have queried the element by data-cslp
    const duplicates = document.querySelectorAll(`[data-cslp="${eventTarget?.getAttribute("data-cslp")}"]`);
    if (duplicates.length > 1) {
        duplicates.forEach((ele) => {
            if (!ele.hasAttribute("data-cslp-unique-id")) {
                const uniqueId = `cslp-${v4()}`;
                ele.setAttribute("data-cslp-unique-id", uniqueId);
            }
        });
    }
    // if the target element is a studio-ui element, return
    // this is currently used for the "Edit in Studio" button
    if (eventTarget?.getAttribute("data-studio-ui") === "true") {
        return;
    }
    if (params.event.altKey) {
        if (isAnchorElement) {
            params.event.preventDefault();
            params.event.stopPropagation();
        }
        return;
    }
    // prevent default behavior for anchor elements and elements with cslp attribute
    if (isAnchorElement ||
        (elementHasCslp && !eventTarget.closest(".visual-builder__empty-block"))) {
        params.event.preventDefault();
        params.event.stopPropagation();
    }
    const config = Config.get();
    if (config?.collab.enable === true) {
        if (config?.collab.pauseFeedback)
            return;
        const xpath = fixSvgXPath(getXPath(eventTarget));
        if (!eventTarget)
            return;
        const rect = eventTarget.getBoundingClientRect();
        const relativeX = (params.event.clientX - rect.left) / rect.width;
        const relativeY = (params.event.clientY - rect.top) / rect.height;
        if (!isCollabThread(eventTarget)) {
            params.event.preventDefault();
            params.event.stopPropagation();
        }
        if (isCollabThread(eventTarget)) {
            Config.set("collab.isFeedbackMode", false);
        }
        else if (config?.collab.isFeedbackMode) {
            generateThread({ xpath, relativeX, relativeY }, {
                isNewThread: true,
                updateConfig: true,
            });
        }
        else {
            toggleCollabPopup({ threadUid: "", action: "close" });
            Config.set("collab.isFeedbackMode", true);
        }
        return;
    }
    const eventDetails = getCsDataOfElement(params.event);
    // Send mouse click post message
    sendMouseClickPostMessage(eventDetails);
    if (!eventDetails ||
        !params.overlayWrapper ||
        !params.visualBuilderContainer) {
        return;
    }
    const { editableElement, fieldMetadata } = eventDetails;
    const variantStatus = await getFieldVariantStatus(fieldMetadata);
    const isVariant = variantStatus
        ? Object.values(variantStatus).some((value) => value === true)
        : false;
    // Clean residuals if necessary
    cleanResidualsIfNeeded(params, editableElement);
    // Return if the selected element is an empty block
    if (isEmptyBlockElement(editableElement)) {
        return;
    }
    // when previous and current selected element is same, return.
    // this also avoids inserting psuedo-editable field (field data is
    // not equal to text content in DOM) when performing mouse
    // selections in the content editable
    const previousSelectedElement = VisualBuilder.VisualBuilderGlobalState.value
        .previousSelectedEditableDOM;
    if (isSameSelectedElement(previousSelectedElement, editableElement, params)) {
        return;
    }
    VisualBuilder.VisualBuilderGlobalState.value.previousSelectedEditableDOM =
        editableElement;
    // Add overlay and focused toolbar
    addOverlayAndToolbar(params, eventDetails, editableElement, isVariant);
    const { cslpValue } = fieldMetadata;
    toggleHighlightedCommentIconDisplay(cslpValue);
    // Handle field schema and individual fields
    await handleFieldSchemaAndIndividualFields(params, eventDetails, fieldMetadata, editableElement, previousSelectedElement);
    // Observe changes to the editable element
    observeEditableElementChanges(params, editableElement);
}
function sendMouseClickPostMessage(eventDetails) {
    visualBuilderPostMessage$1
        ?.send(VisualBuilderPostMessageEvents.MOUSE_CLICK, {
        cslpData: eventDetails?.cslpData,
        fieldMetadata: eventDetails?.fieldMetadata,
    })
        .catch((err) => {
        console.warn("Error while sending post message", err);
    });
}
function cleanResidualsIfNeeded(params, editableElement) {
    const previousSelectedElement = VisualBuilder.VisualBuilderGlobalState.value
        .previousSelectedEditableDOM;
    if ((previousSelectedElement &&
        previousSelectedElement !== editableElement) ||
        params.reEvaluate) {
        cleanIndividualFieldResidual({
            overlayWrapper: params.overlayWrapper,
            visualBuilderContainer: params.visualBuilderContainer,
            focusedToolbar: params.focusedToolbar,
            resizeObserver: params.resizeObserver,
        });
    }
}
function isEmptyBlockElement(editableElement) {
    return (editableElement.classList.contains(VB_EmptyBlockParentClass) ||
        editableElement.classList.contains("visual-builder__empty-block"));
}
function isSameSelectedElement(previousSelectedElement, editableElement, params) {
    return !!(previousSelectedElement &&
        previousSelectedElement === editableElement &&
        !params.reEvaluate);
}
function addOverlayAndToolbar(params, eventDetails, editableElement, isVariant) {
    VisualBuilder.VisualBuilderGlobalState.value.isFocussed = true;
    addOverlay({
        overlayWrapper: params.overlayWrapper,
        resizeObserver: params.resizeObserver,
        editableElement: editableElement,
    });
    addFocusedToolbar({
        eventDetails: eventDetails,
        focusedToolbar: params.focusedToolbar,
        hideOverlay: () => {
            hideOverlay({
                visualBuilderContainer: params.visualBuilderContainer,
                visualBuilderOverlayWrapper: params.overlayWrapper,
                focusedToolbar: params.focusedToolbar,
                resizeObserver: params.resizeObserver,
            });
        },
        isVariant,
    });
}
async function handleFieldSchemaAndIndividualFields(params, eventDetails, fieldMetadata, editableElement, previousSelectedElement) {
    const { content_type_uid, entry_uid, fieldPath, locale } = fieldMetadata;
    const fieldSchema = await FieldSchemaMap.getFieldSchema(content_type_uid, fieldPath);
    let entryAcl;
    try {
        entryAcl = await getEntryPermissionsCached({
            entryUid: entry_uid,
            contentTypeUid: content_type_uid,
            locale,
        });
    }
    catch (error) {
        console.error("[Visual Builder] Error retrieving entry permissions:", error);
        return;
    }
    if (fieldSchema) {
        const { isDisabled } = isFieldDisabled(fieldSchema, eventDetails, entryAcl);
        if (isDisabled) {
            addOverlay({
                overlayWrapper: params.overlayWrapper,
                resizeObserver: params.resizeObserver,
                editableElement: editableElement,
                isFieldDisabled: true,
            });
        }
    }
    visualBuilderPostMessage$1?.send(VisualBuilderPostMessageEvents.FOCUS_FIELD, {
        DOMEditStack: getDOMEditStack(editableElement),
    });
    await handleIndividualFields(eventDetails, {
        visualBuilderContainer: params.visualBuilderContainer,
        resizeObserver: params.resizeObserver,
        lastEditedField: previousSelectedElement,
    });
}
function observeEditableElementChanges(params, editableElement) {
    const focusElementObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === "attributes" &&
                mutation.attributeName === "data-cslp") {
                focusElementObserver?.disconnect();
                VisualBuilder.VisualBuilderGlobalState.value.focusElementObserver =
                    null;
                handleBuilderInteraction({ ...params, reEvaluate: true });
            }
        });
    });
    VisualBuilder.VisualBuilderGlobalState.value.focusElementObserver =
        focusElementObserver;
    focusElementObserver.observe(editableElement, { attributes: true });
}

const eventHandlers = {
    click: (params) => (event) => {
        handleBuilderInteraction({
            event: event,
            overlayWrapper: params.overlayWrapper,
            visualBuilderContainer: params.visualBuilderContainer,
            previousSelectedEditableDOM: VisualBuilder.VisualBuilderGlobalState.value
                .previousSelectedEditableDOM,
            focusedToolbar: params.focusedToolbar,
            resizeObserver: params.resizeObserver,
        });
    },
    mousemove: (params) => (event) => {
        handleMouseHover({
            event: event,
            overlayWrapper: params.overlayWrapper,
            visualBuilderContainer: params.visualBuilderContainer,
            customCursor: params.customCursor,
            resizeObserver: params.resizeObserver,
            focusedToolbar: params.focusedToolbar,
        });
    },
    mouseleave: (params) => () => {
        hideCustomCursor(params.customCursor);
        hideHoverOutline(params.visualBuilderContainer);
    },
    mouseenter: (params) => () => {
        showCustomCursor(params.customCursor);
    },
};
const eventListenersMap = new Map();
function addEventListeners(params) {
    const clickHandler = eventHandlers.click(params);
    const mousemoveHandler = eventHandlers.mousemove(params);
    const mouseleaveHandler = eventHandlers.mouseleave(params);
    const mouseenterHandler = eventHandlers.mouseenter(params);
    eventListenersMap.set("click", clickHandler);
    eventListenersMap.set("mousemove", mousemoveHandler);
    eventListenersMap.set("mouseleave", mouseleaveHandler);
    eventListenersMap.set("mouseenter", mouseenterHandler);
    window.addEventListener("click", clickHandler, { capture: true });
    window.addEventListener("mousemove", mousemoveHandler);
    document.documentElement.addEventListener("mouseleave", mouseleaveHandler);
    document.documentElement.addEventListener("mouseenter", mouseenterHandler);
}
function removeEventListeners(params) {
    const clickHandler = eventListenersMap.get("click");
    const mousemoveHandler = eventListenersMap.get("mousemove");
    const mouseleaveHandler = eventListenersMap.get("mouseleave");
    const mouseenterHandler = eventListenersMap.get("mouseenter");
    if (clickHandler) {
        window.removeEventListener("click", clickHandler, { capture: true });
    }
    if (mousemoveHandler) {
        window.removeEventListener("mousemove", mousemoveHandler);
    }
    if (mouseleaveHandler) {
        document.documentElement.removeEventListener("mouseleave", mouseleaveHandler);
    }
    if (mouseenterHandler) {
        document.documentElement.removeEventListener("mouseenter", mouseenterHandler);
    }
    eventListenersMap.clear();
}

// NOTE - when we add complex keyboard shortcuts, we can look into libraries
// like hotkeys, etc.
function addKeyboardShortcuts({ overlayWrapper, visualBuilderContainer, focusedToolbar, resizeObserver, }) {
    document.addEventListener("keydown", (e) => {
        const event = e;
        // un-focusses the focussed canvas item and removes the overlay
        if (event.key === "Escape") {
            // previously, this was achieved by clicking on overlayWrapper
            hideOverlay({
                visualBuilderOverlayWrapper: overlayWrapper,
                visualBuilderContainer,
                focusedToolbar: focusedToolbar,
                resizeObserver: resizeObserver,
            });
        }
    });
}

const handleAddCommentIcons = (event) => {
    const { payload } = event.data; // Get the array of path and its data
    highlightCommentIconOnCanvas(payload);
};
const handleRemoveCommentIcons$1 = () => {
    removeAllHighlightedCommentIcons();
};
const useHighlightCommentIcon = () => {
    visualBuilderPostMessage$1?.on(VisualBuilderPostMessageEvents.HIGHLIGHT_ACTIVE_COMMENTS, handleAddCommentIcons);
    visualBuilderPostMessage$1?.on(VisualBuilderPostMessageEvents.REMOVE_HIGHLIGHTED_COMMENTS, handleRemoveCommentIcons$1);
};

const VARIANT_UPDATE_DELAY_MS = 8000;
/**
 * Registers a post message event listener for updating the variant / base classes in the live preview for audience mode.
 */
function useRecalculateVariantDataCSLPValues() {
    livePreviewPostMessage$1?.on(LIVE_PREVIEW_POST_MESSAGE_EVENTS.VARIANT_PATCH, (event) => {
        if (VisualBuilder.VisualBuilderGlobalState.value.audienceMode) {
            updateVariantClasses(event.data);
        }
    });
}
function updateVariantClasses({ highlightVariantFields, expectedCSLPValues, }) {
    const variant = VisualBuilder.VisualBuilderGlobalState.value.variant;
    const observers = [];
    // Helper function to update element classes
    const updateElementClasses = (element, dataCslp, observer) => {
        if (!dataCslp)
            return;
        if (dataCslp.startsWith("v2:") &&
            !element.classList.contains("visual-builder__variant-field")) {
            if (element.classList.contains("visual-builder__base-field")) {
                element.classList.remove("visual-builder__base-field");
            }
            if (highlightVariantFields) {
                element.classList.add(visualBuilderStyles()["visual-builder__variant-field"], "visual-builder__variant-field");
            }
            else {
                element.classList.add("visual-builder__variant-field");
            }
        }
        else if (!dataCslp.startsWith("v2:") &&
            element.classList.contains("visual-builder__variant-field")) {
            element.classList.remove(visualBuilderStyles()["visual-builder__variant-field"], "visual-builder__variant-field");
            element.classList.add("visual-builder__base-field");
        }
        else if (dataCslp.startsWith("v2:") &&
            variant &&
            !dataCslp.includes(variant) &&
            element.classList.contains("visual-builder__variant-field")) {
            element.classList.remove(visualBuilderStyles()["visual-builder__variant-field"], "visual-builder__variant-field");
            element.classList.add("visual-builder__disabled-variant-field");
        }
        if (!observer)
            return;
        // Disconnect this observer after processing
        observer.disconnect();
        const index = observers.indexOf(observer);
        if (index > -1) {
            observers.splice(index, 1);
        }
    };
    const addElementClasses = (element) => {
        const dataCslp = element.getAttribute(DATA_CSLP_ATTR_SELECTOR);
        if (!dataCslp) {
            //recursive call for child nodes
            element.childNodes.forEach((child) => {
                if (child instanceof HTMLElement) {
                    addElementClasses(child);
                }
            });
            return;
        }
        //if element might have been updated by another observer
        if (dataCslp.startsWith("v2:") &&
            element.classList.contains("visual-builder__variant-field")) {
            return;
        }
        // if element has not given variant/base class
        if (dataCslp.startsWith("v2:") &&
            !element.classList.contains("visual-builder__variant-field")) {
            if (element.classList.contains("visual-builder__base-field")) {
                element.classList.remove("visual-builder__base-field");
            }
            if (highlightVariantFields) {
                element.classList.add(visualBuilderStyles()["visual-builder__variant-field"], "visual-builder__variant-field");
            }
            else {
                element.classList.add("visual-builder__variant-field");
            }
        }
        else if (!dataCslp.startsWith("v2:")) {
            if (element.classList.contains("visual-builder__variant-field")) {
                element.classList.remove(visualBuilderStyles()["visual-builder__variant-field"], "visual-builder__variant-field");
            }
            element.classList.add("visual-builder__base-field");
        }
        //recursive call for child nodes
        element.childNodes.forEach((child) => {
            if (child instanceof HTMLElement) {
                addElementClasses(child);
            }
        });
    };
    // Create a separate observer for each element
    const elementsWithCslp = document.querySelectorAll(`[${DATA_CSLP_ATTR_SELECTOR}]`);
    elementsWithCslp.forEach((elementNode) => {
        const element = elementNode;
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if ((mutation.type === "attributes" &&
                    mutation.attributeName === DATA_CSLP_ATTR_SELECTOR) ||
                    mutation.type === "childList") {
                    if (mutation.addedNodes.length > 0) {
                        mutation.addedNodes.forEach((node) => {
                            if (node instanceof HTMLElement) {
                                addElementClasses(node);
                            }
                        });
                    }
                    const dataCslp = element.getAttribute(DATA_CSLP_ATTR_SELECTOR);
                    updateElementClasses(element, dataCslp || "", observer);
                }
            });
        });
        observers.push(observer);
        observer.observe(element, {
            attributes: true,
            childList: true, // Observe direct children
            subtree: true,
        });
    });
    setTimeout(() => {
        if (observers.length > 0) {
            observers.forEach((observer) => observer.disconnect());
            observers.length = 0;
        }
    }, VARIANT_UPDATE_DELAY_MS);
}

const handleRemoveCommentIcons = (fromShare = false) => {
    if (fromShare) {
        hideAllCollabIcons();
        return;
    }
    removeAllCollabIcons();
};
const useCollab = () => {
    const config = Config.get();
    const collabEnable = visualBuilderPostMessage$1?.on(VisualBuilderPostMessageEvents.COLLAB_ENABLE, (data) => {
        if (!data?.data?.collab) {
            console.error("Invalid collab data structure:", data);
            return;
        }
        if (data?.data?.collab?.fromShare) {
            Config.set("collab.pauseFeedback", data?.data?.collab?.pauseFeedback);
            Config.set("collab.isFeedbackMode", data?.data?.collab?.isFeedbackMode);
            showAllCollabIcons();
            return;
        }
        Config.set("collab.enable", data.data.collab.enable ?? false);
        Config.set("collab.isFeedbackMode", data.data.collab.isFeedbackMode ?? false);
        Config.set("collab.pauseFeedback", data?.data?.collab?.pauseFeedback);
        Config.set("collab.inviteMetadata", data.data.collab.inviteMetadata);
    });
    const collabPayload = visualBuilderPostMessage$1?.on(VisualBuilderPostMessageEvents.COLLAB_DATA_UPDATE, (data) => {
        if (!config?.collab?.enable)
            return;
        if (!data?.data?.collab) {
            console.error("Invalid collab data structure:", data);
            return;
        }
        if (data?.data?.collab?.inviteMetadata) {
            Config.set("collab.inviteMetadata", data?.data?.collab?.inviteMetadata);
            return;
        }
        const missingThreadIds = data?.data?.collab?.payload
            ?.map((payload) => generateThread(payload))
            .filter((id) => id !== undefined) || [];
        if (missingThreadIds.length > 0) {
            handleMissingThreads({
                payload: { isElementPresent: false },
                threadUids: missingThreadIds,
            });
        }
    });
    const collabDisable = visualBuilderPostMessage$1?.on(VisualBuilderPostMessageEvents.COLLAB_DISABLE, (data) => {
        if (data?.data?.collab?.fromShare) {
            Config.set("collab.pauseFeedback", data?.data?.collab?.pauseFeedback);
            handleRemoveCommentIcons(true);
            return;
        }
        Config.set("collab.enable", false);
        Config.set("collab.isFeedbackMode", false);
        handleRemoveCommentIcons();
    });
    const collabThreadRemove = visualBuilderPostMessage$1?.on(VisualBuilderPostMessageEvents.COLLAB_THREADS_REMOVE, (data) => {
        const threadUids = data?.data?.threadUids;
        if (!config?.collab?.enable)
            return;
        if (data?.data?.updateConfig) {
            Config.set("collab.isFeedbackMode", true);
        }
        if (threadUids.length > 0) {
            threadUids.forEach((threadUid) => {
                removeCollabIcon(threadUid);
            });
        }
    });
    const collabThreadReopen = visualBuilderPostMessage$1?.on(VisualBuilderPostMessageEvents.COLLAB_THREAD_REOPEN, (data) => {
        const thread = data.data.thread;
        if (!config?.collab?.enable)
            return;
        const result = generateThread(thread, {
            hidden: Boolean(config?.collab?.pauseFeedback),
        });
        if (result) {
            handleMissingThreads({
                payload: { isElementPresent: false },
                threadUids: [result],
            });
        }
    });
    const collabThreadHighlight = visualBuilderPostMessage$1?.on(VisualBuilderPostMessageEvents.COLLAB_THREAD_HIGHLIGHT, (data) => {
        const { threadUid } = data.data;
        if (!config?.collab?.enable || config?.collab?.pauseFeedback)
            return;
        HighlightThread(threadUid);
    });
    return () => {
        collabEnable?.unregister();
        collabPayload?.unregister();
        collabDisable?.unregister();
        collabThreadRemove?.unregister();
        collabThreadReopen?.unregister();
        collabThreadHighlight?.unregister();
    };
};

let threadsPayload = [];
class VisualBuilder {
    handlePositionChange(editableElement) {
        updateFocussedState({
            editableElement,
            visualBuilderContainer: this.visualBuilderContainer,
            overlayWrapper: this.overlayWrapper,
            focusedToolbar: this.focusedToolbar,
            resizeObserver: this.resizeObserver,
        });
    }
    constructor() {
        this.customCursor = null;
        this.overlayWrapper = null;
        this.visualBuilderContainer = null;
        this.focusedToolbar = null;
        this.scrollEventHandler = () => {
            updateCollabIconPosition();
            updatePopupPositions();
            updateSuggestionListPosition();
            updateHighlightedCommentIconPosition(); // Update icons position
        };
        this.resizeEventHandler = () => {
            const previousSelectedEditableDOM = VisualBuilder.VisualBuilderGlobalState.value
                .previousSelectedEditableDOM;
            updateHighlightedCommentIconPosition();
            updateCollabIconPosition();
            updatePopupPositions();
            updateSuggestionListPosition();
            if (previousSelectedEditableDOM) {
                this.handlePositionChange(previousSelectedEditableDOM);
            }
        };
        this.resizeObserver = new ResizeObserver(([entry]) => {
            const previousSelectedEditableDOM = VisualBuilder.VisualBuilderGlobalState.value
                .previousSelectedEditableDOM;
            if (!this.overlayWrapper || !previousSelectedEditableDOM) {
                return;
            }
            // if previous selected editable element is not same as the current
            // target and the target is also not psuedo-editable then return
            if (!entry.target.isSameNode(previousSelectedEditableDOM) &&
                !entry.target.classList.contains("visual-builder__pseudo-editable-element")) {
                return;
            }
            const isPsuedoEditableElement = entry.target.classList.contains("visual-builder__pseudo-editable-element");
            // the "actual" editable element when the current target is psuedo-editable
            // is the previous selected editable element instead of the closest data-cslp element
            // (cant use closest because the psuedo editable is absolute positioned)
            // (Note - why do we even need the closest? we do an early exit if entry.target
            // is not the previous selected editable element, needs more investigation)
            const editableElement = (isPsuedoEditableElement
                ? previousSelectedEditableDOM
                : entry.target.closest("[data-cslp]"));
            if (isPsuedoEditableElement) {
                // if the current target is psuedo-editable, then the resizing occurred by typing
                // into the psuedo editable, simply update the focus overlay
                addFocusOverlay(entry.target, this.overlayWrapper);
                // TODO check if we can now resize the actual editable element
                // when psuedo editable element is resized, avoid infinite loops
            }
            else if (editableElement) {
                this.handlePositionChange(editableElement);
            }
            // update the overlay if field is disabled
            const cslpData = editableElement && editableElement.getAttribute("data-cslp");
            if (!editableElement || !cslpData) {
                return;
            }
            const fieldMetadata = extractDetailsFromCslp(cslpData);
            FieldSchemaMap.getFieldSchema(fieldMetadata.content_type_uid, fieldMetadata.fieldPath).then((fieldSchema) => {
                if (!fieldSchema) {
                    return;
                }
                const { isDisabled } = isFieldDisabled(fieldSchema, {
                    editableElement,
                    fieldMetadata,
                });
                if (isDisabled) {
                    addFocusOverlay(editableElement, this.overlayWrapper, isDisabled);
                }
            });
        });
        this.mutationObserver = new MutationObserver(debounce(async () => {
            updateFocussedStateOnMutation(this.overlayWrapper, this.focusedToolbar, this.visualBuilderContainer, this.resizeObserver);
            const emptyBlockParents = Array.from(document.querySelectorAll(`.${VB_EmptyBlockParentClass}`));
            const previousEmptyBlockParents = VisualBuilder
                .VisualBuilderGlobalState.value
                .previousEmptyBlockParents;
            if (!isEqual(emptyBlockParents, previousEmptyBlockParents)) {
                const noMoreEmptyBlockParent = previousEmptyBlockParents.filter((x) => !emptyBlockParents.includes(x));
                const newEmptyBlockParent = emptyBlockParents.filter((x) => !previousEmptyBlockParents.includes(x));
                removeEmptyBlocks(noMoreEmptyBlockParent);
                await generateEmptyBlocks(newEmptyBlockParent);
                VisualBuilder.VisualBuilderGlobalState.value = {
                    ...VisualBuilder.VisualBuilderGlobalState.value,
                    previousEmptyBlockParents: emptyBlockParents,
                };
            }
        }, 100, { trailing: true }));
        this.threadMutationObserver = new MutationObserver(debounce(() => {
            const container = document.querySelector(".visual-builder__container");
            if (container && threadsPayload) {
                const unrenderedThreads = filterUnrenderedThreads(threadsPayload);
                if (unrenderedThreads.length > 0) {
                    processThreadsBatch(threadsPayload).then((missingThreadIds) => {
                        missingThreadIds.forEach(clearThreadStatus);
                        if (missingThreadIds.length > 0) {
                            handleMissingThreads({
                                payload: { isElementPresent: false },
                                threadUids: missingThreadIds,
                            });
                        }
                    });
                }
                threadsPayload = [];
            }
        }, 1000));
        // TODO: write test cases
        this.destroy = () => {
            // Remove event listeners
            window.removeEventListener("resize", this.resizeEventHandler);
            window.removeEventListener("scroll", this.scrollEventHandler);
            // Remove custom event listeners
            removeEventListeners({
                overlayWrapper: this.overlayWrapper,
                visualBuilderContainer: this.visualBuilderContainer,
                previousSelectedEditableDOM: VisualBuilder.VisualBuilderGlobalState.value
                    .previousSelectedEditableDOM,
                focusedToolbar: this.focusedToolbar,
                resizeObserver: this.resizeObserver,
                customCursor: this.customCursor,
            });
            // Disconnect observers
            this.resizeObserver.disconnect();
            this.mutationObserver.disconnect();
            this.threadMutationObserver.disconnect();
            // Clear global state
            VisualBuilder.VisualBuilderGlobalState.value = {
                previousSelectedEditableDOM: null,
                previousHoveredTargetDOM: null,
                previousEmptyBlockParents: [],
                focusFieldValue: null,
                focusFieldReceivedInput: false,
                audienceMode: false,
                locale: "en-us",
                variant: null,
                focusElementObserver: null,
                referenceParentMap: {},
                isFocussed: false,
            };
            // Remove DOM elements
            if (this.visualBuilderContainer) {
                window.document.body.removeChild(this.visualBuilderContainer);
            }
            if (this.customCursor) {
                this.customCursor.remove();
            }
            if (this.overlayWrapper) {
                this.overlayWrapper.remove();
            }
            if (this.focusedToolbar) {
                this.focusedToolbar.remove();
            }
            // Nullify references
            this.customCursor = null;
            this.overlayWrapper = null;
            this.visualBuilderContainer = null;
            this.focusedToolbar = null;
        };
        // Handles changes in element positions due to sidebar toggling or window resizing,
        // triggering a redraw of the visual builder
        window.addEventListener("resize", this.resizeEventHandler);
        window.addEventListener("scroll", this.scrollEventHandler);
        initUI({
            resizeObserver: this.resizeObserver,
        });
        // Initializing goober for css-in-js
        m();
        this.visualBuilderContainer = document.querySelector(".visual-builder__container");
        this.overlayWrapper = document.querySelector(".visual-builder__overlay__wrapper");
        this.customCursor = document.querySelector(".visual-builder__cursor");
        this.focusedToolbar = document.querySelector(".visual-builder__focused-toolbar");
        const config = Config.get();
        if (!config.enable || config.mode < ILivePreviewModeConfig.BUILDER) {
            return;
        }
        visualBuilderPostMessage$1
            ?.send("init", {
            isSSR: config.ssr,
            href: window.location.href,
        })
            .then((data) => {
            const { windowType = ILivePreviewWindowType.BUILDER, stackDetails, collab, } = data || {};
            Config.set("windowType", windowType);
            Config.set("stackDetails.masterLocale", stackDetails?.masterLocale || "en-us");
            if (collab) {
                Config.set("collab.enable", collab.enable);
                Config.set("collab.isFeedbackMode", collab.isFeedbackMode);
                Config.set("collab.inviteMetadata", collab.inviteMetadata);
            }
            if (collab?.payload) {
                threadsPayload = collab?.payload;
            }
            addEventListeners({
                overlayWrapper: this.overlayWrapper,
                visualBuilderContainer: this.visualBuilderContainer,
                previousSelectedEditableDOM: VisualBuilder.VisualBuilderGlobalState.value
                    .previousSelectedEditableDOM,
                focusedToolbar: this.focusedToolbar,
                resizeObserver: this.resizeObserver,
                customCursor: this.customCursor,
            });
            this.threadMutationObserver.observe(document.body, {
                childList: true,
                subtree: true,
                attributes: false,
            });
            useHistoryPostMessageEvent();
            useCollab();
            if (windowType === ILivePreviewWindowType.BUILDER) {
                addKeyboardShortcuts({
                    overlayWrapper: this.overlayWrapper,
                    visualBuilderContainer: this.visualBuilderContainer,
                    focusedToolbar: this.focusedToolbar,
                    resizeObserver: this.resizeObserver,
                });
                useScrollToField();
                useHighlightCommentIcon();
                this.mutationObserver.observe(document.body, {
                    childList: true,
                    subtree: true,
                });
                visualBuilderPostMessage$1?.on(VisualBuilderPostMessageEvents.GET_ALL_ENTRIES_IN_CURRENT_PAGE, getEntryIdentifiersInCurrentPage);
                visualBuilderPostMessage$1?.send(VisualBuilderPostMessageEvents.SEND_VARIANT_AND_LOCALE);
                visualBuilderPostMessage$1?.on(VisualBuilderPostMessageEvents.TOGGLE_SCROLL, (event) => {
                    if (!event.data.scroll) {
                        document.body.style.overflow = 'hidden';
                    }
                    else {
                        document.body.style.overflow = 'auto';
                    }
                });
                useHideFocusOverlayPostMessageEvent({
                    overlayWrapper: this.overlayWrapper,
                    visualBuilderContainer: this.visualBuilderContainer,
                    focusedToolbar: this.focusedToolbar,
                    resizeObserver: this.resizeObserver,
                });
                // These events are used to sync the data when we made some changes in the entry without invoking live preview module.
                useOnEntryUpdatePostMessageEvent();
                useRecalculateVariantDataCSLPValues();
                useDraftFieldsPostMessageEvent();
                useVariantFieldsPostMessageEvent();
            }
        })
            .catch(() => {
            if (!inIframe()) {
                generateStartEditingButton();
            }
        });
    }
}
VisualBuilder.VisualBuilderGlobalState = d$2({
    previousSelectedEditableDOM: null,
    previousHoveredTargetDOM: null,
    previousEmptyBlockParents: [],
    focusFieldValue: null,
    focusFieldReceivedInput: false,
    audienceMode: false,
    locale: Config.get().stackDetails.masterLocale || "en-us",
    variant: null,
    focusElementObserver: null,
    referenceParentMap: {},
    isFocussed: false,
});

let ContentstackLivePreview$1 = class ContentstackLivePreview {
    /**
     * Initializes the Live Preview SDK with the provided user configuration.
     * If the SDK is already initialized, subsequent calls to this method will return the existing SDK instance.
     * @param userConfig - The user configuration to initialize the SDK with. See {@link https://github.com/contentstack/live-preview-sdk/blob/main/docs/live-preview-configs.md#initconfig-iconfig|Live preview User config} for more details.
     * @returns A promise that resolves to the constructors of the Live Preview SDK.
     */
    static init(userConfig = getUserInitData()) {
        if (typeof window === "undefined") {
            PublicLogger.warn("The SDK is not initialized in the browser.");
            return Promise.resolve(ContentstackLivePreview.previewConstructors);
        }
        // handle user config
        Config.replace(userConfig);
        updateConfigFromUrl();
        if (ContentstackLivePreview.isInitialized()) {
            PublicLogger.warn("You have already initialized the Live Preview SDK. So, any subsequent initialization returns the existing SDK instance.");
            return Promise.resolve(ContentstackLivePreview.previewConstructors);
        }
        else {
            return ContentstackLivePreview.initializePreview();
        }
    }
    /**
     * It is the live preview hash.
     * This hash could be used when data is fetched manually.
     */
    static get hash() {
        if (!ContentstackLivePreview.isInitialized()) {
            updateConfigFromUrl(); // check if we could extract from the URL
        }
        return Config.get().hash;
    }
    static get config() {
        if (!ContentstackLivePreview.isInitialized()) {
            updateConfigFromUrl(); // check if we could extract from the URL
        }
        const config = Config.get();
        const clonedConfig = cloneDeep(config);
        const configToShare = pick(clonedConfig, [
            'ssr',
            'enable',
            'cleanCslpOnProduction',
            'stackDetails',
            'clientUrlParams',
            'windowType',
            'hash',
            'editButton',
            'mode',
        ]);
        return configToShare;
    }
    static isInitialized() {
        return !isEmpty(ContentstackLivePreview.previewConstructors);
    }
    static initializePreview() {
        ContentstackLivePreview.previewConstructors = {
            livePreview: new LivePreview(),
            visualBuilder: new VisualBuilder(),
        };
        // set up onEntryChange callbacks added when the SDK was not initialized
        const livePreview = ContentstackLivePreview.previewConstructors.livePreview;
        Object.entries(ContentstackLivePreview.onEntryChangeCallbacks).forEach(([callbackUid, callback]) => {
            livePreview.subscribeToOnEntryChange(callback, callbackUid);
        });
        ContentstackLivePreview.onEntryChangeCallbacks = {};
        handlePageTraversal();
        handleWebCompare();
        return Promise.resolve(ContentstackLivePreview.previewConstructors);
    }
    /**
     * Registers a callback function to be called when an entry changes.
     * @param onChangeCallback The callback function to be called when an entry changes.
     * @param config Optional configuration for the callback.
     * @param config.skipInitialRender If true, the callback will not be called when it is first registered.
     * @returns A unique identifier for the registered callback.
     *
     * @example
     * ```js
     * const callbackUid = ContentstackLivePreview.onEntryChange(() => {
     *    console.log("Entry changed");
     * });
     *
     * // Unsubscribe the callback
     * ContentstackLivePreview.unsubscribeOnEntryChange(callbackUid);
     * ```
     */
    static onEntryChange(onChangeCallback, config = {}) {
        const { skipInitialRender = false } = config;
        const callbackUid = v4();
        if (ContentstackLivePreview.isInitialized()) {
            ContentstackLivePreview.previewConstructors.livePreview.subscribeToOnEntryChange(onChangeCallback, callbackUid);
        }
        else {
            ContentstackLivePreview.onEntryChangeCallbacks[callbackUid] =
                onChangeCallback;
        }
        const searchParams = typeof window !== "undefined"
            ? new URLSearchParams(window.location.search)
            : null;
        const hasLivePreviewHash = searchParams && searchParams.has("live_preview");
        const isBuilder = searchParams && searchParams.has("builder");
        const shouldCallCallback = hasLivePreviewHash && isBuilder;
        // calling onChangeCallback when live_preview search parameter
        // is present because we don't send the initial client-data-send
        //  message in visual builder
        if (!skipInitialRender || shouldCallCallback) {
            onChangeCallback();
        }
        return callbackUid;
    }
    /**
     * Registers a callback function to be called when there is a change in the entry being edited in live preview mode. The difference between this and `onEntryChange` is that this callback will not be called when it is first registered.
     * @param onChangeCallback The callback function to be called when there is a change in the entry.
     * @returns A unique identifier for the registered callback.
     *
     * @example
     * ```js
     * const callbackUid = ContentstackLivePreview.onLiveEdit(() => {
     *   console.log("Entry changed");
     * });
     *
     * // Unsubscribe the callback
     * ContentstackLivePreview.unsubscribeOnEntryChange(callbackUid);
     * ```
     *
     */
    static onLiveEdit(onChangeCallback) {
        return ContentstackLivePreview.onEntryChange(onChangeCallback, {
            skipInitialRender: true,
        });
    }
    /**
     * Unsubscribes from the entry change event.
     * @param callback - The callback function to be unsubscribed.
     *
     * @example
     * ```js
     * // unsubscribing using the Callback UID
     * const callbackUid = ContentstackLivePreview.onEntryChange(() => {
     *  console.log("Entry changed");
     * });
     *
     * // Unsubscribe the callback
     * ContentstackLivePreview.unsubscribeOnEntryChange(callbackUid);
     * ```
     *
     * @example
     * ```js
     * // unsubscribing using the callback function
     * const callback = () => {console.log("Entry changed")};
     * ContentstackLivePreview.onEntryChange(callback);
     *
     * // Unsubscribe the callback
     * ContentstackLivePreview.unsubscribeOnEntryChange(callback);
     * ```
     *
     * @example
     * ```js
     * // The same is applicable to onLiveEdit
     * const callbackUid = ContentstackLivePreview.onLiveEdit(() => {
     * console.log("Entry changed");
     * });
     *
     * // Unsubscribe the callback
     * ContentstackLivePreview.unsubscribeOnEntryChange(callbackUid);
     * ```
     *
     *
     */
    static unsubscribeOnEntryChange(callback) {
        if (!ContentstackLivePreview.isInitialized()) {
            removeFromOnChangeSubscribers(ContentstackLivePreview.onEntryChangeCallbacks, callback);
            return;
        }
        ContentstackLivePreview.previewConstructors.livePreview.unsubscribeOnEntryChange(callback);
    }
    /**
     * Retrieves the version of the SDK.
     * @returns The version of the SDK as a string.
     */
    static getSdkVersion() {
        return process?.env?.PACKAGE_VERSION;
    }
};
ContentstackLivePreview$1.previewConstructors = {};
/**
 * The subscribers for the onEntryChange event. We store them here when the SDK is not initialized.
 */
ContentstackLivePreview$1.onEntryChangeCallbacks = {};

class LightLivePreviewHoC {
    static init() {
        if (typeof window === "undefined") {
            return Promise.resolve(LightLivePreviewHoC.previewConstructors);
        }
        return LightLivePreviewHoC.initializePreview();
    }
    static initializePreview() {
        LightLivePreviewHoC.previewConstructors = {
            livePreview: {},
            visualBuilder: {},
        };
        LightLivePreviewHoC.onEntryChangeCallbacks = {};
        return Promise.resolve(LightLivePreviewHoC.previewConstructors);
    }
    static get hash() {
        return "";
    }
    static get config() {
        return {};
    }
    static isInitialized() {
        return false;
    }
    static onEntryChange(callback, config = {}) {
        const { skipInitialRender = false } = config;
        if (!skipInitialRender) {
            callback();
        }
        return "live-preview-id";
    }
    static onLiveEdit(callback) {
        return "live-preview-id";
    }
    static unsubscribeOnEntryChange() {
        // intentionally empty
    }
    static getSdkVersion() {
        return process?.env?.PACKAGE_VERSION;
    }
}
LightLivePreviewHoC.previewConstructors = {};
LightLivePreviewHoC.onEntryChangeCallbacks = {};

const ContentstackLivePreview = typeof process !== "undefined" &&
    (process?.env?.PURGE_PREVIEW_SDK === "true" ||
        process?.env?.REACT_APP_PURGE_PREVIEW_SDK === "true")
    ? LightLivePreviewHoC
    : ContentstackLivePreview$1;
const VB_EmptyBlockParentClass = "visual-builder__empty-block-parent";

export { VB_EmptyBlockParentClass, ContentstackLivePreview as default };
//# sourceMappingURL=index.js.map
