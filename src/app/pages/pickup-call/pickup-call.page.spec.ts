import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PickupCallPage } from './pickup-call.page';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';

describe('PickupCallPage', () => {
  let component: PickupCallPage;
  let fixture: ComponentFixture<PickupCallPage>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ PickupCallPage ],
      imports: [
        IonicModule.forRoot(),
        AppRoutingModule
      ]
    })

    fixture = TestBed.createComponent(PickupCallPage);
    router = TestBed.get(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should go to home on create new pickup call', () => {
    spyOn(router, 'navigate');

    component.newPickupCall();

    expect(router.navigate).toHaveBeenCalledWith(['home']);
  });
});
