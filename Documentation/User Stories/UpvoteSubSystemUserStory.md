# User Story #2: UpVote System

**ID:** US002 (Mavito Project)  
**Title:** Crowdsourced Validation via UpVoting  

**As a:** Mavito application user (e.g., language enthusiast, linguist, or researcher) who wants to contribute to the accuracy and quality of lexicon entries,  
**I want:** to upvote (or downvote) suggested changes or comments on terms in the lexicon,  
**So that:** the community can collectively validate contributions, and moderators can prioritize high-quality updates for integration into the central repository.  

---
## Acceptance Criteria:

1. **Voting Interface:**  
   - [ ] **Given** I am viewing a term entry with user-submitted comments or suggested changes,  
   - [ ] **Then** I see an option to upvote or downvote each contribution (e.g., thumbs-up/thumbs-down buttons).  
   - [ ] **And** the current vote count is displayed next to each contribution.  

2. **Vote Submission:**  
   - [ ] **Given** I am logged in and have not yet voted on a specific contribution,  
   - [ ] **When** I click the upvote/downvote button,  
   - [ ] **Then** my vote is recorded immediately (if online) or queued for sync (if offline).  
   - [ ] **And** the UI reflects my vote (e.g., highlighted button) and updates the vote count.  

3. **Prevent Duplicate Voting:**  
   - [ ] **Given** I have already voted on a contribution,  
   - [ ] **Then** the UI prevents me from voting again (unless I undo my vote).  

4. **Offline Handling:**  
   - [ ] **Given** I vote while offline,  
   - [ ] **Then** the vote is stored locally and synced to the central repository when I reconnect.  

5. **Moderation Visibility (Optional Enhancement):**  
   - [ ] **Given** I am a moderator,  
   - [ ] **Then** I can filter contributions by vote count to prioritize high-quality submissions.  

6. **Feedback Transparency:**  
   - [ ] **Given** a contribution receives significant downvotes,  
   - [ ] **Then** the system may flag it for review (future enhancement).  

---

