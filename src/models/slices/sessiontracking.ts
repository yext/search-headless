/**
 * The state for session tracking.
 */
export interface SessionTrackingState {
  /**
   * Whether session tracking is enabled or not.
   */
  enabled?: boolean,
  /**
   * The ID of the current session. Used to track session state when cookies are blocked.
   */
  sessionId?: string
}
