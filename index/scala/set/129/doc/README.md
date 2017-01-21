```scala
  println(List(11, 12, 13).foldRight(0)((l,r)=>{println(l,r);l+r} ))
  println(List(11, 12, 13).foldLeft(0)((l,r)=>{println(l,r);l+r} ))
```