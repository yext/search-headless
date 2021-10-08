type RequestType = 'universalQuery'
  | 'verticalQuery'
  | 'universalAutoComplete'
  | 'verticalAutoComplete';

type RequestIds = {
  [key in RequestType]: number;
};

/**
 * Track ids from latest requests. This is use in {@link StatefulCore} to ensure
 * dispatch event for state update using responses from latest requests.
 */
export default class RequestManager {
  private latestRequestIds: RequestIds;

  constructor() {
    this.latestRequestIds = {
      universalQuery: 0,
      verticalQuery: 0,
      universalAutoComplete: 0,
      verticalAutoComplete: 0
    };
  }

  updateRequestId(requestName: RequestType): number {
    return ++this.latestRequestIds[requestName];
  }

  getLatestRequestId(requestName: RequestType): number {
    return this.latestRequestIds[requestName];
  }
}