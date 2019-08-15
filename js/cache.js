function getStorage(isSession) {
    return isSession ? sessionStorage : localStorage;
}

const cache = {
    get(key, isSession = true, val = null) {
        const storage = getStorage(isSession);
        let ret = storage.getItem(key);
        if (!ret && val !== null) return val; //default val
        const char = ret && ret.slice(0, 1);
        if (char && (char === '{' || char === '[')) {
            ret = JSON.parse(ret);
            if (ret.expires) {
                if (ret.expires >= Date.now()) {
                    if ('value' in ret && Object.keys(ret).length === 2) {
                        ret = ret.value;
                    } else {
                        delete ret.expires;
                    }
                } else {
                    ret = val !== null ? val : null;
                }
            }
        } else if (ret === 'true' || ret=== 'false') {
            ret = ret === 'true';
        }
        return ret;
    },
    hget(key, hash, isSession = true) {
        return this.get(key, isSession, {})[hash];
    },
    set(key, value, isSession = true, seconds = 0) {
        const storage = getStorage(isSession);
        let val = value;
        if (seconds) {
            const expires = Date.now() + seconds;
            val = Object.assign({}, typeof value === 'object' ? value : { value }, { expires });
        }
        if (typeof value === 'object') val = JSON.stringify(val);
        storage.setItem(key, val);
    },
    hset(key, hash, val, isSession = true) {
        const ob = this.get(key, isSession, {});
        ob[hash] = val;
        this.set(key, ob, isSession);
    },
    del(key, isSession = true) {
        const storage = getStorage(isSession);
        storage.removeItem(key);
    }
};
export default cache;
