import { configureStore, createSlice } from "@reduxjs/toolkit";

const friendsListSlice = createSlice({
  name: "friendsList",
  initialState: {
    value: { user1: "", user2: "", room: "", user2Username: "Select a User" },
  },
  reducers: {
    friendsListPopulate: (state, action) => {
      state.value = action.payload;
    },
    clearFriendsList: (state) => {
      state.value = { user1: "", user2: "", room: "", user2Username: "Select a User" };
    },
  },
});

const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    value: [
      {
        email: "",
        message: "",
        timestamp: "",
        clientEmail: "",
      },
    ],
  },
  reducers: {
    messagesPopulate: (state, action) => {
      state.value = action.payload;
    },
    clearMessages: (state) => {
      state.value = [
        {
          email: "",
          message: "",
          timestamp: "",
          clientEmail: "",
        },
      ];
    },
  },
});

export const { friendsListPopulate, clearFriendsList } =
  friendsListSlice.actions;
export const { messagesPopulate, clearMessages } = messagesSlice.actions;

export const store = configureStore({
  reducer: {
    friendsList: friendsListSlice.reducer,
    messages: messagesSlice.reducer,
  },
});
