interface AutosizeOptions {
	// Add any options if needed in the future
}

interface AutosizeMethods {
	destroy: () => void;
	update: () => void;
}

interface SetHeightOptions {
	restoreTextAlign: string | null;
	testForHeightReduction: boolean;
}

type ScrollTopCache = [HTMLElement, number][];
type RestoreScrollTops = () => void;

const assignedElements = new Map<HTMLTextAreaElement, AutosizeMethods>();

function assign(ta: HTMLTextAreaElement, options?: AutosizeOptions): void {
	if (!ta || !ta.nodeName || ta.nodeName !== 'TEXTAREA' || assignedElements.has(ta)) return;

	let previousHeight: number | null = null;

	function cacheScrollTops(el: HTMLElement): RestoreScrollTops {
		const arr: ScrollTopCache = [];

		while (el && el.parentNode && el.parentNode instanceof Element) {
			if (el.parentNode.scrollTop) {
				arr.push([el.parentNode as HTMLElement, el.parentNode.scrollTop]);
			}
			el = el.parentNode as HTMLElement;
		}

		return () => arr.forEach(([node, scrollTop]) => {
			node.style.scrollBehavior = 'auto';
			node.scrollTop = scrollTop;
			node.style.scrollBehavior = null;
		});
	}

	const computed = window.getComputedStyle(ta);

	function setHeight({
		restoreTextAlign = null,
		testForHeightReduction = true,
	}: Partial<SetHeightOptions> = {}): void {
		let initialOverflowY = computed.overflowY;

		if (ta.scrollHeight === 0) {
			// If the scrollHeight is 0, then the element probably has display:none or is detached from the DOM.
			return;
		}

		// disallow vertical resizing
		if (computed.resize === 'vertical') {
			ta.style.resize = 'none';
		} else if (computed.resize === 'both') {
			ta.style.resize = 'horizontal';
		}

		let restoreScrollTops: RestoreScrollTops | undefined;

		// remove inline height style to accurately measure situations where the textarea should shrink
		// however, skip this step if the new value appends to the previous value, as textarea height should only have grown
		if (testForHeightReduction) {
			// ensure the scrollTop values of parent elements are not modified as a consequence of shrinking the textarea height
			restoreScrollTops = cacheScrollTops(ta);
			ta.style.height = '';
		}

		let newHeight: number;

		if (computed.boxSizing === 'content-box') {
			newHeight = ta.scrollHeight - (parseFloat(computed.paddingTop)+parseFloat(computed.paddingBottom));
		} else {
			newHeight = ta.scrollHeight + parseFloat(computed.borderTopWidth)+parseFloat(computed.borderBottomWidth);
		}

		if (computed.maxHeight !== 'none' && newHeight > parseFloat(computed.maxHeight)) {
			if (computed.overflowY === 'hidden') {
				ta.style.overflow = 'scroll';
			}
			newHeight = parseFloat(computed.maxHeight);
		} else if (computed.overflowY !== 'hidden') {
			ta.style.overflow = 'hidden';
		}

		ta.style.height = newHeight+'px';

		if (restoreTextAlign) {
			ta.style.textAlign = restoreTextAlign;
		}

		if (restoreScrollTops) {
			restoreScrollTops();
		}

		if (previousHeight !== newHeight) {
			ta.dispatchEvent(new Event('autosize:resized', {bubbles: true}));
			previousHeight = newHeight;
		}

		if (initialOverflowY !== computed.overflow && !restoreTextAlign) {
			const textAlign = computed.textAlign;

			if (computed.overflow === 'hidden') {
				// Webkit fails to reflow text after overflow is hidden,
				// even if hiding overflow would allow text to fit more compactly.
				// The following is intended to force the necessary text reflow.
				ta.style.textAlign = textAlign === 'start' ? 'end' : 'start';
			}

			setHeight({
				restoreTextAlign: textAlign,
				testForHeightReduction: true,
			});
		}
	}

	function fullSetHeight(): void {
		setHeight({
			testForHeightReduction: true,
			restoreTextAlign: null,
		});
	}

	const handleInput = (function(){
		let previousValue = ta.value;

		return (): void => {
			setHeight({
				// if previousValue is '', check for height shrinkage because the placeholder may be taking up space instead
				// if new value is merely appending to previous value, skip checking for height deduction
				testForHeightReduction: previousValue === '' || !ta.value.startsWith(previousValue),
				restoreTextAlign: null,
			});

			previousValue = ta.value;
		}
	}())

	interface SavedStyles {
		height: string;
		resize: string;
		textAlign: string;
		overflowY: string;
		overflowX: string;
		wordWrap: string;
	}

	const destroy = (function(style: SavedStyles) {
		return function destroyAutosize(): void {
			ta.removeEventListener('autosize:destroy', destroy);
			ta.removeEventListener('autosize:update', fullSetHeight);
			ta.removeEventListener('input', handleInput);
			window.removeEventListener('resize', fullSetHeight); // future todo: consider replacing with ResizeObserver
			Object.keys(style).forEach(key => (ta.style[key as keyof SavedStyles] = style[key as keyof SavedStyles]));
			assignedElements.delete(ta);
		}
	})({
		height: ta.style.height,
		resize: ta.style.resize,
		textAlign: ta.style.textAlign,
		overflowY: ta.style.overflowY,
		overflowX: ta.style.overflowX,
		wordWrap: ta.style.wordWrap,
	} as SavedStyles);

	ta.addEventListener('autosize:destroy', destroy as EventListener);
	ta.addEventListener('autosize:update', fullSetHeight);
	ta.addEventListener('input', handleInput);
	window.addEventListener('resize', fullSetHeight); // future todo: consider replacing with ResizeObserver
	ta.style.overflowX = 'hidden';
	ta.style.wordWrap = 'break-word';

	assignedElements.set(ta, {
		destroy,
		update: fullSetHeight,
	});

	fullSetHeight();
}

