import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventRegisterSyncComponent } from './event-register-sync.component';

describe('EventRegisterSyncComponent', () => {
  let component: EventRegisterSyncComponent;
  let fixture: ComponentFixture<EventRegisterSyncComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventRegisterSyncComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventRegisterSyncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
