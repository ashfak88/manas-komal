Add-Type -AssemblyName System.Drawing

function Crop-ImageRegion {
    param(
        [string]$srcPath,
        [string]$dstPath,
        [int]$cropX,
        [int]$cropY,
        [int]$cropW,
        [int]$cropH,
        [int]$outSize
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
# Shift Manas slightly left to center his face and isolate from Komal:
# X = 100, Y = 160, W = 460, H = 460
Crop-ImageRegion -srcPath $fullSrc -dstPath $manasDst -cropX 100 -cropY 160 -cropW 460 -cropH 460 -outSize 500

# Shift Komal slightly right to center her face and isolate from Manas:
# X = 470, Y = 230, W = 420, H = 420
Crop-ImageRegion -srcPath $fullSrc -dstPath $komalDst -cropX 470 -cropY 230 -cropW 420 -cropH 420 -outSize 500

Copy-Item $manasDst "C:/Users/ashfa/.gemini/antigravity/brain/1f04ddcb-661c-4964-95d0-fe8108f273f6/manas-avatar3.jpg"
Copy-Item $komalDst "C:/Users/ashfa/.gemini/antigravity/brain/1f04ddcb-661c-4964-95d0-fe8108f273f6/komal-avatar3.jpg"
Write-Output "Avatar extraction V3 complete"
