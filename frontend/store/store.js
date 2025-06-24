import {confifgureStore} from '@reduxjs/toolkit';
import authReducer from './authSlice';


export const store = confifgureStore({
    reducer: {
        auth: authReducer,
        // Add other reducers here if needed
    },
})