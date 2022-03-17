import { CustomHttpHeaders } from '../models/client-sdk';
import { AdditionalHttpHeaders, ClientSDKHeaderValues } from '@yext/answers-core';
import packageJson from '../../package.json';

const CLIENT_SDK_HEADER = 'Client-SDK';
const { version } = packageJson;

export function getAdditionalHttpHeaders(customHttpHeaders?: CustomHttpHeaders): AdditionalHttpHeaders {
  const clientSDKHeaderValues: ClientSDKHeaderValues = {
    ...customHttpHeaders?.[CLIENT_SDK_HEADER],
    ANSWERS_HEADLESS: version
  };

  return {
    ...customHttpHeaders,
    [CLIENT_SDK_HEADER]: clientSDKHeaderValues
  };
}