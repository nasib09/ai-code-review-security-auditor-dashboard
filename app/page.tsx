const files = [
  { name: 'src/index.js', active: true },
  { name: 'src/auth.js', active: false },
  { name: 'src/db.js', active: false },
  { name: 'src/validators.js', active: false },
  { name: 'src/config.ts', active: false },
];

const findings = [
  {
    id: 'ISS-8921',
    title: 'SQL Injection',
    severity: 'HIGH',
    tag: 'OWASP A03 · CWE-89',
    file: 'src/auth.js:L12-L18',
    description: 'A request parameter is concatenated directly into a SQL statement without validation or parameterization.',
    exploit: 'An attacker can tamper with the userId parameter to exfiltrate or alter database records.',
    fix: 'Use a prepared statement and validate the input type before building the query.',
  },
  {
    id: 'ISS-4532',
    title: 'Hardcoded Secret',
    severity: 'MEDIUM',
    tag: 'OWASP A02 · CWE-798',
    file: 'src/config.ts:L18-L25',
    description: 'A production API key is embedded directly in source code and committed to the repository.',
    exploit: 'Any collaborator with repository access can read or reuse the secret and compromise the upstream service.',
    fix: 'Move the key into a secure environment variable or secret manager.',
  },
  {
    id: 'ISS-1180',
    title: 'Insecure Deserialization',
    severity: 'CRITICAL',
    tag: 'OWASP A08 · CWE-502',
    file: 'src/db.js:L44-L56',
    description: 'Untrusted input is deserialized without type restrictions or signature validation.',
    exploit: 'Malicious payloads may execute arbitrary code inside the application process.',
    fix: 'Replace unsafe deserialization with a strict typed parser and validate expected schema.',
  },
];

const riskWeights = {
  CRITICAL: 30,
  HIGH: 15,
  MEDIUM: 7,
  LOW: 2,
  INFO: 0,
};

const riskScore = Math.max(
  0,
  100 -
    findings.reduce((total, current) => total + (riskWeights[current.severity as keyof typeof riskWeights] ?? 0), 0),
);

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-indigo-500/15 px-2 py-1 text-lg font-bold text-indigo-300">AI</div>
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Security suite</p>
              <h1 className="text-lg font-semibold text-white">Code Review & Auditor</h1>
            </div>
          </div>

          <div className="flex flex-1 items-center justify-center gap-3 px-4">
            <input
              className="w-full max-w-2xl rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-200 outline-none transition focus:border-indigo-400"
              value="https://github.com/acme/platform-api"
              readOnly
            />
            <button className="rounded-xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-indigo-400">
              Scan Repo
            </button>
          </div>

          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-right">
            <div className="text-[10px] uppercase tracking-[0.25em] text-emerald-300">Risk Score</div>
            <div className="text-2xl font-bold text-emerald-300">{riskScore}/100</div>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl grid-cols-12 gap-6 px-6 py-6">
        <aside className="col-span-3 rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Files</h2>
            <span className="rounded-full bg-slate-800 px-2 py-1 text-[10px] text-slate-300">12 files</span>
          </div>

          <div className="space-y-2">
            {files.map((file) => (
              <button
                key={file.name}
                className={`flex w-full items-center justify-between rounded-xl border px-3 py-2 text-left text-sm transition ${
                  file.active
                    ? 'border-indigo-500/40 bg-indigo-500/10 text-indigo-100'
                    : 'border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span>{file.name}</span>
                {file.active && <span className="h-2.5 w-2.5 rounded-full bg-indigo-400" />}
              </button>
            ))}
          </div>
        </aside>

        <section className="col-span-5 rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <div className="mb-4 flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Active file</p>
              <h2 className="text-lg font-semibold text-white">src/auth.js</h2>
            </div>
            <div className="flex gap-2">
              <span className="rounded-full bg-slate-800 px-2 py-1 text-[10px] text-slate-300">JavaScript</span>
              <span className="rounded-full bg-red-500/10 px-2 py-1 text-[10px] text-red-300">3 findings</span>
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-[#0b1220] p-4 font-mono text-sm leading-7 text-slate-200">
            <div className="flex gap-3">
              <div className="w-7 text-right text-slate-500">1</div>
              <div>function authenticate(user) {'{'}</div>
            </div>
            <div className="flex gap-3">
              <div className="w-7 text-right text-slate-500">2</div>
              <div className="text-rose-300">{'  const query = "SELECT * FROM users WHERE id = " + user.input;'}</div>
            </div>
            <div className="flex gap-3">
              <div className="w-7 text-right text-slate-500">3</div>
              <div>  return db.query(query);</div>
            </div>
            <div className="flex gap-3">
              <div className="w-7 text-right text-slate-500">4</div>
              <div>{'}'}</div>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-100">
            <div className="mb-1 font-semibold">Inline Risk Badge</div>
            <span className="font-mono text-rose-200">SQL Injection @ L2</span>
          </div>
        </section>

        <aside className="col-span-4 rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Audit findings</h2>
            <div className="flex gap-2 text-[10px]">
              {['All', 'Critical', 'High', 'Medium', 'Low'].map((filter) => (
                <span key={filter} className="rounded-full border border-slate-700 px-2 py-1 text-slate-300">
                  {filter}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {findings.map((item) => (
              <div key={item.id} className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                <div className="mb-2 flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-slate-400">{item.id}</div>
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  </div>
                  <span
                    className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase ${
                      item.severity === 'CRITICAL'
                        ? 'bg-red-500/15 text-red-300'
                        : item.severity === 'HIGH'
                          ? 'bg-orange-500/15 text-orange-300'
                          : item.severity === 'MEDIUM'
                            ? 'bg-yellow-500/15 text-yellow-300'
                            : 'bg-blue-500/15 text-blue-300'
                    }`}
                  >
                    {item.severity}
                  </span>
                </div>

                <div className="mb-2 text-xs font-medium text-indigo-300">{item.tag}</div>
                <div className="mb-2 text-xs text-slate-400">{item.file}</div>
                <p className="mb-3 text-sm text-slate-300">{item.description}</p>
                <div className="mb-3 rounded-lg border border-slate-800 bg-slate-900 p-3 text-sm text-slate-300">
                  <span className="font-semibold text-slate-100">Exploit scenario:</span> {item.exploit}
                </div>
                <div className="mb-4 rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-100">
                  <span className="font-semibold">Suggested fix:</span> {item.fix}
                </div>

                <button className="w-full rounded-xl bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-400">
                  Apply Fix
                </button>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </main>
  );
}
