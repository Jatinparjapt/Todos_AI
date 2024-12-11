import { combineReducers } from "@reduxjs/toolkit";
import getDataSlice from "./getDataSlice";
import databaseActionsSlice from "./todoDatabaseSlice"
import todoDataUpdateSlice  from "./mainpulateTodoData"
import loginSlice from "./loginSlice";
const rootReducer = combineReducers({
    setDataLocal : getDataSlice,
    mplData : todoDataUpdateSlice,
    database: databaseActionsSlice,
    login : loginSlice
})
export default rootReducer