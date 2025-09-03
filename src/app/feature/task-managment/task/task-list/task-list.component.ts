import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskService } from 'src/app/core/services/task.services';
import { TaskFormInterface } from 'src/app/shared/interface/task.interface';
import { ConfirmDialogComponent } from 'src/app/shared/component/confirm-dialog/confirm-dialog.component'; // apni path k hisaab se

@Component({
  selector: 'task-list',
  templateUrl: 'task-list.component.html',
  styleUrls: ['task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  displayedColumns: string[] = [
    'no', 'userEmployeeId',
    'status', 'description', 'action'
  ];
  dataSource = new MatTableDataSource<TaskFormInterface>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private routes: Router,
    private taskServices: TaskService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getTaskData();

    this.dataSource.filterPredicate = (data: TaskFormInterface, filter: string) => {
      const searchStr = (data.name).toLowerCase();
      return searchStr.includes(filter);
    };
  }

  getTaskData() {
    this.taskServices.getTaskData().subscribe(
      (data: any) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        console.log('Success Data', data);
      },
      (error: any) => {
        console.log('Fetching Error', error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  editTask(task: TaskFormInterface): void {
    this.routes.navigate(['app/task-managment/task/taskForm'], { queryParams: { id: task._id } });
  }

  deleteTask(taskid?: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { message: 'Are you sure you want to delete this Task?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskServices.deleteTaskById(taskid || '').subscribe(
          () => {
            this.dataSource.data = this.dataSource.data.filter((p) => p._id !== taskid);
            this.snackBar.open('✅ Task deleted successfully!', 'Close', {
              duration: 3000,
              panelClass: ['success-snackbar']
            });
          },
          (error: any) => {
            console.error('Error Deleting task:', error);
            this.snackBar.open('❌ Failed to delete task!', 'Close', {
              duration: 3000,
              panelClass: ['error-snackbar']
            });
          }
        );
      }
    });
  }

  viewTask(task: TaskFormInterface) {
    localStorage.setItem('viewtask', JSON.stringify(task));
    this.routes.navigate(['/task/view']);
  }

  goToTaskList() {
    this.routes.navigate(['app/task-managment/task/taskListUnactive']);
  }

  createTask() {
    this.routes.navigate(['app/task-managment/task/taskForm']);
  }

}
