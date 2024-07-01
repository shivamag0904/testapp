import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './src/components/header/header.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HomesComponent } from './src/components/homes/homes.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
   await TestBed.configureTestingModule({
      declarations: [AppComponent,HeaderComponent,HomesComponent],
      imports:[HttpClientTestingModule]
    }).compileComponents();

    
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});