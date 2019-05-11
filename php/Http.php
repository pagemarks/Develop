<?php
class Http {
    static public function get($url, $params = null,$header=null) {
        $ch = curl_init();
        if ($params) {
            $params = http_build_query($params);
            $url .= '?'.$params;
        }
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HEADER, 0); // just body
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        if ($header) curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
        curl_setopt($ch, CURLOPT_TIMEOUT, 30);
        $data = curl_exec($ch);
        if (curl_errno($ch)) echo curl_error($ch);
        curl_close($ch);
        return $data;
    }

    static public function post($url, $params = null, $header = null) {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        if ($header) curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
        curl_setopt($ch, CURLOPT_POST, 1);
        if ($params) curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($params));
        curl_setopt($ch, CURLOPT_TIMEOUT, 30);
        $data = curl_exec($ch);
        if (curl_errno($ch)) echo curl_error($ch);
        curl_close($ch);
        return $data;
    }
}
