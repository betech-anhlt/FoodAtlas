import apiClient from './api';
import { getDeviceInfo } from './deviceInfo';

const CITY_RESTAURANTS_QUERY = `
  query CityRestaurants($cityId: ID!, $version: String!, $platform: String!) {
    city(id: $cityId) {
      name
      restaurants {
        id
        name
        latitude
        longitude
        dishes {
          dish {
            name
          }
          price
        }
      }
    }
  }
`;

/**
 * Fetch restaurants by city ID
 * @param {string} cityId - City ID
 * @returns {Promise<Object>} - city with restaurants
 */
export async function fetchCityRestaurants(cityId) {
  try {
    const { version, platform } = await getDeviceInfo();
    const variables = { cityId, version, platform };

    const data = await apiClient(CITY_RESTAURANTS_QUERY, variables);

    if (data.errors) {
      throw new Error(data.errors.map(error => error.message).join('\\n'));
    }

    const city = data.data.city;
    console.log('City restaurants fetched:', city?.name);

    return city;
  } catch (error) {
    console.error('fetchCityRestaurants error:', error.message);
    throw error;
  }
}
