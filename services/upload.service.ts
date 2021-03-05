import S3 from 'aws-sdk/clients/s3';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor() { }

  uploadFile(file) {
    debugger;
    const bucket = new S3({
      region: 'us-west-2',
      accessKeyId: 'ASIAZGUI3PT5KEITEZVP',
      secretAccessKey: 'EWX/wWk7I1b+b5q0fcTuSzSudDlxkicjmXxvCNY4',
      sessionToken: 'IQoJb3JpZ2luX2VjENv//////////wEaCXVzLXdlc3QtMiJHMEUCIQD4zOMJPU8nwaHkaJt88jLAafOqKkOkG1fso1EXoklweQIgFkUC77MxC/QSsIanXBpkpGYZoSzO2vDJ4F//i09EHNYqgwMI9P//////////ARABGgw2MzI3MjA5NDg0NzQiDAECvh/MjFg1ha7/qyrXAr+rRac4coacrzycH7zDc8hE++4i1JumuXoGAxHmNg0EMzAkEa9yETBy1Fg/HN3ajJxQZBBpAt5pyDA7VrpTjqd1Efb4BbMZQsR4DJoK3V+3aOHMD5GfifcqMh8xBJwM3eTVnKQEhlBmTMjXHHcWio2zkRRtLLBkDtbVFrCPOyuPzuVfiyL3KEMtleUh5LuTBf7hrnxI1o6ptFj9FFF7edmMFD40oZcZEBiI6ELk5kD39hPR6Un6SSNuiQHjpWiRIOXke2rBjTKoJ5skFqAAq8+cQSBkmOdWgzCEFhOwFn0WJGz2fMimCa7dIcj5IIku1j4mKt++jCKc58RmFvX6aWeapjNFcNBQpvr/xqTRfO+IWKdySm2Zq/kSTwGYcc94+ut3xJ12N6R1Af3zX3zeed4wE5mXM/CCwKUTlfVe7Bn/iSmwDSw2eFTg/ybzlQ5wKd7UG8HQvQ8wy/qJggY6pgG2OKHtbNv3ucX5E/ZBispY42SShABWn9lGA+XjddvuwvaW5NGu+uCxTXJNo6P+NUtuqItDWcCvPiGCkIWK+b8O+S7PplBpc3QNKYLd2bmcJoY9MDduDKYK3668j2C4P2hMEJ6fc0Efo9437J+fUOeNqGZjxEjRGxkKjnMAo7ApEii0tYyIKq3NDN7rltTvkaKeHsQf2DpQAulGxyd6FGW3AE7Hy3xu'
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