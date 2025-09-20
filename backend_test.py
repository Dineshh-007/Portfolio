#!/usr/bin/env python3
"""
Comprehensive Backend API Testing Suite for Portfolio Application
Tests all backend endpoints with real data and proper error handling
"""

import asyncio
import aiohttp
import json
import os
import sys
from datetime import datetime
from typing import Dict, Any, List
import logging

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class PortfolioAPITester:
    def __init__(self):
        # Get backend URL from frontend .env file
        self.base_url = self._get_backend_url()
        self.session = None
        self.test_results = []
        
    def _get_backend_url(self) -> str:
        """Get backend URL from frontend .env file"""
        try:
            with open('/app/frontend/.env', 'r') as f:
                for line in f:
                    if line.startswith('REACT_APP_BACKEND_URL='):
                        return line.split('=', 1)[1].strip()
        except Exception as e:
            logger.error(f"Error reading frontend .env: {e}")
        
        # Fallback
        return "https://aiml-portfolio-9.preview.emergentagent.com"
    
    async def setup(self):
        """Setup test session"""
        timeout = aiohttp.ClientTimeout(total=30)
        self.session = aiohttp.ClientSession(timeout=timeout)
        logger.info(f"Testing backend at: {self.base_url}")
    
    async def cleanup(self):
        """Cleanup test session"""
        if self.session:
            await self.session.close()
    
    def log_test_result(self, test_name: str, success: bool, details: str, response_data: Any = None):
        """Log test result"""
        status = "✅ PASS" if success else "❌ FAIL"
        logger.info(f"{status} {test_name}: {details}")
        
        self.test_results.append({
            'test': test_name,
            'success': success,
            'details': details,
            'response_data': response_data,
            'timestamp': datetime.now().isoformat()
        })
    
    async def test_health_check(self):
        """Test GET /api/health endpoint"""
        test_name = "Health Check API"
        try:
            async with self.session.get(f"{self.base_url}/api/health") as response:
                if response.status == 200:
                    data = await response.json()
                    
                    # Verify response structure
                    required_fields = ['status', 'timestamp', 'services']
                    missing_fields = [field for field in required_fields if field not in data]
                    
                    if missing_fields:
                        self.log_test_result(test_name, False, f"Missing fields: {missing_fields}", data)
                        return
                    
                    # Check services status
                    services = data.get('services', {})
                    expected_services = ['database', 'github_api', 'email_service']
                    
                    for service in expected_services:
                        if service not in services:
                            self.log_test_result(test_name, False, f"Missing service status: {service}", data)
                            return
                    
                    self.log_test_result(test_name, True, f"Health check passed - Status: {data['status']}", data)
                else:
                    self.log_test_result(test_name, False, f"HTTP {response.status}: {await response.text()}")
                    
        except Exception as e:
            self.log_test_result(test_name, False, f"Exception: {str(e)}")
    
    async def test_github_projects(self):
        """Test GET /api/github/projects endpoint"""
        test_name = "GitHub Projects API"
        try:
            async with self.session.get(f"{self.base_url}/api/github/projects") as response:
                if response.status == 200:
                    data = await response.json()
                    
                    # Verify response structure
                    if not isinstance(data, dict) or 'success' not in data or 'projects' not in data:
                        self.log_test_result(test_name, False, "Invalid response structure", data)
                        return
                    
                    projects = data.get('projects', [])
                    if not isinstance(projects, list):
                        self.log_test_result(test_name, False, "Projects should be a list", data)
                        return
                    
                    if len(projects) == 0:
                        self.log_test_result(test_name, False, "No projects returned", data)
                        return
                    
                    # Verify project structure
                    required_project_fields = ['name', 'url', 'stars', 'lastUpdated']
                    for i, project in enumerate(projects[:3]):  # Check first 3 projects
                        missing_fields = [field for field in required_project_fields if field not in project]
                        if missing_fields:
                            self.log_test_result(test_name, False, f"Project {i} missing fields: {missing_fields}", data)
                            return
                    
                    # Check if we got real GitHub data (username should be Dineshh-007)
                    github_urls = [p.get('url', '') for p in projects]
                    valid_github_urls = [url for url in github_urls if 'github.com/Dineshh-007' in url]
                    
                    if len(valid_github_urls) == 0:
                        self.log_test_result(test_name, False, "No valid GitHub URLs for user Dineshh-007", data)
                        return
                    
                    self.log_test_result(test_name, True, f"Retrieved {len(projects)} projects for Dineshh-007", {
                        'project_count': len(projects),
                        'sample_project': projects[0]['name'] if projects else None
                    })
                else:
                    self.log_test_result(test_name, False, f"HTTP {response.status}: {await response.text()}")
                    
        except Exception as e:
            self.log_test_result(test_name, False, f"Exception: {str(e)}")
    
    async def test_contact_form_valid(self):
        """Test POST /api/contact with valid data"""
        test_name = "Contact Form API (Valid Data)"
        
        contact_data = {
            "name": "John Smith",
            "email": "john.smith@example.com",
            "message": "Hello Dinesh! I'm interested in discussing potential collaboration opportunities. Your portfolio showcases impressive machine learning projects, particularly the regression playground. I'd love to connect and explore how we might work together on AI/ML initiatives."
        }
        
        try:
            headers = {'Content-Type': 'application/json'}
            async with self.session.post(
                f"{self.base_url}/api/contact", 
                json=contact_data,
                headers=headers
            ) as response:
                if response.status == 200:
                    data = await response.json()
                    
                    # Verify response structure
                    if not isinstance(data, dict) or 'success' not in data or 'message' not in data:
                        self.log_test_result(test_name, False, "Invalid response structure", data)
                        return
                    
                    if data.get('success') != True:
                        self.log_test_result(test_name, False, f"Success should be True, got: {data.get('success')}", data)
                        return
                    
                    self.log_test_result(test_name, True, f"Contact form submitted successfully: {data.get('message')}", data)
                else:
                    error_text = await response.text()
                    self.log_test_result(test_name, False, f"HTTP {response.status}: {error_text}")
                    
        except Exception as e:
            self.log_test_result(test_name, False, f"Exception: {str(e)}")
    
    async def test_contact_form_validation(self):
        """Test POST /api/contact with invalid data for validation"""
        test_cases = [
            {
                "name": "Contact Form Validation (Missing Name)",
                "data": {"email": "test@example.com", "message": "This is a test message with sufficient length."},
                "expected_status": 422
            },
            {
                "name": "Contact Form Validation (Invalid Email)",
                "data": {"name": "Test User", "email": "invalid-email", "message": "This is a test message with sufficient length."},
                "expected_status": 422
            },
            {
                "name": "Contact Form Validation (Short Message)",
                "data": {"name": "Test User", "email": "test@example.com", "message": "Short"},
                "expected_status": 422
            },
            {
                "name": "Contact Form Validation (Missing Message)",
                "data": {"name": "Test User", "email": "test@example.com"},
                "expected_status": 422
            }
        ]
        
        for test_case in test_cases:
            try:
                headers = {'Content-Type': 'application/json'}
                async with self.session.post(
                    f"{self.base_url}/api/contact",
                    json=test_case["data"],
                    headers=headers
                ) as response:
                    if response.status == test_case["expected_status"]:
                        self.log_test_result(test_case["name"], True, f"Validation working - HTTP {response.status}")
                    else:
                        error_text = await response.text()
                        self.log_test_result(test_case["name"], False, f"Expected HTTP {test_case['expected_status']}, got {response.status}: {error_text}")
                        
            except Exception as e:
                self.log_test_result(test_case["name"], False, f"Exception: {str(e)}")
    
    async def test_user_profile(self):
        """Test GET /api/user endpoint"""
        test_name = "User Profile API"
        try:
            async with self.session.get(f"{self.base_url}/api/user") as response:
                if response.status == 200:
                    data = await response.json()
                    
                    # Verify response structure
                    if not isinstance(data, dict) or 'success' not in data or 'data' not in data:
                        self.log_test_result(test_name, False, "Invalid response structure", data)
                        return
                    
                    user_data = data.get('data', {})
                    required_fields = ['name', 'title', 'location', 'email', 'links', 'summary', 'education', 'certifications', 'skills']
                    missing_fields = [field for field in required_fields if field not in user_data]
                    
                    if missing_fields:
                        self.log_test_result(test_name, False, f"Missing user data fields: {missing_fields}", data)
                        return
                    
                    # Verify specific user data
                    if user_data.get('name') != 'Dinesh E':
                        self.log_test_result(test_name, False, f"Expected name 'Dinesh E', got: {user_data.get('name')}", data)
                        return
                    
                    # Check links structure
                    links = user_data.get('links', {})
                    if 'linkedin' not in links or 'github' not in links:
                        self.log_test_result(test_name, False, "Missing linkedin or github links", data)
                        return
                    
                    self.log_test_result(test_name, True, f"User profile retrieved for {user_data.get('name')}", {
                        'name': user_data.get('name'),
                        'title': user_data.get('title', '')[:50] + '...' if len(user_data.get('title', '')) > 50 else user_data.get('title', ''),
                        'education_count': len(user_data.get('education', [])),
                        'certifications_count': len(user_data.get('certifications', []))
                    })
                else:
                    self.log_test_result(test_name, False, f"HTTP {response.status}: {await response.text()}")
                    
        except Exception as e:
            self.log_test_result(test_name, False, f"Exception: {str(e)}")
    
    async def test_resume_download(self):
        """Test GET /api/resume/download endpoint"""
        test_name = "Resume Download API"
        try:
            async with self.session.get(f"{self.base_url}/api/resume/download") as response:
                if response.status == 200:
                    # Check content type
                    content_type = response.headers.get('content-type', '')
                    
                    # For now, it returns HTML (as per the implementation)
                    if 'text/html' not in content_type:
                        self.log_test_result(test_name, False, f"Expected HTML content type, got: {content_type}")
                        return
                    
                    # Check content length
                    content = await response.text()
                    if len(content) < 1000:  # Resume should be substantial
                        self.log_test_result(test_name, False, f"Resume content too short: {len(content)} characters")
                        return
                    
                    # Check if it contains expected resume content
                    if 'Dinesh E' not in content:
                        self.log_test_result(test_name, False, "Resume doesn't contain expected name")
                        return
                    
                    # Check for key resume sections
                    expected_sections = ['Summary', 'Education', 'Certifications', 'Technical Skills']
                    missing_sections = [section for section in expected_sections if section not in content]
                    
                    if missing_sections:
                        self.log_test_result(test_name, False, f"Resume missing sections: {missing_sections}")
                        return
                    
                    self.log_test_result(test_name, True, f"Resume generated successfully ({len(content)} characters)", {
                        'content_type': content_type,
                        'content_length': len(content),
                        'contains_name': 'Dinesh E' in content
                    })
                else:
                    self.log_test_result(test_name, False, f"HTTP {response.status}: {await response.text()}")
                    
        except Exception as e:
            self.log_test_result(test_name, False, f"Exception: {str(e)}")
    
    async def test_cors_headers(self):
        """Test CORS headers configuration"""
        test_name = "CORS Headers Configuration"
        try:
            # Test preflight request
            headers = {
                'Origin': 'https://example.com',
                'Access-Control-Request-Method': 'POST',
                'Access-Control-Request-Headers': 'Content-Type'
            }
            
            async with self.session.options(f"{self.base_url}/api/contact", headers=headers) as response:
                cors_headers = {
                    'access-control-allow-origin': response.headers.get('access-control-allow-origin'),
                    'access-control-allow-methods': response.headers.get('access-control-allow-methods'),
                    'access-control-allow-headers': response.headers.get('access-control-allow-headers')
                }
                
                # Check if CORS is properly configured
                if cors_headers['access-control-allow-origin'] == '*':
                    self.log_test_result(test_name, True, "CORS properly configured for all origins", cors_headers)
                else:
                    self.log_test_result(test_name, False, f"CORS not properly configured: {cors_headers}")
                    
        except Exception as e:
            self.log_test_result(test_name, False, f"Exception: {str(e)}")
    
    async def test_api_response_times(self):
        """Test API response times"""
        test_name = "API Response Times"
        endpoints = [
            "/api/health",
            "/api/user",
            "/api/github/projects"
        ]
        
        response_times = {}
        
        for endpoint in endpoints:
            try:
                start_time = datetime.now()
                async with self.session.get(f"{self.base_url}{endpoint}") as response:
                    end_time = datetime.now()
                    response_time = (end_time - start_time).total_seconds()
                    response_times[endpoint] = response_time
                    
                    if response.status != 200:
                        self.log_test_result(test_name, False, f"{endpoint} returned HTTP {response.status}")
                        return
                        
            except Exception as e:
                self.log_test_result(test_name, False, f"Exception testing {endpoint}: {str(e)}")
                return
        
        # Check if all response times are reasonable (< 10 seconds)
        slow_endpoints = {ep: time for ep, time in response_times.items() if time > 10}
        
        if slow_endpoints:
            self.log_test_result(test_name, False, f"Slow endpoints (>10s): {slow_endpoints}", response_times)
        else:
            avg_time = sum(response_times.values()) / len(response_times)
            self.log_test_result(test_name, True, f"All endpoints respond within acceptable time (avg: {avg_time:.2f}s)", response_times)
    
    async def test_error_handling(self):
        """Test error handling for non-existent endpoints"""
        test_name = "Error Handling (404)"
        try:
            async with self.session.get(f"{self.base_url}/api/nonexistent") as response:
                if response.status == 404:
                    self.log_test_result(test_name, True, "404 error properly returned for non-existent endpoint")
                else:
                    self.log_test_result(test_name, False, f"Expected 404, got HTTP {response.status}")
                    
        except Exception as e:
            self.log_test_result(test_name, False, f"Exception: {str(e)}")
    
    async def run_all_tests(self):
        """Run all backend API tests"""
        logger.info("=" * 60)
        logger.info("STARTING PORTFOLIO BACKEND API TESTS")
        logger.info("=" * 60)
        
        await self.setup()
        
        try:
            # Run all tests
            await self.test_health_check()
            await self.test_github_projects()
            await self.test_contact_form_valid()
            await self.test_contact_form_validation()
            await self.test_user_profile()
            await self.test_resume_download()
            await self.test_cors_headers()
            await self.test_api_response_times()
            await self.test_error_handling()
            
        finally:
            await self.cleanup()
        
        # Print summary
        self.print_summary()
    
    def print_summary(self):
        """Print test summary"""
        logger.info("=" * 60)
        logger.info("TEST SUMMARY")
        logger.info("=" * 60)
        
        total_tests = len(self.test_results)
        passed_tests = len([r for r in self.test_results if r['success']])
        failed_tests = total_tests - passed_tests
        
        logger.info(f"Total Tests: {total_tests}")
        logger.info(f"Passed: {passed_tests}")
        logger.info(f"Failed: {failed_tests}")
        logger.info(f"Success Rate: {(passed_tests/total_tests)*100:.1f}%")
        
        if failed_tests > 0:
            logger.info("\nFAILED TESTS:")
            for result in self.test_results:
                if not result['success']:
                    logger.info(f"❌ {result['test']}: {result['details']}")
        
        logger.info("=" * 60)
        
        return passed_tests, failed_tests

async def main():
    """Main test runner"""
    tester = PortfolioAPITester()
    await tester.run_all_tests()
    
    # Return exit code based on test results
    passed, failed = tester.print_summary()
    return 0 if failed == 0 else 1

if __name__ == "__main__":
    exit_code = asyncio.run(main())
    sys.exit(exit_code)