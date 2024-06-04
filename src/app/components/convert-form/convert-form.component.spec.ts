import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { ConvertFormComponent } from './convert-form.component';

describe('ConvertFormComponent', () => {
  let component: ConvertFormComponent;
  let fixture: ComponentFixture<ConvertFormComponent>;
  let convertEventSpy: jasmine.Spy;
  let textarea_el: HTMLTextAreaElement;
  let button_el: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, ConvertFormComponent],
      providers: [
        provideExperimentalZonelessChangeDetection(),
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ConvertFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    convertEventSpy = spyOn(component.convertEvent, 'emit');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not emit convertEvent for empty string', () => {
    textarea_el = fixture.debugElement.query(By.css('textarea')).nativeElement;
    textarea_el.value = '';
    textarea_el.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    button_el = fixture.debugElement.query(By.css('button')).nativeElement;
    button_el.click();

    expect(convertEventSpy).not.toHaveBeenCalled();
  });

  it('should emit convertEvent when submitting form', () => {
    textarea_el = fixture.debugElement.query(By.css('textarea')).nativeElement;
    textarea_el.value = 'test-string';
    textarea_el.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    button_el = fixture.debugElement.query(By.css('button')).nativeElement;
    button_el.click();

    expect(convertEventSpy).toHaveBeenCalledWith('test-string');
  });

  it('should not emit convertEvent for empty or whitespace string', () => {
    textarea_el = fixture.debugElement.query(By.css('textarea')).nativeElement;
    textarea_el.value = '   '; // Only whitespace
    textarea_el.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    button_el = fixture.debugElement.query(By.css('button')).nativeElement;
    button_el.click();

    expect(convertEventSpy).not.toHaveBeenCalled();
  });

});
