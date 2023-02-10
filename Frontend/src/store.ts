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
      state.value = {
        user1: "",
        user2: "",
        room: "",
        user2Username: "Select a User",
      };
    },
  },
});

const groupSlice = createSlice({
  name: "group",
  initialState: {
    value: {
      groupname: "",
      room: "",
    },
  },
  reducers: {
    groupPopulate: (state, action) => {
      state.value = action.payload;
    },
    clearGroup: (state) => {
      state.value = { groupname: "", room: "" };
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

const groupMessageSlice = createSlice({
  name: "groupMessages",
  initialState: {
    value: {
      groupname: "",
      sentBy: "",
      message: "",
      timestamp: "",
    },
  },
  reducers: {
    groupMessagePopulate: (state, action) => {
      state.value = action.payload;
    },
    clearGroupMessages: (state) => {
      state.value = {
        groupname: "",
        sentBy: "",
        message: "",
        timestamp: "",
      };
    },
  },
});

const groupChatSlice = createSlice({
  name: "groupChatMode",
  initialState: {
    value: false,
  },
  reducers: {
    activateGroupChatMode: (state, action) => {
      state.value = action.payload;
    },
    deactivateGroupChatMode: (state) => {
      state.value = false;
    },
  },
});

const groupChatDetailsSlice = createSlice({
  name: "groupChatDetails",
  initialState: {
    value: {
      room: "",
      groupname: "",
    },
  },
  reducers: {
    setGroupChatDetails: (state, action) => {
      state.value = action.payload;
    },
    clearGroupChatDetails: (state) => {
      state.value = {
        room: "",
        groupname: "",
      };
    },
  },
});

export const { friendsListPopulate, clearFriendsList } =
  friendsListSlice.actions;
export const { messagesPopulate, clearMessages } = messagesSlice.actions;
export const { groupPopulate, clearGroup } = groupSlice.actions;
export const { groupMessagePopulate, clearGroupMessages } =
  groupMessageSlice.actions;
export const { activateGroupChatMode, deactivateGroupChatMode } =
  groupChatSlice.actions;
export const { setGroupChatDetails, clearGroupChatDetails } =
  groupChatDetailsSlice.actions;

  
export const store = configureStore({
  reducer: {
    friendsList: friendsListSlice.reducer,
    messages: messagesSlice.reducer,
    group: groupSlice.reducer,
    groupMessages: groupMessageSlice.reducer,
    groupChatMode: groupChatSlice.reducer,
    groupChatDetails: groupChatDetailsSlice.reducer,
  },
});
