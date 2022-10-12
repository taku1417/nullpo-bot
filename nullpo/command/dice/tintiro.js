function tintiro(input){// /dice tintiro用、振った目によってどの役かを判定する
	var output = "";//出力用の変数
	if(input.length !== 3){//振った個数の確認
		output = "ダイスの個数が3つではありません。taku1417に問い合わせてください。";
		return output;
	} else if(input[0] > 7 || input[0] < 1 || input[1] > 7 || input[1] < 1 || input[2] > 7 || input[2] < 1){//振った面数の確認
		output = "ダイスの値がおかしくなっています。taku1417に問い合わせてください。";
		return output;
	} else {//正常だとここに来る
		if (input[0] === input[1] && input[0] === input[2]) {//全て同じ目かどうか
			switch (input[0]) {//同じ目ならその目を出力
				case 1:
					output = "ピンゾロ";
					return output;
				case 2:
					output = "2ゾロ";
					return output;
				case 3:
					output = "3ゾロ";
					return output;
				case 4:
					output = "4ゾロ";
					return output;
				case 5:
					output = "5ゾロ";
					return output;
				case 6:
					output = "6ゾロ";
					return output;
				default:
					break;
			}
		} else if(input[0] === input[1] || input[0] === input[2] || input[1] === input[2]){//3つのうち2つが同じ目かどうか
			if (input[0] === input[1]) {//〇の目を出力
				output = input[2]+"の目";
				return output;
			} else if (input[0] === input[2]) {
				output = input[1]+"の目";
				return output;
			} else if (input[1] === input[2]) {
				output = input[0]+"の目";
				return output;
			}
		} else if (input[0] !== input[1] && input[0] !== input[2] && input[1] !== input[2]) {//全部違う目かどうか
			if (input[0] === 4 && input[1] === 5 && input[2] === 6 || input[0] === 4 && input[1] === 6 && input[2] === 5 || input[0] === 5 && input[1] === 4 && input[2] === 6 || input[0] === 5 && input[1] === 6 && input[2] === 4 || input[0] === 6 && input[1] === 4 && input[2] === 5 || input[0] === 6 && input[1] === 5 && input[2] === 4) {//4,5,6のとき
				output = "456";
				return output;
			} else if (input[0] === 1 && input[1] === 2 && input[2] === 3 || input[0] === 1 && input[1] === 3 && input[2] === 2 || input[0] === 2 && input[1] === 1 && input[2] === 3 || input[0] === 2 && input[1] === 3 && input[2] === 1 || input[0] === 3 && input[1] === 1 && input[2] === 2 || input[0] === 3 && input[1] === 2 && input[2] === 1) {//1,2,3のとき
				output = "123";
				return output;
			} else {//その他のとき
				output = "役無し";
				return output;
			}
		}
	}
	return output;
}

module.exports = tintiro