import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// 이미지
import Profile from "../images/Profile.png";

const Haeder = () => {
  const navigate = useNavigate();

  const isLogin = localStorage.getItem("jwtToken");
  console.log();

  return (
    <div>
      <Nav>
        <div>
          <Menu
            onClick={() => {
              navigate("/");
            }}
          >
            로고
          </Menu>
          <Menu
            onClick={() => {
              navigate("/analysis");
            }}
          >
            농장관리현황
          </Menu>
          <Menu
            onClick={() => {
              navigate("/marketprice");
            }}
          >
            도매시세
          </Menu>
          <Menu
            onClick={() => {
              navigate("/schedule");
            }}
          >
            농장일정
          </Menu>
          <Menu
            onClick={() => {
              navigate("/accountbook");
            }}
          >
            농장장부
          </Menu>
        </div>
        <ProfileWrap>
          {isLogin ? (
            <Menu
              onClick={() => {
                // navigate("/login");
              }}
            >
              로그아웃
            </Menu>
          ) : (
            <Menu
              onClick={() => {
                navigate("/login");
              }}
            >
              로그인
            </Menu>
          )}

          <UserProfile src={Profile} alt="프로필사진" />
        </ProfileWrap>
      </Nav>
    </div>
  );
};

const Nav = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 30px 50px;
  cursor: pointer;
`;

const Menu = styled.span`
  margin-right: 10px;
`;

const UserProfile = styled.img`
  width: 40px;
`;

const ProfileWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export default Haeder;
