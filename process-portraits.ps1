Add-Type -AssemblyName System.Drawing

# 1. Groom image: media_1795084048432_241f24df.jpg is already 1024x1024 square with the gold circular mandala!
$groomSrc = "C:/Users/ashfa/.gemini/antigravity/brain/1f04ddcb-661c-4964-95d0-fe8108f273f6/.user_uploaded/media_1795084048432_241f24df.jpg"
Copy-Item $groomSrc "public/images/manas-portrait.jpg"

# 2. Bride image: media_1795084048742_5ec1f8ed.jpg is 472x1024 with black bars on top and bottom.
# Let's inspect where the square mandala is located inside the 472x1024 screenshot.
# Width is 472. The central circular content has width 472.
# Let's find the vertical bounds:
$brideSrc = "C:/Users/ashfa/.gemini/antigravity/brain/1f04ddcb-661c-4964-95d0-fe8108f273f6/.user_uploaded/media_1795084048742_5ec1f8ed.jpg"
$src = [System.Drawing.Image]::FromFile($brideSrc)

# The circle is horizontally full width (472).
# Let's crop a 472 x 472 square from Y around (1024 - 472) / 2 = 276.
# Let's verify by testing Y offset around 275.
$cropY = 276
$cropSize = 472
$bmp = New-Object System.Drawing.Bitmap($cropSize, $cropSize)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$srcRect = New-Object System.Drawing.Rectangle(0, $cropY, $cropSize, $cropSize)
$dstRect = New-Object System.Drawing.Rectangle(0, 0, $cropSize, $cropSize)
$g.DrawImage($src, $dstRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
$bmp.Save("public/images/komal-portrait.jpg", [System.Drawing.Imaging.ImageFormat]::Jpeg)

$g.Dispose()
$bmp.Dispose()
$src.Dispose()

Copy-Item "public/images/manas-portrait.jpg" "C:/Users/ashfa/.gemini/antigravity/brain/1f04ddcb-661c-4964-95d0-fe8108f273f6/manas-portrait-check.jpg"
Copy-Item "public/images/komal-portrait.jpg" "C:/Users/ashfa/.gemini/antigravity/brain/1f04ddcb-661c-4964-95d0-fe8108f273f6/komal-portrait-check.jpg"

Write-Output "Extracted both portraits!"
