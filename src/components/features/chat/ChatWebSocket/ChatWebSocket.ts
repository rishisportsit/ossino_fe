/* eslint-disable @typescript-eslint/no-explicit-any */
export class ChatWebSocket {
  ws: WebSocket | null = null;

  constructor(
    private url: string,
    private onMessage: (message: any) => void,
    private onUsersCountUpdate: (count: number) => void,
  ) {}

  connect() {
    this.ws = new WebSocket(this.url);

    this.ws.onmessage = async (event) => {
      try {
        let message: any;

        if (event.data instanceof Blob) {
          const content = await event.data.text();
          message = JSON.parse(content);
        } else {
          message = JSON.parse(event.data);
        }

        if (message.type === 'USERS_COUNT') {
          this.onUsersCountUpdate(message.count);
        } else {
          this.onMessage(message);
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
    }
  }

  sendMessage(data: any) {
    if (this.ws) {
      this.ws.send(JSON.stringify(data));
    }
  }
}
