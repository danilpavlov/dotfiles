"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatFieldValue = void 0;
const global_1 = require("./global");
function formatFieldValue(field, value, raw) {
    if (value === null) {
        if (raw)
            return value;
        return `<i>null</i>`;
    }
    if (typeof value === typeof undefined)
        return '';
    let canTruncate = false;
    switch (field.format) {
        case 'interval':
            value = formatInterval(value);
            break;
        case 'json':
        case 'jsonb':
        case 'point':
        case 'circle':
            if (!raw) {
                if (global_1.Global.Configuration.get("prettyPrintJSONfields"))
                    value = JSON.stringify(value, null, 2);
                else
                    value = JSON.stringify(value);
            }
            break;
        case 'text':
            canTruncate = true;
            break;
        case 'bytea':
            value = '\\x' + value.toString('hex').toUpperCase();
            break;
        default:
            if (!raw) {
                value = value.toString();
            }
    }
    if (raw) {
        return value;
    }
    let formatted = htmlEntities(value);
    if (canTruncate) {
        if (formatted && formatted.length > 150)
            formatted = formatted.substring(0, 148) + '&hellip;';
    }
    return formatted;
}
exports.formatFieldValue = formatFieldValue;
function htmlEntities(str) {
    if (typeof str !== 'string')
        return str;
    // console.log('String:', str);
    // for (let i = 0; i < str.length; i++) {
    //   console.log('  ', str[i], ' - ', str[i].charCodeAt(0));
    // }
    return str ? str.replace(/[\u00A0-\u9999<>\&"']/gim, (i) => `&#${i.charCodeAt(0)};`) : undefined;
}
// #region "Format Interval"
function formatInterval(value) {
    let keys = ['years', 'months', 'days', 'hours', 'minutes', 'seconds', 'milliseconds'];
    let is_negative = false;
    for (let key of keys) {
        if (!value.hasOwnProperty(key))
            value[key] = 0;
        else if (value[key] < 0) {
            is_negative = true;
            value[key] = Math.abs(value[key]);
        }
    }
    switch (global_1.Global.Configuration.get("intervalFormat")) {
        case 'humanize':
            return formatIntervalHumanize(value, is_negative);
        case 'succinct':
            return formatIntervalSuccinct(value, is_negative);
        default: // iso_8601
            return formatIntervalISO(value, is_negative);
    }
}
function formatIntervalISO(value, is_negative) {
    //{"days":4107,"hours":5,"minutes":56,"seconds":17,"milliseconds":681}
    let iso = 'P';
    if (value.years)
        iso += value.years.toString() + 'Y';
    if (value.months)
        iso += value.months.toString() + 'M';
    if (value.days)
        iso += value.days.toString() + 'D';
    if (iso === 'P' || (value.hours || value.minutes || value.seconds))
        iso += 'T';
    if (value.hours)
        iso += value.hours.toString() + 'H';
    if (value.minutes)
        iso += value.minutes.toString() + 'M';
    if (!value.hasOwnProperty('seconds'))
        value.seconds = 0;
    if (value.milliseconds)
        value.seconds += (value.milliseconds / 1000);
    if (value.seconds)
        iso += value.seconds.toString() + 'S';
    if (iso === 'PT')
        iso += '0S';
    return (is_negative ? '-' : '') + iso;
}
function formatIntervalHumanize(value, is_negative) {
    let values = [];
    if (!value.hasOwnProperty('seconds'))
        value.seconds = 0;
    if (value.milliseconds)
        value.seconds += (value.milliseconds / 1000);
    if (value.years)
        values.push(value.years.toString() + ' years');
    if (value.months)
        values.push(value.months.toString() + ' months');
    if (value.days)
        values.push(value.days.toString() + ' days');
    if (value.hours)
        values.push(value.hours.toString() + ' hours');
    if (value.minutes)
        values.push(value.minutes.toString() + ' minutes');
    if (value.seconds)
        values.push(value.seconds.toString() + ' seconds');
    if (values.length < 1)
        values.push('0 seconds');
    if (is_negative)
        values.push('ago');
    return values.join(' ');
}
function formatIntervalSuccinct(value, is_negative) {
    let values = [];
    if (value.milliseconds)
        value.seconds += (value.milliseconds / 1000);
    if (value.years)
        values.push(value.years.toString());
    if (values.length || value.months)
        values.push(value.months.toString());
    if (values.length || value.days)
        values.push(value.days.toString());
    if (values.length || value.hours)
        values.push(value.hours.toString());
    if (values.length || value.minutes)
        values.push(value.minutes.toString());
    if (values.length || value.seconds)
        values.push(value.seconds.toString());
    if (values.length < 1)
        values.push('0');
    if (is_negative)
        values.unshift('-');
    return values.join(':');
}
// #endregion
//# sourceMappingURL=formatting.js.map