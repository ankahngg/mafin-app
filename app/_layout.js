import { Stack, Tabs } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

export default function Layout() {
  return (
    <Provider store={store}>
      <Tabs>

        <Tabs.Screen
          // Name of the route to hide.
          name="index"
          options={{
            // This tab will no longer show up in the tab bar.
            href: null,

          }}
        />

        <Tabs.Screen
          // Name of the route to hide.
          name="HOME"
          options={{
            // This tab will no longer show up in the tab bar.
            headerShown:false,
          }}
        />

        <Tabs.Screen
          // Name of the route to hide.
          name="STATISTIC"
          options={{
            // This tab will no longer show up in the tab bar.
            headerShown:false,
          }}
        />

      </Tabs>
    </Provider>
  )
}
