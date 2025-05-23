import { createContext } from 'react';

import { Role } from '@/core/models/Role';
import { User } from '@/core/models/User';
import { SignInResult } from '@/user/models/Results';

export type UserContextType = {
  currentUser?: User | undefined;

  isInRole: (allowedRoles: Role[] | Role) => boolean;

  signIn: (email: string, password: string) => Promise<SignInResult>;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);
