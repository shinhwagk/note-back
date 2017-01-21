```scala
val v = 100

x match {
  case 1 => "int 1"
  case "a" => "a"
  case i:Int => i
  case d:Doule => d
  case _:Int => x
  case `v` => "v" // when x == 100
  case _:Int | _:Doule => "together"
  case _ => "no match any type"
}
```