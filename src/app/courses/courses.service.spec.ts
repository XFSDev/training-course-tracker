import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CoursesService } from './courses.service';
import { Course } from './course';

const baseUrl = 'http://localhost:3000';

describe('CourseService', () => {
  let httpTestingController: HttpTestingController;
  let service: CoursesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CoursesService]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(CoursesService);
  });

  describe('addCourse', () => {
    it('should return course passed, with a post call to the correct URL', () => {
      const course = { id: 1, title: 'ABC', instructor: 'John', path: 'A', source: 'B', yearCompleted: '2019' };

      service.addCourse(course).subscribe((data: Course) => {
        expect(data.id).toBe(1);
        expect(data).toEqual(course);
      });

      const req = httpTestingController.expectOne(`${baseUrl}/courses`);
      req.flush(course);
      expect(req.request.method).toBe('POST');
      httpTestingController.verify();
    });
  });

  describe('deleteCourse', () => {
    it('should return deleted course with a delete call to the correct URL', () => {
      const course = { id: 1, title: 'ABC', instructor: 'John', path: 'A', source: 'B', yearCompleted: '2019' };

      service.deleteCourse(1).subscribe((data: Course) => {
        expect(data.id).toBe(1);
        expect(data).toEqual(course);
      });

      const req = httpTestingController.expectOne(`${baseUrl}/courses/1`);
      req.flush(course);
      expect(req.request.method).toBe('DELETE');
      httpTestingController.verify();
    });
  });

  describe('getCourse', () => {
    it('should return requested course with a get call to the correct URL', () => {
      const course = { id: 1, title: 'ABC', instructor: 'John', path: 'A', source: 'B', yearCompleted: '2019' };

      service.getCourse(1).subscribe((data: Course) => {
        expect(data.id).toBe(1);
        expect(data).toEqual(course);
      });

      const req = httpTestingController.expectOne(`${baseUrl}/courses/1`);
      req.flush(course);
      expect(req.request.method).toBe('GET');
      httpTestingController.verify();
    });
  });

  describe('getCourses', () => {
    it('should return courses with a get call to the correct URL', () => {
      const courses: Course[] = [
        { id: 1, title: 'ABC', instructor: 'John', path: 'A', source: 'B', yearCompleted: '2019' },
        { id: 2, title: 'GHI', instructor: 'Jack', path: 'A', source: 'B', yearCompleted: '2019' },
        { id: 3, title: 'DEF', instructor: 'Jim', path: 'A', source: 'B', yearCompleted: '2019' },
      ];

      service.getCourses().subscribe((data: Course[]) => {
        expect(data.length).toBe(3);
        expect(data[0].id).toBe(1);
        expect(data[1].id).toBe(2);
        expect(data[2].id).toBe(3);
        expect(data).toEqual(courses);
      });

      const req = httpTestingController.expectOne(`${baseUrl}/courses`);
      req.flush(courses);
      expect(req.request.method).toBe('GET');
      httpTestingController.verify();
    });
  });

  describe('getCoursesSorted', () => {
    it('should return courses, sorted ascending by title with a get call to the correct URL', () => {
      const courses: Course[] = [
        { id: 1, title: 'ABC', instructor: 'John', path: 'A', source: 'B', yearCompleted: '2019' },
        { id: 3, title: 'DEF', instructor: 'Jim', path: 'A', source: 'B', yearCompleted: '2019' },
        { id: 2, title: 'GHI', instructor: 'Jack', path: 'A', source: 'B', yearCompleted: '2019' },
      ];

      service.getCoursesSorted().subscribe((data: Course[]) => {
        expect(data.length).toBe(3);
        expect(data[0].id).toBe(1);
        expect(data[1].id).toBe(3);
        expect(data[2].id).toBe(2);
        expect(data).toEqual(courses);
      });

      const req = httpTestingController.expectOne(`${baseUrl}/courses?_sort=title&_order=asc`);
      req.flush(courses);
      expect(req.request.method).toBe('GET');
      httpTestingController.verify();
    });
  });

  describe('getCoursesPaged', () => {
    it('should return courses for the requested page and page size, sorted ascending by title with a get call to the correct URL', () => {
      const courses: Course[] = [
        { id: 1, title: 'ABC', instructor: 'John', path: 'A', source: 'B', yearCompleted: '2019' },
        { id: 3, title: 'DEF', instructor: 'Jim', path: 'A', source: 'B', yearCompleted: '2019' },
        { id: 2, title: 'GHI', instructor: 'Jack', path: 'A', source: 'B', yearCompleted: '2019' },
      ];
      const current = 1;
      const pageSize = 3;

      service.getCoursesPaged(current, pageSize).subscribe((data: Course[]) => {
        expect(data.length).toBe(3);
        expect(data[0].id).toBe(1);
        expect(data[1].id).toBe(3);
        expect(data[2].id).toBe(2);
        expect(data).toEqual(courses);
      });

      const req = httpTestingController.expectOne(`${baseUrl}/courses?_sort=title&_order=asc&_page=${current}&_limit=${pageSize}`);
      req.flush(courses);
      expect(req.request.method).toBe('GET');
      httpTestingController.verify();
    });
  });

  describe('saveCourse, with id', () => {
    it('should return requested course with a put call to the correct URL', () => {
      const course = { id: 1, title: 'ABC', instructor: 'John', path: 'A', source: 'B', yearCompleted: '2019' };

      service.saveCourse(course).subscribe((data: Course) => {
        expect(data.id).toBe(1);
        expect(data).toEqual(course);
      });

      const req = httpTestingController.expectOne(`${baseUrl}/courses/1`);
      req.flush(course);
      expect(req.request.method).toBe('PUT');
      httpTestingController.verify();
    });
  });

  describe('saveCourse, without id', () => {
    it('should return requested course with a post call to the correct URL', () => {
      const course = { id: null, title: 'ABC', instructor: 'John', path: 'A', source: 'B', yearCompleted: '2019' };
      const returns = { id: 1, title: 'ABC', instructor: 'John', path: 'A', source: 'B', yearCompleted: '2019' };

      service.saveCourse(course).subscribe((data: Course) => {
        expect(data.id).toBe(1);
        expect(data).toEqual(returns);
      });

      const req = httpTestingController.expectOne(`${baseUrl}/courses`);
      req.flush(returns);
      expect(req.request.method).toBe('POST');
      httpTestingController.verify();
    });
  });

  describe('deleteCourse', () => {
    it('should return requested course with a get call to the correct URL', () => {
      const course = { id: 1, title: 'ABC', instructor: 'John', path: 'A', source: 'B', yearCompleted: '2019' };

      service.deleteCourse(1).subscribe((data: Course) => {
        expect(data.id).toBe(1);
        expect(data).toEqual(course);
      });

      const req = httpTestingController.expectOne(`${baseUrl}/courses/1`);
      req.flush(course);
      expect(req.request.method).toBe('DELETE');
      httpTestingController.verify();
    });
  });

  describe('updateCourse', () => {
    it('should return updated course with a put call to the correct URL', () => {
      const course = { id: 1, title: 'ABC', instructor: 'John', path: 'A', source: 'B', yearCompleted: '2019' };

      service.updateCourse(course).subscribe((data: Course) => {
        expect(data.id).toBe(1);
        expect(data).toEqual(course);
      });

      const req = httpTestingController.expectOne(`${baseUrl}/courses/1`);
      req.flush(course);
      expect(req.request.method).toBe('PUT');
      httpTestingController.verify();
    });
  });
});
