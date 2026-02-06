import { useEffect, useRef, useCallback, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { sportsBookSignalR } from '../services/signalrService';

const PAGE_GROUP_MAPPING: Record<string, string[]> = {
  '/sports': ['topgames_1_EN', 'topgames_heartbeat_EN', 'bsf_topgames_1','matchoftheday_EN'],
  '/sports/event/:eventId': ['fxt_:eventId_EN'],
  '/sports/league/:sportsId/:segmentId/:leagueIds': ['lg_:leagueIds_EN'],
};

export const useSignalRGroups = (additionalGroups: string[] = []) => {
  const location = useLocation();
  const [dynamicGroups, setDynamicGroups] = useState<string[]>([]);
  const currentGroupsRef = useRef<string[]>([]);

  const joinGroups = useCallback(async (groups: string[]) => {
    try {
      const groupsToJoin = groups.filter(group => !currentGroupsRef.current.includes(group));
      if (groupsToJoin.length > 0) {
        await sportsBookSignalR.joinGroups(groupsToJoin);
        currentGroupsRef.current = [...currentGroupsRef.current, ...groupsToJoin];
      }
    } catch (error) {
      console.error('❌ Error joining SignalR groups:', error);
    }
  }, []);

  const leaveGroups = useCallback(async (groups: string[]) => {
    try {
      const groupsToLeave = groups.filter(group => currentGroupsRef.current.includes(group));
      if (groupsToLeave.length > 0) {
        await sportsBookSignalR.leaveGroups(groupsToLeave);
        currentGroupsRef.current = currentGroupsRef.current.filter(group => !groupsToLeave.includes(group));
      }
    } catch (error) {
      console.error('❌ Error leaving SignalR groups:', error);
    }
  }, []);
  useEffect(() => {
    if (additionalGroups.length > 0) {
      const connectToAdditionalGroups = async () => {
        try {
          await joinGroups(additionalGroups);
          setDynamicGroups(additionalGroups);
        } catch (error) {
        }
      };
      connectToAdditionalGroups();
      return () => {
        leaveGroups(additionalGroups).catch(console.error);
        setDynamicGroups([]);
      };
    }
  }, [JSON.stringify(additionalGroups), joinGroups, leaveGroups]);

  const getGroupsForPath = useCallback((pathname: string): string[] => {
    if (PAGE_GROUP_MAPPING[pathname]) {
      return PAGE_GROUP_MAPPING[pathname];
    }

    for (const [pattern, groups] of Object.entries(PAGE_GROUP_MAPPING)) {
      if (pattern.includes(':')) {
        const regexPattern = pattern.replace(/:[^/]+/g, '([^/]+)');
        const regex = new RegExp(`^${regexPattern}$`);
        const match = pathname.match(regex);
        if (match) {
          const paramMatches = pattern.match(/:[^/]+/g) || [];
          const paramNames = paramMatches.map(param => param.slice(1)); // Remove ':' prefix
          const substitutions: Record<string, string> = {};
          paramNames.forEach((paramName, index) => {
            substitutions[`:${paramName}`] = match[index + 1];
          });
          return groups.map(group => {
            let processedGroup = group;
            Object.entries(substitutions).forEach(([placeholder, value]) => {
              processedGroup = processedGroup.replace(placeholder, value);
            });
            return processedGroup;
          });
        }
      }
    }

    if (pathname.startsWith('/sports')) {
      return PAGE_GROUP_MAPPING['/sports'] || [];
    }
    return PAGE_GROUP_MAPPING['*'] || [];
  }, []);

  useEffect(() => {
    const newGroups = getGroupsForPath(location.pathname);
    const currentGroups = currentGroupsRef.current;
    const groupsToLeave = currentGroups.filter(group => !newGroups.includes(group));
    const groupsToJoin = newGroups.filter(group => !currentGroups.includes(group));
    const updateGroups = async () => {
      try {
        if (!sportsBookSignalR.isConnected) {
          let attempts = 0;
          const maxAttempts = 10;
          while (!sportsBookSignalR.isConnected && attempts < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, 500));
            attempts++;
          }
          if (!sportsBookSignalR.isConnected) {
            return;
          }
        }

        if (groupsToLeave.length > 0) {
          await leaveGroups(groupsToLeave);
        }
        if (groupsToJoin.length > 0) {
          await joinGroups(groupsToJoin);
        }
      } catch (error) {
        console.error('❌ Error updating SignalR groups:', error);
      }
    };

    if (groupsToLeave.length > 0 || groupsToJoin.length > 0) {
      updateGroups();
    }

  }, [location.pathname, getGroupsForPath, joinGroups, leaveGroups]);

  return {
    joinGroups,
    leaveGroups,
    currentPath: location.pathname
  };
};

