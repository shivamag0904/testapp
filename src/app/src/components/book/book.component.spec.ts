import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookComponent } from './book.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { spyOnClass } from 'jasmine-es6-spies';
import { of } from 'rxjs';
import { DialogService } from '../../services/dialog.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatNativeDateModule } from '@angular/material/core';
import {MatCalendarCellClassFunction, MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;
  let dialogData: { home: any; };
  let dataService: jasmine.SpyObj<DataService>;
  let dialogService: jasmine.SpyObj<MatDialogRef<BookComponent>>;
  let notificationService: jasmine.SpyObj<MatSnackBar>

  const el = (selector:any) => fixture.nativeElement.querySelector(selector);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[FormsModule, MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      declarations: [BookComponent],
      providers:[
        {provide: DataService, useFactory: () => spyOnClass(DataService)},
        {provide: MAT_DIALOG_DATA, useValue:{}},
        {provide: MatDialogRef, useFactory: () => spyOnClass(MatDialogRef)},
        {provide: MatSnackBar,useFactory: () => spyOnClass(MatSnackBar)}
      ]
    })
    .compileComponents();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

beforeEach(async ()=>{
  fixture = TestBed.createComponent(BookComponent);
  dialogData = TestBed.get(MAT_DIALOG_DATA);
  component = fixture.componentInstance;
  dataService = TestBed.get(DataService);
  dialogService = TestBed.get(MatDialogRef);
  notificationService = TestBed.get(MatSnackBar);

  const homes = require('../../../../assets/homes.json');
  dialogData.home = homes[0]; 
  fixture.detectChanges();

});
  it('should show title',()=>{
   
    expect(el('[data-test="title"]').textContent).toContain('Book Home 1');
  });
  
  
  it('should show price',()=>{
    expect(el('[data-test="price"]').textContent).toContain('$123 per night');
  });
  
  it('should show check in date field',()=>{
    expect(el('[data-test="check-in"]')).toBeTruthy();
  });

  it('should show check out date field',() =>{
    expect(el('[data-test="check-out"]')).toBeTruthy();
  });

  it('should show total',()=>{

    // user enter check in date: 12/20/19
    const checkIn = el('[data-test="check-in"] input');
    checkIn.value = '12/20/19';
    checkIn.dispatchEvent(new Event('input'));

    // user enter check out data: 12/23/19
    const checkOut = el('[data-test="check-out"] input');
    checkOut.value = '12/23/19';
    checkOut.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    // assert that the total shows 3*123 = 369
    expect(el('[data-test="total"]').textContent).toContain('Total: $369');

  });
  
  it('should show book home after clicking the book',()=>{

    dataService.bookHome$.and.returnValue(of(null));

    // user enter check in date: 12/20/19
    const checkIn = el('[data-test="check-in"] input');
    checkIn.value = '12/20/19';
    checkIn.dispatchEvent(new Event('input'));

    // user enter check out data: 12/23/19
    const checkOut = el('[data-test="check-out"] input');
    checkOut.value = '12/23/19';
    checkOut.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    //click the button
    el('[data-test="book-btn"] button').click();

    //assert that the data service was used to book the home
    expect(dataService.bookHome$).toHaveBeenCalled();

  });

  it('should close the dialog and show notification after clicking the book btn',()=>{

    dataService.bookHome$.and.returnValue(of(null));

    // user enter check in date: 12/20/19
    const checkIn = el('[data-test="check-in"] input');
    checkIn.value = '12/20/19';
    checkIn.dispatchEvent(new Event('input'));

    // user enter check out data: 12/23/19
    const checkOut = el('[data-test="check-out"] input');
    checkOut.value = '12/23/19';
    checkOut.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    //click the button
    el('[data-test="book-btn"] button').click();

    //assert that the data service was used to book the home
    expect(dialogService.close).toHaveBeenCalled();
    expect(notificationService.open).toHaveBeenCalled();

  });



});
