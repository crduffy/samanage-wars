<?php

$employees = array();
$killed = array();
$exposed = array();

$sourceImageBase = "http://wiki.atlanticbt.com";

$sourceUrl = "http://wiki.atlanticbt.com/kb/index.php/Employee_Directory";
$source = file_get_contents($sourceUrl);

if (preg_match_all('#<tr.*?>(.+?)</tr>#is', $source, $m)) {
	foreach ($m[1] as $row) {
		preg_match_all('#<td>(.+?)</td>#is', $row, $tds);
		if (count($tds[1]) < 1) {
			echo "Skipping<br />";
			continue;
		}
		$name = $tds[1][1];
		$image = null;
		if (preg_match('#<img.*?src="(.+?)"#is', $tds[1][0], $r)) {
			$image = $r[1];
		} else {
			echo "No Image found";
		}
		$slug = slugify($name);
		$destinationImage = "./img/profiles/".$slug.".jpg";
		file_put_contents($destinationImage, file_get_contents($sourceImageBase.$image));
		$employees[$slug] = array(
			'name' => $name,
			'image' => $destinationImage,
		);
		if (mt_rand(0, 99) % 3 == 0) {
			if (mt_rand(0,1)) {
				$killed[] = $slug;
			} else {
				$exposed[] = $slug;
			}
		}

	}
	file_put_contents("./api/v1/employees.json", json_encode($employees));
	file_put_contents("./api/v1/killed.json", json_encode($exposed));
	file_put_contents("./api/v1/exposed.json", json_encode($killed));
} else {
	exit('Unable to find tables');
}


function slugify($txt) {
	return strtolower(preg_replace('/\W+/is', '', trim($txt)));
}