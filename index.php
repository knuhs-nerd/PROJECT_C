<?php
    include_once './module/util.php';
    include_once './module/session.php';
?>
<!DOCTYPE html>
<html lang="ko">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <title>NeRd</title>
	    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=yes"/>
        <meta name="format-detection" content="telephone=no"/>
        <meta property="og:locale" content="ko_KR">
        <link rel="stylesheet" href="/src/css/xeicon.css">
        <link rel="stylesheet" href="/src/css/layout.css">
        <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    </head>
    <body>
        <?php include './module/header.php'; ?>
        <div class="container">
            <?php if (login_check()) { ?>
                <span class="text-weight-bold text-large"><i class="xi xi-user-o"></i>환영합니다 <?=$_SESSION['user']['name']?>님</h3>
                
                <div class="mt-2">
                    <?php if (admin_check()) { ?>
                        <i class="xi-check-thin"></i> <a href="/admin" class="black text-large">내 팀 관리하기</a><br />
                        <i class="xi-check-thin mt-1"></i> <a href="/admin/chulsuk" class="black text-large">출석 페이지</a>
                    <?php }else { ?>
                        <i class="xi-check-thin"></i> <a href="/user" class="black text-large">내 출석 기록</a>
                    <?php } ?>
                </div>
            <?php } else { ?>
                <h1>로그인이 필요합니다.</h1>
            <?php } ?>
        </div>
    </body>
</html>