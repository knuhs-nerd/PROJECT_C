<?php include_once __DIR__ . "/util.php"; ?>
<div class="header">
    <div class="header_warp">
        <div class="logo">
            <a href="/"><img src="/src/img/logo.png" alt="logo"></a>
        </div>

        <div class="menu">
            <ul>
                <?php if (login_check()) { ?>
                    <li><a href="/user/pw_change" class="color-white">비밀번호변경</a></li>
                    <li><a href="/account/back/logout.php" class="color-white">로그아웃</a></li>
                <?php } else { ?>
                    <li><a href="/account/signin.php">로그인</a></li>
                    <li><a href="/account/signup.php">회원가입</a></li>
                <?php } ?>
            </ul>
        </div>
    </div>
</div>