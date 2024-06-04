import { AsyncPipe } from '@angular/common';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingService } from '@services/loading/loading.service';

import { LoaderComponent } from './loader.component';


describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;
  let loadingService: LoadingService;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [LoaderComponent, AsyncPipe],
      providers: [
        LoadingService,
        provideExperimentalZonelessChangeDetection(),
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoaderComponent);
    loadingService = TestBed.inject(LoadingService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display loader when isLoading$ is true', () => {
    loadingService.setLoadingState(true);
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    const loaderDiv = compiled.querySelector('.loader');

    expect(loaderDiv).toBeTruthy();
    expect(loaderDiv.querySelector('.loader__element')).toBeTruthy();
  });

  it('should not display loader when isLoading$ is false', () => {
    loadingService.setLoadingState(false);
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    const loaderDiv = compiled.querySelector('.loader');

    expect(loaderDiv).toBeNull();
  });

});
