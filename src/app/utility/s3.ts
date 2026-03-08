import S3 from 'aws-sdk/clients/s3.js';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const s3 = new S3({
  accessKeyId: process.env.AWS_ID || '',
  secretAccessKey: process.env.AWS_SECRET || '',
  region: process.env.AWS_S3_REGION || '',
  signatureVersion: 'v4',
});

const uploadFile = async (fileName: string, name: string, id: string) => {
  return new Promise((resolve, reject) => {
    // Read content from the file
    const fileContent = fs.readFileSync(fileName);
    // Setting up S3 upload parameters
    const params = {
      Bucket: process.env.AWS_BUCKET || '',
      Key: `${id}_${name.replace(/\s/g, '')}`, // File name you want to save as in S3
      Body: fileContent,
      sortOrder: 0,
    };
    // console.log(fileName,'fileName in upload file');
    // Uploading files to the bucket
    try {
      s3.upload(params)
        .promise()
        .then(async function (data) {
          // console.log("resolved pending");
          resolve(data);
          // console.log("resolved");
        })
        .catch((err: Error) => {
          reject(err);
        });
    } catch (error) {
      reject(error);
      console.log(error, 'error in uploadFile to S3');
    }
  });
};

export { s3, uploadFile };
