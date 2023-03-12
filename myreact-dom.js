(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined"
    ? factory(exports, require("@my-react/react"), require("@my-react/react-reactive"))
    : typeof define === "function" && define.amd
    ? define(["exports", "@my-react/react", "@my-react/react-reactive"], factory)
    : ((global = typeof globalThis !== "undefined" ? globalThis : global || self), factory((global.ReactDOM = {}), global.React, global.ReactReactive));
})(this, function (exports, require$$1, require$$2) {
  "use strict";

  var commonjsGlobal =
    typeof globalThis !== "undefined"
      ? globalThis
      : typeof window !== "undefined"
      ? window
      : typeof global !== "undefined"
      ? global
      : typeof self !== "undefined"
      ? self
      : {};

  var myreactReconcilerExports = {};
  var myreactReconciler = {
    get exports() {
      return myreactReconcilerExports;
    },
    set exports(v) {
      myreactReconcilerExports = v;
    },
  };

  var myreactSharedExports = {};
  var myreactShared = {
    get exports() {
      return myreactSharedExports;
    },
    set exports(v) {
      myreactSharedExports = v;
    },
  };

  var index_development$1 = {};

  var hasRequiredIndex_development$1;

  function requireIndex_development$1() {
    if (hasRequiredIndex_development$1) return index_development$1;
    hasRequiredIndex_development$1 = 1;
    (function (exports) {
      /******************************************************************************
			Copyright (c) Microsoft Corporation.

			Permission to use, copy, modify, and/or distribute this software for any
			purpose with or without fee is hereby granted.

			THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
			REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
			AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
			INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
			LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
			OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
			PERFORMANCE OF THIS SOFTWARE.
			***************************************************************************** */

      function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2)
          for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
              if (!ar) ar = Array.prototype.slice.call(from, 0, i);
              ar[i] = from[i];
            }
          }
        return to.concat(ar || Array.prototype.slice.call(from));
      }

      var once = function (action) {
        var called = false;
        return function () {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          if (called) return;
          called = true;
          if (typeof action === "function") {
            action.call.apply(action, __spreadArray([null], args, false));
          }
        };
      };

      var TYPEKEY = "$$typeof";
      var Element = Symbol.for("react.element");
      var Memo = Symbol.for("react.memo");
      var ForwardRef = Symbol.for("react.forward_ref");
      var Portal = Symbol.for("react.portal");
      var Fragment = Symbol.for("react.fragment");
      var Context = Symbol.for("react.context");
      var Provider = Symbol.for("react.provider");
      var Consumer = Symbol.for("react.consumer");
      var Lazy = Symbol.for("react.lazy");
      var Suspense = Symbol.for("react.suspense");
      var Strict = Symbol.for("react.strict");
      // TODO
      var KeepLive = Symbol.for("react.keep_live");
      var Reactive = Symbol.for("react.reactive");
      var Scope = Symbol.for("react.scope");
      var Comment = Symbol.for("react.comment");

      function isObject(target) {
        return typeof target === "object" && target !== null;
      }
      function isFunction(target) {
        return typeof target === "function";
      }
      function isArray(target) {
        return Array.isArray(target);
      }
      function isSymbol(target) {
        return typeof target === "symbol";
      }
      function isString(target) {
        return typeof target === "string";
      }
      function isInteger(target) {
        return Number.isInteger(Number(target));
      }
      function isNumber(target) {
        return typeof target === "number";
      }
      function isCollection(target) {
        return target instanceof Map || target instanceof Set || target instanceof WeakMap || target instanceof WeakSet;
      }

      var UniqueArray = /** @class */ (function () {
        function UniqueArray() {
          this.set = new Set();
          this.arr = new Array();
          this.length = 0;
        }
        UniqueArray.prototype.uniPop = function () {
          var v = this.arr.pop();
          this.set.delete(v);
          this.length--;
          return v;
        };
        UniqueArray.prototype.uniPush = function (v) {
          if (this.set.has(v)) return 0;
          this.set.add(v);
          this.arr.push(v);
          this.length++;
        };
        UniqueArray.prototype.uniShift = function () {
          var v = this.arr.shift();
          this.set.delete(v);
          this.length--;
          return v;
        };
        UniqueArray.prototype.uniUnshift = function (v) {
          if (this.set.has(v)) return 0;
          this.set.add(v);
          this.arr.unshift(v);
          this.length++;
        };
        return UniqueArray;
      })();

      exports.HOOK_TYPE = void 0;
      (function (HOOK_TYPE) {
        HOOK_TYPE["useRef"] = "useRef";
        HOOK_TYPE["useMemo"] = "useMemo";
        HOOK_TYPE["useState"] = "useState";
        HOOK_TYPE["useSignal"] = "useSignal";
        HOOK_TYPE["useEffect"] = "useEffect";
        HOOK_TYPE["useContext"] = "useContext";
        HOOK_TYPE["useReducer"] = "useReducer";
        HOOK_TYPE["useCallback"] = "useCallback";
        HOOK_TYPE["useDebugValue"] = "useDebugValue";
        HOOK_TYPE["useLayoutEffect"] = "useLayoutEffect";
        HOOK_TYPE["useImperativeHandle"] = "useImperativeHandle";
      })(exports.HOOK_TYPE || (exports.HOOK_TYPE = {}));

      exports.PATCH_TYPE = void 0;
      (function (PATCH_TYPE) {
        PATCH_TYPE[(PATCH_TYPE["__initial__"] = 0)] = "__initial__";
        PATCH_TYPE[(PATCH_TYPE["__pendingCreate__"] = 1)] = "__pendingCreate__";
        PATCH_TYPE[(PATCH_TYPE["__pendingUpdate__"] = 2)] = "__pendingUpdate__";
        PATCH_TYPE[(PATCH_TYPE["__pendingAppend__"] = 4)] = "__pendingAppend__";
        PATCH_TYPE[(PATCH_TYPE["__pendingPosition__"] = 8)] = "__pendingPosition__";
        PATCH_TYPE[(PATCH_TYPE["__pendingContext__"] = 16)] = "__pendingContext__";
        PATCH_TYPE[(PATCH_TYPE["__pendingEffect__"] = 32)] = "__pendingEffect__";
        PATCH_TYPE[(PATCH_TYPE["__pendingLayoutEffect__"] = 64)] = "__pendingLayoutEffect__";
        PATCH_TYPE[(PATCH_TYPE["__pendingUnmount__"] = 128)] = "__pendingUnmount__";
        PATCH_TYPE[(PATCH_TYPE["__pendingRef__"] = 256)] = "__pendingRef__";
        PATCH_TYPE[(PATCH_TYPE["__pendingGenerateUpdateList__"] = 511)] = "__pendingGenerateUpdateList__";
      })(exports.PATCH_TYPE || (exports.PATCH_TYPE = {}));

      exports.UPDATE_TYPE = void 0;
      (function (UPDATE_TYPE) {
        UPDATE_TYPE[(UPDATE_TYPE["__initial__"] = 0)] = "__initial__";
        UPDATE_TYPE[(UPDATE_TYPE["__inheritUpdate__"] = 1)] = "__inheritUpdate__";
        UPDATE_TYPE[(UPDATE_TYPE["__triggerUpdate__"] = 2)] = "__triggerUpdate__";
        UPDATE_TYPE[(UPDATE_TYPE["__needUpdate__"] = 3)] = "__needUpdate__";
      })(exports.UPDATE_TYPE || (exports.UPDATE_TYPE = {}));

      exports.Effect_TYPE = void 0;
      (function (Effect_TYPE) {
        Effect_TYPE[(Effect_TYPE["__initial__"] = 0)] = "__initial__";
        Effect_TYPE[(Effect_TYPE["__pendingEffect__"] = 1)] = "__pendingEffect__";
      })(exports.Effect_TYPE || (exports.Effect_TYPE = {}));

      var isNormalEquals = function (src, target, isSkipKey) {
        var isEquals = Object.is(src, target);
        if (isEquals) return true;
        if (typeof src === "object" && typeof target === "object" && src !== null && target !== null) {
          var srcKeys = Object.keys(src);
          var targetKeys = Object.keys(target);
          if (srcKeys.length !== targetKeys.length) return false;
          var hasSkipKeyFunction = typeof isSkipKey === "function";
          var res = true;
          if (hasSkipKeyFunction) {
            for (var key in src) {
              if (isSkipKey(key)) {
                continue;
              } else {
                res = res && Object.is(src[key], target[key]);
              }
              if (!res) return res;
            }
          } else {
            for (var key in src) {
              res = res && Object.is(src[key], target[key]);
              if (!res) return res;
            }
          }
          return res;
        }
        return false;
      };

      var ListTreeNode = /** @class */ (function () {
        function ListTreeNode(value) {
          this.prev = null;
          this.next = null;
          this.value = value;
        }
        return ListTreeNode;
      })();
      var ListTree = /** @class */ (function () {
        function ListTree() {
          this.length = 0;
          this.head = null;
          this.foot = null;
        }
        ListTree.prototype.append = function (node) {
          this.length++;
          var listNode = new ListTreeNode(node);
          this._push(listNode);
        };
        ListTree.prototype.push = function (node) {
          this.length++;
          var listNode = new ListTreeNode(node);
          this._push(listNode);
        };
        ListTree.prototype._push = function (node) {
          if (!this.foot) {
            this.head = node;
            this.foot = node;
          } else {
            this.foot.next = node;
            node.prev = this.foot;
            this.foot = node;
          }
        };
        ListTree.prototype.unshift = function (node) {
          var listNode = new ListTreeNode(node);
          this._unshift(listNode);
        };
        ListTree.prototype._unshift = function (node) {
          if (!this.head) {
            this.head = node;
            this.foot = node;
          } else {
            this.head.prev = node;
            node.next = this.head;
            this.head = node;
          }
        };
        ListTree.prototype.shift = function () {
          if (this.head) {
            var re = this.head;
            if (this.head.next) {
              this.head = this.head.next;
              re.next = null;
              this.head.prev = null;
            } else {
              this.head = null;
              this.foot = null;
            }
            return re.value;
          } else {
            return null;
          }
        };
        ListTree.prototype.pop = function () {
          if (this.foot) {
            var re = this.foot;
            if (this.foot.prev) {
              this.foot = this.foot.prev;
              re.prev = null;
              this.foot.next = null;
            } else {
              this.head = null;
              this.foot = null;
            }
            return re.value;
          } else {
            return null;
          }
        };
        ListTree.prototype.pickHead = function () {
          return this.head.value;
        };
        ListTree.prototype.pickFoot = function () {
          return this.foot.value;
        };
        ListTree.prototype.listToFoot = function (action) {
          var node = this.head;
          while (node) {
            action(node.value);
            node = node.next;
          }
        };
        ListTree.prototype.listToHead = function (action) {
          var node = this.foot;
          while (node) {
            action(node.value);
            node = node.prev;
          }
        };
        ListTree.prototype.toArray = function () {
          var re = [];
          this.listToFoot(function (v) {
            return re.push(v);
          });
          return re;
        };
        ListTree.prototype.delete = function (node) {
          if (node.prev && node.next) {
            var prev = node.prev;
            node.prev = null;
            var next = node.next;
            node.next = null;
            prev.next = next;
            next.prev = prev;
            this.length--;
          } else if (node.prev) {
            var prev = node.prev;
            node.prev = null;
            prev.next = null;
            this.foot = prev;
            this.length--;
          } else if (node.next) {
            var next = node.next;
            node.next = null;
            next.prev = null;
            this.head = next;
            this.length--;
          } else {
            this.head = null;
            this.foot = null;
            this.length--;
          }
        };
        ListTree.prototype.size = function () {
          return this.length;
        };
        ListTree.prototype.has = function (node) {
          var listNode = this.head;
          while (listNode) {
            if (Object.is(listNode.value, node)) return true;
            listNode = listNode.next;
          }
          return false;
        };
        return ListTree;
      })();

      exports.Comment = Comment;
      exports.Consumer = Consumer;
      exports.Context = Context;
      exports.Element = Element;
      exports.ForwardRef = ForwardRef;
      exports.Fragment = Fragment;
      exports.KeepLive = KeepLive;
      exports.Lazy = Lazy;
      exports.ListTree = ListTree;
      exports.ListTreeNode = ListTreeNode;
      exports.Memo = Memo;
      exports.Portal = Portal;
      exports.Provider = Provider;
      exports.Reactive = Reactive;
      exports.Scope = Scope;
      exports.Strict = Strict;
      exports.Suspense = Suspense;
      exports.TYPEKEY = TYPEKEY;
      exports.UniqueArray = UniqueArray;
      exports.isArray = isArray;
      exports.isCollection = isCollection;
      exports.isFunction = isFunction;
      exports.isInteger = isInteger;
      exports.isNormalEquals = isNormalEquals;
      exports.isNumber = isNumber;
      exports.isObject = isObject;
      exports.isString = isString;
      exports.isSymbol = isSymbol;
      exports.once = once;
    })(index_development$1);
    return index_development$1;
  }

  (function (module) {
    {
      module.exports = requireIndex_development$1();
    }
  })(myreactShared);

  /**
   * Appends the elements of `values` to `array`.
   *
   * @private
   * @param {Array} array The array to modify.
   * @param {Array} values The values to append.
   * @returns {Array} Returns `array`.
   */

  var _arrayPush;
  var hasRequired_arrayPush;

  function require_arrayPush() {
    if (hasRequired_arrayPush) return _arrayPush;
    hasRequired_arrayPush = 1;
    function arrayPush(array, values) {
      var index = -1,
        length = values.length,
        offset = array.length;

      while (++index < length) {
        array[offset + index] = values[index];
      }
      return array;
    }

    _arrayPush = arrayPush;
    return _arrayPush;
  }

  /** Detect free variable `global` from Node.js. */

  var _freeGlobal;
  var hasRequired_freeGlobal;

  function require_freeGlobal() {
    if (hasRequired_freeGlobal) return _freeGlobal;
    hasRequired_freeGlobal = 1;
    var freeGlobal = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

    _freeGlobal = freeGlobal;
    return _freeGlobal;
  }

  var _root;
  var hasRequired_root;

  function require_root() {
    if (hasRequired_root) return _root;
    hasRequired_root = 1;
    var freeGlobal = require_freeGlobal();

    /** Detect free variable `self`. */
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;

    /** Used as a reference to the global object. */
    var root = freeGlobal || freeSelf || Function("return this")();

    _root = root;
    return _root;
  }

  var _Symbol;
  var hasRequired_Symbol;

  function require_Symbol() {
    if (hasRequired_Symbol) return _Symbol;
    hasRequired_Symbol = 1;
    var root = require_root();

    /** Built-in value references. */
    var Symbol = root.Symbol;

    _Symbol = Symbol;
    return _Symbol;
  }

  var _getRawTag;
  var hasRequired_getRawTag;

  function require_getRawTag() {
    if (hasRequired_getRawTag) return _getRawTag;
    hasRequired_getRawTag = 1;
    var Symbol = require_Symbol();

    /** Used for built-in method references. */
    var objectProto = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty = objectProto.hasOwnProperty;

    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
     * of values.
     */
    var nativeObjectToString = objectProto.toString;

    /** Built-in value references. */
    var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

    /**
     * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the raw `toStringTag`.
     */
    function getRawTag(value) {
      var isOwn = hasOwnProperty.call(value, symToStringTag),
        tag = value[symToStringTag];

      try {
        value[symToStringTag] = undefined;
        var unmasked = true;
      } catch (e) {}

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

    _getRawTag = getRawTag;
    return _getRawTag;
  }

  /** Used for built-in method references. */

  var _objectToString;
  var hasRequired_objectToString;

  function require_objectToString() {
    if (hasRequired_objectToString) return _objectToString;
    hasRequired_objectToString = 1;
    var objectProto = Object.prototype;

    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
     * of values.
     */
    var nativeObjectToString = objectProto.toString;

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

    _objectToString = objectToString;
    return _objectToString;
  }

  var _baseGetTag;
  var hasRequired_baseGetTag;

  function require_baseGetTag() {
    if (hasRequired_baseGetTag) return _baseGetTag;
    hasRequired_baseGetTag = 1;
    var Symbol = require_Symbol(),
      getRawTag = require_getRawTag(),
      objectToString = require_objectToString();

    /** `Object#toString` result references. */
    var nullTag = "[object Null]",
      undefinedTag = "[object Undefined]";

    /** Built-in value references. */
    var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

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
      return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
    }

    _baseGetTag = baseGetTag;
    return _baseGetTag;
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

  var isObjectLike_1;
  var hasRequiredIsObjectLike;

  function requireIsObjectLike() {
    if (hasRequiredIsObjectLike) return isObjectLike_1;
    hasRequiredIsObjectLike = 1;
    function isObjectLike(value) {
      return value != null && typeof value == "object";
    }

    isObjectLike_1 = isObjectLike;
    return isObjectLike_1;
  }

  var _baseIsArguments;
  var hasRequired_baseIsArguments;

  function require_baseIsArguments() {
    if (hasRequired_baseIsArguments) return _baseIsArguments;
    hasRequired_baseIsArguments = 1;
    var baseGetTag = require_baseGetTag(),
      isObjectLike = requireIsObjectLike();

    /** `Object#toString` result references. */
    var argsTag = "[object Arguments]";

    /**
     * The base implementation of `_.isArguments`.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an `arguments` object,
     */
    function baseIsArguments(value) {
      return isObjectLike(value) && baseGetTag(value) == argsTag;
    }

    _baseIsArguments = baseIsArguments;
    return _baseIsArguments;
  }

  var isArguments_1;
  var hasRequiredIsArguments;

  function requireIsArguments() {
    if (hasRequiredIsArguments) return isArguments_1;
    hasRequiredIsArguments = 1;
    var baseIsArguments = require_baseIsArguments(),
      isObjectLike = requireIsObjectLike();

    /** Used for built-in method references. */
    var objectProto = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty = objectProto.hasOwnProperty;

    /** Built-in value references. */
    var propertyIsEnumerable = objectProto.propertyIsEnumerable;

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
    var isArguments = baseIsArguments(
      (function () {
        return arguments;
      })(),
    )
      ? baseIsArguments
      : function (value) {
          return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
        };

    isArguments_1 = isArguments;
    return isArguments_1;
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

  var isArray_1;
  var hasRequiredIsArray;

  function requireIsArray() {
    if (hasRequiredIsArray) return isArray_1;
    hasRequiredIsArray = 1;
    var isArray = Array.isArray;

    isArray_1 = isArray;
    return isArray_1;
  }

  var _isFlattenable;
  var hasRequired_isFlattenable;

  function require_isFlattenable() {
    if (hasRequired_isFlattenable) return _isFlattenable;
    hasRequired_isFlattenable = 1;
    var Symbol = require_Symbol(),
      isArguments = requireIsArguments(),
      isArray = requireIsArray();

    /** Built-in value references. */
    var spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined;

    /**
     * Checks if `value` is a flattenable `arguments` object or array.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
     */
    function isFlattenable(value) {
      return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
    }

    _isFlattenable = isFlattenable;
    return _isFlattenable;
  }

  var _baseFlatten;
  var hasRequired_baseFlatten;

  function require_baseFlatten() {
    if (hasRequired_baseFlatten) return _baseFlatten;
    hasRequired_baseFlatten = 1;
    var arrayPush = require_arrayPush(),
      isFlattenable = require_isFlattenable();

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
        if (depth > 0 && predicate(value)) {
          if (depth > 1) {
            // Recursively flatten arrays (susceptible to call stack limits).
            baseFlatten(value, depth - 1, predicate, isStrict, result);
          } else {
            arrayPush(result, value);
          }
        } else if (!isStrict) {
          result[result.length] = value;
        }
      }
      return result;
    }

    _baseFlatten = baseFlatten;
    return _baseFlatten;
  }

  var flattenDeep_1;
  var hasRequiredFlattenDeep;

  function requireFlattenDeep() {
    if (hasRequiredFlattenDeep) return flattenDeep_1;
    hasRequiredFlattenDeep = 1;
    var baseFlatten = require_baseFlatten();

    /** Used as references for various `Number` constants. */
    var INFINITY = 1 / 0;

    /**
     * Recursively flattens `array`.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to flatten.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * _.flattenDeep([1, [2, [3, [4]], 5]]);
     * // => [1, 2, 3, 4, 5]
     */
    function flattenDeep(array) {
      var length = array == null ? 0 : array.length;
      return length ? baseFlatten(array, INFINITY) : [];
    }

    flattenDeep_1 = flattenDeep;
    return flattenDeep_1;
  }

  var index_development = {};

  var hasRequiredIndex_development;

  function requireIndex_development() {
    if (hasRequiredIndex_development) return index_development;
    hasRequiredIndex_development = 1;
    (function (exports) {
      var reactShared = myreactSharedExports;
      var react = require$$1;
      var reactReactive = require$$2;
      var flattenDeep = requireFlattenDeep();

      exports.NODE_TYPE = void 0;
      (function (NODE_TYPE) {
        NODE_TYPE[(NODE_TYPE["__initial__"] = 0)] = "__initial__";
        // ==== component node ==== //
        NODE_TYPE[(NODE_TYPE["__isClassComponent__"] = 1)] = "__isClassComponent__";
        NODE_TYPE[(NODE_TYPE["__isFunctionComponent__"] = 2)] = "__isFunctionComponent__";
        NODE_TYPE[(NODE_TYPE["__isDynamicNode__"] = 3)] = "__isDynamicNode__";
        // ==== object node, use create function to define node ==== //
        NODE_TYPE[(NODE_TYPE["__isLazy__"] = 4)] = "__isLazy__";
        NODE_TYPE[(NODE_TYPE["__isMemo__"] = 8)] = "__isMemo__";
        NODE_TYPE[(NODE_TYPE["__isReactive__"] = 16)] = "__isReactive__";
        NODE_TYPE[(NODE_TYPE["__isForwardRef__"] = 32)] = "__isForwardRef__";
        NODE_TYPE[(NODE_TYPE["__isContextProvider__"] = 64)] = "__isContextProvider__";
        NODE_TYPE[(NODE_TYPE["__isContextConsumer__"] = 128)] = "__isContextConsumer__";
        NODE_TYPE[(NODE_TYPE["__isPortal__"] = 256)] = "__isPortal__";
        NODE_TYPE[(NODE_TYPE["__isObjectNode__"] = 508)] = "__isObjectNode__";
        NODE_TYPE[(NODE_TYPE["__isNullNode__"] = 512)] = "__isNullNode__";
        NODE_TYPE[(NODE_TYPE["__isTextNode__"] = 1024)] = "__isTextNode__";
        NODE_TYPE[(NODE_TYPE["__isEmptyNode__"] = 2048)] = "__isEmptyNode__";
        NODE_TYPE[(NODE_TYPE["__isPlainNode__"] = 4096)] = "__isPlainNode__";
        NODE_TYPE[(NODE_TYPE["__isStrictNode__"] = 8192)] = "__isStrictNode__";
        NODE_TYPE[(NODE_TYPE["__isSuspenseNode__"] = 16384)] = "__isSuspenseNode__";
        NODE_TYPE[(NODE_TYPE["__isFragmentNode__"] = 32768)] = "__isFragmentNode__";
        NODE_TYPE[(NODE_TYPE["__isKeepLiveNode__"] = 65536)] = "__isKeepLiveNode__";
        NODE_TYPE[(NODE_TYPE["__isScopeNode__"] = 131072)] = "__isScopeNode__";
        NODE_TYPE[(NODE_TYPE["__isCommentNode__"] = 262144)] = "__isCommentNode__";
      })(exports.NODE_TYPE || (exports.NODE_TYPE = {}));

      var checkFiberElement = function (_fiber, _element) {
        if (react.isValidElement(_element)) {
          var typedElement = _element;
          if (!typedElement._store["validType"]) {
            if (_fiber.type & exports.NODE_TYPE.__isContextConsumer__) {
              if (typeof typedElement.props.children !== "function") {
                throw new Error("Consumer need a function children");
              }
            }
            if (_fiber.type & (exports.NODE_TYPE.__isMemo__ | exports.NODE_TYPE.__isForwardRef__)) {
              var typedType = typedElement.type;
              if (typeof typedType.render !== "function" && typeof typedType.render !== "object") {
                throw new Error("invalid render type");
              }
              if (_fiber.type & exports.NODE_TYPE.__isForwardRef__ && typeof typedType.render !== "function") {
                throw new Error("forwardRef() need a function component");
              }
            }
            if (_fiber.type & exports.NODE_TYPE.__isKeepLiveNode__) {
              if (Array.isArray(_element.props.children)) throw new Error("<KeepLive /> expected to receive a single MyReact _element child");
            }
            if (typedElement.ref) {
              if (typeof typedElement.ref !== "object" && typeof typedElement.ref !== "function") {
                throw new Error("unSupport ref usage, should be a function or a object like `{current: any}`");
              }
            }
            if (typedElement.key && typeof typedElement.key !== "string") {
              throw new Error("invalid key type, ".concat(typedElement.key));
            }
            if (typedElement.props.children && typedElement.props["dangerouslySetInnerHTML"]) {
              throw new Error("can not render contain `children` and `dangerouslySetInnerHTML` for current _element");
            }
            if (typedElement.props["dangerouslySetInnerHTML"]) {
              if (
                typeof typedElement.props["dangerouslySetInnerHTML"] !== "object" ||
                !Object.prototype.hasOwnProperty.call(typedElement.props["dangerouslySetInnerHTML"], "__html")
              ) {
                throw new Error("invalid dangerouslySetInnerHTML props, should like {__html: string}");
              }
            }
            typedElement._store["validType"] = true;
          }
        }
      };
      var checkHook = function (_hookNode) {
        if (
          _hookNode.hookType === reactShared.HOOK_TYPE.useMemo ||
          _hookNode.hookType === reactShared.HOOK_TYPE.useEffect ||
          _hookNode.hookType === reactShared.HOOK_TYPE.useCallback ||
          _hookNode.hookType === reactShared.HOOK_TYPE.useLayoutEffect
        ) {
          if (typeof _hookNode.value !== "function") {
            throw new Error("".concat(_hookNode.hookType, " initial error"));
          }
        }
        if (_hookNode.hookType === reactShared.HOOK_TYPE.useContext) {
          if (typeof _hookNode.value !== "object" || _hookNode.value === null) {
            throw new Error("".concat(_hookNode.hookType, " initial error"));
          }
        }
      };

      var currentFunctionFiber$2 = react.__my_react_internal__.currentFunctionFiber;
      var MyReactSignal = /** @class */ (function () {
        function MyReactSignal(_rawValue) {
          var _this = this;
          this._depsSet = new Set();
          this.getValue = function () {
            if (currentFunctionFiber$2.current) {
              _this._fiber = currentFunctionFiber$2.current;
              _this._depsSet.add(currentFunctionFiber$2.current);
            }
            return _this._value;
          };
          this.setValue = function (newValue) {
            if (!Object.is(_this._value, newValue)) {
              var allDeps_1 = new Set(_this._depsSet);
              var renderPlatform = _this._fiber.root.renderPlatform;
              _this._depsSet.clear();
              if (renderPlatform) {
                _this._fiber = null;
                renderPlatform.macroTask(function () {
                  return allDeps_1.forEach(function (f) {
                    return f._update();
                  });
                });
              }
              _this._value = newValue;
            }
          };
          this._value = _rawValue;
        }
        return MyReactSignal;
      })();

      var isArrayEquals = function (src, target) {
        if (Array.isArray(src) && Array.isArray(target) && src.length === target.length) {
          var re = true;
          for (var key in src) {
            re = re && Object.is(src[key], target[key]);
            if (!re) return re;
          }
          return re;
        }
        return false;
      };

      /******************************************************************************
			Copyright (c) Microsoft Corporation.

			Permission to use, copy, modify, and/or distribute this software for any
			purpose with or without fee is hereby granted.

			THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
			REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
			AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
			INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
			LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
			OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
			PERFORMANCE OF THIS SOFTWARE.
			***************************************************************************** */

      function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P
            ? value
            : new P(function (resolve) {
                resolve(value);
              });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      }

      function __generator(thisArg, body) {
        var _ = {
            label: 0,
            sent: function () {
              if (t[0] & 1) throw t[1];
              return t[1];
            },
            trys: [],
            ops: [],
          },
          f,
          y,
          t,
          g;
        return (
          (g = { next: verb(0), throw: verb(1), return: verb(2) }),
          typeof Symbol === "function" &&
            (g[Symbol.iterator] = function () {
              return this;
            }),
          g
        );
        function verb(n) {
          return function (v) {
            return step([n, v]);
          };
        }
        function step(op) {
          if (f) throw new TypeError("Generator is already executing.");
          while ((g && ((g = 0), op[0] && (_ = 0)), _))
            try {
              if (
                ((f = 1),
                y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
              )
                return t;
              if (((y = 0), t)) op = [op[0] & 2, t.value];
              switch (op[0]) {
                case 0:
                case 1:
                  t = op;
                  break;
                case 4:
                  _.label++;
                  return { value: op[1], done: false };
                case 5:
                  _.label++;
                  y = op[1];
                  op = [0];
                  continue;
                case 7:
                  op = _.ops.pop();
                  _.trys.pop();
                  continue;
                default:
                  if (!((t = _.trys), (t = t.length > 0 && t[t.length - 1])) && (op[0] === 6 || op[0] === 2)) {
                    _ = 0;
                    continue;
                  }
                  if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                    _.label = op[1];
                    break;
                  }
                  if (op[0] === 6 && _.label < t[1]) {
                    _.label = t[1];
                    t = op;
                    break;
                  }
                  if (t && _.label < t[2]) {
                    _.label = t[2];
                    _.ops.push(op);
                    break;
                  }
                  if (t[2]) _.ops.pop();
                  _.trys.pop();
                  continue;
              }
              op = body.call(thisArg, _);
            } catch (e) {
              op = [6, e];
              y = 0;
            } finally {
              f = t = 0;
            }
          if (op[0] & 5) throw op[1];
          return { value: op[0] ? op[1] : void 0, done: true };
        }
      }

      function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2)
          for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
              if (!ar) ar = Array.prototype.slice.call(from, 0, i);
              ar[i] = from[i];
            }
          }
        return to.concat(ar || Array.prototype.slice.call(from));
      }

      var currentRunningFiber$3 = react.__my_react_internal__.currentRunningFiber;
      var safeCall = function (action) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
          args[_i - 1] = arguments[_i];
        }
        try {
          return action.call.apply(action, __spreadArray([null], args, false));
        } catch (e) {
          var fiber = currentRunningFiber$3.current;
          if (fiber) {
            var renderPlatform = fiber.root.renderPlatform;
            renderPlatform.log({ message: e, level: "error", fiber: fiber });
            fiber._error(e);
          } else {
            throw e;
          }
        }
      };
      var safeCallAsync = function (action) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
          args[_i - 1] = arguments[_i];
        }
        return __awaiter(void 0, void 0, void 0, function () {
          var e_1, fiber, renderPlatform;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, action.call.apply(action, __spreadArray([null], args, false))];
              case 1:
                return [2 /*return*/, _a.sent()];
              case 2:
                e_1 = _a.sent();
                fiber = currentRunningFiber$3.current;
                if (fiber) {
                  renderPlatform = fiber.root.renderPlatform;
                  renderPlatform.log({ message: e_1, level: "error", fiber: fiber });
                  fiber._error(e_1);
                } else {
                  throw e_1;
                }
                return [3 /*break*/, 3];
              case 3:
                return [2 /*return*/];
            }
          });
        });
      };
      var safeCallWithFiber = function (_a) {
        var action = _a.action,
          fiber = _a.fiber;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
          args[_i - 1] = arguments[_i];
        }
        try {
          return action.call.apply(action, __spreadArray([null], args, false));
        } catch (e) {
          var renderPlatform = fiber.root.renderPlatform;
          renderPlatform.log({ message: e, level: "error", fiber: fiber });
          fiber._error(e);
        }
      };

      var currentRunningFiber$2 = react.__my_react_internal__.currentRunningFiber;
      function getTypeFromElement(element) {
        var _a, _b;
        var nodeTypeSymbol = exports.NODE_TYPE.__initial__;
        if (react.isValidElement(element)) {
          var rawType = element.type;
          // object node
          if (typeof rawType === "object") {
            var typedRawType = rawType;
            switch (typedRawType[reactShared.TYPEKEY]) {
              case reactShared.Provider:
                nodeTypeSymbol |= exports.NODE_TYPE.__isContextProvider__;
                break;
              case reactShared.Consumer:
                nodeTypeSymbol |= exports.NODE_TYPE.__isContextConsumer__;
                break;
              case reactShared.Portal:
                nodeTypeSymbol |= exports.NODE_TYPE.__isPortal__;
                break;
              case reactShared.Memo:
                nodeTypeSymbol |= exports.NODE_TYPE.__isMemo__;
                break;
              case reactShared.ForwardRef:
                nodeTypeSymbol |= exports.NODE_TYPE.__isForwardRef__;
                break;
              case reactShared.Lazy:
                nodeTypeSymbol |= exports.NODE_TYPE.__isLazy__;
                break;
              case reactShared.Reactive:
                nodeTypeSymbol |= exports.NODE_TYPE.__isReactive__;
                break;
              default:
                throw new Error(
                  "invalid object element type ".concat((_a = typedRawType[reactShared.TYPEKEY]) === null || _a === void 0 ? void 0 : _a.toString()),
                );
            }
          } else if (typeof rawType === "function") {
            if ((_b = rawType.prototype) === null || _b === void 0 ? void 0 : _b.isMyReactComponent) {
              nodeTypeSymbol |= exports.NODE_TYPE.__isClassComponent__;
            } else {
              nodeTypeSymbol |= exports.NODE_TYPE.__isFunctionComponent__;
            }
          } else if (typeof rawType === "symbol") {
            switch (rawType) {
              case reactShared.KeepLive:
                nodeTypeSymbol |= exports.NODE_TYPE.__isKeepLiveNode__;
                break;
              case reactShared.Fragment:
                nodeTypeSymbol |= exports.NODE_TYPE.__isFragmentNode__;
                break;
              case reactShared.Strict:
                nodeTypeSymbol |= exports.NODE_TYPE.__isStrictNode__;
                break;
              case reactShared.Suspense:
                nodeTypeSymbol |= exports.NODE_TYPE.__isSuspenseNode__;
                break;
              case reactShared.Scope:
                nodeTypeSymbol |= exports.NODE_TYPE.__isScopeNode__;
                break;
              case reactShared.Comment:
                nodeTypeSymbol |= exports.NODE_TYPE.__isCommentNode__;
                break;
              default:
                throw new Error("invalid symbol element type ".concat(rawType === null || rawType === void 0 ? void 0 : rawType.toString()));
            }
          } else if (typeof rawType === "string") {
            nodeTypeSymbol |= exports.NODE_TYPE.__isPlainNode__;
          } else {
            {
              var fiber = currentRunningFiber$2.current;
              fiber === null || fiber === void 0
                ? void 0
                : fiber.root.renderPlatform.log({ message: "invalid element type ".concat(String(rawType)), level: "warn", triggerOnce: true });
            }
            nodeTypeSymbol |= exports.NODE_TYPE.__isEmptyNode__;
          }
        } else {
          if (typeof element === "object" && element !== null) {
            {
              var fiber = currentRunningFiber$2.current;
              fiber === null || fiber === void 0
                ? void 0
                : fiber.root.renderPlatform.log({ message: "invalid object element type ".concat(JSON.stringify(element)), level: "warn", triggerOnce: true });
            }
            nodeTypeSymbol |= exports.NODE_TYPE.__isEmptyNode__;
          } else if (element === null || element === undefined || typeof element === "boolean") {
            nodeTypeSymbol |= exports.NODE_TYPE.__isNullNode__;
          } else {
            nodeTypeSymbol |= exports.NODE_TYPE.__isTextNode__;
          }
        }
        return nodeTypeSymbol;
      }

      var MyReactFiberNodeClass$2 = react.__my_react_internal__.MyReactFiberNode;
      function checkIsSameType(p, element) {
        if (p instanceof MyReactFiberNodeClass$2) {
          var elementType = getTypeFromElement(element);
          if (p.type === elementType) {
            if (react.isValidElement(element)) {
              var typedIncomingElement = element;
              var typedExistElement = p.element;
              // todo check for object element
              if (typeof typedExistElement.type === "object") {
                // TODO, currently implement portal just like builtin object node
                if (typedExistElement.type[reactShared.TYPEKEY] === reactShared.Portal) return true;
              }
              return Object.is(typedIncomingElement.type, typedExistElement.type);
            } else {
              return true;
            }
          } else {
            return false;
          }
        } else {
          var existElementType = getTypeFromElement(p);
          var incomingElementType = getTypeFromElement(element);
          if (existElementType === incomingElementType) {
            if (react.isValidElement(element)) {
              var typedExistElement = p;
              var typedIncomingElement = element;
              if (typeof typedExistElement.type === "object") {
                if (typedExistElement.type[reactShared.TYPEKEY] === reactShared.Portal) return true;
              }
              return Object.is(typedIncomingElement.type, typedExistElement.type);
            } else {
              return true;
            }
          } else {
            return false;
          }
        }
      }

      var getNext = function (fiber, root) {
        if (fiber.child) return fiber.child;
        var nextFiber = fiber;
        while (nextFiber && nextFiber !== root) {
          if (nextFiber.sibling) return nextFiber.sibling;
          nextFiber = nextFiber.parent;
        }
        return null;
      };
      var generateFiberToList = function (fiber) {
        var listTree = new reactShared.ListTree();
        var temp = fiber;
        listTree.append(temp);
        while (temp) {
          temp = getNext(temp, fiber);
          if (temp) listTree.append(temp);
        }
        return listTree;
      };

      var emptyObj = {};
      var defaultGenerateContextMap = function (fiber, map) {
        var _a;
        var parent = fiber.parent;
        if (parent) {
          var parentMap = map.get(parent) || emptyObj;
          if (parent.type & exports.NODE_TYPE.__isContextProvider__) {
            var typedElementType = parent.elementType;
            var contextObj = typedElementType["Context"];
            var contextId = contextObj["contextId"];
            parentMap = Object.assign({}, parentMap, ((_a = {}), (_a[contextId] = parent), _a));
          }
          if (parentMap !== emptyObj) {
            map.set(fiber, parentMap);
            {
              var typedFiber = fiber;
              typedFiber._debugContextMap = parentMap;
            }
          }
        }
      };
      var defaultGetContextValue = function (fiber, ContextObject) {
        var _a, _b;
        if (fiber) {
          return (_a = fiber.pendingProps["value"]) !== null && _a !== void 0 ? _a : null;
        } else {
          return (_b = ContextObject === null || ContextObject === void 0 ? void 0 : ContextObject.Provider["value"]) !== null && _b !== void 0 ? _b : null;
        }
      };
      var context = function (fiber) {
        if (fiber.patch & reactShared.PATCH_TYPE.__pendingContext__) {
          var set_1 = new Set(fiber.dependence);
          var renderPlatform = fiber.root.renderPlatform;
          renderPlatform.macroTask(function () {
            return set_1.forEach(function (i) {
              var _a;
              return (_a = i._ownerFiber) === null || _a === void 0 ? void 0 : _a._update();
            });
          });
          if (fiber.patch & reactShared.PATCH_TYPE.__pendingContext__) fiber.patch ^= reactShared.PATCH_TYPE.__pendingContext__;
        }
      };

      var MyReactFiberNodeClass$1 = react.__my_react_internal__.MyReactFiberNode;
      var createFiberNode = function (_a, element) {
        var _b;
        var parent = _a.parent,
          _c = _a.type,
          type = _c === void 0 ? "append" : _c;
        var newFiberNode = new MyReactFiberNodeClass$1(parent);
        newFiberNode.type = getTypeFromElement(element);
        newFiberNode._installElement(element);
        {
          checkFiberElement(newFiberNode, element);
        }
        var renderDispatch = newFiberNode.root.renderDispatch;
        var renderPlatform = newFiberNode.root.renderPlatform;
        renderDispatch.pendingCreate(newFiberNode);
        renderDispatch.pendingUpdate(newFiberNode);
        if (type === "position") {
          renderDispatch.pendingPosition(newFiberNode);
        } else {
          renderDispatch.pendingAppend(newFiberNode);
        }
        if (newFiberNode.ref) {
          renderDispatch.pendingRef(newFiberNode);
        }
        renderDispatch.resolveScopeMap(newFiberNode);
        renderDispatch.resolveStrictMap(newFiberNode);
        renderDispatch.resolveContextMap(newFiberNode);
        renderDispatch.resolveSuspenseMap(newFiberNode);
        renderDispatch.resolveErrorBoundariesMap(newFiberNode);
        (_b = renderPlatform.patchToFiberInitial) === null || _b === void 0 ? void 0 : _b.call(renderPlatform, newFiberNode);
        if (!(newFiberNode.patch & reactShared.PATCH_TYPE.__pendingUpdate__)) {
          newFiberNode._applyProps();
        }
        {
          var typedFiber = newFiberNode;
          var timeNow = Date.now();
          typedFiber._debugRenderState = {
            renderCount: 1,
            mountTime: timeNow,
            prevUpdateTime: 0,
            currentUpdateTime: timeNow,
          };
        }
        return newFiberNode;
      };

      // just used for rootFiber
      var initialFiberNode = function (fiber) {
        var _a;
        var renderDispatch = fiber.root.renderDispatch;
        var renderPlatform = fiber.root.renderPlatform;
        renderDispatch.pendingCreate(fiber);
        renderDispatch.pendingUpdate(fiber);
        renderDispatch.pendingAppend(fiber);
        if (fiber.ref) {
          renderDispatch.pendingRef(fiber);
        }
        (_a = renderPlatform.patchToFiberInitial) === null || _a === void 0 ? void 0 : _a.call(renderPlatform, fiber);
        if (!(fiber.patch & reactShared.PATCH_TYPE.__pendingUpdate__)) {
          fiber._applyProps();
        }
        {
          var typedFiber = fiber;
          var timeNow = Date.now();
          typedFiber._debugRenderState = {
            renderCount: 1,
            mountTime: timeNow,
            prevUpdateTime: 0,
            currentUpdateTime: timeNow,
          };
        }
        return fiber;
      };

      var updateFiberNode = function (_a, nextElement) {
        var _b, _c;
        var fiber = _a.fiber,
          parent = _a.parent,
          prevFiber = _a.prevFiber;
        var prevElement = fiber.element;
        fiber._installElement(nextElement);
        fiber._installParent(parent);
        var renderDispatch = fiber.root.renderDispatch;
        var renderPlatform = fiber.root.renderPlatform;
        if (prevElement !== nextElement) {
          if (fiber.type & exports.NODE_TYPE.__isMemo__) {
            if (!(fiber.mode & reactShared.UPDATE_TYPE.__triggerUpdate__) && reactShared.isNormalEquals(fiber.pendingProps, fiber.memoizedProps)) {
              fiber._afterUpdate();
            } else {
              fiber._prepareUpdate();
              (_b = renderPlatform.patchToFiberUpdate) === null || _b === void 0 ? void 0 : _b.call(renderPlatform, fiber);
            }
          } else {
            fiber._prepareUpdate();
            if (fiber.type & exports.NODE_TYPE.__isContextProvider__) {
              if (!reactShared.isNormalEquals(fiber.pendingProps.value, fiber.memoizedProps.value)) {
                renderDispatch.pendingContext(fiber);
              }
            }
            if (fiber.type & exports.NODE_TYPE.__isPlainNode__) {
              if (
                !reactShared.isNormalEquals(fiber.pendingProps, fiber.memoizedProps, function (key) {
                  return key === "children";
                })
              ) {
                renderDispatch.pendingUpdate(fiber);
              }
            }
            if (fiber.type & exports.NODE_TYPE.__isTextNode__) {
              renderDispatch.pendingUpdate(fiber);
            }
            (_c = renderPlatform.patchToFiberUpdate) === null || _c === void 0 ? void 0 : _c.call(renderPlatform, fiber);
          }
        }
        if (react.isValidElement(prevElement) && react.isValidElement(nextElement) && prevElement.ref !== nextElement.ref) {
          renderDispatch.pendingRef(fiber);
        }
        if (fiber !== prevFiber) {
          renderDispatch.pendingPosition(fiber);
        }
        if (!(fiber.patch & reactShared.PATCH_TYPE.__pendingUpdate__)) {
          fiber._applyProps();
        }
        {
          var typedFiber = fiber;
          var timeNow = Date.now();
          var prevRenderState = Object.assign({}, typedFiber._debugRenderState);
          typedFiber._debugRenderState = {
            renderCount: prevRenderState.renderCount + 1,
            mountTime: prevRenderState.mountTime,
            prevUpdateTime: prevRenderState.currentUpdateTime,
            currentUpdateTime: timeNow,
          };
        }
        return fiber;
      };

      var unmountFiberNode = function (fiber) {
        var _a;
        if (!fiber.isMounted) return;
        var renderDispatch = fiber.root.renderDispatch;
        var renderPlatform = fiber.root.renderPlatform;
        (_a = renderPlatform.patchToFiberUnmount) === null || _a === void 0 ? void 0 : _a.call(renderPlatform, fiber);
        renderDispatch.suspenseMap.delete(fiber);
        renderDispatch.strictMap.delete(fiber);
        renderDispatch.errorBoundariesMap.delete(fiber);
        renderDispatch.effectMap.delete(fiber);
        renderDispatch.layoutEffectMap.delete(fiber);
        renderDispatch.contextMap.delete(fiber);
        renderDispatch.unmountMap.delete(fiber);
        renderDispatch.eventMap.delete(fiber);
        fiber.node = null;
        fiber.child = null;
        fiber.return = null;
        fiber.sibling = null;
        fiber.children = null;
        fiber.instance = null;
        fiber.hookNodes = null;
        fiber.dependence = null;
        fiber.isMounted = false;
      };

      var flatten = function (children) {
        if (Array.isArray(children)) return flattenDeep(children);
        return [children];
      };

      var reactiveInstanceBeforeUnmount = function (list) {
        list.listToHead(function (f) {
          if (f.type & exports.NODE_TYPE.__isReactive__) {
            reactReactive.pauseTracking();
            reactReactive.pauseTrigger();
            var reactiveInstance = f.instance;
            reactiveInstance.beforeUnmountHooks.forEach(function (f) {
              return f === null || f === void 0 ? void 0 : f();
            });
            reactReactive.resetTrigger();
            reactReactive.resetTracking();
          }
        });
      };
      var defaultGenerateUnmountArrayMap = function (fiber, unmount, map) {
        var allUnmount = flatten(unmount);
        var exist = map.get(fiber) || [];
        var newPending = allUnmount.map(generateFiberToList);
        newPending.forEach(reactiveInstanceBeforeUnmount);
        exist.push.apply(exist, newPending);
        map.set(fiber, exist);
      };
      var unmountList = function (list, renderDispatch, renderPlatform) {
        list.listToFoot(function (f) {
          return f._unmount();
        });
        list.listToFoot(function (f) {
          return renderPlatform.unsetRef(f);
        });
        if (list.head.value) renderPlatform.clearNode(list.head.value);
        list.listToFoot(function (f) {
          return unmountFiberNode(f);
        });
      };
      var unmountFiber = function (fiber) {
        var list = generateFiberToList(fiber);
        var renderDispatch = fiber.root.renderDispatch;
        var renderPlatform = fiber.root.renderPlatform;
        unmountList(list, renderDispatch, renderPlatform);
      };
      var unmount = function (fiber) {
        if (fiber.patch & reactShared.PATCH_TYPE.__pendingUnmount__) {
          var renderDispatch_1 = fiber.root.renderDispatch;
          var renderPlatform_1 = fiber.root.renderPlatform;
          var unmountMap = renderDispatch_1.unmountMap;
          var allUnmountFiber = unmountMap.get(fiber) || [];
          unmountMap.delete(fiber);
          if (allUnmountFiber.length)
            allUnmountFiber.forEach(function (l) {
              return unmountList(l, renderDispatch_1, renderPlatform_1);
            });
          if (fiber.patch & reactShared.PATCH_TYPE.__pendingUnmount__) fiber.patch ^= reactShared.PATCH_TYPE.__pendingUnmount__;
        }
      };

      var defaultGenerateDeactivatedArrayMap = function (fiber, deactivate, map) {
        var exist = map.get(fiber) || [];
        var pendingDeactivate = deactivate.map(generateFiberToList);
        pendingDeactivate.forEach(reactiveInstanceBeforeUnmount);
        exist.push.apply(exist, pendingDeactivate);
        map.set(fiber, exist);
      };

      var currentRunningFiber$1 = react.__my_react_internal__.currentRunningFiber;
      var defaultGenerateEffectMap = function (fiber, effect, map) {
        var exist = map.get(fiber) || [];
        exist.push(effect);
        map.set(fiber, exist);
      };
      var layoutEffect = function (fiber) {
        if (fiber.patch & reactShared.PATCH_TYPE.__pendingLayoutEffect__) {
          var renderDispatch = fiber.root.renderDispatch;
          var layoutEffectMap = renderDispatch.layoutEffectMap;
          var allLayoutEffect = layoutEffectMap.get(fiber) || [];
          layoutEffectMap.delete(fiber);
          if (allLayoutEffect.length) {
            currentRunningFiber$1.current = fiber;
            allLayoutEffect.forEach(function (layoutEffect) {
              return layoutEffect.call(null);
            });
            currentRunningFiber$1.current = null;
          }
          if (fiber.patch & reactShared.PATCH_TYPE.__pendingLayoutEffect__) fiber.patch ^= reactShared.PATCH_TYPE.__pendingLayoutEffect__;
        }
      };
      var effect = function (fiber) {
        if (fiber.patch & reactShared.PATCH_TYPE.__pendingEffect__) {
          var renderDispatch = fiber.root.renderDispatch;
          var effectMap = renderDispatch.effectMap;
          var allEffect = effectMap.get(fiber) || [];
          effectMap.delete(fiber);
          if (allEffect.length) {
            currentRunningFiber$1.current = fiber;
            allEffect.forEach(function (effect) {
              return effect.call(null);
            });
            currentRunningFiber$1.current = null;
          }
          if (fiber.patch & reactShared.PATCH_TYPE.__pendingEffect__) fiber.patch ^= reactShared.PATCH_TYPE.__pendingEffect__;
        }
      };

      var isErrorBoundariesComponent = function (fiber) {
        if (fiber.type & exports.NODE_TYPE.__isClassComponent__) {
          var Component = fiber.type & exports.NODE_TYPE.__isDynamicNode__ ? fiber.elementType : fiber.elementType.render;
          var typedComponent = Component;
          var typedInstance = fiber.instance;
          if (typeof typedComponent.getDerivedStateFromError === "function" || typeof typedInstance.componentDidCatch === "function") {
            return true;
          }
        }
        return false;
      };
      var defaultGenerateErrorBoundariesMap = function (fiber, map) {
        var parent = fiber.parent;
        if (parent) {
          if (isErrorBoundariesComponent(parent)) {
            map.set(fiber, parent);
          } else {
            var parentErrorBoundaries = map.get(parent);
            parentErrorBoundaries && map.set(fiber, parentErrorBoundaries);
          }
        }
        {
          var typedFiber = fiber;
          var errorBoundaries = map.get(fiber);
          errorBoundaries && (typedFiber._debugErrorBoundaries = errorBoundaries);
        }
      };

      var MyReactHookNode = react.__my_react_internal__.MyReactHookNode;
      var defaultReducer = function (state, action) {
        return typeof action === "function" ? action(state) : action;
      };
      var createHookNode = function (props, fiber) {
        var renderDispatch = fiber.root.renderDispatch;
        var hookNode = new MyReactHookNode(props.hookIndex, props.hookType, props.value, props.reducer || defaultReducer, props.deps);
        hookNode._setOwner(fiber);
        fiber._addHook(hookNode);
        {
          checkHook(hookNode);
        }
        if (
          hookNode.hookType === reactShared.HOOK_TYPE.useMemo ||
          hookNode.hookType === reactShared.HOOK_TYPE.useState ||
          hookNode.hookType === reactShared.HOOK_TYPE.useReducer
        ) {
          hookNode.result = hookNode.value.call(null);
        }
        if (
          hookNode.hookType === reactShared.HOOK_TYPE.useEffect ||
          hookNode.hookType === reactShared.HOOK_TYPE.useLayoutEffect ||
          hookNode.hookType === reactShared.HOOK_TYPE.useImperativeHandle
        ) {
          hookNode.effect = true;
        }
        if (hookNode.hookType === reactShared.HOOK_TYPE.useRef || hookNode.hookType === reactShared.HOOK_TYPE.useCallback) {
          hookNode.result = hookNode.value;
        }
        if (hookNode.hookType === reactShared.HOOK_TYPE.useContext) {
          var ProviderFiber = renderDispatch.resolveContextFiber(hookNode._ownerFiber, hookNode.value);
          var context = renderDispatch.resolveContextValue(ProviderFiber, hookNode.value);
          hookNode._setContext(ProviderFiber);
          hookNode.result = context;
          hookNode.context = context;
        }
        if (hookNode.hookType === reactShared.HOOK_TYPE.useSignal) {
          hookNode.result = new MyReactSignal(hookNode.value.call(null));
        }
        {
          var typedFiber = fiber;
          typedFiber._debugHookTypes = typedFiber._debugHookTypes || [];
          typedFiber._debugHookTypes.push(hookNode.hookType);
        }
        return hookNode;
      };

      var enableStrictLifeCycle$1 = react.__my_react_shared__.enableStrictLifeCycle;
      var effectHookNode = function (fiber, hookNode) {
        var renderDispatch = fiber.root.renderDispatch;
        if (hookNode.effect && hookNode.mode === reactShared.Effect_TYPE.__initial__) {
          hookNode.mode = reactShared.Effect_TYPE.__pendingEffect__;
          var ReactNewStrictMod_1 = renderDispatch.resolveStrict(fiber) && enableStrictLifeCycle$1.current;
          if (hookNode.hookType === "useEffect") {
            var update_1 = function () {
              var _a;
              hookNode.cancel && hookNode.cancel();
              if ((_a = hookNode._ownerFiber) === null || _a === void 0 ? void 0 : _a.isMounted) hookNode.cancel = hookNode.value();
              hookNode.effect = false;
              hookNode.mode = reactShared.Effect_TYPE.__initial__;
            };
            renderDispatch.pendingEffect(fiber, function () {
              if (ReactNewStrictMod_1) {
                update_1();
                update_1();
              } else {
                update_1();
              }
            });
          }
          if (hookNode.hookType === "useLayoutEffect") {
            var update_2 = function () {
              var _a;
              hookNode.cancel && hookNode.cancel();
              if ((_a = hookNode._ownerFiber) === null || _a === void 0 ? void 0 : _a.isMounted) hookNode.cancel = hookNode.value();
              hookNode.effect = false;
              hookNode.mode = reactShared.Effect_TYPE.__initial__;
            };
            renderDispatch.pendingLayoutEffect(fiber, function () {
              if (ReactNewStrictMod_1) {
                update_2();
                update_2();
              } else {
                update_2();
              }
            });
          }
          if (hookNode.hookType === "useImperativeHandle") {
            renderDispatch.pendingLayoutEffect(fiber, function () {
              // ref obj
              if (hookNode.value && typeof hookNode.value === "object") hookNode.value.current = hookNode.reducer.call(null);
              // ref function
              if (hookNode.value && typeof hookNode.value === "function") hookNode.value(hookNode.reducer.call(null));
              hookNode.effect = false;
              hookNode.mode = reactShared.Effect_TYPE.__initial__;
            });
          }
        }
      };

      var updateHookNode = function (_a, fiber) {
        var hookIndex = _a.hookIndex,
          hookType = _a.hookType,
          value = _a.value,
          reducer = _a.reducer,
          deps = _a.deps;
        var renderDispatch = fiber.root.renderDispatch;
        var renderPlatform = fiber.root.renderPlatform;
        var currentHook = fiber.hookNodes[hookIndex];
        if (hookType !== currentHook.hookType) throw new Error(renderPlatform.getHookTree(fiber.hookNodes, hookIndex, hookType));
        currentHook._setOwner(fiber);
        if (
          currentHook.hookType === reactShared.HOOK_TYPE.useMemo ||
          currentHook.hookType === reactShared.HOOK_TYPE.useEffect ||
          currentHook.hookType === reactShared.HOOK_TYPE.useCallback ||
          currentHook.hookType === reactShared.HOOK_TYPE.useLayoutEffect ||
          currentHook.hookType === reactShared.HOOK_TYPE.useImperativeHandle
        ) {
          if (deps && !currentHook.deps) {
            throw new Error("deps state change");
          }
          if (!deps && currentHook.deps) {
            throw new Error("deps state change");
          }
        }
        if (
          currentHook.hookType === reactShared.HOOK_TYPE.useEffect ||
          currentHook.hookType === reactShared.HOOK_TYPE.useLayoutEffect ||
          currentHook.hookType === reactShared.HOOK_TYPE.useImperativeHandle
        ) {
          if (!deps) {
            currentHook.value = value;
            currentHook.reducer = reducer || currentHook.reducer;
            currentHook.deps = deps;
            currentHook.effect = true;
          } else if (!isArrayEquals(currentHook.deps, deps)) {
            currentHook.value = value;
            currentHook.reducer = reducer || currentHook.reducer;
            currentHook.deps = deps;
            currentHook.effect = true;
          }
          return currentHook;
        }
        if (currentHook.hookType === reactShared.HOOK_TYPE.useCallback) {
          if (!isArrayEquals(currentHook.deps, deps)) {
            currentHook.value = value;
            currentHook.result = value;
            currentHook.deps = deps;
          }
          return currentHook;
        }
        if (currentHook.hookType === reactShared.HOOK_TYPE.useMemo) {
          if (!isArrayEquals(currentHook.deps, deps)) {
            currentHook.value = value;
            currentHook.result = value.call(null);
            currentHook.deps = deps;
          }
          return currentHook;
        }
        if (currentHook.hookType === reactShared.HOOK_TYPE.useContext) {
          if (!currentHook._contextFiber || !currentHook._contextFiber.isMounted || !Object.is(currentHook.value, value)) {
            currentHook.value = value;
            var ProviderFiber = renderDispatch.resolveContextFiber(currentHook._ownerFiber, currentHook.value);
            var context = renderDispatch.resolveContextValue(ProviderFiber, currentHook.value);
            currentHook._setContext(ProviderFiber);
            currentHook.result = context;
            currentHook.context = context;
          } else {
            var context = renderDispatch.resolveContextValue(currentHook._contextFiber, currentHook.value);
            currentHook.result = context;
            currentHook.context = context;
          }
          return currentHook;
        }
        if (currentHook.hookType === reactShared.HOOK_TYPE.useReducer) {
          currentHook.value = value;
          currentHook.reducer = reducer;
          return currentHook;
        }
        return currentHook;
      };

      var resolveHookValue = function (hookNode) {
        if (hookNode) {
          switch (hookNode.hookType) {
            case reactShared.HOOK_TYPE.useState:
            case reactShared.HOOK_TYPE.useReducer:
              return [hookNode.result, hookNode._dispatch];
            case reactShared.HOOK_TYPE.useRef:
            case reactShared.HOOK_TYPE.useMemo:
            case reactShared.HOOK_TYPE.useContext:
            case reactShared.HOOK_TYPE.useCallback:
              return hookNode.result;
            case reactShared.HOOK_TYPE.useSignal:
              return [hookNode.result.getValue, hookNode.result.setValue];
          }
        }
      };
      var processHookNode = function (fiber, _a) {
        var hookIndex = _a.hookIndex,
          hookType = _a.hookType,
          reducer = _a.reducer,
          value = _a.value,
          deps = _a.deps;
        if (!fiber) throw new Error("can not use hook outside of component");
        var renderPlatform = fiber.root.renderPlatform;
        var currentHook = null;
        if (fiber.hookNodes.length > hookIndex) {
          currentHook = updateHookNode({ hookIndex: hookIndex, hookType: hookType, reducer: reducer, value: value, deps: deps }, fiber);
        } else if (!fiber.isInvoked) {
          currentHook = createHookNode({ hookIndex: hookIndex, hookType: hookType, reducer: reducer, value: value, deps: deps }, fiber);
        } else {
          throw new Error(renderPlatform.getHookTree(fiber.hookNodes, hookIndex, hookType));
        }
        effectHookNode(fiber, currentHook);
        return resolveHookValue(currentHook);
      };

      var defaultGenerateKeepLiveMap = function (fiber, map) {
        if (fiber.type & exports.NODE_TYPE.__isKeepLiveNode__) {
          var cacheArray = map.get(fiber) || [];
          map.set(fiber, cacheArray);
        }
      };
      var defaultGetKeepLiveFiber = function (fiber, map, element) {
        var cacheArray = map.get(fiber) || [];
        // <KeepLive> component only have one child;
        var currentChild = fiber.child;
        // TODO
        // just a normal update
        if (checkIsSameType(currentChild, element)) return currentChild;
        if (
          cacheArray.every(function (f) {
            return f !== currentChild;
          })
        ) {
          cacheArray.push(currentChild);
        }
        var cachedFiber = cacheArray.find(function (f) {
          return checkIsSameType(f, element);
        });
        var newCacheArray = cacheArray.filter(function (f) {
          return f !== cachedFiber;
        });
        map.set(fiber, newCacheArray);
        return cachedFiber || null;
      };

      var WrapperByScope = function (children) {
        return react.createElement(
          reactShared.Scope,
          null,
          react.createElement(reactShared.Comment, { mode: "s" }),
          children,
          react.createElement(reactShared.Comment, { mode: "e" }),
        );
      };
      var isCommentElement = function (fiber) {
        return fiber.type & exports.NODE_TYPE.__isCommentNode__;
      };
      var isCommentStartElement = function (fiber) {
        if (isCommentElement(fiber)) {
          return fiber.pendingProps["mode"] === "s";
        }
        return false;
      };
      var isCommentEndElement = function (fiber) {
        if (isCommentElement(fiber)) {
          return fiber.pendingProps["mode"] === "e";
        }
        return false;
      };

      var defaultResolveLazyElementAsync = function (_fiber) {
        return __awaiter(void 0, void 0, void 0, function () {
          var renderPlatform, element;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                renderPlatform = _fiber.root.renderPlatform;
                return [4 /*yield*/, renderPlatform.resolveLazyAsync(_fiber)];
              case 1:
                element = _a.sent();
                return [2 /*return*/, WrapperByScope(element)];
            }
          });
        });
      };
      var defaultResolveLazyElement = function (_fiber) {
        var renderPlatform = _fiber.root.renderPlatform;
        var element = renderPlatform.resolveLazy(_fiber);
        return WrapperByScope(element);
      };

      var processClassComponentUpdateQueue = function (fiber) {
        var allQueue = fiber.updateQueue;
        var node = allQueue.head;
        var typedInstance = fiber.instance;
        var baseState = Object.assign({}, typedInstance.state);
        var baseProps = Object.assign({}, typedInstance.props);
        var newResult = typedInstance._result;
        // there are not a updateQueue
        if (!node) return false;
        while (node) {
          var updater = node.value;
          var nextNode = node.next;
          if (updater.type === "component") {
            if (updater.trigger !== typedInstance) {
              throw new Error("current update not valid, look like a bug for MyReact");
            }
            allQueue.delete(node);
            newResult.newState = Object.assign(
              newResult.newState || baseState,
              typeof updater.payLoad === "function" ? updater.payLoad(baseState, baseProps) : updater.payLoad,
            );
            newResult.isForce = newResult.isForce || updater.isForce;
            updater.callback && newResult.callback.push(updater.callback);
          }
          node = nextNode;
        }
        typedInstance._result = newResult;
        return true;
      };
      var processFunctionComponentUpdateQueue = function (fiber) {
        var allQueue = fiber.updateQueue;
        var node = allQueue.head;
        var needUpdate = false;
        while (node) {
          var updater = node.value;
          var nextNode = node.next;
          if (updater.type === "hook") {
            if (updater.trigger._ownerFiber !== fiber) {
              throw new Error("current update not valid, look like a bug for MyReact");
            }
            allQueue.delete(node);
            var trigger = updater.trigger,
              payLoad = updater.payLoad;
            var lastResult = trigger.result;
            trigger.result = trigger.reducer(lastResult, payLoad);
            if (!Object.is(lastResult, trigger.result)) {
              needUpdate = true;
            }
          }
          node = nextNode;
        }
        return needUpdate;
      };

      var defaultGenerateScopeMap = function (fiber, map) {
        var parent = fiber.parent;
        if (parent) {
          if (parent.type & exports.NODE_TYPE.__isScopeNode__) {
            map.set(fiber, parent);
          } else {
            var parentScopeFiber = map.get(parent);
            parentScopeFiber && map.set(fiber, parentScopeFiber);
          }
        }
        {
          var typedFiber = fiber;
          var scopeFiber = map.get(fiber);
          scopeFiber && (typedFiber._debugScope = scopeFiber);
        }
      };

      var defaultGenerateStrictMap = function (fiber, map) {
        var parent = fiber.parent;
        if (parent) {
          if (parent.type & exports.NODE_TYPE.__isStrictNode__) {
            map.set(fiber, true);
          } else {
            map.set(fiber, map.get(parent) || false);
          }
        }
        {
          var typedFiber = fiber;
          typedFiber._debugStrict = map.get(fiber) || false;
        }
      };

      var defaultGenerateSuspenseMap = function (fiber, map) {
        var parent = fiber.parent;
        if (parent) {
          if (parent.type & exports.NODE_TYPE.__isSuspenseNode__) {
            var fallback = parent.pendingProps["fallback"];
            map.set(fiber, fallback);
          } else {
            var fallbackElement = map.get(parent);
            fallbackElement && map.set(fiber, fallbackElement);
          }
        }
        {
          var typedFiber = fiber;
          var fallbackElement = map.get(fiber);
          fallbackElement && (typedFiber._debugSuspense = fallbackElement);
        }
      };

      var enableLegacyLifeCycle = react.__my_react_shared__.enableLegacyLifeCycle,
        enableStrictLifeCycle = react.__my_react_shared__.enableStrictLifeCycle;
      var processComponentStateFromProps = function (fiber, devInstance) {
        var _a, _b;
        var Component = fiber.type & exports.NODE_TYPE.__isDynamicNode__ ? fiber.elementType : fiber.elementType.render;
        var typedComponent = Component;
        var typedInstance = fiber.instance;
        var pendingProps = Object.assign({}, fiber.pendingProps);
        var currentState = Object.assign({}, typedInstance.state);
        if (typedComponent.getDerivedStateFromProps) {
          var payloadState =
            (_a = typedComponent.getDerivedStateFromProps) === null || _a === void 0 ? void 0 : _a.call(typedComponent, pendingProps, currentState);
          if (payloadState) {
            typedInstance.state = Object.assign({}, typedInstance.state, payloadState);
          }
        }
        if (devInstance) {
          var typedDevInstance = devInstance;
          var pendingProps_1 = Object.assign({}, fiber.pendingProps);
          var currentState_1 = Object.assign({}, typedInstance.state);
          if (typedComponent.getDerivedStateFromProps) {
            var payloadState =
              (_b = typedComponent.getDerivedStateFromProps) === null || _b === void 0 ? void 0 : _b.call(typedComponent, pendingProps_1, currentState_1);
            if (payloadState) {
              typedDevInstance.state = Object.assign({}, typedInstance.state, payloadState);
            }
          }
        }
      };
      var processComponentStateFromError = function (fiber, error) {
        var _a;
        var Component = fiber.type & exports.NODE_TYPE.__isDynamicNode__ ? fiber.elementType : fiber.elementType.render;
        var typedComponent = Component;
        var typedInstance = fiber.instance;
        if (typedComponent.getDerivedStateFromError) {
          var payloadState = (_a = typedComponent.getDerivedStateFromError) === null || _a === void 0 ? void 0 : _a.call(typedComponent, error);
          if (payloadState) {
            typedInstance.state = Object.assign({}, typedInstance.state, payloadState);
          }
        }
      };
      var processComponentInstanceOnMount = function (fiber) {
        var renderDispatch = fiber.root.renderDispatch;
        var ReactNewStrictMod = renderDispatch.resolveStrict(fiber) && enableStrictLifeCycle.current;
        var Component = fiber.type & exports.NODE_TYPE.__isDynamicNode__ ? fiber.elementType : fiber.elementType.render;
        var typedComponent = Component;
        var ProviderFiber = renderDispatch.resolveContextFiber(fiber, typedComponent.contextType);
        var context = renderDispatch.resolveContextValue(ProviderFiber, typedComponent.contextType);
        var props = Object.assign({}, fiber.pendingProps);
        var instance = new typedComponent(props, context);
        instance.props = props;
        instance.context = context;
        fiber._installInstance(instance);
        instance._setOwner(fiber);
        instance._setContext(ProviderFiber);
        var devInstance = null;
        if (ReactNewStrictMod) {
          var props_1 = Object.assign({}, fiber.pendingProps);
          devInstance = new typedComponent(props_1, context);
          devInstance.props = props_1;
          devInstance.context = context;
        }
        return devInstance;
      };
      var processComponentFiberOnUpdate = function (fiber) {
        var typedInstance = fiber.instance;
        typedInstance._setOwner(fiber);
      };
      var processComponentRenderOnMountAndUpdate = function (fiber, devInstance) {
        var typedInstance = fiber.instance;
        if (devInstance) {
          var cached = Object.assign({}, typedInstance);
          var children = typedInstance.render();
          // reset
          Object.assign(typedInstance, cached);
          typedInstance.render();
          return children;
        } else {
          var children = typedInstance.render();
          return children;
        }
      };
      var processComponentDidMountOnMount = function (fiber, devInstance) {
        var typedInstance = fiber.instance;
        var renderDispatch = fiber.root.renderDispatch;
        if (devInstance) {
          if ((typedInstance.componentDidMount || typedInstance.componentWillUnmount) && !(typedInstance.mode & reactShared.Effect_TYPE.__pendingEffect__)) {
            typedInstance.mode = reactShared.Effect_TYPE.__pendingEffect__;
            renderDispatch.pendingLayoutEffect(fiber, function () {
              var _a, _b, _c;
              typedInstance.mode = reactShared.Effect_TYPE.__initial__;
              (_a = typedInstance.componentDidMount) === null || _a === void 0 ? void 0 : _a.call(typedInstance);
              (_b = typedInstance.componentWillUnmount) === null || _b === void 0 ? void 0 : _b.call(typedInstance);
              (_c = typedInstance.componentDidMount) === null || _c === void 0 ? void 0 : _c.call(typedInstance);
            });
          }
        } else {
          if (typedInstance.componentDidMount && !(typedInstance.mode & reactShared.Effect_TYPE.__pendingEffect__)) {
            typedInstance.mode = reactShared.Effect_TYPE.__pendingEffect__;
            renderDispatch.pendingLayoutEffect(fiber, function () {
              var _a;
              typedInstance.mode = reactShared.Effect_TYPE.__initial__;
              (_a = typedInstance.componentDidMount) === null || _a === void 0 ? void 0 : _a.call(typedInstance);
            });
          }
        }
      };
      var processComponentDidCatchOnMountAndUpdate = function (fiber, error, targetFiber) {
        var typedInstance = fiber.instance;
        var renderDispatch = fiber.root.renderDispatch;
        var renderPlatform = fiber.root.renderPlatform;
        if (typedInstance.componentDidCatch && !(typedInstance.mode & reactShared.Effect_TYPE.__pendingEffect__)) {
          typedInstance.mode = reactShared.Effect_TYPE.__pendingEffect__;
          renderDispatch.pendingLayoutEffect(fiber, function () {
            var _a;
            typedInstance.mode = reactShared.Effect_TYPE.__initial__;
            (_a = typedInstance.componentDidCatch) === null || _a === void 0
              ? void 0
              : _a.call(typedInstance, error, { componentStack: renderPlatform.getFiberTree(targetFiber) });
          });
        }
      };
      var processComponentContextOnUpdate = function (fiber) {
        var renderDispatch = fiber.root.renderDispatch;
        var Component = fiber.type & exports.NODE_TYPE.__isDynamicNode__ ? fiber.elementType : fiber.elementType.render;
        var typedInstance = fiber.instance;
        var typedComponent = Component;
        if (typedComponent.contextType) {
          if (!(typedInstance === null || typedInstance === void 0 ? void 0 : typedInstance._contextFiber) || !typedInstance._contextFiber.isMounted) {
            var ProviderFiber = renderDispatch.resolveContextFiber(fiber, typedComponent.contextType);
            var context = renderDispatch.resolveContextValue(ProviderFiber, typedComponent.contextType);
            typedInstance === null || typedInstance === void 0 ? void 0 : typedInstance._setContext(ProviderFiber);
            return context;
          } else {
            var context = renderDispatch.resolveContextValue(typedInstance._contextFiber, typedComponent.contextType);
            // for ReActive component, we need set context fiber again
            typedInstance === null || typedInstance === void 0 ? void 0 : typedInstance._setContext(typedInstance._contextFiber);
            return context;
          }
        }
      };
      var processComponentPropsAndContextOnActive = function (fiber) {
        var props = Object.assign({}, fiber.pendingProps);
        var context = processComponentContextOnUpdate(fiber);
        var typedInstance = fiber.instance;
        typedInstance.props = props;
        typedInstance.context = context;
      };
      var processComponentShouldUpdateOnUpdate = function (fiber, _a) {
        var _b;
        var nextState = _a.nextState,
          nextProps = _a.nextProps,
          nextContext = _a.nextContext;
        var typedInstance = fiber.instance;
        if (fiber.mode & reactShared.UPDATE_TYPE.__triggerUpdate__) return true;
        if (typedInstance.shouldComponentUpdate) {
          return (_b = typedInstance.shouldComponentUpdate) === null || _b === void 0 ? void 0 : _b.call(typedInstance, nextProps, nextState, nextContext);
        }
        return true;
      };
      var processComponentGetSnapshotOnUpdate = function (fiber, _a) {
        var _b;
        var baseState = _a.baseState,
          baseProps = _a.baseProps;
        var typedInstance = fiber.instance;
        if (typedInstance.getSnapshotBeforeUpdate) {
          return (_b = typedInstance.getSnapshotBeforeUpdate) === null || _b === void 0 ? void 0 : _b.call(typedInstance, baseProps, baseState);
        }
        return null;
      };
      var processComponentDidUpdateOnUpdate = function (fiber, _a) {
        var baseState = _a.baseState,
          baseProps = _a.baseProps,
          snapshot = _a.snapshot,
          callback = _a.callback;
        var typedInstance = fiber.instance;
        var renderDispatch = fiber.root.renderDispatch;
        var hasEffect = typedInstance.componentDidUpdate || callback.length;
        if (hasEffect && !(typedInstance.mode & reactShared.Effect_TYPE.__pendingEffect__)) {
          typedInstance.mode = reactShared.Effect_TYPE.__pendingEffect__;
          renderDispatch.pendingLayoutEffect(fiber, function () {
            var _a;
            typedInstance.mode = reactShared.Effect_TYPE.__initial__;
            callback.forEach(function (c) {
              return c.call(null);
            });
            (_a = typedInstance.componentDidUpdate) === null || _a === void 0 ? void 0 : _a.call(typedInstance, baseProps, baseState, snapshot);
          });
        }
      };
      var processComponentWillMountOnMount = function (fiber) {
        var _a;
        var typedInstance = fiber.instance;
        // TODO setState
        if (typedInstance.UNSAFE_componentWillMount) {
          (_a = typedInstance.UNSAFE_componentWillMount) === null || _a === void 0 ? void 0 : _a.call(typedInstance);
          {
            fiber.root.renderPlatform.log({
              message: "should not invoke legacy lifeCycle function `UNSAFE_componentWillMount`",
              fiber: fiber,
              level: "warn",
              triggerOnce: true,
            });
          }
        }
      };
      var processComponentWillReceiveProps = function (fiber) {
        var _a;
        var typedInstance = fiber.instance;
        // only trigger on parent component update
        if (fiber.mode & reactShared.UPDATE_TYPE.__inheritUpdate__) {
          if (typedInstance.UNSAFE_componentWillReceiveProps) {
            var nextProps = Object.assign({}, fiber.pendingProps);
            (_a = typedInstance.UNSAFE_componentWillReceiveProps) === null || _a === void 0 ? void 0 : _a.call(typedInstance, nextProps);
            {
              fiber.root.renderPlatform.log({
                message: "should not invoke legacy lifeCycle function `UNSAFE_componentWillReceiveProps`",
                fiber: fiber,
                level: "warn",
                triggerOnce: true,
              });
            }
          }
        }
      };
      var processComponentWillUpdate = function (fiber, _a) {
        var nextProps = _a.nextProps,
          nextState = _a.nextState;
        var typedInstance = fiber.instance;
        if (typedInstance.UNSAFE_componentWillUpdate) {
          typedInstance.UNSAFE_componentWillUpdate(nextProps, nextState);
          {
            fiber.root.renderPlatform.log({
              message: "should not invoke legacy lifeCycle function `UNSAFE_componentWillUpdate`",
              fiber: fiber,
              level: "warn",
              triggerOnce: true,
            });
          }
        }
      };
      var classComponentMount = function (fiber) {
        var devInstance = processComponentInstanceOnMount(fiber);
        processComponentStateFromProps(fiber, devInstance);
        // legacy lifeCycle
        if (enableLegacyLifeCycle.current) {
          processComponentWillMountOnMount(fiber);
        }
        var children = processComponentRenderOnMountAndUpdate(fiber, devInstance);
        processComponentDidMountOnMount(fiber, devInstance);
        return children;
      };
      // TODO
      var classComponentActive = function (fiber) {
        processComponentFiberOnUpdate(fiber);
        processComponentPropsAndContextOnActive(fiber);
        var children = processComponentRenderOnMountAndUpdate(fiber);
        processComponentDidMountOnMount(fiber);
        return children;
      };
      var classComponentUpdate = function (fiber) {
        processComponentFiberOnUpdate(fiber);
        processComponentStateFromProps(fiber);
        if (enableLegacyLifeCycle.current) processComponentWillReceiveProps(fiber);
        var typedInstance = fiber.instance;
        var _a = typedInstance._result,
          newState = _a.newState,
          isForce = _a.isForce,
          callback = _a.callback;
        typedInstance._result = {
          newState: null,
          isForce: false,
          callback: [],
        };
        var baseState = typedInstance.state;
        var baseProps = typedInstance.props;
        // const baseContext = typedInstance.context;
        var nextState = Object.assign({}, baseState, newState);
        var nextProps = Object.assign({}, fiber.pendingProps);
        var nextContext = processComponentContextOnUpdate(fiber);
        var shouldUpdate = isForce;
        if (!shouldUpdate) {
          shouldUpdate = processComponentShouldUpdateOnUpdate(fiber, {
            nextState: nextState,
            nextProps: nextProps,
            nextContext: nextContext,
          });
        }
        if (shouldUpdate && enableLegacyLifeCycle.current) {
          processComponentWillUpdate(fiber, { nextProps: nextProps, nextState: nextState });
        }
        typedInstance.state = nextState;
        typedInstance.props = nextProps;
        typedInstance.context = nextContext;
        if (shouldUpdate) {
          var children = processComponentRenderOnMountAndUpdate(fiber);
          var snapshot = processComponentGetSnapshotOnUpdate(fiber, { baseState: baseState, baseProps: baseProps });
          processComponentDidUpdateOnUpdate(fiber, {
            snapshot: snapshot,
            baseProps: baseProps,
            baseState: baseState,
            callback: callback,
          });
          return { updated: true, children: children };
        } else {
          return { updated: false };
        }
      };
      var classComponentCatch = function (fiber, error, targetFiber) {
        processComponentStateFromError(fiber, error);
        var children = processComponentRenderOnMountAndUpdate(fiber);
        processComponentDidCatchOnMountAndUpdate(fiber, error, targetFiber);
        return children;
      };

      var MyReactFiberNodeClass = react.__my_react_internal__.MyReactFiberNode;
      var enableKeyDiff = react.__my_react_shared__.enableKeyDiff;
      var getKeyMatchedChildren = function (newChildren, prevFiberChildren) {
        if (!enableKeyDiff.current) return prevFiberChildren;
        if (!prevFiberChildren) return prevFiberChildren;
        if (prevFiberChildren.length === 0) return prevFiberChildren;
        var tempChildren = prevFiberChildren.slice(0);
        var assignPrevChildren = Array(tempChildren.length).fill(null);
        newChildren.forEach(function (element, index) {
          if (tempChildren.length) {
            if (react.isValidElement(element)) {
              if (typeof element.key === "string") {
                var targetIndex = tempChildren.findIndex(function (fiber) {
                  var _a;
                  return (
                    fiber instanceof MyReactFiberNodeClass &&
                    typeof fiber.element === "object" &&
                    ((_a = fiber.element) === null || _a === void 0 ? void 0 : _a.key) === element.key
                  );
                });
                if (targetIndex !== -1) {
                  assignPrevChildren[index] = tempChildren[targetIndex];
                  tempChildren.splice(targetIndex, 1);
                }
              }
            }
          }
        });
        return assignPrevChildren.map(function (v) {
          if (v) return v;
          return tempChildren.shift();
        });
      };
      var getIsSameTypeNode = function (newChild, prevFiberChild) {
        var newChildIsArray = Array.isArray(newChild);
        var prevElementChildIsArray = Array.isArray(prevFiberChild);
        if (newChildIsArray && prevElementChildIsArray) return true;
        if (newChildIsArray) return false;
        if (prevElementChildIsArray) return false;
        if ((newChild === null || newChild === undefined) && (prevFiberChild === null || prevFiberChild === undefined)) return false;
        var typedPrevFiberChild = prevFiberChild;
        var typedNewChild = newChild;
        var prevRenderedChild = typedPrevFiberChild === null || typedPrevFiberChild === void 0 ? void 0 : typedPrevFiberChild.element;
        var result = checkIsSameType(typedPrevFiberChild, typedNewChild);
        if (result && enableKeyDiff.current && react.isValidElement(typedNewChild)) {
          return typedNewChild.key === prevRenderedChild.key;
        } else {
          return result;
        }
      };
      var getNewFiberWithUpdate = function (newChild, parentFiber, prevFiberChild, assignPrevFiberChild) {
        var renderDispatch = parentFiber.root.renderDispatch;
        var isSameType = getIsSameTypeNode(newChild, assignPrevFiberChild);
        if (isSameType) {
          if (Array.isArray(newChild) && Array.isArray(prevFiberChild) && Array.isArray(assignPrevFiberChild)) {
            var assignPrevFiberChildren_1 = getKeyMatchedChildren(newChild, assignPrevFiberChild);
            if (newChild.length < assignPrevFiberChildren_1.length)
              renderDispatch.pendingUnmount(parentFiber, assignPrevFiberChildren_1.slice(newChild.length));
            return newChild.map(function (v, index) {
              return getNewFiberWithUpdate(v, parentFiber, prevFiberChild[index], assignPrevFiberChildren_1[index]);
            });
          }
          return updateFiberNode(
            {
              fiber: assignPrevFiberChild,
              parent: parentFiber,
              prevFiber: prevFiberChild,
            },
            newChild,
          );
        } else {
          if (assignPrevFiberChild) renderDispatch.pendingUnmount(parentFiber, assignPrevFiberChild);
          if (Array.isArray(newChild))
            return newChild.map(function (v) {
              return getNewFiberWithUpdate(v, parentFiber);
            });
          return createFiberNode({ parent: parentFiber, type: "position" }, newChild);
        }
      };
      var getNewFiberWithInitial = function (newChild, parentFiber) {
        if (Array.isArray(newChild)) {
          return newChild.map(function (v) {
            return getNewFiberWithInitial(v, parentFiber);
          });
        }
        return createFiberNode({ parent: parentFiber }, newChild);
      };
      // TODO
      /**
       * 目前这个步骤会在比较大的loop中成为性能瓶颈
       */
      var transformChildrenFiber = function (parentFiber, children) {
        var isUpdate = parentFiber.mode & reactShared.UPDATE_TYPE.__needUpdate__;
        var renderDispatch = parentFiber.root.renderDispatch;
        if (isUpdate) {
          if (Array.isArray(children)) {
            var newChildren = children;
            var prevFiberReturn = parentFiber.return || [];
            var prevFiberChildren = Array.isArray(prevFiberReturn) ? prevFiberReturn : [prevFiberReturn];
            var assignPrevFiberChildren = getKeyMatchedChildren(newChildren, prevFiberChildren);
            parentFiber._beforeUpdate();
            var index = 0;
            while (index < newChildren.length || index < assignPrevFiberChildren.length) {
              var newChild = newChildren[index];
              var prevFiberChild = prevFiberChildren[index];
              var assignPrevFiberChild = assignPrevFiberChildren[index];
              var newFiber = getNewFiberWithUpdate(newChild, parentFiber, prevFiberChild, assignPrevFiberChild);
              parentFiber.return = parentFiber.return || [];
              parentFiber.return.push(newFiber);
              index++;
            }
            parentFiber._afterUpdate();
          } else {
            var prevFiberReturn = parentFiber.return || null;
            if (Array.isArray(prevFiberReturn)) {
              var newChildren = [children];
              var prevFiberChildren = prevFiberReturn;
              var assignPrevFiberChildren = getKeyMatchedChildren(newChildren, prevFiberChildren);
              parentFiber._beforeUpdate();
              var index = 0;
              while (index < newChildren.length || index < assignPrevFiberChildren.length) {
                var newChild = newChildren[index];
                var prevFiberChild = prevFiberChildren[index];
                var assignPrevFiberChild = assignPrevFiberChildren[index];
                var newFiber = getNewFiberWithUpdate(newChild, parentFiber, prevFiberChild, assignPrevFiberChild);
                parentFiber.return = parentFiber.return || [];
                parentFiber.return.push(newFiber);
                index++;
              }
              parentFiber._afterUpdate();
            } else if (prevFiberReturn) {
              parentFiber._beforeUpdate();
              var newFiber = getNewFiberWithUpdate(children, parentFiber, prevFiberReturn, prevFiberReturn);
              parentFiber.return = newFiber;
              parentFiber._afterUpdate();
            }
          }
        } else {
          if (parentFiber.return) {
            {
              parentFiber.root.renderPlatform.log({ message: "unmount for current fiber children, look like a bug", level: "warn" });
            }
            renderDispatch.pendingUnmount(parentFiber, parentFiber.return);
          }
          if (Array.isArray(children)) {
            var newChildren = children;
            parentFiber._beforeUpdate();
            var index = 0;
            while (index < newChildren.length) {
              var newChild = newChildren[index];
              var newFiber = getNewFiberWithInitial(newChild, parentFiber);
              parentFiber.return = parentFiber.return || [];
              parentFiber.return.push(newFiber);
              index++;
            }
            parentFiber._afterUpdate();
          } else {
            parentFiber._beforeUpdate();
            var newFiber = getNewFiberWithInitial(children, parentFiber);
            parentFiber.return = newFiber;
            parentFiber._afterUpdate();
          }
        }
        return parentFiber.children;
      };
      // TODO
      // export const transformKeepLiveChildrenFiber = (parentFiber: MyReactFiberNode, children: MyReactElementNode) => {
      //   const isUpdate = parentFiber.mode & (UPDATE_TYPE.__update__ | UPDATE_TYPE.__trigger__);
      //   if (true) {
      //     const log = parentFiber.root.renderPlatform.log;
      //     log({
      //       message: `you are using internal <KeepLive /> component to render different component by toggle logic, pls note this is a experimental feature,
      //     1. <KeepLive /> component will not clean rendered tree state when render a different component, so it will keep dom(like <input /> value and so on), hook, state.
      //     2. <KeepLive /> component sometime will cause some bug, pls do not use on the production.
      //     `,
      //       fiber: parentFiber,
      //       triggerOnce: true,
      //     });
      //   }
      //   if (!isUpdate) return transformChildrenFiber(parentFiber, children);
      //   const renderDispatch = parentFiber.root.renderDispatch as RenderDispatch;
      //   const prevFiber = parentFiber.child;
      //   const cachedFiber = renderDispatch.resolveKeepLive(parentFiber, children);
      //   if (cachedFiber) {
      //     parentFiber.beforeUpdate();
      //     parentFiber.return = updateFiberNode({ fiber: cachedFiber, parent: parentFiber, prevFiber: prevFiber }, children);
      //     parentFiber.afterUpdate();
      //     // it is a cachedFiber, so should deactivate prevFiber
      //     if (prevFiber !== cachedFiber) {
      //       renderDispatch.pendingDeactivate(parentFiber);
      //     }
      //     return parentFiber.children;
      //   } else {
      //     // not have cachedFiber, maybe it is a first time to run
      //     parentFiber.beforeUpdate();
      //     parentFiber.return = createFiberNode({ parent: parentFiber, type: "position" }, children);
      //     parentFiber.afterUpdate();
      //     renderDispatch.pendingDeactivate(parentFiber);
      //     return parentFiber.children;
      //   }
      // };

      var processReactiveInstanceOnMount = function (fiber) {
        var renderDispatch = fiber.root.renderDispatch;
        var typedType = fiber.type & exports.NODE_TYPE.__isMemo__ ? fiber.elementType["render"] : fiber.elementType;
        var ProviderFiber = renderDispatch.resolveContextFiber(fiber, typedType.contextType);
        var context = renderDispatch.resolveContextValue(ProviderFiber, typedType.contextType);
        var props = Object.assign({}, fiber.pendingProps);
        var instance = new reactReactive.MyReactReactiveInstance(props, context);
        // set global reactiveInstance, so in the `setup` function, we can get the current instance
        reactReactive.currentReactiveInstance.current = instance;
        instance._createSetupState(typedType.setup, typedType.render);
        instance._createEffectUpdate(function () {
          var _a;
          return (_a = instance._ownerFiber) === null || _a === void 0 ? void 0 : _a._update();
        });
        reactReactive.currentReactiveInstance.current = null;
        instance.props = props;
        instance.context = context;
        fiber._installInstance(instance);
        instance._setOwner(fiber);
        instance._setContext(ProviderFiber);
      };
      var processBeforeMountHooks = function (fiber) {
        var typedInstance = fiber.instance;
        if (typedInstance.beforeMountHooks.length)
          typedInstance.beforeMountHooks.forEach(function (f) {
            return f === null || f === void 0 ? void 0 : f();
          });
      };
      var processReactiveRenderOnMountAndUpdate = function (fiber) {
        var typedInstance = fiber.instance;
        var children = typedInstance.effect.run();
        return children;
      };
      var processReactivePropsAndContextOnActiveAndUpdate = function (fiber) {
        var renderDispatch = fiber.root.renderDispatch;
        var typedInstance = fiber.instance;
        var typedType = fiber.type & exports.NODE_TYPE.__isMemo__ ? fiber.elementType["render"] : fiber.elementType;
        if (typedType.contextType) {
          if (!(typedInstance === null || typedInstance === void 0 ? void 0 : typedInstance._contextFiber) || !typedInstance._contextFiber.isMounted) {
            var ProviderFiber = renderDispatch.resolveContextFiber(fiber, typedType.contextType);
            var context = renderDispatch.resolveContextValue(ProviderFiber, typedType.contextType);
            typedInstance === null || typedInstance === void 0 ? void 0 : typedInstance._setContext(ProviderFiber);
            typedInstance.context = context;
          } else {
            var context = renderDispatch.resolveContextValue(typedInstance._contextFiber, typedType.contextType);
            typedInstance === null || typedInstance === void 0 ? void 0 : typedInstance._setContext(typedInstance._contextFiber);
            typedInstance.context = context;
          }
        }
        var props = Object.assign({}, fiber.pendingProps);
        typedInstance.props = props;
      };
      var processMountedHooks = function (fiber) {
        var typedInstance = fiber.instance;
        var renderDispatch = fiber.root.renderDispatch;
        if (typedInstance.mountedHooks.length && !(typedInstance.mode & reactShared.Effect_TYPE.__pendingEffect__)) {
          typedInstance.mode = reactShared.Effect_TYPE.__pendingEffect__;
          renderDispatch.pendingLayoutEffect(fiber, function () {
            typedInstance.mode = reactShared.Effect_TYPE.__initial__;
            typedInstance.mountedHooks.forEach(function (f) {
              return f === null || f === void 0 ? void 0 : f();
            });
          });
        }
      };
      var processBeforeUpdateHooks = function (fiber) {
        var typedInstance = fiber.instance;
        if (typedInstance.beforeUpdateHooks.length) {
          // disable reactive for beforeUpdate hook
          reactReactive.pauseTracking();
          reactReactive.pauseTrigger();
          typedInstance.beforeUpdateHooks.forEach(function (f) {
            return f === null || f === void 0 ? void 0 : f();
          });
          reactReactive.resetTrigger();
          reactReactive.resetTracking();
        }
      };
      var processUpdatedHooks = function (fiber) {
        var typedInstance = fiber.instance;
        var renderDispatch = fiber.root.renderDispatch;
        if (typedInstance.updatedHooks.length && !(typedInstance.mode & reactShared.Effect_TYPE.__pendingEffect__)) {
          typedInstance.mode = reactShared.Effect_TYPE.__pendingEffect__;
          renderDispatch.pendingLayoutEffect(fiber, function () {
            typedInstance.mode = reactShared.Effect_TYPE.__initial__;
            typedInstance.updatedHooks.forEach(function (f) {
              return f === null || f === void 0 ? void 0 : f();
            });
          });
        }
      };
      var processReactiveFiberOnUpdate = function (fiber) {
        var typedInstance = fiber.instance;
        typedInstance.effect.active();
        typedInstance._setOwner(fiber);
      };
      var reactiveComponentMount = function (fiber) {
        processReactiveInstanceOnMount(fiber);
        processBeforeMountHooks(fiber);
        var children = processReactiveRenderOnMountAndUpdate(fiber);
        processMountedHooks(fiber);
        return children;
      };
      // TODO
      var reactiveComponentActive = function (fiber) {
        processReactiveFiberOnUpdate(fiber);
        processBeforeMountHooks(fiber);
        processReactivePropsAndContextOnActiveAndUpdate(fiber);
        var children = processReactiveRenderOnMountAndUpdate(fiber);
        processMountedHooks(fiber);
        return children;
      };
      var reactiveComponentUpdate = function (fiber) {
        processReactiveFiberOnUpdate(fiber);
        processBeforeUpdateHooks(fiber);
        processReactivePropsAndContextOnActiveAndUpdate(fiber);
        var children = processReactiveRenderOnMountAndUpdate(fiber);
        processUpdatedHooks(fiber);
        return children;
      };

      var currentHookDeepIndex = react.__my_react_internal__.currentHookDeepIndex,
        currentFunctionFiber$1 = react.__my_react_internal__.currentFunctionFiber,
        currentComponentFiber$1 = react.__my_react_internal__.currentComponentFiber;
      var nextWorkCommon = function (fiber, children) {
        var childrenFiber = transformChildrenFiber(fiber, children);
        {
          var typedFiber = fiber;
          typedFiber._debugDynamicChildren = children;
        }
        return childrenFiber;
      };
      var nextWorkClassComponent = function (fiber) {
        if (!fiber.instance) {
          var children = classComponentMount(fiber);
          return nextWorkCommon(fiber, children);
        } else {
          var _a = classComponentUpdate(fiber),
            updated = _a.updated,
            children = _a.children;
          if (updated) {
            return nextWorkCommon(fiber, children);
          } else {
            fiber._afterUpdate();
            return [];
          }
        }
      };
      var nextWorkFunctionComponent = function (fiber) {
        currentHookDeepIndex.current = 0;
        currentFunctionFiber$1.current = fiber;
        var typedElementType = fiber.elementType;
        var children = typedElementType(fiber.pendingProps);
        currentFunctionFiber$1.current = null;
        currentHookDeepIndex.current = 0;
        return nextWorkCommon(fiber, children);
      };
      var nextWorkComponent = function (fiber) {
        if (fiber.type & exports.NODE_TYPE.__isFunctionComponent__) {
          currentComponentFiber$1.current = fiber;
          var res = nextWorkFunctionComponent(fiber);
          currentComponentFiber$1.current = null;
          return res;
        } else {
          currentComponentFiber$1.current = fiber;
          var res = nextWorkClassComponent(fiber);
          currentComponentFiber$1.current = null;
          return res;
        }
      };
      var nextWorkMemo = function (fiber) {
        var _a;
        var typedElementType = fiber.elementType;
        var targetRender = typedElementType.render;
        if (typeof targetRender === "object") {
          if (targetRender[reactShared.TYPEKEY] === reactShared.ForwardRef) {
            var typedTargetRender = targetRender;
            var forwardRefRender = typedTargetRender.render;
            currentComponentFiber$1.current = fiber;
            currentHookDeepIndex.current = 0;
            // support hook for forwardRef render function
            currentFunctionFiber$1.current = fiber;
            var children = forwardRefRender(fiber.pendingProps, fiber.ref);
            currentFunctionFiber$1.current = null;
            currentHookDeepIndex.current = 0;
            currentComponentFiber$1.current = null;
            return nextWorkCommon(fiber, children);
          }
          if (targetRender[reactShared.TYPEKEY] === reactShared.Reactive) {
            currentComponentFiber$1.current = fiber;
            var res = nextWorkReactive(fiber);
            currentComponentFiber$1.current = fiber;
            return res;
          }
          throw new Error("unSupport memo() usage");
        }
        if (typeof targetRender === "function") {
          var isClassComponent =
            (_a = targetRender === null || targetRender === void 0 ? void 0 : targetRender.prototype) === null || _a === void 0
              ? void 0
              : _a.isMyReactComponent;
          if (isClassComponent) {
            currentComponentFiber$1.current = fiber;
            var res = nextWorkClassComponent(fiber);
            currentComponentFiber$1.current = null;
            return res;
          } else {
            var typedTargetRender = targetRender;
            currentComponentFiber$1.current = fiber;
            currentHookDeepIndex.current = 0;
            currentFunctionFiber$1.current = fiber;
            var children = typedTargetRender(fiber.pendingProps);
            currentFunctionFiber$1.current = null;
            currentHookDeepIndex.current = 0;
            currentComponentFiber$1.current = null;
            return nextWorkCommon(fiber, children);
          }
        }
        throw new Error("unSupport memo() usage");
      };
      var nextWorkLazy = function (fiber) {
        var renderDispatch = fiber.root.renderDispatch;
        var children = renderDispatch.resolveLazyElement(fiber);
        return nextWorkCommon(fiber, children);
      };
      var nextWorkLazySync = function (fiber) {
        return __awaiter(void 0, void 0, void 0, function () {
          var renderDispatch, children;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                renderDispatch = fiber.root.renderDispatch;
                return [4 /*yield*/, renderDispatch.resolveLazyElementAsync(fiber)];
              case 1:
                children = _a.sent();
                return [2 /*return*/, nextWorkCommon(fiber, children)];
            }
          });
        });
      };
      var nextWorkReactive = function (fiber) {
        if (!fiber.instance) {
          var children = reactiveComponentMount(fiber);
          return nextWorkCommon(fiber, children);
        } else {
          var children = reactiveComponentUpdate(fiber);
          return nextWorkCommon(fiber, children);
        }
      };
      var nextWorkReactiveComponent = function (fiber) {
        currentComponentFiber$1.current = fiber;
        var res = nextWorkReactive(fiber);
        currentComponentFiber$1.current = null;
        return res;
      };
      var nextWorkForwardRef = function (fiber) {
        currentComponentFiber$1.current = fiber;
        var typedElementType = fiber.elementType;
        var typedRender = typedElementType.render;
        currentHookDeepIndex.current = 0;
        currentFunctionFiber$1.current = fiber;
        var children = typedRender(fiber.pendingProps, fiber.ref);
        currentFunctionFiber$1.current = null;
        currentHookDeepIndex.current = 0;
        currentComponentFiber$1.current = null;
        return nextWorkCommon(fiber, children);
      };
      var nextWorkNormal = function (fiber) {
        // for a comment element, will not have any children;
        if (react.isValidElement(fiber.element) && !isCommentElement(fiber)) {
          var children = fiber.pendingProps.children;
          var childrenFiber = transformChildrenFiber(fiber, children);
          return childrenFiber;
        } else {
          fiber._afterUpdate();
          return [];
        }
      };
      var nextWorkConsumer = function (fiber) {
        var renderDispatch = fiber.root.renderDispatch;
        var typedElementType = fiber.elementType;
        fiber.instance = fiber.instance || new typedElementType.Internal();
        fiber.instance._setOwner(fiber);
        var Context = typedElementType.Context;
        currentComponentFiber$1.current = fiber;
        // for deactivated context fiber, maybe will not update children context, but all the children has deactivated, so it will not matter
        if (!fiber.instance._contextFiber || !fiber.instance._contextFiber.isMounted) {
          var ProviderFiber = renderDispatch.resolveContextFiber(fiber, Context);
          var context = renderDispatch.resolveContextValue(ProviderFiber, Context);
          fiber.instance.context = context;
          fiber.instance._setContext(ProviderFiber);
        } else {
          var context = renderDispatch.resolveContextValue(fiber.instance._contextFiber, Context);
          fiber.instance.context = context;
        }
        var typedChildren = fiber.pendingProps.children;
        var children = typedChildren(fiber.instance.context);
        currentComponentFiber$1.current = null;
        return nextWorkCommon(fiber, children);
      };
      var runtimeNextWork = function (fiber) {
        if (fiber.type & exports.NODE_TYPE.__isDynamicNode__) return nextWorkComponent(fiber);
        if (fiber.type & exports.NODE_TYPE.__isMemo__) return nextWorkMemo(fiber);
        if (fiber.type & exports.NODE_TYPE.__isLazy__) return nextWorkLazy(fiber);
        if (fiber.type & exports.NODE_TYPE.__isPortal__) return nextWorkNormal(fiber);
        if (fiber.type & exports.NODE_TYPE.__isReactive__) return nextWorkReactiveComponent(fiber);
        if (fiber.type & exports.NODE_TYPE.__isForwardRef__) return nextWorkForwardRef(fiber);
        if (fiber.type & exports.NODE_TYPE.__isContextProvider__) return nextWorkNormal(fiber);
        if (fiber.type & exports.NODE_TYPE.__isContextConsumer__) return nextWorkConsumer(fiber);
        return nextWorkNormal(fiber);
      };
      var runtimeNextWorkAsync = function (fiber) {
        return __awaiter(void 0, void 0, void 0, function () {
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                if (fiber.type & exports.NODE_TYPE.__isDynamicNode__) return [2 /*return*/, nextWorkComponent(fiber)];
                if (fiber.type & exports.NODE_TYPE.__isMemo__) return [2 /*return*/, nextWorkMemo(fiber)];
                if (!(fiber.type & exports.NODE_TYPE.__isLazy__)) return [3 /*break*/, 2];
                return [4 /*yield*/, nextWorkLazySync(fiber)];
              case 1:
                return [2 /*return*/, _a.sent()];
              case 2:
                if (fiber.type & exports.NODE_TYPE.__isPortal__) return [2 /*return*/, nextWorkNormal(fiber)];
                if (fiber.type & exports.NODE_TYPE.__isReactive__) return [2 /*return*/, nextWorkReactiveComponent(fiber)];
                if (fiber.type & exports.NODE_TYPE.__isForwardRef__) return [2 /*return*/, nextWorkForwardRef(fiber)];
                if (fiber.type & exports.NODE_TYPE.__isContextProvider__) return [2 /*return*/, nextWorkNormal(fiber)];
                if (fiber.type & exports.NODE_TYPE.__isContextConsumer__) return [2 /*return*/, nextWorkConsumer(fiber)];
                return [2 /*return*/, nextWorkNormal(fiber)];
            }
          });
        });
      };

      var currentFunctionFiber = react.__my_react_internal__.currentFunctionFiber,
        currentRunningFiber = react.__my_react_internal__.currentRunningFiber,
        currentComponentFiber = react.__my_react_internal__.currentComponentFiber;
      var performToNextArray = function (fiber) {
        if (!fiber.isMounted) return [];
        if (fiber.isInvoked && !(fiber.mode & reactShared.UPDATE_TYPE.__needUpdate__)) return [];
        currentRunningFiber.current = fiber;
        var children = runtimeNextWork(fiber);
        fiber.isInvoked = true;
        currentRunningFiber.current = null;
        return children;
      };
      var performToNextArrayAsync = function (fiber) {
        return __awaiter(void 0, void 0, void 0, function () {
          var children;
          return __generator(this, function (_a) {
            if (!fiber.isMounted) return [2 /*return*/, []];
            if (fiber.isInvoked && !(fiber.mode & reactShared.UPDATE_TYPE.__needUpdate__)) return [2 /*return*/, []];
            currentRunningFiber.current = fiber;
            children = runtimeNextWorkAsync(fiber);
            fiber.isInvoked = true;
            currentRunningFiber.current = null;
            return [2 /*return*/, children];
          });
        });
      };
      var performToNextFiber = function (fiber) {
        if (!fiber.isMounted) return null;
        if (!fiber.isInvoked || fiber.mode & reactShared.UPDATE_TYPE.__needUpdate__) {
          currentRunningFiber.current = fiber;
          runtimeNextWork(fiber);
          fiber.isInvoked = true;
          currentRunningFiber.current = null;
          if (fiber.children.length) {
            return fiber.child;
          }
        }
        var renderController = fiber.root.renderController;
        var nextFiber = fiber;
        while (nextFiber && nextFiber !== renderController.getTopLevelFiber()) {
          renderController.generateUpdateList(nextFiber);
          if (nextFiber.sibling) return nextFiber.sibling;
          nextFiber = nextFiber.parent;
        }
        if (nextFiber === renderController.getTopLevelFiber()) {
          renderController.generateUpdateList(nextFiber);
        }
        return null;
      };
      var performToNextFiberAsync = function (fiber) {
        return __awaiter(void 0, void 0, void 0, function () {
          var renderController, nextFiber;
          return __generator(this, function (_a) {
            if (!fiber.isMounted) return [2 /*return*/, null];
            if (!fiber.isInvoked || fiber.mode & reactShared.UPDATE_TYPE.__needUpdate__) {
              currentRunningFiber.current = fiber;
              runtimeNextWorkAsync(fiber);
              fiber.isInvoked = true;
              currentRunningFiber.current = null;
              if (fiber.children.length) {
                return [2 /*return*/, fiber.child];
              }
            }
            renderController = fiber.root.renderController;
            nextFiber = fiber;
            while (nextFiber && nextFiber !== renderController.getTopLevelFiber()) {
              renderController.generateUpdateList(nextFiber);
              if (nextFiber.sibling) return [2 /*return*/, nextFiber.sibling];
              nextFiber = nextFiber.parent;
            }
            if (nextFiber === renderController.getTopLevelFiber()) {
              renderController.generateUpdateList(nextFiber);
            }
            return [2 /*return*/, null];
          });
        });
      };
      var performToNextArrayOnError = function (fiber, error, targetFiber) {
        if (!fiber.isMounted) return null;
        if (fiber.isInvoked && !(fiber.mode & reactShared.UPDATE_TYPE.__needUpdate__)) return [];
        currentRunningFiber.current = fiber;
        currentComponentFiber.current = fiber;
        var childrenNode = classComponentCatch(fiber, error, targetFiber);
        var children = nextWorkCommon(fiber, childrenNode);
        fiber.isInvoked = true;
        currentRunningFiber.current = null;
        currentFunctionFiber.current = null;
        currentComponentFiber.current = null;
        return children;
      };
      var performToNextFiberOnError = function (fiber, error, targetFiber) {
        if (!fiber.isMounted) return null;
        if (!fiber.isInvoked || fiber.mode & reactShared.UPDATE_TYPE.__needUpdate__) {
          currentRunningFiber.current = fiber;
          currentComponentFiber.current = fiber;
          var children = classComponentCatch(fiber, error, targetFiber);
          nextWorkCommon(fiber, children);
          fiber.isInvoked = true;
          currentRunningFiber.current = null;
          currentFunctionFiber.current = null;
          currentComponentFiber.current = null;
          if (fiber.children.length) {
            return fiber.child;
          }
        }
        var renderController = fiber.root.renderController;
        var nextFiber = fiber;
        while (nextFiber && nextFiber !== renderController.getTopLevelFiber()) {
          renderController.generateUpdateList(nextFiber);
          if (nextFiber.sibling) return nextFiber.sibling;
          nextFiber = nextFiber.parent;
        }
        if (nextFiber === renderController.getTopLevelFiber()) {
          renderController.generateUpdateList(nextFiber);
        }
        return null;
      };

      var beginCommitFiberList = function (scope) {
        var _a;
        if ((_a = scope.pendingCommitFiberList) === null || _a === void 0 ? void 0 : _a.length) {
          scope.pendingCommitFiberListArray.push(scope.pendingCommitFiberList);
        }
        scope.pendingCommitFiberList = new reactShared.ListTree();
      };
      var endCommitFiberList = function (scope) {
        var _a;
        if ((_a = scope.pendingCommitFiberList) === null || _a === void 0 ? void 0 : _a.length) {
          scope.pendingCommitFiberListArray.push(scope.pendingCommitFiberList);
        }
        scope.pendingCommitFiberList = null;
      };
      var nextProcessFiber = function (scope) {
        if (scope.isAppCrashed) return null;
        var yieldFiber = scope.yieldFiber;
        scope.yieldFiber = null;
        if (yieldFiber) return yieldFiber;
        scope.modifyFiberRoot = null;
        while (scope.pendingProcessFiberArray.length) {
          var nextProcessFiber_1 = scope.pendingProcessFiberArray.uniShift();
          // current fiber has updated, skip
          if (!nextProcessFiber_1.isMounted || nextProcessFiber_1.mode === reactShared.UPDATE_TYPE.__initial__) continue;
          beginCommitFiberList(scope);
          scope.modifyFiberRoot = nextProcessFiber_1;
          return nextProcessFiber_1;
        }
        return null;
      };
      var generatePendingCommitFiberList = function (fiber) {
        if (fiber && fiber.isMounted) {
          var renderScope = fiber.root.renderScope;
          renderScope.pendingCommitFiberList = renderScope.pendingCommitFiberList || new reactShared.ListTree();
          if (fiber.patch & reactShared.PATCH_TYPE.__pendingGenerateUpdateList__) {
            renderScope.pendingCommitFiberList.append(fiber);
          }
        }
      };
      var CustomRenderController = /** @class */ (function () {
        function CustomRenderController(scope) {
          this.hasUiUpdate = false;
          this.renderScope = scope;
        }
        CustomRenderController.prototype.shouldYield = function () {
          return false;
        };
        CustomRenderController.prototype.hasNext = function () {
          if (this.renderScope.isAppCrashed) return false;
          if (this.renderScope.yieldFiber !== null) return true;
          this.renderScope.modifyFiberRoot = null;
          return this.renderScope.pendingProcessFiberArray.length > 0;
        };
        CustomRenderController.prototype.generateUpdateList = function (_fiber) {
          if (_fiber.root.renderScope !== this.renderScope) {
            throw new Error("runtime error for @my-react");
          }
          if (_fiber.patch & reactShared.PATCH_TYPE.__pendingUpdate__) {
            this.hasUiUpdate = true;
          }
          generatePendingCommitFiberList(_fiber);
        };
        CustomRenderController.prototype.getTopLevelFiber = function () {
          return this.renderScope.modifyFiberRoot;
        };
        CustomRenderController.prototype.setTopLevelFiber = function (_fiber) {
          if (_fiber.root.renderScope !== this.renderScope) {
            throw new Error("runtime error for @my-react");
          }
          this.renderScope.modifyFiberRoot = _fiber;
        };
        CustomRenderController.prototype.getNextFiber = function () {
          return nextProcessFiber(this.renderScope);
        };
        CustomRenderController.prototype.setYieldFiber = function (_fiber) {
          if (_fiber) {
            if (_fiber.root.renderScope !== this.renderScope) {
              throw new Error("runtime error for @my-react");
            }
            this.renderScope.yieldFiber = _fiber;
          } else {
            this.renderScope.yieldFiber = null;
            endCommitFiberList(this.renderScope);
          }
        };
        CustomRenderController.prototype.performToNextFiber = function (_fiber) {
          return performToNextFiber(_fiber);
        };
        CustomRenderController.prototype.performToNextFiberAsync = function (_fiber) {
          return performToNextFiberAsync(_fiber);
        };
        CustomRenderController.prototype.performToNextArray = function (_fiber) {
          return performToNextArray(_fiber);
        };
        CustomRenderController.prototype.performToNextArrayAsync = function (_fiber) {
          return performToNextArrayAsync(_fiber);
        };
        CustomRenderController.prototype.performToNextArrayOnError = function (_fiber, _error, _targetFiber) {
          return performToNextArrayOnError(_fiber, _error, _targetFiber);
        };
        CustomRenderController.prototype.performToNextFiberOnError = function (_fiber, _error, _targetFiber) {
          return performToNextFiberOnError(_fiber, _error, _targetFiber);
        };
        CustomRenderController.prototype.reset = function () {
          var renderScope = this.renderScope;
          renderScope.isAppCrashed = false;
          renderScope.yieldFiber = null;
          renderScope.modifyFiberRoot = null;
          renderScope.pendingCommitFiberList = null;
          renderScope.pendingCommitFiberListArray = [];
          renderScope.pendingProcessFiberArray = new reactShared.UniqueArray();
        };
        return CustomRenderController;
      })();

      var updateLoop = function (renderController) {
        while (renderController.hasNext()) {
          var fiber = renderController.getNextFiber();
          if (fiber) {
            var nextFiber = renderController.performToNextFiber(fiber);
            renderController.setYieldFiber(nextFiber);
          }
        }
      };
      var updateLoopWithConcurrent = function (renderController) {
        while (renderController.hasNext() && !renderController.shouldYield()) {
          var fiber = renderController.getNextFiber();
          if (fiber) {
            var nextFiber = renderController.performToNextFiber(fiber);
            renderController.setYieldFiber(nextFiber);
          }
        }
      };

      var globalLoop$2 = react.__my_react_internal__.globalLoop;
      var reconcileUpdate = function (renderDispatch, renderScope, _renderPlatform) {
        var allPendingList = renderScope.pendingCommitFiberListArray.slice(0);
        allPendingList.forEach(function (l) {
          return renderDispatch.reconcileUpdate(l);
        });
        renderScope.pendingCommitFiberListArray = [];
      };
      var updateAll = function (renderController, renderDispatch, renderScope, renderPlatform) {
        globalLoop$2.current = true;
        safeCall(function () {
          return updateLoop(renderController);
        });
        reconcileUpdate(renderDispatch, renderScope);
        globalLoop$2.current = false;
      };
      var updateAllWithConcurrent = function (renderController, renderDispatch, renderScope, renderPlatform) {
        globalLoop$2.current = true;
        safeCall(function () {
          return updateLoopWithConcurrent(renderController);
        });
        var hasUpdate = !!renderScope.pendingCommitFiberListArray.length;
        if (renderController.hasNext()) {
          if (hasUpdate && renderController.hasUiUpdate) {
            renderPlatform.yieldTask(function () {
              return updateAllWithConcurrent(renderController, renderDispatch, renderScope, renderPlatform);
            });
          } else {
            renderPlatform.microTask(function () {
              return updateAllWithConcurrent(renderController, renderDispatch, renderScope, renderPlatform);
            });
          }
        } else {
          globalLoop$2.current = false;
        }
        renderController.hasUiUpdate = false;
        hasUpdate && reconcileUpdate(renderDispatch, renderScope);
      };

      var globalLoop$1 = react.__my_react_internal__.globalLoop;
      var enableConcurrentMode = react.__my_react_shared__.enableConcurrentMode;
      var updateEntry = function (renderController, renderDispatch, renderScope, renderPlatform) {
        if (enableConcurrentMode.current) {
          updateAllWithConcurrent(renderController, renderDispatch, renderScope, renderPlatform);
        } else {
          updateAll(renderController, renderDispatch, renderScope);
        }
      };
      var triggerError = function (fiber, error) {
        var renderScope = fiber.root.renderScope;
        var renderController = fiber.root.renderController;
        var renderDispatch = fiber.root.renderDispatch;
        var renderPlatform = fiber.root.renderPlatform;
        var errorBoundariesFiber = renderDispatch.resolveErrorBoundaries(fiber);
        if (errorBoundariesFiber) {
          errorBoundariesFiber._triggerUpdate();
          // clear current scope
          renderController.reset();
          renderController.setTopLevelFiber(errorBoundariesFiber);
          var nextFiber = renderController.performToNextFiberOnError(errorBoundariesFiber, error, fiber);
          renderController.setYieldFiber(nextFiber);
          updateAllWithConcurrent(renderController, renderDispatch, renderScope, renderPlatform);
        } else {
          renderController.reset();
          renderScope.isAppCrashed = true;
        }
      };
      var triggerUpdate = function (fiber) {
        var renderScope = fiber.root.renderScope;
        var renderController = fiber.root.renderController;
        var renderDispatch = fiber.root.renderDispatch;
        var renderPlatform = fiber.root.renderPlatform;
        if (renderScope.isAppCrashed) return;
        if (renderScope.isPending) {
          console.log("pending, can not update component");
          renderPlatform.macroTask(function () {
            return triggerUpdate(fiber);
          });
          return;
        }
        {
          renderScope.__globalLoop__ = globalLoop$1;
        }
        fiber._triggerUpdate();
        var beforeLength = renderScope.pendingProcessFiberArray.length;
        renderScope.pendingProcessFiberArray.uniPush(fiber);
        var afterLength = renderScope.pendingProcessFiberArray.length;
        if (beforeLength === afterLength) return;
        if (globalLoop$1.current) return;
        renderPlatform.microTask(function () {
          return updateEntry(renderController, renderDispatch, renderScope, renderPlatform);
        });
      };

      var MyWeakMap = typeof WeakMap !== "undefined" ? WeakMap : Map;
      var CustomRenderDispatch = /** @class */ (function () {
        function CustomRenderDispatch(renderPlatform) {
          this.suspenseMap = new MyWeakMap();
          this.strictMap = new MyWeakMap();
          this.scopeMap = new MyWeakMap();
          this.errorBoundariesMap = new MyWeakMap();
          this.effectMap = new MyWeakMap();
          this.layoutEffectMap = new MyWeakMap();
          this.contextMap = new MyWeakMap();
          this.unmountMap = new MyWeakMap();
          this.eventMap = new MyWeakMap();
          this.renderPlatform = renderPlatform;
        }
        CustomRenderDispatch.prototype.resolveLazyElement = function (_fiber) {
          return defaultResolveLazyElement(_fiber);
        };
        CustomRenderDispatch.prototype.resolveLazyElementAsync = function (_fiber) {
          return defaultResolveLazyElementAsync(_fiber);
        };
        CustomRenderDispatch.prototype.resolveStrictMap = function (_fiber) {
          defaultGenerateStrictMap(_fiber, this.strictMap);
        };
        CustomRenderDispatch.prototype.resolveStrict = function (_fiber) {
          return this.strictMap.get(_fiber) || false;
        };
        CustomRenderDispatch.prototype.resolveScopeMap = function (_fiber) {
          defaultGenerateScopeMap(_fiber, this.scopeMap);
        };
        CustomRenderDispatch.prototype.resolveScope = function (_fiber) {
          return this.scopeMap.get(_fiber) || null;
        };
        CustomRenderDispatch.prototype.resolveSuspenseMap = function (_fiber) {
          defaultGenerateSuspenseMap(_fiber, this.suspenseMap);
        };
        CustomRenderDispatch.prototype.resolveSuspense = function (_fiber) {
          return this.suspenseMap.get(_fiber) || null;
        };
        CustomRenderDispatch.prototype.resolveErrorBoundariesMap = function (_fiber) {
          defaultGenerateErrorBoundariesMap(_fiber, this.errorBoundariesMap);
        };
        CustomRenderDispatch.prototype.resolveErrorBoundaries = function (_fiber) {
          return this.errorBoundariesMap.get(_fiber) || null;
        };
        CustomRenderDispatch.prototype.resolveContextMap = function (_fiber) {
          defaultGenerateContextMap(_fiber, this.contextMap);
        };
        CustomRenderDispatch.prototype.resolveContextFiber = function (_fiber, _contextObject) {
          if (_contextObject) {
            var contextMap = this.contextMap.get(_fiber);
            return (contextMap === null || contextMap === void 0 ? void 0 : contextMap[_contextObject.contextId]) || null;
          } else {
            return null;
          }
        };
        CustomRenderDispatch.prototype.resolveContextValue = function (_fiber, _contextObject) {
          return defaultGetContextValue(_fiber, _contextObject);
        };
        CustomRenderDispatch.prototype.reconcileCommit = function (_fiber, _hydrate) {
          var renderPlatform = this.renderPlatform;
          var mountLoop = function (_fiber, _hydrate) {
            var _result = safeCallWithFiber({
              fiber: _fiber,
              action: function () {
                return renderPlatform.create(_fiber, _hydrate);
              },
            });
            safeCallWithFiber({
              fiber: _fiber,
              action: function () {
                return renderPlatform.update(_fiber, _result);
              },
            });
            safeCallWithFiber({
              fiber: _fiber,
              action: function () {
                return renderPlatform.append(_fiber);
              },
            });
            var _final = _hydrate;
            if (_fiber.child) _final = mountLoop(_fiber.child, _result);
            safeCallWithFiber({
              fiber: _fiber,
              action: function () {
                return renderPlatform.setRef(_fiber);
              },
            });
            safeCallWithFiber({
              fiber: _fiber,
              action: function () {
                return layoutEffect(_fiber);
              },
            });
            renderPlatform.macroTask(function () {
              return safeCallWithFiber({
                fiber: _fiber,
                action: function () {
                  return effect(_fiber);
                },
              });
            });
            if (_fiber.sibling) {
              mountLoop(_fiber.sibling, _fiber.node ? _result : _final);
            }
            if (_fiber.node) {
              return _result;
            } else {
              return _final;
            }
          };
          return mountLoop(_fiber, _hydrate);
        };
        CustomRenderDispatch.prototype.reconcileUpdate = function (_list) {
          var renderPlatform = this.renderPlatform;
          _list.listToFoot(function (_fiber) {
            if (_fiber.isMounted) {
              safeCallWithFiber({
                fiber: _fiber,
                action: function () {
                  return renderPlatform.create(_fiber);
                },
              });
              safeCallWithFiber({
                fiber: _fiber,
                action: function () {
                  return renderPlatform.update(_fiber);
                },
              });
              safeCallWithFiber({
                fiber: _fiber,
                action: function () {
                  return unmount(_fiber);
                },
              });
              safeCallWithFiber({
                fiber: _fiber,
                action: function () {
                  return renderPlatform.setRef(_fiber);
                },
              });
              safeCallWithFiber({
                fiber: _fiber,
                action: function () {
                  return context(_fiber);
                },
              });
            }
          });
          _list.listToHead(function (_fiber) {
            if (_fiber.isMounted) {
              safeCallWithFiber({
                fiber: _fiber,
                action: function () {
                  return renderPlatform.position(_fiber);
                },
              });
            }
          });
          _list.listToFoot(function (_fiber) {
            if (_fiber.isMounted) {
              safeCallWithFiber({
                fiber: _fiber,
                action: function () {
                  return renderPlatform.append(_fiber);
                },
              });
            }
          });
          _list.listToFoot(function (_fiber) {
            if (_fiber.isMounted) {
              safeCallWithFiber({
                fiber: _fiber,
                action: function () {
                  return layoutEffect(_fiber);
                },
              });
              renderPlatform.macroTask(function () {
                return safeCallWithFiber({
                  fiber: _fiber,
                  action: function () {
                    return effect(_fiber);
                  },
                });
              });
            }
          });
        };
        CustomRenderDispatch.prototype.pendingCreate = function (_fiber) {
          if (_fiber.type & this.renderPlatform.createType) {
            _fiber.patch |= reactShared.PATCH_TYPE.__pendingCreate__;
          }
        };
        CustomRenderDispatch.prototype.pendingUpdate = function (_fiber) {
          if (_fiber.type & this.renderPlatform.updateType) {
            _fiber.patch |= reactShared.PATCH_TYPE.__pendingUpdate__;
          }
        };
        CustomRenderDispatch.prototype.pendingAppend = function (_fiber) {
          if (_fiber.type & this.renderPlatform.appendType) {
            _fiber.patch |= reactShared.PATCH_TYPE.__pendingAppend__;
          }
        };
        CustomRenderDispatch.prototype.pendingContext = function (_fiber) {
          _fiber.patch |= reactShared.PATCH_TYPE.__pendingContext__;
        };
        CustomRenderDispatch.prototype.pendingPosition = function (_fiber) {
          _fiber.patch |= reactShared.PATCH_TYPE.__pendingPosition__;
        };
        CustomRenderDispatch.prototype.pendingRef = function (_fiber) {
          if (_fiber.ref && _fiber.type & this.renderPlatform.refType) {
            _fiber.patch |= reactShared.PATCH_TYPE.__pendingRef__;
          }
        };
        CustomRenderDispatch.prototype.pendingUnmount = function (_fiber, _pendingUnmount) {
          _fiber.patch |= reactShared.PATCH_TYPE.__pendingUnmount__;
          defaultGenerateUnmountArrayMap(_fiber, _pendingUnmount, this.unmountMap);
        };
        CustomRenderDispatch.prototype.pendingEffect = function (_fiber, _effect) {
          _fiber.patch |= reactShared.PATCH_TYPE.__pendingEffect__;
          defaultGenerateEffectMap(_fiber, _effect, this.effectMap);
        };
        CustomRenderDispatch.prototype.pendingLayoutEffect = function (_fiber, _layoutEffect) {
          _fiber.patch |= reactShared.PATCH_TYPE.__pendingLayoutEffect__;
          defaultGenerateEffectMap(_fiber, _layoutEffect, this.layoutEffectMap);
        };
        CustomRenderDispatch.prototype.triggerUpdate = function (_fiber) {
          triggerUpdate(_fiber);
        };
        CustomRenderDispatch.prototype.triggerError = function (_fiber, _error) {
          triggerError(_fiber, _error);
        };
        CustomRenderDispatch.prototype.resolveHookNode = function (_fiber, _hookParams) {
          return processHookNode(_fiber, _hookParams);
        };
        CustomRenderDispatch.prototype.processClassComponentQueue = function (_fiber) {
          var needUpdate = processClassComponentUpdateQueue(_fiber);
          if (needUpdate) _fiber._update();
        };
        CustomRenderDispatch.prototype.processFunctionComponentQueue = function (_fiber) {
          var needUpdate = processFunctionComponentUpdateQueue(_fiber);
          if (needUpdate) _fiber._update();
        };
        return CustomRenderDispatch;
      })();

      var mountLoop = function (fiber) {
        var queue = [fiber];
        var renderController = fiber.root.renderController;
        while (queue.length) {
          var length_1 = queue.length;
          while (length_1 > 0) {
            var current = queue.shift();
            var nextArray = renderController.performToNextArray(current);
            queue.push.apply(queue, nextArray);
            length_1--;
          }
        }
      };
      var mountLoopAsync = function (fiber) {
        return __awaiter(void 0, void 0, void 0, function () {
          var queue, renderController, length_2, current, nextArray;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                queue = [fiber];
                renderController = fiber.root.renderController;
                _a.label = 1;
              case 1:
                if (!queue.length) return [3 /*break*/, 5];
                length_2 = queue.length;
                _a.label = 2;
              case 2:
                if (!(length_2 > 0)) return [3 /*break*/, 4];
                current = queue.shift();
                return [4 /*yield*/, renderController.performToNextArrayAsync(current)];
              case 3:
                nextArray = _a.sent();
                queue.push.apply(queue, nextArray);
                length_2--;
                return [3 /*break*/, 2];
              case 4:
                return [3 /*break*/, 1];
              case 5:
                return [2 /*return*/];
            }
          });
        });
      };

      var globalLoop = react.__my_react_internal__.globalLoop;
      var reconcileMount = function (fiber, hydrate) {
        var renderDispatch = fiber.root.renderDispatch;
        renderDispatch.reconcileCommit(fiber, hydrate);
      };
      var mountAll = function (fiber, hydrate) {
        globalLoop.current = true;
        safeCall(function () {
          return mountLoop(fiber);
        });
        reconcileMount(fiber, hydrate);
        globalLoop.current = false;
      };
      var mountAllAsync = function (fiber, hydrate) {
        return __awaiter(void 0, void 0, void 0, function () {
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                globalLoop.current = true;
                return [
                  4 /*yield*/,
                  safeCallAsync(function () {
                    return mountLoopAsync(fiber);
                  }),
                ];
              case 1:
                _a.sent();
                reconcileMount(fiber, hydrate);
                globalLoop.current = false;
                return [2 /*return*/];
            }
          });
        });
      };

      exports.CustomRenderController = CustomRenderController;
      exports.CustomRenderDispatch = CustomRenderDispatch;
      exports.MyReactSignal = MyReactSignal;
      exports.MyWeakMap = MyWeakMap;
      exports.WrapperByScope = WrapperByScope;
      exports.checkFiberElement = checkFiberElement;
      exports.checkHook = checkHook;
      exports.checkIsSameType = checkIsSameType;
      exports.classComponentActive = classComponentActive;
      exports.classComponentCatch = classComponentCatch;
      exports.classComponentMount = classComponentMount;
      exports.classComponentUpdate = classComponentUpdate;
      exports.context = context;
      exports.createFiberNode = createFiberNode;
      exports.createHookNode = createHookNode;
      exports.defaultGenerateContextMap = defaultGenerateContextMap;
      exports.defaultGenerateDeactivatedArrayMap = defaultGenerateDeactivatedArrayMap;
      exports.defaultGenerateEffectMap = defaultGenerateEffectMap;
      exports.defaultGenerateErrorBoundariesMap = defaultGenerateErrorBoundariesMap;
      exports.defaultGenerateKeepLiveMap = defaultGenerateKeepLiveMap;
      exports.defaultGenerateScopeMap = defaultGenerateScopeMap;
      exports.defaultGenerateStrictMap = defaultGenerateStrictMap;
      exports.defaultGenerateSuspenseMap = defaultGenerateSuspenseMap;
      exports.defaultGenerateUnmountArrayMap = defaultGenerateUnmountArrayMap;
      exports.defaultGetContextValue = defaultGetContextValue;
      exports.defaultGetKeepLiveFiber = defaultGetKeepLiveFiber;
      exports.defaultResolveLazyElement = defaultResolveLazyElement;
      exports.defaultResolveLazyElementAsync = defaultResolveLazyElementAsync;
      exports.effect = effect;
      exports.effectHookNode = effectHookNode;
      exports.generateFiberToList = generateFiberToList;
      exports.getTypeFromElement = getTypeFromElement;
      exports.initialFiberNode = initialFiberNode;
      exports.isArrayEquals = isArrayEquals;
      exports.isCommentElement = isCommentElement;
      exports.isCommentEndElement = isCommentEndElement;
      exports.isCommentStartElement = isCommentStartElement;
      exports.isErrorBoundariesComponent = isErrorBoundariesComponent;
      exports.layoutEffect = layoutEffect;
      exports.mountAll = mountAll;
      exports.mountAllAsync = mountAllAsync;
      exports.mountLoop = mountLoop;
      exports.mountLoopAsync = mountLoopAsync;
      exports.nextWorkClassComponent = nextWorkClassComponent;
      exports.nextWorkCommon = nextWorkCommon;
      exports.nextWorkComponent = nextWorkComponent;
      exports.nextWorkConsumer = nextWorkConsumer;
      exports.nextWorkForwardRef = nextWorkForwardRef;
      exports.nextWorkFunctionComponent = nextWorkFunctionComponent;
      exports.nextWorkLazy = nextWorkLazy;
      exports.nextWorkLazySync = nextWorkLazySync;
      exports.nextWorkMemo = nextWorkMemo;
      exports.nextWorkNormal = nextWorkNormal;
      exports.nextWorkReactive = nextWorkReactive;
      exports.nextWorkReactiveComponent = nextWorkReactiveComponent;
      exports.performToNextArray = performToNextArray;
      exports.performToNextArrayAsync = performToNextArrayAsync;
      exports.performToNextArrayOnError = performToNextArrayOnError;
      exports.performToNextFiber = performToNextFiber;
      exports.performToNextFiberAsync = performToNextFiberAsync;
      exports.performToNextFiberOnError = performToNextFiberOnError;
      exports.processClassComponentUpdateQueue = processClassComponentUpdateQueue;
      exports.processFunctionComponentUpdateQueue = processFunctionComponentUpdateQueue;
      exports.processHookNode = processHookNode;
      exports.reactiveComponentActive = reactiveComponentActive;
      exports.reactiveComponentMount = reactiveComponentMount;
      exports.reactiveComponentUpdate = reactiveComponentUpdate;
      exports.reactiveInstanceBeforeUnmount = reactiveInstanceBeforeUnmount;
      exports.runtimeNextWork = runtimeNextWork;
      exports.runtimeNextWorkAsync = runtimeNextWorkAsync;
      exports.safeCall = safeCall;
      exports.safeCallAsync = safeCallAsync;
      exports.safeCallWithFiber = safeCallWithFiber;
      exports.transformChildrenFiber = transformChildrenFiber;
      exports.triggerError = triggerError;
      exports.triggerUpdate = triggerUpdate;
      exports.unmount = unmount;
      exports.unmountFiber = unmountFiber;
      exports.unmountFiberNode = unmountFiberNode;
      exports.unmountList = unmountList;
      exports.updateAll = updateAll;
      exports.updateAllWithConcurrent = updateAllWithConcurrent;
      exports.updateFiberNode = updateFiberNode;
      exports.updateHookNode = updateHookNode;
      exports.updateLoop = updateLoop;
      exports.updateLoopWithConcurrent = updateLoopWithConcurrent;
    })(index_development);
    return index_development;
  }

  (function (module) {
    {
      module.exports = requireIndex_development();
    }
  })(myreactReconciler);

  /******************************************************************************
	Copyright (c) Microsoft Corporation.

	Permission to use, copy, modify, and/or distribute this software for any
	purpose with or without fee is hereby granted.

	THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
	REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
	AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
	INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
	LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
	OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
	PERFORMANCE OF THIS SOFTWARE.
	***************************************************************************** */
  /* global Reflect, Promise */

  var extendStatics = function (d, b) {
    extendStatics =
      Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array &&
        function (d, b) {
          d.__proto__ = b;
        }) ||
      function (d, b) {
        for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      };
    return extendStatics(d, b);
  };

  function __extends(d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
  }

  function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  }

  function __generator(thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1), y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!((t = _.trys), (t = t.length > 0 && t[t.length - 1])) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  }

  function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  }

  var asyncUpdateTimeLimit = require$$1.createRef(8);
  var asyncUpdateTimeStep = require$$1.createRef(null);
  // ==== feature ==== //
  var enableControlComponent = require$$1.createRef(true);
  var enableEventSystem = require$$1.createRef(true);
  var enableHighlight = require$$1.createRef(false);

  var setRef = function (_fiber) {
    if (_fiber.patch & myreactSharedExports.PATCH_TYPE.__pendingRef__) {
      if (_fiber.type & myreactReconcilerExports.NODE_TYPE.__isPlainNode__) {
        if (_fiber.node) {
          var ref = _fiber.ref;
          if (typeof ref === "object" && ref !== null) {
            ref.current = _fiber.node;
          } else if (typeof ref === "function") {
            ref(_fiber.node);
          }
        } else {
          throw new Error("plain element do not have a native node");
        }
      }
      if (_fiber.type & myreactReconcilerExports.NODE_TYPE.__isClassComponent__) {
        if (_fiber.instance) {
          var ref = _fiber.ref;
          if (typeof ref === "object" && ref !== null) {
            ref.current = _fiber.instance;
          } else if (typeof ref === "function") {
            ref(_fiber.instance);
          }
        } else {
          throw new Error("class component do not have a instance");
        }
      }
      if (_fiber.patch & myreactSharedExports.PATCH_TYPE.__pendingRef__) _fiber.patch ^= myreactSharedExports.PATCH_TYPE.__pendingRef__;
    }
  };
  var unsetRef = function (_fiber) {
    if (!_fiber.isMounted) return;
    if (_fiber.ref && _fiber.type & (myreactReconcilerExports.NODE_TYPE.__isPlainNode__ | myreactReconcilerExports.NODE_TYPE.__isClassComponent__)) {
      var ref = _fiber.ref;
      if (typeof ref === "object" && ref !== null) {
        ref.current = null;
      } else {
        try {
          // eslint-disable-next-line @typescript-eslint/ban-types
          ref(null);
        } catch (_a) {}
      }
    }
  };

  var memorize = function (fn) {
    var map = {};
    return function () {
      var p = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        p[_i] = arguments[_i];
      }
      var key = p.join(",");
      if (key in map) {
        return map[key];
      }
      map[key] = fn.call.apply(fn, __spreadArray([null], p, false));
      return map[key];
    };
  };
  var kebabCase = memorize(function (s) {
    return s.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
  });

  var generateGetRawAttrKey = function (map) {
    var cache = {};
    var keyMap = {};
    map.split(",").forEach(function (attrName) {
      keyMap[attrName] = 1;
    });
    return function (key) {
      if (key in cache) {
        return cache[key];
      }
      if (keyMap[key]) {
        return key;
      }
      var lowerCaseKey = key.toLowerCase();
      if (keyMap[lowerCaseKey]) {
        cache[key] = lowerCaseKey;
        return lowerCaseKey;
      }
      var kebabCaseKey = kebabCase(key);
      if (keyMap[kebabCaseKey]) {
        cache[key] = kebabCaseKey;
        return kebabCaseKey;
      }
      return false;
    };
  };
  // from vue source
  var getHTMLAttrKey = generateGetRawAttrKey(
    "as,accept,accept-charset,accesskey,action,align,allow,alt,async," +
      "autocapitalize,autocomplete,autofocus,autoplay,background,bgcolor," +
      "border,buffered,capture,challenge,charset,checked,cite,class,code," +
      "codebase,color,cols,colspan,content,contenteditable,contextmenu,controls," +
      "coords,crossorigin,csp,data,datetime,decoding,default,defer,dir,dirname," +
      "disabled,download,draggable,dropzone,enctype,enterkeyhint,for,form," +
      "formaction,formenctype,formmethod,formnovalidate,formtarget,headers," +
      "height,hidden,high,href,hreflang,http-equiv,icon,id,importance,integrity," +
      "ismap,itemprop,keytype,kind,label,lang,language,loading,list,loop,low," +
      "manifest,max,maxlength,minlength,media,min,multiple,muted,name,novalidate," +
      "open,optimum,pattern,ping,placeholder,poster,preload,radiogroup,readonly," +
      "referrerpolicy,rel,required,reversed,rows,rowspan,sandbox,scope,scoped," +
      "selected,shape,size,sizes,slot,span,spellcheck,src,srcdoc,srclang,srcset," +
      "start,step,style,summary,tabindex,target,title,translate,type,usemap," +
      "value,width,wrap",
  );
  var getSVGAttrKey = generateGetRawAttrKey(
    "xmlns,accent-height,accumulate,additive,alignment-baseline,alphabetic,amplitude," +
      "arabic-form,ascent,attributeName,attributeType,azimuth,baseFrequency," +
      "baseline-shift,baseProfile,bbox,begin,bias,by,calcMode,cap-height,class," +
      "clip,clipPathUnits,clip-path,clip-rule,color,color-interpolation," +
      "color-interpolation-filters,color-profile,color-rendering," +
      "contentScriptType,contentStyleType,crossorigin,cursor,cx,cy,d,decelerate," +
      "descent,diffuseConstant,direction,display,divisor,dominant-baseline,dur,dx," +
      "dy,edgeMode,elevation,enable-background,end,exponent,fill,fill-opacity," +
      "fill-rule,filter,filterRes,filterUnits,flood-color,flood-opacity," +
      "font-family,font-size,font-size-adjust,font-stretch,font-style," +
      "font-variant,font-weight,format,from,fr,fx,fy,g1,g2,glyph-name," +
      "glyph-orientation-horizontal,glyph-orientation-vertical,glyphRef," +
      "gradientTransform,gradientUnits,hanging,height,href,hreflang,horiz-adv-x," +
      "horiz-origin-x,id,ideographic,image-rendering,in,in2,intercept,k,k1,k2,k3," +
      "k4,kernelMatrix,kernelUnitLength,kerning,keyPoints,keySplines,keyTimes," +
      "lang,lengthAdjust,letter-spacing,lighting-color,limitingConeAngle,local," +
      "marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth," +
      "mask,maskContentUnits,maskUnits,mathematical,max,media,method,min,mode," +
      "name,numOctaves,offset,opacity,operator,order,orient,orientation,origin," +
      "overflow,overline-position,overline-thickness,panose-1,paint-order,path," +
      "pathLength,patternContentUnits,patternTransform,patternUnits,ping," +
      "pointer-events,points,pointsAtX,pointsAtY,pointsAtZ,preserveAlpha," +
      "preserveAspectRatio,primitiveUnits,r,radius,referrerPolicy,refX,refY,rel," +
      "rendering-intent,repeatCount,repeatDur,requiredExtensions,requiredFeatures," +
      "restart,result,rotate,rx,ry,scale,seed,shape-rendering,slope,spacing," +
      "specularConstant,specularExponent,speed,spreadMethod,startOffset," +
      "stdDeviation,stemh,stemv,stitchTiles,stop-color,stop-opacity," +
      "strikethrough-position,strikethrough-thickness,string,stroke," +
      "stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin," +
      "stroke-miterlimit,stroke-opacity,stroke-width,style,surfaceScale," +
      "systemLanguage,tabindex,tableValues,target,targetX,targetY,text-anchor," +
      "text-decoration,text-rendering,textLength,to,transform,transform-origin," +
      "type,u1,u2,underline-position,underline-thickness,unicode,unicode-bidi," +
      "unicode-range,units-per-em,v-alphabetic,v-hanging,v-ideographic," +
      "v-mathematical,values,vector-effect,version,vert-adv-y,vert-origin-x," +
      "vert-origin-y,viewBox,viewTarget,visibility,width,widths,word-spacing," +
      "writing-mode,x,x-height,x1,x2,xChannelSelector,xlink:actuate,xlink:arcrole," +
      "xlink:href,xlink:role,xlink:show,xlink:title,xlink:type,xml:base,xml:lang," +
      "xml:space,y,y1,y2,yChannelSelector,z,zoomAndPan",
  );

  var isInternal = function (key) {
    return key.startsWith("_");
  };
  var isChildren = function (key) {
    return key === "children" || key === "dangerouslySetInnerHTML";
  };
  var isEvent = function (key) {
    return key.startsWith("on");
  };
  var isStyle = function (key) {
    return key === "style";
  };
  var isProperty = function (key) {
    return !isChildren(key) && !isEvent(key) && !isStyle(key) && !isInternal(key);
  };
  var isNew = function (oldProps, newProps) {
    return function (key) {
      return oldProps[key] !== newProps[key];
    };
  };
  var isGone = function (newProps) {
    return function (key) {
      return !(key in newProps);
    };
  };

  var currentRunningFiber = require$$1.__my_react_internal__.currentRunningFiber;
  var debugWithDOM = function (fiber) {
    if (fiber.node) {
      var debugDOM = fiber.node;
      debugDOM["__fiber__"] = fiber;
      debugDOM["__element__"] = fiber.element;
      debugDOM["__children__"] = fiber.children;
    }
  };
  var getTrackDevLog = function (fiber) {
    {
      var element = fiber.element;
      var source = typeof element === "object" ? (element === null || element === void 0 ? void 0 : element["_source"]) : null;
      var owner = typeof element === "object" ? (element === null || element === void 0 ? void 0 : element["_owner"]) : null;
      var preString = "";
      if (source) {
        var _a = source || {},
          fileName = _a.fileName,
          lineNumber = _a.lineNumber;
        preString = "".concat(preString, " (").concat(fileName, ":").concat(lineNumber, ")");
      }
      if (owner) {
        var ownerElement = owner;
        var ownerElementType = ownerElement.elementType;
        if (typeof ownerElementType === "function") {
          var typedOwnerElementType = ownerElementType;
          var name_1 = typedOwnerElementType.name || typedOwnerElementType.displayName;
          preString = "".concat(preString, " (render dy ").concat(name_1, ")");
        }
      }
      return preString;
    }
  };
  var getElementName = function (fiber) {
    var _a;
    if (fiber.type & myreactReconcilerExports.NODE_TYPE.__isMemo__) {
      var typedElementType = fiber.elementType;
      var targetRender = typedElementType === null || typedElementType === void 0 ? void 0 : typedElementType.render;
      if (typeof targetRender === "function") {
        if (targetRender === null || targetRender === void 0 ? void 0 : targetRender.name) return "<Memo - (".concat(targetRender.name, ") />");
        if (targetRender === null || targetRender === void 0 ? void 0 : targetRender.displayName) return "<Memo -(".concat(targetRender.displayName, ") />");
      }
      if (typeof targetRender === "object") {
        var typedTargetRender = targetRender;
        if (typedTargetRender === null || typedTargetRender === void 0 ? void 0 : typedTargetRender.name)
          return "<Memo - (".concat(typedTargetRender.name, ") />");
      }
      return "<Memo />";
    }
    if (fiber.type & myreactReconcilerExports.NODE_TYPE.__isLazy__) {
      var typedElementType = fiber.elementType;
      var typedRender = typedElementType === null || typedElementType === void 0 ? void 0 : typedElementType.render;
      if (typedRender === null || typedRender === void 0 ? void 0 : typedRender.name) return "<Lazy - (".concat(typedRender.name, ") />");
      if (typedRender === null || typedRender === void 0 ? void 0 : typedRender.displayName) return "<Lazy -(".concat(typedRender.displayName, ") />");
      return "<Lazy />";
    }
    if (fiber.type & myreactReconcilerExports.NODE_TYPE.__isReactive__) {
      var typedElementType = fiber.elementType;
      if (typedElementType === null || typedElementType === void 0 ? void 0 : typedElementType.name)
        return "<Reactive* - (".concat(typedElementType.name, ") />");
      return "<Reactive* />";
    }
    if (fiber.type & myreactReconcilerExports.NODE_TYPE.__isPortal__) return "<Portal />";
    if (fiber.type & myreactReconcilerExports.NODE_TYPE.__isNullNode__) return "<Null />";
    if (fiber.type & myreactReconcilerExports.NODE_TYPE.__isEmptyNode__) return "<Empty />";
    if (fiber.type & myreactReconcilerExports.NODE_TYPE.__isScopeNode__) return "<Scope />";
    if (fiber.type & myreactReconcilerExports.NODE_TYPE.__isStrictNode__) return "<Strict />";
    if (fiber.type & myreactReconcilerExports.NODE_TYPE.__isSuspenseNode__) return "<Suspense />";
    if (fiber.type & myreactReconcilerExports.NODE_TYPE.__isFragmentNode__) return "<Fragment />";
    if (fiber.type & myreactReconcilerExports.NODE_TYPE.__isKeepLiveNode__) return "<KeepAlive />";
    if (fiber.type & myreactReconcilerExports.NODE_TYPE.__isContextProvider__) return "<Provider />";
    if (fiber.type & myreactReconcilerExports.NODE_TYPE.__isContextConsumer__) return "<Consumer />";
    if (fiber.type & myreactReconcilerExports.NODE_TYPE.__isCommentNode__) return "<Comment />";
    if (fiber.type & myreactReconcilerExports.NODE_TYPE.__isForwardRef__) {
      var typedElementType = fiber.elementType;
      if (typedElementType.render.name) return "<ForwardRef - (".concat(typedElementType.render.name, ") />");
      if (typedElementType.render.displayName) return "<ForwardRef -(".concat(typedElementType.render.displayName, ") />");
      return "<ForwardRef />";
    }
    if (typeof fiber.elementType === "string") return "<".concat(fiber.elementType, " />");
    if (typeof fiber.elementType === "function") {
      var typedElementType = fiber.elementType;
      var name_2 = typedElementType.displayName || typedElementType.name || "anonymous";
      name_2 = fiber.root === fiber ? "".concat(name_2, " (root)") : name_2;
      return "<".concat(name_2, "* />");
    }
    if (typeof fiber.element === "object" && fiber.element !== null) {
      return "<unknown* />";
    } else {
      return "<text (".concat((_a = fiber.element) === null || _a === void 0 ? void 0 : _a.toString(), ") />");
    }
  };
  var getFiberNodeName = function (fiber) {
    return "".concat(getElementName(fiber)).concat(getTrackDevLog(fiber));
  };
  var getFiberTree = function (fiber) {
    {
      if (fiber) {
        var preString = "".padEnd(4) + "at".padEnd(4);
        var parent_1 = fiber.parent;
        var res = "".concat(preString).concat(getFiberNodeName(fiber));
        while (parent_1) {
          res += "\n".concat(preString).concat(getFiberNodeName(parent_1));
          parent_1 = parent_1.parent;
        }
        return "\n".concat(res);
      }
      return "";
    }
  };
  var getHookTree = function (hookNodes, currentIndex, newHookType) {
    var _a, _b;
    var re = "\n" + "".padEnd(6) + "Prev render:".padEnd(20) + "Next render:".padEnd(10) + "\n";
    for (var index = 0; index <= currentIndex; index++) {
      if (index < currentIndex) {
        var currentType = ((_a = hookNodes[index]) === null || _a === void 0 ? void 0 : _a.hookType) || "undefined";
        re += (index + 1).toString().padEnd(6) + currentType.padEnd(20) + currentType.padEnd(10) + "\n";
      } else {
        var currentType = ((_b = hookNodes[index]) === null || _b === void 0 ? void 0 : _b.hookType) || "undefined";
        re += (index + 1).toString().padEnd(6) + currentType.padEnd(20) + newHookType.padEnd(10) + "\n";
      }
    }
    re += "".padEnd(6) + "^".repeat(30) + "\n";
    return re;
  };
  var cache = {};
  var log = function (_a) {
    var fiber = _a.fiber,
      message = _a.message,
      _b = _a.level,
      level = _b === void 0 ? "warn" : _b,
      _c = _a.triggerOnce,
      triggerOnce = _c === void 0 ? false : _c;
    {
      var tree_1 = getFiberTree(fiber || currentRunningFiber.current);
      if (triggerOnce) {
        var messageKey = message.toString();
        cache[messageKey] = cache[messageKey] || {};
        if (cache[messageKey][tree_1]) return;
        cache[messageKey][tree_1] = true;
      }
      if (level === "warn") {
        console.warn(
          "[".concat(level, "]:"),
          "\n-----------------------------------------\n",
          "".concat(typeof message === "string" ? message : message.stack || message.message),
          "\n-----------------------------------------\n",
          "Render Tree:",
          tree_1,
        );
        return;
      }
      if (level === "error") {
        console.error(
          "[".concat(level, "]:"),
          "\n-----------------------------------------\n",
          "".concat(typeof message === "string" ? message : message.stack || message.message),
          "\n-----------------------------------------\n",
          "Render Tree:",
          tree_1,
        );
      }
      return;
    }
    if (triggerOnce) {
      var messageKey = message.toString();
    }
  };

  var DomScope = /** @class */ (function () {
    function DomScope(fiber, container) {
      this.yieldFiber = null;
      this.isAppMounted = false;
      this.isAppCrashed = false;
      this.isPending = false;
      this.modifyFiberRoot = null;
      this.pendingProcessFiberArray = new myreactSharedExports.UniqueArray();
      this.pendingCommitFiberListArray = [];
      this.pendingCommitFiberList = null;
      this.isServerRender = false;
      this.isHydrateRender = false;
      this.rootFiber = fiber;
      this.rootContainer = container;
    }
    return DomScope;
  })();

  var createPortal = function (element, container) {
    var _a;
    return require$$1.createElement(((_a = {}), (_a[myreactSharedExports.TYPEKEY] = myreactSharedExports.Portal), _a), { container: container }, element);
  };

  var enableStrictLifeCycle = require$$1.__my_react_shared__.enableStrictLifeCycle,
    enableLegacyLifeCycle = require$$1.__my_react_shared__.enableLegacyLifeCycle;
  var startRender = function (fiber, hydrate) {
    if (hydrate === void 0) {
      hydrate = false;
    }
    var startTime = Date.now();
    myreactReconcilerExports.mountAll(fiber, hydrate);
    if (enableStrictLifeCycle.current) {
      console.warn("react-18 like lifecycle have been enabled!");
    }
    if (enableLegacyLifeCycle.current) {
      console.warn("legacy lifeCycle have been enabled!");
    }
    var endTime = Date.now();
    var renderScope = fiber.root.renderScope;
    renderScope.isAppMounted = true;
    if (hydrate) {
      renderScope.hydrateTime = endTime - startTime;
    } else {
      renderScope.renderTime = endTime - startTime;
    }
  };
  var startRenderAsync = function (fiber, hydrate) {
    if (hydrate === void 0) {
      hydrate = false;
    }
    return __awaiter(void 0, void 0, void 0, function () {
      var startTime, endTime, renderScope;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            startTime = Date.now();
            return [4 /*yield*/, myreactReconcilerExports.mountAllAsync(fiber, hydrate)];
          case 1:
            _a.sent();
            if (enableStrictLifeCycle.current) {
              console.warn("react-18 like lifecycle have been enabled!");
            }
            if (enableLegacyLifeCycle.current) {
              console.warn("legacy lifeCycle have been enabled!");
            }
            endTime = Date.now();
            renderScope = fiber.root.renderScope;
            renderScope.isAppMounted = true;
            if (hydrate) {
              renderScope.hydrateTime = endTime - startTime;
            } else {
              renderScope.renderTime = endTime - startTime;
            }
            return [2 /*return*/];
        }
      });
    });
  };

  var commentS = " [ ";
  var commentE = " ] ";

  var MyReactComponent = require$$1.__my_react_internal__.MyReactComponent;
  var findDOMFromFiber = function (fiber) {
    var currentArray = [fiber];
    while (currentArray.length) {
      var next = currentArray.shift();
      if (next === null || next === void 0 ? void 0 : next.node) return next.node;
      currentArray.push.apply(currentArray, (next === null || next === void 0 ? void 0 : next.children) || []);
    }
    return null;
  };
  var findDOMFromComponentFiber = function (fiber) {
    if (fiber) {
      if (fiber.node) return fiber.node;
      for (var i = 0; i < fiber.children.length; i++) {
        var dom = findDOMFromFiber(fiber.children[i]);
        if (dom) return dom;
      }
    }
    return null;
  };
  var findDOMNode = function (instance) {
    if (instance instanceof MyReactComponent && instance._ownerFiber) {
      return findDOMFromComponentFiber(instance._ownerFiber);
    } else {
      return null;
    }
  };

  var MyReactFiberNodeClass$1 = require$$1.__my_react_internal__.MyReactFiberNode;
  var unmountComponentAtNode = function (container) {
    var fiber = container.__fiber__;
    if (fiber instanceof MyReactFiberNodeClass$1) {
      myreactReconcilerExports.unmountFiber(fiber);
    }
  };

  var shouldPauseAsyncUpdate = function () {
    if (!asyncUpdateTimeStep.current) {
      asyncUpdateTimeStep.current = Date.now();
      return false;
    } else {
      var now = Date.now();
      var result = now - asyncUpdateTimeStep.current > asyncUpdateTimeLimit.current;
      if (result) asyncUpdateTimeStep.current = now;
      return result;
    }
  };

  var IS_UNIT_LESS_NUMBER = {
    animationIterationCount: true,
    borderImageOutset: true,
    borderImageSlice: true,
    borderImageWidth: true,
    boxFlex: true,
    boxFlexGroup: true,
    boxOrdinalGroup: true,
    columnCount: true,
    columns: true,
    flex: true,
    flexGrow: true,
    flexPositive: true,
    flexShrink: true,
    flexNegative: true,
    flexOrder: true,
    gridArea: true,
    gridRow: true,
    gridRowEnd: true,
    gridRowSpan: true,
    gridRowStart: true,
    gridColumn: true,
    gridColumnEnd: true,
    gridColumnSpan: true,
    gridColumnStart: true,
    fontWeight: true,
    lineClamp: true,
    lineHeight: true,
    opacity: true,
    order: true,
    orphans: true,
    tabSize: true,
    widows: true,
    zIndex: true,
    zoom: true,
    // SVG-related properties
    fillOpacity: true,
    floodOpacity: true,
    stopOpacity: true,
    strokeDasharray: true,
    strokeDashoffset: true,
    strokeMiterlimit: true,
    strokeOpacity: true,
    strokeWidth: true,
  };

  var IS_SINGLE_ELEMENT = {
    br: true,
    hr: true,
    img: true,
    input: true,
    param: true,
    meta: true,
    link: true,
  };

  var getFiberWithNativeDom = function (fiber, transform) {
    if (fiber) {
      if (fiber.node) return fiber;
      return getFiberWithNativeDom(transform(fiber), transform);
    }
    return null;
  };

  var getNativeEventName = function (eventName, tagName, props) {
    var isCapture = false;
    var nativeName = eventName;
    if (eventName.endsWith("Capture")) {
      isCapture = true;
      nativeName = eventName.split("Capture")[0];
    }
    if (nativeName === "DoubleClick") {
      nativeName = "dblclick";
    } else if (nativeName === "Change") {
      if (tagName === "input") {
        if (props.type === "radio" || props.type === "checkbox") {
          nativeName = "click";
        } else {
          nativeName = "input";
        }
      } else {
        nativeName = "change";
      }
    } else {
      nativeName = nativeName.toLowerCase();
    }
    return { nativeName: nativeName, isCapture: isCapture };
  };

  var controlElementTag = {
    input: true,
    // textarea: true,
    // select: true,
  };
  var addEventListener = function (fiber, dom, key) {
    var _a;
    var renderDispatch = fiber.root.renderDispatch;
    var typedElementType = fiber.elementType;
    var pendingProps = fiber.pendingProps;
    var callback = pendingProps[key];
    var _b = getNativeEventName(key.slice(2), typedElementType, pendingProps),
      nativeName = _b.nativeName,
      isCapture = _b.isCapture;
    if (enableEventSystem.current) {
      var eventMap = renderDispatch.eventMap;
      var eventState = eventMap.get(fiber) || {};
      var eventName = "".concat(nativeName, "_").concat(isCapture);
      if (eventState[eventName]) {
        (_a = eventState[eventName].cb) === null || _a === void 0 ? void 0 : _a.push(callback);
      } else {
        var handler_1 = function () {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          var e = args[0];
          e.nativeEvent = e;
          myreactReconcilerExports.safeCallWithFiber({
            action: function () {
              var _a;
              return (_a = handler_1.cb) === null || _a === void 0
                ? void 0
                : _a.forEach(function (cb) {
                    return typeof cb === "function" && cb.call.apply(cb, __spreadArray([null], args, false));
                  });
            },
            fiber: fiber,
          });
          if (enableControlComponent.current) {
            requestAnimationFrame(function () {
              var pendingProps = fiber.pendingProps;
              if (controlElementTag[typedElementType] && typeof pendingProps["value"] !== "undefined") {
                var typedDom = dom;
                typedDom["value"] = pendingProps["value"];
                if (typedDom.__isControlled__) {
                  typedDom.setAttribute("my_react_controlled_value", String(pendingProps["value"]));
                }
                if (typedDom.__isReadonly__) {
                  typedDom.setAttribute("my_react_readonly_value", String(pendingProps["value"]));
                }
              }
            });
          }
        };
        if (enableControlComponent.current) {
          if (controlElementTag[typedElementType]) {
            if ("value" in pendingProps) {
              var typedDom = dom;
              if ("onChange" in pendingProps) {
                typedDom.__isControlled__ = true;
                typedDom.setAttribute("my_react_input", "controlled");
              } else {
                typedDom.__isReadonly__ = true;
                typedDom.setAttribute("my_react_input", "readonly");
              }
            }
          }
        }
        handler_1.cb = [callback];
        eventState[eventName] = handler_1;
        dom.addEventListener(nativeName, handler_1, isCapture);
      }
      eventMap.set(fiber, eventState);
      {
        var typedFiber = fiber;
        typedFiber._debugEventMap = eventState;
      }
    } else {
      dom.addEventListener(nativeName, callback, isCapture);
    }
  };

  var removeEventListener = function (fiber, dom, key) {
    var _a;
    var renderDispatch = fiber.root.renderDispatch;
    var typedElementType = fiber.elementType;
    var currentProps = fiber.memoizedProps || {};
    var callback = currentProps[key];
    var _b = getNativeEventName(key.slice(2), typedElementType, currentProps),
      nativeName = _b.nativeName,
      isCapture = _b.isCapture;
    if (enableEventSystem.current) {
      var eventMap = renderDispatch.eventMap;
      var eventState = eventMap.get(fiber);
      var eventName = "".concat(nativeName, "_").concat(isCapture);
      if (!eventState[eventName]) return;
      eventState[eventName].cb =
        (_a = eventState[eventName].cb) === null || _a === void 0
          ? void 0
          : _a.filter(function (c) {
              return c !== callback || typeof c !== "function";
            });
    } else {
      dom.removeEventListener(nativeName, callback, isCapture);
    }
  };

  var append$2 = function (fiber, parentFiberWithDom) {
    if (fiber.patch & myreactSharedExports.PATCH_TYPE.__pendingAppend__) {
      var renderPlatform = fiber.root.renderPlatform;
      // will never happen
      if (!parentFiberWithDom.isMounted) {
        parentFiberWithDom = getFiberWithNativeDom(fiber.parent, function (f) {
          return f.parent;
        });
        var elementObj = renderPlatform.elementMap.get(fiber);
        elementObj.parentFiberWithNode = parentFiberWithDom;
        renderPlatform.elementMap.set(fiber, elementObj);
      }
      if (!fiber.node || !parentFiberWithDom.node) throw new Error("append error, dom not exist");
      var parentDom = parentFiberWithDom.node;
      var currentDom = fiber.node;
      if (!Object.prototype.hasOwnProperty.call(IS_SINGLE_ELEMENT, parentDom.tagName.toLowerCase())) {
        parentDom.appendChild(currentDom);
      }
      if (fiber.patch & myreactSharedExports.PATCH_TYPE.__pendingAppend__) fiber.patch ^= myreactSharedExports.PATCH_TYPE.__pendingAppend__;
    }
  };

  // import { isCommentStartElement } from "@my-react/react-reconciler";
  var getNextHydrateDom = function (parentDom) {
    var children = Array.from(parentDom.childNodes);
    return children.find(function (dom) {
      var typedDom = dom;
      // skip hydrated
      if (typedDom.__hydrate__) return false;
      if (dom.nodeType === Node.COMMENT_NODE) {
        // skip empty comment
        if (dom.textContent === " " || dom.textContent === "") return false;
        // scope comment
        if (dom.textContent === commentS || dom.textContent === commentE) return true;
      }
      return true;
    });
  };
  // const getNextHydrateScope = (parentDom: Element) => {
  //   const children = Array.from(parentDom.childNodes);
  //   let start: DomComment | null = null;
  //   let index = 0;
  //   let end: DomComment | null = null;
  //   for (let i = 0; i < children.length; i++) {
  //     const typedDom = children[i] as HydrateDOM;
  //     if (!typedDom.__hydrate__) {
  //       if (typedDom.nodeType === Node.COMMENT_NODE) {
  //         if (typedDom.textContent === commentS) {
  //           start = start || (typedDom as unknown as DomComment);
  //           index++;
  //         }
  //         if (typedDom.textContent === commentE) {
  //           index--;
  //           if (index === 0) {
  //             end = typedDom as unknown as DomComment;
  //           }
  //         }
  //       } else {
  //         // there are some not match error, just break.
  //         if (!start) break;
  //       }
  //     }
  //     if (start && end) break;
  //   }
  //   return { start, end };
  // };
  // const generateHydrateScope = (fiber: MyReactFiberNode, scope: ReturnType<typeof getNextHydrateScope>) => {
  //   const globalDispatch = fiber.root.renderDispatch as RenderDispatch;
  //   const scopeFiber = globalDispatch.resolveScope(fiber);
  //   // TODO 如果scope不存在，回退到更上层的scope
  //   console.log(scopeFiber, scope);
  // };
  var checkHydrateDom = function (fiber, dom) {
    if (!dom) {
      log({
        fiber: fiber,
        level: "error",
        message: 'hydrate error, dom not render from server, client: "'.concat(getElementName(fiber), '"'),
      });
      return false;
    }
    if (fiber.type & myreactReconcilerExports.NODE_TYPE.__isTextNode__) {
      if (dom.nodeType !== Node.TEXT_NODE) {
        log({
          fiber: fiber,
          level: "error",
          message: 'hydrate error, dom not match from server. server: "<'
            .concat(dom.nodeName.toLowerCase(), ' />", client: "')
            .concat(getElementName(fiber), '"'),
        });
        return false;
      }
      return true;
    }
    if (fiber.type & myreactReconcilerExports.NODE_TYPE.__isPlainNode__) {
      if (dom.nodeType !== Node.ELEMENT_NODE) {
        log({
          fiber: fiber,
          level: "error",
          message: 'hydrate error, dom not match from server. server: "<'
            .concat(dom.nodeName.toLowerCase(), ' />", client: "')
            .concat(getElementName(fiber), '"'),
        });
        return false;
      }
      if (fiber.elementType.toString() !== dom.nodeName.toLowerCase()) {
        log({
          fiber: fiber,
          level: "error",
          message: 'hydrate error, dom not match from server. server: "<'
            .concat(dom.nodeName.toLowerCase(), ' />", client: "')
            .concat(getElementName(fiber), '"'),
        });
        return false;
      }
      return true;
    }
    if (fiber.type & myreactReconcilerExports.NODE_TYPE.__isCommentNode__) {
      if (dom.nodeType !== Node.COMMENT_NODE) {
        log({
          fiber: fiber,
          level: "error",
          message: 'hydrate error, dom not match from server. server: "<'
            .concat(dom.nodeName.toLowerCase(), ' />", client: "')
            .concat(getElementName(fiber), '"'),
        });
        return false;
      }
      return true;
    }
    throw new Error("hydrate error, look like a bug");
  };
  var getHydrateDom = function (fiber, parentDom) {
    if (IS_SINGLE_ELEMENT[parentDom.tagName.toLowerCase()]) return { result: true };
    // if (isCommentStartElement(fiber)) {
    //   const scope = getNextHydrateScope(parentDom);
    //   generateHydrateScope(fiber, scope);
    //   const dom = scope.start;
    //   if (dom) {
    //     fiber.node = dom;
    //     return { dom, result: true };
    //   } else {
    //     return { dom, result: false };
    //   }
    // } else {
    var dom = getNextHydrateDom(parentDom);
    var result = checkHydrateDom(fiber, dom);
    if (result) {
      var typedDom = dom;
      fiber.node = typedDom;
      return { dom: typedDom, result: result };
    } else {
      return { dom: dom, result: result };
    }
    // }
  };

  var hydrateCreate = function (fiber, parentFiberWithDom) {
    if (
      fiber.type &
      (myreactReconcilerExports.NODE_TYPE.__isTextNode__ |
        myreactReconcilerExports.NODE_TYPE.__isPlainNode__ |
        myreactReconcilerExports.NODE_TYPE.__isCommentNode__)
    ) {
      var parentDom = parentFiberWithDom.node;
      var result = getHydrateDom(fiber, parentDom).result;
      return result;
    }
    throw new Error("hydrate error, portal element can not hydrate");
  };

  var SVG = "http://www.w3.org/2000/svg";
  var nativeCreate = function (fiber, isSVG) {
    var _a, _b;
    if (fiber.type & myreactReconcilerExports.NODE_TYPE.__isTextNode__) {
      fiber.node = document.createTextNode(fiber.element);
    } else if (fiber.type & myreactReconcilerExports.NODE_TYPE.__isPlainNode__) {
      var typedElementType = fiber.elementType;
      if (isSVG) {
        fiber.node = document.createElementNS(SVG, typedElementType);
      } else {
        fiber.node = document.createElement(typedElementType);
      }
    } else if (fiber.type & myreactReconcilerExports.NODE_TYPE.__isPortal__) {
      fiber.node = fiber.pendingProps["container"];
      {
        (_b = (_a = fiber.node).setAttribute) === null || _b === void 0 ? void 0 : _b.call(_a, "portal", "MyReact");
      }
    } else if (fiber.type & myreactReconcilerExports.NODE_TYPE.__isCommentNode__) {
      if (myreactReconcilerExports.isCommentStartElement(fiber)) {
        fiber.node = document.createComment(commentS);
      } else {
        fiber.node = document.createComment(commentE);
      }
    }
  };

  // for invalid dom structure
  // TODO
  var validDomNesting = function (fiber) {
    if (fiber.type & myreactReconcilerExports.NODE_TYPE.__isPlainNode__) {
      var typedElementType = fiber.elementType;
      var renderPlatform = fiber.root.renderPlatform;
      var parentFiberWithDom = renderPlatform.elementMap.get(fiber).parentFiberWithNode;
      if (typedElementType === "p" && parentFiberWithDom.elementType === "p") {
        renderPlatform.log({
          fiber: fiber,
          level: "warn",
          triggerOnce: true,
          message: "invalid dom nesting: <p> cannot appear as a child of <p>",
        });
      }
    }
  };

  var create$1 = function (fiber, hydrate, parentFiberWithDom, isSVG) {
    if (fiber.patch & myreactSharedExports.PATCH_TYPE.__pendingCreate__) {
      var re = false;
      validDomNesting(fiber);
      if (hydrate) {
        var result = hydrateCreate(fiber, parentFiberWithDom);
        if (!result) nativeCreate(fiber, isSVG);
        re = result;
      } else {
        nativeCreate(fiber, isSVG);
      }
      var renderScope = fiber.root.renderScope;
      if (renderScope.isHydrateRender) {
        var element = fiber.node;
        var typedDom = element;
        typedDom.__hydrate__ = true;
        if (fiber.type & myreactReconcilerExports.NODE_TYPE.__isPlainNode__) {
          if (!re) {
            typedDom.setAttribute("debug_hydrate", "fail");
          } else {
            typedDom.setAttribute("debug_hydrate", "success");
          }
        }
      }
      if (fiber.patch & myreactSharedExports.PATCH_TYPE.__pendingCreate__) fiber.patch ^= myreactSharedExports.PATCH_TYPE.__pendingCreate__;
      return re;
    }
    return hydrate;
  };

  var domContentHydrate = function (fiber) {
    var node = fiber.node;
    if (node.textContent !== String(fiber.element)) {
      if (node.textContent === " " && fiber.element === "") {
        node.textContent = "";
      } else {
        log({
          fiber: fiber,
          message: "hydrate warning, text not match from server. server: ".concat(node.textContent, ", client: ").concat(fiber.element),
        });
        node.textContent = fiber.element;
      }
    }
  };
  var domPropsHydrate = function (fiber, isSVG, key, value) {
    var _a;
    var node = fiber.node;
    var dom = node;
    if (value !== null && value !== undefined) {
      if (key === "className") {
        if (isSVG) {
          var v = (_a = dom.getAttribute("class")) === null || _a === void 0 ? void 0 : _a.toString();
          if (v !== String(value)) {
            log({
              fiber: fiber,
              message: "hydrate warning, dom ".concat(key, " not match from server. server: ").concat(v, ", client: ").concat(value),
            });
            dom.setAttribute("class", value);
          }
        } else {
          if (dom[key].toString() !== String(value)) {
            log({
              fiber: fiber,
              message: "hydrate warning, dom ".concat(key, " not match from server. server: ").concat(dom[key], ", client: ").concat(value),
            });
            dom[key] == value;
          }
        }
      } else {
        if (key in dom && !isSVG) {
          if (dom[key].toString() !== String(value)) {
            log({
              fiber: fiber,
              message: "hydrate warning, dom ".concat(key, " props not match from server. server: ").concat(dom[key], ", client: ").concat(value),
            });
            dom[key] = value;
          }
        } else {
          var attrKey = (isSVG ? getSVGAttrKey(key) : getHTMLAttrKey(key)) || key;
          var v = dom.getAttribute(attrKey);
          if ((v === null || v === void 0 ? void 0 : v.toString()) !== String(value)) {
            log({
              fiber: fiber,
              message: "hydrate warning, dom ".concat(attrKey, " attr not match from server. server: ").concat(v, ", client: ").concat(value),
            });
            dom.setAttribute(attrKey, value);
          }
        }
      }
    }
  };
  var domStyleHydrate = function (fiber, key, value) {
    var node = fiber.node;
    Object.keys(value).forEach(function (styleName) {
      if (Object.prototype.hasOwnProperty.call(IS_UNIT_LESS_NUMBER, styleName) && typeof value[styleName] === "number") {
        node[key][styleName] = "".concat(value[styleName], "px");
        return;
      }
      if (value[styleName] !== null && value[styleName] !== undefined) {
        node[key][styleName] = value[styleName];
      }
    });
  };
  var domEventHydrate = function (fiber, key) {
    var node = fiber.node;
    addEventListener(fiber, node, key);
  };
  var hydrateUpdate = function (fiber, isSVG) {
    var node = fiber.node;
    if (node) {
      var props_1 = fiber.pendingProps;
      if (fiber.type & myreactReconcilerExports.NODE_TYPE.__isPlainNode__) {
        Object.keys(props_1).forEach(function (key) {
          if (isEvent(key)) {
            domEventHydrate(fiber, key);
          } else if (isStyle(key)) {
            domStyleHydrate(fiber, key, props_1[key] || {});
          } else if (isProperty(key)) {
            domPropsHydrate(fiber, isSVG, key, props_1[key]);
          }
        });
      }
      if (fiber.type & myreactReconcilerExports.NODE_TYPE.__isTextNode__) {
        domContentHydrate(fiber);
      }
    }
    if (fiber.patch & myreactSharedExports.PATCH_TYPE.__pendingUpdate__) fiber.patch ^= myreactSharedExports.PATCH_TYPE.__pendingUpdate__;
    if (fiber.patch & myreactSharedExports.PATCH_TYPE.__pendingAppend__) fiber.patch ^= myreactSharedExports.PATCH_TYPE.__pendingAppend__;
  };

  var HighLight = /** @class */ (function () {
    function HighLight() {
      var _this = this;
      this.map = [];
      this.container = null;
      this.range = document.createRange();
      this.__pendingUpdate__ = [];
      this.createHighLight = function () {
        var _a;
        var element = document.createElement("div");
        (_a = _this.container) === null || _a === void 0 ? void 0 : _a.append(element);
        return element;
      };
      this.getHighLight = function () {
        if (_this.map.length > 0) {
          return _this.map.shift();
        }
        return _this.createHighLight();
      };
      this.highLight = function (fiber) {
        if (fiber.node) {
          var typedDom = fiber.node;
          if (!typedDom.__pendingHighLight__) {
            typedDom.__pendingHighLight__ = true;
            _this.startHighLight(fiber);
          }
        }
      };
      this.startHighLight = function (fiber) {
        _this.__pendingUpdate__.push(fiber);
        _this.flashPending();
      };
      this.flashPending = function () {
        Promise.resolve().then(function () {
          var allFiber = _this.__pendingUpdate__.slice(0);
          _this.__pendingUpdate__ = [];
          var allWrapper = [];
          allFiber.forEach(function (f) {
            if (f.isMounted) {
              f.type & myreactReconcilerExports.NODE_TYPE.__isTextNode__ ? _this.range.selectNodeContents(f.node) : _this.range.selectNode(f.node);
              var rect = _this.range.getBoundingClientRect();
              if (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth) &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
              ) {
                // in the viewport
                var wrapperDom = _this.getHighLight();
                allWrapper.push(wrapperDom);
                var width = rect.width + 4;
                var height = rect.height + 4;
                var positionLeft = rect.left - 2;
                var positionTop = rect.top - 2;
                wrapperDom.style.cssText = "\n            position: absolute;\n            width: "
                  .concat(width, "px;\n            height: ")
                  .concat(height, "px;\n            left: ")
                  .concat(positionLeft, "px;\n            top: ")
                  .concat(positionTop, "px;\n            pointer-events: none;\n            box-shadow: 1px 1px 1px red, -1px -1px 1px red;\n            ");
              }
            }
          });
          setTimeout(function () {
            allWrapper.forEach(function (wrapperDom) {
              wrapperDom.style.boxShadow = "none";
              _this.map.push(wrapperDom);
            });
            allFiber.forEach(function (f) {
              if (f.isMounted) {
                f.node.__pendingHighLight__ = false;
              }
            });
          }, 100);
        });
      };
      this.container = document.createElement("div");
      this.container.setAttribute("debug_highlight", "MyReact");
      this.container.style.cssText =
        "\n      position: fixed;\n      z-index: 99999999;\n      width: 100%;\n      left: 0;\n      top: 0;\n      pointer-events: none;\n      ";
      document.body.append(this.container);
    }
    /**
     * @type HighLight
     */
    HighLight.instance = undefined;
    /**
     *
     * @returns HighLight
     */
    HighLight.getHighLightInstance = function () {
      HighLight.instance = HighLight.instance || new HighLight();
      return HighLight.instance;
    };
    return HighLight;
  })();

  var XLINK_NS = "http://www.w3.org/1999/xlink";
  var XML_NS = "http://www.w3.org/2000/xmlns/";
  var X_CHAR = 120;

  var nativeUpdate = function (fiber, isSVG) {
    if (!fiber.node) throw new Error("update error, dom not exist");
    var renderScope = fiber.root.renderScope;
    var node = fiber.node;
    if (fiber.type & myreactReconcilerExports.NODE_TYPE.__isTextNode__) {
      node.textContent = fiber.element;
    } else if (fiber.type & myreactReconcilerExports.NODE_TYPE.__isPlainNode__) {
      var dom_1 = node;
      var oldProps_1 = fiber.memoizedProps || {};
      var newProps_1 = fiber.pendingProps || {};
      Object.keys(oldProps_1)
        .filter(function (key) {
          return isGone(newProps_1)(key) || isNew(oldProps_1, newProps_1)(key);
        })
        .forEach(function (key) {
          if (isEvent(key)) {
            removeEventListener(fiber, node, key);
          } else if (isProperty(key)) {
            if (newProps_1[key] === null || newProps_1[key] === undefined) {
              if (key === "className") {
                if (isSVG) {
                  dom_1.removeAttribute("class");
                } else {
                  dom_1[key] = "";
                }
              } else {
                if (key in dom_1 && !isSVG) {
                  dom_1[key] = "";
                } else {
                  var attrKey = (isSVG ? getSVGAttrKey(key) : getHTMLAttrKey(key)) || key;
                  dom_1.removeAttribute(attrKey);
                }
              }
            }
          } else if (isStyle(key)) {
            Object.keys(oldProps_1[key] || {})
              .filter(isGone(newProps_1[key] || {}))
              .forEach(function (styleName) {
                dom_1.style[styleName] = "";
              });
          }
        });
      Object.keys(newProps_1)
        .filter(isNew(oldProps_1, newProps_1))
        .filter(function (key) {
          if (isEvent(key)) {
            addEventListener(fiber, node, key);
          } else if (isProperty(key)) {
            // from million package
            if (key.charCodeAt(0) === X_CHAR && isSVG) {
              var typedDom = node;
              if (key.startsWith("xmlns")) {
                typedDom.setAttributeNS(XML_NS, key, String(newProps_1[key]));
              } else if (key.startsWith("xlink")) {
                typedDom.setAttributeNS(XLINK_NS, "href", String(newProps_1[key]));
              }
              return;
            }
            if (newProps_1[key] !== null && newProps_1[key] !== undefined) {
              if (key === "className") {
                if (isSVG) {
                  dom_1.setAttribute("class", newProps_1[key] || "");
                } else {
                  dom_1[key] = newProps_1[key] || "";
                }
              } else {
                if (key in dom_1 && !isSVG) {
                  dom_1[key] = newProps_1[key];
                } else {
                  var attrKey = (isSVG ? getSVGAttrKey(key) : getHTMLAttrKey(key)) || key;
                  dom_1.setAttribute(attrKey, String(newProps_1[key]));
                }
              }
              if ((key === "autofocus" || key === "autoFocus") && newProps_1[key]) {
                Promise.resolve().then(function () {
                  return dom_1.focus();
                });
              }
            }
          } else if (isStyle(key)) {
            var typedNewProps_1 = newProps_1[key];
            var typedOldProps = oldProps_1[key];
            Object.keys(typedNewProps_1 || {})
              .filter(isNew(typedOldProps || {}, typedNewProps_1))
              .forEach(function (styleName) {
                if (!Object.prototype.hasOwnProperty.call(IS_UNIT_LESS_NUMBER, styleName) && typeof typedNewProps_1[styleName] === "number") {
                  dom_1[key][styleName] = "".concat(typedNewProps_1[styleName], "px");
                  return;
                }
                if (typedNewProps_1[styleName] !== null && typedNewProps_1[styleName] !== undefined) {
                  dom_1[key][styleName] = typedNewProps_1[styleName];
                } else {
                  dom_1[key][styleName] = "";
                }
              });
          }
        });
      if (newProps_1["dangerouslySetInnerHTML"] && newProps_1["dangerouslySetInnerHTML"] !== oldProps_1["dangerouslySetInnerHTML"]) {
        var typedProps = newProps_1["dangerouslySetInnerHTML"];
        dom_1.innerHTML = typedProps.__html;
      }
    }
    if (renderScope.isAppMounted && !renderScope.isHydrateRender && !renderScope.isServerRender && (enableHighlight.current || window.__highlight__)) {
      HighLight.getHighLightInstance().highLight(fiber);
    }
  };

  var update$1 = function (fiber, hydrate, isSVG) {
    if (fiber.patch & myreactSharedExports.PATCH_TYPE.__pendingUpdate__) {
      if (hydrate) {
        hydrateUpdate(fiber, isSVG);
      } else {
        nativeUpdate(fiber, isSVG);
      }
      {
        debugWithDOM(fiber);
      }
      fiber._applyProps();
      if (fiber.patch & myreactSharedExports.PATCH_TYPE.__pendingUpdate__) fiber.patch ^= myreactSharedExports.PATCH_TYPE.__pendingUpdate__;
    }
  };

  var clearFiberDom = function (fiber) {
    var _a;
    if (fiber.node) {
      if (!(fiber.type & myreactReconcilerExports.NODE_TYPE.__isPortal__) && fiber !== fiber.root) {
        var dom = fiber.node;
        (_a = dom.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(dom);
      } else {
        fiber.children.forEach(clearFiberDom);
      }
    } else {
      fiber.children.forEach(clearFiberDom);
    }
  };
  var unmount = function (fiber) {
    if (!fiber.isMounted) return;
    clearFiberDom(fiber);
  };

  var append$1 = function (fiber, parentFiberWithDom) {
    if (!fiber) throw new Error("position error, look like a bug");
    if (fiber.patch & myreactSharedExports.PATCH_TYPE.__pendingAppend__) fiber.patch ^= myreactSharedExports.PATCH_TYPE.__pendingAppend__;
    if (fiber.patch & myreactSharedExports.PATCH_TYPE.__pendingPosition__) fiber.patch ^= myreactSharedExports.PATCH_TYPE.__pendingPosition__;
    if (fiber.type & myreactReconcilerExports.NODE_TYPE.__isPortal__) return;
    if (
      fiber.type &
      (myreactReconcilerExports.NODE_TYPE.__isPlainNode__ |
        myreactReconcilerExports.NODE_TYPE.__isTextNode__ |
        myreactReconcilerExports.NODE_TYPE.__isCommentNode__)
    ) {
      var parentDOM = parentFiberWithDom.node;
      var childDOM = fiber.node;
      parentDOM.appendChild(childDOM);
      return;
    }
    var child = fiber.child;
    while (child) {
      append$1(child, parentFiberWithDom);
      child = child.sibling;
    }
  };

  var getFiberWithDom = function (fiber, transform) {
    if (transform === void 0) {
      transform = function (f) {
        return f.parent;
      };
    }
    if (!fiber) return null;
    if (fiber.isInvoked && !fiber.isMounted) return getFiberWithDom(transform(fiber), transform);
    if (fiber.type & myreactReconcilerExports.NODE_TYPE.__isPortal__) return null;
    if (
      fiber.type &
      (myreactReconcilerExports.NODE_TYPE.__isPlainNode__ |
        myreactReconcilerExports.NODE_TYPE.__isTextNode__ |
        myreactReconcilerExports.NODE_TYPE.__isCommentNode__)
    )
      return fiber;
    var nextFibers = transform(fiber);
    if (Array.isArray(nextFibers)) {
      return nextFibers.reduce(function (p, c) {
        if (p) return p;
        p = getFiberWithDom(c, transform);
        return p;
      }, null);
    } else {
      return getFiberWithDom(nextFibers, transform);
    }
  };

  var getInsertBeforeDomFromSibling = function (fiber) {
    if (!fiber) return null;
    var sibling = fiber.sibling;
    if (sibling) {
      return (
        getFiberWithDom(sibling, function (f) {
          return f.children;
        }) || getInsertBeforeDomFromSibling(sibling)
      );
    } else {
      return null;
    }
  };
  var getInsertBeforeDomFromSiblingAndParent = function (fiber, parentFiber) {
    if (!fiber) return null;
    if (fiber === parentFiber) return null;
    var beforeDom = getInsertBeforeDomFromSibling(fiber);
    if (beforeDom) return beforeDom;
    return getInsertBeforeDomFromSiblingAndParent(fiber.parent, parentFiber);
  };

  var insertBefore = function (fiber, beforeFiberWithDom, parentFiberWithDom) {
    if (!fiber) throw new Error("position error, look like a bug");
    if (fiber.patch & myreactSharedExports.PATCH_TYPE.__pendingAppend__) fiber.patch ^= myreactSharedExports.PATCH_TYPE.__pendingAppend__;
    if (fiber.patch & myreactSharedExports.PATCH_TYPE.__pendingPosition__) fiber.patch ^= myreactSharedExports.PATCH_TYPE.__pendingPosition__;
    if (fiber.type & myreactReconcilerExports.NODE_TYPE.__isPortal__) return;
    if (
      fiber.type &
      (myreactReconcilerExports.NODE_TYPE.__isPlainNode__ |
        myreactReconcilerExports.NODE_TYPE.__isTextNode__ |
        myreactReconcilerExports.NODE_TYPE.__isCommentNode__)
    ) {
      var parentDOM = parentFiberWithDom.node;
      var beforeDOM = beforeFiberWithDom.node;
      var childDOM = fiber.node;
      parentDOM.insertBefore(childDOM, beforeDOM);
      return;
    }
    var child = fiber.child;
    while (child) {
      insertBefore(child, beforeFiberWithDom, parentFiberWithDom);
      child = child.sibling;
    }
  };

  var position = function (fiber, parentFiberWithDom) {
    if (fiber.patch & myreactSharedExports.PATCH_TYPE.__pendingPosition__) {
      var renderPlatform = fiber.root.renderPlatform;
      if (!parentFiberWithDom.isMounted) {
        parentFiberWithDom = getFiberWithDom(fiber.parent, function (f) {
          return f.parent;
        });
        var elementObj = renderPlatform.elementMap.get(fiber);
        elementObj.parentFiberWithNode = parentFiberWithDom;
        renderPlatform.elementMap.set(fiber, elementObj);
      }
      if (!parentFiberWithDom.node) throw new Error("position error, dom not exist");
      var beforeFiberWithDom = getInsertBeforeDomFromSiblingAndParent(fiber, parentFiberWithDom);
      if (beforeFiberWithDom) {
        insertBefore(fiber, beforeFiberWithDom, parentFiberWithDom);
      } else {
        append$1(fiber, parentFiberWithDom);
      }
      if (fiber.patch & myreactSharedExports.PATCH_TYPE.__pendingPosition__) fiber.patch ^= myreactSharedExports.PATCH_TYPE.__pendingPosition__;
    }
  };

  var fallback = function (fiber) {
    var pendingDeleteArray = [];
    var clearHydrate = function (dom) {
      var children = Array.from(dom.childNodes);
      children.forEach(function (node) {
        var typedNode = node;
        if (!typedNode.__hydrate__) {
          pendingDeleteArray.push(typedNode);
        } else {
          delete typedNode["__hydrate__"];
        }
        if (node.nodeType === Node.ELEMENT_NODE) {
          clearHydrate(node);
        }
      });
    };
    var container = fiber.root.node;
    Array.from(container.childNodes).forEach(clearHydrate);
    pendingDeleteArray.forEach(function (d) {
      return d === null || d === void 0 ? void 0 : d.remove();
    });
  };

  var MyReactFiberNodeClass = require$$1.__my_react_internal__.MyReactFiberNode;
  var onceLog = myreactSharedExports.once(function () {
    console.log("you are using @my-react to render this site, see https://github.com/MrWangJustToDo/MyReact");
  });
  var render = function (element, container) {
    var _a, _b;
    var containerFiber = container.__fiber__;
    if (containerFiber instanceof MyReactFiberNodeClass) {
      containerFiber.root.renderScope.isAppCrash = false;
      if (myreactReconcilerExports.checkIsSameType(containerFiber, element)) {
        containerFiber._installElement(element);
        containerFiber._update();
        return;
      } else {
        unmountComponentAtNode(container);
      }
    }
    onceLog();
    var fiber = new MyReactFiberNodeClass(null);
    fiber._installElement(element);
    fiber.type = myreactReconcilerExports.getTypeFromElement(element);
    var rootFiber = fiber;
    var renderPlatform = new ClientDomPlatform();
    var renderDispatch = new ClientDomDispatch(renderPlatform);
    var renderScope = new DomScope(rootFiber, container);
    var renderController = new ClientDomController(renderScope);
    Array.from(container.children).forEach(function (n) {
      var _a;
      return (_a = n.remove) === null || _a === void 0 ? void 0 : _a.call(n);
    });
    rootFiber.node = container;
    rootFiber.renderScope = renderScope;
    rootFiber.renderPlatform = renderPlatform;
    rootFiber.renderDispatch = renderDispatch;
    rootFiber.renderController = renderController;
    (_a = container.setAttribute) === null || _a === void 0 ? void 0 : _a.call(container, "render", "MyReact");
    (_b = container.setAttribute) === null || _b === void 0 ? void 0 : _b.call(container, "version", "0.1.2");
    container.__fiber__ = fiber;
    container.__scope__ = renderScope;
    container.__platform__ = renderPlatform;
    container.__dispatch__ = renderDispatch;
    myreactReconcilerExports.initialFiberNode(fiber);
    startRender(fiber);
  };

  var MyReactFiberNode$1 = require$$1.__my_react_internal__.MyReactFiberNode;
  var hydrateSync = function (element, container) {
    var _a, _b;
    onceLog();
    var fiber = new MyReactFiberNode$1(null);
    fiber._installElement(element);
    fiber.type = myreactReconcilerExports.getTypeFromElement(element);
    var rootFiber = fiber;
    var renderPlatform = new ClientDomPlatform();
    var renderDispatch = new ClientDomDispatch(renderPlatform);
    var renderScope = new DomScope(rootFiber, container);
    var renderController = new ClientDomController(renderScope);
    rootFiber.node = container;
    rootFiber.renderScope = renderScope;
    rootFiber.renderPlatform = renderPlatform;
    rootFiber.renderDispatch = renderDispatch;
    rootFiber.renderController = renderController;
    renderScope.isPending = true;
    renderScope.isHydrateRender = true;
    (_a = container.setAttribute) === null || _a === void 0 ? void 0 : _a.call(container, "hydrate", "MyReact");
    (_b = container.setAttribute) === null || _b === void 0 ? void 0 : _b.call(container, "version", "0.1.2");
    container.__fiber__ = fiber;
    container.__scope__ = renderScope;
    container.__platform__ = renderPlatform;
    container.__dispatch__ = renderDispatch;
    myreactReconcilerExports.initialFiberNode(fiber);
    startRender(fiber, true);
    renderScope.isPending = false;
    renderScope.isHydrateRender = false;
  };
  var hydrateAsync = function (element, container) {
    return __awaiter(void 0, void 0, void 0, function () {
      var fiber, rootFiber, renderPlatform, renderDispatch, renderScope, renderController;
      var _a, _b;
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            onceLog();
            fiber = new MyReactFiberNode$1(null);
            fiber._installElement(element);
            fiber.type = myreactReconcilerExports.getTypeFromElement(element);
            rootFiber = fiber;
            renderPlatform = new ClientDomPlatform();
            renderDispatch = new ClientDomDispatch(renderPlatform);
            renderScope = new DomScope(rootFiber, container);
            renderController = new ClientDomController(renderScope);
            rootFiber.node = container;
            rootFiber.renderScope = renderScope;
            rootFiber.renderPlatform = renderPlatform;
            rootFiber.renderDispatch = renderDispatch;
            rootFiber.renderController = renderController;
            renderScope.isPending = true;
            renderScope.isHydrateRender = true;
            (_a = container.setAttribute) === null || _a === void 0 ? void 0 : _a.call(container, "hydrate", "MyReact");
            (_b = container.setAttribute) === null || _b === void 0 ? void 0 : _b.call(container, "version", "0.1.2");
            container.__fiber__ = fiber;
            container.__scope__ = renderScope;
            container.__dispatch__ = renderDispatch;
            myreactReconcilerExports.initialFiberNode(fiber);
            return [4 /*yield*/, startRenderAsync(fiber, true)];
          case 1:
            _c.sent();
            renderScope.isPending = false;
            renderScope.isHydrateRender = false;
            return [2 /*return*/];
        }
      });
    });
  };
  function hydrate(element, container, asyncRender) {
    if (asyncRender) {
      return hydrateAsync(element, container);
    } else {
      return hydrateSync(element, container);
    }
  }

  var ClientDomController = /** @class */ (function (_super) {
    __extends(ClientDomController, _super);
    function ClientDomController() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    ClientDomController.prototype.shouldYield = function () {
      return shouldPauseAsyncUpdate();
    };
    return ClientDomController;
  })(myreactReconcilerExports.CustomRenderController);

  var ClientDomDispatch = /** @class */ (function (_super) {
    __extends(ClientDomDispatch, _super);
    function ClientDomDispatch() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    ClientDomDispatch.prototype.triggerUpdate = function (_fiber) {
      asyncUpdateTimeStep.current = Date.now();
      _super.prototype.triggerUpdate.call(this, _fiber);
    };
    ClientDomDispatch.prototype.reconcileCommit = function (_fiber, _hydrate) {
      var result = _super.prototype.reconcileCommit.call(this, _fiber, _hydrate);
      // always check if there are any hydrate error, maybe could improve hydrate flow to avoid this
      if (_hydrate) {
        fallback(_fiber);
      }
      return result;
    };
    return ClientDomDispatch;
  })(myreactReconcilerExports.CustomRenderDispatch);

  /* eslint-disable @typescript-eslint/no-unused-vars */
  var microTask =
    typeof queueMicrotask === "undefined"
      ? function (task) {
          return Promise.resolve().then(task);
        }
      : queueMicrotask;
  var yieldTask =
    typeof requestIdleCallback === "function"
      ? requestIdleCallback
      : function (task) {
          return setTimeout(task);
        };
  var set = new Set();
  var pending = false;
  var macroTask = function (task) {
    set.add(task);
    flashTask();
  };
  var flashTask = function () {
    if (pending) return;
    pending = true;
    microTask(function () {
      var allTask = new Set(set);
      set.clear();
      allTask.forEach(function (f) {
        return f();
      });
      pending = false;
    });
  };
  var ClientDomPlatform = /** @class */ (function () {
    function ClientDomPlatform() {
      this.elementMap = new WeakMap();
      this.refType = myreactReconcilerExports.NODE_TYPE.__isPlainNode__ | myreactReconcilerExports.NODE_TYPE.__isClassComponent__;
      this.createType =
        myreactReconcilerExports.NODE_TYPE.__isTextNode__ |
        myreactReconcilerExports.NODE_TYPE.__isPlainNode__ |
        myreactReconcilerExports.NODE_TYPE.__isPortal__ |
        myreactReconcilerExports.NODE_TYPE.__isCommentNode__;
      this.updateType =
        myreactReconcilerExports.NODE_TYPE.__isTextNode__ |
        myreactReconcilerExports.NODE_TYPE.__isPlainNode__ |
        myreactReconcilerExports.NODE_TYPE.__isCommentNode__;
      this.appendType =
        myreactReconcilerExports.NODE_TYPE.__isTextNode__ |
        myreactReconcilerExports.NODE_TYPE.__isPlainNode__ |
        myreactReconcilerExports.NODE_TYPE.__isCommentNode__;
      this.hasNodeType =
        myreactReconcilerExports.NODE_TYPE.__isTextNode__ |
        myreactReconcilerExports.NODE_TYPE.__isPlainNode__ |
        myreactReconcilerExports.NODE_TYPE.__isPortal__ |
        myreactReconcilerExports.NODE_TYPE.__isCommentNode__;
    }
    ClientDomPlatform.prototype.setRef = function (_fiber) {
      setRef(_fiber);
    };
    ClientDomPlatform.prototype.unsetRef = function (_fiber) {
      unsetRef(_fiber);
    };
    ClientDomPlatform.prototype.log = function (props) {
      log(props);
    };
    ClientDomPlatform.prototype.microTask = function (_task) {
      // reset yield time limit
      asyncUpdateTimeLimit.current = 8;
      microTask(_task);
    };
    ClientDomPlatform.prototype.macroTask = function (_task) {
      macroTask(_task);
    };
    ClientDomPlatform.prototype.yieldTask = function (_task) {
      // increase current yield time limit
      asyncUpdateTimeLimit.current += 6;
      yieldTask(_task);
    };
    ClientDomPlatform.prototype.getFiberTree = function (fiber) {
      return getFiberTree(fiber);
    };
    ClientDomPlatform.prototype.getHookTree = function (hook, currentIndex, newHookType) {
      return getHookTree(hook, currentIndex, newHookType);
    };
    ClientDomPlatform.prototype.resolveLazy = function (fiber) {
      var renderDispatch = fiber.root.renderDispatch;
      var typedElementType = fiber.elementType;
      if (typedElementType._loaded === true) {
        var render = typedElementType.render;
        return require$$1.createElement(render, fiber.pendingProps);
      } else if (typedElementType._loading === false) {
        typedElementType._loading = true;
        Promise.resolve()
          .then(function () {
            return typedElementType.loader();
          })
          .then(function (re) {
            var render = typeof re === "object" && typeof (re === null || re === void 0 ? void 0 : re.default) === "function" ? re.default : re;
            typedElementType._loaded = true;
            typedElementType._loading = false;
            typedElementType.render = render;
            fiber._update();
          });
      }
      return renderDispatch.resolveSuspense(fiber);
    };
    ClientDomPlatform.prototype.resolveLazyAsync = function (fiber) {
      var typedElementType = fiber.elementType;
      if (typedElementType._loaded) return Promise.resolve(require$$1.createElement(typedElementType.render, fiber.pendingProps));
      return typedElementType.loader().then(function (loaded) {
        var render =
          typeof loaded === "object" && typeof (loaded === null || loaded === void 0 ? void 0 : loaded.default) === "function" ? loaded.default : loaded;
        typedElementType.render = render;
        typedElementType._loaded = true;
        return require$$1.createElement(typedElementType.render, fiber.pendingProps);
      });
    };
    ClientDomPlatform.prototype.create = function (_fiber, _hydrate) {
      var _a = this.elementMap.get(_fiber) || {},
        isSVG = _a.isSVG,
        parentFiberWithNode = _a.parentFiberWithNode;
      return create$1(_fiber, !!_hydrate, parentFiberWithNode, isSVG);
    };
    ClientDomPlatform.prototype.update = function (_fiber, _hydrate) {
      var isSVG = (this.elementMap.get(_fiber) || {}).isSVG;
      update$1(_fiber, !!_hydrate, isSVG);
    };
    ClientDomPlatform.prototype.append = function (_fiber) {
      var parentFiberWithNode = (this.elementMap.get(_fiber) || {}).parentFiberWithNode;
      append$2(_fiber, parentFiberWithNode);
    };
    ClientDomPlatform.prototype.clearNode = function (_fiber) {
      unmount(_fiber);
    };
    ClientDomPlatform.prototype.position = function (_fiber) {
      var parentFiberWithNode = (this.elementMap.get(_fiber) || {}).parentFiberWithNode;
      position(_fiber, parentFiberWithNode);
    };
    ClientDomPlatform.prototype.patchToFiberInitial = function (_fiber) {
      var _a;
      var isSVG = _fiber.elementType === "svg";
      var parentFiberWithNode = null;
      if (!isSVG) {
        isSVG = ((_a = this.elementMap.get(_fiber.parent)) === null || _a === void 0 ? void 0 : _a.isSVG) || false;
      }
      if (_fiber.parent) {
        if (_fiber.parent === _fiber.root) {
          parentFiberWithNode = _fiber.parent;
        } else if (_fiber.parent.type & this.hasNodeType) {
          parentFiberWithNode = _fiber.parent;
        } else {
          parentFiberWithNode = this.elementMap.get(_fiber.parent).parentFiberWithNode;
        }
      }
      this.elementMap.set(_fiber, { isSVG: isSVG, parentFiberWithNode: parentFiberWithNode });
    };
    ClientDomPlatform.prototype.patchToFiberUnmount = function (_fiber) {
      this.elementMap.delete(_fiber);
    };
    return ClientDomPlatform;
  })();

  var append = function (fiber, parentFiberWithDom) {
    if (fiber.patch & myreactSharedExports.PATCH_TYPE.__pendingAppend__) {
      if (!fiber.node || !parentFiberWithDom.node) throw new Error("append error");
      var parentDom = parentFiberWithDom.node;
      var currentDom = fiber.node;
      if (currentDom) parentDom.appendChild(currentDom);
      if (fiber.patch & myreactSharedExports.PATCH_TYPE.__pendingAppend__) fiber.patch ^= myreactSharedExports.PATCH_TYPE.__pendingAppend__;
    }
  };

  var TextElement = /** @class */ (function () {
    function TextElement(content) {
      this.content = "";
      this.content = content === "" ? " " : content;
    }
    TextElement.prototype.toString = function () {
      return this.content.toString();
    };
    return TextElement;
  })();

  var CommentStartElement = /** @class */ (function () {
    function CommentStartElement() {}
    CommentStartElement.prototype.toString = function () {
      return "<!-- [ -->";
    };
    return CommentStartElement;
  })();
  var CommentEndElement = /** @class */ (function () {
    function CommentEndElement() {}
    CommentEndElement.prototype.toString = function () {
      return "<!-- ] -->";
    };
    return CommentEndElement;
  })();

  var PlainElement = /** @class */ (function () {
    function PlainElement(type) {
      this.className = null;
      // attrs
      this.style = {};
      this.attrs = {};
      this.children = [];
      this.type = type;
    }
    PlainElement.prototype.addEventListener = function () {};
    PlainElement.prototype.removeEventListener = function () {};
    PlainElement.prototype.removeAttribute = function (key) {
      delete this.attrs[key];
    };
    PlainElement.prototype.setAttribute = function (key, value) {
      if (value !== null && value !== undefined) {
        this.attrs[key] = value.toString();
      }
    };
    /**
     *
     * @param {Element} dom
     */
    PlainElement.prototype.append = function () {
      var _this = this;
      var dom = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        dom[_i] = arguments[_i];
      }
      dom.forEach(function (d) {
        return _this.appendChild(d);
      });
    };
    PlainElement.prototype.appendChild = function (dom) {
      if (Object.prototype.hasOwnProperty.call(IS_SINGLE_ELEMENT, this.type)) return;
      if (
        dom instanceof PlainElement ||
        dom instanceof TextElement ||
        dom instanceof CommentStartElement ||
        dom instanceof CommentEndElement ||
        typeof dom === "string"
      ) {
        this.children.push(dom);
        return dom;
      } else {
        throw new Error("element instance error");
      }
    };
    PlainElement.prototype.serializeStyle = function () {
      var _this = this;
      var styleKeys = Object.keys(this.style).filter(function (key) {
        return _this.style[key] !== null && _this.style[key] !== undefined;
      });
      if (styleKeys.length)
        return 'style="'.concat(
          styleKeys
            .map(function (key) {
              var _a;
              return "".concat(kebabCase(key), ": ").concat((_a = _this.style[key]) === null || _a === void 0 ? void 0 : _a.toString(), ";");
            })
            .reduce(function (p, c) {
              return p + c;
            }),
          '"',
        );
      return "";
    };
    PlainElement.prototype.serializeAttrs = function () {
      var _this = this;
      var attrsKeys = Object.keys(this.attrs);
      if (attrsKeys.length) {
        // TODO
        return attrsKeys
          .map(function (key) {
            var _a;
            return "".concat(key, '="').concat((_a = _this.attrs[key]) === null || _a === void 0 ? void 0 : _a.toString(), '"');
          })
          .reduce(function (p, c) {
            return "".concat(p, " ").concat(c);
          });
      } else {
        return "";
      }
    };
    PlainElement.prototype.serializeProps = function () {
      if (this.className !== undefined && this.className !== null) return 'class="'.concat(this.className, '"');
      return "";
    };
    PlainElement.prototype.serialize = function () {
      var arr = [this.serializeProps(), this.serializeStyle(), this.serializeAttrs()].filter(function (i) {
        return i.length;
      });
      if (arr.length)
        return (
          " " +
          arr.reduce(function (p, c) {
            return "".concat(p, " ").concat(c);
          }) +
          " "
        );
      return "";
    };
    PlainElement.prototype.renderChildren = function () {
      return this.children
        .reduce(function (p, c) {
          if (p.length && c instanceof TextElement && p[p.length - 1] instanceof TextElement) {
            p.push("<!-- -->");
            p.push(c);
          } else if (p.length && typeof c === "string" && typeof p[p.length - 1] === "string") {
            p.push("<!-- -->");
            p.push(c);
          } else {
            p.push(c);
          }
          return p;
        }, [])
        .map(function (dom) {
          return dom.toString();
        })
        .reduce(function (p, c) {
          return p + c;
        }, "");
    };
    PlainElement.prototype.toString = function () {
      if (Object.prototype.hasOwnProperty.call(IS_SINGLE_ELEMENT, this.type)) {
        return "<".concat(this.type).concat(this.serialize(), "/>");
      } else {
        if (this.type) {
          return "<".concat(this.type).concat(this.serialize(), ">").concat(this.renderChildren(), "</").concat(this.type, ">");
        } else {
          return this.renderChildren();
        }
      }
    };
    return PlainElement;
  })();

  var create = function (fiber) {
    if (fiber.patch & myreactSharedExports.PATCH_TYPE.__pendingCreate__) {
      if (fiber.type & myreactReconcilerExports.NODE_TYPE.__isTextNode__) {
        fiber.node = new TextElement(fiber.element);
      } else if (fiber.type & myreactReconcilerExports.NODE_TYPE.__isPlainNode__) {
        var typedElementType = fiber.elementType;
        fiber.node = new PlainElement(typedElementType);
      } else if (fiber.type & myreactReconcilerExports.NODE_TYPE.__isCommentNode__) {
        if (myreactReconcilerExports.isCommentStartElement(fiber)) {
          fiber.node = new CommentStartElement();
        } else {
          fiber.node = new CommentEndElement();
        }
      } else {
        throw new Error("createPortal() can not call on the server");
      }
      if (fiber.patch & myreactSharedExports.PATCH_TYPE.__pendingCreate__) fiber.patch ^= myreactSharedExports.PATCH_TYPE.__pendingCreate__;
    }
  };

  var update = function (fiber, isSVG) {
    if (fiber.patch & myreactSharedExports.PATCH_TYPE.__pendingUpdate__) {
      if (fiber.type & myreactReconcilerExports.NODE_TYPE.__isPlainNode__) {
        var dom_1 = fiber.node;
        var props_1 = fiber.pendingProps || {};
        Object.keys(props_1).forEach(function (key) {
          if (isProperty(key)) {
            if (key === "className") {
              dom_1[key] = props_1[key];
            } else {
              var attrKey = (isSVG ? getSVGAttrKey(key) : getHTMLAttrKey(key)) || key;
              dom_1.setAttribute(attrKey, props_1[key]);
            }
          }
          if (isStyle(key)) {
            var typedProps_1 = props_1[key] || {};
            Object.keys(typedProps_1).forEach(function (styleName) {
              if (!Object.prototype.hasOwnProperty.call(IS_UNIT_LESS_NUMBER, styleName) && typeof typedProps_1[styleName] === "number") {
                dom_1[key][styleName] = "".concat(typedProps_1[styleName], "px");
                return;
              }
              dom_1[key][styleName] = typedProps_1[styleName];
            });
          }
        });
        if (props_1["dangerouslySetInnerHTML"]) {
          var typedProps = props_1["dangerouslySetInnerHTML"];
          if (typedProps.__html) {
            dom_1.append(new TextElement(typedProps.__html));
          }
        }
      }
      if (fiber.patch & myreactSharedExports.PATCH_TYPE.__pendingUpdate__) fiber.patch ^= myreactSharedExports.PATCH_TYPE.__pendingUpdate__;
    }
  };

  var MyReactFiberNode = require$$1.__my_react_internal__.MyReactFiberNode;
  var renderToStringSync = function (element) {
    var fiber = new MyReactFiberNode(null);
    fiber._installElement(element);
    fiber.type = myreactReconcilerExports.getTypeFromElement(element);
    var container = new PlainElement("");
    var rootFiber = fiber;
    var renderPlatform = new ServerDomPlatform();
    var renderDispatch = new ServerDomDispatch(renderPlatform);
    var renderScope = new DomScope(rootFiber, container);
    var renderController = new myreactReconcilerExports.CustomRenderController(renderScope);
    rootFiber.node = container;
    rootFiber.renderScope = renderScope;
    rootFiber.renderPlatform = renderPlatform;
    rootFiber.renderDispatch = renderDispatch;
    rootFiber.renderController = renderController;
    renderScope.isPending = true;
    renderScope.isServerRender = true;
    myreactReconcilerExports.initialFiberNode(fiber);
    startRender(fiber);
    renderScope.isServerRender = false;
    return container.toString();
  };
  var renderToStringAsync = function (element) {
    return __awaiter(void 0, void 0, void 0, function () {
      var fiber, container, rootFiber, renderPlatform, renderDispatch, renderScope, renderController;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            fiber = new MyReactFiberNode(null);
            fiber._installElement(element);
            fiber.type = myreactReconcilerExports.getTypeFromElement(element);
            container = new PlainElement("");
            rootFiber = fiber;
            renderPlatform = new ServerDomPlatform();
            renderDispatch = new ServerDomDispatch(renderPlatform);
            renderScope = new DomScope(rootFiber, container);
            renderController = new myreactReconcilerExports.CustomRenderController(renderScope);
            rootFiber.node = container;
            rootFiber.renderScope = renderScope;
            rootFiber.renderPlatform = renderPlatform;
            rootFiber.renderDispatch = renderDispatch;
            rootFiber.renderController = renderController;
            renderScope.isPending = true;
            renderScope.isServerRender = true;
            myreactReconcilerExports.initialFiberNode(fiber);
            return [4 /*yield*/, startRenderAsync(fiber)];
          case 1:
            _a.sent();
            renderScope.isServerRender = false;
            return [2 /*return*/, container.toString()];
        }
      });
    });
  };
  function renderToString(element, asyncRender) {
    if (asyncRender) {
      return renderToStringAsync(element);
    } else {
      return renderToStringSync(element);
    }
  }

  var ServerDomDispatch = /** @class */ (function (_super) {
    __extends(ServerDomDispatch, _super);
    function ServerDomDispatch() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    ServerDomDispatch.prototype.triggerUpdate = function (_fiber) {};
    ServerDomDispatch.prototype.triggerError = function (_fiber, _error) {
      throw _error;
    };
    ServerDomDispatch.prototype.pendingPosition = function (_fiber) {};
    ServerDomDispatch.prototype.pendingContext = function (_fiber) {};
    ServerDomDispatch.prototype.pendingUnmount = function (_fiber, _pendingUnmount) {};
    ServerDomDispatch.prototype.pendingEffect = function (_fiber, _effect) {};
    ServerDomDispatch.prototype.pendingLayoutEffect = function (_fiber, _layoutEffect) {};
    return ServerDomDispatch;
  })(myreactReconcilerExports.CustomRenderDispatch);

  var ServerDomPlatform = /** @class */ (function () {
    function ServerDomPlatform() {
      this.elementMap = new WeakMap();
      this.refType = myreactReconcilerExports.NODE_TYPE.__initial__;
      this.createType =
        myreactReconcilerExports.NODE_TYPE.__isTextNode__ |
        myreactReconcilerExports.NODE_TYPE.__isPlainNode__ |
        myreactReconcilerExports.NODE_TYPE.__isPortal__ |
        myreactReconcilerExports.NODE_TYPE.__isCommentNode__;
      this.updateType =
        myreactReconcilerExports.NODE_TYPE.__isTextNode__ |
        myreactReconcilerExports.NODE_TYPE.__isPlainNode__ |
        myreactReconcilerExports.NODE_TYPE.__isCommentNode__;
      this.appendType =
        myreactReconcilerExports.NODE_TYPE.__isTextNode__ |
        myreactReconcilerExports.NODE_TYPE.__isPlainNode__ |
        myreactReconcilerExports.NODE_TYPE.__isCommentNode__;
      this.hasNodeType =
        myreactReconcilerExports.NODE_TYPE.__isTextNode__ |
        myreactReconcilerExports.NODE_TYPE.__isPlainNode__ |
        myreactReconcilerExports.NODE_TYPE.__isPortal__ |
        myreactReconcilerExports.NODE_TYPE.__isCommentNode__;
    }
    ServerDomPlatform.prototype.setRef = function (_fiber) {};
    ServerDomPlatform.prototype.unsetRef = function (_fiber) {};
    ServerDomPlatform.prototype.log = function (props) {
      log(props);
    };
    ServerDomPlatform.prototype.microTask = function (_task) {};
    ServerDomPlatform.prototype.macroTask = function (_task) {};
    ServerDomPlatform.prototype.yieldTask = function (_task) {};
    ServerDomPlatform.prototype.getFiberTree = function (fiber) {
      return getFiberTree(fiber);
    };
    ServerDomPlatform.prototype.getHookTree = function (hook, currentIndex, newHookType) {
      return getHookTree(hook, currentIndex, newHookType);
    };
    ServerDomPlatform.prototype.resolveLazy = function (fiber) {
      var renderDispatch = fiber.root.renderDispatch;
      return renderDispatch.resolveSuspense(fiber);
    };
    ServerDomPlatform.prototype.resolveLazyAsync = function (fiber) {
      var typedElementType = fiber.elementType;
      if (typedElementType._loaded) return Promise.resolve(require$$1.createElement(typedElementType.render, fiber.pendingProps));
      return typedElementType.loader().then(function (loaded) {
        var render =
          typeof loaded === "object" && typeof (loaded === null || loaded === void 0 ? void 0 : loaded.default) === "function" ? loaded.default : loaded;
        typedElementType.render = render;
        typedElementType._loaded = true;
        return require$$1.createElement(typedElementType.render, fiber.pendingProps);
      });
    };
    ServerDomPlatform.prototype.create = function (_fiber, _hydrate) {
      create(_fiber);
      return true;
    };
    ServerDomPlatform.prototype.update = function (_fiber, _hydrate) {
      var isSVG = (this.elementMap.get(_fiber) || {}).isSVG;
      update(_fiber, isSVG);
    };
    ServerDomPlatform.prototype.append = function (_fiber) {
      var parentFiberWithNode = (this.elementMap.get(_fiber) || {}).parentFiberWithNode;
      append(_fiber, parentFiberWithNode);
    };
    ServerDomPlatform.prototype.clearNode = function (_fiber) {};
    ServerDomPlatform.prototype.position = function (_fiber) {};
    ServerDomPlatform.prototype.patchToFiberInitial = function (_fiber) {
      var _a;
      var isSVG = _fiber.elementType === "svg";
      var parentFiberWithNode = null;
      if (!isSVG) {
        isSVG = ((_a = this.elementMap.get(_fiber.parent)) === null || _a === void 0 ? void 0 : _a.isSVG) || false;
      }
      if (_fiber.parent) {
        if (_fiber.parent === _fiber.root) {
          parentFiberWithNode = _fiber.parent;
        } else if (_fiber.parent.type & this.hasNodeType) {
          parentFiberWithNode = _fiber.parent;
        } else {
          parentFiberWithNode = this.elementMap.get(_fiber.parent).parentFiberWithNode;
        }
      }
      this.elementMap.set(_fiber, { isSVG: isSVG, parentFiberWithNode: parentFiberWithNode });
    };
    return ServerDomPlatform;
  })();

  var version = "0.1.2";
  var flushSync = myreactReconcilerExports.safeCall;
  var unstable_batchedUpdates = myreactReconcilerExports.safeCall;

  exports.createPortal = createPortal;
  exports.findDOMNode = findDOMNode;
  exports.flushSync = flushSync;
  exports.hydrate = hydrate;
  exports.render = render;
  exports.renderToString = renderToString;
  exports.unmountComponentAtNode = unmountComponentAtNode;
  exports.unstable_batchedUpdates = unstable_batchedUpdates;
  exports.version = version;
});
