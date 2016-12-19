# $Hso = New-Object Net.HttpListener
# $Hso.Prefixes.Add("http://+:8000/")
# $Hso.Start()
# $a = 1
# While ($Hso.IsListening) {
#     $HC = $Hso.GetContext()
#     $HRes = $HC.Response
#     $HRes.Headers.Add("Content-Type","text/plain")

#     $a += 1
#     $Buf = [Text.Encoding]::UTF8.GetBytes($a)
#     $HRes.ContentLength64 = $Buf.Length
#     $HRes.OutputStream.Write($Buf,0,$Buf.Length)
#     $HRes.Close()
# }
# $Hso.Stop()



$a = 1 
$b = 1
 switch  ($b) {
     1 {
         $a = 2
     }
 }

 echo $a