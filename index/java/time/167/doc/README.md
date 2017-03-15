```java
SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");
df.setTimeZone(TimeZone.getTimeZone("UTC"));
System.out.println(df.parse("2014-08-23T09:20:05Z").toString());
```