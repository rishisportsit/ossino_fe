type TextMessage = {
  type: 'text';
  nickName: string;
  avatarLink?: string;
  text: string;
};

type TipMessage = {
  type: 'tip';
  sender: string;
  amount: number;
  avatarLink?: string;
  receiver: string;
};

export type Message = TextMessage | TipMessage;

export type User = {
  id: number;
  nickName: string;
};
