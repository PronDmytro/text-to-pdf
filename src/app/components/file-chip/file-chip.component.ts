import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ConvertedFile } from '@models/converted-file.model';

@Component({
  selector: 'app-file-chip',
  standalone: true,
  imports: [FontAwesomeModule, DatePipe],
  templateUrl: './file-chip.component.html',
  styleUrl: './file-chip.component.scss',
})
export class FileChipComponent {

  @Input({ required: true })
  public file?: ConvertedFile;

  @Output()
  public viewEvent = new EventEmitter<void>();
  @Output()
  public deleteEvent = new EventEmitter<void>();

  protected readonly faEye = faEye;
  protected readonly faTrash = faTrash;


  public onViewClick(): void {
    this.viewEvent.emit();
  }

  public onDeleteClick(): void {
    this.deleteEvent.emit();
  }

}
