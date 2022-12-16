import React from "react";

interface IProps {
  className?: string;
  name: string;
  disabled?: boolean;
  type: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
}
export const ApButton: React.FC<IProps> = ({
  className,
  name,
  disabled = false,
  type,
  onClick,
}) => {
  return (
    <div>
      <button
        className={className}
        disabled={disabled}
        type={type}
        onClick={onClick}
      >
        {name}
      </button>
    </div>
  );
};
