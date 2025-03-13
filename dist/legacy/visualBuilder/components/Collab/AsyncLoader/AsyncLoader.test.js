import {
  __commonJS,
  __export,
  __reExport,
  __toESM
} from "../../../../chunk-IKZWERSR.js";

// node_modules/lodash/_listCacheClear.js
var require_listCacheClear = __commonJS({
  "node_modules/lodash/_listCacheClear.js"(exports, module) {
    "use strict";
    function listCacheClear() {
      this.__data__ = [];
      this.size = 0;
    }
    module.exports = listCacheClear;
  }
});

// node_modules/lodash/eq.js
var require_eq = __commonJS({
  "node_modules/lodash/eq.js"(exports, module) {
    "use strict";
    function eq(value, other) {
      return value === other || value !== value && other !== other;
    }
    module.exports = eq;
  }
});

// node_modules/lodash/_assocIndexOf.js
var require_assocIndexOf = __commonJS({
  "node_modules/lodash/_assocIndexOf.js"(exports, module) {
    "use strict";
    var eq = require_eq();
    function assocIndexOf(array, key) {
      var length = array.length;
      while (length--) {
        if (eq(array[length][0], key)) {
          return length;
        }
      }
      return -1;
    }
    module.exports = assocIndexOf;
  }
});

// node_modules/lodash/_listCacheDelete.js
var require_listCacheDelete = __commonJS({
  "node_modules/lodash/_listCacheDelete.js"(exports, module) {
    "use strict";
    var assocIndexOf = require_assocIndexOf();
    var arrayProto = Array.prototype;
    var splice = arrayProto.splice;
    function listCacheDelete(key) {
      var data = this.__data__, index = assocIndexOf(data, key);
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
    module.exports = listCacheDelete;
  }
});

// node_modules/lodash/_listCacheGet.js
var require_listCacheGet = __commonJS({
  "node_modules/lodash/_listCacheGet.js"(exports, module) {
    "use strict";
    var assocIndexOf = require_assocIndexOf();
    function listCacheGet(key) {
      var data = this.__data__, index = assocIndexOf(data, key);
      return index < 0 ? void 0 : data[index][1];
    }
    module.exports = listCacheGet;
  }
});

// node_modules/lodash/_listCacheHas.js
var require_listCacheHas = __commonJS({
  "node_modules/lodash/_listCacheHas.js"(exports, module) {
    "use strict";
    var assocIndexOf = require_assocIndexOf();
    function listCacheHas(key) {
      return assocIndexOf(this.__data__, key) > -1;
    }
    module.exports = listCacheHas;
  }
});

// node_modules/lodash/_listCacheSet.js
var require_listCacheSet = __commonJS({
  "node_modules/lodash/_listCacheSet.js"(exports, module) {
    "use strict";
    var assocIndexOf = require_assocIndexOf();
    function listCacheSet(key, value) {
      var data = this.__data__, index = assocIndexOf(data, key);
      if (index < 0) {
        ++this.size;
        data.push([key, value]);
      } else {
        data[index][1] = value;
      }
      return this;
    }
    module.exports = listCacheSet;
  }
});

// node_modules/lodash/_ListCache.js
var require_ListCache = __commonJS({
  "node_modules/lodash/_ListCache.js"(exports, module) {
    "use strict";
    var listCacheClear = require_listCacheClear();
    var listCacheDelete = require_listCacheDelete();
    var listCacheGet = require_listCacheGet();
    var listCacheHas = require_listCacheHas();
    var listCacheSet = require_listCacheSet();
    function ListCache(entries) {
      var index = -1, length = entries == null ? 0 : entries.length;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype["delete"] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;
    module.exports = ListCache;
  }
});

// node_modules/lodash/_stackClear.js
var require_stackClear = __commonJS({
  "node_modules/lodash/_stackClear.js"(exports, module) {
    "use strict";
    var ListCache = require_ListCache();
    function stackClear() {
      this.__data__ = new ListCache();
      this.size = 0;
    }
    module.exports = stackClear;
  }
});

// node_modules/lodash/_stackDelete.js
var require_stackDelete = __commonJS({
  "node_modules/lodash/_stackDelete.js"(exports, module) {
    "use strict";
    function stackDelete(key) {
      var data = this.__data__, result = data["delete"](key);
      this.size = data.size;
      return result;
    }
    module.exports = stackDelete;
  }
});

// node_modules/lodash/_stackGet.js
var require_stackGet = __commonJS({
  "node_modules/lodash/_stackGet.js"(exports, module) {
    "use strict";
    function stackGet(key) {
      return this.__data__.get(key);
    }
    module.exports = stackGet;
  }
});

// node_modules/lodash/_stackHas.js
var require_stackHas = __commonJS({
  "node_modules/lodash/_stackHas.js"(exports, module) {
    "use strict";
    function stackHas(key) {
      return this.__data__.has(key);
    }
    module.exports = stackHas;
  }
});

// node_modules/lodash/_freeGlobal.js
var require_freeGlobal = __commonJS({
  "node_modules/lodash/_freeGlobal.js"(exports, module) {
    "use strict";
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    module.exports = freeGlobal;
  }
});

// node_modules/lodash/_root.js
var require_root = __commonJS({
  "node_modules/lodash/_root.js"(exports, module) {
    "use strict";
    var freeGlobal = require_freeGlobal();
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    module.exports = root;
  }
});

// node_modules/lodash/_Symbol.js
var require_Symbol = __commonJS({
  "node_modules/lodash/_Symbol.js"(exports, module) {
    "use strict";
    var root = require_root();
    var Symbol = root.Symbol;
    module.exports = Symbol;
  }
});

// node_modules/lodash/_getRawTag.js
var require_getRawTag = __commonJS({
  "node_modules/lodash/_getRawTag.js"(exports, module) {
    "use strict";
    var Symbol = require_Symbol();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var nativeObjectToString = objectProto.toString;
    var symToStringTag = Symbol ? Symbol.toStringTag : void 0;
    function getRawTag(value) {
      var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
      try {
        value[symToStringTag] = void 0;
        var unmasked = true;
      } catch (e) {
      }
      var result = nativeObjectToString.call(value);
      if (unmasked) {
        if (isOwn) {
          value[symToStringTag] = tag;
        } else {
          delete value[symToStringTag];
        }
      }
      return result;
    }
    module.exports = getRawTag;
  }
});

// node_modules/lodash/_objectToString.js
var require_objectToString = __commonJS({
  "node_modules/lodash/_objectToString.js"(exports, module) {
    "use strict";
    var objectProto = Object.prototype;
    var nativeObjectToString = objectProto.toString;
    function objectToString(value) {
      return nativeObjectToString.call(value);
    }
    module.exports = objectToString;
  }
});

// node_modules/lodash/_baseGetTag.js
var require_baseGetTag = __commonJS({
  "node_modules/lodash/_baseGetTag.js"(exports, module) {
    "use strict";
    var Symbol = require_Symbol();
    var getRawTag = require_getRawTag();
    var objectToString = require_objectToString();
    var nullTag = "[object Null]";
    var undefinedTag = "[object Undefined]";
    var symToStringTag = Symbol ? Symbol.toStringTag : void 0;
    function baseGetTag(value) {
      if (value == null) {
        return value === void 0 ? undefinedTag : nullTag;
      }
      return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
    }
    module.exports = baseGetTag;
  }
});

// node_modules/lodash/isObject.js
var require_isObject = __commonJS({
  "node_modules/lodash/isObject.js"(exports, module) {
    "use strict";
    function isObject(value) {
      var type = typeof value;
      return value != null && (type == "object" || type == "function");
    }
    module.exports = isObject;
  }
});

// node_modules/lodash/isFunction.js
var require_isFunction = __commonJS({
  "node_modules/lodash/isFunction.js"(exports, module) {
    "use strict";
    var baseGetTag = require_baseGetTag();
    var isObject = require_isObject();
    var asyncTag = "[object AsyncFunction]";
    var funcTag = "[object Function]";
    var genTag = "[object GeneratorFunction]";
    var proxyTag = "[object Proxy]";
    function isFunction(value) {
      if (!isObject(value)) {
        return false;
      }
      var tag = baseGetTag(value);
      return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
    }
    module.exports = isFunction;
  }
});

// node_modules/lodash/_coreJsData.js
var require_coreJsData = __commonJS({
  "node_modules/lodash/_coreJsData.js"(exports, module) {
    "use strict";
    var root = require_root();
    var coreJsData = root["__core-js_shared__"];
    module.exports = coreJsData;
  }
});

// node_modules/lodash/_isMasked.js
var require_isMasked = __commonJS({
  "node_modules/lodash/_isMasked.js"(exports, module) {
    "use strict";
    var coreJsData = require_coreJsData();
    var maskSrcKey = function() {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
      return uid ? "Symbol(src)_1." + uid : "";
    }();
    function isMasked(func) {
      return !!maskSrcKey && maskSrcKey in func;
    }
    module.exports = isMasked;
  }
});

// node_modules/lodash/_toSource.js
var require_toSource = __commonJS({
  "node_modules/lodash/_toSource.js"(exports, module) {
    "use strict";
    var funcProto = Function.prototype;
    var funcToString = funcProto.toString;
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e) {
        }
        try {
          return func + "";
        } catch (e) {
        }
      }
      return "";
    }
    module.exports = toSource;
  }
});

// node_modules/lodash/_baseIsNative.js
var require_baseIsNative = __commonJS({
  "node_modules/lodash/_baseIsNative.js"(exports, module) {
    "use strict";
    var isFunction = require_isFunction();
    var isMasked = require_isMasked();
    var isObject = require_isObject();
    var toSource = require_toSource();
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    var funcProto = Function.prototype;
    var objectProto = Object.prototype;
    var funcToString = funcProto.toString;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var reIsNative = RegExp(
      "^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    );
    function baseIsNative(value) {
      if (!isObject(value) || isMasked(value)) {
        return false;
      }
      var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }
    module.exports = baseIsNative;
  }
});

// node_modules/lodash/_getValue.js
var require_getValue = __commonJS({
  "node_modules/lodash/_getValue.js"(exports, module) {
    "use strict";
    function getValue(object, key) {
      return object == null ? void 0 : object[key];
    }
    module.exports = getValue;
  }
});

// node_modules/lodash/_getNative.js
var require_getNative = __commonJS({
  "node_modules/lodash/_getNative.js"(exports, module) {
    "use strict";
    var baseIsNative = require_baseIsNative();
    var getValue = require_getValue();
    function getNative(object, key) {
      var value = getValue(object, key);
      return baseIsNative(value) ? value : void 0;
    }
    module.exports = getNative;
  }
});

// node_modules/lodash/_Map.js
var require_Map = __commonJS({
  "node_modules/lodash/_Map.js"(exports, module) {
    "use strict";
    var getNative = require_getNative();
    var root = require_root();
    var Map = getNative(root, "Map");
    module.exports = Map;
  }
});

// node_modules/lodash/_nativeCreate.js
var require_nativeCreate = __commonJS({
  "node_modules/lodash/_nativeCreate.js"(exports, module) {
    "use strict";
    var getNative = require_getNative();
    var nativeCreate = getNative(Object, "create");
    module.exports = nativeCreate;
  }
});

// node_modules/lodash/_hashClear.js
var require_hashClear = __commonJS({
  "node_modules/lodash/_hashClear.js"(exports, module) {
    "use strict";
    var nativeCreate = require_nativeCreate();
    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {};
      this.size = 0;
    }
    module.exports = hashClear;
  }
});

// node_modules/lodash/_hashDelete.js
var require_hashDelete = __commonJS({
  "node_modules/lodash/_hashDelete.js"(exports, module) {
    "use strict";
    function hashDelete(key) {
      var result = this.has(key) && delete this.__data__[key];
      this.size -= result ? 1 : 0;
      return result;
    }
    module.exports = hashDelete;
  }
});

// node_modules/lodash/_hashGet.js
var require_hashGet = __commonJS({
  "node_modules/lodash/_hashGet.js"(exports, module) {
    "use strict";
    var nativeCreate = require_nativeCreate();
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function hashGet(key) {
      var data = this.__data__;
      if (nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? void 0 : result;
      }
      return hasOwnProperty.call(data, key) ? data[key] : void 0;
    }
    module.exports = hashGet;
  }
});

