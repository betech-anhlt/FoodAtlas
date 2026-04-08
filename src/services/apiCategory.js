import apiClient from './api';
import { getDeviceInfo } from './deviceInfo';

const CATEGORY_DISHES_QUERY = `
  query CategoryDishes($categoryId: ID!, $version: String!, $platform: String!) {
    category(id: $categoryId) {
      name
      dishes {
        id
        name
        imageUrl
        country {
          name
        }
        restaurants {
          id
          name
        }
      }
    }
  }
`;

/**
 * Fetch dishes by category ID
 * @param {string} categoryId - Category ID
 * @returns {Promise<Object>} - category with dishes
 */
export async function fetchCategoryDishes(categoryId) {
  try {
    const { version, platform } = await getDeviceInfo();
    const variables = { categoryId, version, platform };

    const data = await apiClient(CATEGORY_DISHES_QUERY, variables);

    if (data.errors) {
      throw new Error(data.errors.map(error => error.message).join('\\n'));
    }

    const category = data.data.category;
    console.log('Category dishes fetched:', category?.name);

    return category;
  } catch (error) {
    console.error('fetchCategoryDishes error:', error.message);
    throw error;
  }
}
