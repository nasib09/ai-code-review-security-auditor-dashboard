import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();

  return NextResponse.json({
    summary: {
      overallScore: 78,
      criticalCount: 1,
      highCount: 1,
      mediumCount: 1,
      lowCount: 0,
    },
    issues: [
      {
        id: 'ISS-8921',
        title: 'SQL Injection',
        severity: 'HIGH',
        owaspCategory: 'A03: Injection',
        cweId: 'CWE-89',
        lineRange: { startLine: 2, endLine: 5 },
        description: 'Unsanitized input is concatenated into an SQL query.',
        exploitScenario: 'An attacker can manipulate the request parameter to alter database queries.',
        suggestedFix: {
          explanation: 'Use parameterized queries and validate user-supplied identifiers before execution.',
          codeReplacement: 'const query = "SELECT * FROM users WHERE id = ?";\nreturn db.query(query, [user.input]);',
        },
      },
    ],
    filename: body.filename ?? 'authController.js',
    language: body.language ?? 'javascript',
  });
}
