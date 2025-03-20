import React, { useState, useEffect } from 'react';

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

const SavedCandidates: React.FC = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);
  const [sortField, setSortField] = useState<keyof Candidate>('name');
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    const candidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(candidates);
  }, []);

  const sortCandidates = (candidates: Candidate[]) => {
    return [...candidates].sort((a, b) => {
      if (a[sortField] < b[sortField]) return -1;
      if (a[sortField] > b[sortField]) return 1;
      return 0;
    });
  };

  const filterCandidates = (candidates: Candidate[]) => {
    return candidates.filter(candidate => 
      candidate.name.toLowerCase().includes(filterText.toLowerCase()) ||
      candidate.company?.toLowerCase().includes(filterText.toLowerCase()) ||
      candidate.location?.toLowerCase().includes(filterText.toLowerCase())
    );
  };

  const displayedCandidates = filterCandidates(sortCandidates(savedCandidates));

  if (savedCandidates.length === 0) {
    return <h2>No candidates have been accepted yet</h2>;
  }

  return (
    <div className="saved-candidates">
      <h1>Potential Candidates</h1>
      
      <div className="controls">
        <div className="sort-control">
          <label>Sort by: </label>
          <select 
            value={sortField} 
            onChange={(e) => setSortField(e.target.value as keyof Candidate)}
          >
            <option value="name">Name</option>
            <option value="company">Company</option>
            <option value="location">Location</option>
          </select>
        </div>

        <div className="filter-control">
          <label>Filter: </label>
          <input
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder="Search by name, company, or location"
          />
        </div>
      </div>

      <div className="candidates-grid">
        {displayedCandidates.map((candidate) => (
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
