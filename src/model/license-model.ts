import { License } from '@prisma/client';

export type LicenseResponse = {
  id: number;
  userId: string;
  apkId: number;
  licenseKey: string;
  hwid: string | null;
  isActive: boolean;
  expiryDate: Date;
};

export type CreateLicenseRequest = {
  userId: string;
  apkId: number;
  durationDays: number;
  hwid: string | null;
};

export function toLicenseResponse(license: License): LicenseResponse {
  return {
    id: license.id,
    userId: license.userId,
    apkId: license.apkId,
    licenseKey: license.licenseKey,
    hwid: license.hwid,
    isActive: license.isActive,
    expiryDate: license.expiryDate,
  };
}
