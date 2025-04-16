// components/timetable/FriendListSidebar.tsx
import React, { useState } from "react";
import FriendTimetable from "./FriendTimetable";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getFriendList, addFriend } from "@/lib/api/friends";

interface Friend {
  friendId: string;
  schoolName: string;
  grade?: number;
  classNm?: number;
}

interface FriendListSlideProps {
  isLoggedIn: boolean;
  isOpen: boolean;
  onClose: () => void;
}

export default function FriendListSlide({
  isLoggedIn,
  isOpen,
  onClose
}: FriendListSlideProps) {
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null); //친구 선택
  const [isFriendTimetableOpen, setIsFriendTimetableOpen] = useState(false); //친구 시간표
  const [newFriendId, setNewFriendId] = useState(""); //친구 추가 id

  const queryClient = useQueryClient();
  const { data: friends = [], isLoading } = useQuery("friends", getFriendList, {
    enabled: isLoggedIn
  });

  const addFriendMutation = useMutation(
    (friendId: string) => addFriend(friendId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("friends");
        setNewFriendId("");
      },
      onError: (error: any) => {
        alert(
          error.response?.data?.message || "친구 추가 중 오류가 발생했습니다."
        );
      }
    }
  );

  const handleAddFriend = () => {
    if (!newFriendId.trim()) return;
    addFriendMutation.mutate(newFriendId);
  };

  const handleFriendClick = (friend: Friend) => {
    //친구 클릭하면 해당 친구 시간표 open
    setSelectedFriend(friend);
    setIsFriendTimetableOpen(true);
  };

  const closeFriendTimetable = () => {
    setIsFriendTimetableOpen(false);
  };

  return (
    <>
      <div
        className={`fixed top-0 right-0 h-full w-full bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <button onClick={onClose} className="text-gray-500 text-sm">
            {"<"}
          </button>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 border-b">
          <input
            type="text"
            value={newFriendId}
            onChange={(e) => setNewFriendId(e.target.value)}
            placeholder="친구 아이디"
            className="input input-borderd input-sm input-bordered text-sm w-full"
          />
          <button
            className="btn btn-sm btn-primary px-3 bg-main-orange border-none text-white text-lg shrink-0"
            onClick={handleAddFriend}
          >
            +
          </button>
        </div>

        <ul className="overflow-y-auto max-h-[calc(100%-50px)] p-4">
          {isLoading ? (
            <li>로딩 중...</li>
          ) : (
            friends.map((friend) => (
              <li
                key={friend.friendId}
                className="p-2 hover:bg-gray-100 cursor-pointer border-b"
                onClick={() => handleFriendClick(friend)}
              >
                {friend.friendId} ({friend.grade}학년 {friend.classNm}반)
              </li>
            ))
          )}
        </ul>
      </div>

      {selectedFriend && (
        <FriendTimetable
          isOpen={isFriendTimetableOpen}
          onClose={closeFriendTimetable}
          friendName={selectedFriend.friendId}
        >
          <div className="text-sm text-gray-600">
            {selectedFriend.friendId}의 시간표
          </div>
        </FriendTimetable>
      )}
    </>
  );
}
