"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswersHeadless = exports.provideAnswersHeadless = exports.answersUtilities = void 0;
const answers_core_1 = require("@yext/answers-core");
const http_manager_1 = __importDefault(require("./http-manager"));
const redux_state_manager_1 = __importDefault(require("./redux-state-manager"));
const answers_headless_1 = __importDefault(require("./answers-headless"));
exports.AnswersHeadless = answers_headless_1.default;
const store_1 = require("./store");
const headless_reducer_manager_1 = __importDefault(require("./headless-reducer-manager"));
const constants_1 = require("./constants");
const answersUtilities = __importStar(require("./answers-utilities"));
exports.answersUtilities = answersUtilities;
__exportStar(require("./answers-core-re-exports"), exports);
__exportStar(require("./models"), exports);
__exportStar(require("./constants"), exports);
__exportStar(require("./utils/filter-creators"), exports);
__exportStar(require("./utils/types"), exports);
let firstHeadlessInstance;
const store = (0, store_1.createBaseStore)();
const headlessReducerManager = new headless_reducer_manager_1.default();
/**
 * Supplies a new instance of {@link AnswersHeadless}, using the provided configuration.
 *
 * @param config - The apiKey, experienceKey, etc. needed to set up a front-end Answers
 *                 experience.
 * @returns The newly created instance of {@link AnswersHeadless}
 *
 * @public
 */
function provideAnswersHeadless(config) {
    const { verticalKey, headlessId } = config, answersConfig = __rest(config, ["verticalKey", "headlessId"]);
    if (headlessId === constants_1.DEFAULT_HEADLESS_ID) {
        throw new Error(`Cannot instantiate an AnswersHeadless using the default headlessId "${headlessId}". `
            + 'Specify a different headlessId.');
    }
    const answersCore = (0, answers_core_1.provideCore)(answersConfig);
    const stateManager = new redux_state_manager_1.default(store, headlessId || constants_1.DEFAULT_HEADLESS_ID, headlessReducerManager);
    const httpManager = new http_manager_1.default();
    const headless = new answers_headless_1.default(answersCore, stateManager, httpManager);
    verticalKey
        ? headless.setVertical(verticalKey)
        : headless.setUniversal();
    if (!firstHeadlessInstance) {
        firstHeadlessInstance = headless;
    }
    else {
        // Two-way bind the current headless instances with the first one instantiated on the page.
        // This way, all headless instances on a page will have their sessionTracking states linked.
        // We have to be careful not to create an infinite loop here.
        linkSessionTracking(firstHeadlessInstance, headless);
        linkSessionTracking(headless, firstHeadlessInstance);
    }
    return headless;
}
exports.provideAnswersHeadless = provideAnswersHeadless;
/**
 * Links the secondHeadless instance to sessionTracking updates made to the firstHeadless
 * instance.
 */
function linkSessionTracking(firstHeadless, secondHeadless) {
    firstHeadless.addListener({
        valueAccessor: state => state.sessionTracking,
        callback: sessionTracking => {
            secondHeadless.setState(Object.assign(Object.assign({}, secondHeadless.state), { sessionTracking }));
        }
    });
}
//# sourceMappingURL=index.js.map