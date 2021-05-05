import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { reducers } from './reducers';
import { HomeComponent } from './components/home/home.component';
import { SyncComponent } from './components/sync/sync.component';
import { AsyncComponent } from './components/async/async.component';
import { WsComponent } from './components/ws/ws.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { EmployeeSummaryEffects, EventSummaryEffects } from './effects';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventRegisterSyncComponent } from './components/event-register-sync/event-register-sync.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SyncComponent,
    AsyncComponent,
    WsComponent,
    EmployeeListComponent,
    EventListComponent,
    EventRegisterSyncComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([EmployeeSummaryEffects, EventSummaryEffects]),
    StoreDevtoolsModule.instrument(),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
