import SortBy from "../models/sort_by";

export const SORT_BY_OPTIONS = [
  new SortBy("sb1", "Oldest to Newest"),
  new SortBy("sb2", "Newest to Oldest"),
  new SortBy("sb3", "Popularity"),
  new SortBy("sb4", "Name"),
];
