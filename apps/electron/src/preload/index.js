"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var electronApi = {
    sendToMain: function (channel, data) {
        electron_1.ipcRenderer.send(channel, data);
    },
    listen: function (channel, func) {
        electron_1.ipcRenderer.on(channel, function (event) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return func.apply(void 0, __spreadArray([event], args, false));
        });
    },
    unlisten: function (channel, func) {
        electron_1.ipcRenderer.off(channel, func);
    },
    unlistenAll: function (channel) {
        electron_1.ipcRenderer.removeAllListeners(channel);
    },
};
electron_1.contextBridge.exposeInMainWorld('electronApi', electronApi);
