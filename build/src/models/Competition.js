"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Competition = void 0;
class Competition {
    constructor(id, name, attempts, isClosed) {
        this.id = id;
        this.name = name;
        this.attempts = attempts;
        this.isClosed = isClosed;
        this.getId = () => {
            return this.id;
        };
        this.getName = () => {
            return this.name;
        };
        this.getIsClosed = () => {
            return this.isClosed;
        };
        this.getAttempts = () => {
            return this.attempts;
        };
        this.setId = (newId) => {
            this.id = newId;
        };
        this.setName = (newName) => {
            this.name = newName;
        };
        this.setIsClosed = (newIsClosed) => {
            this.isClosed = newIsClosed;
        };
        this.setIsAttempts = (newAttempts) => {
            this.attempts = newAttempts;
        };
    }
}
exports.Competition = Competition;
//# sourceMappingURL=Competition.js.map