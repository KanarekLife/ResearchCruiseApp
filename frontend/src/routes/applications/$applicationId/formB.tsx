import { createFileRoute } from '@tanstack/react-router'

import { allowOnly } from '@/core/lib/guards'
import { FormBPage } from '@/cruise-applications/pages/FormBPage'

export const Route = createFileRoute('/cruises/$cruiseId/formB')({
  component: FormBPage,
  beforeLoad: allowOnly.authenticated,
})
