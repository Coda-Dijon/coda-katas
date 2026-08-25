export class OrderApprovalRequest {
  orderId: number;
  approved: boolean;

  constructor(orderId: number, approved: boolean) {
    this.orderId = orderId;
    this.approved = approved;
  }
}
