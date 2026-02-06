import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from 'store/index';
import type { ApiOtherLinkInfo, ApiFooterContent } from 'api/content/content.types';

// Footer Links Selectors
// Base selector
const selectFooterLinksState = (state: RootState) => state.footerLinks;

// Basic selectors
export const selectFooterLinksData = createSelector(
  [selectFooterLinksState],
  (footerLinks) => footerLinks.data
);

export const selectFooterLinksLoading = createSelector(
  [selectFooterLinksState],
  (footerLinks) => footerLinks.loading
);

export const selectFooterLinksError = createSelector(
  [selectFooterLinksState],
  (footerLinks) => footerLinks.error
);

// Group links by category
export const selectFooterLinksByCategory = createSelector(
  [selectFooterLinksData],
  (links) => {
    if (!links) return {};

    return links.reduce((acc, link) => {
      const category = link.categoryname || 'Uncategorized';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(link);
      return acc;
    }, {} as Record<string, ApiOtherLinkInfo[]>);
  }
);

// Get active links only
export const selectActiveFooterLinks = createSelector(
  [selectFooterLinksData],
  (links) => {
    if (!links) return [];
    return links.filter(link => link.is_active);
  }
);

// Get links for specific categories (you can customize these based on your needs)
export const selectSecurityPrivacyLinks = (state: RootState) => state.footerLinks.securityLinks || [];

export const selectQuickLinks = (state: RootState) => state.footerLinks.quickLinks || [];

// Footer Content Selectors
// Base selector for footer content
const selectFooterContentState = (state: RootState) => state.footerContent;

// Basic selectors for footer content
export const selectFooterContentData = createSelector(
  [selectFooterContentState],
  (footerContent) => footerContent.data
);

export const selectFooterContentLoading = createSelector(
  [selectFooterContentState],
  (footerContent) => footerContent.loading
);

export const selectFooterContentError = createSelector(
  [selectFooterContentState],
  (footerContent) => footerContent.error
);

// Get active footer content only
export const selectActiveFooterContent = createSelector(
  [selectFooterContentData],
  (content) => {
    if (!content) return [];
    return content.filter(item => item.is_active);
  }
);

// Get footer description content by keyname
export const selectFooterDescription = createSelector(
  [selectActiveFooterContent],
  (content) => {
    const footerItem = content.find(item =>
      item.keyname?.toLowerCase() === 'footer' &&
      item.is_content
    );
    return footerItem?.is_content || null;
  }
);

// Get social images content
export const selectSocialImagesContent = createSelector(
  [selectActiveFooterContent],
  (content) => {
    const socialItem = content.find(item =>
      item.keyname?.toLowerCase().includes('social')
    );
    return socialItem?.is_content || null;
  }
);

// Get content by keyname (generic selector)
export const selectFooterContentByKey = (keyname: string) => createSelector(
  [selectActiveFooterContent],
  (content) => {
    const item = content.find(item =>
      item.keyname?.toLowerCase() === keyname.toLowerCase()
    );
    return item?.is_content || null;
  }
);