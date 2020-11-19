import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import resourcesAPI from '../../services/resourcesAPI';

export const createResource = createAsyncThunk(
  'resources/create',
  async ({ name }) => {
    const resource = await resourcesAPI.create({ name });
    return resource;
  }
);

export const fetchResourcesByTags = createAsyncThunk(
  'resources/fetchByTags',
  async (tags) => {
    const resources = await resourcesAPI.fetchByTags(...tags);
    return resources;
  }
);

export const pinResourceByID = createAsyncThunk(
  'resources/pinResourceByID',
  async (id) => {
    const resource = await resourcesAPI.pinByID(id);
    return resource;
  }
);

export const fetchPinnedResources = createAsyncThunk(
  '/resources/fetchPinned',
  async () => {
    const resources = await resourcesAPI.fetchPinned();
    return resources;
  }
);

const setLoading = (state) => {
  state.loading = true;
};

const resourceSlice = createSlice({
  name: 'resources',
  initialState: {
    loading: false,
    // will contain the resources from the last query by tags
    resources: [],
    // pinned resources
    pinned: [],
  },
  reducers: {},
  extraReducers: {
    [createResource.pending]: setLoading,
    [fetchResourcesByTags.pending]: setLoading,
    [pinResourceByID.pending]: setLoading,
    [fetchPinnedResources.pending]: setLoading,
    [createResource.fulfilled]: (state, action) => {
      state.loading = false;

      state.resources.push(action.payload);
    },
    [fetchResourcesByTags.fulfilled]: (state, action) => {
      state.loading = false;

      state.resources = action.payload;
    },
    [pinResourceByID.fulfilled]: (state, { payload }) => {
      state.loading = false;

      const { resource } = payload;
      const alreadyPinnedIndex = state.pinned.findIndex(
        ({ _id }) => _id === resource._id
      );

      if (alreadyPinnedIndex > -1) {
        // if the resource is already pinned, unpin it
        state.resources.splice(alreadyPinnedIndex, 1);
      } else {
        // if it's not pinned, pin it
        state.resources.push(resource);
      }
    },
    [fetchPinnedResources.fulfilled]: (state, { payload }) => {
      state.loading = false;

      state.resources = payload;
    },
  },
});

const { /* actions, */ reducer } = resourceSlice;

// export const {} = actions;

export default reducer;
