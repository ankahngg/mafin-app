import { Text,View } from "react-native";
import SumTable from "./components/Home/SumTable";
import HistoryTable from "./components/Home/HistoryTable";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, Redirect } from "expo-router";
import { stateSlice } from "../redux/reducer/stateSlice";


function History() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.state)
    const constant = useSelector((state) =>state.constant);
    const [Back,setBack] = useState(false);

    useEffect(() => {
        dispatch(stateSlice.actions.setCrFocus(6));

        return () => {
            if(state.CrMonth == constant.Month && state.CrYear == constant.Year) {
                dispatch(stateSlice.actions.setCrFocus(constant.Week));
                dispatch(stateSlice.actions.setCrDay(constant.Day));
            }
            else {
                const days = daysInMonth(state.CrMonth, state.CrYear);
                const lastweek = Math.ceil(days/7);
                dispatch(stateSlice.actions.setCrFocus(lastweek));
                dispatch(stateSlice.actions.setCrDay(days));
            }
            dispatch(stateSlice.actions.setCrKind('Out'));
        }
    },[])

    if(!Back)
        return (

            <View>
                <Text style={{fontSize:30,fontWeight:'bold',padding:10}}>{state.CrMonth}-{state.CrYear}</Text>
                <View>
                    <SumTable />
                    <HistoryTable />
                </View>
                <View style={{padding:5}}> 
                    <Link href={'HOME/HOME'} style={{overflow:'hidden',fontSize:20,textAlign:'center',borderRadius:10,padding:10,backgroundColor:'#B4B4B3'}}>
                        Quay Lại
                    </Link>
                </View>
                
            </View>
        );
    else {
        return <Redirect href="/HOME" />
    }
}

export default History;