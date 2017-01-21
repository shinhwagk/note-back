```scala
println(List(11, 12, 13).fold(0)((l,r)=>{println(l,r);l+r} ))
println("-" * 10)
println(List(11, 12, 13).foldLeft(0)((l,r)=>{println(l,r);l+r} ))
println("-" * 10)
println(List(11, 12, 13).foldRight(0)((l,r)=>{println(l,r);l+r} ))
<!--(0,11)
(11,12)
(23,13)
36
----------
(0,11)
(11,12)
(23,13)
36
----------
(13,0)
(12,13)
(11,25)
36-->
```