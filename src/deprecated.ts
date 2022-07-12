import { searchUtilities, provideHeadless } from '.';
import SearchHeadless from './search-headless';

/**
 * @public
 *
 * @deprecated answersUtilities has been deprecated and renamed to searchUtilities
 */
export const answersUtilities = searchUtilities;

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
export const AnswersHeadless = SearchHeadless;