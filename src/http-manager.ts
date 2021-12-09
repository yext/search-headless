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
  /**
   * A mapping of each service to the ID for the latest request to that service.
   */
  private latestRequestIds: ServiceIds;
  /**
   * A mapping of each service to the ID for the latest response from that service.
   */
  private latestResponseIds: ServiceIds;

  /**
   * All service requests and responses start with a default ID of 0.
   */
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

  /**
   * Changes the ID for the latest request of the given service.
   *
   * @param requestName - The service whose request ID is to be updated
   * @returns The updated request ID for the service
   */
  updateRequestId(requestName: ServiceType): number {
    return ++this.latestRequestIds[requestName];
  }

  /**
   * Sets the ID for the response of the given service to the specified number.
   *
   * @param responseName - The service whose response ID is to be set
   * @param responseId - The number to set as the response ID
   */
  setResponseId(responseName: ServiceType, responseId: number): void {
    this.latestResponseIds[responseName] = responseId;
  }

  /**
   * Retrieves the ID for the latest response from the specified service.
   *
   * @param responseName - The service whose response ID to get
   * @returns The latest reponse ID for the service
   */
  getLatestResponseId(responseName: ServiceType): number {
    return this.latestResponseIds[responseName];
  }
}