<?php 
$incoming = file_get_contents('php://input');
sleep(1);
if ($incoming) {

    echo 'success';
}
?>