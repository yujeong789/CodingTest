import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VotePage: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleVote = async () => {
    if (!selectedMenu) {
      alert('메뉴를 선택해주세요!');
      return;
    }

    try {
      const response = await fetch('/api/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ menu: selectedMenu }),
      });

      if (response.ok) {
        navigate('/result');
      } else {
        alert('투표에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('서버 오류가 발생했습니다.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-blue-600">점심 메뉴 투표</h1>
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-6 text-center">무엇을 드시겠습니까?</h2>
        
        <div className="space-y-4">
          <label className={`block p-4 border rounded-lg cursor-pointer transition-colors ${selectedMenu === '짜장면' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}`}>
            <input
              type="radio"
              name="menu"
              value="짜장면"
              className="hidden"
              onChange={(e) => setSelectedMenu(e.target.value)}
            />
            <div className="flex items-center justify-between">
              <span className="font-medium">짜장면</span>
              {selectedMenu === '짜장면' && <span className="text-blue-500">✔</span>}
            </div>
          </label>

          <label className={`block p-4 border rounded-lg cursor-pointer transition-colors ${selectedMenu === '짬뽕' ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:bg-gray-50'}`}>
            <input
              type="radio"
              name="menu"
              value="짬뽕"
              className="hidden"
              onChange={(e) => setSelectedMenu(e.target.value)}
            />
            <div className="flex items-center justify-between">
              <span className="font-medium">짬뽕</span>
              {selectedMenu === '짬뽕' && <span className="text-red-500">✔</span>}
            </div>
          </label>
        </div>

        <button
          onClick={handleVote}
          disabled={!selectedMenu}
          className={`w-full mt-8 py-3 rounded-lg text-white font-bold transition-colors ${
            selectedMenu
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          투표하기
        </button>
      </div>
    </div>
  );
};

export default VotePage;

