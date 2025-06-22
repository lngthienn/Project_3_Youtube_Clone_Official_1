import { configureStore } from '@reduxjs/toolkit';
import youtubeReducer from '../features/youtubeSearch/youtubeSlice';

export const store = configureStore({
    reducer: {
        youtube: youtubeReducer,
    },
});
