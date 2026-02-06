import { createSlice } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from 'store/helpers/createAppAsyncThunk';
import { handleError } from 'store/helpers/handleError';
import { handleResponse } from 'store/helpers/handleResponse';
import { EmailConfirmationApi } from 'api/emailConfirmation/emailConfirmation.api';
import type { ConfirmEmailRequestData, EmailConfirmationState } from 'api/emailConfirmation/emailConfirmation.types';
import { ERROR_DISPLAY } from 'store/const/errors';
import { DIALOG_TYPE, openDialog } from 'store/dialog/slice';
import { refreshUserData } from 'store/user/slice';

const initialState: EmailConfirmationState = {
    loading: false,
    success: false,
    error: null,
};

export const confirmEmail = createAppAsyncThunk(
    'emailConfirmation/confirm',
    async (data: ConfirmEmailRequestData, { dispatch, rejectWithValue }) => {
        try {
            const response = await EmailConfirmationApi.confirmEmail(data);
            handleResponse(response);

            dispatch(refreshUserData({ emailVerified: true }));

            dispatch(
                openDialog({
                    id: DIALOG_TYPE.success,
                    data: {
                        message: 'Email Verified Successfully! 🎉',
                        details: 'Your email has been confirmed. You now have access to all features including two-factor authentication and enhanced security options.',
                        buttonText: 'Continue',
                    },
                }),
            );

            return response.data.result;
        } catch (error) {
            const errorState = handleError(error);
            return rejectWithValue({
                ...errorState,
                errorDisplay: ERROR_DISPLAY.DIALOG,
            });
        }
    },
);

const emailConfirmationSlice = createSlice({
    name: 'emailConfirmation',
    initialState,
    reducers: {
        resetEmailConfirmation: (state) => {
            state.loading = false;
            state.success = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(confirmEmail.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })
            .addCase(confirmEmail.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
                state.error = null;
            })
            .addCase(confirmEmail.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload?.message || 'Email confirmation failed';
            });
    },
});

export const { resetEmailConfirmation } = emailConfirmationSlice.actions;
export default emailConfirmationSlice.reducer;