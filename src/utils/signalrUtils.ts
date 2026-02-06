import { sportsBookSignalR } from '../services/signalrService';
import { store } from '../store';
import { joinUserSignalRGroups } from '../store/user/slice';


export async function initializeSignalR(): Promise<void> {
  try {
    await sportsBookSignalR.connect();
    await store.dispatch(joinUserSignalRGroups());
  } catch (error) {
  }
}

export async function disconnectSignalR(): Promise<void> {
  try {
    await sportsBookSignalR.disconnect();
  } catch (error) {
  }
}

export function getSignalRStatus() {
  return {
    isConnected: sportsBookSignalR.isConnected,
    connectionState: sportsBookSignalR.connectionState,
  };
}


export function getSignalRService() {
  return sportsBookSignalR;
}
export async function handleSignalRReconnection(): Promise<void> {
  try {
    setTimeout(async () => {
      await store.dispatch(joinUserSignalRGroups());
    }, 1000);
  } catch (error) {
  }
}
export async function forceJoinUserGroups(): Promise<void> {
  try {
    await store.dispatch(joinUserSignalRGroups());
  } catch (error) {
  }
}