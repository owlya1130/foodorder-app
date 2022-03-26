import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModifyOrderQuantityComponent } from './modify-order-quantity.component';

describe('ModifyOrderQuantityComponent', () => {
  let component: ModifyOrderQuantityComponent;
  let fixture: ComponentFixture<ModifyOrderQuantityComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyOrderQuantityComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModifyOrderQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