// node_modules/lodash/_hashHas.js
var require_hashHas = __commonJS({
  "node_modules/lodash/_hashHas.js"(exports, module) {
    "use strict";
    var nativeCreate = require_nativeCreate();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function hashHas(key) {
      var data = this.__data__;
      return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
    }
    module.exports = hashHas;
  }
});

// node_modules/lodash/_hashSet.js
var require_hashSet = __commonJS({
  "node_modules/lodash/_hashSet.js"(exports, module) {
    "use strict";
    var nativeCreate = require_nativeCreate();
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    function hashSet(key, value) {
      var data = this.__data__;
      this.size += this.has(key) ? 0 : 1;
      data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
      return this;
    }
    module.exports = hashSet;
  }
});

// node_modules/lodash/_Hash.js
var require_Hash = __commonJS({
  "node_modules/lodash/_Hash.js"(exports, module) {
    "use strict";
    var hashClear = require_hashClear();
    var hashDelete = require_hashDelete();
    var hashGet = require_hashGet();
    var hashHas = require_hashHas();
    var hashSet = require_hashSet();
    function Hash(entries) {
      var index = -1, length = entries == null ? 0 : entries.length;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    Hash.prototype.clear = hashClear;
    Hash.prototype["delete"] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;
    module.exports = Hash;
  }
});

// node_modules/lodash/_mapCacheClear.js
var require_mapCacheClear = __commonJS({
  "node_modules/lodash/_mapCacheClear.js"(exports, module) {
    "use strict";
    var Hash = require_Hash();
    var ListCache = require_ListCache();
    var Map = require_Map();
    function mapCacheClear() {
      this.size = 0;
      this.__data__ = {
        "hash": new Hash(),
        "map": new (Map || ListCache)(),
        "string": new Hash()
      };
    }
    module.exports = mapCacheClear;
  }
});

// node_modules/lodash/_isKeyable.js
var require_isKeyable = __commonJS({
  "node_modules/lodash/_isKeyable.js"(exports, module) {
    "use strict";
    function isKeyable(value) {
      var type = typeof value;
      return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
    }
    module.exports = isKeyable;
  }
});

// node_modules/lodash/_getMapData.js
var require_getMapData = __commonJS({
  "node_modules/lodash/_getMapData.js"(exports, module) {
    "use strict";
    var isKeyable = require_isKeyable();
    function getMapData(map, key) {
      var data = map.__data__;
      return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
    }
    module.exports = getMapData;
  }
});

// node_modules/lodash/_mapCacheDelete.js
var require_mapCacheDelete = __commonJS({
  "node_modules/lodash/_mapCacheDelete.js"(exports, module) {
    "use strict";
    var getMapData = require_getMapData();
    function mapCacheDelete(key) {
      var result = getMapData(this, key)["delete"](key);
      this.size -= result ? 1 : 0;
      return result;
    }
    module.exports = mapCacheDelete;
  }
});

// node_modules/lodash/_mapCacheGet.js
var require_mapCacheGet = __commonJS({
  "node_modules/lodash/_mapCacheGet.js"(exports, module) {
    "use strict";
    var getMapData = require_getMapData();
    function mapCacheGet(key) {
      return getMapData(this, key).get(key);
    }
    module.exports = mapCacheGet;
  }
});

// node_modules/lodash/_mapCacheHas.js
var require_mapCacheHas = __commonJS({
  "node_modules/lodash/_mapCacheHas.js"(exports, module) {
    "use strict";
    var getMapData = require_getMapData();
    function mapCacheHas(key) {
      return getMapData(this, key).has(key);
    }
    module.exports = mapCacheHas;
  }
});

// node_modules/lodash/_mapCacheSet.js
var require_mapCacheSet = __commonJS({
  "node_modules/lodash/_mapCacheSet.js"(exports, module) {
    "use strict";
    var getMapData = require_getMapData();
    function mapCacheSet(key, value) {
      var data = getMapData(this, key), size = data.size;
      data.set(key, value);
      this.size += data.size == size ? 0 : 1;
      return this;
    }
    module.exports = mapCacheSet;
  }
});

// node_modules/lodash/_MapCache.js
var require_MapCache = __commonJS({
  "node_modules/lodash/_MapCache.js"(exports, module) {
    "use strict";
    var mapCacheClear = require_mapCacheClear();
    var mapCacheDelete = require_mapCacheDelete();
    var mapCacheGet = require_mapCacheGet();
    var mapCacheHas = require_mapCacheHas();
    var mapCacheSet = require_mapCacheSet();
    function MapCache(entries) {
      var index = -1, length = entries == null ? 0 : entries.length;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype["delete"] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;
    module.exports = MapCache;
  }
});

// node_modules/lodash/_stackSet.js
var require_stackSet = __commonJS({
  "node_modules/lodash/_stackSet.js"(exports, module) {
    "use strict";
    var ListCache = require_ListCache();
    var Map = require_Map();
    var MapCache = require_MapCache();
    var LARGE_ARRAY_SIZE = 200;
    function stackSet(key, value) {
      var data = this.__data__;
      if (data instanceof ListCache) {
        var pairs = data.__data__;
        if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
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
    module.exports = stackSet;
  }
});

// node_modules/lodash/_Stack.js
var require_Stack = __commonJS({
  "node_modules/lodash/_Stack.js"(exports, module) {
    "use strict";
    var ListCache = require_ListCache();
    var stackClear = require_stackClear();
    var stackDelete = require_stackDelete();
    var stackGet = require_stackGet();
    var stackHas = require_stackHas();
    var stackSet = require_stackSet();
    function Stack(entries) {
      var data = this.__data__ = new ListCache(entries);
      this.size = data.size;
    }
    Stack.prototype.clear = stackClear;
    Stack.prototype["delete"] = stackDelete;
    Stack.prototype.get = stackGet;
    Stack.prototype.has = stackHas;
    Stack.prototype.set = stackSet;
    module.exports = Stack;
  }
});

// node_modules/lodash/_setCacheAdd.js
var require_setCacheAdd = __commonJS({
  "node_modules/lodash/_setCacheAdd.js"(exports, module) {
    "use strict";
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    function setCacheAdd(value) {
      this.__data__.set(value, HASH_UNDEFINED);
      return this;
    }
    module.exports = setCacheAdd;
  }
});

// node_modules/lodash/_setCacheHas.js
var require_setCacheHas = __commonJS({
  "node_modules/lodash/_setCacheHas.js"(exports, module) {
    "use strict";
    function setCacheHas(value) {
      return this.__data__.has(value);
    }
    module.exports = setCacheHas;
  }
});

// node_modules/lodash/_SetCache.js
var require_SetCache = __commonJS({
  "node_modules/lodash/_SetCache.js"(exports, module) {
    "use strict";
    var MapCache = require_MapCache();
    var setCacheAdd = require_setCacheAdd();
    var setCacheHas = require_setCacheHas();
    function SetCache(values) {
      var index = -1, length = values == null ? 0 : values.length;
      this.__data__ = new MapCache();
      while (++index < length) {
        this.add(values[index]);
      }
    }
    SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
    SetCache.prototype.has = setCacheHas;
    module.exports = SetCache;
  }
});

// node_modules/lodash/_arraySome.js
var require_arraySome = __commonJS({
  "node_modules/lodash/_arraySome.js"(exports, module) {
    "use strict";
    function arraySome(array, predicate) {
      var index = -1, length = array == null ? 0 : array.length;
      while (++index < length) {
        if (predicate(array[index], index, array)) {
          return true;
        }
      }
      return false;
    }
    module.exports = arraySome;
  }
});

// node_modules/lodash/_cacheHas.js
var require_cacheHas = __commonJS({
  "node_modules/lodash/_cacheHas.js"(exports, module) {
    "use strict";
    function cacheHas(cache, key) {
      return cache.has(key);
    }
    module.exports = cacheHas;
  }
});

// node_modules/lodash/_equalArrays.js
var require_equalArrays = __commonJS({
  "node_modules/lodash/_equalArrays.js"(exports, module) {
    "use strict";
    var SetCache = require_SetCache();
    var arraySome = require_arraySome();
    var cacheHas = require_cacheHas();
    var COMPARE_PARTIAL_FLAG = 1;
    var COMPARE_UNORDERED_FLAG = 2;
    function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
      if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
        return false;
      }
      var arrStacked = stack.get(array);
      var othStacked = stack.get(other);
      if (arrStacked && othStacked) {
        return arrStacked == other && othStacked == array;
      }
      var index = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : void 0;
      stack.set(array, other);
      stack.set(other, array);
      while (++index < arrLength) {
        var arrValue = array[index], othValue = other[index];
        if (customizer) {
          var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
        }
        if (compared !== void 0) {
          if (compared) {
            continue;
          }
          result = false;
          break;
        }
        if (seen) {
          if (!arraySome(other, function(othValue2, othIndex) {
            if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
            result = false;
            break;
          }
        } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
          result = false;
          break;
        }
      }
      stack["delete"](array);
      stack["delete"](other);
      return result;
    }
    module.exports = equalArrays;
  }
});

// node_modules/lodash/_Uint8Array.js
var require_Uint8Array = __commonJS({
  "node_modules/lodash/_Uint8Array.js"(exports, module) {
    "use strict";
    var root = require_root();
    var Uint8Array = root.Uint8Array;
    module.exports = Uint8Array;
  }
});

// node_modules/lodash/_mapToArray.js
var require_mapToArray = __commonJS({
  "node_modules/lodash/_mapToArray.js"(exports, module) {
    "use strict";
    function mapToArray(map) {
      var index = -1, result = Array(map.size);
      map.forEach(function(value, key) {
        result[++index] = [key, value];
      });
      return result;
    }
    module.exports = mapToArray;
  }
});

// node_modules/lodash/_setToArray.js
var require_setToArray = __commonJS({
  "node_modules/lodash/_setToArray.js"(exports, module) {
    "use strict";
    function setToArray(set) {
      var index = -1, result = Array(set.size);
      set.forEach(function(value) {
        result[++index] = value;
      });
      return result;
    }
    module.exports = setToArray;
  }
});

// node_modules/lodash/_equalByTag.js
var require_equalByTag = __commonJS({
  "node_modules/lodash/_equalByTag.js"(exports, module) {
    "use strict";
    var Symbol = require_Symbol();
    var Uint8Array = require_Uint8Array();
    var eq = require_eq();
    var equalArrays = require_equalArrays();
    var mapToArray = require_mapToArray();
    var setToArray = require_setToArray();
    var COMPARE_PARTIAL_FLAG = 1;
    var COMPARE_UNORDERED_FLAG = 2;
    var boolTag = "[object Boolean]";
    var dateTag = "[object Date]";
    var errorTag = "[object Error]";
    var mapTag = "[object Map]";
    var numberTag = "[object Number]";
    var regexpTag = "[object RegExp]";
    var setTag = "[object Set]";
    var stringTag = "[object String]";
    var symbolTag = "[object Symbol]";
    var arrayBufferTag = "[object ArrayBuffer]";
    var dataViewTag = "[object DataView]";
    var symbolProto = Symbol ? Symbol.prototype : void 0;
    var symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
    function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
      switch (tag) {
        case dataViewTag:
          if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
            return false;
          }
          object = object.buffer;
          other = other.buffer;
        case arrayBufferTag:
          if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
            return false;
          }
          return true;
        case boolTag:
        case dateTag:
        case numberTag:
          return eq(+object, +other);
        case errorTag:
          return object.name == other.name && object.message == other.message;
        case regexpTag:
        case stringTag:
          return object == other + "";
        case mapTag:
          var convert = mapToArray;
        case setTag:
          var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
          convert || (convert = setToArray);
          if (object.size != other.size && !isPartial) {
            return false;
          }
          var stacked = stack.get(object);
          if (stacked) {
            return stacked == other;
          }
          bitmask |= COMPARE_UNORDERED_FLAG;
          stack.set(object, other);
          var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
          stack["delete"](object);
          return result;
        case symbolTag:
          if (symbolValueOf) {
            return symbolValueOf.call(object) == symbolValueOf.call(other);
          }
      }
      return false;
    }
    module.exports = equalByTag;
  }
});

