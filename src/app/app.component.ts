import { Component, ViewChild, ElementRef } from '@angular/core';
import { UploadService } from './services/upload.service';
import './graphql.module';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import * as short from 'short-uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  selectedFiles: FileList;
  s3Loading: boolean = false;
  splogLoading: boolean = false;
  data: any;
  loadingRecordings: any;
  myfilename = 'Select File';

  color: any = "warn";
  mode: any = "indeterminate";
  s3LoadPercent: any = 0;

  constructor(private uploadService: UploadService, private apollo: Apollo) { }

  ngOnInit() {}

  @ViewChild('UploadFileInput') uploadFileInput: ElementRef;

  selectFile(event) {
    this.selectedFiles = event.target.files;
    if (event.target.files && event.target.files[0]) {
      this.myfilename = '';
      this.myfilename = Array.from(event.target.files) .map((file: File) => file.name).join(',');
    } else {
      this.myfilename = 'Select File';
    }
  }
  
  upload() {
    this.s3Loading = true;
    let promises = [];
    for( let i=0,len=this.selectedFiles.length; i < len; i++){
      const file = this.selectedFiles.item(i);
      promises.push(this.uploadService.uploadFile(file));
    }

    Promise.all(promises)
    .then( results => {
      this.uploadImageToPlaylist(results);
    })
    .catch( err => {
      this.s3Loading = false;
    })
  }


  checkContentLoadingStatus(ids){
    this.apollo.query({
      variables: { ids: ids },
      query: gql`
        query getRecordingsByExtId($ids: [ID!]!) {
          getRecordingsByExtId(
            partnerId: "shf"
            ids: $ids
          ){
            externalTrackId
            status
          }
        }
      `
    }).subscribe((results) => {
      let data: any = results.data;
      let recordings: any = data.getRecordingsByExtId;
      this.loadingRecordings = recordings;
      console.log(recordings);

      this.splogLoading = !recordings.every( recording => recording.status === 'splogged' );

      if( this.splogLoading ){
        setTimeout(()=>this.checkContentLoadingStatus(ids), 3000);
      }
      return;
    });
  }

  uploadImageToPlaylist(files) {
    console.log(this.apollo.mutate)
    debugger;

    this.apollo.mutate({
      variables: {
        partnerId: "shf",
        playlistId: "8l23250c748dcce06270b226",
        filePath: files[0].key
      },
      mutation: gql`
        mutation uploadImageToPlaylist(
          $partnerId: ID!
          $playlistId: ID!
          $filePath: String!
        ) {
          uploadImageToPlaylist(
            partnerId: $partnerId
            playlistId: $playlistId
            filePath: $filePath
          ){
            id
          }
        }
      `
    }).subscribe((results) => {
      let data: any = results.data;
      let ids: any = [data.id];
      console.log(results);
      this.s3Loading = false;
      this.splogLoading = true;
      return ids;
    });
  }
}