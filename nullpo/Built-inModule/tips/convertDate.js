/**
 * Convert Date or Timestamp to timestamp(UTC) / 日付やtimestampをUTCのtimestampに変換する
 * @param {String} date yyyy-m-d h:m:s or timestamp
 * @param {String} timezone timezone
 * @example convertDate('2022-1-1 0:0:0', 'UTC') -> 1640962800
 * @example convertDate('2022-01-01 00:00:00', 'Asia/Tokyo') -> 1640930400
 * @example convertDate('1640962800', 'Asia/Tokyo') -> 1640930400
 * @example convertDate('', 'UTC') -> [1,"No date specified"]
 * @returns {String|Boolean}
 */
function convertDate(date, timezone) {
  timezone = timezone ?? 'UTC';
  

  if(date.includes('-')) { // dateの形式がyyyy-m-d h:m:sかどうか
    // yyyy-m-d h:m:s 0が先頭に付くかどうか問わず、正しいかチェック
    if(!date.match(/^\d{4}-(?:0?\d|1[0-2])-(?:[0-2]?\d|3[01]) (?:[01]?\d|2[0-3]):[0-5]?\d:[0-5]?\d$/)) return ["2","Invalid date format"];
    // 日付を分割、timestampに変換 timezoneに合わせて変換
    const date_time_split = date.split(' ');
    const date_split = date_time_split[0].split('-');
    const time_split = date_time_split[1].split(':');
    let dateObj = new Date(Date.UTC(date_split[0], date_split[1]-1, date_split[2], time_split[0], time_split[1], time_split[2]));
    console.log(dateObj);
    
    if (timezone !== 'UTC') { // タイムゾーンに基づいて時間を調整
      const utcDate = new Date(dateObj.getTime() + dateObj.getTimezoneOffset() * 60000);
      console.log(utcDate);
      const targetTimezoneOffset = -(new Date(utcDate.toLocaleString('en-US', { timeZone: timezone })).getTimezoneOffset());
      console.log(targetTimezoneOffset);
      dateObj = new Date(utcDate.getTime() - targetTimezoneOffset * 60000);
      console.log("Converted : " + dateObj);
    }
    return dateObj.getTime() / 1000;
    
  } else if (date.match(/^\d{10}$/)) { // 10桁のUNIXタイムスタンプ
    const timestamp = parseInt(date, 10); // 念の為
    if (timestamp < 1000000000 || timestamp > 2147483647) return false;
    return timestamp;
  
  } else if (date.match(/^\d{13}$/)) { // 13桁のUNIXタイムスタンプ（ミリ秒）
    const timestamp = parseInt(date, 10) / 1000; // 秒単位に変換
    if (timestamp < 1000000000 || timestamp > 2147483647) return false;
    return timestamp;

  } else {
    return false; // 10桁または13桁以外の場合は無効

  }


}

module.exports = convertDate;