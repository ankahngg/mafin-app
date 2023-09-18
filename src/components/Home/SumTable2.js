import {View, Text, StyleSheet, Image, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { stateSlice } from '../../../redux/reducer/stateSlice'
import { Link } from "expo-router";


function SumTable2() {
    const ListWeek = ['TUẦN 1', 'TUẦN 2', 'TUẦN 3', 'TUẦN 4', 'TUẦN 5'];
    const data = useSelector((state) => state.data.main[`year${state.state.CrYear}`][`month${state.state.CrMonth}`]);
    const state = useSelector((state) => state.state);
    const constant = useSelector((state) => state.constant);
    const dispatch = useDispatch();

    function daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }

    function handleFocus(x) {
        dispatch(stateSlice.actions.setCrFocus(x));
        dispatch(stateSlice.actions.setCrDay(x*7));
    }


    return (
        <View style={styles.container}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <View style={{ padding: 10,paddingLeft:5 }}>
                    <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{state.CrMonth}-{state.CrYear}</Text>
                </View>
                
                <Link href="/HOME/HISTORY" style={{fontSize:15,borderWidth:1,padding:5,borderRadius:10,fontStyle:'italic'}}>
                    Xem Chi Tiết
                </Link>
                
            </View>
            <View style={styles.row1}>
                <Pressable style={{ flex: 3 }}>
                    <View style={styles.col1}>
                        <View style={styles.col11}>
                            <Text style={styles.norWord}>CÒN</Text>
                            <Text style={styles.boldWord}>{(constant.Year == state.CrYear && constant.Month == state.CrMonth) ? constant.Leftth : 0}</Text>
                            <Text style={styles.norWord}>NGÀY</Text>
                        </View>
                        <View style={styles.col12}>
                            <View style={{ alignItems: 'center' }}>
                                <Image style={styles.img}
                                    source={(data.monthsum.IN - data.monthsum.OUT >= 0) ?
                                        require('../../file/green_arrow.png') :
                                        require('../../file/red_arrow.png')
                                    }></Image>
                            </View>
                            <Text style={styles.boldWord}>{Math.abs(data.monthsum.IN - data.monthsum.OUT)}k</Text>
                        </View>
                    </View>
                </Pressable>
                <Pressable style={{ flex: 2 }}>
                    <View style={styles.col2}>
                        <Text style={styles.norWord}>ĐÃ</Text>
                        <Text style={[styles.boldWord, { color: 'red' }]}>{data.monthsum.OUT}k</Text>
                        <Text style={styles.norWord}>TIÊU</Text>
                    </View>
                </Pressable>
                <Pressable style={{ flex: 2 }}>
                    <View style={styles.col3}>
                        <Text style={styles.norWord}>ĐÃ</Text>
                        <Text style={[styles.boldWord, { color: 'green' }]}>{data.monthsum.IN}k</Text>
                        <Text style={styles.norWord}>KIẾM</Text>
                    </View>
                </Pressable>
            </View>
            <View style={styles.row2}>
                {
                    ListWeek.map((val, index) => {
                        if ((constant.Month == state.CrMonth && constant.Year == state.CrYear && index + 1 > Math.ceil(constant.Day / 7))
                            || (index + 1 > Math.ceil(daysInMonth(state.CrMonth, state.CrYear) / 7)))
                            return (
                                <Pressable key={index} style={styles.weekButton}>
                                    <Text style={{ textAlign: 'center', fontSize: 15 }}>{val}</Text>
                                    <Text style={[{ textAlign: 'center', fontSize: 15, fontWeight: 'bold' }, (state.CrKind == 'Out' ? { color: 'red' } : { color: 'green' })]}>...</Text>
                                </Pressable>
                            )
                        else
                            return (
                                <Pressable key={index} style={[styles.weekButton, (state.CrFocus == index + 1) ? styles.grayHover : '']}
                                    onPress={() => handleFocus(index + 1)}>
                                    <Text style={{ textAlign: 'center', fontSize: 15 }}>{val}</Text>
                                    <Text style={[{ textAlign: 'center', fontSize: 15, fontWeight: 'bold' }, (state.CrKind == 'Out' ? { color: 'red' } : { color: 'green' })]}>
                                        {
                                            (state.CrKind == 'Out') ?
                                                data.weeksum[`week${index + 1}`].OUT :
                                                data.weeksum[`week${index + 1}`].IN
                                        }k
                                    </Text>
                                </Pressable>
                            )
                    })
                }
            </View>
        </View>
    );
}

export default SumTable2;

const styles = StyleSheet.create({
    container: {
        padding: 5
    },
    row1: {
        width: "100%",
        flexDirection: 'row',

    },
    norWord: {
        fontSize: 15,
        textAlign: 'center'
    },
    boldWord: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },

    col1: {
        borderWidth: 1,
        flexDirection: 'row',
        padding: 10,
    },
    col11: {
        flexDirection: 'col',
        flex: 1,
        justifyContent: 'center'
    },
    col12: {
        flex: 2,
        justifyContent: 'center',
        flexDirection: 'col',
    }
    ,
    row1: {
        flexDirection: 'row'
    },
    col2: {
        justifyContent: 'center',
        flex: 1,
        borderWidth: 1,
    },
    col3: {
        justifyContent: 'center',
        flex: 1,
        borderWidth: 1,
    },
    row2: {
        flexDirection: 'row',
        marginTop: 5,
    },
    weekButton: {
        fontSize: 15,
        flex: 1,
        borderWidth: 1,
        paddingTop: 10,
        paddingBottom: 10,
    },
    grayHover: {
        backgroundColor: '#B4B4B3'
    },
    img: {
        resizeMode: 'contain',
        height: 50,
        width: 50,
        marginBottom: 10,
    }

})
