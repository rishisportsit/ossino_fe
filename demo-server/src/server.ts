/* eslint-disable no-console */
/* eslint-disable no-plusplus */
import http from 'http';
import cors from 'cors';
import type { Request, Response } from 'express';
import express from 'express';
import { WebSocket, WebSocketServer } from 'ws';

import { PORT } from './config';
import type { Message } from './types';
import { isMessage } from './utils';

// Express server, needed to serve messages to Redux
const app = express();

const server = http.createServer(app);
const webSocketServer = new WebSocketServer({ server });

const messages: Message[] = [
  {
    type: 'tip',
    sender: '5winner',
    amount: 0.00001,
    receiver: 'bro2024',
    avatarLink: '/icons/avatarChatBlue.png',
  },
];

let usersCount = 0; // can be changed in future - etc. for storing all UserData, it can be a User[]

// just for broadcasting number of current connected users
const broadcastUsersCount = () => {
  const message = JSON.stringify({ type: 'USERS_COUNT', count: usersCount });

  webSocketServer.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
};

app.use(cors());

app.get('/api/chatdata', (req: Request, res: Response) => {
  res.send({ messages, usersCount });
});

webSocketServer.on('connection', (ws) => {
  console.log('New client is here!');
  usersCount++;
  broadcastUsersCount();

  ws.on('message', async (message: string | Buffer) => {
    let parsedMessage = message;

    try {
      if (message instanceof Buffer) {
        const messageString = message.toString();
        parsedMessage = JSON.parse(messageString);
      } else {
        parsedMessage = JSON.parse(message as string);
      }

      if (isMessage(parsedMessage)) {
        messages.push(parsedMessage as Message);
      } else {
        throw new Error('Invalid message format!');
      }

      console.log(messages);

      webSocketServer.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    } catch (err) {
      console.error(`Error parsing message: ${err}`);
    }
  });

  ws.on('close', () => {
    console.log('disconnected!');
    usersCount--;
    broadcastUsersCount();
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
