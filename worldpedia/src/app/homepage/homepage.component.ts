import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  countriesList = []; // Type not specified as by default the type is any[] as we are initializing it.
  listSize: number;
  noResultsFound: boolean = undefined;
  currentCountry: any;
  constructor(private rest: ApiService, private spinner: NgxSpinnerService, private toast: ToastrService) { }


  ngOnInit(): void {
    this.listSize = 15;
    this.spinner.show();
    this.getCountries();
  }

  getCountries(){
    this.rest.getCountries().subscribe((res)=>{
      this.countriesList = res;
      if(res.length > 0){
        this.noResultsFound = false;
        this.countriesList.sort((first, second) => first.name.common > second.name.common ? 1 : first.name.common < second.name.common ? -1 : 0);
      }else{
        this.noResultsFound = true;
      }
      // console.log(this.countriesList, this.countriesList.length);
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

  searchCountries($event){
    this.spinner.show();
    let searchtext = $event;
    if(typeof $event == 'object'){
      // handle mobile input
      // console.log($event.target.value)
      if($event.target.value == ""){
        this.getCountries();
        return;
      }
      searchtext = $event.target.value;
      this.resetListSize();
    }
    this.rest.searchCountry(searchtext).subscribe((res)=> {
      this.noResultsFound = false;
      this.countriesList = res;
      this.countriesList.sort((first, second) => first.name.common > second.name.common ? 1 : first.name.common < second.name.common ? -1 : 0);
      // console.log(this.countriesList);
      this.resetListSize();
      this.spinner.hide();
    },
    (err)=>{
      this.noResultsFound = true;
      this.toast.warning("No results found");
      this.spinner.hide();
    });
  }

  resetListSize(){
    this.listSize = 15;
  }

  openModal(item: any){
    // console.log(item.languages);
    this.currentCountry = item;
    setTimeout(()=>{
      document.getElementById('openModal').click();
    }, 200);
  }

  returnPopulation(value: number){
     // Nine Zeroes for Billions
     return Math.abs(Number(value)) >= 1.0e+9
     ? (Math.abs(Number(value)) / 1.0e+9).toFixed(2) + "B"
     // Six Zeroes for Millions 
     : Math.abs(Number(value)) >= 1.0e+6
     ? (Math.abs(Number(value)) / 1.0e+6).toFixed(2) + "M"
     // Three Zeroes for Thousands
     : Math.abs(Number(value)) >= 1.0e+3
     ? (Math.abs(Number(value)) / 1.0e+3).toFixed(2) + "K"
     : Math.abs(Number(value));
  }

  returnArray(value: Object){
    if(value){
      var arr = [...Object.values(value)];
      // console.log(arr);
    }
    return arr;
  }

  returnCurrency(value: any){
    if(value){
      const result = Object.values(value).map((ele)=> ele['name']);
      // console.log(typeof result);
      return [...result];
    }
  }

}
