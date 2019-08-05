import { Component, OnInit } from '@angular/core';
import { ImageService } from '../image.service';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.css']
})
export class ImageUploaderComponent implements OnInit {

  fileData: File = null;
  previewUrl:any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;


  constructor(private imageService: ImageService) { }

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }

  preview() {
    // Show preview 
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
 
    var reader = new FileReader();      
    reader.readAsDataURL(this.fileData); 
    reader.onload = (_event) => { 
      this.previewUrl = reader.result; 
    }
  }

  getAllImages=()=>{
    this.imageService.getAllImage().subscribe(
      (res)=>{
        console.log(res);

      }, (err)=>{
        console.log(err);
      }
    )
  } 

  onSubmit() {
    this.imageService.uploadImage(this.fileData).subscribe(
      (res)=>{
        console.log(res);
          this.uploadedFilePath = res.data.filePath;
          alert('SUCCESS !!');
      },
      (err)=>{
        console.log(err);
      }
    )
  }

  ngOnInit() {
  }


  

}

