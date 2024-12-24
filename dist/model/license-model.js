"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toLicenseResponse = toLicenseResponse;
function toLicenseResponse(license) {
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
