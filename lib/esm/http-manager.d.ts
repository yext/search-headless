declare type ServiceType = 'universalQuery' | 'verticalQuery';
/**
 * Assigns numeric IDs to every http request and the corresponding response
 * through {@link AnswersCore}. This helps track the received order of requests
 * and responses. {@link AnswersHeadless} uses it to ensure dispatch events for
 * state updates are triggered with up-to-date responses (e.g. if the newly received
 * response has a higher ID number than the recorded received response).
 */
export default class HttpManager {
    private latestRequestIds;
    private latestResponseIds;
    constructor();
    updateRequestId(requestName: ServiceType): number;
    setResponseId(responseName: ServiceType, responseId: number): void;
    getLatestResponseId(responseName: ServiceType): number;
    /**
     * Update the latest saved response id of the given service type if
     * the given request id is newer than the latest saved response id.
     *
     * @param requestName - the request type.
     * @param requestId - the request id of a received response.
     *
     * @returns Whether the response of the given request id is the latest response.
     */
    processRequestId(requestName: ServiceType, requestId: number): boolean;
}
export {};
//# sourceMappingURL=http-manager.d.ts.map