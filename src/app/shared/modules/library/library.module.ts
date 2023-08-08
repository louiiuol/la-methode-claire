import {NgModule} from '@angular/core';
import {LibraryResource} from './services/library.resource';
import {LibraryService} from './services/library.service';
import {CourseViewerComponent, ProgressBarComponent} from './components';

@NgModule({
	imports: [CourseViewerComponent, ProgressBarComponent],
	exports: [CourseViewerComponent, ProgressBarComponent],
	providers: [LibraryResource, LibraryService],
})
export class LibraryModule {}
