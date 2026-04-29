MeetIQ 🚀
AI-powered video conferencing platform with smart meeting notes, transcripts, and action items. MeetIQ is a modern fullstack video conferencing SaaS that combines real-time communication with AI-powered productivity tools. Users can host meetings, chat, share screens, and automatically generate meeting summaries, transcripts, and tasks using AI.

✨ Features
🎥 Video Conferencing
HD real-time video/audio calls
Join / create meetings via invite link
Screen sharing
Participant management
Meeting rooms
💬 Real-time Communication
Live chat inside meetings
Socket-based real-time updates
Participant presence (join/leave status)
🧠 AI Meeting Assistant
Automatic meeting summaries
Full transcript generation
Action item extraction
Key decisions tracking
📊 Dashboard
Meeting history
Access past summaries
View recordings (if enabled)
🏗️ Architecture
Frontend → Next.js (React + TypeScript) Backend → Node.js (Express + TypeScript) Realtime → Socket.IO Database → PostgreSQL (Prisma ORM) Queue → Redis + BullMQ Storage → AWS S3 / Cloud storage AI → OpenAI API Video → WebRTC / LiveKit (or provider)

📁 Project Structure
meetiq/ │ ├── frontend/ # Next.js UI ├── backend/ # Express API │ ├── modules/ │ ├── services/ │ ├── routes/ │ ├── jobs/ │ └── realtime/ │ ├── prisma/ # Database schema └── docs/ # Architecture notes

🔄 Core Flow
User signs up / logs in
Creates or joins a meeting
Video call starts (WebRTC/LiveKit)
Users chat and collaborate in real-time
Meeting is recorded or processed
AI generates:
Summary
Transcript
Action items
Data is saved in dashboard
🧠 AI Features
MeetIQ uses AI to make meetings productive:

📝 Summarize conversations
🎯 Extract action items
📌 Highlight key decisions
🔍 Search past meetings
📄 Generate meeting notes automatically
⚙️ Backend Modules
Auth (JWT + refresh tokens)
Meetings system
Workspaces + members
Real-time socket gateway
AI processing pipeline
Job queue system (BullMQ)
File storage (S3)
🚀 Getting Started
1. Clone repo
git clone https://github.com/yourusername/meetiq.git
cd meetiq

2. Install dependencies

Frontend:

cd frontend
npm install

Backend:

cd backend
npm install

3. Setup environment variables

Create .env files in backend:

DATABASE_URL=
REDIS_URL=
JWT_SECRET=
OPENAI_API_KEY=
S3_BUCKET=

4. Run development servers

Backend:

npm run dev

Frontend:

npm run dev

⸻

🎯 MVP Scope

Initial version includes:

* Auth system
* Video meetings
* Chat
* Screen sharing
* AI meeting summaries
* Basic dashboard

⸻

🚧 Future Improvements

* Stripe billing system
* Team workspaces
* Meeting recordings
* Slack / Notion integrations
* Advanced analytics
* Mobile app

⸻

💡 Vision

MeetIQ aims to replace traditional meeting tools by making every meeting:

* Recorded
* Summarized
* Actionable
* Searchable

⸻

📸 Screenshots (Coming Soon)

* Landing page
* Meeting room UI
* AI notes dashboard

⸻

🧑‍💻 Author

Built as a fullstack + AI engineering portfolio project.

⸻

📜 License

MIT License
