type RequestType = 'universalQuery'
  | 'verticalQuery'
  | 'universalAutoComplete'
  | 'verticalAutoComplete';

export default class RequestManager {
  private latestRequestIds: Record<string, number>;

  constructor() {
    this.latestRequestIds = {
      universalQuery: 0,
      verticalQuery: 0,
      universalAutoComplete: 0,
      verticalAutoComplete: 0
    };
  }

  updateRequestId(requestName: RequestType): number {
    const newId = ++this.latestRequestIds[requestName];
    this.latestRequestIds[requestName] = newId;
    return newId;
  }

  getLatestRequestId(requestName: RequestType): number {
    return this.latestRequestIds[requestName];
  }
}