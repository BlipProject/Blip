<?php
$lang = $_GET['language'];
$comment1 = $_GET['comment'];

class yandex 
{
	private $APIkey = "trnsl.1.1.20160220T190736Z.609cf09b9589f911.901be6942852a889c2d1eb51d61464a5c6ec2d8c"; //See http://api.yandex.com/translate/doc/dg/reference/translate.xml
	public function translate ($text,$lang) {
	  $t 			= urlencode($text);
	  $url 			= "https://translate.yandex.net/api/v1.5/tr/translate?key=";
	  $url			.= "{$this->APIkey}&format=html&lang={$lang}&text={$t}";
	  if ($xml = simplexml_load_file($url)) {
		return $xml;
	  }
	  else return false;
	} // yandex_trans
}
$ya 	= new yandex();
$trans 	= $ya->translate($comment1, $lang);
echo $trans->text;
?>