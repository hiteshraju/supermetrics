<?php 

include('Base.php');

// User Registration Class

Class User {

    public function index(){
        $message['is_error'] = 0;
        $message['msg'] = "Supermetrics Assignment";
        echo json_encode($message);
    }

    public function register(){

        $json = file_get_contents('php://input'); 	
        $obj = json_decode($json,true);
        $client_id = "ju16a6m81mhid5ue1z3v2g0uh";
        $email = $obj['email'];
        $name = $obj['name'];
        $post = [
            'client_id' => $client_id,
            'email' => $email,
            'name'   => $name,
        ];
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL,"https://api.supermetrics.com/assignment/register");
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS,$post);
        curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
        $response = curl_exec($ch);
        $decode = json_decode($response);
        curl_close($ch);

        $message['is_error'] = 0;
        $message['sl_token'] = $decode->data->sl_token;
        echo json_encode($message);
    }

}

$user = new User;
$user->register();




?>