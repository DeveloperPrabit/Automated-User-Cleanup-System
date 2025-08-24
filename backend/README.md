# Automated-User-Cleanup-System
The Automated User Cleanup System is a Django-based application designed to maintain a clean and active user database

Here’s a polished and more detailed version of your README that adds clarity, structure, and highlights key details for submission:

---

# Automated User Cleanup System

A **Django-based system** for automatically cleaning up inactive users using **Celery** and **Docker**, with reporting and manual triggering via REST API.

---

## Features

* **Custom User Model** with email login and last login tracking
* **Automated cleanup** of inactive users (configurable threshold)
* **Soft delete**: deactivates inactive users instead of permanently deleting
* **Cleanup reports** stored in the database
* **REST API endpoints** to view reports and manually trigger cleanup
* **Django Admin** interface for user management
* **Dockerized** setup with PostgreSQL database and Redis broker

---

## Prerequisites

* Docker & Docker Compose installed
* Python 3.11+ (for local dev without Docker)
* Git

---

## Setup

1. **Clone the repository**:

   ```bash
   git clone <your-repo-link>
   cd user-cleanup-system/backend
   ```

2. **Configure environment variables**:

   ```bash
   cp .env.example .env
   # Edit .env as needed
   ```

3. **Start services with Docker Compose**:

   ```bash
   docker-compose up --build
   ```

4. **Access the application**:

   * Django app: [http://localhost:8000](http://localhost:8000)
   * Admin interface: [http://localhost:8000/admin](http://localhost:8000/admin)
     (default credentials: `admin@example.com` / `adminpass`)

---

## API Endpoints

| Endpoint                | Method     | Description                          |
| ----------------------- | ---------- | ------------------------------------ |
| `/api/reports/latest/`  | GET        | Retrieve the latest cleanup report   |
| `/api/reports/`         | GET        | List all cleanup reports             |
| `/api/cleanup/trigger/` | POST / GET | Manually trigger the cleanup process |

---

## Configuration

* **`INACTIVITY_THRESHOLD_DAYS`**: Number of days since the last login before a user is considered inactive (default: 30)
* All other sensitive variables (DB, Redis, email credentials) are managed via `.env`

---

## Project Structure

```
backend/
├─ app/                 # Django app: models, views, serializers, tasks
├─ config/              # Django project settings
├─ Dockerfile           # Backend Dockerfile
├─ docker-compose.yml   # Multi-container setup (DB, Redis, Worker, Beat)
├─ manage.py            # Django management script
├─ .env.example         # Environment variables template
```

---

## Celery Tasks

* **`cleanup_inactive_users`**: Runs every 5 minutes (configurable)
* **Reports**: Stores the number of users deactivated and remaining active users

---

## Notes

* Inactive users are **soft-deleted** (deactivated) to preserve data
* Logs are available via Celery worker output
* API and Admin allow full monitoring of cleanup operations

---
Project Description

The Automated User Cleanup System is a Django-based application designed to maintain a clean and active user database. Using Celery for scheduled background tasks and Redis as a message broker, the system automatically deactivates users who have been inactive for a configurable period. Cleanup operations are logged in detailed reports accessible via REST API or the Django Admin interface, allowing easy monitoring and manual intervention when necessary.

This project demonstrates best practices in Django development, task automation with Celery, and Dockerized deployment, making it easy to run locally or in production with PostgreSQL and Redis services.