// node_modules/lodash/_arrayPush.js
var require_arrayPush = __commonJS({
  "node_modules/lodash/_arrayPush.js"(exports, module) {
    "use strict";
    function arrayPush(array, values) {
      var index = -1, length = values.length, offset = array.length;
      while (++index < length) {
        array[offset + index] = values[index];
      }
      return array;
    }
    module.exports = arrayPush;
  }
});

// node_modules/lodash/isArray.js
var require_isArray = __commonJS({
  "node_modules/lodash/isArray.js"(exports, module) {
    "use strict";
    var isArray = Array.isArray;
    module.exports = isArray;
  }
});

// node_modules/lodash/_baseGetAllKeys.js
var require_baseGetAllKeys = __commonJS({
  "node_modules/lodash/_baseGetAllKeys.js"(exports, module) {
    "use strict";
    var arrayPush = require_arrayPush();
    var isArray = require_isArray();
    function baseGetAllKeys(object, keysFunc, symbolsFunc) {
      var result = keysFunc(object);
      return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
    }
    module.exports = baseGetAllKeys;
  }
});

// node_modules/lodash/_arrayFilter.js
var require_arrayFilter = __commonJS({
  "node_modules/lodash/_arrayFilter.js"(exports, module) {
    "use strict";
    function arrayFilter(array, predicate) {
      var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
      while (++index < length) {
        var value = array[index];
        if (predicate(value, index, array)) {
          result[resIndex++] = value;
        }
      }
      return result;
    }
    module.exports = arrayFilter;
  }
});

// node_modules/lodash/stubArray.js
var require_stubArray = __commonJS({
  "node_modules/lodash/stubArray.js"(exports, module) {
    "use strict";
    function stubArray() {
      return [];
    }
    module.exports = stubArray;
  }
});

// node_modules/lodash/_getSymbols.js
var require_getSymbols = __commonJS({
  "node_modules/lodash/_getSymbols.js"(exports, module) {
    "use strict";
    var arrayFilter = require_arrayFilter();
    var stubArray = require_stubArray();
    var objectProto = Object.prototype;
    var propertyIsEnumerable = objectProto.propertyIsEnumerable;
    var nativeGetSymbols = Object.getOwnPropertySymbols;
    var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
      if (object == null) {
        return [];
      }
      object = Object(object);
      return arrayFilter(nativeGetSymbols(object), function(symbol) {
        return propertyIsEnumerable.call(object, symbol);
      });
    };
    module.exports = getSymbols;
  }
});

// node_modules/lodash/_baseTimes.js
var require_baseTimes = __commonJS({
  "node_modules/lodash/_baseTimes.js"(exports, module) {
    "use strict";
    function baseTimes(n, iteratee) {
      var index = -1, result = Array(n);
      while (++index < n) {
        result[index] = iteratee(index);
      }
      return result;
    }
    module.exports = baseTimes;
  }
});

// node_modules/lodash/isObjectLike.js
var require_isObjectLike = __commonJS({
  "node_modules/lodash/isObjectLike.js"(exports, module) {
    "use strict";
    function isObjectLike(value) {
      return value != null && typeof value == "object";
    }
    module.exports = isObjectLike;
  }
});

// node_modules/lodash/_baseIsArguments.js
var require_baseIsArguments = __commonJS({
  "node_modules/lodash/_baseIsArguments.js"(exports, module) {
    "use strict";
    var baseGetTag = require_baseGetTag();
    var isObjectLike = require_isObjectLike();
    var argsTag = "[object Arguments]";
    function baseIsArguments(value) {
      return isObjectLike(value) && baseGetTag(value) == argsTag;
    }
    module.exports = baseIsArguments;
  }
});

// node_modules/lodash/isArguments.js
var require_isArguments = __commonJS({
  "node_modules/lodash/isArguments.js"(exports, module) {
    "use strict";
    var baseIsArguments = require_baseIsArguments();
    var isObjectLike = require_isObjectLike();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var propertyIsEnumerable = objectProto.propertyIsEnumerable;
    var isArguments = baseIsArguments(/* @__PURE__ */ function() {
      return arguments;
    }()) ? baseIsArguments : function(value) {
      return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
    };
    module.exports = isArguments;
  }
});

// node_modules/lodash/stubFalse.js
var require_stubFalse = __commonJS({
  "node_modules/lodash/stubFalse.js"(exports, module) {
    "use strict";
    function stubFalse() {
      return false;
    }
    module.exports = stubFalse;
  }
});

// node_modules/lodash/isBuffer.js
var require_isBuffer = __commonJS({
  "node_modules/lodash/isBuffer.js"(exports, module) {
    "use strict";
    var root = require_root();
    var stubFalse = require_stubFalse();
    var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
    var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var Buffer = moduleExports ? root.Buffer : void 0;
    var nativeIsBuffer = Buffer ? Buffer.isBuffer : void 0;
    var isBuffer = nativeIsBuffer || stubFalse;
    module.exports = isBuffer;
  }
});

// node_modules/lodash/_isIndex.js
var require_isIndex = __commonJS({
  "node_modules/lodash/_isIndex.js"(exports, module) {
    "use strict";
    var MAX_SAFE_INTEGER = 9007199254740991;
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    function isIndex(value, length) {
      var type = typeof value;
      length = length == null ? MAX_SAFE_INTEGER : length;
      return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
    }
    module.exports = isIndex;
  }
});

// node_modules/lodash/isLength.js
var require_isLength = __commonJS({
  "node_modules/lodash/isLength.js"(exports, module) {
    "use strict";
    var MAX_SAFE_INTEGER = 9007199254740991;
    function isLength(value) {
      return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    module.exports = isLength;
  }
});

// node_modules/lodash/_baseIsTypedArray.js
var require_baseIsTypedArray = __commonJS({
  "node_modules/lodash/_baseIsTypedArray.js"(exports, module) {
    "use strict";
    var baseGetTag = require_baseGetTag();
    var isLength = require_isLength();
    var isObjectLike = require_isObjectLike();
    var argsTag = "[object Arguments]";
    var arrayTag = "[object Array]";
    var boolTag = "[object Boolean]";
    var dateTag = "[object Date]";
    var errorTag = "[object Error]";
    var funcTag = "[object Function]";
    var mapTag = "[object Map]";
    var numberTag = "[object Number]";
    var objectTag = "[object Object]";
    var regexpTag = "[object RegExp]";
    var setTag = "[object Set]";
    var stringTag = "[object String]";
    var weakMapTag = "[object WeakMap]";
    var arrayBufferTag = "[object ArrayBuffer]";
    var dataViewTag = "[object DataView]";
    var float32Tag = "[object Float32Array]";
    var float64Tag = "[object Float64Array]";
    var int8Tag = "[object Int8Array]";
    var int16Tag = "[object Int16Array]";
    var int32Tag = "[object Int32Array]";
    var uint8Tag = "[object Uint8Array]";
    var uint8ClampedTag = "[object Uint8ClampedArray]";
    var uint16Tag = "[object Uint16Array]";
    var uint32Tag = "[object Uint32Array]";
    var typedArrayTags = {};
    typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
    typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
    function baseIsTypedArray(value) {
      return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
    }
    module.exports = baseIsTypedArray;
  }
});

// node_modules/lodash/_baseUnary.js
var require_baseUnary = __commonJS({
  "node_modules/lodash/_baseUnary.js"(exports, module) {
    "use strict";
    function baseUnary(func) {
      return function(value) {
        return func(value);
      };
    }
    module.exports = baseUnary;
  }
});

// node_modules/lodash/_nodeUtil.js
var require_nodeUtil = __commonJS({
  "node_modules/lodash/_nodeUtil.js"(exports, module) {
    "use strict";
    var freeGlobal = require_freeGlobal();
    var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
    var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var freeProcess = moduleExports && freeGlobal.process;
    var nodeUtil = function() {
      try {
        var types = freeModule && freeModule.require && freeModule.require("util").types;
        if (types) {
          return types;
        }
        return freeProcess && freeProcess.binding && freeProcess.binding("util");
      } catch (e) {
      }
    }();
    module.exports = nodeUtil;
  }
});

// node_modules/lodash/isTypedArray.js
var require_isTypedArray = __commonJS({
  "node_modules/lodash/isTypedArray.js"(exports, module) {
    "use strict";
    var baseIsTypedArray = require_baseIsTypedArray();
    var baseUnary = require_baseUnary();
    var nodeUtil = require_nodeUtil();
    var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
    var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
    module.exports = isTypedArray;
  }
});

// node_modules/lodash/_arrayLikeKeys.js
var require_arrayLikeKeys = __commonJS({
  "node_modules/lodash/_arrayLikeKeys.js"(exports, module) {
    "use strict";
    var baseTimes = require_baseTimes();
    var isArguments = require_isArguments();
    var isArray = require_isArray();
    var isBuffer = require_isBuffer();
    var isIndex = require_isIndex();
    var isTypedArray = require_isTypedArray();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function arrayLikeKeys(value, inherited) {
      var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
      for (var key in value) {
        if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
        (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
        isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
        isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
        isIndex(key, length)))) {
          result.push(key);
        }
      }
      return result;
    }
    module.exports = arrayLikeKeys;
  }
});

// node_modules/lodash/_isPrototype.js
var require_isPrototype = __commonJS({
  "node_modules/lodash/_isPrototype.js"(exports, module) {
    "use strict";
    var objectProto = Object.prototype;
    function isPrototype(value) {
      var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
      return value === proto;
    }
    module.exports = isPrototype;
  }
});

// node_modules/lodash/_overArg.js
var require_overArg = __commonJS({
  "node_modules/lodash/_overArg.js"(exports, module) {
    "use strict";
    function overArg(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }
    module.exports = overArg;
  }
});

// node_modules/lodash/_nativeKeys.js
var require_nativeKeys = __commonJS({
  "node_modules/lodash/_nativeKeys.js"(exports, module) {
    "use strict";
    var overArg = require_overArg();
    var nativeKeys = overArg(Object.keys, Object);
    module.exports = nativeKeys;
  }
});

// node_modules/lodash/_baseKeys.js
var require_baseKeys = __commonJS({
  "node_modules/lodash/_baseKeys.js"(exports, module) {
    "use strict";
    var isPrototype = require_isPrototype();
    var nativeKeys = require_nativeKeys();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function baseKeys(object) {
      if (!isPrototype(object)) {
        return nativeKeys(object);
      }
      var result = [];
      for (var key in Object(object)) {
        if (hasOwnProperty.call(object, key) && key != "constructor") {
          result.push(key);
        }
      }
      return result;
    }
    module.exports = baseKeys;
  }
});

// node_modules/lodash/isArrayLike.js
var require_isArrayLike = __commonJS({
  "node_modules/lodash/isArrayLike.js"(exports, module) {
    "use strict";
    var isFunction = require_isFunction();
    var isLength = require_isLength();
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value);
    }
    module.exports = isArrayLike;
  }
});

// node_modules/lodash/keys.js
var require_keys = __commonJS({
  "node_modules/lodash/keys.js"(exports, module) {
    "use strict";
    var arrayLikeKeys = require_arrayLikeKeys();
    var baseKeys = require_baseKeys();
    var isArrayLike = require_isArrayLike();
    function keys(object) {
      return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
    }
    module.exports = keys;
  }
});

// node_modules/lodash/_getAllKeys.js
var require_getAllKeys = __commonJS({
  "node_modules/lodash/_getAllKeys.js"(exports, module) {
    "use strict";
    var baseGetAllKeys = require_baseGetAllKeys();
    var getSymbols = require_getSymbols();
    var keys = require_keys();
    function getAllKeys(object) {
      return baseGetAllKeys(object, keys, getSymbols);
    }
    module.exports = getAllKeys;
  }
});

// node_modules/lodash/_equalObjects.js
var require_equalObjects = __commonJS({
  "node_modules/lodash/_equalObjects.js"(exports, module) {
    "use strict";
    var getAllKeys = require_getAllKeys();
    var COMPARE_PARTIAL_FLAG = 1;
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
      if (objLength != othLength && !isPartial) {
        return false;
      }
      var index = objLength;
      while (index--) {
        var key = objProps[index];
        if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
          return false;
        }
      }
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
        var objValue = object[key], othValue = other[key];
        if (customizer) {
          var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
        }
        if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
          result = false;
          break;
        }
        skipCtor || (skipCtor = key == "constructor");
      }
      if (result && !skipCtor) {
        var objCtor = object.constructor, othCtor = other.constructor;
        if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
          result = false;
        }
      }
      stack["delete"](object);
      stack["delete"](other);
      return result;
    }
    module.exports = equalObjects;
  }
});

