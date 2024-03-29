import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';
//
import { TranslateService } from '@ngx-translate/core';
//
//import { setTranslations } from '@c/ngx-translate';
import { TRANSLATIONS } from './i18n/custom-snackbar.component.translations';
import { CustomSnackbarData } from '../../models/custom-snackbar-data';
//
@Component({
  selector: 'custom-snackbar',
  templateUrl: './custom-snackbar.component.html',
  styleUrls: ['./custom-snackbar.component.css']  
})
export class CustomSnackbarComponent {
  constructor(private translate: TranslateService, 
              @Inject(MAT_SNACK_BAR_DATA) public data: CustomSnackbarData) {
              //setTranslations(this.translate, TRANSLATIONS);
   }
}