```scala
case class QueryOracleMessage(jdbcUrl: String, username: String, password: String, sqlText: String, parameters: List[Any])

object QueryOracleMessage {

  import play.api.libs.json._

  implicit object AnyJsonFormat extends Format[Any] {
    override def writes(o: Any): JsValue = o match {
      case i: Int => JsNumber(i)
      case s: String => JsString(s)
      case t: Boolean if t => JsBoolean(true)
      case f: Boolean if !f => JsBoolean(false)
    }

    override def reads(json: JsValue) = json match {
      case JsBoolean(true)  => json.validate[Boolean]
      case JsBoolean(false) => json.validate[Boolean]
      case JsString(_) => json.validate[String]
      case JsNumber(_) => json.validate[Int]
      case _ => throw new Exception("match error")
    }
  }

  implicit val format: Format[QueryOracleMessage] = Json.format
}

```