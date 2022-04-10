

function getNum(table,person){
    let res = [];
    for(let i=0;i<person.length;i++){

        if(person[i] == 'M'){//如果为男人
            

            let index = table.findIndex(item=> item == 1)
            if(index >=0 ){//如果找到了只有一人的位置
                table[index]++;
                res.push(index+1);
            }else{//如果没找到,则寻找没有人的位置
                let index1 = table.findIndex(item=> item == 0);
                table[index1]++;
                res.push(index1+1);
            }

        }else{//如果为女人
            let index = table.findIndex(item=> item == 0)
            if(index >=0 ){//如果找到了没有人的位置
                table[index]++;
                res.push(index+1);
            }else{//如果没找到,则寻找只有一人的位置
                let index1 = table.findIndex(item=> item == 1);
                table[index1]++;
                res.push(index1+1);
            }
        }
        console.log("当前性别",person[i]);
        console.log("table",table);
    }
    return res;

}
console.log(getNum([0,1,1,0,2,1],'MFMMFFM'));