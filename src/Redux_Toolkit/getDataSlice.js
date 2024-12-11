import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    localStorageData : [],
    databaseData : {},
    isLoading: false,
    comp : "all"
}
const dataSlice = createSlice({
    name: "Data Slice",
    initialState,
    reducers :  {
        setDataLocalStorage: (state, action) => {
            let existingData = JSON.parse(localStorage.getItem("localData"));
            // Check if existingData is not null and is an array
            if (existingData && Array.isArray(existingData)) {
                // Push new payload to existing array
                existingData.push(action.payload);
            } else {
                // Initialize as a new array with the new payload if localStorage is empty or not an array
                existingData = [action.payload];
            }
            // Save updated array back to localStorage
            localStorage.setItem("localData", JSON.stringify(existingData));
            // Update state with the new array
            state.localStorageData = existingData;
        },
        getDataLocalStorage: (state, action)=>{
            let existingData = JSON.parse(localStorage.getItem("localData"));
            state.localStorageData = existingData ? existingData : [];
        },
        setComp : (state,action)=>{
            state.comp = action.payload
        },
        todoDelete : (state, action)=>{
            let existingData = JSON.parse(localStorage.getItem("localData"));
            // console.log(action.payload, "delete payload")
            let  deleteTodo = existingData.filter((item)=> item.id !== action.payload)
            localStorage.setItem("localData", JSON.stringify(deleteTodo))
        }
    }
})

export const { setDataLocalStorage,getDataLocalStorage, setComp } = dataSlice.actions;
// Correct selector to match the state slice key


export default dataSlice.reducer;