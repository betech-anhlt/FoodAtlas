import DeviceInfo from 'react-native-device-info';

export async function getDeviceInfo() {
  const version = DeviceInfo.getVersion();
  const platform = DeviceInfo.getPlatform() === 'ios' ? 2 : 1; // 1: Android, 2: iOS like Citrine
  return { version: await version, platform };
}
