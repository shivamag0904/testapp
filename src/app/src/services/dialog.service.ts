import { ComponentType } from '@angular/cdk/portal';
import { Component, Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';


@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog) { }

  open(component: ComponentType<unknown>, info: MatDialogConfig<any> | undefined) {
    this.dialog.open(component, info);
  }
}
