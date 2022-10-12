function dice_custom(amount,max,dice){// /dice custom用、diceに出目を格納する
        var output = [];//出力用の変数,[1]はコード
        if(amount < 1 || max < 1){//振った個数の確認
                return dice;//処理自体しない
        } else {
                for (var i = 0; i < amount; i++) {//振った個数だけ繰り返す
                        dice[i] = Math.floor(Math.random() * max) + 1;//1から最大値までのランダムな数を出力
                }
        }
        return dice;
}
module.exports = dice_custom;