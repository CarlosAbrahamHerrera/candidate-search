import React, { useState, useEffect } from 'react';
import { searchGithubUser } from '../api/API';

interface Candidate {
  id: number;
  name: string;
  username: string;
  location: string;
  avatar_url: string;
  email: string;
  html_url: string;
  company: string;
}

const CandidateSearch: React.FC = () => {
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);
  const [noMoreCandidates, setNoMoreCandidates] = useState(false);

  const fetchNextCandidate = async () => {
    try {
      const randomUsernames = ['github', 'facebook', 'google', 'microsoft', 'apple'];
      const randomUsername = randomUsernames[Math.floor(Math.random() * randomUsernames.length)];
      
      const candidate = await searchGithubUser(randomUsername);
      if (candidate) {
        setCurrentCandidate(candidate);
      } else {
        setNoMoreCandidates(true);
      }
    } catch (error) {
      console.error('Error fetching candidate:', error);
      setNoMoreCandidates(true);
    }
  };

  useEffect(() => {
    fetchNextCandidate();
  }, []);

  const handleAcceptCandidate = () => {
    if (currentCandidate) {
      const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
      localStorage.setItem(
        'savedCandidates',
        JSON.stringify([...savedCandidates, currentCandidate])
      );
      fetchNextCandidate();
    }
  };

  const handleRejectCandidate = () => {
    fetchNextCandidate();
  };

  if (noMoreCandidates) {
    return <h2>No more candidates available to review</h2>;
  }

  return (
    <div className="candidate-search">
      <h1>Candidate Search</h1>
      {currentCandidate && (
        <div className="candidate-card">
          <img src={currentCandidate.avatar_url} alt={currentCandidate.name} />
          <h2>{currentCandidate.name}</h2>
          <p>Username: {currentCandidate.username}</p>
          <p>Location: {currentCandidate.location}</p>
          <p>Email: {currentCandidate.email}</p>
          <p>Company: {currentCandidate.company}</p>
          <a href={currentCandidate.html_url} target="_blank" rel="noopener noreferrer">
            GitHub Profile
          </a>
          <div className="actions">
            <button onClick={handleAcceptCandidate}>+</button>
            <button onClick={handleRejectCandidate}>-</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateSearch;
