# Multi-stage build for production optimization
FROM node:18-alpine AS base

# Add security labels and metadata
LABEL maintainer="ArsalanAnwer0@users.noreply.github.com"
LABEL description="Finance Tracker Backend API"
LABEL version="1.0.0"
LABEL project="docker-finance-tracker"

# Install security updates and dumb-init for proper signal handling
RUN apk update && apk upgrade && apk add --no-cache dumb-init

# Create app directory
WORKDIR /app

# Copy package files first for optimal Docker layer caching
COPY package*.json ./

# Install dependencies with clean cache
RUN npm ci --only=production && npm cache clean --force

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Copy source code with proper ownership
COPY --chown=nodejs:nodejs src/ ./src/

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 5000

# Health check for container monitoring
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:5000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Use dumb-init for proper signal handling in containers
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "src/server.js"]