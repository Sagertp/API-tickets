export interface TypeUser {
  id_type_user: number;
}

export interface BasicUser extends TypeUser {
  id_user: number;
}

export interface User extends BasicUser {
  name: string;
  email: string;
  password?: string;
}

export interface UserForToken {
  id_user: number;
  id_type_user: number;
  name: string;
  email: string;
}
