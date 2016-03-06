<?php
/*
$lang = $_GET['language'];
$comment1 = $_GET['comment'];
$title = $_GET['title'];
*/

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$lang = $request->language;
$comment1 = $request->comment;
$title  = $request->title;

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

$transReturn = array();

$trans = $ya->translate($comment1, $lang);
$tranComment = $trans->text;
$trans = $ya->translate($title, $lang);
$tranTitle = $trans->text;

$transReturn['comment'] = $tranComment;
$transReturn['title'] = $tranTitle;

echo json_encode($transReturn,true);
?>