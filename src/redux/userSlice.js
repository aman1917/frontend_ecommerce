import { createSlice } from "@reduxjs/toolkit";

const initailState = {
  //   user: {},
  email: "",
  firstName: "",
  lastName: "",
  image: "",
  _id: "",
};

export const userSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    loginRedux: (state, action) => {
      console.log(action.payload.data);
      //   state.user = action.payload.data;
      state._id = action.payload.data._id;
      state.firstName = action.payload.data.firstName;
      state.lastName = action.payload.data.lastName;
      state.image = action.payload.data.image;
      state.email = action.payload.data.email;
    },
  },
});

export const { loginRedux } = userSlice.actions;

export default userSlice.reducer;
