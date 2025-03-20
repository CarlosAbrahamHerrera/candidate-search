// TODO: Create an interface for the Candidate objects returned by the API

// Interface for the Candidate objects returned by the GitHub API
export interface Candidate {
    id: number;
    name: string;
    username: string;
    location: string;
    avatar_url: string;
    email: string;
    html_url: string;
    company: string;
}