// node_modules/lodash/_DataView.js
var require_DataView = __commonJS({
  "node_modules/lodash/_DataView.js"(exports, module) {
    "use strict";
    var getNative = require_getNative();
    var root = require_root();
    var DataView = getNative(root, "DataView");
    module.exports = DataView;
  }
});

// node_modules/lodash/_Promise.js
var require_Promise = __commonJS({
  "node_modules/lodash/_Promise.js"(exports, module) {
    "use strict";
    var getNative = require_getNative();
    var root = require_root();
    var Promise2 = getNative(root, "Promise");
    module.exports = Promise2;
  }
});

// node_modules/lodash/_Set.js
var require_Set = __commonJS({
  "node_modules/lodash/_Set.js"(exports, module) {
    "use strict";
    var getNative = require_getNative();
    var root = require_root();
    var Set2 = getNative(root, "Set");
    module.exports = Set2;
  }
});

// node_modules/lodash/_WeakMap.js
var require_WeakMap = __commonJS({
  "node_modules/lodash/_WeakMap.js"(exports, module) {
    "use strict";
    var getNative = require_getNative();
    var root = require_root();
    var WeakMap = getNative(root, "WeakMap");
    module.exports = WeakMap;
  }
});

// node_modules/lodash/_getTag.js
var require_getTag = __commonJS({
  "node_modules/lodash/_getTag.js"(exports, module) {
    "use strict";
    var DataView = require_DataView();
    var Map = require_Map();
    var Promise2 = require_Promise();
    var Set2 = require_Set();
    var WeakMap = require_WeakMap();
    var baseGetTag = require_baseGetTag();
    var toSource = require_toSource();
    var mapTag = "[object Map]";
    var objectTag = "[object Object]";
    var promiseTag = "[object Promise]";
    var setTag = "[object Set]";
    var weakMapTag = "[object WeakMap]";
    var dataViewTag = "[object DataView]";
    var dataViewCtorString = toSource(DataView);
    var mapCtorString = toSource(Map);
    var promiseCtorString = toSource(Promise2);
    var setCtorString = toSource(Set2);
    var weakMapCtorString = toSource(WeakMap);
    var getTag2 = baseGetTag;
    if (DataView && getTag2(new DataView(new ArrayBuffer(1))) != dataViewTag || Map && getTag2(new Map()) != mapTag || Promise2 && getTag2(Promise2.resolve()) != promiseTag || Set2 && getTag2(new Set2()) != setTag || WeakMap && getTag2(new WeakMap()) != weakMapTag) {
      getTag2 = function(value) {
        var result = baseGetTag(value), Ctor = result == objectTag ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
        if (ctorString) {
          switch (ctorString) {
            case dataViewCtorString:
              return dataViewTag;
            case mapCtorString:
              return mapTag;
            case promiseCtorString:
              return promiseTag;
            case setCtorString:
              return setTag;
            case weakMapCtorString:
              return weakMapTag;
          }
        }
        return result;
      };
    }
    module.exports = getTag2;
  }
});

// node_modules/lodash/_baseIsEqualDeep.js
var require_baseIsEqualDeep = __commonJS({
  "node_modules/lodash/_baseIsEqualDeep.js"(exports, module) {
    "use strict";
    var Stack = require_Stack();
    var equalArrays = require_equalArrays();
    var equalByTag = require_equalByTag();
    var equalObjects = require_equalObjects();
    var getTag2 = require_getTag();
    var isArray = require_isArray();
    var isBuffer = require_isBuffer();
    var isTypedArray = require_isTypedArray();
    var COMPARE_PARTIAL_FLAG = 1;
    var argsTag = "[object Arguments]";
    var arrayTag = "[object Array]";
    var objectTag = "[object Object]";
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
      var objIsArr = isArray(object), othIsArr = isArray(other), objTag = objIsArr ? arrayTag : getTag2(object), othTag = othIsArr ? arrayTag : getTag2(other);
      objTag = objTag == argsTag ? objectTag : objTag;
      othTag = othTag == argsTag ? objectTag : othTag;
      var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
      if (isSameTag && isBuffer(object)) {
        if (!isBuffer(other)) {
          return false;
        }
        objIsArr = true;
        objIsObj = false;
      }
      if (isSameTag && !objIsObj) {
        stack || (stack = new Stack());
        return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
      }
      if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
        var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
        if (objIsWrapped || othIsWrapped) {
          var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
          stack || (stack = new Stack());
          return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
        }
      }
      if (!isSameTag) {
        return false;
      }
      stack || (stack = new Stack());
      return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
    }
    module.exports = baseIsEqualDeep;
  }
});

// node_modules/lodash/_baseIsEqual.js
var require_baseIsEqual = __commonJS({
  "node_modules/lodash/_baseIsEqual.js"(exports, module) {
    "use strict";
    var baseIsEqualDeep = require_baseIsEqualDeep();
    var isObjectLike = require_isObjectLike();
    function baseIsEqual(value, other, bitmask, customizer, stack) {
      if (value === other) {
        return true;
      }
      if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
        return value !== value && other !== other;
      }
      return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
    }
    module.exports = baseIsEqual;
  }
});

// node_modules/lodash/isEqualWith.js
var require_isEqualWith = __commonJS({
  "node_modules/lodash/isEqualWith.js"(exports, module) {
    "use strict";
    var baseIsEqual = require_baseIsEqual();
    function isEqualWith2(value, other, customizer) {
      customizer = typeof customizer == "function" ? customizer : void 0;
      var result = customizer ? customizer(value, other) : void 0;
      return result === void 0 ? baseIsEqual(value, other, void 0, customizer) : !!result;
    }
    module.exports = isEqualWith2;
  }
});

// node_modules/@testing-library/preact/dist/esm/index.mjs
var esm_exports = {};
__export(esm_exports, {
  act: () => act,
  cleanup: () => cleanup,
  fireEvent: () => fireEvent,
  render: () => render,
  renderHook: () => renderHook
});

// node_modules/@testing-library/preact/dist/esm/pure.mjs
var pure_exports = {};
__export(pure_exports, {
  act: () => act,
  cleanup: () => cleanup,
  fireEvent: () => fireEvent,
  render: () => render,
  renderHook: () => renderHook
});
import { getQueriesForElement, prettyDOM, configure as configureDTL } from "@testing-library/dom.js";
import { h, hydrate as preactHydrate, render as preactRender, createRef } from "preact";
import { useEffect } from "preact/hooks";
import { act } from "preact/test-utils";

// node_modules/@testing-library/preact/dist/esm/fire-event.mjs
import { fireEvent as domFireEvent, createEvent } from "@testing-library/dom.js";
import { options } from "preact";
var isCompat = false;
var oldHook = options.vnode;
options.vnode = (vnode) => {
  if (vnode.$$typeof) isCompat = true;
  if (oldHook) oldHook(vnode);
};
var renameEventCompat = (key) => {
  return key === "change" ? "input" : key;
};
var fireEvent = (...args) => domFireEvent(...args);
Object.keys(domFireEvent).forEach((key) => {
  fireEvent[key] = (elem, init) => {
    const eventName = `on${key.toLowerCase()}`;
    const isInElem = eventName in elem;
    const keyFiltered = !isCompat ? key : renameEventCompat(key);
    return isInElem ? domFireEvent[keyFiltered](elem, init) : domFireEvent(elem, createEvent(keyFiltered[0].toUpperCase() + keyFiltered.slice(1), elem, init));
  };
});

// node_modules/@testing-library/preact/dist/esm/pure.mjs
__reExport(pure_exports, dom_star);
import * as dom_star from "@testing-library/dom.js";
configureDTL({
  asyncWrapper: async (cb) => {
    let result;
    await act(() => {
      result = cb();
    });
    return result;
  },
  eventWrapper: (cb) => {
    let result;
    act(() => {
      result = cb();
    });
    return result;
  }
});
var mountedContainers = /* @__PURE__ */ new Set();
function render(ui, {
  container,
  baseElement = container,
  queries,
  hydrate = false,
  wrapper: WrapperComponent
} = {}) {
  if (!baseElement) {
    baseElement = document.body;
  }
  if (!container) {
    container = baseElement.appendChild(document.createElement("div"));
  }
  mountedContainers.add(container);
  const wrapUiIfNeeded = (innerElement) => WrapperComponent ? h(WrapperComponent, null, innerElement) : innerElement;
  act(() => {
    if (hydrate) {
      preactHydrate(wrapUiIfNeeded(ui), container);
    } else {
      preactRender(wrapUiIfNeeded(ui), container);
    }
  });
  return {
    container,
    baseElement,
    debug: (el = baseElement, maxLength, options2) => Array.isArray(el) ? el.forEach((e) => console.log(prettyDOM(e, maxLength, options2))) : console.log(prettyDOM(el, maxLength, options2)),
    unmount: () => preactRender(null, container),
    rerender: (rerenderUi) => {
      act(() => {
      });
      render(wrapUiIfNeeded(rerenderUi), {
        container,
        baseElement
      });
    },
    asFragment: () => {
      if (typeof document.createRange === "function") {
        return document.createRange().createContextualFragment(container.innerHTML);
      } else {
        const template = document.createElement("template");
        template.innerHTML = container.innerHTML;
        return template.content;
      }
    },
    ...getQueriesForElement(baseElement, queries)
  };
}
function cleanupAtContainer(container) {
  preactRender(null, container);
  if (container.parentNode === document.body) {
    document.body.removeChild(container);
  }
  mountedContainers.delete(container);
}
function cleanup() {
  mountedContainers.forEach(cleanupAtContainer);
}
function renderHook(renderCallback, options2) {
  const {
    initialProps,
    wrapper
  } = options2 || {};
  const result = createRef();
  function TestComponent({
    renderCallbackProps
  }) {
    const pendingResult = renderCallback(renderCallbackProps);
    useEffect(() => {
      result.current = pendingResult;
    });
    return null;
  }
  const {
    rerender: baseRerender,
    unmount
  } = render(h(TestComponent, {
    renderCallbackProps: initialProps
  }), {
    wrapper
  });
  function rerender(rerenderCallbackProps) {
    return baseRerender(h(TestComponent, {
      renderCallbackProps: rerenderCallbackProps
    }));
  }
  return {
    result,
    rerender,
    unmount
  };
}

// node_modules/@testing-library/preact/dist/esm/index.mjs
__reExport(esm_exports, pure_exports);
if (typeof process === "undefined" || !process.env.PTL_SKIP_AUTO_CLEANUP) {
  if (typeof afterEach === "function") {
    afterEach(async () => {
      await cleanup();
    });
  } else if (typeof teardown === "function") {
    teardown(async () => {
      await cleanup();
    });
  }
}

