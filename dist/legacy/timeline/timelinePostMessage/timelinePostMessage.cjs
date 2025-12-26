"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/@contentstack/advanced-post-message/dist/index.js
var require_dist = __commonJS({
  "node_modules/@contentstack/advanced-post-message/dist/index.js"(exports2, module2) {
    "use strict";
    !(function(e, t) {
      "object" == typeof exports2 && "object" == typeof module2 ? module2.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports2 ? exports2.ContentstackAdvPostMessage = t() : e.ContentstackAdvPostMessage = t();
    })(exports2, (() => {
      return e = { 706: (e2, t2, r) => {
        "use strict";
        Object.defineProperty(t2, "__esModule", { value: true }), t2.Config = void 0;
        var n = r(450), o = r(666), i = r(628), s = (function() {
          function e3() {
            this.config = (0, o.getDefaultConfig)();
          }
          return e3.prototype.replace = function(e4) {
            !(function(e5, t3) {
              var r2, o2, s2, u;
              if (t3.debug = null !== (r2 = e5.debug) && void 0 !== r2 ? r2 : t3.debug, "" === e5.channelId) throw new Error((0, i.getErrorMessage)(n.ERROR_MESSAGES.common.channelIdRequired));
              t3.channelId = null !== (o2 = e5.channelId) && void 0 !== o2 ? o2 : t3.channelId, t3.suppressErrors = null !== (s2 = e5.suppressErrors) && void 0 !== s2 ? s2 : t3.suppressErrors, t3.targetOrigin = null !== (u = e5.targetOrigin) && void 0 !== u ? u : t3.targetOrigin, e5.target ? t3.targetWindow = e5.target : window ? t3.targetWindow = window : t3.targetWindow = { postMessage: function() {
              } };
            })(e4, this.config);
          }, e3.prototype.set = function(e4, t3) {
            this.config[e4] = t3;
          }, e3.prototype.get = function(e4) {
            return this.config[e4];
          }, e3.prototype.getAll = function() {
            return this.config;
          }, e3.prototype.reset = function() {
            this.config = (0, o.getDefaultConfig)();
          }, e3;
        })();
        t2.Config = s;
      }, 851: (e2, t2) => {
        "use strict";
        Object.defineProperty(t2, "__esModule", { value: true }), t2.ERROR_CODES = t2.ERROR_MESSAGES = void 0, t2.ERROR_MESSAGES = { common: { windowClosed: "The window closed before the response was received", windowNotFound: "The window was not found.", channelIdRequired: "The channelId is required" }, sendEvent: { receiverReturnedError: "The receiver returned an error", eventCancelled: "The event was cancelled", noAckReceived: "The ACK was not received" }, receiveEvent: { noRequestListenerFound: function(e3) {
          return 'No request listener found for event "'.concat(e3, '"');
        }, codeReturnedError: "The code returned an error", noResponseListenerFound: function(e3) {
          return 'No response listener found for hash "'.concat(e3, '"');
        }, noAckListenerFound: function(e3) {
          return 'No ack listener found for hash "'.concat(e3, '"');
        }, unknownNature: function(e3) {
          return 'The nature "'.concat(e3, '" is unknown');
        } }, registerEvent: { eventAlreadyRegistered: function(e3) {
          return 'The event "'.concat(e3, '" is already registered');
        } }, unregisterEvent: { eventDoesNotExist: function(e3) {
          return 'The event "'.concat(e3, '" does not exist');
        } } }, t2.ERROR_CODES = { common: { windowClosed: "WINDOW_CLOSED", windowNotFound: "WINDOW_NOT_FOUND" }, sendEvent: { receiverReturnedError: "RECEIVER_RETURNED_ERROR", eventCancelled: "EVENT_CANCELLED", noAckReceived: "NO_ACK_RECEIVED" }, receiveEvent: { noRequestListenerFound: "NO_REQUEST_LISTENER_FOUND", codeReturnedError: "CODE_RETURNED_ERROR", noResponseListenerFound: "NO_RESPONSE_LISTENER_FOUND", noAckListenerFound: "NO_ACK_LISTENER_FOUND", unknownNature: "UNKNOWN_NATURE" }, registerEvent: { eventAlreadyRegistered: "EVENT_ALREADY_REGISTERED" }, unregisterEvent: { eventDoesNotExist: "EVENT_DOES_NOT_EXIST" } };
      }, 450: function(e2, t2, r) {
        "use strict";
        var n = this && this.__createBinding || (Object.create ? function(e3, t3, r2, n2) {
          void 0 === n2 && (n2 = r2);
          var o2 = Object.getOwnPropertyDescriptor(t3, r2);
          o2 && !("get" in o2 ? !t3.__esModule : o2.writable || o2.configurable) || (o2 = { enumerable: true, get: function() {
            return t3[r2];
          } }), Object.defineProperty(e3, n2, o2);
        } : function(e3, t3, r2, n2) {
          void 0 === n2 && (n2 = r2), e3[n2] = t3[r2];
        }), o = this && this.__exportStar || function(e3, t3) {
          for (var r2 in e3) "default" === r2 || Object.prototype.hasOwnProperty.call(t3, r2) || n(t3, e3, r2);
        };
        Object.defineProperty(t2, "__esModule", { value: true }), t2.EVENT_MANAGER_NAME = t2.ANY_ORIGIN = t2.RESPONSE_CYCLE = void 0, t2.RESPONSE_CYCLE = 500, t2.ANY_ORIGIN = "*", t2.EVENT_MANAGER_NAME = "contentstack-adv-post-message", o(r(851), t2);
      }, 666: (e2, t2, r) => {
        "use strict";
        Object.defineProperty(t2, "__esModule", { value: true }), t2.getDefaultConfig = void 0;
        var n = r(450);
        t2.getDefaultConfig = function() {
          return { targetOrigin: n.ANY_ORIGIN, targetWindow: { postMessage: function() {
          } }, debug: false, channelId: "", suppressErrors: false };
        };
      }, 156: function(e2, t2, r) {
        "use strict";
        var n = this && this.__assign || function() {
          return n = Object.assign || function(e3) {
            for (var t3, r2 = 1, n2 = arguments.length; r2 < n2; r2++) for (var o2 in t3 = arguments[r2]) Object.prototype.hasOwnProperty.call(t3, o2) && (e3[o2] = t3[o2]);
            return e3;
          }, n.apply(this, arguments);
        }, o = this && this.__createBinding || (Object.create ? function(e3, t3, r2, n2) {
          void 0 === n2 && (n2 = r2);
          var o2 = Object.getOwnPropertyDescriptor(t3, r2);
          o2 && !("get" in o2 ? !t3.__esModule : o2.writable || o2.configurable) || (o2 = { enumerable: true, get: function() {
            return t3[r2];
          } }), Object.defineProperty(e3, n2, o2);
        } : function(e3, t3, r2, n2) {
          void 0 === n2 && (n2 = r2), e3[n2] = t3[r2];
        }), i = this && this.__exportStar || function(e3, t3) {
          for (var r2 in e3) "default" === r2 || Object.prototype.hasOwnProperty.call(t3, r2) || o(t3, e3, r2);
        }, s = this && this.__awaiter || function(e3, t3, r2, n2) {
          return new (r2 || (r2 = Promise))((function(o2, i2) {
            function s2(e4) {
              try {
                a2(n2.next(e4));
              } catch (e5) {
                i2(e5);
              }
            }
            function u2(e4) {
              try {
                a2(n2.throw(e4));
              } catch (e5) {
                i2(e5);
              }
            }
            function a2(e4) {
              var t4;
              e4.done ? o2(e4.value) : (t4 = e4.value, t4 instanceof r2 ? t4 : new r2((function(e5) {
                e5(t4);
              }))).then(s2, u2);
            }
            a2((n2 = n2.apply(e3, t3 || [])).next());
          }));
        }, u = this && this.__generator || function(e3, t3) {
          var r2, n2, o2, i2, s2 = { label: 0, sent: function() {
            if (1 & o2[0]) throw o2[1];
            return o2[1];
          }, trys: [], ops: [] };
          return i2 = { next: u2(0), throw: u2(1), return: u2(2) }, "function" == typeof Symbol && (i2[Symbol.iterator] = function() {
            return this;
          }), i2;
          function u2(u3) {
            return function(a2) {
              return (function(u4) {
                if (r2) throw new TypeError("Generator is already executing.");
                for (; i2 && (i2 = 0, u4[0] && (s2 = 0)), s2; ) try {
                  if (r2 = 1, n2 && (o2 = 2 & u4[0] ? n2.return : u4[0] ? n2.throw || ((o2 = n2.return) && o2.call(n2), 0) : n2.next) && !(o2 = o2.call(n2, u4[1])).done) return o2;
                  switch (n2 = 0, o2 && (u4 = [2 & u4[0], o2.value]), u4[0]) {
                    case 0:
                    case 1:
                      o2 = u4;
                      break;
                    case 4:
                      return s2.label++, { value: u4[1], done: false };
                    case 5:
                      s2.label++, n2 = u4[1], u4 = [0];
                      continue;
                    case 7:
                      u4 = s2.ops.pop(), s2.trys.pop();
                      continue;
                    default:
                      if (!((o2 = (o2 = s2.trys).length > 0 && o2[o2.length - 1]) || 6 !== u4[0] && 2 !== u4[0])) {
                        s2 = 0;
                        continue;
                      }
                      if (3 === u4[0] && (!o2 || u4[1] > o2[0] && u4[1] < o2[3])) {
                        s2.label = u4[1];
                        break;
                      }
                      if (6 === u4[0] && s2.label < o2[1]) {
                        s2.label = o2[1], o2 = u4;
                        break;
                      }
                      if (o2 && s2.label < o2[2]) {
                        s2.label = o2[2], s2.ops.push(u4);
                        break;
                      }
                      o2[2] && s2.ops.pop(), s2.trys.pop();
                      continue;
                  }
                  u4 = t3.call(e3, s2);
                } catch (e4) {
                  u4 = [6, e4], n2 = 0;
                } finally {
                  r2 = o2 = 0;
                }
                if (5 & u4[0]) throw u4[1];
                return { value: u4[0] ? u4[1] : void 0, done: true };
              })([u3, a2]);
            };
          }
        };
        Object.defineProperty(t2, "__esModule", { value: true }), t2.EventManager = void 0;
        var a = r(834), c = r(706), d = r(450), l = r(897), f = r(628), h = r(768), g = r(610), p = r(574), v = (function() {
          function e3(e4, t3) {
            if (void 0 === t3 && (t3 = {}), this.requestMessageHandlers = /* @__PURE__ */ new Map(), this.responseMessageHandlers = /* @__PURE__ */ new Map(), !e4) throw new Error((0, f.getErrorMessage)(d.ERROR_MESSAGES.common.channelIdRequired));
            this.config = new c.Config(), this.config.replace(n(n({}, t3), { channelId: e4 })), this.logger = new f.Logger(this.config), this.postMessage = new l.PostMessage(this.logger, this.config), this.handleIncomingMessage = this.handleIncomingMessage.bind(this), this.send = this.send.bind(this), this.on = this.on.bind(this), this.unregisterEvent = this.unregisterEvent.bind(this), window ? window.addEventListener("message", this.handleIncomingMessage) : this.logger.debug((0, f.getErrorMessage)(d.ERROR_MESSAGES.common.windowNotFound));
          }
          return e3.prototype.handleIncomingMessage = function(e4) {
            return s(this, void 0, void 0, (function() {
              var t3, r2, n2, o2, i2, s2, c2, l2, h2, g2, v2, E, y = this;
              return u(this, (function(u2) {
                if (t3 = e4.data, r2 = t3.type, n2 = t3.channel, o2 = t3.payload, i2 = t3.eventManager, s2 = t3.metadata, c2 = t3.error, i2 !== d.EVENT_MANAGER_NAME || n2 !== this.config.get("channelId")) return [2];
                switch (l2 = s2.hash, h2 = s2.nature) {
                  case p.EditorPostMessageNature.REQUEST:
                    return this.logger.debug("REQUEST received", e4.data), this.config.get("targetWindow").closed && this.logger.error((0, f.getErrorMessage)(d.ERROR_MESSAGES.common.windowClosed)), this.postMessage.sendAck({ type: r2, hash: l2 }), this.requestMessageHandlers.has(r2) ? (g2 = this.requestMessageHandlers.get(r2).handler, v2 = { data: o2 }, [2, a.ZalgoPromise.all([a.ZalgoPromise.try((function() {
                      return g2(v2);
                    })).then((function(e5) {
                      y.postMessage.sendResponse({ type: r2, hash: l2, payload: e5, error: void 0 });
                    })).catch((function(e5) {
                      y.logger.error((0, f.getErrorMessage)(d.ERROR_MESSAGES.receiveEvent.codeReturnedError), e5);
                    }))])]) : (this.logger.debug((0, f.getErrorMessage)(d.ERROR_MESSAGES.receiveEvent.noRequestListenerFound(r2))), this.postMessage.sendResponse({ type: r2, hash: l2, payload: void 0, error: { code: d.ERROR_CODES.receiveEvent.noRequestListenerFound, message: (0, f.getErrorMessage)(d.ERROR_MESSAGES.receiveEvent.noRequestListenerFound(r2)) } }), [2]);
                  case p.EditorPostMessageNature.RESPONSE:
                    if (this.logger.debug("RESPONSE received", e4.data), !this.responseMessageHandlers.has(l2)) return this.logger.error((0, f.getErrorMessage)(d.ERROR_MESSAGES.receiveEvent.noResponseListenerFound(l2))), [2];
                    E = this.responseMessageHandlers.get(l2), c2 ? E.promise.reject(c2) : E.promise.resolve(o2);
                    break;
                  case p.EditorPostMessageNature.ACK:
                    if (this.logger.debug("ACK received", e4.data), !this.responseMessageHandlers.has(l2)) return this.logger.error((0, f.getErrorMessage)(d.ERROR_MESSAGES.receiveEvent.noAckListenerFound(l2))), [2];
                    (E = this.responseMessageHandlers.get(l2)).hasReceivedAck = true;
                    break;
                  default:
                    this.logger.error((0, f.getErrorMessage)(d.ERROR_MESSAGES.receiveEvent.unknownNature(h2)), e4.data);
                }
                return [2];
              }));
            }));
          }, e3.prototype.send = function(e4, t3) {
            return s(this, void 0, void 0, (function() {
              var r2, n2, o2, i2, s2, c2 = this;
              return u(this, (function(u2) {
                return r2 = new a.ZalgoPromise(), n2 = (0, g.uniqueId)(e4), o2 = { type: e4, promise: r2, hasCancelled: false, hasReceivedAck: false }, this.responseMessageHandlers.set(n2, o2), i2 = 1e3, s2 = (0, h.safeInterval)((function() {
                  return c2.config.get("targetWindow").closed ? r2.reject(new Error((0, f.getErrorMessage)(d.ERROR_MESSAGES.common.windowClosed))) : (i2 = Math.max(i2 - d.RESPONSE_CYCLE, 0), !o2.hasReceivedAck && i2 <= 0 ? r2.reject((0, f.getErrorMessage)(d.ERROR_MESSAGES.sendEvent.noAckReceived)) : void 0);
                }), d.RESPONSE_CYCLE), r2.finally((function() {
                  c2.responseMessageHandlers.delete(n2), s2.cancel();
                })).catch((function(e5) {
                  c2.logger.debug((0, f.getErrorMessage)(d.ERROR_MESSAGES.sendEvent.receiverReturnedError), e5);
                })), this.postMessage.sendRequest({ type: e4, hash: n2, error: void 0, payload: t3 }), [2, r2];
              }));
            }));
          }, e3.prototype.on = function(e4, t3) {
            var r2 = this;
            this.requestMessageHandlers.has(e4) && this.logger.error((0, f.getErrorMessage)(d.ERROR_MESSAGES.registerEvent.eventAlreadyRegistered(e4)));
            var n2 = { handler: t3 };
            return this.requestMessageHandlers.set(e4, n2), { unregister: function() {
              r2.unregisterEvent(e4);
            } };
          }, e3.prototype.unregisterEvent = function(e4) {
            this.requestMessageHandlers.has(e4) ? (this.logger.debug("Unregistering event", e4), this.requestMessageHandlers.delete(e4)) : this.logger.error((0, f.getErrorMessage)(d.ERROR_MESSAGES.unregisterEvent.eventDoesNotExist(e4)));
          }, e3.prototype.updateConfig = function(e4) {
            this.config.replace(e4);
          }, e3.prototype.destroy = function(e4) {
            this.requestMessageHandlers.clear(), this.responseMessageHandlers.clear(), (null == e4 ? void 0 : e4.soft) || window.removeEventListener("message", this.handleIncomingMessage);
          }, e3;
        })();
        t2.EventManager = v, i(r(574), t2);
      }, 897: function(e2, t2, r) {
        "use strict";
        var n = this && this.__assign || function() {
          return n = Object.assign || function(e3) {
            for (var t3, r2 = 1, n2 = arguments.length; r2 < n2; r2++) for (var o2 in t3 = arguments[r2]) Object.prototype.hasOwnProperty.call(t3, o2) && (e3[o2] = t3[o2]);
            return e3;
          }, n.apply(this, arguments);
        };
        Object.defineProperty(t2, "__esModule", { value: true }), t2.PostMessage = void 0;
        var o = r(574), i = (function() {
          function e3(e4, t3) {
            this.logger = e4, this.sendResponse = this.sendResponse.bind(this), this.sendRequest = this.sendRequest.bind(this), this.sendAck = this.sendAck.bind(this), this.getMessage = this.getMessage.bind(this), this.config = t3.getAll();
          }
          return e3.prototype.sendRequest = function(e4) {
            var t3 = n(n({}, e4), { nature: o.EditorPostMessageNature.REQUEST });
            this.logger.debug("Sending REQUEST", t3);
            var r2 = this.getMessage(t3);
            this.config.targetWindow.postMessage(r2, this.config.targetOrigin);
          }, e3.prototype.sendResponse = function(e4) {
            var t3 = n(n({}, e4), { nature: o.EditorPostMessageNature.RESPONSE });
            this.logger.debug("Sending RESPONSE", t3);
            var r2 = this.getMessage(t3);
            this.config.targetWindow.postMessage(r2, this.config.targetOrigin);
          }, e3.prototype.sendAck = function(e4) {
            var t3 = n(n({}, e4), { payload: void 0, error: void 0, nature: o.EditorPostMessageNature.ACK });
            this.logger.debug("Sending ACK", t3);
            var r2 = this.getMessage(t3);
            this.config.targetWindow.postMessage(r2, this.config.targetOrigin);
          }, e3.prototype.getMessage = function(e4) {
            var t3 = e4.nature, r2 = e4.hash, n2 = e4.payload, o2 = e4.type, i2 = e4.error;
            return { eventManager: "contentstack-adv-post-message", metadata: { hash: r2, nature: t3 }, channel: this.config.channelId, error: i2, payload: n2, type: o2 };
          }, e3;
        })();
        t2.PostMessage = i;
      }, 255: (e2, t2) => {
        "use strict";
        Object.defineProperty(t2, "__esModule", { value: true });
      }, 884: (e2, t2) => {
        "use strict";
        Object.defineProperty(t2, "__esModule", { value: true });
      }, 574: function(e2, t2, r) {
        "use strict";
        var n = this && this.__createBinding || (Object.create ? function(e3, t3, r2, n2) {
          void 0 === n2 && (n2 = r2);
          var o2 = Object.getOwnPropertyDescriptor(t3, r2);
          o2 && !("get" in o2 ? !t3.__esModule : o2.writable || o2.configurable) || (o2 = { enumerable: true, get: function() {
            return t3[r2];
          } }), Object.defineProperty(e3, n2, o2);
        } : function(e3, t3, r2, n2) {
          void 0 === n2 && (n2 = r2), e3[n2] = t3[r2];
        }), o = this && this.__exportStar || function(e3, t3) {
          for (var r2 in e3) "default" === r2 || Object.prototype.hasOwnProperty.call(t3, r2) || n(t3, e3, r2);
        };
        Object.defineProperty(t2, "__esModule", { value: true }), o(r(884), t2), o(r(145), t2), o(r(255), t2);
      }, 145: (e2, t2) => {
        "use strict";
        var r;
        Object.defineProperty(t2, "__esModule", { value: true }), t2.EditorPostMessageNature = void 0, (function(e3) {
          e3.ACK = "ACK", e3.RESPONSE = "RESPONSE", e3.REQUEST = "REQUEST";
        })(r || (t2.EditorPostMessageNature = r = {}));
      }, 628: function(e2, t2, r) {
        "use strict";
        var n = this && this.__spreadArray || function(e3, t3, r2) {
          if (r2 || 2 === arguments.length) for (var n2, o2 = 0, i2 = t3.length; o2 < i2; o2++) !n2 && o2 in t3 || (n2 || (n2 = Array.prototype.slice.call(t3, 0, o2)), n2[o2] = t3[o2]);
          return e3.concat(n2 || Array.prototype.slice.call(t3));
        };
        Object.defineProperty(t2, "__esModule", { value: true }), t2.getErrorMessage = t2.Logger = void 0;
        var o = r(450), i = (function() {
          function e3(e4) {
            this.config = e4, this.prefix = o.EVENT_MANAGER_NAME, this.log = this.log.bind(this), this.info = this.info.bind(this), this.debug = this.debug.bind(this), this.error = this.error.bind(this);
          }
          return e3.prototype.log = function() {
            for (var e4 = [], t3 = 0; t3 < arguments.length; t3++) e4[t3] = arguments[t3];
            console.log.apply(console, n([this.prefix], e4, false));
          }, e3.prototype.info = function() {
            for (var e4 = [], t3 = 0; t3 < arguments.length; t3++) e4[t3] = arguments[t3];
            console.info.apply(console, n([this.prefix], e4, false));
          }, e3.prototype.debug = function() {
            for (var e4 = [], t3 = 0; t3 < arguments.length; t3++) e4[t3] = arguments[t3];
            this.config.get("debug") && console.debug.apply(console, n(n([this.prefix, "DEBUG:"], e4, false), [this.getDebugOptions()], false));
          }, e3.prototype.error = function() {
            for (var e4 = [], t3 = 0; t3 < arguments.length; t3++) e4[t3] = arguments[t3];
            this.config.get("suppressErrors") || console.error.apply(console, n([this.prefix], e4, false));
          }, e3.prototype.getDebugOptions = function() {
            return { targetOrigin: this.config.get("targetOrigin"), targetWindow: this.config.get("targetWindow") };
          }, e3;
        })();
        t2.Logger = i, t2.getErrorMessage = function(e3) {
          return o.EVENT_MANAGER_NAME + ": " + e3;
        };
      }, 768: (e2, t2) => {
        "use strict";
        Object.defineProperty(t2, "__esModule", { value: true }), t2.safeInterval = void 0, t2.safeInterval = function(e3, t3) {
          var r;
          return (function n() {
            r = setTimeout((function() {
              e3(), n();
            }), t3);
          })(), { cancel: function() {
            clearTimeout(r);
          } };
        };
      }, 610: (e2, t2, r) => {
        "use strict";
        Object.defineProperty(t2, "__esModule", { value: true }), t2.uniqueId = void 0;
        var n = r(831);
        t2.uniqueId = function(e3) {
          var t3 = (0, n.v4)().split("-")[0];
          return e3 ? "".concat(e3, "-").concat(t3) : t3;
        };
      }, 831: (e2, t2, r) => {
        "use strict";
        Object.defineProperty(t2, "__esModule", { value: true }), Object.defineProperty(t2, "NIL", { enumerable: true, get: function() {
          return u.default;
        } }), Object.defineProperty(t2, "parse", { enumerable: true, get: function() {
          return l.default;
        } }), Object.defineProperty(t2, "stringify", { enumerable: true, get: function() {
          return d.default;
        } }), Object.defineProperty(t2, "v1", { enumerable: true, get: function() {
          return n.default;
        } }), Object.defineProperty(t2, "v3", { enumerable: true, get: function() {
          return o.default;
        } }), Object.defineProperty(t2, "v4", { enumerable: true, get: function() {
          return i.default;
        } }), Object.defineProperty(t2, "v5", { enumerable: true, get: function() {
          return s.default;
        } }), Object.defineProperty(t2, "validate", { enumerable: true, get: function() {
          return c.default;
        } }), Object.defineProperty(t2, "version", { enumerable: true, get: function() {
          return a.default;
        } });
        var n = f(r(518)), o = f(r(948)), i = f(r(73)), s = f(r(186)), u = f(r(808)), a = f(r(775)), c = f(r(37)), d = f(r(910)), l = f(r(792));
        function f(e3) {
          return e3 && e3.__esModule ? e3 : { default: e3 };
        }
      }, 311: (e2, t2) => {
        "use strict";
        function r(e3) {
          return 14 + (e3 + 64 >>> 9 << 4) + 1;
        }
        function n(e3, t3) {
          const r2 = (65535 & e3) + (65535 & t3);
          return (e3 >> 16) + (t3 >> 16) + (r2 >> 16) << 16 | 65535 & r2;
        }
        function o(e3, t3, r2, o2, i2, s2) {
          return n((u2 = n(n(t3, e3), n(o2, s2))) << (a2 = i2) | u2 >>> 32 - a2, r2);
          var u2, a2;
        }
        function i(e3, t3, r2, n2, i2, s2, u2) {
          return o(t3 & r2 | ~t3 & n2, e3, t3, i2, s2, u2);
        }
        function s(e3, t3, r2, n2, i2, s2, u2) {
          return o(t3 & n2 | r2 & ~n2, e3, t3, i2, s2, u2);
        }
        function u(e3, t3, r2, n2, i2, s2, u2) {
          return o(t3 ^ r2 ^ n2, e3, t3, i2, s2, u2);
        }
        function a(e3, t3, r2, n2, i2, s2, u2) {
          return o(r2 ^ (t3 | ~n2), e3, t3, i2, s2, u2);
        }
        Object.defineProperty(t2, "__esModule", { value: true }), t2.default = void 0;
        t2.default = function(e3) {
          if ("string" == typeof e3) {
            const t3 = unescape(encodeURIComponent(e3));
            e3 = new Uint8Array(t3.length);
            for (let r2 = 0; r2 < t3.length; ++r2) e3[r2] = t3.charCodeAt(r2);
          }
          return (function(e4) {
            const t3 = [], r2 = 32 * e4.length, n2 = "0123456789abcdef";
            for (let o2 = 0; o2 < r2; o2 += 8) {
              const r3 = e4[o2 >> 5] >>> o2 % 32 & 255, i2 = parseInt(n2.charAt(r3 >>> 4 & 15) + n2.charAt(15 & r3), 16);
              t3.push(i2);
            }
            return t3;
          })((function(e4, t3) {
            e4[t3 >> 5] |= 128 << t3 % 32, e4[r(t3) - 1] = t3;
            let o2 = 1732584193, c = -271733879, d = -1732584194, l = 271733878;
            for (let t4 = 0; t4 < e4.length; t4 += 16) {
              const r2 = o2, f = c, h = d, g = l;
              o2 = i(o2, c, d, l, e4[t4], 7, -680876936), l = i(l, o2, c, d, e4[t4 + 1], 12, -389564586), d = i(d, l, o2, c, e4[t4 + 2], 17, 606105819), c = i(c, d, l, o2, e4[t4 + 3], 22, -1044525330), o2 = i(o2, c, d, l, e4[t4 + 4], 7, -176418897), l = i(l, o2, c, d, e4[t4 + 5], 12, 1200080426), d = i(d, l, o2, c, e4[t4 + 6], 17, -1473231341), c = i(c, d, l, o2, e4[t4 + 7], 22, -45705983), o2 = i(o2, c, d, l, e4[t4 + 8], 7, 1770035416), l = i(l, o2, c, d, e4[t4 + 9], 12, -1958414417), d = i(d, l, o2, c, e4[t4 + 10], 17, -42063), c = i(c, d, l, o2, e4[t4 + 11], 22, -1990404162), o2 = i(o2, c, d, l, e4[t4 + 12], 7, 1804603682), l = i(l, o2, c, d, e4[t4 + 13], 12, -40341101), d = i(d, l, o2, c, e4[t4 + 14], 17, -1502002290), c = i(c, d, l, o2, e4[t4 + 15], 22, 1236535329), o2 = s(o2, c, d, l, e4[t4 + 1], 5, -165796510), l = s(l, o2, c, d, e4[t4 + 6], 9, -1069501632), d = s(d, l, o2, c, e4[t4 + 11], 14, 643717713), c = s(c, d, l, o2, e4[t4], 20, -373897302), o2 = s(o2, c, d, l, e4[t4 + 5], 5, -701558691), l = s(l, o2, c, d, e4[t4 + 10], 9, 38016083), d = s(d, l, o2, c, e4[t4 + 15], 14, -660478335), c = s(c, d, l, o2, e4[t4 + 4], 20, -405537848), o2 = s(o2, c, d, l, e4[t4 + 9], 5, 568446438), l = s(l, o2, c, d, e4[t4 + 14], 9, -1019803690), d = s(d, l, o2, c, e4[t4 + 3], 14, -187363961), c = s(c, d, l, o2, e4[t4 + 8], 20, 1163531501), o2 = s(o2, c, d, l, e4[t4 + 13], 5, -1444681467), l = s(l, o2, c, d, e4[t4 + 2], 9, -51403784), d = s(d, l, o2, c, e4[t4 + 7], 14, 1735328473), c = s(c, d, l, o2, e4[t4 + 12], 20, -1926607734), o2 = u(o2, c, d, l, e4[t4 + 5], 4, -378558), l = u(l, o2, c, d, e4[t4 + 8], 11, -2022574463), d = u(d, l, o2, c, e4[t4 + 11], 16, 1839030562), c = u(c, d, l, o2, e4[t4 + 14], 23, -35309556), o2 = u(o2, c, d, l, e4[t4 + 1], 4, -1530992060), l = u(l, o2, c, d, e4[t4 + 4], 11, 1272893353), d = u(d, l, o2, c, e4[t4 + 7], 16, -155497632), c = u(c, d, l, o2, e4[t4 + 10], 23, -1094730640), o2 = u(o2, c, d, l, e4[t4 + 13], 4, 681279174), l = u(l, o2, c, d, e4[t4], 11, -358537222), d = u(d, l, o2, c, e4[t4 + 3], 16, -722521979), c = u(c, d, l, o2, e4[t4 + 6], 23, 76029189), o2 = u(o2, c, d, l, e4[t4 + 9], 4, -640364487), l = u(l, o2, c, d, e4[t4 + 12], 11, -421815835), d = u(d, l, o2, c, e4[t4 + 15], 16, 530742520), c = u(c, d, l, o2, e4[t4 + 2], 23, -995338651), o2 = a(o2, c, d, l, e4[t4], 6, -198630844), l = a(l, o2, c, d, e4[t4 + 7], 10, 1126891415), d = a(d, l, o2, c, e4[t4 + 14], 15, -1416354905), c = a(c, d, l, o2, e4[t4 + 5], 21, -57434055), o2 = a(o2, c, d, l, e4[t4 + 12], 6, 1700485571), l = a(l, o2, c, d, e4[t4 + 3], 10, -1894986606), d = a(d, l, o2, c, e4[t4 + 10], 15, -1051523), c = a(c, d, l, o2, e4[t4 + 1], 21, -2054922799), o2 = a(o2, c, d, l, e4[t4 + 8], 6, 1873313359), l = a(l, o2, c, d, e4[t4 + 15], 10, -30611744), d = a(d, l, o2, c, e4[t4 + 6], 15, -1560198380), c = a(c, d, l, o2, e4[t4 + 13], 21, 1309151649), o2 = a(o2, c, d, l, e4[t4 + 4], 6, -145523070), l = a(l, o2, c, d, e4[t4 + 11], 10, -1120210379), d = a(d, l, o2, c, e4[t4 + 2], 15, 718787259), c = a(c, d, l, o2, e4[t4 + 9], 21, -343485551), o2 = n(o2, r2), c = n(c, f), d = n(d, h), l = n(l, g);
            }
            return [o2, c, d, l];
          })((function(e4) {
            if (0 === e4.length) return [];
            const t3 = 8 * e4.length, n2 = new Uint32Array(r(t3));
            for (let r2 = 0; r2 < t3; r2 += 8) n2[r2 >> 5] |= (255 & e4[r2 / 8]) << r2 % 32;
            return n2;
          })(e3), 8 * e3.length));
        };
      }, 140: (e2, t2) => {
        "use strict";
        Object.defineProperty(t2, "__esModule", { value: true }), t2.default = void 0;
        var r = { randomUUID: "undefined" != typeof crypto && crypto.randomUUID && crypto.randomUUID.bind(crypto) };
        t2.default = r;
      }, 808: (e2, t2) => {
        "use strict";
        Object.defineProperty(t2, "__esModule", { value: true }), t2.default = void 0, t2.default = "00000000-0000-0000-0000-000000000000";
      }, 792: (e2, t2, r) => {
        "use strict";
        Object.defineProperty(t2, "__esModule", { value: true }), t2.default = void 0;
        var n, o = (n = r(37)) && n.__esModule ? n : { default: n };
        t2.default = function(e3) {
          if (!(0, o.default)(e3)) throw TypeError("Invalid UUID");
          let t3;
          const r2 = new Uint8Array(16);
          return r2[0] = (t3 = parseInt(e3.slice(0, 8), 16)) >>> 24, r2[1] = t3 >>> 16 & 255, r2[2] = t3 >>> 8 & 255, r2[3] = 255 & t3, r2[4] = (t3 = parseInt(e3.slice(9, 13), 16)) >>> 8, r2[5] = 255 & t3, r2[6] = (t3 = parseInt(e3.slice(14, 18), 16)) >>> 8, r2[7] = 255 & t3, r2[8] = (t3 = parseInt(e3.slice(19, 23), 16)) >>> 8, r2[9] = 255 & t3, r2[10] = (t3 = parseInt(e3.slice(24, 36), 16)) / 1099511627776 & 255, r2[11] = t3 / 4294967296 & 255, r2[12] = t3 >>> 24 & 255, r2[13] = t3 >>> 16 & 255, r2[14] = t3 >>> 8 & 255, r2[15] = 255 & t3, r2;
        };
      }, 656: (e2, t2) => {
        "use strict";
        Object.defineProperty(t2, "__esModule", { value: true }), t2.default = void 0, t2.default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
      }, 858: (e2, t2) => {
        "use strict";
        let r;
        Object.defineProperty(t2, "__esModule", { value: true }), t2.default = function() {
          if (!r && (r = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !r)) throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
          return r(n);
        };
        const n = new Uint8Array(16);
      }, 42: (e2, t2) => {
        "use strict";
        function r(e3, t3, r2, n2) {
          switch (e3) {
            case 0:
              return t3 & r2 ^ ~t3 & n2;
            case 1:
            case 3:
              return t3 ^ r2 ^ n2;
            case 2:
              return t3 & r2 ^ t3 & n2 ^ r2 & n2;
          }
        }
        function n(e3, t3) {
          return e3 << t3 | e3 >>> 32 - t3;
        }
        Object.defineProperty(t2, "__esModule", { value: true }), t2.default = void 0;
        t2.default = function(e3) {
          const t3 = [1518500249, 1859775393, 2400959708, 3395469782], o = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
          if ("string" == typeof e3) {
            const t4 = unescape(encodeURIComponent(e3));
            e3 = [];
            for (let r2 = 0; r2 < t4.length; ++r2) e3.push(t4.charCodeAt(r2));
          } else Array.isArray(e3) || (e3 = Array.prototype.slice.call(e3));
          e3.push(128);
          const i = e3.length / 4 + 2, s = Math.ceil(i / 16), u = new Array(s);
          for (let t4 = 0; t4 < s; ++t4) {
            const r2 = new Uint32Array(16);
            for (let n2 = 0; n2 < 16; ++n2) r2[n2] = e3[64 * t4 + 4 * n2] << 24 | e3[64 * t4 + 4 * n2 + 1] << 16 | e3[64 * t4 + 4 * n2 + 2] << 8 | e3[64 * t4 + 4 * n2 + 3];
            u[t4] = r2;
          }
          u[s - 1][14] = 8 * (e3.length - 1) / Math.pow(2, 32), u[s - 1][14] = Math.floor(u[s - 1][14]), u[s - 1][15] = 8 * (e3.length - 1) & 4294967295;
          for (let e4 = 0; e4 < s; ++e4) {
            const i2 = new Uint32Array(80);
            for (let t4 = 0; t4 < 16; ++t4) i2[t4] = u[e4][t4];
            for (let e5 = 16; e5 < 80; ++e5) i2[e5] = n(i2[e5 - 3] ^ i2[e5 - 8] ^ i2[e5 - 14] ^ i2[e5 - 16], 1);
            let s2 = o[0], a = o[1], c = o[2], d = o[3], l = o[4];
            for (let e5 = 0; e5 < 80; ++e5) {
              const o2 = Math.floor(e5 / 20), u2 = n(s2, 5) + r(o2, a, c, d) + l + t3[o2] + i2[e5] >>> 0;
              l = d, d = c, c = n(a, 30) >>> 0, a = s2, s2 = u2;
            }
            o[0] = o[0] + s2 >>> 0, o[1] = o[1] + a >>> 0, o[2] = o[2] + c >>> 0, o[3] = o[3] + d >>> 0, o[4] = o[4] + l >>> 0;
          }
          return [o[0] >> 24 & 255, o[0] >> 16 & 255, o[0] >> 8 & 255, 255 & o[0], o[1] >> 24 & 255, o[1] >> 16 & 255, o[1] >> 8 & 255, 255 & o[1], o[2] >> 24 & 255, o[2] >> 16 & 255, o[2] >> 8 & 255, 255 & o[2], o[3] >> 24 & 255, o[3] >> 16 & 255, o[3] >> 8 & 255, 255 & o[3], o[4] >> 24 & 255, o[4] >> 16 & 255, o[4] >> 8 & 255, 255 & o[4]];
        };
      }, 910: (e2, t2, r) => {
        "use strict";
        Object.defineProperty(t2, "__esModule", { value: true }), t2.default = void 0, t2.unsafeStringify = s;
        var n, o = (n = r(37)) && n.__esModule ? n : { default: n };
        const i = [];
        for (let e3 = 0; e3 < 256; ++e3) i.push((e3 + 256).toString(16).slice(1));
        function s(e3, t3 = 0) {
          return (i[e3[t3 + 0]] + i[e3[t3 + 1]] + i[e3[t3 + 2]] + i[e3[t3 + 3]] + "-" + i[e3[t3 + 4]] + i[e3[t3 + 5]] + "-" + i[e3[t3 + 6]] + i[e3[t3 + 7]] + "-" + i[e3[t3 + 8]] + i[e3[t3 + 9]] + "-" + i[e3[t3 + 10]] + i[e3[t3 + 11]] + i[e3[t3 + 12]] + i[e3[t3 + 13]] + i[e3[t3 + 14]] + i[e3[t3 + 15]]).toLowerCase();
        }
        t2.default = function(e3, t3 = 0) {
          const r2 = s(e3, t3);
          if (!(0, o.default)(r2)) throw TypeError("Stringified UUID is invalid");
          return r2;
        };
      }, 518: (e2, t2, r) => {
        "use strict";
        Object.defineProperty(t2, "__esModule", { value: true }), t2.default = void 0;
        var n, o = (n = r(858)) && n.__esModule ? n : { default: n }, i = r(910);
        let s, u, a = 0, c = 0;
        t2.default = function(e3, t3, r2) {
          let n2 = t3 && r2 || 0;
          const d = t3 || new Array(16);
          let l = (e3 = e3 || {}).node || s, f = void 0 !== e3.clockseq ? e3.clockseq : u;
          if (null == l || null == f) {
            const t4 = e3.random || (e3.rng || o.default)();
            null == l && (l = s = [1 | t4[0], t4[1], t4[2], t4[3], t4[4], t4[5]]), null == f && (f = u = 16383 & (t4[6] << 8 | t4[7]));
          }
          let h = void 0 !== e3.msecs ? e3.msecs : Date.now(), g = void 0 !== e3.nsecs ? e3.nsecs : c + 1;
          const p = h - a + (g - c) / 1e4;
          if (p < 0 && void 0 === e3.clockseq && (f = f + 1 & 16383), (p < 0 || h > a) && void 0 === e3.nsecs && (g = 0), g >= 1e4) throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
          a = h, c = g, u = f, h += 122192928e5;
          const v = (1e4 * (268435455 & h) + g) % 4294967296;
          d[n2++] = v >>> 24 & 255, d[n2++] = v >>> 16 & 255, d[n2++] = v >>> 8 & 255, d[n2++] = 255 & v;
          const E = h / 4294967296 * 1e4 & 268435455;
          d[n2++] = E >>> 8 & 255, d[n2++] = 255 & E, d[n2++] = E >>> 24 & 15 | 16, d[n2++] = E >>> 16 & 255, d[n2++] = f >>> 8 | 128, d[n2++] = 255 & f;
          for (let e4 = 0; e4 < 6; ++e4) d[n2 + e4] = l[e4];
          return t3 || (0, i.unsafeStringify)(d);
        };
      }, 948: (e2, t2, r) => {
        "use strict";
        Object.defineProperty(t2, "__esModule", { value: true }), t2.default = void 0;
        var n = i(r(25)), o = i(r(311));
        function i(e3) {
          return e3 && e3.__esModule ? e3 : { default: e3 };
        }
        var s = (0, n.default)("v3", 48, o.default);
        t2.default = s;
      }, 25: (e2, t2, r) => {
        "use strict";
        Object.defineProperty(t2, "__esModule", { value: true }), t2.URL = t2.DNS = void 0, t2.default = function(e3, t3, r2) {
          function n2(e4, n3, s2, u2) {
            var a;
            if ("string" == typeof e4 && (e4 = (function(e5) {
              e5 = unescape(encodeURIComponent(e5));
              const t4 = [];
              for (let r3 = 0; r3 < e5.length; ++r3) t4.push(e5.charCodeAt(r3));
              return t4;
            })(e4)), "string" == typeof n3 && (n3 = (0, i.default)(n3)), 16 !== (null === (a = n3) || void 0 === a ? void 0 : a.length)) throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
            let c = new Uint8Array(16 + e4.length);
            if (c.set(n3), c.set(e4, n3.length), c = r2(c), c[6] = 15 & c[6] | t3, c[8] = 63 & c[8] | 128, s2) {
              u2 = u2 || 0;
              for (let e5 = 0; e5 < 16; ++e5) s2[u2 + e5] = c[e5];
              return s2;
            }
            return (0, o.unsafeStringify)(c);
          }
          try {
            n2.name = e3;
          } catch (e4) {
          }
          return n2.DNS = s, n2.URL = u, n2;
        };
        var n, o = r(910), i = (n = r(792)) && n.__esModule ? n : { default: n };
        const s = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
        t2.DNS = s;
        const u = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
        t2.URL = u;
      }, 73: (e2, t2, r) => {
        "use strict";
        Object.defineProperty(t2, "__esModule", { value: true }), t2.default = void 0;
        var n = s(r(140)), o = s(r(858)), i = r(910);
        function s(e3) {
          return e3 && e3.__esModule ? e3 : { default: e3 };
        }
        t2.default = function(e3, t3, r2) {
          if (n.default.randomUUID && !t3 && !e3) return n.default.randomUUID();
          const s2 = (e3 = e3 || {}).random || (e3.rng || o.default)();
          if (s2[6] = 15 & s2[6] | 64, s2[8] = 63 & s2[8] | 128, t3) {
            r2 = r2 || 0;
            for (let e4 = 0; e4 < 16; ++e4) t3[r2 + e4] = s2[e4];
            return t3;
          }
          return (0, i.unsafeStringify)(s2);
        };
      }, 186: (e2, t2, r) => {
        "use strict";
        Object.defineProperty(t2, "__esModule", { value: true }), t2.default = void 0;
        var n = i(r(25)), o = i(r(42));
        function i(e3) {
          return e3 && e3.__esModule ? e3 : { default: e3 };
        }
        var s = (0, n.default)("v5", 80, o.default);
        t2.default = s;
      }, 37: (e2, t2, r) => {
        "use strict";
        Object.defineProperty(t2, "__esModule", { value: true }), t2.default = void 0;
        var n, o = (n = r(656)) && n.__esModule ? n : { default: n };
        t2.default = function(e3) {
          return "string" == typeof e3 && o.default.test(e3);
        };
      }, 775: (e2, t2, r) => {
        "use strict";
        Object.defineProperty(t2, "__esModule", { value: true }), t2.default = void 0;
        var n, o = (n = r(37)) && n.__esModule ? n : { default: n };
        t2.default = function(e3) {
          if (!(0, o.default)(e3)) throw TypeError("Invalid UUID");
          return parseInt(e3.slice(14, 15), 16);
        };
      }, 994: function(e2) {
        "undefined" != typeof self && self, e2.exports = (function(e3) {
          var t2 = {};
          function r(n) {
            if (t2[n]) return t2[n].exports;
            var o = t2[n] = { i: n, l: false, exports: {} };
            return e3[n].call(o.exports, o, o.exports, r), o.l = true, o.exports;
          }
          return r.m = e3, r.c = t2, r.d = function(e4, t3, n) {
            r.o(e4, t3) || Object.defineProperty(e4, t3, { enumerable: true, get: n });
          }, r.r = function(e4) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e4, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e4, "__esModule", { value: true });
          }, r.t = function(e4, t3) {
            if (1 & t3 && (e4 = r(e4)), 8 & t3) return e4;
            if (4 & t3 && "object" == typeof e4 && e4 && e4.__esModule) return e4;
            var n = /* @__PURE__ */ Object.create(null);
            if (r.r(n), Object.defineProperty(n, "default", { enumerable: true, value: e4 }), 2 & t3 && "string" != typeof e4) for (var o in e4) r.d(n, o, function(t4) {
              return e4[t4];
            }.bind(null, o));
            return n;
          }, r.n = function(e4) {
            var t3 = e4 && e4.__esModule ? function() {
              return e4.default;
            } : function() {
              return e4;
            };
            return r.d(t3, "a", t3), t3;
          }, r.o = function(e4, t3) {
            return {}.hasOwnProperty.call(e4, t3);
          }, r.p = "", r(r.s = 0);
        })([function(e3, t2, r) {
          "use strict";
          function n(e4) {
            try {
              if (!e4) return false;
              if ("undefined" != typeof Promise && e4 instanceof Promise) return true;
              if ("undefined" != typeof window && "function" == typeof window.Window && e4 instanceof window.Window) return false;
              if ("undefined" != typeof window && "function" == typeof window.constructor && e4 instanceof window.constructor) return false;
              var t3 = {}.toString;
              if (t3) {
                var r2 = t3.call(e4);
                if ("[object Window]" === r2 || "[object global]" === r2 || "[object DOMWindow]" === r2) return false;
              }
              if ("function" == typeof e4.then) return true;
            } catch (e5) {
              return false;
            }
            return false;
          }
          r.r(t2), r.d(t2, "ZalgoPromise", (function() {
            return l;
          }));
          var o, i = [], s = [], u = 0;
          function a() {
            if (!u && o) {
              var e4 = o;
              o = null, e4.resolve();
            }
          }
          function c() {
            u += 1;
          }
          function d() {
            u -= 1, a();
          }
          var l = (function() {
            function e4(e5) {
              var t4 = this;
              if (this.resolved = void 0, this.rejected = void 0, this.errorHandled = void 0, this.value = void 0, this.error = void 0, this.handlers = void 0, this.dispatching = void 0, this.stack = void 0, this.resolved = false, this.rejected = false, this.errorHandled = false, this.handlers = [], e5) {
                var r2, n2, o2 = false, i2 = false, s2 = false;
                c();
                try {
                  e5((function(e6) {
                    s2 ? t4.resolve(e6) : (o2 = true, r2 = e6);
                  }), (function(e6) {
                    s2 ? t4.reject(e6) : (i2 = true, n2 = e6);
                  }));
                } catch (e6) {
                  return d(), void this.reject(e6);
                }
                d(), s2 = true, o2 ? this.resolve(r2) : i2 && this.reject(n2);
              }
            }
            var t3 = e4.prototype;
            return t3.resolve = function(e5) {
              if (this.resolved || this.rejected) return this;
              if (n(e5)) throw new Error("Can not resolve promise with another promise");
              return this.resolved = true, this.value = e5, this.dispatch(), this;
            }, t3.reject = function(e5) {
              var t4 = this;
              if (this.resolved || this.rejected) return this;
              if (n(e5)) throw new Error("Can not reject promise with another promise");
              if (!e5) {
                var r2 = e5 && "function" == typeof e5.toString ? e5.toString() : {}.toString.call(e5);
                e5 = new Error("Expected reject to be called with Error, got " + r2);
              }
              return this.rejected = true, this.error = e5, this.errorHandled || setTimeout((function() {
                t4.errorHandled || (function(e6, t5) {
                  if (-1 === i.indexOf(e6)) {
                    i.push(e6), setTimeout((function() {
                      throw e6;
                    }), 1);
                    for (var r3 = 0; r3 < s.length; r3++) s[r3](e6, t5);
                  }
                })(e5, t4);
              }), 1), this.dispatch(), this;
            }, t3.asyncReject = function(e5) {
              return this.errorHandled = true, this.reject(e5), this;
            }, t3.dispatch = function() {
              var t4 = this.resolved, r2 = this.rejected, o2 = this.handlers;
              if (!this.dispatching && (t4 || r2)) {
                this.dispatching = true, c();
                for (var i2 = function(e5, t5) {
                  return e5.then((function(e6) {
                    t5.resolve(e6);
                  }), (function(e6) {
                    t5.reject(e6);
                  }));
                }, s2 = 0; s2 < o2.length; s2++) {
                  var u2 = o2[s2], a2 = u2.onSuccess, l2 = u2.onError, f = u2.promise, h = void 0;
                  if (t4) try {
                    h = a2 ? a2(this.value) : this.value;
                  } catch (e5) {
                    f.reject(e5);
                    continue;
                  }
                  else if (r2) {
                    if (!l2) {
                      f.reject(this.error);
                      continue;
                    }
                    try {
                      h = l2(this.error);
                    } catch (e5) {
                      f.reject(e5);
                      continue;
                    }
                  }
                  if (h instanceof e4 && (h.resolved || h.rejected)) {
                    var g = h;
                    g.resolved ? f.resolve(g.value) : f.reject(g.error), g.errorHandled = true;
                  } else n(h) ? h instanceof e4 && (h.resolved || h.rejected) ? h.resolved ? f.resolve(h.value) : f.reject(h.error) : i2(h, f) : f.resolve(h);
                }
                o2.length = 0, this.dispatching = false, d();
              }
            }, t3.then = function(t4, r2) {
              if (t4 && "function" != typeof t4 && !t4.call) throw new Error("Promise.then expected a function for success handler");
              if (r2 && "function" != typeof r2 && !r2.call) throw new Error("Promise.then expected a function for error handler");
              var n2 = new e4();
              return this.handlers.push({ promise: n2, onSuccess: t4, onError: r2 }), this.errorHandled = true, this.dispatch(), n2;
            }, t3.catch = function(e5) {
              return this.then(void 0, e5);
            }, t3.finally = function(t4) {
              if (t4 && "function" != typeof t4 && !t4.call) throw new Error("Promise.finally expected a function");
              return this.then((function(r2) {
                return e4.try(t4).then((function() {
                  return r2;
                }));
              }), (function(r2) {
                return e4.try(t4).then((function() {
                  throw r2;
                }));
              }));
            }, t3.timeout = function(e5, t4) {
              var r2 = this;
              if (this.resolved || this.rejected) return this;
              var n2 = setTimeout((function() {
                r2.resolved || r2.rejected || r2.reject(t4 || new Error("Promise timed out after " + e5 + "ms"));
              }), e5);
              return this.then((function(e6) {
                return clearTimeout(n2), e6;
              }));
            }, t3.toPromise = function() {
              if ("undefined" == typeof Promise) throw new TypeError("Could not find Promise");
              return Promise.resolve(this);
            }, t3.lazy = function() {
              return this.errorHandled = true, this;
            }, e4.resolve = function(t4) {
              return t4 instanceof e4 ? t4 : n(t4) ? new e4((function(e5, r2) {
                return t4.then(e5, r2);
              })) : new e4().resolve(t4);
            }, e4.reject = function(t4) {
              return new e4().reject(t4);
            }, e4.asyncReject = function(t4) {
              return new e4().asyncReject(t4);
            }, e4.all = function(t4) {
              var r2 = new e4(), o2 = t4.length, i2 = [].slice();
              if (!o2) return r2.resolve(i2), r2;
              for (var s2 = function(e5, t5, n2) {
                return t5.then((function(t6) {
                  i2[e5] = t6, 0 == (o2 -= 1) && r2.resolve(i2);
                }), (function(e6) {
                  n2.reject(e6);
                }));
              }, u2 = 0; u2 < t4.length; u2++) {
                var a2 = t4[u2];
                if (a2 instanceof e4) {
                  if (a2.resolved) {
                    i2[u2] = a2.value, o2 -= 1;
                    continue;
                  }
                } else if (!n(a2)) {
                  i2[u2] = a2, o2 -= 1;
                  continue;
                }
                s2(u2, e4.resolve(a2), r2);
              }
              return 0 === o2 && r2.resolve(i2), r2;
            }, e4.hash = function(t4) {
              var r2 = {}, o2 = [], i2 = function(e5) {
                if (t4.hasOwnProperty(e5)) {
                  var i3 = t4[e5];
                  n(i3) ? o2.push(i3.then((function(t5) {
                    r2[e5] = t5;
                  }))) : r2[e5] = i3;
                }
              };
              for (var s2 in t4) i2(s2);
              return e4.all(o2).then((function() {
                return r2;
              }));
            }, e4.map = function(t4, r2) {
              return e4.all(t4.map(r2));
            }, e4.onPossiblyUnhandledException = function(e5) {
              return (function(e6) {
                return s.push(e6), { cancel: function() {
                  s.splice(s.indexOf(e6), 1);
                } };
              })(e5);
            }, e4.try = function(t4, r2, n2) {
              if (t4 && "function" != typeof t4 && !t4.call) throw new Error("Promise.try expected a function");
              var o2;
              c();
              try {
                o2 = t4.apply(r2, n2 || []);
              } catch (t5) {
                return d(), e4.reject(t5);
              }
              return d(), e4.resolve(o2);
            }, e4.delay = function(t4) {
              return new e4((function(e5) {
                setTimeout(e5, t4);
              }));
            }, e4.isPromise = function(t4) {
              return !!(t4 && t4 instanceof e4) || n(t4);
            }, e4.flush = function() {
              return t4 = o = o || new e4(), a(), t4;
              var t4;
            }, e4;
          })();
        }]);
      }, 834: (e2, t2, r) => {
        e2.exports = r(994);
      } }, t = {}, (function r(n) {
        var o = t[n];
        if (void 0 !== o) return o.exports;
        var i = t[n] = { exports: {} };
        return e[n].call(i.exports, i, i.exports, r), i.exports;
      })(156);
      var e, t;
    }));
  }
});

// src/timeline/timelinePostMessage/timelinePostMessage.ts
var timelinePostMessage_exports = {};
__export(timelinePostMessage_exports, {
  default: () => timelinePostMessage_default
});
module.exports = __toCommonJS(timelinePostMessage_exports);
var import_advanced_post_message = __toESM(require_dist(), 1);
var import_timelinePostMessage = require("./timelinePostMessage.constant.cjs");
var timelinePostMessage;
if (typeof window !== "undefined") {
  timelinePostMessage = new import_advanced_post_message.EventManager(import_timelinePostMessage.TIMELINE_CHANNEL_ID, {
    target: window.parent,
    debug: false
  });
}
var timelinePostMessage_default = timelinePostMessage;
//# sourceMappingURL=timelinePostMessage.cjs.map