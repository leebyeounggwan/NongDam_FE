import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import Modal from "styled-react-modal";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addAccountDB } from "../../redux/modules/account";
// 날짜 라이브러리
import moment from "moment";
import "moment/locale/ko";

// 날짜 선택 라이브러리
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";

const AccountWrite = ({ isOpen, toggleModal, accountId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [price, setPrice] = useState(0);
  const [checkedInputs, setCheckedInputs] = useState("");
  const [category, setCategory] = useState(null);
  const [memo, setMemo] = useState("");
  const [date, setDate] = useState(new Date());

  // 숫자 콤마넣기
  function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
  }

  function uncomma(str) {
    str = String(str);
    return str.replace(/[^\d]+/g, "");
  }

  function inputNumberFormat(e) {
    setPrice(e.target.value);
    e.target.value = comma(uncomma(e.target.value));
  }
  // 콤마제거한 숫자
  const realPrice = Number(String(price).split(",").join(""));

  const changeRadio = (e) => {
    if (e.target.checked) {
      setCheckedInputs(e.target.id);
    }
  };

  const selecDate = moment(date).format("YYYY-MM-DD");

  const addAccount = () => {
    if (realPrice === 0) {
      window.alert("금액을 입력해주세요.");
    } else if (category === null) {
      window.alert("품목을 선택해주세요.");
    } else {
      // api에 데이터 추가하기!
      dispatch(
        addAccountDB({
          type: Number(category),
          price: realPrice,
          memo: memo,
          date: selecDate,
        })
      ).then(toggleModal());
    }
  };

  return (
    // <Back>
    <StyledModal
      isOpen={isOpen}
      onBackgroundClick={toggleModal}
      onEscapeKeydown={toggleModal}
    >
      <Title>기록하기</Title>
      <ContentWrap>
        <ContentLabel>금액</ContentLabel>
        <div>
          <PriceInput
            type="text"
            maxLength="12"
            onChange={(e) => {
              inputNumberFormat(e);
            }}
          />
          <WonT>원</WonT>
        </div>
      </ContentWrap>

      <ContentWrap>
        <ContentLabel>분류</ContentLabel>
        <CategoryWrap>
          <Label>
            <FormCheckLeft
              type="radio"
              id="수입"
              name="radioButton"
              onChange={changeRadio}
              value={checkedInputs}
            />
            <FormCheckText>수입</FormCheckText>
          </Label>
          <Label>
            <FormCheckLeft
              type="radio"
              id="지출"
              name="radioButton"
              onChange={changeRadio}
              value={checkedInputs}
            />
            <FormCheckText>지출</FormCheckText>
          </Label>
        </CategoryWrap>
      </ContentWrap>

      <ContentWrap>
        <ContentLabel>품목</ContentLabel>
        <div>
          {checkedInputs === "" && (
            <Selec onChange={(e) => setCategory(e.target.value)}>
              <option value="">분류을 먼저 선택해주세요</option>{" "}
            </Selec>
          )}
          {checkedInputs === "수입" && (
            <Selec onChange={(e) => setCategory(e.target.value)}>
              <option value="">품목을 선택해주세요</option>
              <option value="0">농산물 판매</option>
              <option value="1">정부보조금</option>
              <option value="2">기타수입</option>
            </Selec>
          )}

          {checkedInputs === "지출" && (
            <Selec onChange={(e) => setCategory(e.target.value)}>
              <option value="">품목을 선택해주세요</option>
              <option value="3">비료</option>
              <option value="4">종자/종묘</option>
              <option value="5">농약</option>
              <option value="6">농기계</option>
              <option value="7">기타 농자재</option>
              <option value="8">유통비 및 판매 경비</option>
              <option value="9">고용노동비</option>
              <option value="10">임차료</option>
              <option value="11">수도광열비</option>
              <option value="12">기타 지출</option>
            </Selec>
          )}
        </div>
      </ContentWrap>

      <ContentWrap>
        <ContentLabel>날짜</ContentLabel>
        <SDatePicker
          selected={date}
          onChange={(date) => {
            setDate(date);
          }}
          locale={ko}
          dateFormat="yyyy년 MM월 dd일"
          // minDate={new Date()}
          value={date}
        />
      </ContentWrap>

      <ContentWrap>
        <ContentLabel>메모</ContentLabel>
        <MemoInput onChange={(e) => setMemo(e.target.value)} />
      </ContentWrap>
      <BtnWrap>
        <DoneBtn
          onClick={() => {
            addAccount();
            // navigate("/accountbook");
          }}
        >
          작성완료
        </DoneBtn>
        <CancelBtn>취소</CancelBtn>
      </BtnWrap>
    </StyledModal>
  );
};

const StyledModal = Modal.styled`
  max-width: 300px;
  width: 90%;
  background-color: white;
  border-radius: 10px;
  padding: 30px;
  @media only screen and (max-width: 760px) {
    width: 80%;
    padding: 20px;
  }
`;

const Title = styled.span`
  font-size: 20px;
  font-weight: 700;
`;

const ContentWrap = styled.span`
  display: flex;
  flex-direction: column;
  margin: 16px 0px;
`;

const ContentLabel = styled.span`
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 8px;
`;

const PriceInput = styled.input`
  width: 130px;
  height: 24px;
  background: #fafafa;
  box-shadow: inset 0px 0px 3px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  border: none;
`;

const WonT = styled.span`
  font-size: 12px;
  margin-left: 6px;
`;

const SDatePicker = styled(DatePicker)`
  width: 160px;
  font-size: 11px;
  height: 24px;
  background-color: white;
  border: 1px solid #02113b;
  padding: 0px 6px;
  color: #02113b;
  border-radius: 6px;
`;

const CategoryWrap = styled.div`
  display: flex;
  flex-direction: row;
`;

const FormCheckText = styled.span`
  width: 40px;
  height: 18px;
  font-size: 10px;
  padding-bottom: 4px;
  border-radius: 100px;
  background: transparent;
  border: 1px solid #616161;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
  color: #616161;
  cursor: pointer;
  &:hover {
    color: black;
    font-weight: 700;
    border: 1px solid black;
  }
`;

const FormCheckLeft = styled.input.attrs({ type: "radio" })`
  &:checked {
    color: black;
    font-weight: 700;
    border: 1px solid black;
  }
  &:checked + ${FormCheckText} {
    color: black;
    font-weight: 700;
    border: 1px solid black;
  }
  display: none;
`;

const Label = styled.label``;

const Selec = styled.select`
  width: 160px;
  font-size: 11px;
  height: 24px;
  background-color: white;
  border: 1px solid #616161;
  padding: 0px 6px;
  color: #616161;
  border-radius: 6px;
`;

const MemoInput = styled.textarea`
  border: 1px solid #616161;
  border-radius: 6px;
  height: 60px;
  padding: 6px;
`;

const BtnWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 26px;
`;

const DoneBtn = styled.button`
  padding: 6px 16px;
  height: 26px;
  background: #22631c;
  border-radius: 6px;
  color: white;
  border: none;
  font-size: 11px;
  &:hover {
    opacity: 0.7;
  }
`;

const CancelBtn = styled.button`
  padding: 6px 16px;
  height: 26px;
  background-color: transparent;
  border-radius: 6px;
  color: #616161;
  border: 1px solid #616161;
  margin-left: 6px;
  font-size: 11px;
  &:hover {
    opacity: 0.7;
  }
`;

export default AccountWrite;
