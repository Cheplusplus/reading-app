# 📚 ZapRead

**ZapRead** is an AI-powered reading comprehension app that transforms passive reading into an interactive, skill-building experience. From academic papers to programming docs, ZapRead helps users improve their understanding with challenges tailored by AI — all in a responsive, distraction-free interface.

## 🚀 Features

- 🤖 AI-generated reading challenges
- 🎯 Difficulty selection (in progress)
- 📊 Stats and progress tracking across devices
- 📱 Fully responsive mobile experience
- 📚 Academic and technical content support (coming soon)
- 🧑‍🏫 AI coaching and feedback (coming soon)
- 🛠️ Quality-of-life features in development
- 👀 Reading metrics and performance tracking (coming soon)

## 🛠️ Tech Stack

- **Frontend:** React
- **Backend:** Node.js / Next.js
- **Database:** PostgreSQL / Prisma
- **AI Services:** OpenAI API
- **Auth:** Auth0
- **Hosting:** Vercel
- **Testing** Jest

## Folder Structure
├───.github
│   └───workflows
├───prisma
│   └───migrations
│       ├───20250413205426_initial_database_migration
│       └───20250423205649_add_challenge_table
├───public
└───src
    ├───app
    │   ├───api
    │   │   └───auth
    │   │       └───[auth0]
    │   ├───components
    │   │   ├───AccessContols
    │   │   ├───Background
    │   │   ├───DeleteProfileButton
    │   │   ├───Footer
    │   │   ├───MenuButton
    │   │   ├───MenuModal
    │   │   ├───Modal
    │   │   ├───Questions
    │   │   ├───RateChallengeModal
    │   │   ├───Reader
    │   │   ├───ReaderPageManager
    │   │   ├───ResetStatsButton
    │   │   ├───Results
    │   │   ├───ResultsLineChart
    │   │   ├───ShowChallengeModal
    │   │   ├───Spinner
    │   │   ├───ThemeProvider
    │   │   └───ToogleTheme
    │   ├───hooks
    │   ├───lib
    │   ├───privacy-policy
    │   ├───profile
    │   ├───reading-app
    │   ├───roadmap
    │   └───types
    ├───components
    │   └───ui
    └───lib

## 🧪 Running Locally

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Cheplusplus/reading-app
   cd reading-app
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create a `.env` file in the root:**

   ```env

   OPENAI_API_KEY=your-openai-api-key
   DATABASE_URL=your-postgres-connection-url
   AUTH0_SECRET='Your-Secret'
   AUTH0_BASE_URL='http://localhost:3000'
   AUTH0_ISSUER_BASE_URL='Your-Issuer-Base-URL'
   AUTH0_CLIENT_ID='Your-Client-ID'
   AUTH0_CLIENT_SECRET='Your-Client-Secret'
   AUTH0_SESSION_AUTO_SAVE=false
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   ```

## 🐞 Running Tests

```bash
npm run test
```

## 🤝 Contributing

We welcome contributions from developers, designers, educators, and curious minds!

### How to contribute:

- Fork the repo and create your branch from `main`
- Follow our code style and naming conventions
- Submit a pull request with a clear description of the changes

If you're unsure where to start, check out the [open issues](https://github.com/Cheplusplus/reading-app/issues).

## 📩 Contact

Created and maintained by \ ChePlusPlus
📬 [LinkedIn](https://www.linkedin.com/in/che-overmeyer-1632a394/) | 📧 [chephoto@rocketmail.com](mailto:chephoto@rocketmail.com)
