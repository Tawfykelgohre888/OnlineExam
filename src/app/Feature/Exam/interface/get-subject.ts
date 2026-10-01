export interface subjects {
  status: boolean;
  code: number;
  payload: Payload;
}

export interface Payload {
  data: Datum[];
  metadata: Metadata;
}

export interface Metadata {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface Datum {
  id: string;
  title: string;
  description: string;
  image: string;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
}
