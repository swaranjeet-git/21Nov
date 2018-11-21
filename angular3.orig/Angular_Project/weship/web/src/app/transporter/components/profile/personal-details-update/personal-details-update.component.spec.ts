import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalDetailsUpdateComponent } from './personal-details-update.component';

describe('PersonalDetailsUpdateComponent', () => {
  let component: PersonalDetailsUpdateComponent;
  let fixture: ComponentFixture<PersonalDetailsUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalDetailsUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalDetailsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
