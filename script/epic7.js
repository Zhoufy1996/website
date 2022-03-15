"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var propertyCode = [
    'attack',
    'attack_percent',
    'defense',
    'defense_percent',
    'life',
    'life_percent',
    'speed',
    'effect_hit',
    'effect_resistance',
    'crit_rate',
    'crit_injury',
];
var saveTemplateAsFile = function (filename, dataObjToWrite) {
    var blob = new Blob([JSON.stringify(dataObjToWrite)], { type: 'text/json' });
    var link = document.createElement('a');
    link.download = filename;
    link.href = window.URL.createObjectURL(blob);
    link.dataset.downloadurl = ['text/json', link.download, link.href].join(':');
    var evt = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
    });
    link.dispatchEvent(evt);
    link.remove();
};
var getEnhancedProbability = function () {
    var getOne = function (tableElement, code, level) {
        var trArray = Array.from(tableElement.querySelectorAll('tr'));
        var trs = trArray.slice(2, trArray.length - 1);
        var result = [];
        var temp = {
            quality: 'legend',
            level: level,
            code: code,
            probability: 0,
            value: 0
        };
        trs.forEach(function (tr, index) {
            var tdArray = Array.from(tr.querySelectorAll('td'));
            var tds = tdArray.slice(index === 0 ? 1 : 0);
            tds.map(function (td) { return td.innerHTML; }).forEach(function (str, i) {
                if (i % 2 === 0) {
                    temp.value = Number(str);
                }
                else {
                    temp.probability = Number(str.replace('%', ''));
                }
                if (i === 0) {
                    temp.quality = 'legend';
                }
                else if (i === 2) {
                    temp.quality = 'hero';
                }
                else if (i === 4) {
                    temp.quality = 'rare';
                }
                if (i % 2 === 1) {
                    result.push(__assign({}, temp));
                }
            });
        });
        return result;
    };
    var result = [];
    var getLevel = function (i) {
        if (i < 11) {
            return '88';
        }
        if (i < 22) {
            return '72-85';
        }
        return '58-71';
    };
    var getCode = function (i) {
        return propertyCode[i % 11];
    };
    var tables = Array.from(document.querySelectorAll('table')).slice(3, 36);
    // 88 72-85 58-71
    // 攻击力 攻击力(%) 防御力 防御力(%) 生命力 生命力(%) 速度 效果命中 效果抗性 暴击率 暴击伤害
    tables.forEach(function (table, i) {
        result.push.apply(result, getOne(table, getCode(i), getLevel(i)));
    });
    return result;
};
exports["default"] = getEnhancedProbability;
