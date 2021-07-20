(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createPlugin = createPlugin;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

function b64DecodeUnicode(str) {
  return decodeURIComponent(atob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0 };

  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}

function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {var _getCurrentUserInfo =


    getCurrentUserInfo(),role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {var _getCurrentUserInfo2 =


    getCurrentUserInfo(),permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {var _getCurrentUserInfo3 =


    getCurrentUserInfo(),tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse || !wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_NAME":"resident","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function initScopedSlotsParams() {
  var center = {};
  var parents = {};

  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
    return has;
  };

  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
  };

  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      var object = center[vueId] = center[vueId] || {};
      object[name] = value;
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    }
  };

  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    } });

}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {args[_key7] = arguments[_key7];}
      appOptions.onShow.apply(vm, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {args[_key8] = arguments[_key8];}
      appOptions.onHide.apply(vm, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(vm, args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 10:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 11:
/*!*********************************************!*\
  !*** D:/git/doctor/final/uview-ui/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _mixin = _interopRequireDefault(__webpack_require__(/*! ./libs/mixin/mixin.js */ 12));



var _request = _interopRequireDefault(__webpack_require__(/*! ./libs/request */ 13));




















var _queryParams = _interopRequireDefault(__webpack_require__(/*! ./libs/function/queryParams.js */ 17));

var _route = _interopRequireDefault(__webpack_require__(/*! ./libs/function/route.js */ 18));

var _timeFormat = _interopRequireDefault(__webpack_require__(/*! ./libs/function/timeFormat.js */ 22));

var _timeFrom = _interopRequireDefault(__webpack_require__(/*! ./libs/function/timeFrom.js */ 23));

var _colorGradient = _interopRequireDefault(__webpack_require__(/*! ./libs/function/colorGradient.js */ 24));

var _guid = _interopRequireDefault(__webpack_require__(/*! ./libs/function/guid.js */ 25));

var _color = _interopRequireDefault(__webpack_require__(/*! ./libs/function/color.js */ 26));

var _type2icon = _interopRequireDefault(__webpack_require__(/*! ./libs/function/type2icon.js */ 27));

var _randomArray = _interopRequireDefault(__webpack_require__(/*! ./libs/function/randomArray.js */ 28));

var _deepClone = _interopRequireDefault(__webpack_require__(/*! ./libs/function/deepClone.js */ 15));

var _deepMerge = _interopRequireDefault(__webpack_require__(/*! ./libs/function/deepMerge.js */ 14));

var _addUnit = _interopRequireDefault(__webpack_require__(/*! ./libs/function/addUnit.js */ 29));


var _test = _interopRequireDefault(__webpack_require__(/*! ./libs/function/test.js */ 16));

var _random = _interopRequireDefault(__webpack_require__(/*! ./libs/function/random.js */ 30));

var _trim = _interopRequireDefault(__webpack_require__(/*! ./libs/function/trim.js */ 31));

var _toast = _interopRequireDefault(__webpack_require__(/*! ./libs/function/toast.js */ 32));

var _getParent = _interopRequireDefault(__webpack_require__(/*! ./libs/function/getParent.js */ 33));

var _$parent = _interopRequireDefault(__webpack_require__(/*! ./libs/function/$parent.js */ 34));



var _sys = __webpack_require__(/*! ./libs/function/sys.js */ 35);

var _debounce = _interopRequireDefault(__webpack_require__(/*! ./libs/function/debounce.js */ 36));

var _throttle = _interopRequireDefault(__webpack_require__(/*! ./libs/function/throttle.js */ 37));



var _config = _interopRequireDefault(__webpack_require__(/*! ./libs/config/config.js */ 38));

var _zIndex = _interopRequireDefault(__webpack_require__(/*! ./libs/config/zIndex.js */ 39));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // 引入全局mixin
// 引入关于是否mixin集成小程序分享的配置
// import wxshare from './libs/mixin/mpShare.js'
// 全局挂载引入http相关请求拦截插件
function wranning(str) {// 开发环境进行信息输出,主要是一些报错信息
  // 这个环境的来由是在程序编写时候,点击hx编辑器运行调试代码的时候,详见:
  // 	https://uniapp.dcloud.io/frame?id=%e5%bc%80%e5%8f%91%e7%8e%af%e5%a2%83%e5%92%8c%e7%94%9f%e4%ba%a7%e7%8e%af%e5%a2%83
  if (true) {console.warn(str);}} // 尝试判断在根目录的/store中是否有$u.mixin.js，此文件uView默认为需要挂在到全局的vuex的state变量
// HX2.6.11版本,放到try中,控制台依然会警告,暂时不用此方式，
// let vuexStore = {};
// try {
// 	vuexStore = require("@/store/$u.mixin.js");
// } catch (e) {
// 	//TODO handle the exception
// }
// post类型对象参数转为get类型url参数
var $u = { queryParams: _queryParams.default, route: _route.default, timeFormat: _timeFormat.default, date: _timeFormat.default, // 另名date
  timeFrom: _timeFrom.default, colorGradient: _colorGradient.default.colorGradient, colorToRgba: _colorGradient.default.colorToRgba, guid: _guid.default, color: _color.default, sys: _sys.sys, os: _sys.os, type2icon: _type2icon.default, randomArray: _randomArray.default, wranning: wranning, get: _request.default.get,
  post: _request.default.post,
  put: _request.default.put,
  'delete': _request.default.delete,
  hexToRgb: _colorGradient.default.hexToRgb,
  rgbToHex: _colorGradient.default.rgbToHex,
  test: _test.default,
  random: _random.default,
  deepClone: _deepClone.default,
  deepMerge: _deepMerge.default,
  getParent: _getParent.default,
  $parent: _$parent.default,
  addUnit: _addUnit.default,
  trim: _trim.default,
  type: ['primary', 'success', 'error', 'warning', 'info'],
  http: _request.default,
  toast: _toast.default,
  config: _config.default, // uView配置信息相关，比如版本号
  zIndex: _zIndex.default,
  debounce: _debounce.default,
  throttle: _throttle.default };


// $u挂载到uni对象上
uni.$u = $u;

var install = function install(Vue) {
  Vue.mixin(_mixin.default);
  if (Vue.prototype.openShare) {
    Vue.mixin(mpShare);
  }
  // Vue.mixin(vuexStore);
  // 时间格式化，同时两个名称，date和timeFormat
  Vue.filter('timeFormat', function (timestamp, format) {
    return (0, _timeFormat.default)(timestamp, format);
  });
  Vue.filter('date', function (timestamp, format) {
    return (0, _timeFormat.default)(timestamp, format);
  });
  // 将多久以前的方法，注入到全局过滤器
  Vue.filter('timeFrom', function (timestamp, format) {
    return (0, _timeFrom.default)(timestamp, format);
  });
  Vue.prototype.$u = $u;
};var _default =

{
  install: install };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 12:
/*!********************************************************!*\
  !*** D:/git/doctor/final/uview-ui/libs/mixin/mixin.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {module.exports = {
  data: function data() {
    return {};
  },
  onLoad: function onLoad() {
    // getRect挂载到$u上，因为这方法需要使用in(this)，所以无法把它独立成一个单独的文件导出
    this.$u.getRect = this.$uGetRect;
  },
  methods: {
    // 查询节点信息
    // 目前此方法在支付宝小程序中无法获取组件跟接点的尺寸，为支付宝的bug(2020-07-21)
    // 解决办法为在组件根部再套一个没有任何作用的view元素
    $uGetRect: function $uGetRect(selector, all) {var _this = this;
      return new Promise(function (resolve) {
        uni.createSelectorQuery().
        in(_this)[all ? 'selectAll' : 'select'](selector).
        boundingClientRect(function (rect) {
          if (all && Array.isArray(rect) && rect.length) {
            resolve(rect);
          }
          if (!all && rect) {
            resolve(rect);
          }
        }).
        exec();
      });
    },
    getParentData: function getParentData() {var _this2 = this;var parentName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      // 避免在created中去定义parent变量
      if (!this.parent) this.parent = false;
      // 这里的本质原理是，通过获取父组件实例(也即u-radio-group的this)
      // 将父组件this中对应的参数，赋值给本组件(u-radio的this)的parentData对象中对应的属性
      // 之所以需要这么做，是因为所有端中，头条小程序不支持通过this.parent.xxx去监听父组件参数的变化
      this.parent = this.$u.$parent.call(this, parentName);
      if (this.parent) {
        // 历遍parentData中的属性，将parent中的同名属性赋值给parentData
        Object.keys(this.parentData).map(function (key) {
          _this2.parentData[key] = _this2.parent[key];
        });
      }
    },
    // 阻止事件冒泡
    preventEvent: function preventEvent(e) {
      e && e.stopPropagation && e.stopPropagation();
    } },

  onReachBottom: function onReachBottom() {
    uni.$emit('uOnReachBottom');
  },
  beforeDestroy: function beforeDestroy() {var _this3 = this;
    // 判断当前页面是否存在parent和chldren，一般在checkbox和checkbox-group父子联动的场景会有此情况
    // 组件销毁时，移除子组件在父组件children数组中的实例，释放资源，避免数据混乱
    if (this.parent && uni.$u.test.array(this.parent.children)) {
      // 组件销毁时，移除父组件中的children数组中对应的实例
      var childrenList = this.parent.children;
      childrenList.map(function (child, index) {
        // 如果相等，则移除
        if (child === _this3) {
          childrenList.splice(index, 1);
        }
      });
    }
  } };
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 13:
/*!**********************************************************!*\
  !*** D:/git/doctor/final/uview-ui/libs/request/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _deepMerge = _interopRequireDefault(__webpack_require__(/*! ../function/deepMerge */ 14));
var _test = _interopRequireDefault(__webpack_require__(/*! ../function/test */ 16));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var
Request = /*#__PURE__*/function () {_createClass(Request, [{ key: "setConfig",
    // 设置全局默认配置
    value: function setConfig(customConfig) {
      // 深度合并对象，否则会造成对象深层属性丢失
      this.config = (0, _deepMerge.default)(this.config, customConfig);
    }

    // 主要请求部分
  }, { key: "request", value: function request() {var _this = this;var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      // 检查请求拦截
      if (this.interceptor.request && typeof this.interceptor.request === 'function') {
        var tmpConfig = {};
        var interceptorRequest = this.interceptor.request(options);
        if (interceptorRequest === false) {
          // 返回一个处于pending状态中的Promise，来取消原promise，避免进入then()回调
          return new Promise(function () {});
        }
        this.options = interceptorRequest;
      }
      options.dataType = options.dataType || this.config.dataType;
      options.responseType = options.responseType || this.config.responseType;
      options.url = options.url || '';
      options.params = options.params || {};
      options.header = Object.assign({}, this.config.header, options.header);
      options.method = options.method || this.config.method;

      return new Promise(function (resolve, reject) {
        options.complete = function (response) {
          // 请求返回后，隐藏loading(如果请求返回快的话，可能会没有loading)
          uni.hideLoading();
          // 清除定时器，如果请求回来了，就无需loading
          clearTimeout(_this.config.timer);
          _this.config.timer = null;
          // 判断用户对拦截返回数据的要求，如果originalData为true，返回所有的数据(response)到拦截器，否则只返回response.data
          if (_this.config.originalData) {
            // 判断是否存在拦截器
            if (_this.interceptor.response && typeof _this.interceptor.response === 'function') {
              var resInterceptors = _this.interceptor.response(response);
              // 如果拦截器不返回false，就将拦截器返回的内容给this.$u.post的then回调
              if (resInterceptors !== false) {
                resolve(resInterceptors);
              } else {
                // 如果拦截器返回false，意味着拦截器定义者认为返回有问题，直接接入catch回调
                reject(response);
              }
            } else {
              // 如果要求返回原始数据，就算没有拦截器，也返回最原始的数据
              resolve(response);
            }
          } else {
            if (response.statusCode == 200) {
              if (_this.interceptor.response && typeof _this.interceptor.response === 'function') {
                var _resInterceptors = _this.interceptor.response(response.data);
                if (_resInterceptors !== false) {
                  resolve(_resInterceptors);
                } else {
                  reject(response.data);
                }
              } else {
                // 如果不是返回原始数据(originalData=false)，且没有拦截器的情况下，返回纯数据给then回调
                resolve(response.data);
              }
            } else {
              // 不返回原始数据的情况下，服务器状态码不为200，modal弹框提示
              // if(response.errMsg) {
              // 	uni.showModal({
              // 		title: response.errMsg
              // 	});
              // }
              reject(response);
            }
          }
        };

        // 判断用户传递的URL是否/开头,如果不是,加上/，这里使用了uView的test.js验证库的url()方法
        options.url = _test.default.url(options.url) ? options.url : _this.config.baseUrl + (options.url.indexOf('/') == 0 ?
        options.url : '/' + options.url);

        // 是否显示loading
        // 加一个是否已有timer定时器的判断，否则有两个同时请求的时候，后者会清除前者的定时器id
        // 而没有清除前者的定时器，导致前者超时，一直显示loading
        if (_this.config.showLoading && !_this.config.timer) {
          _this.config.timer = setTimeout(function () {
            uni.showLoading({
              title: _this.config.loadingText,
              mask: _this.config.loadingMask });

            _this.config.timer = null;
          }, _this.config.loadingTime);
        }
        uni.request(options);
      });
      // .catch(res => {
      // 	// 如果返回reject()，不让其进入this.$u.post().then().catch()后面的catct()
      // 	// 因为很多人都会忘了写后面的catch()，导致报错捕获不到catch
      // 	return new Promise(()=>{});
      // })
    } }]);

  function Request() {var _this2 = this;_classCallCheck(this, Request);
    this.config = {
      baseUrl: '', // 请求的根域名
      // 默认的请求头
      header: {},
      method: 'POST',
      // 设置为json，返回后uni.request会对数据进行一次JSON.parse
      dataType: 'json',
      // 此参数无需处理，因为5+和支付宝小程序不支持，默认为text即可
      responseType: 'text',
      showLoading: true, // 是否显示请求中的loading
      loadingText: '请求中...',
      loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
      timer: null, // 定时器
      originalData: false, // 是否在拦截器中返回服务端的原始数据，见文档说明
      loadingMask: true // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
    };

    // 拦截器
    this.interceptor = {
      // 请求前的拦截
      request: null,
      // 请求后的拦截
      response: null };


    // get请求
    this.get = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        method: 'GET',
        url: url,
        header: header,
        data: data });

    };

    // post请求
    this.post = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'POST',
        header: header,
        data: data });

    };

    // put请求，不支持支付宝小程序(HX2.6.15)
    this.put = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'PUT',
        header: header,
        data: data });

    };

    // delete请求，不支持支付宝和头条小程序(HX2.6.15)
    this.delete = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'DELETE',
        header: header,
        data: data });

    };
  }return Request;}();var _default =

new Request();exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 14:
/*!***************************************************************!*\
  !*** D:/git/doctor/final/uview-ui/libs/function/deepMerge.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _deepClone = _interopRequireDefault(__webpack_require__(/*! ./deepClone */ 15));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// JS对象深度合并
function deepMerge() {var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  target = (0, _deepClone.default)(target);
  if (typeof target !== 'object' || typeof source !== 'object') return false;
  for (var prop in source) {
    if (!source.hasOwnProperty(prop)) continue;
    if (prop in target) {
      if (typeof target[prop] !== 'object') {
        target[prop] = source[prop];
      } else {
        if (typeof source[prop] !== 'object') {
          target[prop] = source[prop];
        } else {
          if (target[prop].concat && source[prop].concat) {
            target[prop] = target[prop].concat(source[prop]);
          } else {
            target[prop] = deepMerge(target[prop], source[prop]);
          }
        }
      }
    } else {
      target[prop] = source[prop];
    }
  }
  return target;
}var _default =

deepMerge;exports.default = _default;

/***/ }),

/***/ 15:
/*!***************************************************************!*\
  !*** D:/git/doctor/final/uview-ui/libs/function/deepClone.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
}

// 深度克隆
function deepClone(obj) {
  // 对常见的“非”值，直接返回原来值
  if ([null, undefined, NaN, false].includes(obj)) return obj;
  if (typeof obj !== "object" && typeof obj !== 'function') {
    //原始类型直接返回
    return obj;
  }
  var o = isArray(obj) ? [] : {};
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i];
    }
  }
  return o;
}var _default =

deepClone;exports.default = _default;

/***/ }),

/***/ 16:
/*!**********************************************************!*\
  !*** D:/git/doctor/final/uview-ui/libs/function/test.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 验证电子邮箱格式
                                                                                                      */
function email(value) {
  return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value);
}

/**
   * 验证手机格式
   */
function mobile(value) {
  return /^1[23456789]\d{9}$/.test(value);
}

/**
   * 验证URL格式
   */
function url(value) {
  return /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/.test(value);
}

/**
   * 验证日期格式
   */
function date(value) {
  return !/Invalid|NaN/.test(new Date(value).toString());
}

/**
   * 验证ISO类型的日期格式
   */
function dateISO(value) {
  return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
}

/**
   * 验证十进制数字
   */
function number(value) {
  return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
}

/**
   * 验证整数
   */
function digits(value) {
  return /^\d+$/.test(value);
}

/**
   * 验证身份证号码
   */
function idCard(value) {
  return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
  value);
}

/**
   * 是否车牌号
   */
function carNo(value) {
  // 新能源车牌
  var xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
  // 旧车牌
  var creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
  if (value.length === 7) {
    return creg.test(value);
  } else if (value.length === 8) {
    return xreg.test(value);
  } else {
    return false;
  }
}

/**
   * 金额,只允许2位小数
   */
function amount(value) {
  //金额，只允许保留两位小数
  return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value);
}

/**
   * 中文
   */
function chinese(value) {
  var reg = /^[\u4e00-\u9fa5]+$/gi;
  return reg.test(value);
}

/**
   * 只能输入字母
   */
function letter(value) {
  return /^[a-zA-Z]*$/.test(value);
}

/**
   * 只能是字母或者数字
   */
function enOrNum(value) {
  //英文或者数字
  var reg = /^[0-9a-zA-Z]*$/g;
  return reg.test(value);
}

/**
   * 验证是否包含某个值
   */
function contains(value, param) {
  return value.indexOf(param) >= 0;
}

/**
   * 验证一个值范围[min, max]
   */
function range(value, param) {
  return value >= param[0] && value <= param[1];
}

/**
   * 验证一个长度范围[min, max]
   */
function rangeLength(value, param) {
  return value.length >= param[0] && value.length <= param[1];
}

/**
   * 是否固定电话
   */
function landline(value) {
  var reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
  return reg.test(value);
}

/**
   * 判断是否为空
   */
function empty(value) {
  switch (typeof value) {
    case 'undefined':
      return true;
    case 'string':
      if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true;
      break;
    case 'boolean':
      if (!value) return true;
      break;
    case 'number':
      if (0 === value || isNaN(value)) return true;
      break;
    case 'object':
      if (null === value || value.length === 0) return true;
      for (var i in value) {
        return false;
      }
      return true;}

  return false;
}

/**
   * 是否json字符串
   */
function jsonString(value) {
  if (typeof value == 'string') {
    try {
      var obj = JSON.parse(value);
      if (typeof obj == 'object' && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
  return false;
}


/**
   * 是否数组
   */
function array(value) {
  if (typeof Array.isArray === "function") {
    return Array.isArray(value);
  } else {
    return Object.prototype.toString.call(value) === "[object Array]";
  }
}

/**
   * 是否对象
   */
function object(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
}

/**
   * 是否短信验证码
   */
function code(value) {var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6;
  return new RegExp("^\\d{".concat(len, "}$")).test(value);
}var _default =


{
  email: email,
  mobile: mobile,
  url: url,
  date: date,
  dateISO: dateISO,
  number: number,
  digits: digits,
  idCard: idCard,
  carNo: carNo,
  amount: amount,
  chinese: chinese,
  letter: letter,
  enOrNum: enOrNum,
  contains: contains,
  range: range,
  rangeLength: rangeLength,
  empty: empty,
  isEmpty: empty,
  jsonString: jsonString,
  landline: landline,
  object: object,
  array: array,
  code: code };exports.default = _default;

/***/ }),

/***/ 17:
/*!*****************************************************************!*\
  !*** D:/git/doctor/final/uview-ui/libs/function/queryParams.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 对象转url参数
                                                                                                      * @param {*} data,对象
                                                                                                      * @param {*} isPrefix,是否自动加上"?"
                                                                                                      */
function queryParams() {var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var isPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var arrayFormat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'brackets';
  var prefix = isPrefix ? '?' : '';
  var _result = [];
  if (['indices', 'brackets', 'repeat', 'comma'].indexOf(arrayFormat) == -1) arrayFormat = 'brackets';var _loop = function _loop(
  key) {
    var value = data[key];
    // 去掉为空的参数
    if (['', undefined, null].indexOf(value) >= 0) {
      return "continue";
    }
    // 如果值为数组，另行处理
    if (value.constructor === Array) {
      // e.g. {ids: [1, 2, 3]}
      switch (arrayFormat) {
        case 'indices':
          // 结果: ids[0]=1&ids[1]=2&ids[2]=3
          for (var i = 0; i < value.length; i++) {
            _result.push(key + '[' + i + ']=' + value[i]);
          }
          break;
        case 'brackets':
          // 结果: ids[]=1&ids[]=2&ids[]=3
          value.forEach(function (_value) {
            _result.push(key + '[]=' + _value);
          });
          break;
        case 'repeat':
          // 结果: ids=1&ids=2&ids=3
          value.forEach(function (_value) {
            _result.push(key + '=' + _value);
          });
          break;
        case 'comma':
          // 结果: ids=1,2,3
          var commaStr = "";
          value.forEach(function (_value) {
            commaStr += (commaStr ? "," : "") + _value;
          });
          _result.push(key + '=' + commaStr);
          break;
        default:
          value.forEach(function (_value) {
            _result.push(key + '[]=' + _value);
          });}

    } else {
      _result.push(key + '=' + value);
    }};for (var key in data) {var _ret = _loop(key);if (_ret === "continue") continue;
  }
  return _result.length ? prefix + _result.join('&') : '';
}var _default =

queryParams;exports.default = _default;

/***/ }),

/***/ 18:
/*!***********************************************************!*\
  !*** D:/git/doctor/final/uview-ui/libs/function/route.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 19));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;} /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 路由跳转方法，该方法相对于直接使用uni.xxx的好处是使用更加简单快捷
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 并且带有路由拦截功能
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */var

Router = /*#__PURE__*/function () {
  function Router() {_classCallCheck(this, Router);
    // 原始属性定义
    this.config = {
      type: 'navigateTo',
      url: '',
      delta: 1, // navigateBack页面后退时,回退的层数
      params: {}, // 传递的参数
      animationType: 'pop-in', // 窗口动画,只在APP有效
      animationDuration: 300, // 窗口动画持续时间,单位毫秒,只在APP有效
      intercept: false // 是否需要拦截
    };
    // 因为route方法是需要对外赋值给另外的对象使用，同时route内部有使用this，会导致route失去上下文
    // 这里在构造函数中进行this绑定
    this.route = this.route.bind(this);
  }

  // 判断url前面是否有"/"，如果没有则加上，否则无法跳转
  _createClass(Router, [{ key: "addRootPath", value: function addRootPath(url) {
      return url[0] === '/' ? url : "/".concat(url);
    }

    // 整合路由参数
  }, { key: "mixinParam", value: function mixinParam(url, params) {
      url = url && this.addRootPath(url);

      // 使用正则匹配，主要依据是判断是否有"/","?","="等，如“/page/index/index?name=mary"
      // 如果有url中有get参数，转换后无需带上"?"
      var query = '';
      if (/.*\/.*\?.*=.*/.test(url)) {
        // object对象转为get类型的参数
        query = uni.$u.queryParams(params, false);
        // 因为已有get参数,所以后面拼接的参数需要带上"&"隔开
        return url += "&" + query;
      } else {
        // 直接拼接参数，因为此处url中没有后面的query参数，也就没有"?/&"之类的符号
        query = uni.$u.queryParams(params);
        return url += query;
      }
    }

    // 对外的方法名称
  }, { key: "route", value: function () {var _route = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var options,params,mergeConfig,isNext,_args = arguments;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:options = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};params = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
                // 合并用户的配置和内部的默认配置
                mergeConfig = {};

                if (typeof options === 'string') {
                  // 如果options为字符串，则为route(url, params)的形式
                  mergeConfig.url = this.mixinParam(options, params);
                  mergeConfig.type = 'navigateTo';
                } else {
                  mergeConfig = uni.$u.deepClone(options, this.config);
                  // 否则正常使用mergeConfig中的url和params进行拼接
                  mergeConfig.url = this.mixinParam(options.url, options.params);
                }

                if (params.intercept) {
                  this.config.intercept = params.intercept;
                }
                // params参数也带给拦截器
                mergeConfig.params = params;
                // 合并内外部参数
                mergeConfig = uni.$u.deepMerge(this.config, mergeConfig);
                // 判断用户是否定义了拦截器
                if (!(typeof uni.$u.routeIntercept === 'function')) {_context.next = 14;break;}_context.next = 10;return (

                  new Promise(function (resolve, reject) {
                    uni.$u.routeIntercept(mergeConfig, resolve);
                  }));case 10:isNext = _context.sent;
                // 如果isNext为true，则执行路由跳转
                isNext && this.openPage(mergeConfig);_context.next = 15;break;case 14:

                this.openPage(mergeConfig);case 15:case "end":return _context.stop();}}}, _callee, this);}));function route() {return _route.apply(this, arguments);}return route;}()



    // 执行路由跳转
  }, { key: "openPage", value: function openPage(config) {
      // 解构参数
      var
      url =




      config.url,type = config.type,delta = config.delta,animationType = config.animationType,animationDuration = config.animationDuration;
      if (config.type == 'navigateTo' || config.type == 'to') {
        uni.navigateTo({
          url: url,
          animationType: animationType,
          animationDuration: animationDuration });

      }
      if (config.type == 'redirectTo' || config.type == 'redirect') {
        uni.redirectTo({
          url: url });

      }
      if (config.type == 'switchTab' || config.type == 'tab') {
        uni.switchTab({
          url: url });

      }
      if (config.type == 'reLaunch' || config.type == 'launch') {
        uni.reLaunch({
          url: url });

      }
      if (config.type == 'navigateBack' || config.type == 'back') {
        uni.navigateBack({
          delta: delta });

      }
    } }]);return Router;}();var _default =


new Router().route;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 19:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 20);

/***/ }),

/***/ 192:
/*!*********************************************************!*\
  !*** D:/git/doctor/final/uview-ui/libs/util/emitter.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 递归使用 call 方式this指向
                                                                                                      * @param componentName // 需要找的组件的名称
                                                                                                      * @param eventName // 事件名称
                                                                                                      * @param params // 需要传递的参数
                                                                                                      */
function _broadcast(componentName, eventName, params) {
  // 循环子节点找到名称一样的子节点 否则 递归 当前子节点
  this.$children.map(function (child) {
    if (componentName === child.$options.name) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      _broadcast.apply(child, [componentName, eventName].concat(params));
    }
  });
}var _default =
{
  methods: {
    /**
              * 派发 (向上查找) (一个)
              * @param componentName // 需要找的组件的名称
              * @param eventName // 事件名称
              * @param params // 需要传递的参数
              */
    dispatch: function dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root; //$parent 找到最近的父节点 $root 根节点
      var name = parent.$options.name; // 获取当前组件实例的name
      // 如果当前有节点 && 当前没名称 且 当前名称等于需要传进来的名称的时候就去查找当前的节点
      // 循环出当前名称的一样的组件实例
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;
        if (parent) {
          name = parent.$options.name;
        }
      }
      // 有节点表示当前找到了name一样的实例
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    /**
        * 广播 (向下查找) (广播多个)
        * @param componentName // 需要找的组件的名称
        * @param eventName // 事件名称
        * @param params // 需要传递的参数
        */
    broadcast: function broadcast(componentName, eventName, params) {
      _broadcast.call(this, componentName, eventName, params);
    } } };exports.default = _default;

/***/ }),

/***/ 193:
/*!*****************************************************************!*\
  !*** D:/git/doctor/final/uview-ui/libs/util/async-validator.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

/* eslint no-console:0 */
var formatRegExp = /%[sdj%]/g;
var warning = function warning() {}; // don't print warning message when in production env or node runtime

if (typeof process !== 'undefined' && Object({"VUE_APP_NAME":"resident","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}) && "development" !== 'production' && typeof window !==
'undefined' && typeof document !== 'undefined') {
  warning = function warning(type, errors) {
    if (typeof console !== 'undefined' && console.warn) {
      if (errors.every(function (e) {
        return typeof e === 'string';
      })) {
        console.warn(type, errors);
      }
    }
  };
}

function convertFieldsError(errors) {
  if (!errors || !errors.length) return null;
  var fields = {};
  errors.forEach(function (error) {
    var field = error.field;
    fields[field] = fields[field] || [];
    fields[field].push(error);
  });
  return fields;
}

function format() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var i = 1;
  var f = args[0];
  var len = args.length;

  if (typeof f === 'function') {
    return f.apply(null, args.slice(1));
  }

  if (typeof f === 'string') {
    var str = String(f).replace(formatRegExp, function (x) {
      if (x === '%%') {
        return '%';
      }

      if (i >= len) {
        return x;
      }

      switch (x) {
        case '%s':
          return String(args[i++]);

        case '%d':
          return Number(args[i++]);

        case '%j':
          try {
            return JSON.stringify(args[i++]);
          } catch (_) {
            return '[Circular]';
          }

          break;

        default:
          return x;}

    });

    for (var arg = args[i]; i < len; arg = args[++i]) {
      str += " " + arg;
    }

    return str;
  }

  return f;
}

function isNativeStringType(type) {
  return type === 'string' || type === 'url' || type === 'hex' || type === 'email' || type === 'pattern';
}

function isEmptyValue(value, type) {
  if (value === undefined || value === null) {
    return true;
  }

  if (type === 'array' && Array.isArray(value) && !value.length) {
    return true;
  }

  if (isNativeStringType(type) && typeof value === 'string' && !value) {
    return true;
  }

  return false;
}

function asyncParallelArray(arr, func, callback) {
  var results = [];
  var total = 0;
  var arrLength = arr.length;

  function count(errors) {
    results.push.apply(results, errors);
    total++;

    if (total === arrLength) {
      callback(results);
    }
  }

  arr.forEach(function (a) {
    func(a, count);
  });
}

function asyncSerialArray(arr, func, callback) {
  var index = 0;
  var arrLength = arr.length;

  function next(errors) {
    if (errors && errors.length) {
      callback(errors);
      return;
    }

    var original = index;
    index = index + 1;

    if (original < arrLength) {
      func(arr[original], next);
    } else {
      callback([]);
    }
  }

  next([]);
}

function flattenObjArr(objArr) {
  var ret = [];
  Object.keys(objArr).forEach(function (k) {
    ret.push.apply(ret, objArr[k]);
  });
  return ret;
}

function asyncMap(objArr, option, func, callback) {
  if (option.first) {
    var _pending = new Promise(function (resolve, reject) {
      var next = function next(errors) {
        callback(errors);
        return errors.length ? reject({
          errors: errors,
          fields: convertFieldsError(errors) }) :
        resolve();
      };

      var flattenArr = flattenObjArr(objArr);
      asyncSerialArray(flattenArr, func, next);
    });

    _pending["catch"](function (e) {
      return e;
    });

    return _pending;
  }

  var firstFields = option.firstFields || [];

  if (firstFields === true) {
    firstFields = Object.keys(objArr);
  }

  var objArrKeys = Object.keys(objArr);
  var objArrLength = objArrKeys.length;
  var total = 0;
  var results = [];
  var pending = new Promise(function (resolve, reject) {
    var next = function next(errors) {
      results.push.apply(results, errors);
      total++;

      if (total === objArrLength) {
        callback(results);
        return results.length ? reject({
          errors: results,
          fields: convertFieldsError(results) }) :
        resolve();
      }
    };

    if (!objArrKeys.length) {
      callback(results);
      resolve();
    }

    objArrKeys.forEach(function (key) {
      var arr = objArr[key];

      if (firstFields.indexOf(key) !== -1) {
        asyncSerialArray(arr, func, next);
      } else {
        asyncParallelArray(arr, func, next);
      }
    });
  });
  pending["catch"](function (e) {
    return e;
  });
  return pending;
}

function complementError(rule) {
  return function (oe) {
    if (oe && oe.message) {
      oe.field = oe.field || rule.fullField;
      return oe;
    }

    return {
      message: typeof oe === 'function' ? oe() : oe,
      field: oe.field || rule.fullField };

  };
}

function deepMerge(target, source) {
  if (source) {
    for (var s in source) {
      if (source.hasOwnProperty(s)) {
        var value = source[s];

        if (typeof value === 'object' && typeof target[s] === 'object') {
          target[s] = _extends({}, target[s], {}, value);
        } else {
          target[s] = value;
        }
      }
    }
  }

  return target;
}

/**
   *  Rule for validating required fields.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param source The source object being validated.
   *  @param errors An array of errors that this rule may add
   *  validation errors to.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function required(rule, value, source, errors, options, type) {
  if (rule.required && (!source.hasOwnProperty(rule.field) || isEmptyValue(value, type || rule.type))) {
    errors.push(format(options.messages.required, rule.fullField));
  }
}

/**
   *  Rule for validating whitespace.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param source The source object being validated.
   *  @param errors An array of errors that this rule may add
   *  validation errors to.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function whitespace(rule, value, source, errors, options) {
  if (/^\s+$/.test(value) || value === '') {
    errors.push(format(options.messages.whitespace, rule.fullField));
  }
}

/* eslint max-len:0 */

var pattern = {
  // http://emailregex.com/
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  url: new RegExp(
  "^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$",
  'i'),
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i };

var types = {
  integer: function integer(value) {
    return types.number(value) && parseInt(value, 10) === value;
  },
  "float": function _float(value) {
    return types.number(value) && !types.integer(value);
  },
  array: function array(value) {
    return Array.isArray(value);
  },
  regexp: function regexp(value) {
    if (value instanceof RegExp) {
      return true;
    }

    try {
      return !!new RegExp(value);
    } catch (e) {
      return false;
    }
  },
  date: function date(value) {
    return typeof value.getTime === 'function' && typeof value.getMonth === 'function' && typeof value.getYear ===
    'function';
  },
  number: function number(value) {
    if (isNaN(value)) {
      return false;
    }

    // 修改源码，将字符串数值先转为数值
    return typeof +value === 'number';
  },
  object: function object(value) {
    return typeof value === 'object' && !types.array(value);
  },
  method: function method(value) {
    return typeof value === 'function';
  },
  email: function email(value) {
    return typeof value === 'string' && !!value.match(pattern.email) && value.length < 255;
  },
  url: function url(value) {
    return typeof value === 'string' && !!value.match(pattern.url);
  },
  hex: function hex(value) {
    return typeof value === 'string' && !!value.match(pattern.hex);
  } };

/**
        *  Rule for validating the type of a value.
        *
        *  @param rule The validation rule.
        *  @param value The value of the field on the source object.
        *  @param source The source object being validated.
        *  @param errors An array of errors that this rule may add
        *  validation errors to.
        *  @param options The validation options.
        *  @param options.messages The validation messages.
        */

function type(rule, value, source, errors, options) {
  if (rule.required && value === undefined) {
    required(rule, value, source, errors, options);
    return;
  }

  var custom = ['integer', 'float', 'array', 'regexp', 'object', 'method', 'email', 'number', 'date', 'url', 'hex'];
  var ruleType = rule.type;

  if (custom.indexOf(ruleType) > -1) {
    if (!types[ruleType](value)) {
      errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
    } // straight typeof check

  } else if (ruleType && typeof value !== rule.type) {
    errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
  }
}

/**
   *  Rule for validating minimum and maximum allowed values.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param source The source object being validated.
   *  @param errors An array of errors that this rule may add
   *  validation errors to.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function range(rule, value, source, errors, options) {
  var len = typeof rule.len === 'number';
  var min = typeof rule.min === 'number';
  var max = typeof rule.max === 'number'; // 正则匹配码点范围从U+010000一直到U+10FFFF的文字（补充平面Supplementary Plane）

  var spRegexp = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
  var val = value;
  var key = null;
  var num = typeof value === 'number';
  var str = typeof value === 'string';
  var arr = Array.isArray(value);

  if (num) {
    key = 'number';
  } else if (str) {
    key = 'string';
  } else if (arr) {
    key = 'array';
  } // if the value is not of a supported type for range validation
  // the validation rule rule should use the
  // type property to also test for a particular type


  if (!key) {
    return false;
  }

  if (arr) {
    val = value.length;
  }

  if (str) {
    // 处理码点大于U+010000的文字length属性不准确的bug，如"𠮷𠮷𠮷".lenght !== 3
    val = value.replace(spRegexp, '_').length;
  }

  if (len) {
    if (val !== rule.len) {
      errors.push(format(options.messages[key].len, rule.fullField, rule.len));
    }
  } else if (min && !max && val < rule.min) {
    errors.push(format(options.messages[key].min, rule.fullField, rule.min));
  } else if (max && !min && val > rule.max) {
    errors.push(format(options.messages[key].max, rule.fullField, rule.max));
  } else if (min && max && (val < rule.min || val > rule.max)) {
    errors.push(format(options.messages[key].range, rule.fullField, rule.min, rule.max));
  }
}

var ENUM = 'enum';
/**
                    *  Rule for validating a value exists in an enumerable list.
                    *
                    *  @param rule The validation rule.
                    *  @param value The value of the field on the source object.
                    *  @param source The source object being validated.
                    *  @param errors An array of errors that this rule may add
                    *  validation errors to.
                    *  @param options The validation options.
                    *  @param options.messages The validation messages.
                    */

function enumerable(rule, value, source, errors, options) {
  rule[ENUM] = Array.isArray(rule[ENUM]) ? rule[ENUM] : [];

  if (rule[ENUM].indexOf(value) === -1) {
    errors.push(format(options.messages[ENUM], rule.fullField, rule[ENUM].join(', ')));
  }
}

/**
   *  Rule for validating a regular expression pattern.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param source The source object being validated.
   *  @param errors An array of errors that this rule may add
   *  validation errors to.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function pattern$1(rule, value, source, errors, options) {
  if (rule.pattern) {
    if (rule.pattern instanceof RegExp) {
      // if a RegExp instance is passed, reset `lastIndex` in case its `global`
      // flag is accidentally set to `true`, which in a validation scenario
      // is not necessary and the result might be misleading
      rule.pattern.lastIndex = 0;

      if (!rule.pattern.test(value)) {
        errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
      }
    } else if (typeof rule.pattern === 'string') {
      var _pattern = new RegExp(rule.pattern);

      if (!_pattern.test(value)) {
        errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
      }
    }
  }
}

var rules = {
  required: required,
  whitespace: whitespace,
  type: type,
  range: range,
  "enum": enumerable,
  pattern: pattern$1 };


/**
                         *  Performs validation for string types.
                         *
                         *  @param rule The validation rule.
                         *  @param value The value of the field on the source object.
                         *  @param callback The callback function.
                         *  @param source The source object being validated.
                         *  @param options The validation options.
                         *  @param options.messages The validation messages.
                         */

function string(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value, 'string') && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options, 'string');

    if (!isEmptyValue(value, 'string')) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
      rules.pattern(rule, value, source, errors, options);

      if (rule.whitespace === true) {
        rules.whitespace(rule, value, source, errors, options);
      }
    }
  }

  callback(errors);
}

/**
   *  Validates a function.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function method(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates a number.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function number(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (value === '') {
      value = undefined;
    }

    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates a boolean.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function _boolean(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates the regular expression type.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function regexp(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (!isEmptyValue(value)) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates a number is an integer.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function integer(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates a number is a floating point number.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function floatFn(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates an array.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function array(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value, 'array') && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options, 'array');

    if (!isEmptyValue(value, 'array')) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates an object.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function object(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

var ENUM$1 = 'enum';
/**
                      *  Validates an enumerable list.
                      *
                      *  @param rule The validation rule.
                      *  @param value The value of the field on the source object.
                      *  @param callback The callback function.
                      *  @param source The source object being validated.
                      *  @param options The validation options.
                      *  @param options.messages The validation messages.
                      */

function enumerable$1(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules[ENUM$1](rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates a regular expression pattern.
   *
   *  Performs validation when a rule only contains
   *  a pattern property but is not declared as a string type.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function pattern$2(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value, 'string') && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (!isEmptyValue(value, 'string')) {
      rules.pattern(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

function date(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (!isEmptyValue(value)) {
      var dateObject;

      if (typeof value === 'number') {
        dateObject = new Date(value);
      } else {
        dateObject = value;
      }

      rules.type(rule, dateObject, source, errors, options);

      if (dateObject) {
        rules.range(rule, dateObject.getTime(), source, errors, options);
      }
    }
  }

  callback(errors);
}

function required$1(rule, value, callback, source, options) {
  var errors = [];
  var type = Array.isArray(value) ? 'array' : typeof value;
  rules.required(rule, value, source, errors, options, type);
  callback(errors);
}

function type$1(rule, value, callback, source, options) {
  var ruleType = rule.type;
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value, ruleType) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options, ruleType);

    if (!isEmptyValue(value, ruleType)) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Performs validation for any type.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function any(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);
  }

  callback(errors);
}

var validators = {
  string: string,
  method: method,
  number: number,
  "boolean": _boolean,
  regexp: regexp,
  integer: integer,
  "float": floatFn,
  array: array,
  object: object,
  "enum": enumerable$1,
  pattern: pattern$2,
  date: date,
  url: type$1,
  hex: type$1,
  email: type$1,
  required: required$1,
  any: any };


function newMessages() {
  return {
    "default": 'Validation error on field %s',
    required: '%s is required',
    "enum": '%s must be one of %s',
    whitespace: '%s cannot be empty',
    date: {
      format: '%s date %s is invalid for format %s',
      parse: '%s date could not be parsed, %s is invalid ',
      invalid: '%s date %s is invalid' },

    types: {
      string: '%s is not a %s',
      method: '%s is not a %s (function)',
      array: '%s is not an %s',
      object: '%s is not an %s',
      number: '%s is not a %s',
      date: '%s is not a %s',
      "boolean": '%s is not a %s',
      integer: '%s is not an %s',
      "float": '%s is not a %s',
      regexp: '%s is not a valid %s',
      email: '%s is not a valid %s',
      url: '%s is not a valid %s',
      hex: '%s is not a valid %s' },

    string: {
      len: '%s must be exactly %s characters',
      min: '%s must be at least %s characters',
      max: '%s cannot be longer than %s characters',
      range: '%s must be between %s and %s characters' },

    number: {
      len: '%s must equal %s',
      min: '%s cannot be less than %s',
      max: '%s cannot be greater than %s',
      range: '%s must be between %s and %s' },

    array: {
      len: '%s must be exactly %s in length',
      min: '%s cannot be less than %s in length',
      max: '%s cannot be greater than %s in length',
      range: '%s must be between %s and %s in length' },

    pattern: {
      mismatch: '%s value %s does not match pattern %s' },

    clone: function clone() {
      var cloned = JSON.parse(JSON.stringify(this));
      cloned.clone = this.clone;
      return cloned;
    } };

}
var messages = newMessages();

/**
                               *  Encapsulates a validation schema.
                               *
                               *  @param descriptor An object declaring validation rules
                               *  for this schema.
                               */

function Schema(descriptor) {
  this.rules = null;
  this._messages = messages;
  this.define(descriptor);
}

Schema.prototype = {
  messages: function messages(_messages) {
    if (_messages) {
      this._messages = deepMerge(newMessages(), _messages);
    }

    return this._messages;
  },
  define: function define(rules) {
    if (!rules) {
      throw new Error('Cannot configure a schema with no rules');
    }

    if (typeof rules !== 'object' || Array.isArray(rules)) {
      throw new Error('Rules must be an object');
    }

    this.rules = {};
    var z;
    var item;

    for (z in rules) {
      if (rules.hasOwnProperty(z)) {
        item = rules[z];
        this.rules[z] = Array.isArray(item) ? item : [item];
      }
    }
  },
  validate: function validate(source_, o, oc) {
    var _this = this;

    if (o === void 0) {
      o = {};
    }

    if (oc === void 0) {
      oc = function oc() {};
    }

    var source = source_;
    var options = o;
    var callback = oc;

    if (typeof options === 'function') {
      callback = options;
      options = {};
    }

    if (!this.rules || Object.keys(this.rules).length === 0) {
      if (callback) {
        callback();
      }

      return Promise.resolve();
    }

    function complete(results) {
      var i;
      var errors = [];
      var fields = {};

      function add(e) {
        if (Array.isArray(e)) {
          var _errors;

          errors = (_errors = errors).concat.apply(_errors, e);
        } else {
          errors.push(e);
        }
      }

      for (i = 0; i < results.length; i++) {
        add(results[i]);
      }

      if (!errors.length) {
        errors = null;
        fields = null;
      } else {
        fields = convertFieldsError(errors);
      }

      callback(errors, fields);
    }

    if (options.messages) {
      var messages$1 = this.messages();

      if (messages$1 === messages) {
        messages$1 = newMessages();
      }

      deepMerge(messages$1, options.messages);
      options.messages = messages$1;
    } else {
      options.messages = this.messages();
    }

    var arr;
    var value;
    var series = {};
    var keys = options.keys || Object.keys(this.rules);
    keys.forEach(function (z) {
      arr = _this.rules[z];
      value = source[z];
      arr.forEach(function (r) {
        var rule = r;

        if (typeof rule.transform === 'function') {
          if (source === source_) {
            source = _extends({}, source);
          }

          value = source[z] = rule.transform(value);
        }

        if (typeof rule === 'function') {
          rule = {
            validator: rule };

        } else {
          rule = _extends({}, rule);
        }

        rule.validator = _this.getValidationMethod(rule);
        rule.field = z;
        rule.fullField = rule.fullField || z;
        rule.type = _this.getType(rule);

        if (!rule.validator) {
          return;
        }

        series[z] = series[z] || [];
        series[z].push({
          rule: rule,
          value: value,
          source: source,
          field: z });

      });
    });
    var errorFields = {};
    return asyncMap(series, options, function (data, doIt) {
      var rule = data.rule;
      var deep = (rule.type === 'object' || rule.type === 'array') && (typeof rule.fields === 'object' || typeof rule.defaultField ===
      'object');
      deep = deep && (rule.required || !rule.required && data.value);
      rule.field = data.field;

      function addFullfield(key, schema) {
        return _extends({}, schema, {
          fullField: rule.fullField + "." + key });

      }

      function cb(e) {
        if (e === void 0) {
          e = [];
        }

        var errors = e;

        if (!Array.isArray(errors)) {
          errors = [errors];
        }

        if (!options.suppressWarning && errors.length) {
          Schema.warning('async-validator:', errors);
        }

        if (errors.length && rule.message) {
          errors = [].concat(rule.message);
        }

        errors = errors.map(complementError(rule));

        if (options.first && errors.length) {
          errorFields[rule.field] = 1;
          return doIt(errors);
        }

        if (!deep) {
          doIt(errors);
        } else {
          // if rule is required but the target object
          // does not exist fail at the rule level and don't
          // go deeper
          if (rule.required && !data.value) {
            if (rule.message) {
              errors = [].concat(rule.message).map(complementError(rule));
            } else if (options.error) {
              errors = [options.error(rule, format(options.messages.required, rule.field))];
            } else {
              errors = [];
            }

            return doIt(errors);
          }

          var fieldsSchema = {};

          if (rule.defaultField) {
            for (var k in data.value) {
              if (data.value.hasOwnProperty(k)) {
                fieldsSchema[k] = rule.defaultField;
              }
            }
          }

          fieldsSchema = _extends({}, fieldsSchema, {}, data.rule.fields);

          for (var f in fieldsSchema) {
            if (fieldsSchema.hasOwnProperty(f)) {
              var fieldSchema = Array.isArray(fieldsSchema[f]) ? fieldsSchema[f] : [fieldsSchema[f]];
              fieldsSchema[f] = fieldSchema.map(addFullfield.bind(null, f));
            }
          }

          var schema = new Schema(fieldsSchema);
          schema.messages(options.messages);

          if (data.rule.options) {
            data.rule.options.messages = options.messages;
            data.rule.options.error = options.error;
          }

          schema.validate(data.value, data.rule.options || options, function (errs) {
            var finalErrors = [];

            if (errors && errors.length) {
              finalErrors.push.apply(finalErrors, errors);
            }

            if (errs && errs.length) {
              finalErrors.push.apply(finalErrors, errs);
            }

            doIt(finalErrors.length ? finalErrors : null);
          });
        }
      }

      var res;

      if (rule.asyncValidator) {
        res = rule.asyncValidator(rule, data.value, cb, data.source, options);
      } else if (rule.validator) {
        res = rule.validator(rule, data.value, cb, data.source, options);

        if (res === true) {
          cb();
        } else if (res === false) {
          cb(rule.message || rule.field + " fails");
        } else if (res instanceof Array) {
          cb(res);
        } else if (res instanceof Error) {
          cb(res.message);
        }
      }

      if (res && res.then) {
        res.then(function () {
          return cb();
        }, function (e) {
          return cb(e);
        });
      }
    }, function (results) {
      complete(results);
    });
  },
  getType: function getType(rule) {
    if (rule.type === undefined && rule.pattern instanceof RegExp) {
      rule.type = 'pattern';
    }

    if (typeof rule.validator !== 'function' && rule.type && !validators.hasOwnProperty(rule.type)) {
      throw new Error(format('Unknown rule type %s', rule.type));
    }

    return rule.type || 'string';
  },
  getValidationMethod: function getValidationMethod(rule) {
    if (typeof rule.validator === 'function') {
      return rule.validator;
    }

    var keys = Object.keys(rule);
    var messageIndex = keys.indexOf('message');

    if (messageIndex !== -1) {
      keys.splice(messageIndex, 1);
    }

    if (keys.length === 1 && keys[0] === 'required') {
      return validators.required;
    }

    return validators[this.getType(rule)] || false;
  } };


Schema.register = function register(type, validator) {
  if (typeof validator !== 'function') {
    throw new Error('Cannot register a validator by type, validator is not a function');
  }

  validators[type] = validator;
};

Schema.warning = warning;
Schema.messages = messages;var _default =

Schema;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/node-libs-browser/mock/process.js */ 194)))

/***/ }),

/***/ 194:
/*!********************************************************!*\
  !*** ./node_modules/node-libs-browser/mock/process.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports.nextTick = function nextTick(fn) {
    var args = Array.prototype.slice.call(arguments);
    args.shift();
    setTimeout(function () {
        fn.apply(null, args);
    }, 0);
};

exports.platform = exports.arch = 
exports.execPath = exports.title = 'browser';
exports.pid = 1;
exports.browser = true;
exports.env = {};
exports.argv = [];

exports.binding = function (name) {
	throw new Error('No such module. (Possibly not yet loaded)')
};

(function () {
    var cwd = '/';
    var path;
    exports.cwd = function () { return cwd };
    exports.chdir = function (dir) {
        if (!path) path = __webpack_require__(/*! path */ 195);
        cwd = path.resolve(dir, cwd);
    };
})();

exports.exit = exports.kill = 
exports.umask = exports.dlopen = 
exports.uptime = exports.memoryUsage = 
exports.uvCounters = function() {};
exports.features = {};


/***/ }),

/***/ 195:
/*!***********************************************!*\
  !*** ./node_modules/path-browserify/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  if (typeof path !== 'string') path = path + '';
  if (path.length === 0) return '.';
  var code = path.charCodeAt(0);
  var hasRoot = code === 47 /*/*/;
  var end = -1;
  var matchedSlash = true;
  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? '/' : '.';
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }
  return path.slice(0, end);
};

function basename(path) {
  if (typeof path !== 'string') path = path + '';

  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;

  for (i = path.length - 1; i >= 0; --i) {
    if (path.charCodeAt(i) === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // path component
      matchedSlash = false;
      end = i + 1;
    }
  }

  if (end === -1) return '';
  return path.slice(start, end);
}

// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
exports.basename = function (path, ext) {
  var f = basename(path);
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  if (typeof path !== 'string') path = path + '';
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;
  for (var i = path.length - 1; i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 ||
      // We saw a non-dot character immediately before the dot
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return '';
  }
  return path.slice(startDot, end);
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node-libs-browser/mock/process.js */ 194)))

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2021 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    // NOTE 此处将 != 修改为 !==。涉及地方太多恐怕测试不到，如果出现数据对比问题，将其修改回来。
                    if (currentValue !== pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_NAME":"resident","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_NAME":"resident","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_NAME":"resident","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_NAME":"resident","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 20:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 21);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 21:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 22:
/*!****************************************************************!*\
  !*** D:/git/doctor/final/uview-ui/libs/function/timeFormat.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // padStart 的 polyfill，因为某些机型或情况，还无法支持es7的padStart，比如电脑版的微信小程序
// 所以这里做一个兼容polyfill的兼容处理
if (!String.prototype.padStart) {
  // 为了方便表示这里 fillString 用了ES6 的默认参数，不影响理解
  String.prototype.padStart = function (maxLength) {var fillString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ' ';
    if (Object.prototype.toString.call(fillString) !== "[object String]") throw new TypeError(
    'fillString must be String');
    var str = this;
    // 返回 String(str) 这里是为了使返回的值是字符串字面量，在控制台中更符合直觉
    if (str.length >= maxLength) return String(str);

    var fillLength = maxLength - str.length,
    times = Math.ceil(fillLength / fillString.length);
    while (times >>= 1) {
      fillString += fillString;
      if (times === 1) {
        fillString += fillString;
      }
    }
    return fillString.slice(0, fillLength) + str;
  };
}

// 其他更多是格式化有如下:
// yyyy:mm:dd|yyyy:mm|yyyy年mm月dd日|yyyy年mm月dd日 hh时MM分等,可自定义组合
function timeFormat() {var dateTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var fmt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  // 如果为null,则格式化当前时间
  if (!dateTime) dateTime = Number(new Date());
  // 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
  if (dateTime.toString().length == 10) dateTime *= 1000;
  var date = new Date(dateTime);
  var ret;
  var opt = {
    "y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "h+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "s+": date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (var k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0"));
    };
  };
  return fmt;
}var _default =

timeFormat;exports.default = _default;

/***/ }),

/***/ 23:
/*!**************************************************************!*\
  !*** D:/git/doctor/final/uview-ui/libs/function/timeFrom.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _timeFormat = _interopRequireDefault(__webpack_require__(/*! ../../libs/function/timeFormat.js */ 22));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                                                                                                                                          * 时间戳转为多久之前
                                                                                                                                                                                                                                                                                          * @param String timestamp 时间戳
                                                                                                                                                                                                                                                                                          * @param String | Boolean format 如果为时间格式字符串，超出一定时间范围，返回固定的时间格式；
                                                                                                                                                                                                                                                                                          * 如果为布尔值false，无论什么时间，都返回多久以前的格式
                                                                                                                                                                                                                                                                                          */
function timeFrom() {var dateTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  // 如果为null,则格式化当前时间
  if (!dateTime) dateTime = Number(new Date());
  // 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
  if (dateTime.toString().length == 10) dateTime *= 1000;
  var timestamp = +new Date(Number(dateTime));

  var timer = (Number(new Date()) - timestamp) / 1000;
  // 如果小于5分钟,则返回"刚刚",其他以此类推
  var tips = '';
  switch (true) {
    case timer < 300:
      tips = '刚刚';
      break;
    case timer >= 300 && timer < 3600:
      tips = parseInt(timer / 60) + '分钟前';
      break;
    case timer >= 3600 && timer < 86400:
      tips = parseInt(timer / 3600) + '小时前';
      break;
    case timer >= 86400 && timer < 2592000:
      tips = parseInt(timer / 86400) + '天前';
      break;
    default:
      // 如果format为false，则无论什么时间戳，都显示xx之前
      if (format === false) {
        if (timer >= 2592000 && timer < 365 * 86400) {
          tips = parseInt(timer / (86400 * 30)) + '个月前';
        } else {
          tips = parseInt(timer / (86400 * 365)) + '年前';
        }
      } else {
        tips = (0, _timeFormat.default)(timestamp, format);
      }}

  return tips;
}var _default =

timeFrom;exports.default = _default;

/***/ }),

/***/ 24:
/*!*******************************************************************!*\
  !*** D:/git/doctor/final/uview-ui/libs/function/colorGradient.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 求两个颜色之间的渐变值
                                                                                                      * @param {string} startColor 开始的颜色
                                                                                                      * @param {string} endColor 结束的颜色
                                                                                                      * @param {number} step 颜色等分的份额
                                                                                                      * */
function colorGradient() {var startColor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'rgb(0, 0, 0)';var endColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rgb(255, 255, 255)';var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
  var startRGB = hexToRgb(startColor, false); //转换为rgb数组模式
  var startR = startRGB[0];
  var startG = startRGB[1];
  var startB = startRGB[2];

  var endRGB = hexToRgb(endColor, false);
  var endR = endRGB[0];
  var endG = endRGB[1];
  var endB = endRGB[2];

  var sR = (endR - startR) / step; //总差值
  var sG = (endG - startG) / step;
  var sB = (endB - startB) / step;
  var colorArr = [];
  for (var i = 0; i < step; i++) {
    //计算每一步的hex值 
    var hex = rgbToHex('rgb(' + Math.round(sR * i + startR) + ',' + Math.round(sG * i + startG) + ',' + Math.round(sB *
    i + startB) + ')');
    colorArr.push(hex);
  }
  return colorArr;
}

// 将hex表示方式转换为rgb表示方式(这里返回rgb数组模式)
function hexToRgb(sColor) {var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  sColor = sColor.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = "#";
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    //处理六位的颜色值
    var sColorChange = [];
    for (var _i = 1; _i < 7; _i += 2) {
      sColorChange.push(parseInt("0x" + sColor.slice(_i, _i + 2)));
    }
    if (!str) {
      return sColorChange;
    } else {
      return "rgb(".concat(sColorChange[0], ",").concat(sColorChange[1], ",").concat(sColorChange[2], ")");
    }
  } else if (/^(rgb|RGB)/.test(sColor)) {
    var arr = sColor.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    return arr.map(function (val) {return Number(val);});
  } else {
    return sColor;
  }
};

// 将rgb表示方式转换为hex表示方式
function rgbToHex(rgb) {
  var _this = rgb;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  if (/^(rgb|RGB)/.test(_this)) {
    var aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    var strHex = "#";
    for (var i = 0; i < aColor.length; i++) {
      var hex = Number(aColor[i]).toString(16);
      hex = String(hex).length == 1 ? 0 + '' + hex : hex; // 保证每个rgb的值为2位
      if (hex === "0") {
        hex += hex;
      }
      strHex += hex;
    }
    if (strHex.length !== 7) {
      strHex = _this;
    }
    return strHex;
  } else if (reg.test(_this)) {
    var aNum = _this.replace(/#/, "").split("");
    if (aNum.length === 6) {
      return _this;
    } else if (aNum.length === 3) {
      var numHex = "#";
      for (var _i2 = 0; _i2 < aNum.length; _i2 += 1) {
        numHex += aNum[_i2] + aNum[_i2];
      }
      return numHex;
    }
  } else {
    return _this;
  }
}


/**
  * JS颜色十六进制转换为rgb或rgba,返回的格式为 rgba（255，255，255，0.5）字符串
  * sHex为传入的十六进制的色值
  * alpha为rgba的透明度
  */
function colorToRgba(color) {var alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.3;
  color = rgbToHex(color);
  // 十六进制颜色值的正则表达式
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  /* 16进制颜色转为RGB格式 */
  var sColor = color.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = '#';
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    // 处理六位的颜色值
    var sColorChange = [];
    for (var _i3 = 1; _i3 < 7; _i3 += 2) {
      sColorChange.push(parseInt('0x' + sColor.slice(_i3, _i3 + 2)));
    }
    // return sColorChange.join(',')
    return 'rgba(' + sColorChange.join(',') + ',' + alpha + ')';
  } else
  {
    return sColor;
  }
}var _default =

{
  colorGradient: colorGradient,
  hexToRgb: hexToRgb,
  rgbToHex: rgbToHex,
  colorToRgba: colorToRgba };exports.default = _default;

/***/ }),

/***/ 25:
/*!**********************************************************!*\
  !*** D:/git/doctor/final/uview-ui/libs/function/guid.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 本算法来源于简书开源代码，详见：https://www.jianshu.com/p/fdbf293d0a85
                                                                                                      * 全局唯一标识符（uuid，Globally Unique Identifier）,也称作 uuid(Universally Unique IDentifier) 
                                                                                                      * 一般用于多个组件之间,给它一个唯一的标识符,或者v-for循环的时候,如果使用数组的index可能会导致更新列表出现问题
                                                                                                      * 最可能的情况是左滑删除item或者对某条信息流"不喜欢"并去掉它的时候,会导致组件内的数据可能出现错乱
                                                                                                      * v-for的时候,推荐使用后端返回的id而不是循环的index
                                                                                                      * @param {Number} len uuid的长度
                                                                                                      * @param {Boolean} firstU 将返回的首字母置为"u"
                                                                                                      * @param {Nubmer} radix 生成uuid的基数(意味着返回的字符串都是这个基数),2-二进制,8-八进制,10-十进制,16-十六进制
                                                                                                      */
function guid() {var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 32;var firstU = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var radix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [];
  radix = radix || chars.length;

  if (len) {
    // 如果指定uuid长度,只是取随机的字符,0|x为位运算,能去掉x的小数位,返回整数位
    for (var i = 0; i < len; i++) {uuid[i] = chars[0 | Math.random() * radix];}
  } else {
    var r;
    // rfc4122标准要求返回的uuid中,某些位为固定的字符
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    for (var _i = 0; _i < 36; _i++) {
      if (!uuid[_i]) {
        r = 0 | Math.random() * 16;
        uuid[_i] = chars[_i == 19 ? r & 0x3 | 0x8 : r];
      }
    }
  }
  // 移除第一个字符,并用u替代,因为第一个字符为数值时,该guuid不能用作id或者class
  if (firstU) {
    uuid.shift();
    return 'u' + uuid.join('');
  } else {
    return uuid.join('');
  }
}var _default =

guid;exports.default = _default;

/***/ }),

/***/ 259:
/*!**********************************************************!*\
  !*** D:/git/doctor/final/uview-ui/libs/util/province.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var provinceData = [{ "label": "北京市", "value": "11" }, { "label": "天津市", "value": "12" }, { "label": "河北省", "value": "13" }, { "label": "山西省", "value": "14" }, { "label": "内蒙古自治区", "value": "15" }, { "label": "辽宁省", "value": "21" }, { "label": "吉林省", "value": "22" }, { "label": "黑龙江省", "value": "23" }, { "label": "上海市", "value": "31" }, { "label": "江苏省", "value": "32" }, { "label": "浙江省", "value": "33" }, { "label": "安徽省", "value": "34" }, { "label": "福建省", "value": "35" }, { "label": "江西省", "value": "36" }, { "label": "山东省", "value": "37" }, { "label": "河南省", "value": "41" }, { "label": "湖北省", "value": "42" }, { "label": "湖南省", "value": "43" }, { "label": "广东省", "value": "44" }, { "label": "广西壮族自治区", "value": "45" }, { "label": "海南省", "value": "46" }, { "label": "重庆市", "value": "50" }, { "label": "四川省", "value": "51" }, { "label": "贵州省", "value": "52" }, { "label": "云南省", "value": "53" }, { "label": "西藏自治区", "value": "54" }, { "label": "陕西省", "value": "61" }, { "label": "甘肃省", "value": "62" }, { "label": "青海省", "value": "63" }, { "label": "宁夏回族自治区", "value": "64" }, { "label": "新疆维吾尔自治区", "value": "65" }, { "label": "台湾", "value": "66" }, { "label": "香港", "value": "67" }, { "label": "澳门", "value": "68" }];var _default = provinceData;exports.default = _default;

/***/ }),

/***/ 26:
/*!***********************************************************!*\
  !*** D:/git/doctor/final/uview-ui/libs/function/color.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 为了让用户能够自定义主题，会逐步弃用此文件，各颜色通过css提供
// 为了给某些特殊场景使用和向后兼容，无需删除此文件(2020-06-20)
var color = {
  primary: "#2979ff",
  primaryDark: "#2b85e4",
  primaryDisabled: "#a0cfff",
  primaryLight: "#ecf5ff",
  bgColor: "#f3f4f6",

  info: "#909399",
  infoDark: "#82848a",
  infoDisabled: "#c8c9cc",
  infoLight: "#f4f4f5",

  warning: "#ff9900",
  warningDark: "#f29100",
  warningDisabled: "#fcbd71",
  warningLight: "#fdf6ec",

  error: "#fa3534",
  errorDark: "#dd6161",
  errorDisabled: "#fab6b6",
  errorLight: "#fef0f0",

  success: "#19be6b",
  successDark: "#18b566",
  successDisabled: "#71d5a1",
  successLight: "#dbf1e1",

  mainColor: "#303133",
  contentColor: "#606266",
  tipsColor: "#909399",
  lightColor: "#c0c4cc",
  borderColor: "#e4e7ed" };var _default =


color;exports.default = _default;

/***/ }),

/***/ 260:
/*!******************************************************!*\
  !*** D:/git/doctor/final/uview-ui/libs/util/city.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var cityData = [[{ "label": "市辖区", "value": "1101" }], [{ "label": "市辖区", "value": "1201" }], [{ "label": "石家庄市", "value": "1301" }, { "label": "唐山市", "value": "1302" }, { "label": "秦皇岛市", "value": "1303" }, { "label": "邯郸市", "value": "1304" }, { "label": "邢台市", "value": "1305" }, { "label": "保定市", "value": "1306" }, { "label": "张家口市", "value": "1307" }, { "label": "承德市", "value": "1308" }, { "label": "沧州市", "value": "1309" }, { "label": "廊坊市", "value": "1310" }, { "label": "衡水市", "value": "1311" }], [{ "label": "太原市", "value": "1401" }, { "label": "大同市", "value": "1402" }, { "label": "阳泉市", "value": "1403" }, { "label": "长治市", "value": "1404" }, { "label": "晋城市", "value": "1405" }, { "label": "朔州市", "value": "1406" }, { "label": "晋中市", "value": "1407" }, { "label": "运城市", "value": "1408" }, { "label": "忻州市", "value": "1409" }, { "label": "临汾市", "value": "1410" }, { "label": "吕梁市", "value": "1411" }], [{ "label": "呼和浩特市", "value": "1501" }, { "label": "包头市", "value": "1502" }, { "label": "乌海市", "value": "1503" }, { "label": "赤峰市", "value": "1504" }, { "label": "通辽市", "value": "1505" }, { "label": "鄂尔多斯市", "value": "1506" }, { "label": "呼伦贝尔市", "value": "1507" }, { "label": "巴彦淖尔市", "value": "1508" }, { "label": "乌兰察布市", "value": "1509" }, { "label": "兴安盟", "value": "1522" }, { "label": "锡林郭勒盟", "value": "1525" }, { "label": "阿拉善盟", "value": "1529" }], [{ "label": "沈阳市", "value": "2101" }, { "label": "大连市", "value": "2102" }, { "label": "鞍山市", "value": "2103" }, { "label": "抚顺市", "value": "2104" }, { "label": "本溪市", "value": "2105" }, { "label": "丹东市", "value": "2106" }, { "label": "锦州市", "value": "2107" }, { "label": "营口市", "value": "2108" }, { "label": "阜新市", "value": "2109" }, { "label": "辽阳市", "value": "2110" }, { "label": "盘锦市", "value": "2111" }, { "label": "铁岭市", "value": "2112" }, { "label": "朝阳市", "value": "2113" }, { "label": "葫芦岛市", "value": "2114" }], [{ "label": "长春市", "value": "2201" }, { "label": "吉林市", "value": "2202" }, { "label": "四平市", "value": "2203" }, { "label": "辽源市", "value": "2204" }, { "label": "通化市", "value": "2205" }, { "label": "白山市", "value": "2206" }, { "label": "松原市", "value": "2207" }, { "label": "白城市", "value": "2208" }, { "label": "延边朝鲜族自治州", "value": "2224" }], [{ "label": "哈尔滨市", "value": "2301" }, { "label": "齐齐哈尔市", "value": "2302" }, { "label": "鸡西市", "value": "2303" }, { "label": "鹤岗市", "value": "2304" }, { "label": "双鸭山市", "value": "2305" }, { "label": "大庆市", "value": "2306" }, { "label": "伊春市", "value": "2307" }, { "label": "佳木斯市", "value": "2308" }, { "label": "七台河市", "value": "2309" }, { "label": "牡丹江市", "value": "2310" }, { "label": "黑河市", "value": "2311" }, { "label": "绥化市", "value": "2312" }, { "label": "大兴安岭地区", "value": "2327" }], [{ "label": "市辖区", "value": "3101" }], [{ "label": "南京市", "value": "3201" }, { "label": "无锡市", "value": "3202" }, { "label": "徐州市", "value": "3203" }, { "label": "常州市", "value": "3204" }, { "label": "苏州市", "value": "3205" }, { "label": "南通市", "value": "3206" }, { "label": "连云港市", "value": "3207" }, { "label": "淮安市", "value": "3208" }, { "label": "盐城市", "value": "3209" }, { "label": "扬州市", "value": "3210" }, { "label": "镇江市", "value": "3211" }, { "label": "泰州市", "value": "3212" }, { "label": "宿迁市", "value": "3213" }], [{ "label": "杭州市", "value": "3301" }, { "label": "宁波市", "value": "3302" }, { "label": "温州市", "value": "3303" }, { "label": "嘉兴市", "value": "3304" }, { "label": "湖州市", "value": "3305" }, { "label": "绍兴市", "value": "3306" }, { "label": "金华市", "value": "3307" }, { "label": "衢州市", "value": "3308" }, { "label": "舟山市", "value": "3309" }, { "label": "台州市", "value": "3310" }, { "label": "丽水市", "value": "3311" }], [{ "label": "合肥市", "value": "3401" }, { "label": "芜湖市", "value": "3402" }, { "label": "蚌埠市", "value": "3403" }, { "label": "淮南市", "value": "3404" }, { "label": "马鞍山市", "value": "3405" }, { "label": "淮北市", "value": "3406" }, { "label": "铜陵市", "value": "3407" }, { "label": "安庆市", "value": "3408" }, { "label": "黄山市", "value": "3410" }, { "label": "滁州市", "value": "3411" }, { "label": "阜阳市", "value": "3412" }, { "label": "宿州市", "value": "3413" }, { "label": "六安市", "value": "3415" }, { "label": "亳州市", "value": "3416" }, { "label": "池州市", "value": "3417" }, { "label": "宣城市", "value": "3418" }], [{ "label": "福州市", "value": "3501" }, { "label": "厦门市", "value": "3502" }, { "label": "莆田市", "value": "3503" }, { "label": "三明市", "value": "3504" }, { "label": "泉州市", "value": "3505" }, { "label": "漳州市", "value": "3506" }, { "label": "南平市", "value": "3507" }, { "label": "龙岩市", "value": "3508" }, { "label": "宁德市", "value": "3509" }], [{ "label": "南昌市", "value": "3601" }, { "label": "景德镇市", "value": "3602" }, { "label": "萍乡市", "value": "3603" }, { "label": "九江市", "value": "3604" }, { "label": "新余市", "value": "3605" }, { "label": "鹰潭市", "value": "3606" }, { "label": "赣州市", "value": "3607" }, { "label": "吉安市", "value": "3608" }, { "label": "宜春市", "value": "3609" }, { "label": "抚州市", "value": "3610" }, { "label": "上饶市", "value": "3611" }], [{ "label": "济南市", "value": "3701" }, { "label": "青岛市", "value": "3702" }, { "label": "淄博市", "value": "3703" }, { "label": "枣庄市", "value": "3704" }, { "label": "东营市", "value": "3705" }, { "label": "烟台市", "value": "3706" }, { "label": "潍坊市", "value": "3707" }, { "label": "济宁市", "value": "3708" }, { "label": "泰安市", "value": "3709" }, { "label": "威海市", "value": "3710" }, { "label": "日照市", "value": "3711" }, { "label": "莱芜市", "value": "3712" }, { "label": "临沂市", "value": "3713" }, { "label": "德州市", "value": "3714" }, { "label": "聊城市", "value": "3715" }, { "label": "滨州市", "value": "3716" }, { "label": "菏泽市", "value": "3717" }], [{ "label": "郑州市", "value": "4101" }, { "label": "开封市", "value": "4102" }, { "label": "洛阳市", "value": "4103" }, { "label": "平顶山市", "value": "4104" }, { "label": "安阳市", "value": "4105" }, { "label": "鹤壁市", "value": "4106" }, { "label": "新乡市", "value": "4107" }, { "label": "焦作市", "value": "4108" }, { "label": "濮阳市", "value": "4109" }, { "label": "许昌市", "value": "4110" }, { "label": "漯河市", "value": "4111" }, { "label": "三门峡市", "value": "4112" }, { "label": "南阳市", "value": "4113" }, { "label": "商丘市", "value": "4114" }, { "label": "信阳市", "value": "4115" }, { "label": "周口市", "value": "4116" }, { "label": "驻马店市", "value": "4117" }, { "label": "省直辖县级行政区划", "value": "4190" }], [{ "label": "武汉市", "value": "4201" }, { "label": "黄石市", "value": "4202" }, { "label": "十堰市", "value": "4203" }, { "label": "宜昌市", "value": "4205" }, { "label": "襄阳市", "value": "4206" }, { "label": "鄂州市", "value": "4207" }, { "label": "荆门市", "value": "4208" }, { "label": "孝感市", "value": "4209" }, { "label": "荆州市", "value": "4210" }, { "label": "黄冈市", "value": "4211" }, { "label": "咸宁市", "value": "4212" }, { "label": "随州市", "value": "4213" }, { "label": "恩施土家族苗族自治州", "value": "4228" }, { "label": "省直辖县级行政区划", "value": "4290" }], [{ "label": "长沙市", "value": "4301" }, { "label": "株洲市", "value": "4302" }, { "label": "湘潭市", "value": "4303" }, { "label": "衡阳市", "value": "4304" }, { "label": "邵阳市", "value": "4305" }, { "label": "岳阳市", "value": "4306" }, { "label": "常德市", "value": "4307" }, { "label": "张家界市", "value": "4308" }, { "label": "益阳市", "value": "4309" }, { "label": "郴州市", "value": "4310" }, { "label": "永州市", "value": "4311" }, { "label": "怀化市", "value": "4312" }, { "label": "娄底市", "value": "4313" }, { "label": "湘西土家族苗族自治州", "value": "4331" }], [{ "label": "广州市", "value": "4401" }, { "label": "韶关市", "value": "4402" }, { "label": "深圳市", "value": "4403" }, { "label": "珠海市", "value": "4404" }, { "label": "汕头市", "value": "4405" }, { "label": "佛山市", "value": "4406" }, { "label": "江门市", "value": "4407" }, { "label": "湛江市", "value": "4408" }, { "label": "茂名市", "value": "4409" }, { "label": "肇庆市", "value": "4412" }, { "label": "惠州市", "value": "4413" }, { "label": "梅州市", "value": "4414" }, { "label": "汕尾市", "value": "4415" }, { "label": "河源市", "value": "4416" }, { "label": "阳江市", "value": "4417" }, { "label": "清远市", "value": "4418" }, { "label": "东莞市", "value": "4419" }, { "label": "中山市", "value": "4420" }, { "label": "潮州市", "value": "4451" }, { "label": "揭阳市", "value": "4452" }, { "label": "云浮市", "value": "4453" }], [{ "label": "南宁市", "value": "4501" }, { "label": "柳州市", "value": "4502" }, { "label": "桂林市", "value": "4503" }, { "label": "梧州市", "value": "4504" }, { "label": "北海市", "value": "4505" }, { "label": "防城港市", "value": "4506" }, { "label": "钦州市", "value": "4507" }, { "label": "贵港市", "value": "4508" }, { "label": "玉林市", "value": "4509" }, { "label": "百色市", "value": "4510" }, { "label": "贺州市", "value": "4511" }, { "label": "河池市", "value": "4512" }, { "label": "来宾市", "value": "4513" }, { "label": "崇左市", "value": "4514" }], [{ "label": "海口市", "value": "4601" }, { "label": "三亚市", "value": "4602" }, { "label": "三沙市", "value": "4603" }, { "label": "儋州市", "value": "4604" }, { "label": "省直辖县级行政区划", "value": "4690" }], [{ "label": "市辖区", "value": "5001" }, { "label": "县", "value": "5002" }], [{ "label": "成都市", "value": "5101" }, { "label": "自贡市", "value": "5103" }, { "label": "攀枝花市", "value": "5104" }, { "label": "泸州市", "value": "5105" }, { "label": "德阳市", "value": "5106" }, { "label": "绵阳市", "value": "5107" }, { "label": "广元市", "value": "5108" }, { "label": "遂宁市", "value": "5109" }, { "label": "内江市", "value": "5110" }, { "label": "乐山市", "value": "5111" }, { "label": "南充市", "value": "5113" }, { "label": "眉山市", "value": "5114" }, { "label": "宜宾市", "value": "5115" }, { "label": "广安市", "value": "5116" }, { "label": "达州市", "value": "5117" }, { "label": "雅安市", "value": "5118" }, { "label": "巴中市", "value": "5119" }, { "label": "资阳市", "value": "5120" }, { "label": "阿坝藏族羌族自治州", "value": "5132" }, { "label": "甘孜藏族自治州", "value": "5133" }, { "label": "凉山彝族自治州", "value": "5134" }], [{ "label": "贵阳市", "value": "5201" }, { "label": "六盘水市", "value": "5202" }, { "label": "遵义市", "value": "5203" }, { "label": "安顺市", "value": "5204" }, { "label": "毕节市", "value": "5205" }, { "label": "铜仁市", "value": "5206" }, { "label": "黔西南布依族苗族自治州", "value": "5223" }, { "label": "黔东南苗族侗族自治州", "value": "5226" }, { "label": "黔南布依族苗族自治州", "value": "5227" }], [{ "label": "昆明市", "value": "5301" }, { "label": "曲靖市", "value": "5303" }, { "label": "玉溪市", "value": "5304" }, { "label": "保山市", "value": "5305" }, { "label": "昭通市", "value": "5306" }, { "label": "丽江市", "value": "5307" }, { "label": "普洱市", "value": "5308" }, { "label": "临沧市", "value": "5309" }, { "label": "楚雄彝族自治州", "value": "5323" }, { "label": "红河哈尼族彝族自治州", "value": "5325" }, { "label": "文山壮族苗族自治州", "value": "5326" }, { "label": "西双版纳傣族自治州", "value": "5328" }, { "label": "大理白族自治州", "value": "5329" }, { "label": "德宏傣族景颇族自治州", "value": "5331" }, { "label": "怒江傈僳族自治州", "value": "5333" }, { "label": "迪庆藏族自治州", "value": "5334" }], [{ "label": "拉萨市", "value": "5401" }, { "label": "日喀则市", "value": "5402" }, { "label": "昌都市", "value": "5403" }, { "label": "林芝市", "value": "5404" }, { "label": "山南市", "value": "5405" }, { "label": "那曲地区", "value": "5424" }, { "label": "阿里地区", "value": "5425" }], [{ "label": "西安市", "value": "6101" }, { "label": "铜川市", "value": "6102" }, { "label": "宝鸡市", "value": "6103" }, { "label": "咸阳市", "value": "6104" }, { "label": "渭南市", "value": "6105" }, { "label": "延安市", "value": "6106" }, { "label": "汉中市", "value": "6107" }, { "label": "榆林市", "value": "6108" }, { "label": "安康市", "value": "6109" }, { "label": "商洛市", "value": "6110" }], [{ "label": "兰州市", "value": "6201" }, { "label": "嘉峪关市", "value": "6202" }, { "label": "金昌市", "value": "6203" }, { "label": "白银市", "value": "6204" }, { "label": "天水市", "value": "6205" }, { "label": "武威市", "value": "6206" }, { "label": "张掖市", "value": "6207" }, { "label": "平凉市", "value": "6208" }, { "label": "酒泉市", "value": "6209" }, { "label": "庆阳市", "value": "6210" }, { "label": "定西市", "value": "6211" }, { "label": "陇南市", "value": "6212" }, { "label": "临夏回族自治州", "value": "6229" }, { "label": "甘南藏族自治州", "value": "6230" }], [{ "label": "西宁市", "value": "6301" }, { "label": "海东市", "value": "6302" }, { "label": "海北藏族自治州", "value": "6322" }, { "label": "黄南藏族自治州", "value": "6323" }, { "label": "海南藏族自治州", "value": "6325" }, { "label": "果洛藏族自治州", "value": "6326" }, { "label": "玉树藏族自治州", "value": "6327" }, { "label": "海西蒙古族藏族自治州", "value": "6328" }], [{ "label": "银川市", "value": "6401" }, { "label": "石嘴山市", "value": "6402" }, { "label": "吴忠市", "value": "6403" }, { "label": "固原市", "value": "6404" }, { "label": "中卫市", "value": "6405" }], [{ "label": "乌鲁木齐市", "value": "6501" }, { "label": "克拉玛依市", "value": "6502" }, { "label": "吐鲁番市", "value": "6504" }, { "label": "哈密市", "value": "6505" }, { "label": "昌吉回族自治州", "value": "6523" }, { "label": "博尔塔拉蒙古自治州", "value": "6527" }, { "label": "巴音郭楞蒙古自治州", "value": "6528" }, { "label": "阿克苏地区", "value": "6529" }, { "label": "克孜勒苏柯尔克孜自治州", "value": "6530" }, { "label": "喀什地区", "value": "6531" }, { "label": "和田地区", "value": "6532" }, { "label": "伊犁哈萨克自治州", "value": "6540" }, { "label": "塔城地区", "value": "6542" }, { "label": "阿勒泰地区", "value": "6543" }, { "label": "自治区直辖县级行政区划", "value": "6590" }], [{ "label": "台北", "value": "6601" }, { "label": "高雄", "value": "6602" }, { "label": "基隆", "value": "6603" }, { "label": "台中", "value": "6604" }, { "label": "台南", "value": "6605" }, { "label": "新竹", "value": "6606" }, { "label": "嘉义", "value": "6607" }, { "label": "宜兰", "value": "6608" }, { "label": "桃园", "value": "6609" }, { "label": "苗栗", "value": "6610" }, { "label": "彰化", "value": "6611" }, { "label": "南投", "value": "6612" }, { "label": "云林", "value": "6613" }, { "label": "屏东", "value": "6614" }, { "label": "台东", "value": "6615" }, { "label": "花莲", "value": "6616" }, { "label": "澎湖", "value": "6617" }], [{ "label": "香港岛", "value": "6701" }, { "label": "九龙", "value": "6702" }, { "label": "新界", "value": "6703" }], [{ "label": "澳门半岛", "value": "6801" }, { "label": "氹仔岛", "value": "6802" }, { "label": "路环岛", "value": "6803" }, { "label": "路氹城", "value": "6804" }]];var _default = cityData;exports.default = _default;

/***/ }),

/***/ 261:
/*!******************************************************!*\
  !*** D:/git/doctor/final/uview-ui/libs/util/area.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var areaData = [[[{ "label": "东城区", "value": "110101" }, { "label": "西城区", "value": "110102" }, { "label": "朝阳区", "value": "110105" }, { "label": "丰台区", "value": "110106" }, { "label": "石景山区", "value": "110107" }, { "label": "海淀区", "value": "110108" }, { "label": "门头沟区", "value": "110109" }, { "label": "房山区", "value": "110111" }, { "label": "通州区", "value": "110112" }, { "label": "顺义区", "value": "110113" }, { "label": "昌平区", "value": "110114" }, { "label": "大兴区", "value": "110115" }, { "label": "怀柔区", "value": "110116" }, { "label": "平谷区", "value": "110117" }, { "label": "密云区", "value": "110118" }, { "label": "延庆区", "value": "110119" }]], [[{ "label": "和平区", "value": "120101" }, { "label": "河东区", "value": "120102" }, { "label": "河西区", "value": "120103" }, { "label": "南开区", "value": "120104" }, { "label": "河北区", "value": "120105" }, { "label": "红桥区", "value": "120106" }, { "label": "东丽区", "value": "120110" }, { "label": "西青区", "value": "120111" }, { "label": "津南区", "value": "120112" }, { "label": "北辰区", "value": "120113" }, { "label": "武清区", "value": "120114" }, { "label": "宝坻区", "value": "120115" }, { "label": "滨海新区", "value": "120116" }, { "label": "宁河区", "value": "120117" }, { "label": "静海区", "value": "120118" }, { "label": "蓟州区", "value": "120119" }]], [[{ "label": "长安区", "value": "130102" }, { "label": "桥西区", "value": "130104" }, { "label": "新华区", "value": "130105" }, { "label": "井陉矿区", "value": "130107" }, { "label": "裕华区", "value": "130108" }, { "label": "藁城区", "value": "130109" }, { "label": "鹿泉区", "value": "130110" }, { "label": "栾城区", "value": "130111" }, { "label": "井陉县", "value": "130121" }, { "label": "正定县", "value": "130123" }, { "label": "行唐县", "value": "130125" }, { "label": "灵寿县", "value": "130126" }, { "label": "高邑县", "value": "130127" }, { "label": "深泽县", "value": "130128" }, { "label": "赞皇县", "value": "130129" }, { "label": "无极县", "value": "130130" }, { "label": "平山县", "value": "130131" }, { "label": "元氏县", "value": "130132" }, { "label": "赵县", "value": "130133" }, { "label": "石家庄高新技术产业开发区", "value": "130171" }, { "label": "石家庄循环化工园区", "value": "130172" }, { "label": "辛集市", "value": "130181" }, { "label": "晋州市", "value": "130183" }, { "label": "新乐市", "value": "130184" }], [{ "label": "路南区", "value": "130202" }, { "label": "路北区", "value": "130203" }, { "label": "古冶区", "value": "130204" }, { "label": "开平区", "value": "130205" }, { "label": "丰南区", "value": "130207" }, { "label": "丰润区", "value": "130208" }, { "label": "曹妃甸区", "value": "130209" }, { "label": "滦县", "value": "130223" }, { "label": "滦南县", "value": "130224" }, { "label": "乐亭县", "value": "130225" }, { "label": "迁西县", "value": "130227" }, { "label": "玉田县", "value": "130229" }, { "label": "唐山市芦台经济技术开发区", "value": "130271" }, { "label": "唐山市汉沽管理区", "value": "130272" }, { "label": "唐山高新技术产业开发区", "value": "130273" }, { "label": "河北唐山海港经济开发区", "value": "130274" }, { "label": "遵化市", "value": "130281" }, { "label": "迁安市", "value": "130283" }], [{ "label": "海港区", "value": "130302" }, { "label": "山海关区", "value": "130303" }, { "label": "北戴河区", "value": "130304" }, { "label": "抚宁区", "value": "130306" }, { "label": "青龙满族自治县", "value": "130321" }, { "label": "昌黎县", "value": "130322" }, { "label": "卢龙县", "value": "130324" }, { "label": "秦皇岛市经济技术开发区", "value": "130371" }, { "label": "北戴河新区", "value": "130372" }], [{ "label": "邯山区", "value": "130402" }, { "label": "丛台区", "value": "130403" }, { "label": "复兴区", "value": "130404" }, { "label": "峰峰矿区", "value": "130406" }, { "label": "肥乡区", "value": "130407" }, { "label": "永年区", "value": "130408" }, { "label": "临漳县", "value": "130423" }, { "label": "成安县", "value": "130424" }, { "label": "大名县", "value": "130425" }, { "label": "涉县", "value": "130426" }, { "label": "磁县", "value": "130427" }, { "label": "邱县", "value": "130430" }, { "label": "鸡泽县", "value": "130431" }, { "label": "广平县", "value": "130432" }, { "label": "馆陶县", "value": "130433" }, { "label": "魏县", "value": "130434" }, { "label": "曲周县", "value": "130435" }, { "label": "邯郸经济技术开发区", "value": "130471" }, { "label": "邯郸冀南新区", "value": "130473" }, { "label": "武安市", "value": "130481" }], [{ "label": "桥东区", "value": "130502" }, { "label": "桥西区", "value": "130503" }, { "label": "邢台县", "value": "130521" }, { "label": "临城县", "value": "130522" }, { "label": "内丘县", "value": "130523" }, { "label": "柏乡县", "value": "130524" }, { "label": "隆尧县", "value": "130525" }, { "label": "任县", "value": "130526" }, { "label": "南和县", "value": "130527" }, { "label": "宁晋县", "value": "130528" }, { "label": "巨鹿县", "value": "130529" }, { "label": "新河县", "value": "130530" }, { "label": "广宗县", "value": "130531" }, { "label": "平乡县", "value": "130532" }, { "label": "威县", "value": "130533" }, { "label": "清河县", "value": "130534" }, { "label": "临西县", "value": "130535" }, { "label": "河北邢台经济开发区", "value": "130571" }, { "label": "南宫市", "value": "130581" }, { "label": "沙河市", "value": "130582" }], [{ "label": "竞秀区", "value": "130602" }, { "label": "莲池区", "value": "130606" }, { "label": "满城区", "value": "130607" }, { "label": "清苑区", "value": "130608" }, { "label": "徐水区", "value": "130609" }, { "label": "涞水县", "value": "130623" }, { "label": "阜平县", "value": "130624" }, { "label": "定兴县", "value": "130626" }, { "label": "唐县", "value": "130627" }, { "label": "高阳县", "value": "130628" }, { "label": "容城县", "value": "130629" }, { "label": "涞源县", "value": "130630" }, { "label": "望都县", "value": "130631" }, { "label": "安新县", "value": "130632" }, { "label": "易县", "value": "130633" }, { "label": "曲阳县", "value": "130634" }, { "label": "蠡县", "value": "130635" }, { "label": "顺平县", "value": "130636" }, { "label": "博野县", "value": "130637" }, { "label": "雄县", "value": "130638" }, { "label": "保定高新技术产业开发区", "value": "130671" }, { "label": "保定白沟新城", "value": "130672" }, { "label": "涿州市", "value": "130681" }, { "label": "定州市", "value": "130682" }, { "label": "安国市", "value": "130683" }, { "label": "高碑店市", "value": "130684" }], [{ "label": "桥东区", "value": "130702" }, { "label": "桥西区", "value": "130703" }, { "label": "宣化区", "value": "130705" }, { "label": "下花园区", "value": "130706" }, { "label": "万全区", "value": "130708" }, { "label": "崇礼区", "value": "130709" }, { "label": "张北县", "value": "130722" }, { "label": "康保县", "value": "130723" }, { "label": "沽源县", "value": "130724" }, { "label": "尚义县", "value": "130725" }, { "label": "蔚县", "value": "130726" }, { "label": "阳原县", "value": "130727" }, { "label": "怀安县", "value": "130728" }, { "label": "怀来县", "value": "130730" }, { "label": "涿鹿县", "value": "130731" }, { "label": "赤城县", "value": "130732" }, { "label": "张家口市高新技术产业开发区", "value": "130771" }, { "label": "张家口市察北管理区", "value": "130772" }, { "label": "张家口市塞北管理区", "value": "130773" }], [{ "label": "双桥区", "value": "130802" }, { "label": "双滦区", "value": "130803" }, { "label": "鹰手营子矿区", "value": "130804" }, { "label": "承德县", "value": "130821" }, { "label": "兴隆县", "value": "130822" }, { "label": "滦平县", "value": "130824" }, { "label": "隆化县", "value": "130825" }, { "label": "丰宁满族自治县", "value": "130826" }, { "label": "宽城满族自治县", "value": "130827" }, { "label": "围场满族蒙古族自治县", "value": "130828" }, { "label": "承德高新技术产业开发区", "value": "130871" }, { "label": "平泉市", "value": "130881" }], [{ "label": "新华区", "value": "130902" }, { "label": "运河区", "value": "130903" }, { "label": "沧县", "value": "130921" }, { "label": "青县", "value": "130922" }, { "label": "东光县", "value": "130923" }, { "label": "海兴县", "value": "130924" }, { "label": "盐山县", "value": "130925" }, { "label": "肃宁县", "value": "130926" }, { "label": "南皮县", "value": "130927" }, { "label": "吴桥县", "value": "130928" }, { "label": "献县", "value": "130929" }, { "label": "孟村回族自治县", "value": "130930" }, { "label": "河北沧州经济开发区", "value": "130971" }, { "label": "沧州高新技术产业开发区", "value": "130972" }, { "label": "沧州渤海新区", "value": "130973" }, { "label": "泊头市", "value": "130981" }, { "label": "任丘市", "value": "130982" }, { "label": "黄骅市", "value": "130983" }, { "label": "河间市", "value": "130984" }], [{ "label": "安次区", "value": "131002" }, { "label": "广阳区", "value": "131003" }, { "label": "固安县", "value": "131022" }, { "label": "永清县", "value": "131023" }, { "label": "香河县", "value": "131024" }, { "label": "大城县", "value": "131025" }, { "label": "文安县", "value": "131026" }, { "label": "大厂回族自治县", "value": "131028" }, { "label": "廊坊经济技术开发区", "value": "131071" }, { "label": "霸州市", "value": "131081" }, { "label": "三河市", "value": "131082" }], [{ "label": "桃城区", "value": "131102" }, { "label": "冀州区", "value": "131103" }, { "label": "枣强县", "value": "131121" }, { "label": "武邑县", "value": "131122" }, { "label": "武强县", "value": "131123" }, { "label": "饶阳县", "value": "131124" }, { "label": "安平县", "value": "131125" }, { "label": "故城县", "value": "131126" }, { "label": "景县", "value": "131127" }, { "label": "阜城县", "value": "131128" }, { "label": "河北衡水经济开发区", "value": "131171" }, { "label": "衡水滨湖新区", "value": "131172" }, { "label": "深州市", "value": "131182" }]], [[{ "label": "小店区", "value": "140105" }, { "label": "迎泽区", "value": "140106" }, { "label": "杏花岭区", "value": "140107" }, { "label": "尖草坪区", "value": "140108" }, { "label": "万柏林区", "value": "140109" }, { "label": "晋源区", "value": "140110" }, { "label": "清徐县", "value": "140121" }, { "label": "阳曲县", "value": "140122" }, { "label": "娄烦县", "value": "140123" }, { "label": "山西转型综合改革示范区", "value": "140171" }, { "label": "古交市", "value": "140181" }], [{ "label": "城区", "value": "140202" }, { "label": "矿区", "value": "140203" }, { "label": "南郊区", "value": "140211" }, { "label": "新荣区", "value": "140212" }, { "label": "阳高县", "value": "140221" }, { "label": "天镇县", "value": "140222" }, { "label": "广灵县", "value": "140223" }, { "label": "灵丘县", "value": "140224" }, { "label": "浑源县", "value": "140225" }, { "label": "左云县", "value": "140226" }, { "label": "大同县", "value": "140227" }, { "label": "山西大同经济开发区", "value": "140271" }], [{ "label": "城区", "value": "140302" }, { "label": "矿区", "value": "140303" }, { "label": "郊区", "value": "140311" }, { "label": "平定县", "value": "140321" }, { "label": "盂县", "value": "140322" }, { "label": "山西阳泉经济开发区", "value": "140371" }], [{ "label": "城区", "value": "140402" }, { "label": "郊区", "value": "140411" }, { "label": "长治县", "value": "140421" }, { "label": "襄垣县", "value": "140423" }, { "label": "屯留县", "value": "140424" }, { "label": "平顺县", "value": "140425" }, { "label": "黎城县", "value": "140426" }, { "label": "壶关县", "value": "140427" }, { "label": "长子县", "value": "140428" }, { "label": "武乡县", "value": "140429" }, { "label": "沁县", "value": "140430" }, { "label": "沁源县", "value": "140431" }, { "label": "山西长治高新技术产业园区", "value": "140471" }, { "label": "潞城市", "value": "140481" }], [{ "label": "城区", "value": "140502" }, { "label": "沁水县", "value": "140521" }, { "label": "阳城县", "value": "140522" }, { "label": "陵川县", "value": "140524" }, { "label": "泽州县", "value": "140525" }, { "label": "高平市", "value": "140581" }], [{ "label": "朔城区", "value": "140602" }, { "label": "平鲁区", "value": "140603" }, { "label": "山阴县", "value": "140621" }, { "label": "应县", "value": "140622" }, { "label": "右玉县", "value": "140623" }, { "label": "怀仁县", "value": "140624" }, { "label": "山西朔州经济开发区", "value": "140671" }], [{ "label": "榆次区", "value": "140702" }, { "label": "榆社县", "value": "140721" }, { "label": "左权县", "value": "140722" }, { "label": "和顺县", "value": "140723" }, { "label": "昔阳县", "value": "140724" }, { "label": "寿阳县", "value": "140725" }, { "label": "太谷县", "value": "140726" }, { "label": "祁县", "value": "140727" }, { "label": "平遥县", "value": "140728" }, { "label": "灵石县", "value": "140729" }, { "label": "介休市", "value": "140781" }], [{ "label": "盐湖区", "value": "140802" }, { "label": "临猗县", "value": "140821" }, { "label": "万荣县", "value": "140822" }, { "label": "闻喜县", "value": "140823" }, { "label": "稷山县", "value": "140824" }, { "label": "新绛县", "value": "140825" }, { "label": "绛县", "value": "140826" }, { "label": "垣曲县", "value": "140827" }, { "label": "夏县", "value": "140828" }, { "label": "平陆县", "value": "140829" }, { "label": "芮城县", "value": "140830" }, { "label": "永济市", "value": "140881" }, { "label": "河津市", "value": "140882" }], [{ "label": "忻府区", "value": "140902" }, { "label": "定襄县", "value": "140921" }, { "label": "五台县", "value": "140922" }, { "label": "代县", "value": "140923" }, { "label": "繁峙县", "value": "140924" }, { "label": "宁武县", "value": "140925" }, { "label": "静乐县", "value": "140926" }, { "label": "神池县", "value": "140927" }, { "label": "五寨县", "value": "140928" }, { "label": "岢岚县", "value": "140929" }, { "label": "河曲县", "value": "140930" }, { "label": "保德县", "value": "140931" }, { "label": "偏关县", "value": "140932" }, { "label": "五台山风景名胜区", "value": "140971" }, { "label": "原平市", "value": "140981" }], [{ "label": "尧都区", "value": "141002" }, { "label": "曲沃县", "value": "141021" }, { "label": "翼城县", "value": "141022" }, { "label": "襄汾县", "value": "141023" }, { "label": "洪洞县", "value": "141024" }, { "label": "古县", "value": "141025" }, { "label": "安泽县", "value": "141026" }, { "label": "浮山县", "value": "141027" }, { "label": "吉县", "value": "141028" }, { "label": "乡宁县", "value": "141029" }, { "label": "大宁县", "value": "141030" }, { "label": "隰县", "value": "141031" }, { "label": "永和县", "value": "141032" }, { "label": "蒲县", "value": "141033" }, { "label": "汾西县", "value": "141034" }, { "label": "侯马市", "value": "141081" }, { "label": "霍州市", "value": "141082" }], [{ "label": "离石区", "value": "141102" }, { "label": "文水县", "value": "141121" }, { "label": "交城县", "value": "141122" }, { "label": "兴县", "value": "141123" }, { "label": "临县", "value": "141124" }, { "label": "柳林县", "value": "141125" }, { "label": "石楼县", "value": "141126" }, { "label": "岚县", "value": "141127" }, { "label": "方山县", "value": "141128" }, { "label": "中阳县", "value": "141129" }, { "label": "交口县", "value": "141130" }, { "label": "孝义市", "value": "141181" }, { "label": "汾阳市", "value": "141182" }]], [[{ "label": "新城区", "value": "150102" }, { "label": "回民区", "value": "150103" }, { "label": "玉泉区", "value": "150104" }, { "label": "赛罕区", "value": "150105" }, { "label": "土默特左旗", "value": "150121" }, { "label": "托克托县", "value": "150122" }, { "label": "和林格尔县", "value": "150123" }, { "label": "清水河县", "value": "150124" }, { "label": "武川县", "value": "150125" }, { "label": "呼和浩特金海工业园区", "value": "150171" }, { "label": "呼和浩特经济技术开发区", "value": "150172" }], [{ "label": "东河区", "value": "150202" }, { "label": "昆都仑区", "value": "150203" }, { "label": "青山区", "value": "150204" }, { "label": "石拐区", "value": "150205" }, { "label": "白云鄂博矿区", "value": "150206" }, { "label": "九原区", "value": "150207" }, { "label": "土默特右旗", "value": "150221" }, { "label": "固阳县", "value": "150222" }, { "label": "达尔罕茂明安联合旗", "value": "150223" }, { "label": "包头稀土高新技术产业开发区", "value": "150271" }], [{ "label": "海勃湾区", "value": "150302" }, { "label": "海南区", "value": "150303" }, { "label": "乌达区", "value": "150304" }], [{ "label": "红山区", "value": "150402" }, { "label": "元宝山区", "value": "150403" }, { "label": "松山区", "value": "150404" }, { "label": "阿鲁科尔沁旗", "value": "150421" }, { "label": "巴林左旗", "value": "150422" }, { "label": "巴林右旗", "value": "150423" }, { "label": "林西县", "value": "150424" }, { "label": "克什克腾旗", "value": "150425" }, { "label": "翁牛特旗", "value": "150426" }, { "label": "喀喇沁旗", "value": "150428" }, { "label": "宁城县", "value": "150429" }, { "label": "敖汉旗", "value": "150430" }], [{ "label": "科尔沁区", "value": "150502" }, { "label": "科尔沁左翼中旗", "value": "150521" }, { "label": "科尔沁左翼后旗", "value": "150522" }, { "label": "开鲁县", "value": "150523" }, { "label": "库伦旗", "value": "150524" }, { "label": "奈曼旗", "value": "150525" }, { "label": "扎鲁特旗", "value": "150526" }, { "label": "通辽经济技术开发区", "value": "150571" }, { "label": "霍林郭勒市", "value": "150581" }], [{ "label": "东胜区", "value": "150602" }, { "label": "康巴什区", "value": "150603" }, { "label": "达拉特旗", "value": "150621" }, { "label": "准格尔旗", "value": "150622" }, { "label": "鄂托克前旗", "value": "150623" }, { "label": "鄂托克旗", "value": "150624" }, { "label": "杭锦旗", "value": "150625" }, { "label": "乌审旗", "value": "150626" }, { "label": "伊金霍洛旗", "value": "150627" }], [{ "label": "海拉尔区", "value": "150702" }, { "label": "扎赉诺尔区", "value": "150703" }, { "label": "阿荣旗", "value": "150721" }, { "label": "莫力达瓦达斡尔族自治旗", "value": "150722" }, { "label": "鄂伦春自治旗", "value": "150723" }, { "label": "鄂温克族自治旗", "value": "150724" }, { "label": "陈巴尔虎旗", "value": "150725" }, { "label": "新巴尔虎左旗", "value": "150726" }, { "label": "新巴尔虎右旗", "value": "150727" }, { "label": "满洲里市", "value": "150781" }, { "label": "牙克石市", "value": "150782" }, { "label": "扎兰屯市", "value": "150783" }, { "label": "额尔古纳市", "value": "150784" }, { "label": "根河市", "value": "150785" }], [{ "label": "临河区", "value": "150802" }, { "label": "五原县", "value": "150821" }, { "label": "磴口县", "value": "150822" }, { "label": "乌拉特前旗", "value": "150823" }, { "label": "乌拉特中旗", "value": "150824" }, { "label": "乌拉特后旗", "value": "150825" }, { "label": "杭锦后旗", "value": "150826" }], [{ "label": "集宁区", "value": "150902" }, { "label": "卓资县", "value": "150921" }, { "label": "化德县", "value": "150922" }, { "label": "商都县", "value": "150923" }, { "label": "兴和县", "value": "150924" }, { "label": "凉城县", "value": "150925" }, { "label": "察哈尔右翼前旗", "value": "150926" }, { "label": "察哈尔右翼中旗", "value": "150927" }, { "label": "察哈尔右翼后旗", "value": "150928" }, { "label": "四子王旗", "value": "150929" }, { "label": "丰镇市", "value": "150981" }], [{ "label": "乌兰浩特市", "value": "152201" }, { "label": "阿尔山市", "value": "152202" }, { "label": "科尔沁右翼前旗", "value": "152221" }, { "label": "科尔沁右翼中旗", "value": "152222" }, { "label": "扎赉特旗", "value": "152223" }, { "label": "突泉县", "value": "152224" }], [{ "label": "二连浩特市", "value": "152501" }, { "label": "锡林浩特市", "value": "152502" }, { "label": "阿巴嘎旗", "value": "152522" }, { "label": "苏尼特左旗", "value": "152523" }, { "label": "苏尼特右旗", "value": "152524" }, { "label": "东乌珠穆沁旗", "value": "152525" }, { "label": "西乌珠穆沁旗", "value": "152526" }, { "label": "太仆寺旗", "value": "152527" }, { "label": "镶黄旗", "value": "152528" }, { "label": "正镶白旗", "value": "152529" }, { "label": "正蓝旗", "value": "152530" }, { "label": "多伦县", "value": "152531" }, { "label": "乌拉盖管委会", "value": "152571" }], [{ "label": "阿拉善左旗", "value": "152921" }, { "label": "阿拉善右旗", "value": "152922" }, { "label": "额济纳旗", "value": "152923" }, { "label": "内蒙古阿拉善经济开发区", "value": "152971" }]], [[{ "label": "和平区", "value": "210102" }, { "label": "沈河区", "value": "210103" }, { "label": "大东区", "value": "210104" }, { "label": "皇姑区", "value": "210105" }, { "label": "铁西区", "value": "210106" }, { "label": "苏家屯区", "value": "210111" }, { "label": "浑南区", "value": "210112" }, { "label": "沈北新区", "value": "210113" }, { "label": "于洪区", "value": "210114" }, { "label": "辽中区", "value": "210115" }, { "label": "康平县", "value": "210123" }, { "label": "法库县", "value": "210124" }, { "label": "新民市", "value": "210181" }], [{ "label": "中山区", "value": "210202" }, { "label": "西岗区", "value": "210203" }, { "label": "沙河口区", "value": "210204" }, { "label": "甘井子区", "value": "210211" }, { "label": "旅顺口区", "value": "210212" }, { "label": "金州区", "value": "210213" }, { "label": "普兰店区", "value": "210214" }, { "label": "长海县", "value": "210224" }, { "label": "瓦房店市", "value": "210281" }, { "label": "庄河市", "value": "210283" }], [{ "label": "铁东区", "value": "210302" }, { "label": "铁西区", "value": "210303" }, { "label": "立山区", "value": "210304" }, { "label": "千山区", "value": "210311" }, { "label": "台安县", "value": "210321" }, { "label": "岫岩满族自治县", "value": "210323" }, { "label": "海城市", "value": "210381" }], [{ "label": "新抚区", "value": "210402" }, { "label": "东洲区", "value": "210403" }, { "label": "望花区", "value": "210404" }, { "label": "顺城区", "value": "210411" }, { "label": "抚顺县", "value": "210421" }, { "label": "新宾满族自治县", "value": "210422" }, { "label": "清原满族自治县", "value": "210423" }], [{ "label": "平山区", "value": "210502" }, { "label": "溪湖区", "value": "210503" }, { "label": "明山区", "value": "210504" }, { "label": "南芬区", "value": "210505" }, { "label": "本溪满族自治县", "value": "210521" }, { "label": "桓仁满族自治县", "value": "210522" }], [{ "label": "元宝区", "value": "210602" }, { "label": "振兴区", "value": "210603" }, { "label": "振安区", "value": "210604" }, { "label": "宽甸满族自治县", "value": "210624" }, { "label": "东港市", "value": "210681" }, { "label": "凤城市", "value": "210682" }], [{ "label": "古塔区", "value": "210702" }, { "label": "凌河区", "value": "210703" }, { "label": "太和区", "value": "210711" }, { "label": "黑山县", "value": "210726" }, { "label": "义县", "value": "210727" }, { "label": "凌海市", "value": "210781" }, { "label": "北镇市", "value": "210782" }], [{ "label": "站前区", "value": "210802" }, { "label": "西市区", "value": "210803" }, { "label": "鲅鱼圈区", "value": "210804" }, { "label": "老边区", "value": "210811" }, { "label": "盖州市", "value": "210881" }, { "label": "大石桥市", "value": "210882" }], [{ "label": "海州区", "value": "210902" }, { "label": "新邱区", "value": "210903" }, { "label": "太平区", "value": "210904" }, { "label": "清河门区", "value": "210905" }, { "label": "细河区", "value": "210911" }, { "label": "阜新蒙古族自治县", "value": "210921" }, { "label": "彰武县", "value": "210922" }], [{ "label": "白塔区", "value": "211002" }, { "label": "文圣区", "value": "211003" }, { "label": "宏伟区", "value": "211004" }, { "label": "弓长岭区", "value": "211005" }, { "label": "太子河区", "value": "211011" }, { "label": "辽阳县", "value": "211021" }, { "label": "灯塔市", "value": "211081" }], [{ "label": "双台子区", "value": "211102" }, { "label": "兴隆台区", "value": "211103" }, { "label": "大洼区", "value": "211104" }, { "label": "盘山县", "value": "211122" }], [{ "label": "银州区", "value": "211202" }, { "label": "清河区", "value": "211204" }, { "label": "铁岭县", "value": "211221" }, { "label": "西丰县", "value": "211223" }, { "label": "昌图县", "value": "211224" }, { "label": "调兵山市", "value": "211281" }, { "label": "开原市", "value": "211282" }], [{ "label": "双塔区", "value": "211302" }, { "label": "龙城区", "value": "211303" }, { "label": "朝阳县", "value": "211321" }, { "label": "建平县", "value": "211322" }, { "label": "喀喇沁左翼蒙古族自治县", "value": "211324" }, { "label": "北票市", "value": "211381" }, { "label": "凌源市", "value": "211382" }], [{ "label": "连山区", "value": "211402" }, { "label": "龙港区", "value": "211403" }, { "label": "南票区", "value": "211404" }, { "label": "绥中县", "value": "211421" }, { "label": "建昌县", "value": "211422" }, { "label": "兴城市", "value": "211481" }]], [[{ "label": "南关区", "value": "220102" }, { "label": "宽城区", "value": "220103" }, { "label": "朝阳区", "value": "220104" }, { "label": "二道区", "value": "220105" }, { "label": "绿园区", "value": "220106" }, { "label": "双阳区", "value": "220112" }, { "label": "九台区", "value": "220113" }, { "label": "农安县", "value": "220122" }, { "label": "长春经济技术开发区", "value": "220171" }, { "label": "长春净月高新技术产业开发区", "value": "220172" }, { "label": "长春高新技术产业开发区", "value": "220173" }, { "label": "长春汽车经济技术开发区", "value": "220174" }, { "label": "榆树市", "value": "220182" }, { "label": "德惠市", "value": "220183" }], [{ "label": "昌邑区", "value": "220202" }, { "label": "龙潭区", "value": "220203" }, { "label": "船营区", "value": "220204" }, { "label": "丰满区", "value": "220211" }, { "label": "永吉县", "value": "220221" }, { "label": "吉林经济开发区", "value": "220271" }, { "label": "吉林高新技术产业开发区", "value": "220272" }, { "label": "吉林中国新加坡食品区", "value": "220273" }, { "label": "蛟河市", "value": "220281" }, { "label": "桦甸市", "value": "220282" }, { "label": "舒兰市", "value": "220283" }, { "label": "磐石市", "value": "220284" }], [{ "label": "铁西区", "value": "220302" }, { "label": "铁东区", "value": "220303" }, { "label": "梨树县", "value": "220322" }, { "label": "伊通满族自治县", "value": "220323" }, { "label": "公主岭市", "value": "220381" }, { "label": "双辽市", "value": "220382" }], [{ "label": "龙山区", "value": "220402" }, { "label": "西安区", "value": "220403" }, { "label": "东丰县", "value": "220421" }, { "label": "东辽县", "value": "220422" }], [{ "label": "东昌区", "value": "220502" }, { "label": "二道江区", "value": "220503" }, { "label": "通化县", "value": "220521" }, { "label": "辉南县", "value": "220523" }, { "label": "柳河县", "value": "220524" }, { "label": "梅河口市", "value": "220581" }, { "label": "集安市", "value": "220582" }], [{ "label": "浑江区", "value": "220602" }, { "label": "江源区", "value": "220605" }, { "label": "抚松县", "value": "220621" }, { "label": "靖宇县", "value": "220622" }, { "label": "长白朝鲜族自治县", "value": "220623" }, { "label": "临江市", "value": "220681" }], [{ "label": "宁江区", "value": "220702" }, { "label": "前郭尔罗斯蒙古族自治县", "value": "220721" }, { "label": "长岭县", "value": "220722" }, { "label": "乾安县", "value": "220723" }, { "label": "吉林松原经济开发区", "value": "220771" }, { "label": "扶余市", "value": "220781" }], [{ "label": "洮北区", "value": "220802" }, { "label": "镇赉县", "value": "220821" }, { "label": "通榆县", "value": "220822" }, { "label": "吉林白城经济开发区", "value": "220871" }, { "label": "洮南市", "value": "220881" }, { "label": "大安市", "value": "220882" }], [{ "label": "延吉市", "value": "222401" }, { "label": "图们市", "value": "222402" }, { "label": "敦化市", "value": "222403" }, { "label": "珲春市", "value": "222404" }, { "label": "龙井市", "value": "222405" }, { "label": "和龙市", "value": "222406" }, { "label": "汪清县", "value": "222424" }, { "label": "安图县", "value": "222426" }]], [[{ "label": "道里区", "value": "230102" }, { "label": "南岗区", "value": "230103" }, { "label": "道外区", "value": "230104" }, { "label": "平房区", "value": "230108" }, { "label": "松北区", "value": "230109" }, { "label": "香坊区", "value": "230110" }, { "label": "呼兰区", "value": "230111" }, { "label": "阿城区", "value": "230112" }, { "label": "双城区", "value": "230113" }, { "label": "依兰县", "value": "230123" }, { "label": "方正县", "value": "230124" }, { "label": "宾县", "value": "230125" }, { "label": "巴彦县", "value": "230126" }, { "label": "木兰县", "value": "230127" }, { "label": "通河县", "value": "230128" }, { "label": "延寿县", "value": "230129" }, { "label": "尚志市", "value": "230183" }, { "label": "五常市", "value": "230184" }], [{ "label": "龙沙区", "value": "230202" }, { "label": "建华区", "value": "230203" }, { "label": "铁锋区", "value": "230204" }, { "label": "昂昂溪区", "value": "230205" }, { "label": "富拉尔基区", "value": "230206" }, { "label": "碾子山区", "value": "230207" }, { "label": "梅里斯达斡尔族区", "value": "230208" }, { "label": "龙江县", "value": "230221" }, { "label": "依安县", "value": "230223" }, { "label": "泰来县", "value": "230224" }, { "label": "甘南县", "value": "230225" }, { "label": "富裕县", "value": "230227" }, { "label": "克山县", "value": "230229" }, { "label": "克东县", "value": "230230" }, { "label": "拜泉县", "value": "230231" }, { "label": "讷河市", "value": "230281" }], [{ "label": "鸡冠区", "value": "230302" }, { "label": "恒山区", "value": "230303" }, { "label": "滴道区", "value": "230304" }, { "label": "梨树区", "value": "230305" }, { "label": "城子河区", "value": "230306" }, { "label": "麻山区", "value": "230307" }, { "label": "鸡东县", "value": "230321" }, { "label": "虎林市", "value": "230381" }, { "label": "密山市", "value": "230382" }], [{ "label": "向阳区", "value": "230402" }, { "label": "工农区", "value": "230403" }, { "label": "南山区", "value": "230404" }, { "label": "兴安区", "value": "230405" }, { "label": "东山区", "value": "230406" }, { "label": "兴山区", "value": "230407" }, { "label": "萝北县", "value": "230421" }, { "label": "绥滨县", "value": "230422" }], [{ "label": "尖山区", "value": "230502" }, { "label": "岭东区", "value": "230503" }, { "label": "四方台区", "value": "230505" }, { "label": "宝山区", "value": "230506" }, { "label": "集贤县", "value": "230521" }, { "label": "友谊县", "value": "230522" }, { "label": "宝清县", "value": "230523" }, { "label": "饶河县", "value": "230524" }], [{ "label": "萨尔图区", "value": "230602" }, { "label": "龙凤区", "value": "230603" }, { "label": "让胡路区", "value": "230604" }, { "label": "红岗区", "value": "230605" }, { "label": "大同区", "value": "230606" }, { "label": "肇州县", "value": "230621" }, { "label": "肇源县", "value": "230622" }, { "label": "林甸县", "value": "230623" }, { "label": "杜尔伯特蒙古族自治县", "value": "230624" }, { "label": "大庆高新技术产业开发区", "value": "230671" }], [{ "label": "伊春区", "value": "230702" }, { "label": "南岔区", "value": "230703" }, { "label": "友好区", "value": "230704" }, { "label": "西林区", "value": "230705" }, { "label": "翠峦区", "value": "230706" }, { "label": "新青区", "value": "230707" }, { "label": "美溪区", "value": "230708" }, { "label": "金山屯区", "value": "230709" }, { "label": "五营区", "value": "230710" }, { "label": "乌马河区", "value": "230711" }, { "label": "汤旺河区", "value": "230712" }, { "label": "带岭区", "value": "230713" }, { "label": "乌伊岭区", "value": "230714" }, { "label": "红星区", "value": "230715" }, { "label": "上甘岭区", "value": "230716" }, { "label": "嘉荫县", "value": "230722" }, { "label": "铁力市", "value": "230781" }], [{ "label": "向阳区", "value": "230803" }, { "label": "前进区", "value": "230804" }, { "label": "东风区", "value": "230805" }, { "label": "郊区", "value": "230811" }, { "label": "桦南县", "value": "230822" }, { "label": "桦川县", "value": "230826" }, { "label": "汤原县", "value": "230828" }, { "label": "同江市", "value": "230881" }, { "label": "富锦市", "value": "230882" }, { "label": "抚远市", "value": "230883" }], [{ "label": "新兴区", "value": "230902" }, { "label": "桃山区", "value": "230903" }, { "label": "茄子河区", "value": "230904" }, { "label": "勃利县", "value": "230921" }], [{ "label": "东安区", "value": "231002" }, { "label": "阳明区", "value": "231003" }, { "label": "爱民区", "value": "231004" }, { "label": "西安区", "value": "231005" }, { "label": "林口县", "value": "231025" }, { "label": "牡丹江经济技术开发区", "value": "231071" }, { "label": "绥芬河市", "value": "231081" }, { "label": "海林市", "value": "231083" }, { "label": "宁安市", "value": "231084" }, { "label": "穆棱市", "value": "231085" }, { "label": "东宁市", "value": "231086" }], [{ "label": "爱辉区", "value": "231102" }, { "label": "嫩江县", "value": "231121" }, { "label": "逊克县", "value": "231123" }, { "label": "孙吴县", "value": "231124" }, { "label": "北安市", "value": "231181" }, { "label": "五大连池市", "value": "231182" }], [{ "label": "北林区", "value": "231202" }, { "label": "望奎县", "value": "231221" }, { "label": "兰西县", "value": "231222" }, { "label": "青冈县", "value": "231223" }, { "label": "庆安县", "value": "231224" }, { "label": "明水县", "value": "231225" }, { "label": "绥棱县", "value": "231226" }, { "label": "安达市", "value": "231281" }, { "label": "肇东市", "value": "231282" }, { "label": "海伦市", "value": "231283" }], [{ "label": "加格达奇区", "value": "232701" }, { "label": "松岭区", "value": "232702" }, { "label": "新林区", "value": "232703" }, { "label": "呼中区", "value": "232704" }, { "label": "呼玛县", "value": "232721" }, { "label": "塔河县", "value": "232722" }, { "label": "漠河县", "value": "232723" }]], [[{ "label": "黄浦区", "value": "310101" }, { "label": "徐汇区", "value": "310104" }, { "label": "长宁区", "value": "310105" }, { "label": "静安区", "value": "310106" }, { "label": "普陀区", "value": "310107" }, { "label": "虹口区", "value": "310109" }, { "label": "杨浦区", "value": "310110" }, { "label": "闵行区", "value": "310112" }, { "label": "宝山区", "value": "310113" }, { "label": "嘉定区", "value": "310114" }, { "label": "浦东新区", "value": "310115" }, { "label": "金山区", "value": "310116" }, { "label": "松江区", "value": "310117" }, { "label": "青浦区", "value": "310118" }, { "label": "奉贤区", "value": "310120" }, { "label": "崇明区", "value": "310151" }]], [[{ "label": "玄武区", "value": "320102" }, { "label": "秦淮区", "value": "320104" }, { "label": "建邺区", "value": "320105" }, { "label": "鼓楼区", "value": "320106" }, { "label": "浦口区", "value": "320111" }, { "label": "栖霞区", "value": "320113" }, { "label": "雨花台区", "value": "320114" }, { "label": "江宁区", "value": "320115" }, { "label": "六合区", "value": "320116" }, { "label": "溧水区", "value": "320117" }, { "label": "高淳区", "value": "320118" }], [{ "label": "锡山区", "value": "320205" }, { "label": "惠山区", "value": "320206" }, { "label": "滨湖区", "value": "320211" }, { "label": "梁溪区", "value": "320213" }, { "label": "新吴区", "value": "320214" }, { "label": "江阴市", "value": "320281" }, { "label": "宜兴市", "value": "320282" }], [{ "label": "鼓楼区", "value": "320302" }, { "label": "云龙区", "value": "320303" }, { "label": "贾汪区", "value": "320305" }, { "label": "泉山区", "value": "320311" }, { "label": "铜山区", "value": "320312" }, { "label": "丰县", "value": "320321" }, { "label": "沛县", "value": "320322" }, { "label": "睢宁县", "value": "320324" }, { "label": "徐州经济技术开发区", "value": "320371" }, { "label": "新沂市", "value": "320381" }, { "label": "邳州市", "value": "320382" }], [{ "label": "天宁区", "value": "320402" }, { "label": "钟楼区", "value": "320404" }, { "label": "新北区", "value": "320411" }, { "label": "武进区", "value": "320412" }, { "label": "金坛区", "value": "320413" }, { "label": "溧阳市", "value": "320481" }], [{ "label": "虎丘区", "value": "320505" }, { "label": "吴中区", "value": "320506" }, { "label": "相城区", "value": "320507" }, { "label": "姑苏区", "value": "320508" }, { "label": "吴江区", "value": "320509" }, { "label": "苏州工业园区", "value": "320571" }, { "label": "常熟市", "value": "320581" }, { "label": "张家港市", "value": "320582" }, { "label": "昆山市", "value": "320583" }, { "label": "太仓市", "value": "320585" }], [{ "label": "崇川区", "value": "320602" }, { "label": "港闸区", "value": "320611" }, { "label": "通州区", "value": "320612" }, { "label": "海安县", "value": "320621" }, { "label": "如东县", "value": "320623" }, { "label": "南通经济技术开发区", "value": "320671" }, { "label": "启东市", "value": "320681" }, { "label": "如皋市", "value": "320682" }, { "label": "海门市", "value": "320684" }], [{ "label": "连云区", "value": "320703" }, { "label": "海州区", "value": "320706" }, { "label": "赣榆区", "value": "320707" }, { "label": "东海县", "value": "320722" }, { "label": "灌云县", "value": "320723" }, { "label": "灌南县", "value": "320724" }, { "label": "连云港经济技术开发区", "value": "320771" }, { "label": "连云港高新技术产业开发区", "value": "320772" }], [{ "label": "淮安区", "value": "320803" }, { "label": "淮阴区", "value": "320804" }, { "label": "清江浦区", "value": "320812" }, { "label": "洪泽区", "value": "320813" }, { "label": "涟水县", "value": "320826" }, { "label": "盱眙县", "value": "320830" }, { "label": "金湖县", "value": "320831" }, { "label": "淮安经济技术开发区", "value": "320871" }], [{ "label": "亭湖区", "value": "320902" }, { "label": "盐都区", "value": "320903" }, { "label": "大丰区", "value": "320904" }, { "label": "响水县", "value": "320921" }, { "label": "滨海县", "value": "320922" }, { "label": "阜宁县", "value": "320923" }, { "label": "射阳县", "value": "320924" }, { "label": "建湖县", "value": "320925" }, { "label": "盐城经济技术开发区", "value": "320971" }, { "label": "东台市", "value": "320981" }], [{ "label": "广陵区", "value": "321002" }, { "label": "邗江区", "value": "321003" }, { "label": "江都区", "value": "321012" }, { "label": "宝应县", "value": "321023" }, { "label": "扬州经济技术开发区", "value": "321071" }, { "label": "仪征市", "value": "321081" }, { "label": "高邮市", "value": "321084" }], [{ "label": "京口区", "value": "321102" }, { "label": "润州区", "value": "321111" }, { "label": "丹徒区", "value": "321112" }, { "label": "镇江新区", "value": "321171" }, { "label": "丹阳市", "value": "321181" }, { "label": "扬中市", "value": "321182" }, { "label": "句容市", "value": "321183" }], [{ "label": "海陵区", "value": "321202" }, { "label": "高港区", "value": "321203" }, { "label": "姜堰区", "value": "321204" }, { "label": "泰州医药高新技术产业开发区", "value": "321271" }, { "label": "兴化市", "value": "321281" }, { "label": "靖江市", "value": "321282" }, { "label": "泰兴市", "value": "321283" }], [{ "label": "宿城区", "value": "321302" }, { "label": "宿豫区", "value": "321311" }, { "label": "沭阳县", "value": "321322" }, { "label": "泗阳县", "value": "321323" }, { "label": "泗洪县", "value": "321324" }, { "label": "宿迁经济技术开发区", "value": "321371" }]], [[{ "label": "上城区", "value": "330102" }, { "label": "下城区", "value": "330103" }, { "label": "江干区", "value": "330104" }, { "label": "拱墅区", "value": "330105" }, { "label": "西湖区", "value": "330106" }, { "label": "滨江区", "value": "330108" }, { "label": "萧山区", "value": "330109" }, { "label": "余杭区", "value": "330110" }, { "label": "富阳区", "value": "330111" }, { "label": "临安区", "value": "330112" }, { "label": "桐庐县", "value": "330122" }, { "label": "淳安县", "value": "330127" }, { "label": "建德市", "value": "330182" }], [{ "label": "海曙区", "value": "330203" }, { "label": "江北区", "value": "330205" }, { "label": "北仑区", "value": "330206" }, { "label": "镇海区", "value": "330211" }, { "label": "鄞州区", "value": "330212" }, { "label": "奉化区", "value": "330213" }, { "label": "象山县", "value": "330225" }, { "label": "宁海县", "value": "330226" }, { "label": "余姚市", "value": "330281" }, { "label": "慈溪市", "value": "330282" }], [{ "label": "鹿城区", "value": "330302" }, { "label": "龙湾区", "value": "330303" }, { "label": "瓯海区", "value": "330304" }, { "label": "洞头区", "value": "330305" }, { "label": "永嘉县", "value": "330324" }, { "label": "平阳县", "value": "330326" }, { "label": "苍南县", "value": "330327" }, { "label": "文成县", "value": "330328" }, { "label": "泰顺县", "value": "330329" }, { "label": "温州经济技术开发区", "value": "330371" }, { "label": "瑞安市", "value": "330381" }, { "label": "乐清市", "value": "330382" }], [{ "label": "南湖区", "value": "330402" }, { "label": "秀洲区", "value": "330411" }, { "label": "嘉善县", "value": "330421" }, { "label": "海盐县", "value": "330424" }, { "label": "海宁市", "value": "330481" }, { "label": "平湖市", "value": "330482" }, { "label": "桐乡市", "value": "330483" }], [{ "label": "吴兴区", "value": "330502" }, { "label": "南浔区", "value": "330503" }, { "label": "德清县", "value": "330521" }, { "label": "长兴县", "value": "330522" }, { "label": "安吉县", "value": "330523" }], [{ "label": "越城区", "value": "330602" }, { "label": "柯桥区", "value": "330603" }, { "label": "上虞区", "value": "330604" }, { "label": "新昌县", "value": "330624" }, { "label": "诸暨市", "value": "330681" }, { "label": "嵊州市", "value": "330683" }], [{ "label": "婺城区", "value": "330702" }, { "label": "金东区", "value": "330703" }, { "label": "武义县", "value": "330723" }, { "label": "浦江县", "value": "330726" }, { "label": "磐安县", "value": "330727" }, { "label": "兰溪市", "value": "330781" }, { "label": "义乌市", "value": "330782" }, { "label": "东阳市", "value": "330783" }, { "label": "永康市", "value": "330784" }], [{ "label": "柯城区", "value": "330802" }, { "label": "衢江区", "value": "330803" }, { "label": "常山县", "value": "330822" }, { "label": "开化县", "value": "330824" }, { "label": "龙游县", "value": "330825" }, { "label": "江山市", "value": "330881" }], [{ "label": "定海区", "value": "330902" }, { "label": "普陀区", "value": "330903" }, { "label": "岱山县", "value": "330921" }, { "label": "嵊泗县", "value": "330922" }], [{ "label": "椒江区", "value": "331002" }, { "label": "黄岩区", "value": "331003" }, { "label": "路桥区", "value": "331004" }, { "label": "三门县", "value": "331022" }, { "label": "天台县", "value": "331023" }, { "label": "仙居县", "value": "331024" }, { "label": "温岭市", "value": "331081" }, { "label": "临海市", "value": "331082" }, { "label": "玉环市", "value": "331083" }], [{ "label": "莲都区", "value": "331102" }, { "label": "青田县", "value": "331121" }, { "label": "缙云县", "value": "331122" }, { "label": "遂昌县", "value": "331123" }, { "label": "松阳县", "value": "331124" }, { "label": "云和县", "value": "331125" }, { "label": "庆元县", "value": "331126" }, { "label": "景宁畲族自治县", "value": "331127" }, { "label": "龙泉市", "value": "331181" }]], [[{ "label": "瑶海区", "value": "340102" }, { "label": "庐阳区", "value": "340103" }, { "label": "蜀山区", "value": "340104" }, { "label": "包河区", "value": "340111" }, { "label": "长丰县", "value": "340121" }, { "label": "肥东县", "value": "340122" }, { "label": "肥西县", "value": "340123" }, { "label": "庐江县", "value": "340124" }, { "label": "合肥高新技术产业开发区", "value": "340171" }, { "label": "合肥经济技术开发区", "value": "340172" }, { "label": "合肥新站高新技术产业开发区", "value": "340173" }, { "label": "巢湖市", "value": "340181" }], [{ "label": "镜湖区", "value": "340202" }, { "label": "弋江区", "value": "340203" }, { "label": "鸠江区", "value": "340207" }, { "label": "三山区", "value": "340208" }, { "label": "芜湖县", "value": "340221" }, { "label": "繁昌县", "value": "340222" }, { "label": "南陵县", "value": "340223" }, { "label": "无为县", "value": "340225" }, { "label": "芜湖经济技术开发区", "value": "340271" }, { "label": "安徽芜湖长江大桥经济开发区", "value": "340272" }], [{ "label": "龙子湖区", "value": "340302" }, { "label": "蚌山区", "value": "340303" }, { "label": "禹会区", "value": "340304" }, { "label": "淮上区", "value": "340311" }, { "label": "怀远县", "value": "340321" }, { "label": "五河县", "value": "340322" }, { "label": "固镇县", "value": "340323" }, { "label": "蚌埠市高新技术开发区", "value": "340371" }, { "label": "蚌埠市经济开发区", "value": "340372" }], [{ "label": "大通区", "value": "340402" }, { "label": "田家庵区", "value": "340403" }, { "label": "谢家集区", "value": "340404" }, { "label": "八公山区", "value": "340405" }, { "label": "潘集区", "value": "340406" }, { "label": "凤台县", "value": "340421" }, { "label": "寿县", "value": "340422" }], [{ "label": "花山区", "value": "340503" }, { "label": "雨山区", "value": "340504" }, { "label": "博望区", "value": "340506" }, { "label": "当涂县", "value": "340521" }, { "label": "含山县", "value": "340522" }, { "label": "和县", "value": "340523" }], [{ "label": "杜集区", "value": "340602" }, { "label": "相山区", "value": "340603" }, { "label": "烈山区", "value": "340604" }, { "label": "濉溪县", "value": "340621" }], [{ "label": "铜官区", "value": "340705" }, { "label": "义安区", "value": "340706" }, { "label": "郊区", "value": "340711" }, { "label": "枞阳县", "value": "340722" }], [{ "label": "迎江区", "value": "340802" }, { "label": "大观区", "value": "340803" }, { "label": "宜秀区", "value": "340811" }, { "label": "怀宁县", "value": "340822" }, { "label": "潜山县", "value": "340824" }, { "label": "太湖县", "value": "340825" }, { "label": "宿松县", "value": "340826" }, { "label": "望江县", "value": "340827" }, { "label": "岳西县", "value": "340828" }, { "label": "安徽安庆经济开发区", "value": "340871" }, { "label": "桐城市", "value": "340881" }], [{ "label": "屯溪区", "value": "341002" }, { "label": "黄山区", "value": "341003" }, { "label": "徽州区", "value": "341004" }, { "label": "歙县", "value": "341021" }, { "label": "休宁县", "value": "341022" }, { "label": "黟县", "value": "341023" }, { "label": "祁门县", "value": "341024" }], [{ "label": "琅琊区", "value": "341102" }, { "label": "南谯区", "value": "341103" }, { "label": "来安县", "value": "341122" }, { "label": "全椒县", "value": "341124" }, { "label": "定远县", "value": "341125" }, { "label": "凤阳县", "value": "341126" }, { "label": "苏滁现代产业园", "value": "341171" }, { "label": "滁州经济技术开发区", "value": "341172" }, { "label": "天长市", "value": "341181" }, { "label": "明光市", "value": "341182" }], [{ "label": "颍州区", "value": "341202" }, { "label": "颍东区", "value": "341203" }, { "label": "颍泉区", "value": "341204" }, { "label": "临泉县", "value": "341221" }, { "label": "太和县", "value": "341222" }, { "label": "阜南县", "value": "341225" }, { "label": "颍上县", "value": "341226" }, { "label": "阜阳合肥现代产业园区", "value": "341271" }, { "label": "阜阳经济技术开发区", "value": "341272" }, { "label": "界首市", "value": "341282" }], [{ "label": "埇桥区", "value": "341302" }, { "label": "砀山县", "value": "341321" }, { "label": "萧县", "value": "341322" }, { "label": "灵璧县", "value": "341323" }, { "label": "泗县", "value": "341324" }, { "label": "宿州马鞍山现代产业园区", "value": "341371" }, { "label": "宿州经济技术开发区", "value": "341372" }], [{ "label": "金安区", "value": "341502" }, { "label": "裕安区", "value": "341503" }, { "label": "叶集区", "value": "341504" }, { "label": "霍邱县", "value": "341522" }, { "label": "舒城县", "value": "341523" }, { "label": "金寨县", "value": "341524" }, { "label": "霍山县", "value": "341525" }], [{ "label": "谯城区", "value": "341602" }, { "label": "涡阳县", "value": "341621" }, { "label": "蒙城县", "value": "341622" }, { "label": "利辛县", "value": "341623" }], [{ "label": "贵池区", "value": "341702" }, { "label": "东至县", "value": "341721" }, { "label": "石台县", "value": "341722" }, { "label": "青阳县", "value": "341723" }], [{ "label": "宣州区", "value": "341802" }, { "label": "郎溪县", "value": "341821" }, { "label": "广德县", "value": "341822" }, { "label": "泾县", "value": "341823" }, { "label": "绩溪县", "value": "341824" }, { "label": "旌德县", "value": "341825" }, { "label": "宣城市经济开发区", "value": "341871" }, { "label": "宁国市", "value": "341881" }]], [[{ "label": "鼓楼区", "value": "350102" }, { "label": "台江区", "value": "350103" }, { "label": "仓山区", "value": "350104" }, { "label": "马尾区", "value": "350105" }, { "label": "晋安区", "value": "350111" }, { "label": "闽侯县", "value": "350121" }, { "label": "连江县", "value": "350122" }, { "label": "罗源县", "value": "350123" }, { "label": "闽清县", "value": "350124" }, { "label": "永泰县", "value": "350125" }, { "label": "平潭县", "value": "350128" }, { "label": "福清市", "value": "350181" }, { "label": "长乐市", "value": "350182" }], [{ "label": "思明区", "value": "350203" }, { "label": "海沧区", "value": "350205" }, { "label": "湖里区", "value": "350206" }, { "label": "集美区", "value": "350211" }, { "label": "同安区", "value": "350212" }, { "label": "翔安区", "value": "350213" }], [{ "label": "城厢区", "value": "350302" }, { "label": "涵江区", "value": "350303" }, { "label": "荔城区", "value": "350304" }, { "label": "秀屿区", "value": "350305" }, { "label": "仙游县", "value": "350322" }], [{ "label": "梅列区", "value": "350402" }, { "label": "三元区", "value": "350403" }, { "label": "明溪县", "value": "350421" }, { "label": "清流县", "value": "350423" }, { "label": "宁化县", "value": "350424" }, { "label": "大田县", "value": "350425" }, { "label": "尤溪县", "value": "350426" }, { "label": "沙县", "value": "350427" }, { "label": "将乐县", "value": "350428" }, { "label": "泰宁县", "value": "350429" }, { "label": "建宁县", "value": "350430" }, { "label": "永安市", "value": "350481" }], [{ "label": "鲤城区", "value": "350502" }, { "label": "丰泽区", "value": "350503" }, { "label": "洛江区", "value": "350504" }, { "label": "泉港区", "value": "350505" }, { "label": "惠安县", "value": "350521" }, { "label": "安溪县", "value": "350524" }, { "label": "永春县", "value": "350525" }, { "label": "德化县", "value": "350526" }, { "label": "金门县", "value": "350527" }, { "label": "石狮市", "value": "350581" }, { "label": "晋江市", "value": "350582" }, { "label": "南安市", "value": "350583" }], [{ "label": "芗城区", "value": "350602" }, { "label": "龙文区", "value": "350603" }, { "label": "云霄县", "value": "350622" }, { "label": "漳浦县", "value": "350623" }, { "label": "诏安县", "value": "350624" }, { "label": "长泰县", "value": "350625" }, { "label": "东山县", "value": "350626" }, { "label": "南靖县", "value": "350627" }, { "label": "平和县", "value": "350628" }, { "label": "华安县", "value": "350629" }, { "label": "龙海市", "value": "350681" }], [{ "label": "延平区", "value": "350702" }, { "label": "建阳区", "value": "350703" }, { "label": "顺昌县", "value": "350721" }, { "label": "浦城县", "value": "350722" }, { "label": "光泽县", "value": "350723" }, { "label": "松溪县", "value": "350724" }, { "label": "政和县", "value": "350725" }, { "label": "邵武市", "value": "350781" }, { "label": "武夷山市", "value": "350782" }, { "label": "建瓯市", "value": "350783" }], [{ "label": "新罗区", "value": "350802" }, { "label": "永定区", "value": "350803" }, { "label": "长汀县", "value": "350821" }, { "label": "上杭县", "value": "350823" }, { "label": "武平县", "value": "350824" }, { "label": "连城县", "value": "350825" }, { "label": "漳平市", "value": "350881" }], [{ "label": "蕉城区", "value": "350902" }, { "label": "霞浦县", "value": "350921" }, { "label": "古田县", "value": "350922" }, { "label": "屏南县", "value": "350923" }, { "label": "寿宁县", "value": "350924" }, { "label": "周宁县", "value": "350925" }, { "label": "柘荣县", "value": "350926" }, { "label": "福安市", "value": "350981" }, { "label": "福鼎市", "value": "350982" }]], [[{ "label": "东湖区", "value": "360102" }, { "label": "西湖区", "value": "360103" }, { "label": "青云谱区", "value": "360104" }, { "label": "湾里区", "value": "360105" }, { "label": "青山湖区", "value": "360111" }, { "label": "新建区", "value": "360112" }, { "label": "南昌县", "value": "360121" }, { "label": "安义县", "value": "360123" }, { "label": "进贤县", "value": "360124" }], [{ "label": "昌江区", "value": "360202" }, { "label": "珠山区", "value": "360203" }, { "label": "浮梁县", "value": "360222" }, { "label": "乐平市", "value": "360281" }], [{ "label": "安源区", "value": "360302" }, { "label": "湘东区", "value": "360313" }, { "label": "莲花县", "value": "360321" }, { "label": "上栗县", "value": "360322" }, { "label": "芦溪县", "value": "360323" }], [{ "label": "濂溪区", "value": "360402" }, { "label": "浔阳区", "value": "360403" }, { "label": "柴桑区", "value": "360404" }, { "label": "武宁县", "value": "360423" }, { "label": "修水县", "value": "360424" }, { "label": "永修县", "value": "360425" }, { "label": "德安县", "value": "360426" }, { "label": "都昌县", "value": "360428" }, { "label": "湖口县", "value": "360429" }, { "label": "彭泽县", "value": "360430" }, { "label": "瑞昌市", "value": "360481" }, { "label": "共青城市", "value": "360482" }, { "label": "庐山市", "value": "360483" }], [{ "label": "渝水区", "value": "360502" }, { "label": "分宜县", "value": "360521" }], [{ "label": "月湖区", "value": "360602" }, { "label": "余江县", "value": "360622" }, { "label": "贵溪市", "value": "360681" }], [{ "label": "章贡区", "value": "360702" }, { "label": "南康区", "value": "360703" }, { "label": "赣县区", "value": "360704" }, { "label": "信丰县", "value": "360722" }, { "label": "大余县", "value": "360723" }, { "label": "上犹县", "value": "360724" }, { "label": "崇义县", "value": "360725" }, { "label": "安远县", "value": "360726" }, { "label": "龙南县", "value": "360727" }, { "label": "定南县", "value": "360728" }, { "label": "全南县", "value": "360729" }, { "label": "宁都县", "value": "360730" }, { "label": "于都县", "value": "360731" }, { "label": "兴国县", "value": "360732" }, { "label": "会昌县", "value": "360733" }, { "label": "寻乌县", "value": "360734" }, { "label": "石城县", "value": "360735" }, { "label": "瑞金市", "value": "360781" }], [{ "label": "吉州区", "value": "360802" }, { "label": "青原区", "value": "360803" }, { "label": "吉安县", "value": "360821" }, { "label": "吉水县", "value": "360822" }, { "label": "峡江县", "value": "360823" }, { "label": "新干县", "value": "360824" }, { "label": "永丰县", "value": "360825" }, { "label": "泰和县", "value": "360826" }, { "label": "遂川县", "value": "360827" }, { "label": "万安县", "value": "360828" }, { "label": "安福县", "value": "360829" }, { "label": "永新县", "value": "360830" }, { "label": "井冈山市", "value": "360881" }], [{ "label": "袁州区", "value": "360902" }, { "label": "奉新县", "value": "360921" }, { "label": "万载县", "value": "360922" }, { "label": "上高县", "value": "360923" }, { "label": "宜丰县", "value": "360924" }, { "label": "靖安县", "value": "360925" }, { "label": "铜鼓县", "value": "360926" }, { "label": "丰城市", "value": "360981" }, { "label": "樟树市", "value": "360982" }, { "label": "高安市", "value": "360983" }], [{ "label": "临川区", "value": "361002" }, { "label": "东乡区", "value": "361003" }, { "label": "南城县", "value": "361021" }, { "label": "黎川县", "value": "361022" }, { "label": "南丰县", "value": "361023" }, { "label": "崇仁县", "value": "361024" }, { "label": "乐安县", "value": "361025" }, { "label": "宜黄县", "value": "361026" }, { "label": "金溪县", "value": "361027" }, { "label": "资溪县", "value": "361028" }, { "label": "广昌县", "value": "361030" }], [{ "label": "信州区", "value": "361102" }, { "label": "广丰区", "value": "361103" }, { "label": "上饶县", "value": "361121" }, { "label": "玉山县", "value": "361123" }, { "label": "铅山县", "value": "361124" }, { "label": "横峰县", "value": "361125" }, { "label": "弋阳县", "value": "361126" }, { "label": "余干县", "value": "361127" }, { "label": "鄱阳县", "value": "361128" }, { "label": "万年县", "value": "361129" }, { "label": "婺源县", "value": "361130" }, { "label": "德兴市", "value": "361181" }]], [[{ "label": "历下区", "value": "370102" }, { "label": "市中区", "value": "370103" }, { "label": "槐荫区", "value": "370104" }, { "label": "天桥区", "value": "370105" }, { "label": "历城区", "value": "370112" }, { "label": "长清区", "value": "370113" }, { "label": "章丘区", "value": "370114" }, { "label": "平阴县", "value": "370124" }, { "label": "济阳县", "value": "370125" }, { "label": "商河县", "value": "370126" }, { "label": "济南高新技术产业开发区", "value": "370171" }], [{ "label": "市南区", "value": "370202" }, { "label": "市北区", "value": "370203" }, { "label": "黄岛区", "value": "370211" }, { "label": "崂山区", "value": "370212" }, { "label": "李沧区", "value": "370213" }, { "label": "城阳区", "value": "370214" }, { "label": "即墨区", "value": "370215" }, { "label": "青岛高新技术产业开发区", "value": "370271" }, { "label": "胶州市", "value": "370281" }, { "label": "平度市", "value": "370283" }, { "label": "莱西市", "value": "370285" }], [{ "label": "淄川区", "value": "370302" }, { "label": "张店区", "value": "370303" }, { "label": "博山区", "value": "370304" }, { "label": "临淄区", "value": "370305" }, { "label": "周村区", "value": "370306" }, { "label": "桓台县", "value": "370321" }, { "label": "高青县", "value": "370322" }, { "label": "沂源县", "value": "370323" }], [{ "label": "市中区", "value": "370402" }, { "label": "薛城区", "value": "370403" }, { "label": "峄城区", "value": "370404" }, { "label": "台儿庄区", "value": "370405" }, { "label": "山亭区", "value": "370406" }, { "label": "滕州市", "value": "370481" }], [{ "label": "东营区", "value": "370502" }, { "label": "河口区", "value": "370503" }, { "label": "垦利区", "value": "370505" }, { "label": "利津县", "value": "370522" }, { "label": "广饶县", "value": "370523" }, { "label": "东营经济技术开发区", "value": "370571" }, { "label": "东营港经济开发区", "value": "370572" }], [{ "label": "芝罘区", "value": "370602" }, { "label": "福山区", "value": "370611" }, { "label": "牟平区", "value": "370612" }, { "label": "莱山区", "value": "370613" }, { "label": "长岛县", "value": "370634" }, { "label": "烟台高新技术产业开发区", "value": "370671" }, { "label": "烟台经济技术开发区", "value": "370672" }, { "label": "龙口市", "value": "370681" }, { "label": "莱阳市", "value": "370682" }, { "label": "莱州市", "value": "370683" }, { "label": "蓬莱市", "value": "370684" }, { "label": "招远市", "value": "370685" }, { "label": "栖霞市", "value": "370686" }, { "label": "海阳市", "value": "370687" }], [{ "label": "潍城区", "value": "370702" }, { "label": "寒亭区", "value": "370703" }, { "label": "坊子区", "value": "370704" }, { "label": "奎文区", "value": "370705" }, { "label": "临朐县", "value": "370724" }, { "label": "昌乐县", "value": "370725" }, { "label": "潍坊滨海经济技术开发区", "value": "370772" }, { "label": "青州市", "value": "370781" }, { "label": "诸城市", "value": "370782" }, { "label": "寿光市", "value": "370783" }, { "label": "安丘市", "value": "370784" }, { "label": "高密市", "value": "370785" }, { "label": "昌邑市", "value": "370786" }], [{ "label": "任城区", "value": "370811" }, { "label": "兖州区", "value": "370812" }, { "label": "微山县", "value": "370826" }, { "label": "鱼台县", "value": "370827" }, { "label": "金乡县", "value": "370828" }, { "label": "嘉祥县", "value": "370829" }, { "label": "汶上县", "value": "370830" }, { "label": "泗水县", "value": "370831" }, { "label": "梁山县", "value": "370832" }, { "label": "济宁高新技术产业开发区", "value": "370871" }, { "label": "曲阜市", "value": "370881" }, { "label": "邹城市", "value": "370883" }], [{ "label": "泰山区", "value": "370902" }, { "label": "岱岳区", "value": "370911" }, { "label": "宁阳县", "value": "370921" }, { "label": "东平县", "value": "370923" }, { "label": "新泰市", "value": "370982" }, { "label": "肥城市", "value": "370983" }], [{ "label": "环翠区", "value": "371002" }, { "label": "文登区", "value": "371003" }, { "label": "威海火炬高技术产业开发区", "value": "371071" }, { "label": "威海经济技术开发区", "value": "371072" }, { "label": "威海临港经济技术开发区", "value": "371073" }, { "label": "荣成市", "value": "371082" }, { "label": "乳山市", "value": "371083" }], [{ "label": "东港区", "value": "371102" }, { "label": "岚山区", "value": "371103" }, { "label": "五莲县", "value": "371121" }, { "label": "莒县", "value": "371122" }, { "label": "日照经济技术开发区", "value": "371171" }, { "label": "日照国际海洋城", "value": "371172" }], [{ "label": "莱城区", "value": "371202" }, { "label": "钢城区", "value": "371203" }], [{ "label": "兰山区", "value": "371302" }, { "label": "罗庄区", "value": "371311" }, { "label": "河东区", "value": "371312" }, { "label": "沂南县", "value": "371321" }, { "label": "郯城县", "value": "371322" }, { "label": "沂水县", "value": "371323" }, { "label": "兰陵县", "value": "371324" }, { "label": "费县", "value": "371325" }, { "label": "平邑县", "value": "371326" }, { "label": "莒南县", "value": "371327" }, { "label": "蒙阴县", "value": "371328" }, { "label": "临沭县", "value": "371329" }, { "label": "临沂高新技术产业开发区", "value": "371371" }, { "label": "临沂经济技术开发区", "value": "371372" }, { "label": "临沂临港经济开发区", "value": "371373" }], [{ "label": "德城区", "value": "371402" }, { "label": "陵城区", "value": "371403" }, { "label": "宁津县", "value": "371422" }, { "label": "庆云县", "value": "371423" }, { "label": "临邑县", "value": "371424" }, { "label": "齐河县", "value": "371425" }, { "label": "平原县", "value": "371426" }, { "label": "夏津县", "value": "371427" }, { "label": "武城县", "value": "371428" }, { "label": "德州经济技术开发区", "value": "371471" }, { "label": "德州运河经济开发区", "value": "371472" }, { "label": "乐陵市", "value": "371481" }, { "label": "禹城市", "value": "371482" }], [{ "label": "东昌府区", "value": "371502" }, { "label": "阳谷县", "value": "371521" }, { "label": "莘县", "value": "371522" }, { "label": "茌平县", "value": "371523" }, { "label": "东阿县", "value": "371524" }, { "label": "冠县", "value": "371525" }, { "label": "高唐县", "value": "371526" }, { "label": "临清市", "value": "371581" }], [{ "label": "滨城区", "value": "371602" }, { "label": "沾化区", "value": "371603" }, { "label": "惠民县", "value": "371621" }, { "label": "阳信县", "value": "371622" }, { "label": "无棣县", "value": "371623" }, { "label": "博兴县", "value": "371625" }, { "label": "邹平县", "value": "371626" }], [{ "label": "牡丹区", "value": "371702" }, { "label": "定陶区", "value": "371703" }, { "label": "曹县", "value": "371721" }, { "label": "单县", "value": "371722" }, { "label": "成武县", "value": "371723" }, { "label": "巨野县", "value": "371724" }, { "label": "郓城县", "value": "371725" }, { "label": "鄄城县", "value": "371726" }, { "label": "东明县", "value": "371728" }, { "label": "菏泽经济技术开发区", "value": "371771" }, { "label": "菏泽高新技术开发区", "value": "371772" }]], [[{ "label": "中原区", "value": "410102" }, { "label": "二七区", "value": "410103" }, { "label": "管城回族区", "value": "410104" }, { "label": "金水区", "value": "410105" }, { "label": "上街区", "value": "410106" }, { "label": "惠济区", "value": "410108" }, { "label": "中牟县", "value": "410122" }, { "label": "郑州经济技术开发区", "value": "410171" }, { "label": "郑州高新技术产业开发区", "value": "410172" }, { "label": "郑州航空港经济综合实验区", "value": "410173" }, { "label": "巩义市", "value": "410181" }, { "label": "荥阳市", "value": "410182" }, { "label": "新密市", "value": "410183" }, { "label": "新郑市", "value": "410184" }, { "label": "登封市", "value": "410185" }], [{ "label": "龙亭区", "value": "410202" }, { "label": "顺河回族区", "value": "410203" }, { "label": "鼓楼区", "value": "410204" }, { "label": "禹王台区", "value": "410205" }, { "label": "祥符区", "value": "410212" }, { "label": "杞县", "value": "410221" }, { "label": "通许县", "value": "410222" }, { "label": "尉氏县", "value": "410223" }, { "label": "兰考县", "value": "410225" }], [{ "label": "老城区", "value": "410302" }, { "label": "西工区", "value": "410303" }, { "label": "瀍河回族区", "value": "410304" }, { "label": "涧西区", "value": "410305" }, { "label": "吉利区", "value": "410306" }, { "label": "洛龙区", "value": "410311" }, { "label": "孟津县", "value": "410322" }, { "label": "新安县", "value": "410323" }, { "label": "栾川县", "value": "410324" }, { "label": "嵩县", "value": "410325" }, { "label": "汝阳县", "value": "410326" }, { "label": "宜阳县", "value": "410327" }, { "label": "洛宁县", "value": "410328" }, { "label": "伊川县", "value": "410329" }, { "label": "洛阳高新技术产业开发区", "value": "410371" }, { "label": "偃师市", "value": "410381" }], [{ "label": "新华区", "value": "410402" }, { "label": "卫东区", "value": "410403" }, { "label": "石龙区", "value": "410404" }, { "label": "湛河区", "value": "410411" }, { "label": "宝丰县", "value": "410421" }, { "label": "叶县", "value": "410422" }, { "label": "鲁山县", "value": "410423" }, { "label": "郏县", "value": "410425" }, { "label": "平顶山高新技术产业开发区", "value": "410471" }, { "label": "平顶山市新城区", "value": "410472" }, { "label": "舞钢市", "value": "410481" }, { "label": "汝州市", "value": "410482" }], [{ "label": "文峰区", "value": "410502" }, { "label": "北关区", "value": "410503" }, { "label": "殷都区", "value": "410505" }, { "label": "龙安区", "value": "410506" }, { "label": "安阳县", "value": "410522" }, { "label": "汤阴县", "value": "410523" }, { "label": "滑县", "value": "410526" }, { "label": "内黄县", "value": "410527" }, { "label": "安阳高新技术产业开发区", "value": "410571" }, { "label": "林州市", "value": "410581" }], [{ "label": "鹤山区", "value": "410602" }, { "label": "山城区", "value": "410603" }, { "label": "淇滨区", "value": "410611" }, { "label": "浚县", "value": "410621" }, { "label": "淇县", "value": "410622" }, { "label": "鹤壁经济技术开发区", "value": "410671" }], [{ "label": "红旗区", "value": "410702" }, { "label": "卫滨区", "value": "410703" }, { "label": "凤泉区", "value": "410704" }, { "label": "牧野区", "value": "410711" }, { "label": "新乡县", "value": "410721" }, { "label": "获嘉县", "value": "410724" }, { "label": "原阳县", "value": "410725" }, { "label": "延津县", "value": "410726" }, { "label": "封丘县", "value": "410727" }, { "label": "长垣县", "value": "410728" }, { "label": "新乡高新技术产业开发区", "value": "410771" }, { "label": "新乡经济技术开发区", "value": "410772" }, { "label": "新乡市平原城乡一体化示范区", "value": "410773" }, { "label": "卫辉市", "value": "410781" }, { "label": "辉县市", "value": "410782" }], [{ "label": "解放区", "value": "410802" }, { "label": "中站区", "value": "410803" }, { "label": "马村区", "value": "410804" }, { "label": "山阳区", "value": "410811" }, { "label": "修武县", "value": "410821" }, { "label": "博爱县", "value": "410822" }, { "label": "武陟县", "value": "410823" }, { "label": "温县", "value": "410825" }, { "label": "焦作城乡一体化示范区", "value": "410871" }, { "label": "沁阳市", "value": "410882" }, { "label": "孟州市", "value": "410883" }], [{ "label": "华龙区", "value": "410902" }, { "label": "清丰县", "value": "410922" }, { "label": "南乐县", "value": "410923" }, { "label": "范县", "value": "410926" }, { "label": "台前县", "value": "410927" }, { "label": "濮阳县", "value": "410928" }, { "label": "河南濮阳工业园区", "value": "410971" }, { "label": "濮阳经济技术开发区", "value": "410972" }], [{ "label": "魏都区", "value": "411002" }, { "label": "建安区", "value": "411003" }, { "label": "鄢陵县", "value": "411024" }, { "label": "襄城县", "value": "411025" }, { "label": "许昌经济技术开发区", "value": "411071" }, { "label": "禹州市", "value": "411081" }, { "label": "长葛市", "value": "411082" }], [{ "label": "源汇区", "value": "411102" }, { "label": "郾城区", "value": "411103" }, { "label": "召陵区", "value": "411104" }, { "label": "舞阳县", "value": "411121" }, { "label": "临颍县", "value": "411122" }, { "label": "漯河经济技术开发区", "value": "411171" }], [{ "label": "湖滨区", "value": "411202" }, { "label": "陕州区", "value": "411203" }, { "label": "渑池县", "value": "411221" }, { "label": "卢氏县", "value": "411224" }, { "label": "河南三门峡经济开发区", "value": "411271" }, { "label": "义马市", "value": "411281" }, { "label": "灵宝市", "value": "411282" }], [{ "label": "宛城区", "value": "411302" }, { "label": "卧龙区", "value": "411303" }, { "label": "南召县", "value": "411321" }, { "label": "方城县", "value": "411322" }, { "label": "西峡县", "value": "411323" }, { "label": "镇平县", "value": "411324" }, { "label": "内乡县", "value": "411325" }, { "label": "淅川县", "value": "411326" }, { "label": "社旗县", "value": "411327" }, { "label": "唐河县", "value": "411328" }, { "label": "新野县", "value": "411329" }, { "label": "桐柏县", "value": "411330" }, { "label": "南阳高新技术产业开发区", "value": "411371" }, { "label": "南阳市城乡一体化示范区", "value": "411372" }, { "label": "邓州市", "value": "411381" }], [{ "label": "梁园区", "value": "411402" }, { "label": "睢阳区", "value": "411403" }, { "label": "民权县", "value": "411421" }, { "label": "睢县", "value": "411422" }, { "label": "宁陵县", "value": "411423" }, { "label": "柘城县", "value": "411424" }, { "label": "虞城县", "value": "411425" }, { "label": "夏邑县", "value": "411426" }, { "label": "豫东综合物流产业聚集区", "value": "411471" }, { "label": "河南商丘经济开发区", "value": "411472" }, { "label": "永城市", "value": "411481" }], [{ "label": "浉河区", "value": "411502" }, { "label": "平桥区", "value": "411503" }, { "label": "罗山县", "value": "411521" }, { "label": "光山县", "value": "411522" }, { "label": "新县", "value": "411523" }, { "label": "商城县", "value": "411524" }, { "label": "固始县", "value": "411525" }, { "label": "潢川县", "value": "411526" }, { "label": "淮滨县", "value": "411527" }, { "label": "息县", "value": "411528" }, { "label": "信阳高新技术产业开发区", "value": "411571" }], [{ "label": "川汇区", "value": "411602" }, { "label": "扶沟县", "value": "411621" }, { "label": "西华县", "value": "411622" }, { "label": "商水县", "value": "411623" }, { "label": "沈丘县", "value": "411624" }, { "label": "郸城县", "value": "411625" }, { "label": "淮阳县", "value": "411626" }, { "label": "太康县", "value": "411627" }, { "label": "鹿邑县", "value": "411628" }, { "label": "河南周口经济开发区", "value": "411671" }, { "label": "项城市", "value": "411681" }], [{ "label": "驿城区", "value": "411702" }, { "label": "西平县", "value": "411721" }, { "label": "上蔡县", "value": "411722" }, { "label": "平舆县", "value": "411723" }, { "label": "正阳县", "value": "411724" }, { "label": "确山县", "value": "411725" }, { "label": "泌阳县", "value": "411726" }, { "label": "汝南县", "value": "411727" }, { "label": "遂平县", "value": "411728" }, { "label": "新蔡县", "value": "411729" }, { "label": "河南驻马店经济开发区", "value": "411771" }], [{ "label": "济源市", "value": "419001" }]], [[{ "label": "江岸区", "value": "420102" }, { "label": "江汉区", "value": "420103" }, { "label": "硚口区", "value": "420104" }, { "label": "汉阳区", "value": "420105" }, { "label": "武昌区", "value": "420106" }, { "label": "青山区", "value": "420107" }, { "label": "洪山区", "value": "420111" }, { "label": "东西湖区", "value": "420112" }, { "label": "汉南区", "value": "420113" }, { "label": "蔡甸区", "value": "420114" }, { "label": "江夏区", "value": "420115" }, { "label": "黄陂区", "value": "420116" }, { "label": "新洲区", "value": "420117" }], [{ "label": "黄石港区", "value": "420202" }, { "label": "西塞山区", "value": "420203" }, { "label": "下陆区", "value": "420204" }, { "label": "铁山区", "value": "420205" }, { "label": "阳新县", "value": "420222" }, { "label": "大冶市", "value": "420281" }], [{ "label": "茅箭区", "value": "420302" }, { "label": "张湾区", "value": "420303" }, { "label": "郧阳区", "value": "420304" }, { "label": "郧西县", "value": "420322" }, { "label": "竹山县", "value": "420323" }, { "label": "竹溪县", "value": "420324" }, { "label": "房县", "value": "420325" }, { "label": "丹江口市", "value": "420381" }], [{ "label": "西陵区", "value": "420502" }, { "label": "伍家岗区", "value": "420503" }, { "label": "点军区", "value": "420504" }, { "label": "猇亭区", "value": "420505" }, { "label": "夷陵区", "value": "420506" }, { "label": "远安县", "value": "420525" }, { "label": "兴山县", "value": "420526" }, { "label": "秭归县", "value": "420527" }, { "label": "长阳土家族自治县", "value": "420528" }, { "label": "五峰土家族自治县", "value": "420529" }, { "label": "宜都市", "value": "420581" }, { "label": "当阳市", "value": "420582" }, { "label": "枝江市", "value": "420583" }], [{ "label": "襄城区", "value": "420602" }, { "label": "樊城区", "value": "420606" }, { "label": "襄州区", "value": "420607" }, { "label": "南漳县", "value": "420624" }, { "label": "谷城县", "value": "420625" }, { "label": "保康县", "value": "420626" }, { "label": "老河口市", "value": "420682" }, { "label": "枣阳市", "value": "420683" }, { "label": "宜城市", "value": "420684" }], [{ "label": "梁子湖区", "value": "420702" }, { "label": "华容区", "value": "420703" }, { "label": "鄂城区", "value": "420704" }], [{ "label": "东宝区", "value": "420802" }, { "label": "掇刀区", "value": "420804" }, { "label": "京山县", "value": "420821" }, { "label": "沙洋县", "value": "420822" }, { "label": "钟祥市", "value": "420881" }], [{ "label": "孝南区", "value": "420902" }, { "label": "孝昌县", "value": "420921" }, { "label": "大悟县", "value": "420922" }, { "label": "云梦县", "value": "420923" }, { "label": "应城市", "value": "420981" }, { "label": "安陆市", "value": "420982" }, { "label": "汉川市", "value": "420984" }], [{ "label": "沙市区", "value": "421002" }, { "label": "荆州区", "value": "421003" }, { "label": "公安县", "value": "421022" }, { "label": "监利县", "value": "421023" }, { "label": "江陵县", "value": "421024" }, { "label": "荆州经济技术开发区", "value": "421071" }, { "label": "石首市", "value": "421081" }, { "label": "洪湖市", "value": "421083" }, { "label": "松滋市", "value": "421087" }], [{ "label": "黄州区", "value": "421102" }, { "label": "团风县", "value": "421121" }, { "label": "红安县", "value": "421122" }, { "label": "罗田县", "value": "421123" }, { "label": "英山县", "value": "421124" }, { "label": "浠水县", "value": "421125" }, { "label": "蕲春县", "value": "421126" }, { "label": "黄梅县", "value": "421127" }, { "label": "龙感湖管理区", "value": "421171" }, { "label": "麻城市", "value": "421181" }, { "label": "武穴市", "value": "421182" }], [{ "label": "咸安区", "value": "421202" }, { "label": "嘉鱼县", "value": "421221" }, { "label": "通城县", "value": "421222" }, { "label": "崇阳县", "value": "421223" }, { "label": "通山县", "value": "421224" }, { "label": "赤壁市", "value": "421281" }], [{ "label": "曾都区", "value": "421303" }, { "label": "随县", "value": "421321" }, { "label": "广水市", "value": "421381" }], [{ "label": "恩施市", "value": "422801" }, { "label": "利川市", "value": "422802" }, { "label": "建始县", "value": "422822" }, { "label": "巴东县", "value": "422823" }, { "label": "宣恩县", "value": "422825" }, { "label": "咸丰县", "value": "422826" }, { "label": "来凤县", "value": "422827" }, { "label": "鹤峰县", "value": "422828" }], [{ "label": "仙桃市", "value": "429004" }, { "label": "潜江市", "value": "429005" }, { "label": "天门市", "value": "429006" }, { "label": "神农架林区", "value": "429021" }]], [[{ "label": "芙蓉区", "value": "430102" }, { "label": "天心区", "value": "430103" }, { "label": "岳麓区", "value": "430104" }, { "label": "开福区", "value": "430105" }, { "label": "雨花区", "value": "430111" }, { "label": "望城区", "value": "430112" }, { "label": "长沙县", "value": "430121" }, { "label": "浏阳市", "value": "430181" }, { "label": "宁乡市", "value": "430182" }], [{ "label": "荷塘区", "value": "430202" }, { "label": "芦淞区", "value": "430203" }, { "label": "石峰区", "value": "430204" }, { "label": "天元区", "value": "430211" }, { "label": "株洲县", "value": "430221" }, { "label": "攸县", "value": "430223" }, { "label": "茶陵县", "value": "430224" }, { "label": "炎陵县", "value": "430225" }, { "label": "云龙示范区", "value": "430271" }, { "label": "醴陵市", "value": "430281" }], [{ "label": "雨湖区", "value": "430302" }, { "label": "岳塘区", "value": "430304" }, { "label": "湘潭县", "value": "430321" }, { "label": "湖南湘潭高新技术产业园区", "value": "430371" }, { "label": "湘潭昭山示范区", "value": "430372" }, { "label": "湘潭九华示范区", "value": "430373" }, { "label": "湘乡市", "value": "430381" }, { "label": "韶山市", "value": "430382" }], [{ "label": "珠晖区", "value": "430405" }, { "label": "雁峰区", "value": "430406" }, { "label": "石鼓区", "value": "430407" }, { "label": "蒸湘区", "value": "430408" }, { "label": "南岳区", "value": "430412" }, { "label": "衡阳县", "value": "430421" }, { "label": "衡南县", "value": "430422" }, { "label": "衡山县", "value": "430423" }, { "label": "衡东县", "value": "430424" }, { "label": "祁东县", "value": "430426" }, { "label": "衡阳综合保税区", "value": "430471" }, { "label": "湖南衡阳高新技术产业园区", "value": "430472" }, { "label": "湖南衡阳松木经济开发区", "value": "430473" }, { "label": "耒阳市", "value": "430481" }, { "label": "常宁市", "value": "430482" }], [{ "label": "双清区", "value": "430502" }, { "label": "大祥区", "value": "430503" }, { "label": "北塔区", "value": "430511" }, { "label": "邵东县", "value": "430521" }, { "label": "新邵县", "value": "430522" }, { "label": "邵阳县", "value": "430523" }, { "label": "隆回县", "value": "430524" }, { "label": "洞口县", "value": "430525" }, { "label": "绥宁县", "value": "430527" }, { "label": "新宁县", "value": "430528" }, { "label": "城步苗族自治县", "value": "430529" }, { "label": "武冈市", "value": "430581" }], [{ "label": "岳阳楼区", "value": "430602" }, { "label": "云溪区", "value": "430603" }, { "label": "君山区", "value": "430611" }, { "label": "岳阳县", "value": "430621" }, { "label": "华容县", "value": "430623" }, { "label": "湘阴县", "value": "430624" }, { "label": "平江县", "value": "430626" }, { "label": "岳阳市屈原管理区", "value": "430671" }, { "label": "汨罗市", "value": "430681" }, { "label": "临湘市", "value": "430682" }], [{ "label": "武陵区", "value": "430702" }, { "label": "鼎城区", "value": "430703" }, { "label": "安乡县", "value": "430721" }, { "label": "汉寿县", "value": "430722" }, { "label": "澧县", "value": "430723" }, { "label": "临澧县", "value": "430724" }, { "label": "桃源县", "value": "430725" }, { "label": "石门县", "value": "430726" }, { "label": "常德市西洞庭管理区", "value": "430771" }, { "label": "津市市", "value": "430781" }], [{ "label": "永定区", "value": "430802" }, { "label": "武陵源区", "value": "430811" }, { "label": "慈利县", "value": "430821" }, { "label": "桑植县", "value": "430822" }], [{ "label": "资阳区", "value": "430902" }, { "label": "赫山区", "value": "430903" }, { "label": "南县", "value": "430921" }, { "label": "桃江县", "value": "430922" }, { "label": "安化县", "value": "430923" }, { "label": "益阳市大通湖管理区", "value": "430971" }, { "label": "湖南益阳高新技术产业园区", "value": "430972" }, { "label": "沅江市", "value": "430981" }], [{ "label": "北湖区", "value": "431002" }, { "label": "苏仙区", "value": "431003" }, { "label": "桂阳县", "value": "431021" }, { "label": "宜章县", "value": "431022" }, { "label": "永兴县", "value": "431023" }, { "label": "嘉禾县", "value": "431024" }, { "label": "临武县", "value": "431025" }, { "label": "汝城县", "value": "431026" }, { "label": "桂东县", "value": "431027" }, { "label": "安仁县", "value": "431028" }, { "label": "资兴市", "value": "431081" }], [{ "label": "零陵区", "value": "431102" }, { "label": "冷水滩区", "value": "431103" }, { "label": "祁阳县", "value": "431121" }, { "label": "东安县", "value": "431122" }, { "label": "双牌县", "value": "431123" }, { "label": "道县", "value": "431124" }, { "label": "江永县", "value": "431125" }, { "label": "宁远县", "value": "431126" }, { "label": "蓝山县", "value": "431127" }, { "label": "新田县", "value": "431128" }, { "label": "江华瑶族自治县", "value": "431129" }, { "label": "永州经济技术开发区", "value": "431171" }, { "label": "永州市金洞管理区", "value": "431172" }, { "label": "永州市回龙圩管理区", "value": "431173" }], [{ "label": "鹤城区", "value": "431202" }, { "label": "中方县", "value": "431221" }, { "label": "沅陵县", "value": "431222" }, { "label": "辰溪县", "value": "431223" }, { "label": "溆浦县", "value": "431224" }, { "label": "会同县", "value": "431225" }, { "label": "麻阳苗族自治县", "value": "431226" }, { "label": "新晃侗族自治县", "value": "431227" }, { "label": "芷江侗族自治县", "value": "431228" }, { "label": "靖州苗族侗族自治县", "value": "431229" }, { "label": "通道侗族自治县", "value": "431230" }, { "label": "怀化市洪江管理区", "value": "431271" }, { "label": "洪江市", "value": "431281" }], [{ "label": "娄星区", "value": "431302" }, { "label": "双峰县", "value": "431321" }, { "label": "新化县", "value": "431322" }, { "label": "冷水江市", "value": "431381" }, { "label": "涟源市", "value": "431382" }], [{ "label": "吉首市", "value": "433101" }, { "label": "泸溪县", "value": "433122" }, { "label": "凤凰县", "value": "433123" }, { "label": "花垣县", "value": "433124" }, { "label": "保靖县", "value": "433125" }, { "label": "古丈县", "value": "433126" }, { "label": "永顺县", "value": "433127" }, { "label": "龙山县", "value": "433130" }, { "label": "湖南吉首经济开发区", "value": "433172" }, { "label": "湖南永顺经济开发区", "value": "433173" }]], [[{ "label": "荔湾区", "value": "440103" }, { "label": "越秀区", "value": "440104" }, { "label": "海珠区", "value": "440105" }, { "label": "天河区", "value": "440106" }, { "label": "白云区", "value": "440111" }, { "label": "黄埔区", "value": "440112" }, { "label": "番禺区", "value": "440113" }, { "label": "花都区", "value": "440114" }, { "label": "南沙区", "value": "440115" }, { "label": "从化区", "value": "440117" }, { "label": "增城区", "value": "440118" }], [{ "label": "武江区", "value": "440203" }, { "label": "浈江区", "value": "440204" }, { "label": "曲江区", "value": "440205" }, { "label": "始兴县", "value": "440222" }, { "label": "仁化县", "value": "440224" }, { "label": "翁源县", "value": "440229" }, { "label": "乳源瑶族自治县", "value": "440232" }, { "label": "新丰县", "value": "440233" }, { "label": "乐昌市", "value": "440281" }, { "label": "南雄市", "value": "440282" }], [{ "label": "罗湖区", "value": "440303" }, { "label": "福田区", "value": "440304" }, { "label": "南山区", "value": "440305" }, { "label": "宝安区", "value": "440306" }, { "label": "龙岗区", "value": "440307" }, { "label": "盐田区", "value": "440308" }, { "label": "龙华区", "value": "440309" }, { "label": "坪山区", "value": "440310" }], [{ "label": "香洲区", "value": "440402" }, { "label": "斗门区", "value": "440403" }, { "label": "金湾区", "value": "440404" }], [{ "label": "龙湖区", "value": "440507" }, { "label": "金平区", "value": "440511" }, { "label": "濠江区", "value": "440512" }, { "label": "潮阳区", "value": "440513" }, { "label": "潮南区", "value": "440514" }, { "label": "澄海区", "value": "440515" }, { "label": "南澳县", "value": "440523" }], [{ "label": "禅城区", "value": "440604" }, { "label": "南海区", "value": "440605" }, { "label": "顺德区", "value": "440606" }, { "label": "三水区", "value": "440607" }, { "label": "高明区", "value": "440608" }], [{ "label": "蓬江区", "value": "440703" }, { "label": "江海区", "value": "440704" }, { "label": "新会区", "value": "440705" }, { "label": "台山市", "value": "440781" }, { "label": "开平市", "value": "440783" }, { "label": "鹤山市", "value": "440784" }, { "label": "恩平市", "value": "440785" }], [{ "label": "赤坎区", "value": "440802" }, { "label": "霞山区", "value": "440803" }, { "label": "坡头区", "value": "440804" }, { "label": "麻章区", "value": "440811" }, { "label": "遂溪县", "value": "440823" }, { "label": "徐闻县", "value": "440825" }, { "label": "廉江市", "value": "440881" }, { "label": "雷州市", "value": "440882" }, { "label": "吴川市", "value": "440883" }], [{ "label": "茂南区", "value": "440902" }, { "label": "电白区", "value": "440904" }, { "label": "高州市", "value": "440981" }, { "label": "化州市", "value": "440982" }, { "label": "信宜市", "value": "440983" }], [{ "label": "端州区", "value": "441202" }, { "label": "鼎湖区", "value": "441203" }, { "label": "高要区", "value": "441204" }, { "label": "广宁县", "value": "441223" }, { "label": "怀集县", "value": "441224" }, { "label": "封开县", "value": "441225" }, { "label": "德庆县", "value": "441226" }, { "label": "四会市", "value": "441284" }], [{ "label": "惠城区", "value": "441302" }, { "label": "惠阳区", "value": "441303" }, { "label": "博罗县", "value": "441322" }, { "label": "惠东县", "value": "441323" }, { "label": "龙门县", "value": "441324" }], [{ "label": "梅江区", "value": "441402" }, { "label": "梅县区", "value": "441403" }, { "label": "大埔县", "value": "441422" }, { "label": "丰顺县", "value": "441423" }, { "label": "五华县", "value": "441424" }, { "label": "平远县", "value": "441426" }, { "label": "蕉岭县", "value": "441427" }, { "label": "兴宁市", "value": "441481" }], [{ "label": "城区", "value": "441502" }, { "label": "海丰县", "value": "441521" }, { "label": "陆河县", "value": "441523" }, { "label": "陆丰市", "value": "441581" }], [{ "label": "源城区", "value": "441602" }, { "label": "紫金县", "value": "441621" }, { "label": "龙川县", "value": "441622" }, { "label": "连平县", "value": "441623" }, { "label": "和平县", "value": "441624" }, { "label": "东源县", "value": "441625" }], [{ "label": "江城区", "value": "441702" }, { "label": "阳东区", "value": "441704" }, { "label": "阳西县", "value": "441721" }, { "label": "阳春市", "value": "441781" }], [{ "label": "清城区", "value": "441802" }, { "label": "清新区", "value": "441803" }, { "label": "佛冈县", "value": "441821" }, { "label": "阳山县", "value": "441823" }, { "label": "连山壮族瑶族自治县", "value": "441825" }, { "label": "连南瑶族自治县", "value": "441826" }, { "label": "英德市", "value": "441881" }, { "label": "连州市", "value": "441882" }], [{ "label": "东莞市", "value": "441900" }], [{ "label": "中山市", "value": "442000" }], [{ "label": "湘桥区", "value": "445102" }, { "label": "潮安区", "value": "445103" }, { "label": "饶平县", "value": "445122" }], [{ "label": "榕城区", "value": "445202" }, { "label": "揭东区", "value": "445203" }, { "label": "揭西县", "value": "445222" }, { "label": "惠来县", "value": "445224" }, { "label": "普宁市", "value": "445281" }], [{ "label": "云城区", "value": "445302" }, { "label": "云安区", "value": "445303" }, { "label": "新兴县", "value": "445321" }, { "label": "郁南县", "value": "445322" }, { "label": "罗定市", "value": "445381" }]], [[{ "label": "兴宁区", "value": "450102" }, { "label": "青秀区", "value": "450103" }, { "label": "江南区", "value": "450105" }, { "label": "西乡塘区", "value": "450107" }, { "label": "良庆区", "value": "450108" }, { "label": "邕宁区", "value": "450109" }, { "label": "武鸣区", "value": "450110" }, { "label": "隆安县", "value": "450123" }, { "label": "马山县", "value": "450124" }, { "label": "上林县", "value": "450125" }, { "label": "宾阳县", "value": "450126" }, { "label": "横县", "value": "450127" }], [{ "label": "城中区", "value": "450202" }, { "label": "鱼峰区", "value": "450203" }, { "label": "柳南区", "value": "450204" }, { "label": "柳北区", "value": "450205" }, { "label": "柳江区", "value": "450206" }, { "label": "柳城县", "value": "450222" }, { "label": "鹿寨县", "value": "450223" }, { "label": "融安县", "value": "450224" }, { "label": "融水苗族自治县", "value": "450225" }, { "label": "三江侗族自治县", "value": "450226" }], [{ "label": "秀峰区", "value": "450302" }, { "label": "叠彩区", "value": "450303" }, { "label": "象山区", "value": "450304" }, { "label": "七星区", "value": "450305" }, { "label": "雁山区", "value": "450311" }, { "label": "临桂区", "value": "450312" }, { "label": "阳朔县", "value": "450321" }, { "label": "灵川县", "value": "450323" }, { "label": "全州县", "value": "450324" }, { "label": "兴安县", "value": "450325" }, { "label": "永福县", "value": "450326" }, { "label": "灌阳县", "value": "450327" }, { "label": "龙胜各族自治县", "value": "450328" }, { "label": "资源县", "value": "450329" }, { "label": "平乐县", "value": "450330" }, { "label": "荔浦县", "value": "450331" }, { "label": "恭城瑶族自治县", "value": "450332" }], [{ "label": "万秀区", "value": "450403" }, { "label": "长洲区", "value": "450405" }, { "label": "龙圩区", "value": "450406" }, { "label": "苍梧县", "value": "450421" }, { "label": "藤县", "value": "450422" }, { "label": "蒙山县", "value": "450423" }, { "label": "岑溪市", "value": "450481" }], [{ "label": "海城区", "value": "450502" }, { "label": "银海区", "value": "450503" }, { "label": "铁山港区", "value": "450512" }, { "label": "合浦县", "value": "450521" }], [{ "label": "港口区", "value": "450602" }, { "label": "防城区", "value": "450603" }, { "label": "上思县", "value": "450621" }, { "label": "东兴市", "value": "450681" }], [{ "label": "钦南区", "value": "450702" }, { "label": "钦北区", "value": "450703" }, { "label": "灵山县", "value": "450721" }, { "label": "浦北县", "value": "450722" }], [{ "label": "港北区", "value": "450802" }, { "label": "港南区", "value": "450803" }, { "label": "覃塘区", "value": "450804" }, { "label": "平南县", "value": "450821" }, { "label": "桂平市", "value": "450881" }], [{ "label": "玉州区", "value": "450902" }, { "label": "福绵区", "value": "450903" }, { "label": "容县", "value": "450921" }, { "label": "陆川县", "value": "450922" }, { "label": "博白县", "value": "450923" }, { "label": "兴业县", "value": "450924" }, { "label": "北流市", "value": "450981" }], [{ "label": "右江区", "value": "451002" }, { "label": "田阳县", "value": "451021" }, { "label": "田东县", "value": "451022" }, { "label": "平果县", "value": "451023" }, { "label": "德保县", "value": "451024" }, { "label": "那坡县", "value": "451026" }, { "label": "凌云县", "value": "451027" }, { "label": "乐业县", "value": "451028" }, { "label": "田林县", "value": "451029" }, { "label": "西林县", "value": "451030" }, { "label": "隆林各族自治县", "value": "451031" }, { "label": "靖西市", "value": "451081" }], [{ "label": "八步区", "value": "451102" }, { "label": "平桂区", "value": "451103" }, { "label": "昭平县", "value": "451121" }, { "label": "钟山县", "value": "451122" }, { "label": "富川瑶族自治县", "value": "451123" }], [{ "label": "金城江区", "value": "451202" }, { "label": "宜州区", "value": "451203" }, { "label": "南丹县", "value": "451221" }, { "label": "天峨县", "value": "451222" }, { "label": "凤山县", "value": "451223" }, { "label": "东兰县", "value": "451224" }, { "label": "罗城仫佬族自治县", "value": "451225" }, { "label": "环江毛南族自治县", "value": "451226" }, { "label": "巴马瑶族自治县", "value": "451227" }, { "label": "都安瑶族自治县", "value": "451228" }, { "label": "大化瑶族自治县", "value": "451229" }], [{ "label": "兴宾区", "value": "451302" }, { "label": "忻城县", "value": "451321" }, { "label": "象州县", "value": "451322" }, { "label": "武宣县", "value": "451323" }, { "label": "金秀瑶族自治县", "value": "451324" }, { "label": "合山市", "value": "451381" }], [{ "label": "江州区", "value": "451402" }, { "label": "扶绥县", "value": "451421" }, { "label": "宁明县", "value": "451422" }, { "label": "龙州县", "value": "451423" }, { "label": "大新县", "value": "451424" }, { "label": "天等县", "value": "451425" }, { "label": "凭祥市", "value": "451481" }]], [[{ "label": "秀英区", "value": "460105" }, { "label": "龙华区", "value": "460106" }, { "label": "琼山区", "value": "460107" }, { "label": "美兰区", "value": "460108" }], [{ "label": "海棠区", "value": "460202" }, { "label": "吉阳区", "value": "460203" }, { "label": "天涯区", "value": "460204" }, { "label": "崖州区", "value": "460205" }], [{ "label": "西沙群岛", "value": "460321" }, { "label": "南沙群岛", "value": "460322" }, { "label": "中沙群岛的岛礁及其海域", "value": "460323" }], [{ "label": "儋州市", "value": "460400" }], [{ "label": "五指山市", "value": "469001" }, { "label": "琼海市", "value": "469002" }, { "label": "文昌市", "value": "469005" }, { "label": "万宁市", "value": "469006" }, { "label": "东方市", "value": "469007" }, { "label": "定安县", "value": "469021" }, { "label": "屯昌县", "value": "469022" }, { "label": "澄迈县", "value": "469023" }, { "label": "临高县", "value": "469024" }, { "label": "白沙黎族自治县", "value": "469025" }, { "label": "昌江黎族自治县", "value": "469026" }, { "label": "乐东黎族自治县", "value": "469027" }, { "label": "陵水黎族自治县", "value": "469028" }, { "label": "保亭黎族苗族自治县", "value": "469029" }, { "label": "琼中黎族苗族自治县", "value": "469030" }]], [[{ "label": "万州区", "value": "500101" }, { "label": "涪陵区", "value": "500102" }, { "label": "渝中区", "value": "500103" }, { "label": "大渡口区", "value": "500104" }, { "label": "江北区", "value": "500105" }, { "label": "沙坪坝区", "value": "500106" }, { "label": "九龙坡区", "value": "500107" }, { "label": "南岸区", "value": "500108" }, { "label": "北碚区", "value": "500109" }, { "label": "綦江区", "value": "500110" }, { "label": "大足区", "value": "500111" }, { "label": "渝北区", "value": "500112" }, { "label": "巴南区", "value": "500113" }, { "label": "黔江区", "value": "500114" }, { "label": "长寿区", "value": "500115" }, { "label": "江津区", "value": "500116" }, { "label": "合川区", "value": "500117" }, { "label": "永川区", "value": "500118" }, { "label": "南川区", "value": "500119" }, { "label": "璧山区", "value": "500120" }, { "label": "铜梁区", "value": "500151" }, { "label": "潼南区", "value": "500152" }, { "label": "荣昌区", "value": "500153" }, { "label": "开州区", "value": "500154" }, { "label": "梁平区", "value": "500155" }, { "label": "武隆区", "value": "500156" }], [{ "label": "城口县", "value": "500229" }, { "label": "丰都县", "value": "500230" }, { "label": "垫江县", "value": "500231" }, { "label": "忠县", "value": "500233" }, { "label": "云阳县", "value": "500235" }, { "label": "奉节县", "value": "500236" }, { "label": "巫山县", "value": "500237" }, { "label": "巫溪县", "value": "500238" }, { "label": "石柱土家族自治县", "value": "500240" }, { "label": "秀山土家族苗族自治县", "value": "500241" }, { "label": "酉阳土家族苗族自治县", "value": "500242" }, { "label": "彭水苗族土家族自治县", "value": "500243" }]], [[{ "label": "锦江区", "value": "510104" }, { "label": "青羊区", "value": "510105" }, { "label": "金牛区", "value": "510106" }, { "label": "武侯区", "value": "510107" }, { "label": "成华区", "value": "510108" }, { "label": "龙泉驿区", "value": "510112" }, { "label": "青白江区", "value": "510113" }, { "label": "新都区", "value": "510114" }, { "label": "温江区", "value": "510115" }, { "label": "双流区", "value": "510116" }, { "label": "郫都区", "value": "510117" }, { "label": "金堂县", "value": "510121" }, { "label": "大邑县", "value": "510129" }, { "label": "蒲江县", "value": "510131" }, { "label": "新津县", "value": "510132" }, { "label": "都江堰市", "value": "510181" }, { "label": "彭州市", "value": "510182" }, { "label": "邛崃市", "value": "510183" }, { "label": "崇州市", "value": "510184" }, { "label": "简阳市", "value": "510185" }], [{ "label": "自流井区", "value": "510302" }, { "label": "贡井区", "value": "510303" }, { "label": "大安区", "value": "510304" }, { "label": "沿滩区", "value": "510311" }, { "label": "荣县", "value": "510321" }, { "label": "富顺县", "value": "510322" }], [{ "label": "东区", "value": "510402" }, { "label": "西区", "value": "510403" }, { "label": "仁和区", "value": "510411" }, { "label": "米易县", "value": "510421" }, { "label": "盐边县", "value": "510422" }], [{ "label": "江阳区", "value": "510502" }, { "label": "纳溪区", "value": "510503" }, { "label": "龙马潭区", "value": "510504" }, { "label": "泸县", "value": "510521" }, { "label": "合江县", "value": "510522" }, { "label": "叙永县", "value": "510524" }, { "label": "古蔺县", "value": "510525" }], [{ "label": "旌阳区", "value": "510603" }, { "label": "罗江区", "value": "510604" }, { "label": "中江县", "value": "510623" }, { "label": "广汉市", "value": "510681" }, { "label": "什邡市", "value": "510682" }, { "label": "绵竹市", "value": "510683" }], [{ "label": "涪城区", "value": "510703" }, { "label": "游仙区", "value": "510704" }, { "label": "安州区", "value": "510705" }, { "label": "三台县", "value": "510722" }, { "label": "盐亭县", "value": "510723" }, { "label": "梓潼县", "value": "510725" }, { "label": "北川羌族自治县", "value": "510726" }, { "label": "平武县", "value": "510727" }, { "label": "江油市", "value": "510781" }], [{ "label": "利州区", "value": "510802" }, { "label": "昭化区", "value": "510811" }, { "label": "朝天区", "value": "510812" }, { "label": "旺苍县", "value": "510821" }, { "label": "青川县", "value": "510822" }, { "label": "剑阁县", "value": "510823" }, { "label": "苍溪县", "value": "510824" }], [{ "label": "船山区", "value": "510903" }, { "label": "安居区", "value": "510904" }, { "label": "蓬溪县", "value": "510921" }, { "label": "射洪县", "value": "510922" }, { "label": "大英县", "value": "510923" }], [{ "label": "市中区", "value": "511002" }, { "label": "东兴区", "value": "511011" }, { "label": "威远县", "value": "511024" }, { "label": "资中县", "value": "511025" }, { "label": "内江经济开发区", "value": "511071" }, { "label": "隆昌市", "value": "511083" }], [{ "label": "市中区", "value": "511102" }, { "label": "沙湾区", "value": "511111" }, { "label": "五通桥区", "value": "511112" }, { "label": "金口河区", "value": "511113" }, { "label": "犍为县", "value": "511123" }, { "label": "井研县", "value": "511124" }, { "label": "夹江县", "value": "511126" }, { "label": "沐川县", "value": "511129" }, { "label": "峨边彝族自治县", "value": "511132" }, { "label": "马边彝族自治县", "value": "511133" }, { "label": "峨眉山市", "value": "511181" }], [{ "label": "顺庆区", "value": "511302" }, { "label": "高坪区", "value": "511303" }, { "label": "嘉陵区", "value": "511304" }, { "label": "南部县", "value": "511321" }, { "label": "营山县", "value": "511322" }, { "label": "蓬安县", "value": "511323" }, { "label": "仪陇县", "value": "511324" }, { "label": "西充县", "value": "511325" }, { "label": "阆中市", "value": "511381" }], [{ "label": "东坡区", "value": "511402" }, { "label": "彭山区", "value": "511403" }, { "label": "仁寿县", "value": "511421" }, { "label": "洪雅县", "value": "511423" }, { "label": "丹棱县", "value": "511424" }, { "label": "青神县", "value": "511425" }], [{ "label": "翠屏区", "value": "511502" }, { "label": "南溪区", "value": "511503" }, { "label": "宜宾县", "value": "511521" }, { "label": "江安县", "value": "511523" }, { "label": "长宁县", "value": "511524" }, { "label": "高县", "value": "511525" }, { "label": "珙县", "value": "511526" }, { "label": "筠连县", "value": "511527" }, { "label": "兴文县", "value": "511528" }, { "label": "屏山县", "value": "511529" }], [{ "label": "广安区", "value": "511602" }, { "label": "前锋区", "value": "511603" }, { "label": "岳池县", "value": "511621" }, { "label": "武胜县", "value": "511622" }, { "label": "邻水县", "value": "511623" }, { "label": "华蓥市", "value": "511681" }], [{ "label": "通川区", "value": "511702" }, { "label": "达川区", "value": "511703" }, { "label": "宣汉县", "value": "511722" }, { "label": "开江县", "value": "511723" }, { "label": "大竹县", "value": "511724" }, { "label": "渠县", "value": "511725" }, { "label": "达州经济开发区", "value": "511771" }, { "label": "万源市", "value": "511781" }], [{ "label": "雨城区", "value": "511802" }, { "label": "名山区", "value": "511803" }, { "label": "荥经县", "value": "511822" }, { "label": "汉源县", "value": "511823" }, { "label": "石棉县", "value": "511824" }, { "label": "天全县", "value": "511825" }, { "label": "芦山县", "value": "511826" }, { "label": "宝兴县", "value": "511827" }], [{ "label": "巴州区", "value": "511902" }, { "label": "恩阳区", "value": "511903" }, { "label": "通江县", "value": "511921" }, { "label": "南江县", "value": "511922" }, { "label": "平昌县", "value": "511923" }, { "label": "巴中经济开发区", "value": "511971" }], [{ "label": "雁江区", "value": "512002" }, { "label": "安岳县", "value": "512021" }, { "label": "乐至县", "value": "512022" }], [{ "label": "马尔康市", "value": "513201" }, { "label": "汶川县", "value": "513221" }, { "label": "理县", "value": "513222" }, { "label": "茂县", "value": "513223" }, { "label": "松潘县", "value": "513224" }, { "label": "九寨沟县", "value": "513225" }, { "label": "金川县", "value": "513226" }, { "label": "小金县", "value": "513227" }, { "label": "黑水县", "value": "513228" }, { "label": "壤塘县", "value": "513230" }, { "label": "阿坝县", "value": "513231" }, { "label": "若尔盖县", "value": "513232" }, { "label": "红原县", "value": "513233" }], [{ "label": "康定市", "value": "513301" }, { "label": "泸定县", "value": "513322" }, { "label": "丹巴县", "value": "513323" }, { "label": "九龙县", "value": "513324" }, { "label": "雅江县", "value": "513325" }, { "label": "道孚县", "value": "513326" }, { "label": "炉霍县", "value": "513327" }, { "label": "甘孜县", "value": "513328" }, { "label": "新龙县", "value": "513329" }, { "label": "德格县", "value": "513330" }, { "label": "白玉县", "value": "513331" }, { "label": "石渠县", "value": "513332" }, { "label": "色达县", "value": "513333" }, { "label": "理塘县", "value": "513334" }, { "label": "巴塘县", "value": "513335" }, { "label": "乡城县", "value": "513336" }, { "label": "稻城县", "value": "513337" }, { "label": "得荣县", "value": "513338" }], [{ "label": "西昌市", "value": "513401" }, { "label": "木里藏族自治县", "value": "513422" }, { "label": "盐源县", "value": "513423" }, { "label": "德昌县", "value": "513424" }, { "label": "会理县", "value": "513425" }, { "label": "会东县", "value": "513426" }, { "label": "宁南县", "value": "513427" }, { "label": "普格县", "value": "513428" }, { "label": "布拖县", "value": "513429" }, { "label": "金阳县", "value": "513430" }, { "label": "昭觉县", "value": "513431" }, { "label": "喜德县", "value": "513432" }, { "label": "冕宁县", "value": "513433" }, { "label": "越西县", "value": "513434" }, { "label": "甘洛县", "value": "513435" }, { "label": "美姑县", "value": "513436" }, { "label": "雷波县", "value": "513437" }]], [[{ "label": "南明区", "value": "520102" }, { "label": "云岩区", "value": "520103" }, { "label": "花溪区", "value": "520111" }, { "label": "乌当区", "value": "520112" }, { "label": "白云区", "value": "520113" }, { "label": "观山湖区", "value": "520115" }, { "label": "开阳县", "value": "520121" }, { "label": "息烽县", "value": "520122" }, { "label": "修文县", "value": "520123" }, { "label": "清镇市", "value": "520181" }], [{ "label": "钟山区", "value": "520201" }, { "label": "六枝特区", "value": "520203" }, { "label": "水城县", "value": "520221" }, { "label": "盘州市", "value": "520281" }], [{ "label": "红花岗区", "value": "520302" }, { "label": "汇川区", "value": "520303" }, { "label": "播州区", "value": "520304" }, { "label": "桐梓县", "value": "520322" }, { "label": "绥阳县", "value": "520323" }, { "label": "正安县", "value": "520324" }, { "label": "道真仡佬族苗族自治县", "value": "520325" }, { "label": "务川仡佬族苗族自治县", "value": "520326" }, { "label": "凤冈县", "value": "520327" }, { "label": "湄潭县", "value": "520328" }, { "label": "余庆县", "value": "520329" }, { "label": "习水县", "value": "520330" }, { "label": "赤水市", "value": "520381" }, { "label": "仁怀市", "value": "520382" }], [{ "label": "西秀区", "value": "520402" }, { "label": "平坝区", "value": "520403" }, { "label": "普定县", "value": "520422" }, { "label": "镇宁布依族苗族自治县", "value": "520423" }, { "label": "关岭布依族苗族自治县", "value": "520424" }, { "label": "紫云苗族布依族自治县", "value": "520425" }], [{ "label": "七星关区", "value": "520502" }, { "label": "大方县", "value": "520521" }, { "label": "黔西县", "value": "520522" }, { "label": "金沙县", "value": "520523" }, { "label": "织金县", "value": "520524" }, { "label": "纳雍县", "value": "520525" }, { "label": "威宁彝族回族苗族自治县", "value": "520526" }, { "label": "赫章县", "value": "520527" }], [{ "label": "碧江区", "value": "520602" }, { "label": "万山区", "value": "520603" }, { "label": "江口县", "value": "520621" }, { "label": "玉屏侗族自治县", "value": "520622" }, { "label": "石阡县", "value": "520623" }, { "label": "思南县", "value": "520624" }, { "label": "印江土家族苗族自治县", "value": "520625" }, { "label": "德江县", "value": "520626" }, { "label": "沿河土家族自治县", "value": "520627" }, { "label": "松桃苗族自治县", "value": "520628" }], [{ "label": "兴义市", "value": "522301" }, { "label": "兴仁县", "value": "522322" }, { "label": "普安县", "value": "522323" }, { "label": "晴隆县", "value": "522324" }, { "label": "贞丰县", "value": "522325" }, { "label": "望谟县", "value": "522326" }, { "label": "册亨县", "value": "522327" }, { "label": "安龙县", "value": "522328" }], [{ "label": "凯里市", "value": "522601" }, { "label": "黄平县", "value": "522622" }, { "label": "施秉县", "value": "522623" }, { "label": "三穗县", "value": "522624" }, { "label": "镇远县", "value": "522625" }, { "label": "岑巩县", "value": "522626" }, { "label": "天柱县", "value": "522627" }, { "label": "锦屏县", "value": "522628" }, { "label": "剑河县", "value": "522629" }, { "label": "台江县", "value": "522630" }, { "label": "黎平县", "value": "522631" }, { "label": "榕江县", "value": "522632" }, { "label": "从江县", "value": "522633" }, { "label": "雷山县", "value": "522634" }, { "label": "麻江县", "value": "522635" }, { "label": "丹寨县", "value": "522636" }], [{ "label": "都匀市", "value": "522701" }, { "label": "福泉市", "value": "522702" }, { "label": "荔波县", "value": "522722" }, { "label": "贵定县", "value": "522723" }, { "label": "瓮安县", "value": "522725" }, { "label": "独山县", "value": "522726" }, { "label": "平塘县", "value": "522727" }, { "label": "罗甸县", "value": "522728" }, { "label": "长顺县", "value": "522729" }, { "label": "龙里县", "value": "522730" }, { "label": "惠水县", "value": "522731" }, { "label": "三都水族自治县", "value": "522732" }]], [[{ "label": "五华区", "value": "530102" }, { "label": "盘龙区", "value": "530103" }, { "label": "官渡区", "value": "530111" }, { "label": "西山区", "value": "530112" }, { "label": "东川区", "value": "530113" }, { "label": "呈贡区", "value": "530114" }, { "label": "晋宁区", "value": "530115" }, { "label": "富民县", "value": "530124" }, { "label": "宜良县", "value": "530125" }, { "label": "石林彝族自治县", "value": "530126" }, { "label": "嵩明县", "value": "530127" }, { "label": "禄劝彝族苗族自治县", "value": "530128" }, { "label": "寻甸回族彝族自治县", "value": "530129" }, { "label": "安宁市", "value": "530181" }], [{ "label": "麒麟区", "value": "530302" }, { "label": "沾益区", "value": "530303" }, { "label": "马龙县", "value": "530321" }, { "label": "陆良县", "value": "530322" }, { "label": "师宗县", "value": "530323" }, { "label": "罗平县", "value": "530324" }, { "label": "富源县", "value": "530325" }, { "label": "会泽县", "value": "530326" }, { "label": "宣威市", "value": "530381" }], [{ "label": "红塔区", "value": "530402" }, { "label": "江川区", "value": "530403" }, { "label": "澄江县", "value": "530422" }, { "label": "通海县", "value": "530423" }, { "label": "华宁县", "value": "530424" }, { "label": "易门县", "value": "530425" }, { "label": "峨山彝族自治县", "value": "530426" }, { "label": "新平彝族傣族自治县", "value": "530427" }, { "label": "元江哈尼族彝族傣族自治县", "value": "530428" }], [{ "label": "隆阳区", "value": "530502" }, { "label": "施甸县", "value": "530521" }, { "label": "龙陵县", "value": "530523" }, { "label": "昌宁县", "value": "530524" }, { "label": "腾冲市", "value": "530581" }], [{ "label": "昭阳区", "value": "530602" }, { "label": "鲁甸县", "value": "530621" }, { "label": "巧家县", "value": "530622" }, { "label": "盐津县", "value": "530623" }, { "label": "大关县", "value": "530624" }, { "label": "永善县", "value": "530625" }, { "label": "绥江县", "value": "530626" }, { "label": "镇雄县", "value": "530627" }, { "label": "彝良县", "value": "530628" }, { "label": "威信县", "value": "530629" }, { "label": "水富县", "value": "530630" }], [{ "label": "古城区", "value": "530702" }, { "label": "玉龙纳西族自治县", "value": "530721" }, { "label": "永胜县", "value": "530722" }, { "label": "华坪县", "value": "530723" }, { "label": "宁蒗彝族自治县", "value": "530724" }], [{ "label": "思茅区", "value": "530802" }, { "label": "宁洱哈尼族彝族自治县", "value": "530821" }, { "label": "墨江哈尼族自治县", "value": "530822" }, { "label": "景东彝族自治县", "value": "530823" }, { "label": "景谷傣族彝族自治县", "value": "530824" }, { "label": "镇沅彝族哈尼族拉祜族自治县", "value": "530825" }, { "label": "江城哈尼族彝族自治县", "value": "530826" }, { "label": "孟连傣族拉祜族佤族自治县", "value": "530827" }, { "label": "澜沧拉祜族自治县", "value": "530828" }, { "label": "西盟佤族自治县", "value": "530829" }], [{ "label": "临翔区", "value": "530902" }, { "label": "凤庆县", "value": "530921" }, { "label": "云县", "value": "530922" }, { "label": "永德县", "value": "530923" }, { "label": "镇康县", "value": "530924" }, { "label": "双江拉祜族佤族布朗族傣族自治县", "value": "530925" }, { "label": "耿马傣族佤族自治县", "value": "530926" }, { "label": "沧源佤族自治县", "value": "530927" }], [{ "label": "楚雄市", "value": "532301" }, { "label": "双柏县", "value": "532322" }, { "label": "牟定县", "value": "532323" }, { "label": "南华县", "value": "532324" }, { "label": "姚安县", "value": "532325" }, { "label": "大姚县", "value": "532326" }, { "label": "永仁县", "value": "532327" }, { "label": "元谋县", "value": "532328" }, { "label": "武定县", "value": "532329" }, { "label": "禄丰县", "value": "532331" }], [{ "label": "个旧市", "value": "532501" }, { "label": "开远市", "value": "532502" }, { "label": "蒙自市", "value": "532503" }, { "label": "弥勒市", "value": "532504" }, { "label": "屏边苗族自治县", "value": "532523" }, { "label": "建水县", "value": "532524" }, { "label": "石屏县", "value": "532525" }, { "label": "泸西县", "value": "532527" }, { "label": "元阳县", "value": "532528" }, { "label": "红河县", "value": "532529" }, { "label": "金平苗族瑶族傣族自治县", "value": "532530" }, { "label": "绿春县", "value": "532531" }, { "label": "河口瑶族自治县", "value": "532532" }], [{ "label": "文山市", "value": "532601" }, { "label": "砚山县", "value": "532622" }, { "label": "西畴县", "value": "532623" }, { "label": "麻栗坡县", "value": "532624" }, { "label": "马关县", "value": "532625" }, { "label": "丘北县", "value": "532626" }, { "label": "广南县", "value": "532627" }, { "label": "富宁县", "value": "532628" }], [{ "label": "景洪市", "value": "532801" }, { "label": "勐海县", "value": "532822" }, { "label": "勐腊县", "value": "532823" }], [{ "label": "大理市", "value": "532901" }, { "label": "漾濞彝族自治县", "value": "532922" }, { "label": "祥云县", "value": "532923" }, { "label": "宾川县", "value": "532924" }, { "label": "弥渡县", "value": "532925" }, { "label": "南涧彝族自治县", "value": "532926" }, { "label": "巍山彝族回族自治县", "value": "532927" }, { "label": "永平县", "value": "532928" }, { "label": "云龙县", "value": "532929" }, { "label": "洱源县", "value": "532930" }, { "label": "剑川县", "value": "532931" }, { "label": "鹤庆县", "value": "532932" }], [{ "label": "瑞丽市", "value": "533102" }, { "label": "芒市", "value": "533103" }, { "label": "梁河县", "value": "533122" }, { "label": "盈江县", "value": "533123" }, { "label": "陇川县", "value": "533124" }], [{ "label": "泸水市", "value": "533301" }, { "label": "福贡县", "value": "533323" }, { "label": "贡山独龙族怒族自治县", "value": "533324" }, { "label": "兰坪白族普米族自治县", "value": "533325" }], [{ "label": "香格里拉市", "value": "533401" }, { "label": "德钦县", "value": "533422" }, { "label": "维西傈僳族自治县", "value": "533423" }]], [[{ "label": "城关区", "value": "540102" }, { "label": "堆龙德庆区", "value": "540103" }, { "label": "林周县", "value": "540121" }, { "label": "当雄县", "value": "540122" }, { "label": "尼木县", "value": "540123" }, { "label": "曲水县", "value": "540124" }, { "label": "达孜县", "value": "540126" }, { "label": "墨竹工卡县", "value": "540127" }, { "label": "格尔木藏青工业园区", "value": "540171" }, { "label": "拉萨经济技术开发区", "value": "540172" }, { "label": "西藏文化旅游创意园区", "value": "540173" }, { "label": "达孜工业园区", "value": "540174" }], [{ "label": "桑珠孜区", "value": "540202" }, { "label": "南木林县", "value": "540221" }, { "label": "江孜县", "value": "540222" }, { "label": "定日县", "value": "540223" }, { "label": "萨迦县", "value": "540224" }, { "label": "拉孜县", "value": "540225" }, { "label": "昂仁县", "value": "540226" }, { "label": "谢通门县", "value": "540227" }, { "label": "白朗县", "value": "540228" }, { "label": "仁布县", "value": "540229" }, { "label": "康马县", "value": "540230" }, { "label": "定结县", "value": "540231" }, { "label": "仲巴县", "value": "540232" }, { "label": "亚东县", "value": "540233" }, { "label": "吉隆县", "value": "540234" }, { "label": "聂拉木县", "value": "540235" }, { "label": "萨嘎县", "value": "540236" }, { "label": "岗巴县", "value": "540237" }], [{ "label": "卡若区", "value": "540302" }, { "label": "江达县", "value": "540321" }, { "label": "贡觉县", "value": "540322" }, { "label": "类乌齐县", "value": "540323" }, { "label": "丁青县", "value": "540324" }, { "label": "察雅县", "value": "540325" }, { "label": "八宿县", "value": "540326" }, { "label": "左贡县", "value": "540327" }, { "label": "芒康县", "value": "540328" }, { "label": "洛隆县", "value": "540329" }, { "label": "边坝县", "value": "540330" }], [{ "label": "巴宜区", "value": "540402" }, { "label": "工布江达县", "value": "540421" }, { "label": "米林县", "value": "540422" }, { "label": "墨脱县", "value": "540423" }, { "label": "波密县", "value": "540424" }, { "label": "察隅县", "value": "540425" }, { "label": "朗县", "value": "540426" }], [{ "label": "乃东区", "value": "540502" }, { "label": "扎囊县", "value": "540521" }, { "label": "贡嘎县", "value": "540522" }, { "label": "桑日县", "value": "540523" }, { "label": "琼结县", "value": "540524" }, { "label": "曲松县", "value": "540525" }, { "label": "措美县", "value": "540526" }, { "label": "洛扎县", "value": "540527" }, { "label": "加查县", "value": "540528" }, { "label": "隆子县", "value": "540529" }, { "label": "错那县", "value": "540530" }, { "label": "浪卡子县", "value": "540531" }], [{ "label": "那曲县", "value": "542421" }, { "label": "嘉黎县", "value": "542422" }, { "label": "比如县", "value": "542423" }, { "label": "聂荣县", "value": "542424" }, { "label": "安多县", "value": "542425" }, { "label": "申扎县", "value": "542426" }, { "label": "索县", "value": "542427" }, { "label": "班戈县", "value": "542428" }, { "label": "巴青县", "value": "542429" }, { "label": "尼玛县", "value": "542430" }, { "label": "双湖县", "value": "542431" }], [{ "label": "普兰县", "value": "542521" }, { "label": "札达县", "value": "542522" }, { "label": "噶尔县", "value": "542523" }, { "label": "日土县", "value": "542524" }, { "label": "革吉县", "value": "542525" }, { "label": "改则县", "value": "542526" }, { "label": "措勤县", "value": "542527" }]], [[{ "label": "新城区", "value": "610102" }, { "label": "碑林区", "value": "610103" }, { "label": "莲湖区", "value": "610104" }, { "label": "灞桥区", "value": "610111" }, { "label": "未央区", "value": "610112" }, { "label": "雁塔区", "value": "610113" }, { "label": "阎良区", "value": "610114" }, { "label": "临潼区", "value": "610115" }, { "label": "长安区", "value": "610116" }, { "label": "高陵区", "value": "610117" }, { "label": "鄠邑区", "value": "610118" }, { "label": "蓝田县", "value": "610122" }, { "label": "周至县", "value": "610124" }], [{ "label": "王益区", "value": "610202" }, { "label": "印台区", "value": "610203" }, { "label": "耀州区", "value": "610204" }, { "label": "宜君县", "value": "610222" }], [{ "label": "渭滨区", "value": "610302" }, { "label": "金台区", "value": "610303" }, { "label": "陈仓区", "value": "610304" }, { "label": "凤翔县", "value": "610322" }, { "label": "岐山县", "value": "610323" }, { "label": "扶风县", "value": "610324" }, { "label": "眉县", "value": "610326" }, { "label": "陇县", "value": "610327" }, { "label": "千阳县", "value": "610328" }, { "label": "麟游县", "value": "610329" }, { "label": "凤县", "value": "610330" }, { "label": "太白县", "value": "610331" }], [{ "label": "秦都区", "value": "610402" }, { "label": "杨陵区", "value": "610403" }, { "label": "渭城区", "value": "610404" }, { "label": "三原县", "value": "610422" }, { "label": "泾阳县", "value": "610423" }, { "label": "乾县", "value": "610424" }, { "label": "礼泉县", "value": "610425" }, { "label": "永寿县", "value": "610426" }, { "label": "彬县", "value": "610427" }, { "label": "长武县", "value": "610428" }, { "label": "旬邑县", "value": "610429" }, { "label": "淳化县", "value": "610430" }, { "label": "武功县", "value": "610431" }, { "label": "兴平市", "value": "610481" }], [{ "label": "临渭区", "value": "610502" }, { "label": "华州区", "value": "610503" }, { "label": "潼关县", "value": "610522" }, { "label": "大荔县", "value": "610523" }, { "label": "合阳县", "value": "610524" }, { "label": "澄城县", "value": "610525" }, { "label": "蒲城县", "value": "610526" }, { "label": "白水县", "value": "610527" }, { "label": "富平县", "value": "610528" }, { "label": "韩城市", "value": "610581" }, { "label": "华阴市", "value": "610582" }], [{ "label": "宝塔区", "value": "610602" }, { "label": "安塞区", "value": "610603" }, { "label": "延长县", "value": "610621" }, { "label": "延川县", "value": "610622" }, { "label": "子长县", "value": "610623" }, { "label": "志丹县", "value": "610625" }, { "label": "吴起县", "value": "610626" }, { "label": "甘泉县", "value": "610627" }, { "label": "富县", "value": "610628" }, { "label": "洛川县", "value": "610629" }, { "label": "宜川县", "value": "610630" }, { "label": "黄龙县", "value": "610631" }, { "label": "黄陵县", "value": "610632" }], [{ "label": "汉台区", "value": "610702" }, { "label": "南郑区", "value": "610703" }, { "label": "城固县", "value": "610722" }, { "label": "洋县", "value": "610723" }, { "label": "西乡县", "value": "610724" }, { "label": "勉县", "value": "610725" }, { "label": "宁强县", "value": "610726" }, { "label": "略阳县", "value": "610727" }, { "label": "镇巴县", "value": "610728" }, { "label": "留坝县", "value": "610729" }, { "label": "佛坪县", "value": "610730" }], [{ "label": "榆阳区", "value": "610802" }, { "label": "横山区", "value": "610803" }, { "label": "府谷县", "value": "610822" }, { "label": "靖边县", "value": "610824" }, { "label": "定边县", "value": "610825" }, { "label": "绥德县", "value": "610826" }, { "label": "米脂县", "value": "610827" }, { "label": "佳县", "value": "610828" }, { "label": "吴堡县", "value": "610829" }, { "label": "清涧县", "value": "610830" }, { "label": "子洲县", "value": "610831" }, { "label": "神木市", "value": "610881" }], [{ "label": "汉滨区", "value": "610902" }, { "label": "汉阴县", "value": "610921" }, { "label": "石泉县", "value": "610922" }, { "label": "宁陕县", "value": "610923" }, { "label": "紫阳县", "value": "610924" }, { "label": "岚皋县", "value": "610925" }, { "label": "平利县", "value": "610926" }, { "label": "镇坪县", "value": "610927" }, { "label": "旬阳县", "value": "610928" }, { "label": "白河县", "value": "610929" }], [{ "label": "商州区", "value": "611002" }, { "label": "洛南县", "value": "611021" }, { "label": "丹凤县", "value": "611022" }, { "label": "商南县", "value": "611023" }, { "label": "山阳县", "value": "611024" }, { "label": "镇安县", "value": "611025" }, { "label": "柞水县", "value": "611026" }]], [[{ "label": "城关区", "value": "620102" }, { "label": "七里河区", "value": "620103" }, { "label": "西固区", "value": "620104" }, { "label": "安宁区", "value": "620105" }, { "label": "红古区", "value": "620111" }, { "label": "永登县", "value": "620121" }, { "label": "皋兰县", "value": "620122" }, { "label": "榆中县", "value": "620123" }, { "label": "兰州新区", "value": "620171" }], [{ "label": "嘉峪关市", "value": "620201" }], [{ "label": "金川区", "value": "620302" }, { "label": "永昌县", "value": "620321" }], [{ "label": "白银区", "value": "620402" }, { "label": "平川区", "value": "620403" }, { "label": "靖远县", "value": "620421" }, { "label": "会宁县", "value": "620422" }, { "label": "景泰县", "value": "620423" }], [{ "label": "秦州区", "value": "620502" }, { "label": "麦积区", "value": "620503" }, { "label": "清水县", "value": "620521" }, { "label": "秦安县", "value": "620522" }, { "label": "甘谷县", "value": "620523" }, { "label": "武山县", "value": "620524" }, { "label": "张家川回族自治县", "value": "620525" }], [{ "label": "凉州区", "value": "620602" }, { "label": "民勤县", "value": "620621" }, { "label": "古浪县", "value": "620622" }, { "label": "天祝藏族自治县", "value": "620623" }], [{ "label": "甘州区", "value": "620702" }, { "label": "肃南裕固族自治县", "value": "620721" }, { "label": "民乐县", "value": "620722" }, { "label": "临泽县", "value": "620723" }, { "label": "高台县", "value": "620724" }, { "label": "山丹县", "value": "620725" }], [{ "label": "崆峒区", "value": "620802" }, { "label": "泾川县", "value": "620821" }, { "label": "灵台县", "value": "620822" }, { "label": "崇信县", "value": "620823" }, { "label": "华亭县", "value": "620824" }, { "label": "庄浪县", "value": "620825" }, { "label": "静宁县", "value": "620826" }, { "label": "平凉工业园区", "value": "620871" }], [{ "label": "肃州区", "value": "620902" }, { "label": "金塔县", "value": "620921" }, { "label": "瓜州县", "value": "620922" }, { "label": "肃北蒙古族自治县", "value": "620923" }, { "label": "阿克塞哈萨克族自治县", "value": "620924" }, { "label": "玉门市", "value": "620981" }, { "label": "敦煌市", "value": "620982" }], [{ "label": "西峰区", "value": "621002" }, { "label": "庆城县", "value": "621021" }, { "label": "环县", "value": "621022" }, { "label": "华池县", "value": "621023" }, { "label": "合水县", "value": "621024" }, { "label": "正宁县", "value": "621025" }, { "label": "宁县", "value": "621026" }, { "label": "镇原县", "value": "621027" }], [{ "label": "安定区", "value": "621102" }, { "label": "通渭县", "value": "621121" }, { "label": "陇西县", "value": "621122" }, { "label": "渭源县", "value": "621123" }, { "label": "临洮县", "value": "621124" }, { "label": "漳县", "value": "621125" }, { "label": "岷县", "value": "621126" }], [{ "label": "武都区", "value": "621202" }, { "label": "成县", "value": "621221" }, { "label": "文县", "value": "621222" }, { "label": "宕昌县", "value": "621223" }, { "label": "康县", "value": "621224" }, { "label": "西和县", "value": "621225" }, { "label": "礼县", "value": "621226" }, { "label": "徽县", "value": "621227" }, { "label": "两当县", "value": "621228" }], [{ "label": "临夏市", "value": "622901" }, { "label": "临夏县", "value": "622921" }, { "label": "康乐县", "value": "622922" }, { "label": "永靖县", "value": "622923" }, { "label": "广河县", "value": "622924" }, { "label": "和政县", "value": "622925" }, { "label": "东乡族自治县", "value": "622926" }, { "label": "积石山保安族东乡族撒拉族自治县", "value": "622927" }], [{ "label": "合作市", "value": "623001" }, { "label": "临潭县", "value": "623021" }, { "label": "卓尼县", "value": "623022" }, { "label": "舟曲县", "value": "623023" }, { "label": "迭部县", "value": "623024" }, { "label": "玛曲县", "value": "623025" }, { "label": "碌曲县", "value": "623026" }, { "label": "夏河县", "value": "623027" }]], [[{ "label": "城东区", "value": "630102" }, { "label": "城中区", "value": "630103" }, { "label": "城西区", "value": "630104" }, { "label": "城北区", "value": "630105" }, { "label": "大通回族土族自治县", "value": "630121" }, { "label": "湟中县", "value": "630122" }, { "label": "湟源县", "value": "630123" }], [{ "label": "乐都区", "value": "630202" }, { "label": "平安区", "value": "630203" }, { "label": "民和回族土族自治县", "value": "630222" }, { "label": "互助土族自治县", "value": "630223" }, { "label": "化隆回族自治县", "value": "630224" }, { "label": "循化撒拉族自治县", "value": "630225" }], [{ "label": "门源回族自治县", "value": "632221" }, { "label": "祁连县", "value": "632222" }, { "label": "海晏县", "value": "632223" }, { "label": "刚察县", "value": "632224" }], [{ "label": "同仁县", "value": "632321" }, { "label": "尖扎县", "value": "632322" }, { "label": "泽库县", "value": "632323" }, { "label": "河南蒙古族自治县", "value": "632324" }], [{ "label": "共和县", "value": "632521" }, { "label": "同德县", "value": "632522" }, { "label": "贵德县", "value": "632523" }, { "label": "兴海县", "value": "632524" }, { "label": "贵南县", "value": "632525" }], [{ "label": "玛沁县", "value": "632621" }, { "label": "班玛县", "value": "632622" }, { "label": "甘德县", "value": "632623" }, { "label": "达日县", "value": "632624" }, { "label": "久治县", "value": "632625" }, { "label": "玛多县", "value": "632626" }], [{ "label": "玉树市", "value": "632701" }, { "label": "杂多县", "value": "632722" }, { "label": "称多县", "value": "632723" }, { "label": "治多县", "value": "632724" }, { "label": "囊谦县", "value": "632725" }, { "label": "曲麻莱县", "value": "632726" }], [{ "label": "格尔木市", "value": "632801" }, { "label": "德令哈市", "value": "632802" }, { "label": "乌兰县", "value": "632821" }, { "label": "都兰县", "value": "632822" }, { "label": "天峻县", "value": "632823" }, { "label": "大柴旦行政委员会", "value": "632857" }, { "label": "冷湖行政委员会", "value": "632858" }, { "label": "茫崖行政委员会", "value": "632859" }]], [[{ "label": "兴庆区", "value": "640104" }, { "label": "西夏区", "value": "640105" }, { "label": "金凤区", "value": "640106" }, { "label": "永宁县", "value": "640121" }, { "label": "贺兰县", "value": "640122" }, { "label": "灵武市", "value": "640181" }], [{ "label": "大武口区", "value": "640202" }, { "label": "惠农区", "value": "640205" }, { "label": "平罗县", "value": "640221" }], [{ "label": "利通区", "value": "640302" }, { "label": "红寺堡区", "value": "640303" }, { "label": "盐池县", "value": "640323" }, { "label": "同心县", "value": "640324" }, { "label": "青铜峡市", "value": "640381" }], [{ "label": "原州区", "value": "640402" }, { "label": "西吉县", "value": "640422" }, { "label": "隆德县", "value": "640423" }, { "label": "泾源县", "value": "640424" }, { "label": "彭阳县", "value": "640425" }], [{ "label": "沙坡头区", "value": "640502" }, { "label": "中宁县", "value": "640521" }, { "label": "海原县", "value": "640522" }]], [[{ "label": "天山区", "value": "650102" }, { "label": "沙依巴克区", "value": "650103" }, { "label": "新市区", "value": "650104" }, { "label": "水磨沟区", "value": "650105" }, { "label": "头屯河区", "value": "650106" }, { "label": "达坂城区", "value": "650107" }, { "label": "米东区", "value": "650109" }, { "label": "乌鲁木齐县", "value": "650121" }, { "label": "乌鲁木齐经济技术开发区", "value": "650171" }, { "label": "乌鲁木齐高新技术产业开发区", "value": "650172" }], [{ "label": "独山子区", "value": "650202" }, { "label": "克拉玛依区", "value": "650203" }, { "label": "白碱滩区", "value": "650204" }, { "label": "乌尔禾区", "value": "650205" }], [{ "label": "高昌区", "value": "650402" }, { "label": "鄯善县", "value": "650421" }, { "label": "托克逊县", "value": "650422" }], [{ "label": "伊州区", "value": "650502" }, { "label": "巴里坤哈萨克自治县", "value": "650521" }, { "label": "伊吾县", "value": "650522" }], [{ "label": "昌吉市", "value": "652301" }, { "label": "阜康市", "value": "652302" }, { "label": "呼图壁县", "value": "652323" }, { "label": "玛纳斯县", "value": "652324" }, { "label": "奇台县", "value": "652325" }, { "label": "吉木萨尔县", "value": "652327" }, { "label": "木垒哈萨克自治县", "value": "652328" }], [{ "label": "博乐市", "value": "652701" }, { "label": "阿拉山口市", "value": "652702" }, { "label": "精河县", "value": "652722" }, { "label": "温泉县", "value": "652723" }], [{ "label": "库尔勒市", "value": "652801" }, { "label": "轮台县", "value": "652822" }, { "label": "尉犁县", "value": "652823" }, { "label": "若羌县", "value": "652824" }, { "label": "且末县", "value": "652825" }, { "label": "焉耆回族自治县", "value": "652826" }, { "label": "和静县", "value": "652827" }, { "label": "和硕县", "value": "652828" }, { "label": "博湖县", "value": "652829" }, { "label": "库尔勒经济技术开发区", "value": "652871" }], [{ "label": "阿克苏市", "value": "652901" }, { "label": "温宿县", "value": "652922" }, { "label": "库车县", "value": "652923" }, { "label": "沙雅县", "value": "652924" }, { "label": "新和县", "value": "652925" }, { "label": "拜城县", "value": "652926" }, { "label": "乌什县", "value": "652927" }, { "label": "阿瓦提县", "value": "652928" }, { "label": "柯坪县", "value": "652929" }], [{ "label": "阿图什市", "value": "653001" }, { "label": "阿克陶县", "value": "653022" }, { "label": "阿合奇县", "value": "653023" }, { "label": "乌恰县", "value": "653024" }], [{ "label": "喀什市", "value": "653101" }, { "label": "疏附县", "value": "653121" }, { "label": "疏勒县", "value": "653122" }, { "label": "英吉沙县", "value": "653123" }, { "label": "泽普县", "value": "653124" }, { "label": "莎车县", "value": "653125" }, { "label": "叶城县", "value": "653126" }, { "label": "麦盖提县", "value": "653127" }, { "label": "岳普湖县", "value": "653128" }, { "label": "伽师县", "value": "653129" }, { "label": "巴楚县", "value": "653130" }, { "label": "塔什库尔干塔吉克自治县", "value": "653131" }], [{ "label": "和田市", "value": "653201" }, { "label": "和田县", "value": "653221" }, { "label": "墨玉县", "value": "653222" }, { "label": "皮山县", "value": "653223" }, { "label": "洛浦县", "value": "653224" }, { "label": "策勒县", "value": "653225" }, { "label": "于田县", "value": "653226" }, { "label": "民丰县", "value": "653227" }], [{ "label": "伊宁市", "value": "654002" }, { "label": "奎屯市", "value": "654003" }, { "label": "霍尔果斯市", "value": "654004" }, { "label": "伊宁县", "value": "654021" }, { "label": "察布查尔锡伯自治县", "value": "654022" }, { "label": "霍城县", "value": "654023" }, { "label": "巩留县", "value": "654024" }, { "label": "新源县", "value": "654025" }, { "label": "昭苏县", "value": "654026" }, { "label": "特克斯县", "value": "654027" }, { "label": "尼勒克县", "value": "654028" }], [{ "label": "塔城市", "value": "654201" }, { "label": "乌苏市", "value": "654202" }, { "label": "额敏县", "value": "654221" }, { "label": "沙湾县", "value": "654223" }, { "label": "托里县", "value": "654224" }, { "label": "裕民县", "value": "654225" }, { "label": "和布克赛尔蒙古自治县", "value": "654226" }], [{ "label": "阿勒泰市", "value": "654301" }, { "label": "布尔津县", "value": "654321" }, { "label": "富蕴县", "value": "654322" }, { "label": "福海县", "value": "654323" }, { "label": "哈巴河县", "value": "654324" }, { "label": "青河县", "value": "654325" }, { "label": "吉木乃县", "value": "654326" }], [{ "label": "石河子市", "value": "659001" }, { "label": "阿拉尔市", "value": "659002" }, { "label": "图木舒克市", "value": "659003" }, { "label": "五家渠市", "value": "659004" }, { "label": "铁门关市", "value": "659006" }]], [[{ "label": "台北", "value": "660101" }], [{ "label": "高雄", "value": "660201" }], [{ "label": "基隆", "value": "660301" }], [{ "label": "台中", "value": "660401" }], [{ "label": "台南", "value": "660501" }], [{ "label": "新竹", "value": "660601" }], [{ "label": "嘉义", "value": "660701" }], [{ "label": "宜兰", "value": "660801" }], [{ "label": "桃园", "value": "660901" }], [{ "label": "苗栗", "value": "661001" }], [{ "label": "彰化", "value": "661101" }], [{ "label": "南投", "value": "661201" }], [{ "label": "云林", "value": "661301" }], [{ "label": "屏东", "value": "661401" }], [{ "label": "台东", "value": "661501" }], [{ "label": "花莲", "value": "661601" }], [{ "label": "澎湖", "value": "661701" }]], [[{ "label": "香港岛", "value": "670101" }], [{ "label": "九龙", "value": "670201" }], [{ "label": "新界", "value": "670301" }]], [[{ "label": "澳门半岛", "value": "680101" }], [{ "label": "氹仔岛", "value": "680201" }], [{ "label": "路环岛", "value": "680301" }], [{ "label": "路氹城", "value": "680401" }]]];var _default = areaData;exports.default = _default;

/***/ }),

/***/ 27:
/*!***************************************************************!*\
  !*** D:/git/doctor/final/uview-ui/libs/function/type2icon.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 根据主题type值,获取对应的图标
                                                                                                      * @param String type 主题名称,primary|info|error|warning|success
                                                                                                      * @param String fill 是否使用fill填充实体的图标  
                                                                                                      */
function type2icon() {var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'success';var fill = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  // 如果非预置值,默认为success
  if (['primary', 'info', 'error', 'warning', 'success'].indexOf(type) == -1) type = 'success';
  var iconName = '';
  // 目前(2019-12-12),info和primary使用同一个图标
  switch (type) {
    case 'primary':
      iconName = 'info-circle';
      break;
    case 'info':
      iconName = 'info-circle';
      break;
    case 'error':
      iconName = 'close-circle';
      break;
    case 'warning':
      iconName = 'error-circle';
      break;
    case 'success':
      iconName = 'checkmark-circle';
      break;
    default:
      iconName = 'checkmark-circle';}

  // 是否是实体类型,加上-fill,在icon组件库中,实体的类名是后面加-fill的
  if (fill) iconName += '-fill';
  return iconName;
}var _default =

type2icon;exports.default = _default;

/***/ }),

/***/ 28:
/*!*****************************************************************!*\
  !*** D:/git/doctor/final/uview-ui/libs/function/randomArray.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 打乱数组
function randomArray() {var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  // 原理是sort排序,Math.random()产生0<= x < 1之间的数,会导致x-0.05大于或者小于0
  return array.sort(function () {return Math.random() - 0.5;});
}var _default =

randomArray;exports.default = _default;

/***/ }),

/***/ 29:
/*!*************************************************************!*\
  !*** D:/git/doctor/final/uview-ui/libs/function/addUnit.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = addUnit;var _test = _interopRequireDefault(__webpack_require__(/*! ./test.js */ 16));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// 添加单位，如果有rpx，%，px等单位结尾或者值为auto，直接返回，否则加上rpx单位结尾
function addUnit() {var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'auto';var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rpx';
  value = String(value);
  // 用uView内置验证规则中的number判断是否为数值
  return _test.default.number(value) ? "".concat(value).concat(unit) : value;
}

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 30:
/*!************************************************************!*\
  !*** D:/git/doctor/final/uview-ui/libs/function/random.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function random(min, max) {
  if (min >= 0 && max > 0 && max >= min) {
    var gab = max - min + 1;
    return Math.floor(Math.random() * gab + min);
  } else {
    return 0;
  }
}var _default =

random;exports.default = _default;

/***/ }),

/***/ 31:
/*!**********************************************************!*\
  !*** D:/git/doctor/final/uview-ui/libs/function/trim.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function trim(str) {var pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'both';
  if (pos == 'both') {
    return str.replace(/^\s+|\s+$/g, "");
  } else if (pos == "left") {
    return str.replace(/^\s*/, '');
  } else if (pos == 'right') {
    return str.replace(/(\s*$)/g, "");
  } else if (pos == 'all') {
    return str.replace(/\s+/g, "");
  } else {
    return str;
  }
}var _default =

trim;exports.default = _default;

/***/ }),

/***/ 32:
/*!***********************************************************!*\
  !*** D:/git/doctor/final/uview-ui/libs/function/toast.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function toast(title) {var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1500;
  uni.showToast({
    title: title,
    icon: 'none',
    duration: duration });

}var _default =

toast;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 33:
/*!***************************************************************!*\
  !*** D:/git/doctor/final/uview-ui/libs/function/getParent.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = getParent; // 获取父组件的参数，因为支付宝小程序不支持provide/inject的写法
// this.$parent在非H5中，可以准确获取到父组件，但是在H5中，需要多次this.$parent.$parent.xxx
function getParent(name, keys) {
  var parent = this.$parent;
  // 通过while历遍，这里主要是为了H5需要多层解析的问题
  while (parent) {
    // 父组件
    if (parent.$options.name !== name) {
      // 如果组件的name不相等，继续上一级寻找
      parent = parent.$parent;
    } else {var _ret = function () {
        var data = {};
        // 判断keys是否数组，如果传过来的是一个数组，那么直接使用数组元素值当做键值去父组件寻找
        if (Array.isArray(keys)) {
          keys.map(function (val) {
            data[val] = parent[val] ? parent[val] : '';
          });
        } else {
          // 历遍传过来的对象参数
          for (var i in keys) {
            // 如果子组件有此值则用，无此值则用父组件的值
            // 判断是否空数组，如果是，则用父组件的值，否则用子组件的值
            if (Array.isArray(keys[i])) {
              if (keys[i].length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else if (keys[i].constructor === Object) {
              // 判断是否对象，如果是对象，且有属性，那么使用子组件的值，否则使用父组件的值
              if (Object.keys(keys[i]).length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else {
              // 只要子组件有传值，即使是false值，也是“传值”了，也需要覆盖父组件的同名参数
              data[i] = keys[i] || keys[i] === false ? keys[i] : parent[i];
            }
          }
        }
        return { v: data };}();if (typeof _ret === "object") return _ret.v;
    }
  }

  return {};
}

/***/ }),

/***/ 34:
/*!*************************************************************!*\
  !*** D:/git/doctor/final/uview-ui/libs/function/$parent.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = $parent; // 获取父组件的参数，因为支付宝小程序不支持provide/inject的写法
// this.$parent在非H5中，可以准确获取到父组件，但是在H5中，需要多次this.$parent.$parent.xxx
// 这里默认值等于undefined有它的含义，因为最顶层元素(组件)的$parent就是undefined，意味着不传name
// 值(默认为undefined)，就是查找最顶层的$parent
function $parent() {var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
  var parent = this.$parent;
  // 通过while历遍，这里主要是为了H5需要多层解析的问题
  while (parent) {
    // 父组件
    if (parent.$options && parent.$options.name !== name) {
      // 如果组件的name不相等，继续上一级寻找
      parent = parent.$parent;
    } else {
      return parent;
    }
  }
  return false;
}

/***/ }),

/***/ 35:
/*!*********************************************************!*\
  !*** D:/git/doctor/final/uview-ui/libs/function/sys.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.os = os;exports.sys = sys;function os() {
  return uni.getSystemInfoSync().platform;
};

function sys() {
  return uni.getSystemInfoSync();
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 36:
/*!**************************************************************!*\
  !*** D:/git/doctor/final/uview-ui/libs/function/debounce.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var timeout = null;

/**
                                                                                                                         * 防抖原理：一定时间内，只有最后一次操作，再过wait毫秒后才执行函数
                                                                                                                         * 
                                                                                                                         * @param {Function} func 要执行的回调函数 
                                                                                                                         * @param {Number} wait 延时的时间
                                                                                                                         * @param {Boolean} immediate 是否立即执行 
                                                                                                                         * @return null
                                                                                                                         */
function debounce(func) {var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  // 清除定时器
  if (timeout !== null) clearTimeout(timeout);
  // 立即执行，此类情况一般用不到
  if (immediate) {
    var callNow = !timeout;
    timeout = setTimeout(function () {
      timeout = null;
    }, wait);
    if (callNow) typeof func === 'function' && func();
  } else {
    // 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
    timeout = setTimeout(function () {
      typeof func === 'function' && func();
    }, wait);
  }
}var _default =

debounce;exports.default = _default;

/***/ }),

/***/ 37:
/*!**************************************************************!*\
  !*** D:/git/doctor/final/uview-ui/libs/function/throttle.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var timer, flag;
/**
                                                                                                                      * 节流原理：在一定时间内，只能触发一次
                                                                                                                      * 
                                                                                                                      * @param {Function} func 要执行的回调函数 
                                                                                                                      * @param {Number} wait 延时的时间
                                                                                                                      * @param {Boolean} immediate 是否立即执行
                                                                                                                      * @return null
                                                                                                                      */
function throttle(func) {var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  if (immediate) {
    if (!flag) {
      flag = true;
      // 如果是立即执行，则在wait毫秒内开始时执行
      typeof func === 'function' && func();
      timer = setTimeout(function () {
        flag = false;
      }, wait);
    }
  } else {
    if (!flag) {
      flag = true;
      // 如果是非立即执行，则在wait毫秒内的结束处执行
      timer = setTimeout(function () {
        flag = false;
        typeof func === 'function' && func();
      }, wait);
    }

  }
};var _default =
throttle;exports.default = _default;

/***/ }),

/***/ 38:
/*!**********************************************************!*\
  !*** D:/git/doctor/final/uview-ui/libs/config/config.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 此版本发布于2020-12-17
var version = '1.8.3';var _default =

{
  v: version,
  version: version,
  // 主题名称
  type: [
  'primary',
  'success',
  'info',
  'error',
  'warning'] };exports.default = _default;

/***/ }),

/***/ 39:
/*!**********************************************************!*\
  !*** D:/git/doctor/final/uview-ui/libs/config/zIndex.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // uniapp在H5中各API的z-index值如下：
/**
 * actionsheet: 999
 * modal: 999
 * navigate: 998
 * tabbar: 998
 * toast: 999
 */var _default =

{
  toast: 10090,
  noNetwork: 10080,
  // popup包含popup，actionsheet，keyboard，picker的值
  popup: 10075,
  mask: 10070,
  navbar: 980,
  topTips: 975,
  sticky: 970,
  indexListSticky: 965 };exports.default = _default;

/***/ }),

/***/ 4:
/*!**************************************!*\
  !*** D:/git/doctor/final/pages.json ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 40:
/*!**********************************************************!*\
  !*** D:/git/doctor/final/static/js/goeasy-2.0.13.min.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni, Buffer) {!function (e, t) { true ? module.exports = t() : undefined;}("undefined" != typeof self ? self : this, function () {return function (e) {var t = {};function n(o) {if (t[o]) return t[o].exports;var i = t[o] = { i: o, l: !1, exports: {} };return e[o].call(i.exports, i, i.exports, n), i.l = !0, i.exports;}return n.m = e, n.c = t, n.d = function (e, t, o) {n.o(e, t) || Object.defineProperty(e, t, { configurable: !1, enumerable: !0, get: o });}, n.n = function (e) {var t = e && e.__esModule ? function () {return e["default"];} : function () {return e;};return n.d(t, "a", t), t;}, n.o = function (e, t) {return Object.prototype.hasOwnProperty.call(e, t);}, n.p = "", n(n.s = 120);}([function (e, t, n) {"use strict";t.__esModule = !0, t["default"] = function (e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");};}, function (e, t, n) {"use strict";t.__esModule = !0;var o,i = n(128),r = (o = i) && o.__esModule ? o : { "default": o };t["default"] = function () {function e(e, t) {for (var n = 0; n < t.length; n++) {var o = t[n];o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), (0, r["default"])(e, o.key, o);}}return function (t, n, o) {return n && e(t.prototype, n), o && e(t, o), t;};}();}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.noop = t.GoEasyDomainNumber = t.env = t.goEasyArray = t.UUID = t.calibrator = undefined;var o = n(83),i = n(150),r = n(154),s = n(92),a = n(93);t.calibrator = o.calibrator, t.UUID = i.UUID, t.goEasyArray = r.goEasyArray, t.env = s.env, t.GoEasyDomainNumber = a.GoEasyDomainNumber, t.noop = function () {};}, function (e, t, n) {e.exports = { "default": n(155), __esModule: !0 };}, function (e, t, n) {"use strict";t.__esModule = !0;var o,i = n(20),r = (o = i) && o.__esModule ? o : { "default": o };t["default"] = function (e, t) {if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !t || "object" !== (void 0 === t ? "undefined" : (0, r["default"])(t)) && "function" != typeof t ? e : t;};}, function (e, t, n) {"use strict";t.__esModule = !0;var o = s(n(157)),i = s(n(21)),r = s(n(20));function s(e) {return e && e.__esModule ? e : { "default": e };}t["default"] = function (e, t) {if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === t ? "undefined" : (0, r["default"])(t)));e.prototype = (0, i["default"])(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (o["default"] ? (0, o["default"])(e, t) : e.__proto__ = t);};}, function (e, t, n) {e.exports = { "default": n(175), __esModule: !0 };}, function (e, t) {var n = e.exports = { version: "2.6.12" };"number" == typeof __e && (__e = n);}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });t["default"] = { WRITE: "WRITE", READ: "READ", NONE: "NONE" };}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });t["default"] = { "default": "default", text: "text", image: "image", video: "video", audio: "audio", emoji: "emoji", file: "file" };}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = a(n(0)),i = a(n(1)),r = n(2),s = a(n(8));function a(e) {return e && e.__esModule ? e : { "default": e };}var u = function () {function e(t) {var n = this;(0, o["default"])(this, e), this.uuid = null, this.name = "", this.params = null, this.success = null, this.fail = null, this.permission = s["default"].NONE, this.singleTimeout = 0, this.totalTimeout = 0, this.startTime = 0, this.complete = !1, this.retried = 0, this.uuid = r.UUID.get(), this.name = t.name, this.params = t.params, this.permission = t.permission, this.totalTimeout = t.totalTimeout, this.singleTimeout = t.singleTimeout, this.success = function (e) {n.complete || (n.complete = !0, t.success(e));}, this.fail = function (e) {n.complete || (n.complete = !0, t.fail(e));};}return (0, i["default"])(e, [{ key: "start", value: function value() {this.startTime = Date.now();} }, { key: "isTimeout", value: function value() {return this.startTime + this.totalTimeout < Date.now();} }]), e;}();t["default"] = u;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });t.EmitType = { authorize: "authorize", manualDisconnect: "manualDisconnect", subscribe: "subscribe", unsubscribe: "unsubscribe", publish: "publish", ack: "ack", historyMessages: "historyMessages", hereNow: "hereNow", hereNowByUserIds: "hereNowByUserIds", imLastConversations: "imLastConversations", markPrivateMessageAsRead: "markPrivateMessageAsRead", markGroupMessageAsRead: "markGroupMessageAsRead", imGroupOnlineCount: "imGroupOnlineCount", imHereNow: "imHereNow", imGroupHereNow: "imGroupHereNow", publishIM: "publishIM", imHistory: "imHistory", subscribeUserPresence: "subscribeUserPresence", unsubscribeUserPresence: "unsubscribeUserPresence", subscribeGroupPresence: "subscribeGroupPresence", unsubscribeGroupPresence: "unsubscribeGroupPresence", removeConversation: "removeConversation", topConversation: "topConversation", imData: "imData", subscribeGroups: "subscribeGroups", unsubscribeGroup: "unsubscribeGroup" };}, function (e, t, n) {"use strict";t.__esModule = !0;var o = r(n(3)),i = r(n(193));function r(e) {return e && e.__esModule ? e : { "default": e };}t["default"] = function s(e, t, n) {null === e && (e = Function.prototype);var r = (0, i["default"])(e, t);if (r === undefined) {var a = (0, o["default"])(e);return null === a ? undefined : s(a, t, n);}if ("value" in r) return r.value;var u = r.get;return u === undefined ? undefined : u.call(n);};}, function (e, t) {var n = e.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();"number" == typeof __g && (__g = n);}, function (e, t, n) {var o = n(59)("wks"),i = n(46),r = n(13).Symbol,s = "function" == typeof r;(e.exports = function (e) {return o[e] || (o[e] = s && r[e] || (s ? r : i)("Symbol." + e));}).store = o;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });t.SocketTimeout = { connect: 1500, reconnectionDelayMax: 3e3, commonQuerySingle: 2500, commonQueryTotal: 12e3, commonRequestSingle: 1700, commonRequestTotal: 12e3, commonInfiniteSingle: 1700, commonInfiniteTotal: 864e5 };}, function (e, t, n) {var o = n(13),i = n(7),r = n(35),s = n(26),a = n(27),u = function u(e, t, n) {var c,l,f,d = e & u.F,p = e & u.G,h = e & u.S,y = e & u.P,v = e & u.B,m = e & u.W,g = p ? i : i[t] || (i[t] = {}),b = g.prototype,_ = p ? o : h ? o[t] : (o[t] || {}).prototype;for (c in p && (n = t), n) {(l = !d && _ && _[c] !== undefined) && a(g, c) || (f = l ? _[c] : n[c], g[c] = p && "function" != typeof _[c] ? n[c] : v && l ? r(f, o) : m && _[c] == f ? function (e) {var t = function t(_t, n, o) {if (this instanceof e) {switch (arguments.length) {case 0:return new e();case 1:return new e(_t);case 2:return new e(_t, n);}return new e(_t, n, o);}return e.apply(this, arguments);};return t.prototype = e.prototype, t;}(f) : y && "function" == typeof f ? r(Function.call, f) : f, y && ((g.virtual || (g.virtual = {}))[c] = f, e & u.R && b && !b[c] && s(b, c, f)));}};u.F = 1, u.G = 2, u.S = 4, u.P = 8, u.B = 16, u.W = 32, u.U = 64, u.R = 128, e.exports = u;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.str = t.noop = t.GoEasyDomainNumber = t.env = t.goEasyArray = t.UUID = t.calibrator = undefined;var o = n(196),i = n(2);t.calibrator = i.calibrator, t.UUID = i.UUID, t.goEasyArray = i.goEasyArray, t.env = i.env, t.GoEasyDomainNumber = i.GoEasyDomainNumber, t.noop = i.noop, t.str = o.str;}, function (e, t, n) {e.exports = !n(30)(function () {return 7 != Object.defineProperty({}, "a", { get: function get() {return 7;} }).a;});}, function (e, t, n) {var o = n(23);e.exports = function (e) {if (!o(e)) throw TypeError(e + " is not an object!");return e;};}, function (e, t, n) {"use strict";t.__esModule = !0;var o = s(n(133)),i = s(n(141)),r = "function" == typeof i["default"] && "symbol" == typeof o["default"] ? function (e) {return typeof e;} : function (e) {return e && "function" == typeof i["default"] && e.constructor === i["default"] && e !== i["default"].prototype ? "symbol" : typeof e;};function s(e) {return e && e.__esModule ? e : { "default": e };}t["default"] = "function" == typeof i["default"] && "symbol" === r(o["default"]) ? function (e) {return void 0 === e ? "undefined" : r(e);} : function (e) {return e && "function" == typeof i["default"] && e.constructor === i["default"] && e !== i["default"].prototype ? "symbol" : void 0 === e ? "undefined" : r(e);};}, function (e, t, n) {e.exports = { "default": n(161), __esModule: !0 };}, function (e, t, n) {var o = n(19),i = n(79),r = n(55),s = Object.defineProperty;t.f = n(18) ? Object.defineProperty : function (e, t, n) {if (o(e), t = r(t, !0), o(n), i) try {return s(e, t, n);} catch (a) {}if ("get" in n || "set" in n) throw TypeError("Accessors not supported!");return "value" in n && (e[t] = n.value), e;};}, function (e, t) {e.exports = function (e) {return "object" == typeof e ? null !== e : "function" == typeof e;};}, function (e, t, n) {var o = n(81),i = n(56);e.exports = function (e) {return o(i(e));};}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.Conversion = t.ConversationType = t.Conversations = undefined;var o = n(101),i = n(69),r = n(191);t.Conversations = r.Conversations, t.ConversationType = i.ConversationType, t.Conversion = o.Conversion;}, function (e, t, n) {var o = n(22),i = n(45);e.exports = n(18) ? function (e, t, n) {return o.f(e, t, i(1, n));} : function (e, t, n) {return e[t] = n, e;};}, function (e, t) {var n = {}.hasOwnProperty;e.exports = function (e, t) {return n.call(e, t);};}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });t["default"] = { DISCONNECTED: "disconnected", DISCONNECTING: "disconnecting", CONNECTING: "connecting", CONNECTED: "connected", RECONNECTING: "reconnecting", RECONNECTED: "reconnected", EXPIRED_RECONNECTED: "reconnected", CONNECT_FAILED: "connect_failed" };}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.ImEventType = t.eventCenter = undefined;var o = n(190),i = n(100);t.eventCenter = o.eventCenter, t.ImEventType = i.ImEventType;}, function (e, t) {e.exports = function (e) {try {return !!e();} catch (t) {return !0;}};}, function (e, t, n) {var o = n(80),i = n(60);e.exports = Object.keys || function (e) {return o(e, i);};}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.SocketTimeout = t.IMTimeout = undefined;var o = n(15);t.IMTimeout = {};t.SocketTimeout = o.SocketTimeout;}, function (e, t, n) {e.exports = { "default": n(208), __esModule: !0 };}, function (e, t, n) {"use strict";var o = n(253),i = n(254),r = n(256),s = n(257);"undefined" != typeof navigator && /Android/i.test(navigator.userAgent), "undefined" != typeof navigator && /PhantomJS/i.test(navigator.userAgent);t.protocol = 3;var a = t.packets = { open: 0, close: 1, ping: 2, pong: 3, message: 4, upgrade: 5, noop: 6 },u = o(a),c = { type: "error", data: "parser error" },l = n(258);t.encodePacket = function (e, t, n, o) {"function" == typeof t && (o = t, t = !1), "function" == typeof n && (o = n, n = null);e.data === undefined ? undefined : e.data.buffer || e.data;var i = a[e.type];return undefined !== e.data && (i += n ? s.encode(String(e.data), { strict: !1 }) : String(e.data)), o("" + i);}, t.decodePacket = function (e, t, n) {if (e === undefined) return c;if ("string" == typeof e) {if (n && !1 === (e = function (e) {try {e = s.decode(e, { strict: !1 });} catch (t) {return !1;}return e;}(e))) return c;var o = e.charAt(0);return Number(o) == o && u[o] ? e.length > 1 ? { type: u[o], data: e.substring(1) } : { type: u[o] } : c;}o = new Uint8Array(e)[0];var i = sliceBuffer(e, 1);return l && "blob" === t && (i = new l([i])), { type: u[o], data: i };}, t.encodePayload = function (e, n, o) {"function" == typeof n && (o = n, n = null);var s = i(e);if (!e.length) return o("0:");!function (e, t, n) {for (var o = new Array(e.length), i = r(e.length, n), s = function s(e, n, i) {t(n, function (t, n) {o[e] = n, i(t, o);});}, a = 0; a < e.length; a++) {s(a, e[a], i);}}(e, function (e, o) {t.encodePacket(e, !!s && n, !0, function (e) {o(null, function (e) {return e.length + ":" + e;}(e));});}, function (e, t) {return o(t.join(""));});}, t.decodePayload = function (e, n, o) {var i;if ("function" == typeof n && (o = n, n = null), "" === e) return o(c, 0, 1);for (var r, s, a = "", u = 0, l = e.length; u < l; u++) {var f = e.charAt(u);if (":" === f) {if ("" === a || a != (r = Number(a))) return o(c, 0, 1);if (a != (s = e.substr(u + 1, r)).length) return o(c, 0, 1);if (s.length) {if (i = t.decodePacket(s, n, !0), c.type === i.type && c.data === i.data) return o(c, 0, 1);if (!1 === o(i, u + r, l)) return;}u += r, a = "";} else a += f;}return "" !== a ? o(c, 0, 1) : void 0;};}, function (e, t, n) {var o = n(44);e.exports = function (e, t, n) {if (o(e), t === undefined) return e;switch (n) {case 1:return function (n) {return e.call(t, n);};case 2:return function (n, o) {return e.call(t, n, o);};case 3:return function (n, o, i) {return e.call(t, n, o, i);};}return function () {return e.apply(t, arguments);};};}, function (e, t) {var n = {}.toString;e.exports = function (e) {return n.call(e).slice(8, -1);};}, function (e, t) {e.exports = !0;}, function (e, t) {t.f = {}.propertyIsEnumerable;}, function (e, t) {e.exports = {};}, function (e, t, n) {var o = n(56);e.exports = function (e) {return Object(o(e));};}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });t["default"] = { message: "message", imMessage: "imMessage", userPresence: "userPresence", groupPresence: "groupPresence" };}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = C(n(6)),i = C(n(0)),r = C(n(1)),s = n(29),a = n(25),u = n(192),c = C(n(9)),l = C(n(207)),f = C(n(224)),d = C(n(107)),p = C(n(225)),h = C(n(226)),y = C(n(227)),v = C(n(228)),m = C(n(229)),g = C(n(230)),b = C(n(231)),_ = C(n(232)),k = C(n(233));function C(e) {return e && e.__esModule ? e : { "default": e };}var w = function () {function e() {(0, i["default"])(this, e), this._event = s.eventCenter, this._goEasyUploader = null, this._goEasySocket = null, this._dataCache = null, this._messageSender = null, this._history = null, this._conversations = null, this._iMReceiver = null, this._groupMessageReceive = null, this._groupPresenceSubscriber = null, this._groupOnlineCount = null, this._groupHereNow = null, this._privateMessageReceive = null, this._userPresenceSubscriber = null, this._userHereNow = null;}return (0, r["default"])(e, [{ key: "on", value: function value(e, t) {this._event.on(e, t);} }, { key: "initialBeforeConnect", value: function value(t) {e.userId = t.id, e.userData = t.data, this._dataCache = new k["default"](this, t), this._messageSender = new l["default"](this), this._history = new f["default"](this), this._goEasyUploader = new d["default"](this), this._userHereNow = new g["default"](this), this._groupHereNow = new b["default"](this), this._groupOnlineCount = new y["default"](this);} }, { key: "initialAfterConnect", value: function value() {this._iMReceiver = new _["default"](this), this._conversations = new a.Conversations(this), this._groupPresenceSubscriber = new v["default"](this), this._groupMessageReceive = new p["default"](this), this._userPresenceSubscriber = new m["default"](this), this._privateMessageReceive = new h["default"](this);} }, { key: "initialGoEasySocket", value: function value(e) {this._goEasySocket = e;} }, { key: "createTextMessage", value: function value(e) {return u.messageCreator.create(c["default"].text, e);} }, { key: "createImageMessage", value: function value(e) {return u.messageCreator.create(c["default"].image, e);} }, { key: "createFileMessage", value: function value(e) {return u.messageCreator.create(c["default"].file, e);} }, { key: "createAudioMessage", value: function value(e) {return u.messageCreator.create(c["default"].audio, e);} }, { key: "createVideoMessage", value: function value(e) {return u.messageCreator.create(c["default"].video, e);} }, { key: "createCustomMessage", value: function value(e) {return u.messageCreator.create(e.type, e);} }, { key: "latestConversations", value: function value() {return this._conversations ? this._conversations.latestConversations() : o["default"].reject({ code: 500, content: "Please connect GoEasyIM first." });} }, { key: "groupMarkAsRead", value: function value(e, t) {return this._conversations.groupMarkAsRead(e, t);} }, { key: "privateMarkAsRead", value: function value(e, t) {return this._conversations.privateMarkAsRead(e, t);} }, { key: "removePrivateConversation", value: function value(e) {return this._conversations.removeConversation(e, a.ConversationType.PRIVATE);} }, { key: "removeGroupConversation", value: function value(e) {return this._conversations.removeConversation(e, a.ConversationType.GROUP);} }, { key: "topPrivateConversation", value: function value(e, t) {return this._conversations.topConversation(e, t, a.ConversationType.PRIVATE);} }, { key: "topGroupConversation", value: function value(e, t) {return this._conversations.topConversation(e, t, a.ConversationType.GROUP);} }, { key: "history", value: function value(e) {return this._history.history(e);} }, { key: "upload", value: function value(e, t, n) {return this._goEasyUploader.upload(e, t, n);} }, { key: "sendSystemMessage", value: function value(e, t) {return this._messageSender.send(e, t, a.ConversationType.SYSTEM);} }, { key: "sendMessage", value: function value(e) {return this._messageSender.sendMessage(e);} }, { key: "sendPrivateMessage", value: function value(e, t) {return this._messageSender.send(e, t, a.ConversationType.PRIVATE);} }, { key: "subscribeUserPresence", value: function value(e) {return this._userPresenceSubscriber.presence(e);} }, { key: "unsubscribeUserPresence", value: function value(e) {return this._userPresenceSubscriber.unPresence(e);} }, { key: "hereNow", value: function value(e) {return this._userHereNow.hereNow(e, a.ConversationType.PRIVATE);} }, { key: "sendGroupMessage", value: function value(e, t) {return this._messageSender.send(e, t, a.ConversationType.GROUP);} }, { key: "subscribeGroup", value: function value(e) {return this._groupMessageReceive.subscribe(e);} }, { key: "unsubscribeGroup", value: function value(e) {return this._groupMessageReceive.unsubscribe(e);} }, { key: "subscribeGroupPresence", value: function value(e) {return this._groupPresenceSubscriber.presence(e);} }, { key: "unsubscribeGroupPresence", value: function value(e) {return this._groupPresenceSubscriber.unPresence(e);} }, { key: "groupHereNow", value: function value(e) {return this._groupHereNow.hereNow(e);} }, { key: "groupOnlineCount", value: function value(e) {return this._groupOnlineCount.get(e);} }]), e;}();w.version = null, w.userId = undefined, w.userData = null, t["default"] = w;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = l(n(21)),i = l(n(0)),r = l(n(1)),s = l(n(42)),a = n(2),u = (l(n(9)), l(n(49))),c = n(25);function l(e) {return e && e.__esModule ? e : { "default": e };}var f = function () {function e(t) {(0, i["default"])(this, e), this.type = "", this.to = { type: null, id: null, data: null }, this.timestamp = Date.now(), this.senderId = null, this.payload = null, this.messageId = a.UUID.get(), this.status = u["default"]["new"], this.validate(t), this.setSenderId(), this.setType(t), this.setNotification(t), this.setPayload(t), this.setTo(t), this.setData();}return (0, r["default"])(e, [{ key: "validate", value: function value(e) {if (!a.calibrator.isObject(e)) throw Error("it is an empty message.");} }, { key: "setType", value: function value(e) {throw Error("Abstract method");} }, { key: "setNotification", value: function value(e) {if (e.notification) {if (!a.calibrator.isObject(e.notification)) throw Error("notification require an object.");if (a.calibrator.isEmpty(e.notification.title)) throw Error("notification's title is empty.");if (a.calibrator.isEmpty(e.notification.body)) throw Error("notification's body is empty.");if (e.notification.title.length > 32) throw Error("notification's title over max length 32");if (e.notification.body.length > 50) throw Error("notification's body over max length 50");this.notification = e.notification;}} }, { key: "setPayload", value: function value(e) {this.payload = (0, o["default"])(null);} }, { key: "setSenderId", value: function value() {if (!s["default"].userId) throw Error("please call connect() first.");this.senderId = s["default"].userId;} }, { key: "setTo", value: function value(e) {this.to = e.to;} }, { key: "setData", value: function value() {this.to && this.to.type == c.ConversationType.GROUP && (this.senderData = s["default"].userData);} }]), e;}();t["default"] = f;}, function (e, t) {e.exports = function (e) {if ("function" != typeof e) throw TypeError(e + " is not a function!");return e;};}, function (e, t) {e.exports = function (e, t) {return { enumerable: !(1 & e), configurable: !(2 & e), writable: !(4 & e), value: t };};}, function (e, t) {var n = 0,o = Math.random();e.exports = function (e) {return "Symbol(".concat(e === undefined ? "" : e, ")_", (++n + o).toString(36));};}, function (e, t, n) {var o = n(22).f,i = n(27),r = n(14)("toStringTag");e.exports = function (e, t, n) {e && !i(e = n ? e : e.prototype, r) && o(e, r, { configurable: !0, value: t });};}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = c(n(21)),i = c(n(0)),r = c(n(1)),s = n(2),a = n(25),u = c(n(49));function c(e) {return e && e.__esModule ? e : { "default": e };}var l = function () {function e() {(0, i["default"])(this, e);}return (0, r["default"])(e, null, [{ key: "assemble", value: function value(e) {if (!s.calibrator.isDef(e)) return null;try {var t = (0, o["default"])(null);return t.type = e.mt, t.timestamp = e.ts, t.senderId = e.s, t.payload = JSON.parse(e.p), t.messageId = e.i, t.status = u["default"].success, e.t == a.ConversationType.GROUP ? (t.groupId = e.r, t.senderData = e.d ? JSON.parse(e.d) : {}) : t.receiverId = e.r, t;} catch (n) {throw Error(n);}} }]), e;}();t["default"] = l;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });t["default"] = { "new": "new", sending: "sending", success: "success", fail: "fail" };}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = f(n(3)),i = f(n(0)),r = f(n(1)),s = f(n(4)),a = f(n(12)),u = f(n(5)),c = f(n(70)),l = n(17);function f(e) {return e && e.__esModule ? e : { "default": e };}var d = function (e) {function t(e) {return (0, i["default"])(this, t), (0, s["default"])(this, (t.__proto__ || (0, o["default"])(t)).call(this, e));}return (0, u["default"])(t, e), (0, r["default"])(t, [{ key: "validate", value: function value(e) {if ((0, a["default"])(t.prototype.__proto__ || (0, o["default"])(t.prototype), "validate", this).call(this, e), !l.calibrator.isDef(e.file)) throw Error("file is empty.");} }, { key: "setPayload", value: function value(e) {(0, a["default"])(t.prototype.__proto__ || (0, o["default"])(t.prototype), "setPayload", this).call(this, e);} }]), t;}(c["default"]);t["default"] = d;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = l(n(3)),i = l(n(0)),r = l(n(1)),s = l(n(4)),a = l(n(12)),u = l(n(5)),c = n(17);function l(e) {return e && e.__esModule ? e : { "default": e };}var f = function (e) {function t(e) {return (0, i["default"])(this, t), (0, s["default"])(this, (t.__proto__ || (0, o["default"])(t)).call(this, e));}return (0, u["default"])(t, e), (0, r["default"])(t, [{ key: "validate", value: function value(e) {if ((0, a["default"])(t.prototype.__proto__ || (0, o["default"])(t.prototype), "validate", this).call(this, e), !c.calibrator.isDef(e.file)) throw Error("file is empty.");} }, { key: "setPayload", value: function value(e) {(0, a["default"])(t.prototype.__proto__ || (0, o["default"])(t.prototype), "setPayload", this).call(this, e);} }]), t;}(l(n(70))["default"]);t["default"] = f;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = c(n(3)),i = c(n(0)),r = c(n(1)),s = c(n(4)),a = c(n(12)),u = c(n(5));function c(e) {return e && e.__esModule ? e : { "default": e };}var l = function (e) {function t(e) {return (0, i["default"])(this, t), (0, s["default"])(this, (t.__proto__ || (0, o["default"])(t)).call(this, e));}return (0, u["default"])(t, e), (0, r["default"])(t, [{ key: "validate", value: function value(e) {if ((0, a["default"])(t.prototype.__proto__ || (0, o["default"])(t.prototype), "validate", this).call(this, e), !(e.file instanceof File)) throw Error("wrong file type.");if (0 == e.file.size) throw Error("File size is 0.");if (e.file.size > 31457280) throw Error("message-length limit 30mib");} }, { key: "setPayload", value: function value(e) {(0, a["default"])(t.prototype.__proto__ || (0, o["default"])(t.prototype), "setPayload", this).call(this, e), this.payload.contentType = e.file.type, this.payload.name = e.file.name, this.payload.size = e.file.size;var n = (window.URL || window.webkitURL).createObjectURL(e.file);this.payload.url = n;} }]), t;}(c(n(70))["default"]);t["default"] = l;}, function (e, t, n) {(function (o) {function i() {var e;try {e = t.storage.debug;} catch (n) {}return !e && void 0 !== o && "env" in o && (e = o.env.DEBUG), e;}(t = e.exports = n(241)).log = function () {return "object" == typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments);}, t.formatArgs = function (e) {var n = this.useColors;if (e[0] = (n ? "%c" : "") + this.namespace + (n ? " %c" : " ") + e[0] + (n ? "%c " : " ") + "+" + t.humanize(this.diff), !n) return;var o = "color: " + this.color;e.splice(1, 0, o, "color: inherit");var i = 0,r = 0;e[0].replace(/%[a-zA-Z%]/g, function (e) {"%%" !== e && "%c" === e && (r = ++i);}), e.splice(r, 0, o);}, t.save = function (e) {try {null == e ? t.storage.removeItem("debug") : t.storage.debug = e;} catch (n) {}}, t.load = i, t.useColors = function () {if ("undefined" != typeof window && window.process && "renderer" === window.process.type) return !0;if ("undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) return !1;return "undefined" != typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" != typeof window && window.console && (window.console.firebug || window.console.exception && window.console.table) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);}, t.storage = "undefined" != typeof chrome && "undefined" != typeof chrome.storage ? chrome.storage.local : function () {try {return window.localStorage;} catch (e) {}}(), t.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"], t.formatters.j = function (e) {try {return JSON.stringify(e);} catch (t) {return "[UnexpectedJSONParseError]: " + t.message;}}, t.enable(i());}).call(t, n(73));}, function (e, t, n) {var o = n(23),i = n(13).document,r = o(i) && o(i.createElement);e.exports = function (e) {return r ? i.createElement(e) : {};};}, function (e, t, n) {var o = n(23);e.exports = function (e, t) {if (!o(e)) return e;var n, i;if (t && "function" == typeof (n = e.toString) && !o(i = n.call(e))) return i;if ("function" == typeof (n = e.valueOf) && !o(i = n.call(e))) return i;if (!t && "function" == typeof (n = e.toString) && !o(i = n.call(e))) return i;throw TypeError("Can't convert object to primitive value");};}, function (e, t) {e.exports = function (e) {if (e == undefined) throw TypeError("Can't call method on  " + e);return e;};}, function (e, t) {var n = Math.ceil,o = Math.floor;e.exports = function (e) {return isNaN(e = +e) ? 0 : (e > 0 ? o : n)(e);};}, function (e, t, n) {var o = n(59)("keys"),i = n(46);e.exports = function (e) {return o[e] || (o[e] = i(e));};}, function (e, t, n) {var o = n(7),i = n(13),r = i["__core-js_shared__"] || (i["__core-js_shared__"] = {});(e.exports = function (e, t) {return r[e] || (r[e] = t !== undefined ? t : {});})("versions", []).push({ version: o.version, mode: n(37) ? "pure" : "global", copyright: "© 2020 Denis Pushkarev (zloirock.ru)" });}, function (e, t) {e.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");}, function (e, t, n) {var o = n(19),i = n(137),r = n(60),s = n(58)("IE_PROTO"),a = function a() {},_u = function u() {var e,t = n(54)("iframe"),o = r.length;for (t.style.display = "none", n(87).appendChild(t), t.src = "javascript:", (e = t.contentWindow.document).open(), e.write("<script>document.F=Object<\/script>"), e.close(), _u = e.F; o--;) {delete _u.prototype[r[o]];}return _u();};e.exports = Object.create || function (e, t) {var n;return null !== e ? (a.prototype = o(e), n = new a(), a.prototype = null, n[s] = e) : n = _u(), t === undefined ? n : i(n, t);};}, function (e, t, n) {t.f = n(14);}, function (e, t, n) {var o = n(13),i = n(7),r = n(37),s = n(62),a = n(22).f;e.exports = function (e) {var t = i.Symbol || (i.Symbol = r ? {} : o.Symbol || {});"_" == e.charAt(0) || e in t || a(t, e, { value: s.f(e) });};}, function (e, t) {t.f = Object.getOwnPropertySymbols;}, function (e, t, n) {var o = n(38),i = n(45),r = n(24),s = n(55),a = n(27),u = n(79),c = Object.getOwnPropertyDescriptor;t.f = n(18) ? c : function (e, t) {if (e = r(e), t = s(t, !0), u) try {return c(e, t);} catch (n) {}if (a(e, t)) return i(!o.f.call(e, t), e[t]);};}, function (e, t, n) {var o = n(16),i = n(7),r = n(30);e.exports = function (e, t) {var n = (i.Object || {})[e] || Object[e],s = {};s[e] = t(n), o(o.S + o.F * r(function () {n(1);}), "Object", s);};}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });t.ModuleType = { IM: "IM", PUBSUB: "PUBSUB" };}, function (e, t, n) {"use strict";var o = n(44);e.exports.f = function (e) {return new function (e) {var t, n;this.promise = new e(function (e, o) {if (t !== undefined || n !== undefined) throw TypeError("Bad Promise constructor");t = e, n = o;}), this.resolve = o(t), this.reject = o(n);}(e);};}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });t.ConversationType = { GROUP: "group", PRIVATE: "private" };}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = f(n(3)),i = f(n(0)),r = f(n(1)),s = f(n(4)),a = f(n(12)),u = f(n(5)),c = f(n(43)),l = f(n(9));function f(e) {return e && e.__esModule ? e : { "default": e };}var d = function (e) {function t(e) {(0, i["default"])(this, t);var n = (0, s["default"])(this, (t.__proto__ || (0, o["default"])(t)).call(this, e));return n.file = null, n.onProgress = null, n.setFile(e.file), n.setOnProgress(e.onProgress), n;}return (0, u["default"])(t, e), (0, r["default"])(t, [{ key: "validate", value: function value(e) {(0, a["default"])(t.prototype.__proto__ || (0, o["default"])(t.prototype), "validate", this).call(this, e);} }, { key: "setPayload", value: function value(e) {(0, a["default"])(t.prototype.__proto__ || (0, o["default"])(t.prototype), "setPayload", this).call(this, e), this.payload.size = "", this.payload.contentType = "", this.payload.name = "", this.payload.url = "";} }, { key: "setType", value: function value(e) {this.type = l["default"].file;} }, { key: "setFile", value: function value(e) {this.file = e;} }, { key: "setOnProgress", value: function value(e) {this.onProgress = e;} }]), t;}(c["default"]);t["default"] = d;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = r(n(0)),i = r(n(1));function r(e) {return e && e.__esModule ? e : { "default": e };}var s = function () {function e() {(0, o["default"])(this, e);}return (0, i["default"])(e, [{ key: "upload", value: function value(e) {throw Error("Not implementation yet.");} }]), e;}();t["default"] = s;}, function (e, t, n) {e.exports = { "default": n(234), __esModule: !0 };}, function (e, t) {var n,o,i = e.exports = {};function r() {throw new Error("setTimeout has not been defined");}function s() {throw new Error("clearTimeout has not been defined");}function a(e) {if (n === setTimeout) return setTimeout(e, 0);if ((n === r || !n) && setTimeout) return n = setTimeout, setTimeout(e, 0);try {return n(e, 0);} catch (t) {try {return n.call(null, e, 0);} catch (t) {return n.call(this, e, 0);}}}!function () {try {n = "function" == typeof setTimeout ? setTimeout : r;} catch (e) {n = r;}try {o = "function" == typeof clearTimeout ? clearTimeout : s;} catch (e) {o = s;}}();var u,c = [],l = !1,f = -1;function d() {l && u && (l = !1, u.length ? c = u.concat(c) : f = -1, c.length && p());}function p() {if (!l) {var e = a(d);l = !0;for (var t = c.length; t;) {for (u = c, c = []; ++f < t;) {u && u[f].run();}f = -1, t = c.length;}u = null, l = !1, function (e) {if (o === clearTimeout) return clearTimeout(e);if ((o === s || !o) && clearTimeout) return o = clearTimeout, clearTimeout(e);try {o(e);} catch (t) {try {return o.call(null, e);} catch (t) {return o.call(this, e);}}}(e);}}function h(e, t) {this.fun = e, this.array = t;}function y() {}i.nextTick = function (e) {var t = new Array(arguments.length - 1);if (arguments.length > 1) for (var n = 1; n < arguments.length; n++) {t[n - 1] = arguments[n];}c.push(new h(e, t)), 1 !== c.length || l || a(p);}, h.prototype.run = function () {this.fun.apply(null, this.array);}, i.title = "browser", i.browser = !0, i.env = {}, i.argv = [], i.version = "", i.versions = {}, i.on = y, i.addListener = y, i.once = y, i.off = y, i.removeListener = y, i.removeAllListeners = y, i.emit = y, i.prependListener = y, i.prependOnceListener = y, i.listeners = function (e) {return [];}, i.binding = function (e) {throw new Error("process.binding is not supported");}, i.cwd = function () {return "/";}, i.chdir = function (e) {throw new Error("process.chdir is not supported");}, i.umask = function () {return 0;};}, function (e, t, n) {"use strict";var o,i = n(33),r = (o = i) && o.__esModule ? o : { "default": o };n(243)("socket.io-parser");var s = n(246),a = n(247);function u() {}t.protocol = 4, t.types = ["CONNECT", "DISCONNECT", "EVENT", "ACK", "ERROR", "BINARY_EVENT", "BINARY_ACK"], t.CONNECT = 0, t.DISCONNECT = 1, t.EVENT = 2, t.ACK = 3, t.ERROR = 4, t.BINARY_EVENT = 5, t.BINARY_ACK = 6, t.Encoder = u, t.Decoder = l;var c = t.ERROR + '"encode error"';function l() {this.reconstructor = null;}function f(e) {this.reconPack = e, this.buffers = [];}function d(e) {return { type: t.ERROR, data: "parser error: " + e };}u.prototype.encode = function (e, n) {n([function (e) {var n = "" + e.type;t.BINARY_EVENT !== e.type && t.BINARY_ACK !== e.type || (n += e.attachments + "-");e.nsp && "/" !== e.nsp && (n += e.nsp + ",");null != e.id && (n += e.id);if (null != e.data) {var o = function (e) {try {return (0, r["default"])(e);} catch (t) {return !1;}}(e.data);if (!1 === o) return c;n += o;}return n;}(e)]);}, s(l.prototype), l.prototype.add = function (e) {var n;if ("string" != typeof e) throw new Error("Unknown type: " + e);n = function (e) {var n = 0,o = { type: Number(e.charAt(0)) };if (null == t.types[o.type]) return d("unknown packet type " + o.type);if (t.BINARY_EVENT === o.type || t.BINARY_ACK === o.type) {for (var i = ""; "-" !== e.charAt(++n) && (i += e.charAt(n), n != e.length);) {;}if (i != Number(i) || "-" !== e.charAt(n)) throw new Error("Illegal attachments");o.attachments = Number(i);}if ("/" === e.charAt(n + 1)) for (o.nsp = ""; ++n;) {var r = e.charAt(n);if ("," === r) break;if (o.nsp += r, n === e.length) break;} else o.nsp = "/";var s = e.charAt(n + 1);if ("" !== s && Number(s) == s) {for (o.id = ""; ++n;) {var r = e.charAt(n);if (null == r || Number(r) != r) {--n;break;}if (o.id += e.charAt(n), n === e.length) break;}o.id = Number(o.id);}if (e.charAt(++n)) {var u = function (e) {try {return JSON.parse(e);} catch (t) {return !1;}}(e.substr(n)),c = !1 !== u && (o.type === t.ERROR || a(u));if (!c) return d("invalid payload");o.data = u;}return o;}(e), this.emit("decoded", n);}, l.prototype.destroy = function () {this.reconstructor && this.reconstructor.finishedReconstruction();}, f.prototype.takeBinaryData = function (e) {if (this.buffers.push(e), this.buffers.length === this.reconPack.attachments) {var t = binary.reconstructPacket(this.reconPack, this.buffers);return this.finishedReconstruction(), t;}return null;}, f.prototype.finishedReconstruction = function () {this.reconPack = null, this.buffers = [];};}, function (e, t, n) {"use strict";var o = n(34),i = n(113);function r(e) {this.path = e.path, this.hostname = e.hostname, this.port = e.port, this.secure = e.secure, this.query = e.query, this.timestampParam = e.timestampParam, this.timestampRequests = e.timestampRequests, this.readyState = "", this.agent = e.agent || !1, this.socket = e.socket, this.enablesXDR = e.enablesXDR, this.pfx = e.pfx, this.key = e.key, this.passphrase = e.passphrase, this.cert = e.cert, this.ca = e.ca, this.ciphers = e.ciphers, this.rejectUnauthorized = e.rejectUnauthorized, this.forceNode = e.forceNode, this.isReactNative = e.isReactNative, this.extraHeaders = e.extraHeaders, this.localAddress = e.localAddress;}e.exports = r, i(r.prototype), r.prototype.onError = function (e, t) {var n = new Error(e);return n.type = "TransportError", n.description = t, this.emit("error", n), this;}, r.prototype.open = function () {return "closed" !== this.readyState && "" !== this.readyState || (this.readyState = "opening", this.doOpen()), this;}, r.prototype.close = function () {return "opening" !== this.readyState && "open" !== this.readyState || (this.doClose(), this.onClose()), this;}, r.prototype.send = function (e) {if ("open" !== this.readyState) throw new Error("Transport not open");this.write(e);}, r.prototype.onOpen = function () {this.readyState = "open", this.writable = !0, this.emit("open");}, r.prototype.onData = function (e) {var t = o.decodePacket(e, this.socket.binaryType);this.onPacket(t);}, r.prototype.onPacket = function (e) {this.emit("packet", e);}, r.prototype.onClose = function () {this.readyState = "closed", this.emit("close");};}, function (e, t) {t.encode = function (e) {var t = "";for (var n in e) {e.hasOwnProperty(n) && (t.length && (t += "&"), t += encodeURIComponent(n) + "=" + encodeURIComponent(e[n]));}return t;}, t.decode = function (e) {for (var t = {}, n = e.split("&"), o = 0, i = n.length; o < i; o++) {var r = n[o].split("=");t[decodeURIComponent(r[0])] = decodeURIComponent(r[1]);}return t;};}, function (e, t) {e.exports = function (e, t) {var n = function n() {};n.prototype = t.prototype, e.prototype = new n(), e.prototype.constructor = e;};}, function (e, t, n) {(function (o) {function i() {var e;try {e = t.storage.debug;} catch (n) {}return !e && void 0 !== o && "env" in o && (e = o.env.DEBUG), e;}(t = e.exports = n(259)).log = function () {return "object" == typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments);}, t.formatArgs = function (e) {var n = this.useColors;if (e[0] = (n ? "%c" : "") + this.namespace + (n ? " %c" : " ") + e[0] + (n ? "%c " : " ") + "+" + t.humanize(this.diff), !n) return;var o = "color: " + this.color;e.splice(1, 0, o, "color: inherit");var i = 0,r = 0;e[0].replace(/%[a-zA-Z%]/g, function (e) {"%%" !== e && "%c" === e && (r = ++i);}), e.splice(r, 0, o);}, t.save = function (e) {try {null == e ? t.storage.removeItem("debug") : t.storage.debug = e;} catch (n) {}}, t.load = i, t.useColors = function () {if ("undefined" != typeof window && window.process && "renderer" === window.process.type) return !0;if ("undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) return !1;return "undefined" != typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" != typeof window && window.console && (window.console.firebug || window.console.exception && window.console.table) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);}, t.storage = "undefined" != typeof chrome && "undefined" != typeof chrome.storage ? chrome.storage.local : function () {try {return window.localStorage;} catch (e) {}}(), t.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"], t.formatters.j = function (e) {try {return JSON.stringify(e);} catch (t) {return "[UnexpectedJSONParseError]: " + t.message;}}, t.enable(i());}).call(t, n(73));}, function (e, t, n) {e.exports = !n(18) && !n(30)(function () {return 7 != Object.defineProperty(n(54)("div"), "a", { get: function get() {return 7;} }).a;});}, function (e, t, n) {var o = n(27),i = n(24),r = n(126)(!1),s = n(58)("IE_PROTO");e.exports = function (e, t) {var n,a = i(e),u = 0,c = [];for (n in a) {n != s && o(a, n) && c.push(n);}for (; t.length > u;) {o(a, n = t[u++]) && (~r(c, n) || c.push(n));}return c;};}, function (e, t, n) {var o = n(36);e.exports = Object("z").propertyIsEnumerable(0) ? Object : function (e) {return "String" == o(e) ? e.split("") : Object(e);};}, function (e, t, n) {var o = n(57),i = Math.min;e.exports = function (e) {return e > 0 ? i(o(e), 9007199254740991) : 0;};}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.calibrator = undefined;var o = s(n(20)),i = s(n(0)),r = s(n(1));function s(e) {return e && e.__esModule ? e : { "default": e };}var a = new (function () {function e() {(0, i["default"])(this, e);}return (0, r["default"])(e, [{ key: "isUndef", value: function value(e) {return e === undefined || null === e;} }, { key: "isTrue", value: function value(e) {return !0 === e;} }, { key: "isFalse", value: function value(e) {return !1 === e;} }, { key: "isPrimitive", value: function value(e) {return "string" == typeof e || "number" == typeof e || "symbol" === (void 0 === e ? "undefined" : (0, o["default"])(e)) || "boolean" == typeof e;} }, { key: "isDef", value: function value(e) {return e !== undefined && null !== e;} }, { key: "isObject", value: function value(e) {return null !== e && "object" === (void 0 === e ? "undefined" : (0, o["default"])(e));} }, { key: "isPlainObject", value: function value(e) {return "[object Object]" === Object.prototype.toString.call(e);} }, { key: "isRegExp", value: function value(e) {return "[object RegExp]" === Object.prototype.toString.call(e);} }, { key: "isValidArrayIndex", value: function value(e) {var t = parseFloat(String(e));return t >= 0 && Math.floor(t) === t && isFinite(e);} }, { key: "isStringOrNumber", value: function value(e) {return "string" == typeof e || "number" == typeof e;} }, { key: "isString", value: function value(e) {return "string" == typeof e;} }, { key: "isNumber", value: function value(e) {return "number" == typeof e;} }, { key: "isArray", value: function value(e) {return "[object Array]" == Object.prototype.toString.call(e);} }, { key: "isEmpty", value: function value(e) {return this.isArray(e) ? 0 == e.length : this.isObject(e) ? !this.isDef(e) : !this.isNumber(e) && (this.isString(e) ? "" == e.trim() : !this.isDef(e));} }, { key: "isNative", value: function value(e) {return "function" == typeof e && /native code/.test(e.toString());} }, { key: "isFunction", value: function value(e) {return "function" == typeof e;} }]), e;}())();t.calibrator = a;}, function (e, t, n) {"use strict";var o = n(135)(!0);n(85)(String, "String", function (e) {this._t = String(e), this._i = 0;}, function () {var e,t = this._t,n = this._i;return n >= t.length ? { value: undefined, done: !0 } : (e = o(t, n), this._i += e.length, { value: e, done: !1 });});}, function (e, t, n) {"use strict";var o = n(37),i = n(16),r = n(86),s = n(26),a = n(39),u = n(136),c = n(47),l = n(88),f = n(14)("iterator"),d = !([].keys && "next" in [].keys()),p = function p() {return this;};e.exports = function (e, t, n, h, y, v, m) {u(n, t, h);var g,b,_,k = function k(e) {if (!d && e in S) return S[e];switch (e) {case "keys":case "values":return function () {return new n(this, e);};}return function () {return new n(this, e);};},C = t + " Iterator",w = "values" == y,E = !1,S = e.prototype,O = S[f] || S["@@iterator"] || y && S[y],T = O || k(y),F = y ? w ? k("entries") : T : undefined,M = "Array" == t && S.entries || O;if (M && (_ = l(M.call(new e()))) !== Object.prototype && _.next && (c(_, C, !0), o || "function" == typeof _[f] || s(_, f, p)), w && O && "values" !== O.name && (E = !0, T = function T() {return O.call(this);}), o && !m || !d && !E && S[f] || s(S, f, T), a[t] = T, a[C] = p, y) if (g = { values: w ? T : k("values"), keys: v ? T : k("keys"), entries: F }, m) for (b in g) {b in S || r(S, b, g[b]);} else i(i.P + i.F * (d || E), t, g);return g;};}, function (e, t, n) {e.exports = n(26);}, function (e, t, n) {var o = n(13).document;e.exports = o && o.documentElement;}, function (e, t, n) {var o = n(27),i = n(40),r = n(58)("IE_PROTO"),s = Object.prototype;e.exports = Object.getPrototypeOf || function (e) {return e = i(e), o(e, r) ? e[r] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? s : null;};}, function (e, t, n) {n(138);for (var o = n(13), i = n(26), r = n(39), s = n(14)("toStringTag"), a = "CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","), u = 0; u < a.length; u++) {var c = a[u],l = o[c],f = l && l.prototype;f && !f[s] && i(f, s, c), r[c] = r.Array;}}, function (e, t, n) {var o = n(80),i = n(60).concat("length", "prototype");t.f = Object.getOwnPropertyNames || function (e) {return o(e, i);};}, function (e, t) {}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.env = undefined;var o = s(n(20)),i = s(n(0)),r = s(n(1));function s(e) {return e && e.__esModule ? e : { "default": e };}var a = new (function () {function e() {(0, i["default"])(this, e);}return (0, r["default"])(e, [{ key: "isWx", value: function value() {return !("undefined" == typeof wx || !wx.getLocation) && ("undefined" != typeof GameGlobal || "function" != typeof WebSocket || "function" != typeof XMLHttpRequest);} }, { key: "isUni", value: function value() {return !("object" !== ("undefined" == typeof uni ? "undefined" : (0, o["default"])(uni)) || !uni.getSystemInfo);} }, { key: "isSupportHtmlPlus", value: function value() {return !!("object" === ("undefined" == typeof plus ? "undefined" : (0, o["default"])(plus)) && plus.navigator && plus.navigator.getUserAgent() && plus.navigator.getUserAgent().indexOf("Html5Plus") > -1);} }, { key: "isTT", value: function value() {return !("object" !== ("undefined" == typeof tt ? "undefined" : (0, o["default"])(tt)) || !tt.getSystemInfo);} }, { key: "isBrowserClient", value: function value() {return this.isUni() ? "function" == typeof WebSocket && "function" == typeof XMLHttpRequest && "object" == ("undefined" == typeof localStorage ? "undefined" : (0, o["default"])(localStorage)) : !(this.isReactNative() || this.isWx() || this.isTT());} }, { key: "isReactNative", value: function value() {return "undefined" != typeof navigator && "ReactNative" == navigator.product;} }]), e;}())();t.env = a;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.GoEasyDomainNumber = undefined;var o = u(n(0)),i = u(n(1)),r = n(92),s = n(163),a = u(n(164));function u(e) {return e && e.__esModule ? e : { "default": e };}var c = function () {function e() {(0, o["default"])(this, e);}return (0, i["default"])(e, null, [{ key: "refreshNumber", value: function value() {var e = Math.floor(Math.random() * (a["default"].maxNumber - 1) + 1);return r.env.isBrowserClient() && (e = parseInt(s.storage.getData("goEasyNode")) || e), e > 0 && e < a["default"].maxNumber ? e += 1 : e == a["default"].maxNumber && (e = 1), r.env.isBrowserClient() && s.storage.setData("goEasyNode", e), e;} }]), e;}();t.GoEasyDomainNumber = c;}, function (e, t, n) {e.exports = { "default": n(172), __esModule: !0 };}, function (e, t, n) {var o = n(36),i = n(14)("toStringTag"),r = "Arguments" == o(function () {return arguments;}());e.exports = function (e) {var t, n, s;return e === undefined ? "Undefined" : null === e ? "Null" : "string" == typeof (n = function (e, t) {try {return e[t];} catch (n) {}}(t = Object(e), i)) ? n : r ? o(t) : "Object" == (s = o(t)) && "function" == typeof t.callee ? "Arguments" : s;};}, function (e, t, n) {var o = n(19),i = n(44),r = n(14)("species");e.exports = function (e, t) {var n,s = o(e).constructor;return s === undefined || (n = o(s)[r]) == undefined ? t : i(n);};}, function (e, t, n) {var o,i,r,s = n(35),a = n(182),u = n(87),c = n(54),l = n(13),f = l.process,d = l.setImmediate,p = l.clearImmediate,h = l.MessageChannel,y = l.Dispatch,v = 0,m = {},g = function g() {var e = +this;if (m.hasOwnProperty(e)) {var t = m[e];delete m[e], t();}},b = function b(e) {g.call(e.data);};d && p || (d = function d(e) {for (var t = [], n = 1; arguments.length > n;) {t.push(arguments[n++]);}return m[++v] = function () {a("function" == typeof e ? e : Function(e), t);}, o(v), v;}, p = function p(e) {delete m[e];}, "process" == n(36)(f) ? o = function o(e) {f.nextTick(s(g, e, 1));} : y && y.now ? o = function o(e) {y.now(s(g, e, 1));} : h ? (r = (i = new h()).port2, i.port1.onmessage = b, o = s(r.postMessage, r, 1)) : l.addEventListener && "function" == typeof postMessage && !l.importScripts ? (o = function o(e) {l.postMessage(e + "", "*");}, l.addEventListener("message", b, !1)) : o = "onreadystatechange" in c("script") ? function (e) {u.appendChild(c("script")).onreadystatechange = function () {u.removeChild(this), g.call(e);};} : function (e) {setTimeout(s(g, e, 1), 0);}), e.exports = { set: d, clear: p };}, function (e, t) {e.exports = function (e) {try {return { e: !1, v: e() };} catch (t) {return { e: !0, v: t };}};}, function (e, t, n) {var o = n(19),i = n(23),r = n(68);e.exports = function (e, t) {if (o(e), i(t) && t.constructor === e) return t;var n = r.f(e);return (0, n.resolve)(t), n.promise;};}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.ImEventType = undefined;var o,i = n(21);var r = (0, ((o = i) && o.__esModule ? o : { "default": o })["default"])(null);r.PRIVATE_MESSAGE_RECEIVED = "PRIVATE_MESSAGE_RECEIVED", r.GROUP_MESSAGE_RECEIVED = "GROUP_MESSAGE_RECEIVED", r.SYSTEM_MESSAGE_RECEIVED = "SYSTEM_MESSAGE_RECEIVED", r.CONVERSATIONS_UPDATED = "CONVERSATIONS_UPDATED", r.CONNECTED = "CONNECTED", r.CONNECTING = "CONNECTING", r.DISCONNECTED = "DISCONNECTED", r.USER_PRESENCE = "USER_PRESENCE", r.GROUP_PRESENCE = "GROUP_PRESENCE", t.ImEventType = r;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.Conversion = undefined;var o = u(n(0)),i = u(n(1)),r = n(69),s = u(n(42)),a = u(n(48));function u(e) {return e && e.__esModule ? e : { "default": e };}t.Conversion = function () {function e() {(0, o["default"])(this, e), this.type = "", this.lastMessage = null, this.unread = 0, this.top = !1, this.data = null, this.lc = 0, this.lm = 0;}return (0, i["default"])(e, null, [{ key: "buildByInMessage", value: function value(t) {var n = new e();return n.data = {}, n.type = t.t, n.lastMessage = a["default"].assemble(t), n.lc = n.lastMessage.timestamp - 1, n.lm = n.lastMessage.timestamp, n.unread = 0, t.t == r.ConversationType.GROUP ? n.groupId = t.r : s["default"].userId == t.r ? n.userId = t.s : n.userId = t.r, n;} }, { key: "buildByOutMessage", value: function value(t, n, o, i) {var s = new e();return s.type = n, s.lastMessage = t, s.lm = s.lastMessage.timestamp, s.lc = s.lm, s.unread = 0, n == r.ConversationType.GROUP ? (s.groupId = o, s.lastMessage.groupId = o) : (s.userId = o, s.lastMessage.receiverId = o), s;} }, { key: "buildByConversation", value: function value(t, n) {var o = new e();o.type = n.t, n.lmsg.t = n.t, o.lastMessage = a["default"].assemble(n.lmsg), o.unread = 0, o.lc = n.lcts, o.lm = o.lastMessage.timestamp, o.top = n.top || !1;var i = n.d ? JSON.parse(n.d) : {};return o.data = i, n.t == r.ConversationType.GROUP ? (o.groupId = n.g, t.putGroupData(o.groupId, i)) : (o.userId = n.uid, t.putUserData(o.userId, i), s["default"].userId == n.lmsg.s ? o.lastMessage.senderData = s["default"].userData : o.lastMessage.senderData = i), o;} }]), e;}();}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = s(n(0)),i = s(n(1)),r = n(2);function s(e) {return e && e.__esModule ? e : { "default": e };}var a = function () {function e() {(0, o["default"])(this, e);}return (0, i["default"])(e, null, [{ key: "resolve", value: function value() {return r.env.isUni() ? "uniApp" : r.env.isWx() ? "wx" : "html";} }]), e;}();t["default"] = a;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = d(n(3)),i = d(n(0)),r = d(n(1)),s = d(n(4)),a = d(n(12)),u = d(n(5)),c = d(n(43)),l = d(n(9)),f = n(2);function d(e) {return e && e.__esModule ? e : { "default": e };}var p = function (e) {function t(e) {return (0, i["default"])(this, t), (0, s["default"])(this, (t.__proto__ || (0, o["default"])(t)).call(this, e));}return (0, u["default"])(t, e), (0, r["default"])(t, [{ key: "validate", value: function value(e) {if (f.calibrator.isEmpty(e.text) || "" == e.text.trim()) throw Error("text is empty");} }, { key: "setType", value: function value(e) {this.type = l["default"].text;} }, { key: "setPayload", value: function value(e) {(0, a["default"])(t.prototype.__proto__ || (0, o["default"])(t.prototype), "setPayload", this).call(this, e), this.payload.text = e.text;} }]), t;}(c["default"]);t["default"] = p;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = r(n(0)),i = r(n(1));function r(e) {return e && e.__esModule ? e : { "default": e };}var s = function () {function e() {(0, o["default"])(this, e);}return (0, i["default"])(e, [{ key: "build", value: function value() {throw Error("Not implementation yet.");} }]), e;}();t["default"] = s;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = d(n(6)),i = d(n(3)),r = d(n(0)),s = d(n(1)),a = d(n(4)),u = d(n(5)),c = d(n(106)),l = d(n(9)),f = d(n(107));function d(e) {return e && e.__esModule ? e : { "default": e };}var p = function (e) {function t(e) {(0, r["default"])(this, t);var n = (0, a["default"])(this, (t.__proto__ || (0, i["default"])(t)).call(this));return n.im = null, n.goEasyUploader = new f["default"](e), n;}return (0, u["default"])(t, e), (0, s["default"])(t, [{ key: "build", value: function value(e) {var t = this;return new o["default"](function (n, o) {var i = new c["default"]();t.upload(e).then(function (t) {var o = t.content,r = o === undefined ? {} : o;(i = e.payload).url = r.url, i.name = r.newFileName, n(i);})["catch"](function (e) {o(e);});});} }, { key: "upload", value: function value(e) {var t = e.type == l["default"].video ? e.payload.video.name : e.payload.name;return this.goEasyUploader.upload(e.file, t, e.onProgress, e.type);} }]), t;}(d(n(104))["default"]);t["default"] = p;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o,i = n(0),r = (o = i) && o.__esModule ? o : { "default": o };t["default"] = function s(e) {(0, r["default"])(this, s);};}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = u(n(6)),i = u(n(0)),r = u(n(1)),s = n(214),a = u(n(218));function u(e) {return e && e.__esModule ? e : { "default": e };}var c = function () {function e(t) {(0, i["default"])(this, e), this.requestBuilder = null, this.fileUploader = s.fileUploader, this.requestBuilder = new a["default"](t);}return (0, r["default"])(e, [{ key: "upload", value: function value(e, t, n, i) {var r = this;return new o["default"](function (o, s) {r.requestBuilder.build(e, t, i).then(function (e) {o(r.doUpload(e, n));})["catch"](function (e) {s(e);});});} }, { key: "customizeUpload", value: function value(e, t) {this.doUpload(e, t);} }, { key: "doUpload", value: function value(e, t) {return this.fileUploader.upload(e, t);} }]), e;}();t["default"] = c;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o,i = n(0),r = (o = i) && o.__esModule ? o : { "default": o };t["default"] = function s(e, t, n, o, i) {(0, r["default"])(this, s), this.host = "", this.headers = {}, this.parameters = {}, this.file = {}, this.payload = {}, this.host = e, this.headers = t, this.parameters = n, this.file = o, this.payload = i;};}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = r(n(0)),i = r(n(1));function r(e) {return e && e.__esModule ? e : { "default": e };}var s = function () {function e() {(0, o["default"])(this, e);}return (0, i["default"])(e, [{ key: "build", value: function value(e, t) {} }, { key: "newFileName", value: function value(e) {return e && e.newFilename || "";} }]), e;}();t["default"] = s;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = l(n(0)),i = l(n(1)),r = l(n(28)),s = l(n(8)),a = l(n(237)),u = l(n(238)),c = n(2);function l(e) {return e && e.__esModule ? e : { "default": e };}var f = function () {function e() {(0, o["default"])(this, e), this.io = u["default"], this.status = r["default"].DISCONNECTED, this.permissions = [s["default"].NONE], this.emitter = null, this.connectedObservers = [], this.disconnectedObservers = [], this.emitter = new a["default"](this);}return (0, i["default"])(e, [{ key: "connect", value: function value() {this.status = r["default"].CONNECTING;} }, { key: "emit", value: function value(e) {this.emitter.emit(e);} }, { key: "doEmit", value: function value(e, t, n) {} }, { key: "on", value: function value(e, t) {this.io.on(e, t);} }, { key: "disconnect", value: function value() {this.io.disconnect();} }, { key: "getStatus", value: function value() {return this.status;} }, { key: "addConnectedObserver", value: function value(e) {c.calibrator.isFunction(e) && this.connectedObservers.push(e);} }, { key: "addDisconnectedObserver", value: function value(e) {c.calibrator.isFunction(e) && this.disconnectedObservers.push(e);} }, { key: "notify", value: function value(e, t) {for (var n = 0; n < e.length; n++) {e[n](t);}} }]), e;}();t["default"] = f;}, function (e, t, n) {"use strict";var o,i = n(20),r = (o = i) && o.__esModule ? o : { "default": o };var s = n(248),a = n(115),u = n(116),c = n(74),l = n(117),f = n(118),d = (n(53)("socket.io-client:manager"), n(271)),p = n(272),h = n(93).GoEasyDomainNumber,y = Object.prototype.hasOwnProperty;function v(e, t) {if (!(this instanceof v)) return new v(e, t);e && "object" === (void 0 === e ? "undefined" : (0, r["default"])(e)) && (t = e, e = undefined), (t = t || {}).path = t.path || "/socket.io", this.nsps = {}, this.subs = [], this.opts = t, this.reconnection(!1 !== t.reconnection), this.reconnectionAttempts(t.reconnectionAttempts || Infinity), this.reconnectionDelay(t.reconnectionDelay || 1e3), this.reconnectionDelayMax(t.reconnectionDelayMax || 5e3), this.randomizationFactor(t.randomizationFactor || .5), this.backoff = new p({ min: this.reconnectionDelay(), max: this.reconnectionDelayMax(), jitter: this.randomizationFactor() }), this.timeout(null == t.timeout ? 2e4 : t.timeout), this.readyState = "closed", this.uri = e, this.connecting = [], this.lastPing = null, this.encoding = !1, this.packetBuffer = [];var n = t.parser || c;this.encoder = new n.Encoder(), this.decoder = new n.Decoder(), this.autoConnect = !1 !== t.autoConnect, this.autoConnect && this.open();}function m() {var e = !1;return "object" === ("undefined" == typeof uni ? "undefined" : (0, r["default"])(uni)) && uni.getSystemInfo && (e = !0), e && !0 === getApp().uniAppRunningBackend;}e.exports = v, v.prototype.emitAll = function () {for (var e in this.emit.apply(this, arguments), this.nsps) {y.call(this.nsps, e) && this.nsps[e].emit.apply(this.nsps[e], arguments);}}, v.prototype.updateSocketIds = function () {for (var e in this.nsps) {y.call(this.nsps, e) && (this.nsps[e].id = this.generateId(e));}}, v.prototype.generateId = function (e) {return ("/" === e ? "" : e + "#") + this.engine.id;}, u(v.prototype), v.prototype.reconnection = function (e) {return arguments.length ? (this._reconnection = !!e, this) : this._reconnection;}, v.prototype.reconnectionAttempts = function (e) {return arguments.length ? (this._reconnectionAttempts = e, this) : this._reconnectionAttempts;}, v.prototype.reconnectionDelay = function (e) {return arguments.length ? (this._reconnectionDelay = e, this.backoff && this.backoff.setMin(e), this) : this._reconnectionDelay;}, v.prototype.randomizationFactor = function (e) {return arguments.length ? (this._randomizationFactor = e, this.backoff && this.backoff.setJitter(e), this) : this._randomizationFactor;}, v.prototype.reconnectionDelayMax = function (e) {return arguments.length ? (this._reconnectionDelayMax = e, this.backoff && this.backoff.setMax(e), this) : this._reconnectionDelayMax;}, v.prototype.timeout = function (e) {return arguments.length ? (this._timeout = e, this) : this._timeout;}, v.prototype.maybeReconnectOnOpen = function () {!this.reconnecting && this._reconnection && 0 === this.backoff.attempts && this.reconnect();}, v.prototype.open = v.prototype.connect = function (e, t) {if (this.readyState, ~this.readyState.indexOf("open")) return this;this.uri, this.engine = s(this.uri, this.opts);var n = this.engine,o = this;this.readyState = "opening", this.skipReconnect = !1;var i = l(n, "open", function () {o.onopen(), e && e();}),r = l(n, "error", function (t) {if ("undefined" != typeof window) {var n = parseInt(o.uri.match(/[1-9][0-9]*/g)[0]),i = h.refreshNumber();o.uri = o.uri.replace(n, i);}if (o.cleanup(), o.readyState = "closed", o.emitAll("connect_error", t), e) {var r = new Error("Connection error");r.data = t, e(r);} else o.maybeReconnectOnOpen();});if (!1 !== this._timeout) {var a = this._timeout,u = setTimeout(function () {i.destroy(), n.close(), n.emit("error", "timeout"), o.emitAll("connect_timeout", a);}, a);this.subs.push({ destroy: function destroy() {clearTimeout(u);} });}return this.subs.push(i), this.subs.push(r), this;}, v.prototype.onopen = function () {this.cleanup(), this.readyState = "open", this.emit("open");var e = this.engine;this.subs.push(l(e, "data", f(this, "ondata"))), this.subs.push(l(e, "ping", f(this, "onping"))), this.subs.push(l(e, "pong", f(this, "onpong"))), this.subs.push(l(e, "error", f(this, "onerror"))), this.subs.push(l(e, "close", f(this, "onclose"))), this.subs.push(l(this.decoder, "decoded", f(this, "ondecoded")));}, v.prototype.onping = function () {this.lastPing = new Date(), this.emitAll("ping");}, v.prototype.onpong = function () {this.emitAll("pong", new Date() - this.lastPing);}, v.prototype.ondata = function (e) {this.decoder.add(e);}, v.prototype.ondecoded = function (e) {this.emit("packet", e);}, v.prototype.onerror = function (e) {this.emitAll("error", e);}, v.prototype.socket = function (e, t) {var n = this.nsps[e];if (!n) {n = new a(this, e, t), this.nsps[e] = n;var o = this;n.on("connecting", i), n.on("connect", function () {n.id = o.generateId(e);}), this.autoConnect && i();}function i() {~d(o.connecting, n) || o.connecting.push(n);}return n;}, v.prototype.destroy = function (e) {var t = d(this.connecting, e);~t && this.connecting.splice(t, 1), this.connecting.length || this.close();}, v.prototype.packet = function (e) {var t = this;e.query && 0 === e.type && (e.nsp += "?" + e.query), t.encoding ? t.packetBuffer.push(e) : (t.encoding = !0, this.encoder.encode(e, function (n) {for (var o = 0; o < n.length; o++) {t.engine.write(n[o], e.options);}t.encoding = !1, t.processPacketQueue();}));}, v.prototype.processPacketQueue = function () {if (this.packetBuffer.length > 0 && !this.encoding) {var e = this.packetBuffer.shift();this.packet(e);}}, v.prototype.cleanup = function () {for (var e = this.subs.length, t = 0; t < e; t++) {this.subs.shift().destroy();}this.packetBuffer = [], this.encoding = !1, this.lastPing = null, this.decoder.destroy();}, v.prototype.close = v.prototype.disconnect = function () {this.skipReconnect = !0, this.reconnecting = !1, "opening" === this.readyState && this.cleanup(), this.backoff.reset(), this.readyState = "closed", this.engine && this.engine.close();}, v.prototype.onclose = function (e) {this.cleanup(), this.backoff.reset(), this.readyState = "closed", this.emit("close", e), this._reconnection && !this.skipReconnect && this.reconnect();}, v.prototype.reconnect = function () {if (m(), this.reconnecting || this.skipReconnect) return this;var e = this;if (this.backoff.attempts >= this._reconnectionAttempts) this.backoff.reset(), this.emitAll("reconnect_failed"), this.reconnecting = !1;else {var t = this.backoff.duration();this.reconnecting = !0;var n = setTimeout(function () {e.skipReconnect || (e.emitAll("reconnect_attempt", e.backoff.attempts), e.emitAll("reconnecting", e.backoff.attempts), e.skipReconnect || (m() ? (e.reconnecting = !1, e.reconnect(), e.emitAll("reconnect_error", "Uniapp running backend, skipped reconnect...")) : e.open(function (t) {t ? (e.reconnecting = !1, e.reconnect(), e.emitAll("reconnect_error", t.data)) : e.onreconnect();})));}, t);this.subs.push({ destroy: function destroy() {clearTimeout(n);} });}}, v.prototype.onreconnect = function () {var e = this.backoff.attempts;this.reconnecting = !1, this.backoff.reset(), this.updateSocketIds(), this.emitAll("reconnect", e);};}, function (e, t, n) {"use strict";var o = n(250),i = n(263);t.polling = function (e) {var t = !1,n = !1;e.jsonp;if ("undefined" != typeof location) {var i = "https:" === location.protocol,r = location.port;r || (r = i ? 443 : 80), t = e.hostname !== location.hostname || r !== e.port, n = e.secure !== i;}return e.xdomain = t, e.xscheme = n, new o(e);}, t.websocket = i;}, function (e, t, n) {function o(e) {if (e) return function (e) {for (var t in o.prototype) {e[t] = o.prototype[t];}return e;}(e);}e.exports = o, o.prototype.on = o.prototype.addEventListener = function (e, t) {return this._callbacks = this._callbacks || {}, (this._callbacks["$" + e] = this._callbacks["$" + e] || []).push(t), this;}, o.prototype.once = function (e, t) {function n() {this.off(e, n), t.apply(this, arguments);}return n.fn = t, this.on(e, n), this;}, o.prototype.off = o.prototype.removeListener = o.prototype.removeAllListeners = o.prototype.removeEventListener = function (e, t) {if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this;var n,o = this._callbacks["$" + e];if (!o) return this;if (1 == arguments.length) return delete this._callbacks["$" + e], this;for (var i = 0; i < o.length; i++) {if ((n = o[i]) === t || n.fn === t) {o.splice(i, 1);break;}}return this;}, o.prototype.emit = function (e) {this._callbacks = this._callbacks || {};var t = [].slice.call(arguments, 1),n = this._callbacks["$" + e];if (n) for (var o = 0, i = (n = n.slice(0)).length; o < i; ++o) {n[o].apply(this, t);}return this;}, o.prototype.listeners = function (e) {return this._callbacks = this._callbacks || {}, this._callbacks["$" + e] || [];}, o.prototype.hasListeners = function (e) {return !!this.listeners(e).length;};}, function (e, t, n) {"use strict";var o,i = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""),r = 64,s = {},a = 0,u = 0;function c(e) {var t = "";do {t = i[e % r] + t, e = Math.floor(e / r);} while (e > 0);return t;}function l() {var e = c(+new Date());return e !== o ? (a = 0, o = e) : e + "." + c(a++);}for (; u < r; u++) {s[i[u]] = u;}l.encode = c, l.decode = function (e) {var t = 0;for (u = 0; u < e.length; u++) {t = t * r + s[e.charAt(u)];}return t;}, e.exports = l;}, function (e, t, n) {"use strict";var o,i = n(20),r = (o = i) && o.__esModule ? o : { "default": o };var s = n(74),a = n(116),u = n(267),c = n(117),l = n(118),f = (n(53)("socket.io-client:socket"), n(268)),d = n(269);e.exports = y;var p = { connect: 1, connect_error: 1, connect_timeout: 1, connecting: 1, disconnect: 1, error: 1, reconnect: 1, reconnect_attempt: 1, reconnect_failed: 1, reconnect_error: 1, reconnecting: 1, ping: 1, pong: 1 },h = a.prototype.emit;function y(e, t, n) {this.io = e, this.nsp = t, this.json = this, this.ids = 0, this.acks = {}, this.receiveBuffer = [], this.sendBuffer = [], this.connected = !1, this.disconnected = !0, this.flags = {}, n && n.query && (this.query = n.query), this.io.autoConnect && this.open();}a(y.prototype), y.prototype.subEvents = function () {if (!this.subs) {var e = this.io;this.subs = [c(e, "open", l(this, "onopen")), c(e, "packet", l(this, "onpacket")), c(e, "close", l(this, "onclose"))];}}, y.prototype.open = y.prototype.connect = function () {return this.connected ? this : (this.subEvents(), this.io.open(), "open" === this.io.readyState && this.onopen(), this.emit("connecting"), this);}, y.prototype.send = function () {var e = u(arguments);return e.unshift("message"), this.emit.apply(this, e), this;}, y.prototype.emit = function (e) {if (p.hasOwnProperty(e)) return h.apply(this, arguments), this;var t = u(arguments),n = { type: (this.flags.binary !== undefined ? this.flags.binary : d(t)) ? s.BINARY_EVENT : s.EVENT, data: t, options: {} };return n.options.compress = !this.flags || !1 !== this.flags.compress, "function" == typeof t[t.length - 1] && (this.ids, this.acks[this.ids] = t.pop(), n.id = this.ids++), this.connected ? this.packet(n) : this.sendBuffer.push(n), this.flags = {}, this;}, y.prototype.packet = function (e) {e.nsp = this.nsp, this.io.packet(e);}, y.prototype.onopen = function () {if ("/" !== this.nsp) if (this.query) {var e = "object" === (0, r["default"])(this.query) ? f.encode(this.query) : this.query;this.packet({ type: s.CONNECT, query: e });} else this.packet({ type: s.CONNECT });}, y.prototype.onclose = function (e) {this.connected = !1, this.disconnected = !0, delete this.id, this.emit("disconnect", e);}, y.prototype.onpacket = function (e) {var t = e.nsp === this.nsp,n = e.type === s.ERROR && "/" === e.nsp;if (t || n) switch (e.type) {case s.CONNECT:this.onconnect();break;case s.EVENT:case s.BINARY_EVENT:this.onevent(e);break;case s.ACK:case s.BINARY_ACK:this.onack(e);break;case s.DISCONNECT:this.ondisconnect();break;case s.ERROR:this.emit("error", e.data);}}, y.prototype.onevent = function (e) {var t = e.data || [];null != e.id && t.push(this.ack(e.id)), this.connected ? h.apply(this, t) : this.receiveBuffer.push(t);}, y.prototype.ack = function (e) {var t = this,n = !1;return function () {if (!n) {n = !0;var o = u(arguments);t.packet({ type: d(o) ? s.BINARY_ACK : s.ACK, id: e, data: o });}};}, y.prototype.onack = function (e) {var t = this.acks[e.id];"function" == typeof t ? (e.id, e.data, t.apply(this, e.data), delete this.acks[e.id]) : e.id;}, y.prototype.onconnect = function () {this.connected = !0, this.disconnected = !1, this.emit("connect"), this.emitBuffered();}, y.prototype.emitBuffered = function () {var e;for (e = 0; e < this.receiveBuffer.length; e++) {h.apply(this, this.receiveBuffer[e]);}for (this.receiveBuffer = [], e = 0; e < this.sendBuffer.length; e++) {this.packet(this.sendBuffer[e]);}this.sendBuffer = [];}, y.prototype.ondisconnect = function () {this.nsp, this.destroy(), this.onclose("io server disconnect");}, y.prototype.destroy = function () {if (this.subs) {for (var e = 0; e < this.subs.length; e++) {this.subs[e].destroy();}this.subs = null;}this.io.destroy(this);}, y.prototype.close = y.prototype.disconnect = function () {return this.connected && (this.nsp, this.packet({ type: s.DISCONNECT })), this.destroy(), this.connected && this.onclose("io client disconnect"), this;}, y.prototype.compress = function (e) {return this.flags.compress = e, this;}, y.prototype.binary = function (e) {return this.flags.binary = e, this;};}, function (e, t, n) {function o(e) {if (e) return function (e) {for (var t in o.prototype) {e[t] = o.prototype[t];}return e;}(e);}e.exports = o, o.prototype.on = o.prototype.addEventListener = function (e, t) {return this._callbacks = this._callbacks || {}, (this._callbacks["$" + e] = this._callbacks["$" + e] || []).push(t), this;}, o.prototype.once = function (e, t) {function n() {this.off(e, n), t.apply(this, arguments);}return n.fn = t, this.on(e, n), this;}, o.prototype.off = o.prototype.removeListener = o.prototype.removeAllListeners = o.prototype.removeEventListener = function (e, t) {if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this;var n,o = this._callbacks["$" + e];if (!o) return this;if (1 == arguments.length) return delete this._callbacks["$" + e], this;for (var i = 0; i < o.length; i++) {if ((n = o[i]) === t || n.fn === t) {o.splice(i, 1);break;}}return this;}, o.prototype.emit = function (e) {this._callbacks = this._callbacks || {};var t = [].slice.call(arguments, 1),n = this._callbacks["$" + e];if (n) for (var o = 0, i = (n = n.slice(0)).length; o < i; ++o) {n[o].apply(this, t);}return this;}, o.prototype.listeners = function (e) {return this._callbacks = this._callbacks || {}, this._callbacks["$" + e] || [];}, o.prototype.hasListeners = function (e) {return !!this.listeners(e).length;};}, function (e, t, n) {"use strict";e.exports = function (e, t, n) {return e.on(t, n), { destroy: function destroy() {e.removeListener(t, n);} };};}, function (e, t) {var n = [].slice;e.exports = function (e, t) {if ("string" == typeof t && (t = e[t]), "function" != typeof t) throw new Error("bind() requires a function");var o = n.call(arguments, 2);return function () {return t.apply(e, o.concat(n.call(arguments)));};};}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.uniApp = undefined;var o = s(n(0)),i = s(n(1)),r = n(2);function s(e) {return e && e.__esModule ? e : { "default": e };}var a = new (function () {function e() {(0, o["default"])(this, e), this.overrided = !1;}return (0, i["default"])(e, [{ key: "overrideUniShowHideMethods", value: function value() {if (r.env.isUni() && !this.overrided && getApp() && "undefined" != typeof getApp().$options) {this.overrided = !0;var e = getApp().$options;if ("undefined" != typeof e.onShow) {var t = e.onShow[0];e.onShow[0] = function () {getApp().uniAppRunningBackend = !1, t && t.call(e);};}if ("undefined" != typeof e.onHide) {var n = e.onHide[0];e.onHide[0] = function () {getApp().uniAppRunningBackend = !0, n && n.call(e);};}}} }, { key: "runningBackend", value: function value() {return getApp().uniAppRunningBackend;} }]), e;}())();t.uniApp = a;}, function (e, t, n) {"use strict";var o = r(n(121)),i = r(n(276));function r(e) {return e && e.__esModule ? e : { "default": e };}o["default"].version = i["default"].version, e.exports = o["default"];}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = y(n(122)),i = y(n(0)),r = y(n(1)),s = y(n(131)),a = y(n(171)),u = n(29),c = n(15),l = n(25),f = y(n(28)),d = y(n(236)),p = n(2),h = n(67);function y(e) {return e && e.__esModule ? e : { "default": e };}var v = function () {function e(t) {if ((0, i["default"])(this, e), this.goEasySocket = null, this.pubsub = null, this.im = null, null !== e.instance && e.instance.getConnectionStatus() !== f["default"].DISCONNECTED) return e.instance;this.validateOptions(t), this.setUriAndOpts(t), this.options = t, this.options.artifactVersion = e.version, this.pubsub = new s["default"](t), this.im = new a["default"](t);}return (0, r["default"])(e, [{ key: "connect", value: function value(e) {this.getConnectionStatus() !== f["default"].DISCONNECTED && p.calibrator.isObject(e) && p.calibrator.isFunction(e.onFailed) ? e.onFailed({ code: 408, content: "It is already connected, don't try again until disconnect() is called. " }) : (this.extendOptions(e), this.pubsub.initialBeforeConnect(), this.im.initialBeforeConnect({ id: e.id, data: e.data }), this.goEasySocket = new d["default"](this.options), this.im.initialGoEasySocket(this.goEasySocket), this.goEasySocket.connect(), this.pubsub.initialGoEasySocket(this.goEasySocket), this.im.initialAfterConnect());} }, { key: "disconnect", value: function value(e) {this.goEasySocket.disconnect(e).then(function () {p.calibrator.isObject(e) && p.calibrator.isFunction(e.onSuccess) && e.onSuccess();})["catch"](function (t) {p.calibrator.isObject(e) && p.calibrator.isFunction(e.onFailed) && e.onFailed(t);});} }, { key: "getConnectionStatus", value: function value() {return this.goEasySocket ? this.goEasySocket.getStatus() : f["default"].DISCONNECTED;} }, { key: "validateOptions", value: function value(e) {var t = "";if (!p.calibrator.isObject(e)) throw t = "options is require an object.", Error(t);if (!p.calibrator.isPrimitive(e.appkey) || 0 == e.appkey.length) throw t = "Invalid options:'host' is empty.", Error(t);if (!p.calibrator.isPrimitive(e.host) || 0 == e.host.length) throw t = "Invalid options:'host' is empty.", Error(t);if (!p.calibrator.isArray(e.modules)) throw t = "Invalid options: 'modules' must be nonempty array", Error(t);var n = (0, o["default"])(h.ModuleType),i = e.modules.map(function (e) {var o = e.toUpperCase();if (!n.includes(o)) throw t = "Invalid options: module '" + e + "' is not support", Error(t);return o;});e.modules = i;} }, { key: "extendOptions", value: function value(e) {if (p.calibrator.isFunction(e.onSuccess) ? this.options.onSuccess = e.onSuccess : this.options.onSuccess = p.noop, p.calibrator.isFunction(e.onFailed) ? this.options.onFailed = e.onFailed : this.options.onFailed = p.noop, p.calibrator.isFunction(e.onProgress) ? this.options.onProgress = e.onProgress : this.options.onProgress = p.noop, !this.options.modules.includes(h.ModuleType.IM) || !p.calibrator.isEmpty(e.id) && p.calibrator.isStringOrNumber(e.id)) {var t = "anonymous-" + Math.floor(1e5 * Math.random() + 1);this.options.id = e.id || t;} else if (p.calibrator.isObject(e) && p.calibrator.isFunction(e.onFailed)) throw { code: 400, content: "TypeError: id requires number or string." };if (p.calibrator.isDef(e.data) && !p.calibrator.isObject(e.data)) throw { code: 400, content: "TypeError: data requires an object." };if ((p.calibrator.isDef(e.data) ? String(e.data).length : 0) > 300) {if (p.calibrator.isObject(e) && p.calibrator.isFunction(e.onFailed)) throw { code: 400, content: "user.data-length limit 300 byte." };} else this.options.data = e.data;p.calibrator.isDef(e.otp) && (this.options.otp = e.otp);} }, { key: "setUriAndOpts", value: function value(e) {var t = "://" + p.GoEasyDomainNumber.refreshNumber() + e.host;if (p.env.isBrowserClient()) {var n = void 0;!0 === e.supportOldBrowser ? (n = ["polling", "websocket"], e.forceTLS = !1) : n = ["websocket"], !1 === e.forceTLS ? e.uri = "http" + t + ":80" : e.uri = "https" + t + ":443", e.opts = { transports: n, timeout: c.SocketTimeout.connect };} else e.uri = "https://wx-" + e.host + ":443", e.opts = { transports: ["websocket"], reconnectionDelayMax: c.SocketTimeout.reconnectionDelayMax };} }], [{ key: "getInstance", value: function value(t) {return null === e.instance && (e.instance = new e(t)), e.instance;} }]), e;}();v.IM_EVENT = u.ImEventType, v.IM_SCENE = l.ConversationType, v.version = "2.0.0", v.instance = null, t["default"] = v;}, function (e, t, n) {e.exports = { "default": n(123), __esModule: !0 };}, function (e, t, n) {n(124), e.exports = n(7).Object.values;}, function (e, t, n) {var o = n(16),i = n(125)(!1);o(o.S, "Object", { values: function values(e) {return i(e);} });}, function (e, t, n) {var o = n(18),i = n(31),r = n(24),s = n(38).f;e.exports = function (e) {return function (t) {for (var n, a = r(t), u = i(a), c = u.length, l = 0, f = []; c > l;) {n = u[l++], o && !s.call(a, n) || f.push(e ? [n, a[n]] : a[n]);}return f;};};}, function (e, t, n) {var o = n(24),i = n(82),r = n(127);e.exports = function (e) {return function (t, n, s) {var a,u = o(t),c = i(u.length),l = r(s, c);if (e && n != n) {for (; c > l;) {if ((a = u[l++]) != a) return !0;}} else for (; c > l; l++) {if ((e || l in u) && u[l] === n) return e || l || 0;}return !e && -1;};};}, function (e, t, n) {var o = n(57),i = Math.max,r = Math.min;e.exports = function (e, t) {return (e = o(e)) < 0 ? i(e + t, 0) : r(e, t);};}, function (e, t, n) {e.exports = { "default": n(129), __esModule: !0 };}, function (e, t, n) {n(130);var o = n(7).Object;e.exports = function (e, t, n) {return o.defineProperty(e, t, n);};}, function (e, t, n) {var o = n(16);o(o.S + o.F * !n(18), "Object", { defineProperty: n(22).f });}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = f(n(0)),i = f(n(1)),r = f(n(132)),s = f(n(165)),a = f(n(166)),u = f(n(167)),c = f(n(169)),l = n(67);function f(e) {return e && e.__esModule ? e : { "default": e };}var d = function () {function e(t) {(0, o["default"])(this, e), this.goEasySocket = null, this.publisher = null, this.subscriber = null, this.presence = null, this.histories = null, this.options = null, this.hereNows = null, this.neverConnect = !0, this.options = t;}return (0, i["default"])(e, [{ key: "initialGoEasySocket", value: function value(e) {this.goEasySocket = e, this.subscriber.initialGoEasySocket(), this.presence.initialGoEasySocket();} }, { key: "initialBeforeConnect", value: function value() {this.neverConnect = !1, this.publisher = new a["default"](this), this.subscriber = new u["default"](this), this.histories = new r["default"](this), this.presence = new c["default"](this), this.hereNows = new s["default"](this);} }, { key: "validateOptions", value: function value() {var e = this.options;if (!e.modules || !e.modules.includes(l.ModuleType.PUBSUB)) throw Error("Invalid options: module '" + l.ModuleType.PUBSUB + "' is not enabled");} }, { key: "publish", value: function value(e) {this.validateOptions(), this.publisher.publish(e);} }, { key: "subscribe", value: function value(e) {this.validateOptions(), this.subscriber.subscribe(e);} }, { key: "unsubscribe", value: function value(e) {this.validateOptions(), this.subscriber.unsubscribe(e);} }, { key: "subscribePresence", value: function value(e) {this.validateOptions(), this.presence.subscribePresence(e);} }, { key: "unsubscribePresence", value: function value(e) {this.validateOptions(), this.presence.unsubscribePresence(e);} }, { key: "history", value: function value(e) {this.validateOptions(), this.histories.get(e);} }, { key: "hereNow", value: function value(e) {this.validateOptions(), this.hereNows.byChannel(e);} }, { key: "hereNowByUserIds", value: function value(e) {this.validateOptions(), this.hereNows.byUserId(e);} }]), e;}();d.instance = null, t["default"] = d;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = l(n(0)),i = l(n(1)),r = n(2),s = n(11),a = l(n(10)),u = l(n(8)),c = n(15);function l(e) {return e && e.__esModule ? e : { "default": e };}var f = function () {function e(t) {(0, o["default"])(this, e), this.pubSub = null, this.pubSub = t;}return (0, i["default"])(e, [{ key: "get", value: function value(e, t) {if (r.calibrator.isFunction(e.onSuccess) || (e.onSuccess = r.noop), r.calibrator.isFunction(e.onFailed) || (e.onFailed = r.noop), r.calibrator.isDef(e.channel)) {r.calibrator.isNumber(e.channel) && (e.channel = e.channel.toString());var n = new a["default"]({ name: s.EmitType.historyMessages, permission: u["default"].READ, params: e, singleTimeout: c.SocketTimeout.commonQuerySingle, totalTimeout: c.SocketTimeout.commonQueryTotal, success: function success(t) {e.onSuccess({ code: t.resultCode || t.code || 200, content: t.content });}, fail: function fail(t) {e.onFailed({ code: t.resultCode || t.code, content: t.content });} });this.pubSub.goEasySocket.emit(n);} else e.onFailed(res);} }]), e;}();t["default"] = f;}, function (e, t, n) {e.exports = { "default": n(134), __esModule: !0 };}, function (e, t, n) {n(84), n(89), e.exports = n(62).f("iterator");}, function (e, t, n) {var o = n(57),i = n(56);e.exports = function (e) {return function (t, n) {var r,s,a = String(i(t)),u = o(n),c = a.length;return u < 0 || u >= c ? e ? "" : undefined : (r = a.charCodeAt(u)) < 55296 || r > 56319 || u + 1 === c || (s = a.charCodeAt(u + 1)) < 56320 || s > 57343 ? e ? a.charAt(u) : r : e ? a.slice(u, u + 2) : s - 56320 + (r - 55296 << 10) + 65536;};};}, function (e, t, n) {"use strict";var o = n(61),i = n(45),r = n(47),s = {};n(26)(s, n(14)("iterator"), function () {return this;}), e.exports = function (e, t, n) {e.prototype = o(s, { next: i(1, n) }), r(e, t + " Iterator");};}, function (e, t, n) {var o = n(22),i = n(19),r = n(31);e.exports = n(18) ? Object.defineProperties : function (e, t) {i(e);for (var n, s = r(t), a = s.length, u = 0; a > u;) {o.f(e, n = s[u++], t[n]);}return e;};}, function (e, t, n) {"use strict";var o = n(139),i = n(140),r = n(39),s = n(24);e.exports = n(85)(Array, "Array", function (e, t) {this._t = s(e), this._i = 0, this._k = t;}, function () {var e = this._t,t = this._k,n = this._i++;return !e || n >= e.length ? (this._t = undefined, i(1)) : i(0, "keys" == t ? n : "values" == t ? e[n] : [n, e[n]]);}, "values"), r.Arguments = r.Array, o("keys"), o("values"), o("entries");}, function (e, t) {e.exports = function () {};}, function (e, t) {e.exports = function (e, t) {return { value: t, done: !!e };};}, function (e, t, n) {e.exports = { "default": n(142), __esModule: !0 };}, function (e, t, n) {n(143), n(91), n(148), n(149), e.exports = n(7).Symbol;}, function (e, t, n) {"use strict";var o = n(13),i = n(27),r = n(18),s = n(16),a = n(86),u = n(144).KEY,c = n(30),l = n(59),f = n(47),d = n(46),p = n(14),h = n(62),y = n(63),v = n(145),m = n(146),g = n(19),b = n(23),_ = n(40),k = n(24),C = n(55),w = n(45),E = n(61),S = n(147),O = n(65),T = n(64),F = n(22),M = n(31),P = O.f,I = F.f,N = S.f,_x = o.Symbol,R = o.JSON,A = R && R.stringify,j = p("_hidden"),D = p("toPrimitive"),U = {}.propertyIsEnumerable,B = l("symbol-registry"),q = l("symbols"),L = l("op-symbols"),G = Object.prototype,z = "function" == typeof _x && !!T.f,H = o.QObject,V = !H || !H.prototype || !H.prototype.findChild,W = r && c(function () {return 7 != E(I({}, "a", { get: function get() {return I(this, "a", { value: 7 }).a;} })).a;}) ? function (e, t, n) {var o = P(G, t);o && delete G[t], I(e, t, n), o && e !== G && I(G, t, o);} : I,J = function J(e) {var t = q[e] = E(_x.prototype);return t._k = e, t;},$ = z && "symbol" == typeof _x.iterator ? function (e) {return "symbol" == typeof e;} : function (e) {return e instanceof _x;},K = function K(e, t, n) {return e === G && K(L, t, n), g(e), t = C(t, !0), g(n), i(q, t) ? (n.enumerable ? (i(e, j) && e[j][t] && (e[j][t] = !1), n = E(n, { enumerable: w(0, !1) })) : (i(e, j) || I(e, j, w(1, {})), e[j][t] = !0), W(e, t, n)) : I(e, t, n);},Y = function Y(e, t) {g(e);for (var n, o = v(t = k(t)), i = 0, r = o.length; r > i;) {K(e, n = o[i++], t[n]);}return e;},Q = function Q(e) {var t = U.call(this, e = C(e, !0));return !(this === G && i(q, e) && !i(L, e)) && (!(t || !i(this, e) || !i(q, e) || i(this, j) && this[j][e]) || t);},X = function X(e, t) {if (e = k(e), t = C(t, !0), e !== G || !i(q, t) || i(L, t)) {var n = P(e, t);return !n || !i(q, t) || i(e, j) && e[j][t] || (n.enumerable = !0), n;}},Z = function Z(e) {for (var t, n = N(k(e)), o = [], r = 0; n.length > r;) {i(q, t = n[r++]) || t == j || t == u || o.push(t);}return o;},ee = function ee(e) {for (var t, n = e === G, o = N(n ? L : k(e)), r = [], s = 0; o.length > s;) {!i(q, t = o[s++]) || n && !i(G, t) || r.push(q[t]);}return r;};z || (a((_x = function x() {if (this instanceof _x) throw TypeError("Symbol is not a constructor!");var e = d(arguments.length > 0 ? arguments[0] : undefined),t = function t(n) {this === G && t.call(L, n), i(this, j) && i(this[j], e) && (this[j][e] = !1), W(this, e, w(1, n));};return r && V && W(G, e, { configurable: !0, set: t }), J(e);}).prototype, "toString", function () {return this._k;}), O.f = X, F.f = K, n(90).f = S.f = Z, n(38).f = Q, T.f = ee, r && !n(37) && a(G, "propertyIsEnumerable", Q, !0), h.f = function (e) {return J(p(e));}), s(s.G + s.W + s.F * !z, { Symbol: _x });for (var te = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), ne = 0; te.length > ne;) {p(te[ne++]);}for (var oe = M(p.store), ie = 0; oe.length > ie;) {y(oe[ie++]);}s(s.S + s.F * !z, "Symbol", { "for": function _for(e) {return i(B, e += "") ? B[e] : B[e] = _x(e);}, keyFor: function keyFor(e) {if (!$(e)) throw TypeError(e + " is not a symbol!");for (var t in B) {if (B[t] === e) return t;}}, useSetter: function useSetter() {V = !0;}, useSimple: function useSimple() {V = !1;} }), s(s.S + s.F * !z, "Object", { create: function create(e, t) {return t === undefined ? E(e) : Y(E(e), t);}, defineProperty: K, defineProperties: Y, getOwnPropertyDescriptor: X, getOwnPropertyNames: Z, getOwnPropertySymbols: ee });var re = c(function () {T.f(1);});s(s.S + s.F * re, "Object", { getOwnPropertySymbols: function getOwnPropertySymbols(e) {return T.f(_(e));} }), R && s(s.S + s.F * (!z || c(function () {var e = _x();return "[null]" != A([e]) || "{}" != A({ a: e }) || "{}" != A(Object(e));})), "JSON", { stringify: function stringify(e) {for (var t, n, o = [e], i = 1; arguments.length > i;) {o.push(arguments[i++]);}if (n = t = o[1], (b(t) || e !== undefined) && !$(e)) return m(t) || (t = function t(e, _t2) {if ("function" == typeof n && (_t2 = n.call(this, e, _t2)), !$(_t2)) return _t2;}), o[1] = t, A.apply(R, o);} }), _x.prototype[D] || n(26)(_x.prototype, D, _x.prototype.valueOf), f(_x, "Symbol"), f(Math, "Math", !0), f(o.JSON, "JSON", !0);}, function (e, t, n) {var o = n(46)("meta"),i = n(23),r = n(27),s = n(22).f,a = 0,u = Object.isExtensible || function () {return !0;},c = !n(30)(function () {return u(Object.preventExtensions({}));}),l = function l(e) {s(e, o, { value: { i: "O" + ++a, w: {} } });},f = e.exports = { KEY: o, NEED: !1, fastKey: function fastKey(e, t) {if (!i(e)) return "symbol" == typeof e ? e : ("string" == typeof e ? "S" : "P") + e;if (!r(e, o)) {if (!u(e)) return "F";if (!t) return "E";l(e);}return e[o].i;}, getWeak: function getWeak(e, t) {if (!r(e, o)) {if (!u(e)) return !0;if (!t) return !1;l(e);}return e[o].w;}, onFreeze: function onFreeze(e) {return c && f.NEED && u(e) && !r(e, o) && l(e), e;} };}, function (e, t, n) {var o = n(31),i = n(64),r = n(38);e.exports = function (e) {var t = o(e),n = i.f;if (n) for (var s, a = n(e), u = r.f, c = 0; a.length > c;) {u.call(e, s = a[c++]) && t.push(s);}return t;};}, function (e, t, n) {var o = n(36);e.exports = Array.isArray || function (e) {return "Array" == o(e);};}, function (e, t, n) {var o = n(24),i = n(90).f,r = {}.toString,s = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];e.exports.f = function (e) {return s && "[object Window]" == r.call(e) ? function (e) {try {return i(e);} catch (t) {return s.slice();}}(e) : i(o(e));};}, function (e, t, n) {n(63)("asyncIterator");}, function (e, t, n) {n(63)("observable");}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.UUID = undefined;var o = s(n(0)),i = s(n(1)),r = s(n(151));function s(e) {return e && e.__esModule ? e : { "default": e };}var a = function () {function e() {(0, o["default"])(this, e);}return (0, i["default"])(e, null, [{ key: "get", value: function value() {return (0, r["default"])().replace(/-/g, "");} }]), e;}();t.UUID = a;}, function (e, t, n) {var o,i,r = n(152),s = n(153),a = 0,u = 0;e.exports = function (e, t, n) {var c = t && n || 0,l = t || [],f = (e = e || {}).node || o,d = e.clockseq !== undefined ? e.clockseq : i;if (null == f || null == d) {var p = r();null == f && (f = o = [1 | p[0], p[1], p[2], p[3], p[4], p[5]]), null == d && (d = i = 16383 & (p[6] << 8 | p[7]));}var h = e.msecs !== undefined ? e.msecs : new Date().getTime(),y = e.nsecs !== undefined ? e.nsecs : u + 1,v = h - a + (y - u) / 1e4;if (v < 0 && e.clockseq === undefined && (d = d + 1 & 16383), (v < 0 || h > a) && e.nsecs === undefined && (y = 0), y >= 1e4) throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");a = h, u = y, i = d;var m = (1e4 * (268435455 & (h += 122192928e5)) + y) % 4294967296;l[c++] = m >>> 24 & 255, l[c++] = m >>> 16 & 255, l[c++] = m >>> 8 & 255, l[c++] = 255 & m;var g = h / 4294967296 * 1e4 & 268435455;l[c++] = g >>> 8 & 255, l[c++] = 255 & g, l[c++] = g >>> 24 & 15 | 16, l[c++] = g >>> 16 & 255, l[c++] = d >>> 8 | 128, l[c++] = 255 & d;for (var b = 0; b < 6; ++b) {l[c + b] = f[b];}return t || s(l);};}, function (e, t) {var n = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || "undefined" != typeof msCrypto && "function" == typeof window.msCrypto.getRandomValues && msCrypto.getRandomValues.bind(msCrypto);if (n) {var o = new Uint8Array(16);e.exports = function () {return n(o), o;};} else {var i = new Array(16);e.exports = function () {for (var e, t = 0; t < 16; t++) {0 == (3 & t) && (e = 4294967296 * Math.random()), i[t] = e >>> ((3 & t) << 3) & 255;}return i;};}}, function (e, t) {for (var n = [], o = 0; o < 256; ++o) {n[o] = (o + 256).toString(16).substr(1);}e.exports = function (e, t) {var o = t || 0,i = n;return [i[e[o++]], i[e[o++]], i[e[o++]], i[e[o++]], "-", i[e[o++]], i[e[o++]], "-", i[e[o++]], i[e[o++]], "-", i[e[o++]], i[e[o++]], "-", i[e[o++]], i[e[o++]], i[e[o++]], i[e[o++]], i[e[o++]], i[e[o++]]].join("");};}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.goEasyArray = undefined;var o = u(n(3)),i = u(n(0)),r = u(n(1)),s = u(n(4)),a = u(n(5));function u(e) {return e && e.__esModule ? e : { "default": e };}var c = new (function (e) {function t() {return (0, i["default"])(this, t), (0, s["default"])(this, (t.__proto__ || (0, o["default"])(t)).apply(this, arguments));}return (0, a["default"])(t, e), (0, r["default"])(t, [{ key: "deleteByKey", value: function value(e, t, n) {var o = e.findIndex(function (e) {return e[t] == n;});o > -1 && e.splice(o, 1);} }, { key: "unshiftGuid", value: function value(e) {var t = !1,n = this.findIndex(function (t) {return t == e;});for (n > -1 && (t = !0, this.splice(n, 1)), this.unshift(e); this.length > 300;) {this.pop();}return t;} }]), t;}(Array))();t.goEasyArray = c;}, function (e, t, n) {n(156), e.exports = n(7).Object.getPrototypeOf;}, function (e, t, n) {var o = n(40),i = n(88);n(66)("getPrototypeOf", function () {return function (e) {return i(o(e));};});}, function (e, t, n) {e.exports = { "default": n(158), __esModule: !0 };}, function (e, t, n) {n(159), e.exports = n(7).Object.setPrototypeOf;}, function (e, t, n) {var o = n(16);o(o.S, "Object", { setPrototypeOf: n(160).set });}, function (e, t, n) {var o = n(23),i = n(19),r = function r(e, t) {if (i(e), !o(t) && null !== t) throw TypeError(t + ": can't set as prototype!");};e.exports = { set: Object.setPrototypeOf || ("__proto__" in {} ? function (e, t, o) {try {(o = n(35)(Function.call, n(65).f(Object.prototype, "__proto__").set, 2))(e, []), t = !(e instanceof Array);} catch (i) {t = !0;}return function (e, n) {return r(e, n), t ? e.__proto__ = n : o(e, n), e;};}({}, !1) : undefined), check: r };}, function (e, t, n) {n(162);var o = n(7).Object;e.exports = function (e, t) {return o.create(e, t);};}, function (e, t, n) {var o = n(16);o(o.S, "Object", { create: n(61) });}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.storage = undefined;var o = r(n(0)),i = r(n(1));function r(e) {return e && e.__esModule ? e : { "default": e };}var s = new (function () {function e() {(0, o["default"])(this, e);}return (0, i["default"])(e, [{ key: "getCookie", value: function value(e) {var t,n = new RegExp("(^| )" + e + "=([^;]*)(;|$)");return (t = document.cookie.match(n)) ? unescape(t[2]) : null;} }, { key: "getData", value: function value(e) {return window.localStorage ? window.localStorage.getItem(e) : this.getCookie(e);} }, { key: "setCookie", value: function value(e, t) {var n = new Date();n.setTime(n.getTime() + 2592e6), document.cookie = e + "=" + escape(t) + ";expires=" + n.toGMTString();} }, { key: "setData", value: function value(e, t) {window.localStorage ? window.localStorage.setItem(e, t) : this.setCookie(e, t);} }]), e;}())();t.storage = s;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t["default"] = { maxNumber: 5 };}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = l(n(0)),i = l(n(1)),r = n(2),s = n(11),a = l(n(10)),u = l(n(8)),c = n(15);function l(e) {return e && e.__esModule ? e : { "default": e };}var f = function () {function e(t) {(0, o["default"])(this, e), this.pubSub = null, this.pubSub = t;}return (0, i["default"])(e, [{ key: "byChannel", value: function value(e) {var t = { channels: [], includeUsers: !1, distinct: !1 };if (r.calibrator.isFunction(e.onSuccess) || (e.onSuccess = r.noop), r.calibrator.isFunction(e.onFailed) || (e.onFailed = r.noop), Array.isArray(e.channels)) for (var n = 0; n < e.channels.length; n++) {var o = e.channels[n];r.calibrator.isNumber(o) && (o = o.toString()), t.channels.push(o);}if (0 != t.channels.length) {1 == e.includeUsers && (t.includeUsers = !0), 1 == e.distinct && (t.distinct = !0);var i = new a["default"]({ name: s.EmitType.hereNow, permission: u["default"].READ, params: t, singleTimeout: c.SocketTimeout.commonQuerySingle, totalTimeout: c.SocketTimeout.commonQueryTotal, success: function success(t) {var n = t.content,o = n.channels;for (var i in o) {if (o.hasOwnProperty(i)) {var r = o[i];r.users = r.users.map(function (e) {return e.data = JSON.parse(e.data), e;});}}e.onSuccess({ code: t.resultCode || t.code || 200, content: n });}, fail: function fail(t) {e.onFailed({ code: t.resultCode || t.code || 200, content: t.content });} });this.pubSub.goEasySocket.emit(i);} else e.onFailed({ code: 408, content: "channels is required." });} }, { key: "byUserId", value: function value(e) {var t = { userIds: [], distinct: !0 };if (r.calibrator.isFunction(e.onSuccess) || (e.onSuccess = r.noop), r.calibrator.isFunction(e.onFailed) || (e.onFailed = r.noop), r.calibrator.isDef(e.userIds) && (t.userIds = e.userIds), 0 == e.distinct && (t.distinct = !1), 0 === t.userIds.length) e.onFailed({ code: 400, content: "userIds is required" });else if (t.userIds.length > 500) e.onFailed({ code: 400, content: "userIds is over max length 500" });else {var n = new a["default"]({ name: s.EmitType.hereNowByUserIds, permission: u["default"].READ, params: t, singleTimeout: c.SocketTimeout.commonQuerySingle, totalTimeout: c.SocketTimeout.commonQueryTotal, success: function success(t) {var n = t.content;n = n.map(function (e) {var t = {};return t.id = e.userId, t.data = e.userData ? JSON.parse(e.userData) : {}, t;}), e.onSuccess({ code: t.resultCode || t.code || 200, content: n });}, fail: function fail(t) {e.onFailed({ code: t.resultCode || t.code || 200, content: t.content });} });this.pubSub.goEasySocket.emit(n);}} }]), e;}();t["default"] = f;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = l(n(0)),i = l(n(1)),r = n(2),s = l(n(10)),a = n(11),u = l(n(8)),c = n(15);function l(e) {return e && e.__esModule ? e : { "default": e };}var f = function () {function e(t) {(0, o["default"])(this, e), this.pubSub = null, this.pubSub = t;}return (0, i["default"])(e, [{ key: "publish", value: function value(e) {if (r.calibrator.isFunction(e.onFailed) || (e.onFailed = r.noop), r.calibrator.isFunction(e.onSuccess) || (e.onSuccess = r.noop), r.calibrator.isEmpty(e.channel)) throw { code: 400, content: "channel is required." };if (r.calibrator.isNumber(e.channel) && (e.channel = e.channel.toString()), r.calibrator.isEmpty(e.message)) throw { code: 400, content: "message is required." };if (r.calibrator.isNumber(e.message) && (e.message = e.message.toString()), !r.calibrator.isString(e.message)) throw { code: 400, content: "TypeError: message requires string." };if (r.calibrator.isObject(e.notification)) {if (r.calibrator.isEmpty(e.notification.title)) throw { code: 400, content: "notification.title is required." };if (!r.calibrator.isString(e.notification.title)) throw { code: 400, content: "TypeError: notification.title requires string." };if (e.notification.title.length > 32) throw { code: 400, content: "TypeError: notification.title over max length 32." };if (r.calibrator.isEmpty(e.notification.body)) throw { code: 400, content: "notification.body is required." };if (!r.calibrator.isString(e.notification.body)) throw { code: 400, content: "TypeError: notification.body must be string." };if (e.notification.body.length > 50) throw { code: 400, content: "notification.body over max length 50." };} else if (r.calibrator.isPrimitive(e.notification)) throw { code: 400, content: "TypeError: notification requires an object." };var t = { channel: e.channel, content: e.message, nt: e.notification, guid: r.UUID.get() },n = new s["default"]({ name: a.EmitType.publish, params: t, singleTimeout: c.SocketTimeout.commonRequestSingle, totalTimeout: c.SocketTimeout.commonRequestTotal, permission: u["default"].WRITE, success: function success(t) {e.onSuccess({ code: 200, content: "ok" });}, fail: function fail(t) {e.onFailed({ code: t.resultCode, content: t.content });} });this.pubSub.goEasySocket.emit(n);} }]), e;}();t["default"] = f;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = p(n(0)),i = p(n(1)),r = n(2),s = p(n(10)),a = n(11),u = p(n(8)),c = p(n(168)),l = p(n(41)),f = n(15),d = p(n(28));function p(e) {return e && e.__esModule ? e : { "default": e };}var h = function () {function e(t) {(0, o["default"])(this, e), this.subscriptions = [], this.pubSub = null, this.pubSub = t;}return (0, i["default"])(e, [{ key: "initialGoEasySocket", value: function value() {var e = this.pubSub.goEasySocket;e.addMessageObserver(l["default"].message, this.onNewMessage.bind(this)), e.addExpiredReconnectedObserver(this.onExpiredReconnected.bind(this)), e.addConnectedObserver(this.onReconnected.bind(this));} }, { key: "resubscribe", value: function value() {var e = this.subscriptions.slice(0);this.subscriptions = [];for (var t = 0; t < e.length; t++) {0 != e[t].channels.length && this.subscribe(e[t]);}} }, { key: "onExpiredReconnected", value: function value() {this.resubscribe();} }, { key: "onReconnected", value: function value() {this.pubSub.neverConnect || this.pubSub.goEasySocket.status == d["default"].RECONNECTED || this.resubscribe();} }, { key: "onNewMessage", value: function value(e) {if (!(e.n.indexOf("_presence") > -1)) {e.a && this.pubSub.goEasySocket.sendAck("ack", { publishGuid: e.i });var t = { time: e.t, channel: e.n, content: e.c };this.findSubscriptionByChannel(t.channel).onMessage(t);}} }, { key: "formatOptions", value: function value(e) {var t = !r.calibrator.isEmpty(e.channel),n = !r.calibrator.isEmpty(e.channels);if (this.formatCallback(e), r.calibrator.isFunction(e.onMessage) || (e.onMessage = r.noop), !t && !n) return e.onFailed({ code: 400, content: "channel is required" }), !1;if (!t || !n) {if (t && (r.calibrator.isNumber(e.channel) && (e.channel = e.channel.toString()), e.channels = [e.channel]), n) {if (!Array.isArray(e.channels) || 0 == e.channels.length) return void e.onFailed({ code: 400, content: "channels must be an array" });if (e.channels.length > 500) return e.onFailed({ code: 400, content: "channels over max length:500" }), !1;for (var o = 0, i = e.channels.length; o < i; o++) {if (r.calibrator.isNumber(e.channels[o]) && (e.channels[o] = e.channels[o].toString()), r.calibrator.isEmpty(e.channels[o])) return e.onFailed({ code: 400, content: "Channels array contains empty channel" }), !1;}}return !0;}e.onFailed({ code: 400, content: "subscribe to either channel or channels, not both" });} }, { key: "formatCallback", value: function value(e) {r.calibrator.isFunction(e.onSuccess) || (e.onSuccess = r.noop), r.calibrator.isFunction(e.onFailed) || (e.onFailed = r.noop);} }, { key: "subscribe", value: function value(e) {var t = this;if (this.formatOptions(e)) {var n = new s["default"]({ name: a.EmitType.subscribe, permission: u["default"].READ, singleTimeout: f.SocketTimeout.commonInfiniteSingle, totalTimeout: f.SocketTimeout.commonInfiniteTotal, params: { channels: e.channels }, success: function success() {var n = new c["default"]({ channels: e.channels, onSuccess: e.onSuccess, onFailed: e.onFailed, onMessage: e.onMessage });t.subscriptions.push(n), e.onSuccess({ code: 200, content: "ok" });}, fail: function fail(t) {e.onFailed({ code: t.resultCode, content: t.content });} });this.pubSub.goEasySocket.emit(n);}} }, { key: "unsubscribe", value: function value(e) {var t = this;if (this.formatCallback(e), r.calibrator.isDef(e.channel)) {if (r.calibrator.isNumber(e.channel) && (e.channel = e.channel.toString()), this.findSubscriptionByChannel(e.channel)) {var n = new s["default"]({ name: a.EmitType.unsubscribe, params: { channel: e.channel }, permission: u["default"].READ, singleTimeout: f.SocketTimeout.commonRequestSingle, totalTimeout: f.SocketTimeout.commonRequestTotal, success: function success() {e.onSuccess({ code: 200, content: "ok" }), t.removeChannel(e.channel);}, fail: function fail(t) {e.onFailed({ code: t.resultCode, content: t.content });} });this.pubSub.goEasySocket.emit(n);} else e.onFailed({ code: 400, content: "channel[" + e.channel + "] is not subscribed" });} else e.onFailed({ code: 400, content: "channel is required" });} }, { key: "removeChannel", value: function value(e) {for (var t = 0; t < this.subscriptions.length; t++) {for (var n = this.subscriptions[t].channels, o = 0; o < n.length; o++) {if (n[o] == e) {this.subscriptions[t].channels.splice(o, 1);break;}}}} }, { key: "findSubscriptionByChannel", value: function value(e) {for (var t = !1, n = null, o = this.subscriptions.length - 1; o >= 0; o--) {for (var i = this.subscriptions[o].channels, r = 0; r < i.length; r++) {if (i[r] == e) {t = !0, n = this.subscriptions[o];break;}}if (t) break;}return n;} }]), e;}();t["default"] = h;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = r(n(0)),i = r(n(1));function r(e) {return e && e.__esModule ? e : { "default": e };}var s = function () {function e(t) {(0, o["default"])(this, e), this.channels = [], this.onSuccess = null, this.onFailed = null, this.onMessage = null, this.channels = t.channels, this.onSuccess = t.onSuccess, this.onFailed = t.onFailed, this.onMessage = t.onMessage;}return (0, i["default"])(e, [{ key: "empty", value: function value() {} }]), e;}();t["default"] = s;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = p(n(0)),i = p(n(1)),r = n(2),s = p(n(10)),a = n(11),u = p(n(8)),c = n(15),l = p(n(41)),f = p(n(170)),d = p(n(28));function p(e) {return e && e.__esModule ? e : { "default": e };}var h = function () {function e(t) {(0, o["default"])(this, e), this.presenters = [], this.pubSub = null, this.pubSub = t;}return (0, i["default"])(e, [{ key: "initialGoEasySocket", value: function value() {var e = this.pubSub.goEasySocket;e.addMessageObserver(l["default"].message, this.onNewMessage.bind(this)), e.addExpiredReconnectedObserver(this.onExpiredReconnected.bind(this)), e.addConnectedObserver(this.onReconnected.bind(this));} }, { key: "resubscribe", value: function value() {var e = this.presenters.slice(0);this.presenters = [];for (var t = 0; t < e.length; t++) {for (var n = 0; n < e[t].channels.length; n++) {var o = e[t].channels[n].split("_presence");e[t].channels[n] = o[0];}0 != e[t].channels.length && this.subscribePresence(e[t]);}} }, { key: "onExpiredReconnected", value: function value() {this.resubscribe();} }, { key: "onReconnected", value: function value() {this.pubSub.neverConnect || this.pubSub.goEasySocket.status == d["default"].RECONNECTED || this.resubscribe();} }, { key: "onNewMessage", value: function value(e) {if (-1 != e.n.indexOf("_presence")) {var t = this.findPresenceByChannel(e.n);if (t) {var n = JSON.parse(e.c);n.events = n.events.map(function (e) {var t = e.userData ? JSON.parse(e.userData) : {};return { time: e.time, action: e.action, id: e.userId, data: t };}), t.onPresence(n);}}} }, { key: "formatOptions", value: function value(e) {var t = !r.calibrator.isEmpty(e.channel),n = !r.calibrator.isEmpty(e.channels);if (this.formatCallback(e), r.calibrator.isFunction(e.onPresence) || (e.onPresence = r.noop), !t && !n) return e.onFailed({ code: 400, content: "channel is required" }), !1;if (!t || !n) {if (t && (r.calibrator.isNumber(e.channel) && (e.channel = e.channel.toString()), e.channels = [e.channel]), n) {if (!Array.isArray(e.channels) || 0 == e.channels.length) return void e.onFailed({ code: 400, content: "channels must be an array" });if (e.channels.length > 500) return e.onFailed({ code: 400, content: "channels over max length:500" }), !1;for (var o = 0, i = e.channels.length; o < i; o++) {if (r.calibrator.isNumber(e.channels[o]) && (e.channels[o] = e.channels[o].toString()), r.calibrator.isEmpty(e.channels[o])) return e.onFailed({ code: 400, content: "Channels array contains empty channel" }), !1;}}return !0;}e.onFailed({ code: 400, content: "subscribe to either channel or channels, not both" });} }, { key: "formatCallback", value: function value(e) {r.calibrator.isFunction(e.onSuccess) || (e.onSuccess = r.noop), r.calibrator.isFunction(e.onFailed) || (e.onFailed = r.noop);} }, { key: "subscribePresence", value: function value(e) {var t = this;if (this.formatOptions(e)) {Array.isArray(e.channels) && (e.channels = e.channels.map(function (e) {return e += "_presence";}));var n = new s["default"]({ name: a.EmitType.subscribe, permission: u["default"].READ, singleTimeout: c.SocketTimeout.commonInfiniteSingle, totalTimeout: c.SocketTimeout.commonInfiniteTotal, params: { channels: e.channels }, success: function success() {var n = new f["default"]({ channels: e.channels, onSuccess: e.onSuccess, onFailed: e.onFailed, onPresence: e.onPresence });t.presenters.push(n), e.onSuccess({ code: 200, content: "ok" });}, fail: function fail(t) {e.onFailed({ code: t.resultCode, content: t.content });} });this.pubSub.goEasySocket.emit(n);}} }, { key: "unsubscribePresence", value: function value(e) {var t = this;if (this.formatCallback(e), r.calibrator.isDef(e.channel)) {if (e.channel += "_presence", this.findPresenceByChannel(e.channel)) {var n = new s["default"]({ name: a.EmitType.unsubscribe, params: { channel: e.channel }, permission: u["default"].READ, singleTimeout: c.SocketTimeout.commonRequestSingle, totalTimeout: c.SocketTimeout.commonRequestTotal, success: function success() {e.onSuccess({ code: 200, content: "ok" }), t.removeChannel(e.channel);}, fail: function fail(t) {e.onFailed({ code: t.resultCode, content: t.content });} });this.pubSub.goEasySocket.emit(n);} else e.onFailed({ code: 400, content: "channel[" + e.channel + "] is not subscribed" });} else e.onFailed({ code: 400, content: "channel is required" });} }, { key: "removeChannel", value: function value(e) {for (var t = 0; t < this.presenters.length; t++) {for (var n = this.presenters[t].channels, o = 0; o < n.length; o++) {if (n[o] == e) {this.presenters[t].channels.splice(o, 1);break;}}}} }, { key: "findPresenceByChannel", value: function value(e) {for (var t = !1, n = null, o = this.presenters.length - 1; o >= 0; o--) {for (var i = this.presenters[o].channels, r = 0; r < i.length; r++) {if (i[r] == e) {t = !0, n = this.presenters[o];break;}}if (t) break;}return n;} }]), e;}();t["default"] = h;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = r(n(0)),i = r(n(1));function r(e) {return e && e.__esModule ? e : { "default": e };}var s = function () {function e(t) {(0, o["default"])(this, e), this.channels = [], this.onSuccess = null, this.onFailed = null, this.onPresence = null, this.channels = t.channels, this.onSuccess = t.onSuccess, this.onFailed = t.onFailed, this.onPresence = t.onPresence;}return (0, i["default"])(e, [{ key: "empty", value: function value() {} }]), e;}();t["default"] = s;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = c(n(94)),i = c(n(0)),r = c(n(1)),s = c(n(42)),a = n(2),u = n(67);function c(e) {return e && e.__esModule ? e : { "default": e };}var l = null,f = function () {function e(t) {(0, i["default"])(this, e), this.options = null, this.options = t, l = new s["default"]();}return (0, r["default"])(e, [{ key: "initialBeforeConnect", value: function value(e) {l.initialBeforeConnect(e);} }, { key: "initialAfterConnect", value: function value() {l.initialAfterConnect();} }, { key: "initialGoEasySocket", value: function value(e) {l.initialGoEasySocket(e);} }, { key: "validateOptions", value: function value() {var e = this.options;if (!e.modules || !e.modules.includes(u.ModuleType.IM)) throw Error("Invalid options: module '" + u.ModuleType.IM + "' is not enabled");} }, { key: "validateMessageToData", value: function value(e) {if (!a.calibrator.isObject(e.to)) throw { code: 400, content: "TypeError: to requires an object." };if (!a.calibrator.isObject(e.to.data)) throw { code: 400, content: "TypeError: to.data requires an object." };} }, { key: "on", value: function value(e, t) {this.validateOptions(), l.on(e, t);} }, { key: "createTextMessage", value: function value(e) {if (this.validateOptions(), this.validateMessageToData(e), !a.calibrator.isString(e.text)) throw { code: 400, content: "TypeError: text requires string." };return l.createTextMessage(e);} }, { key: "createImageMessage", value: function value(e) {return this.validateOptions(), this.validateMessageToData(e), l.createImageMessage(e);} }, { key: "createFileMessage", value: function value(e) {return this.validateOptions(), this.validateMessageToData(e), l.createFileMessage(e);} }, { key: "createAudioMessage", value: function value(e) {return this.validateOptions(), this.validateMessageToData(e), l.createAudioMessage(e);} }, { key: "createVideoMessage", value: function value(e) {return this.validateOptions(), this.validateMessageToData(e), l.createVideoMessage(e);} }, { key: "createCustomMessage", value: function value(e) {if (this.validateOptions(), this.validateMessageToData(e), !a.calibrator.isObject(e.payload)) throw { code: 400, content: "TypeError: payload requires an object." };return l.createCustomMessage(e);} }, { key: "latestConversations", value: function value(e) {this.validateOptions(), l.latestConversations().then(function (t) {a.calibrator.isFunction(e.onSuccess) && e.onSuccess(t);})["catch"](function (t) {a.calibrator.isFunction(e.onFailed) && e.onFailed(t);});} }, { key: "removePrivateConversation", value: function value(e) {this.validateOptions(), l.removePrivateConversation(e.userId).then(function (t) {a.calibrator.isFunction(e.onSuccess) && e.onSuccess();})["catch"](function (t) {a.calibrator.isFunction(e.onFailed) && e.onFailed(t);});} }, { key: "removeGroupConversation", value: function value(e) {this.validateOptions(), l.removeGroupConversation(e.groupId).then(function (t) {a.calibrator.isFunction(e.onSuccess) && e.onSuccess();})["catch"](function (t) {a.calibrator.isFunction(e.onFailed) && e.onFailed(t);});} }, { key: "history", value: function value(e) {this.validateOptions();var t = (0, o["default"])(e, { friendId: e.userId });l.history(t).then(function (t) {a.calibrator.isFunction(e.onSuccess) && e.onSuccess(t);})["catch"](function (t) {a.calibrator.isFunction(e.onFailed) && e.onFailed(t);});} }, { key: "upload", value: function value(e) {this.validateOptions(), l.upload(e.file, e.name, e.onProgress).then(function (t) {a.calibrator.isFunction(e.onSuccess) && e.onSuccess(t);})["catch"](function (t) {a.calibrator.isFunction(e.onFailed) && e.onFailed(t);});} }, { key: "sendMessage", value: function value(e) {this.validateOptions(), l.sendMessage(e.message).then(function (t) {a.calibrator.isFunction(e.onSuccess) && e.onSuccess(t);})["catch"](function (t) {a.calibrator.isFunction(e.onFailed) && e.onFailed(t);});} }, { key: "markGroupMessageAsRead", value: function value(e) {this.validateOptions(), l.groupMarkAsRead(e.groupId, e.timestamp).then(function (t) {a.calibrator.isFunction(e.onSuccess) && e.onSuccess(t);})["catch"](function (t) {a.calibrator.isFunction(e.onFailed) && e.onFailed(t);});} }, { key: "markPrivateMessageAsRead", value: function value(e) {this.validateOptions(), l.privateMarkAsRead(e.userId, e.timestamp).then(function (t) {a.calibrator.isFunction(e.onSuccess) && e.onSuccess();})["catch"](function (t) {a.calibrator.isFunction(e.onFailed) && e.onFailed(t);});} }, { key: "topPrivateConversation", value: function value(e) {this.validateOptions(), l.topPrivateConversation(e.userId, e.top).then(function (t) {a.calibrator.isFunction(e.onSuccess) && e.onSuccess();})["catch"](function (t) {a.calibrator.isFunction(e.onFailed) && e.onFailed(t);});} }, { key: "topGroupConversation", value: function value(e) {this.validateOptions(), l.topGroupConversation(e.groupId, e.top).then(function (t) {a.calibrator.isFunction(e.onSuccess) && e.onSuccess();})["catch"](function (t) {a.calibrator.isFunction(e.onFailed) && e.onFailed(t);});} }, { key: "subscribeUserPresence", value: function value(e) {this.validateOptions(), l.subscribeUserPresence(e.userIds).then(function (t) {a.calibrator.isFunction(e.onSuccess) && e.onSuccess(t);})["catch"](function (t) {a.calibrator.isFunction(e.onFailed) && e.onFailed(t);});} }, { key: "unsubscribeUserPresence", value: function value(e) {this.validateOptions(), l.unsubscribeUserPresence(e.userId).then(function (t) {a.calibrator.isFunction(e.onSuccess) && e.onSuccess(t);})["catch"](function (t) {a.calibrator.isFunction(e.onFailed) && e.onFailed(t);});} }, { key: "hereNow", value: function value(e) {this.validateOptions(), l.hereNow(e).then(function (t) {a.calibrator.isFunction(e.onSuccess) && e.onSuccess(t);})["catch"](function (t) {a.calibrator.isFunction(e.onFailed) && e.onFailed(t);});} }, { key: "subscribeGroup", value: function value(e) {this.validateOptions(), l.subscribeGroup(e.groupIds).then(function (t) {a.calibrator.isFunction(e.onSuccess) && e.onSuccess(t);})["catch"](function (t) {a.calibrator.isFunction(e.onFailed) && e.onFailed(t);});} }, { key: "unsubscribeGroup", value: function value(e) {this.validateOptions(), l.unsubscribeGroup(e.groupId).then(function (t) {a.calibrator.isFunction(e.onSuccess) && e.onSuccess(t);})["catch"](function (t) {a.calibrator.isFunction(e.onFailed) && e.onFailed(t);});} }, { key: "subscribeGroupPresence", value: function value(e) {this.validateOptions(), l.subscribeGroupPresence(e.groupIds).then(function (t) {a.calibrator.isFunction(e.onSuccess) && e.onSuccess(t);})["catch"](function (t) {a.calibrator.isFunction(e.onFailed) && e.onFailed(t);});} }, { key: "unsubscribeGroupPresence", value: function value(e) {this.validateOptions(), l.unsubscribeGroupPresence(e.groupId).then(function (t) {a.calibrator.isFunction(e.onSuccess) && e.onSuccess(t);})["catch"](function (t) {a.calibrator.isFunction(e.onFailed) && e.onFailed(t);});} }, { key: "groupHereNow", value: function value(e) {this.validateOptions(), l.groupHereNow(e.groupId).then(function (t) {a.calibrator.isFunction(e.onSuccess) && e.onSuccess(t);})["catch"](function (t) {a.calibrator.isFunction(e.onFailed) && e.onFailed(t);});} }, { key: "groupOnlineCount", value: function value(e) {this.validateOptions(), l.groupOnlineCount(e.groupId).then(function (t) {a.calibrator.isFunction(e.onSuccess) && e.onSuccess(t);})["catch"](function (t) {a.calibrator.isFunction(e.onFailed) && e.onFailed(t);});} }]), e;}();t["default"] = f;}, function (e, t, n) {n(173), e.exports = n(7).Object.assign;}, function (e, t, n) {var o = n(16);o(o.S + o.F, "Object", { assign: n(174) });}, function (e, t, n) {"use strict";var o = n(18),i = n(31),r = n(64),s = n(38),a = n(40),u = n(81),c = Object.assign;e.exports = !c || n(30)(function () {var e = {},t = {},n = Symbol(),o = "abcdefghijklmnopqrst";return e[n] = 7, o.split("").forEach(function (e) {t[e] = e;}), 7 != c({}, e)[n] || Object.keys(c({}, t)).join("") != o;}) ? function (e, t) {for (var n = a(e), c = arguments.length, l = 1, f = r.f, d = s.f; c > l;) {for (var p, h = u(arguments[l++]), y = f ? i(h).concat(f(h)) : i(h), v = y.length, m = 0; v > m;) {p = y[m++], o && !d.call(h, p) || (n[p] = h[p]);}}return n;} : c;}, function (e, t, n) {n(91), n(84), n(89), n(176), n(188), n(189), e.exports = n(7).Promise;}, function (e, t, n) {"use strict";var o,i,r,s,a = n(37),u = n(13),c = n(35),l = n(95),f = n(16),d = n(23),p = n(44),h = n(177),y = n(178),v = n(96),m = n(97).set,g = n(183)(),b = n(68),_ = n(98),k = n(184),C = n(99),w = u.TypeError,E = u.process,S = E && E.versions,O = S && S.v8 || "",_T = u.Promise,F = "process" == l(E),M = function M() {},P = i = b.f,I = !!function () {try {var e = _T.resolve(1),t = (e.constructor = {})[n(14)("species")] = function (e) {e(M, M);};return (F || "function" == typeof PromiseRejectionEvent) && e.then(M) instanceof t && 0 !== O.indexOf("6.6") && -1 === k.indexOf("Chrome/66");} catch (o) {}}(),N = function N(e) {var t;return !(!d(e) || "function" != typeof (t = e.then)) && t;},x = function x(e, t) {if (!e._n) {e._n = !0;var n = e._c;g(function () {for (var o = e._v, i = 1 == e._s, r = 0, s = function s(t) {var n,r,s,a = i ? t.ok : t.fail,u = t.resolve,c = t.reject,l = t.domain;try {a ? (i || (2 == e._h && j(e), e._h = 1), !0 === a ? n = o : (l && l.enter(), n = a(o), l && (l.exit(), s = !0)), n === t.promise ? c(w("Promise-chain cycle")) : (r = N(n)) ? r.call(n, u, c) : u(n)) : c(o);} catch (f) {l && !s && l.exit(), c(f);}}; n.length > r;) {s(n[r++]);}e._c = [], e._n = !1, t && !e._h && R(e);});}},R = function R(e) {m.call(u, function () {var t,n,o,i = e._v,r = A(e);if (r && (t = _(function () {F ? E.emit("unhandledRejection", i, e) : (n = u.onunhandledrejection) ? n({ promise: e, reason: i }) : (o = u.console) && o.error && o.error("Unhandled promise rejection", i);}), e._h = F || A(e) ? 2 : 1), e._a = undefined, r && t.e) throw t.v;});},A = function A(e) {return 1 !== e._h && 0 === (e._a || e._c).length;},j = function j(e) {m.call(u, function () {var t;F ? E.emit("rejectionHandled", e) : (t = u.onrejectionhandled) && t({ promise: e, reason: e._v });});},D = function D(e) {var t = this;t._d || (t._d = !0, (t = t._w || t)._v = e, t._s = 2, t._a || (t._a = t._c.slice()), x(t, !0));},U = function U(e) {var t,n = this;if (!n._d) {n._d = !0, n = n._w || n;try {if (n === e) throw w("Promise can't be resolved itself");(t = N(e)) ? g(function () {var o = { _w: n, _d: !1 };try {t.call(e, c(U, o, 1), c(D, o, 1));} catch (i) {D.call(o, i);}}) : (n._v = e, n._s = 1, x(n, !1));} catch (o) {D.call({ _w: n, _d: !1 }, o);}}};I || (_T = function T(e) {h(this, _T, "Promise", "_h"), p(e), o.call(this);try {e(c(U, this, 1), c(D, this, 1));} catch (t) {D.call(this, t);}}, (o = function o(e) {this._c = [], this._a = undefined, this._s = 0, this._d = !1, this._v = undefined, this._h = 0, this._n = !1;}).prototype = n(185)(_T.prototype, { then: function then(e, t) {var n = P(v(this, _T));return n.ok = "function" != typeof e || e, n.fail = "function" == typeof t && t, n.domain = F ? E.domain : undefined, this._c.push(n), this._a && this._a.push(n), this._s && x(this, !1), n.promise;}, "catch": function _catch(e) {return this.then(undefined, e);} }), r = function r() {var e = new o();this.promise = e, this.resolve = c(U, e, 1), this.reject = c(D, e, 1);}, b.f = P = function P(e) {return e === _T || e === s ? new r(e) : i(e);}), f(f.G + f.W + f.F * !I, { Promise: _T }), n(47)(_T, "Promise"), n(186)("Promise"), s = n(7).Promise, f(f.S + f.F * !I, "Promise", { reject: function reject(e) {var t = P(this);return (0, t.reject)(e), t.promise;} }), f(f.S + f.F * (a || !I), "Promise", { resolve: function resolve(e) {return C(a && this === s ? _T : this, e);} }), f(f.S + f.F * !(I && n(187)(function (e) {_T.all(e)["catch"](M);})), "Promise", { all: function all(e) {var t = this,n = P(t),o = n.resolve,i = n.reject,r = _(function () {var n = [],r = 0,s = 1;y(e, !1, function (e) {var a = r++,u = !1;n.push(undefined), s++, t.resolve(e).then(function (e) {u || (u = !0, n[a] = e, --s || o(n));}, i);}), --s || o(n);});return r.e && i(r.v), n.promise;}, race: function race(e) {var t = this,n = P(t),o = n.reject,i = _(function () {y(e, !1, function (e) {t.resolve(e).then(n.resolve, o);});});return i.e && o(i.v), n.promise;} });}, function (e, t) {e.exports = function (e, t, n, o) {if (!(e instanceof t) || o !== undefined && o in e) throw TypeError(n + ": incorrect invocation!");return e;};}, function (e, t, n) {var o = n(35),i = n(179),r = n(180),s = n(19),a = n(82),u = n(181),c = {},l = {};(t = e.exports = function (e, t, n, f, d) {var p,h,y,v,m = d ? function () {return e;} : u(e),g = o(n, f, t ? 2 : 1),b = 0;if ("function" != typeof m) throw TypeError(e + " is not iterable!");if (r(m)) {for (p = a(e.length); p > b; b++) {if ((v = t ? g(s(h = e[b])[0], h[1]) : g(e[b])) === c || v === l) return v;}} else for (y = m.call(e); !(h = y.next()).done;) {if ((v = i(y, g, h.value, t)) === c || v === l) return v;}}).BREAK = c, t.RETURN = l;}, function (e, t, n) {var o = n(19);e.exports = function (e, t, n, i) {try {return i ? t(o(n)[0], n[1]) : t(n);} catch (s) {var r = e["return"];throw r !== undefined && o(r.call(e)), s;}};}, function (e, t, n) {var o = n(39),i = n(14)("iterator"),r = Array.prototype;e.exports = function (e) {return e !== undefined && (o.Array === e || r[i] === e);};}, function (e, t, n) {var o = n(95),i = n(14)("iterator"),r = n(39);e.exports = n(7).getIteratorMethod = function (e) {if (e != undefined) return e[i] || e["@@iterator"] || r[o(e)];};}, function (e, t) {e.exports = function (e, t, n) {var o = n === undefined;switch (t.length) {case 0:return o ? e() : e.call(n);case 1:return o ? e(t[0]) : e.call(n, t[0]);case 2:return o ? e(t[0], t[1]) : e.call(n, t[0], t[1]);case 3:return o ? e(t[0], t[1], t[2]) : e.call(n, t[0], t[1], t[2]);case 4:return o ? e(t[0], t[1], t[2], t[3]) : e.call(n, t[0], t[1], t[2], t[3]);}return e.apply(n, t);};}, function (e, t, n) {var o = n(13),i = n(97).set,r = o.MutationObserver || o.WebKitMutationObserver,s = o.process,a = o.Promise,u = "process" == n(36)(s);e.exports = function () {var e,t,n,c = function c() {var o, i;for (u && (o = s.domain) && o.exit(); e;) {i = e.fn, e = e.next;try {i();} catch (r) {throw e ? n() : t = undefined, r;}}t = undefined, o && o.enter();};if (u) n = function n() {s.nextTick(c);};else if (!r || o.navigator && o.navigator.standalone) {if (a && a.resolve) {var l = a.resolve(undefined);n = function n() {l.then(c);};} else n = function n() {i.call(o, c);};} else {var f = !0,d = document.createTextNode("");new r(c).observe(d, { characterData: !0 }), n = function n() {d.data = f = !f;};}return function (o) {var i = { fn: o, next: undefined };t && (t.next = i), e || (e = i, n()), t = i;};};}, function (e, t, n) {var o = n(13).navigator;e.exports = o && o.userAgent || "";}, function (e, t, n) {var o = n(26);e.exports = function (e, t, n) {for (var i in t) {n && e[i] ? e[i] = t[i] : o(e, i, t[i]);}return e;};}, function (e, t, n) {"use strict";var o = n(13),i = n(7),r = n(22),s = n(18),a = n(14)("species");e.exports = function (e) {var t = "function" == typeof i[e] ? i[e] : o[e];s && t && !t[a] && r.f(t, a, { configurable: !0, get: function get() {return this;} });};}, function (e, t, n) {var o = n(14)("iterator"),i = !1;try {var r = [7][o]();r["return"] = function () {i = !0;}, Array.from(r, function () {throw 2;});} catch (s) {}e.exports = function (e, t) {if (!t && !i) return !1;var n = !1;try {var r = [7],a = r[o]();a.next = function () {return { done: n = !0 };}, r[o] = function () {return a;}, e(r);} catch (s) {}return n;};}, function (e, t, n) {"use strict";var o = n(16),i = n(7),r = n(13),s = n(96),a = n(99);o(o.P + o.R, "Promise", { "finally": function _finally(e) {var t = s(this, i.Promise || r.Promise),n = "function" == typeof e;return this.then(n ? function (n) {return a(t, e()).then(function () {return n;});} : e, n ? function (n) {return a(t, e()).then(function () {throw n;});} : e);} });}, function (e, t, n) {"use strict";var o = n(16),i = n(68),r = n(98);o(o.S, "Promise", { "try": function _try(e) {var t = i.f(this),n = r(e);return (n.e ? t.reject : t.resolve)(n.v), t.promise;} });}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.eventCenter = undefined;var o = u(n(21)),i = u(n(0)),r = u(n(1)),s = n(100),a = n(2);function u(e) {return e && e.__esModule ? e : { "default": e };}var c = new (function () {function e() {(0, i["default"])(this, e), this.subs = null, this.subs = (0, o["default"])(null);}return (0, r["default"])(e, [{ key: "on", value: function value(e, t) {if (!a.calibrator.isString(e)) throw Error("eventType require a string.");if (!a.calibrator.isDef(s.ImEventType[e])) throw Error("event not found.");if (!a.calibrator.isFunction(t)) throw Error("event require a callback.");this.subs[e] = t;} }, { key: "notify", value: function value(e, t) {var n = this.subs[e];n && n(t);} }]), e;}())();t.eventCenter = c;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.Conversations = undefined;var o = g(n(6)),i = g(n(94)),r = g(n(0)),s = g(n(1)),a = n(101),u = g(n(42)),c = n(29),l = n(69),f = g(n(10)),d = g(n(8)),p = n(32),h = n(11),y = n(2),v = g(n(48)),m = g(n(49));function g(e) {return e && e.__esModule ? e : { "default": e };}t.Conversations = function () {function e(t) {(0, r["default"])(this, e), this.im = null, this.list = [], this.synchronized = !1, this.im = t, t._iMReceiver.addIMMessageObserver(this.updateByInMessage.bind(this));}return (0, s["default"])(e, [{ key: "onUpdated", value: function value() {var e = this;this.latestConversations().then(function () {e.im._event.notify(c.ImEventType.CONVERSATIONS_UPDATED, { unreadTotal: e.getUnreadTotal(e.list), conversations: e.list.slice(0) });});} }, { key: "latestConversations", value: function value() {return this.synchronized ? this.loadLocalConversations() : this.loadServerConversations();} }, { key: "updateByInMessage", value: function value(e) {var t = this,n = null;n = e.t == l.ConversationType.GROUP ? e.r : u["default"].userId == e.r ? e.s : e.r;var o = this.list.findIndex(function (t) {return e.t == l.ConversationType.GROUP && n == t.groupId || e.t == l.ConversationType.PRIVATE && n == t.userId;}),i = void 0;function r(e) {e.type === l.ConversationType.PRIVATE && (u["default"].userId === e.lastMessage.senderId ? e.lastMessage.senderData = u["default"].userData : e.lastMessage.senderData = e.data);}o > -1 ? (i = this.list[o], this.list.splice(o, 1), i.lc < e.ts && (i.lastMessage = v["default"].assemble(e), i.lm = e.ts), u["default"].userId != e.senderId && (i.unread += 1), r(i), this.insertOne(i), this.onUpdated()) : (i = a.Conversion.buildByInMessage(e), u["default"].userId != e.senderId && (i.unread += 1), this.insertOne(i), this.im._dataCache.loadData(n, e.t).then(function (e) {i.data = e, r(i), t.onUpdated();})["catch"](function (t) {e.t;}));} }, { key: "updateByOutMessage", value: function value(e, t, n, o) {var r = {};(0, i["default"])(r, e), delete r.file;var s = this.list.findIndex(function (e) {return e.type == l.ConversationType.GROUP && n == e.groupId || e.type == l.ConversationType.PRIVATE && n == e.userId;}),c = void 0;s > -1 ? (c = this.list[s], this.list.splice(s, 1), c.unread = 0, c.lc = c.lm, c.lastMessage = r, e.status === m["default"].success && (c.lc = e.timestamp, c.lm = e.timestamp)) : c = a.Conversion.buildByOutMessage(r, t, n, o), c.data = o;var f = this.im._dataCache;t === l.ConversationType.GROUP ? f.putGroupData(c.groupId, o) : (f.putUserData(c.userId, o), c.lastMessage.senderData = u["default"].userData), this.insertOne(c), this.onUpdated();} }, { key: "imLastConversations", value: function value(e, t) {var n = new f["default"]({ name: h.EmitType.imLastConversations, params: {}, permission: d["default"].READ, singleTimeout: p.SocketTimeout.commonQuerySingle, totalTimeout: p.SocketTimeout.commonQueryTotal, fail: t, success: e });this.im._goEasySocket.emit(n);} }, { key: "loadServerConversations", value: function value() {var e = this,t = this.im;return new o["default"](function (n, o) {e.imLastConversations(function (i) {if (200 == i.code) {for (var r = i.content, s = function s(n, o) {var i = r[n],s = e.list.find(function (e) {return i.t == l.ConversationType.GROUP && i.g == e.groupId || i.t == l.ConversationType.PRIVATE && i.uid == e.userId;});y.calibrator.isDef(s) ? s.top = i.top : (s = a.Conversion.buildByConversation(t._dataCache, i), e.insertOne(s));}, u = 0, c = r.length; u < c; u++) {s(u);}e.synchronized = !0, n({ code: 200, content: { unreadTotal: e.getUnreadTotal(e.list), conversations: e.list.slice(0) } });} else o(i);}, function (e) {o({ code: e.resultCode, content: e.content });});});} }, { key: "loadLocalConversations", value: function value() {var e = this,t = [];return this.list.map(function (n) {if (!n.data) {var o = "private" == n.t ? n.userId : n.groupId,i = e.im._dataCache.loadData(o, n.t);i.then(function (e) {n.data = e;})["catch"](function (e) {n.type;}), t.push(i);}}), 0 != t.length ? new o["default"](function (n, i) {o["default"].all(t).then(function () {n({ code: 200, content: { unreadTotal: e.getUnreadTotal(e.list), conversations: e.list.slice(0) } });})["catch"](function (e) {i({ code: 408, content: e.message });});}) : o["default"].resolve({ code: 200, content: { unreadTotal: this.getUnreadTotal(this.list), conversations: this.list } });} }, { key: "privateMarkAsRead", value: function value(e) {var t = this.list.find(function (t) {return t.userId == e;}),n = { friendId: e };return this.markAsRead(n, t);} }, { key: "groupMarkAsRead", value: function value(e) {var t = this.list.find(function (t) {return t.groupId === e;}),n = { groupId: e };return this.markAsRead(n, t);} }, { key: "markAsRead", value: function value(e, t) {var n = this;if (!t || t.unread <= 0) return o["default"].resolve({ code: 200, content: "OK" });var i = t.lm;return t.mt = i, e.lastTimestamp = i, e.lastConsumedTimestamp = t.lc, new o["default"](function (o, r) {var s = t.type == l.ConversationType.PRIVATE ? h.EmitType.markPrivateMessageAsRead : h.EmitType.markGroupMessageAsRead;n.requestEmit(s, e, function (e) {200 == e.code ? (i === t.mt && n.resetConversation(t, t.lm, e.content.amount), o({ code: 200, content: "OK" })) : r(e);}, function (e) {r(e || { code: e.code || 408, content: e.content || "Failed to query message" });});});} }, { key: "resetConversation", value: function value(e, t, n) {t <= e.lc || (e.unread -= n, e.lc = t, this.onUpdated());} }, { key: "getUnreadTotal", value: function value(e) {for (var t = 0, n = 0, o = e.length; n < o; n++) {t += e[n].unread;}return t;} }, { key: "insertOne", value: function value(e) {var t = this.getPosIndex(e);this.list.splice(t + 1, 0, e);} }, { key: "getPosIndex", value: function value(e) {if (0 == this.list.length) return -1;for (var t, n, o = 0, i = this.list.length; i - o > 1;) {t = Math.floor((o + i) / 2), n = this.list[t];var r = this.compares(e, n);if (0 == r) return t;r > 0 ? o = t : i = t;}return 0 == o && this.compares(this.list[0], e) > 0 ? -1 : o;} }, { key: "compares", value: function value(e, t) {var n = void 0;return (n = e.top == t.top ? t.lastMessage.timestamp - e.lastMessage.timestamp : e.top ? -1 : 1) > 0 ? 1 : 0 === n ? 0 : -1;} }, { key: "removeConversation", value: function value(e, t) {var n = this,i = t == l.ConversationType.PRIVATE ? "userId" : "groupId";return y.calibrator.isStringOrNumber(e) ? (y.calibrator.isNumber(e) && (e = e.toString()), -1 == this.findConversationIndex(t, e) ? o["default"].reject({ code: 400, content: "Failed to remove conversation, " + i + " does not exists." }) : new o["default"](function (o, i) {var r = { targetId: e, type: t };n.requestEmit(h.EmitType.removeConversation, r, function (r) {var s = n.findConversationIndex(t, e);s > -1 && n.list.splice(s, 1), n.onUpdated(), 200 == r.code ? o({}) : i({ code: r.code || 408, content: r.content || "Failed to remove conversation" });}, function (e) {i({ code: e.code || 408, content: e.content || "Failed to remove conversation" });});})) : o["default"].reject({ code: 400, content: "Failed to remove conversation, " + i + " must be  a string or integer." });} }, { key: "topConversation", value: function value(e, t, n) {var i = this,r = n == l.ConversationType.PRIVATE ? "userId" : "groupId";if (!y.calibrator.isStringOrNumber(e)) return o["default"].reject({ code: 400, content: "Failed to top conversation, " + r + " must be a string or integer." });y.calibrator.isNumber(e) && (e = e.toString());var s = this.findConversationIndex(n, e);return -1 == s || this.list[s].top == t ? o["default"].reject({ code: 400, content: "Failed to top conversation, " + r + " does not exists." }) : new o["default"](function (o, r) {var s = { targetId: e, top: t, type: n };i.requestEmit(h.EmitType.topConversation, s, function () {var r = i.findConversationIndex(n, e),s = i.list[r];s.top = t, i.list.splice(r, 1), i.insertOne(s), i.onUpdated(), o({});}, function (e) {r({ code: e.code || 408, content: e.content || "Failed to top Conversation" });});});} }, { key: "requestEmit", value: function value(e, t, n, o) {var i = new f["default"]({ name: e, params: t, permission: d["default"].WRITE, singleTimeout: p.SocketTimeout.commonRequestSingle, totalTimeout: p.SocketTimeout.commonRequestTotal, success: n, fail: o });this.im._goEasySocket.emit(i);} }, { key: "findConversationIndex", value: function value(e, t) {return this.list.findIndex(function (n) {return e == l.ConversationType.PRIVATE ? n.type == e && n.userId == t : n.type == e && n.groupId == t;});} }]), e;}();}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.messageCreator = undefined;var o = _(n(0)),i = _(n(1)),r = _(n(50)),s = _(n(197)),a = _(n(198)),u = _(n(199)),c = _(n(51)),l = _(n(200)),f = _(n(201)),d = _(n(202)),p = _(n(203)),h = _(n(204)),y = _(n(205)),v = _(n(102)),m = _(n(103)),g = _(n(52)),b = _(n(206));function _(e) {return e && e.__esModule ? e : { "default": e };}var k = new (function () {function e() {(0, o["default"])(this, e), this.messageTypes = { wx: { image: s["default"], file: r["default"], audio: a["default"], video: u["default"], text: m["default"] }, uniApp: { image: d["default"], file: c["default"], audio: l["default"], video: f["default"], text: m["default"] }, html: { image: p["default"], file: g["default"], audio: h["default"], video: y["default"], text: m["default"] } };}return (0, i["default"])(e, [{ key: "create", value: function value(e, t) {var n = v["default"].resolve(),o = this.messageTypes[n][e];return o ? new o(t) : new b["default"](t);} }]), e;}())();t.messageCreator = k;}, function (e, t, n) {e.exports = { "default": n(194), __esModule: !0 };}, function (e, t, n) {n(195);var o = n(7).Object;e.exports = function (e, t) {return o.getOwnPropertyDescriptor(e, t);};}, function (e, t, n) {var o = n(24),i = n(65).f;n(66)("getOwnPropertyDescriptor", function () {return function (e, t) {return i(o(e), t);};});}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.str = undefined;var o = s(n(0)),i = s(n(1)),r = n(83);function s(e) {return e && e.__esModule ? e : { "default": e };}var a = new (function () {function e() {(0, o["default"])(this, e);}return (0, i["default"])(e, [{ key: "fileExtension", value: function value(e, t) {if (r.calibrator.isString(e)) try {var n = e.split(t);return n[n.length - 1];} catch (o) {throw Error(o);}} }]), e;}())();t.str = a;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = d(n(3)),i = d(n(0)),r = d(n(1)),s = d(n(4)),a = d(n(12)),u = d(n(5)),c = d(n(50)),l = d(n(9)),f = n(17);function d(e) {return e && e.__esModule ? e : { "default": e };}var p = function (e) {function t(e) {return (0, i["default"])(this, t), (0, s["default"])(this, (t.__proto__ || (0, o["default"])(t)).call(this, e));}return (0, u["default"])(t, e), (0, r["default"])(t, [{ key: "validate", value: function value(e) {if ((0, a["default"])(t.prototype.__proto__ || (0, o["default"])(t.prototype), "validate", this).call(this, e), !f.calibrator.isDef(e.file.tempFiles) || 0 == e.file.tempFiles[0].length) throw Error("tempFiles is empty.");} }, { key: "setType", value: function value(e) {this.type = l["default"].image;} }, { key: "setFile", value: function value(e) {var t = "chooseMedia:ok" == e.errMsg ? e.tempFiles[0].tempFilePath : e.tempFiles[0].path;e.tempFiles[0].path = t, this.file = e;} }, { key: "setPayload", value: function value(e) {(0, a["default"])(t.prototype.__proto__ || (0, o["default"])(t.prototype), "setPayload", this).call(this, e);var n = this,i = e.file.tempFiles[0],r = "chooseMedia:ok" == e.file.errMsg ? i.tempFilePath : i.path;this.payload.url = r, this.payload.size = i.size, this.payload.width = "", this.payload.height = "", this.payload.contentType = "";var s = f.calibrator.isEmpty(i.name) || i.name == undefined ? r : i.name;this.payload.name = "wx-image." + f.str.fileExtension(s, "."), this.payload.contentType = "image/" + f.str.fileExtension(s, "."), wx.getImageInfo({ src: r, success: function success(e) {n.payload.width = e.width, n.payload.height = e.height;} });} }]), t;}(c["default"]);t["default"] = p;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = d(n(3)),i = d(n(0)),r = d(n(1)),s = d(n(4)),a = d(n(12)),u = d(n(5)),c = d(n(50)),l = d(n(9)),f = n(17);function d(e) {return e && e.__esModule ? e : { "default": e };}var p = function (e) {function t(e) {return (0, i["default"])(this, t), (0, s["default"])(this, (t.__proto__ || (0, o["default"])(t)).call(this, e));}return (0, u["default"])(t, e), (0, r["default"])(t, [{ key: "validate", value: function value(e) {(0, a["default"])(t.prototype.__proto__ || (0, o["default"])(t.prototype), "validate", this).call(this, e);} }, { key: "setType", value: function value(e) {this.type = l["default"].audio;} }, { key: "setPayload", value: function value(e) {(0, a["default"])(t.prototype.__proto__ || (0, o["default"])(t.prototype), "setPayload", this).call(this, e);var n = e.file.tempFilePath;this.payload.url = n, this.payload.duration = e.file.duration / 1e3, this.payload.size = e.file.fileSize;var i = f.calibrator.isEmpty(e.file.name) || e.file.name == undefined ? n : e.file.name;this.payload.contentType = "audio/" + f.str.fileExtension(i, "."), this.payload.name = "wx-audio." + f.str.fileExtension(i, ".");} }]), t;}(c["default"]);t["default"] = p;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = h(n(21)),i = h(n(3)),r = h(n(0)),s = h(n(1)),a = h(n(4)),u = h(n(12)),c = h(n(5)),l = h(n(50)),f = h(n(9)),d = n(2),p = n(17);function h(e) {return e && e.__esModule ? e : { "default": e };}var y = function (e) {function t(e) {return (0, r["default"])(this, t), (0, a["default"])(this, (t.__proto__ || (0, i["default"])(t)).call(this, e));}return (0, c["default"])(t, e), (0, s["default"])(t, [{ key: "validate", value: function value(e) {(0, u["default"])(t.prototype.__proto__ || (0, i["default"])(t.prototype), "validate", this).call(this, e);} }, { key: "setType", value: function value(e) {this.type = f["default"].video;} }, { key: "setFile", value: function value(e) {this.file = "chooseMedia:ok" == e.errMsg ? e.tempFiles[0] : e;} }, { key: "setPayload", value: function value(e) {this.payload = (0, o["default"])(null);var t = (0, o["default"])(null),n = (0, o["default"])(null),i = "chooseMedia:ok" == e.file.errMsg ? e.file.tempFiles[0] : e.file,r = i.duration,s = i.height,a = i.size,u = i.tempFilePath,c = i.thumbTempFilePath,l = i.width,f = i.name,h = f === undefined ? "" : f,y = d.calibrator.isEmpty(h) ? u : h;t.contentType = "video/" + p.str.fileExtension(y, "."), t.name = "wx-video." + p.str.fileExtension(y, "."), t.url = u, t.width = n.width = l, t.height = n.height = s, t.size = a, t.duration = r, n.url = c, n.contentType = "image/jpg", n.name = "wx-thumbnail.jpg", this.payload.video = t, this.payload.thumbnail = n;} }]), t;}(l["default"]);t["default"] = y;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = d(n(3)),i = d(n(0)),r = d(n(1)),s = d(n(4)),a = d(n(12)),u = d(n(5)),c = d(n(51)),l = d(n(9)),f = n(17);function d(e) {return e && e.__esModule ? e : { "default": e };}var p = function (e) {function t(e) {return (0, i["default"])(this, t), (0, s["default"])(this, (t.__proto__ || (0, o["default"])(t)).call(this, e));}return (0, u["default"])(t, e), (0, r["default"])(t, [{ key: "validate", value: function value(e) {(0, a["default"])(t.prototype.__proto__ || (0, o["default"])(t.prototype), "validate", this).call(this, e);} }, { key: "setType", value: function value(e) {this.type = l["default"].audio;} }, { key: "setPayload", value: function value(e) {var n = this;(0, a["default"])(t.prototype.__proto__ || (0, o["default"])(t.prototype), "setPayload", this).call(this, e);var i = this,r = e.file.tempFilePath;this.payload.url = r;var s = f.calibrator.isEmpty(e.file.name) || e.file.name == undefined ? r : e.file.name;if (this.payload.contentType = "audio/" + f.str.fileExtension(s, "."), this.payload.name = "uni-audio." + f.str.fileExtension(s, "."), f.calibrator.isDef(e.file.duration)) this.payload.duration = e.file.duration / 1e3;else {this.payload.duration = 0;var u = uni.createInnerAudioContext();u.src = r, u.onCanplay(function (e) {i.payload.duration = u.duration, u.destroy();});}uni.getFileInfo({ filePath: r, success: function success(e) {n.payload.size = e.size;} });} }]), t;}(c["default"]);t["default"] = p;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = p(n(21)),i = p(n(3)),r = p(n(0)),s = p(n(1)),a = p(n(4)),u = p(n(12)),c = p(n(5)),l = p(n(51)),f = p(n(9)),d = n(17);function p(e) {return e && e.__esModule ? e : { "default": e };}var h = function (e) {function t(e) {return (0, r["default"])(this, t), (0, a["default"])(this, (t.__proto__ || (0, i["default"])(t)).call(this, e));}return (0, c["default"])(t, e), (0, s["default"])(t, [{ key: "validate", value: function value(e) {(0, u["default"])(t.prototype.__proto__ || (0, i["default"])(t.prototype), "validate", this).call(this, e);} }, { key: "setType", value: function value(e) {this.type = f["default"].video;} }, { key: "setPayload", value: function value(e) {var t = (0, o["default"])(null),n = (0, o["default"])(null);this.payload = (0, o["default"])(null);var i = e.file,r = i.duration,s = i.height,a = i.size,u = i.tempFilePath,c = i.width,l = i.name,f = l === undefined ? "" : l,p = d.calibrator.isEmpty(f) ? u : f;t.contentType = "video/" + d.str.fileExtension(p, "."), t.name = "uni-video." + d.str.fileExtension(p, "."), t.size = a, t.duration = r, t.url = n.url = u, t.width = n.width = c, t.height = n.height = s, n.contentType = "image/jpg", n.name = "wx-thumbnail.jpg", this.payload.video = t, this.payload.thumbnail = n;} }]), t;}(l["default"]);t["default"] = h;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = d(n(3)),i = d(n(0)),r = d(n(1)),s = d(n(4)),a = d(n(12)),u = d(n(5)),c = d(n(51)),l = n(17),f = d(n(9));function d(e) {return e && e.__esModule ? e : { "default": e };}var p = function (e) {function t(e) {return (0, i["default"])(this, t), (0, s["default"])(this, (t.__proto__ || (0, o["default"])(t)).call(this, e));}return (0, u["default"])(t, e), (0, r["default"])(t, [{ key: "validate", value: function value(e) {if ((0, a["default"])(t.prototype.__proto__ || (0, o["default"])(t.prototype), "validate", this).call(this, e), !l.calibrator.isDef(e.file.tempFiles) || 0 == e.file.tempFiles[0].length) throw Error("tempFiles is empty.");} }, { key: "setType", value: function value(e) {this.type = f["default"].image;} }, { key: "setPayload", value: function value(e) {(0, a["default"])(t.prototype.__proto__ || (0, o["default"])(t.prototype), "setPayload", this).call(this, e);var n = this,i = e.file.tempFiles[0];this.payload.url = i.path, this.payload.size = i.size, this.payload.width = "", this.payload.height = "";var r = l.calibrator.isEmpty(i.name) || i.name == undefined ? i.path : i.name;this.payload.contentType = "image/" + l.str.fileExtension(r, "."), this.payload.name = "uni-image." + l.str.fileExtension(r, "."), uni.getImageInfo({ src: i.path, success: function success(e) {n.payload.width = e.width, n.payload.height = e.height;} });} }]), t;}(c["default"]);t["default"] = p;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = f(n(3)),i = f(n(0)),r = f(n(1)),s = f(n(4)),a = f(n(12)),u = f(n(5)),c = f(n(52)),l = f(n(9));function f(e) {return e && e.__esModule ? e : { "default": e };}var d = function (e) {function t(e) {return (0, i["default"])(this, t), (0, s["default"])(this, (t.__proto__ || (0, o["default"])(t)).call(this, e));}return (0, u["default"])(t, e), (0, r["default"])(t, [{ key: "validate", value: function value(e) {(0, a["default"])(t.prototype.__proto__ || (0, o["default"])(t.prototype), "validate", this).call(this, e);var n = ["gif", "jpg", "png", "jpeg"];if (!n.find(function (t) {return t == e.file.type.split("/")[1].toLowerCase();})) throw Error("Only " + n.join(",") + " is supported image.");} }, { key: "setType", value: function value(e) {this.type = l["default"].image;} }, { key: "setPayload", value: function value(e) {var n = this;(0, a["default"])(t.prototype.__proto__ || (0, o["default"])(t.prototype), "setPayload", this).call(this, e);var i = window.URL || window.webkitURL,r = new Image();r.src = i.createObjectURL(e.file), r.onload = function () {n.payload.width = r.width, n.payload.height = r.height, i.revokeObjectURL(r.src);};} }]), t;}(c["default"]);t["default"] = d;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = f(n(3)),i = f(n(0)),r = f(n(1)),s = f(n(4)),a = f(n(12)),u = f(n(5)),c = f(n(52)),l = f(n(9));function f(e) {return e && e.__esModule ? e : { "default": e };}var d = function (e) {function t(e) {return (0, i["default"])(this, t), (0, s["default"])(this, (t.__proto__ || (0, o["default"])(t)).call(this, e));}return (0, u["default"])(t, e), (0, r["default"])(t, [{ key: "validate", value: function value(e) {(0, a["default"])(t.prototype.__proto__ || (0, o["default"])(t.prototype), "validate", this).call(this, e);var n = ["mp3", "ogg", "wav", "wma", "ape", "acc", "mpeg"];if (!n.find(function (t) {return t == e.file.type.split("/")[1].toLowerCase();})) throw Error("Only " + n.join(",") + " is supported audio.");} }, { key: "setType", value: function value(e) {this.type = l["default"].audio;} }, { key: "setPayload", value: function value(e) {(0, a["default"])(t.prototype.__proto__ || (0, o["default"])(t.prototype), "setPayload", this).call(this, e);var n = this,i = window.URL || window.webkitURL,r = document.createElement("audio");r.src = i.createObjectURL(e.file), r.onloadedmetadata = function () {n.payload.duration = r.duration, i.revokeObjectURL(r.src);};} }]), t;}(c["default"]);t["default"] = d;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = d(n(21)),i = d(n(3)),r = d(n(0)),s = d(n(1)),a = d(n(4)),u = d(n(12)),c = d(n(5)),l = d(n(52)),f = d(n(9));function d(e) {return e && e.__esModule ? e : { "default": e };}var p = function (e) {function t(e) {return (0, r["default"])(this, t), (0, a["default"])(this, (t.__proto__ || (0, i["default"])(t)).call(this, e));}return (0, c["default"])(t, e), (0, s["default"])(t, [{ key: "validate", value: function value(e) {(0, u["default"])(t.prototype.__proto__ || (0, i["default"])(t.prototype), "validate", this).call(this, e);var n = ["avi", "mov", "rmvb", "rm", "flv", "mp4", "3gp", "quicktime"];if (!n.find(function (t) {return t == e.file.type.split("/")[1].toLowerCase();})) throw Error("Only " + n.join(",") + " is supported video.");} }, { key: "setType", value: function value(e) {this.type = f["default"].video;} }, { key: "setPayload", value: function value(e) {this.payload = (0, o["default"])(null);var t = (0, o["default"])(null),n = (0, o["default"])(null);t.contentType = e.file.type, t.size = e.file.size, t.duration = 0, t.url = n.url = "", t.name = e.file.name, t.width = n.width = 0, t.height = n.height = 0, n.contentType = "image/jpg", this.payload.video = t, this.payload.thumbnail = n;var i = this,r = window.URL || window.webkitURL,s = document.createElement("video"),a = r.createObjectURL(e.file);s.src = a, s.onloadedmetadata = function () {i.payload.video.duration = s.duration, i.payload.video.width = i.payload.thumbnail.width = s.videoWidth, i.payload.video.height = i.payload.thumbnail.height = s.videoHeight, i.payload.video.url = a, i.payload.thumbnail.url = function (e) {var t = document.createElement("canvas");return t.width = e.videoWidth, t.height = e.videoHeight, t.getContext("2d").drawImage(e, 0, 0, t.width, t.height), t.toDataURL("image/png");}(s), r.revokeObjectURL(s.src);};} }]), t;}(l["default"]);t["default"] = p;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = l(n(3)),i = l(n(0)),r = l(n(1)),s = l(n(4)),a = l(n(5)),u = l(n(43)),c = n(2);function l(e) {return e && e.__esModule ? e : { "default": e };}var f = function (e) {function t(e) {return (0, i["default"])(this, t), (0, s["default"])(this, (t.__proto__ || (0, o["default"])(t)).call(this, e));}return (0, a["default"])(t, e), (0, r["default"])(t, [{ key: "setType", value: function value(e) {if (!c.calibrator.isStringOrNumber(e.type)) throw Error("type require a string or number.");if (c.calibrator.isEmpty(e.type)) throw Error("type is empty.");this.type = e.type;} }, { key: "setPayload", value: function value(e) {if (c.calibrator.isEmpty(e.payload)) throw Error("payload is empty.");if (!c.calibrator.isPlainObject(e.payload) && !c.calibrator.isStringOrNumber(e.payload)) throw Error("payload require object | string | number.");this.payload = e.payload;} }]), t;}(u["default"]);t["default"] = f;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = v(n(33)),i = v(n(6)),r = v(n(0)),s = v(n(1)),a = v(n(209)),u = v(n(10)),c = n(32),l = v(n(8)),f = n(11),d = v(n(49)),p = n(25),h = v(n(43)),y = n(2);function v(e) {return e && e.__esModule ? e : { "default": e };}var m = function () {function e(t) {(0, r["default"])(this, e), this.im = null, this.bulletMessageBuilder = null, this.im = t, this.bulletMessageBuilder = new a["default"](t);}return (0, s["default"])(e, [{ key: "send", value: function value(e, t, n) {var o = this;return new i["default"](function (i, r) {t.status === d["default"]["new"] ? (t.status = d["default"].sending, o.bulletMessageBuilder.build(e, t, n).then(function (e) {var n = new u["default"]({ name: f.EmitType.publishIM, params: e, permission: l["default"].WRITE, singleTimeout: c.SocketTimeout.commonRequestSingle, totalTimeout: c.SocketTimeout.commonRequestTotal, fail: function fail(e) {t.status = d["default"].fail, r({ code: e.resultCode || 408, content: e.content || "Failed to send private message." });}, success: function success(e) {t.status = d["default"].success, 200 == e.resultCode ? i({ code: 200, content: e.content }) : r(e);} });o.im._goEasySocket.emit(n);})["catch"](function (e) {r({ code: e.code || 400, content: e.content || e });})) : r({ code: 400, content: "Please create a new message, a message can only be sent once" });});} }, { key: "sendMessage", value: function value(e) {var t = this,n = this.im;return new i["default"](function (i, r) {if (e instanceof h["default"]) {if (e.status === d["default"]["new"]) {e.status = d["default"].sending;var s = e.to;if (delete e.to, s) {if (!s.type || s.type != p.ConversationType.GROUP && s.type != p.ConversationType.PRIVATE) r({ code: 400, content: "message require property to.type" });else if (s.id) {if (s.data && y.calibrator.isFunction(s.data)) r({ code: 400, content: "to.data can not be function" });else {var a = e.notification;if (a) if (y.calibrator.isObject(a)) {if (y.calibrator.isEmpty(a.title)) return void r({ code: 400, content: "notification title is required" });if (!y.calibrator.isString(a.title)) return void r({ code: 400, content: "notification title must be string" });if (y.calibrator.isEmpty(e.notification.body)) return void r({ code: 400, content: "notification body is required" });if (!y.calibrator.isString(e.notification.body)) return void r({ code: 400, content: "notification body must be string" });} else if (y.calibrator.isPrimitive(e.notification)) return void r({ code: 400, content: "notification must be an json object" });s.data || (s.data = {}), n._conversations.updateByOutMessage(e, s.type, s.id, s.data), t.bulletMessageBuilder.build(s.id, e, s.type).then(function (t) {t.d = (0, o["default"])(s.data);var a = new u["default"]({ name: f.EmitType.publishIM, params: t, permission: l["default"].WRITE, singleTimeout: c.SocketTimeout.commonRequestSingle, totalTimeout: c.SocketTimeout.commonRequestTotal, fail: function fail(t) {e.status = d["default"].fail, r({ code: t.resultCode || 408, content: t.content || "Failed to send private message." });}, success: function success(t) {e.status = d["default"].success, e.timestamp = t.content.timestamp, i(e), n._conversations.updateByOutMessage(e, s.type, s.id, s.data);} });n._goEasySocket.emit(a);})["catch"](function (t) {e.status = d["default"].fail, r({ code: t.code || 400, content: t.content || t });});}} else r({ code: 400, content: "message require property to.id" });} else r({ code: 400, content: "message require property to." });} else r({ code: 400, content: "Please create a new message, a message can only be sent once" });} else r({ code: 400, content: "it is invalid message" });});} }]), e;}();t["default"] = m;}, function (e, t, n) {var o = n(7),i = o.JSON || (o.JSON = { stringify: JSON.stringify });e.exports = function (e) {return i.stringify.apply(i, arguments);};}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = c(n(33)),i = c(n(6)),r = c(n(0)),s = c(n(1)),a = c(n(210)),u = c(n(211));c(n(9));function c(e) {return e && e.__esModule ? e : { "default": e };}var l = function () {function e(t) {(0, r["default"])(this, e), this.im = null, this.im = t;}return (0, s["default"])(e, [{ key: "build", value: function value(e, t, n) {var r = this;return new i["default"](function (i, s) {var c = new a["default"]({ to: e, message: t, conversationType: n }),l = t.type;new u["default"](l, r.im).build(t).then(function (e) {c.p = (0, o["default"])(e), i(c);})["catch"](function (e) {s(e);});});} }]), e;}();t["default"] = l;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = f(n(33)),i = f(n(0)),r = f(n(1)),s = n(17),a = f(n(43)),u = f(n(103)),c = f(n(9)),l = f(n(42));function f(e) {return e && e.__esModule ? e : { "default": e };}var d = function () {function e(t) {(0, i["default"])(this, e), this.mt = null, this.to = null, this.p = null, this.t = null, this.guid = null, this.nt = null, this.validate(t.to, t.message), this.mt = t.message.type, this.to = t.to, this.t = t.conversationType, this.guid = t.message.messageId, this.p = t.message.payload, this.nt = t.message.notification;}return (0, r["default"])(e, [{ key: "validate", value: function value(e, t) {if (!(t instanceof a["default"])) throw Error("createMessage first.");if (s.calibrator.isEmpty(e)) throw Error("userId is empty.");if (!s.calibrator.isStringOrNumber(e)) throw Error("userId should be a string or number.");if (l["default"].userId == e) throw Error("userId can not be the same as your id.");if (t.type == c["default"].text) {if (!(t instanceof u["default"])) throw Error("it is not textMessage");if ((0, o["default"])(t.payload).length > 3072) throw Error("message-length limit 3kb");}} }]), e;}();t["default"] = d;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = u(n(0)),i = n(212),r = u(n(213)),s = u(n(105)),a = u(n(9));function u(e) {return e && e.__esModule ? e : { "default": e };}t["default"] = function c(e, t) {return (0, o["default"])(this, c), e == a["default"].video ? new r["default"](t) : e == a["default"].audio || e == a["default"].image || e == a["default"].file ? new s["default"](t) : i.simplePayloadBuilder;};}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.simplePayloadBuilder = undefined;var o = c(n(6)),i = c(n(3)),r = c(n(0)),s = c(n(1)),a = c(n(4)),u = c(n(5));function c(e) {return e && e.__esModule ? e : { "default": e };}var l = new (function (e) {function t() {return (0, r["default"])(this, t), (0, a["default"])(this, (t.__proto__ || (0, i["default"])(t)).call(this));}return (0, u["default"])(t, e), (0, s["default"])(t, [{ key: "build", value: function value(e) {return new o["default"](function (t, n) {try {t(e.payload);} catch (o) {n(o);}});} }]), t;}(c(n(104))["default"]))();t.simplePayloadBuilder = l;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = f(n(6)),i = f(n(3)),r = f(n(0)),s = f(n(1)),a = f(n(4)),u = f(n(5)),c = f(n(105)),l = f(n(106));function f(e) {return e && e.__esModule ? e : { "default": e };}var d = function (e) {function t(e) {return (0, r["default"])(this, t), (0, a["default"])(this, (t.__proto__ || (0, i["default"])(t)).call(this, e));}return (0, u["default"])(t, e), (0, s["default"])(t, [{ key: "build", value: function value(e) {var t = this;return new o["default"](function (n, o) {var i = new l["default"]();t.upload(e).then(function (t) {var o = t.content;undefined;i = e.payload;var r = "?x-oss-process=video/snapshot,t_0000,f_jpg,w_" + e.payload.video.width + ",m_fast,ar_auto";i.video.url = t.content.url, i.thumbnail.url = t.content.url + r, i.video.name = t.content.newFileName, n(i);})["catch"](function (e) {o(e);});});} }]), t;}(c["default"]);t["default"] = d;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.fileUploader = undefined;var o = c(n(0)),i = c(n(1)),r = c(n(102)),s = n(215),a = n(216),u = n(217);function c(e) {return e && e.__esModule ? e : { "default": e };}var l = function () {function e() {(0, o["default"])(this, e), this.uploader = { uniApp: s.uniAppFileUploader, wx: a.wxFileUploader, html: u.htmlFileUploader };}return (0, i["default"])(e, [{ key: "upload", value: function value(e, t) {var n = r["default"].resolve();return this.uploader[n].upload(e, t);} }]), e;}();t["default"] = l;var f = new l();t.fileUploader = f;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.uniAppFileUploader = undefined;var o = c(n(6)),i = c(n(3)),r = c(n(0)),s = c(n(1)),a = c(n(4)),u = c(n(5));function c(e) {return e && e.__esModule ? e : { "default": e };}var l = new (function (e) {function t() {return (0, r["default"])(this, t), (0, a["default"])(this, (t.__proto__ || (0, i["default"])(t)).call(this));}return (0, u["default"])(t, e), (0, s["default"])(t, [{ key: "upload", value: function value(e, t) {var n = this;try {return new o["default"](function (o, i) {uni.uploadFile({ url: e.host, filePath: n.getTempFilePath(e), name: "file", formData: e.parameters, success: function success(t) {if (200 === t.statusCode) {var n = e.payload;n.message = t.errMsg, o({ code: 200, content: n });} else i({ code: t.statusCode, content: t.errMsg });}, fail: function fail(e) {i({ code: 500, content: e.errMsg });} }).onProgressUpdate(function (e) {t && t(e);});});} catch (i) {return new o["default"](function (e, t) {t({ code: 500, content: i });});}} }, { key: "getTempFilePath", value: function value(e) {var t = e.file || e.fileRes;return Array.isArray(t.tempFiles) ? t.tempFiles[0].path : t.tempFilePath;} }]), t;}(c(n(71))["default"]))();t.uniAppFileUploader = l;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.wxFileUploader = undefined;var o = c(n(6)),i = c(n(3)),r = c(n(0)),s = c(n(1)),a = c(n(4)),u = c(n(5));function c(e) {return e && e.__esModule ? e : { "default": e };}var l = new (function (e) {function t() {return (0, r["default"])(this, t), (0, a["default"])(this, (t.__proto__ || (0, i["default"])(t)).apply(this, arguments));}return (0, u["default"])(t, e), (0, s["default"])(t, [{ key: "upload", value: function value(e, t) {var n = this;try {return new o["default"](function (o, i) {wx.uploadFile({ url: e.host, filePath: n.getTempFilePath(e), name: "file", formData: e.parameters, success: function success(t) {if (200 === t.statusCode) {var n = e.payload;n.message = t.errMsg, o({ code: 200, content: n });} else i({ code: t.statusCode, content: t.errMsg });}, fail: function fail(e) {i({ code: 500, content: e.errMsg });} }).onProgressUpdate(function (e) {t && t(e);});});} catch (i) {return new o["default"](function (e, t) {t({ code: 500, content: i });});}} }, { key: "getTempFilePath", value: function value(e) {var t = e.file || e.fileRes;return Array.isArray(t.tempFiles) ? t.tempFiles[0].path : t.tempFilePath;} }]), t;}(c(n(71))["default"]))();t.wxFileUploader = l;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.htmlFileUploader = undefined;var o = c(n(6)),i = c(n(3)),r = c(n(0)),s = c(n(1)),a = c(n(4)),u = c(n(5));function c(e) {return e && e.__esModule ? e : { "default": e };}var l = new (function (e) {function t() {return (0, r["default"])(this, t), (0, a["default"])(this, (t.__proto__ || (0, i["default"])(t)).call(this));}return (0, u["default"])(t, e), (0, s["default"])(t, [{ key: "upload", value: function value(e, t) {try {return new o["default"](function (n, o) {var i = new XMLHttpRequest();for (var r in i.open("post", e.host, !0), e.headers) {i.setRequestHeader(r, e.headers[r]);}i.upload.onprogress = function (e) {t && t(e);}, i.upload.onloadstart = function (e) {t && t(e);}, i.upload.onloadend = function (e) {t && t(e);};var s = new FormData();for (var a in e.parameters) {"fileRes" == a ? s.append("file", e.parameters[a]) : s.append(a, e.parameters[a]);}i.send(s), i.onreadystatechange = function () {if (4 == i.readyState) if (i.status >= 200 && i.status < 300 || 304 == i.status) {var t = e.payload;t.message = i.responseText, n({ code: 200, content: t });} else o({ code: i.status, content: i.responseText });};});} catch (n) {return new o["default"](function (e, t) {t({ code: 500, content: n });});}} }]), t;}(c(n(71))["default"]))();t.htmlFileUploader = l;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = u(n(6)),i = u(n(0)),r = u(n(1)),s = u(n(219)),a = u(n(223));function u(e) {return e && e.__esModule ? e : { "default": e };}var c = function () {function e(t) {(0, i["default"])(this, e), this.uploadTokenResolver = null, this.uploadTokenResolver = new a["default"](t);}return (0, r["default"])(e, [{ key: "build", value: function value(e, t, n) {var i = this;return new o["default"](function (o, r) {i.uploadTokenResolver.resolve(t).then(function (t) {var i = t.content;o(new s["default"](i.vendor).build(i, e, n));})["catch"](function (e) {r(e);});});} }]), e;}();t["default"] = c;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o,i = n(0),r = (o = i) && o.__esModule ? o : { "default": o },s = n(220),a = n(221),u = n(222);t["default"] = function c(e) {return (0, r["default"])(this, c), e == s.OssType.aliYun ? a.aliYunOSSRequestBuilder : u.qiNiuYunOSSRequestBuilder;};}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });t.OssType = { aliYun: "ALI", qiNiu: "QN" };}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.aliYunOSSRequestBuilder = undefined;var o = f(n(3)),i = f(n(0)),r = f(n(1)),s = f(n(4)),a = f(n(5)),u = f(n(108)),c = f(n(109)),l = f(n(9));function f(e) {return e && e.__esModule ? e : { "default": e };}var d = function (e) {function t() {return (0, i["default"])(this, t), (0, s["default"])(this, (t.__proto__ || (0, o["default"])(t)).call(this));}return (0, a["default"])(t, e), (0, r["default"])(t, [{ key: "url", value: function value(e) {return e.host + "/" + e.dir + "/" + this.newFileName(e);} }, { key: "build", value: function value(e, t, n) {var o = { key: e.dir + "/" + this.newFileName(e), OSSAccessKeyId: e.accessKeyId, policy: e.policy, signature: e.signature, success_action_status: "200", fileRes: t };l["default"].file === n && (o = { key: e.dir + "/" + this.newFileName(e), OSSAccessKeyId: e.accessKeyId, policy: e.policy, signature: e.signature, success_action_status: "200", "Content-Disposition": "attachment;filename=" + t.name, fileRes: t });var i = { newFileName: this.newFileName(e), url: this.url(e) };return new u["default"](e.host, null, o, t, i);} }]), t;}(c["default"]);t["default"] = d;var p = new d();t.aliYunOSSRequestBuilder = p;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.qiNiuYunOSSRequestBuilder = undefined;var o = l(n(3)),i = l(n(0)),r = l(n(1)),s = l(n(4)),a = l(n(5)),u = l(n(109)),c = l(n(108));function l(e) {return e && e.__esModule ? e : { "default": e };}var f = new (function (e) {function t() {return (0, i["default"])(this, t), (0, s["default"])(this, (t.__proto__ || (0, o["default"])(t)).call(this));}return (0, a["default"])(t, e), (0, r["default"])(t, [{ key: "url", value: function value(e) {return e.downloadUrl;} }, { key: "build", value: function value(e, t) {var n = { key: this.newFileName(e), token: e.token, file: t },o = { newFileName: this.newFileName(e), url: this.url(e) };return new c["default"](e.host, null, n, t, o);} }]), t;}(u["default"]))();t.qiNiuYunOSSRequestBuilder = f;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = c(n(6)),i = c(n(0)),r = c(n(1)),s = c(n(10)),a = c(n(8)),u = n(32);function c(e) {return e && e.__esModule ? e : { "default": e };}var l = function () {function e(t) {(0, i["default"])(this, e), this.im = null, this.im = t;}return (0, r["default"])(e, [{ key: "resolve", value: function value(e) {var t = this;return new o["default"](function (n, o) {var i = new s["default"]({ name: "uploadToken", params: { filename: e }, permission: a["default"].WRITE, singleTimeout: u.SocketTimeout.commonRequestSingle, totalTimeout: u.SocketTimeout.commonRequestTotal, fail: function fail(e) {o(e);}, success: function success(e) {200 == e.code ? n(e) : o(e);} });t.im._goEasySocket.emit(i);});} }]), e;}();t["default"] = l;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = d(n(21)),i = d(n(6)),r = d(n(0)),s = d(n(1)),a = n(17),u = d(n(10)),c = d(n(8)),l = n(32),f = n(11);function d(e) {return e && e.__esModule ? e : { "default": e };}var p = function () {function e(t) {(0, r["default"])(this, e), this.im = null, this.im = t;}return (0, s["default"])(e, [{ key: "history", value: function value(e) {var t = this;return new i["default"](function (n, o) {t.transformOptions(e);var i = new u["default"]({ name: f.EmitType.imHistory, params: e, permission: c["default"].READ, singleTimeout: l.SocketTimeout.commonQuerySingle, totalTimeout: l.SocketTimeout.commonQueryTotal, fail: function fail(e) {o({ code: e.code || 408, content: e.content || "Failed to query message" });}, success: function success(i) {if (200 == i.code) {var r = t.transformHistories(i, e);n({ code: 200, content: r });} else o(i);} });t.im._goEasySocket.emit(i);});} }, { key: "transformOptions", value: function value(e) {if (!a.calibrator.isObject(e) || !a.calibrator.isDef(e.friendId) && !a.calibrator.isDef(e.groupId)) throw Error("friendId or groupId is not define.");if (a.calibrator.isDef(e.friendId) && a.calibrator.isDef(e.groupId)) throw Error("only contain friendId or groupId.");if (a.calibrator.isDef(e.limit) || (e.limit = 10), e.limit > 30 && (e.limit = 30), a.calibrator.isDef(e.friendId)) {if (!a.calibrator.isStringOrNumber(e.friendId)) throw Error("TypeError: friendId require string or number.");a.calibrator.isNumber(e.friendId) && (e.friendId = e.friendId.toString());} else {if (!a.calibrator.isStringOrNumber(e.groupId)) throw Error("TypeError: groupId require string or number.");a.calibrator.isNumber(e.groupId) && (e.groupId = e.groupId.toString());}return e;} }, { key: "transformHistories", value: function value(e, t) {var n = [];return e && e.content && e.content.map(function (e) {var i = (0, o["default"])(null);i.timestamp = e.ts, i.senderId = e.s, i.type = e.mt, i.payload = JSON.parse(e.p), t.groupId && e.d && (i.senderData = JSON.parse(e.d)), n.push(i);}), n;} }]), e;}();t["default"] = p;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = h(n(6)),i = h(n(0)),r = h(n(1)),s = h(n(10)),a = n(11),u = h(n(8)),c = n(15),l = n(25),f = h(n(48)),d = n(2),p = n(29);function h(e) {return e && e.__esModule ? e : { "default": e };}var y = function () {function e(t) {(0, i["default"])(this, e), this.im = null, this.im = t, t._iMReceiver.addIMMessageObserver(this.newNewMessageReceived.bind(this));}return (0, r["default"])(e, [{ key: "newNewMessageReceived", value: function value(e) {if (e.t === l.ConversationType.GROUP) {var t = f["default"].assemble(e);this.im._event.notify(p.ImEventType.GROUP_MESSAGE_RECEIVED, t);}} }, { key: "subscribe", value: function value(e) {var t = this;return new o["default"](function (n, o) {if (Array.isArray(e) && 0 != e.length) {for (var i = 0; i < e.length; i++) {if (!d.calibrator.isStringOrNumber(e[i])) return void o({ code: 400, content: "TypeError: groups item require string or number." });d.calibrator.isNumber(e[i]) && (e[i] = e[i].toString());}var r = new s["default"]({ name: a.EmitType.subscribeGroups, params: { groupIds: e }, permission: u["default"].WRITE, singleTimeout: c.SocketTimeout.commonInfiniteSingle, totalTimeout: c.SocketTimeout.commonInfiniteTotal, success: function success() {n({ code: 200, content: "ok" });}, fail: function fail(e) {o({ code: e.resultCode || 408, content: e.content || "Failed to subscribe group message" });} });t.im._goEasySocket.emit(r);} else o({ code: 400, content: "TypeError: groups require array." });});} }, { key: "unsubscribe", value: function value(e) {var t = this;return new o["default"](function (n, o) {if (d.calibrator.isStringOrNumber(e)) {e = e.toString();var i = new s["default"]({ name: a.EmitType.unsubscribeGroup, params: { groupId: e }, permission: u["default"].READ, singleTimeout: c.SocketTimeout.commonRequestSingle, totalTimeout: c.SocketTimeout.commonRequestTotal, success: function success() {n({ code: 200, content: "ok" });}, fail: function fail(e) {o({ code: e.resultCode || 408, content: e.content || "Failed to unsubscribe group message" });} });t.im._goEasySocket.emit(i);} else o({ code: 400, content: "TypeError: channel require string or number." });});} }]), e;}();t["default"] = y;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = u(n(0)),i = u(n(1)),r = u(n(48)),s = n(25),a = n(29);function u(e) {return e && e.__esModule ? e : { "default": e };}var c = function () {function e(t) {(0, o["default"])(this, e), this.im = null, this.im = t, t._iMReceiver.addIMMessageObserver(this.onNewMessageReceived.bind(this));}return (0, i["default"])(e, [{ key: "onNewMessageReceived", value: function value(e) {if (e.t === s.ConversationType.PRIVATE) {var t = r["default"].assemble(e);this.im._event.notify(a.ImEventType.PRIVATE_MESSAGE_RECEIVED, t);}} }]), e;}();t["default"] = c;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = f(n(6)),i = f(n(0)),r = f(n(1)),s = f(n(10)),a = n(11),u = f(n(8)),c = n(15),l = n(2);function f(e) {return e && e.__esModule ? e : { "default": e };}var d = function () {function e(t) {(0, i["default"])(this, e), this.im = null, this.im = t;}return (0, r["default"])(e, [{ key: "get", value: function value(e) {var t = this;return new o["default"](function (n, o) {if (l.calibrator.isStringOrNumber(e)) {l.calibrator.isNumber(e) && (e = e.toString());var i = new s["default"]({ name: a.EmitType.imGroupOnlineCount, params: { groupId: e }, permission: u["default"].READ, singleTimeout: c.SocketTimeout.commonQuerySingle, totalTimeout: c.SocketTimeout.commonQueryTotal, fail: function fail(e) {o(e || { code: 408, content: "Failed to query online group users" });}, success: function success(e) {200 == e.code ? n(e) : o(e);} });t.im._goEasySocket.emit(i);} else o({ code: 400, content: "TypeError: groupId require string or number." });});} }]), e;}();t["default"] = d;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = p(n(6)),i = p(n(0)),r = p(n(1)),s = p(n(10)),a = p(n(8)),u = n(32),c = n(11),l = n(2),f = n(29),d = p(n(41));function p(e) {return e && e.__esModule ? e : { "default": e };}var h = function () {function e(t) {(0, i["default"])(this, e), this.im = null, this.im = t, t._goEasySocket.addMessageObserver(d["default"].groupPresence, this.newMessageReceived.bind(this));}return (0, r["default"])(e, [{ key: "presence", value: function value(e) {var t = this;return new o["default"](function (n, o) {if (Array.isArray(e) && 0 != e.length) {for (var i = 0; i < e.length; i++) {if (!l.calibrator.isStringOrNumber(e[i])) return void o({ code: 400, content: "TypeError: groupIds item require string or number." });if (l.calibrator.isNumber(e[i]) && (e[i] = e[i].toString()), 0 == e[i].length) return void o({ code: 400, content: "TypeError: groupIds has empty item." });}var r = { groupIds: e };t.emitRocket(c.EmitType.subscribeGroupPresence, r, function () {n({ code: 200, content: "ok" });}, function (e) {o({ code: e.code || 408, content: e.content || "Failed to subscribe group message" });}, u.SocketTimeout.commonInfiniteSingle, u.SocketTimeout.commonInfiniteTotal);} else o({ code: 400, content: "TypeError: groupIds require array." });});} }, { key: "unPresence", value: function value(e) {var t = this;return new o["default"](function (n, o) {if (l.calibrator.isStringOrNumber(e)) {l.calibrator.isNumber(e) && (e = e.toString());var i = { groupId: e };t.emitRocket(c.EmitType.unsubscribeGroupPresence, i, function () {n({ code: 200, content: "ok" });}, function (e) {o({ code: e.code || 408, content: e.content || "Failed to unsubscribe presence" });}, u.SocketTimeout.commonRequestSingle, u.SocketTimeout.commonRequestTotal);} else o({ code: 400, content: "TypeError: groupId require string or number." });});} }, { key: "emitRocket", value: function value(e, t, n, o, i, r) {var u = new s["default"]({ name: e, params: t, singleTimeout: i, totalTimeout: r, permission: a["default"].WRITE, success: n, fail: o });this.im._goEasySocket.emit(u);} }, { key: "newMessageReceived", value: function value(e) {var t = this,n = null;e.c && (n = JSON.parse(e.c)), n && n.events && n.events.map(function (e) {var o = e.userData ? JSON.parse(e.userData) : {},i = { time: e.time, action: e.action, groupOnlineCount: n.userAmount, groupId: n.groupId, id: e.userId, data: o };t.im._event.notify(f.ImEventType.GROUP_PRESENCE, i);});} }]), e;}();t["default"] = h;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = p(n(6)),i = p(n(0)),r = p(n(1)),s = p(n(10)),a = p(n(8)),u = n(32),c = n(11),l = n(2),f = n(29),d = p(n(41));function p(e) {return e && e.__esModule ? e : { "default": e };}var h = function () {function e(t) {(0, i["default"])(this, e), this.im = null, this.im = t, this.im._goEasySocket.addMessageObserver(d["default"].userPresence, this.newMessageReceived.bind(this));}return (0, r["default"])(e, [{ key: "presence", value: function value(e) {var t = this;return new o["default"](function (n, o) {if (Array.isArray(e) && 0 != e.length) {for (var i = 0; i < e.length; i++) {if (!l.calibrator.isStringOrNumber(e[i])) return void o({ code: 400, content: "TypeError: userIds item require string or number." });if (l.calibrator.isNumber(e[i]) && (e[i] = e[i].toString()), 0 == e[i].length) return void o({ code: 400, content: "TypeError: userIds has empty item." });}var r = { userIds: e };t.emitRocket(c.EmitType.subscribeUserPresence, r, function () {n({ code: 200, content: "ok" });}, function (e) {o({ code: e.code || 408, content: e.content || "Failed to subscribe group message" });}, u.SocketTimeout.commonInfiniteSingle, u.SocketTimeout.commonInfiniteTotal);} else o({ code: 400, content: "TypeError: userIds require array." });});} }, { key: "unPresence", value: function value(e) {var t = this;return new o["default"](function (n, o) {if (l.calibrator.isStringOrNumber(e)) {l.calibrator.isNumber(e) && (e = e.toString());var i = { userId: e };t.emitRocket(c.EmitType.unsubscribeUserPresence, i, function () {n({ code: 200, content: "ok" });}, function (e) {o({ code: e.code || 408, content: e.content || "Failed to unsubscribe presence" });}, u.SocketTimeout.commonRequestSingle, u.SocketTimeout.commonRequestTotal);} else o({ code: 400, content: "TypeError: id require string or number." });});} }, { key: "emitRocket", value: function value(e, t, n, o, i, r) {var u = new s["default"]({ name: e, params: t, singleTimeout: i, totalTimeout: r, permission: a["default"].WRITE, success: n, fail: o });this.im._goEasySocket.emit(u);} }, { key: "newMessageReceived", value: function value(e) {var t = this,n = [];e.c && (n = JSON.parse(e.c).events || []), n.map(function (e) {var n = e.userData ? JSON.parse(e.userData) : {},o = { time: e.time, action: e.action, id: e.userId, data: n };t.im._event.notify(f.ImEventType.USER_PRESENCE, o);});} }]), e;}();t["default"] = h;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = f(n(6)),i = f(n(0)),r = f(n(1)),s = n(11),a = f(n(10)),u = f(n(8)),c = n(15),l = n(2);function f(e) {return e && e.__esModule ? e : { "default": e };}var d = function () {function e(t) {(0, i["default"])(this, e), this.im = null, this.im = t;}return (0, r["default"])(e, [{ key: "hereNow", value: function value(e) {var t = this;return new o["default"](function (n, o) {if (e.userIds && Array.isArray(e.userIds) && 0 != e.userIds.length) {for (var i = 0; i < e.userIds.length; i++) {if (!l.calibrator.isStringOrNumber(e.userIds[i])) return void o({ code: 400, content: "TypeError: userIds item require string or number." });if (l.calibrator.isNumber(e.userIds[i]) && (e.userIds[i] = e.userIds[i].toString()), 0 == e.userIds[i].length) return void o({ code: 400, content: "TypeError: userIds has empty item." });}var r = new a["default"]({ name: s.EmitType.imHereNow, params: e, permission: u["default"].READ, singleTimeout: c.SocketTimeout.commonQuerySingle, totalTimeout: c.SocketTimeout.commonQueryTotal, fail: function fail(e) {o({ code: e.resultCode || 408, content: e.content || "Failed to query online users" });}, success: function success(e) {if (200 == e.code) {var t = e.content;e.content = t.map(function (e) {var t = e.userData ? JSON.parse(e.userData) : {};return { id: e.userId, data: t };}), n(e);} else o(e);} });t.im._goEasySocket.emit(r);} else o({ code: 400, content: "TypeError: userIds require array." });});} }]), e;}();t["default"] = d;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = f(n(6)),i = f(n(0)),r = f(n(1)),s = n(11),a = f(n(10)),u = f(n(8)),c = n(15),l = n(17);function f(e) {return e && e.__esModule ? e : { "default": e };}var d = function () {function e(t) {(0, i["default"])(this, e), this.im = null, this.im = t;}return (0, r["default"])(e, [{ key: "hereNow", value: function value(e) {var t = this;return new o["default"](function (n, o) {if (l.calibrator.isStringOrNumber(e)) {l.calibrator.isNumber(e) && (e = e.toString());var i = new a["default"]({ name: s.EmitType.imGroupHereNow, params: { groupId: e }, permission: u["default"].READ, singleTimeout: c.SocketTimeout.commonQuerySingle, totalTimeout: c.SocketTimeout.commonQueryTotal, fail: function fail(e) {o({ code: e.resultCode || 408, content: e.content || "Failed to query online group users" });}, success: function success(e) {if (200 == e.code) {var t = e.content;e.content = t.map(function (e) {var t = e.userData ? JSON.parse(e.userData) : {};return { id: e.userId, data: t };}), n(e);} else o(e);} });t.im._goEasySocket.emit(i);} else o({ code: 400, content: "TypeError: groupId require string or number." });});} }]), e;}();t["default"] = d;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = s(n(0)),i = s(n(1)),r = s(n(41));function s(e) {return e && e.__esModule ? e : { "default": e };}var a = function () {function e(t) {(0, o["default"])(this, e), this.im = null, this.observers = [], this.im = t, t._goEasySocket.addMessageObserver(r["default"].imMessage, this.newNewMessageReceived.bind(this));}return (0, i["default"])(e, [{ key: "newNewMessageReceived", value: function value(e) {this.sendAck(e), this.notify(e);} }, { key: "addIMMessageObserver", value: function value(e) {this.observers.push(e);} }, { key: "sendAck", value: function value(e) {this.im._goEasySocket.sendAck("imAck", { publishGuid: e.i });} }, { key: "notify", value: function value(e) {for (var t = 0; t < this.observers.length; t++) {this.observers[t](e);}} }]), e;}();t["default"] = a;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = d(n(72)),i = d(n(6)),r = d(n(0)),s = d(n(1)),a = d(n(10)),u = n(11),c = d(n(8)),l = n(15),f = n(25);function d(e) {return e && e.__esModule ? e : { "default": e };}var p = function () {function e(t, n) {(0, r["default"])(this, e), this.im = null, this.userData = {}, this.groupData = {}, this.im = t, this.putUserData(n.id, n.data);}return (0, s["default"])(e, [{ key: "putData", value: function value(e, t, n) {n || (n = {}), e == f.ConversationType.PRIVATE ? this.userData[t] = n : this.groupData[t] = n;} }, { key: "putUserData", value: function value(e, t) {this.userData[e] = t;} }, { key: "putGroupData", value: function value(e, t) {this.groupData[e] = t;} }, { key: "loadData", value: function value(e, t) {var n = this;return new i["default"](function (i, r) {var s = void 0;if ((s = f.ConversationType.PRIVATE === t ? n.userData : n.groupData)[e] && 0 != (0, o["default"])(s[e]).length) i(s[e]);else {var d = { targetId: e, type: t },p = new a["default"]({ name: u.EmitType.imData, params: d, permission: c["default"].READ, singleTimeout: l.SocketTimeout.commonQuerySingle, totalTimeout: l.SocketTimeout.commonQueryTotal, success: function success(t) {t.content ? s[e] = JSON.parse(t.content) : s[e] = {}, i(s[e]);}, fail: function fail(e) {r(e);} });n.im._goEasySocket.emit(p);}});} }]), e;}();t["default"] = p;}, function (e, t, n) {n(235), e.exports = n(7).Object.keys;}, function (e, t, n) {var o = n(40),i = n(31);n(66)("keys", function () {return function (e) {return i(o(e));};});}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = C(n(6)),i = C(n(33)),r = C(n(3)),s = C(n(0)),a = C(n(1)),u = C(n(4)),c = C(n(12)),l = C(n(5)),f = C(n(110)),d = n(11),p = C(n(273)),h = C(n(10)),y = C(n(8)),v = C(n(28)),m = C(n(274)),g = n(2),b = n(119),_ = n(15),k = C(n(275));function C(e) {return e && e.__esModule ? e : { "default": e };}var w = function (e) {function t(e) {(0, s["default"])(this, t);var n = (0, u["default"])(this, (t.__proto__ || (0, r["default"])(t)).call(this));return n.ioSocket = null, n.sid = null, n.appKey = null, n.userId = null, n.userData = null, n.otp = null, n.artifactVersion = "0.0.0", n.uri = null, n.ioOpts = null, n.allowNotification = !1, n.reconnectingTimes = 0, n.messageObservers = {}, n.connectFailedObservers = [], n.connectingObservers = [], n.expiredReconnectedObservers = [], n.ioSocket = new p["default"]({ onDisconnected: n.onIoDisconnected.bind(n), onReconnecting: n.onIoReconnecting.bind(n) }), n.ioSocket.addConnectedObserver(n.onIoReconnected.bind(n)), n.appKey = e.appkey, n.userId = e.id, n.userData = e.data, n.otp = e.otp || null, n.ioOpts = e.opts, n.uri = e.uri, n.allowNotification = e.allowNotification, n.artifactVersion = e.artifactVersion, n.modules = e.modules, n.addConnectedObserver(e.onSuccess), n.addConnectingObserver(e.onProgress), n.addConnectFailedObserver(e.onFailed), n;}return (0, l["default"])(t, e), (0, a["default"])(t, [{ key: "onIoReconnected", value: function value() {this.status === v["default"].RECONNECTING && this.authorize();} }, { key: "emit", value: function value(e) {(0, c["default"])(t.prototype.__proto__ || (0, r["default"])(t.prototype), "emit", this).call(this, e);} }, { key: "doEmit", value: function value(e, t, n) {b.uniApp.overrideUniShowHideMethods(), t.sid = this.sid, this.ioSocket.doEmit(e, t, n);} }, { key: "sendAck", value: function value(e, t) {this.ioSocket.io.emit(e, t);} }, { key: "connect", value: function value(e) {var n = this;((0, c["default"])(t.prototype.__proto__ || (0, r["default"])(t.prototype), "connect", this).call(this), this.onConnecting(this.reconnectingTimes), this.ioSocket.connect({ uri: this.uri, opts: this.ioOpts }), this.notifier = new k["default"](this), this.notifier.support()) ? this.notifier.getRegId().then(function (e) {n.regId = e, n.authorize();})["catch"](function (e) {console.error("注册厂商通道失败：" + (0, i["default"])(e)), n.authorize();}) : this.authorize();} }, { key: "disconnect", value: function value() {var e = this;return new o["default"](function (t, n) {var o = function o() {e.status = v["default"].DISCONNECTED, e.ioSocket.disconnect(), t();};if (e.allowNotification) {var i = new h["default"]({ name: d.EmitType.manualDisconnect, params: {}, permission: y["default"].READ, singleTimeout: _.SocketTimeout.commonInfiniteSingle, totalTimeout: _.SocketTimeout.commonInfiniteTotal, fail: function fail(e) {n(e);}, success: o });e.emit(i);} else o();});} }, { key: "authorize", value: function value() {var e = { appkey: this.appKey, userId: this.userId, userData: (0, i["default"])(this.userData), otp: this.otp, artifactVersion: this.artifactVersion, sid: this.sid, allowNT: this.allowNotification, regId: this.regId, modules: this.modules };(0, i["default"])(e);var t = new h["default"]({ name: d.EmitType.authorize, params: e, permission: y["default"].NONE, singleTimeout: _.SocketTimeout.commonInfiniteSingle, totalTimeout: _.SocketTimeout.commonInfiniteTotal, success: this.onAuthorizeSuccess.bind(this), fail: this.onAuthorizeFailed.bind(this) });this.ioSocket.emit(t);} }, { key: "onConnecting", value: function value() {this.notify(this.connectingObservers, this.reconnectingTimes);} }, { key: "onIoReconnecting", value: function value() {b.uniApp.overrideUniShowHideMethods(), this.reconnectingTimes++, this.status == v["default"].CONNECTED || this.status == v["default"].EXPIRED_RECONNECTED || this.status == v["default"].RECONNECTING ? this.status = v["default"].RECONNECTING : this.status = v["default"].CONNECTING, this.onConnecting();} }, { key: "onIoDisconnected", value: function value() {this.status == v["default"].DISCONNECTING && (this.status = v["default"].DISCONNECTED, this.notify(this.disconnectedObservers));} }, { key: "onAuthorizeSuccess", value: function value(e) {this.status === v["default"].RECONNECTING ? this.sid !== e.sid ? (this.status = v["default"].EXPIRED_RECONNECTED, this.notify(this.expiredReconnectedObservers)) : this.status = v["default"].RECONNECTED : (this.status = v["default"].CONNECTED, this.sid = e.sid);e.enablePublish && (this.permissions.find(function (e) {return e == y["default"].WRITE;}) || this.permissions.push(y["default"].WRITE)), e.enableSubscribe && (this.permissions.find(function (e) {return e == y["default"].READ;}) || this.permissions.push(y["default"].READ)), this.reconnectingTimes = 0, this.notify(this.connectedObservers);} }, { key: "onAuthorizeFailed", value: function value(e) {this.ioSocket.disconnect(), this.status = v["default"].CONNECT_FAILED;var t = { code: e.resultCode || 408, content: e.content || "Host unreachable or timeout" };this.notify(this.connectFailedObservers, t);} }, { key: "addConnectingObserver", value: function value(e) {g.calibrator.isFunction(e) && this.connectingObservers.push(e);} }, { key: "addConnectFailedObserver", value: function value(e) {g.calibrator.isFunction(e) && this.connectFailedObservers.push(e);} }, { key: "addExpiredReconnectedObserver", value: function value(e) {g.calibrator.isFunction(e) && this.expiredReconnectedObservers.push(e);} }, { key: "addMessageObserver", value: function value(e, t) {var n = this;this.ioSocket.io.on(e, function (t) {n.notifyMessageObservers(e, t);}), this.messageObservers[e] || (this.messageObservers[e] = []), this.messageObservers[e].push(new m["default"](t));} }, { key: "notifyMessageObservers", value: function value(e, t) {for (var n = this.messageObservers[e], o = 0; o < n.length; o++) {n[o].onMessage(e, t);}} }]), t;}(f["default"]);t["default"] = w;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = s(n(0)),i = s(n(1)),r = s(n(28));function s(e) {return e && e.__esModule ? e : { "default": e };}var a = function () {function e(t) {(0, o["default"])(this, e), this.socket = null, this.socket = t;}return (0, i["default"])(e, [{ key: "emit", value: function value(e) {this.socket.status !== r["default"].CONNECT_FAILED && this.socket.status !== r["default"].DISCONNECTED ? (e.start(), this.doEmit(e)) : e.fail({ resultCode: "409", content: "Please connect first" });} }, { key: "doEmit", value: function value(e) {var t = this;if (e.isTimeout()) e.fail({ resultCode: 408, content: "Host unreachable or timeout" });else if (this.socket.status !== r["default"].CONNECT_FAILED) {if (this.authenticated()) {if (this.hasPermission(e)) {if (this.socket.status === r["default"].CONNECTED || this.socket.status === r["default"].RECONNECTED || this.socket.status === r["default"].EXPIRED_RECONNECTED) {if (!e.complete) {var n = setTimeout(function () {t.doEmit(e);}, e.singleTimeout);this.socket.doEmit(e.name, e.params, function (t) {clearTimeout(n), 200 === t.resultCode || 200 == t.code ? e.success(t) : e.fail(t);}), e.retried++;}} else setTimeout(function () {t.doEmit(e);}, 500);} else e.fail({ resultCode: 401, content: "No permission" });} else setTimeout(function () {t.doEmit(e);}, 500);} else e.fail({ resultCode: 408, content: "Failed to connect GoEasy." });} }, { key: "hasPermission", value: function value(e) {return !!this.socket.permissions.find(function (t) {return t === e.permission;});} }, { key: "authenticated", value: function value() {return this.socket.status === r["default"].CONNECTED || this.socket.status === r["default"].RECONNECTING || this.socket.status === r["default"].RECONNECTED || this.socket.status === r["default"].EXPIRED_RECONNECTED;} }]), e;}();t["default"] = a;}, function (e, t, n) {"use strict";var o,i = n(20),r = (o = i) && o.__esModule ? o : { "default": o };var s = n(239),a = n(74),u = n(111);n(53)("socket.io-client");e.exports = t = l;var c = t.managers = {};function l(e, t) {"object" === (void 0 === e ? "undefined" : (0, r["default"])(e)) && (t = e, e = undefined), t = t || {};var n,o = s(e),i = o.source,a = o.id,l = o.path,f = c[a] && l in c[a].nsps;return t.forceNew || t["force new connection"] || !1 === t.multiplex || f ? n = u(i, t) : (c[a] || (c[a] = u(i, t)), n = c[a]), o.query && !t.query && (t.query = o.query), n.socket(o.path, t);}t.protocol = a.protocol, t.connect = l, t.Manager = n(111), t.Socket = n(115);}, function (e, t, n) {"use strict";var o = n(240);n(53)("socket.io-client:url");e.exports = function (e, t) {var n = e;t = t || "undefined" != typeof location && location, null == e && (e = t.protocol + "//" + t.host);"string" == typeof e && ("/" === e.charAt(0) && (e = "/" === e.charAt(1) ? t.protocol + e : t.host + e), /^(https?|wss?):\/\//.test(e) || (e = void 0 !== t ? t.protocol + "//" + e : "https://" + e), n = o(e));n.port || (/^(http|ws)$/.test(n.protocol) ? n.port = "80" : /^(http|ws)s$/.test(n.protocol) && (n.port = "443"));n.path = n.path || "/";var i = -1 !== n.host.indexOf(":") ? "[" + n.host + "]" : n.host;return n.id = n.protocol + "://" + i + ":" + n.port, n.href = n.protocol + "://" + i + (t && t.port === n.port ? "" : ":" + n.port), n;};}, function (e, t) {var n = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,o = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];e.exports = function (e) {var t = e,i = e.indexOf("["),r = e.indexOf("]");-1 != i && -1 != r && (e = e.substring(0, i) + e.substring(i, r).replace(/:/g, ";") + e.substring(r, e.length));for (var s = n.exec(e || ""), a = {}, u = 14; u--;) {a[o[u]] = s[u] || "";}return -1 != i && -1 != r && (a.source = t, a.host = a.host.substring(1, a.host.length - 1).replace(/;/g, ":"), a.authority = a.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), a.ipv6uri = !0), a;};}, function (e, t, n) {function o(e) {var n;function o() {if (o.enabled) {var e = o,i = +new Date(),r = i - (n || i);e.diff = r, e.prev = n, e.curr = i, n = i;for (var s = new Array(arguments.length), a = 0; a < s.length; a++) {s[a] = arguments[a];}s[0] = t.coerce(s[0]), "string" != typeof s[0] && s.unshift("%O");var u = 0;s[0] = s[0].replace(/%([a-zA-Z%])/g, function (n, o) {if ("%%" === n) return n;u++;var i = t.formatters[o];if ("function" == typeof i) {var r = s[u];n = i.call(e, r), s.splice(u, 1), u--;}return n;}), t.formatArgs.call(e, s), (o.log || t.log || console.log.bind(console)).apply(e, s);}}return o.namespace = e, o.enabled = t.enabled(e), o.useColors = t.useColors(), o.color = function (e) {var n,o = 0;for (n in e) {o = (o << 5) - o + e.charCodeAt(n), o |= 0;}return t.colors[Math.abs(o) % t.colors.length];}(e), o.destroy = i, "function" == typeof t.init && t.init(o), t.instances.push(o), o;}function i() {var e = t.instances.indexOf(this);return -1 !== e && (t.instances.splice(e, 1), !0);}(t = e.exports = o.debug = o["default"] = o).coerce = function (e) {return e instanceof Error ? e.stack || e.message : e;}, t.disable = function () {t.enable("");}, t.enable = function (e) {var n;t.save(e), t.names = [], t.skips = [];var o = ("string" == typeof e ? e : "").split(/[\s,]+/),i = o.length;for (n = 0; n < i; n++) {o[n] && ("-" === (e = o[n].replace(/\*/g, ".*?"))[0] ? t.skips.push(new RegExp("^" + e.substr(1) + "$")) : t.names.push(new RegExp("^" + e + "$")));}for (n = 0; n < t.instances.length; n++) {var r = t.instances[n];r.enabled = t.enabled(r.namespace);}}, t.enabled = function (e) {if ("*" === e[e.length - 1]) return !0;var n, o;for (n = 0, o = t.skips.length; n < o; n++) {if (t.skips[n].test(e)) return !1;}for (n = 0, o = t.names.length; n < o; n++) {if (t.names[n].test(e)) return !0;}return !1;}, t.humanize = n(242), t.instances = [], t.names = [], t.skips = [], t.formatters = {};}, function (e, t) {var n = 1e3,o = 60 * n,i = 60 * o,r = 24 * i,s = 365.25 * r;function a(e, t, n) {if (!(e < t)) return e < 1.5 * t ? Math.floor(e / t) + " " + n : Math.ceil(e / t) + " " + n + "s";}e.exports = function (e, t) {t = t || {};var u,c = typeof e;if ("string" === c && e.length > 0) return function (e) {if ((e = String(e)).length > 100) return;var t = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);if (!t) return;var a = parseFloat(t[1]);switch ((t[2] || "ms").toLowerCase()) {case "years":case "year":case "yrs":case "yr":case "y":return a * s;case "days":case "day":case "d":return a * r;case "hours":case "hour":case "hrs":case "hr":case "h":return a * i;case "minutes":case "minute":case "mins":case "min":case "m":return a * o;case "seconds":case "second":case "secs":case "sec":case "s":return a * n;case "milliseconds":case "millisecond":case "msecs":case "msec":case "ms":return a;default:return undefined;}}(e);if ("number" === c && !1 === isNaN(e)) return t.long ? a(u = e, r, "day") || a(u, i, "hour") || a(u, o, "minute") || a(u, n, "second") || u + " ms" : function (e) {if (e >= r) return Math.round(e / r) + "d";if (e >= i) return Math.round(e / i) + "h";if (e >= o) return Math.round(e / o) + "m";if (e >= n) return Math.round(e / n) + "s";return e + "ms";}(e);throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e));};}, function (e, t, n) {(function (o) {function i() {var e;try {e = t.storage.debug;} catch (n) {}return !e && void 0 !== o && "env" in o && (e = o.env.DEBUG), e;}(t = e.exports = n(244)).log = function () {return "object" == typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments);}, t.formatArgs = function (e) {var n = this.useColors;if (e[0] = (n ? "%c" : "") + this.namespace + (n ? " %c" : " ") + e[0] + (n ? "%c " : " ") + "+" + t.humanize(this.diff), !n) return;var o = "color: " + this.color;e.splice(1, 0, o, "color: inherit");var i = 0,r = 0;e[0].replace(/%[a-zA-Z%]/g, function (e) {"%%" !== e && "%c" === e && (r = ++i);}), e.splice(r, 0, o);}, t.save = function (e) {try {null == e ? t.storage.removeItem("debug") : t.storage.debug = e;} catch (n) {}}, t.load = i, t.useColors = function () {if ("undefined" != typeof window && window.process && "renderer" === window.process.type) return !0;if ("undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) return !1;return "undefined" != typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" != typeof window && window.console && (window.console.firebug || window.console.exception && window.console.table) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);}, t.storage = "undefined" != typeof chrome && "undefined" != typeof chrome.storage ? chrome.storage.local : function () {try {return window.localStorage;} catch (e) {}}(), t.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"], t.formatters.j = function (e) {try {return JSON.stringify(e);} catch (t) {return "[UnexpectedJSONParseError]: " + t.message;}}, t.enable(i());}).call(t, n(73));}, function (e, t, n) {function o(e) {var n;function o() {if (o.enabled) {var e = o,i = +new Date(),r = i - (n || i);e.diff = r, e.prev = n, e.curr = i, n = i;for (var s = new Array(arguments.length), a = 0; a < s.length; a++) {s[a] = arguments[a];}s[0] = t.coerce(s[0]), "string" != typeof s[0] && s.unshift("%O");var u = 0;s[0] = s[0].replace(/%([a-zA-Z%])/g, function (n, o) {if ("%%" === n) return n;u++;var i = t.formatters[o];if ("function" == typeof i) {var r = s[u];n = i.call(e, r), s.splice(u, 1), u--;}return n;}), t.formatArgs.call(e, s), (o.log || t.log || console.log.bind(console)).apply(e, s);}}return o.namespace = e, o.enabled = t.enabled(e), o.useColors = t.useColors(), o.color = function (e) {var n,o = 0;for (n in e) {o = (o << 5) - o + e.charCodeAt(n), o |= 0;}return t.colors[Math.abs(o) % t.colors.length];}(e), o.destroy = i, "function" == typeof t.init && t.init(o), t.instances.push(o), o;}function i() {var e = t.instances.indexOf(this);return -1 !== e && (t.instances.splice(e, 1), !0);}(t = e.exports = o.debug = o["default"] = o).coerce = function (e) {return e instanceof Error ? e.stack || e.message : e;}, t.disable = function () {t.enable("");}, t.enable = function (e) {var n;t.save(e), t.names = [], t.skips = [];var o = ("string" == typeof e ? e : "").split(/[\s,]+/),i = o.length;for (n = 0; n < i; n++) {o[n] && ("-" === (e = o[n].replace(/\*/g, ".*?"))[0] ? t.skips.push(new RegExp("^" + e.substr(1) + "$")) : t.names.push(new RegExp("^" + e + "$")));}for (n = 0; n < t.instances.length; n++) {var r = t.instances[n];r.enabled = t.enabled(r.namespace);}}, t.enabled = function (e) {if ("*" === e[e.length - 1]) return !0;var n, o;for (n = 0, o = t.skips.length; n < o; n++) {if (t.skips[n].test(e)) return !1;}for (n = 0, o = t.names.length; n < o; n++) {if (t.names[n].test(e)) return !0;}return !1;}, t.humanize = n(245), t.instances = [], t.names = [], t.skips = [], t.formatters = {};}, function (e, t) {var n = 1e3,o = 60 * n,i = 60 * o,r = 24 * i,s = 365.25 * r;function a(e, t, n) {if (!(e < t)) return e < 1.5 * t ? Math.floor(e / t) + " " + n : Math.ceil(e / t) + " " + n + "s";}e.exports = function (e, t) {t = t || {};var u,c = typeof e;if ("string" === c && e.length > 0) return function (e) {if ((e = String(e)).length > 100) return;var t = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);if (!t) return;var a = parseFloat(t[1]);switch ((t[2] || "ms").toLowerCase()) {case "years":case "year":case "yrs":case "yr":case "y":return a * s;case "days":case "day":case "d":return a * r;case "hours":case "hour":case "hrs":case "hr":case "h":return a * i;case "minutes":case "minute":case "mins":case "min":case "m":return a * o;case "seconds":case "second":case "secs":case "sec":case "s":return a * n;case "milliseconds":case "millisecond":case "msecs":case "msec":case "ms":return a;default:return undefined;}}(e);if ("number" === c && !1 === isNaN(e)) return t.long ? a(u = e, r, "day") || a(u, i, "hour") || a(u, o, "minute") || a(u, n, "second") || u + " ms" : function (e) {if (e >= r) return Math.round(e / r) + "d";if (e >= i) return Math.round(e / i) + "h";if (e >= o) return Math.round(e / o) + "m";if (e >= n) return Math.round(e / n) + "s";return e + "ms";}(e);throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e));};}, function (e, t, n) {function o(e) {if (e) return function (e) {for (var t in o.prototype) {e[t] = o.prototype[t];}return e;}(e);}e.exports = o, o.prototype.on = o.prototype.addEventListener = function (e, t) {return this._callbacks = this._callbacks || {}, (this._callbacks["$" + e] = this._callbacks["$" + e] || []).push(t), this;}, o.prototype.once = function (e, t) {function n() {this.off(e, n), t.apply(this, arguments);}return n.fn = t, this.on(e, n), this;}, o.prototype.off = o.prototype.removeListener = o.prototype.removeAllListeners = o.prototype.removeEventListener = function (e, t) {if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this;var n,o = this._callbacks["$" + e];if (!o) return this;if (1 == arguments.length) return delete this._callbacks["$" + e], this;for (var i = 0; i < o.length; i++) {if ((n = o[i]) === t || n.fn === t) {o.splice(i, 1);break;}}return this;}, o.prototype.emit = function (e) {this._callbacks = this._callbacks || {};var t = [].slice.call(arguments, 1),n = this._callbacks["$" + e];if (n) for (var o = 0, i = (n = n.slice(0)).length; o < i; ++o) {n[o].apply(this, t);}return this;}, o.prototype.listeners = function (e) {return this._callbacks = this._callbacks || {}, this._callbacks["$" + e] || [];}, o.prototype.hasListeners = function (e) {return !!this.listeners(e).length;};}, function (e, t) {var n = {}.toString;e.exports = Array.isArray || function (e) {return "[object Array]" == n.call(e);};}, function (e, t, n) {"use strict";e.exports = n(249), e.exports.parser = n(34);}, function (e, t, n) {"use strict";var o = r(n(72)),i = r(n(20));function r(e) {return e && e.__esModule ? e : { "default": e };}var s = n(112),a = n(113),u = (n(78)("engine.io-client:socket"), n(265)),c = n(34),l = n(266),f = n(76);function d(e, t) {if (!(this instanceof d)) return new d(e, t);t = t || {}, e && "object" === (void 0 === e ? "undefined" : (0, i["default"])(e)) && (t = e, e = null), e ? (e = l(e), t.hostname = e.host, t.secure = "https" === e.protocol || "wss" === e.protocol, t.port = e.port, e.query && (t.query = e.query)) : t.host && (t.hostname = l(t.host).host), this.secure = null != t.secure ? t.secure : "undefined" != typeof location && "https:" === location.protocol, t.hostname && !t.port && (t.port = this.secure ? "443" : "80"), this.agent = t.agent || !1, this.hostname = t.hostname || ("undefined" != typeof location ? location.hostname : "localhost"), this.port = t.port || ("undefined" != typeof location && location.port ? location.port : this.secure ? 443 : 80), this.query = t.query || {}, "string" == typeof this.query && (this.query = f.decode(this.query)), this.upgrade = !1 !== t.upgrade, this.path = (t.path || "/engine.io").replace(/\/$/, "") + "/", this.forceJSONP = !!t.forceJSONP, this.jsonp = !1 !== t.jsonp, this.forceBase64 = !!t.forceBase64, this.enablesXDR = !!t.enablesXDR, this.timestampParam = t.timestampParam || "t", this.timestampRequests = t.timestampRequests, this.transports = t.transports || ["polling", "websocket"], this.transportOptions = t.transportOptions || {}, this.readyState = "", this.writeBuffer = [], this.prevBufferLen = 0, this.policyPort = t.policyPort || 843, this.rememberUpgrade = t.rememberUpgrade || !1, this.binaryType = null, this.onlyBinaryUpgrades = t.onlyBinaryUpgrades, this.perMessageDeflate = !1 !== t.perMessageDeflate && (t.perMessageDeflate || {}), !0 === this.perMessageDeflate && (this.perMessageDeflate = {}), this.perMessageDeflate && null == this.perMessageDeflate.threshold && (this.perMessageDeflate.threshold = 1024), this.pfx = t.pfx || null, this.key = t.key || null, this.passphrase = t.passphrase || null, this.cert = t.cert || null, this.ca = t.ca || null, this.ciphers = t.ciphers || null, this.rejectUnauthorized = t.rejectUnauthorized === undefined || t.rejectUnauthorized, this.forceNode = !!t.forceNode, this.isReactNative = "undefined" != typeof navigator && "string" == typeof navigator.product && "reactnative" === navigator.product.toLowerCase(), ("undefined" == typeof self || this.isReactNative) && (t.extraHeaders && (0, o["default"])(t.extraHeaders).length > 0 && (this.extraHeaders = t.extraHeaders), t.localAddress && (this.localAddress = t.localAddress)), this.id = null, this.upgrades = null, this.pingInterval = null, this.pingTimeout = null, this.pingIntervalTimer = null, this.pingTimeoutTimer = null, this.open();}e.exports = d, d.priorWebsocketSuccess = !1, a(d.prototype), d.protocol = c.protocol, d.Socket = d, d.Transport = n(75), d.transports = n(112), d.parser = n(34), d.prototype.createTransport = function (e) {var t = function (e) {var t = {};for (var n in e) {e.hasOwnProperty(n) && (t[n] = e[n]);}return t;}(this.query);t.EIO = c.protocol, t.transport = e;var n = this.transportOptions[e] || {};return this.id && (t.sid = this.id), new s[e]({ query: t, socket: this, agent: n.agent || this.agent, hostname: n.hostname || this.hostname, port: n.port || this.port, secure: n.secure || this.secure, path: n.path || this.path, forceJSONP: n.forceJSONP || this.forceJSONP, jsonp: n.jsonp || this.jsonp, forceBase64: n.forceBase64 || this.forceBase64, enablesXDR: n.enablesXDR || this.enablesXDR, timestampRequests: n.timestampRequests || this.timestampRequests, timestampParam: n.timestampParam || this.timestampParam, policyPort: n.policyPort || this.policyPort, pfx: n.pfx || this.pfx, key: n.key || this.key, passphrase: n.passphrase || this.passphrase, cert: n.cert || this.cert, ca: n.ca || this.ca, ciphers: n.ciphers || this.ciphers, rejectUnauthorized: n.rejectUnauthorized || this.rejectUnauthorized, perMessageDeflate: n.perMessageDeflate || this.perMessageDeflate, extraHeaders: n.extraHeaders || this.extraHeaders, forceNode: n.forceNode || this.forceNode, localAddress: n.localAddress || this.localAddress, requestTimeout: n.requestTimeout || this.requestTimeout, protocols: n.protocols || void 0, isReactNative: this.isReactNative });}, d.prototype.open = function () {var e;if (this.rememberUpgrade && d.priorWebsocketSuccess && -1 !== this.transports.indexOf("websocket")) e = "websocket";else {if (0 === this.transports.length) {var t = this;return void setTimeout(function () {t.emit("error", "No transports available");}, 0);}e = this.transports[0];}this.readyState = "opening";try {e = this.createTransport(e);} catch (n) {return this.transports.shift(), void this.open();}e.open(), this.setTransport(e);}, d.prototype.setTransport = function (e) {e.name;var t = this;this.transport && (this.transport.name, this.transport.removeAllListeners()), this.transport = e, e.on("drain", function () {t.onDrain();}).on("packet", function (e) {t.onPacket(e);}).on("error", function (e) {t.onError(e);}).on("close", function () {t.onClose("transport close");});}, d.prototype.probe = function (e) {var t = this.createTransport(e, { probe: 1 }),n = !1,o = this;function i() {if (o.onlyBinaryUpgrades) {var e = !this.supportsBinary && o.transport.supportsBinary;n = n || e;}n || (t.send([{ type: "ping", data: "probe" }]), t.once("packet", function (e) {if (!n) if ("pong" === e.type && "probe" === e.data) {if (o.upgrading = !0, o.emit("upgrading", t), !t) return;d.priorWebsocketSuccess = "websocket" === t.name, o.transport.name, o.transport.pause(function () {n || "closed" !== o.readyState && (l(), o.setTransport(t), t.send([{ type: "upgrade" }]), o.emit("upgrade", t), t = null, o.upgrading = !1, o.flush());});} else {var i = new Error("probe error");i.transport = t.name, o.emit("upgradeError", i);}}));}function r() {n || (n = !0, l(), t.close(), t = null);}function s(e) {var n = new Error("probe error: " + e);n.transport = t.name, r(), o.emit("upgradeError", n);}function a() {s("transport closed");}function u() {s("socket closed");}function c(e) {t && e.name !== t.name && (e.name, t.name, r());}function l() {t.removeListener("open", i), t.removeListener("error", s), t.removeListener("close", a), o.removeListener("close", u), o.removeListener("upgrading", c);}d.priorWebsocketSuccess = !1, t.once("open", i), t.once("error", s), t.once("close", a), this.once("close", u), this.once("upgrading", c), t.open();}, d.prototype.onOpen = function () {if (this.readyState = "open", d.priorWebsocketSuccess = "websocket" === this.transport.name, this.emit("open"), this.flush(), "open" === this.readyState && this.upgrade && this.transport.pause) for (var e = 0, t = this.upgrades.length; e < t; e++) {this.probe(this.upgrades[e]);}}, d.prototype.onPacket = function (e) {if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) switch (e.type, e.data, this.emit("packet", e), this.emit("heartbeat"), e.type) {case "open":this.onHandshake(JSON.parse(e.data));break;case "pong":this.setPing(), this.emit("pong");break;case "error":var t = new Error("server error");t.code = e.data, this.onError(t);break;case "message":this.emit("data", e.data), this.emit("message", e.data);} else this.readyState;}, d.prototype.onHandshake = function (e) {this.emit("handshake", e), this.id = e.sid, this.transport.query.sid = e.sid, this.upgrades = this.filterUpgrades(e.upgrades), this.pingInterval = e.pingInterval, this.pingTimeout = e.pingTimeout, this.onOpen(), "closed" !== this.readyState && (this.setPing(), this.removeListener("heartbeat", this.onHeartbeat), this.on("heartbeat", this.onHeartbeat));}, d.prototype.onHeartbeat = function (e) {clearTimeout(this.pingTimeoutTimer);var t = this;t.pingTimeoutTimer = setTimeout(function () {"closed" !== t.readyState && t.onClose("ping timeout");}, e || t.pingInterval + t.pingTimeout);}, d.prototype.setPing = function () {var e = this;clearTimeout(e.pingIntervalTimer), e.pingIntervalTimer = setTimeout(function () {e.pingTimeout, e.ping(), e.onHeartbeat(e.pingTimeout);}, e.pingInterval);}, d.prototype.ping = function () {var e = this;this.sendPacket("ping", function () {e.emit("ping");});}, d.prototype.onDrain = function () {this.writeBuffer.splice(0, this.prevBufferLen), this.prevBufferLen = 0, 0 === this.writeBuffer.length ? this.emit("drain") : this.flush();}, d.prototype.flush = function () {"closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length && (this.writeBuffer.length, this.transport.send(this.writeBuffer), this.prevBufferLen = this.writeBuffer.length, this.emit("flush"));}, d.prototype.write = d.prototype.send = function (e, t, n) {return this.sendPacket("message", e, t, n), this;}, d.prototype.sendPacket = function (e, t, n, o) {if ("function" == typeof t && (o = t, t = undefined), "function" == typeof n && (o = n, n = null), "closing" !== this.readyState && "closed" !== this.readyState) {(n = n || {}).compress = !1 !== n.compress;var i = { type: e, data: t, options: n };this.emit("packetCreate", i), this.writeBuffer.push(i), o && this.once("flush", o), this.flush();}}, d.prototype.close = function () {if ("opening" === this.readyState || "open" === this.readyState) {this.readyState = "closing";var e = this;this.writeBuffer.length ? this.once("drain", function () {this.upgrading ? o() : t();}) : this.upgrading ? o() : t();}function t() {e.onClose("forced close"), e.transport.close();}function n() {e.removeListener("upgrade", n), e.removeListener("upgradeError", n), t();}function o() {e.once("upgrade", n), e.once("upgradeError", n);}return this;}, d.prototype.onError = function (e) {d.priorWebsocketSuccess = !1, this.emit("error", e), this.onClose("transport error", e);}, d.prototype.onClose = function (e, t) {if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {clearTimeout(this.pingIntervalTimer), clearTimeout(this.pingTimeoutTimer), this.transport.removeAllListeners("close"), this.transport.close(), this.transport.removeAllListeners(), this.readyState = "closed", this.id = null, this.emit("close", e, t), this.writeBuffer = [], this.prevBufferLen = 0;}}, d.prototype.filterUpgrades = function (e) {for (var t = [], n = 0, o = e.length; n < o; n++) {~u(this.transports, e[n]) && t.push(e[n]);}return t;};}, function (e, t, n) {"use strict";(function (t) {var o = n(252),i = n(77);e.exports = l;var r,s = /\n/g,a = /\\n/g;function u() {}function c() {return "undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0 !== t ? t : {};}function l(e) {if (o.call(this, e), this.query = this.query || {}, !r) {var t = c();r = t.___eio = t.___eio || [];}this.index = r.length;var n = this;r.push(function (e) {n.onData(e);}), this.query.j = this.index, "function" == typeof addEventListener && addEventListener("beforeunload", function () {n.script && (n.script.onerror = u);}, !1);}i(l, o), l.prototype.supportsBinary = !1, l.prototype.doClose = function () {this.script && (this.script.parentNode.removeChild(this.script), this.script = null), this.form && (this.form.parentNode.removeChild(this.form), this.form = null, this.iframe = null), o.prototype.doClose.call(this);}, l.prototype.doPoll = function () {var e = this,t = document.createElement("script");this.script && (this.script.parentNode.removeChild(this.script), this.script = null), t.async = !0, t.src = this.uri(), t.onerror = function (t) {e.onError("jsonp poll error", t);};var n = document.getElementsByTagName("script")[0];n ? n.parentNode.insertBefore(t, n) : (document.head || document.body).appendChild(t), this.script = t, "undefined" != typeof navigator && /gecko/i.test(navigator.userAgent) && setTimeout(function () {var e = document.createElement("iframe");document.body.appendChild(e), document.body.removeChild(e);}, 100);}, l.prototype.doWrite = function (e, t) {var n = this;if (!this.form) {var o,i = document.createElement("form"),r = document.createElement("textarea"),u = this.iframeId = "eio_iframe_" + this.index;i.className = "socketio", i.style.position = "absolute", i.style.top = "-1000px", i.style.left = "-1000px", i.target = u, i.method = "POST", i.setAttribute("accept-charset", "utf-8"), r.name = "d", i.appendChild(r), document.body.appendChild(i), this.form = i, this.area = r;}function c() {l(), t();}function l() {if (n.iframe) try {n.form.removeChild(n.iframe);} catch (t) {n.onError("jsonp polling iframe removal error", t);}try {var e = '<iframe src="javascript:0" name="' + n.iframeId + '">';o = document.createElement(e);} catch (t) {(o = document.createElement("iframe")).name = n.iframeId, o.src = "javascript:0";}o.id = n.iframeId, n.form.appendChild(o), n.iframe = o;}this.form.action = this.uri(), l(), e = e.replace(a, "\\\n"), this.area.value = e.replace(s, "\\n");try {this.form.submit();} catch (f) {}this.iframe.attachEvent ? this.iframe.onreadystatechange = function () {"complete" === n.iframe.readyState && c();} : this.iframe.onload = c;};}).call(t, n(251));}, function (e, t) {var n;n = function () {return this;}();try {n = n || Function("return this")() || (0, eval)("this");} catch (o) {"object" == typeof window && (n = window);}e.exports = n;}, function (e, t, n) {"use strict";var o = n(75),i = n(76),r = n(34),s = n(77),a = n(114);n(78)("engine.io-client:polling");e.exports = c;var u = null != new (n(261))({ xdomain: !1 }).responseType;function c(e) {var t = e && e.forceBase64;u && !t || (this.supportsBinary = !1), o.call(this, e);}s(c, o), c.prototype.name = "polling", c.prototype.doOpen = function () {this.poll();}, c.prototype.pause = function (e) {var t = this;function n() {t.readyState = "paused", e();}if (this.readyState = "pausing", this.polling || !this.writable) {var o = 0;this.polling && (o++, this.once("pollComplete", function () {--o || n();})), this.writable || (o++, this.once("drain", function () {--o || n();}));} else n();}, c.prototype.poll = function () {this.polling = !0, this.doPoll(), this.emit("poll");}, c.prototype.onData = function (e) {var t = this;r.decodePayload(e, this.socket.binaryType, function (e, n, o) {if ("opening" === t.readyState && t.onOpen(), "close" === e.type) return t.onClose(), !1;t.onPacket(e);}), "closed" !== this.readyState && (this.polling = !1, this.emit("pollComplete"), "open" === this.readyState ? this.poll() : this.readyState);}, c.prototype.doClose = function () {var e = this;function t() {e.write([{ type: "close" }]);}"open" === this.readyState ? t() : this.once("open", t);}, c.prototype.write = function (e) {var t = this;this.writable = !1;var n = function n() {t.writable = !0, t.emit("drain");};r.encodePayload(e, this.supportsBinary, function (e) {t.doWrite(e, n);});}, c.prototype.uri = function () {var e = this.query || {},t = this.secure ? "https" : "http",n = "";return !1 !== this.timestampRequests && (e[this.timestampParam] = a()), this.supportsBinary || e.sid || (e.b64 = 1), e = i.encode(e), this.port && ("https" === t && 443 !== Number(this.port) || "http" === t && 80 !== Number(this.port)) && (n = ":" + this.port), e.length && (e = "?" + e), t + "://" + (-1 !== this.hostname.indexOf(":") ? "[" + this.hostname + "]" : this.hostname) + n + this.path + e;};}, function (e, t, n) {"use strict";var o,i = n(72),r = (o = i) && o.__esModule ? o : { "default": o };e.exports = r["default"] || function (e) {var t = [],n = Object.prototype.hasOwnProperty;for (var o in e) {n.call(e, o) && t.push(o);}return t;};}, function (e, t, n) {var o = n(255),i = Object.prototype.toString,r = "function" == typeof Blob || "undefined" != typeof Blob && "[object BlobConstructor]" === i.call(Blob),s = "function" == typeof File || "undefined" != typeof File && "[object FileConstructor]" === i.call(File);e.exports = function a(e) {if (!e || "object" != typeof e) return !1;if (o(e)) {for (var t = 0, n = e.length; t < n; t++) {if (a(e[t])) return !0;}return !1;}if ("function" == typeof Buffer && Buffer.isBuffer && Buffer.isBuffer(e) || "function" == typeof ArrayBuffer && e instanceof ArrayBuffer || r && e instanceof Blob || s && e instanceof File) return !0;if (e.toJSON && "function" == typeof e.toJSON && 1 === arguments.length) return a(e.toJSON(), !0);for (var i in e) {if (Object.prototype.hasOwnProperty.call(e, i) && a(e[i])) return !0;}return !1;};}, function (e, t) {var n = {}.toString;e.exports = Array.isArray || function (e) {return "[object Array]" == n.call(e);};}, function (e, t) {function n() {}e.exports = function (e, t, o) {var i = !1;return o = o || n, r.count = e, 0 === e ? t() : r;function r(e, n) {if (r.count <= 0) throw new Error("after called too many times");--r.count, e ? (i = !0, t(e), t = o) : 0 !== r.count || i || t(null, n);}};}, function (e, t, n) {"use strict";
    /*! https://mths.be/utf8js v2.1.2 by @mathias */var o,i,r,s = String.fromCharCode;function a(e) {for (var t, n, o = [], i = 0, r = e.length; i < r;) {(t = e.charCodeAt(i++)) >= 55296 && t <= 56319 && i < r ? 56320 == (64512 & (n = e.charCodeAt(i++))) ? o.push(((1023 & t) << 10) + (1023 & n) + 65536) : (o.push(t), i--) : o.push(t);}return o;}function u(e, t) {if (e >= 55296 && e <= 57343) {if (t) throw Error("Lone surrogate U+" + e.toString(16).toUpperCase() + " is not a scalar value");return !1;}return !0;}function c(e, t) {return s(e >> t & 63 | 128);}function l(e, t) {if (0 == (4294967168 & e)) return s(e);var n = "";return 0 == (4294965248 & e) ? n = s(e >> 6 & 31 | 192) : 0 == (4294901760 & e) ? (u(e, t) || (e = 65533), n = s(e >> 12 & 15 | 224), n += c(e, 6)) : 0 == (4292870144 & e) && (n = s(e >> 18 & 7 | 240), n += c(e, 12), n += c(e, 6)), n += s(63 & e | 128);}function f() {if (r >= i) throw Error("Invalid byte index");var e = 255 & o[r];if (r++, 128 == (192 & e)) return 63 & e;throw Error("Invalid continuation byte");}function d(e) {var t, n;if (r > i) throw Error("Invalid byte index");if (r == i) return !1;if (t = 255 & o[r], r++, 0 == (128 & t)) return t;if (192 == (224 & t)) {if ((n = (31 & t) << 6 | f()) >= 128) return n;throw Error("Invalid continuation byte");}if (224 == (240 & t)) {if ((n = (15 & t) << 12 | f() << 6 | f()) >= 2048) return u(n, e) ? n : 65533;throw Error("Invalid continuation byte");}if (240 == (248 & t) && (n = (7 & t) << 18 | f() << 12 | f() << 6 | f()) >= 65536 && n <= 1114111) return n;throw Error("Invalid UTF-8 detected");}e.exports = { version: "2.1.2", encode: function encode(e, t) {for (var n = !1 !== (t = t || {}).strict, o = a(e), i = o.length, r = -1, s = ""; ++r < i;) {s += l(o[r], n);}return s;}, decode: function decode(e, t) {var n = !1 !== (t = t || {}).strict;o = a(e), i = o.length, r = 0;for (var u, c = []; !1 !== (u = d(n));) {c.push(u);}return function (e) {for (var t, n = e.length, o = -1, i = ""; ++o < n;) {(t = e[o]) > 65535 && (i += s((t -= 65536) >>> 10 & 1023 | 55296), t = 56320 | 1023 & t), i += s(t);}return i;}(c);} };}, function (e, t) {var n = void 0 !== n ? n : "undefined" != typeof WebKitBlobBuilder ? WebKitBlobBuilder : "undefined" != typeof MSBlobBuilder ? MSBlobBuilder : "undefined" != typeof MozBlobBuilder && MozBlobBuilder,o = function () {try {return 2 === new Blob(["hi"]).size;} catch (e) {return !1;}}(),i = o && function () {try {return 2 === new Blob([new Uint8Array([1, 2])]).size;} catch (e) {return !1;}}(),r = n && n.prototype.append && n.prototype.getBlob;function s(e) {return e.map(function (e) {if (e.buffer instanceof ArrayBuffer) {var t = e.buffer;if (e.byteLength !== t.byteLength) {var n = new Uint8Array(e.byteLength);n.set(new Uint8Array(t, e.byteOffset, e.byteLength)), t = n.buffer;}return t;}return e;});}function a(e, t) {t = t || {};var o = new n();return s(e).forEach(function (e) {o.append(e);}), t.type ? o.getBlob(t.type) : o.getBlob();}function u(e, t) {return new Blob(s(e), t || {});}"undefined" != typeof Blob && (a.prototype = Blob.prototype, u.prototype = Blob.prototype), e.exports = o ? i ? Blob : u : r ? a : undefined;}, function (e, t, n) {function o(e) {var n;function o() {if (o.enabled) {var e = o,i = +new Date(),r = i - (n || i);e.diff = r, e.prev = n, e.curr = i, n = i;for (var s = new Array(arguments.length), a = 0; a < s.length; a++) {s[a] = arguments[a];}s[0] = t.coerce(s[0]), "string" != typeof s[0] && s.unshift("%O");var u = 0;s[0] = s[0].replace(/%([a-zA-Z%])/g, function (n, o) {if ("%%" === n) return n;u++;var i = t.formatters[o];if ("function" == typeof i) {var r = s[u];n = i.call(e, r), s.splice(u, 1), u--;}return n;}), t.formatArgs.call(e, s), (o.log || t.log || console.log.bind(console)).apply(e, s);}}return o.namespace = e, o.enabled = t.enabled(e), o.useColors = t.useColors(), o.color = function (e) {var n,o = 0;for (n in e) {o = (o << 5) - o + e.charCodeAt(n), o |= 0;}return t.colors[Math.abs(o) % t.colors.length];}(e), o.destroy = i, "function" == typeof t.init && t.init(o), t.instances.push(o), o;}function i() {var e = t.instances.indexOf(this);return -1 !== e && (t.instances.splice(e, 1), !0);}(t = e.exports = o.debug = o["default"] = o).coerce = function (e) {return e instanceof Error ? e.stack || e.message : e;}, t.disable = function () {t.enable("");}, t.enable = function (e) {var n;t.save(e), t.names = [], t.skips = [];var o = ("string" == typeof e ? e : "").split(/[\s,]+/),i = o.length;for (n = 0; n < i; n++) {o[n] && ("-" === (e = o[n].replace(/\*/g, ".*?"))[0] ? t.skips.push(new RegExp("^" + e.substr(1) + "$")) : t.names.push(new RegExp("^" + e + "$")));}for (n = 0; n < t.instances.length; n++) {var r = t.instances[n];r.enabled = t.enabled(r.namespace);}}, t.enabled = function (e) {if ("*" === e[e.length - 1]) return !0;var n, o;for (n = 0, o = t.skips.length; n < o; n++) {if (t.skips[n].test(e)) return !1;}for (n = 0, o = t.names.length; n < o; n++) {if (t.names[n].test(e)) return !0;}return !1;}, t.humanize = n(260), t.instances = [], t.names = [], t.skips = [], t.formatters = {};}, function (e, t) {var n = 1e3,o = 60 * n,i = 60 * o,r = 24 * i,s = 365.25 * r;function a(e, t, n) {if (!(e < t)) return e < 1.5 * t ? Math.floor(e / t) + " " + n : Math.ceil(e / t) + " " + n + "s";}e.exports = function (e, t) {t = t || {};var u,c = typeof e;if ("string" === c && e.length > 0) return function (e) {if ((e = String(e)).length > 100) return;var t = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);if (!t) return;var a = parseFloat(t[1]);switch ((t[2] || "ms").toLowerCase()) {case "years":case "year":case "yrs":case "yr":case "y":return a * s;case "days":case "day":case "d":return a * r;case "hours":case "hour":case "hrs":case "hr":case "h":return a * i;case "minutes":case "minute":case "mins":case "min":case "m":return a * o;case "seconds":case "second":case "secs":case "sec":case "s":return a * n;case "milliseconds":case "millisecond":case "msecs":case "msec":case "ms":return a;default:return undefined;}}(e);if ("number" === c && !1 === isNaN(e)) return t.long ? a(u = e, r, "day") || a(u, i, "hour") || a(u, o, "minute") || a(u, n, "second") || u + " ms" : function (e) {if (e >= r) return Math.round(e / r) + "d";if (e >= i) return Math.round(e / i) + "h";if (e >= o) return Math.round(e / o) + "m";if (e >= n) return Math.round(e / n) + "s";return e + "ms";}(e);throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e));};}, function (e, t, n) {"use strict";var o = n(262);e.exports = function (e) {var t = e.xdomain,n = e.xscheme,i = e.enablesXDR;try {if ("undefined" != typeof XMLHttpRequest && (!t || o)) return new XMLHttpRequest();} catch (r) {}try {if ("undefined" != typeof XDomainRequest && !n && i) return new XDomainRequest();} catch (r) {}if (!t) try {return new self[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");} catch (r) {}};}, function (e, t) {try {e.exports = "undefined" != typeof XMLHttpRequest && "withCredentials" in new XMLHttpRequest();} catch (n) {e.exports = !1;}}, function (e, t, n) {"use strict";var o,i = n(20),r = (o = i) && o.__esModule ? o : { "default": o };var s,a,u = n(75),c = n(34),l = n(76),f = n(77),d = n(114);n(78)("engine.io-client:websocket");if ("undefined" == typeof uni && "undefined" == typeof wx || "undefined" != typeof WebSocket) if ("undefined" != typeof WebSocket) s = WebSocket;else if ("undefined" != typeof self) s = self.WebSocket || self.MozWebSocket;else try {a = n(264);} catch (y) {}var p = s || a;function h(e) {e && e.forceBase64 && (this.supportsBinary = !1), ("undefined" == typeof uni && "undefined" == typeof wx || "undefined" != typeof WebSocket) && (this.perMessageDeflate = e.perMessageDeflate, this.usingBrowserWebSocket = s && !e.forceNode, this.protocols = e.protocols, this.usingBrowserWebSocket || (p = a)), u.call(this, e);}"undefined" == typeof uni && "undefined" == typeof wx || "undefined" != typeof WebSocket || (p = function p(e) {var t = this;if (t.onopen = function () {}, t.onclose = function () {}, t.onmessage = function (e) {}, t.onerror = function (e) {}, "object" === ("undefined" == typeof tt ? "undefined" : (0, r["default"])(tt)) && tt.getSystemInfo) {var n = tt.connectSocket({ url: e });t.send = function (e) {n.send({ data: e });}, t.close = function () {n.close();}, n.onOpen(function () {t.onopen();}), n.onError(function (e) {t.onerror(e);}), n.onMessage(function (e) {t.onmessage(e);}), n.onClose(function () {t.onclose();});} else "undefined" != typeof uni ? (t.send = function (e) {uni.sendSocketMessage({ data: e });}, t.close = function () {uni.closeSocket();}, uni.onSocketOpen(function (e) {t.onopen();}), uni.onSocketError(function (e) {t.onerror(e);}), uni.onSocketMessage(function (e) {t.onmessage(e);}), uni.onSocketClose(function (e) {t.onclose();}), uni.connectSocket({ url: e })) : (t.send = function (e) {wx.sendSocketMessage({ data: e });}, t.close = function () {wx.closeSocket();}, wx.onSocketOpen(function (e) {t.onopen();}), wx.onSocketError(function (e) {t.onerror(e);}), wx.onSocketMessage(function (e) {t.onmessage(e);}), wx.onSocketClose(function (e) {t.onclose();}), wx.connectSocket({ url: e }));}), e.exports = h, f(h, u), h.prototype.name = "websocket", h.prototype.supportsBinary = !1, h.prototype.doOpen = function () {if (this.check()) {var e,t,n = this.uri();("undefined" == typeof uni && "undefined" == typeof wx || "undefined" != typeof WebSocket) && (e = this.protocols), (t = "undefined" == typeof uni && "undefined" == typeof wx || "undefined" != typeof WebSocket ? { agent: this.agent, perMessageDeflate: this.perMessageDeflate } : { agent: this.agent }).pfx = this.pfx, t.key = this.key, t.passphrase = this.passphrase, t.cert = this.cert, t.ca = this.ca, t.ciphers = this.ciphers, t.rejectUnauthorized = this.rejectUnauthorized, this.extraHeaders && (t.headers = this.extraHeaders), this.localAddress && (t.localAddress = this.localAddress);try {"undefined" == typeof uni && "undefined" == typeof wx || "undefined" != typeof WebSocket ? this.ws = this.usingBrowserWebSocket && !this.isReactNative ? e ? new p(n, e) : new p(n) : new p(n, e, t) : this.ws = new p(n);} catch (o) {return this.emit("error", o);}this.ws.binaryType === undefined && (this.supportsBinary = !1), this.ws.supports && this.ws.supports.binary ? (this.supportsBinary = !0, this.ws.binaryType = "nodebuffer") : this.ws.binaryType = "arraybuffer", this.addEventListeners();}}, h.prototype.addEventListeners = function () {var e = this;this.ws.onopen = function () {e.onOpen();}, this.ws.onclose = function () {e.onClose();}, this.ws.onmessage = function (t) {e.onData(t.data);}, this.ws.onerror = function (t) {e.onError("websocket error", t);};}, h.prototype.write = function (e) {var t = this;this.writable = !1;for (var n = e.length, o = 0, i = n; o < i; o++) {!function (e) {c.encodePacket(e, t.supportsBinary, function (o) {if ("undefined" == typeof uni && "undefined" == typeof wx || "undefined" != typeof WebSocket) {if (!t.usingBrowserWebSocket) {var i = {};if (e.options && (i.compress = e.options.compress), t.perMessageDeflate) ("string" == typeof o ? Buffer.byteLength(o) : o.length) < t.perMessageDeflate.threshold && (i.compress = !1);}try {t.usingBrowserWebSocket ? t.ws.send(o) : t.ws.send(o, i);} catch (y) {}} else try {t.ws.send(o);} catch (y) {}--n || r();});}(e[o]);}function r() {t.emit("flush"), setTimeout(function () {t.writable = !0, t.emit("drain");}, 0);}}, h.prototype.onClose = function () {u.prototype.onClose.call(this);}, h.prototype.doClose = function () {"undefined" != typeof this.ws && this.ws.close();}, h.prototype.uri = function () {var e = this.query || {},t = this.secure ? "wss" : "ws",n = "";return this.port && ("wss" === t && 443 !== Number(this.port) || "ws" === t && 80 !== Number(this.port)) && (n = ":" + this.port), this.timestampRequests && (e[this.timestampParam] = d()), this.supportsBinary || (e.b64 = 1), (e = l.encode(e)).length && (e = "?" + e), t + "://" + (-1 !== this.hostname.indexOf(":") ? "[" + this.hostname + "]" : this.hostname) + n + this.path + e;}, h.prototype.check = function () {return !(!p || "__initialize" in p && this.name === h.prototype.name);};}, function (e, t) {}, function (e, t) {var n = [].indexOf;e.exports = function (e, t) {if (n) return e.indexOf(t);for (var o = 0; o < e.length; ++o) {if (e[o] === t) return o;}return -1;};}, function (e, t) {var n = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,o = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];e.exports = function (e) {var t = e,i = e.indexOf("["),r = e.indexOf("]");-1 != i && -1 != r && (e = e.substring(0, i) + e.substring(i, r).replace(/:/g, ";") + e.substring(r, e.length));for (var s = n.exec(e || ""), a = {}, u = 14; u--;) {a[o[u]] = s[u] || "";}return -1 != i && -1 != r && (a.source = t, a.host = a.host.substring(1, a.host.length - 1).replace(/;/g, ":"), a.authority = a.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), a.ipv6uri = !0), a;};}, function (e, t) {e.exports = function (e, t) {for (var n = [], o = (t = t || 0) || 0; o < e.length; o++) {n[o - t] = e[o];}return n;};}, function (e, t) {t.encode = function (e) {var t = "";for (var n in e) {e.hasOwnProperty(n) && (t.length && (t += "&"), t += encodeURIComponent(n) + "=" + encodeURIComponent(e[n]));}return t;}, t.decode = function (e) {for (var t = {}, n = e.split("&"), o = 0, i = n.length; o < i; o++) {var r = n[o].split("=");t[decodeURIComponent(r[0])] = decodeURIComponent(r[1]);}return t;};}, function (e, t, n) {var o = n(270),i = Object.prototype.toString,r = "function" == typeof Blob || "undefined" != typeof Blob && "[object BlobConstructor]" === i.call(Blob),s = "function" == typeof File || "undefined" != typeof File && "[object FileConstructor]" === i.call(File);e.exports = function a(e) {if (!e || "object" != typeof e) return !1;if (o(e)) {for (var t = 0, n = e.length; t < n; t++) {if (a(e[t])) return !0;}return !1;}if ("function" == typeof Buffer && Buffer.isBuffer && Buffer.isBuffer(e) || "function" == typeof ArrayBuffer && e instanceof ArrayBuffer || r && e instanceof Blob || s && e instanceof File) return !0;if (e.toJSON && "function" == typeof e.toJSON && 1 === arguments.length) return a(e.toJSON(), !0);for (var i in e) {if (Object.prototype.hasOwnProperty.call(e, i) && a(e[i])) return !0;}return !1;};}, function (e, t) {var n = {}.toString;e.exports = Array.isArray || function (e) {return "[object Array]" == n.call(e);};}, function (e, t) {var n = [].indexOf;e.exports = function (e, t) {if (n) return e.indexOf(t);for (var o = 0; o < e.length; ++o) {if (e[o] === t) return o;}return -1;};}, function (e, t) {function n(e) {e = e || {}, this.ms = e.min || 100, this.max = e.max || 1e4, this.factor = e.factor || 2, this.jitter = e.jitter > 0 && e.jitter <= 1 ? e.jitter : 0, this.attempts = 0;}e.exports = n, n.prototype.duration = function () {var e = this.ms * Math.pow(this.factor, this.attempts++);if (this.jitter) {var t = Math.random(),n = Math.floor(t * this.jitter * e);e = 0 == (1 & Math.floor(10 * t)) ? e - n : e + n;}return 0 | Math.min(e, this.max);}, n.prototype.reset = function () {this.attempts = 0;}, n.prototype.setMin = function (e) {this.ms = e;}, n.prototype.setMax = function (e) {this.max = e;}, n.prototype.setJitter = function (e) {this.jitter = e;};}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = f(n(3)),i = f(n(0)),r = f(n(1)),s = f(n(4)),a = f(n(12)),u = f(n(5)),c = f(n(110)),l = f(n(28));function f(e) {return e && e.__esModule ? e : { "default": e };}var d = function (e) {function t(e) {(0, i["default"])(this, t);var n = (0, s["default"])(this, (t.__proto__ || (0, o["default"])(t)).call(this));return n.reconnectingObservers = [], n.addReconnectingObserver(e.onReconnecting), n.addDisconnectedObserver(e.onDisconnected), n;}return (0, u["default"])(t, e), (0, r["default"])(t, [{ key: "connect", value: function value(e) {(0, a["default"])(t.prototype.__proto__ || (0, o["default"])(t.prototype), "connect", this).call(this), this.io = this.io.connect(e.uri, e.opts), this.initListener();} }, { key: "doEmit", value: function value(e, t, n) {this.io.emit(e, t, n);} }, { key: "initListener", value: function value() {var e = this;this.io.on("reconnecting", function (t) {e.status = l["default"].CONNECTING, e.notify(e.reconnectingObservers, t);}), this.io.on("connect", function () {e.status = l["default"].CONNECTED, e.notify(e.connectedObservers);}), this.io.on("disconnect", function () {e.status = l["default"].DISCONNECTED, e.notify(e.disconnectedObservers);}), this.io.on("connect_error", function (e) {});} }, { key: "addReconnectingObserver", value: function value(e) {this.reconnectingObservers.push(e);} }]), t;}(c["default"]);t["default"] = d;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = s(n(0)),i = s(n(1)),r = n(2);function s(e) {return e && e.__esModule ? e : { "default": e };}var a = function () {function e(t) {(0, o["default"])(this, e), this.callback = r.noop, this.guidList = [], this.callback = t;}return (0, i["default"])(e, [{ key: "onMessage", value: function value(e, t) {"string" == typeof t && (t = JSON.parse(t)), this.guidList.findIndex(function (e) {return e === t.i;}) > -1 || (this.guidList.unshift(t.i), this.guidList.length > 300 && this.guidList.pop(), this.callback(t));} }]), e;}();t["default"] = a;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = c(n(33)),i = c(n(6)),r = c(n(0)),s = c(n(1)),a = n(2),u = n(119);function c(e) {return e && e.__esModule ? e : { "default": e };}var l = function () {function e(t) {(0, r["default"])(this, e), this.goEasySocket = null, this.goEasySocket = t, this.support() && (this.GoEasyUniapp = uni.requireNativePlugin("GoEasy-Uniapp"), t.addMessageObserver("imMessage", this.onNewMessageReceived.bind(this)), t.addMessageObserver("message", this.onNewMessageReceived.bind(this)));}return (0, s["default"])(e, [{ key: "onNewMessageReceived", value: function value(e) {this.createLocalNotification(e);} }, { key: "createLocalNotification", value: function value(e) {if (a.calibrator.isObject(e.nt) && !0 === u.uniApp.runningBackend()) {var t = e.nt.t,n = e.nt.c;this.GoEasyUniapp ? this.GoEasyUniapp.createLocalNotification(t, n) : plus.push.createMessage(n, null, { title: t });}} }, { key: "getRegId", value: function value() {var e = this;return new i["default"](function (t, n) {try {e.GoEasyUniapp ? e.GoEasyUniapp.regId(function (e) {t(e);}, function (n) {if (1e6 == n.data.code) var i = setInterval(function () {e.GoEasyUniapp.regId(function (e) {clearInterval(i), t(e);}, function (e) {1e6 != e.data.code && (clearInterval(i), console.error("注册厂商通道失败：" + (0, o["default"])(e)), t());});}, 5e3);else console.error("注册厂商通道失败：" + (0, o["default"])(n)), t();}) : (console.error("注册厂商通道失败：GoEasy-Uniapp is not installed correctly"), t());} catch (i) {console.error("注册厂商通道失败：" + (0, o["default"])(i)), t();}});} }, { key: "support", value: function value() {return a.env.isUni() && !0 === this.goEasySocket.allowNotification && a.env.isSupportHtmlPlus() && !a.env.isBrowserClient();} }]), e;}();t["default"] = l;}, function (e, t) {e.exports = { name: "goeasy", version: "2.0.13", description: "goeasy socket", keywords: ["realtime", "framework", "websocket", "tcp", "events", "client"], files: ["dist/"], main: "dist/goeasy.min.js", scripts: { build: "npm run build-goeasy", "build-snapshot": "npm run build-goeasy && npm run build-goeasy-dev", "build-goeasy": "./node_modules/.bin/webpack --config build/webpack.goeasy.config.js", "build-goeasy-dev": "./node_modules/.bin/webpack --config build/webpack.goeasy-dev.config.js", "start:dev": "webpack-dev-server --open --progress --config build/webpack.serve.config.js" }, license: "MIT", dependencies: { "socket.io-client-goeasy": "./dependencies/socket.io-client-goeasy" }, devDependencies: { "babel-core": "^6.26.3", "babel-loader": "^7.1.4", "babel-plugin-add-module-exports": "^0.2.1", "babel-plugin-transform-class-properties": "^6.24.1", "babel-plugin-transform-runtime": "^6.23.0", "babel-preset-env": "^1.7.0", "babel-runtime": "^6.26.0", "core-js": "^3.11.3", "es3ify-loader": "^0.2.0", "html-webpack-plugin": "^3.2.0", "strip-loader": "^0.1.2", "uglifyjs-webpack-plugin": "^1.3.0", uuid: "^3.3.2", webpack: "^3.12.0", "webpack-dev-server": "^2.11.5" } };}]);});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"], __webpack_require__(/*! ./../../../../../HBuilderX/plugins/uniapp-cli/node_modules/buffer/index.js */ 41).Buffer))

/***/ }),

/***/ 41:
/*!**************************************!*\
  !*** ./node_modules/buffer/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(/*! base64-js */ 42)
var ieee754 = __webpack_require__(/*! ieee754 */ 43)
var isArray = __webpack_require__(/*! isarray */ 44)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 42:
/*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ 43:
/*!***************************************!*\
  !*** ./node_modules/ieee754/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ 44:
/*!***************************************!*\
  !*** ./node_modules/isarray/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ 65:
/*!******************************************!*\
  !*** D:/git/doctor/final/api/request.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.request = request;exports.showToast = showToast;var baseUrl = "http://47.97.158.11:8088"; //这里放置url域名
function request(options) {//封装的requset
  var url = options.url,data = options.data,method = options.method,headers = options.headers;
  data = data || {},

  uni.showToast({ //请求数据时的loading
    title: '加载中',
    duration: 200,
    icon: "loading" });

  return new Promise(function (resolve, rejext) {
    uni.request({ //这里是uniapp网络请求的api
      url: baseUrl + url, //仅为示例，并非真实接口地址。
      data: data,
      method: method || "GET", //默认请求方式是get
      headers: headers || {},
      success: function success(res) {
        resolve(res);
      } });

  });
}

function showToast(options) {//封装Toast
  var title = options.title,duration = options.duration,icon = options.icon;
  uni.showToast({
    title: title,
    duration: 2000,
    icon: icon || "none" });

}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 90:
/*!****************************************!*\
  !*** D:/git/doctor/final/utils/age.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.getAge = getAge;function getAge(year, month, day) {
  var returnAge = '';
  var birthYear = year;
  var birthMonth = month[0] == '0' ? month[1] : month;
  var birthDay = day;
  var d = new Date();
  var nowYear = d.getFullYear();
  var nowMonth = d.getMonth() + 1;
  var nowDay = d.getDate();
  if (nowYear == birthYear) {
    returnAge = 0; //同年 则为0岁
  } else {
    var ageDiff = nowYear - birthYear; //年之差
    if (ageDiff > 0) {
      if (nowMonth == birthMonth) {
        var dayDiff = nowDay - birthDay; //日之差 
        if (dayDiff < 0) {
          returnAge = ageDiff - 1;
        } else {
          returnAge = ageDiff;
        }
      } else {
        var monthDiff = nowMonth - birthMonth; //月之差 
        if (monthDiff < 0) {
          returnAge = ageDiff - 1;
        } else {
          returnAge = ageDiff;
        }
      }
    } else {
      returnAge = -1; //返回-1 表示出生日期输入错误 晚于今天
    }
  }
  return returnAge; //返回周岁年龄
}

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map