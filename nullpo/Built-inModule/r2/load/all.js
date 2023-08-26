const { S3Client, GetObjectCommand, ListObjectsV2Command } = require('@aws-sdk/client-s3');
const config = require('config');
const fs = require('node:fs');
const path = require('node:path');

let env_ENDPOINT, env_ACCESS_KEY, env_SECRET_KEY;
if (process.env.NODE_ENV === 'heroku') {
    env_ENDPOINT = process.env.R2_ENDPOINT;
    env_ACCESS_KEY = process.env.R2_ACCESS_KEY;
    env_SECRET_KEY = process.env.R2_SECRET_ACCESS_KEY;
} else {
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
/**
 * R2から読み込める全てのファイルを読み込む returnはnull
 * @param {string} Bucket
 * @param {string} fileName
 * @return null
 */
//処理はsingleと同じ。変更する
async function r2LoadAll(Bucket, fileName){
    if (!fs.existsSync(`data/${Bucket}`)) {
        fs.mkdirSync(`data/${Bucket}`);
    }//フォルダが存在しないときは作成する
    try {
        const data = await S3.send(
            new GetObjectCommand({
                Bucket: Bucket,
                Key: fileName
            })
        );
        dataBody = await data.Body?.transformToString();
        const dataJSON = await JSON.parse(JSON.stringify(dataBody));
        fs.writeFileSync(`data/${Bucket}/${fileName}`, dataJSON);
    } catch (error) {
        console.log(error);
    }
    return dataJSON;
}

module.exports = r2LoadAll;