function destroy(ta: HTMLTextAreaElement): void {
	const methods = assignedElements.get(ta);
	if (methods) {
		methods.destroy();
	}
}

function update(ta: HTMLTextAreaElement): void {
	const methods = assignedElements.get(ta);
	if (methods) {
		methods.update();
	}
}

interface Autosize {
	(el: HTMLTextAreaElement | HTMLTextAreaElement[] | NodeListOf<HTMLTextAreaElement>, options?: AutosizeOptions): HTMLTextAreaElement | HTMLTextAreaElement[] | NodeListOf<HTMLTextAreaElement>;
	destroy: (el: HTMLTextAreaElement | HTMLTextAreaElement[] | NodeListOf<HTMLTextAreaElement>) => HTMLTextAreaElement | HTMLTextAreaElement[] | NodeListOf<HTMLTextAreaElement>;
	update: (el: HTMLTextAreaElement | HTMLTextAreaElement[] | NodeListOf<HTMLTextAreaElement>) => HTMLTextAreaElement | HTMLTextAreaElement[] | NodeListOf<HTMLTextAreaElement>;
}

let autosize: Autosize;

// Do nothing in Node.js environment
if (typeof window === 'undefined') {
	const noop = <T>(el: T): T => el;
	autosize = noop as unknown as Autosize;
	autosize.destroy = noop;
	autosize.update = noop;
} else {
	const autosizeFunction = (el: HTMLTextAreaElement | HTMLTextAreaElement[] | NodeListOf<HTMLTextAreaElement>, options?: AutosizeOptions) => {
		if (el) {
			// Check if el is an array-like object with a length property
			const isArrayLike = (obj: any): obj is { length: number } => 
				obj && typeof obj.length === 'number';
			
			// Use the type guard to safely access length
			if (isArrayLike(el) && el.length) {
				Array.prototype.forEach.call(el, (x: HTMLTextAreaElement) => assign(x, options));
			} else {
				// Single element case
				assign(el as HTMLTextAreaElement, options);
			}
		}
		return el;
	};
	
	autosizeFunction.destroy = (el: HTMLTextAreaElement | HTMLTextAreaElement[] | NodeListOf<HTMLTextAreaElement>) => {
		if (el) {
			const isArrayLike = (obj: any): obj is { length: number } => 
				obj && typeof obj.length === 'number';
			
			if (isArrayLike(el) && el.length) {
				Array.prototype.forEach.call(el, destroy);
			} else {
				destroy(el as HTMLTextAreaElement);
			}
		}
		return el;
	};
	
	autosizeFunction.update = (el: HTMLTextAreaElement | HTMLTextAreaElement[] | NodeListOf<HTMLTextAreaElement>) => {
		if (el) {
			const isArrayLike = (obj: any): obj is { length: number } => 
				obj && typeof obj.length === 'number';
			
			if (isArrayLike(el) && el.length) {
				Array.prototype.forEach.call(el, update);
			} else {
				update(el as HTMLTextAreaElement);
			}
		}
		return el;
	};
	
	autosize = autosizeFunction;
}

export default autosize;