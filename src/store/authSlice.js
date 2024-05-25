import {createSlice, nanoid} from '@reduxjs/toolkit';

const initialState ={
    status :false,
    userData:null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        login:(state, action)=>{
            state.status = true;
            //console.log('authslice-',action.payload.userData)
            state.userData = action.payload.userData
        },
        logout:(state)=>{
            state.status = false;
            state.userData = null
        }
    }
})


export const {login, logout } = authSlice.actions
/*export a;; the functions create here*/ 

export default authSlice.reducer
