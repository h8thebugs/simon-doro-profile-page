import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TherapyProcess } from './therapy-process';

describe('TherapyProcess', () => {
  let component: TherapyProcess;
  let fixture: ComponentFixture<TherapyProcess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TherapyProcess],
    }).compileComponents();

    fixture = TestBed.createComponent(TherapyProcess);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
