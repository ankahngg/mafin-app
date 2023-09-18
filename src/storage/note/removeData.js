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
    ID : 
    NAME :
    KIND :
}
*/
async function removeData(note) {
    if(note.KIND == 'In') key = 'in-note';
    else key = 'out-note';

    tmp = JSON.parse(await AsyncStorage.getItem(key));
    tmp.list = tmp.list.filter((val,index) => {
        return val.ID != note.ID;
    })

    await AsyncStorage.setItem(key,JSON.stringify(tmp));

    return new Promise((resolve,reject) => resolve());
}

export default removeData;