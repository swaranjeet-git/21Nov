import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTransporterListComponent } from './view-transporter-list.component';

describe('ViewTransporterListComponent', () => {
  let component: ViewTransporterListComponent;
  let fixture: ComponentFixture<ViewTransporterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTransporterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTransporterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
