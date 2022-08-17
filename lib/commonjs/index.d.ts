import { AnswersConfig } from '@yext/answers-core';
import AnswersHeadless from './answers-headless';
import * as answersUtilities from './answers-utilities';
export * from './answers-core-re-exports';
export * from './models';
export * from './constants';
export * from './utils/filter-creators';
export * from './utils/types';
export { answersUtilities };
/**
 * The configuration for an AnswersHeadless instance.
 *
 * @public
 */
export declare type HeadlessConfig = AnswersConfig & {
    /**
     * The ID of the AnswersHeadless instance.
     *
     * @remarks
     * Must be different from {@link DEFAULT_HEADLESS_ID}.
     */
    headlessId?: string;
    /**
     * The verticalKey associated with the vertical to manage. If none is provided,
     * Answers Headless will manage universal search.
     */
    verticalKey?: string;
};
/**
 * Supplies a new instance of {@link AnswersHeadless}, using the provided configuration.
 *
 * @param config - The apiKey, experienceKey, etc. needed to set up a front-end Answers
 *                 experience.
 * @returns The newly created instance of {@link AnswersHeadless}
 *
 * @public
 */
export declare function provideAnswersHeadless(config: HeadlessConfig): AnswersHeadless;
export { AnswersHeadless };
//# sourceMappingURL=index.d.ts.map