import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactPageComponent } from './fact-page.component';

describe('FactPageComponent', () => {
  let component: FactPageComponent;
  let fixture: ComponentFixture<FactPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
