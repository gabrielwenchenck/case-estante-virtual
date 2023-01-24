"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Athlete = void 0;
class Athlete {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.getId = () => {
            return this.id;
        };
        this.getName = () => {
            return this.name;
        };
        this.setId = (newId) => {
            this.id = newId;
        };
        this.setName = (newName) => {
            this.name = newName;
        };
    }
}
exports.Athlete = Athlete;
//# sourceMappingURL=Athlete.js.map