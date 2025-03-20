import { useState, useEffect } from 'react';

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

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const candidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(candidates);
  }, []);

  if (savedCandidates.length === 0) {
    return <h2>No candidates have been accepted yet</h2>;
  }

  return (
    <div className="saved-candidates">
      <h1>Potential Candidates</h1>
      <div className="candidates-grid">
        {savedCandidates.map((candidate) => (
          <div key={candidate.id} className="candidate-card">
            <img src={candidate.avatar_url} alt={candidate.name} />
            <h2>{candidate.name}</h2>
            <p>Username: {candidate.username}</p>
            <p>Location: {candidate.location}</p>
            <p>Email: {candidate.email}</p>
            <p>Company: {candidate.company}</p>
            <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
              GitHub Profile
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedCandidates;
