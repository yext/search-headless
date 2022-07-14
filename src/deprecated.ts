import { searchUtilities, provideHeadless } from '.';
import SearchHeadless from './search-headless';

export {
  AnswersConfig,
  AnswersConfigWithToken,
  AnswersConfigWithApiKey,
  AnswersCore,
  AnswersError,
  AnswersRequest,
  BaseAnswersConfig
} from '@yext/search-core';

/**
 * @public
 *
 * @deprecated answersUtilities has been deprecated and renamed to searchUtilities
 */
export namespace answersUtilities { searchUtilities };

/**
 * Supplies a new instance of {@link SearchHeadless}, using the provided configuration.
 *
 * @param config - The apiKey, experienceKey, etc. needed to set up a front-end Answers
 *                 experience.
 * @returns The newly created instance of {@link SearchHeadless}
 *
 * @public
 *
 * @deprecated provideAnswersHeadless has been deprecated and renamed to provideHeadless
 */
export const provideAnswersHeadless = provideHeadless;

/**
 * @public
 *
 * @deprecated AnswersHeadless has been deprecated and renamed to SearchHeadless
 */
export class AnswersHeadless extends SearchHeadless {}