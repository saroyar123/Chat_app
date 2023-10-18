import { createReducer } from "@reduxjs/toolkit";

export const userInfo = createReducer(
  {
    client: false,
    domain: null,
  },
  {
    isClient: (state, action) => {
      state.client = action.payload;
    },

    setDomain: (state, action) => {
      state.domain = action.payload;
    },
  }
);


