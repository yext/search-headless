import { EnhancedStore, PayloadAction } from '@reduxjs/toolkit';
import { ParentState } from './models/state';
export interface ActionWithHeadlessId extends PayloadAction<unknown> {
    headlessId: string;
}
export declare function createBaseStore(): EnhancedStore<ParentState, ActionWithHeadlessId>;
//# sourceMappingURL=store.d.ts.map