/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as UsermanagementImport } from './routes/usermanagement'
import { Route as ResetpasswordImport } from './routes/resetpassword'
import { Route as RegisterImport } from './routes/register'
import { Route as PriorityinformationImport } from './routes/priorityinformation'
import { Route as NewcruiseImport } from './routes/newcruise'
import { Route as MypublicationsImport } from './routes/mypublications'
import { Route as LoginImport } from './routes/login'
import { Route as HelpImport } from './routes/help'
import { Route as ForgotpasswordImport } from './routes/forgotpassword'
import { Route as ConfirmemailImport } from './routes/confirmemail'
import { Route as AccountsettingsImport } from './routes/accountsettings'
import { Route as IndexImport } from './routes/index'
import { Route as ApplicationsIndexImport } from './routes/applications/index'
import { Route as CruisesCruiseIdFormAImport } from './routes/cruises.$cruiseId/formA'
import { Route as ApplicationsApplicationIdDetailsImport } from './routes/applications/$applicationId/details'

// Create/Update Routes

const UsermanagementRoute = UsermanagementImport.update({
  id: '/usermanagement',
  path: '/usermanagement',
  getParentRoute: () => rootRoute,
} as any)

const ResetpasswordRoute = ResetpasswordImport.update({
  id: '/resetpassword',
  path: '/resetpassword',
  getParentRoute: () => rootRoute,
} as any)

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

const NewcruiseRoute = NewcruiseImport.update({
  id: '/newcruise',
  path: '/newcruise',
  getParentRoute: () => rootRoute,
} as any)

