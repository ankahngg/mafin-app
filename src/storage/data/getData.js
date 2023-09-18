import AsyncStorage from '@react-native-async-storage/async-storage';

/*
    key = '
*/

init = {
    crid : 0
    ,
    weeksum : {
        week1:{
            IN:0,
            OUT:0,
        },
        week2:{
            IN:0,
            OUT:0,
        },
        week3:{
            IN:0,
            OUT:0,
        },
        week4:{
            IN:0,
            OUT:0,
        },
        week5:{
            IN:0,
            OUT:0,
        },

    },
    monthsum: {
        IN:0,
        OUT:0,
    },
    list : [
        // ID:1,
        // DATE:'12-5-2022',
        // MONEY:'100',
        // KIND :'Out',
        // NOTE :'buy food'
    ]
}

async function sleep(ms) {
    return new Promise((resolve,reject) => {
        setTimeout(() => resolve(),ms);
    })
}

var data = {};

async function getData()
{
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const len = 2;

    for (let year = currentYear; year >= currentYear - len + 1; year--) {
        data[`year${year}`] = {}
        for (let month = 1; month <= 12; month++) {
            // AsyncStorage.setItem(`year${year}-month${month}`,JSON.stringify(init));
            // data[`year${year}`][`month${month}`] = init;
            var res = await AsyncStorage.getItem(`year${year}-month${month}`);
            if(res !== null)
                data[`year${year}`][`month${month}`] = JSON.parse(res);
            else{
                AsyncStorage.setItem(key,JSON.stringify(init));
                data[`year${year}`][`month${month}`] = init;
            }
        }
    }
    
    return new Promise((resolve,reject) => resolve(data));
}

export default getData;