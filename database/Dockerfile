# Create database/Dockerfile
FROM postgres:15-alpine

# Add metadata
LABEL maintainer="ArsalanAnwer0@users.noreply.github.com"
LABEL description="Finance Tracker Database"

# Install security updates
RUN apk update && apk upgrade

# Copy initialization script with proper ownership
COPY --chown=postgres:postgres init.sql /docker-entrypoint-initdb.d/

# Health check for database readiness
HEALTHCHECK --interval=10s --timeout=5s --start-period=30s --retries=5 \
    CMD pg_isready -U ${POSTGRES_USER:-finance_user} -d ${POSTGRES_DB:-finance_db} || exit 1

EXPOSE 5432

# Use postgres user for security
USER postgres