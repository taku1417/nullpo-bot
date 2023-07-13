const { S3Client, ListBucketsCommand } = require("@aws-sdk/client-s3");

/**
 * r2のBucketを指定/存在するかの確認をする ListBucketsCommandが使用できなかったため、現在は未実装。いずれこの関数でバケットが存在するかを確認する。
 * @param {S3Client} S3Client
 * @param {string} type
 * @return {string} Bucket名
 */
async function r2BucketChecker(S3Client, type){
    const input = undefined;
    const BucketList = await S3Client.send(new ListBucketsCommand(input));
    console.log(BucketList);
}

module.exports = r2BucketChecker;