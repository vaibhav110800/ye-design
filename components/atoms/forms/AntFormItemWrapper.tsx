import { Form } from "antd";
import clsx from "clsx";
import { isDate, isObject } from "lodash-es";
import React, { ReactElement, useCallback, useMemo, useState } from "react";
import styles from "./antFormItemWrapper.module.css";

interface AntFormItemWrapperProps {
  children: ReactElement;
  className: string;
  label: string;
  loading: boolean;
  onBlur: React.ChangeEventHandler<HTMLInputElement>;
  rules: any[];
}

export default function AntFormItemWrapper({
  children,
  className,
  label,
  loading,
  onBlur,
  rules,
  ...props
}: AntFormItemWrapperProps): ReactElement {
  const [firstBlur, setFirstBlur] = useState(false);

  const handleBlur: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      if (event.target?.value && !firstBlur) {
        setFirstBlur(true);
      }
      if (onBlur) {
        onBlur(event);
      }
    },
    [firstBlur, onBlur]
  );

  const overrideProps = useMemo(() => {
    return {
      onBlur: handleBlur,
      ...(loading ? { isLoading: loading } : {}),
      ...(label ? { label } : {}),
      required: rules?.find((item) => item.required),
    };
  }, [handleBlur, label, loading, rules]);

  return (
    <Form.Item
      validateTrigger={firstBlur ? "onChange" : "onBlur"}
      className={clsx(styles.root, className)}
      rules={rules}
      normalize={(value) => {
        if (isObject(value) && !isDate(value)) {
          return value.value;
        }
        return value;
      }}
      getValueFromEvent={(event) => {
        return isDate(event)
          ? event
          : event.value ??
              (event.target.id.startsWith("numberInputText")
                ? Number(event.target.value)
                : event.target.value);
      }}
      {...props}
    >
      {React.cloneElement(children, overrideProps)}
    </Form.Item>
  );
}
