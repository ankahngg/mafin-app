import AsyncStorage from '@react-native-async-storage/async-storage';

/*
    `${year}-${month}
        {
            crid :,
            weeksum : {
                week1 : {
                    in,
                    out
                }
            },
            monthsum : {
                IN,
                OUT
            },
            list : [
                {
                    ID :
                    DATE : 
                    MONEY :
                    KIND :
                    NOTE :
                }
            ],

        },

        data : {
            ID :
            DATE : 
            MONEY :
            KIND :
            NOTE :
        }
       
    

*/


async function addData(data) {
    
    var arr = data.DATE.split('-');
    const day = arr[0];
    const month = arr[1];
    const year = arr[2];
    const weekth = Math.ceil(day / 7);
    const key = `year${year}-month${month}`;
    var tmp = await AsyncStorage.getItem(key);
    tmp =  JSON.parse(tmp);

    ///onsole.log(tmp);
    data.ID = tmp.crid+1;
    tmp.crid ++;
    tmp.list.push(data);
    if(data.KIND == 'Out') {
        tmp.monthsum.OUT += data.MONEY;
        tmp.weeksum[`week${weekth}`].OUT += data.MONEY;
    }
    else {
        tmp.monthsum.IN += data.MONEY;
        tmp.weeksum[`week${weekth}`].IN += data.MONEY;
    }

    await AsyncStorage.setItem(key, JSON.stringify(tmp));

    return new Promise((resolve,reject) => resolve());

}

export default addData;