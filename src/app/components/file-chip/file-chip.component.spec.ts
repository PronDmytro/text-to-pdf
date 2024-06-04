import { DatePipe } from '@angular/common';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { FileChipComponent } from './file-chip.component';

describe('FileChipComponent', () => {
  let component: FileChipComponent;
  let fixture: ComponentFixture<FileChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, FileChipComponent],
      declarations: [],
      providers: [
        provideExperimentalZonelessChangeDetection(),
        DatePipe,
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(FileChipComponent);
    component = fixture.componentInstance;
    component.file = fileMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display file creation date', () => {
    const datePipe = TestBed.inject(DatePipe);

    const dateEl = fixture.debugElement.query(By.css('.inline-flex')).nativeElement;
    expect(dateEl.textContent.trim()).toContain(datePipe.transform(fileMock.createdAt, 'short'));
  });

  it('should dispatch view event when view icon is clicked', () => {
    const spy = spyOn(component.viewEvent, 'emit');
    console.log(fixture.debugElement.nativeElement);
    const iconEl = fixture.debugElement.query(By.css('.fa-eye')).parent?.nativeElement;
    iconEl.click();
    expect(spy).toHaveBeenCalled();
  });

  it('should dispatch delete event when delete icon is clicked', () => {
    const spy = spyOn(component.deleteEvent, 'emit');
    const iconEl = fixture.debugElement.query(By.css('.fa-trash')).parent?.nativeElement;
    iconEl.click();
    expect(spy).toHaveBeenCalled();
  });
});

const fileMock = { id: 1, file: new Blob(), createdAt: new Date().toISOString() };
