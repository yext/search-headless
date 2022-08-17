/**
 * Maintains whether the user session should be tracked and, if so, the session
 * information.
 *
 * @public
 */
export interface SessionTrackingState {
    /**
     * Whether or not session tracking is enabled.
     */
    enabled?: boolean;
    /**
     * The ID of the current session. Used to track session state when cookies
     * are blocked.
     */
    sessionId?: string;
}
//# sourceMappingURL=sessiontracking.d.ts.map