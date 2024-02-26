import {NgModule} from '@angular/core';
import {LibraryService} from './services/library.service';
import {CourseViewerComponent, ProgressBarComponent} from './components';

@NgModule({
	imports: [CourseViewerComponent, ProgressBarComponent],
	exports: [CourseViewerComponent, ProgressBarComponent],
	providers: [LibraryService],
})
export class LibraryModule {}
