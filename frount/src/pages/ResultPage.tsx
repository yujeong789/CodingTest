import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResultPage: React.FC = () => {
  const [results, setResults] = useState<{ [key: string]: number } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const response = await fetch('/api/result');
      if (response.ok) {
        const data = await response.json();
        setResults(data);
      }
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };

  const handleRetry = () => {
    navigate('/vote');
  };

  if (!results) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  const totalVotes = Object.values(results).reduce((a, b) => a + b, 0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-blue-600">투표 결과</h1>
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between font-medium">
              <span>짜장면</span>
              <span>{results['짜장면'] || 0}표</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className="bg-blue-500 h-4 rounded-full transition-all duration-500"
                style={{
                  width: `${totalVotes ? ((results['짜장면'] || 0) / totalVotes) * 100 : 0}%`,
                }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between font-medium">
              <span>짬뽕</span>
              <span>{results['짬뽕'] || 0}표</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className="bg-red-500 h-4 rounded-full transition-all duration-500"
                style={{
                  width: `${totalVotes ? ((results['짬뽕'] || 0) / totalVotes) * 100 : 0}%`,
                }}
              />
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center text-gray-500">
          총 {totalVotes}명이 투표했습니다.
        </div>

        <button
          onClick={handleRetry}
          className="w-full mt-6 py-3 border-2 border-blue-600 text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors"
        >
          다시 투표하기
        </button>
      </div>
    </div>
  );
};

export default ResultPage;

