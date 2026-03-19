import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestService } from '../../services/request.service';
import { RequestType } from '../../models/request.model';

@Component({
  selector: 'app-request-create',
  templateUrl: './request-create.component.html',
  styleUrls: ['./request-create.component.css']
})
export class RequestCreateComponent {
  requestForm: FormGroup;
  requestTypes = Object.values(RequestType);
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private requestService: RequestService) {
    this.requestForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      requestedBy: ['', Validators.required],
      requestType: [RequestType.LEAVE, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.requestForm.invalid) return;
    this.requestService.createRequest(this.requestForm.value).subscribe({
      next: (res) => {
        this.successMessage = 'Request created successfully!';
        this.requestForm.reset({ requestType: RequestType.LEAVE });
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (err) => {
        this.errorMessage = 'Failed to create request.';
        console.error(err);
      }
    });
  }
}