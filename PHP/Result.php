<?php
// Function for Updated json reponse in PHP after manipulation

include('Base.php');

class Result {

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

        // Response Decoding & Adding them to a secondary Array
        $decode = json_decode($response);
        if($decode->error->message == "Invalid SL Token")
        {
            $message['result'] = null;
        }
        else
        {
            $posts = $decode->data->posts;
            $users = [];
            foreach($posts as $p)
            {
                array_push($users,$p->from_id);
            }
    
            // Removing Duplication --> Use Array Unique to create a unique list of users now.
            $distinct_users = array_unique($users);
    
            // Comparing the posts with the unique list of users and creating a new object.
            $i = 0;
            foreach($distinct_users as $users)
            {
                $j = 0;
                $message['result'][$i]['user'] = $users;
                $msg = [];
                $character_count = 0;
                $max = [];
                foreach($posts as $p)
                {
                    if($users == $p->from_id)
                    {
                        array_push($msg,$p->message);
                        $count = strlen($p->message);
                        $other['length'] = $count;
                        $other['msg'] = $p->message;
                        array_push($max,$other);
                        $character_count += $count;
                        $j++;
                    }
                }
                $message['result'][$i]['no_messages'] = $j;
                $message['result'][$i]['average'] = ceil($character_count/$j);
                $message['result'][$i]['msg'] = $msg;
                $message['result'][$i]['other'] = $max;
                $i++;
            }
        }
        echo json_encode($message);
    }


}

$result = new Result;
$result->index();


?>