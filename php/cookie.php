<?
function cookie($name, $val = null, $time = 0, $only=false, $domain='xxxxx.xxx', $path = '/') {
    if ($val || $time) {
        if ($time > 0) $time = time()+$time;
        if ($time < 0) setcookie($name);
        return setcookie($name, $val, $time, $path, $domain, false, $only);
    } else {
        return $_COOKIE[$name] ?? '';
    }
}
