import S3 from 'aws-sdk/clients/s3';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor() { }

  uploadFile(file) {
    const bucket = new S3({
      region: 'us-west-2',
      accessKeyId: 'asd',
      secretAccessKey: 'asd/U+Oe9hdD/p4',
      sessionToken: 'asd'
    });

    const params = {
      Body        : file,
      ContentType : file.type,
      ACL         : 'public-read',
      Key         : `tmpTest/${file.name}`,
      Bucket      : 'shf-imgix-dev'
    };
    
    return new Promise((resolve, reject) => {
      bucket.upload(params)
      .on('httpUploadProgress', function (evt) {
        const percent = (evt.loaded / evt.total) * 100;
        const mb = evt.total / 1000000;
        // console.clear();
        console.log('uploading: %' + percent.toFixed(2) + ' of ' + mb.toFixed(1) + ' MB');
      })
      .send(function (err, data) {
          if (err) {
              console.log('There was an error uploading your file: ', err);
              return reject(err);
          }
          console.log('Successfully uploaded file.', data);
          return resolve(data);
      });
    });
  }
}