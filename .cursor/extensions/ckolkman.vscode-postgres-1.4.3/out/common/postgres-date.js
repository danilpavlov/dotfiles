"use strict";
// Clone of https://github.com/bendrucker/postgres-date
// modified for better more direct viewing of dates
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDate = exports.PGDate = void 0;
const CHAR_CODE_0 = '0'.charCodeAt(0);
const CHAR_CODE_9 = '9'.charCodeAt(0);
const CHAR_CODE_DASH = '-'.charCodeAt(0);
const CHAR_CODE_COLON = ':'.charCodeAt(0);
const CHAR_CODE_SPACE = ' '.charCodeAt(0);
const CHAR_CODE_DOT = '.'.charCodeAt(0);
const CHAR_CODE_Z = 'Z'.charCodeAt(0);
const CHAR_CODE_MINUS = '-'.charCodeAt(0);
const CHAR_CODE_PLUS = '+'.charCodeAt(0);
const TIME_RE = /^\d{2}\:/;
class PGDate {
    constructor(dateString) {
        this.dateString = dateString;
        this.pos = 0;
        this.stringLen = dateString.length;
        this.readString();
    }
    isDigit(c) {
        return c >= CHAR_CODE_0 && c <= CHAR_CODE_9;
    }
    /** read numbers and parse positive integer regex: \d+ */
    readInteger() {
        let val = 0;
        const start = this.pos;
        while (this.pos < this.stringLen) {
            const chr = this.dateString.charCodeAt(this.pos);
            if (this.isDigit(chr)) {
                val = val * 10;
                this.pos += 1;
                val += chr - CHAR_CODE_0;
            }
            else {
                break;
            }
        }
        if (start === this.pos) {
            return null;
        }
        return val;
    }
    /** read exactly 2 numbers and parse positive integer. regex: \d{2} */
    readInteger2() {
        const chr1 = this.dateString.charCodeAt(this.pos);
        const chr2 = this.dateString.charCodeAt(this.pos + 1);
        if (this.isDigit(chr1) && this.isDigit(chr2)) {
            this.pos += 2;
            return (chr1 - CHAR_CODE_0) * 10 + (chr2 - CHAR_CODE_0);
        }
        return -1;
    }
    skipChar(char) {
        if (this.pos === this.stringLen) {
            return false;
        }
        if (this.dateString.charCodeAt(this.pos) === char) {
            this.pos += 1;
            return true;
        }
        return false;
    }
    readBC() {
        if (this.pos === this.stringLen) {
            return false;
        }
        if (this.dateString.slice(this.pos, this.pos + 3) === ' BC') {
            this.pos += 3;
            return true;
        }
        return false;
    }
    checkEnd() {
        return this.pos === this.stringLen;
    }
    getUTC() {
        return this.skipChar(CHAR_CODE_Z);
    }
    readSign() {
        if (this.pos >= this.stringLen) {
            return null;
        }
        const char = this.dateString.charCodeAt(this.pos);
        if (char === CHAR_CODE_PLUS) {
            this.pos += 1;
            return 1;
        }
        if (char === CHAR_CODE_MINUS) {
            this.pos += 1;
            return -1;
        }
        return null;
    }
    getTZOffset() {
        // special handling for '+00' at the end of  - UTC
        if (this.pos === this.stringLen - 3 && this.dateString.slice(this.pos, this.pos + 3) === '+00') {
            this.pos += 3;
            return 0;
        }
        if (this.stringLen === this.pos) {
            return undefined;
        }
        const sign = this.readSign();
        if (sign === null) {
            if (this.getUTC()) {
                return 0;
            }
            return undefined;
        }
        const hours = this.readInteger2();
        if (hours === null) {
            return null;
        }
        let offset = hours * 3600;
        if (!this.skipChar(CHAR_CODE_COLON)) {
            return offset * sign * 1000;
        }
        const minutes = this.readInteger2();
        if (minutes === null) {
            return null;
        }
        offset += minutes * 60;
        if (!this.skipChar(CHAR_CODE_COLON)) {
            return offset * sign * 1000;
        }
        const seconds = this.readInteger2();
        if (seconds == null) {
            return null;
        }
        return (offset + seconds) * sign * 1000;
    }
    /* read milliseconds out of time fraction, returns 0 if missing, null if format invalid */
    readPrecision() {
        /* read milliseconds from fraction: .001=1, 0.1 = 100 */
        if (this.skipChar(CHAR_CODE_DOT)) {
            const oldPos = this.pos;
            let val = this.readInteger();
            const digits = this.pos - oldPos;
            if (digits < 2) {
                val *= 100;
            }
            else if (digits < 3) {
                val *= 10;
            }
            return { value: val, digits };
        }
        return { value: 0, digits: 0 };
    }
    readDate() {
        const year = this.readInteger();
        if (!this.skipChar(CHAR_CODE_DASH)) {
            return null;
        }
        let month = this.readInteger2();
        if (!this.skipChar(CHAR_CODE_DASH)) {
            return null;
        }
        const day = this.readInteger2();
        if (year === null || month === null || day === null) {
            return null;
        }
        return { year, month, day };
    }
    readTime() {
        if (!!this.pos && (this.stringLen - this.pos < 9 || !this.skipChar(CHAR_CODE_SPACE))) {
            // return { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }
            return undefined;
        }
        const hours = this.readInteger2();
        if (hours === null || !this.skipChar(CHAR_CODE_COLON)) {
            return null;
        }
        const minutes = this.readInteger2();
        if (minutes === null || !this.skipChar(CHAR_CODE_COLON)) {
            return null;
        }
        const seconds = this.readInteger2();
        if (seconds === null) {
            return null;
        }
        const precision = this.readPrecision();
        if (precision === null) {
            return null;
        }
        return { hours, minutes, seconds, precision };
    }
    readString() {
        const readAsTime = !!this.dateString.match(TIME_RE);
        const result = {};
        if (!readAsTime) {
            const date = this.readDate();
            if (date === null) {
                return;
            }
            result.date = date;
        }
        const time = this.readTime();
        if (time === null) {
            if (!result.date) {
                return;
            }
        }
        else {
            result.time = time;
            const tzOffset = this.getTZOffset();
            if (tzOffset !== null) {
                result.tzOffset = tzOffset;
            }
        }
        const isBC = this.readBC();
        if (isBC) {
            result.isBC = isBC;
        }
        if (!this.checkEnd()) {
            return;
        }
        this.parsed = result;
    }
    toDate() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
        const date = ((_a = this.parsed) === null || _a === void 0 ? void 0 : _a.date)
            ? Object.assign({}, this.parsed.date) : undefined;
        const time = (_b = this.parsed) === null || _b === void 0 ? void 0 : _b.time;
        const tzOffset = (_c = this.parsed) === null || _c === void 0 ? void 0 : _c.tzOffset;
        const isBC = (_d = this.parsed) === null || _d === void 0 ? void 0 : _d.isBC;
        if (!date && !time) {
            return null;
        }
        if (!!date) {
            date.month = date.month - 1;
            if (isBC) {
                date.year = -(date.year - 1);
            }
        }
        let milliseconds;
        if (time) {
            milliseconds = time.precision.value;
            while (milliseconds > 1000) {
                milliseconds /= 1000;
            }
        }
        let now = new Date();
        let jsDate;
        if (tzOffset !== undefined) {
            jsDate = new Date(Date.UTC((_e = date === null || date === void 0 ? void 0 : date.year) !== null && _e !== void 0 ? _e : now.getUTCFullYear(), (_f = date === null || date === void 0 ? void 0 : date.month) !== null && _f !== void 0 ? _f : now.getUTCMonth(), (_g = date === null || date === void 0 ? void 0 : date.day) !== null && _g !== void 0 ? _g : now.getUTCDate(), (_h = time === null || time === void 0 ? void 0 : time.hours) !== null && _h !== void 0 ? _h : now.getUTCHours(), (_j = time === null || time === void 0 ? void 0 : time.minutes) !== null && _j !== void 0 ? _j : now.getUTCMinutes(), (_k = time === null || time === void 0 ? void 0 : time.seconds) !== null && _k !== void 0 ? _k : now.getUTCSeconds(), milliseconds !== null && milliseconds !== void 0 ? milliseconds : now.getUTCMilliseconds()));
            if (date && date.year <= 99 && date.year >= -99) {
                jsDate.setUTCFullYear(date.year);
            }
            if (tzOffset !== 0) {
                jsDate.setTime(jsDate.getTime() - tzOffset);
            }
        }
        else {
            jsDate = new Date((_l = date === null || date === void 0 ? void 0 : date.year) !== null && _l !== void 0 ? _l : now.getFullYear(), (_m = date === null || date === void 0 ? void 0 : date.month) !== null && _m !== void 0 ? _m : now.getMonth(), (_o = date === null || date === void 0 ? void 0 : date.day) !== null && _o !== void 0 ? _o : now.getDate(), (_p = time === null || time === void 0 ? void 0 : time.hours) !== null && _p !== void 0 ? _p : now.getHours(), (_q = time === null || time === void 0 ? void 0 : time.minutes) !== null && _q !== void 0 ? _q : now.getMinutes(), (_r = time === null || time === void 0 ? void 0 : time.seconds) !== null && _r !== void 0 ? _r : now.getSeconds(), milliseconds !== null && milliseconds !== void 0 ? milliseconds : now.getMilliseconds());
            if (date && date.year <= 99 && date.year >= -99) {
                jsDate.setFullYear(date.year);
            }
        }
        return jsDate;
    }
    format() {
        var _a, _b, _c, _d;
        const date = (_a = this.parsed) === null || _a === void 0 ? void 0 : _a.date;
        const time = (_b = this.parsed) === null || _b === void 0 ? void 0 : _b.time;
        const tzOffset = (_c = this.parsed) === null || _c === void 0 ? void 0 : _c.tzOffset;
        const isBC = (_d = this.parsed) === null || _d === void 0 ? void 0 : _d.isBC;
        let results = [];
        if (date) {
            results.push(formatDate(date));
        }
        if (time) {
            results.push(formatTime(time, tzOffset));
        }
        if (date && isBC) {
            results.push('BC');
        }
        return results.join(' ');
    }
    static parse(dateString) {
        return new PGDate(dateString);
    }
}
exports.PGDate = PGDate;
function parseDate(isoDate) {
    var _a, _b;
    if (isoDate === null || isoDate === undefined) {
        return null;
    }
    if (isoDate === 'infinity') {
        return Infinity;
    }
    if (isoDate === '-infinity') {
        return -Infinity;
    }
    const date = PGDate.parse(isoDate);
    if (!((_a = date.parsed) === null || _a === void 0 ? void 0 : _a.date) && !((_b = date.parsed) === null || _b === void 0 ? void 0 : _b.time)) {
        return null;
    }
    return date;
}
exports.parseDate = parseDate;
function formatDate(date) {
    const year = date.year.toString();
    const month = date.month.toString();
    const day = date.day.toString();
    return `${year.padStart(4, '0')}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}
function formatTime(time, tzOffset) {
    const hours = time.hours.toString();
    const minutes = time.minutes.toString();
    const seconds = time.seconds.toString();
    let precision = time.precision.toString().replace(/0+$/, '');
    if (!precision) {
        // accidentally removed ALL digits (happens if precision is 0 exactly)
        // we would still want that to show though
        precision = '0';
    }
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}.${precision.padStart(time.precision.digits, '0')}${formatTZ(tzOffset)}`;
}
function formatTZ(tzOffset) {
    if (tzOffset === undefined) {
        return '';
    }
    if (tzOffset === 0) {
        return 'Z';
    }
    // convert
    const sign = tzOffset < 0 ? -1 : 1;
    tzOffset = tzOffset * sign / 1000;
    const PN = sign < 0 ? '-' : '+';
    const minutes = Math.floor((tzOffset / 60) % 60);
    const hours = Math.floor((tzOffset / (60 * 60)) % 24).toString();
    const result = [`${PN}${hours.padStart(2, '0')}`];
    if (minutes > 0) {
        result.push(minutes.toString().padStart(2, '0'));
    }
    return result.join(':');
}
//# sourceMappingURL=postgres-date.js.map