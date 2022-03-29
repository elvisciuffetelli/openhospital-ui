// tslint:disable
/**
 * OH 2.0 Api Documentation
 * OH 2.0 Api Documentation
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import {
    GregorianCalendar,
    PatientDTO,
    WardDTO,
} from './';

/**
 * Class representing a vaccine type
 * @export
 * @interface VisitDTO
 */
export interface VisitDTO {
    /**
     * Code of the visit
     * @type {number}
     * @memberof VisitDTO
     */
    code?: number;
    /**
     * @type {PatientDTO}
     * @memberof VisitDTO
     */
    patient?: PatientDTO;
    /**
     * @type {GregorianCalendar}
     * @memberof VisitDTO
     */
    date?: GregorianCalendar;
    /**
     * Note of the visit
     * @type {string}
     * @memberof VisitDTO
     */
    note?: string;
    /**
     * Sms of the visit
     * @type {boolean}
     * @memberof VisitDTO
     */
    sms?: boolean;
    /**
     * @type {WardDTO}
     * @memberof VisitDTO
     */
    ward?: WardDTO;
    /**
     * Service accomplished during the visit
     * @type {string}
     * @memberof VisitDTO
     */
    service?: string;
    /**
     * Duration of the visit
     * @type {string}
     * @memberof VisitDTO
     */
    duration?: string;
}
