import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EmployeeSummaryEntity } from 'src/app/reducers/employees-summary.reducer';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  @Input() employees: EmployeeSummaryEntity[] = [];
  @Input() selected: EmployeeSummaryEntity = null;

  @Output() employeeSelected = new EventEmitter<EmployeeSummaryEntity>();
  constructor() { }

  ngOnInit(): void {
  }

  onEmployeeSelected(employee: EmployeeSummaryEntity) {
    this.employeeSelected.emit(employee);
  }

}
