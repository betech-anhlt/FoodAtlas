# Hướng dẫn tích hợp FoodAtlas GraphQL API vào React Native

## 1. Cài đặt Dependencies
```bash
npm install @apollo/client graphql
# iOS: cd ios && pod install
```

## 2. Apollo Client Setup (apolloClient.js)
```javascript
import { ApolloClient, InMemoryCache, HttpLink, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: __DEV__ 
      ? 'http://127.0.0.1:8000/graphql' 
      : 'https://your-domain.com/graphql',
  }),
  cache: new InMemoryCache(),
});

export default client;
```

**App.tsx**:
```javascript
import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import MainScreen from './MainScreen';

export default function App() {
  return (
    <ApolloProvider client={client}>
      <MainScreen />
    </ApolloProvider>
  );
}
```

## 3. GraphQL Queries (hooks/graphqlQueries.js)
```javascript
import { gql } from '@apollo/client';

// Home screen - Countries + Featured Restaurants
export const HOME_QUERY = gql`
  query HomeQuery {
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

// Restaurant detail
export const RESTAURANT_QUERY = gql`
  query RestaurantQuery($id: ID!) {
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

// Dishes by category
export const CATEGORY_DISHES_QUERY = gql`
  query CategoryDishes($categoryId: ID!) {
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

// Search restaurants by city
export const CITY_RESTAURANTS_QUERY = gql`
  query CityRestaurants($cityId: ID!) {
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
```

## 4. React Native Components Examples

### HomeScreen.tsx
```javascript
import React from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useQuery } from '@apollo/client';
import { HOME_QUERY } from './hooks/graphqlQueries';

export default function HomeScreen() {
  const { loading, error, data } = useQuery(HOME_QUERY);

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View>
      <Text>Countries</Text>
      <FlatList
        data={data.countries}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Text>{item.name} ({item.code})</Text>
        )}
      />
      
      <Text>Restaurants</Text>
      <FlatList
        data={data.restaurants}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>{item.address}</Text>
          </View>
        )}
      />
    </View>
  );
}
```

### RestaurantDetail.tsx
```javascript
import React from 'react';
import { useQuery } from '@apollo/client';
import { RESTAURANT_QUERY } from './hooks/graphqlQueries';
import { View, Text, ScrollView } from 'react-native';

export default function RestaurantDetail({ route }) {
  const { id } = route.params;
  const { loading, data } = useQuery(RESTAURANT_QUERY, {
    variables: { id }
  });

  if (loading) return <ActivityIndicator />;

  const restaurant = data.restaurant;
  return (
    <ScrollView>
      <Text>{restaurant.name}</Text>
      <Text>{restaurant.address} - {restaurant.city.name}</Text>
      <Text>Menu:</Text>
      {restaurant.dishes.map(dish => (
        <View key={dish.id}>
          <Text>{dish.dish.name} - ${dish.price}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
```

## 5. Error Handling & Optimizations
```javascript
const { loading, error, data, refetch } = useQuery(MY_QUERY, {
  variables: { id },
  // Cache policy
  fetchPolicy: 'cache-and-network',
  // Retry on error
  errorPolicy: 'all',
});

// Refresh
const refreshData = () => refetch();

// Error boundary
if (error) {
  Alert.alert('Lỗi', error.message);
  return null;
}
```

## 6. Mutations (Future)
```
# Add to schema/queries/mutations/ (Citrine style)
extend type Mutation {
  toggleFavorite(restaurantId: ID!): Favorite @create
}
```

## 7. Production Checklist
- [ ] Replace localhost → production URL
- [ ] Add auth (Sanctum tokens like Citrine)
- [ ] Cache policies
- [ ] Offline support
- [ ] Error boundaries
- [ ] Loading states

**Backend:** `php artisan serve` → http://127.0.0.1:8000/graphql

Ready to build FoodAtlas app! 🍽️✨
