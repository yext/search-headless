import { AdditionalHttpHeaders, ClientSDKHeaderValues } from '@yext/answers-core';

/**
 * Allows users to specify additional values for specific HTTP headers.
 *
 * @public
 */
export interface CustomHttpHeaders extends AdditionalHttpHeaders {
  /** {@inheritDoc CustomClientSDKHeaderValues} */
  'Client-SDK'?: CustomClientSDKHeaderValues
}

/**
 * Additional agents and their versions used to create the Answers experience. The information
 * for these agents is added to the Client-SDK HTTP header for Answers API requests along with
 * that of the ANSWERS_HEADLESS and ANSWERS_CORE agents.
 *
 * @public
 */
export interface CustomClientSDKHeaderValues extends ClientSDKHeaderValues {
  /**
   * The ANSWERS_HEADLESS agent should not be supplied. Instead, it will be automatically added to
   * the header and populated with the version of Answers Headless being used.
   */
  'ANSWERS_HEADLESS'?: never
}
