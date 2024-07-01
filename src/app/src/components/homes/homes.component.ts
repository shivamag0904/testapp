import { Component,OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DataService } from '../../services/data.service';
import { DialogService } from '../../services/dialog.service';
import { BookComponent } from '../book/book.component';

@Component({
  selector: 'app-homes',
  templateUrl: './homes.component.html',
  styleUrl: './homes.component.less'
})
export class HomesComponent implements OnInit {

  homes$!: Observable<{ title: string; image: string; location: string; }[]>;

    constructor(private dataService: DataService,private dialogService: DialogService){}

    ngOnInit() {
        
      this.homes$ = this.dataService.getHomes$();

        // this.homes$ = of([
        //   {
        //     title:'Home 1',
        //     image: 'assets/listing.jpg',
        //     location: 'new york'
        //   },
        //   {
        //     title:'Home 2',
        //     image: 'assets/listing.jpg',
        //     location: 'boston'
        //   },
        //   {
        //     title:'Home 3',
        //     image: 'assets/listing.jpg',
        //     location: 'chicago'
        //   }

        // ])
    }

    openDialog(home: any){
      this.dialogService.open(BookComponent, {
        width: '500px',
        data: {home}
      });
    }

}
