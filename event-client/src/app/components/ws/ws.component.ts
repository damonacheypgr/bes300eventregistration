import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { startHub } from 'src/app/actions/ws.actions';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-ws',
  templateUrl: './ws.component.html',
  styleUrls: ['./ws.component.css']
})
export class WsComponent implements OnInit {

  constructor(private store: Store<AppState>) {
    store.dispatch(startHub());
  }

  ngOnInit(): void {
  }

}
