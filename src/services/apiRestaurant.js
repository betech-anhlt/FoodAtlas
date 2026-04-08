import apiClient from './api';
import { getDeviceInfo } from './deviceInfo';

const RESTAURANT_QUERY = `
  query RestaurantQuery($id: ID!, $version: String!, $platform: String!) {
    restaurant(id: $id) {
      id
      name
      address
      phone
      latitude
      longitude
      city {
        name
      }
      dishes {
        price
        imageUrl
        dish {
          name
          description
          category {
            name
          }
        }
      }
    }
  }
`;

/**
 * Fetch restaurant details by ID
 * @param {string} id - Restaurant ID
 * @returns {Promise<Object>} - restaurant data
 */
export async function fetchRestaurant(id) {
  try {
    const { version, platform } = await getDeviceInfo();
    const variables = { id, version, platform };

    const data = await apiClient(RESTAURANT_QUERY, variables);

    if (data.errors) {
      throw new Error(data.errors.map(error => error.message).join('\\n'));
    }

    const restaurant = data.data.restaurant;
    console.log('Restaurant fetched:', restaurant?.name);

    return restaurant;
  } catch (error) {
    console.error('fetchRestaurant error:', error.message);
    throw error;
  }
}