const MypublicationsRoute = MypublicationsImport.update({
  id: '/mypublications',
  path: '/mypublications',
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

const ForgotpasswordRoute = ForgotpasswordImport.update({
  id: '/forgotpassword',
  path: '/forgotpassword',
  getParentRoute: () => rootRoute,
} as any)

const ConfirmemailRoute = ConfirmemailImport.update({
  id: '/confirmemail',
  path: '/confirmemail',
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

const ApplicationsIndexRoute = ApplicationsIndexImport.update({
  id: '/applications/',
  path: '/applications/',
  getParentRoute: () => rootRoute,
} as any)

const CruisesCruiseIdFormARoute = CruisesCruiseIdFormAImport.update({
  id: '/cruises/$cruiseId/formA',
  path: '/cruises/$cruiseId/formA',
  getParentRoute: () => rootRoute,
} as any)

const ApplicationsApplicationIdDetailsRoute =
  ApplicationsApplicationIdDetailsImport.update({
    id: '/applications/$applicationId/details',
    path: '/applications/$applicationId/details',
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
    '/confirmemail': {
      id: '/confirmemail'
      path: '/confirmemail'
      fullPath: '/confirmemail'
      preLoaderRoute: typeof ConfirmemailImport
      parentRoute: typeof rootRoute
    }
    '/forgotpassword': {
      id: '/forgotpassword'
      path: '/forgotpassword'
      fullPath: '/forgotpassword'
      preLoaderRoute: typeof ForgotpasswordImport
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
    '/mypublications': {
      id: '/mypublications'
      path: '/mypublications'
      fullPath: '/mypublications'
      preLoaderRoute: typeof MypublicationsImport
      parentRoute: typeof rootRoute
    }
    '/newcruise': {
      id: '/newcruise'
      path: '/newcruise'
      fullPath: '/newcruise'
      preLoaderRoute: typeof NewcruiseImport
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
    '/resetpassword': {
      id: '/resetpassword'
      path: '/resetpassword'
      fullPath: '/resetpassword'
      preLoaderRoute: typeof ResetpasswordImport
      parentRoute: typeof rootRoute
    }
    '/usermanagement': {
      id: '/usermanagement'
      path: '/usermanagement'
      fullPath: '/usermanagement'
      preLoaderRoute: typeof UsermanagementImport
      parentRoute: typeof rootRoute
    }
    '/applications/': {
      id: '/applications/'
      path: '/applications'
      fullPath: '/applications'
      preLoaderRoute: typeof ApplicationsIndexImport
      parentRoute: typeof rootRoute
    }
    '/applications/$applicationId/details': {
      id: '/applications/$applicationId/details'
      path: '/applications/$applicationId/details'
      fullPath: '/applications/$applicationId/details'
      preLoaderRoute: typeof ApplicationsApplicationIdDetailsImport
      parentRoute: typeof rootRoute
    }
    '/cruises/$cruiseId/formA': {
      id: '/cruises/$cruiseId/formA'
      path: '/cruises/$cruiseId/formA'
      fullPath: '/cruises/$cruiseId/formA'
      preLoaderRoute: typeof CruisesCruiseIdFormAImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/accountsettings': typeof AccountsettingsRoute
  '/confirmemail': typeof ConfirmemailRoute
  '/forgotpassword': typeof ForgotpasswordRoute
  '/help': typeof HelpRoute
  '/login': typeof LoginRoute
  '/mypublications': typeof MypublicationsRoute
  '/newcruise': typeof NewcruiseRoute
  '/priorityinformation': typeof PriorityinformationRoute
  '/register': typeof RegisterRoute
  '/resetpassword': typeof ResetpasswordRoute
  '/usermanagement': typeof UsermanagementRoute
  '/applications': typeof ApplicationsIndexRoute
  '/applications/$applicationId/details': typeof ApplicationsApplicationIdDetailsRoute
  '/cruises/$cruiseId/formA': typeof CruisesCruiseIdFormARoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/accountsettings': typeof AccountsettingsRoute
  '/confirmemail': typeof ConfirmemailRoute
  '/forgotpassword': typeof ForgotpasswordRoute
  '/help': typeof HelpRoute
  '/login': typeof LoginRoute
  '/mypublications': typeof MypublicationsRoute
  '/newcruise': typeof NewcruiseRoute
  '/priorityinformation': typeof PriorityinformationRoute
  '/register': typeof RegisterRoute
  '/resetpassword': typeof ResetpasswordRoute
  '/usermanagement': typeof UsermanagementRoute
  '/applications': typeof ApplicationsIndexRoute
  '/applications/$applicationId/details': typeof ApplicationsApplicationIdDetailsRoute
  '/cruises/$cruiseId/formA': typeof CruisesCruiseIdFormARoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/accountsettings': typeof AccountsettingsRoute
  '/confirmemail': typeof ConfirmemailRoute
  '/forgotpassword': typeof ForgotpasswordRoute
  '/help': typeof HelpRoute
  '/login': typeof LoginRoute
  '/mypublications': typeof MypublicationsRoute
  '/newcruise': typeof NewcruiseRoute
  '/priorityinformation': typeof PriorityinformationRoute
  '/register': typeof RegisterRoute
  '/resetpassword': typeof ResetpasswordRoute
  '/usermanagement': typeof UsermanagementRoute
  '/applications/': typeof ApplicationsIndexRoute
  '/applications/$applicationId/details': typeof ApplicationsApplicationIdDetailsRoute
  '/cruises/$cruiseId/formA': typeof CruisesCruiseIdFormARoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/accountsettings'
    | '/confirmemail'
    | '/forgotpassword'
    | '/help'
    | '/login'
    | '/mypublications'
    | '/newcruise'
    | '/priorityinformation'
    | '/register'
    | '/resetpassword'
    | '/usermanagement'
    | '/applications'
    | '/applications/$applicationId/details'
    | '/cruises/$cruiseId/formA'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/accountsettings'
    | '/confirmemail'
    | '/forgotpassword'
    | '/help'
    | '/login'
    | '/mypublications'
    | '/newcruise'
    | '/priorityinformation'
    | '/register'
    | '/resetpassword'
    | '/usermanagement'
    | '/applications'
    | '/applications/$applicationId/details'
    | '/cruises/$cruiseId/formA'
  id:
    | '__root__'
    | '/'
    | '/accountsettings'
    | '/confirmemail'
    | '/forgotpassword'
    | '/help'
    | '/login'
    | '/mypublications'
    | '/newcruise'
    | '/priorityinformation'
    | '/register'
    | '/resetpassword'
    | '/usermanagement'
    | '/applications/'
    | '/applications/$applicationId/details'
    | '/cruises/$cruiseId/formA'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AccountsettingsRoute: typeof AccountsettingsRoute
  ConfirmemailRoute: typeof ConfirmemailRoute
  ForgotpasswordRoute: typeof ForgotpasswordRoute
  HelpRoute: typeof HelpRoute
  LoginRoute: typeof LoginRoute
  MypublicationsRoute: typeof MypublicationsRoute
  NewcruiseRoute: typeof NewcruiseRoute
  PriorityinformationRoute: typeof PriorityinformationRoute
  RegisterRoute: typeof RegisterRoute
  ResetpasswordRoute: typeof ResetpasswordRoute
  UsermanagementRoute: typeof UsermanagementRoute
  ApplicationsIndexRoute: typeof ApplicationsIndexRoute
  ApplicationsApplicationIdDetailsRoute: typeof ApplicationsApplicationIdDetailsRoute
  CruisesCruiseIdFormARoute: typeof CruisesCruiseIdFormARoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AccountsettingsRoute: AccountsettingsRoute,
  ConfirmemailRoute: ConfirmemailRoute,
  ForgotpasswordRoute: ForgotpasswordRoute,
  HelpRoute: HelpRoute,
  LoginRoute: LoginRoute,
  MypublicationsRoute: MypublicationsRoute,
  NewcruiseRoute: NewcruiseRoute,
  PriorityinformationRoute: PriorityinformationRoute,
  RegisterRoute: RegisterRoute,
  ResetpasswordRoute: ResetpasswordRoute,
  UsermanagementRoute: UsermanagementRoute,
  ApplicationsIndexRoute: ApplicationsIndexRoute,
  ApplicationsApplicationIdDetailsRoute: ApplicationsApplicationIdDetailsRoute,
  CruisesCruiseIdFormARoute: CruisesCruiseIdFormARoute,
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
        "/confirmemail",
        "/forgotpassword",
        "/help",
        "/login",
        "/mypublications",
        "/newcruise",
        "/priorityinformation",
        "/register",
        "/resetpassword",
        "/usermanagement",
        "/applications/",
        "/applications/$applicationId/details",
        "/cruises/$cruiseId/formA"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/accountsettings": {
      "filePath": "accountsettings.tsx"
    },
    "/confirmemail": {
      "filePath": "confirmemail.tsx"
    },
    "/forgotpassword": {
      "filePath": "forgotpassword.tsx"
    },
    "/help": {
      "filePath": "help.tsx"
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/mypublications": {
      "filePath": "mypublications.tsx"
    },
    "/newcruise": {
      "filePath": "newcruise.tsx"
    },
    "/priorityinformation": {
      "filePath": "priorityinformation.tsx"
    },
    "/register": {
      "filePath": "register.tsx"
    },
    "/resetpassword": {
      "filePath": "resetpassword.tsx"
    },
    "/usermanagement": {
      "filePath": "usermanagement.tsx"
    },
    "/applications/": {
      "filePath": "applications/index.tsx"
    },
    "/applications/$applicationId/details": {
      "filePath": "applications/$applicationId/details.tsx"
    },
    "/cruises/$cruiseId/formA": {
      "filePath": "cruises.$cruiseId/formA.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
