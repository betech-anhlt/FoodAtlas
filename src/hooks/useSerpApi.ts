import { useSettings } from '../contexts/SettingsContext';
import { SERPAPI_KEY } from '../services/constants';
import type { SerpLocalResult } from '../types/serpapi';

export const useSerpApi = () => {
  const { settings } = useSettings();

  const fetchSerpFoodPlaces = async (foodName: string): Promise<SerpLocalResult[]> => {
    try {
      const query = `${foodName} ${settings.city} ${settings.country}`;
      const params = new URLSearchParams({
        engine: 'google_maps',
        type: 'search',
        q: query,
        api_key: SERPAPI_KEY,
        gl: settings.country.toLowerCase(), // Country code for localization
        lr: settings.language, // Language
        hl: settings.language, // Host language
      });

      const url = `https://serpapi.com/search?${params.toString()}`;
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(`SerpAPI: ${data.error}`);
      }

      return data.local_results || [];
    } catch (error) {
      console.error('SerpAPI error:', error);
      // Retry logic
      if ((error as Error).name !== 'AbortError') {
        try {
          return await fetchSerpFoodPlaces(foodName);
        } catch {
          // silent fail
        }
      }
      return [];
    }
  };

  return { fetchSerpFoodPlaces };
};

