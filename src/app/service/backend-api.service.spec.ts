import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { BackendApiService } from './backend-api.service';
describe('BackendApiService', () => {
  let service: BackendApiService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BackendApiService]
    });
    service = TestBed.get(BackendApiService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
  it(`baseUrl has default value`, () => {
    expect(service.baseUrl).toEqual(
      `https://tasksmanager-302f5.firebaseio.com/Task.json`
    );
  });
  describe('getDetails', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.get(HttpTestingController);
      service.getDetails().subscribe(res => {
        expect(res).toEqual([]);
      });
      const req = httpTestingController.expectOne(
        'https://tasksmanager-302f5.firebaseio.com/Task.json'
      );
      expect(req.request.method).toEqual('GET');
      req.flush([]);
      httpTestingController.verify();
    });
  });
});
