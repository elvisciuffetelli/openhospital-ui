// tslint:disable
/**
 * Api Documentation
 * Api Documentation
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import {
    GrantedAuthority,
} from './';

/**
 * @export
 * @interface Authentication
 */
export interface Authentication {
    /**
     * @type {boolean}
     * @memberof Authentication
     */
    authenticated?: boolean;
    /**
     * @type {Array<GrantedAuthority>}
     * @memberof Authentication
     */
    authorities?: Array<GrantedAuthority>;
    /**
     * @type {object}
     * @memberof Authentication
     */
    credentials?: object;
    /**
     * @type {object}
     * @memberof Authentication
     */
    details?: object;
    /**
     * @type {string}
     * @memberof Authentication
     */
    name?: string;
    /**
     * @type {object}
     * @memberof Authentication
     */
    principal?: object;
}
