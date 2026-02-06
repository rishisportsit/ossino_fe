import axios from 'axios';
import { type ChatData } from './slice';
import { API_URL } from './mockedData';

export const fetchMessagesFromServer = async (): Promise<ChatData> => {
  const messagesURL = `${API_URL}/chatdata`;

  try {
    const response = await axios.get(messagesURL);
    return response.data;
  } catch (err) {
    console.error(`Error fetching messages: ${err}`);
    throw err;
  }
};
