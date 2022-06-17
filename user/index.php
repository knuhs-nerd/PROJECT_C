<?php
	date_default_timezone_set('Asia/Seoul');

	include_once '../module/db.php';
	include_once '../module/util.php';
	include_once '../module/session.php';

	if (!login_check()) {
	?>
		<script>
			alert("로그인해주세요");
			location.href = `${location.origin}/account/signin`;
		</script>
	<?php
		exit();
	}

	$db = new DB("localhost", "root", "toor", "dong");
?>
<!doctype html>
<html lang="ko">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"><title>NeRd - 출석</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=yes"/>
	<meta name="format-detection" content="telephone=no"/>
    <meta property="og:locale" content="ko_KR"><meta http-equiv="Expires" content="0"> <meta http-equiv="Pragma" content="no-cache"><meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
	<link rel="stylesheet" href="/src/css/xeicon.css">
	<link rel="stylesheet" href="/src/css/swiper.min.css">
	<link rel="stylesheet" href="/src/css/layout_mo.css?ver=1.1">
	<link rel="stylesheet" href="https://fonts.googleapis.com/earlyaccess/notosanskr.css">
	<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap">
	<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
	<script type="text/javascript" src="/src/js/util.js"></script>
	<script type="text/javascript" src="/src/js/swiper.js"></script>
	<script>
		const today = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay() + new Date().getDate() - 1;
		window.onload = function() {
			//$("#myname").text("<?=$_SESSION['user']['name']?>");
			$(".now").text((formatDate(new Date()).substring(0,7)+"월").replace("\-", "년 "))
			
			var firstDate = new Date().setDate(1);
			var rowNum = new Date(firstDate).getDay() <= 4 ? 5:6;
			
			for(var i = 0; i < rowNum; i++) {
				var w = (i * 7) - new Date(firstDate).getDay();
				$("tbody").append(`
					<tr>
						<td>`+(w+1)+`</td>
						<td>`+(w+2)+`</td>
						<td>`+(w+3)+`</td>
						<td>`+(w+4)+`</td>
						<td>`+(w+5)+`</td>
						<td>`+(w+6)+`</td>
						<td>`+(w+7)+`</td>
					</tr>
				`);
			}

			var lastDay = new Date(new Date().getFullYear(), new Date().getMonth()+1, 0).getDate();

			for(var i = 0; i < $("td").length; i++) {
				if($("td")[i].innerText < 1 || $("td")[i].innerText > lastDay) {
					$("td")[i].innerText = '';
				}
				$("td")[i].dataset.check = 0;
			}

			for(var i = 0; i < $("td").length; i++) {
			    if($("td")[i].innerText == new Date(new Date().getFullYear(), new Date().getMonth()+1, new Date().getDate())) {
					$("td")[i].innerHTML = $("td")[i].innerText + '<div><img src="images/ico_att.png" alt=""></div>';
				}
			}

			<?php
				$date = date("Y-m-01 00:00:00");
				$seq = $_SESSION['user']['seq'];
				$t = date('w', strtotime($date));
                $query = $db -> query("SELECT * FROM chulsuk where time_ >= ? AND user_seq = ?", [$date, $seq]);
				
				if ($query != null) {
					foreach ($query as $row) {
						$time_ = date('H:i:s', strtotime($row['time_']));
						$date = date('d', strtotime($row['time_'])) + $t - 1;
						?>
						$("td")[<?=$date?>].dataset.check = 1;
						$("td")[<?=$date?>].innerHTML = $("td")[<?=$date?>].innerHTML + '<br /><strong><?=$time_;?> 출석</strong>'
						<?php
					}
				}
            ?>
		};
	</script>
</head>
<body>

<header style="height: 50px;">
	<div class="header_wrap">
		<div class="header ">
			<div class="logo_wrap">
				<a href="./"><img src="/src/img/logo.png" alt=""></a>
			</div>

			<div id="needLogin" class="section">
				<div class="lg"><i class="xi xi-user-o"></i>환영합니다 <?=$_SESSION['user']['name']?>님</div>
			</div>
		</div>
	</div>
</header>

<div class="contents noTopImg">
	<div class="page_title">
		<h1 class="tt">출석체크</h1>
	</div>

	<div class="calendar">
		<div class="cal_arrow">
			<span class="now"></span>
			<a id="check" class="btn_round submit" style="background-color: #696969; display: none;">출석체크 하기</a>
		</div>

		<div class="tbl_cal tbl_wrap">
			<table>
				<colgroup>
					<col width="14.28%"/>
					<col width="14.28%"/>
					<col width="14.28%"/>
					<col width="14.28%"/>
					<col width="14.28%"/>
					<col width="14.28%"/>
					<col width="14.28%"/>
				</colgroup>

				<thead>
					<tr>
						<th scope="col">SUN</th>
						<th scope="col">MON</th>
						<th scope="col">TUE</th>
						<th scope="col">WED</th>
						<th scope="col">THU</th>
						<th scope="col">FRI</th>
						<th scope="col">SAT</th>
					</tr>
				</thead>
				<tbody>
				</tbody>
			</table>
		</div>
</div>

<style>
	.footer {
		bottom: 10%;
		position: absolute;
	}
</style>
<footer class="footer">
	<div class="tail_wrap">
			<div class="tail_con">
				<div class="com_info">
					<h3>Info.</h3>
				</div>
				<div class="copyright">
					Serviced by. NeRd<br />
					Designed by. Josbar
				</div>
			</div>
		</div>
	</div>
</footer>
</body>
</html>
