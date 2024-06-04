import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileChipComponent } from './file-chip.component';

describe('FileChipComponent', () => {
  let component: FileChipComponent;
  let fixture: ComponentFixture<FileChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileChipComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FileChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
