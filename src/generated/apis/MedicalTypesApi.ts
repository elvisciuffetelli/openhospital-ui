// tslint:disable
/**
 * Open Hospital API Documentation
 * Open Hospital API Documentation
 *
 * The version of the OpenAPI document: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { Observable } from 'rxjs';
import { BaseAPI, HttpHeaders, throwIfNullOrUndefined, encodeURI, OperationOpts, RawAjaxResponse } from '../runtime';
import {
    MedicalTypeDTO,
} from '../models';

export interface CreateMedicalTypeRequest {
    medicalTypeDTO: MedicalTypeDTO;
}

export interface DeleteMedicalTypeRequest {
    code: string;
}

export interface IsCodeUsed1Request {
    code: string;
}

export interface UpdateMedicalTypeRequest {
    medicalTypeDTO: MedicalTypeDTO;
}

/**
 * no description
 */
export class MedicalTypesApi extends BaseAPI {

    /**
     */
    createMedicalType({ medicalTypeDTO }: CreateMedicalTypeRequest): Observable<MedicalTypeDTO>
    createMedicalType({ medicalTypeDTO }: CreateMedicalTypeRequest, opts?: OperationOpts): Observable<RawAjaxResponse<MedicalTypeDTO>>
    createMedicalType({ medicalTypeDTO }: CreateMedicalTypeRequest, opts?: OperationOpts): Observable<MedicalTypeDTO | RawAjaxResponse<MedicalTypeDTO>> {
        throwIfNullOrUndefined(medicalTypeDTO, 'medicalTypeDTO', 'createMedicalType');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
        };

        return this.request<MedicalTypeDTO>({
            url: '/medicaltypes',
            method: 'POST',
            headers,
            body: medicalTypeDTO,
        }, opts?.responseOpts);
    };

    /**
     */
    deleteMedicalType({ code }: DeleteMedicalTypeRequest): Observable<boolean>
    deleteMedicalType({ code }: DeleteMedicalTypeRequest, opts?: OperationOpts): Observable<RawAjaxResponse<boolean>>
    deleteMedicalType({ code }: DeleteMedicalTypeRequest, opts?: OperationOpts): Observable<boolean | RawAjaxResponse<boolean>> {
        throwIfNullOrUndefined(code, 'code', 'deleteMedicalType');

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
        };

        return this.request<boolean>({
            url: '/medicaltypes/{code}'.replace('{code}', encodeURI(code)),
            method: 'DELETE',
            headers,
        }, opts?.responseOpts);
    };

    /**
     */
    getMedicalTypes(): Observable<Array<MedicalTypeDTO>>
    getMedicalTypes(opts?: OperationOpts): Observable<RawAjaxResponse<Array<MedicalTypeDTO>>>
    getMedicalTypes(opts?: OperationOpts): Observable<Array<MedicalTypeDTO> | RawAjaxResponse<Array<MedicalTypeDTO>>> {
        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
        };

        return this.request<Array<MedicalTypeDTO>>({
            url: '/medicaltypes',
            method: 'GET',
            headers,
        }, opts?.responseOpts);
    };

    /**
     */
    isCodeUsed1({ code }: IsCodeUsed1Request): Observable<boolean>
    isCodeUsed1({ code }: IsCodeUsed1Request, opts?: OperationOpts): Observable<RawAjaxResponse<boolean>>
    isCodeUsed1({ code }: IsCodeUsed1Request, opts?: OperationOpts): Observable<boolean | RawAjaxResponse<boolean>> {
        throwIfNullOrUndefined(code, 'code', 'isCodeUsed1');

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
        };

        return this.request<boolean>({
            url: '/medicaltypes/check/{code}'.replace('{code}', encodeURI(code)),
            method: 'GET',
            headers,
        }, opts?.responseOpts);
    };

    /**
     */
    updateMedicalType({ medicalTypeDTO }: UpdateMedicalTypeRequest): Observable<MedicalTypeDTO>
    updateMedicalType({ medicalTypeDTO }: UpdateMedicalTypeRequest, opts?: OperationOpts): Observable<RawAjaxResponse<MedicalTypeDTO>>
    updateMedicalType({ medicalTypeDTO }: UpdateMedicalTypeRequest, opts?: OperationOpts): Observable<MedicalTypeDTO | RawAjaxResponse<MedicalTypeDTO>> {
        throwIfNullOrUndefined(medicalTypeDTO, 'medicalTypeDTO', 'updateMedicalType');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
        };

        return this.request<MedicalTypeDTO>({
            url: '/medicaltypes',
            method: 'PUT',
            headers,
            body: medicalTypeDTO,
        }, opts?.responseOpts);
    };

}
