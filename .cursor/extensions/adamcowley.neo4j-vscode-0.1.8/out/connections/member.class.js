"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Member {
    constructor(member) {
        this.member = member;
    }
    getTreeItem() {
        return {
            label: this.member
        };
    }
    getChildren() {
        return [];
    }
}
exports.default = Member;
//# sourceMappingURL=member.class.js.map