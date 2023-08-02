import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TEACHER_ROUTES} from './teacher.routes';
/**
 * Teacher view of the Application.
 * This section is only accessible by authenticated users.
 */
@NgModule({
	imports: [RouterModule.forChild(TEACHER_ROUTES)],
})
export class TeacherModule {}
