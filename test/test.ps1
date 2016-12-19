. "lib/edit"

if (Test-Path "test/index") {
    Remove-Item -Path "test/index" -Recurse
}

New-Item -Path "test/index" -ItemType Directory | Out-Null

ConvertTo-Json -Compress @{labels=@(); categorys=@()} | Out-File "test/index.json"

Describe "label" {
    It "add label" {
        add_label "test/index" "xxx"
        $obj = Get-Content "test/index.json" | Out-String | ConvertFrom-Json
        $obj.labels -is [array] | Should Be $True
    }

    It "rename label" {
        rename_label "test/index" 0 "ff1"
        $obj = Get-Content "test/index.json" | Out-String | ConvertFrom-Json
        $obj.labels -is [array] | Should Be $True 
    }

    It "add category" {
        add_category "test/index" "xxx" 1
        $obj = Get-Content "test/index.json" | Out-String | ConvertFrom-Json
        $obj.categorys -is [array] | Should Be $True
    }

    # It "remove label" {
    #     remove_label "test/index" 0
    #     $obj = Get-Content "test/index.json" | Out-String | ConvertFrom-Json
    #     $obj.labels -is [array] | Should Be $True
    # }
}