import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentimentTabComponent } from './sentiment-tab.component';

describe('SentimentTabComponent', () => {
  let component: SentimentTabComponent;
  let fixture: ComponentFixture<SentimentTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SentimentTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SentimentTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