// node_modules/@testing-library/jest-dom/dist/matchers-c85aadf8.mjs
var import_isEqualWith = __toESM(require_isEqualWith(), 1);
import redent from "redent.js";
import { parse } from "@adobe/css-tools.js";
import { computeAccessibleDescription, computeAccessibleName } from "dom-accessibility-api.js";
import { elementRoles, roles } from "aria-query.js";
import chalk from "chalk.js";
import escape from "css.escape.js";
var GenericTypeError = class extends Error {
  constructor(expectedString, received, matcherFn, context) {
    super();
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, matcherFn);
    }
    let withType = "";
    try {
      withType = context.utils.printWithType(
        "Received",
        received,
        context.utils.printReceived
      );
    } catch (e) {
    }
    this.message = [
      context.utils.matcherHint(
        `${context.isNot ? ".not" : ""}.${matcherFn.name}`,
        "received",
        ""
      ),
      "",
      // eslint-disable-next-line new-cap
      `${context.utils.RECEIVED_COLOR(
        "received"
      )} value must ${expectedString}.`,
      withType
    ].join("\n");
  }
};
var HtmlElementTypeError = class extends GenericTypeError {
  constructor(...args) {
    super("be an HTMLElement or an SVGElement", ...args);
  }
};
var NodeTypeError = class extends GenericTypeError {
  constructor(...args) {
    super("be a Node", ...args);
  }
};
function checkHasWindow(htmlElement, ErrorClass, ...args) {
  if (!htmlElement || !htmlElement.ownerDocument || !htmlElement.ownerDocument.defaultView) {
    throw new ErrorClass(htmlElement, ...args);
  }
}
function checkNode(node, ...args) {
  checkHasWindow(node, NodeTypeError, ...args);
  const window = node.ownerDocument.defaultView;
  if (!(node instanceof window.Node)) {
    throw new NodeTypeError(node, ...args);
  }
}
function checkHtmlElement(htmlElement, ...args) {
  checkHasWindow(htmlElement, HtmlElementTypeError, ...args);
  const window = htmlElement.ownerDocument.defaultView;
  if (!(htmlElement instanceof window.HTMLElement) && !(htmlElement instanceof window.SVGElement)) {
    throw new HtmlElementTypeError(htmlElement, ...args);
  }
}
var InvalidCSSError = class extends Error {
  constructor(received, matcherFn, context) {
    super();
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, matcherFn);
    }
    this.message = [
      received.message,
      "",
      // eslint-disable-next-line new-cap
      context.utils.RECEIVED_COLOR(`Failing css:`),
      // eslint-disable-next-line new-cap
      context.utils.RECEIVED_COLOR(`${received.css}`)
    ].join("\n");
  }
};
function parseCSS(css, ...args) {
  const ast = parse(`selector { ${css} }`, { silent: true }).stylesheet;
  if (ast.parsingErrors && ast.parsingErrors.length > 0) {
    const { reason, line } = ast.parsingErrors[0];
    throw new InvalidCSSError(
      {
        css,
        message: `Syntax error parsing expected css: ${reason} on line: ${line}`
      },
      ...args
    );
  }
  const parsedRules = ast.rules[0].declarations.filter((d) => d.type === "declaration").reduce(
    (obj, { property, value }) => Object.assign(obj, { [property]: value }),
    {}
  );
  return parsedRules;
}
function display(context, value) {
  return typeof value === "string" ? value : context.utils.stringify(value);
}
function getMessage(context, matcher, expectedLabel, expectedValue, receivedLabel, receivedValue) {
  return [
    `${matcher}
`,
    // eslint-disable-next-line new-cap
    `${expectedLabel}:
${context.utils.EXPECTED_COLOR(
      redent(display(context, expectedValue), 2)
    )}`,
    // eslint-disable-next-line new-cap
    `${receivedLabel}:
${context.utils.RECEIVED_COLOR(
      redent(display(context, receivedValue), 2)
    )}`
  ].join("\n");
}
function matches(textToMatch, matcher) {
  if (matcher instanceof RegExp) {
    return matcher.test(textToMatch);
  } else {
    return textToMatch.includes(String(matcher));
  }
}
function deprecate(name, replacementText) {
  console.warn(
    `Warning: ${name} has been deprecated and will be removed in future updates.`,
    replacementText
  );
}
function normalize(text) {
  return text.replace(/\s+/g, " ").trim();
}
function getTag(element) {
  return element.tagName && element.tagName.toLowerCase();
}
function getSelectValue({ multiple, options: options2 }) {
  const selectedOptions = [...options2].filter((option) => option.selected);
  if (multiple) {
    return [...selectedOptions].map((opt) => opt.value);
  }
  if (selectedOptions.length === 0) {
    return void 0;
  }
  return selectedOptions[0].value;
}
function getInputValue(inputElement) {
  switch (inputElement.type) {
    case "number":
      return inputElement.value === "" ? null : Number(inputElement.value);
    case "checkbox":
      return inputElement.checked;
    default:
      return inputElement.value;
  }
}
var rolesSupportingValues = ["meter", "progressbar", "slider", "spinbutton"];
function getAccessibleValue(element) {
  if (!rolesSupportingValues.includes(element.getAttribute("role"))) {
    return void 0;
  }
  return Number(element.getAttribute("aria-valuenow"));
}
function getSingleElementValue(element) {
  if (!element) {
    return void 0;
  }
  switch (element.tagName.toLowerCase()) {
    case "input":
      return getInputValue(element);
    case "select":
      return getSelectValue(element);
    default: {
      return element.value ?? getAccessibleValue(element);
    }
  }
}
function toSentence(array, { wordConnector = ", ", lastWordConnector = " and " } = {}) {
  return [array.slice(0, -1).join(wordConnector), array[array.length - 1]].join(
    array.length > 1 ? lastWordConnector : ""
  );
}
function compareArraysAsSet(arr1, arr2) {
  if (Array.isArray(arr1) && Array.isArray(arr2)) {
    return [...new Set(arr1)].every((v) => new Set(arr2).has(v));
  }
  return void 0;
}
function toBeInTheDOM(element, container) {
  deprecate(
    "toBeInTheDOM",
    "Please use toBeInTheDocument for searching the entire document and toContainElement for searching a specific container."
  );
  if (element) {
    checkHtmlElement(element, toBeInTheDOM, this);
  }
  if (container) {
    checkHtmlElement(container, toBeInTheDOM, this);
  }
  return {
    pass: container ? container.contains(element) : !!element,
    message: () => {
      return [
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.toBeInTheDOM`,
          "element",
          ""
        ),
        "",
        "Received:",
        `  ${this.utils.printReceived(
          element ? element.cloneNode(false) : element
        )}`
      ].join("\n");
    }
  };
}
function toBeInTheDocument(element) {
  if (element !== null || !this.isNot) {
    checkHtmlElement(element, toBeInTheDocument, this);
  }
  const pass = element === null ? false : element.ownerDocument === element.getRootNode({ composed: true });
  const errorFound = () => {
    return `expected document not to contain element, found ${this.utils.stringify(
      element.cloneNode(true)
    )} instead`;
  };
  const errorNotFound = () => {
    return `element could not be found in the document`;
  };
  return {
    pass,
    message: () => {
      return [
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.toBeInTheDocument`,
          "element",
          ""
        ),
        "",
        // eslint-disable-next-line new-cap
        this.utils.RECEIVED_COLOR(this.isNot ? errorFound() : errorNotFound())
      ].join("\n");
    }
  };
}
function toBeEmpty(element) {
  deprecate(
    "toBeEmpty",
    "Please use instead toBeEmptyDOMElement for finding empty nodes in the DOM."
  );
  checkHtmlElement(element, toBeEmpty, this);
  return {
    pass: element.innerHTML === "",
    message: () => {
      return [
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.toBeEmpty`,
          "element",
          ""
        ),
        "",
        "Received:",
        `  ${this.utils.printReceived(element.innerHTML)}`
      ].join("\n");
    }
  };
}
function toBeEmptyDOMElement(element) {
  checkHtmlElement(element, toBeEmptyDOMElement, this);
  return {
    pass: isEmptyElement(element),
    message: () => {
      return [
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.toBeEmptyDOMElement`,
          "element",
          ""
        ),
        "",
        "Received:",
        `  ${this.utils.printReceived(element.innerHTML)}`
      ].join("\n");
    }
  };
}
function isEmptyElement(element) {
  const nonCommentChildNodes = [...element.childNodes].filter((node) => node.nodeType !== 8);
  return nonCommentChildNodes.length === 0;
}
function toContainElement(container, element) {
  checkHtmlElement(container, toContainElement, this);
  if (element !== null) {
    checkHtmlElement(element, toContainElement, this);
  }
  return {
    pass: container.contains(element),
    message: () => {
      return [
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.toContainElement`,
          "element",
          "element"
        ),
        "",
        // eslint-disable-next-line new-cap
        this.utils.RECEIVED_COLOR(`${this.utils.stringify(
          container.cloneNode(false)
        )} ${this.isNot ? "contains:" : "does not contain:"} ${this.utils.stringify(element ? element.cloneNode(false) : element)}
        `)
      ].join("\n");
    }
  };
}
function getNormalizedHtml(container, htmlText) {
  const div = container.ownerDocument.createElement("div");
  div.innerHTML = htmlText;
  return div.innerHTML;
}
function toContainHTML(container, htmlText) {
  checkHtmlElement(container, toContainHTML, this);
  if (typeof htmlText !== "string") {
    throw new Error(`.toContainHTML() expects a string value, got ${htmlText}`);
  }
  return {
    pass: container.outerHTML.includes(getNormalizedHtml(container, htmlText)),
    message: () => {
      return [
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.toContainHTML`,
          "element",
          ""
        ),
        "Expected:",
        // eslint-disable-next-line new-cap
        `  ${this.utils.EXPECTED_COLOR(htmlText)}`,
        "Received:",
        `  ${this.utils.printReceived(container.cloneNode(true))}`
      ].join("\n");
    }
  };
}
function toHaveTextContent(node, checkWith, options2 = { normalizeWhitespace: true }) {
  checkNode(node, toHaveTextContent, this);
  const textContent = options2.normalizeWhitespace ? normalize(node.textContent) : node.textContent.replace(/\u00a0/g, " ");
  const checkingWithEmptyString = textContent !== "" && checkWith === "";
  return {
    pass: !checkingWithEmptyString && matches(textContent, checkWith),
    message: () => {
      const to = this.isNot ? "not to" : "to";
      return getMessage(
        this,
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.toHaveTextContent`,
          "element",
          ""
        ),
        checkingWithEmptyString ? `Checking with empty string will always match, use .toBeEmptyDOMElement() instead` : `Expected element ${to} have text content`,
        checkWith,
        "Received",
        textContent
      );
    }
  };
}
function toHaveAccessibleDescription(htmlElement, expectedAccessibleDescription) {
  checkHtmlElement(htmlElement, toHaveAccessibleDescription, this);
  const actualAccessibleDescription = computeAccessibleDescription(htmlElement);
  const missingExpectedValue = arguments.length === 1;
  let pass = false;
  if (missingExpectedValue) {
    pass = actualAccessibleDescription !== "";
  } else {
    pass = expectedAccessibleDescription instanceof RegExp ? expectedAccessibleDescription.test(actualAccessibleDescription) : this.equals(
      actualAccessibleDescription,
      expectedAccessibleDescription
    );
  }
  return {
    pass,
    message: () => {
      const to = this.isNot ? "not to" : "to";
      return getMessage(
        this,
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.${toHaveAccessibleDescription.name}`,
          "element",
          ""
        ),
        `Expected element ${to} have accessible description`,
        expectedAccessibleDescription,
        "Received",
        actualAccessibleDescription
      );
    }
  };
}
var ariaInvalidName = "aria-invalid";
var validStates = ["false"];
function toHaveAccessibleErrorMessage(htmlElement, expectedAccessibleErrorMessage) {
  var _a;
  checkHtmlElement(htmlElement, toHaveAccessibleErrorMessage, this);
  const to = this.isNot ? "not to" : "to";
  const method = this.isNot ? ".not.toHaveAccessibleErrorMessage" : ".toHaveAccessibleErrorMessage";
  const errormessageId = htmlElement.getAttribute("aria-errormessage");
  const errormessageIdInvalid = !!errormessageId && /\s+/.test(errormessageId);
  if (errormessageIdInvalid) {
    return {
      pass: false,
      message: () => {
        return getMessage(
          this,
          this.utils.matcherHint(method, "element"),
          "Expected element's `aria-errormessage` attribute to be empty or a single, valid ID",
          "",
          "Received",
          `aria-errormessage="${errormessageId}"`
        );
      }
    };
  }
  const ariaInvalidVal = htmlElement.getAttribute(ariaInvalidName);
  const fieldValid = !htmlElement.hasAttribute(ariaInvalidName) || validStates.includes(ariaInvalidVal);
  if (fieldValid) {
    return {
      pass: false,
      message: () => {
        return getMessage(
          this,
          this.utils.matcherHint(method, "element"),
          "Expected element to be marked as invalid with attribute",
          `${ariaInvalidName}="${String(true)}"`,
          "Received",
          htmlElement.hasAttribute("aria-invalid") ? `${ariaInvalidName}="${htmlElement.getAttribute(ariaInvalidName)}` : null
        );
      }
    };
  }
  const error = normalize(
    ((_a = htmlElement.ownerDocument.getElementById(errormessageId)) == null ? void 0 : _a.textContent) ?? ""
  );
  return {
    pass: expectedAccessibleErrorMessage === void 0 ? Boolean(error) : expectedAccessibleErrorMessage instanceof RegExp ? expectedAccessibleErrorMessage.test(error) : this.equals(error, expectedAccessibleErrorMessage),
    message: () => {
      return getMessage(
        this,
        this.utils.matcherHint(method, "element"),
        `Expected element ${to} have accessible error message`,
        expectedAccessibleErrorMessage ?? "",
        "Received",
        error
      );
    }
  };
}
var elementRoleList = buildElementRoleList(elementRoles);
function toHaveRole(htmlElement, expectedRole) {
  checkHtmlElement(htmlElement, toHaveRole, this);
  const actualRoles = getExplicitOrImplicitRoles(htmlElement);
  const pass = actualRoles.some((el) => el === expectedRole);
  return {
    pass,
    message: () => {
      const to = this.isNot ? "not to" : "to";
      return getMessage(
        this,
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.${toHaveRole.name}`,
          "element",
          ""
        ),
        `Expected element ${to} have role`,
        expectedRole,
        "Received",
        actualRoles.join(", ")
      );
    }
  };
}
function getExplicitOrImplicitRoles(htmlElement) {
  const hasExplicitRole = htmlElement.hasAttribute("role");
  if (hasExplicitRole) {
    const roleValue = htmlElement.getAttribute("role");
    return roleValue.split(" ").filter(Boolean);
  }
  const implicitRoles = getImplicitAriaRoles(htmlElement);
  return implicitRoles;
}
function getImplicitAriaRoles(currentNode) {
  for (const { match, roles: roles2 } of elementRoleList) {
    if (match(currentNode)) {
      return [...roles2];
    }
  }
  return [];
}
function buildElementRoleList(elementRolesMap) {
  function makeElementSelector({ name, attributes }) {
    return `${name}${attributes.map(({ name: attributeName, value, constraints = [] }) => {
      const shouldNotExist = constraints.indexOf("undefined") !== -1;
      if (shouldNotExist) {
        return `:not([${attributeName}])`;
      } else if (value) {
        return `[${attributeName}="${value}"]`;
      } else {
        return `[${attributeName}]`;
      }
    }).join("")}`;
  }
  function getSelectorSpecificity({ attributes = [] }) {
    return attributes.length;
  }
  function bySelectorSpecificity({ specificity: leftSpecificity }, { specificity: rightSpecificity }) {
    return rightSpecificity - leftSpecificity;
  }
  function match(element) {
    let { attributes = [] } = element;
    const typeTextIndex = attributes.findIndex(
      (attribute) => attribute.value && attribute.name === "type" && attribute.value === "text"
    );
    if (typeTextIndex >= 0) {
      attributes = [
        ...attributes.slice(0, typeTextIndex),
        ...attributes.slice(typeTextIndex + 1)
      ];
    }
    const selector = makeElementSelector({ ...element, attributes });
    return (node) => {
      if (typeTextIndex >= 0 && node.type !== "text") {
        return false;
      }
      return node.matches(selector);
    };
  }
  let result = [];
  for (const [element, roles2] of elementRolesMap.entries()) {
    result = [
      ...result,
      {
        match: match(element),
        roles: Array.from(roles2),
        specificity: getSelectorSpecificity(element)
      }
    ];
  }
  return result.sort(bySelectorSpecificity);
}
function toHaveAccessibleName(htmlElement, expectedAccessibleName) {
  checkHtmlElement(htmlElement, toHaveAccessibleName, this);
  const actualAccessibleName = computeAccessibleName(htmlElement);
  const missingExpectedValue = arguments.length === 1;
  let pass = false;
  if (missingExpectedValue) {
    pass = actualAccessibleName !== "";
  } else {
    pass = expectedAccessibleName instanceof RegExp ? expectedAccessibleName.test(actualAccessibleName) : this.equals(actualAccessibleName, expectedAccessibleName);
  }
  return {
    pass,
    message: () => {
      const to = this.isNot ? "not to" : "to";
      return getMessage(
        this,
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.${toHaveAccessibleName.name}`,
          "element",
          ""
        ),
        `Expected element ${to} have accessible name`,
        expectedAccessibleName,
        "Received",
        actualAccessibleName
      );
    }
  };
}
function printAttribute(stringify, name, value) {
  return value === void 0 ? name : `${name}=${stringify(value)}`;
}
function getAttributeComment(stringify, name, value) {
  return value === void 0 ? `element.hasAttribute(${stringify(name)})` : `element.getAttribute(${stringify(name)}) === ${stringify(value)}`;
}
function toHaveAttribute(htmlElement, name, expectedValue) {
  checkHtmlElement(htmlElement, toHaveAttribute, this);
  const isExpectedValuePresent = expectedValue !== void 0;
  const hasAttribute = htmlElement.hasAttribute(name);
  const receivedValue = htmlElement.getAttribute(name);
  return {
    pass: isExpectedValuePresent ? hasAttribute && this.equals(receivedValue, expectedValue) : hasAttribute,
    message: () => {
      const to = this.isNot ? "not to" : "to";
      const receivedAttribute = hasAttribute ? printAttribute(this.utils.stringify, name, receivedValue) : null;
      const matcher = this.utils.matcherHint(
        `${this.isNot ? ".not" : ""}.toHaveAttribute`,
        "element",
        this.utils.printExpected(name),
        {
          secondArgument: isExpectedValuePresent ? this.utils.printExpected(expectedValue) : void 0,
          comment: getAttributeComment(
            this.utils.stringify,
            name,
            expectedValue
          )
        }
      );
      return getMessage(
        this,
        matcher,
        `Expected the element ${to} have attribute`,
        printAttribute(this.utils.stringify, name, expectedValue),
        "Received",
        receivedAttribute
      );
    }
  };
}
function getExpectedClassNamesAndOptions(params) {
  const lastParam = params.pop();
  let expectedClassNames, options2;
  if (typeof lastParam === "object" && !(lastParam instanceof RegExp)) {
    expectedClassNames = params;
    options2 = lastParam;
  } else {
    expectedClassNames = params.concat(lastParam);
    options2 = { exact: false };
  }
  return { expectedClassNames, options: options2 };
}
function splitClassNames(str) {
  if (!str) return [];
  return str.split(/\s+/).filter((s) => s.length > 0);
}
function isSubset$1(subset, superset) {
  return subset.every(
    (strOrRegexp) => typeof strOrRegexp === "string" ? superset.includes(strOrRegexp) : superset.some((className) => strOrRegexp.test(className))
  );
}
function toHaveClass(htmlElement, ...params) {
  checkHtmlElement(htmlElement, toHaveClass, this);
  const { expectedClassNames, options: options2 } = getExpectedClassNamesAndOptions(params);
  const received = splitClassNames(htmlElement.getAttribute("class"));
  const expected = expectedClassNames.reduce(
    (acc, className) => acc.concat(
      typeof className === "string" || !className ? splitClassNames(className) : className
    ),
    []
  );
  const hasRegExp = expected.some((className) => className instanceof RegExp);
  if (options2.exact && hasRegExp) {
    throw new Error("Exact option does not support RegExp expected class names");
  }
  if (options2.exact) {
    return {
      pass: isSubset$1(expected, received) && expected.length === received.length,
      message: () => {
        const to = this.isNot ? "not to" : "to";
        return getMessage(
          this,
          this.utils.matcherHint(
            `${this.isNot ? ".not" : ""}.toHaveClass`,
            "element",
            this.utils.printExpected(expected.join(" "))
          ),
          `Expected the element ${to} have EXACTLY defined classes`,
          expected.join(" "),
          "Received",
          received.join(" ")
        );
      }
    };
  }
  return expected.length > 0 ? {
    pass: isSubset$1(expected, received),
    message: () => {
      const to = this.isNot ? "not to" : "to";
      return getMessage(
        this,
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.toHaveClass`,
          "element",
          this.utils.printExpected(expected.join(" "))
        ),
        `Expected the element ${to} have class`,
        expected.join(" "),
        "Received",
        received.join(" ")
      );
    }
  } : {
    pass: this.isNot ? received.length > 0 : false,
    message: () => this.isNot ? getMessage(
      this,
      this.utils.matcherHint(".not.toHaveClass", "element", ""),
      "Expected the element to have classes",
      "(none)",
      "Received",
      received.join(" ")
    ) : [
      this.utils.matcherHint(`.toHaveClass`, "element"),
      "At least one expected class must be provided."
    ].join("\n")
  };
}
function getStyleDeclaration(document2, css) {
  const styles = {};
  const copy = document2.createElement("div");
  Object.keys(css).forEach((property) => {
    copy.style[property] = css[property];
    styles[property] = copy.style[property];
  });
  return styles;
}
function isSubset(styles, computedStyle) {
  return !!Object.keys(styles).length && Object.entries(styles).every(([prop, value]) => {
    const isCustomProperty = prop.startsWith("--");
    const spellingVariants = [prop];
    if (!isCustomProperty) spellingVariants.push(prop.toLowerCase());
    return spellingVariants.some(
      (name) => computedStyle[name] === value || computedStyle.getPropertyValue(name) === value
    );
  });
}
function printoutStyles(styles) {
  return Object.keys(styles).sort().map((prop) => `${prop}: ${styles[prop]};`).join("\n");
}
function expectedDiff(diffFn, expected, computedStyles) {
  const received = Array.from(computedStyles).filter((prop) => expected[prop] !== void 0).reduce(
    (obj, prop) => Object.assign(obj, { [prop]: computedStyles.getPropertyValue(prop) }),
    {}
  );
  const diffOutput = diffFn(printoutStyles(expected), printoutStyles(received));
  return diffOutput.replace(`${chalk.red("+ Received")}
`, "");
}
function toHaveStyle(htmlElement, css) {
  checkHtmlElement(htmlElement, toHaveStyle, this);
  const parsedCSS = typeof css === "object" ? css : parseCSS(css, toHaveStyle, this);
  const { getComputedStyle } = htmlElement.ownerDocument.defaultView;
  const expected = getStyleDeclaration(htmlElement.ownerDocument, parsedCSS);
  const received = getComputedStyle(htmlElement);
  return {
    pass: isSubset(expected, received),
    message: () => {
      const matcher = `${this.isNot ? ".not" : ""}.toHaveStyle`;
      return [
        this.utils.matcherHint(matcher, "element", ""),
        expectedDiff(this.utils.diff, expected, received)
      ].join("\n\n");
    }
  };
}
function toHaveFocus(element) {
  checkHtmlElement(element, toHaveFocus, this);
  return {
    pass: element.ownerDocument.activeElement === element,
    message: () => {
      return [
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.toHaveFocus`,
          "element",
          ""
        ),
        "",
        ...this.isNot ? [
          "Received element is focused:",
          `  ${this.utils.printReceived(element)}`
        ] : [
          "Expected element with focus:",
          `  ${this.utils.printExpected(element)}`,
          "Received element with focus:",
          `  ${this.utils.printReceived(
            element.ownerDocument.activeElement
          )}`
        ]
      ].join("\n");
    }
  };
}
function getMultiElementValue(elements) {
  const types = [...new Set(elements.map((element) => element.type))];
  if (types.length !== 1) {
    throw new Error(
      "Multiple form elements with the same name must be of the same type"
    );
  }
  switch (types[0]) {
    case "radio": {
      const theChosenOne = elements.find((radio) => radio.checked);
      return theChosenOne ? theChosenOne.value : void 0;
    }
    case "checkbox":
      return elements.filter((checkbox) => checkbox.checked).map((checkbox) => checkbox.value);
    default:
      return elements.map((element) => element.value);
  }
}
function getFormValue(container, name) {
  const elements = [...container.querySelectorAll(`[name="${escape(name)}"]`)];
  if (elements.length === 0) {
    return void 0;
  }
  switch (elements.length) {
    case 1:
      return getSingleElementValue(elements[0]);
    default:
      return getMultiElementValue(elements);
  }
}
function getPureName(name) {
  return /\[\]$/.test(name) ? name.slice(0, -2) : name;
}
function getAllFormValues(container) {
  const names = Array.from(container.elements).map((element) => element.name);
  return names.reduce(
    (obj, name) => ({
      ...obj,
      [getPureName(name)]: getFormValue(container, name)
    }),
    {}
  );
}
function toHaveFormValues(formElement, expectedValues) {
  checkHtmlElement(formElement, toHaveFormValues, this);
  if (!formElement.elements) {
    throw new Error("toHaveFormValues must be called on a form or a fieldset");
  }
  const formValues = getAllFormValues(formElement);
  return {
    pass: Object.entries(expectedValues).every(
      ([name, expectedValue]) => (0, import_isEqualWith.default)(formValues[name], expectedValue, compareArraysAsSet)
    ),
    message: () => {
      const to = this.isNot ? "not to" : "to";
      const matcher = `${this.isNot ? ".not" : ""}.toHaveFormValues`;
      const commonKeyValues = Object.keys(formValues).filter((key) => expectedValues.hasOwnProperty(key)).reduce((obj, key) => ({ ...obj, [key]: formValues[key] }), {});
      return [
        this.utils.matcherHint(matcher, "element", ""),
        `Expected the element ${to} have form values`,
        this.utils.diff(expectedValues, commonKeyValues)
      ].join("\n\n");
    }
  };
}
function isStyleVisible(element) {
  const { getComputedStyle } = element.ownerDocument.defaultView;
  const { display: display2, visibility, opacity } = getComputedStyle(element);
  return display2 !== "none" && visibility !== "hidden" && visibility !== "collapse" && opacity !== "0" && opacity !== 0;
}
function isAttributeVisible(element, previousElement) {
  let detailsVisibility;
  if (previousElement) {
    detailsVisibility = element.nodeName === "DETAILS" && previousElement.nodeName !== "SUMMARY" ? element.hasAttribute("open") : true;
  } else {
    detailsVisibility = element.nodeName === "DETAILS" ? element.hasAttribute("open") : true;
  }
  return !element.hasAttribute("hidden") && detailsVisibility;
}
function isElementVisible(element, previousElement) {
  return isStyleVisible(element) && isAttributeVisible(element, previousElement) && (!element.parentElement || isElementVisible(element.parentElement, element));
}
function toBeVisible(element) {
  checkHtmlElement(element, toBeVisible, this);
  const isInDocument = element.ownerDocument === element.getRootNode({ composed: true });
  const isVisible = isInDocument && isElementVisible(element);
  return {
    pass: isVisible,
    message: () => {
      const is = isVisible ? "is" : "is not";
      return [
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.toBeVisible`,
          "element",
          ""
        ),
        "",
        `Received element ${is} visible${isInDocument ? "" : " (element is not in the document)"}:`,
        `  ${this.utils.printReceived(element.cloneNode(false))}`
      ].join("\n");
    }
  };
}
var FORM_TAGS$2 = [
  "fieldset",
  "input",
  "select",
  "optgroup",
  "option",
  "button",
  "textarea"
];
function isFirstLegendChildOfFieldset(element, parent) {
  return getTag(element) === "legend" && getTag(parent) === "fieldset" && element.isSameNode(
    Array.from(parent.children).find((child) => getTag(child) === "legend")
  );
}
function isElementDisabledByParent(element, parent) {
  return isElementDisabled(parent) && !isFirstLegendChildOfFieldset(element, parent);
}
function isCustomElement(tag) {
  return tag.includes("-");
}
function canElementBeDisabled(element) {
  const tag = getTag(element);
  return FORM_TAGS$2.includes(tag) || isCustomElement(tag);
}
function isElementDisabled(element) {
  return canElementBeDisabled(element) && element.hasAttribute("disabled");
}
function isAncestorDisabled(element) {
  const parent = element.parentElement;
  return Boolean(parent) && (isElementDisabledByParent(element, parent) || isAncestorDisabled(parent));
}
function isElementOrAncestorDisabled(element) {
  return canElementBeDisabled(element) && (isElementDisabled(element) || isAncestorDisabled(element));
}
function toBeDisabled(element) {
  checkHtmlElement(element, toBeDisabled, this);
  const isDisabled = isElementOrAncestorDisabled(element);
  return {
    pass: isDisabled,
    message: () => {
      const is = isDisabled ? "is" : "is not";
      return [
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.toBeDisabled`,
          "element",
          ""
        ),
        "",
        `Received element ${is} disabled:`,
        `  ${this.utils.printReceived(element.cloneNode(false))}`
      ].join("\n");
    }
  };
}
function toBeEnabled(element) {
  checkHtmlElement(element, toBeEnabled, this);
  const isEnabled = !isElementOrAncestorDisabled(element);
  return {
    pass: isEnabled,
    message: () => {
      const is = isEnabled ? "is" : "is not";
      return [
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.toBeEnabled`,
          "element",
          ""
        ),
        "",
        `Received element ${is} enabled:`,
        `  ${this.utils.printReceived(element.cloneNode(false))}`
      ].join("\n");
    }
  };
}
var FORM_TAGS$1 = ["select", "textarea"];
var ARIA_FORM_TAGS = ["input", "select", "textarea"];
var UNSUPPORTED_INPUT_TYPES = [
  "color",
  "hidden",
  "range",
  "submit",
  "image",
  "reset"
];
var SUPPORTED_ARIA_ROLES = [
  "checkbox",
  "combobox",
  "gridcell",
  "listbox",
  "radiogroup",
  "spinbutton",
  "textbox",
  "tree"
];
function isRequiredOnFormTagsExceptInput(element) {
  return FORM_TAGS$1.includes(getTag(element)) && element.hasAttribute("required");
}
function isRequiredOnSupportedInput(element) {
  return getTag(element) === "input" && element.hasAttribute("required") && (element.hasAttribute("type") && !UNSUPPORTED_INPUT_TYPES.includes(element.getAttribute("type")) || !element.hasAttribute("type"));
}
function isElementRequiredByARIA(element) {
  return element.hasAttribute("aria-required") && element.getAttribute("aria-required") === "true" && (ARIA_FORM_TAGS.includes(getTag(element)) || element.hasAttribute("role") && SUPPORTED_ARIA_ROLES.includes(element.getAttribute("role")));
}
function toBeRequired(element) {
  checkHtmlElement(element, toBeRequired, this);
  const isRequired = isRequiredOnFormTagsExceptInput(element) || isRequiredOnSupportedInput(element) || isElementRequiredByARIA(element);
  return {
    pass: isRequired,
    message: () => {
      const is = isRequired ? "is" : "is not";
      return [
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.toBeRequired`,
          "element",
          ""
        ),
        "",
        `Received element ${is} required:`,
        `  ${this.utils.printReceived(element.cloneNode(false))}`
      ].join("\n");
    }
  };
}
var FORM_TAGS = ["form", "input", "select", "textarea"];
function isElementHavingAriaInvalid(element) {
  return element.hasAttribute("aria-invalid") && element.getAttribute("aria-invalid") !== "false";
}
function isSupportsValidityMethod(element) {
  return FORM_TAGS.includes(getTag(element));
}
function isElementInvalid(element) {
  const isHaveAriaInvalid = isElementHavingAriaInvalid(element);
  if (isSupportsValidityMethod(element)) {
    return isHaveAriaInvalid || !element.checkValidity();
  } else {
    return isHaveAriaInvalid;
  }
}
function toBeInvalid(element) {
  checkHtmlElement(element, toBeInvalid, this);
  const isInvalid = isElementInvalid(element);
  return {
    pass: isInvalid,
    message: () => {
      const is = isInvalid ? "is" : "is not";
      return [
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.toBeInvalid`,
          "element",
          ""
        ),
        "",
        `Received element ${is} currently invalid:`,
        `  ${this.utils.printReceived(element.cloneNode(false))}`
      ].join("\n");
    }
  };
}
function toBeValid(element) {
  checkHtmlElement(element, toBeValid, this);
  const isValid = !isElementInvalid(element);
  return {
    pass: isValid,
    message: () => {
      const is = isValid ? "is" : "is not";
      return [
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.toBeValid`,
          "element",
          ""
        ),
        "",
        `Received element ${is} currently valid:`,
        `  ${this.utils.printReceived(element.cloneNode(false))}`
      ].join("\n");
    }
  };
}
function toHaveValue(htmlElement, expectedValue) {
  checkHtmlElement(htmlElement, toHaveValue, this);
  if (htmlElement.tagName.toLowerCase() === "input" && ["checkbox", "radio"].includes(htmlElement.type)) {
    throw new Error(
      "input with type=checkbox or type=radio cannot be used with .toHaveValue(). Use .toBeChecked() for type=checkbox or .toHaveFormValues() instead"
    );
  }
  const receivedValue = getSingleElementValue(htmlElement);
  const expectsValue = expectedValue !== void 0;
  let expectedTypedValue = expectedValue;
  let receivedTypedValue = receivedValue;
  if (expectedValue == receivedValue && expectedValue !== receivedValue) {
    expectedTypedValue = `${expectedValue} (${typeof expectedValue})`;
    receivedTypedValue = `${receivedValue} (${typeof receivedValue})`;
  }
  return {
    pass: expectsValue ? (0, import_isEqualWith.default)(receivedValue, expectedValue, compareArraysAsSet) : Boolean(receivedValue),
    message: () => {
      const to = this.isNot ? "not to" : "to";
      const matcher = this.utils.matcherHint(
        `${this.isNot ? ".not" : ""}.toHaveValue`,
        "element",
        expectedValue
      );
      return getMessage(
        this,
        matcher,
        `Expected the element ${to} have value`,
        expectsValue ? expectedTypedValue : "(any)",
        "Received",
        receivedTypedValue
      );
    }
  };
}
function toHaveDisplayValue(htmlElement, expectedValue) {
  checkHtmlElement(htmlElement, toHaveDisplayValue, this);
  const tagName = htmlElement.tagName.toLowerCase();
  if (!["select", "input", "textarea"].includes(tagName)) {
    throw new Error(
      ".toHaveDisplayValue() currently supports only input, textarea or select elements, try with another matcher instead."
    );
  }
  if (tagName === "input" && ["radio", "checkbox"].includes(htmlElement.type)) {
    throw new Error(
      `.toHaveDisplayValue() currently does not support input[type="${htmlElement.type}"], try with another matcher instead.`
    );
  }
  const values = getValues(tagName, htmlElement);
  const expectedValues = getExpectedValues(expectedValue);
  const numberOfMatchesWithValues = expectedValues.filter(
    (expected) => values.some(
      (value) => expected instanceof RegExp ? expected.test(value) : this.equals(value, String(expected))
    )
  ).length;
  const matchedWithAllValues = numberOfMatchesWithValues === values.length;
  const matchedWithAllExpectedValues = numberOfMatchesWithValues === expectedValues.length;
  return {
    pass: matchedWithAllValues && matchedWithAllExpectedValues,
    message: () => getMessage(
      this,
      this.utils.matcherHint(
        `${this.isNot ? ".not" : ""}.toHaveDisplayValue`,
        "element",
        ""
      ),
      `Expected element ${this.isNot ? "not " : ""}to have display value`,
      expectedValue,
      "Received",
      values
    )
  };
}
function getValues(tagName, htmlElement) {
  return tagName === "select" ? Array.from(htmlElement).filter((option) => option.selected).map((option) => option.textContent) : [htmlElement.value];
}
function getExpectedValues(expectedValue) {
  return expectedValue instanceof Array ? expectedValue : [expectedValue];
}
function toBeChecked(element) {
  checkHtmlElement(element, toBeChecked, this);
  const isValidInput = () => {
    return element.tagName.toLowerCase() === "input" && ["checkbox", "radio"].includes(element.type);
  };
  const isValidAriaElement = () => {
    return roleSupportsChecked(element.getAttribute("role")) && ["true", "false"].includes(element.getAttribute("aria-checked"));
  };
  if (!isValidInput() && !isValidAriaElement()) {
    return {
      pass: false,
      message: () => `only inputs with type="checkbox" or type="radio" or elements with ${supportedRolesSentence()} and a valid aria-checked attribute can be used with .toBeChecked(). Use .toHaveValue() instead`
    };
  }
  const isChecked = () => {
    if (isValidInput()) return element.checked;
    return element.getAttribute("aria-checked") === "true";
  };
  return {
    pass: isChecked(),
    message: () => {
      const is = isChecked() ? "is" : "is not";
      return [
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.toBeChecked`,
          "element",
          ""
        ),
        "",
        `Received element ${is} checked:`,
        `  ${this.utils.printReceived(element.cloneNode(false))}`
      ].join("\n");
    }
  };
}
function supportedRolesSentence() {
  return toSentence(
    supportedRoles().map((role) => `role="${role}"`),
    { lastWordConnector: " or " }
  );
}
function supportedRoles() {
  return roles.keys().filter(roleSupportsChecked);
}
function roleSupportsChecked(role) {
  var _a;
  return ((_a = roles.get(role)) == null ? void 0 : _a.props["aria-checked"]) !== void 0;
}
function toBePartiallyChecked(element) {
  checkHtmlElement(element, toBePartiallyChecked, this);
  const isValidInput = () => {
    return element.tagName.toLowerCase() === "input" && element.type === "checkbox";
  };
  const isValidAriaElement = () => {
    return element.getAttribute("role") === "checkbox";
  };
  if (!isValidInput() && !isValidAriaElement()) {
    return {
      pass: false,
      message: () => 'only inputs with type="checkbox" or elements with role="checkbox" and a valid aria-checked attribute can be used with .toBePartiallyChecked(). Use .toHaveValue() instead'
    };
  }
  const isPartiallyChecked = () => {
    const isAriaMixed = element.getAttribute("aria-checked") === "mixed";
    if (isValidInput()) {
      return element.indeterminate || isAriaMixed;
    }
    return isAriaMixed;
  };
  return {
    pass: isPartiallyChecked(),
    message: () => {
      const is = isPartiallyChecked() ? "is" : "is not";
      return [
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.toBePartiallyChecked`,
          "element",
          ""
        ),
        "",
        `Received element ${is} partially checked:`,
        `  ${this.utils.printReceived(element.cloneNode(false))}`
      ].join("\n");
    }
  };
}
function toHaveDescription(htmlElement, checkWith) {
  deprecate(
    "toHaveDescription",
    "Please use toHaveAccessibleDescription."
  );
  checkHtmlElement(htmlElement, toHaveDescription, this);
  const expectsDescription = checkWith !== void 0;
  const descriptionIDRaw = htmlElement.getAttribute("aria-describedby") || "";
  const descriptionIDs = descriptionIDRaw.split(/\s+/).filter(Boolean);
  let description = "";
  if (descriptionIDs.length > 0) {
    const document2 = htmlElement.ownerDocument;
    const descriptionEls = descriptionIDs.map((descriptionID) => document2.getElementById(descriptionID)).filter(Boolean);
    description = normalize(descriptionEls.map((el) => el.textContent).join(" "));
  }
  return {
    pass: expectsDescription ? checkWith instanceof RegExp ? checkWith.test(description) : this.equals(description, checkWith) : Boolean(description),
    message: () => {
      const to = this.isNot ? "not to" : "to";
      return getMessage(
        this,
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.toHaveDescription`,
          "element",
          ""
        ),
        `Expected the element ${to} have description`,
        this.utils.printExpected(checkWith),
        "Received",
        this.utils.printReceived(description)
      );
    }
  };
}
function toHaveErrorMessage(htmlElement, checkWith) {
  deprecate("toHaveErrorMessage", "Please use toHaveAccessibleErrorMessage.");
  checkHtmlElement(htmlElement, toHaveErrorMessage, this);
  if (!htmlElement.hasAttribute("aria-invalid") || htmlElement.getAttribute("aria-invalid") === "false") {
    const not = this.isNot ? ".not" : "";
    return {
      pass: false,
      message: () => {
        return getMessage(
          this,
          this.utils.matcherHint(`${not}.toHaveErrorMessage`, "element", ""),
          `Expected the element to have invalid state indicated by`,
          'aria-invalid="true"',
          "Received",
          htmlElement.hasAttribute("aria-invalid") ? `aria-invalid="${htmlElement.getAttribute("aria-invalid")}"` : this.utils.printReceived("")
        );
      }
    };
  }
  const expectsErrorMessage = checkWith !== void 0;
  const errormessageIDRaw = htmlElement.getAttribute("aria-errormessage") || "";
  const errormessageIDs = errormessageIDRaw.split(/\s+/).filter(Boolean);
  let errormessage = "";
  if (errormessageIDs.length > 0) {
    const document2 = htmlElement.ownerDocument;
    const errormessageEls = errormessageIDs.map((errormessageID) => document2.getElementById(errormessageID)).filter(Boolean);
    errormessage = normalize(
      errormessageEls.map((el) => el.textContent).join(" ")
    );
  }
  return {
    pass: expectsErrorMessage ? checkWith instanceof RegExp ? checkWith.test(errormessage) : this.equals(errormessage, checkWith) : Boolean(errormessage),
    message: () => {
      const to = this.isNot ? "not to" : "to";
      return getMessage(
        this,
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.toHaveErrorMessage`,
          "element",
          ""
        ),
        `Expected the element ${to} have error message`,
        this.utils.printExpected(checkWith),
        "Received",
        this.utils.printReceived(errormessage)
      );
    }
  };
}
function getSelection(element) {
  const selection = element.ownerDocument.getSelection();
  if (["input", "textarea"].includes(element.tagName.toLowerCase())) {
    if (["radio", "checkbox"].includes(element.type)) return "";
    return element.value.toString().substring(element.selectionStart, element.selectionEnd);
  }
  if (selection.anchorNode === null || selection.focusNode === null) {
    return "";
  }
  const originalRange = selection.getRangeAt(0);
  const temporaryRange = element.ownerDocument.createRange();
  if (selection.containsNode(element, false)) {
    temporaryRange.selectNodeContents(element);
    selection.removeAllRanges();
    selection.addRange(temporaryRange);
  } else if (element.contains(selection.anchorNode) && element.contains(selection.focusNode)) ;
  else {
    const selectionStartsWithinElement = element === originalRange.startContainer || element.contains(originalRange.startContainer);
    const selectionEndsWithinElement = element === originalRange.endContainer || element.contains(originalRange.endContainer);
    selection.removeAllRanges();
    if (selectionStartsWithinElement || selectionEndsWithinElement) {
      temporaryRange.selectNodeContents(element);
      if (selectionStartsWithinElement) {
        temporaryRange.setStart(
          originalRange.startContainer,
          originalRange.startOffset
        );
      }
      if (selectionEndsWithinElement) {
        temporaryRange.setEnd(
          originalRange.endContainer,
          originalRange.endOffset
        );
      }
      selection.addRange(temporaryRange);
    }
  }
  const result = selection.toString();
  selection.removeAllRanges();
  selection.addRange(originalRange);
  return result;
}
function toHaveSelection(htmlElement, expectedSelection) {
  checkHtmlElement(htmlElement, toHaveSelection, this);
  const expectsSelection = expectedSelection !== void 0;
  if (expectsSelection && typeof expectedSelection !== "string") {
    throw new Error(`expected selection must be a string or undefined`);
  }
  const receivedSelection = getSelection(htmlElement);
  return {
    pass: expectsSelection ? (0, import_isEqualWith.default)(receivedSelection, expectedSelection, compareArraysAsSet) : Boolean(receivedSelection),
    message: () => {
      const to = this.isNot ? "not to" : "to";
      const matcher = this.utils.matcherHint(
        `${this.isNot ? ".not" : ""}.toHaveSelection`,
        "element",
        expectedSelection
      );
      return getMessage(
        this,
        matcher,
        `Expected the element ${to} have selection`,
        expectsSelection ? expectedSelection : "(any)",
        "Received",
        receivedSelection
      );
    }
  };
}
var extensions = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  toBeChecked,
  toBeDisabled,
  toBeEmpty,
  toBeEmptyDOMElement,
  toBeEnabled,
  toBeInTheDOM,
  toBeInTheDocument,
  toBeInvalid,
  toBePartiallyChecked,
  toBeRequired,
  toBeValid,
  toBeVisible,
  toContainElement,
  toContainHTML,
  toHaveAccessibleDescription,
  toHaveAccessibleErrorMessage,
  toHaveAccessibleName,
  toHaveAttribute,
  toHaveClass,
  toHaveDescription,
  toHaveDisplayValue,
  toHaveErrorMessage,
  toHaveFocus,
  toHaveFormValues,
  toHaveRole,
  toHaveSelection,
  toHaveStyle,
  toHaveTextContent,
  toHaveValue
});

