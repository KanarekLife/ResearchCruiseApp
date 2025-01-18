/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as RegisterImport } from './routes/register'
import { Route as PriorityinformationImport } from './routes/priorityinformation'
import { Route as LoginImport } from './routes/login'
import { Route as HelpImport } from './routes/help'
import { Route as ForgotPasswordImport } from './routes/forgot-password'
import { Route as AccountsettingsImport } from './routes/accountsettings'
import { Route as IndexImport } from './routes/index'

// Create/Update Routes

const RegisterRoute = RegisterImport.update({
  id: '/register',
  path: '/register',
  getParentRoute: () => rootRoute,
} as any)

const PriorityinformationRoute = PriorityinformationImport.update({
  id: '/priorityinformation',
  path: '/priorityinformation',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const HelpRoute = HelpImport.update({
  id: '/help',
  path: '/help',
  getParentRoute: () => rootRoute,
} as any)

const ForgotPasswordRoute = ForgotPasswordImport.update({
  id: '/forgot-password',
  path: '/forgot-password',
  getParentRoute: () => rootRoute,
} as any)

const AccountsettingsRoute = AccountsettingsImport.update({
  id: '/accountsettings',
  path: '/accountsettings',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/accountsettings': {
      id: '/accountsettings'
      path: '/accountsettings'
      fullPath: '/accountsettings'
      preLoaderRoute: typeof AccountsettingsImport
      parentRoute: typeof rootRoute
    }
    '/forgot-password': {
      id: '/forgot-password'
      path: '/forgot-password'
      fullPath: '/forgot-password'
      preLoaderRoute: typeof ForgotPasswordImport
      parentRoute: typeof rootRoute
    }
    '/help': {
      id: '/help'
      path: '/help'
      fullPath: '/help'
      preLoaderRoute: typeof HelpImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/priorityinformation': {
      id: '/priorityinformation'
      path: '/priorityinformation'
      fullPath: '/priorityinformation'
      preLoaderRoute: typeof PriorityinformationImport
      parentRoute: typeof rootRoute
    }
    '/register': {
      id: '/register'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof RegisterImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/accountsettings': typeof AccountsettingsRoute
  '/forgot-password': typeof ForgotPasswordRoute
  '/help': typeof HelpRoute
  '/login': typeof LoginRoute
  '/priorityinformation': typeof PriorityinformationRoute
  '/register': typeof RegisterRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/accountsettings': typeof AccountsettingsRoute
  '/forgot-password': typeof ForgotPasswordRoute
  '/help': typeof HelpRoute
  '/login': typeof LoginRoute
  '/priorityinformation': typeof PriorityinformationRoute
  '/register': typeof RegisterRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/accountsettings': typeof AccountsettingsRoute
  '/forgot-password': typeof ForgotPasswordRoute
  '/help': typeof HelpRoute
  '/login': typeof LoginRoute
  '/priorityinformation': typeof PriorityinformationRoute
  '/register': typeof RegisterRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/accountsettings'
    | '/forgot-password'
    | '/help'
    | '/login'
    | '/priorityinformation'
    | '/register'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/accountsettings'
    | '/forgot-password'
    | '/help'
    | '/login'
    | '/priorityinformation'
    | '/register'
  id:
    | '__root__'
    | '/'
    | '/accountsettings'
    | '/forgot-password'
    | '/help'
    | '/login'
    | '/priorityinformation'
    | '/register'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AccountsettingsRoute: typeof AccountsettingsRoute
  ForgotPasswordRoute: typeof ForgotPasswordRoute
  HelpRoute: typeof HelpRoute
  LoginRoute: typeof LoginRoute
  PriorityinformationRoute: typeof PriorityinformationRoute
  RegisterRoute: typeof RegisterRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AccountsettingsRoute: AccountsettingsRoute,
  ForgotPasswordRoute: ForgotPasswordRoute,
  HelpRoute: HelpRoute,
  LoginRoute: LoginRoute,
  PriorityinformationRoute: PriorityinformationRoute,
  RegisterRoute: RegisterRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/accountsettings",
        "/forgot-password",
        "/help",
        "/login",
        "/priorityinformation",
        "/register"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/accountsettings": {
      "filePath": "accountsettings.tsx"
    },
    "/forgot-password": {
      "filePath": "forgot-password.tsx"
    },
    "/help": {
      "filePath": "help.tsx"
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/priorityinformation": {
      "filePath": "priorityinformation.tsx"
    },
    "/register": {
      "filePath": "register.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
