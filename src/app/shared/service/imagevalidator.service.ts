import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ImagevalidatorService {
  $fileValidationForLanguages = new EventEmitter();
  $fileValidationForMasters = new EventEmitter();
  heightText: any;
  andText: any;
  widthText: any;
  pxText: any;
  typeText: any;
  sizeText: any;

  constructor(private translate: TranslateService) {
    this.heightText = this.translate.instant('HEIGHT_MUST_BE');
    this.andText = this.translate.instant('&_');
    this.widthText = this.translate.instant('WIDTH_MUST_BE');
    this.pxText = this.translate.instant('PX');
    this.typeText = this.translate.instant('PLEASE_SELECT_VALID_FILE');
    this.sizeText = this.translate.instant('FILE_SIZE_MUST_BE_LESS_THAN_1MB');
  }

  validateSingleSelectedImage(event, objData, imgType) {
    const fr = new FileReader();
    const image: any = event.target.files[0];
    const selectedType = event.target.files[0].type;
    if (objData.imageValidator[imgType].type != selectedType) {
      objData.imageValidator[imgType].errorMessage = this.typeText;
    }
    if (objData.imageValidator[imgType].size < image.size) {
      objData.imageValidator[imgType].errorMessage = this.sizeText;
    }
    fr.onload = () => {
      const img = new Image();
      img.onload = () => {
        if (objData.imageValidator[imgType].checkValidation == 'Yes') {
          if (objData.imageValidator[imgType].checkTypeValidation == 'Yes') {
            if (
              objData.imageValidator[imgType].checkHeightValidation == 'Yes' &&
              objData.imageValidator[imgType].height != img.height
            ) {
              objData.imageValidator[imgType].heightError = true;
              objData.imageValidator[imgType].errorMessage =
                this.heightText +
                ' ' +
                objData.imageValidator[imgType].height +
                this.pxText +
                ' ' +
                this.andText +
                ' ' +
                this.widthText +
                ' ' +
                objData.imageValidator[imgType].width +
                this.pxText;
            } else if (
              objData.imageValidator[imgType].checkWidthValidation == 'Yes' &&
              objData.imageValidator[imgType].width != img.width
            ) {
              objData.imageValidator[imgType].widthError = true;
              objData.imageValidator[imgType].errorMessage =
                this.heightText +
                ' ' +
                objData.imageValidator[imgType].height +
                this.pxText +
                ' ' +
                this.andText +
                ' ' +
                this.widthText +
                ' ' +
                objData.imageValidator[imgType].width +
                this.pxText;
            } else {
              objData.imageValidator[imgType].heightError = false;
              objData.imageValidator[imgType].widthError = false;
              objData.imageValidator[imgType].deleteImage = false;
              objData.imageValidator[imgType].src = img.src;
              objData.imageValidator[imgType].errorMessage = false;
            }
          }
        } else {
          objData.imageValidator[imgType].heightError = false;
          objData.imageValidator[imgType].widthError = false;
          objData.imageValidator[imgType].deleteImage = false;
          objData.imageValidator[imgType].src = img.src;
          objData.imageValidator[imgType].errorMessage = false;
        }
      };
      img.src = <string>fr.result;
      console.info(img.src)
    };
    fr.readAsDataURL(image);
  }
  setValidations(panelType, data) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].imageValidator == undefined) {
        data[i].imageValidator = {};
        data[i].imageValidator = JSON.parse(
          localStorage.getItem('file-validators')
        )[panelType];
      }
      for (const key in data[i].imageValidator) {
        if (data[i].imageValidator[key]) {
          if (data[i].imageValidator[key].src == undefined) {
            data[i].imageValidator[key].src = 'assets/images/NA.png';
          } else {
            data[i].imageValidator[key].src = 'assets/images/NA.png';
          }
        }
      }
    }
    this.$fileValidationForLanguages.emit(data);
  }
  getGeneralImageUrl(data, imgSrc) {
   
    for (let i = 0; i < data.length; i++) {
      for (const key in data[i].imageValidator) {
        if (data[i].imageValidator[key]) {
          if (data[i].imageValidator[key].src == undefined) {
            data[i].imageValidator[key].src = 'assets/images/NA.png';
          } else {
            data[i].imageValidator[key].src =
              imgSrc + data[i].imageValidator[key].src;
          }
        }
      }
    }
    console.info(data);
  }
}
