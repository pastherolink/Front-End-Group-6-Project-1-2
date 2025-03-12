/**
 * Debug utility functions to help diagnose routing issues
 */

export const logRouteChange = (location) => {
  console.group('Route Change');
  console.log('New pathname:', location.pathname);
  console.log('Search params:', location.search);
  console.log('Hash:', location.hash);
  console.log('State:', location.state);
  console.groupEnd();
};

export const analyzeEditUrl = (url) => {
  console.group('Edit URL Analysis');
  console.log('URL:', url);
  
  // Check format
  const slugFormat = /\/recipe\/edit\/(\d+)-(.+)/;
  const simplePath = /\/recipe\/edit\/(\d+)/;
  
  if (slugFormat.test(url)) {
    console.log('URL Format: Slug format (/recipe/edit/ID-SLUG)');
    const [_, id, slug] = url.match(slugFormat);
    console.log('Extracted ID:', id);
    console.log('Extracted slug:', slug);
  } else if (simplePath.test(url)) {
    console.log('URL Format: Simple format (/recipe/edit/ID)');
    const [_, id] = url.match(simplePath);
    console.log('Extracted ID:', id);
  } else {
    console.warn('URL Format: Unknown - does not match expected patterns');
  }
  
  console.groupEnd();
  
  // Return true if the URL format looks valid
  return slugFormat.test(url) || simplePath.test(url);
};

export const logNavigationAction = (to, action = 'navigate') => {
  console.log(`Navigation ${action} to:`, to);
  
  // If it's an edit URL, analyze it
  if (typeof to === 'string' && to.includes('/recipe/edit/')) {
    analyzeEditUrl(to);
  }
};
