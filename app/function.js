export const initial=()=>{
    console.log('====================================');
    console.log("This is initial testing code");
    console.log('====================================');
}

export const notificationPress=()=>{
    console.log('====================================');
    console.log("This is working on pressing the notification");
    console.log('====================================');
}

export const actionPress=(actionId)=>{
    switch(actionId){
        case 'test1':
            console.log("This is test1 action");
            break;
        case 'test2':
            console.log("This is test2 action");
            break;    
    }

}
