import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/index';
import { selectIsFromRegistration, clearRegistrationFlag } from 'store/user/slice';
import { handlePostRegistrationRedirect } from 'helpers/navigationHelpers';

export const usePostRegistrationRedirect = (defaultRoute: string = '/') => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isFromRegistration = useAppSelector(selectIsFromRegistration);

    useEffect(() => {
        if (isFromRegistration) {
            dispatch(clearRegistrationFlag());
            handlePostRegistrationRedirect(navigate, dispatch, defaultRoute);
        }
    }, [isFromRegistration, navigate, dispatch, defaultRoute]);

    return {
        isFromRegistration,
    };
};

export const useRegistrationStatus = () => {
    const isFromRegistration = useAppSelector(selectIsFromRegistration);

    return {
        isFromRegistration,
    };
};