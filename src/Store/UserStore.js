import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "../Reducer/UserReducer";

const UserStore = configureStore({
    reducer: UserReducer,
    devTools: true
})

export default UserStore