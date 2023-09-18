import { Stack } from 'expo-router/stack';

export default function Layout() {
  return <Stack>
    <Stack.Screen 
      name='HOME'
      options={{
        headerShown:false,
      }}
    />
    <Stack.Screen 
      name='HISTORY'
      options={{
        headerShown:false,
      }}
    />
  </Stack>;
}
