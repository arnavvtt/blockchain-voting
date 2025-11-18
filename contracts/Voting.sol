// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    // Candidate structure
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    // State variables
    address public owner;
    mapping(uint => Candidate) public candidates;
    mapping(address => bool) public voters;
    uint public candidatesCount;

    // Events
    event CandidateRegistered(uint indexed candidateId, string name);
    event VoteCast(address indexed voter, uint indexed candidateId);

    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    modifier hasNotVoted() {
        require(!voters[msg.sender], "You have already voted");
        _;
    }

    // Constructor
    constructor() {
        owner = msg.sender;
    }

    // Register a new candidate (only owner)
    function registerCandidate(string memory _name) public onlyOwner {
        require(bytes(_name).length > 0, "Candidate name cannot be empty");
        
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
        
        emit CandidateRegistered(candidatesCount, _name);
    }

    // Cast a vote
    function vote(uint _candidateId) public hasNotVoted {
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate ID");
        
        voters[msg.sender] = true;
        candidates[_candidateId].voteCount++;
        
        emit VoteCast(msg.sender, _candidateId);
    }

    // Get candidate details
    function getCandidate(uint _id) public view returns (string memory name, uint voteCount) {
        require(_id > 0 && _id <= candidatesCount, "Invalid candidate ID");
        Candidate memory candidate = candidates[_id];
        return (candidate.name, candidate.voteCount);
    }

    // Get total number of candidates
    function getCandidateCount() public view returns (uint) {
        return candidatesCount;
    }

    // Check if an address has voted
    function hasVoted(address _voter) public view returns (bool) {
        return voters[_voter];
    }

    // Get election results (winner)
    function declareResults() public view returns (string memory winner, uint winningVoteCount) {
        require(candidatesCount > 0, "No candidates registered");
        
        uint winningCandidateId = 1;
        uint highestVoteCount = candidates[1].voteCount;
        
        for (uint i = 2; i <= candidatesCount; i++) {
            if (candidates[i].voteCount > highestVoteCount) {
                highestVoteCount = candidates[i].voteCount;
                winningCandidateId = i;
            }
        }
        
        return (candidates[winningCandidateId].name, highestVoteCount);
    }
}
