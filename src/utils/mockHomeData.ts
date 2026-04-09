// Mock data for HomeScreen FoodCards - local require() images
// require() returns number, handled in FoodCard

// No import needed for require() in React Native utils

export interface FoodCardPropsType {
  id: string;
  image: number; // require() returns number
  name: string;
  address: string;
}

export interface CategoryType {
  id: string;
  title: string;
  image: number;
}

export const mockCategories: CategoryType[] = [
  { id: '1', title: 'Burger', image: require('../assets/images/food/burger.png') },
  { id: '2', title: 'Pho', image: require('../assets/images/food/pho.png') },
  { id: '3', title: 'Hot Pot', image: require('../assets/images/food/hot-pot.png') },
  { id: '4', title: 'Christmas Dinner', image: require('../assets/images/food/christmas-dinner.png') },
  { id: '5', title: 'Food Safety', image: require('../assets/images/food/food-safety.png') },
  { id: '6', title: 'Biryani', image: require('../assets/images/food_popular/biryani.png') },
  { id: '7', title: 'Thai Food', image: require('../assets/images/food_popular/thai-food.png') },
  { id: '8', title: 'Bread', image: require('../assets/images/food_popular/bread.png') },
];

export const mockFeaturedFoods: FoodCardPropsType[] = [
  // Popular 8
  { id: 'p1', image: require('../assets/images/food_popular/biryani.png'), name: 'Biryani', address: '123 Nguyễn Huệ' },
  { id: 'p2', image: require('../assets/images/food_popular/bread.png'), name: 'Bánh Mì', address: '456 Lê Lợi' },
  { id: 'p3', image: require('../assets/images/food_popular/christmas-dinner.png'), name: 'Christmas Dinner', address: '789 Bùi Thị Xuân' },
  { id: 'p4', image: require('../assets/images/food_popular/food-safety.png'), name: 'Healthy Food', address: '101 Đồng Khởi' },
  { id: 'p5', image: require('../assets/images/food_popular/pho.png'), name: 'Phở Bò', address: '202 Pasteur' },
  { id: 'p6', image: require('../assets/images/food_popular/thai-food.png'), name: 'Thai Curry', address: '303 Võ Văn Tần' },
  { id: 'p7', image: require('../assets/images/food_popular/biryani.png'), name: 'Chicken Biryani', address: '404 Hai Bà Trưng' },
  { id: 'p8', image: require('../assets/images/food_popular/bread.png'), name: 'Baguette', address: '505 Nguyễn Đình Chiểu' },
  
  // Recommended 12
  { id: 'r1', image: require('../assets/images/food/burger.png'), name: 'Burger', address: '606 Phạm Ngũ Lão' },
  { id: 'r2', image: require('../assets/images/food_recommend/biryani.png'), name: 'Veg Biryani', address: '707 Bến Vân Đồn' },
  { id: 'r3', image: require('../assets/images/food/pho.png'), name: 'Phở Gà', address: '808 Lý Tự Trọng' },
  { id: 'r4', image: require('../assets/images/food_recommend/bread.png'), name: 'Croissant', address: '909 Nguyễn Thái Học' },
  { id: 'r5', image: require('../assets/images/food/hot-pot.png'), name: 'Lẩu', address: '1010 CM T8' },
  { id: 'r6', image: require('../assets/images/food_recommend/christmas-dinner.png'), name: 'Roast', address: '1111 Lê Thánh Tôn' },
  { id: 'r7', image: require('../assets/images/food/dish.png'), name: 'Cơm Tấm', address: '1212 Trần Hưng Đạo' },
  { id: 'r8', image: require('../assets/images/food_recommend/food-safety.png'), name: 'Salad', address: '1313 NV Cừ' },
  { id: 'r9', image: require('../assets/images/food/christmas-dinner.png'), name: 'Salmon', address: '1414 HT Phát' },
  { id: 'r10', image: require('../assets/images/food_recommend/pho.png'), name: 'Phở Hải Sản', address: '1515 VTS Sáu' },
  { id: 'r11', image: require('../assets/images/food/food-safety.png'), name: 'Smoothie', address: '1616 ĐBP' },
  { id: 'r12', image: require('../assets/images/food_recommend/thai-food.png'), name: 'Tom Yum', address: '1717 PVD' },
];

export const mockPopular = mockFeaturedFoods.slice(0, 8);
export const mockRecommended = mockFeaturedFoods.slice(8);
