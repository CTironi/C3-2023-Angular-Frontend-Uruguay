export interface UpdateCustomerModel {
  documentType: DocumentTypeModel;
  document: string;
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

export interface DocumentTypeModel {
  id: string;
  name: string;
  state: boolean;
}