/* 
 * 振った目によってチンチロのどの役かを判定する関数
 * inputは1～6の3つの数字の配列、ランダム
 **/
function tintiro(input){
//1～6以外の数字が入っていたらエラーを返す
	if(input[0] > 6 || input[1] > 6 || input[2] > 6 || input[0] < 1 || input[1] < 1 || input[2] < 1) {
		return "数字エラー";

	} else if (input.length != 3) {//数字が3つ入っていない場合
		return "個数エラー";
	}
//全て同じ目のとき
	if (input[0] === input[1] === input[2]) {
			switch (input[0]) {//同じ目ならその目を出力
				case 1:
					return "ピンゾロ";//1だけ別
				default:
					return input[0] + "ゾロ";
			}

//3つのうち2つが同じ目のとき
	} else if (input[0] === input[1]) {//〇の目を出力
			return input[2]+"の目";

	} else if (input[0] === input[2]) {
			return input[1]+"の目";

	} else if (input[1] === input[2]) {
			return input[0]+"の目";

//全部違う目のとき
	} else if (input[0] <= 3 && input[1] <= 3 && input[2] <= 3) {//1,2,3のとき
			return "123";

	} else if (input[0] >= 4 && input[1] >= 4 && input[2] >= 4) {//4,5,6のとき
			return "456";
		
	} else {//なんもないとき
			return "役無し";
	}
}

module.exports = tintiro