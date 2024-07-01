import { TestBed } from '@angular/core/testing';
import { DataService } from './data.service';
import { HttpClient} from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
describe('DataService', () => {
  let dataService: DataService;
  let httpClient:HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    dataService = TestBed.inject(DataService);
  });

  it('should be return the list of homes', () => {


    //@Spy on and mock the httpClient;
    httpClient = TestBed.get(HttpClient);
    const homesMock = [
      {
            title:'Home 1',
            image: 'assets/listing.jpg',
            location: 'new york'
          },
          {
            title:'Home 2',
            image: 'assets/listing.jpg',
            location: 'boston'
          },
          {
            title:'Home 3',
            image: 'assets/listing.jpg',
            location: 'chicago'
          }
    ];
    spyOn(httpClient, 'get').and.returnValue(of(homesMock));

    //@Use our services to gethomes
    dataService = TestBed.get(DataService);
    const spy = jasmine.createSpy('spy');
    dataService.getHomes$().subscribe(spy);


    //@Verify the service returned the mocked data
    expect(spy).toHaveBeenCalledWith(homesMock);

    //@Verify the service called the correct http endpoint
    expect(httpClient.get).toHaveBeenCalledWith('../../../../assets/homes.json');
  });
});
