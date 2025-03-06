"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptResponse = exports.decryptRequest = void 0;
const crypto_1 = __importDefault(require("crypto"));
const decryptRequest = (body, privateKey) => {
    const { encrypted_aes_key, encrypted_flow_data, initial_vector } = body;
    const decryptedAesKey = crypto_1.default.privateDecrypt({
        key: crypto_1.default.createPrivateKey({
            key: privateKey,
            passphrase: "g746fXi|!5b9<735", // Add passphrase here
        }),
        padding: crypto_1.default.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256",
    }, Buffer.from(encrypted_aes_key, "base64"));
    const flowDataBuffer = Buffer.from(encrypted_flow_data, "base64");
    const initialVectorBuffer = Buffer.from(initial_vector, "base64");
    const TAG_LENGTH = 16;
    const encryptedFlowBody = flowDataBuffer.subarray(0, -TAG_LENGTH);
    const encryptedFlowTag = flowDataBuffer.subarray(-TAG_LENGTH);
    const decipher = crypto_1.default.createDecipheriv("aes-128-gcm", decryptedAesKey, initialVectorBuffer);
    decipher.setAuthTag(encryptedFlowTag);
    const decryptedJSONString = Buffer.concat([
        decipher.update(encryptedFlowBody),
        decipher.final(),
    ]).toString("utf-8");
    return {
        decryptedBody: JSON.parse(decryptedJSONString),
        aesKeyBuffer: decryptedAesKey,
        initialVectorBuffer,
    };
};
exports.decryptRequest = decryptRequest;
const encryptResponse = (response, aesKeyBuffer, initialVectorBuffer) => {
    const flippedIV = Buffer.from(initialVectorBuffer.map((byte) => ~byte));
    const cipher = crypto_1.default.createCipheriv("aes-128-gcm", aesKeyBuffer, flippedIV);
    const encryptedResponse = Buffer.concat([
        cipher.update(JSON.stringify(response), "utf-8"),
        cipher.final(),
    ]);
    return Buffer.concat([
        encryptedResponse,
        cipher.getAuthTag(),
    ]).toString("base64");
};
exports.encryptResponse = encryptResponse;
