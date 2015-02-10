<?php 
// if ($_POST['test']!='') {
// 	echo $_POST['test'];
// }
	$fp=fopen("upload.txt", "wb");
	fwrite($fp, json_encode($_FILES));
	include("./php/Upload.class.php");
	include("./php/Local.class.php");
	$upload=new Upload();
	if ($info=$upload->upload()) {
		fwrite($fp, json_encode($info));
		echo json_encode($info);
	}else{
		$upload->getError();
	}
	fclose($fp);
