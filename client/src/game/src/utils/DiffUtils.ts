/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ObjectComparison {
	added: object;
	updated: {
		[propName: string]: Change;
	};
	removed: object;
	unchanged: object;
}

export interface Change {
	oldValue: any;
	newValue: any;
}

export class ObjectUtils {
	// o1 is previous object, o1 is new object
	static diff(o1: any, o2: any, deep = false): ObjectComparison {
		const added: any = {};
		const updated: any = {};
		const removed: any = {};
		const unchanged: any = {};
		for (const prop in o1) {
			if (Object.hasOwn(o1, prop)) {
				const o2PropValue = o2[prop];
				const o1PropValue = o1[prop];
				if (Object.hasOwn(o2, prop)) {
					if (o2PropValue === o1PropValue) {
						unchanged[prop] = o1PropValue;
					} else {
						updated[prop] =
							deep && this.isObject(o1PropValue) && this.isObject(o2PropValue)
								? this.diff(o1PropValue, o2PropValue, deep)
								: { newValue: o2PropValue };
					}
				} else {
					removed[prop] = o1PropValue;
				}
			}
		}
		for (const prop in o2) {
			if (Object.hasOwn(o2, prop)) {
				const o1PropValue = o1[prop];
				const o2PropValue = o2[prop];
				if (Object.hasOwn(o1, prop)) {
					if (o1PropValue !== o2PropValue) {
						if (!deep || !this.isObject(o1PropValue)) {
							updated[prop].oldValue = o1PropValue;
						}
					}
				} else {
					added[prop] = o2PropValue;
				}
			}
		}
		return { added, updated, removed, unchanged };
	}

	/**
	 * @return if obj is an Object, including an Array.
	 */
	static isObject(obj: any) {
		return obj !== null && typeof obj === 'object';
	}

	/**
	 * A different diffing algorithm, where we provide the properties to exclude from diffing
	 */
	static diffWithExclude(obj1: any, obj2: any, exclude?: any) {
		const r: any = {};
		// eslint-disable-next-line no-param-reassign
		if (!exclude) exclude = [];
		for (const prop in obj1) {
			if (Object.hasOwn(obj1, prop) && prop !== '__proto__') {
				if (exclude.indexOf(obj1[prop]) === -1) {
					// check if obj2 has prop
					if (!Object.hasOwn(obj2, prop)) r[prop] = obj1[prop];
					// check if prop is object and
					// NOT a JavaScript engine object (i.e. __proto__), if so, recursive diff
					else if (obj1[prop] === Object(obj1[prop])) {
						const difference = this.diffWithExclude(obj1[prop], obj2[prop]);
						if (Object.keys(difference).length > 0) r[prop] = difference;
					}
					// check if obj1 and obj2 are equal
					else if (obj1[prop] !== obj2[prop]) {
						if (obj1[prop] === undefined) r[prop] = 'undefined';
						if (obj1[prop] === null) r[prop] = null;
						else if (typeof obj1[prop] === 'function') r[prop] = 'function';
						else if (typeof obj1[prop] === 'object') r[prop] = 'object';
						else r[prop] = obj1[prop];
					}
				}
			}
		}
		return r;
	}
}
