import { Text, View, Pressable, StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { stateSlice } from '../../../redux/reducer/stateSlice';

function TransButton() {
    const state = useSelector((state) => state.state);
    const constant = useSelector((state) => state.constant);
    const dispatch = useDispatch();

    function handlePress(val) {
        dispatch(stateSlice.actions.setCrPage(val));
    }

    function handleBack() {
        dispatch(stateSlice.actions.setCrMonth(constant.Month));
        dispatch(stateSlice.actions.setCrYear(constant.Year));
        dispatch(stateSlice.actions.setCrPage('Month'));
        dispatch(stateSlice.actions.setCrFocus(constant.Week));
        dispatch(stateSlice.actions.setCrDay(constant.Day));
    }

    return (
        <View style={styles.container}>
            <View style={styles.transButton}>
                <View style={{ flexDirection: 'row', }}>
                    <Pressable onPress={() => handlePress('Year')}>
                        <Text style={(state.CrPage == 'Year' ? styles.grayHover : styles.text)}>NĂM</Text>
                    </Pressable>
                    <Pressable onPress={() => handlePress('Month')}>
                        <Text style={(state.CrPage == 'Month' ? styles.grayHover : styles.text)}>THÁNG</Text>
                    </Pressable>
                </View>
                {
                    (state.CrMonth != constant.Month || state.CrYear != constant.Year ?
                        <View style={{ marginLeft: 20 }}>
                            <Pressable onPress={() => handleBack()}>
                                <Text style={styles.backCurrentButton}>VỀ HIỆN TẠI</Text>
                            </Pressable>
                        </View> :
                        ''
                    )
                }
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    transButton: {
        padding: 10,
        paddingLeft: 5,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',

    },
    text: {
        backgroundColor: '#e6e6e6',
        borderRadius: 10,
        padding: 10,
        fontSize: 20,
    },
    grayHover: {
        borderRadius: 10,
        backgroundColor: '#B4B4B3',
        padding: 10,
        fontSize: 20,
    },

    backCurrentButton: {
        fontSize: 15,
        marginLeft: 10,
        backgroundColor: '#e6e6e6',
        padding: 5,
        borderWidth: 1,
        borderColor: '#999999',
        borderRadius: 10,
        overflow:'hidden'
    }

});

export default TransButton;