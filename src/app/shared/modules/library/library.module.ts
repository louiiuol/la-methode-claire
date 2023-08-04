import {NgModule} from '@angular/core';
import {LibraryResource} from './services/library.resource';
import {LibraryService} from './services/library.service';
import {CourseViewerComponent} from './components/course-viewer.component';

@NgModule({
	imports: [CourseViewerComponent],
	exports: [CourseViewerComponent],
	providers: [LibraryResource, LibraryService],
})
export class LibraryModule {}
