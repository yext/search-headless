import { CustomAnswersAgents } from '../models/client-sdk';
import { CustomClientSdk } from '@yext/answers-core';
import packageJson from '../../package.json';

const { version } = packageJson;

export function getCustomClientSdk(additionalAgents?: CustomAnswersAgents): CustomClientSdk {
  return {
    ...additionalAgents,
    ANSWERS_HEADLESS: version
  };
}