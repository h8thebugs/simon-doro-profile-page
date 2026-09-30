import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RaisedButton } from './raised-button';

describe('RaisedButton', () => {
  let component: RaisedButton;
  let fixture: ComponentFixture<RaisedButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RaisedButton],
    }).compileComponents();

    fixture = TestBed.createComponent(RaisedButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
