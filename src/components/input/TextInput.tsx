import { ErrorMessage, Field, useField } from "formik";
import React, { useEffect } from "react";

interface IProps {
  label?: string;
  type: string;
  name: string;
  className?: string;
  placeHolder?: string;
  sideLabel?: string;
  // onChange?:(value:string)=>void;
  props?: {
    [x: string]: any;
  };
  containerClass?: string;
  components?: React.ReactNode;
}

export const ApTextInput: React.FC<IProps> = ({
  label,
  type,
  name,
  className,
  placeHolder,
  containerClass,
  sideLabel,
  components,
  ...props
}) => {
  const [field, meta] = useField(name);

  useEffect(() => {}, [field]);

  return (
    <div
      style={{ marginBottom: 10, display: "flex", flexDirection: "column" }}
      className={containerClass}
    >
      <div>{label}</div>
      {type == "textarea" ? (
        <textarea
          className={`w-full p-4 mb-2 lg:bg-stone-50 bg-none border placeholder-orange-300 ${className}`}
          {...field}
          {...props}
          name={name}
          rows={4}
          placeholder={placeHolder}
        ></textarea>
      ) : (
        <Field
          type={type}
          {...field}
          {...props}
          name={name}
          components={components}
          className={`w-full mb-2 rounded-md border  ${className}`}
          placeholder={placeHolder}
        />
      )}

      <ErrorMessage className="text-red-500" name={name} component="div" />
    </div>
  );
};
