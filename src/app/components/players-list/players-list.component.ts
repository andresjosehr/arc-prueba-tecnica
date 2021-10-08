import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { PlayersService } from 'src/app/services/players/players.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Player } from 'src/app/interfaces/player';
import { TeamsService } from 'src/app/services/teams/teams.service';
import { Team } from 'src/app/interfaces/team';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';



@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PlayersListComponent implements OnInit {

  displayedColumnsPlayer = ['Position Color', 'ID', 'First Name', 'Last Name', 'Height Inches', 'Height Feet', 'Weight Pounds', 'Position']; 
  displayedColumnsTeam   = ['Abbreviation', 'City', 'Conference', 'Division', 'Full Name', 'ID', 'Name']
  dataSource: Array <Player>= [];
  dataSourceFiltered: Array <Player>= [];
  colorPositions: {[key: string]: string} = {
    "G":    "#a8423b",
    "F":    "#3ba84f",
    "C-F":  "#7c3ba8",
    "C":    "#a1a83b",
    "G-F":	"#3b8fa8",
    "F-C":	"#a87b3b",
  }
  expandedElement!: Player | null;
  team!: Team | undefined;

  filterFormGroup!: FormGroup;
  meta!: {
    current_page: number
    next_page: number
    per_page: number
    total_count: number
    total_pages: number
  }
  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  constructor(
    private playersService: PlayersService,
    private teamsService: TeamsService,
    private formBuilder: FormBuilder,
    private renderer: Renderer2, 
    private elem: ElementRef
  ) { }

  ngOnInit(): void {
    this.getPlayers();
    this.initForm();
  }

  

  initForm():void{
    this.filterFormGroup = this.formBuilder.group({
      first_name: [''],
      last_name: [''],
      position: [''],
    });

    // this.filterFormGroup.valueChanges.subscribe(values => this.filterPlayers(values))
  }

  getPlayers(perPage=25, page=1):void{
    this.playersService.getPlayers(perPage, page).subscribe((response: any) =>{
      this.dataSource = response.data;
      this.dataSourceFiltered = response.data;
      this.meta=response.meta

      const list = this.elem.nativeElement.querySelectorAll('.mat-paginator-range-label');
      list[0].innerHTML = 'Page: ' + this.meta.current_page.toString();

    })
  }

  getTeamID(teamID: number): void{
    this.team=undefined
    this.teamsService.getTeam(teamID).subscribe((response: any) =>{
      this.team=response
    })
  }

  filterPlayers():void{

    const values = this.filterFormGroup.value
    
    this.dataSourceFiltered = this.dataSource.filter((player: Player) => {
      return values.first_name!='' ? player.first_name.toLowerCase().includes(values.first_name.toLowerCase()) : true
    }).filter((player: Player) => {
      return values.last_name!='' ? player.last_name.toLowerCase().includes(values.last_name.toLowerCase()) : true
    }).filter((player: Player) => {
      return values.position!='' ? player.position.toLowerCase().includes(values.position.toLowerCase()) : true
    });
  }


  
  sortData(sort: any) {
    const data = this.dataSourceFiltered.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSourceFiltered = data;
      return;
    }

    this.dataSourceFiltered = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'ID': return this.compare(a.id, b.id, isAsc);
        case 'First Name': return this.compare(a.first_name, b.first_name, isAsc);
        case 'Last Name': return this.compare(a.last_name, b.last_name, isAsc);
        case 'Height Inches': return this.compare(a.height_inches || 0, b.height_inches || 0, isAsc);
        case 'Height Feet': return this.compare(a.height_feet || 0, b.height_feet || 0, isAsc);
        case 'Weight Pounds': return this.compare(a.weight_pounds || 0, b.weight_pounds || 0, isAsc);
        case 'Position': return this.compare(a.position, b.position, isAsc);
        default: return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }


  pageEvent(event: PageEvent): void{
    console.log(event)
    this.getPlayers(event.pageSize, event.pageIndex+1);
  }

}
