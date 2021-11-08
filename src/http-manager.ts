type ServiceType = 'universalQuery'
  | 'verticalQuery'
  | 'universalAutoComplete'
  | 'verticalAutoComplete'
  | 'filterSearch';

type ServiceIds = {
  [key in ServiceType]: number;
};

/**
 * Assign numeric ids to every http requests and the corresponding responses
 * through {@link AnswersCore}. This helps track the received order of requests
 * and responses. {@link AnswersHeadless} use it to ensure dispatch event for
 * state update is trigger from up-to-date responses (e.g. if the new received
 * response have higher id number from the recorded received response)
 */
export default class HttpManager {
  private latestRequestIds: ServiceIds;
  private latestResponseIds: ServiceIds;

  constructor() {
    this.latestRequestIds = {
      universalQuery: 0,
      verticalQuery: 0,
      universalAutoComplete: 0,
      verticalAutoComplete: 0,
      filterSearch: 0
    };

    this.latestResponseIds = {
      universalQuery: 0,
      verticalQuery: 0,
      universalAutoComplete: 0,
      verticalAutoComplete: 0,
      filterSearch: 0
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