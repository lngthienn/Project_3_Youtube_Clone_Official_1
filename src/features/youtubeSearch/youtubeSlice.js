import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

export const searchVideos = createAsyncThunk('youtube/searchVideos', async ({ keyword }) => {
    const allTokens = [''];
    const allItemsByPage = {};
    let pageToken = '';
    let count = 0;

    while (count < 4) {
        const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                part: 'snippet',
                q: keyword,
                maxResults: 25,
                type: 'video',
                key: API_KEY,
                pageToken,
            },
        });

        const data = response.data;
        allItemsByPage[count + 1] = data.items;

        pageToken = data.nextPageToken;
        if (!pageToken) break;

        allTokens.push(pageToken);
        count++;
    }

    return {
        keyword,
        pageTokens: allTokens,
        videoByPage: allItemsByPage,
    };
});

const youtubeSlice = createSlice({
    name: 'youtube',
    initialState: {
        videos: [],
        status: 'idle',
        error: null,
        nextPageToken: null,
        currentKeyword: '',
        pageTokens: [''],
        currentPage: 1,
        videoByPage: {},
    },

    extraReducers: (builder) => {
        builder.addCase(searchVideos.pending, (state) => {
            state.status = 'loading';
        });

        builder.addCase(searchVideos.fulfilled, (state, action) => {
            state.status = 'succeeded';

            const token = action.meta.arg.pageToken || '';
            const index = state.pageTokens.findIndex((t) => t === token);
            state.currentPage = index !== -1 ? index + 1 : 1;
            state.videos = action.payload.items;

            const nextToken = action.payload.nextPageToken;
            if (nextToken && !state.pageTokens.includes(nextToken)) {
                state.pageTokens.push(nextToken);
            }

            state.videoByPage[state.currentPage] = action.payload.items;
            state.nextPageToken = action.payload.nextPageToken;
            state.currentKeyword = action.payload.keyword;
            state.pageTokens = action.payload.pageTokens;
            state.videoByPage = action.payload.videoByPage;
            state.currentPage = 1;
            state.videos = state.videoByPage[1];
            state.currentKeyword = action.payload.keyword;
        });

        builder.addCase(searchVideos.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
    },

    reducers: {
        clearVideos: (state) => {
            state.videos = [];
            state.nextPageToken = null;
            state.currentKeyword = '';
            state.videoByPage = {};
            state.pageTokens = [''];
            state.currentPage = 1;
        },

        setPageFromCache: (state, action) => {
            state.videos = action.payload.videos;
            state.currentPage = action.payload.pageNumber;
        },

        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
    },
});

export const { clearVideos, setPageFromCache, setCurrentPage } = youtubeSlice.actions;
export default youtubeSlice.reducer;
