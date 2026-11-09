# Fast visual-only check with no audio, portrait, downloads or video render.
Set-StrictMode -Version Latest
$ErrorActionPreference='Stop'
$root=$PSScriptRoot
$cfg=Get-Content -LiteralPath (Join-Path $root 'video.json') -Encoding UTF8 -Raw | ConvertFrom-Json
$mainLines = @($cfg.work.main_lines)
if ($mainLines.Count -lt 1 -or $mainLines.Count -gt 2) { throw "INVALID_TITLE_LINES" }
foreach ($line in $mainLines) { if ([string]::IsNullOrWhiteSpace([string]$line)) { throw "EMPTY_TITLE_LINE" } }
$id=[string]$cfg.video_id
if ($id -notmatch '^[A-Za-z0-9_-]{3,70}$') { throw 'INVALID_VIDEO_ID' }
$bg=Join-Path $root 'inputs/background.png'
if (-not (Test-Path -LiteralPath $bg -PathType Leaf)) { throw 'BACKGROUND_NOT_FOUND' }
$ffmpeg=(Get-Command ffmpeg -ErrorAction Stop).Source
$previewDir=Join-Path $root 'preview_output'
if (-not (Test-Path -LiteralPath $previewDir)) { New-Item -ItemType Directory -Path $previewDir | Out-Null }
$titleOverlay=Join-Path $previewDir ($id+'_titles_test.png')
$preview=Join-Path $previewDir ($id+'_layout_preview.png')
foreach($p in @($titleOverlay,$preview)) { if (Test-Path -LiteralPath $p) { throw "OUTPUT_EXISTS_NO_OVERWRITE=$p" } }
Write-Host '=== TCA FAST TITLE PREVIEW / NO AUDIO / NO DOWNLOADS ==='
. (Join-Path $root 'Generate_Title_Overlay.ps1')
& $ffmpeg -hide_banner -loglevel error -nostdin -n -i $bg -i $titleOverlay -filter_complex '[0:v][1:v]overlay=0:0:shortest=1,format=rgb24[v]' -map '[v]' -frames:v 1 -update 1 $preview
if ($LASTEXITCODE -ne 0 -or -not (Test-Path -LiteralPath $preview)) { throw 'TITLE_PREVIEW_COMPOSITING_FAILED' }
Write-Host 'TITLE_PREVIEW=PASS'
Write-Host "PREVIEW_FILE=$preview"
Write-Host 'AUDIO=NOT_USED; PORTRAIT=NOT_USED; YOUTUBE_UPLOAD=OFF; FACTORY_CHANGES=NONE; GITHUB_CHANGES=NONE'
Start-Process -FilePath $preview
