import AsyncStorage from "@react-native-async-storage/async-storage";

/*
{
    'in-note' : {
        crid : 
        list : [
            {
                ID : 
                NAME :
            }
        ]
    }
}


note : {
    NAME :
    KIND :
}
*/

var initIn = {
    crid : 3,
    list : [
        {
            ID : 1,
            NAME : "Lương 💵", 
        },
        {
            ID : 2,
            NAME : "Đầu tư 📈",
        },
        {
            ID : 3,
            NAME : "Bán hàng 📦"
        }
    ]
}
var initOut = {
    crid : 3,
    list :[
        {
            ID : 1,
            NAME : "Đồ ăn 🍗"
        },
        {
            ID : 2,
            NAME : "Vui chơi 🎪"
        },
        {
            ID : 3,
            NAME : "Quần áo 👘"
        }
    ]
    
}
var data = {
    in : {},
    out : {}
}

async function getData() {
    const In = await AsyncStorage.getItem('in-note');
    const Out = await AsyncStorage.getItem('out-note');

    if(In !== null) data.in = JSON.parse(In);
    else data.in = initIn, await AsyncStorage.setItem('in-note',JSON.stringify(initIn));

    if(Out !== null) data.out = JSON.parse(Out);
    else data.out = initOut, await AsyncStorage.setItem('out-note',JSON.stringify(initOut));

    

    return new Promise((resolve,reject) => resolve(data));
}

export default getData;