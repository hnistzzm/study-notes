
//如果两个属性类型不一致,但仍将其合并,那么合并后的类型会变为·never

interface X{
    c:string;
    d:string;
}

interface Y{
    c:number;
    d:string;
}


type XY = X & Y;
type YX = Y & X;


// let p: XY = {c:'123',d:'456'}; //error 不能将类型string分配给never