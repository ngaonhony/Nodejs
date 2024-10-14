import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostManagementComponent } from './post-management.component';

describe('PostManagementComponent', () => {
  let component: PostManagementComponent;
  let fixture: ComponentFixture<PostManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
