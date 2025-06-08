# 🐳 Docker Finance Tracker — Multi-Container Production Project

---

## **Overview**

This project implements a complete, production-ready finance tracker application using Docker. You can record expenses and income, manage upcoming financial events, and see your financial overview in real time. The system demonstrates advanced containerization, multi-service orchestration, and DevOps best practices using Docker Compose.

**Key Highlights:**
- Full-stack containerized application with microservice architecture
- Production-ready deployment with security best practices
- Real-time financial data management and visualization
- Persistent data storage with PostgreSQL
- Elegant, responsive user interface

---

## **Table of Contents**

- [Project Structure](#project-structure)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Installation & Setup](#installation--setup)
- [Usage Guide](#usage-guide)
- [API Documentation](#api-documentation)
- [Production Deployment](#production-deployment)
- [Development Environment](#development-environment)
- [Container Architecture](#container-architecture)
- [Security & Best Practices](#security--best-practices)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

---

## **Project Structure**

```
.
├── README.md
├── .gitignore
├── .env.example                # Environment variables template
├── docker-compose.yml          # Development Compose file
├── docker-compose.prod.yml     # Production Compose file
├── backend/
│   ├── Dockerfile              # Node.js API container
│   ├── package.json
│   ├── package-lock.json
│   └── src/
│       ├── app.js              # Express server
│       ├── routes/
│       ├── models/
│       └── config/
├── frontend/
│   ├── Dockerfile              # Nginx static server
│   ├── index.html
│   ├── css/
│   │   ├── styles.css          # Main stylesheet
│   │   └── responsive.css      # Mobile styles
│   └── js/
│       ├── app.js              # Main application logic
│       ├── api.js              # API interaction layer
│       └── utils.js            # Utility functions
├── database/
│   ├── init.sql                # Database schema initialization
│   └── seed.sql                # Optional sample data
├── docs/
│   ├── UserGuide.md
│   └── API.md
├── scripts/
│   ├── backup.sh               # Database backup script
│   └── restore.sh              # Database restore script
└── db_data/                    # Named Docker volume for persistent data
```

---

## **Features**

### **Core Functionality**
- **💰 Expense & Income Tracking:** Record transactions with categories, amounts, and descriptions
- **📅 Financial Events Management:** Track upcoming payments, dividends, and financial deadlines
- **📊 Real-Time Dashboard:** Live financial overview with net worth calculations
- **📱 Responsive Design:** Mobile-first UI with elegant "old money" aesthetic
- **💾 Data Persistence:** PostgreSQL database with Docker volume storage

### **Technical Features**
- **🐳 Multi-Container Architecture:** Separate frontend, backend, and database services
- **🔄 Live Reload:** Development environment with hot reloading
- **🔒 Production Security:** Non-root containers, environment variable management
- **📈 Health Monitoring:** Container health checks and status monitoring
- **⚡ Performance Optimized:** Resource limits and efficient container builds

---

## **Prerequisites**

Before you begin, ensure you have the following installed on your system:

- **Docker** (version 20.10 or higher)
- **Docker Compose** (version 2.0 or higher)
- **Git** (for cloning the repository)
- **Web Browser** (Chrome, Firefox, Safari, or Edge)

### **System Requirements**
- **RAM:** Minimum 2GB available
- **Storage:** At least 1GB free space
- **Network:** Internet connection for initial Docker image pulls

---

## **Quick Start**

Get up and running in under 5 minutes:

```bash
# 1. Clone the repository
git clone https://github.com/ArsalanAnwer0/docker-finance-tracker.git
cd docker-finance-tracker

# 2. Set up environment
cp .env.example .env

# 3. Start the application
docker-compose up --build

# 4. Open your browser
open http://localhost:8080
```

That's it! Your finance tracker is now running locally.

---

## **Installation & Setup**

### **Step 1: Clone the Repository**

```bash
git clone https://github.com/ArsalanAnwer0/docker-finance-tracker.git
cd docker-finance-tracker
```

### **Step 2: Environment Configuration**

```bash
# Copy the environment template
cp .env.example .env

# Edit the environment file (optional for development)
nano .env
```

**Sample .env file:**
```env
# Database Configuration
POSTGRES_DB=finance_tracker
POSTGRES_USER=financeuser
POSTGRES_PASSWORD=securepassword123

# API Configuration
NODE_ENV=development
API_PORT=3000

# Frontend Configuration
FRONTEND_PORT=8080
```

### **Step 3: Choose Your Environment**

**For Development:**
```bash
docker-compose up --build
```

**For Production:**
```bash
docker-compose -f docker-compose.prod.yml up --build -d
```

---

## **Usage Guide**

### **Accessing the Application**

- **Development:** http://localhost:8080
- **Production:** http://localhost (port 80)

### **Main Interface Sections**

1. **📊 Financial Overview**
   - View total net worth
   - See monthly expense summaries
   - Track investment balances
   - Monitor cash flow

2. **💸 Record Transaction**
   - Add income or expense entries
   - Categorize transactions
   - Add descriptions and notes
   - Set transaction dates

3. **📋 Recent Transactions**
   - View transaction history
   - Filter by date range
   - Edit or delete entries
   - Search functionality

4. **🗓️ Upcoming Financial Events**
   - Add future payments or income
   - Set reminder dates
   - Track recurring events
   - Manage financial deadlines

### **Common Workflows**

**Recording a New Expense:**
1. Navigate to "Record Transaction"
2. Select "Expense" type
3. Choose category (Food, Transportation, etc.)
4. Enter amount and description
5. Click "Add Transaction"

**Setting Up Recurring Events:**
1. Go to "Upcoming Financial Events"
2. Click "Add New Event"
3. Enter event details
4. Set recurrence pattern
5. Save the event

---

## **API Documentation**

### **Base URL**
- Development: `http://localhost:3000/api`
- Production: `http://localhost/api`

### **Expenses Endpoints**

```http
GET    /api/expenses           # Get all expenses
POST   /api/expenses           # Create new expense
GET    /api/expenses/:id       # Get specific expense
PUT    /api/expenses/:id       # Update expense
DELETE /api/expenses/:id       # Delete expense
```

**Sample Request:**
```json
POST /api/expenses
{
  "amount": 45.99,
  "category": "food",
  "description": "Lunch at restaurant",
  "date": "2025-06-08"
}
```

**Sample Response:**
```json
{
  "id": 123,
  "amount": 45.99,
  "category": "food",
  "description": "Lunch at restaurant",
  "date": "2025-06-08T12:00:00Z",
  "created_at": "2025-06-08T14:30:00Z"
}
```

### **Events Endpoints**

```http
GET    /api/events             # Get all events
POST   /api/events             # Create new event
GET    /api/events/:id         # Get specific event
PUT    /api/events/:id         # Update event
DELETE /api/events/:id         # Delete event
```

---

## **Production Deployment**

### **Production Setup**

```bash
# Clone and navigate
git clone https://github.com/ArsalanAnwer0/docker-finance-tracker.git
cd docker-finance-tracker

# Configure production environment
cp .env.example .env
# Edit .env with production values

# Deploy with production compose
docker-compose -f docker-compose.prod.yml up --build -d

# Verify deployment
docker-compose -f docker-compose.prod.yml ps
```

### **Production Features**

- **🔒 Security Hardening:** Non-root containers, minimal attack surface
- **📊 Health Checks:** Automated container health monitoring
- **⚡ Performance:** Optimized builds, resource limits
- **💾 Data Backup:** Automated database backup scripts
- **🔄 Zero-Downtime Updates:** Rolling deployment support

### **Monitoring & Maintenance**

```bash
# Check container status
docker-compose -f docker-compose.prod.yml ps

# View logs
docker-compose -f docker-compose.prod.yml logs -f

# Backup database
./scripts/backup.sh

# Update application
docker-compose -f docker-compose.prod.yml pull
docker-compose -f docker-compose.prod.yml up -d
```

---

## **Development Environment**

### **Development Features**

- **🔄 Hot Reload:** Automatic code reloading for frontend and backend
- **🐛 Debug Mode:** Detailed error messages and logging
- **📁 Volume Mounts:** Local code changes reflected immediately
- **🔧 Development Tools:** Integrated development server

### **Development Commands**

```bash
# Start development environment
docker-compose up --build

# View development logs
docker-compose logs -f

# Restart specific service
docker-compose restart backend

# Access database directly
docker-compose exec database psql -U financeuser -d finance_tracker

# Run backend shell
docker-compose exec backend /bin/bash
```

---

## **Container Architecture**

### **Service Overview**

| Service | Technology | Port | Purpose |
|---------|------------|------|---------|
| **frontend** | Nginx + Static Files | 8080/80 | Web interface |
| **backend** | Node.js + Express | 3000 | REST API |
| **database** | PostgreSQL 15 | 5432 | Data storage |

### **Network Configuration**

- **Internal Network:** Services communicate via Docker internal networking
- **External Access:** Only frontend exposed to host machine
- **Security:** Database and backend isolated from direct external access

### **Volume Management**

- **db_data:** Persistent PostgreSQL data storage
- **Development:** Code mounted as volumes for live editing
- **Production:** Optimized with multi-stage Docker builds

---

## **Security & Best Practices**

### **Implemented Security Measures**

- **🔒 Non-Root Containers:** All services run as non-privileged users
- **🌐 Network Isolation:** Database not directly accessible from outside
- **🔐 Environment Variables:** Sensitive data stored in .env files
- **📦 Minimal Images:** Alpine-based images for reduced attack surface
- **🛡️ Health Checks:** Container health monitoring and automatic restarts

### **Best Practices**

- Regular security updates for base images
- Environment-specific configurations
- Proper secret management
- Resource limits to prevent resource exhaustion
- Comprehensive logging for security auditing

---

## **Troubleshooting**

### **Common Issues**

**Port Already in Use:**
```bash
# Check what's using the port
lsof -i :8080

# Kill the process or change port in docker-compose.yml
```

**Database Connection Issues:**
```bash
# Check database container status
docker-compose ps database

# View database logs
docker-compose logs database

# Reset database
docker-compose down -v
docker-compose up --build
```

**Container Won't Start:**
```bash
# Check container logs
docker-compose logs [service-name]

# Rebuild without cache
docker-compose build --no-cache

# Reset everything
docker-compose down --volumes --remove-orphans
docker-compose up --build
```

### **Performance Issues**

- Ensure Docker has sufficient memory allocated (minimum 2GB)
- Check available disk space for Docker volumes
- Monitor container resource usage with `docker stats`

---

## **Contributing**

Contributions are welcome! Please feel free to submit a Pull Request.

### **Development Setup**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly in both development and production environments
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### **Code Standards**

- Follow JavaScript ES6+ standards
- Use meaningful commit messages
- Include tests for new features
- Update documentation as needed

---

## **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## **Author**

**Muhammad Arsalan** (ArsalanAnwer0)  
GitHub: [github.com/ArsalanAnwer0/docker-finance-tracker](https://github.com/ArsalanAnwer0/docker-finance-tracker)

---

## **Acknowledgments**

Built to demonstrate advanced Docker, DevOps, and production microservice skills for real-world software engineering applications.

**Technologies Used:**
- Docker & Docker Compose
- Node.js & Express.js
- PostgreSQL
- Nginx
- HTML5, CSS3, JavaScript (ES6+)

---

*This project showcases production-ready containerization, microservice architecture, and modern DevOps practices suitable for enterprise-level applications.*