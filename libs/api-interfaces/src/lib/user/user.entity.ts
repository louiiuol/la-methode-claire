import {AutoMap} from '@automapper/classes';
import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	BaseEntity,
	ManyToMany,
	JoinTable,
} from 'typeorm';
import {Course} from '../library/courses/course.entity';
import {UserRole} from './user.role';

/**
 ** Entity representing 'users' Table in database
 */
@Entity({
	name: 'users',
})
export class User extends BaseEntity {
	@AutoMap()
	@PrimaryGeneratedColumn()
	uuid: number;

	@AutoMap()
	@Column({
		nullable: true,
	})
	firstName: string;

	@AutoMap()
	@Column({
		nullable: true,
	})
	lastName: string;

	@AutoMap()
	@Column()
	email: string;

	@Column()
	password: string;

	@Column({default: true})
	isActive: boolean;

	@AutoMap()
	@Column({
		type: 'enum',
		enum: UserRole,
		default: UserRole.USER,
	})
	role: UserRole;

	@AutoMap()
	@ManyToMany(() => Course, c => c.users)
	@JoinTable({
		name: 'users_courses',
	})
	courses: Course[];
}
