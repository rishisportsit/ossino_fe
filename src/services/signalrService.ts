import { HubConnection, HubConnectionBuilder, LogLevel, HubConnectionState } from '@microsoft/signalr';
import { config } from '../config';

export interface SignalRConfig {
  url: string;
  automaticReconnect?: boolean;
  reconnectDelayInMilliseconds?: number[];
}

export class SignalRService {
  private connection: HubConnection | null = null;
  private readonly config: SignalRConfig;
  private listeners: Map<string, ((data: any) => void)[]> = new Map();
  private connectionStateListeners: ((isConnected: boolean) => void)[] = [];
  private reconnectAttempt = 0;
  private maxReconnectAttempts = 10;

  constructor(config: SignalRConfig) {
    this.config = {
      automaticReconnect: true,
      reconnectDelayInMilliseconds: [0, 2000, 10000, 30000],
      ...config,
    };
  }

  public async connect(): Promise<void> {
    if (this.connection?.state === HubConnectionState.Connected) {
      return;
    }

    try {
      this.connection = new HubConnectionBuilder()
        .withUrl(this.config.url)
        .withAutomaticReconnect(this.config.reconnectDelayInMilliseconds || [0, 2000, 10000, 30000])
        .configureLogging(LogLevel.Information)
        .build();

      this.setupConnectionEvents();
      
      await this.connection.start();
      this.notifyConnectionState(true);
      this.reconnectAttempt = 0;
    } catch (error) {
      this.notifyConnectionState(false);
      if (this.config.automaticReconnect && this.reconnectAttempt < this.maxReconnectAttempts) {
        this.reconnectAttempt++;
        const delay = this.config.reconnectDelayInMilliseconds?.[
          Math.min(this.reconnectAttempt - 1, this.config.reconnectDelayInMilliseconds.length - 1)
        ] || 5000;
        setTimeout(() => this.connect(), delay);
      }
    }
  }
  public async disconnect(): Promise<void> {
    if (this.connection) {
      try {
        await this.connection.stop();
      } catch (error) {
      } finally {
        this.connection = null;
        this.notifyConnectionState(false);
      }
    }
  }
  public on(methodName: string, callback: (data: any) => void): void {
    if (!this.listeners.has(methodName)) {
      this.listeners.set(methodName, []);
    }
    this.listeners.get(methodName)!.push(callback);
    if (this.connection) {
      this.connection.on(methodName, callback);
    }
  }
  public off(methodName: string, callback?: (data: any) => void): void {
    if (callback) {
      const listeners = this.listeners.get(methodName);
      if (listeners) {
        const index = listeners.indexOf(callback);
        if (index > -1) {
          listeners.splice(index, 1);
        }
      }
    } else {
      this.listeners.delete(methodName);
    }
    if (this.connection) {
      if (callback) {
        this.connection.off(methodName, callback);
      } else {
        this.connection.off(methodName);
      }
    }
  }
  public async invoke(methodName: string, ...args: any[]): Promise<any> {
    if (!this.connection || this.connection.state !== HubConnectionState.Connected) {
      throw new Error('SignalR connection is not active');
    }
    try {
      return await this.connection.invoke(methodName, ...args);
    } catch (error) {
      console.error(`Error invoking ${methodName}:`, error);
      throw error;
    }
  }
  
  public async send(methodName: string, ...args: any[]): Promise<void> {
    if (!this.connection || this.connection.state !== HubConnectionState.Connected) {
      return;
    }

    try {
      await this.connection.send(methodName, ...args);
    } catch (error) {
      console.error(`Error sending ${methodName}:`, error);
    }
  }

  public async joinGroups(groupNames: string[]): Promise<void> {
    if (!this.connection || this.connection.state !== HubConnectionState.Connected) {
      return;
    }

    try {
      await this.connection.invoke('JoinGroups', groupNames);

    } catch (error) {
      console.error('Error joining groups:', error);
      if (this.connection.state === HubConnectionState.Connected) {
        await this.connection.stop();
      }
    }
  }

  public async leaveGroups(groupNames: string[], shouldRemove: boolean = true): Promise<void> {
    if (!this.connection || this.connection.state !== HubConnectionState.Connected) {
      return;
    }
    if (!shouldRemove) {
      return;
    }
    try {
      await this.connection.invoke('RemoveFromGroups', groupNames);
    } catch (error) {
      console.error('Error leaving groups:', error);
      if (this.connection.state === HubConnectionState.Connected) {
        await this.connection.stop();
      }
    }
  }

  
  public async joinGroup(groupName: string): Promise<void> {
    return this.joinGroups([groupName]);
  }
  public async leaveGroup(groupName: string, shouldRemove: boolean = true): Promise<void> {
    return this.leaveGroups([groupName], shouldRemove);
  }
  public get isConnected(): boolean {
    return this.connection?.state === HubConnectionState.Connected;
  }

  
  public get connectionState(): string {
    return this.connection?.state || HubConnectionState.Disconnected;
  }

 
  public onConnectionStateChanged(callback: (isConnected: boolean) => void): void {
    this.connectionStateListeners.push(callback);
  }

 
  public offConnectionStateChanged(callback: (isConnected: boolean) => void): void {
    const index = this.connectionStateListeners.indexOf(callback);
    if (index > -1) {
      this.connectionStateListeners.splice(index, 1);
    }
  }

  private setupConnectionEvents(): void {
    if (!this.connection) return;

    this.connection.onreconnecting(() => {

      this.notifyConnectionState(false);
    });

    this.connection.onreconnected(() => {

      this.notifyConnectionState(true);
      this.reconnectAttempt = 0;
      
      // Re-register all listeners after reconnection
      this.reregisterListeners();
      setTimeout(() => {
        import('../utils/signalrUtils').then(({ handleSignalRReconnection }) => {
          handleSignalRReconnection();
        }).catch(console.error);
      }, 500);
    });

    this.connection.onclose((error) => {

      this.notifyConnectionState(false);
      
      if (this.config.automaticReconnect && this.reconnectAttempt < this.maxReconnectAttempts) {
        this.reconnectAttempt++;
        const delay = this.config.reconnectDelayInMilliseconds?.[
          Math.min(this.reconnectAttempt - 1, this.config.reconnectDelayInMilliseconds.length - 1)
        ] || 5000;
        

        setTimeout(() => this.connect(), delay);
      }
    });
  }

  private reregisterListeners(): void {
    if (!this.connection) return;

    this.listeners.forEach((callbacks, methodName) => {
      callbacks.forEach(callback => {
        this.connection!.on(methodName, callback);
      });
    });
  }

  
  private notifyConnectionState(isConnected: boolean): void {
    this.connectionStateListeners.forEach(callback => {
      try {
        callback(isConnected);
      } catch (error) {
        console.error('Error in connection state listener:', error);
      }
    });
  }
}

export const sportsBookSignalR = new SignalRService({
  url: config.signalrHubUrl,
  automaticReconnect: true,
  reconnectDelayInMilliseconds: [0, 2000, 5000, 10000, 30000],
});

export default SignalRService;