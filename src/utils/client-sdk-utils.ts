import { AdditionalHttpHeaders, ClientSDKHeaderValues } from '@yext/answers-core';
import packageJson from '../../package.json';

const CLIENT_SDK_HEADER = 'Client-SDK';
const { version } = packageJson;

export function getHttpHeaders(
  additionalHttpHeaders?: AdditionalHttpHeaders
): AdditionalHttpHeaders {
  const clientSDKHeaderValues: ClientSDKHeaderValues = {
    ...additionalHttpHeaders?.[CLIENT_SDK_HEADER],
    ANSWERS_HEADLESS: version
  };

  return {
    ...additionalHttpHeaders,
    [CLIENT_SDK_HEADER]: clientSDKHeaderValues
  };
}