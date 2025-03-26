import { z } from 'zod';

import { groupBy } from '@/core/lib/utils';
import { ContractDtoValidationSchema } from '@/cruise-applications/models/ContractDto';
import { CruiseDayDetailsDtoValidationSchema } from '@/cruise-applications/models/CruiseDayDetailsDto';
import { FormAInitValuesDto } from '@/cruise-applications/models/FormAInitValuesDto';
import { GuestTeamDtoValidationSchema } from '@/cruise-applications/models/GuestTeamDto';
import { LongResearchEquipmentDtoValidationSchema } from '@/cruise-applications/models/LongResearchEquipmentDto';
import { PermissionDtoValidationSchema } from '@/cruise-applications/models/PermissionDto';
import { PortDtoValidationSchema } from '@/cruise-applications/models/PortDto';
import { ResearchEquipmentDtoValidationSchema } from '@/cruise-applications/models/ResearchEquipmentDto';
import { ResearchTaskEffectDtoValidationSchema } from '@/cruise-applications/models/ResearchTaskEffectDto';
import { ShortResearchEquipmentDtoValidationSchema } from '@/cruise-applications/models/ShortResearchEquipmentDto';
import { SpubTaskDtoValidationSchema } from '@/cruise-applications/models/SpubTaskDto';
import { UGTeamDtoValidationSchema } from '@/cruise-applications/models/UGTeamDto';

const ShipUsageValidationSchema = z
  .object({
    shipUsage: z
      .enum(['0', '1', '2', '3', '4'], {
        message: 'Wymagane jest wskazanie sposobu korzystania z statku',
      })
      .optional(),
    differentUsage: z.string(),
  })
  .superRefine(({ shipUsage, differentUsage }, ctx) => {
    if (shipUsage === '4' && !differentUsage) {
      ctx.addIssue({
        code: 'custom',
        message: 'w przypadku wyboru "inne" należy podać informacje o sposobie korzystania z statku',
        path: ['differentUsage'],
      });
    }
  });

const OtherValidationSchema = (initValues: FormAInitValuesDto) =>
  z.object({
    permissions: PermissionDtoValidationSchema.array().refine(
      (val) => val.every((x) => !x.scan),
      'Skan nie może być dostarczony na tym etapie'
    ),
    researchAreaId: z
      .string()
      .refine(
        (val) => !!val && initValues.researchAreas.map((x) => x.id).includes(val),
        'Obszar badań musi być jednym z dostępnych obszarów badań'
      ),
    ugTeams: UGTeamDtoValidationSchema.array()
      .min(1, 'Co najmniej jeden zespół UG jest wymagany')
      .refine(
        (val) => val.every((x) => parseInt(x.noOfEmployees, 10) + parseInt(x.noOfStudents, 10) > 0),
        'Zespół UG musi składać się z co najmniej jednej osoby'
      )
      .refine(
        (val) => groupBy(val, (x) => x.ugUnitId).filter((x) => x[1].length > 1).length === 0,
        'Nie można dodać dwóch zespołów UG z tego samego wydziału'
      ),
    guestTeams: GuestTeamDtoValidationSchema.array(),
    researchTasksEffects: ResearchTaskEffectDtoValidationSchema.array()
      .min(1, 'Co najmniej jedno zadanie badawcze jest wymagane')
      .refine(
        (val) =>
          val.every((x) =>
            x.done === 'false' ? x.deputyConditionMet === 'false' && x.managerConditionMet === 'false' : true
          ),
        'Jeżeli zadanie badawcze nie zostało skończone, nie można naliczyć punktów'
      ),
    contracts: ContractDtoValidationSchema.array(),
    spubTasks: SpubTaskDtoValidationSchema.array(),
    shortResearchEquipments: ShortResearchEquipmentDtoValidationSchema.array(),
    longResearchEquipments: LongResearchEquipmentDtoValidationSchema.array(),
    ports: PortDtoValidationSchema.array(),
    cruiseDaysDetails: CruiseDayDetailsDtoValidationSchema.array(),
    researchEquipments: ResearchEquipmentDtoValidationSchema.array(),
    shipEquipmentsIds: z.array(z.string()),
  });

export function getFormCValidationSchema(initValues: FormAInitValuesDto) {
  return ShipUsageValidationSchema.and(ShipUsageValidationSchema).and(OtherValidationSchema(initValues));
}
