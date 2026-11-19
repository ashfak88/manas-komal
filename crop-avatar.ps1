Add-Type -AssemblyName System.Drawing

function Crop-RealFace {
    param(
        [string]$srcPath,
        [string]$dstPath,
        [int]$cropX,
        [int]$cropY,
        [int]$cropW,
        [int]$cropH,
        [int]$outSize = 500
    )
    $src = [System.Drawing.Image]::FromFile($srcPath)
    $bmp = New-Object System.Drawing.Bitmap($outSize, $outSize)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    
    $srcRect = New-Object System.Drawing.Rectangle($cropX, $cropY, $cropW, $cropH)
    $dstRect = New-Object System.Drawing.Rectangle(0, 0, $outSize, $outSize)
    $g.DrawImage($src, $dstRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
    
    $bmp.Save($dstPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $g.Dispose()
    $bmp.Dispose()
    $src.Dispose()
}

$fullSrc = (Resolve-Path "public/images/groom-real.jpg").Path
$manasDst = (Join-Path (Get-Location) "public/images/manas-avatar.jpg")
$komalDst = (Join-Path (Get-Location) "public/images/komal-avatar.jpg")

# In groom-real.jpg (1086 x 1448):
# Manas (left): head center is ~ (360, 330). Crop 400x400 around (160, 130)
Crop-RealFace -srcPath $fullSrc -dstPath $manasDst -cropX 160 -cropY 130 -cropW 400 -cropH 400 -outSize 500

# Komal (right): head center is ~ (550, 370). Crop 340x340 around (380, 200)
Crop-RealFace -srcPath $fullSrc -dstPath $komalDst -cropX 380 -cropY 200 -cropW 340 -cropH 340 -outSize 500

Copy-Item $manasDst "C:/Users/ashfa/.gemini/antigravity/brain/1f04ddcb-661c-4964-95d0-fe8108f273f6/manas-avatar.jpg"
Copy-Item $komalDst "C:/Users/ashfa/.gemini/antigravity/brain/1f04ddcb-661c-4964-95d0-fe8108f273f6/komal-avatar.jpg"
Write-Output "Avatar extraction complete"
