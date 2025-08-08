import { combineReducers, configureStore } from '@reduxjs/toolkit';
import omit from 'lodash/omit';
import debounce from 'lodash/debounce';
import { useDispatch, useSelector } from 'react-redux';
import { metadataReducer } from './metadata.slice';
import { dataReducer } from './data.slice';
import { authReducer } from './authSlice';
export * from './metadata.slice';
export * from './data.slice';
const KEY = 'redux_sdw_widget';
export function loadState() {
  try {
    const serializedState = localStorage.getItem(KEY);
    if (!serializedState) return undefined;
    const currentCopy = JSON.parse(serializedState);
    return omit(currentCopy, ['auth']);
    // eslint-disable-next-line
  } catch (e) {
    return undefined;
  }
}

export async function saveState(state: any) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(KEY, serializedState);
    // eslint-disable-next-line
  } catch (e) {
    // Ignore
  }
}

const rootReducer = combineReducers({
  metadata: metadataReducer,
  data: dataReducer,
  auth: authReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: import.meta.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: {
        // Ignore state paths, e.g. state for 'items':
        ignoredPaths: ['metadata.data'],
      },
      serializableCheck: { ignoredPaths: ['metadata.data'] },
    }),
  preloadedState: loadState(),
});
// here we subscribe to the store changes
store.subscribe(
  // we use debounce to save the state once each 800ms
  // for better performances in case multiple changes occur in a short time
  debounce(() => {
    saveState(store.getState());
  }, 800)
);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
