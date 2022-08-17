"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const toolkit_1 = require("@reduxjs/toolkit");
const query_1 = __importDefault(require("./slices/query"));
const vertical_1 = __importDefault(require("./slices/vertical"));
const universal_1 = __importDefault(require("./slices/universal"));
const filters_1 = __importDefault(require("./slices/filters"));
const spellcheck_1 = __importDefault(require("./slices/spellcheck"));
const sessiontracking_1 = __importDefault(require("./slices/sessiontracking"));
const meta_1 = __importDefault(require("./slices/meta"));
const location_1 = __importDefault(require("./slices/location"));
const directanswer_1 = __importDefault(require("./slices/directanswer"));
const searchstatus_1 = __importDefault(require("./slices/searchstatus"));
const queryrules_1 = __importDefault(require("./slices/queryrules"));
/**
 * Manages the current map of headless IDs to Reducers.
 */
class HeadlessReducerManager {
    constructor() {
        this.headlessIdToReducer = {};
    }
    addAnswersReducer(headlessId) {
        this.headlessIdToReducer[headlessId] = createAnswersReducer(headlessId + '/');
    }
    getParentReducer() {
        // set-state should only update the state tree for the AnswersHeadless instance
        // that dispatched it
        const coreReducer = (0, toolkit_1.combineReducers)(this.headlessIdToReducer);
        return (state, action) => {
            if (action.type === 'set-state') {
                return Object.assign(Object.assign({}, state), { [action.headlessId]: action.payload });
            }
            else {
                return coreReducer(state, action);
            }
        };
    }
}
exports.default = HeadlessReducerManager;
function createAnswersReducer(prefix) {
    return (0, toolkit_1.combineReducers)({
        query: (0, query_1.default)(prefix).reducer,
        vertical: (0, vertical_1.default)(prefix).reducer,
        universal: (0, universal_1.default)(prefix).reducer,
        directAnswer: (0, directanswer_1.default)(prefix).reducer,
        queryRules: (0, queryrules_1.default)(prefix).reducer,
        filters: (0, filters_1.default)(prefix).reducer,
        spellCheck: (0, spellcheck_1.default)(prefix).reducer,
        sessionTracking: (0, sessiontracking_1.default)(prefix).reducer,
        searchStatus: (0, searchstatus_1.default)(prefix).reducer,
        meta: (0, meta_1.default)(prefix).reducer,
        location: (0, location_1.default)(prefix).reducer
    });
}
//# sourceMappingURL=headless-reducer-manager.js.map