# Portfolio Backend Integration Contracts

## Overview
This document outlines the API contracts and integration plan for transitioning from mock data to a fully functional backend for Dinesh E's AI/ML portfolio.

## Current Mock Data (Frontend)
Located in `/app/frontend/src/data/mock.js`:
- **User Data**: Personal info, education, certifications, skills, languages
- **Projects**: 3 mock projects with GitHub-style data
- **Highlights**: 3 achievement cards
- **Contact Form**: Mock submission with toast notification

## Backend Endpoints to Implement

### 1. GitHub Integration
**GET /api/github/projects**
- Fetches pinned repositories from GitHub
- Authentication: GitHub token (if needed for rate limits)
- Response format:
```json
{
  "success": true,
  "projects": [
    {
      "name": "repo-name",
      "description": "Repository description",
      "url": "https://github.com/Dineshh-007/repo-name",
      "stars": 15,
      "language": "Python",
      "topics": ["machine-learning", "python"],
      "lastUpdated": "2025-01-01T00:00:00Z",
      "readme": "First 500 chars of README..."
    }
  ]
}
```

### 2. Contact Form
**POST /api/contact**
- Handles contact form submissions
- Sends email to: dineshedine007@gamil.com
- Stores submission in MongoDB
- Request body:
```json
{
  "name": "Sender Name",
  "email": "sender@example.com", 
  "message": "Message content"
}
```
- Response:
```json
{
  "success": true,
  "message": "Message sent successfully"
}
```

### 3. Resume Generation
**GET /api/resume/download**
- Generates PDF resume from portfolio data
- Returns PDF file for download
- Uses portfolio content + styling

### 4. User Data
**GET /api/user**
- Returns static user profile data
- Can be cached/static since it rarely changes

## MongoDB Models

### ContactSubmission
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  message: String,
  timestamp: Date,
  status: String // 'sent', 'pending', 'failed'
}
```

### UserProfile (Optional - can be static)
```javascript
{
  _id: ObjectId,
  name: String,
  title: String,
  location: String,
  email: String,
  links: Object,
  summary: String,
  education: Array,
  certifications: Array,
  skills: Object,
  languages: Array
}
```

## Frontend Integration Changes

### 1. GitHub Projects (Projects.jsx)
- Replace `mock.projects` with API call to `/api/github/projects`
- Add loading states and error handling
- Keep same UI components and styling

### 2. Contact Form (Contact.jsx)
- Replace mock submission with actual POST to `/api/contact`
- Handle success/error responses properly
- Keep existing form validation and UI

### 3. Resume Download (Contact.jsx)
- Replace mock download with actual GET to `/api/resume/download`
- Handle PDF file download properly

## External Dependencies
1. **GitHub API**: For fetching repository data
2. **Email Service**: SMTP or service like SendGrid/Nodemailer
3. **PDF Generation**: puppeteer or similar library
4. **Environment Variables**:
   - `GITHUB_TOKEN` (optional, for higher rate limits)
   - `EMAIL_USER` & `EMAIL_PASS` (for SMTP)
   - `SMTP_HOST` & `SMTP_PORT`

## Implementation Priority
1. **High Priority**: Contact form with email functionality
2. **High Priority**: GitHub API integration for projects
3. **Medium Priority**: PDF resume generation
4. **Low Priority**: User data endpoint (can remain static)

## Error Handling Strategy
- Graceful fallbacks to mock data if APIs fail
- User-friendly error messages
- Proper HTTP status codes
- Logging for debugging

## Testing Checklist
- [ ] GitHub API returns real repository data
- [ ] Contact form sends emails successfully
- [ ] PDF resume generates with portfolio content
- [ ] Error states display properly
- [ ] Loading states work smoothly
- [ ] Mobile responsiveness maintained