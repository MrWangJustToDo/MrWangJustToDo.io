(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined"
    ? factory(exports)
    : typeof define === "function" && define.amd
    ? define(["exports"], factory)
    : ((global = typeof globalThis !== "undefined" ? globalThis : global || self), factory((global.React = {})));
})(this, function (exports) {
  "use strict";

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

  var createRef = function (value) {
    return { current: value };
  };

  var globalLoop = createRef(false);
  var currentRunningFiber = createRef(null);
  var currentComponentFiber = createRef(null);
  var currentFunctionFiber = createRef(null);
  var currentHookDeepIndex = createRef(0);
  // ==== feature ==== //
  var enableDebugLog = createRef(false);
  var enableConcurrentMode = createRef(true);
  var enableKeyDiff = createRef(true);
  // support "unsafe_" lifecycle
  var enableLegacyLifeCycle = createRef(true);
  // enable react-18 strict lifecycle method
  var enableStrictLifeCycle = createRef(false);

  function isValidElement(element) {
    return (
      typeof element === "object" &&
      !Array.isArray(element) &&
      (element === null || element === void 0 ? void 0 : element[myreactSharedExports.TYPEKEY]) === myreactSharedExports.Element
    );
  }
  var checkValidKey = function (children) {
    var obj = {};
    var fiber = currentRunningFiber.current;
    var onceWarnDuplicate = myreactSharedExports.once(fiber === null || fiber === void 0 ? void 0 : fiber.root.renderPlatform.log);
    var onceWarnUndefined = myreactSharedExports.once(fiber === null || fiber === void 0 ? void 0 : fiber.root.renderPlatform.log);
    var validElement = children.filter(function (c) {
      return isValidElement(c);
    });
    if (validElement.length > 1) {
      validElement.forEach(function (c) {
        if (!c._store["validKey"]) {
          if (typeof c.key === "string") {
            if (obj[c.key]) {
              onceWarnDuplicate({ message: "array child have duplicate key" });
            }
            obj[c.key] = true;
          } else {
            onceWarnUndefined({
              message: "each array child must have a unique key props",
              triggerOnce: true,
            });
          }
          c._store["validKey"] = true;
        }
      });
    }
  };
  var checkArrayChildrenKey = function (children) {
    children.forEach(function (child) {
      if (Array.isArray(child)) {
        checkValidKey(child);
      } else {
        if (isValidElement(child)) child._store["validKey"] = true;
      }
    });
  };
  var checkSingleChildrenKey = function (children) {
    if (Array.isArray(children)) {
      checkValidKey(children);
    } else {
      if (isValidElement(children)) children._store["validKey"] = true;
    }
  };

  var MyReactInternalInstance = /** @class */ (function () {
    function MyReactInternalInstance() {
      this.mode = myreactSharedExports.Effect_TYPE.__initial__;
      this.context = null;
      this._contextFiber = null;
      this._ownerFiber = null;
    }
    Object.defineProperty(MyReactInternalInstance.prototype, "isMyReactInstance", {
      get: function () {
        return true;
      },
      enumerable: false,
      configurable: true,
    });
    MyReactInternalInstance.prototype._setContext = function (fiber) {
      var _a, _b;
      (_a = this._contextFiber) === null || _a === void 0 ? void 0 : _a._removeDependence(this);
      this._contextFiber = fiber;
      (_b = this._contextFiber) === null || _b === void 0 ? void 0 : _b._addDependence(this);
    };
    MyReactInternalInstance.prototype._setOwner = function (fiber) {
      this._ownerFiber = fiber;
    };
    MyReactInternalInstance.prototype._unmount = function () {
      var _a;
      this.mode = myreactSharedExports.Effect_TYPE.__initial__;
      (_a = this._contextFiber) === null || _a === void 0 ? void 0 : _a._removeDependence(this);
      this._ownerFiber = null;
      this._contextFiber = null;
    };
    return MyReactInternalInstance;
  })();

  var _a;
  var contextId = 0;
  var defaultObject = ((_a = {}), (_a[myreactSharedExports.TYPEKEY] = myreactSharedExports.Context), (_a.contextId = 0), _a);
  var createContext = function (value) {
    var _a, _b, _c;
    var ContextObject =
      ((_a = {}), (_a[myreactSharedExports.TYPEKEY] = myreactSharedExports.Context), (_a.contextId = contextId++), (_a.Provider = {}), (_a.Consumer = {}), _a);
    var ProviderObject = ((_b = {}), (_b[myreactSharedExports.TYPEKEY] = myreactSharedExports.Provider), (_b.value = value), (_b.Context = defaultObject), _b);
    var ConsumerObject =
      ((_c = {}),
      (_c[myreactSharedExports.TYPEKEY] = myreactSharedExports.Consumer),
      (_c.Internal = MyReactInternalInstance),
      (_c.Context = defaultObject),
      _c);
    Object.defineProperty(ProviderObject, "Context", {
      get: function () {
        return ContextObject;
      },
      enumerable: false,
      configurable: false,
    });
    Object.defineProperty(ConsumerObject, "Context", {
      get: function () {
        return ContextObject;
      },
      enumerable: false,
      configurable: false,
    });
    ContextObject.Provider = ProviderObject;
    ContextObject.Consumer = ConsumerObject;
    return ContextObject;
  };
  var forwardRef = function (render) {
    var _a;
    return (_a = {}), (_a[myreactSharedExports.TYPEKEY] = myreactSharedExports.ForwardRef), (_a.render = render), _a;
  };
  var memo = function (render) {
    var _a;
    return (_a = {}), (_a[myreactSharedExports.TYPEKEY] = myreactSharedExports.Memo), (_a.render = render), _a;
  };
  var lazy = function (loader) {
    var _a;
    return (
      (_a = {}),
      (_a[myreactSharedExports.TYPEKEY] = myreactSharedExports.Lazy),
      (_a.loader = loader),
      (_a._loading = false),
      (_a._loaded = false),
      (_a.render = null),
      _a
    );
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

  function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
      }
    return t;
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

  /* eslint-disable prefer-rest-params */
  var createMyReactElement = function (_a) {
    var _b;
    var type = _a.type,
      key = _a.key,
      ref = _a.ref,
      props = _a.props,
      _self = _a._self,
      _source = _a._source,
      _owner = _a._owner;
    var element =
      ((_b = {}),
      (_b[myreactSharedExports.TYPEKEY] = myreactSharedExports.Element),
      (_b.type = type),
      (_b.key = key),
      (_b.ref = ref),
      (_b.props = props),
      (_b._owner = _owner),
      (_b._self = _self),
      (_b._source = _source),
      (_b._store = {}),
      _b);
    if (typeof Object.freeze === "function") {
      Object.freeze(element.props);
      Object.freeze(element);
    }
    return element;
  };
  function createElement(type, config) {
    var children = [];
    for (var _i = 2; _i < arguments.length; _i++) {
      children[_i - 2] = arguments[_i];
    }
    var key = null;
    var ref = null;
    var self = null;
    var source = null;
    var props = {};
    if (config !== null && config !== undefined) {
      var _ref = config.ref,
        _key = config.key,
        __self = config.__self,
        __source = config.__source,
        resProps_1 = __rest(config, ["ref", "key", "__self", "__source"]);
      ref = _ref === undefined ? null : _ref;
      key = _key === undefined ? null : _key + "";
      self = __self === undefined ? null : __self;
      source = __source === undefined ? null : __source;
      Object.keys(resProps_1).forEach(function (key) {
        return (props[key] = resProps_1[key]);
      });
    }
    if (typeof type === "function" || typeof type === "object") {
      var typedType_1 = type;
      Object.keys((typedType_1 === null || typedType_1 === void 0 ? void 0 : typedType_1.defaultProps) || {}).forEach(function (key) {
        var _a;
        props[key] = props[key] === undefined ? ((_a = typedType_1.defaultProps) === null || _a === void 0 ? void 0 : _a[key]) : props[key];
      });
    }
    // const childrenLength = arguments.length - 2;
    var childrenLength = children.length;
    if (childrenLength > 1) {
      // children = Array.from(arguments).slice(2);
      {
        checkArrayChildrenKey(children);
      }
      props.children = children;
    } else if (childrenLength === 1) {
      {
        checkSingleChildrenKey(children[0]);
      }
      props.children = children[0];
    }
    return createMyReactElement({
      type: type,
      key: key,
      ref: ref,
      props: props,
      _self: self,
      _source: source,
      _owner: currentComponentFiber.current,
    });
  }
  function cloneElement(element, config, children) {
    if (element === null || element === undefined) {
      throw new Error("cloneElement(...) need a valid element as params");
    }
    // from react source code
    element = element;
    var props = Object.assign({}, element.props);
    var key = element.key;
    var ref = element.ref;
    var type = element.type;
    var self = element._self;
    var source = element._source;
    var owner = element._owner;
    if (config !== null && config !== undefined) {
      var _ref = config.ref,
        _key = config.key;
      config.__self;
      config.__source;
      var resProps = __rest(config, ["ref", "key", "__self", "__source"]);
      if (_ref !== undefined) {
        ref = _ref;
        owner = currentComponentFiber.current;
      }
      if (_key !== undefined) {
        key = _key + "";
      }
      var defaultProps = {};
      if (typeof element.type === "function" || typeof element.type === "object") {
        var typedType = element.type;
        defaultProps = typedType === null || typedType === void 0 ? void 0 : typedType.defaultProps;
      }
      for (var key_1 in resProps) {
        if (Object.prototype.hasOwnProperty.call(resProps, key_1)) {
          if (resProps[key_1] === undefined && defaultProps) {
            props[key_1] = defaultProps[key_1];
          } else {
            props[key_1] = resProps[key_1];
          }
        }
      }
    }
    var childrenLength = arguments.length - 2;
    if (childrenLength > 1) {
      children = Array.from(arguments).slice(2);
      {
        checkArrayChildrenKey(children);
      }
      props.children = children;
    } else if (childrenLength === 1) {
      {
        checkSingleChildrenKey(children);
      }
      props.children = children;
    }
    var clonedElement = createMyReactElement({
      type: type,
      key: key,
      ref: ref,
      props: props,
      _self: self,
      _source: source,
      _owner: owner,
    });
    clonedElement._store["clonedEle"] = true;
    return clonedElement;
  }

  var flatten = function (children) {
    if (Array.isArray(children)) {
      return children.reduce(function (p, c) {
        return p.concat(flatten(c));
      }, []);
    }
    return [children];
  };
  var mapByJudge = function (arrayLike, judge, action) {
    var arrayChildren = flatten(arrayLike);
    return arrayChildren.map(function (v, index) {
      if (judge(v)) {
        return action.call(null, v, index, arrayChildren);
      } else {
        return v;
      }
    });
  };

  var map = function (arrayLike, action) {
    return mapByJudge(
      arrayLike,
      function (v) {
        return v !== undefined && v !== null;
      },
      action,
    );
  };
  var toArray = function (arrayLike) {
    return map(arrayLike, function (element, index) {
      return cloneElement(element, {
        key: typeof (element === null || element === void 0 ? void 0 : element.key) === "string" ? ".$".concat(element.key) : ".".concat(index),
      });
    });
  };
  var forEach = function (arrayLike, action) {
    mapByJudge(
      arrayLike,
      function (v) {
        return v !== undefined && v !== null;
      },
      action,
    );
  };
  var count = function (arrayLike) {
    if (Array.isArray(arrayLike)) {
      return arrayLike.reduce(function (p, c) {
        return p + count(c);
      }, 0);
    }
    return 1;
  };
  var only = function (child) {
    if (isValidElement(child)) return child;
    if (typeof child === "string" || typeof child === "number" || typeof child === "boolean") return true;
    throw new Error("Children.only() expected to receive a single MyReact element child.");
  };

  var MyReactComponent = /** @class */ (function (_super) {
    __extends(MyReactComponent, _super);
    function MyReactComponent(props, context) {
      var _this = _super.call(this) || this;
      _this.state = null;
      _this.props = null;
      _this.context = null;
      // for queue update
      _this._result = {
        newState: null,
        isForce: false,
        callback: [],
      };
      _this.setState = function (payLoad, callback) {
        var updater = {
          type: "component",
          payLoad: payLoad,
          callback: callback,
          trigger: _this,
        };
        var ownerFiber = _this._ownerFiber;
        if (ownerFiber && ownerFiber.isMounted) {
          var renderPlatform = ownerFiber.root.renderPlatform;
          var renderDispatch_1 = ownerFiber.root.renderDispatch;
          ownerFiber.updateQueue.push(updater);
          renderPlatform.microTask(function () {
            return renderDispatch_1.processClassComponentQueue(ownerFiber);
          });
        }
      };
      _this.forceUpdate = function () {
        var updater = {
          type: "component",
          isForce: true,
          trigger: _this,
        };
        var ownerFiber = _this._ownerFiber;
        if (ownerFiber && ownerFiber.isMounted) {
          var renderPlatform = ownerFiber.root.renderPlatform;
          var renderDispatch_2 = ownerFiber.root.renderDispatch;
          ownerFiber.updateQueue.push(updater);
          renderPlatform.microTask(function () {
            return renderDispatch_2.processClassComponentQueue(ownerFiber);
          });
        }
      };
      _this.props = props || null;
      _this.context = context || null;
      return _this;
    }
    Object.defineProperty(MyReactComponent.prototype, "isReactComponent", {
      get: function () {
        return true;
      },
      enumerable: false,
      configurable: true,
    });
    Object.defineProperty(MyReactComponent.prototype, "isMyReactComponent", {
      get: function () {
        return true;
      },
      enumerable: false,
      configurable: true,
    });
    MyReactComponent.prototype.render = function () {
      return null;
    };
    MyReactComponent.prototype._unmount = function () {
      var _a;
      _super.prototype._unmount.call(this);
      var instance = this;
      (_a = instance.componentWillUnmount) === null || _a === void 0 ? void 0 : _a.call(instance);
    };
    return MyReactComponent;
  })(MyReactInternalInstance);
  var MyReactPureComponent = /** @class */ (function (_super) {
    __extends(MyReactPureComponent, _super);
    function MyReactPureComponent() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    // for original react render, there are not a context judge for `shouldComponentUpdate` function
    MyReactPureComponent.prototype.shouldComponentUpdate = function (nextProps, nextState, nextContext) {
      return (
        !myreactSharedExports.isNormalEquals(nextProps, this.props) ||
        !myreactSharedExports.isNormalEquals(nextState, this.state) ||
        !myreactSharedExports.isNormalEquals(nextContext, this.context)
      );
    };
    return MyReactPureComponent;
  })(MyReactComponent);

  var emptyObj = {};
  var MyReactFiberNode = /** @class */ (function () {
    function MyReactFiberNode(parent) {
      this.isMounted = true;
      this.isInvoked = false;
      this.node = null;
      this.ref = null;
      this.children = [];
      this.return = null;
      this.child = null;
      this.parent = null;
      this.sibling = null;
      this.instance = null;
      this.dependence = new Set();
      this.hookNodes = [];
      this.elementType = null;
      this.type = 0;
      this.patch = myreactSharedExports.PATCH_TYPE.__initial__;
      this.mode = myreactSharedExports.UPDATE_TYPE.__initial__;
      this.updateQueue = new myreactSharedExports.ListTree();
      this.pendingProps = emptyObj;
      this.memoizedProps = null;
      this.root = (parent === null || parent === void 0 ? void 0 : parent.root) || this;
      this._installParent(parent);
    }
    MyReactFiberNode.prototype._addChild = function (child) {
      var last = this.children[this.children.length - 1];
      if (last) {
        last.sibling = child;
      } else {
        this.child = child;
      }
      this.children.push(child);
    };
    MyReactFiberNode.prototype._installParent = function (parent) {
      var _a;
      this.parent = parent;
      this.sibling = null;
      (_a = this.parent) === null || _a === void 0 ? void 0 : _a._addChild(this);
    };
    MyReactFiberNode.prototype._addDependence = function (node) {
      this.dependence.add(node);
    };
    MyReactFiberNode.prototype._removeDependence = function (node) {
      this.dependence.delete(node);
    };
    MyReactFiberNode.prototype._beforeUpdate = function () {
      this.child = null;
      this.children = [];
      this.return = null;
    };
    // current fiber call .update() function
    MyReactFiberNode.prototype._triggerUpdate = function () {
      this.mode |= myreactSharedExports.UPDATE_TYPE.__triggerUpdate__;
    };
    // parent fiber update, then child need update too
    MyReactFiberNode.prototype._prepareUpdate = function () {
      this.mode |= myreactSharedExports.UPDATE_TYPE.__inheritUpdate__;
    };
    MyReactFiberNode.prototype._afterUpdate = function () {
      this.mode = myreactSharedExports.UPDATE_TYPE.__initial__;
    };
    MyReactFiberNode.prototype._installElement = function (element) {
      this.element = element;
      this._initialPops();
    };
    MyReactFiberNode.prototype._initialPops = function () {
      var element = this.element;
      if (typeof element === "object" && element !== null) {
        this.pendingProps = Object.assign({}, element.props);
        this.ref = element.ref;
        this.elementType = element.type;
      } else {
        this.pendingProps = {};
      }
    };
    MyReactFiberNode.prototype._addHook = function (hookNode) {
      this.hookNodes.push(hookNode);
    };
    MyReactFiberNode.prototype._applyProps = function () {
      this.memoizedProps = this.pendingProps;
    };
    MyReactFiberNode.prototype._installInstance = function (instance) {
      this.instance = instance;
    };
    // force update current fiber and loop to the end
    MyReactFiberNode.prototype._update = function () {
      if (!this.isMounted) return;
      this.root.renderDispatch.triggerUpdate(this);
    };
    MyReactFiberNode.prototype._error = function (error) {
      if (!this.isMounted) return;
      this.root.renderDispatch.triggerError(this, error);
    };
    MyReactFiberNode.prototype._unmount = function () {
      if (!this.isMounted) return;
      this.hookNodes.forEach(function (h) {
        return h._unmount();
      });
      this.instance && this.instance._unmount();
      this.mode = myreactSharedExports.UPDATE_TYPE.__initial__;
      this.patch = myreactSharedExports.PATCH_TYPE.__initial__;
    };
    return MyReactFiberNode;
  })();

  var MyReactHookNode = /** @class */ (function (_super) {
    __extends(MyReactHookNode, _super);
    function MyReactHookNode(hookIndex, hookType, value, reducer, deps) {
      var _this = _super.call(this) || this;
      _this.hookIndex = 0;
      _this.cancel = null;
      _this.effect = false;
      _this.value = null;
      _this.deps = [];
      _this.result = null;
      _this._dispatch = function (action) {
        var updater = {
          type: "hook",
          trigger: _this,
          payLoad: action,
        };
        var ownerFiber = _this._ownerFiber;
        if (ownerFiber && ownerFiber.isMounted) {
          var renderPlatform = ownerFiber.root.renderPlatform;
          var renderDispatch_1 = ownerFiber.root.renderDispatch;
          ownerFiber.updateQueue.push(updater);
          renderPlatform.microTask(function () {
            return renderDispatch_1.processFunctionComponentQueue(ownerFiber);
          });
        }
      };
      _this.deps = deps;
      _this.value = value;
      _this.reducer = reducer;
      _this.hookType = hookType;
      _this.hookIndex = hookIndex;
      return _this;
    }
    Object.defineProperty(MyReactHookNode.prototype, "isMyReactHook", {
      get: function () {
        return true;
      },
      enumerable: false,
      configurable: true,
    });
    MyReactHookNode.prototype._unmount = function () {
      _super.prototype._unmount.call(this);
      this.effect = false;
      this.cancel && this.cancel();
    };
    return MyReactHookNode;
  })(MyReactInternalInstance);

  var emptyDeps = [];
  var useState = function (initial) {
    var currentFiber = currentFunctionFiber.current;
    if (!currentFiber) throw new Error("can not use hook outside of component");
    var renderDispatch = currentFiber.root.renderDispatch;
    var currentIndex = currentHookDeepIndex.current++;
    return renderDispatch.resolveHookNode(currentFiber, {
      hookIndex: currentIndex,
      hookType: myreactSharedExports.HOOK_TYPE.useState,
      value:
        typeof initial === "function"
          ? initial
          : function () {
              return initial;
            },
      reducer: null,
      deps: emptyDeps,
    });
  };
  var useEffect = function (action, deps) {
    var currentFiber = currentFunctionFiber.current;
    if (!currentFiber) throw new Error("can not use hook outside of component");
    var renderDispatch = currentFiber.root.renderDispatch;
    var currentIndex = currentHookDeepIndex.current++;
    return renderDispatch.resolveHookNode(currentFiber, {
      hookIndex: currentIndex,
      hookType: myreactSharedExports.HOOK_TYPE.useEffect,
      value: action,
      reducer: null,
      deps: deps,
    });
  };
  var useLayoutEffect = function (action, deps) {
    var currentFiber = currentFunctionFiber.current;
    if (!currentFiber) throw new Error("can not use hook outside of component");
    var renderDispatch = currentFiber.root.renderDispatch;
    var currentIndex = currentHookDeepIndex.current++;
    return renderDispatch.resolveHookNode(currentFiber, {
      hookIndex: currentIndex,
      hookType: myreactSharedExports.HOOK_TYPE.useLayoutEffect,
      value: action,
      reducer: null,
      deps: deps,
    });
  };
  var useCallback = function (callback, deps) {
    var currentFiber = currentFunctionFiber.current;
    if (!currentFiber) throw new Error("can not use hook outside of component");
    var renderDispatch = currentFiber.root.renderDispatch;
    var currentIndex = currentHookDeepIndex.current++;
    return renderDispatch.resolveHookNode(currentFiber, {
      hookIndex: currentIndex,
      hookType: myreactSharedExports.HOOK_TYPE.useCallback,
      value: callback,
      reducer: null,
      deps: deps,
    });
  };
  var useMemo = function (action, deps) {
    var currentFiber = currentFunctionFiber.current;
    if (!currentFiber) throw new Error("can not use hook outside of component");
    var renderDispatch = currentFiber.root.renderDispatch;
    var currentIndex = currentHookDeepIndex.current++;
    return renderDispatch.resolveHookNode(currentFiber, {
      hookIndex: currentIndex,
      hookType: myreactSharedExports.HOOK_TYPE.useMemo,
      value: action,
      reducer: null,
      deps: deps,
    });
  };
  var useRef = function (value) {
    var currentFiber = currentFunctionFiber.current;
    if (!currentFiber) throw new Error("can not use hook outside of component");
    var renderDispatch = currentFiber.root.renderDispatch;
    var currentIndex = currentHookDeepIndex.current++;
    return renderDispatch.resolveHookNode(currentFiber, {
      hookIndex: currentIndex,
      hookType: myreactSharedExports.HOOK_TYPE.useRef,
      value: createRef(value),
      reducer: null,
      deps: emptyDeps,
    });
  };
  var useContext = function (Context) {
    var currentFiber = currentFunctionFiber.current;
    if (!currentFiber) throw new Error("can not use hook outside of component");
    var renderDispatch = currentFiber.root.renderDispatch;
    var currentIndex = currentHookDeepIndex.current++;
    return renderDispatch.resolveHookNode(currentFiber, {
      hookIndex: currentIndex,
      hookType: myreactSharedExports.HOOK_TYPE.useContext,
      value: Context,
      reducer: null,
      deps: emptyDeps,
    });
  };
  var useReducer = function (reducer, initialArgs, init) {
    var currentFiber = currentFunctionFiber.current;
    if (!currentFiber) throw new Error("can not use hook outside of component");
    var renderDispatch = currentFiber.root.renderDispatch;
    var currentIndex = currentHookDeepIndex.current++;
    return renderDispatch.resolveHookNode(currentFiber, {
      hookIndex: currentIndex,
      hookType: myreactSharedExports.HOOK_TYPE.useReducer,
      value:
        typeof init === "function"
          ? function () {
              return init(initialArgs);
            }
          : function () {
              return initialArgs;
            },
      reducer: reducer,
      deps: emptyDeps,
    });
  };
  var useImperativeHandle = function (ref, createHandle, deps) {
    var currentFiber = currentFunctionFiber.current;
    if (!currentFiber) throw new Error("can not use hook outside of component");
    var renderDispatch = currentFiber.root.renderDispatch;
    var currentIndex = currentHookDeepIndex.current++;
    return renderDispatch.resolveHookNode(currentFiber, {
      hookIndex: currentIndex,
      hookType: myreactSharedExports.HOOK_TYPE.useImperativeHandle,
      value: ref,
      reducer: createHandle,
      deps: deps,
    });
  };
  var useSignal = function (initial) {
    var currentFiber = currentFunctionFiber.current;
    if (!currentFiber) throw new Error("can not use hook outside of component");
    var renderDispatch = currentFiber.root.renderDispatch;
    var currentIndex = currentHookDeepIndex.current++;
    return renderDispatch.resolveHookNode(currentFiber, {
      hookIndex: currentIndex,
      hookType: myreactSharedExports.HOOK_TYPE.useSignal,
      value:
        typeof initial === "function"
          ? initial
          : function () {
              return initial;
            },
      reducer: null,
      deps: emptyDeps,
    });
  };
  var useDebugValue = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    var currentFiber = currentFunctionFiber.current;
    if (!currentFiber) throw new Error("can not use hook outside of component");
    var renderPlatform = currentFiber.root.renderPlatform;
    if (enableDebugLog.current) {
      console.log.apply(console, __spreadArray(__spreadArray(["[debug]: "], args, false), [renderPlatform.getFiberTree(currentFiber)], false));
    }
  };

  var Component = MyReactComponent;
  var PureComponent = MyReactPureComponent;
  var version = "0.1.2";
  var __my_react_shared__ = {
    enableKeyDiff: enableKeyDiff,
    enableDebugLog: enableDebugLog,
    enableConcurrentMode: enableConcurrentMode,
    enableLegacyLifeCycle: enableLegacyLifeCycle,
    enableStrictLifeCycle: enableStrictLifeCycle,
  };
  var __my_react_internal__ = {
    MyReactHookNode: MyReactHookNode,
    MyReactComponent: MyReactComponent,
    MyReactFiberNode: MyReactFiberNode,
    MyReactInternalInstance: MyReactInternalInstance,
    globalLoop: globalLoop,
    currentRunningFiber: currentRunningFiber,
    currentHookDeepIndex: currentHookDeepIndex,
    currentFunctionFiber: currentFunctionFiber,
    currentComponentFiber: currentComponentFiber,
  };
  var Children = {
    map: map,
    only: only,
    count: count,
    toArray: toArray,
    forEach: forEach,
  };

  exports.Children = Children;
  exports.Component = Component;
  exports.Fragment = myreactSharedExports.Fragment;
  exports.PureComponent = PureComponent;
  exports.StrictMode = myreactSharedExports.Strict;
  exports.Suspense = myreactSharedExports.Suspense;
  exports.__my_react_internal__ = __my_react_internal__;
  exports.__my_react_shared__ = __my_react_shared__;
  exports.cloneElement = cloneElement;
  exports.createContext = createContext;
  exports.createElement = createElement;
  exports.createRef = createRef;
  exports.forwardRef = forwardRef;
  exports.isValidElement = isValidElement;
  exports.lazy = lazy;
  exports.memo = memo;
  exports.useCallback = useCallback;
  exports.useContext = useContext;
  exports.useDebugValue = useDebugValue;
  exports.useEffect = useEffect;
  exports.useImperativeHandle = useImperativeHandle;
  exports.useLayoutEffect = useLayoutEffect;
  exports.useMemo = useMemo;
  exports.useReducer = useReducer;
  exports.useRef = useRef;
  exports.useSignal = useSignal;
  exports.useState = useState;
  exports.version = version;
});
