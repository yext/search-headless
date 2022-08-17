import { PayloadAction, Slice } from '@reduxjs/toolkit';
import { SessionTrackingState } from '../models/slices/sessiontracking';
declare const reducers: {
    setEnabled: (state: any, action: PayloadAction<boolean>) => void;
    setSessionId: (state: any, action: PayloadAction<string>) => void;
};
/**
 * Registers with Redux the slice of {@link State} pertaining to session tracking of
 * an Answers experience.
 */
export default function createSessionTrackingSlice(prefix: string): Slice<SessionTrackingState, typeof reducers>;
export {};
//# sourceMappingURL=sessiontracking.d.ts.map