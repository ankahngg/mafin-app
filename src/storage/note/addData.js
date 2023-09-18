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
async function addData(note) {
    if(note.KIND == 'In') key = 'in-note';
    else key = 'out-note';

    tmp = JSON.parse(await AsyncStorage.getItem(key));
    id = tmp.crid+1;
    tmp.list.push({ID : id, NAME : note.NAME});
    tmp.crid++;

    await AsyncStorage.setItem(key,JSON.stringify(tmp));

    return new Promise((resolve,reject) => resolve());
}

export default addData;