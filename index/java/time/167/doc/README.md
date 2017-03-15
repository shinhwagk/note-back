```java
SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");
//SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
df.setTimeZone(TimeZone.getTimeZone("UTC"));
System.out.println(df.parse("2014-08-23T09:20:05Z").toString());
//System.out.println(df.parse("2014-08-23T09:20:05.1111Z").toString());
```
