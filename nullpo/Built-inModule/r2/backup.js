const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const config = require('config');
const fs = require('node:fs');
const path = require('node:path');
const mime = require('mime');

let env_ENDPOINT, env_ACCESS_KEY, env_SECRET_KEY;
if (process.env.NODE_ENV === 'heroku') {
    env_ENDPOINT = process.env.R2_ENDPOINT;
    env_ACCESS_KEY = process.env.R2_ACCESS_KEY;
    env_SECRET_KEY = process.env.R2_SECRET_ACCESS_KEY;
}
else {
    env_ENDPOINT = config.get('R2.ENDPOINT');
    env_ACCESS_KEY = config.get('R2.ACCESS_KEY');
    env_SECRET_KEY = config.get('R2.SECRET_ACCESS_KEY');
}
const S3 = new S3Client({//S3となっているがS3のAPIを利用しているため。実際はR2に接続する
    region: 'auto',
    endpoint: env_ENDPOINT,
    credentials: {
        accessKeyId: env_ACCESS_KEY,
        secretAccessKey: env_SECRET_KEY
    }
});
const date = new Date();
const formattedDate = date.toLocaleString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit'});
const formattedTime = date.toLocaleString('ja-JP', { hour12: false, hour: '2-digit', minute: '2-digit'});
const formattedDateTime = date.toLocaleString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit', hour12: false, hour: '2-digit', minute: '2-digit'}).replace(/\//g, '-');

/**
 * @function 
 * R2への短期保存用バックアップを行う
 * @param {string} Bucket
 * @return {boolean}  
 */
async function Backup(Bucket){
    const targetsPath = path.join(__dirname, `../../../data/${Bucket}`);
    const targets = fs.readdirSync(targetsPath).filter(file => file.endsWith('.json'));
    try {
        for (const target of targets) {
            const data = fs.readFileSync(`data/${Bucket}/${target}`, 'utf-8');
            const fileName = 'ShortBackup-/' + formattedDateTime + ' ' + path.basename(`data/${Bucket}/${target}`);
            await S3.send(
                new PutObjectCommand({
                    Body: data,//バックアップするデータ
                    Bucket: Bucket,//bucketcheckerで使用しようとした機能が使えなかったため、現在はBucketからダイレクトに指定。いずれはbucketcheckerで存在するかを確認するようにする。
                    Key: fileName,//バックアップするデータの名前
                    ContentType: mime.getType(`../../../data/${Bucket}/${target}`)//json以外も送る場合は{file.mimetype}へ変更
                })
            );
        }
        console.log('[r2Backup] ' + Bucket + ' の ' + formattedTime + ' 分バックアップが完了しました。');
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

/**
 * @function 
 * R2への長期保存用バックアップを行う
 * @param {string} Bucket
 * @return {boolean}  
 */
async function Backup24h(Bucket){
    const targetsPath = path.join(__dirname, `../../../data/${Bucket}`);
    const targets = fs.readdirSync(targetsPath).filter(file => file.endsWith('.json'));
    for (const target of targets) {
        const data = fs.readFileSync(`data/${Bucket}/${target}`, 'utf-8');
        const fileName = 'DailyBackup-/' + formattedDate + '/ ' + path.basename(`data/${Bucket}/${target}`);
        await S3.send(
            new PutObjectCommand({
                Body: data,//バックアップするデータ
                Bucket: Bucket,//bucketcheckerで使用しようとした機能が使えなかったため、現在はBucketからダイレクトに指定。いずれはbucketcheckerで存在するかを確認するようにする。
                Key: fileName,//バックアップするデータの名前
                ContentType: mime.getType(`../../../data/${Bucket}/${target}`)//json以外も送る場合は{file.mimetype}へ変更
            })
        );
    }
    console.log('[r2Backup24h] ' + Bucket + ' の長期保存用バックアップが完了しました。');
}

module.exports = Backup, Backup24h;