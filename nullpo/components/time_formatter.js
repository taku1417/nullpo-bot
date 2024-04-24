const throw_webhook = require('../../function/throw_webhook.js');

/**
 * 秒数から(D:HH:)MM:SS またはD日H時間M分S秒形式の文字列を生成する
 * @param {Number} seconds 秒数
 * @param {String} format フォーマット(digital | japanese)
 * @returns {string} (DD:HH:)MM:SSまたはD日H時間M分S秒形式の文字列
 * @usage timeformatter(123456, digital) => '1:10:17:36' | timeformatter(1234, japanese) => '20分34秒'
 */
function timeformatter(seconds, format){
    let day = Math.floor(seconds / 86400);
    let hour = Math.floor((seconds % 86400) / 3600);
    let minute = Math.floor(((seconds % 86400) % 3600) / 60);
    let second = ((seconds % 86400) % 3600) % 60;
    let formatted_time = '';
    if(seconds < 0) {
      seconds = 0;
    }
    if(format == 'digital') {
      if(day > 0) {formatted_time += day + ':' + ('00' + hour).slice(-2) + ':'}
      else if(hour > 0) formatted_time += ('00' + hour).slice(-2) + ':';
      formatted_time += ('00' + minute).slice(-2) + ':' + ('00' + second).slice(-2);
    } else if(format == ('japanese' || 'ja')) {
      if(day > 0) formatted_time += day + '日';
      if(hour > 0) formatted_time += hour + '時間';
      if(minute > 0) formatted_time += minute + '分';
      if(second > 0) formatted_time += second + '秒';
    } else {
      logger.error('timeformatter: 不正なフォーマットが指定されました。');
      throw_webhook('error', 'timeformatter', '不正なフォーマットが指定されました。');
      throw new Error('timeformatter: 不正なフォーマットが指定されました。');
    }
    return formatted_time;
} 

module.exports = timeformatter;