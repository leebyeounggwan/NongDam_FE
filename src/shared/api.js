import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
  },
});

// form data용
const formApi = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "content-type": "multipart/form-data",
  },
});

api.interceptors.request.use(function (config) {
  const token = sessionStorage.getItem("jwtToken");
  const refreshToken = sessionStorage.getItem("refreshToken");
  config.headers.common["Authorization"] = `Bearer ${token}`;
  config.headers.common["RefreshToken"] = `Bearer ${refreshToken}`;
  return config;
});

formApi.interceptors.request.use(function (config) {
  const token = sessionStorage.getItem("jwtToken");
  const refreshToken = sessionStorage.getItem("refreshToken");
  config.headers.common["Authorization"] = `Bearer ${token}`;
  config.headers.common["RefreshToken"] = `Bearer ${refreshToken}`;
  return config;
});

api.interceptors.response.use((response) => {
  if (response.headers.authorization !== undefined) {
    console.log("set New Token");
    sessionStorage.setItem("jwtToken", response.headers.authorization);
  }
  return response;
});

export const apis = {
  // 메인페이지
  // 날씨
  loadWeather: () => api.get("http://localhost:8080/weather"),
  // 시세
  loadTodayMarketPrice: (data) =>
    api.get(`http://localhost:8080/todaymarketprice/${data.cropId}/${data.productClsCode}`),
  // 매출통계
  loadSales: () => api.get("http://localhost:8080/data"),
  // 오늘일정
  loadTodaySchedule: () => api.get("http://localhost:8080/schedule/today"),
  // 오늘 뉴스
  loadTodayNews: () => api.get("http://localhost:8080/news"),

  // 시세페이지
  loadMarketPrice: (data) =>
    api.get(`http://localhost:8080/marketprice?cropId=${data.cropId}&data=${data.data}`),
  loadMyCropsMarketPrice: (data) => api.get(`http://localhost:8080/marketprices/${data}`),

  // loadMyCropsMarketPrice: (data) =>
  //   api.get(`/marketprice/${data.cropId}/${data.data}`),

  // 장부
  loadAccountBook: (date) => api.get(`http://localhost:8080/accountbook/${date.year}-${date.month}`),
  loadCurrentAccount: () => api.get("http://localhost:8080/accountbook"),
  addAccount: (account) => api.post("http://localhost:8080/accountbook", account),
  editAccount: (id, account) => api.put(`http://localhost:8080/accountbook/${id}`, account),
  deleteAccount: (id) => api.delete(`http://localhost:8080/accountbook/${id}`),

  // user
  logIn: (data) => api.post("http://localhost:8080/member/login", data),
  // nicknameCheck: (userNickname) =>
  //   api.get(`/api/user/nicknameCheck/${userNickname}`, { userNickname }),
  signUp: (data) => api.post("http://localhost:8080/member", data),
  kakaoLogIn: (data) => api.post("http://localhost:8080/member/auth", data),
  logout: () => api.post("/"),
  loadnickname: () => api.get("http://localhost:8080/user/nickname"),
  userInfo: () => api.get("http://localhost:8080/member"),
  //editUserInfo: (id, data) => formApi.put(`/member/${memberid}`, id, data),
  editPw: (data) => api.put(`http://localhost:8080/member/password`, data),

  loadCropsList: () => api.get("http://localhost:8080/crops"),

  // 일정(schedule)
  // loadSchedule: () => api.get("/schedule"),
  loadSchedule: (date) => api.get(`http://localhost:8080/schedule/${date.year}-${date.month}`),
  loadCurrentSchedule: () => api.get("http://localhost:8080/schedule"),

  addSchedule: (data) => api.post("http://localhost:8080/schedule", data),
  editSchedule: (id, schedule) => api.put(`http://localhost:8080/schedule/${id}`, schedule),
  deleteSchedule: (scheduleId) => api.delete(`http://localhost:8080/schedule/${scheduleId}`),

  // 일지(worklog)
  addWorkLog: (data) => formApi.post("http://localhost:8080/worklog", data),
  loadWorkLogList: () => api.get("http://localhost:8080/worklog"),
  loadWorkLog: (id) => api.get(`http://localhost:8080/worklog/${id}`),
  deleteWorkLog: (id) => api.delete(`http://localhost:8080/worklog/${id}`),
  // editWorkLog: (id, data) => api.patch(`/worklog/${worklogid}/update`, id, data),

  // 농장 관리 현황
  loadIncome: () => api.get("http://localhost:8080/income"),
  loadExpense: () => api.get("http://localhost:8080/expense"),
  loadWorkTime: () => api.get("http://localhost:8080/worktime"),
  loadSales: (data) => api.get(`http://localhost:8080/sales/${data}`),
  loadTotalHarvest: (data) => api.get(`http://localhost:8080/totalharvest/${data}`),
  loadWorkTimeRate: () => api.get("http://localhost:8080/worktime/rate"),
};
