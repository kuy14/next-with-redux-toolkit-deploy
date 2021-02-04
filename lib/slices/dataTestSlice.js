import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import cookie from "js-cookie";
const endpoint = "https://jsonplaceholder.typicode.com";

let getAuthUser = cookie.get("authKey");
const initialState = cookie.get("authKey")
  ? {
      users: [],
      user: JSON.parse(getAuthUser),
      photos: [],
      albums: [],
      loading: "idle",
    }
  : {
      users: [],
      user: [],
      photos: [],
      albums: [],
      loading: "idle",
    };
export const getDataTest = createAsyncThunk(
  "dataTest/getDataTest",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(endpoint + "/users");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const addData = createAsyncThunk(
  "photos/addPhotos",
  async (newData, thunkAPI) => {
    try {
      const response = await axios.post(endpoint + "/photos", newData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const getPhotos = createAsyncThunk(
  "photos/getPhotos",
  async (albumId, thunkAPI) => {
    try {
      const response = await axios.get(endpoint + "/photos?albumId=" + albumId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const getUser = createAsyncThunk(
  "user/getUser",
  async (loginData, thunkAPI) => {
    try {
      let accountType = "";
      if (loginData.username.includes("@" && ".")) {
        accountType = "/users?email=" + loginData.username;
      } else {
        accountType = "/users?username=" + loginData.username;
      }
      const response = await axios.get(endpoint + accountType);
      console.log(response.data);
      if (response.data.length !== 0) {
        localStorage.setItem("userAuth", JSON.stringify(response.data));
        cookie.set("authKey", JSON.stringify(response.data), {
          expires: 1,
          path: "/",
        });
      }
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const getAlbums = createAsyncThunk(
  "albums/getAlbums",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(endpoint + "/albums?userId=1");

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const dataTestSlice = createSlice({
  name: "dataTest",
  initialState: initialState,
  reducers: {
    doLogout: (state) => {
      state.user = [];
      cookie.remove("authKey");
    },
  },
  extraReducers: {
    [addData.pending]: (state) => {
      delete state.error;
    },
    [addData.fulfilled]: (state, action) => {
      state.photos.push(action.payload);
    },
    [addData.rejected]: (state, action) => {
      state.error = action.payload.error;
    },
    [getPhotos.pending]: (state) => {
      (state.photos = []), (state.loading = "loading");
    },
    [getPhotos.fulfilled]: (state, action) => {
      state.photos = action.payload;
      state.loading = "loaded";
    },
    [getPhotos.rejected]: (state, action) => {
      state.loading = "error";
      state.error = action.payload.error;
    },
    [getAlbums.pending]: (state) => {
      (state.albums = []), (state.loading = "loading");
    },
    [getAlbums.fulfilled]: (state, action) => {
      state.albums = action.payload;
      state.loading = "loaded";
    },
    [getAlbums.rejected]: (state, action) => {
      state.loading = "error";
      state.error = action.payload.error;
    },
    [getDataTest.pending]: (state) => {
      (state.users = []), (state.loading = "loading");
    },
    [getDataTest.fulfilled]: (state, action) => {
      state.users = action.payload;
      state.loading = "loaded";
    },
    [getDataTest.rejected]: (state, action) => {
      state.loading = "error";
      state.error = action.payload.error;
    },
    [getUser.pending]: (state) => {
      (state.user = []), (state.loading = "loading");
    },
    [getUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.loading = "loaded";
    },
    [getUser.rejected]: (state, action) => {
      state.loading = "error";
      state.error = action.payload.error;
    },
  },
});

export const selectPhotos = createSelector(
  (state) => ({
    photos: state.users.photos,
    error: state.users.error,
  }),
  (state) => state
);

export const selectAlbums = createSelector(
  (state) => ({
    albums: state.users.albums,
    error: state.users.error,
  }),
  (state) => state
);

export const { doLogout } = dataTestSlice.actions;

export default dataTestSlice.reducer;
