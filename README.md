# TextToPdf

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

# Project Structure

### Main structure

* The project is structured into different components which includes:
* AppComponent (acts as the root component)
* ConvertFormComponent
* FileChipComponent
* LoaderComponent
* NgxExtendedPdfViewerComponent - Used from the ngx-extended-pdf-viewer package to view PDF files.

### Core

This project uses Angular 18.0.0 and TypeScript 5.4.2 for the development.

The project utilizes the following packages to optimize the application:

* ngx-indexed-db: Provides an easy-to-use API to interact with IndexedDB
* ng2-pdfjs-viewer: For viewing PDF documents.
* ngx-toastr: Used for pop-up messages.

### Angular Services

The services are injected which help to keep the code clean and prepare data for the components:

* PdfService service is being is used for functionalities related to PDF conversion and file management.
* LoadingService service is being used for setting and getting the loading state of the application.

### Angular Models

The project uses the following models:

* ConvertedFile model represents the structure of a converted PDF file.

### Angular Components

The project is divided into the following components to neatly segment functionality:

* AppComponent: The main app component which incorporates other components and services. It contains the main layout and it manages the processes of converting texts to PDF, viewing and deleting files.
* ConvertFormComponent: This component presumably handles conversion form related actions.
* FileChipComponent: This component presumably handles listing and selection of converted files.
* LoaderComponent: A simple loading spinner component used to indicate data loading or processing events.
