#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const blogDir = path.join(__dirname, '../data/blog')

// Pattern to detect invalid dates (with ?? in the date)
const INVALID_DATE_PATTERN = /\?+/

// Valid ISO 8601 date pattern (basic check)
const VALID_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/

function validateFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8')
  const { data } = matter(content)
  let hasError = false

  if (data.date) {
    const dateStr = data.date.toString()

    if (INVALID_DATE_PATTERN.test(dateStr)) {
      console.error(`❌ Invalid date found in ${path.relative(process.cwd(), filePath)}:`)
      console.error(`   Date: "${dateStr}"`)
      console.error(`   Please replace "?" with the actual day (e.g., "2026-01-16T12:00:00+00:00")`)
      hasError = true
    } else if (!VALID_DATE_PATTERN.test(dateStr)) {
      console.error(`⚠️  Suspicious date format in ${path.relative(process.cwd(), filePath)}:`)
      console.error(`   Date: "${dateStr}"`)
      console.error(`   Expected format: YYYY-MM-DDTHH:MM:SS+00:00`)
    }
  }

  return hasError
}

function validateBlogDates(files) {
  let hasErrors = false

  // If files are provided (from lint-staged), validate only those
  if (files && files.length > 0) {
    for (const file of files) {
      if (file.endsWith('.mdx')) {
        if (validateFile(file)) {
          hasErrors = true
        }
      }
    }
  } else {
    // Otherwise, scan all blog files
    function walkDir(dir) {
      const files = fs.readdirSync(dir)

      for (const file of files) {
        const fullPath = path.join(dir, file)
        const stat = fs.statSync(fullPath)

        if (stat.isDirectory()) {
          walkDir(fullPath)
        } else if (file.endsWith('.mdx')) {
          if (validateFile(fullPath)) {
            hasErrors = true
          }
        }
      }
    }

    if (fs.existsSync(blogDir)) {
      walkDir(blogDir)
    }
  }

  if (hasErrors) {
    process.exit(1)
  }
}

// Get files from command line arguments (from lint-staged)
const files = process.argv.slice(2)
validateBlogDates(files)
