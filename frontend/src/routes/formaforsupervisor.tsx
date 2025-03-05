import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

import { FormAForSupervisorPage } from '@/cruise-applications/pages/FormAForSupervisorPage'

export const Route = createFileRoute('/formaforsupervisor')({
  component: FormAForSupervisorPage,
  validateSearch: z.object({
    cruiseApplicationId: z.string().uuid().optional(),
    supervisorCode: z.string().optional(),
  }),
})
