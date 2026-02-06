export const findSelectionByHeader = (
  market: any, 
  header: string, 
  homeName: string, 
  awayName: string, 
  colIndex: number
) => {
  const headerLower = header.toLowerCase().trim();
  
  if (headerLower === 'home' || headerLower === '1') {
    const selection = market?.selections?.find((s: any) => {
      const selectionName = s.selectionName?.toLowerCase();
      return selectionName === homeName ||
             selectionName?.includes(homeName) ||
             homeName?.includes(selectionName);
    });
    return selection || market?.selections?.[0];
  } 
  
  if (headerLower === 'draw' || headerLower === 'tie' || headerLower === 'x') {
    const selection = market?.selections?.find((s: any) => {
      const selectionName = s.selectionName?.toLowerCase();
      return selectionName?.includes('draw') || 
             selectionName?.includes('tie') ||
             selectionName?.includes('x') ||
             selectionName === 'draw' ||
             selectionName === 'tie' ||
             selectionName === 'x';
    });
    return selection || (market?.selections?.length >= 3 ? market.selections[1] : null);
  }
  
  if (headerLower === 'away' || headerLower === '2') {
    const selection = market?.selections?.find((s: any) => {
      const selectionName = s.selectionName?.toLowerCase();
      return selectionName === awayName ||
             selectionName?.includes(awayName) ||
             awayName?.includes(selectionName);
    });
    return selection || (market?.selections?.length >= 2 ? market.selections[market.selections.length - 1] : null);
  }
  
  if (headerLower === '1x') {
    return market?.selections?.find((s: any) => {
      const selectionName = s.selectionName?.toLowerCase();
      return selectionName?.includes('1x') || 
             selectionName?.includes('home') && selectionName?.includes('draw') ||
             (selectionName?.includes(homeName) && selectionName?.includes('draw'));
    });
  }
  
  if (headerLower === '12') {
    return market?.selections?.find((s: any) => {
      const selectionName = s.selectionName?.toLowerCase();
      return selectionName?.includes('12') ||
             (selectionName?.includes(homeName) && selectionName?.includes(awayName)) ||
             selectionName?.includes('home') && selectionName?.includes('away');
    });
  }
  
  if (headerLower === 'x2') {
    return market?.selections?.find((s: any) => {
      const selectionName = s.selectionName?.toLowerCase();
      return selectionName?.includes('x2') ||
             selectionName?.includes('draw') && selectionName?.includes('away') ||
             (selectionName?.includes('draw') && selectionName?.includes(awayName));
    });
  }
  
  if (headerLower.includes('over')) {
    return market?.selections?.find((s: any) => s.selectionName?.toLowerCase().includes('over'));
  }
  
  if (headerLower.includes('under')) {
    return market?.selections?.find((s: any) => s.selectionName?.toLowerCase().includes('under'));
  }
  
  return market?.selections?.[colIndex];
};
