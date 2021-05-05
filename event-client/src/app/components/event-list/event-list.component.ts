import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventSummaryEntity } from 'src/app/reducers/events-summary.reducer';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  @Input() events: EventSummaryEntity[] = [];
  @Input() selected: EventSummaryEntity = null;
  @Output() eventSelected = new EventEmitter<EventSummaryEntity>();
  constructor() { }

  ngOnInit(): void {
  }

  onEventSelected(event: EventSummaryEntity) {
    this.eventSelected.emit(event);
  }

}
