import { CombinedFilter, Filter } from "@yext/answers-core";

export interface FiltersState {
  static?: Filter | CombinedFilter;
}