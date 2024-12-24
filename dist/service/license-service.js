"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LicenseService = void 0;
const database_1 = require("../application/database");
const license_model_1 = require("../model/license-model");
const crypto_1 = __importDefault(require("crypto"));
class LicenseService {
    // create license
    static createLicense(request) {
        return __awaiter(this, void 0, void 0, function* () {
            // generate expiry date
            const expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + request.durationDays);
            // generate license
            const licenseKey = crypto_1.default.randomBytes(16).toString('hex');
            const license = yield database_1.prismaClient.license.create({
                data: {
                    userId: request.userId,
                    apkId: request.apkId,
                    licenseKey,
                    hwid: request.hwid,
                    isActive: true,
                    expiryDate,
                },
            });
            return (0, license_model_1.toLicenseResponse)(license);
        });
    }
    //   validate license
    static validateLicense(licenseKey, hwid) {
        return __awaiter(this, void 0, void 0, function* () {
            // cek license
            const license = yield database_1.prismaClient.license.findFirst({
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
        });
    }
    //   get all license by user
    static getAllLicenseByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const license = yield database_1.prismaClient.license.findMany({
                where: {
                    userId,
                },
            });
            return license.map(license_model_1.toLicenseResponse);
        });
    }
    //   deactivate license
    static deactivateLicense(licenseKey) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.prismaClient.license.updateMany({
                where: {
                    licenseKey,
                },
                data: {
                    isActive: false,
                },
            });
            return 'License deactivated';
        });
    }
}
exports.LicenseService = LicenseService;
