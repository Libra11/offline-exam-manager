/*
 * @Author: Libra
 * @Date: 2023-03-08 17:00:28
 * @LastEditors: Libra
 * @Description:
 * @FilePath: /libra-vue3-all-in-one-template/electron/preload.js
 */
window.addEventListener('DOMContentLoaded', () => {
	const replaceText = (selector, text) => {
		const element = document.getElementById(selector)

		if (element) {
			element.innerText = text
		}
	}

	for (const dependency of ['chrome', 'node', 'electron']) {
		replaceText(`${dependency}-version`, process.versions[dependency])
	}
})
