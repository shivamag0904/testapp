import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import moment, { duration } from 'moment';
import { DataService } from '../../services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.less'
})
export class BookComponent implements OnInit {

  checkIn:any;
  checkOut:any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private dataService:DataService,public dialogRef:MatDialogRef<BookComponent>,public snackBar:MatSnackBar){}

  ngOnInit() {
      console.log(this.data);
  }

  calculateTotal(checkIn:any,checkOut:any){

    //console.log(checkIn,checkOut);
    // find the difference btw the dates which will give the number of nights 
      const checkInDate = moment(checkIn, 'MM-DD-YY');
      const checkOutDate = moment(checkOut, 'MM-DD-YY');
      const nights = checkOutDate.diff(checkInDate,'days')

    //multiply the number of night by the price 123*3
    const total = nights * this.data.home.price;
    if(total>0 && total<90000){
      return total;
    }
    else{
      return '--';
    }
  }

  bookHome(){
    this.dataService.bookHome$().subscribe(() => {
      this.dialogRef.close();
      this.snackBar.open('Home booked!','', {
        duration:2000,
      });
    });
  }
}
