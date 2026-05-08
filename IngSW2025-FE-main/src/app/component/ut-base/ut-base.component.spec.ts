import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtBaseComponent } from './ut-base.component';

describe('UtBaseComponent', () => {
  let component: UtBaseComponent;
  let fixture: ComponentFixture<UtBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UtBaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UtBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
