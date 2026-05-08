$path = "d:\projects\Dashboard_theme\public\chartsData.bundle.json"
$content = [System.IO.File]::ReadAllText($path)
$pattern = '(?m)^(\s+)"tier1":'
$replacement = '$1"free": 5,' + "`r`n" + '$1"tier1":'
$newContent = [regex]::replace($content, $pattern, $replacement)
[System.IO.File]::WriteAllText($path, $newContent)
