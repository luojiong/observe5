"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventEmitter = /** @class */ (function () {
    function EventEmitter() {
        this.listeners = new WeakMap();
    }
    EventEmitter.prototype.on = function (eventName, fn) {
        var eventListeners = this.listeners.get(this) || new Map();
        var listeners = eventListeners.get(eventName) || [];
        listeners.push(fn);
        eventListeners.set(eventName, listeners);
        this.listeners.set(this, eventListeners);
    };
    EventEmitter.prototype.off = function (eventName, fn) {
        var eventListeners = this.listeners.get(this);
        if (eventListeners) {
            var listeners = eventListeners.get(eventName);
            if (listeners) {
                var index = listeners.indexOf(fn);
                if (index !== -1) {
                    listeners.splice(index, 1);
                }
                if (listeners.length === 0) {
                    eventListeners.delete(eventName);
                }
            }
            if (eventListeners.size === 0) {
                this.listeners.delete(this);
            }
        }
    };
    EventEmitter.prototype.emit = function (eventName, params) {
        var eventListeners = this.listeners.get(this);
        if (eventListeners) {
            var listeners = eventListeners.get(eventName);
            if (listeners) {
                for (var _i = 0, listeners_1 = listeners; _i < listeners_1.length; _i++) {
                    var listener = listeners_1[_i];
                    listener(params);
                }
            }
        }
    };
    return EventEmitter;
}());
exports.default = EventEmitter;
