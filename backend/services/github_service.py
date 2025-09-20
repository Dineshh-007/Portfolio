import aiohttp
import asyncio
from typing import List, Optional
from datetime import datetime
import os
import logging
from models.github import GitHubProject, GitHubResponse

logger = logging.getLogger(__name__)

class GitHubService:
    def __init__(self):
        self.base_url = "https://api.github.com"
        self.username = "Dineshh-007"
        self.token = os.environ.get('GITHUB_TOKEN')  # Optional for higher rate limits
        
    async def get_pinned_repositories(self) -> GitHubResponse:
        """Fetch pinned repositories for the user"""
        try:
            headers = {
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'Portfolio-App'
            }
            
            if self.token:
                headers['Authorization'] = f'token {self.token}'
            
            async with aiohttp.ClientSession() as session:
                # First, get all public repositories
                repos_url = f"{self.base_url}/users/{self.username}/repos"
                params = {
                    'sort': 'updated',
                    'direction': 'desc',
                    'per_page': 20,
                    'type': 'public'
                }
                
                async with session.get(repos_url, headers=headers, params=params) as response:
                    if response.status != 200:
                        logger.error(f"GitHub API error: {response.status}")
                        return await self._get_fallback_projects()
                    
                    repos_data = await response.json()
                    
                    # Process repositories
                    projects = []
                    for repo in repos_data[:6]:  # Get top 6 most recent repos
                        try:
                            # Get README content for each repo
                            readme_content = await self._get_readme(session, headers, repo['name'])
                            
                            project = GitHubProject(
                                name=repo['name'],
                                description=repo.get('description', ''),
                                url=repo['html_url'],
                                stars=repo.get('stargazers_count', 0),
                                language=repo.get('language'),
                                topics=repo.get('topics', []),
                                lastUpdated=datetime.fromisoformat(repo['updated_at'].replace('Z', '+00:00')),
                                readme=readme_content
                            )
                            projects.append(project)
                            
                        except Exception as e:
                            logger.error(f"Error processing repo {repo.get('name', 'unknown')}: {e}")
                            continue
                    
                    return GitHubResponse(
                        success=True,
                        projects=projects,
                        message=f"Successfully fetched {len(projects)} repositories"
                    )
                    
        except Exception as e:
            logger.error(f"Error fetching GitHub repositories: {e}")
            return await self._get_fallback_projects()
    
    async def _get_readme(self, session: aiohttp.ClientSession, headers: dict, repo_name: str) -> str:
        """Get README content for a repository"""
        try:
            readme_url = f"{self.base_url}/repos/{self.username}/{repo_name}/readme"
            async with session.get(readme_url, headers=headers) as response:
                if response.status == 200:
                    readme_data = await response.json()
                    import base64
                    content = base64.b64decode(readme_data['content']).decode('utf-8')
                    # Return first 500 characters
                    return content[:500] + "..." if len(content) > 500 else content
                return "README not available"
        except Exception as e:
            logger.error(f"Error fetching README for {repo_name}: {e}")
            return "README not available"
    
    async def _get_fallback_projects(self) -> GitHubResponse:
        """Return fallback projects if GitHub API fails"""
        fallback_projects = [
            GitHubProject(
                name="ML-Regression-Playground",
                description="End-to-end scikit-learn pipeline for regression analysis",
                url=f"https://github.com/{self.username}/ML-Regression-Playground",
                stars=15,
                language="Python",
                topics=["machine-learning", "scikit-learn", "regression"],
                lastUpdated=datetime.now(),
                readme="A comprehensive machine learning regression playground built with scikit-learn. Features data preprocessing, model training, evaluation metrics, and visualization tools for regression analysis."
            ),
            GitHubProject(
                name="Spam-Classifier",
                description="NLP-based spam detection system using Naive Bayes",
                url=f"https://github.com/{self.username}/Spam-Classifier",
                stars=8,
                language="Python",
                topics=["nlp", "machine-learning", "classification"],
                lastUpdated=datetime.now(),
                readme="Advanced spam detection system using natural language processing and machine learning. Implements TF-IDF vectorization and Naive Bayes classification with evaluation dashboard."
            ),
            GitHubProject(
                name="DSA-Snippets",
                description="Clean implementations of data structures and algorithms",
                url=f"https://github.com/{self.username}/DSA-Snippets",
                stars=22,
                language="Python",
                topics=["algorithms", "data-structures", "competitive-programming"],
                lastUpdated=datetime.now(),
                readme="Collection of well-documented data structures and algorithms implementations in Python and Java. Includes complexity analysis, test cases, and detailed explanations."
            )
        ]
        
        return GitHubResponse(
            success=True,
            projects=fallback_projects,
            message="Using fallback project data"
        )