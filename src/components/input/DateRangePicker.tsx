import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface IProps {
  date: {
    startDate: Date;
    endDate: Date;
  };
  onChange: (date: { startDate: Date; endDate: Date }) => void;
}

export const ApDateRangePicker: React.FC<IProps> = ({ date, onChange }) => {
  const [dt, setDt] = useState(date);

  useEffect(() => {
    if (onchange) onChange(dt);
  }, [dt]);
  return (
    <>
      <div className="flex items-center gap-2 mb-2">
        <div className="div">
          <label htmlFor="">Start Date</label>
          <DatePicker
            className="form-control rounded-md outline-blue-400 px-4 py-2 border w-full"
            selected={dt.startDate}
            onChange={(date: any) => {
              setDt({ ...dt, startDate: date }),
                onChange({ ...dt, startDate: date });
            }}
            selectsStart
            startDate={dt.startDate}
            endDate={dt.endDate}
            dateFormat="MM-dd-yyyy"
          />
        </div>
        <div>
          <label htmlFor="">End Date</label>
          <DatePicker
            className="form-control rounded-md outline-blue-400 px-4 py-2 border w-full"
            selected={dt.endDate}
            onChange={(date: any) => {
              setDt({ ...dt, endDate: date }),
                onChange({ ...dt, startDate: date });
            }}
            selectsEnd
            startDate={dt.startDate}
            endDate={dt.endDate}
            minDate={dt.startDate}
          />
        </div>
      </div>
    </>
  );
};
