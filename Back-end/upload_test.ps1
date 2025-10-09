$ErrorActionPreference = 'Stop'
$api = 'http://localhost:8080'
Write-Output "Creating product..."
$body = @{ sku='AUTOTEST-PS'; name='PS Upload Test'; sellingPrice=9.99 } | ConvertTo-Json
$prod = Invoke-RestMethod -Uri "$api/api/products" -Method Post -ContentType 'application/json' -Body $body
Write-Output "Created product id=$($prod.id)"

$path = 'D:\projrct work\Inventory Management System\Back-end\data\images\hello.txt'
if (-not (Test-Path $path)) { Write-Output "Test file not found: $path"; exit 1 }

Write-Output "Uploading file $path to product $($prod.id)..."
$stream = [System.IO.File]::OpenRead($path)
$content = New-Object System.Net.Http.MultipartFormDataContent
$fileContent = New-Object System.Net.Http.StreamContent($stream)
$fileContent.Headers.ContentType = [System.Net.Http.Headers.MediaTypeHeaderValue]::Parse('text/plain')
$content.Add($fileContent, 'file', [System.IO.Path]::GetFileName($path))
$client = New-Object System.Net.Http.HttpClient
$resp = $client.PostAsync("$api/api/products/$($prod.id)/image", $content).Result
$respBody = $resp.Content.ReadAsStringAsync().Result
Write-Output "Upload status: $($resp.StatusCode)"
Write-Output "Upload response body: $respBody"

Write-Output "Fetching product to verify imagePath..."
$got = Invoke-RestMethod -Uri "$api/api/products/$($prod.id)" -Method Get
Write-Output "Product imagePath: $($got.imagePath)"
if ($got.imagePath) {
    $imgUrl = "$api$($got.imagePath)"
    Write-Output "Fetching image at $imgUrl"
    $r = Invoke-WebRequest -Uri $imgUrl -UseBasicParsing
    Write-Output "Image GET status: $($r.StatusCode)"
    Write-Output "Image content preview: "
    Write-Output ($r.Content -split "\n" | Select-Object -First 5)
} else {
    Write-Output "No imagePath set on product"
}
