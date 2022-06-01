<?php

// Class for all the Posts..

include('Base.php');

class Posts {

    public function index()
    {
        $sl_token = $_GET['sl_token'];
        $page = $_GET['page'];
        $post = [
            'sl_token' => $sl_token,
            'page' => $page
        ];
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL,"https://api.supermetrics.com/assignment/posts?sl_token=".$sl_token."&page=".$page);
        curl_setopt( $ch, CURLOPT_CUSTOMREQUEST, 'GET' );
        curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
        $response = curl_exec($ch);
        $decode = json_decode($response);

        if($decode->error->message == "Invalid SL Token")
        {
            $message['result'] = null;
        }
        else
        {
            // New JSON Output
            $posts = $decode->data->posts;
            $i = 0;
            $count = ( $page * 100 ) - 100;
            foreach($posts as $p)
            {
                $message['result'][$i]['sl_no'] = $count+1;
                $message['result'][$i]['post'] = $p->message;
                $message['result'][$i]['name'] = $p->from_name;
                $i++;
                $count++;
            }
        }
        
        echo json_encode($message);


       
    }


    

}

$posts = new Posts;
$posts->index();


?>