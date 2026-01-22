<#

aggregate.ps1

This script allows you to aggregate all the code files in the project into a single aggregate.txt file

#>

$Output = "aggregate.txt"
Set-Content -Path $Output -Value "" -Encoding UTF8

$excludeDirs = @("node_modules", ".git", ".next", "public")
$excludeFiles = @(
  "aggregate.txt",
  "aggregate.ps1",
  ".gitignore",
  "streamshelf.db",
  ".env",
  "package-lock.json",
  "README.md",
  "eslint.config.mjs",
  "next-env.d.ts",
  "next.config.ts",
  "postcss.config.mjs",
  "tsconfig.json",
  "favicon.ico",
  "LightRays.tsx"
)

$basePath = (Get-Location).Path

$files = Get-ChildItem -Recurse -File | Where-Object {
    foreach ($ex in $excludeDirs) {
        if ($_.FullName -like "*\$ex\*") { return $false }
    }
    foreach ($ef in $excludeFiles) {
        if ($_.Name -eq $ef) { return $false }
    }
    return $true
}

foreach ($f in $files) {
    # Build relative, forward-slashed path
    $relativePath = $f.FullName.Substring($basePath.Length + 1) -replace '\\', '/'
    Add-Content -Path $Output -Value "`n# $relativePath`:`n"
    try {
        Get-Content -Path $f.FullName -Raw | Add-Content -Path $Output
    } catch {
        Add-Content -Path $Output -Value "[unreadable or binary file]"
    }
}
