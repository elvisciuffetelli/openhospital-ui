import { IconButton } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import { useFormik } from "formik";
import get from "lodash.get";
import has from "lodash.has";
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { PatientDTO } from "../../../generated";
import { getFromFields } from "../../../libraries/formDataHandling/functions";
import checkIcon from "../../../assets/check-icon.png";
import {
  updatePatient,
  updatePatientReset,
} from "../../../state/patients/actions";
import { TAPIResponseStatus } from "../../../state/types";
import { IState } from "../../../types";
import Button from "../button/Button";
import InfoBox from "../infoBox/InfoBox";
import TextField from "../textField/TextField";
import { initialFields } from "./consts";
import "./styles.scss";
import { TActivityTransitionState } from "./types";
import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog";

export const PatientExtraData: FunctionComponent = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [editionMode, setEditionMode] = useState(false);
  const [activityTransitionState, setActivityTransitionState] =
    useState<TActivityTransitionState>("IDLE");
  const patient = useSelector<IState, PatientDTO | undefined>(
    (state) => state.patients.selectedPatient.data
  );
  const onSubmit = (values: PatientDTO) => {
    if (values.code) {
      dispatch(updatePatient(values.code, values));
    }
  };
  const status = useSelector<IState, TAPIResponseStatus | undefined>(
    (state) => state.patients.updatePatient.status
  );

  const errorMessage = useSelector<IState, string>(
    (state) =>
      state.patients.updatePatient.error?.message || t("common.somethingwrong")
  );

  const formik = useFormik({
    initialValues: getFromFields(initialFields(patient), "value"),
    enableReinitialize: true,
    onSubmit: (values) => {
      onSubmit({
        ...patient,
        allergies: values.allergies,
        anamnesis: values.anamnesis,
      });
    },
  });

  const onEdit = useCallback(() => {
    setEditionMode(true);
  }, []);

  useEffect(() => {
    if (activityTransitionState === "TO_RESET") {
      setEditionMode(false);
      dispatch(updatePatientReset());
      formik.resetForm();
    }
  }, [dispatch, activityTransitionState]);

  const isValid = (fieldName: string): boolean => {
    return has(formik.touched, fieldName) && has(formik.errors, fieldName);
  };

  const getErrorText = (fieldName: string): string => {
    return has(formik.touched, fieldName)
      ? (get(formik.errors, fieldName) as string)
      : "";
  };

  const isLoading = status === "LOADING";

  return (
    <div className="patientExtraData">
      <div className="patientExtraData_leading">
        {!editionMode && (
          <IconButton onClick={onEdit}>
            <Edit />
          </IconButton>
        )}
      </div>
      <form className="patientExtraData__form">
        <div className="patientExtraData__form_item">
          <span className="item_label">{t("patient.anamnesis")}</span>
          {editionMode ? (
            <TextField
              field={formik.getFieldProps("anamnesis")}
              multiline={true}
              theme="regular"
              label={t("patient.anamnesis")}
              isValid={isValid("anamnesis")}
              errorText={getErrorText("anamnesis")}
              onBlur={formik.handleBlur}
              type="string"
              disabled={isLoading}
            />
          ) : (
            <p className="item_content">{patient?.anamnesis}</p>
          )}
        </div>
        <div className="patientExtraData__form_item">
          <span className="item_label">{t("patient.allergies")}</span>
          {editionMode ? (
            <TextField
              field={formik.getFieldProps("allergies")}
              multiline={true}
              theme="regular"
              label={t("patient.allergies")}
              isValid={isValid("allergies")}
              errorText={getErrorText("allergies")}
              onBlur={formik.handleBlur}
              type="string"
              disabled={isLoading}
            />
          ) : (
            <p className="item_content">{patient?.allergies}</p>
          )}
        </div>
        <div className="patientExtraData__form_item">
          <span className="item_label">{t("patient.bloodtype")}</span>
          <p className="item_content">{patient?.bloodType}</p>
        </div>
        {editionMode && (
          <div className="patientExtraData__form__buttonSet">
            <div className="submit_button">
              <Button type="submit" variant="contained" disabled={isLoading}>
                {t("patient.savechanges")}
              </Button>
            </div>
            <div className="reset_button">
              <Button type="reset" variant="text" disabled={isLoading}>
                {t("patient.discardchanges")}
              </Button>
            </div>
          </div>
        )}
      </form>
      {status === "FAIL" && (
        <div>
          <InfoBox type="error" message={errorMessage} />
        </div>
      )}
      <ConfirmationDialog
        isOpen={status === "SUCCESS"}
        title={t("patient.dataupdated")}
        icon={checkIcon}
        info={t("patient.dataupdatedsuccessfully")}
        primaryButtonLabel={t("common.ok")}
        handlePrimaryButtonClick={() => setActivityTransitionState("TO_RESET")}
        handleSecondaryButtonClick={() => {}}
      />
    </div>
  );
};
