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
import { provideCore } from '@yext/answers-core';
import HttpManager from './http-manager';
import ReduxStateManager from './redux-state-manager';
import AnswersHeadless from './answers-headless';
import { createBaseStore } from './store';
import HeadlessReducerManager from './headless-reducer-manager';
import { DEFAULT_HEADLESS_ID } from './constants';
import * as answersUtilities from './answers-utilities';
export * from './answers-core-re-exports';
export * from './models';
export * from './constants';
export * from './utils/filter-creators';
export * from './utils/types';
export { answersUtilities };
let firstHeadlessInstance;
const store = createBaseStore();
const headlessReducerManager = new HeadlessReducerManager();
/**
 * Supplies a new instance of {@link AnswersHeadless}, using the provided configuration.
 *
 * @param config - The apiKey, experienceKey, etc. needed to set up a front-end Answers
 *                 experience.
 * @returns The newly created instance of {@link AnswersHeadless}
 *
 * @public
 */
export function provideAnswersHeadless(config) {
    const { verticalKey, headlessId } = config, answersConfig = __rest(config, ["verticalKey", "headlessId"]);
    if (headlessId === DEFAULT_HEADLESS_ID) {
        throw new Error(`Cannot instantiate an AnswersHeadless using the default headlessId "${headlessId}". `
            + 'Specify a different headlessId.');
    }
    const answersCore = provideCore(answersConfig);
    const stateManager = new ReduxStateManager(store, headlessId || DEFAULT_HEADLESS_ID, headlessReducerManager);
    const httpManager = new HttpManager();
    const headless = new AnswersHeadless(answersCore, stateManager, httpManager);
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
export { AnswersHeadless };
//# sourceMappingURL=index.js.map