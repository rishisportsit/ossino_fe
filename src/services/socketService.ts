import io from 'socket.io-client';
import { LocalStorageHelper } from '../helpers/storage';
import { STORAGE_KEYS } from '../constants/storage';

export type SocketBalanceUpdate = {
  lockedBonus: number;
  unLockedBonus: number;
  sportLockedBonus: number;
  sportUnLockedBonus: number;
  casinoLockedBonus: number;
  casinoUnLockedBonus: number;
  deposit: number;
  withdrawls: number;
  pendingWithdrawals: number;
  realBalance: number;
  bonusBalance: number;
  balance: number;
  schemaName: string;
  playerId: string;
  currencyCode: string;
};

class SocketService {
  private socket: SocketIOClient.Socket | null = null;
  private url: string;
  private isConnected = false;

  constructor(url: string) {
    this.url = url;
  }

  public connect(): void {
    if (this.socket && this.socket.connected) {
      return;
    }

    this.socket = io(this.url, {
      path: '/socket.io',
      transports: ['websocket'],
      reconnection: true,
    });

    this.socket.on('connect', () => {
      console.log('✅ Connected to Socket.IO server');
      this.isConnected = true;
      this.subscribeToUpdates();
    });

    this.socket.on('disconnect', () => {
      console.log('❌ Disconnected from Socket.IO server');
      this.isConnected = false;
    });

    this.socket.on('connect_error', (err: any) => {
      console.log('❌ Connection error:', err);
    });

    this.socket.on('reconnect', () => {
      console.log('Reconnected to Socket.IO server');
      this.subscribeToUpdates();
    });
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  public subscribeToUpdates(): void {
    if (!this.socket || !this.isConnected) return;

    const userToken = LocalStorageHelper.getItem(STORAGE_KEYS.accessToken);
    if (!userToken) {
      console.log('No access token found, skipping socket subscription');
      return;
    }

    // Existing balance update subscription
    this.socket.emit(
      'subscribe',
      JSON.stringify({ event: 'balanceupdate', data: { token: userToken } })
    );

    // Notification subscription
    this.socket.emit(
      'subscribe',
      JSON.stringify({ event: 'notification', data: { token: userToken } })
    );

    // Notification count subscription
    this.socket.emit(
      'subscribe',
      JSON.stringify({ event: 'notificationcount', data: { token: userToken } })
    );
  }

  public on(event: string, callback: (data: any) => void): void {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  public off(event: string, callback?: (data: any) => void): void {
    if (this.socket) {
      this.socket.off(event, callback);
    }
  }
}

// Instantiate with the URL provided in the example
// In a real app, this should probably be in config
const SOCKET_URL = 'wss://astra-ws-stg-crypto.negroup-tech.net';
export const socketService = new SocketService(SOCKET_URL);
export default socketService;
