import { useState } from "react";
import { View,Text,Image, Pressable } from "react-native";
import { StyleSheet } from "react-native";
import { Modal } from "react-native";
import { useSelector } from "react-redux";

function Header() {
    const [ModalVisible,setModalVisisble] = useState(false);
    const constant = useSelector((state) => state.constant);
    function AccountModal() {
        return (
        <Modal
            visible={ModalVisible}
            animationType="slide"
            transparent={true}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalBox}>
                    <Text style={{fontSize:25,fontWeight:'bold',padding:10,textAlign:'center',marginBottom:10}}>
                        THÔNG TIN TÀI KHOẢN
                    </Text>
                    <Text style={styles.textLine}>
                        <Text style={{fontWeight:'600'}}>Tên</Text>: khang khang
                    </Text>
                    <Text style={styles.textLine}> 
                        <Text style={{fontWeight:'600'}}>Ngày sinh</Text>: 27-07-2004
                    </Text>
                    <Text style={styles.textLine}>
                        <Text style={{fontWeight:'600'}}>Email</Text>: ankhanghp2004@gmail.com
                    </Text>
                    <Text style={styles.textLine}>
                        <Text style={{fontWeight:'600'}}>SDT</Text>: 0865004459
                    </Text>

                    <Pressable onPress={()=>setModalVisisble(false)}>
                        <Text style={{marginTop:20,fontSize:20,textAlign:'center',backgroundColor:'gray',padding:10,borderRadius:10,overflow:'hidden'}}>
                            BACK
                        </Text>
                    </Pressable>
                </View>
            </View>

        </Modal>
        )
    }



    return (
        <View style={styles.container}>
            <Pressable style={{flex:2,justifyContent:'center'}} onPress={()=>setModalVisisble(true)}>
                <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                    <Image source={require("./../../file/account.png")} />
                    <Text style={{fontSize:15,fontWeight:'bold'}}>khang khang</Text>
                </View>
            </Pressable>
            <Text style={{flex:3,fontSize:30,fontWeight:'bold',textAlign:'center'}}>{constant.Dateth}</Text>
            <View style={{flex:1,padding:10,alignItems:'center'}}>
                <Image source={require("./../../file/logout_img.png")} />
            </View>
             
            <AccountModal />
        </View>
    );
}

export default Header;

const styles = StyleSheet.create({
    container :{
        flexDirection: 'row',
        backgroundColor:'#e6e6e6',
        fontSize: 15,
        alignItems : 'center',
        padding:5,
        
    },
    modalContainer : {
        flex:1,
        justifyContent:'center',
        alignItems : 'center',
    },
    modalBox : {
        padding:10,
        width:"90%",
        height : 400,
        borderRadius: 20,
        backgroundColor: 'white',
        shadowColor : 'black',
        shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.5,
          shadowRadius: 4,
    },
    textLine : {
        fontSize:20,
        padding:15,
       
    }
    
})