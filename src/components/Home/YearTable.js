import { Modal, View, Text, StyleSheet, Image, Pressable } from "react-native";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { stateSlice } from "../../../redux/reducer/stateSlice";

function YearTable() {
    const [ModalVisible, setModalVisible] = useState(false);
    const [Drop, setDrop] = useState(false);
    const [Year, setYear] = useState('2023');
    const YearList = ['2023', '2022',];
    const ExtraYearList = ['2023', '2022'];
    const MonthList = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    const state = useSelector(state => state.state);
    const constant = useSelector(state => state.constant);
    const dispatch = useDispatch();
    // console.log(constant)

    function DropPart() {
        function handleChangeYear(val) {
            setYear(val);
            setDrop(false);
        }

        return (
            <View style={styles.dropPart}>
                {
                    YearList.map((val, index) => {
                        return (
                            <Pressable key={index} onPress={() => handleChangeYear(val)}>
                                <Text style={styles.dropItem}>{val}</Text>
                            </Pressable>
                        )
                    })
                }
                <Pressable onPress={() => setModalVisible(true)}>
                    <Text style={styles.dropItem}>.  .  .</Text>
                </Pressable>
            </View>
        )
    }

    function YearChooseModal() {
        function handleModalPress(val) {
            setModalVisible(false),
                setYear(val);
            setDrop(false);
        }

        return (
            <Modal
                visible={ModalVisible}
                transparent={true}
                animationType='slide'
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalBox}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>CHỌN NĂM MUỐN XEM</Text>
                        <View style={styles.ModalYearList}>
                            {
                                ExtraYearList.map((val, index) => {
                                    return (
                                        <Pressable key={index} onPress={() => handleModalPress(val)}>
                                            <Text style={styles.extraYearItem}>{val}</Text>
                                        </Pressable>
                                    )
                                })
                            }
                        </View>
                        <Pressable onPress={() => setModalVisible(false)}>
                            <Text style={styles.modalReturnButton}>QUAY LẠI</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        )
    }

    function handleDropPress() {
        setDrop((pre) => {
            return !pre;
        })
    }

    function daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }

    function handlePress(val) {
        dispatch(stateSlice.actions.setCrMonth(val));
        dispatch(stateSlice.actions.setCrYear(Year));
        dispatch(stateSlice.actions.setCrPage('Month'));

    }

    return (
        <View style={styles.container}>
            <View style={styles.dropContainer}>
                <Pressable onPress={() => handleDropPress()}>
                    <Text style={styles.displayItem}>{Year} ➡️</Text>
                </Pressable>
                {
                    Drop && <DropPart />
                }
            </View>
            <YearChooseModal />
            <View style={styles.yearTableContainer}>
                {
                    MonthList.map((val, index) => {
                        const data = useSelector((state) => state.data.main[`year${Year}`][`month${val}`]);
                        if (Year == constant.Year && parseInt(val) > constant.Month)
                            return (
                                <Pressable key={index} style={styles.yearTableItem} >
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', paddingBottom: 10 }}>
                                        THÁNG {val}
                                    </Text>
                                    <View style={styles.row2}>
                                        <View style={styles.col21}>
                                            <Text style={[styles.text, { color: 'red' }]}>...</Text>
                                            <Text style={[styles.text, { color: 'green' }]}>...</Text>
                                        </View>
                                        <View style={styles.col22}>
                                            <Text style={styles.text}>==</Text>
                                            <Text style={styles.text}>==</Text>

                                            <Text style={styles.text}>...</Text>
                                        </View>

                                    </View>
                                </Pressable>
                            )
                        else {
                            return (
                                <Pressable key={index}
                                    style={[styles.yearTableItem, (state.CrMonth == val && state.CrYear == Year ? styles.grayHover : '')]}
                                    onPress={() => handlePress(val)}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', paddingBottom: 10 }}>
                                        THÁNG {val}
                                    </Text>
                                    <View style={styles.row2}>
                                        <View style={styles.col21}>
                                            <Text style={[styles.text, { color: 'red' }]}>{data.monthsum.OUT}k</Text>
                                            <Text style={[styles.text, { color: 'green' }]}>{data.monthsum.IN}k</Text>
                                        </View>
                                        <View style={styles.col22}>
                                            <View style={{ flex: 1, alignItems: 'center' }}>
                                                <Image style={styles.img}
                                                    source={(data.monthsum.IN - data.monthsum.OUT >= 0) ?
                                                        require('../../file/green_arrow.png') :
                                                        require('../../file/red_arrow.png')
                                                    }></Image>
                                            </View>

                                            <Text style={styles.text}>{Math.abs(data.monthsum.IN - data.monthsum.OUT)}k</Text>
                                        </View>

                                    </View>
                                </Pressable>
                            )

                        }
                    })
                }

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
        paddingBottom: 550,
    },
    dropContainer: {
        flexDirection: 'row'
    },
    displayItem: {
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center',
        padding: 5,
        
        
    },
    dropItem: {
        fontSize: 30,
        textAlign: 'center',
        padding: 5,
        paddingLeft:10,
        paddingRight:10,
        overflow: 'hidden',
        borderWidth:1,

    },
    dropPart: {
        flexDirection: 'row'
        // left : 12
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBox: {
        padding: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,

        width: 250,
        minHeight: 200,
        borderRadius: 20,
        backgroundColor: '#f2f2f2'
    },
    ModalYearList: {

        marginTop: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',

    },
    modalReturnButton: {
        fontSize: 20,
        textAlign: 'center',
        padding: 10,
        marginTop: 20,
        backgroundColor: 'red',
        borderRadius: 10,
        overflow: 'hidden'
    },
    extraYearItem: {
        fontSize: 20,
        padding: 5,
        borderWidth: 1,
        marginTop: 10,
        width: 65,
        textAlign: 'center',
        marginRight: 8,
        borderColor: '#999999',
        backgroundColor: '#d9d9d9',
        overflow: 'hidden',
    },

    yearTableContainer: {
        marginTop: 20,
        borderWidth: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',

    },
    yearTableItem: {
       
        paddingTop: 10,
        paddingBottom: 10,

        borderWidth: 1,
        width: "50%",
        minheight: 130,
        alignItems: 'center',
        justifyContent: 'center'

    },
    text: {
        fontSize: 17,
        fontWeight: 'bold'
    },
    row2: {
        flexDirection: 'row'
    },
    col21: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    col22: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    grayHover: {
        backgroundColor: '#B4B4B3'
    },
    img :{
        resizeMode:'contain',
        height : 50,
        width : 50,
        marginBottom:10,
    }

})

export default YearTable;