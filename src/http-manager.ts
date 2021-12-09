type ServiceType = 'universalQuery' | 'verticalQuery';

type ServiceIds = {
  [key in ServiceType]: number;
};

/**
 * Assigns numeric IDs to every http request and the corresponding response
 * through {@link AnswersCore}. This helps track the received order of requests
 * and responses. {@link AnswersHeadless} uses it to ensure dispatch events for
 * state updates are triggered with up-to-date responses (e.g. if the newly received
 * response has a higher ID number than the recorded received response).
 */
export default class HttpManager {
  private latestRequestIds: ServiceIds;
  private latestResponseIds: ServiceIds;

  constructor() {
    this.latestRequestIds = {
      universalQuery: 0,
      verticalQuery: 0
    };

    this.latestResponseIds = {
      universalQuery: 0,
      verticalQuery: 0
    };
  }

  updateRequestId(requestName: ServiceType): number {
    return ++this.latestRequestIds[requestName];
  }

  setResponseId(responseName: ServiceType, responseId: number): void {
    this.latestResponseIds[responseName] = responseId;
  }

  getLatestResponseId(responseName: ServiceType): number {
    return this.latestResponseIds[responseName];
  }
}