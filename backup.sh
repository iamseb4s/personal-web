#!/bin/bash

# --- Configuration ---
SOURCE_DIR="apps/cms/database"
BACKUP_DIR="backups"
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")

# Database files to backup
DB_FILES=("development.sqlite" "production.sqlite")

# --- Script Logic ---

# 1. Create the backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

echo "Starting backup process..."

# 2. Iterate and copy each database file
for DB_FILE in "${DB_FILES[@]}"; do
  SOURCE_PATH="$SOURCE_DIR/$DB_FILE"
  
  if [ -f "$SOURCE_PATH" ]; then
    # Construct the backup filename with timestamp
    BACKUP_FILENAME="${DB_FILE%.*}_${TIMESTAMP}.sqlite"
    DEST_PATH="$BACKUP_DIR/$BACKUP_FILENAME"
    
    # Copy the file
    cp "$SOURCE_PATH" "$DEST_PATH"
    echo "✅ Backup of '$DB_FILE' created at: $DEST_PATH"
  else
    echo "⚠️  Warning: File '$SOURCE_PATH' not found. Skipping."
  fi
done

echo "Backup process finished."
