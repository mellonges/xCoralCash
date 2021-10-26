import { faLessThanEqual } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { Button, Form, Input } from "reactstrap";
import validator from "validator";
import { inviteFriendByEmail } from "../../../functions/getBackendData";

const InviteForm = ({ styles }) => {
  const emailRef = useRef();
  const PLACEHOLDER_DEFAULT = "Enter email adress";
  const [placeholder, setPlaceholder] = useState(PLACEHOLDER_DEFAULT);
  const [validationError, setValidationError] = useState(false);
  const [isSent, setSended] = useState(false);
  const [backendError, setBackendError] = useState();
  const [loading, setLoading] = useState(false);

  const sendForm = () => {
    setValidationError(false);
    if (!validateEmail()) {
      setValidationError(true);
      return faLessThanEqual;
    }

    let timeout;

    setLoading(true);
    inviteFriendByEmail(emailRef.current.value)
      .then((res) => res.data)
      .then((res) => {
        if (res.success) {
          setSended(true);
        } else {
          setBackendError(res.payload.errorMessage);
          emailRef.current.value = "";
          emailRef.current.focus();
          setValidationError(true);

          timeout = setTimeout(() => {
            setBackendError();
          }, 6000);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setLoading(false));

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  };

  const validateEmail = () => {
    return validator.isEmail(emailRef.current.value);
  };

  useEffect(() => {
    let timeout;
    if (isSent) {
      emailRef.current.value = "";
      timeout = setTimeout(() => {
        setSended(false);
      }, 4000);
    }
  }, [isSent]);

  return styles ? (
    <div className={`${styles.inviteFormWrapper} `}>
      <Form
        className={`${styles.inviteForm} d-flex flex-wrap`}
        onSubmit={(e) => {
          e.preventDefault();
          sendForm();
        }}
      >
        <Input
          className={`${styles.emailField} ${styles.col} ${
            validationError ? styles.invalid : ""
          }`}
          innerRef={emailRef}
          autoComplete="invite-email"
          onFocus={() => setPlaceholder("")}
          onBlur={() => setPlaceholder(PLACEHOLDER_DEFAULT)}
          onChange={() => (validateEmail() ? setValidationError(false) : true)}
          placeholder={placeholder}
        />
        <Button
          className={`${styles.sendBtn} d-flex align-items-center justify-content-center`}
          color="primary"
          disabled={loading}
        >
          {loading ? (
            <>
              <span>Loading... </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`${styles.loadingCircleIcon} ml-2`}
                width="200px"
                height="200px"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid"
              >
                <circle
                  cx="50"
                  cy="50"
                  fill="none"
                  stroke="#003d56"
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
            "Send invite"
          )}
        </Button>
      </Form>
      {validationError || backendError ? (
        <small className={styles.validationError}>
          {backendError ? backendError : "Enter valid email address"}
        </small>
      ) : isSent ? (
        <small className={styles.successText}>
          Your invitation has been successfully sent
        </small>
      ) : null}
    </div>
  ) : null;
};
export default InviteForm;
