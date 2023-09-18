import { Modal, View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addShortNote, removeShortNote } from "../../../redux/reducer/noteSlice";
import {addNote} from "../../../redux/reducer/dataSlice"
import { stateSlice } from "../../../redux/reducer/stateSlice";

function InputTable() {
  const dispatch = useDispatch();

  const OutcomeList = useSelector((state) => state.note.out.list);
  const IncomeList = useSelector((state) => state.note.in.list);
  
  
  const [OutcomeChoose, setOutcomeChoose] = useState([]);
  const [IncomeChoose, setIncomeChoose] = useState([]);
  const [ModalVisible, setModalVisible] = useState(false);
  const [CalenderVisible, setCalenderVisible] = useState(false);
  
  
  const [Number, setNumber] = useState('');
  const [Note, setNote] = useState('');
  const Kind = useSelector(state => state.state.CrKind);
  const state = useSelector(data => data.state);
  const constant = useSelector(state => state.constant);
  
  function AddListScreen() {
    
    const [NoteItem, setNoteItem] = useState('');
    const [ConfirmVisible, setConfirmVisible] = useState(false);
    const [DeletedItem, setDeletedItem] = useState(-1);
    
    
    function ConfirmScreen() {
      if(DeletedItem==-1) data = {};
      else {
        if(Kind == 'Out') data = OutcomeList[DeletedItem];
        else data = IncomeList[DeletedItem];
      }
      return (
        <Modal
          visible={ConfirmVisible}
          transparent={true}
          animationType='slide'
        >
          <View style={confirmStyle.confirmContainer}>
            <View style={confirmStyle.confirmBox}>
              <Text style={{fontSize:20,textAlign:'center'}}>Bạn muốn xóa </Text>
              <Text style={{fontSize:20,textAlign:'center',fontWeight:'bold'}}>{data.NAME}
              </Text>
              <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:20}}>
                <Pressable onPress={()=>setConfirmVisible(false)}>
                  <Text style={[confirmStyle.button,{backgroundColor:'red'}]}>HỦY BỎ</Text>
                </Pressable>
                <Pressable onPress={()=>handleDeleteNoteItem()}>
                  <Text style={[confirmStyle.button,{backgroundColor:'green'}]}>XÁC NHẬN</Text>
                </Pressable>
              </View>
            </View>
          </View>
        
        </Modal>
      )
    }

    function handleDeleteNoteItem() {
      var Item;

      if(Kind == 'Out') Item = OutcomeList[DeletedItem];
      else Item = IncomeList[DeletedItem];
      dispatch(removeShortNote({ID : Item.ID, NAME : Item.NAME, KIND : Kind}));

      setDeletedItem(-1);
      setConfirmVisible(false);
      setModalVisible(false);

    }
    

    function handleAddNoteItem() {
      setModalVisible(false);
      if(NoteItem=='') return;
      dispatch(addShortNote({NAME : NoteItem, KIND : Kind}));
    }

    function handleConfirmScreen(index) {
      setDeletedItem(index);
      setConfirmVisible(true);
    }

    return (
      <Modal
        visible={ModalVisible}
        transparent={true}
        animationType='fade'
      >
        <View style={modalStyle.modalContainer}>
          <View style={modalStyle.modalBox}>
            <ConfirmScreen />
            <Text style={{ textAlign: 'center', fontSize: 20, padding: 10, fontWeight: 'bold' }}>Thêm danh sách ghi chú</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', }}>{(
              Kind == 'Out' ?
                OutcomeList.map(function (val, index) {
                  return (
                    <Pressable key={index} style={{ marginBottom: 10, marginRight: 10 }} onPress={() => handleConfirmScreen(index)}>
                      <View>
                        <Text style={modalStyle.noteItem}>{val.NAME}</Text>
                        <View style={[modalStyle.XLayer,{borderBottomColor:'red'}]}></View>
                      </View>
                    </Pressable>
                  )
                }) :
                IncomeList.map(function (val, index) {
                  return (
                    <Pressable key={index} style={{ marginBottom: 10, marginRight: 10 }} onPress={() => handleConfirmScreen(index)}>
                      <View>
                        <Text style={modalStyle.noteItem}>{val.NAME}</Text>
                        <View style={[modalStyle.XLayer,{borderBottomColor:'green'}]}></View>
                      </View>
                    </Pressable>
                  )
                })
            )}
            </View>
            <TextInput
              style={{ fontSize: 20, borderWidth: 1, padding: 10, marginTop: 20,borderRadius:10 }}
              placeholder="Tên ghi chú"
              placeholderTextColor="#808080"
              keyboardType='default'
              value={NoteItem}
              onChangeText={setNoteItem}
            />
            <View style={{ marginTop: 30, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Pressable onPress={() => setModalVisible(false)}>
                <Text style={[modalStyle.modalButton, { backgroundColor: 'red' }]}>HỦY BỎ</Text>
              </Pressable>
              <Pressable onPress={() => handleAddNoteItem()}>
                <Text style={[modalStyle.modalButton, { backgroundColor: 'green' }]}>THÊM</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
 

  function CalenderModal() {
    var DayNumber;
    if(state.CrMonth == constant.Month && state.CrYear == constant.Year) DayNumber = constant.Day;
    else DayNumber = daysInMonth(state.CrMonth,state.CrYear);
    var days = [];
    for(let i = 1; i <= DayNumber; i ++) days.push(i);

    function handlePress(val) {
      dispatch(stateSlice.actions.setCrDay(val));
      dispatch(stateSlice.actions.setCrFocus(Math.ceil(val/7)));
      setCalenderVisible(false);
    }

    return (
      <Modal
      visible={CalenderVisible}
      animationType='fade'
      transparent={true}
      >
        <View style={confirmStyle.confirmContainer}>
          <View style={[confirmStyle.confirmBox,{minHeight:200,width:300}]}>
            <Text style={{textAlign:'center',fontSize:25,fontWeight:'bold'}}>CHỌN NGÀY </Text>
            <Text style={{textAlign:'center',fontSize:20,fontWeight:'bold',fontStyle:'italic',padding:10}}>THÁNG {state.CrMonth}-{state.CrYear}</Text>
            <View style={{flexDirection:'row',flexWrap:'wrap',marginTop:10,justifyContent:'center'}}>
              {
                  days.map((val,index) => {
                    return (
                      <Pressable key={index}  onPress={()=>handlePress(val)}>
                        <Text 
                          style={[{borderWidth:1,width:50,textAlign:'center',padding:10,fontSize:20},
                          (state.CrDay == val?{backgroundColor:'#B4B4B3'}:'')]}>
                          {val}
                        </Text>
                      </Pressable>
                    )
                  })
              }
            </View>
          </View>
        </View>
      </Modal>
    )
    // return (
    //   <Text>WETF</Text>
    // )
  }

  
  function handlePressNote(index) {
    
    if (Kind == 'Out') {
      var pos = OutcomeChoose.indexOf(index);
      if (pos == -1) setOutcomeChoose([...OutcomeChoose, index]);
      else setOutcomeChoose(OutcomeChoose.filter((i) => { return i != index }));
    }
    else {
      var pos = IncomeChoose.indexOf(index);
      if (pos == -1) setIncomeChoose([...IncomeChoose, index]);
      else setIncomeChoose(IncomeChoose.filter((i) => { return i != index }));
    }
  }
  
  function handleSubmit() {
    var noteStr = '';
    if(Kind == 'Out') {
      for(i of OutcomeChoose) noteStr += OutcomeList[i].NAME + ', ';
      if(Note != '') noteStr += Note + ', ';
    }
    else {
      for(i of IncomeChoose) noteStr += IncomeList[i].NAME + ', ';
      if(Note != '') noteStr += Note + ', ';
    }
    if(Number == '') return;
    dispatch(addNote({
      DATE : getDate(),
      MONEY : parseInt(Number),
      KIND : Kind,
      NOTE : noteStr,
    }))
    
    setOutcomeChoose('');
    setNumber('');
    setIncomeChoose('');
    
  }
  
  function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }
  
  function getDate()
  {
    // if(state.CrFocus == 6 || state.CrFocus == 7){
    //   if (constant.Month == state.CrMonth && constant.Year == state.CrYear) return constant.Dateth;
    //   else return `${daysInMonth(state.CrMonth, state.CrYear)}-${state.CrMonth}-${state.CrYear}`
    // }
    // else {
    //   if (constant.Month == state.CrMonth && constant.Year == state.CrYear && Math.ceil(constant.Day / 7) == state.CrFocus)
    //   return constant.Dateth
    // else {
    //   days = daysInMonth(state.CrMonth, state.CrYear);
    //   return `${Math.min(state.CrFocus * 7,days)}-${state.CrMonth}-${state.CrYear}`
    // }
    return `${state.CrDay}-${state.CrMonth}-${state.CrYear}`
  }


  function handleChangeKind() {
    setOutcomeChoose([]);
    setIncomeChoose([]);
    if(Kind == 'Out') dispatch(stateSlice.actions.setCrKind('In'));
    else dispatch(stateSlice.actions.setCrKind('Out'));
  }


  return (
    <View>
      <View style={styles.row1}>
        <Pressable onPress={() => handleChangeKind()}>
          {(
            Kind == 'Out' ?
              <Text style={[styles.kindButton, { backgroundColor: 'red' }]}>-</Text> :
              <Text style={[styles.kindButton, { backgroundColor: 'green' }]}>+</Text>
          )}
        </Pressable>
        <TextInput
          style={styles.moneyInput}
          onChangeText={setNumber}
          value={Number}
          placeholder="Nhập tiền"
          placeholderTextColor="#808080"
          keyboardType='number-pad'
        />
        <Text style={{ fontSize: 30, marginLeft: 5 }}>k đ</Text>
        <Pressable onPress={()=>{setCalenderVisible(true),console.log('wtf')}}>
          <Text style={{ marginLeft:10,fontSize: 20, fontStyle: 'italic', fontWeight: 'bold' }}>🗓{getDate()}</Text>
        </Pressable>
      </View>

      <View style={styles.row2}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', }}>
          {(
            Kind == 'Out' ?
              OutcomeList.map(function (val, index) {
                return (
                  <Pressable key={index} style={{ marginBottom: 10, marginRight: 10 }} onPress={() => handlePressNote(index)}>
                    <Text style={(
                      OutcomeChoose.indexOf(index) == -1 ?
                        [styles.noteItem] :
                        [styles.noteItem, { backgroundColor: 'red' }]
                    )}>{val.NAME}</Text>
                  </Pressable>
                )
              }) :
              IncomeList.map(function (val, index) {
                return (
                  <Pressable key={index} style={{ marginBottom: 10, marginRight: 10 }} onPress={() => handlePressNote(index)}>
                    <Text style={(
                      IncomeChoose.indexOf(index) == -1 ?
                        [styles.noteItem] :
                        [styles.noteItem, { backgroundColor: 'green' }]
                    )}>{val.NAME}</Text>
                  </Pressable>
                )
              })
          )}

          <Pressable onPress={() => setModalVisible(true)}>
            <Text style={styles.addListButton}>+</Text>
          </Pressable>
        </View>

        <TextInput
          style={styles.noteInput}
          onChangeText={setNote}
          value={Note}
          placeholder="Ghi chú"
          placeholderTextColor="#808080"
          keyboardType='default'
        />

        <Pressable onPress={()=> handleSubmit()}>
          <Text style={styles.submitButton}>GHI NHẬN</Text>
        </Pressable>
      </View>

      <AddListScreen />
      <CalenderModal />

    </View>
  );
}
const styles = StyleSheet.create({
  row1: {
   
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
  },
  moneyInput: {
    borderRadius:10,
    textAlign: 'center',
    width: 150,
    marginLeft: 10,
    fontSize: 30,
    borderWidth: 1,
    padding: 5,
  },
  kindButton: {
    overflow:'hidden',
    borderRadius:10,
    textAlign: 'center',
    fontSize: 30,
    padding: 5,
    paddingRight:15,
    paddingLeft:15,
  },

  row2: {
    padding: 10,
    paddingTop: 5,

  }
  ,
  noteInput: {
    borderRadius:10,
    borderWidth: 1,
    fontSize: 20,
    padding: 8,
    marginBottom : 10,
  },
  noteItem: {
    overflow: 'hidden',
    borderRadius: 10,
    padding: 5,
    fontSize: 20,
    borderWidth: 1,
    
  },
  addListButton: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 20,
    marginBottom: 10,
  },
  submitButton : {
    padding:10,
    textAlign : 'center',
    fontSize : 20,
    fontWeight:'bold',
    backgroundColor : '#4da6ff',
    color : 'white',
    borderRadius: 10,
    borderRadius:10,
    overflow:'hidden'
  }
  
})

const modalStyle = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  noteItem: {
    overflow: 'hidden',
    borderRadius: 10,
    padding: 5,
    fontSize: 20,
    borderWidth: 1,
  }
  ,
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
    minHeight: 250,
    borderRadius: 20,
    backgroundColor: '#f2f2f2'
  },
  modalButton: {
    overflow: 'hidden',
    borderRadius: 10,
    padding: 10,
    fontSize: 20,
    textAlign: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  XLayer: {
    position: 'absolute',
    color: 'red',
    width: "100%",
    height: "50%",
    borderBottomColor: 'red',
    borderBottomWidth: 1.5,
  },
})

const confirmStyle = StyleSheet.create({
  confirmContainer : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmBox : {
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,

    width: 230,
    minHeight: 150,
    borderRadius: 15,
    backgroundColor: '#e6e6e6'
  },
  button : {
    fontSize: 18,
    padding: 10,
    borderRadius:10,
    overflow:'hidden'
  }
})

export default InputTable;