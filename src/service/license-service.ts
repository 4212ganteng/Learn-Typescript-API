import { prismaClient } from '../application/database';
import {
  CreateLicenseRequest,
  toLicenseResponse,
} from '../model/license-model';
import crypto from 'crypto';

export class LicenseService {
  // create license
  static async createLicense(request: CreateLicenseRequest) {
    // generate expiry date
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + request.durationDays);

    // generate license
    const licenseKey = crypto.randomBytes(16).toString('hex');

    const license = await prismaClient.license.create({
      data: {
        userId: request.userId,
        apkId: request.apkId,
        licenseKey,
        hwid: request.hwid,
        isActive: true,
        expiryDate,
      },
    });

    return toLicenseResponse(license);
  }

  //   validate license
  static async validateLicense(licenseKey: string, hwid: string) {
    // cek license
    const license = await prismaClient.license.findFirst({
      where: {
        licenseKey,
        isActive: true,
      },
    });

    if (!license) {
      throw new Error('License not found');
    }

    // cek expired date
    if (new Date() > license.expiryDate) {
      throw new Error('License has expired');
    }

    // cek hwid
    if (license.hwid !== hwid) {
      throw new Error('HWID does not match');
    }

    return license;
  }

  //   get all license by user
  static async getAllLicenseByUser(userId: string) {
    const license = await prismaClient.license.findMany({
      where: {
        userId,
      },
    });

    return license.map(toLicenseResponse);
  }

  //   deactivate license
  static async deactivateLicense(licenseKey: string) {
    await prismaClient.license.updateMany({
      where: {
        licenseKey,
      },
      data: {
        isActive: false,
      },
    });

    return 'License deactivated';
  }
}
