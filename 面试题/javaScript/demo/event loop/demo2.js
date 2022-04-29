
function delay(time){

    setTimeout(() => {
        
    }, time);
}

async function main(){

    await delay(2000);
    console.log("123");
}

main();