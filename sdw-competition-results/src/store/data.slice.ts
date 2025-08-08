import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DisplayEntry, Entry, MasterData, MasterDataCategory, MetaField } from 'models';

type IMasterDataInfo = {
  [key in MasterDataCategory]: Array<Entry>;
};
export interface IDataState extends IMasterDataInfo {
  sources: Array<DisplayEntry>;
  metaFields: Array<MetaField>;
  hasHidden?: boolean;
}
export interface MasterPayload {
  data: Array<Entry>;
  category: MasterDataCategory;
}

const name = 'SDW_Share Data';
const initialState: IDataState = {
  hasHidden: false,
  metaFields: [],
  sources: [],
  ...Object.values(MasterData).reduce((acc, key) => {
    acc[key] = [];
    return acc;
  }, {} as IMasterDataInfo),
};

const slice = createSlice({
  name,
  initialState,
  reducers: {
    setMasterData: (state, action: PayloadAction<MasterPayload>) => {
      if (!action.payload) return state;
      if (action.payload.data.length == 0) return state;
      return { ...state, [action.payload.category]: action.payload.data };
    },
    setSources: (state, action: PayloadAction<Array<DisplayEntry>>) => {
      if (!action.payload) return state;
      if (action.payload.length == 0) return state;
      return { ...state, sources: action.payload };
    },
    setMetaFields: (state, action: PayloadAction<Array<MetaField>>) => {
      if (!action.payload) return state;
      if (action.payload.length == 0) return state;
      return { ...state, metaFields: action.payload };
    },
    clear: (state) => {
      return {
        ...state,
        metaFields: [],
        sources: [],
        ...Object.values(MasterData).reduce((acc, key) => {
          acc[key] = [];
          return acc;
        }, {} as IMasterDataInfo),
      };
    },
  },
});
export const dataReducer = slice.reducer;
export const dataActions = slice.actions;
