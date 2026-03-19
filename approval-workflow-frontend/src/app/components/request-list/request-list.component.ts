import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { Request, Status, RequestType } from '../../models/request.model';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {
  requests: Request[] = [];
  statusFilter: Status | '' = '';
  typeFilter: RequestType | '' = '';
  statusOptions = Object.values(Status);
  typeOptions = Object.values(RequestType);
  role: string = 'USER'; // can be toggled

  constructor(private requestService: RequestService) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    this.requestService.getRequests(
      this.statusFilter || undefined,
      this.typeFilter || undefined
    ).subscribe({
      next: (data) => this.requests = data,
      error: (err) => console.error(err)
    });
  }

  onFilterChange(): void {
    this.loadRequests();
  }

  approveRequest(id: number): void {
    this.requestService.updateStatus(id, Status.APPROVED, this.role).subscribe({
      next: () => this.loadRequests(),
      error: (err) => alert('Only managers can approve/reject')
    });
  }

  rejectRequest(id: number): void {
    this.requestService.updateStatus(id, Status.REJECTED, this.role).subscribe({
      next: () => this.loadRequests(),
      error: (err) => alert('Only managers can approve/reject')
    });
  }
}