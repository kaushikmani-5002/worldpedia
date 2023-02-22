import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchText: string = "";
  @Output() search = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

}
