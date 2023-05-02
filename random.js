// for使わないやつ
const randomAmount = 10;//数字の最大数
let randomDisabled = Math.floor(Math.random() * 10);//選ばない数字を抽選
let random = Math.floor(Math.random() * 9);//最大数から1引いた数までの数字を抽選

if(random >= randomDisabled){//もし選ばれた数字が無効にされた数字以上なら
    random++;//足す
}
/*
random 3  disabled 2 => random 3
r 3 d 3 => r 4
r 3 d 4 => r 3
r 0~8 d 3 => r 0~2, 4~9
r 0~8 d 3 => r 0~2, 4, 4~8
*/
//console.log("for使わないやつ: 選ばれたのは" + random + "、無効にされた数字は" + randomDisabled + "です。");

// for使うやつ
const randomAmount2 = 10;//数字の最大数
let randomDisabled2 = Math.floor(Math.random() * randomAmount2);//選ばない数字を抽選
var random2;

for (random2 = Math.floor(Math.random() * randomAmount2); random2 == randomDisabled2;) {
    random2 = Math.floor(Math.random() * randomAmount2);
}
//console.log("for使うやつ: 選ばれたのは" + random2 + "、無効にされた数字は" + randomDisabled2 + "です。");


let lottery = Math.floor(Math.random() * 30)+1;
switch(true){
    case lottery == 1:
        console.log("ピチューン...");
        break;
    case lottery >= 2 && lottery <= 3:
    case lottery >= 6 && lottery <= 7:
        console.log("激熱");
        break;
    case lottery >= 4 && lottery <= 5:
    case lottery >= 8 && lottery <= 13:
        console.log("チャンス！");
        break;
}
console.log(lottery);