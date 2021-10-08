import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  innerHeight!: string;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerHeight = 506 < window.innerHeight ? (window.innerHeight-60)+'px': 'auto';
  }

  constructor() { }

  ngOnInit(): void {
    this.innerHeight = 506 < window.innerHeight ? (window.innerHeight-60)+'px': 'auto';
  }

}
