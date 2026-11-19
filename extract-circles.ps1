Add-Type -AssemblyName System.Drawing

function Extract-CircleOnly {
    param(
        [string]$srcPath,
        [string]$dstPath,
        [int]$cropX,
        [int]$cropY,
        [int]$cropDiameter
    )
    $src = [System.Drawing.Image]::FromFile($srcPath)
    $bmp = New-Object System.Drawing.Bitmap($cropDiameter, $cropDiameter)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

    $srcRect = New-Object System.Drawing.Rectangle($cropX, $cropY, $cropDiameter, $cropDiameter)
    $dstRect = New-Object System.Drawing.Rectangle(0, 0, $cropDiameter, $cropDiameter)
    $g.DrawImage($src, $dstRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)

    $bmp.Save($dstPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bmp.Dispose()
    $src.Dispose()
}

$groomSrc = "C:/Users/ashfa/.gemini/antigravity/brain/1f04ddcb-661c-4964-95d0-fe8108f273f6/.user_uploaded/media_1795084048432_241f24df.jpg"
Extract-CircleOnly -srcPath $groomSrc -dstPath "public/images/manas-circle.png" -cropX 24 -cropY 24 -cropDiameter 976

$brideSrc = "C:/Users/ashfa/.gemini/antigravity/brain/1f04ddcb-661c-4964-95d0-fe8108f273f6/.user_uploaded/media_1795084048742_5ec1f8ed.jpg"
Extract-CircleOnly -srcPath $brideSrc -dstPath "public/images/komal-circle.png" -cropX 16 -cropY 292 -cropDiameter 440

Copy-Item "public/images/manas-circle.png" "C:/Users/ashfa/.gemini/antigravity/brain/1f04ddcb-661c-4964-95d0-fe8108f273f6/manas-circle-check.png"
Copy-Item "public/images/komal-circle.png" "C:/Users/ashfa/.gemini/antigravity/brain/1f04ddcb-661c-4964-95d0-fe8108f273f6/komal-circle-check.png"
Write-Output "Circles extracted!"
