import { View, Text, Pressable } from "react-native";
import InputTable from "./InputTable";
import SumTable2 from "./SumTable2";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { stateSlice } from "../../../redux/reducer/stateSlice";


function MonthTable() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.state);
    const constant = useSelector((state) => state.constant);

    function daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }

    useEffect(() => {
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
    },[])

    return (
       
            <View style={{paddingBottom:600}}>
                <SumTable2 /> 
                <InputTable />
                
            </View>

        
    );
}


export default MonthTable;