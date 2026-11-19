Add-Type -AssemblyName System.Drawing

function Crop-Face {
    param(
        [string]$srcPath,
        [string]$dstPath,
        [int]$cropX,
        [int]$cropY,
        [int]$cropW,
        [int]$cropH
    )
    $src = [System.Drawing.Image]::FromFile($srcPath)
    $bmp = New-Object System.Drawing.Bitmap($cropW, $cropH)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    
    $srcRect = New-Object System.Drawing.Rectangle($cropX, $cropY, $cropW, $cropH)
    $dstRect = New-Object System.Drawing.Rectangle(0, 0, $cropW, $cropH)
    $g.DrawImage($src, $dstRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
    
    $bmp.Save($dstPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $g.Dispose()
    $bmp.Dispose()
    $src.Dispose()
}

$fullSrc = (Resolve-Path "public/images/couple.jpg").Path
$manasDst = (Join-Path (Get-Location) "public/images/manas-face.jpg")
$komalDst = (Join-Path (Get-Location) "public/images/komal-face.jpg")

# In couple.jpg (768 x 1024):
# Manas (left): center around X=320, Y=330. Crop square 300x300 around (170, 180)
Crop-Face -srcPath $fullSrc -dstPath $manasDst -cropX 170 -cropY 170 -cropW 300 -cropH 300

# Komal (right): center around X=510, Y=360. Crop square 300x300 around (360, 220)
Crop-Face -srcPath $fullSrc -dstPath $komalDst -cropX 360 -cropY 220 -cropW 300 -cropH 300

Write-Output "Faces generated!"
