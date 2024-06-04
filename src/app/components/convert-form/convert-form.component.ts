import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-convert-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './convert-form.component.html',
  styleUrl: './convert-form.component.scss',
})
export class ConvertFormComponent {

  @Output()
  public convertEvent = new EventEmitter<string>();

  public textControl = new FormControl<string>('');

  public onConvert(): void {
    if (!this.textControl.value?.trim().length) {
      return;
    }
    this.convertEvent.emit(this.textControl.value);
  }


}
