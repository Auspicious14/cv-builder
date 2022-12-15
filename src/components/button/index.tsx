import React from "react";

interface IProps {
  className?: string;
  name: string;
  disabled?: boolean;
  type: "button" | "submit" | "reset" | undefined;
}
export const ApButton: React.FC<IProps> = ({
  className,
  name,
  disabled = false,
  type,
}) => {
  return (
    <div>
      <button className={className} disabled={disabled} type={type}>
        {name}
      </button>
    </div>
  );
};
