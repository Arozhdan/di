export { default as GlobalSearch } from './ui/GlobalSearch/GlobalSearch';
export type { GlobalSearchSchema } from './model/types/GlobalSearch.schema';

export { selectGlobalSearch } from './model/selectors/selectGlobalSearhResults/selectGlobalSearhResults';

export { globalSearchReducer, globalSearchActions } from './model/slice/GlobalSeach.slice';