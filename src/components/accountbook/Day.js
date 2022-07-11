import React from "react";
import styled from "styled-components";
import moment from "moment";

export default function Day(props) {
  const { date } = props;

  // console.log(date.getMonth() + 1);

  return (
    <>
      <DayTopWrap className="rbc-month-row" role="rowgroup">
        <div className="rbc-row-bg" role="rowgroup">
          <DayTopWrapR className="rbc-day-bg"></DayTopWrapR>
        </div>
        <div className="rbc-row-content" role="rowgroup">
          <div className="rbc-row ">
            <DayWrap className="rbc-date-cell" role="cell">
              <DayLabelBtn type="button" role="cell">
                <DayLabel>
                  {String(date.getDate()).length === 1
                    ? "0" + String(date.getDate())
                    : String(date.getDate())}
                </DayLabel>
              </DayLabelBtn>
            </DayWrap>
          </div>
        </div>
      </DayTopWrap>
    </>
  );
}
const DayTopWrap = styled.div`
  /* border-top: 1px solid #ddd; */
  width: 100%;
  margin-top: 4px;
`;

const DayTopWrapR = styled.div`
  border-left: none;
`;

const DayWrap = styled.div`
  padding: 0px;
`;

const DayLabelBtn = styled.button`
  background-color: transparent;
  cursor: pointer;
  border: none;
`;

const DayLabel = styled.span`
  font-size: 11px;
  font-weight: 700;
  color: #22641c;
`;
