import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransporterDataComponent } from './transporter-data.component';

describe('TransporterDataComponent', () => {
  let component: TransporterDataComponent;
  let fixture: ComponentFixture<TransporterDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransporterDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransporterDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
