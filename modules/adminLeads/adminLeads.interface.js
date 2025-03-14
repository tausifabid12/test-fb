"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadStatus = exports.BusinessSize = exports.LeadSource = void 0;
var LeadSource;
(function (LeadSource) {
    LeadSource["FACEBOOK"] = "facebook";
    LeadSource["GOOGLE_MAP"] = "google_map";
    LeadSource["LINKEDIN"] = "linkedin";
})(LeadSource || (exports.LeadSource = LeadSource = {}));
var BusinessSize;
(function (BusinessSize) {
    BusinessSize["SMALL"] = "small";
    BusinessSize["MEDIUM"] = "medium";
    BusinessSize["BIG"] = "big";
})(BusinessSize || (exports.BusinessSize = BusinessSize = {}));
var LeadStatus;
(function (LeadStatus) {
    LeadStatus["COLLECTED"] = "collected";
    LeadStatus["MESSAGE_SENT"] = "message_sent";
    LeadStatus["PHONE_CONTACT_COMPLETE"] = "phone_contact_complete";
    LeadStatus["PHONE_CONTACT_FAILED"] = "phone_contact_failed";
    LeadStatus["EMPLOYEE_CONTACT_COMPLETE"] = "employee_contact_complete";
    LeadStatus["EMPLOYEE_CONTACT_FAILED"] = "employee_contact_failed";
    LeadStatus["ON_HOLD"] = "on_hold";
    LeadStatus["MEETING_SCHEDULED"] = "meeting_scheduled";
    LeadStatus["MEETING_FAILED"] = "meeting_failed";
    LeadStatus["NOT_INTERESTED"] = "not_interested";
    LeadStatus["CONVERTED"] = "converted";
})(LeadStatus || (exports.LeadStatus = LeadStatus = {}));
