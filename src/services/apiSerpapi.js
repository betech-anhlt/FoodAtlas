import { SERPAPI_KEY } from './constants.js';
import type { SerpLocalResult, SerpApiResponse } from '../types/serpapi.js';

export const fetchSerpFoodPlaces = async (foodName, city = 'Hanoi', country = 'Vietnam') => {
  try {
    const query = `${foodName} ${city} ${country}`;
    const url = `https://serpapi.com/search?engine=google_maps&type=search&q=${encodeURIComponent(query)}&api_key=${SERPAPI_KEY}`;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
    
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (data.error) {
      throw new Error(`SerpAPI: ${data.error.message || data.error.reason || 'Unknown error'}`);
    }
    
    return data.local_results || [];
  } catch (error) {
    console.error('SerpAPI fetch error:', error);
    
    // Simple retry logic (max 1 retry)
    if (error && error.name !== 'AbortError') {
      try {
        console.log('Retrying SerpAPI request...');
        // Re-call with same params for retry
        return await fetchSerpFoodPlaces(foodName, city, country);
      } catch (retryError) {
        console.error('SerpAPI retry failed:', retryError);
      }
    }
    
    return [];
  }
};
