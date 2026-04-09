export interface LocationType {
  id: string;
  foodId: string;
  latitude: number;
  longitude: number;
  title: string;
  address: string;
}

export const mockLocations: LocationType[] = [
  // Biryani (p1)
  { id: 'l1', foodId: 'p1', latitude: 21.0285, longitude: 105.8542, title: 'Biryani Palace 1', address: '123 Nguyễn Huệ, Q1' },
  { id: 'l2', foodId: 'p1', latitude: 21.0300, longitude: 105.8500, title: 'Biryani Palace 2', address: '456 Lê Lợi, Q3' },
  
  // Bánh Mì (p2)
  { id: 'l3', foodId: 'p2', latitude: 21.0250, longitude: 105.8600, title: 'Bánh Mì ngon 1', address: '789 Bùi Thị Xuân, Q1' },
  { id: 'l4', foodId: 'p2', latitude: 21.0320, longitude: 105.8550, title: 'Bánh Mì ngon 2', address: '101 Đồng Khởi, Q1' },
  
  // Phở Bò (p5)
  { id: 'l5', foodId: 'p5', latitude: 21.0290, longitude: 105.8520, title: 'Phở 24 1', address: '202 Pasteur, Q3' },
  { id: 'l6', foodId: 'p5', latitude: 21.0270, longitude: 105.8580, title: 'Phở 24 2', address: '303 Võ Văn Tần, Q3' },
  
  // Burger (r1)
  { id: 'l7', foodId: 'r1', latitude: 21.0310, longitude: 105.8530, title: 'Burger King', address: '606 Phạm Ngũ Lão, Q1' },
  
  // Others with at least 1-2 locations...
  { id: 'l8', foodId: 'p3', latitude: 21.0260, longitude: 105.8560, title: 'Christmas Dinner Spot', address: 'Sample Addr' },
  { id: 'l9', foodId: 'r3', latitude: 21.0330, longitude: 105.8510, title: 'Phở Gà', address: '808 Lý Tự Trọng' },
];

export const hanoiRegion = {
  latitude: 21.0285,
  longitude: 105.8542,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

