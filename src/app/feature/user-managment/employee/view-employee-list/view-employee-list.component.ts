import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router'
import { EmployeeService } from 'src/app/core/employee/employee.service';

@Component({
  selector: 'app-view-employee-list',
  templateUrl: './view-employee-list.component.html',
  styleUrls: ['./view-employee-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewEmployeeListComponent implements OnInit, OnDestroy {
  
  private destroy$ = new Subject<void>();

  viewEmp: any 

  constructor(private _empServices: EmployeeService, private _activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this._activeRoute.snapshot.params['id']

    if(id) {
      
      this._empServices.viewEmpById(id).pipe(takeUntil(this.destroy$)).subscribe(res => {
        
          this.viewEmp = res.data
          console.log(this.viewEmp, 'res');
         
      })
    }

  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

}
