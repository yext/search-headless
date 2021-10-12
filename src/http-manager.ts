type ServiceType = 'universalQuery'
  | 'verticalQuery'
  | 'universalAutoComplete'
  | 'verticalAutoComplete';

type ServiceIds = {
  [key in ServiceType]: number;
};

/**
 * Assign numeric ids to every http requests and the corresponding responses
 * through answers-core, and track the latest received requests and responses.
 * This is use in {@link StatefulCore} to ensure dispatch event for state update
 * is trigger from up-to-date responses.
 */
export default class HttpManager {
  private latestRequestIds: ServiceIds;
  private latestResponseIds: ServiceIds;

  constructor() {
    this.latestRequestIds = {
      universalQuery: 0,
      verticalQuery: 0,
      universalAutoComplete: 0,
      verticalAutoComplete: 0
    };

    this.latestResponseIds = {
      universalQuery: 0,
      verticalQuery: 0,
      universalAutoComplete: 0,
      verticalAutoComplete: 0
    };
  }

  updateRequestId(requestName: ServiceType): number {
    return ++this.latestRequestIds[requestName];
  }

  getLatestRequestId(requestName: ServiceType): number {
    return this.latestRequestIds[requestName];
  }

  setResponseId(responseName: ServiceType, responseId: number): void {
    this.latestResponseIds[responseName] = responseId;
  }

  getLatestResponseId(responseName: ServiceType): number {
    return this.latestResponseIds[responseName];
  }
}