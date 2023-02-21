import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api-service.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  countriesList = []; // Type not specified as by default the type is any[] as we are initializing it.
  listSize: number;
  constructor(private rest: ApiService, private spinner: NgxSpinnerService) { }


  ngOnInit(): void {
    this.listSize = 15;
    this.spinner.show();
    this.getCountries();
  }

  getCountries(){
    this.rest.getCountries().subscribe((res)=>{
      this.countriesList = res;
      this.countriesList.sort((first, second) => first.name.common > second.name.common ? 1 : first.name.common < second.name.common ? -1 : 0);
      console.log(this.countriesList, this.countriesList.length);
      this.spinner.hide();
    },
    (err)=>{
      this.spinner.hide();
    });
  }

  loadMore(){
    this.spinner.show();
    this.listSize += 15;
    setTimeout( () => this.spinner.hide(), 200);
  }

}
