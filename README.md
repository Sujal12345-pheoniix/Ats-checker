# ATS Resume Score Checker

A professional, production-ready web application built with **Next.js 15**, **TypeScript**, and **Tailwind CSS** to evaluate resume alignment against modern applicant tracking system criteria. 

The application utilizes a realistic, high-fidelity scanning algorithm to analyze content structure, section headers, contact information, word count readability, and keyword density.

## Live Demo & Built For
* Built for **[Digital Heroes](https://digitalheroesco.com)**.
* Developer: **Sujal Kumar** (sujalreal983@gmail.com).

---

## Features

1. **Intelligent Keyword Scanner**: Scans resumes for role-specific key terms across four target positions:
   * Full Stack Developer
   * Frontend Developer
   * Java Developer
   * AI/ML Engineer
2. **Standard Section Recognition**: Evaluates presence of core resume parts (Experience, Education, Skills, Projects, Contact Details).
3. **Word Count & Readability Metric**: Provides grading on resume length (identifying resumes that are too short or overly verbose).
4. **Action Verbs Density**: Inspects document for dynamic impact verbs (e.g., *led*, *optimized*, *implemented*) to evaluate statement strength.
5. **Interactive Dashboard**:
   * Circular interactive score gauge (color-coded red/yellow/emerald depending on match rate).
   * Tabular list of key strengths and potential weaknesses.
   * Actionable recommendations.
   * Direct overview of matched vs. missing keywords.
6. **Demo Resume Loader**: Quick load examples for each role to immediately demonstrate the scoring engine's capabilities.
7. **Mobile-First Design**: Optimized for fully responsive viewports from small mobile displays to large ultra-wide monitors.

---

## Tech Stack
* **Framework**: Next.js 15 (App Router)
* **Language**: TypeScript
* **Styling**: Tailwind CSS
* **Icons**: Lucide React

---

## Getting Started

### Prerequisites
* **Node.js**: v18.17.0 or higher
* **npm**: v9 or higher

### Installation

1. Clone or copy the project files to your local environment.
2. Install the necessary dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Build Verification
To ensure there are no compilation or static assembly errors, run the build script:
```bash
npm run build
```

---

## Vercel Deployment Instructions

This application is designed to be fully deployable on Vercel with zero additional configuration or server requirements.

### Method 1: Deploying via Vercel CLI (Quickest)

1. Install the Vercel CLI globally:
   ```bash
   npm install -g vercel
   ```

2. Login to your Vercel account:
   ```bash
   vercel login
   ```

3. Run the deployment command inside the project root directory:
   ```bash
   vercel
   ```

4. Follow the command line prompts. Once setup is complete, run the production build deploy:
   ```bash
   vercel --prod
   ```

### Method 2: Deploying via Git Integration (Recommended for CI/CD)

1. Initialize git (if not already initialized) and push the repository to GitHub, GitLab, or Bitbucket.
2. Go to the [Vercel Dashboard](https://vercel.com/dashboard).
3. Click **Add New** -> **Project**.
4. Select your imported Git repository.
5. In the configuration settings:
   * **Framework Preset**: Next.js (automatically detected)
   * **Root Directory**: `./` (or the folder containing the project files)
   * **Build Command**: `next build` (automatically detected)
   * **Output Directory**: `.next` (automatically detected)
6. Click **Deploy**. Vercel will build the static pages and deploy the site. Every push to your main branch will trigger an automatic preview rebuild.
