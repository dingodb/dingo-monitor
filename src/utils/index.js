export function debounceFn(fn, time) {
	let timer = null;
	return function (...args) {
		if (timer) {
			clearTimeout(timer);
		}
		return timer = setTimeout(() => {
			fn.call(null, ...args)
		}, time);
	}
}
/**
 * 全局文件大小换算
 * @param {*} bytes 字节数
 */
export const fileSize = (bytes) => {
	if (bytes === 0 || !bytes) return '0 B';
	const k = 1024;
	const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return `${(bytes / (k ** i)).toFixed(1)}  ${sizes[i]}`;
};


//cookie
export const CookieUse = () => {
	return {
		setCookie: (name, value) => {
			let Days = 1;
			let exp = new Date();
			exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
			document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
		},
		getCookie: (name) => {
			let arr; let reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
			return (arr = document.cookie.match(reg)) ? unescape(arr[2]) : null;
		}
	}
}