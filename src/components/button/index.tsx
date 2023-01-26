import React from "react";

interface IProps {
  className?: string;
  name: any;
  disabled?: boolean;
  icon?: React.ReactNode;
  type: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
}
export const ApButton: React.FC<IProps> = ({
  className,
  name,
  disabled = false,
  type,
  icon,
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
        {icon ? (
          <div className="flex gap-2 items-center">
            {icon}
            {name}
          </div>
        ) : (
          <div>{name}</div>
        )}
      </button>
    </div>
  );
};
