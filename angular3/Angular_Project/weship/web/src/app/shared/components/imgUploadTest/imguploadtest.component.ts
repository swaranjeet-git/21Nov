import { Component, NgZone, EventEmitter, Output } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Ng2ImgToolsService } from 'ng2-img-tools';
import { forEach } from '@angular/router/src/utils/collection';


@Component({
  selector: 'app-imguploadtest',
  templateUrl: './imguploadtest.component.html',
  styleUrls: ['./imguploadtest.component.css']
})
export class ImageuploadtestComponent {
  @Output('processedFiles')
  processFiles = new EventEmitter();
  resizedExactFilledImage: string = null;
  selectedImage: string = null;

  resizedExactFilledImageTrusted: SafeUrl = null;
  selectedImageTrusted: SafeUrl = null;
  fileReceivedArray: File[] = [];
  uploadedFiles;

  constructor(private ng2ImgToolsService: Ng2ImgToolsService, private sanitizer: DomSanitizer, private zone: NgZone) {
  }
  public fileChange(event: any) {
    console.log(event);
    this.uploadedFiles = event.currentFiles;
  }
  uploadClicked() {
    if (this.uploadedFiles.length > 0) {
      for (let i = 0; i < this.uploadedFiles.length; i++) {
        //console.log("Current File" + event.currentFiles[this.i])
        this.processFile(this.uploadedFiles[i]);
      }
      const tid = setInterval(() => {
        if (this.uploadedFiles.length === this.fileReceivedArray.length) {
          clearInterval(tid);
          this.processFiles.emit(this.fileReceivedArray);
        }
      }, 2000);
    }
  }
  removeImage(index) {
    this.fileReceivedArray.splice(index, 1);
    this.processFiles.emit(this.fileReceivedArray);
  }



  private processFile(file: File) {
    //console.info("processFile :"+ i+" "+ file);
    // if(this.resizedExactFilledImage !== null){
    //   window.URL.revokeObjectURL(this.resizedExactFilledImage);
    // }
    // if(this.selectedImage !== null){
    //   window.URL.revokeObjectURL(this.selectedImage);
    // }

    this.resizedExactFilledImage = "processing";
    this.selectedImage = window.URL.createObjectURL(file);
    this.selectedImageTrusted = this.sanitizer.bypassSecurityTrustUrl(this.selectedImage);
    if (file.size > 102400) {
      this.resizeImage(file);
    } else {
      this.pustFile(file);
    }
  }
  private resizeImage(file: File) {
    this.ng2ImgToolsService.resizeExactFill([file], 450, 700).subscribe(result => {
      this.pustFile(result);
    }, error => {
      console.error("Resize error:", error);
    }
    );
  }

  pustFile(file) {
    this.fileReceivedArray.push(file);
    this.resizedExactFilledImage = window.URL.createObjectURL(file);
    this.resizedExactFilledImageTrusted = this.sanitizer.bypassSecurityTrustUrl(this.resizedExactFilledImage);
  }




}