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
# Manas: head center is ~ X=360, Y=330.
# Box: X=130, Y=140, W=450, H=450
Crop-ImageRegion -srcPath $fullSrc -dstPath $manasDst -cropX 130 -cropY 140 -cropW 450 -cropH 450 -outSize 500

# Komal: head center is ~ X=560, Y=380.
# Box: X=430, Y=220, W=380, H=380
Crop-ImageRegion -srcPath $fullSrc -dstPath $komalDst -cropX 430 -cropY 220 -cropW 380 -cropH 380 -outSize 500

Copy-Item $manasDst "C:/Users/ashfa/.gemini/antigravity/brain/1f04ddcb-661c-4964-95d0-fe8108f273f6/manas-avatar2.jpg"
Copy-Item $komalDst "C:/Users/ashfa/.gemini/antigravity/brain/1f04ddcb-661c-4964-95d0-fe8108f273f6/komal-avatar2.jpg"
Write-Output "Avatar extraction V2 complete"
