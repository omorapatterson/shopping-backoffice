import { Component, Input, Output, EventEmitter, OnInit, Inject } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
//
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
//
import { CanDeactivateMixin } from '../../../../../ui/helpers/component-can-deactivate';
import { ConfirmDialogComponent, } from '../../../../../ui/modules/confirm-dialog/components/confirm-dialog/confirm-dialog.component';
import { Mixin } from '../../../../../ui/helpers/mixin-decorator';
import { ErrorHandlingService } from '../../../../../error-handling/services/error-handling.service';
import { HandledError } from '../../../../../error-handling/models/handled-error';
import { ToastrService } from '../../../../../error-handling/services/toastr.service';
import { Link } from '../../models/urls';
import { UrlsService } from '../../services/urls.service';
import { BaseRouteComponent } from '../../../../../routing/components/base-route-component';

const errorKey = 'Error';

const savedMessageKey = 'Saved';

@Component({
  selector: 'new-link',
  templateUrl: './new-link.component.html',
  styleUrls: ['./new-link.component.scss']
})
@Mixin([CanDeactivateMixin])
export class NewLinkComponent implements CanDeactivateMixin {

  data: any = {
    name: '',
  };


  Urls: Array<Link>;

  // Begin Mixin code of the CanDeactivate class
  unsavedChanges = false;

  cancelBtnKey = 'No';

  okBtnKey = 'Yes';

  saveTitleKey = 'Discard Title';

  saveMessageKey = 'Discard Message';

  modalRef: MatDialogRef<ConfirmDialogComponent>;

  canDeactivate: () => Observable<boolean> | boolean;

  dataChanged: () => void;

  // end

  validationErrors: ValidationErrors;

  // @Input() brands: Array<Brand>;TODO

  // @Output() close = new EventEmitter();TODO

  constructor(
    public dialogRef: MatDialogRef<NewLinkComponent>,
    public activatedRoute: ActivatedRoute,
    public urlsService: UrlsService,
    private errorHandlingService: ErrorHandlingService,
    public router: Router,
    private translate: TranslateService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public dialogData: any
  ) {
  }

  submit(data: Link) {
    // this.createUser(data);
    this.dialogRef.close(data);
  }

  cancel() {
    this.close();
  }

  close() {
    this.dialogRef.close();
  }

  createUser(data: Link) {
    this.urlsService.postUrl(data).subscribe(response => {
      this.unsavedChanges = false;
      this.close();
      this.toastr.success(savedMessageKey);
    },
      (error: HandledError) => {
        this.errorHandlingService.handleUiError(errorKey, error, 'url');
        this.validationErrors = error.formErrors;
      });
  }
}
