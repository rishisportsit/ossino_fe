import type { Message as ChatMessage } from './slice';

export const API_URL = 'http://localhost:3001/api'; // URL of WS-server, which can serve data (etc. Express Server)

export const mockedMessages: ChatMessage[] = [
  {
    nickName: 'Alice',
    text: 'Hey, how are you doing today?',
    type: 'text',
  },
  {
    nickName: 'Bob',
    text: 'I’m good, thanks! Just working on some stuff.',
    type: 'text',
  },
  {
    nickName: 'Charlie',
    text: 'I saw the new movie last night. It was awesome!',
    type: 'text',
  },
  {
    nickName: 'Diana',
    text: 'That sounds fun! Which movie?',
    type: 'text',
  },
  {
    nickName: 'Eve',
    text: 'Anyone up for a game tonight?',
    type: 'text',
  },
  {
    nickName: 'Frank',
    text: 'Count me in! What game are we playing?',
    type: 'text',
  },
  {
    nickName: 'Grace',
    text: 'I just finished a big project. Time to relax!',
    type: 'text',
  },
  {
    nickName: 'Hank',
    text: 'Nice! I’ve got some free time too. Let’s catch up soon.',
    type: 'text',
  },
  {
    nickName: 'Ivy',
    text: 'I’m thinking about ordering pizza tonight. Any suggestions?',
    type: 'text',
  },
  {
    nickName: 'Jack',
    text: 'Pizza sounds great! How about pepperoni?',
    type: 'text',
  },
  {
    nickName: 'Alice',
    text: 'Hey, how are you doing today?',
    type: 'text',
  },
  {
    nickName: 'Bob',
    text: 'I’m good, thanks! Just working on some stuff.',
    type: 'text',
  },
  {
    nickName: 'Charlie',
    text: 'I saw the new movie last night. It was awesome!',
    type: 'text',
  },
  {
    nickName: 'Diana',
    text: 'That sounds fun! Which movie?',
    type: 'text',
  },
  {
    nickName: 'Eve',
    text: 'Anyone up for a game tonight?',
    type: 'text',
  },
  {
    nickName: 'Frank',
    text: 'Count me in! What game are we playing?',
    type: 'text',
  },
  {
    nickName: 'Grace',
    text: 'I just finished a big project. Time to relax!',
    type: 'text',
  },
  {
    nickName: 'Hank',
    text: 'Nice! I’ve got some free time too. Let’s catch up soon.',
    type: 'text',
  },
  {
    nickName: 'Ivy',
    text: 'I’m thinking about ordering pizza tonight. Any suggestions?',
    type: 'text',
  },
  {
    nickName: 'Jack',
    text: 'Pizza sounds great! How about pepperoni?',
    type: 'text',
  },
];
