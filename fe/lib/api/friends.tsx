// lib/api/friends.ts
import axios from "axios";

const API = `${process.env.NEXT_PUBLIC_BACKEND_URL}/friends`;

export interface FriendInfo {
  friendId: string;
  schoolName: string;
  grade?: number;
  classNm?: number;
}

export interface TimetableItem {
  day: string;
  period: number;
  subject: string;
  teacher?: string;
  color?: string;
  details?: string;
}

// 친구 목록 불러오기
export const getFriendList = async (): Promise<FriendInfo[]> => {
  const res = await axios.get(`${API}`, { withCredentials: true });
  return res.data;
};

// 친구 검색
export const searchFriendById = async (
  friendId: string
): Promise<FriendInfo> => {
  const res = await axios.get(`${API}/search/${friendId}`, {
    withCredentials: true
  });
  return res.data;
};

// 친구 추가
export const addFriend = async (
  friendId: string
): Promise<{ message: string }> => {
  const res = await axios.post(
    `${API}/add`,
    { friendId },
    { withCredentials: true }
  );
  return res.data;
};

// 친구 삭제
export const deleteFriend = async (
  friendId: string
): Promise<{ message: string }> => {
  const res = await axios.post(
    `${API}/delete`,
    { friendId },
    { withCredentials: true }
  );
  return res.data;
};

// 친구 시간표 조회
export const getFriendTimetable = async (
  friendId: string
): Promise<TimetableItem[]> => {
  const res = await axios.get(`${API}/${friendId}/timetable`, {
    withCredentials: true
  });
  return res.data;
};
