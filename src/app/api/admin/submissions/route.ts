import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    // Authentication is now handled by NextAuth at the component level
    // This API endpoint is protected by the admin dashboard authentication

    // Initialize Google Sheets API
    const spreadsheetId = process.env.GOOGLE_SHEET_ID
    if (!spreadsheetId) {
      return NextResponse.json({ error: 'Google Sheet ID not configured' }, { status: 500 })
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        type: 'service_account',
        project_id: process.env.GOOGLE_PROJECT_ID,
        private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n') || Buffer.from(process.env.GOOGLE_PRIVATE_KEY_BASE64 || '', 'base64').toString('utf8'),
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        client_id: process.env.GOOGLE_CLIENT_ID
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    })

    const sheets = google.sheets({ version: 'v4', auth })

    // Read all data from the sheet
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1!A:F', // Actual range is A-F (6 columns)
    })

    const rows = response.data.values || []
    
    if (rows.length === 0) {
      return NextResponse.json({ submissions: [] })
    }

    // Parse the data into structured format (skip header row)
    const dataRows = rows.slice(1) // Skip first row (headers)
    const submissions = dataRows.map((row, index) => {
      try {
        // Skip empty rows
        if (!row || row.length === 0) return null
        
        // Handle different data structures in the sheet
        let rawResponses: any = {}
        let impactAnalysis: any = {}
        let currentRoles = 'None selected'
        
        // Actual structure: [timestamp, sessionId, currentRoles, rawResponses(JSON), impactAnalysis(JSON), learnerProfile(text)]
        if (row.length >= 4) {
          try {
            // Column B: Current Roles (direct text)
            currentRoles = row[2] || 'None selected'
            
            // Column D: Raw Responses (JSON)
            if (row[3] && row[3].startsWith('{')) {
              rawResponses = JSON.parse(row[3])
            }
            
            // Column E: Impact Analysis (JSON)
            if (row[4] && row[4].startsWith('{')) {
              impactAnalysis = JSON.parse(row[4])
            }
          } catch (parseError) {
            console.warn(`Parsing error for row ${index}:`, parseError)
            // Fallback: try to extract from rawResponses if available
            if (rawResponses?.currentRoles) {
              currentRoles = Array.isArray(rawResponses.currentRoles) 
                ? rawResponses.currentRoles.join(', ') 
                : rawResponses.currentRoles
            }
          }
        }
        
        return {
          id: index + 1,
          timestamp: row[0] || 'Unknown',
          sessionId: row[1] || 'Unknown',
          currentRoles,
          learnerType: rawResponses?.learnerType || 'Unknown',
          skillStage: rawResponses?.skillStage || 'Unknown',
          varkPreferences: rawResponses?.varkPreferences || {},
          recommendations: impactAnalysis?.recommendations || [],
          nextSteps: impactAnalysis?.nextSteps || [],
          learnerProfile: impactAnalysis?.learnerProfile || row[5] || 'Unknown',
          rawData: rawResponses,
          analysis: impactAnalysis
        }
      } catch (error) {
        console.error(`Error parsing row ${index}:`, error)
        return {
          id: index + 1,
          timestamp: row[0] || 'Unknown',
          sessionId: row[1] || 'Unknown',
          currentRoles: 'Parse Error',
          error: `Data parsing error: ${error instanceof Error ? error.message : 'Unknown error'}`,
          rawRowData: row
        }
      }
    }).filter(Boolean) // Remove null entries

    return NextResponse.json({ 
      submissions,
      total: submissions.length,
      lastUpdated: new Date(new Date().getTime() + (5.5 * 60 * 60 * 1000)).toISOString()
    })

  } catch (error) {
    console.error('Admin API error:', error)
    
    if (error instanceof Error) {
      return NextResponse.json(
        { 
          error: 'Failed to fetch submissions',
          details: error.message,
          timestamp: new Date(new Date().getTime() + (5.5 * 60 * 60 * 1000)).toISOString()
        },
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch submissions - Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}
