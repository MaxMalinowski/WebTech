<?php
namespace utils;

// Source: https://thisinterestsme.com/sending-json-via-post-php/
class HttpClient {
    
    /**
     * Execute a POST-Request
     *
     * @param string $url url-string against which the request should be executed
     * @param string $data json-formatted data to be sent along
     * @param string $token token-string to be sent along for authentication
     * @return object decoded json-response (status 200) or true (status 204)
     * @throws Exception on every other status code
     */
    public static function post($url, $data, $token = null) {
        //Initiate cURL.
        $ch = curl_init();

        //Encode the array into JSON.
        $jsonDataEncoded = json_encode($data);

        //Tell cURL that we want to send a POST request.
        curl_setopt($ch, CURLOPT_POST, true);

        //Attach our encoded JSON string to the POST fields.
        curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonDataEncoded);

        curl_setopt($ch, CURLOPT_URL, $url);

        //Get result as string
        curl_setopt($ch,CURLOPT_RETURNTRANSFER, true); 

        //Set the content type to application/json and authorization token if provided
        $headers = array('Content-Type: application/json');
        if($token) {
            $headers[] = 'Authorization: Bearer ' . $token;
        }
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers); 

        //Execute the request
        $result = curl_exec($ch);

        //Get status
        $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        //Close request
        curl_close($ch);

        // Handle response, if not empty, as json
        if($status == 200 && !empty($result)) {
            return json_decode($result);
        } else if($status == 204) {
            return true;
        }
        throw new \Exception('Http status is ' . $status . ': ' . $result);
    }

    /**
     * Execute a PUT-Request
     *
     * @param string $url url-string against which the request should be executed
     * @param string $data json-formatted data to be sent along
     * @param string $token token-string to be sent along for authentication
     * @return object decoded json-response (status 200) or true (status 204)
     * @throws Exception on every other status code
     */
    public static function put($url, $data, $token = null) {
        //Initiate cURL.
        $ch = curl_init();

        //Encode the array into JSON.
        $jsonDataEncoded = json_encode($data);

        //Tell cURL that we want to send a POST request.
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");

        //Attach our encoded JSON string to the POST fields.
        curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonDataEncoded);

        curl_setopt($ch, CURLOPT_URL, $url);

        //Get result as string
        curl_setopt($ch,CURLOPT_RETURNTRANSFER, true); 

        //Set the content type to application/json and authorization token if provided
        $headers = array('Content-Type: application/json');
        if($token) {
            $headers[] = 'Authorization: Bearer ' . $token;
        }
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers); 

        //Execute the request
        $result = curl_exec($ch);

        //Get status
        $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        //Close request
        curl_close($ch);

        // Handle response, if not empty, as json
        if($status == 200 && !empty($result)) {
            return json_decode($result);
        } else if($status == 204) {
            return true;
        }
        throw new \Exception('Http status is ' . $status);
    }

    /**
     * Execute a GET-Request
     *
     * @param string $url url-string against which the request should be executed
     * @param string $token token-string to be sent along for authentication
     * @return object decoded json-response (status 200) or true (status 204)
     * @throws Exception on every other status code
     */
    public static function get($url, $token = null) {
        //Initiate cURL.
        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, $url);

        //Get result as string
        curl_setopt($ch,CURLOPT_RETURNTRANSFER, true);

        //Set authorization token if provided
        if($token) {
            curl_setopt($ch, CURLOPT_HTTPHEADER, array('Authorization: Bearer ' . $token)); 
        }

        //Execute the request
        $result = curl_exec($ch);

        //Get status
        $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        //Close request
        curl_close($ch);

        // Handle response, if not empty, as json
        if($status == 200 && !empty($result)) {
            return json_decode($result);
        } else if($status == 204) {
            return true;
        }
        throw new \Exception('Http status is ' . $status . ': ' . $result);
    }

    /**
     * Execute a DELETE-Request
     *
     * @param string $url url-string against which the request should be executed
     * @param string $token token-string to be sent along for authentication
     * @return object decoded json-response (status 200) or true (status 204)
     * @throws Exception on every other status code
     */
    public static function delete($url, $token = null) {
        //Initiate cURL.
        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, $url);

        //Set custom request method
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "DELETE");

        //Get result as string
        curl_setopt($ch,CURLOPT_RETURNTRANSFER, true);

        //Set authorization token if provided
        if($token) {
            curl_setopt($ch, CURLOPT_HTTPHEADER, array('Authorization: Bearer ' . $token)); 
        }

        //Execute the request
        $result = curl_exec($ch);

        //Get status
        $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        //Close request
        curl_close($ch);

        // Handle response, if not empty, as json
        if($status == 200 && !empty($result)) {
            return json_decode($result);
        } else if($status == 204) {
            return true;
        }
        throw new \Exception('Http status is ' . $status . ': ' . $result);
    }
}