// node_modules/@testing-library/jest-dom/dist/index.mjs
var import_isEqualWith2 = __toESM(require_isEqualWith(), 1);
import "redent.js";
import "@adobe/css-tools.js";
import "dom-accessibility-api.js";
import "aria-query.js";
import "chalk.js";
import "css.escape.js";
expect.extend(extensions);

// src/visualBuilder/components/Collab/AsyncLoader/AsyncLoader.test.tsx
import AsyncLoader from "./AsyncLoader.js";
import { jsx } from "preact/jsx-runtime";
describe("AsyncLoader", () => {
  it("renders with default primary color when no color is provided", () => {
    const { container } = render(/* @__PURE__ */ jsx(AsyncLoader, { testId: "test" }));
    expect(
      container.querySelector(".collab-button--loading--primary")
    ).not.toBeNull();
    expect(
      container.querySelectorAll(".collab-button--loader--animation").length
    ).toBe(3);
    expect(esm_exports.screen.getByTestId("test")).toBeInTheDocument();
  });
  it("renders with secondary color when specified", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(AsyncLoader, { color: "secondary", testId: "test" })
    );
    expect(
      container.querySelector(".collab-button--loading--secondary")
    ).not.toBeNull();
    expect(esm_exports.screen.getByTestId("test")).toBeInTheDocument();
  });
  it("renders with tertiary color when specified", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(AsyncLoader, { color: "tertiary", testId: "test" })
    );
    expect(
      container.querySelector(".collab-button--loading--tertiary")
    ).not.toBeNull();
  });
  it("renders with destructive color when specified", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(AsyncLoader, { color: "destructive", testId: "test" })
    );
    expect(
      container.querySelector(".collab-button--loading--destructive")
    ).not.toBeNull();
  });
  it("applies custom className when provided", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(AsyncLoader, { className: "custom-class", testId: "test" })
    );
    expect(container.querySelector(".custom-class")).not.toBeNull();
    expect(
      container.querySelector(".collab-button--loader.custom-class")
    ).not.toBeNull();
  });
  it("uses default testId when none is provided", () => {
    render(/* @__PURE__ */ jsx(AsyncLoader, {}));
    expect(esm_exports.screen.getByTestId("collab-async-loader")).toBeInTheDocument();
  });
  it("spreads additional props to the wrapper div", () => {
    render(/* @__PURE__ */ jsx(AsyncLoader, { "data-foo": "bar", "aria-label": "Loading" }));
    const wrapper = esm_exports.screen.getByTestId("collab-async-loader");
    expect(wrapper).toHaveAttribute("data-foo", "bar");
    expect(wrapper).toHaveAttribute("aria-label", "Loading");
  });
  it("renders all three loader dots with correct classes", () => {
    const { container } = render(/* @__PURE__ */ jsx(AsyncLoader, {}));
    const loaderDots = container.querySelectorAll(
      ".collab-button--loader--animation"
    );
    expect(loaderDots.length).toBe(3);
    loaderDots.forEach((dot) => {
      expect(dot).toHaveClass("collab-button--loading--primary");
    });
  });
  it("combines custom class with color variant", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(AsyncLoader, { className: "custom-class", color: "destructive" })
    );
    const wrapper = container.querySelector(".collab-button--loader");
    expect(wrapper).toHaveClass("custom-class");
    const dots = container.querySelectorAll(
      ".collab-button--loader--animation"
    );
    dots.forEach((dot) => {
      expect(dot).toHaveClass("collab-button--loading--destructive");
    });
  });
  it("maintains accessibility attributes", () => {
    render(/* @__PURE__ */ jsx(AsyncLoader, { "aria-label": "Loading content" }));
    const loader = esm_exports.screen.getByTestId("collab-async-loader");
    expect(loader).toHaveAttribute("aria-label", "Loading content");
  });
});
//# sourceMappingURL=AsyncLoader.test.js.map