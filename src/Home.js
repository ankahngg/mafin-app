import {View,ScrollView} from 'react-native';
import MonthTable from './components/Home/MonthTable';
import YearTable from './components/Home/YearTable';
import Header from './components/Home/Header';
import TransButton from './components/Home/TransButton';
import { useSelector } from 'react-redux';

function Home() {
    const state = useSelector((state) => state.state);
    return (
        <View>
            <Header />
            <TransButton />
            <View>
                {
                    (state.CrPage == 'Month' ?
                        <ScrollView>
                            <MonthTable />
                        </ScrollView>
                        :
                        <ScrollView>
                            <YearTable />
                        </ScrollView>
                    )
                }
            </View>
        </View>

    )
}


export default Home;