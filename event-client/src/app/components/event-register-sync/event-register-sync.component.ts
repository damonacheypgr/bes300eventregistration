import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EmployeeSummaryEntity } from 'src/app/reducers/employees-summary.reducer';
import { EventSummaryEntity } from 'src/app/reducers/events-summary.reducer';

@Component({
  selector: 'app-event-register-sync',
  templateUrl: './event-register-sync.component.html',
  styleUrls: ['./event-register-sync.component.css']
})
export class EventRegisterSyncComponent implements OnInit {

  @Input() selectedEvent: EventSummaryEntity = null;
  @Input() selectedEmployee: EmployeeSummaryEntity = null;
  @Input() bothSelected = false;

  @Output() register = new EventEmitter<{ event: EventSummaryEntity, employee: EmployeeSummaryEntity }>();
  @Output() startOver = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onRegister(event: EventSummaryEntity, employee: EmployeeSummaryEntity) {
    this.register.emit({ employee, event });
  }

  onStartOver() {
    this.startOver.emit();
  }

}