export const useSignalRGroupsForPage = (pageType: string) => {
  const groups = PAGE_GROUP_MAPPING[pageType] || [];
  useEffect(() => {
    const joinGroups = async () => {
      try {
        await sportsBookSignalR.joinGroups(groups);
      } catch (error) {
        console.error(`Error joining groups for ${pageType}:`, error);
      }
    };

    joinGroups();

    return () => {
      sportsBookSignalR.leaveGroups(groups);
    };
  }, [pageType, groups]);

  return groups;
};
export const useFixtureSignalRGroups = (fixtureIds?: (string | number)[] | string | number) => {
  const dynamicGroups = useMemo(() => {
    const groups: string[] = [];
    
    if (fixtureIds) {
      const idArray = Array.isArray(fixtureIds) ? fixtureIds : [fixtureIds];
      idArray.forEach(id => {
        if (id) {
          console
          groups.push(`fxt_${id}_EN`);
        }
      });
    }
    return groups;
  }, [fixtureIds]);

  return useSignalRGroups(dynamicGroups);
};

export const useMultipleFixturesGroups = (fixtureIds: (string | number)[]) => {
  return useFixtureSignalRGroups(fixtureIds);
};

export const useSportSignalRGroups = (sportId?: string | number, tabType?: 'live' | 'upcoming') => {
  const dynamicGroups = useMemo(() => {
    const groups: string[] = [];
    
    if (sportId && tabType === 'live') {
      groups.push(`lsp_${sportId}_EN`);
      groups.push(`lsp_heartbeat_EN`);
      groups.push(`bsf_lsp_${sportId}`);
    }
    if (sportId && tabType === 'upcoming') {
      groups.push(`mnthdly_${sportId}_EN`);
      groups.push(`mnthdly_heartbeat_EN`);
      groups.push(`bsf_mnthdly_${sportId}`);
    }
    return groups;
  }, [sportId, tabType]);

  return useSignalRGroups(dynamicGroups);
};
export const useLeagueSignalRGroups = (leagueIds?: (string | number)[] | string | number) => {
  const dynamicGroups = useMemo(() => {
    const groups: string[] = [];
    if (leagueIds) {
      const idArray = Array.isArray(leagueIds) ? leagueIds : [leagueIds];
      idArray.forEach(id => {
        if (id) {
          groups.push(`lg_${id}_EN`);
        }
      });
    }
    return groups;
  }, [leagueIds]);
  return useSignalRGroups(dynamicGroups);
};
export const useSoccerPageSignalR = (sportId?: string | number, activeTab?: 'popular' | 'live' | 'upcoming') => {
  const dynamicGroups = useMemo(() => {
    const groups: string[] = [];
    if (sportId && activeTab) {
      switch (activeTab) {
        case 'popular':
          groups.push(`tplg_${sportId}_EN`);
          groups.push(`tplg_heartbeat_EN`);
          groups.push(`bsf_tplg_${sportId}`);
          break;
        case 'live':
          groups.push(`lsp_${sportId}_EN`);
          groups.push(`lsp_heartbeat_EN`);
          groups.push(`bsf_lsp_${sportId}`);
          break;
        case 'upcoming':
          groups.push(`mnthdly_${sportId}_EN`);
          groups.push(`mnthdly_heartbeat_EN`);
          groups.push(`bsf_mnthdly_${sportId}`);
          break;
      }
    }
    return groups;
  }, [sportId, activeTab]);
  return useSignalRGroups(dynamicGroups);
};