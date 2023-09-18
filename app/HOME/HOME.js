import { Text, View, Button } from 'react-native';
import Home from '../../src/Home';

import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

 
  

export default function Page() {
    return (
        <SafeAreaView>
            <Home />
        </SafeAreaView>
    )
}


