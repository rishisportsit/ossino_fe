import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { ServiceResponse } from '../types/ServiceResponse';

export type ConfirmEmailRequestData = {
    token: string;
    authorisation_token: string;
};

export type ConfirmEmailResponseData = {
    message: string;
    status: string;
};

const EMAIL_CONFIRMATION_BASE_URL = import.meta.env.VITE_JAVA_WRAPPER_SERVICE_URL;
class EmailConfirmationApi {
    private client = axios.create({
        baseURL: EMAIL_CONFIRMATION_BASE_URL,
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });

    async confirmEmail(
        data: ConfirmEmailRequestData
    ): Promise<AxiosResponse<ServiceResponse<ConfirmEmailResponseData>>> {
        const result = await this.client.post('/confirm/email', data);
        return result;
    }
}

const EmailConfirmationInstance = new EmailConfirmationApi();

export {
    EmailConfirmationInstance as EmailConfirmationApi
};