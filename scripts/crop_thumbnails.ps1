Add-Type -AssemblyName System.Drawing

$destDir = (Resolve-Path "frontend/public/images/thumbnails").Path
Write-Host "Target Directory: $destDir"

function Crop-Image {
  param(
    [string]$SourceRelPath,
    [string]$DestFileName,
    [int]$X,
    [int]$Y,
    [int]$Width,
    [int]$Height
  )

  $srcPath = (Resolve-Path $SourceRelPath).Path
  $destPath = Join-Path $destDir $DestFileName

  $srcBmp = [System.Drawing.Bitmap]::FromFile($srcPath)
  $rect = [System.Drawing.Rectangle]::new($X, $Y, $Width, $Height)

  # Create destination bitmap
  $destBmp = [System.Drawing.Bitmap]::new($Width, $Height)
  $graphics = [System.Drawing.Graphics]::FromImage($destBmp)
  $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

  $destRect = [System.Drawing.Rectangle]::new(0, 0, $Width, $Height)
  $graphics.DrawImage($srcBmp, $destRect, $rect, [System.Drawing.GraphicsUnit]::Pixel)

  $graphics.Dispose()
  $srcBmp.Dispose()

  # Save to dest
  if (Test-Path $destPath) {
    Remove-Item $destPath -Force
  }
  $destBmp.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $destBmp.Dispose()

  Write-Host "✅ Cropped $DestFileName ($Width x $Height) from $SourceRelPath"
}

# 1. Angular & Spring Boot Darby: Video preview card from full screenshot
Crop-Image -SourceRelPath "images/Screenshot 2026-09-14 114738.png" -DestFileName "angular-spring-darby.png" -X 1214 -Y 195 -Width 360 -Height 202

# 2. Complete Web Dev Hitesh: Video preview card from full screenshot
Crop-Image -SourceRelPath "images/image copy 2.png" -DestFileName "webdev-hitesh.png" -X 1214 -Y 108 -Width 360 -Height 202

# 3. Chad Darby Spring Boot 4: Card artwork (laptop with green grass)
Crop-Image -SourceRelPath "images/Screenshot 2026-09-14 114940.png" -DestFileName "spring-boot-darby.png" -X 0 -Y 0 -Width 561 -Height 319

# 4. Ed Donner AI Engineer Core Track: Card artwork (Ed Donner photo)
Crop-Image -SourceRelPath "images/Screenshot 2026-09-14 115039.png" -DestFileName "ai-engineer-core-donner.png" -X 0 -Y 0 -Width 747 -Height 424

# 5. Angela Yu Python Bootcamp: Card artwork (Angela Yu photo)
Crop-Image -SourceRelPath "images/Screenshot 2026-09-14 115052.png" -DestFileName "python-bootcamp-angela.png" -X 0 -Y 0 -Width 585 -Height 327

# 6. Coding Revolution Google Flow: Card artwork
Crop-Image -SourceRelPath "images/Screenshot 2026-09-14 115237.png" -DestFileName "google-flow-coding-rev.png" -X 0 -Y 0 -Width 552 -Height 307

# 7. Madan Reddy Java Full Stack React: Card artwork
Crop-Image -SourceRelPath "images/Screenshot 2026-09-14 115005.png" -DestFileName "java-fullstack-react-madan.png" -X 0 -Y 0 -Width 402 -Height 226

# 8. Navin Reddy Spring & Spring Boot AI: Card artwork
Crop-Image -SourceRelPath "images/Screenshot 2026-09-14 114951.png" -DestFileName "spring-ai-security-navin.png" -X 0 -Y 0 -Width 455 -Height 256

# 9. Navin Reddy Cloud & Spring AI: Card artwork
Crop-Image -SourceRelPath "images/Screenshot 2026-09-14 115018.png" -DestFileName "spring-cloud-ai-navin.png" -X 0 -Y 0 -Width 400 -Height 230

# 10. Faisal Memon EmbarkX eCommerce: Card artwork
Crop-Image -SourceRelPath "images/Screenshot 2026-09-14 115011.png" -DestFileName "spring-ecommerce-embarkx.png" -X 0 -Y 0 -Width 405 -Height 221

Write-Host "`n🎉 ALL THUMBNAILS CROPPED TO EXACT COURSE PICTURES!"
