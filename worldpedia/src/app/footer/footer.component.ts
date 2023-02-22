import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  mail: string;
  constructor(private toast: ToastrService) { }

  ngOnInit(): void {
  }

  validateEmail(){
    const regEx = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/g;
    if(regEx.test(this.mail)){
      this.toast.success("Subscribed Successfully!");
      this.mail = undefined;
    }else{
      this.toast.warning("Incorrect Email");
    }
  }

}
