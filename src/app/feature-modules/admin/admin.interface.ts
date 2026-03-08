export interface CreateAdminData {
  name: string;
  email: string;
  role?: string | undefined;
  isActive?: boolean | undefined;
}

export interface SetAdminPasswordData {
  email: string;
  password: string;
}

export interface Admin extends CreateAdminData {
  _id: string;
  password: string | null;
}

export interface AggregateResult {
  _id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
}
