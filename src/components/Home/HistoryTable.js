import { Modal, View, Text, StyleSheet, TextInput, Pressable, ScrollView } from "react-native";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeNote } from "../../../redux/reducer/dataSlice";

function HistoryTable() {
    const list = useSelector((sta) => {
        const state = sta.state;
        const list = sta.data.main[`year${state.CrYear}`][`month${state.CrMonth}`].list;

        if(state.CrFocus == 6) {
            return list.filter((val,index) => {
                return val.KIND == 'Out';
            })
        }
        if(state.CrFocus == 7) {
            return list.filter((val,index) => {
                return val.KIND == 'In';
            })
        }
        return list.filter((val,index) => {
            arr = val.DATE.split('-');
            day = arr[0];
            weekth = Math.ceil(day/7);
            return val.KIND == 'Out' && weekth == state.CrFocus;
        })
    });
  
    const [ModalVisible,setModalVisible] = useState(false);
    const [DeletedItem,setDeletedItem] = useState(-1);
    const dispatch = useDispatch();

    function DeleteModal() {
        if(DeletedItem == -1) data = {};
        else data = list[DeletedItem];

        function handleDelete(index) {
            setDeletedItem(-1);
            setModalVisible(false);
            dispatch(removeNote(list[index]));
        }

        return (
            <Modal
            visible={ModalVisible}
            animationType='slide'
            transparent={true}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalBox}>
                        <Text style={styles.modalHeader}>Bạn muốn xóa</Text>
                        <View style={{flexDirection:'row'}}>
                            <Text style={[{flex:1},styles.text]}>{data.DATE}</Text>
                            <Text style={[{flex:1,fontWeight:'bold'},styles.text,(data.KIND=='Out')?{color:'red'}:{color:'green'}]}>{data.MONEY}k</Text>
                        </View>
                        <Text style={styles.text}>{data.NOTE}</Text>
                        <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:40}}>
                            <Pressable onPress={()=>setModalVisible(false)} >
                                <Text style={[styles.modalButton,{backgroundColor:'green'}]}>Quay Lại</Text>
                            </Pressable>
                            <Pressable onPress={()=>handleDelete(DeletedItem)} >
                                <Text style={[styles.modalButton,{backgroundColor:'red'}]}>Xác nhận</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }

    function handlePress(index) {
        setDeletedItem(index);
        setModalVisible(true);

    }


    return (
        <View style={styles.container}>
            <View style={styles.row1}>
                <Text style={{marginRight :10, marginLeft:10, fontSize:15}}>Sắp Xếp</Text>
                <Pressable style={{marginRight :10}}>
                    <Text style={styles.sortButton}>GIẢM</Text>
                </Pressable>
                <Pressable style={{marginRight :10}}>
                    <Text style={styles.sortButton}>TĂNG</Text>
                </Pressable>
                <Pressable style={{marginRight :10}}>
                    <Text style={styles.sortButton}>TG</Text>
                </Pressable>
            </View>
            <View style={styles.row2}>
                <View style={[styles.gridLine,{padding:10,borderWidth:1}]}>
                    <Text style={[styles.gridItem1,{fontWeight:'bold'}]}>NGÀY</Text>
                    <Text style={[styles.gridItem1,{fontWeight:'bold'}]}>TIỀN</Text>
                    <Text style={[styles.gridItem2,{fontWeight:'bold'}]}>GHI CHÚ</Text>    
                </View>
                <ScrollView style={styles.historyGrid}>
                    {
                        list.map((val,index) => {
                            return (
                                <Pressable key={index} style={{borderWidth:1,paddingTop:10,paddingBottom:10}} onPress={()=>handlePress(index)}>
                                    <View style={styles.gridLine}>
                                        <Text style={styles.gridItem1}>{val.DATE}</Text>
                                        <Text style={[styles.gridItem1,(val.KIND=='Out'?styles.redColor:styles.greenColor),{fontWeight:'bold'}]}>{val.MONEY}k</Text>
                                        <Text style={styles.gridItem2}>{val.NOTE}</Text>    
                                    </View>
                                </Pressable>
                            )
                        })
                    }
                </ScrollView>
                <DeleteModal />
                    
            </View>
        </View>  
    );
}

const styles = StyleSheet.create({
    container : {
        padding : 5,
    },
    row1 : {
        flexDirection : 'row',
        alignItems : 'center'
    },
    row2 : {
        
        marginTop : 10,
    },
    sortButton : {
        fontSize : 15,
       padding:5,
       borderWidth:1,
       backgroundColor : '#cccccc',
       borderColor : '#999999',
       borderRadius : 3,
    },
    gridLine : {
       
        flexDirection : 'row',
        alignItems : 'center'
        
    },
    gridItem1 : {
        textAlign:'center',
        fontSize : 15,
        flex:1,
        
    },
    gridItem2 : {
        textAlign:'center',
        fontSize : 15,
        flex:2,
    },
    historyGrid : {
        borderWidth:1,
        overflow : 'scroll',
        height : 300,
        
        
    },
    deleteButton : {
        color:'red',
        padding : 5,
        borderWidth:1,
        fontWeight:'bold',
        backgroundColor: '#e6e6e6',
        borderColor: '#999999',
        borderRadius:5,
        overflow:'hidden'
    },
    redColor : {
        color : 'red'
    },
    greenColor : {
        color:'green'
    },
    modalContainer : {
        flex:1,
        justifyContent:'center',
        alignItems : 'center'
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
    
        width: 300,
        minHeight: 200,
        borderRadius: 20,
        backgroundColor: '#f2f2f2'
      },
      modalButton: {
        padding : 8,
        fontSize : 20,
       
        paddingLeft : 20,
        paddingRight: 20,
        borderRadius : 10,
        overflow : 'hidden'
      },
      modalHeader : {
        padding : 5,
        textAlign : 'center',
        fontSize : 20,
        fontWeight : 'bold',
      },
      text : {
        padding:10,
        fontSize : 20,
        textAlign : 'center',
        borderWidth:1,
      }

})  

export default HistoryTable;