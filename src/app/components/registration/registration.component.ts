import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { especialChars } from 'src/app/form-validators/especial-chars.validator';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { DecimalPipe } from "@angular/common";
import { animate, style, transition, trigger } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../general/confirm-dialog/confirm-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalService } from 'src/app/services/global/global.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  animations: [
    trigger(
      'inOutAnimation', 
      [
        transition( ':enter', [
            style({ transform: "translateY(-50px)", opacity: 0, height: 0, marginBottom: 0 }),
            animate('500ms cubic-bezier(0.35, 0, 0.25, 1)',  style({ transform: "translateY(0px)", opacity: 1, height: 94, marginBottom: 20 }))
          ]
        ),
        transition( ':leave',  [
            style({ transform: "translateY(0px)", opacity: 1, height: 94, marginBottom: 20 }),
            animate('500ms cubic-bezier(0.35, 0, 0.25, 1)',  style({ transform: "translateY(-20px)", opacity: 0, height: 0, marginBottom: 0 }))
          ]
        )
      ]
    )
  ]
})
export class RegistrationComponent implements OnInit, OnDestroy {

  firstFormGroup!: FormGroup;
  positionFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;

  isEditable: boolean=true;
  positions = ["A", "B", "C", "D"]

  displayedColumns = ["Abbreviation", "Converence", "Comments", "Team Name", "City", "Actions"];
  teams: any = new MatTableDataSource([]);
  teamFormGroup!: FormGroup;
  searchFormGroup!: FormGroup;
  dataSource = new MatTableDataSource<any>();
  action: "create" | "edit" = "create";
  teamToEdit!: any;

  private _unsubscribeAll!: Subject<any>;
  
  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private globalService: GlobalService,
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.initForms();
    registerLocaleData(es);

    this.teamFormGroup = this.formBuilder.group({
      abbreviation: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      converence: ['', Validators.required],
      comments: ['', Validators.required],
      team_name: ['', [Validators.required, Validators.minLength(10)]],
      city: ['', Validators.required]
    })

    this.searchFormGroup = this.formBuilder.group({
      term: ["", Validators.required],
      orderBy: ["", Validators.required],
      orderType: ["", Validators.required]
    });

    this.secondFormGroup = this.formBuilder.group({
      teams: ["", Validators.required]
    });
    
  }

  initForms(){

    this.firstFormGroup= this.formBuilder.group({
      first_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), especialChars()]],
      last_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), especialChars() ]],
      height_inches: ['', [Validators.max(10)]],
      height_feet: ['', [Validators.max(10)]],
      weight_pounds: ['', [Validators.max(10)]],
      position: ['', Validators.required],
      birth_date: [''],
      age: [''],
    });

    this.firstFormGroup.get('first_name')?.valueChanges
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((first_name: string) =>{
      this.firstFormGroup.get('first_name')?.setValue(first_name.toUpperCase(),{emitEvent: false});
    });

    this.firstFormGroup.get('last_name')?.valueChanges
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((last_name: string) =>{
      this.firstFormGroup.get('last_name')?.setValue(last_name.toUpperCase(),{emitEvent: false});
    });

    this.firstFormGroup.get('birth_date')?.valueChanges
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((birth_date: string) =>{
      this.firstFormGroup.get('age')?.setValue(this.getAge(birth_date) ,{emitEvent: false});
    });
    
    this.firstFormGroup.get('age')?.disable()


    this.secondFormGroup= this.formBuilder.group({
      secondCtrl: ['']
    });

  }

  setTwoNumberDecimal($event: any) {
    $event.target.value = parseFloat($event.target.value).toFixed(2);
  }

  getAge(date: string): number{

    var dob = new Date(date);  
    
    var month_diff = Date.now() - dob.getTime();  
    
    var age_dt = new Date(month_diff);   
    
    var year = age_dt.getUTCFullYear();  

    var age = Math.abs(year - 1970);  
    
    return age;
  }


  saveTeam(){

    if(this.teamFormGroup.invalid){
      return this.teamFormGroup.markAllAsTouched();
    }

    if(this.action=="create"){


        this.teams.data.push({id: new Date().valueOf(), ...this.teamFormGroup.value});
        this.dataSource = new MatTableDataSource(this.teams.data);
        this.secondFormGroup.get("teams")?.setValue(this.dataSource.data)
        this.teamFormGroup.reset();
        this.teamFormGroup.markAsPristine();
        this.teamFormGroup.markAsUntouched();
        this.globalService.openSnackbar("Item Added", "green-snackbar");

    } else if(this.action='edit'){

      const data = {
        id: this.teamToEdit.id,
        abbreviation: this.teamFormGroup.get("abbreviation")?.value,
        converence: this.teamFormGroup.get("converence")?.value,
        comments: this.teamFormGroup.get("comments")?.value,
        team_name: this.teamFormGroup.get("team_name")?.value,
        city: this.teamFormGroup.get("city")?.value
      }
      
      
        this.teams.data = this.teams.data.map((team: any) => team.id == this.teamToEdit.id ? data : team );
        this.dataSource = new MatTableDataSource(this.teams.data);
        this.secondFormGroup.get("teams")?.setValue(this.dataSource.data)
        this.teamFormGroup.reset();
        this.teamFormGroup.markAsPristine();
        this.teamFormGroup.markAsUntouched();

        this.globalService.openSnackbar("Actualizado Exitosaente", "green-snackbar");
      
    }
  }
  
  editTeam(team: any){

    this.action="edit";
    this.teamToEdit=team

    this.teamFormGroup = this.formBuilder.group({
      abbreviation: [team.abbreviation, [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      converence: [team.converence, Validators.required],
      comments: [team.comments, Validators.required],
      team_name: [team.team_name, [Validators.required, Validators.minLength(10)]],
      city: [team.city, Validators.required]
    })
  }

  cancel(){
    this.teamFormGroup.reset();
    this.teamFormGroup.markAsPristine();
    this.teamFormGroup.markAsUntouched();
    this.action="create";
  }


  confirmDelete(teamID: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: 300,
      data: {
        title: 'Are you sure to eliminate this Team?',
        option1: 'Cancelar',
        option2: 'Eliminar'
      }
    });

    dialogRef.afterClosed().pipe(takeUntil(this._unsubscribeAll)).subscribe(result => {

      this.globalService.openSnackbar("Eliminado exitosamente", "green-snackbar");
          this.teams.data = this.teams.data.filter((team: any) => team.id!=teamID)
          this.dataSource = new MatTableDataSource(this.teams.data);
          this.secondFormGroup.get("teams")?.setValue(this.dataSource.data)
    });
  }



  ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }


}
