import { HeadlessAdditionalHttpHeaders } from '../models/client-sdk';
import { AdditionalHttpHeaders, ClientSDKHeaderValues } from '@yext/answers-core';
import packageJson from '../../package.json';

const CLIENT_SDK_HEADER = 'Client-SDK';
const { version } = packageJson;

export function getAdditionalHttpHeaders(
  headlessAdditionalHttpHeaders?: HeadlessAdditionalHttpHeaders
): AdditionalHttpHeaders {
  const clientSDKHeaderValues: ClientSDKHeaderValues = {
    ...headlessAdditionalHttpHeaders?.[CLIENT_SDK_HEADER],
    ANSWERS_HEADLESS: version
  };

  return {
    ...headlessAdditionalHttpHeaders,
    [CLIENT_SDK_HEADER]: clientSDKHeaderValues
  };
}