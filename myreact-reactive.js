(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined"
    ? factory(exports, require("@my-react/react"))
    : typeof define === "function" && define.amd
    ? define(["exports", "@my-react/react"], factory)
    : ((global = typeof globalThis !== "undefined" ? globalThis : global || self), factory((global.ReactReactive = {}), global.React));
})(this, function (exports, react) {
  "use strict";

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

  var __assign = function () {
    __assign =
      Object.assign ||
      function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
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

  var index_development = {};

  var hasRequiredIndex_development;

  function requireIndex_development() {
    if (hasRequiredIndex_development) return index_development;
    hasRequiredIndex_development = 1;
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
    })(index_development);
    return index_development;
  }

  (function (module) {
    {
      module.exports = requireIndex_development();
    }
  })(myreactShared);

  var currentReactiveInstance = createRef(null);

  var globalDepsMap = new WeakMap();
  var globalReactiveMap = new WeakMap();
  var globalReadOnlyMap = new WeakMap();
  var globalShallowReactiveMap = new WeakMap();
  var globalShallowReadOnlyMap = new WeakMap();

  function createRef(value) {
    return { current: value };
  }

  var _a$2;
  var globalEffectRef = createRef(null);
  var ReactiveEffect = /** @class */ (function () {
    function ReactiveEffect(_action, _scheduler) {
      this._action = _action;
      this._scheduler = _scheduler;
      this._active = true;
      this._parent = null;
      this[_a$2] = true;
      this._depsSetArray = [];
    }
    ReactiveEffect.prototype.cleanDeps = function () {
      var _this = this;
      // delete current effect deps
      this._depsSetArray.forEach(function (set) {
        return set.delete(_this);
      });
      // clean the dep array
      this._depsSetArray.length = 0;
    };
    ReactiveEffect.prototype.addDeps = function (set) {
      this._depsSetArray.push(set);
    };
    ReactiveEffect.prototype.entryScope = function () {
      this._parent = globalEffectRef.current;
      globalEffectRef.current = this;
    };
    ReactiveEffect.prototype.exitScope = function () {
      globalEffectRef.current = this._parent;
      this._parent = null;
    };
    ReactiveEffect.prototype.run = function () {
      this.entryScope();
      this.cleanDeps();
      var re = null;
      try {
        re = this._action();
      } catch (e) {
        console.error(e);
      } finally {
        this.exitScope();
      }
      return re;
    };
    ReactiveEffect.prototype.update = function (newValue, oldValue) {
      if (!this._active) return this._action();
      this.entryScope();
      this.cleanDeps();
      var re = null;
      try {
        if (this._scheduler) {
          re = this._scheduler(newValue, oldValue);
        } else {
          re = this._action();
        }
      } catch (e) {
        console.error(e);
      } finally {
        this.exitScope();
      }
      return re;
    };
    ReactiveEffect.prototype.stop = function () {
      if (this._active) {
        this._active = false;
        this.cleanDeps();
      }
    };
    ReactiveEffect.prototype.active = function () {
      if (!this._active) {
        this._active = true;
      }
    };
    return ReactiveEffect;
  })();
  _a$2 = "__my_effect__" /* EffectFlags.Effect_key */;
  var shouldTrackRef = createRef(true);
  var trackStack = [];
  var shouldTriggerRef = createRef(true);
  var triggerStack = [];
  function pauseTracking() {
    trackStack.push(shouldTrackRef.current);
    shouldTrackRef.current = false;
  }
  function pauseTrigger() {
    triggerStack.push(shouldTriggerRef.current);
    shouldTriggerRef.current = false;
  }
  function enableTracking() {
    trackStack.push(shouldTrackRef.current);
    shouldTrackRef.current = true;
  }
  function enableTrigger() {
    triggerStack.push(shouldTriggerRef.current);
    shouldTriggerRef.current = true;
  }
  function resetTracking() {
    var last = trackStack.pop();
    shouldTrackRef.current = last === undefined ? true : last;
  }
  function resetTrigger() {
    var last = triggerStack.pop();
    shouldTriggerRef.current = last === undefined ? true : last;
  }
  function track(target, type, key) {
    if (!globalEffectRef.current || !shouldTrackRef.current) return;
    var depsMap = globalDepsMap.get(target);
    if (!depsMap) {
      globalDepsMap.set(target, (depsMap = new Map()));
    }
    var depsSet = depsMap.get(key);
    if (!depsSet) {
      depsMap.set(key, (depsSet = new Set()));
    }
    trackEffects(depsSet);
  }
  function trackEffects(set) {
    if (!globalEffectRef.current || !shouldTrackRef.current) return;
    if (!set.has(globalEffectRef.current)) {
      set.add(globalEffectRef.current);
      globalEffectRef.current.addDeps(set);
    }
  }
  function trigger(target, type, key, newValue, oldValue) {
    if (!shouldTriggerRef.current) return;
    var depsMap = globalDepsMap.get(target);
    if (!depsMap) return;
    if (myreactSharedExports.isArray(target)) {
      // 直接修改length
      if (key === "length") {
        depsMap.forEach(function (depsSet, _key) {
          if (_key === "length") {
            if (depsSet) triggerEffects(depsSet, newValue, oldValue);
          }
          if (Number(_key) >= newValue) {
            if (depsSet) triggerEffects(depsSet);
          }
        });
      }
      if (myreactSharedExports.isInteger(key)) {
        var depsSet = depsMap.get(key);
        if (depsSet) triggerEffects(depsSet, oldValue, newValue);
        // 数组调用了push等方法
        if (type === "add") {
          var depsSet_1 = depsMap.get("length");
          if (depsSet_1) triggerEffects(depsSet_1);
        }
      }
    } else {
      var depsSet = depsMap.get(key);
      if (depsSet) triggerEffects(depsSet, newValue, oldValue);
    }
  }
  function triggerEffects(set, oldValue, newValue) {
    if (!shouldTriggerRef.current) return;
    var allReactiveEffect = new Set(set);
    allReactiveEffect.forEach(function (reactiveEffect) {
      if (!Object.is(reactiveEffect, globalEffectRef.current)) {
        reactiveEffect.update(oldValue, newValue);
      }
    });
  }
  function effect(action) {
    var effectObject = new ReactiveEffect(action);
    effectObject.run();
    var runner = effectObject.update.bind(effectObject);
    runner.effect = effectObject;
    return runner;
  }

  /**
   * array method track:
   * const data = {a: 1, b: 2};
   * const arr = reactive([data]);
   * usage effect(() => {
   *  if (arr.includes(data)) {
   *    console.log('foo')
   *  }
   * })
   */
  var generateArrayProxyHandler = function () {
    var methodNames = ["includes", "indexOf", "lastIndexOf", "find", "findIndex", "findLast", "findLastIndex"];
    // 这些方法会修改数组  同时也会访问length属性，对于数组的操作可能会死循环
    var noTrackMethodNames = ["push", "pop", "shift", "unshift", "splice"];
    var handlerObject = {};
    methodNames.reduce(function (p, c) {
      p[c] = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        var arr = toRaw(this);
        for (var i = 0; i < this.length; i++) {
          track(arr, "get", i.toString());
        }
        var res = arr[c].apply(arr, args);
        if (res === -1 || res === false) {
          // if that didn't work, run it again using raw values.
          return arr[c].apply(arr, args.map(toRaw));
        } else {
          return res;
        }
      };
      return p;
    }, handlerObject);
    noTrackMethodNames.reduce(function (p, c) {
      p[c] = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        pauseTracking();
        var arr = toRaw(this);
        var res = arr[c].apply(this, args);
        resetTracking();
        return res;
      };
      return p;
    }, handlerObject);
    return handlerObject;
  };
  var arrayProxyHandler = generateArrayProxyHandler();
  var generateProxyHandler = function (isShallow, isReadOnly) {
    if (isShallow === void 0) {
      isShallow = false;
    }
    if (isReadOnly === void 0) {
      isReadOnly = false;
    }
    var deletePropertyHandler = createDeletePropertyHandler(isReadOnly);
    var getHandler = createGetHandler(isShallow, isReadOnly);
    var setHandler = createSetHandler(isShallow, isReadOnly);
    var ownKeysHandler = createOwnKeysHandler();
    var hasHandler = createHasHandler();
    return {
      deleteProperty: deletePropertyHandler,
      ownKeys: ownKeysHandler,
      get: getHandler,
      set: setHandler,
      has: hasHandler,
    };
  };
  var createObjectGetHandler = function (isShallow, isReadOnly) {
    return function (target, key, receiver) {
      var res = Reflect.get(target, key, receiver);
      if (!isReadOnly) {
        track(target, "get", key);
      }
      if (isShallow) return res;
      if (isRef(res)) return res.value;
      if (myreactSharedExports.isObject(res)) {
        return isReadOnly ? readonly(res) : reactive(res);
      }
      return res;
    };
  };
  var createArrayGetHandler = function (isShallow, isReadOnly) {
    return function (target, key, receiver) {
      if (!isReadOnly && Reflect.has(arrayProxyHandler, key)) {
        return Reflect.get(arrayProxyHandler, key, receiver);
      }
      var res = Reflect.get(target, key, receiver);
      if (!isReadOnly) {
        track(target, "get", key);
      }
      if (isShallow) return res;
      if (isRef(res)) {
        return myreactSharedExports.isInteger(key) ? res : res.value;
      }
      if (myreactSharedExports.isObject(res)) {
        return isReadOnly ? readonly(res) : reactive(res);
      }
      return res;
    };
  };
  var createGetHandler = function (isShallow, isReadOnly) {
    var objectGetHandler = createObjectGetHandler(isShallow, isReadOnly);
    var arrayGetHandler = createArrayGetHandler(isShallow, isReadOnly);
    return function (target, key, receiver) {
      if (
        key === "__my_effect__" /* EffectFlags.Effect_key */ ||
        key === "__my_ref__" /* RefFlags.Ref_key */ ||
        key === "__my_computed__" /* ComputedFlags.Computed_key */
      )
        return Reflect.get(target, key, receiver);
      if (key === "__my_reactive__" /* ReactiveFlags.Reactive_key */) return !isReadOnly;
      if (key === "__my_readonly__" /* ReactiveFlags.Readonly_key */) return isReadOnly;
      if (key === "__my_shallow__" /* ReactiveFlags.Shallow_key */) return isShallow;
      if (key === "__my_raw__" /* ReactiveFlags.Raw_key */ && receiver === getProxyCacheMap(isShallow, isReadOnly).get(target)) {
        return target;
      }
      if (myreactSharedExports.isArray(target)) {
        return arrayGetHandler(target, key, receiver);
      }
      if (myreactSharedExports.isCollection(target)) {
        throw new Error("current not support collection object");
      }
      return objectGetHandler(target, key, receiver);
    };
  };
  var createDeletePropertyHandler = function (isReadonly) {
    return function (target, key) {
      if (isReadonly) {
        console.warn("current object is readonly object");
        return true;
      }
      var hasKey = Reflect.has(target, key);
      var oldValue = target[key];
      var result = Reflect.deleteProperty(target, key);
      if (result && hasKey) {
        trigger(target, "delete", key, undefined, oldValue);
      }
      return result;
    };
  };
  var createHasHandler = function () {
    return function (target, key) {
      var result = Reflect.has(target, key);
      track(target, "has", key);
      return result;
    };
  };
  var createOwnKeysHandler = function () {
    return function (target) {
      track(target, "iterate", myreactSharedExports.isArray(target) ? "length" : "collection");
      return Reflect.ownKeys(target);
    };
  };
  var createSetHandler = function (isShallow$1, isReadOnly) {
    return function (target, key, value, receiver) {
      if (
        key === "__my_reactive__" /* ReactiveFlags.Reactive_key */ ||
        key === "__my_readonly__" /* ReactiveFlags.Readonly_key */ ||
        key === "__my_shallow__" /* ReactiveFlags.Shallow_key */ ||
        key === "__my_raw__" /* ReactiveFlags.Raw_key */
      ) {
        throw new Error("can not set internal ".concat(key, " field for current object"));
      }
      if (isReadOnly) {
        throw new Error("can not set ".concat(key, " field for readonly object"));
      }
      var targetIsArray = myreactSharedExports.isArray(target);
      var oldValue = target[key];
      // TODO from source code
      if (isReadonly(oldValue) && isRef(oldValue) && !isRef(value)) {
        return false;
      }
      // TODO from source code
      if (!isShallow$1) {
        if (!isShallow(value) && !isReadonly(value)) {
          oldValue = toRaw(oldValue);
          value = toRaw(value);
        }
        if (!targetIsArray && isRef(oldValue) && !isRef(value)) {
          oldValue.value = value;
          return true;
        }
      }
      var hadKey = targetIsArray && myreactSharedExports.isInteger(key) ? Number(key) < target.length : Reflect.has(target, key);
      var res = Reflect.set(target, key, value, receiver);
      // 原型链的proxy set方法会按层级触发
      if (Object.is(target, toRaw(receiver))) {
        if (!hadKey) {
          trigger(target, "add", key, value, oldValue);
        } else if (!Object.is(oldValue, value)) {
          trigger(target, "set", key, value, oldValue);
        }
      }
      return res;
    };
  };

  var getProxyCacheMap = function (isShallow, isReadOnly) {
    if (isShallow && isReadOnly) return globalShallowReadOnlyMap;
    if (isShallow) return globalShallowReactiveMap;
    if (isReadOnly) return globalReadOnlyMap;
    return globalReactiveMap;
  };
  var createReactive$1 = function (target, cacheMap, proxyHandler) {
    if (target["__my_skip__" /* ReactiveFlags.Skip_key */]) return target;
    if (!Object.isExtensible(target)) return target;
    if (cacheMap.has(target)) return cacheMap.get(target);
    var proxy = new Proxy(target, proxyHandler);
    cacheMap.set(target, proxy);
    return proxy;
  };
  function createReactiveWithCache(target, isShallow, isReadOnly) {
    return createReactive$1(target, getProxyCacheMap(isShallow, isReadOnly), generateProxyHandler(isShallow, isReadOnly));
  }

  function reactive(target) {
    if (myreactSharedExports.isObject(target)) {
      if (isReactive(target)) return target;
      // from source code
      if (isReadonly(target)) return target;
      return createReactiveWithCache(target, false, false);
    } else {
      throw new Error("reactive() only accept a object value");
    }
  }
  function readonly(target) {
    if (myreactSharedExports.isObject(target)) {
      if (isReadonly(target)) return target;
      return createReactiveWithCache(target, false, true);
    } else {
      throw new Error("readonly() only accept a object value");
    }
  }
  function shallowReactive(target) {
    if (myreactSharedExports.isObject(target)) {
      if (isReactive(target) && isShallow(target)) return target;
      return createReactiveWithCache(target, true, false);
    } else {
      throw new Error("shallowReactive() only accept a object value");
    }
  }
  function shallowReadonly(target) {
    if (myreactSharedExports.isObject(target)) {
      if (isReadonly(target) && isShallow(target)) return target;
      return createReactiveWithCache(target, true, true);
    } else {
      throw new Error("shallowReadonly() only accept a object value");
    }
  }
  function isReactive(target) {
    return myreactSharedExports.isObject(target) && !!target["__my_reactive__" /* ReactiveFlags.Reactive_key */];
  }
  function isReadonly(target) {
    return myreactSharedExports.isObject(target) && !!target["__my_readonly__" /* ReactiveFlags.Readonly_key */];
  }
  function isShallow(target) {
    return myreactSharedExports.isObject(target) && !!target["__my_shallow__" /* ReactiveFlags.Shallow_key */];
  }
  function isProxy(target) {
    return isReactive(target) || isReadonly(target);
  }
  function toReactive(value) {
    return myreactSharedExports.isObject(value) ? reactive(value) : value;
  }
  function toReadonly(value) {
    return myreactSharedExports.isObject(value) ? readonly(value) : value;
  }
  function toRaw(observed) {
    var raw = myreactSharedExports.isObject(observed) && observed["__my_raw__" /* ReactiveFlags.Raw_key */];
    return raw ? toRaw(raw) : observed;
  }
  function markRaw(value) {
    Object.defineProperty(value, "__my_skip__" /* ReactiveFlags.Skip_key */, {
      value: value,
      configurable: true,
      enumerable: false,
    });
    return value;
  }

  var _a$1, _b$1;
  function ref(value) {
    if (isRef(value)) return value;
    return new RefImpl(value);
  }
  function isRef(value) {
    return myreactSharedExports.isObject(value) && !!value["__my_ref__" /* RefFlags.Ref_key */];
  }
  function toRefs(reactiveValue) {
    if (myreactSharedExports.isObject(reactiveValue)) {
      if (isReactive(reactiveValue)) {
        if (myreactSharedExports.isArray(reactiveValue)) {
          return reactiveValue.map(function (_, index) {
            return toRef(reactiveValue, index);
          });
        }
        return Object.keys(reactiveValue).reduce(function (p, c) {
          var _c;
          return __assign(__assign({}, p), ((_c = {}), (_c[c] = toRef(reactiveValue, c)), _c));
        }, {});
      } else {
        throw new Error("expects a reactive object but received a plain object");
      }
    }
    throw new Error("expects a reactive object but received a plain value");
  }
  // 支持解构一层 就是把原始的ReactiveObject的属性访问转换到target.value的形式访问
  function toRef(object, key) {
    var value = object[key];
    if (isRef(value)) return value;
    return new ObjectRefImpl(object, key);
  }
  function unRef(refObject) {
    if (isRef(refObject)) return refObject.value;
    return refObject;
  }
  var unwrapRefGerHandler = function (target, key, receiver) {
    return unRef(Reflect.get(target, key, receiver));
  };
  var unwrapRefSetHandler = function (target, key, value, receiver) {
    var oldValue = target[key];
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  };
  function proxyRefs(objectWithRefs) {
    if (myreactSharedExports.isObject(objectWithRefs)) {
      if (isReactive(objectWithRefs)) return objectWithRefs;
      return new Proxy(objectWithRefs, {
        get: unwrapRefGerHandler,
        set: unwrapRefSetHandler,
      });
    }
    throw new Error("expect a object but received a plain value");
  }
  var RefImpl = /** @class */ (function () {
    function RefImpl(_rawValue) {
      this._rawValue = _rawValue;
      this[_a$1] = true;
      this._depsSet = new Set();
      if (myreactSharedExports.isObject(_rawValue)) {
        this._value = reactive(_rawValue);
      } else {
        this._value = _rawValue;
      }
    }
    Object.defineProperty(RefImpl.prototype, "value", {
      get: function () {
        trackEffects(this._depsSet);
        return this._value;
      },
      set: function (newValue) {
        if (!Object.is(newValue, this._rawValue)) {
          this._rawValue = newValue;
          this._value = myreactSharedExports.isObject(newValue) ? reactive(newValue) : newValue;
          triggerEffects(this._depsSet);
        }
      },
      enumerable: false,
      configurable: true,
    });
    RefImpl.prototype.toString = function () {
      return this._value;
    };
    return RefImpl;
  })();
  _a$1 = "__my_ref__" /* RefFlags.Ref_key */;
  var ObjectRefImpl = /** @class */ (function () {
    function ObjectRefImpl(_object, _key) {
      this._object = _object;
      this._key = _key;
      this[_b$1] = true;
    }
    Object.defineProperty(ObjectRefImpl.prototype, "value", {
      get: function () {
        return this._object[this._key];
      },
      set: function (newValue) {
        this._object[this._key] = newValue;
      },
      enumerable: false,
      configurable: true,
    });
    return ObjectRefImpl;
  })();
  _b$1 = "__my_ref__" /* RefFlags.Ref_key */;

  function traversal(target, set) {
    if (set === void 0) {
      set = new Set();
    }
    if (myreactSharedExports.isObject(target)) {
      if (set.has(target)) return target;
      set.add(target);
      for (var key in target) {
        traversal(target[key], set);
      }
      return target;
    } else {
      return target;
    }
  }
  function watch(source, cb) {
    var effectAction = function () {
      return void 0;
    };
    if (isReactive(source)) {
      effectAction = function () {
        return traversal(source);
      };
    } else if (myreactSharedExports.isFunction(source)) {
      effectAction = source;
    } else {
      return;
    }
    var cleanUp = null;
    var onCleanUp = function (fn) {
      cleanUp = fn;
    };
    var oldValue = null;
    var effect = new ReactiveEffect(effectAction, function () {
      if (cleanUp) {
        cleanUp();
        cleanUp = null;
      }
      var newValue = effect.run();
      cb(newValue, oldValue, onCleanUp);
      oldValue = newValue;
    });
    oldValue = effect.run();
    return effect;
  }

  var _a, _b;
  var computed = function (getterOrOption) {
    var getter;
    var setter = function () {
      console.warn("current computed is readonly");
    };
    if (myreactSharedExports.isFunction(getterOrOption)) {
      getter = getterOrOption;
    } else {
      getter = getterOrOption.get;
      setter = getterOrOption.set;
    }
    return new ComputedRefImpl(getter, setter);
  };
  var ComputedRefImpl = /** @class */ (function () {
    function ComputedRefImpl(_getter, _setter) {
      var _this = this;
      this._getter = _getter;
      this._setter = _setter;
      this._dirty = true;
      this._value = null;
      this[_a] = true;
      this[_b] = true;
      this._depsSet = new Set();
      this._effect = new ReactiveEffect(_getter, function () {
        if (!_this._dirty) {
          _this._dirty = true;
          triggerEffects(_this._depsSet);
        }
      });
    }
    Object.defineProperty(ComputedRefImpl.prototype, "value", {
      get: function () {
        trackEffects(this._depsSet);
        if (this._dirty) {
          this._dirty = false;
          this._value = this._effect.run();
        }
        return this._value;
      },
      set: function (v) {
        // TODO
        this._setter(v);
      },
      enumerable: false,
      configurable: true,
    });
    return ComputedRefImpl;
  })();
  (_a = "__my_ref__") /* RefFlags.Ref_key */, (_b = "__my_computed__") /* ComputedFlags.Computed_key */;

  // hook api like `Vue`
  var onBeforeMount = function (cb) {
    var reactiveInstance = currentReactiveInstance.current;
    if (reactiveInstance) {
      reactiveInstance.beforeMountHooks.push(cb);
    } else {
      throw new Error("can not use hook without setup function");
    }
  };
  var onMounted = function (cb) {
    var reactiveInstance = currentReactiveInstance.current;
    if (reactiveInstance) {
      reactiveInstance.mountedHooks.push(cb);
    } else {
      throw new Error("can not use hook without setup function");
    }
  };
  var onBeforeUpdate = function (cb) {
    var reactiveInstance = currentReactiveInstance.current;
    if (reactiveInstance) {
      reactiveInstance.beforeUpdateHooks.push(cb);
    } else {
      throw new Error("can not use hook without setup function");
    }
  };
  var onUpdated = function (cb) {
    var reactiveInstance = currentReactiveInstance.current;
    if (reactiveInstance) {
      reactiveInstance.updatedHooks.push(cb);
    } else {
      throw new Error("can not use hook without setup function");
    }
  };
  var onBeforeUnmount = function (cb) {
    var reactiveInstance = currentReactiveInstance.current;
    if (reactiveInstance) {
      reactiveInstance.beforeUnmountHooks.push(cb);
    } else {
      throw new Error("can not use hook without setup function");
    }
  };
  var onUnmounted = function (cb) {
    var reactiveInstance = currentReactiveInstance.current;
    if (reactiveInstance) {
      reactiveInstance.unmountedHooks.push(cb);
    } else {
      throw new Error("can not use hook without setup function");
    }
  };

  function createReactive(props) {
    var _a;
    return (
      (_a = {}),
      (_a[myreactSharedExports.TYPEKEY] = myreactSharedExports.Reactive),
      (_a.name = typeof props === "function" ? props.name : props === null || props === void 0 ? void 0 : props.name),
      (_a.setup = typeof props === "function" ? props : props === null || props === void 0 ? void 0 : props.setup),
      (_a.render = typeof props === "function" ? null : props === null || props === void 0 ? void 0 : props.render),
      (_a.contextType = typeof props === "function" ? null : props === null || props === void 0 ? void 0 : props.contextType),
      _a
    );
  }

  var MyReactInternalInstance = react.__my_react_internal__.MyReactInternalInstance;
  var MyReactReactiveInstance = /** @class */ (function (_super) {
    __extends(MyReactReactiveInstance, _super);
    function MyReactReactiveInstance(props, context) {
      var _this = _super.call(this) || this;
      _this.beforeMountHooks = [];
      _this.mountedHooks = [];
      _this.beforeUpdateHooks = [];
      _this.updatedHooks = [];
      _this.beforeUnmountHooks = [];
      _this.unmountedHooks = [];
      _this.props = props;
      _this.context = context;
      return _this;
    }
    Object.defineProperty(MyReactReactiveInstance.prototype, "isMyReactReactive", {
      get: function () {
        return true;
      },
      enumerable: false,
      configurable: true,
    });
    MyReactReactiveInstance.prototype._createSetupState = function (setup, render) {
      var _a = this,
        props = _a.props,
        context = _a.context;
      this.setup = setup;
      this.staticRender = render;
      var data = (setup === null || setup === void 0 ? void 0 : setup(props, context)) || {};
      this.state = proxyRefs(data);
    };
    MyReactReactiveInstance.prototype._createEffectUpdate = function (scheduler) {
      var _this = this;
      this.effect = new ReactiveEffect(function () {
        var render = _this.staticRender
          ? _this.staticRender
          : typeof _this.props.children === "function"
          ? _this.props.children
          : function () {
              return null;
            };
        return render(_this.state, _this.props, _this.context);
      }, scheduler);
    };
    MyReactReactiveInstance.prototype._unmount = function () {
      _super.prototype._unmount.call(this);
      this.effect.stop();
      this.unmountedHooks.forEach(function (f) {
        return f === null || f === void 0 ? void 0 : f();
      });
    };
    return MyReactReactiveInstance;
  })(MyReactInternalInstance);

  var version = "0.0.5";

  exports.MyReactReactiveInstance = MyReactReactiveInstance;
  exports.ReactiveEffect = ReactiveEffect;
  exports.computed = computed;
  exports.createReactive = createReactive;
  exports.currentReactiveInstance = currentReactiveInstance;
  exports.effect = effect;
  exports.enableTracking = enableTracking;
  exports.enableTrigger = enableTrigger;
  exports.isProxy = isProxy;
  exports.isReactive = isReactive;
  exports.isReadonly = isReadonly;
  exports.isRef = isRef;
  exports.isShallow = isShallow;
  exports.markRaw = markRaw;
  exports.onBeforeMount = onBeforeMount;
  exports.onBeforeUnmount = onBeforeUnmount;
  exports.onBeforeUpdate = onBeforeUpdate;
  exports.onMounted = onMounted;
  exports.onUnmounted = onUnmounted;
  exports.onUpdated = onUpdated;
  exports.pauseTracking = pauseTracking;
  exports.pauseTrigger = pauseTrigger;
  exports.proxyRefs = proxyRefs;
  exports.reactive = reactive;
  exports.readonly = readonly;
  exports.ref = ref;
  exports.resetTracking = resetTracking;
  exports.resetTrigger = resetTrigger;
  exports.shallowReactive = shallowReactive;
  exports.shallowReadonly = shallowReadonly;
  exports.shouldTrackRef = shouldTrackRef;
  exports.shouldTriggerRef = shouldTriggerRef;
  exports.toRaw = toRaw;
  exports.toReactive = toReactive;
  exports.toReadonly = toReadonly;
  exports.toRef = toRef;
  exports.toRefs = toRefs;
  exports.version = version;
  exports.watch = watch;
});
