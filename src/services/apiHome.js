import apiClient from './api';
import { getDeviceInfo } from './deviceInfo';

const HOME_QUERY = `
  query HomeQuery($version: String!, $platform: String!) {
    countries {
      id
      name
      code
      cities {
        id
        name
      }
    }
    restaurants(limit: 10) {
      id
      name
      address
      latitude
      longitude
      dishes {
        price
        dish {
          name
          imageUrl
        }
      }
    }
  }
`;

/**
 * Fetch home data: countries and featured restaurants
 * @returns {Promise<Object>} - { countries, restaurants }
 */
export async function fetchHomeData() {
  try {
    const { version, platform } = await getDeviceInfo();
    const variables = { version, platform };

    const data = await apiClient(HOME_QUERY, variables);

    if (data.errors) {
      throw new Error(data.errors.map(error => error.message).join('\\n'));
    }

    const { countries, restaurants } = data.data;
    console.log('Home data fetched:', { countries: countries?.length, restaurants: restaurants?.length });

    return { countries, restaurants };
  } catch (error) {
    console.error('fetchHomeData error:', error.message);
    throw error;
  }
}
