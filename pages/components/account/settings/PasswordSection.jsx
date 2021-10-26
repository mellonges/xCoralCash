import { useState } from "react";
import { Button, Col, FormGroup, Input, Row } from "reactstrap";
import validator from "validator";
import { changeUserPassword } from "@/functions/getBackendData";
import { checkPasswordFitRules } from "@/functions/helpers";
import dynamic from "next/dynamic";

const Tooltip = dynamic(() => import("reactstrap/lib/Tooltip"), { ssr: false });

const PasswordSection = ({ styles = {} }) => {
  const defaultInfo = {
    newPassword: "",
    currentPassword: "",
    confirmedPassword: "",
  };

  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [info, setInfo] = useState(defaultInfo);
  const [isSubmit, setIsSubmit] = useState(false);

  const [passwordTooltipShow, setShowPasswordTooltip] = useState(false);
  const [fitRules, setFitRules] = useState({});

  const togglePasswordTooltip = () =>
    setShowPasswordTooltip(!passwordTooltipShow);

  const validateFields = (fieldname, value) => {
    let errors = {};

    let fields = [
      {
        fieldname: "currentPassword",
        validator: (value) =>
          !validator.isStrongPassword(value ? value : info.currentPassword, {
            minSymbols: 0,
            minLength: 8,
            minUppercase: 1,
            minLowercase: 1,
            minNumbers: 1,
          }),
      },
      {
        fieldname: "newPassword",
        validator: (value) =>
          !validator.isStrongPassword(value ? value : info.newPassword, {
            minSymbols: 0,
            minLength: 8,
            minUppercase: 1,
            minLowercase: 1,
            minNumbers: 1,
          }),
      },
      {
        fieldname: "confirmedPassword",
        validator: (value) => {
          const val = value ? value : info.confirmedPassword;
          const correct = validator.isStrongPassword(val, {
            minSymbols: 0,
            minLength: 8,
            minUppercase: 1,
            minLowercase: 1,
            minNumbers: 1,
          });
          const corresponded = info.newPassword === val;

          if (correct && corresponded) return false;
          else return true;
        },
      },
    ];

    if (fieldname) {
      let fieldValidation = fields.find((f) => f.fieldname === fieldname);

      if (fieldValidation.validator(value))
        errors = {
          [fieldname]: true,
        };
      else
        errors = {
          [fieldname]: false,
        };
    } else
      fields.map((field) => {
        if (field.validator()) errors[field.fieldname] = true;
      });

    setValidationErrors((validationErrors) => ({
      ...validationErrors,
      ...errors,
    }));

    if (Object.values(errors).length) return false;
    else return true;
  };

  const resetForm = () => {
    setInfo(defaultInfo);
    setValidationErrors({});
  };

  const validateAndSendForm = () => {
    if (!validateFields()) return false;

    setLoading(true);
    changeUserPassword(info.currentPassword, info.newPassword)
      .then((res) => {
        if (res.message) {
          setValidationErrors((errors) => ({
            errors,
            responseError: res.message,
          }));
          setTimeout(() => {
            setValidationErrors((errors) => ({
              errors,
              responseError: false,
            }));
            resetForm();
          }, 3000);
        } else if (res === "SUCCESS") {
          setExpanded(false);
          setIsSubmit(true);
          resetForm();

          setTimeout(() => setIsSubmit(false), 4000);
        }
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <FormGroup className={styles.section}>
      {isSubmit ? (
        <span className={styles.submited}>Password Updated</span>
      ) : !expanded ? (
        <Row className={`${styles.inputRow} ${styles.collapsed}`}>
          <Col md={3} className={`${styles.label} ${styles.col}`}>
            <b>Password</b>
          </Col>
          <Col
            md={6}
            className={`${styles.semiTransparent} ${styles.changePasswordTitle} ${styles.col}`}
          >
            Change your current password
          </Col>
          <Col md={3} className={`${styles.button} ${styles.col}`}>
            <span onClick={() => setExpanded(true)}>Change password</span>
          </Col>
        </Row>
      ) : (
        <>
          <Row className={styles.inputRow}>
            <Col md={3} className={`${styles.label} ${styles.col}`}>
              Current password
            </Col>
            <Col
              className={styles.col}
              md={6}
              className={`${styles.inner} ${styles.col}`}
            >
              <Input
                value={info.currentPassword}
                className={`${styles.Input} ${
                  validationErrors.currentPassword ? styles.invalid : ""
                } `}
                onChange={(e) => {
                  setInfo({
                    ...info,
                    currentPassword: e.target.value.trim(),
                  });
                  validateFields("currentPassword", e.target.value.trim());
                }}
              />
              {validationErrors.currentPassword && (
                <small
                  className={`${styles.validationError} d-flex align-items-center`}
                >
                  <svg
                    width="10"
                    height="9"
                    viewBox="0 0 10 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.46455 6.42801L6.25633 0.865047C5.74087 0.0465048 4.48435 0.0454172 3.96821 0.865047L0.760146 6.42801C0.233215 7.26442 0.871169 8.32358 1.90394 8.32358H8.32049C9.35239 8.32358 9.99148 7.26527 9.46455 6.42801ZM5.11227 7.31967C4.81891 7.31967 4.58012 7.09442 4.58012 6.81771C4.58012 6.541 4.81891 6.31575 5.11227 6.31575C5.40562 6.31575 5.64441 6.541 5.64441 6.81771C5.64441 7.09442 5.40562 7.31967 5.11227 7.31967ZM5.64441 5.31184C5.64441 5.58855 5.40562 5.8138 5.11227 5.8138C4.81891 5.8138 4.58012 5.58855 4.58012 5.31184V2.80205C4.58012 2.52534 4.81891 2.30009 5.11227 2.30009C5.40562 2.30009 5.64441 2.52534 5.64441 2.80205V5.31184Z"
                      fill="#FF3838"
                    />
                  </svg>
                  Enter valid password
                </small>
              )}
            </Col>
          </Row>
          <Row className={styles.inputRow}>
            <Col md={3} className={`${styles.label} ${styles.col}`}>
              New password
            </Col>
            <Col md={6} className={`${styles.inner} ${styles.col}`}>
              <Input
                id="passwordInput"
                value={info.newPassword}
                className={`${styles.Input} ${
                  validationErrors.newPassword ? styles.invalid : ""
                } `}
                onChange={(e) => {
                  setInfo({ ...info, newPassword: e.target.value.trim() });
                  validateFields("newPassword", e.target.value.trim());
                  checkPasswordFitRules(e.target.value, setFitRules);
                }}
                onFocus={(e) => {
                  checkPasswordFitRules(e.target.value, setFitRules);
                }}
              />
              <Tooltip
                isOpen={passwordTooltipShow}
                target="passwordInput"
                placement="top-end"
                trigger="focus"
                className={styles.passwordTooltipContainer}
                toggle={togglePasswordTooltip}
                innerClassName={styles.passwordTooltipWrapper}
                arrowClassName={styles.passwordTooltipArrow}
              >
                <div className={styles.passwordTooltip}>
                  <span className="d-block">At least:</span>
                  <ul>
                    <li className={fitRules.uppercase ? styles.fitRule : ""}>
                      {fitRules.uppercase ? (
                        <svg
                          width="11"
                          height="10"
                          viewBox="0 0 11 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0)">
                            <path
                              d="M9.29363 1.42627L4.43606 6.28385L1.79389 3.6417L0.610352 4.82523L4.43606 8.65094L10.4772 2.60983L9.29363 1.42627Z"
                              fill="#45FFDE"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0">
                              <rect
                                width="9.86682"
                                height="9.86682"
                                fill="white"
                                transform="translate(0.610352 0.105225)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      ) : (
                        <svg
                          width="7"
                          height="10"
                          viewBox="0 0 7 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0.300781 9.70567V0.73584L6.00886 4.81304L0.300781 9.70567Z"
                            fill="white"
                          />
                        </svg>
                      )}
                      1 uppercase letter
                    </li>
                    <li className={fitRules.lowercase ? styles.fitRule : ""}>
                      {fitRules.lowercase ? (
                        <svg
                          width="11"
                          height="10"
                          viewBox="0 0 11 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0)">
                            <path
                              d="M9.29363 1.42627L4.43606 6.28385L1.79389 3.6417L0.610352 4.82523L4.43606 8.65094L10.4772 2.60983L9.29363 1.42627Z"
                              fill="#45FFDE"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0">
                              <rect
                                width="9.86682"
                                height="9.86682"
                                fill="white"
                                transform="translate(0.610352 0.105225)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      ) : (
                        <svg
                          width="7"
                          height="10"
                          viewBox="0 0 7 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0.300781 9.70567V0.73584L6.00886 4.81304L0.300781 9.70567Z"
                            fill="white"
                          />
                        </svg>
                      )}
                      1 lowercase letter
                    </li>
                    <li className={fitRules.number ? styles.fitRule : ""}>
                      {fitRules.number ? (
                        <svg
                          width="11"
                          height="10"
                          viewBox="0 0 11 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0)">
                            <path
                              d="M9.29363 1.42627L4.43606 6.28385L1.79389 3.6417L0.610352 4.82523L4.43606 8.65094L10.4772 2.60983L9.29363 1.42627Z"
                              fill="#45FFDE"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0">
                              <rect
                                width="9.86682"
                                height="9.86682"
                                fill="white"
                                transform="translate(0.610352 0.105225)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      ) : (
                        <svg
                          width="7"
                          height="10"
                          viewBox="0 0 7 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0.300781 9.70567V0.73584L6.00886 4.81304L0.300781 9.70567Z"
                            fill="white"
                          />
                        </svg>
                      )}
                      1 number
                    </li>
                    <li className={fitRules.wordLength ? styles.fitRule : ""}>
                      {fitRules.wordLength ? (
                        <svg
                          width="11"
                          height="10"
                          viewBox="0 0 11 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0)">
                            <path
                              d="M9.29363 1.42627L4.43606 6.28385L1.79389 3.6417L0.610352 4.82523L4.43606 8.65094L10.4772 2.60983L9.29363 1.42627Z"
                              fill="#45FFDE"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0">
                              <rect
                                width="9.86682"
                                height="9.86682"
                                fill="white"
                                transform="translate(0.610352 0.105225)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      ) : (
                        <svg
                          width="7"
                          height="10"
                          viewBox="0 0 7 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0.300781 9.70567V0.73584L6.00886 4.81304L0.300781 9.70567Z"
                            fill="white"
                          />
                        </svg>
                      )}
                      8 characters minimum
                    </li>
                  </ul>
                </div>
              </Tooltip>
              {validationErrors.newPassword && (
                <small
                  className={`${styles.validationError} d-flex align-items-center`}
                >
                  <svg
                    width="10"
                    height="9"
                    viewBox="0 0 10 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.46455 6.42801L6.25633 0.865047C5.74087 0.0465048 4.48435 0.0454172 3.96821 0.865047L0.760146 6.42801C0.233215 7.26442 0.871169 8.32358 1.90394 8.32358H8.32049C9.35239 8.32358 9.99148 7.26527 9.46455 6.42801ZM5.11227 7.31967C4.81891 7.31967 4.58012 7.09442 4.58012 6.81771C4.58012 6.541 4.81891 6.31575 5.11227 6.31575C5.40562 6.31575 5.64441 6.541 5.64441 6.81771C5.64441 7.09442 5.40562 7.31967 5.11227 7.31967ZM5.64441 5.31184C5.64441 5.58855 5.40562 5.8138 5.11227 5.8138C4.81891 5.8138 4.58012 5.58855 4.58012 5.31184V2.80205C4.58012 2.52534 4.81891 2.30009 5.11227 2.30009C5.40562 2.30009 5.64441 2.52534 5.64441 2.80205V5.31184Z"
                      fill="#FF3838"
                    />
                  </svg>
                  Enter valid password
                </small>
              )}
            </Col>
          </Row>
          <Row className={styles.inputRow}>
            <Col md={3} className={`${styles.label} ${styles.col}`}>
              Confirm password
            </Col>
            <Col md={6} className={`${styles.inner} ${styles.col}`}>
              <Input
                value={info.confirmedPassword}
                className={`${styles.Input} ${
                  validationErrors.confirmedPassword ? styles.invalid : ""
                } `}
                onChange={(e) => {
                  setInfo({
                    ...info,
                    confirmedPassword: e.target.value.trim(),
                  });
                  validateFields("confirmedPassword", e.target.value.trim());
                }}
              />
              {validationErrors.confirmedPassword && (
                <small
                  className={`${styles.validationError} d-flex align-items-center`}
                >
                  <svg
                    width="10"
                    height="9"
                    viewBox="0 0 10 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.46455 6.42801L6.25633 0.865047C5.74087 0.0465048 4.48435 0.0454172 3.96821 0.865047L0.760146 6.42801C0.233215 7.26442 0.871169 8.32358 1.90394 8.32358H8.32049C9.35239 8.32358 9.99148 7.26527 9.46455 6.42801ZM5.11227 7.31967C4.81891 7.31967 4.58012 7.09442 4.58012 6.81771C4.58012 6.541 4.81891 6.31575 5.11227 6.31575C5.40562 6.31575 5.64441 6.541 5.64441 6.81771C5.64441 7.09442 5.40562 7.31967 5.11227 7.31967ZM5.64441 5.31184C5.64441 5.58855 5.40562 5.8138 5.11227 5.8138C4.81891 5.8138 4.58012 5.58855 4.58012 5.31184V2.80205C4.58012 2.52534 4.81891 2.30009 5.11227 2.30009C5.40562 2.30009 5.64441 2.52534 5.64441 2.80205V5.31184Z"
                      fill="#FF3838"
                    />
                  </svg>
                  {validationErrors.confirmedPassword &&
                  info.newPassword !== info.confirmedPassword
                    ? "Must match the previous field"
                    : "Enter valid password"}
                </small>
              )}
            </Col>
          </Row>
          <Row className={styles.footerRow}>
            <Button
              color="primary"
              className={styles.saveBtn}
              disabled={loading}
              onClick={() => {
                !loading && validateAndSendForm();
              }}
            >
              {loading ? (
                <>
                  <span className="ml-auto">Saving...</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-auto"
                    width="15px"
                    height="15px"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="xMidYMid"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="10"
                      r="35"
                      strokeDasharray="164.93361431346415 56.97787143782138"
                    >
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        repeatCount="indefinite"
                        dur="0.9345794392523364s"
                        values="0 50 50;360 50 50"
                        keyTimes="0;1"
                      ></animateTransform>
                    </circle>
                  </svg>
                </>
              ) : (
                <span>Save changes</span>
              )}
            </Button>
            <Button
              className={styles.cancelBtn}
              disabled={loading}
              onClick={() => {
                setExpanded(false);
                resetForm();
              }}
            >
              Cancel
            </Button>
          </Row>
        </>
      )}
      {validationErrors.responseError && (
        <small
          className={`${styles.validationError} d-flex align-items-center`}
        >
          <svg
            width="10"
            height="9"
            viewBox="0 0 10 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.46455 6.42801L6.25633 0.865047C5.74087 0.0465048 4.48435 0.0454172 3.96821 0.865047L0.760146 6.42801C0.233215 7.26442 0.871169 8.32358 1.90394 8.32358H8.32049C9.35239 8.32358 9.99148 7.26527 9.46455 6.42801ZM5.11227 7.31967C4.81891 7.31967 4.58012 7.09442 4.58012 6.81771C4.58012 6.541 4.81891 6.31575 5.11227 6.31575C5.40562 6.31575 5.64441 6.541 5.64441 6.81771C5.64441 7.09442 5.40562 7.31967 5.11227 7.31967ZM5.64441 5.31184C5.64441 5.58855 5.40562 5.8138 5.11227 5.8138C4.81891 5.8138 4.58012 5.58855 4.58012 5.31184V2.80205C4.58012 2.52534 4.81891 2.30009 5.11227 2.30009C5.40562 2.30009 5.64441 2.52534 5.64441 2.80205V5.31184Z"
              fill="#FF3838"
            />
          </svg>
          {validationErrors.responseError}
        </small>
      )}
    </FormGroup>
  );
};

export default PasswordSection;
