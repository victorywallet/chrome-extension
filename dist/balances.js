/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@fluentui/web-components/dist/esm/button/button.styles.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@fluentui/web-components/dist/esm/button/button.styles.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buttonStyles: () => (/* binding */ buttonStyles)
/* harmony export */ });
/* harmony import */ var _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/fast-element */ "./node_modules/@microsoft/fast-element/dist/esm/styles/css.js");
/* harmony import */ var _microsoft_fast_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/fast-foundation */ "./node_modules/@microsoft/fast-foundation/dist/esm/utilities/style/disabled.js");
/* harmony import */ var _styles___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../styles/ */ "./node_modules/@fluentui/web-components/dist/esm/styles/patterns/button.styles.js");
/* harmony import */ var _utilities_behaviors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utilities/behaviors */ "./node_modules/@fluentui/web-components/dist/esm/utilities/behaviors.js");
/* harmony import */ var _design_tokens__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../design-tokens */ "./node_modules/@fluentui/web-components/dist/esm/design-tokens.js");





const interactivitySelector = ':not([disabled])';
const nonInteractivitySelector = '[disabled]';
const buttonStyles = (context, definition) => (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_0__.css) `
    :host(${interactivitySelector}) .control {
      cursor: pointer;
    }

    :host(${nonInteractivitySelector}) .control {
      cursor: ${_microsoft_fast_foundation__WEBPACK_IMPORTED_MODULE_1__.disabledCursor};
    }

    @media (forced-colors: none) {
      :host(${nonInteractivitySelector}) .control {
        opacity: ${_design_tokens__WEBPACK_IMPORTED_MODULE_2__.disabledOpacity};
      }
    }

    ${(0,_styles___WEBPACK_IMPORTED_MODULE_3__.baseButtonStyles)(context, definition, interactivitySelector, nonInteractivitySelector)}
  `.withBehaviors((0,_utilities_behaviors__WEBPACK_IMPORTED_MODULE_4__.appearanceBehavior)('neutral', (0,_styles___WEBPACK_IMPORTED_MODULE_3__.NeutralButtonStyles)(context, definition, interactivitySelector, nonInteractivitySelector)), (0,_utilities_behaviors__WEBPACK_IMPORTED_MODULE_4__.appearanceBehavior)('accent', (0,_styles___WEBPACK_IMPORTED_MODULE_3__.AccentButtonStyles)(context, definition, interactivitySelector, nonInteractivitySelector)), (0,_utilities_behaviors__WEBPACK_IMPORTED_MODULE_4__.appearanceBehavior)('lightweight', (0,_styles___WEBPACK_IMPORTED_MODULE_3__.LightweightButtonStyles)(context, definition, interactivitySelector, nonInteractivitySelector)), (0,_utilities_behaviors__WEBPACK_IMPORTED_MODULE_4__.appearanceBehavior)('outline', (0,_styles___WEBPACK_IMPORTED_MODULE_3__.OutlineButtonStyles)(context, definition, interactivitySelector, nonInteractivitySelector)), (0,_utilities_behaviors__WEBPACK_IMPORTED_MODULE_4__.appearanceBehavior)('stealth', (0,_styles___WEBPACK_IMPORTED_MODULE_3__.StealthButtonStyles)(context, definition, interactivitySelector, nonInteractivitySelector)));


/***/ }),

/***/ "./node_modules/@fluentui/web-components/dist/esm/button/index.js":
/*!************************************************************************!*\
  !*** ./node_modules/@fluentui/web-components/dist/esm/button/index.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Button: () => (/* binding */ Button),
/* harmony export */   buttonStyles: () => (/* binding */ buttonStyles),
/* harmony export */   fluentButton: () => (/* binding */ fluentButton)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/fast-element */ "./node_modules/@microsoft/fast-element/dist/esm/components/attributes.js");
/* harmony import */ var _microsoft_fast_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/fast-foundation */ "./node_modules/@microsoft/fast-foundation/dist/esm/button/button.js");
/* harmony import */ var _microsoft_fast_foundation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/fast-foundation */ "./node_modules/@microsoft/fast-foundation/dist/esm/button/button.template.js");
/* harmony import */ var _button_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./button.styles */ "./node_modules/@fluentui/web-components/dist/esm/button/button.styles.js");




/**
 * The Fluent button class
 * @internal
 */
class Button extends _microsoft_fast_foundation__WEBPACK_IMPORTED_MODULE_0__.Button {
    appearanceChanged(oldValue, newValue) {
        if (oldValue !== newValue) {
            this.classList.add(newValue);
            this.classList.remove(oldValue);
        }
    }
    /**
     * @internal
     */
    connectedCallback() {
        super.connectedCallback();
        if (!this.appearance) {
            this.appearance = 'neutral';
        }
    }
    /**
     * Applies 'icon-only' class when there is only an SVG in the default slot
     *
     * @internal
     */
    defaultSlottedContentChanged() {
        const slottedElements = this.defaultSlottedContent.filter(x => x.nodeType === Node.ELEMENT_NODE);
        if (slottedElements.length === 1 && slottedElements[0] instanceof SVGElement) {
            this.control.classList.add('icon-only');
        }
        else {
            this.control.classList.remove('icon-only');
        }
    }
}
(0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_2__.attr
], Button.prototype, "appearance", void 0);
/**
 * The Fluent Button Element. Implements {@link @microsoft/fast-foundation#Button},
 * {@link @microsoft/fast-foundation#buttonTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-button\>
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/delegatesFocus | delegatesFocus}
 */
const fluentButton = Button.compose({
    baseName: 'button',
    baseClass: _microsoft_fast_foundation__WEBPACK_IMPORTED_MODULE_0__.Button,
    template: _microsoft_fast_foundation__WEBPACK_IMPORTED_MODULE_3__.buttonTemplate,
    styles: _button_styles__WEBPACK_IMPORTED_MODULE_4__.buttonStyles,
    shadowOptions: {
        delegatesFocus: true,
    },
});
/**
 * Styles for Button
 * @public
 */
const buttonStyles = _button_styles__WEBPACK_IMPORTED_MODULE_4__.buttonStyles;


/***/ }),

/***/ "./node_modules/@fluentui/web-components/dist/esm/color/palette.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@fluentui/web-components/dist/esm/color/palette.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PaletteRGB: () => (/* binding */ PaletteRGB)
/* harmony export */ });
/* harmony import */ var _microsoft_fast_colors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @microsoft/fast-colors */ "./node_modules/@microsoft/fast-colors/dist/math-utilities.js");
/* harmony import */ var _microsoft_fast_colors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @microsoft/fast-colors */ "./node_modules/@microsoft/fast-colors/dist/color-converters.js");
/* harmony import */ var _microsoft_fast_colors__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @microsoft/fast-colors */ "./node_modules/@microsoft/fast-colors/dist/color-hsl.js");
/* harmony import */ var _microsoft_fast_colors__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @microsoft/fast-colors */ "./node_modules/@microsoft/fast-colors/dist/color-rgba-64.js");
/* harmony import */ var _microsoft_fast_colors__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @microsoft/fast-colors */ "./node_modules/@microsoft/fast-colors/dist/color-lab.js");
/* harmony import */ var _microsoft_fast_colors__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @microsoft/fast-colors */ "./node_modules/@microsoft/fast-colors/dist/color-interpolation.js");
/* harmony import */ var _swatch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./swatch */ "./node_modules/@fluentui/web-components/dist/esm/color/swatch.js");
/* harmony import */ var _utilities_binary_search__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utilities/binary-search */ "./node_modules/@fluentui/web-components/dist/esm/color/utilities/binary-search.js");
/* harmony import */ var _utilities_direction_by_is_dark__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utilities/direction-by-is-dark */ "./node_modules/@fluentui/web-components/dist/esm/color/utilities/direction-by-is-dark.js");
/* harmony import */ var _utilities_relative_luminance__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utilities/relative-luminance */ "./node_modules/@fluentui/web-components/dist/esm/color/utilities/relative-luminance.js");





const defaultPaletteRGBOptions = {
    stepContrast: 1.03,
    stepContrastRamp: 0.03,
    preserveSource: false,
};
function create(rOrSource, g, b) {
    if (typeof rOrSource === 'number') {
        return PaletteRGB.from(_swatch__WEBPACK_IMPORTED_MODULE_0__.SwatchRGB.create(rOrSource, g, b));
    }
    else {
        return PaletteRGB.from(rOrSource);
    }
}
function from(source, options) {
    return (0,_swatch__WEBPACK_IMPORTED_MODULE_0__.isSwatchRGB)(source)
        ? PaletteRGBImpl.from(source, options)
        : PaletteRGBImpl.from(_swatch__WEBPACK_IMPORTED_MODULE_0__.SwatchRGB.create(source.r, source.g, source.b), options);
}
/** @public */
const PaletteRGB = Object.freeze({
    create,
    from,
});
/**
 * A {@link Palette} representing RGB swatch values.
 * @public
 */
class PaletteRGBImpl {
    /**
     *
     * @param source - The source color for the palette
     * @param swatches - All swatches in the palette
     */
    constructor(source, swatches) {
        this.closestIndexCache = new Map();
        this.source = source;
        this.swatches = swatches;
        this.reversedSwatches = Object.freeze([...this.swatches].reverse());
        this.lastIndex = this.swatches.length - 1;
    }
    /**
     * {@inheritdoc Palette.colorContrast}
     */
    colorContrast(reference, contrastTarget, initialSearchIndex, direction) {
        if (initialSearchIndex === undefined) {
            initialSearchIndex = this.closestIndexOf(reference);
        }
        let source = this.swatches;
        const endSearchIndex = this.lastIndex;
        let startSearchIndex = initialSearchIndex;
        if (direction === undefined) {
            direction = (0,_utilities_direction_by_is_dark__WEBPACK_IMPORTED_MODULE_1__.directionByIsDark)(reference);
        }
        const condition = (value) => (0,_utilities_relative_luminance__WEBPACK_IMPORTED_MODULE_2__.contrast)(reference, value) >= contrastTarget;
        if (direction === -1) {
            source = this.reversedSwatches;
            startSearchIndex = endSearchIndex - startSearchIndex;
        }
        return (0,_utilities_binary_search__WEBPACK_IMPORTED_MODULE_3__.binarySearch)(source, condition, startSearchIndex, endSearchIndex);
    }
    /**
     * {@inheritdoc Palette.get}
     */
    get(index) {
        return this.swatches[index] || this.swatches[(0,_microsoft_fast_colors__WEBPACK_IMPORTED_MODULE_4__.clamp)(index, 0, this.lastIndex)];
    }
    /**
     * {@inheritdoc Palette.closestIndexOf}
     */
    closestIndexOf(reference) {
        if (this.closestIndexCache.has(reference.relativeLuminance)) {
            return this.closestIndexCache.get(reference.relativeLuminance);
        }
        let index = this.swatches.indexOf(reference);
        if (index !== -1) {
            this.closestIndexCache.set(reference.relativeLuminance, index);
            return index;
        }
        const closest = this.swatches.reduce((previous, next) => Math.abs(next.relativeLuminance - reference.relativeLuminance) <
            Math.abs(previous.relativeLuminance - reference.relativeLuminance)
            ? next
            : previous);
        index = this.swatches.indexOf(closest);
        this.closestIndexCache.set(reference.relativeLuminance, index);
        return index;
    }
    /**
     * Bump the saturation if it falls below the reference color saturation.
     * @param reference Color with target saturation
     * @param color Color to check and bump if below target saturation
     * @returns Original or adjusted color
     */
    static saturationBump(reference, color) {
        const hslReference = (0,_microsoft_fast_colors__WEBPACK_IMPORTED_MODULE_5__.rgbToHSL)(reference);
        const saturationTarget = hslReference.s;
        const hslColor = (0,_microsoft_fast_colors__WEBPACK_IMPORTED_MODULE_5__.rgbToHSL)(color);
        if (hslColor.s < saturationTarget) {
            const hslNew = new _microsoft_fast_colors__WEBPACK_IMPORTED_MODULE_6__.ColorHSL(hslColor.h, saturationTarget, hslColor.l);
            return (0,_microsoft_fast_colors__WEBPACK_IMPORTED_MODULE_5__.hslToRGB)(hslNew);
        }
        return color;
    }
    /**
     * Scales input from 0 to 100 to 0 to 0.5.
     * @param l Input number, 0 to 100
     * @returns Output number, 0 to 0.5
     */
    static ramp(l) {
        const inputval = l / 100;
        if (inputval > 0.5)
            return (inputval - 0.5) / 0.5; //from 0.500001in = 0.00000001out to 1.0in = 1.0out
        return 2 * inputval; //from 0in = 0out to 0.5in = 1.0out
    }
    /**
     * Create a palette following the desired curve and many steps to build a smaller palette from.
     * @param source The source swatch to create a palette from
     * @returns The palette
     */
    static createHighResolutionPalette(source) {
        const swatches = [];
        const labSource = (0,_microsoft_fast_colors__WEBPACK_IMPORTED_MODULE_5__.rgbToLAB)(_microsoft_fast_colors__WEBPACK_IMPORTED_MODULE_7__.ColorRGBA64.fromObject(source).roundToPrecision(4));
        const lab0 = (0,_microsoft_fast_colors__WEBPACK_IMPORTED_MODULE_5__.labToRGB)(new _microsoft_fast_colors__WEBPACK_IMPORTED_MODULE_8__.ColorLAB(0, labSource.a, labSource.b)).clamp().roundToPrecision(4);
        const lab50 = (0,_microsoft_fast_colors__WEBPACK_IMPORTED_MODULE_5__.labToRGB)(new _microsoft_fast_colors__WEBPACK_IMPORTED_MODULE_8__.ColorLAB(50, labSource.a, labSource.b)).clamp().roundToPrecision(4);
        const lab100 = (0,_microsoft_fast_colors__WEBPACK_IMPORTED_MODULE_5__.labToRGB)(new _microsoft_fast_colors__WEBPACK_IMPORTED_MODULE_8__.ColorLAB(100, labSource.a, labSource.b)).clamp().roundToPrecision(4);
        const rgbMin = new _microsoft_fast_colors__WEBPACK_IMPORTED_MODULE_7__.ColorRGBA64(0, 0, 0);
        const rgbMax = new _microsoft_fast_colors__WEBPACK_IMPORTED_MODULE_7__.ColorRGBA64(1, 1, 1);
        const lAbove = lab100.equalValue(rgbMax) ? 0 : 14;
        const lBelow = lab0.equalValue(rgbMin) ? 0 : 14;
        // 257 levels max, depending on whether lab0 or lab100 are black or white respectively.
        for (let l = 100 + lAbove; l >= 0 - lBelow; l -= 0.5) {
            let rgb;
            if (l < 0) {
                // For L less than 0, scale from black to L=0
                const percentFromRgbMinToLab0 = l / lBelow + 1;
                rgb = (0,_microsoft_fast_colors__WEBPACK_IMPORTED_MODULE_9__.interpolateRGB)(percentFromRgbMinToLab0, rgbMin, lab0);
            }
            else if (l <= 50) {
                // For L less than 50, we scale from L=0 to the base color
                rgb = (0,_microsoft_fast_colors__WEBPACK_IMPORTED_MODULE_9__.interpolateRGB)(PaletteRGBImpl.ramp(l), lab0, lab50);
            }
            else if (l <= 100) {
                // For L less than 100, scale from the base color to L=100
                rgb = (0,_microsoft_fast_colors__WEBPACK_IMPORTED_MODULE_9__.interpolateRGB)(PaletteRGBImpl.ramp(l), lab50, lab100);
            }
            else {
                // For L greater than 100, scale from L=100 to white
                const percentFromLab100ToRgbMax = (l - 100.0) / lAbove;
                rgb = (0,_microsoft_fast_colors__WEBPACK_IMPORTED_MODULE_9__.interpolateRGB)(percentFromLab100ToRgbMax, lab100, rgbMax);
            }
            rgb = PaletteRGBImpl.saturationBump(lab50, rgb).roundToPrecision(4);
            swatches.push(_swatch__WEBPACK_IMPORTED_MODULE_0__.SwatchRGB.from(rgb));
        }
        return new PaletteRGBImpl(source, swatches);
    }
    /**
     * Adjust one end of the contrast-based palette so it doesn't abruptly fall to black (or white).
     * @param swatchContrast Function to get the target contrast for the next swatch
     * @param referencePalette The high resolution palette
     * @param targetPalette The contrast-based palette to adjust
     * @param direction The end to adjust
     */
    static adjustEnd(swatchContrast, referencePalette, targetPalette, direction) {
        // Careful with the use of referencePalette as only the refSwatches is reversed.
        const refSwatches = direction === -1 ? referencePalette.swatches : referencePalette.reversedSwatches;
        const refIndex = (swatch) => {
            const index = referencePalette.closestIndexOf(swatch);
            return direction === 1 ? referencePalette.lastIndex - index : index;
        };
        // Only operates on the 'end' end of the array, so flip if we're adjusting the 'beginning'
        if (direction === 1) {
            targetPalette.reverse();
        }
        const targetContrast = swatchContrast(targetPalette[targetPalette.length - 2]);
        const actualContrast = (0,_microsoft_fast_colors__WEBPACK_IMPORTED_MODULE_4__.roundToPrecisionSmall)((0,_utilities_relative_luminance__WEBPACK_IMPORTED_MODULE_2__.contrast)(targetPalette[targetPalette.length - 1], targetPalette[targetPalette.length - 2]), 2);
        if (actualContrast < targetContrast) {
            // Remove last swatch if not sufficient contrast
            targetPalette.pop();
            // Distribute to the last swatch
            const safeSecondSwatch = referencePalette.colorContrast(refSwatches[referencePalette.lastIndex], targetContrast, undefined, direction);
            const safeSecondRefIndex = refIndex(safeSecondSwatch);
            const targetSwatchCurrentRefIndex = refIndex(targetPalette[targetPalette.length - 2]);
            const swatchesToSpace = safeSecondRefIndex - targetSwatchCurrentRefIndex;
            let space = 1;
            for (let i = targetPalette.length - swatchesToSpace - 1; i < targetPalette.length; i++) {
                const currentRefIndex = refIndex(targetPalette[i]);
                const nextRefIndex = i === targetPalette.length - 1 ? referencePalette.lastIndex : currentRefIndex + space;
                targetPalette[i] = refSwatches[nextRefIndex];
                space++;
            }
        }
        if (direction === 1) {
            targetPalette.reverse();
        }
    }
    /**
     * Generate a palette with consistent minimum contrast between swatches.
     * @param source The source color
     * @param options Palette generation options
     * @returns A palette meeting the requested contrast between swatches.
     */
    static createColorPaletteByContrast(source, options) {
        const referencePalette = PaletteRGBImpl.createHighResolutionPalette(source);
        // Ramp function to increase contrast as the swatches get darker
        const nextContrast = (swatch) => {
            const c = options.stepContrast + options.stepContrast * (1 - swatch.relativeLuminance) * options.stepContrastRamp;
            return (0,_microsoft_fast_colors__WEBPACK_IMPORTED_MODULE_4__.roundToPrecisionSmall)(c, 2);
        };
        const swatches = [];
        // Start with the source color or the light end color
        let ref = options.preserveSource ? source : referencePalette.swatches[0];
        swatches.push(ref);
        // Add swatches with contrast toward dark
        do {
            const targetContrast = nextContrast(ref);
            ref = referencePalette.colorContrast(ref, targetContrast, undefined, 1);
            swatches.push(ref);
        } while (ref.relativeLuminance > 0);
        // Add swatches with contrast toward light
        if (options.preserveSource) {
            ref = source;
            do {
                // This is off from the dark direction because `ref` here is the darker swatch, probably subtle
                const targetContrast = nextContrast(ref);
                ref = referencePalette.colorContrast(ref, targetContrast, undefined, -1);
                swatches.unshift(ref);
            } while (ref.relativeLuminance < 1);
        }
        // Validate dark end
        this.adjustEnd(nextContrast, referencePalette, swatches, -1);
        // Validate light end
        if (options.preserveSource) {
            this.adjustEnd(nextContrast, referencePalette, swatches, 1);
        }
        return swatches;
    }
    /**
     * Create a color palette from a provided swatch
     * @param source - The source swatch to create a palette from
     * @returns
     */
    static from(source, options) {
        const opts = options === void 0 || null ? defaultPaletteRGBOptions : Object.assign(Object.assign({}, defaultPaletteRGBOptions), options);
        return new PaletteRGBImpl(source, Object.freeze(PaletteRGBImpl.createColorPaletteByContrast(source, opts)));
    }
}


/***/ }),

/***/ "./node_modules/@fluentui/web-components/dist/esm/color/recipes/contrast-and-delta-swatch-set.js":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/@fluentui/web-components/dist/esm/color/recipes/contrast-and-delta-swatch-set.js ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   contrastAndDeltaSwatchSet: () => (/* binding */ contrastAndDeltaSwatchSet),
/* harmony export */   contrastAndDeltaSwatchSetByLuminance: () => (/* binding */ contrastAndDeltaSwatchSetByLuminance)
/* harmony export */ });
/* harmony import */ var _utilities_direction_by_is_dark__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/direction-by-is-dark */ "./node_modules/@fluentui/web-components/dist/esm/color/utilities/direction-by-is-dark.js");
/* harmony import */ var _utilities_is_dark__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities/is-dark */ "./node_modules/@fluentui/web-components/dist/esm/color/utilities/is-dark.js");


/**
 * @internal
 */
function contrastAndDeltaSwatchSet(palette, reference, baseContrast, restDelta, hoverDelta, activeDelta, focusDelta, direction) {
    if (direction === null || direction === void 0) {
        direction = (0,_utilities_direction_by_is_dark__WEBPACK_IMPORTED_MODULE_0__.directionByIsDark)(reference);
    }
    const baseIndex = palette.closestIndexOf(palette.colorContrast(reference, baseContrast));
    return {
        rest: palette.get(baseIndex + direction * restDelta),
        hover: palette.get(baseIndex + direction * hoverDelta),
        active: palette.get(baseIndex + direction * activeDelta),
        focus: palette.get(baseIndex + direction * focusDelta),
    };
}
/**
 * @internal
 */
function contrastAndDeltaSwatchSetByLuminance(palette, reference, lightBaseContrast, lightRestDelta, lightHoverDelta, lightActiveDelta, lightFocusDelta, lightDirection = undefined, darkBaseContrast, darkRestDelta, darkHoverDelta, darkActiveDelta, darkFocusDelta, darkDirection = undefined) {
    if ((0,_utilities_is_dark__WEBPACK_IMPORTED_MODULE_1__.isDark)(reference)) {
        return contrastAndDeltaSwatchSet(palette, reference, darkBaseContrast, darkRestDelta, darkHoverDelta, darkActiveDelta, darkFocusDelta, darkDirection);
    }
    else {
        return contrastAndDeltaSwatchSet(palette, reference, lightBaseContrast, lightRestDelta, lightHoverDelta, lightActiveDelta, lightFocusDelta, lightDirection);
    }
}


/***/ }),

/***/ "./node_modules/@fluentui/web-components/dist/esm/color/recipes/contrast-swatch.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/@fluentui/web-components/dist/esm/color/recipes/contrast-swatch.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   contrastSwatch: () => (/* binding */ contrastSwatch)
/* harmony export */ });
/**
 * Color algorithm using contrast from the reference color.
 *
 * @param palette - The palette to operate on
 * @param reference - The reference color
 * @param contrast - The desired minimum contrast
 *
 * @internal
 */
function contrastSwatch(palette, reference, contrast) {
    return palette.colorContrast(reference, contrast);
}


/***/ }),

/***/ "./node_modules/@fluentui/web-components/dist/esm/color/recipes/delta-swatch-set.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/@fluentui/web-components/dist/esm/color/recipes/delta-swatch-set.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   deltaSwatchSet: () => (/* binding */ deltaSwatchSet),
/* harmony export */   deltaSwatchSetByLuminance: () => (/* binding */ deltaSwatchSetByLuminance)
/* harmony export */ });
/* harmony import */ var _utilities_direction_by_is_dark__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/direction-by-is-dark */ "./node_modules/@fluentui/web-components/dist/esm/color/utilities/direction-by-is-dark.js");
/* harmony import */ var _utilities_is_dark__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities/is-dark */ "./node_modules/@fluentui/web-components/dist/esm/color/utilities/is-dark.js");


/**
 * Color algorithm using deltas from the reference color for states.
 *
 * @param palette The palette to operate on
 * @param reference The reference color to calculate a color for
 * @param restDelta The rest state offset from reference
 * @param hoverDelta The hover state offset from reference
 * @param activeDelta The active state offset from reference
 * @param focusDelta The focus state offset from reference
 * @param direction The direction the deltas move on the ramp, default goes darker for light references and lighter for dark references
 *
 * @internal
 */
function deltaSwatchSet(palette, reference, restDelta, hoverDelta, activeDelta, focusDelta, direction) {
    const referenceIndex = palette.closestIndexOf(reference);
    if (direction === null || direction === void 0) {
        direction = (0,_utilities_direction_by_is_dark__WEBPACK_IMPORTED_MODULE_0__.directionByIsDark)(reference);
    }
    return {
        rest: palette.get(referenceIndex + direction * restDelta),
        hover: palette.get(referenceIndex + direction * hoverDelta),
        active: palette.get(referenceIndex + direction * activeDelta),
        focus: palette.get(referenceIndex + direction * focusDelta),
    };
}
/**
 * Color algorithm using deltas from the reference color for states, allowing different deltas based on a light or dark reference color.
 *
 * @param palette The palette to operate on
 * @param reference The reference color to calculate a color for
 * @param lightRestDelta The rest offset for a light reference
 * @param lightHoverDelta The hover offset for a light reference
 * @param lightActiveDelta The rest offset for a light reference
 * @param lightFocusDelta The hover offset for a light reference
 * @param lightDirection The direction the deltas move on the ramp, default goes darker for light references
 * @param darkRestDelta The rest offset for a dark reference
 * @param darkHoverDelta The hover offset for a dark reference
 * @param darkActiveDelta The rest offset for a dark reference
 * @param darkFocusDelta The hover offset for a dark reference
 * @param darkDirection The direction the deltas move on the ramp, default goes lighter for dark references
 *
 * @internal
 */
function deltaSwatchSetByLuminance(palette, reference, lightRestDelta, lightHoverDelta, lightActiveDelta, lightFocusDelta, lightDirection = undefined, darkRestDelta, darkHoverDelta, darkActiveDelta, darkFocusDelta, darkDirection = undefined) {
    if ((0,_utilities_is_dark__WEBPACK_IMPORTED_MODULE_1__.isDark)(reference)) {
        return deltaSwatchSet(palette, reference, darkRestDelta, darkHoverDelta, darkActiveDelta, darkFocusDelta, darkDirection);
    }
    else {
        return deltaSwatchSet(palette, reference, lightRestDelta, lightHoverDelta, lightActiveDelta, lightFocusDelta, lightDirection);
    }
}


/***/ }),

/***/ "./node_modules/@fluentui/web-components/dist/esm/color/recipes/delta-swatch.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/@fluentui/web-components/dist/esm/color/recipes/delta-swatch.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   deltaSwatch: () => (/* binding */ deltaSwatch)
/* harmony export */ });
/* harmony import */ var _utilities_direction_by_is_dark__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/direction-by-is-dark */ "./node_modules/@fluentui/web-components/dist/esm/color/utilities/direction-by-is-dark.js");

/**
 * Color algorithm using a delta from the reference color.
 *
 * @param palette - The palette to operate on
 * @param reference - The reference color
 * @param delta - The offset from the reference
 *
 * @internal
 */
function deltaSwatch(palette, reference, delta) {
    return palette.get(palette.closestIndexOf(reference) + (0,_utilities_direction_by_is_dark__WEBPACK_IMPORTED_MODULE_0__.directionByIsDark)(reference) * delta);
}


/***/ }),

/***/ "./node_modules/@fluentui/web-components/dist/esm/color/recipes/focus-stroke.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/@fluentui/web-components/dist/esm/color/recipes/focus-stroke.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   focusStrokeInner: () => (/* binding */ focusStrokeInner),
/* harmony export */   focusStrokeOuter: () => (/* binding */ focusStrokeOuter)
/* harmony export */ });
/* harmony import */ var _utilities_color_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities/color-constants */ "./node_modules/@fluentui/web-components/dist/esm/color/utilities/color-constants.js");
/* harmony import */ var _utilities_is_dark__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/is-dark */ "./node_modules/@fluentui/web-components/dist/esm/color/utilities/is-dark.js");


/**
 * @internal
 */
function focusStrokeOuter(palette, reference) {
    return (0,_utilities_is_dark__WEBPACK_IMPORTED_MODULE_0__.isDark)(reference) ? _utilities_color_constants__WEBPACK_IMPORTED_MODULE_1__.white : _utilities_color_constants__WEBPACK_IMPORTED_MODULE_1__.black;
}
/**
 * @internal
 */
function focusStrokeInner(palette, reference, focusColor) {
    return (0,_utilities_is_dark__WEBPACK_IMPORTED_MODULE_0__.isDark)(reference) ? _utilities_color_constants__WEBPACK_IMPORTED_MODULE_1__.black : _utilities_color_constants__WEBPACK_IMPORTED_MODULE_1__.white;
}


/***/ }),

/***/ "./node_modules/@fluentui/web-components/dist/esm/color/recipes/foreground-on-accent.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/@fluentui/web-components/dist/esm/color/recipes/foreground-on-accent.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   foregroundOnAccent: () => (/* binding */ foregroundOnAccent),
/* harmony export */   foregroundOnAccentSet: () => (/* binding */ foregroundOnAccentSet)
/* harmony export */ });
/* harmony import */ var _utilities_color_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/color-constants */ "./node_modules/@fluentui/web-components/dist/esm/color/utilities/color-constants.js");

/**
 * @internal
 */
function foregroundOnAccent(reference, contrastTarget) {
    return reference.contrast(_utilities_color_constants__WEBPACK_IMPORTED_MODULE_0__.white) >= contrastTarget ? _utilities_color_constants__WEBPACK_IMPORTED_MODULE_0__.white : _utilities_color_constants__WEBPACK_IMPORTED_MODULE_0__.black;
}
function foregroundOnAccentSet(restFill, hoverFill, activeFill, focusFill, contrastTarget) {
    const defaultRule = fill => (fill.contrast(_utilities_color_constants__WEBPACK_IMPORTED_MODULE_0__.white) >= contrastTarget ? _utilities_color_constants__WEBPACK_IMPORTED_MODULE_0__.white : _utilities_color_constants__WEBPACK_IMPORTED_MODULE_0__.black);
    const restForeground = defaultRule(restFill);
    const hoverForeground = defaultRule(hoverFill);
    // Active doe not have contrast requirements, so if rest and hover use the same color, use that for active even if it would not have passed the contrast check.
    const activeForeground = restForeground.relativeLuminance === hoverForeground.relativeLuminance ? restForeground : defaultRule(activeFill);
    const focusForeground = defaultRule(focusFill);
    return {
        rest: restForeground,
        hover: hoverForeground,
        active: activeForeground,
        focus: focusForeground,
    };
}


/***/ }),

/***/ "./node_modules/@fluentui/web-components/dist/esm/color/recipes/gradient-shadow-stroke.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@fluentui/web-components/dist/esm/color/recipes/gradient-shadow-stroke.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   gradientShadowStroke: () => (/* binding */ gradientShadowStroke)
/* harmony export */ });
/* harmony import */ var _microsoft_fast_colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/fast-colors */ "./node_modules/@microsoft/fast-colors/dist/color-rgba-64.js");
/* harmony import */ var _microsoft_fast_colors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/fast-colors */ "./node_modules/@microsoft/fast-colors/dist/color-converters.js");
/* harmony import */ var _microsoft_fast_colors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/fast-colors */ "./node_modules/@microsoft/fast-colors/dist/parse-color.js");
/* harmony import */ var _microsoft_fast_colors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @microsoft/fast-colors */ "./node_modules/@microsoft/fast-colors/dist/color-blending.js");
/* harmony import */ var _swatch__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../swatch */ "./node_modules/@fluentui/web-components/dist/esm/color/swatch.js");
/* harmony import */ var _utilities_direction_by_is_dark__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities/direction-by-is-dark */ "./node_modules/@fluentui/web-components/dist/esm/color/utilities/direction-by-is-dark.js");
/* harmony import */ var _gradient_swatch__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./gradient-swatch */ "./node_modules/@fluentui/web-components/dist/esm/color/recipes/gradient-swatch.js");




const black = new _microsoft_fast_colors__WEBPACK_IMPORTED_MODULE_0__.ColorRGBA64(0, 0, 0);
const white = new _microsoft_fast_colors__WEBPACK_IMPORTED_MODULE_0__.ColorRGBA64(1, 1, 1);
/**
 * @internal
 */
function gradientShadowStroke(palette, reference, restDelta, hoverDelta, activeDelta, focusDelta, shadowDelta, direction, shadowPercentage = 10, blendWithReference = false) {
    const referenceIndex = palette.closestIndexOf(reference);
    if (direction === void 0) {
        direction = (0,_utilities_direction_by_is_dark__WEBPACK_IMPORTED_MODULE_1__.directionByIsDark)(reference);
    }
    function overlayHelper(color) {
        if (blendWithReference) {
            const refIndex = palette.closestIndexOf(reference);
            const refSwatch = palette.get(refIndex);
            const overlaySolid = color.relativeLuminance < reference.relativeLuminance ? black : white;
            const overlayColor = (0,_microsoft_fast_colors__WEBPACK_IMPORTED_MODULE_2__.calculateOverlayColor)((0,_microsoft_fast_colors__WEBPACK_IMPORTED_MODULE_3__.parseColorHexRGB)(color.toColorString()), (0,_microsoft_fast_colors__WEBPACK_IMPORTED_MODULE_3__.parseColorHexRGB)(refSwatch.toColorString()), overlaySolid).roundToPrecision(2);
            const blend = (0,_microsoft_fast_colors__WEBPACK_IMPORTED_MODULE_4__.computeAlphaBlend)((0,_microsoft_fast_colors__WEBPACK_IMPORTED_MODULE_3__.parseColorHexRGB)(reference.toColorString()), overlayColor);
            return _swatch__WEBPACK_IMPORTED_MODULE_5__.SwatchRGB.from(blend);
        }
        else {
            return color;
        }
    }
    const restIndex = referenceIndex + direction * restDelta;
    const hoverIndex = restIndex + direction * (hoverDelta - restDelta);
    const activeIndex = restIndex + direction * (activeDelta - restDelta);
    const focusIndex = restIndex + direction * (focusDelta - restDelta);
    const startPosition = direction === -1 ? 0 : 100 - shadowPercentage;
    const endPosition = direction === -1 ? shadowPercentage : 100;
    function gradientHelper(index, applyShadow) {
        const color = palette.get(index);
        if (applyShadow) {
            // Shadow is actually "highlight" on top in dark mode.
            const shadowColor = palette.get(index + direction * shadowDelta);
            const startColor = direction === -1 ? shadowColor : color;
            const endColor = direction === -1 ? color : shadowColor;
            const g = `linear-gradient(${overlayHelper(startColor).toColorString()} ${startPosition}%, ${overlayHelper(endColor).toColorString()} ${endPosition}%)`;
            return _gradient_swatch__WEBPACK_IMPORTED_MODULE_6__.GradientSwatchRGB.fromObject(startColor, g);
        }
        else {
            return overlayHelper(color);
        }
    }
    return {
        rest: gradientHelper(restIndex, true),
        hover: gradientHelper(hoverIndex, true),
        active: gradientHelper(activeIndex, false),
        focus: gradientHelper(focusIndex, true),
    };
}


/***/ }),

/***/ "./node_modules/@fluentui/web-components/dist/esm/color/recipes/gradient-swatch.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/@fluentui/web-components/dist/esm/color/recipes/gradient-swatch.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GradientSwatchRGB: () => (/* binding */ GradientSwatchRGB)
/* harmony export */ });
/* harmony import */ var _microsoft_fast_colors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/fast-colors */ "./node_modules/@microsoft/fast-colors/dist/color-rgba-64.js");
/* harmony import */ var _microsoft_fast_colors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/fast-colors */ "./node_modules/@microsoft/fast-colors/dist/color-converters.js");
/* harmony import */ var _utilities_relative_luminance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/relative-luminance */ "./node_modules/@fluentui/web-components/dist/esm/color/utilities/relative-luminance.js");


/**
 * An implementation of {@link Swatch} that produces a gradient.
 * This assumes a subtle gradient such that `relativeLuminance` is still meaningful,
 * either with consistent luminance across the steps or a small edge of larger change.
 * @internal
 */
class GradientSwatchRGB {
    /**
     *
     * @param red Red channel expressed as a number between 0 and 1
     * @param green Green channel expressed as a number between 0 and 1
     * @param blue Blue channel expressed as a number between 0 and 1
     */
    constructor(red, green, blue, cssGradient) {
        this.toColorString = () => this.cssGradient;
        this.contrast = _utilities_relative_luminance__WEBPACK_IMPORTED_MODULE_0__.contrast.bind(null, this);
        this.createCSS = this.toColorString;
        this.color = new _microsoft_fast_colors__WEBPACK_IMPORTED_MODULE_1__.ColorRGBA64(red, green, blue);
        this.cssGradient = cssGradient;
        this.relativeLuminance = (0,_microsoft_fast_colors__WEBPACK_IMPORTED_MODULE_2__.rgbToRelativeLuminance)(this.color);
        this.r = red;
        this.g = green;
        this.b = blue;
    }
    /**
     * Creates a GradientSwatch from a base color and gradient definition
     * @param obj The base color object, used for relative luminance
     * @param cssGradient The actual gradient to be rendered
     * @returns New GradientSwatch object
     */
    static fromObject(obj, cssGradient) {
        return new GradientSwatchRGB(obj.r, obj.g, obj.b, cssGradient);
    }
}


/***/ }),

/***/ "./node_modules/@fluentui/web-components/dist/esm/color/recipes/neutral-layer-1.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/@fluentui/web-components/dist/esm/color/recipes/neutral-layer-1.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   neutralLayer1: () => (/* binding */ neutralLayer1),
/* harmony export */   neutralLayer1Index: () => (/* binding */ neutralLayer1Index)
/* harmony export */ });
/* harmony import */ var _utilities_base_layer_luminance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/base-layer-luminance */ "./node_modules/@fluentui/web-components/dist/esm/color/utilities/base-layer-luminance.js");

/**
 * @internal
 */
function neutralLayer1Index(palette, baseLayerLuminance) {
    return palette.closestIndexOf((0,_utilities_base_layer_luminance__WEBPACK_IMPORTED_MODULE_0__.baseLayerLuminanceSwatch)(baseLayerLuminance));
}
/**
 * @internal
 */
function neutralLayer1(palette, baseLayerLuminance) {
    return palette.get(neutralLayer1Index(palette, baseLayerLuminance));
}


/***/ }),

/***/ "./node_modules/@fluentui/web-components/dist/esm/color/recipes/neutral-layer-2.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/@fluentui/web-components/dist/esm/color/recipes/neutral-layer-2.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   neutralLayer2: () => (/* binding */ neutralLayer2)
/* harmony export */ });
/* harmony import */ var _neutral_layer_1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./neutral-layer-1 */ "./node_modules/@fluentui/web-components/dist/esm/color/recipes/neutral-layer-1.js");

/**
 * @internal
 */
function neutralLayer2(palette, baseLayerLuminance, layerDelta) {
    return palette.get((0,_neutral_layer_1__WEBPACK_IMPORTED_MODULE_0__.neutralLayer1Index)(palette, baseLayerLuminance) + layerDelta * -1);
}


/***/ }),

/***/ "./node_modules/@fluentui/web-components/dist/esm/color/recipes/neutral-layer-3.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/@fluentui/web-components/dist/esm/color/recipes/neutral-layer-3.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   neutralLayer3: () => (/* binding */ neutralLayer3)
/* harmony export */ });
/* harmony import */ var _neutral_layer_1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./neutral-layer-1 */ "./node_modules/@fluentui/web-components/dist/esm/color/recipes/neutral-layer-1.js");

/**
 * @internal
 */
function neutralLayer3(palette, baseLayerLuminance, layerDelta) {
    return palette.get((0,_neutral_layer_1__WEBPACK_IMPORTED_MODULE_0__.neutralLayer1Index)(palette, baseLayerLuminance) + layerDelta * -1 * 2);
}


/***/ }),

/***/ "./node_modules/@fluentui/web-components/dist/esm/color/recipes/neutral-layer-4.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/@fluentui/web-components/dist/esm/color/recipes/neutral-layer-4.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   neutralLayer4: () => (/* binding */ neutralLayer4)
/* harmony export */ });
/* harmony import */ var _neutral_layer_1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./neutral-layer-1 */ "./node_modules/@fluentui/web-components/dist/esm/color/recipes/neutral-layer-1.js");

/**
 * @internal
 */
function neutralLayer4(palette, baseLayerLuminance, layerDelta) {
    return palette.get((0,_neutral_layer_1__WEBPACK_IMPORTED_MODULE_0__.neutralLayer1Index)(palette, baseLayerLuminance) + layerDelta * -1 * 3);
}


/***/ }),

/***/ "./node_modules/@fluentui/web-components/dist/esm/color/recipes/neutral-layer-floating.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@fluentui/web-components/dist/esm/color/recipes/neutral-layer-floating.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   neutralLayerFloating: () => (/* binding */ neutralLayerFloating)
/* harmony export */ });
/* harmony import */ var _neutral_layer_1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./neutral-layer-1 */ "./node_modules/@fluentui/web-components/dist/esm/color/recipes/neutral-layer-1.js");

/**
 * @internal
 */
function neutralLayerFloating(palette, baseLayerLuminance, layerDelta) {
    return palette.get((0,_neutral_layer_1__WEBPACK_IMPORTED_MODULE_0__.neutralLayer1Index)(palette, baseLayerLuminance) + layerDelta);
}


/***/ }),

/***/ "./node_modules/@fluentui/web-components/dist/esm/color/recipes/underline-stroke.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/@fluentui/web-components/dist/esm/color/recipes/underline-stroke.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   underlineStroke: () => (/* binding */ underlineStroke)
/* harmony export */ });
/* harmony import */ var _utilities_direction_by_is_dark__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/direction-by-is-dark */ "./node_modules/@fluentui/web-components/dist/esm/color/utilities/direction-by-is-dark.js");
/* harmony import */ var _gradient_swatch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gradient-swatch */ "./node_modules/@fluentui/web-components/dist/esm/color/recipes/gradient-swatch.js");


/**
 * @internal
 */
function underlineStroke(palette, reference, restDelta, hoverDelta, activeDelta, focusDelta, shadowDelta, width) {
    const referenceIndex = palette.closestIndexOf(reference);
    const direction = (0,_utilities_direction_by_is_dark__WEBPACK_IMPORTED_MODULE_0__.directionByIsDark)(reference);
    const restIndex = referenceIndex + direction * restDelta;
    const hoverIndex = restIndex + direction * (hoverDelta - restDelta);
    const activeIndex = restIndex + direction * (activeDelta - restDelta);
    const focusIndex = restIndex + direction * (focusDelta - restDelta);
    const midPosition = `calc(100% - ${width})`;
    function gradientHelper(index, applyShadow) {
        const color = palette.get(index);
        if (applyShadow) {
            const underlineColor = palette.get(index + direction * shadowDelta);
            const g = `linear-gradient(${color.toColorString()} ${midPosition}, ${underlineColor.toColorString()} ${midPosition}, ${underlineColor.toColorString()})`;
            return _gradient_swatch__WEBPACK_IMPORTED_MODULE_1__.GradientSwatchRGB.fromObject(color, g);
        }
        else {
            return color;
        }
    }
    return {
        rest: gradientHelper(restIndex, true),
        hover: gradientHelper(hoverIndex, true),
        active: gradientHelper(activeIndex, false),
        focus: gradientHelper(focusIndex, true),
    };
}


/***/ }),

/***/ "./node_modules/@fluentui/web-components/dist/esm/color/swatch.js":
/*!************************************************************************!*\
  !*** ./node_modules/@fluentui/web-components/dist/esm/color/swatch.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SwatchRGB: () => (/* binding */ SwatchRGB),
/* harmony export */   isSwatchRGB: () => (/* binding */ isSwatchRGB)
/* harmony export */ });
/* harmony import */ var _microsoft_fast_colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/fast-colors */ "./node_modules/@microsoft/fast-colors/dist/color-rgba-64.js");
/* harmony import */ var _microsoft_fast_colors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/fast-colors */ "./node_modules/@microsoft/fast-colors/dist/color-converters.js");
/* harmony import */ var _utilities_relative_luminance__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utilities/relative-luminance */ "./node_modules/@fluentui/web-components/dist/esm/color/utilities/relative-luminance.js");


/** @public */
const SwatchRGB = Object.freeze({
    create(r, g, b) {
        return new SwatchRGBImpl(r, g, b);
    },
    from(obj) {
        return new SwatchRGBImpl(obj.r, obj.g, obj.b);
    },
});
/**
 * Runtime test for an objects conformance with the SwatchRGB interface.
 * @internal
 */
function isSwatchRGB(value) {
    const test = {
        r: 0,
        g: 0,
        b: 0,
        toColorString: () => '',
        contrast: () => 0,
        relativeLuminance: 0,
    };
    for (const key in test) {
        if (typeof test[key] !== typeof value[key]) {
            return false;
        }
    }
    return true;
}
/**
 * An RGB implementation of {@link Swatch}
 * @internal
 */
class SwatchRGBImpl extends _microsoft_fast_colors__WEBPACK_IMPORTED_MODULE_0__.ColorRGBA64 {
    /**
     *
     * @param red - Red channel expressed as a number between 0 and 1
     * @param green - Green channel expressed as a number between 0 and 1
     * @param blue - Blue channel expressed as a number between 0 and 1
     */
    constructor(red, green, blue) {
        super(red, green, blue, 1);
        this.toColorString = this.toStringHexRGB;
        this.contrast = _utilities_relative_luminance__WEBPACK_IMPORTED_MODULE_1__.contrast.bind(null, this);
        this.createCSS = this.toColorString;
        this.relativeLuminance = (0,_microsoft_fast_colors__WEBPACK_IMPORTED_MODULE_2__.rgbToRelativeLuminance)(this);
    }
    static fromObject(obj) {
        return new SwatchRGBImpl(obj.r, obj.g, obj.b);
    }
}


/***/ }),

/***/ "./node_modules/@fluentui/web-components/dist/esm/color/utilities/base-layer-luminance.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@fluentui/web-components/dist/esm/color/utilities/base-layer-luminance.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StandardLuminance: () => (/* binding */ StandardLuminance),
/* harmony export */   baseLayerLuminanceSwatch: () => (/* binding */ baseLayerLuminanceSwatch)
/* harmony export */ });
/* harmony import */ var _swatch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../swatch */ "./node_modules/@fluentui/web-components/dist/esm/color/swatch.js");

function baseLayerLuminanceSwatch(luminance) {
    return _swatch__WEBPACK_IMPORTED_MODULE_0__.SwatchRGB.create(luminance, luminance, luminance);
}
/**
 * Recommended values for light and dark mode for {@link @fluentui/web-components#baseLayerLuminance}.
 *
 * @public
 */
var StandardLuminance;
(function (StandardLuminance) {
    StandardLuminance[StandardLuminance["LightMode"] = 0.98] = "LightMode";
    StandardLuminance[StandardLuminance["DarkMode"] = 0.15] = "DarkMode";
})(StandardLuminance || (StandardLuminance = {}));


/***/ }),

/***/ "./node_modules/@fluentui/web-components/dist/esm/color/utilities/binary-search.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/@fluentui/web-components/dist/esm/color/utilities/binary-search.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   binarySearch: () => (/* binding */ binarySearch)
/* harmony export */ });
/**
 * @internal
 */
function binarySearch(valuesToSearch, searchCondition, startIndex = 0, endIndex = valuesToSearch.length - 1) {
    if (endIndex === startIndex) {
        return valuesToSearch[startIndex];
    }
    const middleIndex = Math.floor((endIndex - startIndex) / 2) + startIndex;
    // Check to see if this passes on the item in the center of the array
    // if it does check the previous values
    return searchCondition(valuesToSearch[middleIndex])
        ? binarySearch(valuesToSearch, searchCondition, startIndex, middleIndex)
        : binarySearch(valuesToSearch, searchCondition, middleIndex + 1, // exclude this index because it failed the search condition
        endIndex);
}


/***/ }),

/***/ "./node_modules/@fluentui/web-components/dist/esm/color/utilities/color-constants.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/@fluentui/web-components/dist/esm/color/utilities/color-constants.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   accentBase: () => (/* binding */ accentBase),
/* harmony export */   black: () => (/* binding */ black),
/* harmony export */   middleGrey: () => (/* binding */ middleGrey),
/* harmony export */   white: () => (/* binding */ white)
/* harmony export */ });
/* harmony import */ var _microsoft_fast_colors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/fast-colors */ "./node_modules/@microsoft/fast-colors/dist/parse-color.js");
/* harmony import */ var _swatch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../swatch */ "./node_modules/@fluentui/web-components/dist/esm/color/swatch.js");


/**
 * @internal
 */
const white = _swatch__WEBPACK_IMPORTED_MODULE_0__.SwatchRGB.create(1, 1, 1);
/**
 * @internal
 */
const black = _swatch__WEBPACK_IMPORTED_MODULE_0__.SwatchRGB.create(0, 0, 0);
/**
 * @internal
 */
const middleGrey = _swatch__WEBPACK_IMPORTED_MODULE_0__.SwatchRGB.create(0.5, 0.5, 0.5);
/**
 * @internal
 */
const base = (0,_microsoft_fast_colors__WEBPACK_IMPORTED_MODULE_1__.parseColorHexRGB)('#0078D4');
const accentBase = _swatch__WEBPACK_IMPORTED_MODULE_0__.SwatchRGB.create(base.r, base.g, base.b);


/***/ }),

/***/ "./node_modules/@fluentui/web-components/dist/esm/color/utilities/direction-by-is-dark.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@fluentui/web-components/dist/esm/color/utilities/direction-by-is-dark.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   directionByIsDark: () => (/* binding */ directionByIsDark)
/* harmony export */ });
/* harmony import */ var _is_dark__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./is-dark */ "./node_modules/@fluentui/web-components/dist/esm/color/utilities/is-dark.js");

/**
 * @internal
 */
function directionByIsDark(color) {
    return (0,_is_dark__WEBPACK_IMPORTED_MODULE_0__.isDark)(color) ? -1 : 1;
}


/***/ }),

/***/ "./node_modules/@fluentui/web-components/dist/esm/color/utilities/is-dark.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@fluentui/web-components/dist/esm/color/utilities/is-dark.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isDark: () => (/* binding */ isDark)
/* harmony export */ });
/*
 * A color is in "dark" if there is more contrast between #000000 and a reference
 * color than #FFFFFF and the reference color. That threshold can be expressed as a relative luminance
 * using the contrast formula as (1 + 0.5) / (R + 0.05) === (R + 0.05) / (0 + 0.05),
 * which reduces to the following, where 'R' is the relative luminance of the reference color
 */
const target = (-0.1 + Math.sqrt(0.21)) / 2;
/**
 * Determines if a color should be considered Dark Mode
 * @param color - The color to check to mode of
 * @returns boolean
 *
 * @internal
 */
function isDark(color) {
    return color.relativeLuminance <= target;
}


/***/ }),

/***/ "./node_modules/@fluentui/web-components/dist/esm/color/utilities/relative-luminance.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/@fluentui/web-components/dist/esm/color/utilities/relative-luminance.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   contrast: () => (/* binding */ contrast)
/* harmony export */ });
/**
 * @internal
 */
function contrast(a, b) {
    const L1 = a.relativeLuminance > b.relativeLuminance ? a : b;
    const L2 = a.relativeLuminance > b.relativeLuminance ? b : a;
    return (L1.relativeLuminance + 0.05) / (L2.relativeLuminance + 0.05);
}


/***/ }),

/***/ "./node_modules/@fluentui/web-components/dist/esm/design-system-provider/index.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/@fluentui/web-components/dist/esm/design-system-provider/index.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DesignSystemProvider: () => (/* binding */ DesignSystemProvider),
/* harmony export */   fluentDesignSystemProvider: () => (/* binding */ fluentDesignSystemProvider)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _microsoft_fast_colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/fast-colors */ "./node_modules/@microsoft/fast-colors/dist/parse-color.js");
/* harmony import */ var _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/fast-element */ "./node_modules/@microsoft/fast-element/dist/esm/styles/css.js");
/* harmony import */ var _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @microsoft/fast-element */ "./node_modules/@microsoft/fast-element/dist/esm/observation/observable.js");
/* harmony import */ var _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @microsoft/fast-element */ "./node_modules/@microsoft/fast-element/dist/esm/components/attributes.js");
/* harmony import */ var _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @microsoft/fast-element */ "./node_modules/@microsoft/fast-element/dist/esm/templating/template.js");
/* harmony import */ var _microsoft_fast_foundation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @microsoft/fast-foundation */ "./node_modules/@microsoft/fast-foundation/dist/esm/utilities/match-media-stylesheet-behavior.js");
/* harmony import */ var _microsoft_fast_foundation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @microsoft/fast-foundation */ "./node_modules/@microsoft/fast-foundation/dist/esm/foundation-element/foundation-element.js");
/* harmony import */ var _microsoft_fast_foundation__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @microsoft/fast-foundation */ "./node_modules/@microsoft/fast-foundation/dist/esm/utilities/style/display.js");
/* harmony import */ var _microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @microsoft/fast-web-utilities */ "./node_modules/@microsoft/fast-web-utilities/dist/system-colors.js");
/* harmony import */ var _color_swatch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../color/swatch */ "./node_modules/@fluentui/web-components/dist/esm/color/swatch.js");
/* harmony import */ var _design_tokens__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../design-tokens */ "./node_modules/@fluentui/web-components/dist/esm/design-tokens.js");







/**
 * A {@link ValueConverter} that converts to and from `Swatch` values.
 * @remarks
 * This converter allows for colors represented as string hex values, returning `null` if the
 * input was `null` or `undefined`.
 * @internal
 */
const swatchConverter = {
    toView(value) {
        if (value === null || value === undefined) {
            return null;
        }
        return value === null || value === void 0 ? void 0 : value.toColorString();
    },
    fromView(value) {
        if (value === null || value === undefined) {
            return null;
        }
        const color = (0,_microsoft_fast_colors__WEBPACK_IMPORTED_MODULE_0__.parseColorHexRGB)(value);
        return color ? _color_swatch__WEBPACK_IMPORTED_MODULE_1__.SwatchRGB.create(color.r, color.g, color.b) : null;
    },
};
const backgroundStyles = (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_2__.css) `
  :host {
    background-color: ${_design_tokens__WEBPACK_IMPORTED_MODULE_3__.fillColor};
    color: ${_design_tokens__WEBPACK_IMPORTED_MODULE_3__.neutralForegroundRest};
  }
`.withBehaviors((0,_microsoft_fast_foundation__WEBPACK_IMPORTED_MODULE_4__.forcedColorsStylesheetBehavior)((0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_2__.css) `
      :host {
        background-color: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_5__.SystemColors.Canvas};
        box-shadow: 0 0 0 1px ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_5__.SystemColors.CanvasText};
        color: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_5__.SystemColors.CanvasText};
      }
    `));
function designToken(token) {
    return (source, key) => {
        source[key + 'Changed'] = function (prev, next) {
            if (next !== undefined && next !== null) {
                token.setValueFor(this, next);
            }
            else {
                token.deleteValueFor(this);
            }
        };
    };
}
/**
 * The Fluent DesignSystemProvider Element.
 * @public
 */
class DesignSystemProvider extends _microsoft_fast_foundation__WEBPACK_IMPORTED_MODULE_6__.FoundationElement {
    constructor() {
        super();
        /**
         * Used to instruct the FluentDesignSystemProvider
         * that it should not set the CSS
         * background-color and color properties
         *
         * @remarks
         * HTML boolean attribute: no-paint
         */
        this.noPaint = false;
        // If fillColor or baseLayerLuminance change, we need to
        // re-evaluate whether we should have paint styles applied
        const subscriber = {
            handleChange: this.noPaintChanged.bind(this),
        };
        _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_7__.Observable.getNotifier(this).subscribe(subscriber, 'fillColor');
        _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_7__.Observable.getNotifier(this).subscribe(subscriber, 'baseLayerLuminance');
    }
    connectedCallback() {
        super.connectedCallback();
        this.noPaintChanged();
    }
    noPaintChanged() {
        if (!this.noPaint && (this.fillColor !== void 0 || this.baseLayerLuminance)) {
            this.$fastController.addStyles(backgroundStyles);
        }
        else {
            this.$fastController.removeStyles(backgroundStyles);
        }
    }
}
(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.attr)({ attribute: 'no-paint', mode: 'boolean' })
], DesignSystemProvider.prototype, "noPaint", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.attr)({
        attribute: 'fill-color',
        converter: swatchConverter,
        mode: 'fromView',
    }),
    designToken(_design_tokens__WEBPACK_IMPORTED_MODULE_3__.fillColor)
], DesignSystemProvider.prototype, "fillColor", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.attr)({
        attribute: 'accent-base-color',
        converter: swatchConverter,
        mode: 'fromView',
    }),
    designToken(_design_tokens__WEBPACK_IMPORTED_MODULE_3__.accentBaseColor)
], DesignSystemProvider.prototype, "accentBaseColor", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.attr)({
        attribute: 'neutral-base-color',
        converter: swatchConverter,
        mode: 'fromView',
    }),
    designToken(_design_tokens__WEBPACK_IMPORTED_MODULE_3__.neutralBaseColor)
], DesignSystemProvider.prototype, "neutralBaseColor", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.attr)({
        converter: _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.nullableNumberConverter,
    }),
    designToken(_design_tokens__WEBPACK_IMPORTED_MODULE_3__.density)
], DesignSystemProvider.prototype, "density", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.attr)({
        attribute: 'design-unit',
        converter: _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.nullableNumberConverter,
    }),
    designToken(_design_tokens__WEBPACK_IMPORTED_MODULE_3__.designUnit)
], DesignSystemProvider.prototype, "designUnit", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.attr)({
        attribute: 'direction',
    }),
    designToken(_design_tokens__WEBPACK_IMPORTED_MODULE_3__.direction)
], DesignSystemProvider.prototype, "direction", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.attr)({
        attribute: 'base-height-multiplier',
        converter: _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.nullableNumberConverter,
    }),
    designToken(_design_tokens__WEBPACK_IMPORTED_MODULE_3__.baseHeightMultiplier)
], DesignSystemProvider.prototype, "baseHeightMultiplier", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.attr)({
        attribute: 'base-horizontal-spacing-multiplier',
        converter: _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.nullableNumberConverter,
    }),
    designToken(_design_tokens__WEBPACK_IMPORTED_MODULE_3__.baseHorizontalSpacingMultiplier)
], DesignSystemProvider.prototype, "baseHorizontalSpacingMultiplier", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.attr)({
        attribute: 'control-corner-radius',
        converter: _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.nullableNumberConverter,
    }),
    designToken(_design_tokens__WEBPACK_IMPORTED_MODULE_3__.controlCornerRadius)
], DesignSystemProvider.prototype, "controlCornerRadius", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.attr)({
        attribute: 'layer-corner-radius',
        converter: _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.nullableNumberConverter,
    }),
    designToken(_design_tokens__WEBPACK_IMPORTED_MODULE_3__.layerCornerRadius)
], DesignSystemProvider.prototype, "layerCornerRadius", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.attr)({
        attribute: 'stroke-width',
        converter: _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.nullableNumberConverter,
    }),
    designToken(_design_tokens__WEBPACK_IMPORTED_MODULE_3__.strokeWidth)
], DesignSystemProvider.prototype, "strokeWidth", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.attr)({
        attribute: 'focus-stroke-width',
        converter: _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.nullableNumberConverter,
    }),
    designToken(_design_tokens__WEBPACK_IMPORTED_MODULE_3__.focusStrokeWidth)
], DesignSystemProvider.prototype, "focusStrokeWidth", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.attr)({
        attribute: 'disabled-opacity',
        converter: _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.nullableNumberConverter,
    }),
    designToken(_design_tokens__WEBPACK_IMPORTED_MODULE_3__.disabledOpacity)
], DesignSystemProvider.prototype, "disabledOpacity", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.attr)({
        attribute: 'type-ramp-minus-2-font-size',
    }),
    designToken(_design_tokens__WEBPACK_IMPORTED_MODULE_3__.typeRampMinus2FontSize)
], DesignSystemProvider.prototype, "typeRampMinus2FontSize", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.attr)({
        attribute: 'type-ramp-minus-2-line-height',
    }),
    designToken(_design_tokens__WEBPACK_IMPORTED_MODULE_3__.typeRampMinus2LineHeight)
], DesignSystemProvider.prototype, "typeRampMinus2LineHeight", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.attr)({
        attribute: 'type-ramp-minus-1-font-size',
    }),
    designToken(_design_tokens__WEBPACK_IMPORTED_MODULE_3__.typeRampMinus1FontSize)
], DesignSystemProvider.prototype, "typeRampMinus1FontSize", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.attr)({
        attribute: 'type-ramp-minus-1-line-height',
    }),
    designToken(_design_tokens__WEBPACK_IMPORTED_MODULE_3__.typeRampMinus1LineHeight)
], DesignSystemProvider.prototype, "typeRampMinus1LineHeight", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.attr)({
        attribute: 'type-ramp-base-font-size',
    }),
    designToken(_design_tokens__WEBPACK_IMPORTED_MODULE_3__.typeRampBaseFontSize)
], DesignSystemProvider.prototype, "typeRampBaseFontSize", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.attr)({
        attribute: 'type-ramp-base-line-height',
    }),
    designToken(_design_tokens__WEBPACK_IMPORTED_MODULE_3__.typeRampBaseLineHeight)
], DesignSystemProvider.prototype, "typeRampBaseLineHeight", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.attr)({
        attribute: 'type-ramp-plus-1-font-size',
    }),
    designToken(_design_tokens__WEBPACK_IMPORTED_MODULE_3__.typeRampPlus1FontSize)
], DesignSystemProvider.prototype, "typeRampPlus1FontSize", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.attr)({
        attribute: 'type-ramp-plus-1-line-height',
    }),
    designToken(_design_tokens__WEBPACK_IMPORTED_MODULE_3__.typeRampPlus1LineHeight)
], DesignSystemProvider.prototype, "typeRampPlus1LineHeight", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.attr)({
        attribute: 'type-ramp-plus-2-font-size',
    }),
    designToken(_design_tokens__WEBPACK_IMPORTED_MODULE_3__.typeRampPlus2FontSize)
], DesignSystemProvider.prototype, "typeRampPlus2FontSize", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.attr)({
        attribute: 'type-ramp-plus-2-line-height',
    }),
    designToken(_design_tokens__WEBPACK_IMPORTED_MODULE_3__.typeRampPlus2LineHeight)
], DesignSystemProvider.prototype, "typeRampPlus2LineHeight", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.attr)({
        attribute: 'type-ramp-plus-3-font-size',
    }),
    designToken(_design_tokens__WEBPACK_IMPORTED_MODULE_3__.typeRampPlus3FontSize)
], DesignSystemProvider.prototype, "typeRampPlus3FontSize", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.attr)({
        attribute: 'type-ramp-plus-3-line-height',
    }),
    designToken(_design_tokens__WEBPACK_IMPORTED_MODULE_3__.typeRampPlus3LineHeight)
], DesignSystemProvider.prototype, "typeRampPlus3LineHeight", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.attr)({
        attribute: 'type-ramp-plus-4-font-size',
    }),
    designToken(_design_tokens__WEBPACK_IMPORTED_MODULE_3__.typeRampPlus4FontSize)
], DesignSystemProvider.prototype, "typeRampPlus4FontSize", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.attr)({
        attribute: 'type-ramp-plus-4-line-height',
    }),
    designToken(_design_tokens__WEBPACK_IMPORTED_MODULE_3__.typeRampPlus4LineHeight)
], DesignSystemProvider.prototype, "typeRampPlus4LineHeight", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.attr)({
        attribute: 'type-ramp-plus-5-font-size',
    }),
    designToken(_design_tokens__WEBPACK_IMPORTED_MODULE_3__.typeRampPlus5FontSize)
], DesignSystemProvider.prototype, "typeRampPlus5FontSize", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.attr)({
        attribute: 'type-ramp-plus-5-line-height',
    }),
    designToken(_design_tokens__WEBPACK_IMPORTED_MODULE_3__.typeRampPlus5LineHeight)
], DesignSystemProvider.prototype, "typeRampPlus5LineHeight", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.attr)({
        attribute: 'type-ramp-plus-6-font-size',
    }),
    designToken(_design_tokens__WEBPACK_IMPORTED_MODULE_3__.typeRampPlus6FontSize)
], DesignSystemProvider.prototype, "typeRampPlus6FontSize", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.attr)({
        attribute: 'type-ramp-plus-6-line-height',
    }),
    designToken(_design_tokens__WEBPACK_IMPORTED_MODULE_3__.typeRampPlus6LineHeight)
], DesignSystemProvider.prototype, "typeRampPlus6LineHeight", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.attr)({
        attribute: 'accent-fill-rest-delta',
        converter: _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.nullableNumberConverter,
    }),
    designToken(_design_tokens__WEBPACK_IMPORTED_MODULE_3__.accentFillRestDelta)
], DesignSystemProvider.prototype, "accentFillRestDelta", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.attr)({
        attribute: 'accent-fill-hover-delta',
        converter: _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.nullableNumberConverter,
    }),
    designToken(_design_tokens__WEBPACK_IMPORTED_MODULE_3__.accentFillHoverDelta)
], DesignSystemProvider.prototype, "accentFillHoverDelta", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.attr)({
        attribute: 'accent-fill-active-delta',
        converter: _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.nullableNumberConverter,
    }),
    designToken(_design_tokens__WEBPACK_IMPORTED_MODULE_3__.accentFillActiveDelta)
], DesignSystemProvider.prototype, "accentFillActiveDelta", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.attr)({
        attribute: 'accent-fill-focus-delta',
        converter: _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.nullableNumberConverter,
    }),
    designToken(_design_tokens__WEBPACK_IMPORTED_MODULE_3__.accentFillFocusDelta)
], DesignSystemProvider.prototype, "accentFillFocusDelta", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.attr)({
        attribute: 'accent-foreground-rest-delta',
        converter: _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.nullableNumberConverter,
    }),
    designToken(_design_tokens__WEBPACK_IMPORTED_MODULE_3__.accentForegroundRestDelta)
], DesignSystemProvider.prototype, "accentForegroundRestDelta", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.attr)({
        attribute: 'accent-foreground-hover-delta',
        converter: _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.nullableNumberConverter,
    }),
    designToken(_design_tokens__WEBPACK_IMPORTED_MODULE_3__.accentForegroundHoverDelta)
], DesignSystemProvider.prototype, "accentForegroundHoverDelta", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.attr)({
        attribute: 'accent-foreground-active-delta',
        converter: _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.nullableNumberConverter,
    }),
    designToken(_design_tokens__WEBPACK_IMPORTED_MODULE_3__.accentForegroundActiveDelta)
], DesignSystemProvider.prototype, "accentForegroundActiveDelta", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.attr)({
        attribute: 'accent-foreground-focus-delta',
        converter: _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.nullableNumberConverter,
    }),
    designToken(_design_tokens__WEBPACK_IMPORTED_MODULE_3__.accentForegroundFocusDelta)
], DesignSystemProvider.prototype, "accentForegroundFocusDelta", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.attr)({
        attribute: 'neutral-fill-rest-delta',
        converter: _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.nullableNumberConverter,
    }),
    designToken(_design_tokens__WEBPACK_IMPORTED_MODULE_3__.neutralFillRestDelta)
], DesignSystemProvider.prototype, "neutralFillRestDelta", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.attr)({
        attribute: 'neutral-fill-hover-delta',
        converter: _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.nullableNumberConverter,
    }),
    designToken(_design_tokens__WEBPACK_IMPORTED_MODULE_3__.neutralFillHoverDelta)
], DesignSystemProvider.prototype, "neutralFillHoverDelta", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.attr)({
        attribute: 'neutral-fill-active-delta',
        converter: _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.nullableNumberConverter,
    }),
    designToken(_design_tokens__WEBPACK_IMPORTED_MODULE_3__.neutralFillActiveDelta)
], DesignSystemProvider.prototype, "neutralFillActiveDelta", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.attr)({
        attribute: 'neutral-fill-focus-delta',
        converter: _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.nullableNumberConverter,
    }),
    designToken(_design_tokens__WEBPACK_IMPORTED_MODULE_3__.neutralFillFocusDelta)
], DesignSystemProvider.prototype, "neutralFillFocusDelta", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.attr)({
        attribute: 'neutral-fill-input-rest-delta',
        converter: _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.nullableNumberConverter,
    }),
    designToken(_design_tokens__WEBPACK_IMPORTED_MODULE_3__.neutralFillInputRestDelta)
], DesignSystemProvider.prototype, "neutralFillInputRestDelta", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.attr)({
        attribute: 'neutral-fill-input-hover-delta',
        converter: _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.nullableNumberConverter,
    }),
    designToken(_design_tokens__WEBPACK_IMPORTED_MODULE_3__.neutralFillInputHoverDelta)
], DesignSystemProvider.prototype, "neutralFillInputHoverDelta", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.attr)({
        attribute: 'neutral-fill-input-active-delta',
        converter: _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.nullableNumberConverter,
    }),
    designToken(_design_tokens__WEBPACK_IMPORTED_MODULE_3__.neutralFillInputActiveDelta)
], DesignSystemProvider.prototype, "neutralFillInputActiveDelta", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.attr)({
        attribute: 'neutral-fill-input-focus-delta',
        converter: _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.nullableNumberConverter,
    }),
    designToken(_design_tokens__WEBPACK_IMPORTED_MODULE_3__.neutralFillInputFocusDelta)
], DesignSystemProvider.prototype, "neutralFillInputFocusDelta", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.attr)({
        attribute: 'neutral-fill-layer-rest-delta',
        converter: _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.nullableNumberConverter,
    }),
    designToken(_design_tokens__WEBPACK_IMPORTED_MODULE_3__.neutralFillLayerRestDelta)
], DesignSystemProvider.prototype, "neutralFillLayerRestDelta", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.attr)({
        attribute: 'neutral-fill-stealth-rest-delta',
        converter: _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.nullableNumberConverter,
    }),
    designToken(_design_tokens__WEBPACK_IMPORTED_MODULE_3__.neutralFillStealthRestDelta)
], DesignSystemProvider.prototype, "neutralFillStealthRestDelta", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.attr)({
        attribute: 'neutral-fill-stealth-hover-delta',
        converter: _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.nullableNumberConverter,
    }),
    designToken(_design_tokens__WEBPACK_IMPORTED_MODULE_3__.neutralFillStealthHoverDelta)
], DesignSystemProvider.prototype, "neutralFillStealthHoverDelta", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.attr)({
        attribute: 'neutral-fill-stealth-active-delta',
        converter: _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.nullableNumberConverter,
    }),
    designToken(_design_tokens__WEBPACK_IMPORTED_MODULE_3__.neutralFillStealthActiveDelta)
], DesignSystemProvider.prototype, "neutralFillStealthActiveDelta", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.attr)({
        attribute: 'neutral-fill-stealth-focus-delta',
        converter: _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.nullableNumberConverter,
    }),
    designToken(_design_tokens__WEBPACK_IMPORTED_MODULE_3__.neutralFillStealthFocusDelta)
], DesignSystemProvider.prototype, "neutralFillStealthFocusDelta", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.attr)({
        attribute: 'neutral-fill-strong-hover-delta',
        converter: _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.nullableNumberConverter,
    }),
    designToken(_design_tokens__WEBPACK_IMPORTED_MODULE_3__.neutralFillStrongHoverDelta)
], DesignSystemProvider.prototype, "neutralFillStrongHoverDelta", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.attr)({
        attribute: 'neutral-fill-strong-active-delta',
        converter: _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.nullableNumberConverter,
    }),
    designToken(_design_tokens__WEBPACK_IMPORTED_MODULE_3__.neutralFillStrongActiveDelta)
], DesignSystemProvider.prototype, "neutralFillStrongActiveDelta", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.attr)({
        attribute: 'neutral-fill-strong-focus-delta',
        converter: _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.nullableNumberConverter,
    }),
    designToken(_design_tokens__WEBPACK_IMPORTED_MODULE_3__.neutralFillStrongFocusDelta)
], DesignSystemProvider.prototype, "neutralFillStrongFocusDelta", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.attr)({
        attribute: 'base-layer-luminance',
        converter: _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.nullableNumberConverter,
    }),
    designToken(_design_tokens__WEBPACK_IMPORTED_MODULE_3__.baseLayerLuminance)
], DesignSystemProvider.prototype, "baseLayerLuminance", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.attr)({
        attribute: 'neutral-stroke-divider-rest-delta',
        converter: _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.nullableNumberConverter,
    }),
    designToken(_design_tokens__WEBPACK_IMPORTED_MODULE_3__.neutralStrokeDividerRestDelta)
], DesignSystemProvider.prototype, "neutralStrokeDividerRestDelta", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.attr)({
        attribute: 'neutral-stroke-rest-delta',
        converter: _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.nullableNumberConverter,
    }),
    designToken(_design_tokens__WEBPACK_IMPORTED_MODULE_3__.neutralStrokeRestDelta)
], DesignSystemProvider.prototype, "neutralStrokeRestDelta", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.attr)({
        attribute: 'neutral-stroke-hover-delta',
        converter: _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.nullableNumberConverter,
    }),
    designToken(_design_tokens__WEBPACK_IMPORTED_MODULE_3__.neutralStrokeHoverDelta)
], DesignSystemProvider.prototype, "neutralStrokeHoverDelta", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.attr)({
        attribute: 'neutral-stroke-active-delta',
        converter: _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.nullableNumberConverter,
    }),
    designToken(_design_tokens__WEBPACK_IMPORTED_MODULE_3__.neutralStrokeActiveDelta)
], DesignSystemProvider.prototype, "neutralStrokeActiveDelta", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.attr)({
        attribute: 'neutral-stroke-focus-delta',
        converter: _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_9__.nullableNumberConverter,
    }),
    designToken(_design_tokens__WEBPACK_IMPORTED_MODULE_3__.neutralStrokeFocusDelta)
], DesignSystemProvider.prototype, "neutralStrokeFocusDelta", void 0);
/**
 * The Fluent Design System Provider Element.
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-design-system-provider\>
 */
const fluentDesignSystemProvider = DesignSystemProvider.compose({
    baseName: 'design-system-provider',
    template: (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_10__.html) ` <slot></slot> `,
    styles: (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_2__.css) `
    ${(0,_microsoft_fast_foundation__WEBPACK_IMPORTED_MODULE_11__.display)('block')}
  `,
});


/***/ }),

/***/ "./node_modules/@fluentui/web-components/dist/esm/design-tokens.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@fluentui/web-components/dist/esm/design-tokens.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   accentBaseColor: () => (/* binding */ accentBaseColor),
/* harmony export */   accentFillActive: () => (/* binding */ accentFillActive),
/* harmony export */   accentFillActiveDelta: () => (/* binding */ accentFillActiveDelta),
/* harmony export */   accentFillFocus: () => (/* binding */ accentFillFocus),
/* harmony export */   accentFillFocusDelta: () => (/* binding */ accentFillFocusDelta),
/* harmony export */   accentFillHover: () => (/* binding */ accentFillHover),
/* harmony export */   accentFillHoverDelta: () => (/* binding */ accentFillHoverDelta),
/* harmony export */   accentFillRecipe: () => (/* binding */ accentFillRecipe),
/* harmony export */   accentFillRest: () => (/* binding */ accentFillRest),
/* harmony export */   accentFillRestDelta: () => (/* binding */ accentFillRestDelta),
/* harmony export */   accentForegroundActive: () => (/* binding */ accentForegroundActive),
/* harmony export */   accentForegroundActiveDelta: () => (/* binding */ accentForegroundActiveDelta),
/* harmony export */   accentForegroundCut: () => (/* binding */ accentForegroundCut),
/* harmony export */   accentForegroundCutLarge: () => (/* binding */ accentForegroundCutLarge),
/* harmony export */   accentForegroundFocus: () => (/* binding */ accentForegroundFocus),
/* harmony export */   accentForegroundFocusDelta: () => (/* binding */ accentForegroundFocusDelta),
/* harmony export */   accentForegroundHover: () => (/* binding */ accentForegroundHover),
/* harmony export */   accentForegroundHoverDelta: () => (/* binding */ accentForegroundHoverDelta),
/* harmony export */   accentForegroundRecipe: () => (/* binding */ accentForegroundRecipe),
/* harmony export */   accentForegroundRest: () => (/* binding */ accentForegroundRest),
/* harmony export */   accentForegroundRestDelta: () => (/* binding */ accentForegroundRestDelta),
/* harmony export */   accentPalette: () => (/* binding */ accentPalette),
/* harmony export */   accentStrokeControlActive: () => (/* binding */ accentStrokeControlActive),
/* harmony export */   accentStrokeControlFocus: () => (/* binding */ accentStrokeControlFocus),
/* harmony export */   accentStrokeControlHover: () => (/* binding */ accentStrokeControlHover),
/* harmony export */   accentStrokeControlRecipe: () => (/* binding */ accentStrokeControlRecipe),
/* harmony export */   accentStrokeControlRest: () => (/* binding */ accentStrokeControlRest),
/* harmony export */   baseHeightMultiplier: () => (/* binding */ baseHeightMultiplier),
/* harmony export */   baseHorizontalSpacingMultiplier: () => (/* binding */ baseHorizontalSpacingMultiplier),
/* harmony export */   baseLayerLuminance: () => (/* binding */ baseLayerLuminance),
/* harmony export */   bodyFont: () => (/* binding */ bodyFont),
/* harmony export */   controlCornerRadius: () => (/* binding */ controlCornerRadius),
/* harmony export */   cornerRadius: () => (/* binding */ cornerRadius),
/* harmony export */   density: () => (/* binding */ density),
/* harmony export */   designUnit: () => (/* binding */ designUnit),
/* harmony export */   direction: () => (/* binding */ direction),
/* harmony export */   disabledOpacity: () => (/* binding */ disabledOpacity),
/* harmony export */   elevatedCornerRadius: () => (/* binding */ elevatedCornerRadius),
/* harmony export */   fillColor: () => (/* binding */ fillColor),
/* harmony export */   focusOutlineWidth: () => (/* binding */ focusOutlineWidth),
/* harmony export */   focusStrokeInner: () => (/* binding */ focusStrokeInner),
/* harmony export */   focusStrokeInnerRecipe: () => (/* binding */ focusStrokeInnerRecipe),
/* harmony export */   focusStrokeOuter: () => (/* binding */ focusStrokeOuter),
/* harmony export */   focusStrokeOuterRecipe: () => (/* binding */ focusStrokeOuterRecipe),
/* harmony export */   focusStrokeWidth: () => (/* binding */ focusStrokeWidth),
/* harmony export */   fontWeight: () => (/* binding */ fontWeight),
/* harmony export */   foregroundOnAccentActive: () => (/* binding */ foregroundOnAccentActive),
/* harmony export */   foregroundOnAccentActiveLarge: () => (/* binding */ foregroundOnAccentActiveLarge),
/* harmony export */   foregroundOnAccentFocus: () => (/* binding */ foregroundOnAccentFocus),
/* harmony export */   foregroundOnAccentFocusLarge: () => (/* binding */ foregroundOnAccentFocusLarge),
/* harmony export */   foregroundOnAccentHover: () => (/* binding */ foregroundOnAccentHover),
/* harmony export */   foregroundOnAccentHoverLarge: () => (/* binding */ foregroundOnAccentHoverLarge),
/* harmony export */   foregroundOnAccentLargeRecipe: () => (/* binding */ foregroundOnAccentLargeRecipe),
/* harmony export */   foregroundOnAccentRecipe: () => (/* binding */ foregroundOnAccentRecipe),
/* harmony export */   foregroundOnAccentRest: () => (/* binding */ foregroundOnAccentRest),
/* harmony export */   foregroundOnAccentRestLarge: () => (/* binding */ foregroundOnAccentRestLarge),
/* harmony export */   layerCornerRadius: () => (/* binding */ layerCornerRadius),
/* harmony export */   neutralBaseColor: () => (/* binding */ neutralBaseColor),
/* harmony export */   neutralContrastFillActive: () => (/* binding */ neutralContrastFillActive),
/* harmony export */   neutralContrastFillActiveDelta: () => (/* binding */ neutralContrastFillActiveDelta),
/* harmony export */   neutralContrastFillFocus: () => (/* binding */ neutralContrastFillFocus),
/* harmony export */   neutralContrastFillFocusDelta: () => (/* binding */ neutralContrastFillFocusDelta),
/* harmony export */   neutralContrastFillHover: () => (/* binding */ neutralContrastFillHover),
/* harmony export */   neutralContrastFillHoverDelta: () => (/* binding */ neutralContrastFillHoverDelta),
/* harmony export */   neutralContrastFillRest: () => (/* binding */ neutralContrastFillRest),
/* harmony export */   neutralContrastFillRestDelta: () => (/* binding */ neutralContrastFillRestDelta),
/* harmony export */   neutralDivider: () => (/* binding */ neutralDivider),
/* harmony export */   neutralDividerRestDelta: () => (/* binding */ neutralDividerRestDelta),
/* harmony export */   neutralFillActive: () => (/* binding */ neutralFillActive),
/* harmony export */   neutralFillActiveDelta: () => (/* binding */ neutralFillActiveDelta),
/* harmony export */   neutralFillCard: () => (/* binding */ neutralFillCard),
/* harmony export */   neutralFillCardDelta: () => (/* binding */ neutralFillCardDelta),
/* harmony export */   neutralFillFocus: () => (/* binding */ neutralFillFocus),
/* harmony export */   neutralFillFocusDelta: () => (/* binding */ neutralFillFocusDelta),
/* harmony export */   neutralFillHover: () => (/* binding */ neutralFillHover),
/* harmony export */   neutralFillHoverDelta: () => (/* binding */ neutralFillHoverDelta),
/* harmony export */   neutralFillInputActive: () => (/* binding */ neutralFillInputActive),
/* harmony export */   neutralFillInputActiveDelta: () => (/* binding */ neutralFillInputActiveDelta),
/* harmony export */   neutralFillInputAltActive: () => (/* binding */ neutralFillInputAltActive),
/* harmony export */   neutralFillInputAltActiveDelta: () => (/* binding */ neutralFillInputAltActiveDelta),
/* harmony export */   neutralFillInputAltFocus: () => (/* binding */ neutralFillInputAltFocus),
/* harmony export */   neutralFillInputAltFocusDelta: () => (/* binding */ neutralFillInputAltFocusDelta),
/* harmony export */   neutralFillInputAltHover: () => (/* binding */ neutralFillInputAltHover),
/* harmony export */   neutralFillInputAltHoverDelta: () => (/* binding */ neutralFillInputAltHoverDelta),
/* harmony export */   neutralFillInputAltRecipe: () => (/* binding */ neutralFillInputAltRecipe),
/* harmony export */   neutralFillInputAltRest: () => (/* binding */ neutralFillInputAltRest),
/* harmony export */   neutralFillInputAltRestDelta: () => (/* binding */ neutralFillInputAltRestDelta),
/* harmony export */   neutralFillInputFocus: () => (/* binding */ neutralFillInputFocus),
/* harmony export */   neutralFillInputFocusDelta: () => (/* binding */ neutralFillInputFocusDelta),
/* harmony export */   neutralFillInputHover: () => (/* binding */ neutralFillInputHover),
/* harmony export */   neutralFillInputHoverDelta: () => (/* binding */ neutralFillInputHoverDelta),
/* harmony export */   neutralFillInputRecipe: () => (/* binding */ neutralFillInputRecipe),
/* harmony export */   neutralFillInputRest: () => (/* binding */ neutralFillInputRest),
/* harmony export */   neutralFillInputRestDelta: () => (/* binding */ neutralFillInputRestDelta),
/* harmony export */   neutralFillInverseActive: () => (/* binding */ neutralFillInverseActive),
/* harmony export */   neutralFillInverseActiveDelta: () => (/* binding */ neutralFillInverseActiveDelta),
/* harmony export */   neutralFillInverseFocus: () => (/* binding */ neutralFillInverseFocus),
/* harmony export */   neutralFillInverseFocusDelta: () => (/* binding */ neutralFillInverseFocusDelta),
/* harmony export */   neutralFillInverseHover: () => (/* binding */ neutralFillInverseHover),
/* harmony export */   neutralFillInverseHoverDelta: () => (/* binding */ neutralFillInverseHoverDelta),
/* harmony export */   neutralFillInverseRecipe: () => (/* binding */ neutralFillInverseRecipe),
/* harmony export */   neutralFillInverseRest: () => (/* binding */ neutralFillInverseRest),
/* harmony export */   neutralFillInverseRestDelta: () => (/* binding */ neutralFillInverseRestDelta),
/* harmony export */   neutralFillLayerActive: () => (/* binding */ neutralFillLayerActive),
/* harmony export */   neutralFillLayerActiveDelta: () => (/* binding */ neutralFillLayerActiveDelta),
/* harmony export */   neutralFillLayerAltRecipe: () => (/* binding */ neutralFillLayerAltRecipe),
/* harmony export */   neutralFillLayerAltRest: () => (/* binding */ neutralFillLayerAltRest),
/* harmony export */   neutralFillLayerAltRestDelta: () => (/* binding */ neutralFillLayerAltRestDelta),
/* harmony export */   neutralFillLayerHover: () => (/* binding */ neutralFillLayerHover),
/* harmony export */   neutralFillLayerHoverDelta: () => (/* binding */ neutralFillLayerHoverDelta),
/* harmony export */   neutralFillLayerRecipe: () => (/* binding */ neutralFillLayerRecipe),
/* harmony export */   neutralFillLayerRest: () => (/* binding */ neutralFillLayerRest),
/* harmony export */   neutralFillLayerRestDelta: () => (/* binding */ neutralFillLayerRestDelta),
/* harmony export */   neutralFillRecipe: () => (/* binding */ neutralFillRecipe),
/* harmony export */   neutralFillRest: () => (/* binding */ neutralFillRest),
/* harmony export */   neutralFillRestDelta: () => (/* binding */ neutralFillRestDelta),
/* harmony export */   neutralFillSecondaryActive: () => (/* binding */ neutralFillSecondaryActive),
/* harmony export */   neutralFillSecondaryActiveDelta: () => (/* binding */ neutralFillSecondaryActiveDelta),
/* harmony export */   neutralFillSecondaryFocus: () => (/* binding */ neutralFillSecondaryFocus),
/* harmony export */   neutralFillSecondaryFocusDelta: () => (/* binding */ neutralFillSecondaryFocusDelta),
/* harmony export */   neutralFillSecondaryHover: () => (/* binding */ neutralFillSecondaryHover),
/* harmony export */   neutralFillSecondaryHoverDelta: () => (/* binding */ neutralFillSecondaryHoverDelta),
/* harmony export */   neutralFillSecondaryRecipe: () => (/* binding */ neutralFillSecondaryRecipe),
/* harmony export */   neutralFillSecondaryRest: () => (/* binding */ neutralFillSecondaryRest),
/* harmony export */   neutralFillSecondaryRestDelta: () => (/* binding */ neutralFillSecondaryRestDelta),
/* harmony export */   neutralFillStealthActive: () => (/* binding */ neutralFillStealthActive),
/* harmony export */   neutralFillStealthActiveDelta: () => (/* binding */ neutralFillStealthActiveDelta),
/* harmony export */   neutralFillStealthFocus: () => (/* binding */ neutralFillStealthFocus),
/* harmony export */   neutralFillStealthFocusDelta: () => (/* binding */ neutralFillStealthFocusDelta),
/* harmony export */   neutralFillStealthHover: () => (/* binding */ neutralFillStealthHover),
/* harmony export */   neutralFillStealthHoverDelta: () => (/* binding */ neutralFillStealthHoverDelta),
/* harmony export */   neutralFillStealthRecipe: () => (/* binding */ neutralFillStealthRecipe),
/* harmony export */   neutralFillStealthRest: () => (/* binding */ neutralFillStealthRest),
/* harmony export */   neutralFillStealthRestDelta: () => (/* binding */ neutralFillStealthRestDelta),
/* harmony export */   neutralFillStrongActive: () => (/* binding */ neutralFillStrongActive),
/* harmony export */   neutralFillStrongActiveDelta: () => (/* binding */ neutralFillStrongActiveDelta),
/* harmony export */   neutralFillStrongFocus: () => (/* binding */ neutralFillStrongFocus),
/* harmony export */   neutralFillStrongFocusDelta: () => (/* binding */ neutralFillStrongFocusDelta),
/* harmony export */   neutralFillStrongHover: () => (/* binding */ neutralFillStrongHover),
/* harmony export */   neutralFillStrongHoverDelta: () => (/* binding */ neutralFillStrongHoverDelta),
/* harmony export */   neutralFillStrongRecipe: () => (/* binding */ neutralFillStrongRecipe),
/* harmony export */   neutralFillStrongRest: () => (/* binding */ neutralFillStrongRest),
/* harmony export */   neutralFillStrongRestDelta: () => (/* binding */ neutralFillStrongRestDelta),
/* harmony export */   neutralFillToggleActive: () => (/* binding */ neutralFillToggleActive),
/* harmony export */   neutralFillToggleActiveDelta: () => (/* binding */ neutralFillToggleActiveDelta),
/* harmony export */   neutralFillToggleFocus: () => (/* binding */ neutralFillToggleFocus),
/* harmony export */   neutralFillToggleFocusDelta: () => (/* binding */ neutralFillToggleFocusDelta),
/* harmony export */   neutralFillToggleHover: () => (/* binding */ neutralFillToggleHover),
/* harmony export */   neutralFillToggleHoverDelta: () => (/* binding */ neutralFillToggleHoverDelta),
/* harmony export */   neutralFillToggleRest: () => (/* binding */ neutralFillToggleRest),
/* harmony export */   neutralFillToggleRestDelta: () => (/* binding */ neutralFillToggleRestDelta),
/* harmony export */   neutralFocus: () => (/* binding */ neutralFocus),
/* harmony export */   neutralFocusInnerAccent: () => (/* binding */ neutralFocusInnerAccent),
/* harmony export */   neutralForegroundActive: () => (/* binding */ neutralForegroundActive),
/* harmony export */   neutralForegroundFocus: () => (/* binding */ neutralForegroundFocus),
/* harmony export */   neutralForegroundHint: () => (/* binding */ neutralForegroundHint),
/* harmony export */   neutralForegroundHintRecipe: () => (/* binding */ neutralForegroundHintRecipe),
/* harmony export */   neutralForegroundHover: () => (/* binding */ neutralForegroundHover),
/* harmony export */   neutralForegroundRecipe: () => (/* binding */ neutralForegroundRecipe),
/* harmony export */   neutralForegroundRest: () => (/* binding */ neutralForegroundRest),
/* harmony export */   neutralLayer1: () => (/* binding */ neutralLayer1),
/* harmony export */   neutralLayer1Recipe: () => (/* binding */ neutralLayer1Recipe),
/* harmony export */   neutralLayer2: () => (/* binding */ neutralLayer2),
/* harmony export */   neutralLayer2Recipe: () => (/* binding */ neutralLayer2Recipe),
/* harmony export */   neutralLayer3: () => (/* binding */ neutralLayer3),
/* harmony export */   neutralLayer3Recipe: () => (/* binding */ neutralLayer3Recipe),
/* harmony export */   neutralLayer4: () => (/* binding */ neutralLayer4),
/* harmony export */   neutralLayer4Recipe: () => (/* binding */ neutralLayer4Recipe),
/* harmony export */   neutralLayerCardContainer: () => (/* binding */ neutralLayerCardContainer),
/* harmony export */   neutralLayerCardContainerRecipe: () => (/* binding */ neutralLayerCardContainerRecipe),
/* harmony export */   neutralLayerFloating: () => (/* binding */ neutralLayerFloating),
/* harmony export */   neutralLayerFloatingRecipe: () => (/* binding */ neutralLayerFloatingRecipe),
/* harmony export */   neutralLayerL1: () => (/* binding */ neutralLayerL1),
/* harmony export */   neutralLayerL2: () => (/* binding */ neutralLayerL2),
/* harmony export */   neutralLayerL3: () => (/* binding */ neutralLayerL3),
/* harmony export */   neutralLayerL4: () => (/* binding */ neutralLayerL4),
/* harmony export */   neutralOutlineActive: () => (/* binding */ neutralOutlineActive),
/* harmony export */   neutralOutlineFocus: () => (/* binding */ neutralOutlineFocus),
/* harmony export */   neutralOutlineHover: () => (/* binding */ neutralOutlineHover),
/* harmony export */   neutralOutlineRest: () => (/* binding */ neutralOutlineRest),
/* harmony export */   neutralPalette: () => (/* binding */ neutralPalette),
/* harmony export */   neutralStrokeActive: () => (/* binding */ neutralStrokeActive),
/* harmony export */   neutralStrokeActiveDelta: () => (/* binding */ neutralStrokeActiveDelta),
/* harmony export */   neutralStrokeControlActive: () => (/* binding */ neutralStrokeControlActive),
/* harmony export */   neutralStrokeControlActiveDelta: () => (/* binding */ neutralStrokeControlActiveDelta),
/* harmony export */   neutralStrokeControlFocus: () => (/* binding */ neutralStrokeControlFocus),
/* harmony export */   neutralStrokeControlFocusDelta: () => (/* binding */ neutralStrokeControlFocusDelta),
/* harmony export */   neutralStrokeControlHover: () => (/* binding */ neutralStrokeControlHover),
/* harmony export */   neutralStrokeControlHoverDelta: () => (/* binding */ neutralStrokeControlHoverDelta),
/* harmony export */   neutralStrokeControlRecipe: () => (/* binding */ neutralStrokeControlRecipe),
/* harmony export */   neutralStrokeControlRest: () => (/* binding */ neutralStrokeControlRest),
/* harmony export */   neutralStrokeControlRestDelta: () => (/* binding */ neutralStrokeControlRestDelta),
/* harmony export */   neutralStrokeDividerRecipe: () => (/* binding */ neutralStrokeDividerRecipe),
/* harmony export */   neutralStrokeDividerRest: () => (/* binding */ neutralStrokeDividerRest),
/* harmony export */   neutralStrokeDividerRestDelta: () => (/* binding */ neutralStrokeDividerRestDelta),
/* harmony export */   neutralStrokeFocus: () => (/* binding */ neutralStrokeFocus),
/* harmony export */   neutralStrokeFocusDelta: () => (/* binding */ neutralStrokeFocusDelta),
/* harmony export */   neutralStrokeHover: () => (/* binding */ neutralStrokeHover),
/* harmony export */   neutralStrokeHoverDelta: () => (/* binding */ neutralStrokeHoverDelta),
/* harmony export */   neutralStrokeInputActive: () => (/* binding */ neutralStrokeInputActive),
/* harmony export */   neutralStrokeInputFocus: () => (/* binding */ neutralStrokeInputFocus),
/* harmony export */   neutralStrokeInputHover: () => (/* binding */ neutralStrokeInputHover),
/* harmony export */   neutralStrokeInputRecipe: () => (/* binding */ neutralStrokeInputRecipe),
/* harmony export */   neutralStrokeInputRest: () => (/* binding */ neutralStrokeInputRest),
/* harmony export */   neutralStrokeLayerActive: () => (/* binding */ neutralStrokeLayerActive),
/* harmony export */   neutralStrokeLayerActiveDelta: () => (/* binding */ neutralStrokeLayerActiveDelta),
/* harmony export */   neutralStrokeLayerHover: () => (/* binding */ neutralStrokeLayerHover),
/* harmony export */   neutralStrokeLayerHoverDelta: () => (/* binding */ neutralStrokeLayerHoverDelta),
/* harmony export */   neutralStrokeLayerRecipe: () => (/* binding */ neutralStrokeLayerRecipe),
/* harmony export */   neutralStrokeLayerRest: () => (/* binding */ neutralStrokeLayerRest),
/* harmony export */   neutralStrokeLayerRestDelta: () => (/* binding */ neutralStrokeLayerRestDelta),
/* harmony export */   neutralStrokeRecipe: () => (/* binding */ neutralStrokeRecipe),
/* harmony export */   neutralStrokeRest: () => (/* binding */ neutralStrokeRest),
/* harmony export */   neutralStrokeRestDelta: () => (/* binding */ neutralStrokeRestDelta),
/* harmony export */   neutralStrokeStrongActive: () => (/* binding */ neutralStrokeStrongActive),
/* harmony export */   neutralStrokeStrongActiveDelta: () => (/* binding */ neutralStrokeStrongActiveDelta),
/* harmony export */   neutralStrokeStrongFocus: () => (/* binding */ neutralStrokeStrongFocus),
/* harmony export */   neutralStrokeStrongFocusDelta: () => (/* binding */ neutralStrokeStrongFocusDelta),
/* harmony export */   neutralStrokeStrongHover: () => (/* binding */ neutralStrokeStrongHover),
/* harmony export */   neutralStrokeStrongHoverDelta: () => (/* binding */ neutralStrokeStrongHoverDelta),
/* harmony export */   neutralStrokeStrongRecipe: () => (/* binding */ neutralStrokeStrongRecipe),
/* harmony export */   neutralStrokeStrongRest: () => (/* binding */ neutralStrokeStrongRest),
/* harmony export */   outlineWidth: () => (/* binding */ outlineWidth),
/* harmony export */   strokeWidth: () => (/* binding */ strokeWidth),
/* harmony export */   typeRampBaseFontSize: () => (/* binding */ typeRampBaseFontSize),
/* harmony export */   typeRampBaseFontVariations: () => (/* binding */ typeRampBaseFontVariations),
/* harmony export */   typeRampBaseLineHeight: () => (/* binding */ typeRampBaseLineHeight),
/* harmony export */   typeRampMinus1FontSize: () => (/* binding */ typeRampMinus1FontSize),
/* harmony export */   typeRampMinus1FontVariations: () => (/* binding */ typeRampMinus1FontVariations),
/* harmony export */   typeRampMinus1LineHeight: () => (/* binding */ typeRampMinus1LineHeight),
/* harmony export */   typeRampMinus2FontSize: () => (/* binding */ typeRampMinus2FontSize),
/* harmony export */   typeRampMinus2FontVariations: () => (/* binding */ typeRampMinus2FontVariations),
/* harmony export */   typeRampMinus2LineHeight: () => (/* binding */ typeRampMinus2LineHeight),
/* harmony export */   typeRampPlus1FontSize: () => (/* binding */ typeRampPlus1FontSize),
/* harmony export */   typeRampPlus1FontVariations: () => (/* binding */ typeRampPlus1FontVariations),
/* harmony export */   typeRampPlus1LineHeight: () => (/* binding */ typeRampPlus1LineHeight),
/* harmony export */   typeRampPlus2FontSize: () => (/* binding */ typeRampPlus2FontSize),
/* harmony export */   typeRampPlus2FontVariations: () => (/* binding */ typeRampPlus2FontVariations),
/* harmony export */   typeRampPlus2LineHeight: () => (/* binding */ typeRampPlus2LineHeight),
/* harmony export */   typeRampPlus3FontSize: () => (/* binding */ typeRampPlus3FontSize),
/* harmony export */   typeRampPlus3FontVariations: () => (/* binding */ typeRampPlus3FontVariations),
/* harmony export */   typeRampPlus3LineHeight: () => (/* binding */ typeRampPlus3LineHeight),
/* harmony export */   typeRampPlus4FontSize: () => (/* binding */ typeRampPlus4FontSize),
/* harmony export */   typeRampPlus4FontVariations: () => (/* binding */ typeRampPlus4FontVariations),
/* harmony export */   typeRampPlus4LineHeight: () => (/* binding */ typeRampPlus4LineHeight),
/* harmony export */   typeRampPlus5FontSize: () => (/* binding */ typeRampPlus5FontSize),
/* harmony export */   typeRampPlus5FontVariations: () => (/* binding */ typeRampPlus5FontVariations),
/* harmony export */   typeRampPlus5LineHeight: () => (/* binding */ typeRampPlus5LineHeight),
/* harmony export */   typeRampPlus6FontSize: () => (/* binding */ typeRampPlus6FontSize),
/* harmony export */   typeRampPlus6FontVariations: () => (/* binding */ typeRampPlus6FontVariations),
/* harmony export */   typeRampPlus6LineHeight: () => (/* binding */ typeRampPlus6LineHeight)
/* harmony export */ });
/* harmony import */ var _microsoft_fast_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/fast-foundation */ "./node_modules/@microsoft/fast-foundation/dist/esm/design-token/design-token.js");
/* harmony import */ var _microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/fast-web-utilities */ "./node_modules/@microsoft/fast-web-utilities/dist/localization.js");
/* harmony import */ var _color_palette__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./color/palette */ "./node_modules/@fluentui/web-components/dist/esm/color/palette.js");
/* harmony import */ var _color_recipes_foreground_on_accent__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./color/recipes/foreground-on-accent */ "./node_modules/@fluentui/web-components/dist/esm/color/recipes/foreground-on-accent.js");
/* harmony import */ var _color_recipes_gradient_shadow_stroke__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./color/recipes/gradient-shadow-stroke */ "./node_modules/@fluentui/web-components/dist/esm/color/recipes/gradient-shadow-stroke.js");
/* harmony import */ var _color_recipes_underline_stroke__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./color/recipes/underline-stroke */ "./node_modules/@fluentui/web-components/dist/esm/color/recipes/underline-stroke.js");
/* harmony import */ var _color_recipes_contrast_swatch__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./color/recipes/contrast-swatch */ "./node_modules/@fluentui/web-components/dist/esm/color/recipes/contrast-swatch.js");
/* harmony import */ var _color_recipes_contrast_and_delta_swatch_set__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./color/recipes/contrast-and-delta-swatch-set */ "./node_modules/@fluentui/web-components/dist/esm/color/recipes/contrast-and-delta-swatch-set.js");
/* harmony import */ var _color_recipes_delta_swatch__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./color/recipes/delta-swatch */ "./node_modules/@fluentui/web-components/dist/esm/color/recipes/delta-swatch.js");
/* harmony import */ var _color_recipes_delta_swatch_set__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./color/recipes/delta-swatch-set */ "./node_modules/@fluentui/web-components/dist/esm/color/recipes/delta-swatch-set.js");
/* harmony import */ var _color_recipes_focus_stroke__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./color/recipes/focus-stroke */ "./node_modules/@fluentui/web-components/dist/esm/color/recipes/focus-stroke.js");
/* harmony import */ var _color_recipes_neutral_layer_floating__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./color/recipes/neutral-layer-floating */ "./node_modules/@fluentui/web-components/dist/esm/color/recipes/neutral-layer-floating.js");
/* harmony import */ var _color_recipes_neutral_layer_1__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./color/recipes/neutral-layer-1 */ "./node_modules/@fluentui/web-components/dist/esm/color/recipes/neutral-layer-1.js");
/* harmony import */ var _color_recipes_neutral_layer_2__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./color/recipes/neutral-layer-2 */ "./node_modules/@fluentui/web-components/dist/esm/color/recipes/neutral-layer-2.js");
/* harmony import */ var _color_recipes_neutral_layer_3__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./color/recipes/neutral-layer-3 */ "./node_modules/@fluentui/web-components/dist/esm/color/recipes/neutral-layer-3.js");
/* harmony import */ var _color_recipes_neutral_layer_4__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./color/recipes/neutral-layer-4 */ "./node_modules/@fluentui/web-components/dist/esm/color/recipes/neutral-layer-4.js");
/* harmony import */ var _color_utilities_color_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./color/utilities/color-constants */ "./node_modules/@fluentui/web-components/dist/esm/color/utilities/color-constants.js");
/* harmony import */ var _color_utilities_base_layer_luminance__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./color/utilities/base-layer-luminance */ "./node_modules/@fluentui/web-components/dist/esm/color/utilities/base-layer-luminance.js");
/* harmony import */ var _color_utilities_direction_by_is_dark__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./color/utilities/direction-by-is-dark */ "./node_modules/@fluentui/web-components/dist/esm/color/utilities/direction-by-is-dark.js");
/* harmony import */ var _utilities_type_ramp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utilities/type-ramp */ "./node_modules/@fluentui/web-components/dist/esm/utilities/type-ramp.js");




















const { create } = _microsoft_fast_foundation__WEBPACK_IMPORTED_MODULE_0__.DesignToken;
function createNonCss(name) {
    return _microsoft_fast_foundation__WEBPACK_IMPORTED_MODULE_0__.DesignToken.create({ name, cssCustomPropertyName: null });
}
// General tokens
/** @public */
const direction = create('direction').withDefault(_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_1__.Direction.ltr);
/** @public */
const disabledOpacity = create('disabled-opacity').withDefault(0.3);
// Density tokens
/** @public */
const baseHeightMultiplier = create('base-height-multiplier').withDefault(8);
/** @public */
const baseHorizontalSpacingMultiplier = create('base-horizontal-spacing-multiplier').withDefault(3);
/** @public */
const density = create('density').withDefault(0);
/** @public */
const designUnit = create('design-unit').withDefault(4);
// Appearance tokens
/** @public */
const controlCornerRadius = create('control-corner-radius').withDefault(4);
/** @public */
const layerCornerRadius = create('layer-corner-radius').withDefault(8);
/** @public */
const strokeWidth = create('stroke-width').withDefault(1);
/** @public */
const focusStrokeWidth = create('focus-stroke-width').withDefault(2);
// Typography values
/** @public */
const bodyFont = create('body-font').withDefault('"Segoe UI Variable", "Segoe UI", sans-serif');
/** @public */
const fontWeight = create('font-weight').withDefault(_utilities_type_ramp__WEBPACK_IMPORTED_MODULE_2__.StandardFontWeight.Normal);
function fontVariations(sizeToken) {
    return (element) => {
        const size = sizeToken.getValueFor(element);
        const weight = fontWeight.getValueFor(element);
        if (size.endsWith('px')) {
            const px = Number.parseFloat(size.replace('px', ''));
            if (px <= 12) {
                return `"wght" ${weight}, "opsz" 8`;
            }
            else if (px > 24) {
                return `"wght" ${weight}, "opsz" 36`;
            }
        }
        return `"wght" ${weight}, "opsz" 10.5`;
    };
}
/** @public */
const typeRampBaseFontSize = create('type-ramp-base-font-size').withDefault('14px');
/** @public */
const typeRampBaseLineHeight = create('type-ramp-base-line-height').withDefault('20px');
/** @public */
const typeRampBaseFontVariations = create('type-ramp-base-font-variations').withDefault(fontVariations(typeRampBaseFontSize));
/** @public */
const typeRampMinus1FontSize = create('type-ramp-minus-1-font-size').withDefault('12px');
/** @public */
const typeRampMinus1LineHeight = create('type-ramp-minus-1-line-height').withDefault('16px');
/** @public */
const typeRampMinus1FontVariations = create('type-ramp-minus-1-font-variations').withDefault(fontVariations(typeRampMinus1FontSize));
/** @public */
const typeRampMinus2FontSize = create('type-ramp-minus-2-font-size').withDefault('10px');
/** @public */
const typeRampMinus2LineHeight = create('type-ramp-minus-2-line-height').withDefault('14px');
/** @public */
const typeRampMinus2FontVariations = create('type-ramp-minus-2-font-variations').withDefault(fontVariations(typeRampMinus2FontSize));
/** @public */
const typeRampPlus1FontSize = create('type-ramp-plus-1-font-size').withDefault('16px');
/** @public */
const typeRampPlus1LineHeight = create('type-ramp-plus-1-line-height').withDefault('22px');
/** @public */
const typeRampPlus1FontVariations = create('type-ramp-plus-1-font-variations').withDefault(fontVariations(typeRampPlus1FontSize));
/** @public */
const typeRampPlus2FontSize = create('type-ramp-plus-2-font-size').withDefault('20px');
/** @public */
const typeRampPlus2LineHeight = create('type-ramp-plus-2-line-height').withDefault('26px');
/** @public */
const typeRampPlus2FontVariations = create('type-ramp-plus-2-font-variations').withDefault(fontVariations(typeRampPlus2FontSize));
/** @public */
const typeRampPlus3FontSize = create('type-ramp-plus-3-font-size').withDefault('24px');
/** @public */
const typeRampPlus3LineHeight = create('type-ramp-plus-3-line-height').withDefault('32px');
/** @public */
const typeRampPlus3FontVariations = create('type-ramp-plus-3-font-variations').withDefault(fontVariations(typeRampPlus3FontSize));
/** @public */
const typeRampPlus4FontSize = create('type-ramp-plus-4-font-size').withDefault('28px');
/** @public */
const typeRampPlus4LineHeight = create('type-ramp-plus-4-line-height').withDefault('36px');
/** @public */
const typeRampPlus4FontVariations = create('type-ramp-plus-4-font-variations').withDefault(fontVariations(typeRampPlus4FontSize));
/** @public */
const typeRampPlus5FontSize = create('type-ramp-plus-5-font-size').withDefault('32px');
/** @public */
const typeRampPlus5LineHeight = create('type-ramp-plus-5-line-height').withDefault('40px');
/** @public */
const typeRampPlus5FontVariations = create('type-ramp-plus-5-font-variations').withDefault(fontVariations(typeRampPlus5FontSize));
/** @public */
const typeRampPlus6FontSize = create('type-ramp-plus-6-font-size').withDefault('40px');
/** @public */
const typeRampPlus6LineHeight = create('type-ramp-plus-6-line-height').withDefault('52px');
/** @public */
const typeRampPlus6FontVariations = create('type-ramp-plus-6-font-variations').withDefault(fontVariations(typeRampPlus6FontSize));
// Color recipe values
/** @public */
const baseLayerLuminance = create('base-layer-luminance').withDefault(_color_utilities_base_layer_luminance__WEBPACK_IMPORTED_MODULE_3__.StandardLuminance.LightMode);
/** @public */
const accentFillRestDelta = createNonCss('accent-fill-rest-delta').withDefault(0);
/** @public */
const accentFillHoverDelta = createNonCss('accent-fill-hover-delta').withDefault(-2);
/** @public */
const accentFillActiveDelta = createNonCss('accent-fill-active-delta').withDefault(-5);
/** @public */
const accentFillFocusDelta = createNonCss('accent-fill-focus-delta').withDefault(0);
/** @public */
const accentForegroundRestDelta = createNonCss('accent-foreground-rest-delta').withDefault(0);
/** @public */
const accentForegroundHoverDelta = createNonCss('accent-foreground-hover-delta').withDefault(3);
/** @public */
const accentForegroundActiveDelta = createNonCss('accent-foreground-active-delta').withDefault(-8);
/** @public */
const accentForegroundFocusDelta = createNonCss('accent-foreground-focus-delta').withDefault(0);
/** @public */
const neutralFillRestDelta = createNonCss('neutral-fill-rest-delta').withDefault(-1);
/** @public */
const neutralFillHoverDelta = createNonCss('neutral-fill-hover-delta').withDefault(1);
/** @public */
const neutralFillActiveDelta = createNonCss('neutral-fill-active-delta').withDefault(0);
/** @public */
const neutralFillFocusDelta = createNonCss('neutral-fill-focus-delta').withDefault(0);
/** @public */
const neutralFillInputRestDelta = createNonCss('neutral-fill-input-rest-delta').withDefault(-1);
/** @public */
const neutralFillInputHoverDelta = createNonCss('neutral-fill-input-hover-delta').withDefault(1);
/** @public */
const neutralFillInputActiveDelta = createNonCss('neutral-fill-input-active-delta').withDefault(0);
/** @public */
const neutralFillInputFocusDelta = createNonCss('neutral-fill-input-focus-delta').withDefault(-2);
/** @public */
const neutralFillInputAltRestDelta = createNonCss('neutral-fill-input-alt-rest-delta').withDefault(2);
/** @public */
const neutralFillInputAltHoverDelta = createNonCss('neutral-fill-input-alt-hover-delta').withDefault(4);
/** @public */
const neutralFillInputAltActiveDelta = createNonCss('neutral-fill-input-alt-active-delta').withDefault(6);
/** @public */
const neutralFillInputAltFocusDelta = createNonCss('neutral-fill-input-alt-focus-delta').withDefault(2);
/** @public */
const neutralFillLayerRestDelta = createNonCss('neutral-fill-layer-rest-delta').withDefault(-2);
/** @public */
const neutralFillLayerHoverDelta = createNonCss('neutral-fill-layer-hover-delta').withDefault(-3);
/** @public */
const neutralFillLayerActiveDelta = createNonCss('neutral-fill-layer-active-delta').withDefault(-3);
/** @public */
const neutralFillLayerAltRestDelta = createNonCss('neutral-fill-layer-alt-rest-delta').withDefault(-1);
/** @public */
const neutralFillSecondaryRestDelta = createNonCss('neutral-fill-secondary-rest-delta').withDefault(3);
/** @public */
const neutralFillSecondaryHoverDelta = createNonCss('neutral-fill-secondary-hover-delta').withDefault(2);
/** @public */
const neutralFillSecondaryActiveDelta = createNonCss('neutral-fill-secondary-active-delta').withDefault(1);
/** @public */
const neutralFillSecondaryFocusDelta = createNonCss('neutral-fill-secondary-focus-delta').withDefault(3);
/** @public */
const neutralFillStealthRestDelta = createNonCss('neutral-fill-stealth-rest-delta').withDefault(0);
/** @public */
const neutralFillStealthHoverDelta = createNonCss('neutral-fill-stealth-hover-delta').withDefault(3);
/** @public */
const neutralFillStealthActiveDelta = createNonCss('neutral-fill-stealth-active-delta').withDefault(2);
/** @public */
const neutralFillStealthFocusDelta = createNonCss('neutral-fill-stealth-focus-delta').withDefault(0);
/** @public */
const neutralFillStrongRestDelta = createNonCss('neutral-fill-strong-rest-delta').withDefault(0);
/** @public */
const neutralFillStrongHoverDelta = createNonCss('neutral-fill-strong-hover-delta').withDefault(8);
/** @public */
const neutralFillStrongActiveDelta = createNonCss('neutral-fill-strong-active-delta').withDefault(-5);
/** @public */
const neutralFillStrongFocusDelta = createNonCss('neutral-fill-strong-focus-delta').withDefault(0);
/** @public */
const neutralStrokeRestDelta = createNonCss('neutral-stroke-rest-delta').withDefault(8);
/** @public */
const neutralStrokeHoverDelta = createNonCss('neutral-stroke-hover-delta').withDefault(12);
/** @public */
const neutralStrokeActiveDelta = createNonCss('neutral-stroke-active-delta').withDefault(6);
/** @public */
const neutralStrokeFocusDelta = createNonCss('neutral-stroke-focus-delta').withDefault(8);
/** @public */
const neutralStrokeControlRestDelta = createNonCss('neutral-stroke-control-rest-delta').withDefault(3);
/** @public */
const neutralStrokeControlHoverDelta = createNonCss('neutral-stroke-control-hover-delta').withDefault(5);
/** @public */
const neutralStrokeControlActiveDelta = createNonCss('neutral-stroke-control-active-delta').withDefault(5);
/** @public */
const neutralStrokeControlFocusDelta = createNonCss('neutral-stroke-control-focus-delta').withDefault(5);
/** @public */
const neutralStrokeDividerRestDelta = createNonCss('neutral-stroke-divider-rest-delta').withDefault(4);
/** @public */
const neutralStrokeLayerRestDelta = createNonCss('neutral-stroke-layer-rest-delta').withDefault(3);
/** @public */
const neutralStrokeLayerHoverDelta = createNonCss('neutral-stroke-layer-hover-delta').withDefault(3);
/** @public */
const neutralStrokeLayerActiveDelta = createNonCss('neutral-stroke-layer-active-delta').withDefault(3);
/** @public */
const neutralStrokeStrongHoverDelta = createNonCss('neutral-stroke-strong-hover-delta').withDefault(0);
/** @public */
const neutralStrokeStrongActiveDelta = createNonCss('neutral-stroke-strong-active-delta').withDefault(0);
/** @public */
const neutralStrokeStrongFocusDelta = createNonCss('neutral-stroke-strong-focus-delta').withDefault(0);
// Color recipes
/** @public */
const neutralBaseColor = create('neutral-base-color').withDefault(_color_utilities_color_constants__WEBPACK_IMPORTED_MODULE_4__.middleGrey);
/** @public */
const neutralPalette = createNonCss('neutral-palette').withDefault((element) => _color_palette__WEBPACK_IMPORTED_MODULE_5__.PaletteRGB.from(neutralBaseColor.getValueFor(element)));
/** @public */
const accentBaseColor = create('accent-base-color').withDefault(_color_utilities_color_constants__WEBPACK_IMPORTED_MODULE_4__.accentBase);
/** @public */
const accentPalette = createNonCss('accent-palette').withDefault((element) => _color_palette__WEBPACK_IMPORTED_MODULE_5__.PaletteRGB.from(accentBaseColor.getValueFor(element)));
// Neutral Layer Card Container
/** @public */
const neutralLayerCardContainerRecipe = createNonCss('neutral-layer-card-container-recipe').withDefault({
    evaluate: (element) => (0,_color_recipes_neutral_layer_2__WEBPACK_IMPORTED_MODULE_6__.neutralLayer2)(neutralPalette.getValueFor(element), baseLayerLuminance.getValueFor(element), neutralFillLayerRestDelta.getValueFor(element)),
});
/** @public */
const neutralLayerCardContainer = create('neutral-layer-card-container').withDefault((element) => neutralLayerCardContainerRecipe.getValueFor(element).evaluate(element));
// Neutral Layer Floating
/** @public */
const neutralLayerFloatingRecipe = createNonCss('neutral-layer-floating-recipe').withDefault({
    evaluate: (element) => (0,_color_recipes_neutral_layer_floating__WEBPACK_IMPORTED_MODULE_7__.neutralLayerFloating)(neutralPalette.getValueFor(element), baseLayerLuminance.getValueFor(element), neutralFillLayerRestDelta.getValueFor(element)),
});
/** @public */
const neutralLayerFloating = create('neutral-layer-floating').withDefault((element) => neutralLayerFloatingRecipe.getValueFor(element).evaluate(element));
// Neutral Layer 1
/** @public */
const neutralLayer1Recipe = createNonCss('neutral-layer-1-recipe').withDefault({
    evaluate: (element) => (0,_color_recipes_neutral_layer_1__WEBPACK_IMPORTED_MODULE_8__.neutralLayer1)(neutralPalette.getValueFor(element), baseLayerLuminance.getValueFor(element)),
});
/** @public */
const neutralLayer1 = create('neutral-layer-1').withDefault((element) => neutralLayer1Recipe.getValueFor(element).evaluate(element));
// Neutral Layer 2
/** @public */
const neutralLayer2Recipe = createNonCss('neutral-layer-2-recipe').withDefault({
    evaluate: (element) => (0,_color_recipes_neutral_layer_2__WEBPACK_IMPORTED_MODULE_6__.neutralLayer2)(neutralPalette.getValueFor(element), baseLayerLuminance.getValueFor(element), neutralFillLayerRestDelta.getValueFor(element)),
});
/** @public */
const neutralLayer2 = create('neutral-layer-2').withDefault((element) => neutralLayer2Recipe.getValueFor(element).evaluate(element));
// Neutral Layer 3
/** @public */
const neutralLayer3Recipe = createNonCss('neutral-layer-3-recipe').withDefault({
    evaluate: (element) => (0,_color_recipes_neutral_layer_3__WEBPACK_IMPORTED_MODULE_9__.neutralLayer3)(neutralPalette.getValueFor(element), baseLayerLuminance.getValueFor(element), neutralFillLayerRestDelta.getValueFor(element)),
});
/** @public */
const neutralLayer3 = create('neutral-layer-3').withDefault((element) => neutralLayer3Recipe.getValueFor(element).evaluate(element));
// Neutral Layer 4
/** @public */
const neutralLayer4Recipe = createNonCss('neutral-layer-4-recipe').withDefault({
    evaluate: (element) => (0,_color_recipes_neutral_layer_4__WEBPACK_IMPORTED_MODULE_10__.neutralLayer4)(neutralPalette.getValueFor(element), baseLayerLuminance.getValueFor(element), neutralFillLayerRestDelta.getValueFor(element)),
});
/** @public */
const neutralLayer4 = create('neutral-layer-4').withDefault((element) => neutralLayer4Recipe.getValueFor(element).evaluate(element));
/** @public */
const fillColor = create('fill-color').withDefault(element => neutralLayer1.getValueFor(element));
var ContrastTarget;
(function (ContrastTarget) {
    ContrastTarget[ContrastTarget["normal"] = 4.5] = "normal";
    ContrastTarget[ContrastTarget["large"] = 3] = "large";
})(ContrastTarget || (ContrastTarget = {}));
// Accent Fill
/** @public */
const accentFillRecipe = createNonCss('accent-fill-recipe').withDefault({
    evaluate: (element, reference) => (0,_color_recipes_contrast_and_delta_swatch_set__WEBPACK_IMPORTED_MODULE_11__.contrastAndDeltaSwatchSetByLuminance)(accentPalette.getValueFor(element), reference || fillColor.getValueFor(element), 5, accentFillRestDelta.getValueFor(element), accentFillHoverDelta.getValueFor(element), accentFillActiveDelta.getValueFor(element), accentFillFocusDelta.getValueFor(element), undefined, 8, accentFillRestDelta.getValueFor(element), accentFillHoverDelta.getValueFor(element), accentFillActiveDelta.getValueFor(element), accentFillFocusDelta.getValueFor(element), undefined),
});
/** @public */
const accentFillRest = create('accent-fill-rest').withDefault((element) => {
    return accentFillRecipe.getValueFor(element).evaluate(element).rest;
});
/** @public */
const accentFillHover = create('accent-fill-hover').withDefault((element) => {
    return accentFillRecipe.getValueFor(element).evaluate(element).hover;
});
/** @public */
const accentFillActive = create('accent-fill-active').withDefault((element) => {
    return accentFillRecipe.getValueFor(element).evaluate(element).active;
});
/** @public */
const accentFillFocus = create('accent-fill-focus').withDefault((element) => {
    return accentFillRecipe.getValueFor(element).evaluate(element).focus;
});
// Foreground On Accent
/** @public */
const foregroundOnAccentRecipe = createNonCss('foreground-on-accent-recipe').withDefault({
    evaluate: (element) => (0,_color_recipes_foreground_on_accent__WEBPACK_IMPORTED_MODULE_12__.foregroundOnAccentSet)(accentFillRest.getValueFor(element), accentFillHover.getValueFor(element), accentFillActive.getValueFor(element), accentFillFocus.getValueFor(element), ContrastTarget.normal),
});
/** @public */
const foregroundOnAccentRest = create('foreground-on-accent-rest').withDefault((element) => foregroundOnAccentRecipe.getValueFor(element).evaluate(element).rest);
/** @public */
const foregroundOnAccentHover = create('foreground-on-accent-hover').withDefault((element) => foregroundOnAccentRecipe.getValueFor(element).evaluate(element).hover);
/** @public */
const foregroundOnAccentActive = create('foreground-on-accent-active').withDefault((element) => foregroundOnAccentRecipe.getValueFor(element).evaluate(element).active);
/** @public */
const foregroundOnAccentFocus = create('foreground-on-accent-focus').withDefault((element) => foregroundOnAccentRecipe.getValueFor(element).evaluate(element).focus);
// Accent Foreground
/** @public */
const accentForegroundRecipe = createNonCss('accent-foreground-recipe').withDefault({
    evaluate: (element, reference) => (0,_color_recipes_contrast_and_delta_swatch_set__WEBPACK_IMPORTED_MODULE_11__.contrastAndDeltaSwatchSet)(accentPalette.getValueFor(element), reference || fillColor.getValueFor(element), 9.5, accentForegroundRestDelta.getValueFor(element), accentForegroundHoverDelta.getValueFor(element), accentForegroundActiveDelta.getValueFor(element), accentForegroundFocusDelta.getValueFor(element)),
});
/** @public */
const accentForegroundRest = create('accent-foreground-rest').withDefault((element) => accentForegroundRecipe.getValueFor(element).evaluate(element).rest);
/** @public */
const accentForegroundHover = create('accent-foreground-hover').withDefault((element) => accentForegroundRecipe.getValueFor(element).evaluate(element).hover);
/** @public */
const accentForegroundActive = create('accent-foreground-active').withDefault((element) => accentForegroundRecipe.getValueFor(element).evaluate(element).active);
/** @public */
const accentForegroundFocus = create('accent-foreground-focus').withDefault((element) => accentForegroundRecipe.getValueFor(element).evaluate(element).focus);
// Accent Stroke Control
/** @public */
const accentStrokeControlRecipe = createNonCss('accent-stroke-control-recipe').withDefault({
    evaluate: (element, reference) => {
        return (0,_color_recipes_gradient_shadow_stroke__WEBPACK_IMPORTED_MODULE_13__.gradientShadowStroke)(neutralPalette.getValueFor(element), reference || fillColor.getValueFor(element), -3, -3, -3, -3, 10, 1, undefined, true);
    },
});
/** @public */
const accentStrokeControlRest = create('accent-stroke-control-rest').withDefault((element) => accentStrokeControlRecipe.getValueFor(element).evaluate(element, accentFillRest.getValueFor(element)).rest);
/** @public */
const accentStrokeControlHover = create('accent-stroke-control-hover').withDefault((element) => accentStrokeControlRecipe.getValueFor(element).evaluate(element, accentFillHover.getValueFor(element)).hover);
/** @public */
const accentStrokeControlActive = create('accent-stroke-control-active').withDefault((element) => accentStrokeControlRecipe.getValueFor(element).evaluate(element, accentFillActive.getValueFor(element)).active);
/** @public */
const accentStrokeControlFocus = create('accent-stroke-control-focus').withDefault((element) => accentStrokeControlRecipe.getValueFor(element).evaluate(element, accentFillFocus.getValueFor(element)).focus);
// Neutral Fill
/** @public */
const neutralFillRecipe = createNonCss('neutral-fill-recipe').withDefault({
    evaluate: (element, reference) => (0,_color_recipes_delta_swatch_set__WEBPACK_IMPORTED_MODULE_14__.deltaSwatchSetByLuminance)(neutralPalette.getValueFor(element), reference || fillColor.getValueFor(element), neutralFillRestDelta.getValueFor(element), neutralFillHoverDelta.getValueFor(element), neutralFillActiveDelta.getValueFor(element), neutralFillFocusDelta.getValueFor(element), undefined, 2, 3, 1, 2, undefined),
});
/** @public */
const neutralFillRest = create('neutral-fill-rest').withDefault((element) => neutralFillRecipe.getValueFor(element).evaluate(element).rest);
/** @public */
const neutralFillHover = create('neutral-fill-hover').withDefault((element) => neutralFillRecipe.getValueFor(element).evaluate(element).hover);
/** @public */
const neutralFillActive = create('neutral-fill-active').withDefault((element) => neutralFillRecipe.getValueFor(element).evaluate(element).active);
/** @public */
const neutralFillFocus = create('neutral-fill-focus').withDefault((element) => neutralFillRecipe.getValueFor(element).evaluate(element).focus);
// Neutral Fill Input
/** @public */
const neutralFillInputRecipe = createNonCss('neutral-fill-input-recipe').withDefault({
    evaluate: (element, reference) => (0,_color_recipes_delta_swatch_set__WEBPACK_IMPORTED_MODULE_14__.deltaSwatchSetByLuminance)(neutralPalette.getValueFor(element), reference || fillColor.getValueFor(element), neutralFillInputRestDelta.getValueFor(element), neutralFillInputHoverDelta.getValueFor(element), neutralFillInputActiveDelta.getValueFor(element), neutralFillInputFocusDelta.getValueFor(element), undefined, 2, 3, 1, 0, undefined),
});
/** @public */
const neutralFillInputRest = create('neutral-fill-input-rest').withDefault((element) => neutralFillInputRecipe.getValueFor(element).evaluate(element).rest);
/** @public */
const neutralFillInputHover = create('neutral-fill-input-hover').withDefault((element) => neutralFillInputRecipe.getValueFor(element).evaluate(element).hover);
/** @public */
const neutralFillInputActive = create('neutral-fill-input-active').withDefault((element) => neutralFillInputRecipe.getValueFor(element).evaluate(element).active);
/** @public */
const neutralFillInputFocus = create('neutral-fill-input-focus').withDefault((element) => neutralFillInputRecipe.getValueFor(element).evaluate(element).focus);
// Neutral Fill Input Alt
/** @public */
const neutralFillInputAltRecipe = createNonCss('neutral-fill-input-alt-recipe').withDefault({
    evaluate: (element, reference) => (0,_color_recipes_delta_swatch_set__WEBPACK_IMPORTED_MODULE_14__.deltaSwatchSetByLuminance)(neutralPalette.getValueFor(element), reference || fillColor.getValueFor(element), neutralFillInputAltRestDelta.getValueFor(element), neutralFillInputAltHoverDelta.getValueFor(element), neutralFillInputAltActiveDelta.getValueFor(element), neutralFillInputAltFocusDelta.getValueFor(element), 1, neutralFillInputAltRestDelta.getValueFor(element), neutralFillInputAltRestDelta.getValueFor(element) - neutralFillInputAltHoverDelta.getValueFor(element), neutralFillInputAltRestDelta.getValueFor(element) - neutralFillInputAltActiveDelta.getValueFor(element), neutralFillInputAltFocusDelta.getValueFor(element), 1),
});
/** @public */
const neutralFillInputAltRest = create('neutral-fill-input-alt-rest').withDefault((element) => neutralFillInputAltRecipe.getValueFor(element).evaluate(element).rest);
/** @public */
const neutralFillInputAltHover = create('neutral-fill-input-alt-hover').withDefault((element) => neutralFillInputAltRecipe.getValueFor(element).evaluate(element).hover);
/** @public */
const neutralFillInputAltActive = create('neutral-fill-input-alt-active').withDefault((element) => neutralFillInputAltRecipe.getValueFor(element).evaluate(element).active);
/** @public */
const neutralFillInputAltFocus = create('neutral-fill-input-alt-focus').withDefault((element) => neutralFillInputAltRecipe.getValueFor(element).evaluate(element).focus);
// Neutral Fill Layer
/** @public */
const neutralFillLayerRecipe = createNonCss('neutral-fill-layer-recipe').withDefault({
    evaluate: (element, reference) => (0,_color_recipes_delta_swatch_set__WEBPACK_IMPORTED_MODULE_14__.deltaSwatchSet)(neutralPalette.getValueFor(element), reference || fillColor.getValueFor(element), neutralFillLayerRestDelta.getValueFor(element), neutralFillLayerHoverDelta.getValueFor(element), neutralFillLayerActiveDelta.getValueFor(element), neutralFillLayerRestDelta.getValueFor(element), 1),
});
/** @public */
const neutralFillLayerRest = create('neutral-fill-layer-rest').withDefault((element) => neutralFillLayerRecipe.getValueFor(element).evaluate(element).rest);
/** @public */
const neutralFillLayerHover = create('neutral-fill-layer-hover').withDefault((element) => neutralFillLayerRecipe.getValueFor(element).evaluate(element).hover);
/** @public */
const neutralFillLayerActive = create('neutral-fill-layer-active').withDefault((element) => neutralFillLayerRecipe.getValueFor(element).evaluate(element).active);
// Neutral Fill Layer Alt
/** @public */
const neutralFillLayerAltRecipe = createNonCss('neutral-fill-layer-alt-recipe').withDefault({
    evaluate: (element, reference) => (0,_color_recipes_delta_swatch_set__WEBPACK_IMPORTED_MODULE_14__.deltaSwatchSet)(neutralPalette.getValueFor(element), reference || fillColor.getValueFor(element), neutralFillLayerAltRestDelta.getValueFor(element), neutralFillLayerAltRestDelta.getValueFor(element), neutralFillLayerAltRestDelta.getValueFor(element), neutralFillLayerAltRestDelta.getValueFor(element)),
});
/** @public */
const neutralFillLayerAltRest = create('neutral-fill-layer-alt-rest').withDefault((element) => neutralFillLayerAltRecipe.getValueFor(element).evaluate(element).rest);
// Neutral Fill Secondary
/** @public */
const neutralFillSecondaryRecipe = createNonCss('neutral-fill-secondary-recipe').withDefault({
    evaluate: (element, reference) => (0,_color_recipes_delta_swatch_set__WEBPACK_IMPORTED_MODULE_14__.deltaSwatchSet)(neutralPalette.getValueFor(element), reference || fillColor.getValueFor(element), neutralFillSecondaryRestDelta.getValueFor(element), neutralFillSecondaryHoverDelta.getValueFor(element), neutralFillSecondaryActiveDelta.getValueFor(element), neutralFillSecondaryFocusDelta.getValueFor(element)),
});
/** @public */
const neutralFillSecondaryRest = create('neutral-fill-secondary-rest').withDefault((element) => neutralFillSecondaryRecipe.getValueFor(element).evaluate(element).rest);
/** @public */
const neutralFillSecondaryHover = create('neutral-fill-secondary-hover').withDefault((element) => neutralFillSecondaryRecipe.getValueFor(element).evaluate(element).hover);
/** @public */
const neutralFillSecondaryActive = create('neutral-fill-secondary-active').withDefault((element) => neutralFillSecondaryRecipe.getValueFor(element).evaluate(element).active);
/** @public */
const neutralFillSecondaryFocus = create('neutral-fill-secondary-focus').withDefault((element) => neutralFillSecondaryRecipe.getValueFor(element).evaluate(element).focus);
// Neutral Fill Stealth
/** @public */
const neutralFillStealthRecipe = createNonCss('neutral-fill-stealth-recipe').withDefault({
    evaluate: (element, reference) => (0,_color_recipes_delta_swatch_set__WEBPACK_IMPORTED_MODULE_14__.deltaSwatchSet)(neutralPalette.getValueFor(element), reference || fillColor.getValueFor(element), neutralFillStealthRestDelta.getValueFor(element), neutralFillStealthHoverDelta.getValueFor(element), neutralFillStealthActiveDelta.getValueFor(element), neutralFillStealthFocusDelta.getValueFor(element)),
});
/** @public */
const neutralFillStealthRest = create('neutral-fill-stealth-rest').withDefault((element) => neutralFillStealthRecipe.getValueFor(element).evaluate(element).rest);
/** @public */
const neutralFillStealthHover = create('neutral-fill-stealth-hover').withDefault((element) => neutralFillStealthRecipe.getValueFor(element).evaluate(element).hover);
/** @public */
const neutralFillStealthActive = create('neutral-fill-stealth-active').withDefault((element) => neutralFillStealthRecipe.getValueFor(element).evaluate(element).active);
/** @public */
const neutralFillStealthFocus = create('neutral-fill-stealth-focus').withDefault((element) => neutralFillStealthRecipe.getValueFor(element).evaluate(element).focus);
// Neutral Fill Strong
/** @public */
const neutralFillStrongRecipe = createNonCss('neutral-fill-strong-recipe').withDefault({
    evaluate: (element, reference) => (0,_color_recipes_contrast_and_delta_swatch_set__WEBPACK_IMPORTED_MODULE_11__.contrastAndDeltaSwatchSet)(neutralPalette.getValueFor(element), reference || fillColor.getValueFor(element), 4.5, neutralFillStrongRestDelta.getValueFor(element), neutralFillStrongHoverDelta.getValueFor(element), neutralFillStrongActiveDelta.getValueFor(element), neutralFillStrongFocusDelta.getValueFor(element)),
});
/** @public */
const neutralFillStrongRest = create('neutral-fill-strong-rest').withDefault((element) => neutralFillStrongRecipe.getValueFor(element).evaluate(element).rest);
/** @public */
const neutralFillStrongHover = create('neutral-fill-strong-hover').withDefault((element) => neutralFillStrongRecipe.getValueFor(element).evaluate(element).hover);
/** @public */
const neutralFillStrongActive = create('neutral-fill-strong-active').withDefault((element) => neutralFillStrongRecipe.getValueFor(element).evaluate(element).active);
/** @public */
const neutralFillStrongFocus = create('neutral-fill-strong-focus').withDefault((element) => neutralFillStrongRecipe.getValueFor(element).evaluate(element).focus);
// Neutral Foreground
/** @public */
const neutralForegroundRecipe = createNonCss('neutral-foreground-recipe').withDefault({
    evaluate: (element, reference) => (0,_color_recipes_contrast_and_delta_swatch_set__WEBPACK_IMPORTED_MODULE_11__.contrastAndDeltaSwatchSet)(neutralPalette.getValueFor(element), reference || fillColor.getValueFor(element), 16, 0, -19, -30, 0),
});
/** @public */
const neutralForegroundRest = create('neutral-foreground-rest').withDefault((element) => neutralForegroundRecipe.getValueFor(element).evaluate(element).rest);
/** @public */
const neutralForegroundHover = create('neutral-foreground-hover').withDefault((element) => neutralForegroundRecipe.getValueFor(element).evaluate(element).hover);
/** @public */
const neutralForegroundActive = create('neutral-foreground-active').withDefault((element) => neutralForegroundRecipe.getValueFor(element).evaluate(element).active);
/** @public */
const neutralForegroundFocus = create('neutral-foreground-focus').withDefault((element) => neutralForegroundRecipe.getValueFor(element).evaluate(element).focus);
// Neutral Foreground Hint
/** @public */
const neutralForegroundHintRecipe = createNonCss('neutral-foreground-hint-recipe').withDefault({
    evaluate: (element, reference) => (0,_color_recipes_contrast_swatch__WEBPACK_IMPORTED_MODULE_15__.contrastSwatch)(neutralPalette.getValueFor(element), reference || fillColor.getValueFor(element), 4.5),
});
/** @public */
const neutralForegroundHint = create('neutral-foreground-hint').withDefault((element) => neutralForegroundHintRecipe.getValueFor(element).evaluate(element));
// Neutral Stroke
/** @public */
const neutralStrokeRecipe = createNonCss('neutral-stroke-recipe').withDefault({
    evaluate: (element, reference) => {
        return (0,_color_recipes_delta_swatch_set__WEBPACK_IMPORTED_MODULE_14__.deltaSwatchSet)(neutralPalette.getValueFor(element), reference || fillColor.getValueFor(element), neutralStrokeRestDelta.getValueFor(element), neutralStrokeHoverDelta.getValueFor(element), neutralStrokeActiveDelta.getValueFor(element), neutralStrokeFocusDelta.getValueFor(element));
    },
});
/** @public */
const neutralStrokeRest = create('neutral-stroke-rest').withDefault((element) => neutralStrokeRecipe.getValueFor(element).evaluate(element).rest);
/** @public */
const neutralStrokeHover = create('neutral-stroke-hover').withDefault((element) => neutralStrokeRecipe.getValueFor(element).evaluate(element).hover);
/** @public */
const neutralStrokeActive = create('neutral-stroke-active').withDefault((element) => neutralStrokeRecipe.getValueFor(element).evaluate(element).active);
/** @public */
const neutralStrokeFocus = create('neutral-stroke-focus').withDefault((element) => neutralStrokeRecipe.getValueFor(element).evaluate(element).focus);
// Neutral Stroke Control
/** @public */
const neutralStrokeControlRecipe = createNonCss('neutral-stroke-control-recipe').withDefault({
    evaluate: (element, reference) => {
        return (0,_color_recipes_gradient_shadow_stroke__WEBPACK_IMPORTED_MODULE_13__.gradientShadowStroke)(neutralPalette.getValueFor(element), reference || fillColor.getValueFor(element), neutralStrokeControlRestDelta.getValueFor(element), neutralStrokeControlHoverDelta.getValueFor(element), neutralStrokeControlActiveDelta.getValueFor(element), neutralStrokeControlFocusDelta.getValueFor(element), 5);
    },
});
/** @public */
const neutralStrokeControlRest = create('neutral-stroke-control-rest').withDefault((element) => neutralStrokeControlRecipe.getValueFor(element).evaluate(element).rest);
/** @public */
const neutralStrokeControlHover = create('neutral-stroke-control-hover').withDefault((element) => neutralStrokeControlRecipe.getValueFor(element).evaluate(element).hover);
/** @public */
const neutralStrokeControlActive = create('neutral-stroke-control-active').withDefault((element) => neutralStrokeControlRecipe.getValueFor(element).evaluate(element).active);
/** @public */
const neutralStrokeControlFocus = create('neutral-stroke-control-focus').withDefault((element) => neutralStrokeControlRecipe.getValueFor(element).evaluate(element).focus);
// Neutral Stroke Divider
/** @public */
const neutralStrokeDividerRecipe = createNonCss('neutral-stroke-divider-recipe').withDefault({
    evaluate: (element, reference) => (0,_color_recipes_delta_swatch__WEBPACK_IMPORTED_MODULE_16__.deltaSwatch)(neutralPalette.getValueFor(element), reference || fillColor.getValueFor(element), neutralStrokeDividerRestDelta.getValueFor(element)),
});
/** @public */
const neutralStrokeDividerRest = create('neutral-stroke-divider-rest').withDefault(element => neutralStrokeDividerRecipe.getValueFor(element).evaluate(element));
// Neutral Stroke Input
/** @public */
const neutralStrokeInputRecipe = createNonCss('neutral-stroke-input-recipe').withDefault({
    evaluate: (element, reference) => {
        return (0,_color_recipes_underline_stroke__WEBPACK_IMPORTED_MODULE_17__.underlineStroke)(neutralPalette.getValueFor(element), reference || fillColor.getValueFor(element), neutralStrokeControlRestDelta.getValueFor(element), neutralStrokeControlHoverDelta.getValueFor(element), neutralStrokeControlActiveDelta.getValueFor(element), neutralStrokeControlFocusDelta.getValueFor(element), 20, strokeWidth.getValueFor(element) + 'px');
    },
});
/** @public */
const neutralStrokeInputRest = create('neutral-stroke-input-rest').withDefault((element) => neutralStrokeInputRecipe.getValueFor(element).evaluate(element).rest);
/** @public */
const neutralStrokeInputHover = create('neutral-stroke-input-hover').withDefault((element) => neutralStrokeInputRecipe.getValueFor(element).evaluate(element).hover);
/** @public */
const neutralStrokeInputActive = create('neutral-stroke-input-active').withDefault((element) => neutralStrokeInputRecipe.getValueFor(element).evaluate(element).active);
/** @public */
const neutralStrokeInputFocus = create('neutral-stroke-input-focus').withDefault((element) => neutralStrokeInputRecipe.getValueFor(element).evaluate(element).focus);
// Neutral Stroke Layer
/** @public */
const neutralStrokeLayerRecipe = createNonCss('neutral-stroke-layer-recipe').withDefault({
    evaluate: (element, reference) => {
        return (0,_color_recipes_delta_swatch_set__WEBPACK_IMPORTED_MODULE_14__.deltaSwatchSet)(neutralPalette.getValueFor(element), reference || fillColor.getValueFor(element), neutralStrokeLayerRestDelta.getValueFor(element), neutralStrokeLayerHoverDelta.getValueFor(element), neutralStrokeLayerActiveDelta.getValueFor(element), neutralStrokeLayerRestDelta.getValueFor(element));
    },
});
/** @public */
const neutralStrokeLayerRest = create('neutral-stroke-layer-rest').withDefault((element) => neutralStrokeLayerRecipe.getValueFor(element).evaluate(element).rest);
/** @public */
const neutralStrokeLayerHover = create('neutral-stroke-layer-hover').withDefault((element) => neutralStrokeLayerRecipe.getValueFor(element).evaluate(element).hover);
/** @public */
const neutralStrokeLayerActive = create('neutral-stroke-layer-active').withDefault((element) => neutralStrokeLayerRecipe.getValueFor(element).evaluate(element).active);
// Neutral Stroke Strong
/** @public */
const neutralStrokeStrongRecipe = createNonCss('neutral-stroke-strong-recipe').withDefault({
    evaluate: (element, reference) => (0,_color_recipes_contrast_and_delta_swatch_set__WEBPACK_IMPORTED_MODULE_11__.contrastAndDeltaSwatchSet)(neutralPalette.getValueFor(element), reference || fillColor.getValueFor(element), 5.5, 0, neutralStrokeStrongHoverDelta.getValueFor(element), neutralStrokeStrongActiveDelta.getValueFor(element), neutralStrokeStrongFocusDelta.getValueFor(element)),
});
/** @public */
const neutralStrokeStrongRest = create('neutral-stroke-strong-rest').withDefault((element) => neutralStrokeStrongRecipe.getValueFor(element).evaluate(element).rest);
/** @public */
const neutralStrokeStrongHover = create('neutral-stroke-strong-hover').withDefault((element) => neutralStrokeStrongRecipe.getValueFor(element).evaluate(element).hover);
/** @public */
const neutralStrokeStrongActive = create('neutral-stroke-strong-active').withDefault((element) => neutralStrokeStrongRecipe.getValueFor(element).evaluate(element).active);
/** @public */
const neutralStrokeStrongFocus = create('neutral-stroke-strong-focus').withDefault((element) => neutralStrokeStrongRecipe.getValueFor(element).evaluate(element).focus);
// Focus Stroke Outer
/** @public */
const focusStrokeOuterRecipe = createNonCss('focus-stroke-outer-recipe').withDefault({
    evaluate: (element) => (0,_color_recipes_focus_stroke__WEBPACK_IMPORTED_MODULE_18__.focusStrokeOuter)(neutralPalette.getValueFor(element), fillColor.getValueFor(element)),
});
/** @public */
const focusStrokeOuter = create('focus-stroke-outer').withDefault((element) => focusStrokeOuterRecipe.getValueFor(element).evaluate(element));
// Focus Stroke Inner
/** @public */
const focusStrokeInnerRecipe = createNonCss('focus-stroke-inner-recipe').withDefault({
    evaluate: (element) => (0,_color_recipes_focus_stroke__WEBPACK_IMPORTED_MODULE_18__.focusStrokeInner)(accentPalette.getValueFor(element), fillColor.getValueFor(element), focusStrokeOuter.getValueFor(element)),
});
/** @public */
const focusStrokeInner = create('focus-stroke-inner').withDefault((element) => focusStrokeInnerRecipe.getValueFor(element).evaluate(element));
// Deprecated tokens
// Foreground On Accent
/** @public @deprecated Not used */
const foregroundOnAccentLargeRecipe = createNonCss('foreground-on-accent-large-recipe').withDefault({
    evaluate: (element) => (0,_color_recipes_foreground_on_accent__WEBPACK_IMPORTED_MODULE_12__.foregroundOnAccentSet)(accentFillRest.getValueFor(element), accentFillHover.getValueFor(element), accentFillActive.getValueFor(element), accentFillFocus.getValueFor(element), ContrastTarget.large),
});
/** @public @deprecated Not used */
const foregroundOnAccentRestLarge = create('foreground-on-accent-rest-large').withDefault((element) => foregroundOnAccentLargeRecipe.getValueFor(element).evaluate(element).rest);
/** @public @deprecated Not used */
const foregroundOnAccentHoverLarge = create('foreground-on-accent-hover-large').withDefault((element) => foregroundOnAccentLargeRecipe.getValueFor(element).evaluate(element, accentFillHover.getValueFor(element)).hover);
/** @public @deprecated Not used */
const foregroundOnAccentActiveLarge = create('foreground-on-accent-active-large').withDefault((element) => foregroundOnAccentLargeRecipe.getValueFor(element).evaluate(element, accentFillActive.getValueFor(element)).active);
/** @public @deprecated Not used */
const foregroundOnAccentFocusLarge = create('foreground-on-accent-focus-large').withDefault((element) => foregroundOnAccentLargeRecipe.getValueFor(element).evaluate(element, accentFillFocus.getValueFor(element)).focus);
// Neutral Fill Inverse
/** @public @deprecated Not used */
const neutralFillInverseRestDelta = create('neutral-fill-inverse-rest-delta').withDefault(0);
/** @public @deprecated Not used */
const neutralFillInverseHoverDelta = create('neutral-fill-inverse-hover-delta').withDefault(-3);
/** @public @deprecated Not used */
const neutralFillInverseActiveDelta = create('neutral-fill-inverse-active-delta').withDefault(7);
/** @public @deprecated Not used */
const neutralFillInverseFocusDelta = create('neutral-fill-inverse-focus-delta').withDefault(0);
/** @deprecated Not used */
function neutralFillInverse(palette, reference, restDelta, hoverDelta, activeDelta, focusDelta) {
    const direction = (0,_color_utilities_direction_by_is_dark__WEBPACK_IMPORTED_MODULE_19__.directionByIsDark)(reference);
    const accessibleIndex = palette.closestIndexOf(palette.colorContrast(reference, 14));
    const accessibleIndex2 = accessibleIndex + direction * Math.abs(restDelta - hoverDelta);
    const indexOneIsRest = direction === 1 ? restDelta < hoverDelta : direction * restDelta > direction * hoverDelta;
    let restIndex;
    let hoverIndex;
    if (indexOneIsRest) {
        restIndex = accessibleIndex;
        hoverIndex = accessibleIndex2;
    }
    else {
        restIndex = accessibleIndex2;
        hoverIndex = accessibleIndex;
    }
    return {
        rest: palette.get(restIndex),
        hover: palette.get(hoverIndex),
        active: palette.get(restIndex + direction * activeDelta),
        focus: palette.get(restIndex + direction * focusDelta),
    };
}
/** @public @deprecated Not used */
const neutralFillInverseRecipe = createNonCss('neutral-fill-inverse-recipe').withDefault({
    evaluate: (element, reference) => neutralFillInverse(neutralPalette.getValueFor(element), reference || fillColor.getValueFor(element), neutralFillInverseRestDelta.getValueFor(element), neutralFillInverseHoverDelta.getValueFor(element), neutralFillInverseActiveDelta.getValueFor(element), neutralFillInverseFocusDelta.getValueFor(element)),
});
/** @public @deprecated Not used */
const neutralFillInverseRest = create('neutral-fill-inverse-rest').withDefault((element) => neutralFillInverseRecipe.getValueFor(element).evaluate(element).rest);
/** @public @deprecated Not used */
const neutralFillInverseHover = create('neutral-fill-inverse-hover').withDefault((element) => neutralFillInverseRecipe.getValueFor(element).evaluate(element).hover);
/** @public @deprecated Not used */
const neutralFillInverseActive = create('neutral-fill-inverse-active').withDefault((element) => neutralFillInverseRecipe.getValueFor(element).evaluate(element).active);
/** @public @deprecated Not used */
const neutralFillInverseFocus = create('neutral-fill-inverse-focus').withDefault((element) => neutralFillInverseRecipe.getValueFor(element).evaluate(element).focus);
/** @public @deprecated Use controlCornerRadius */
const cornerRadius = controlCornerRadius;
/** @public @deprecated Use layerCornerRadius */
const elevatedCornerRadius = layerCornerRadius;
/** @public @deprecated Use strokeWidth */
const outlineWidth = strokeWidth;
/** @public @deprecated Use focusStrokeWidth */
const focusOutlineWidth = focusStrokeWidth;
/** @public @deprecated Use neutralFillInverseRestDelta */
const neutralContrastFillRestDelta = neutralFillInverseRestDelta;
/** @public @deprecated Use neutralFillInverseHoverDelta */
const neutralContrastFillHoverDelta = neutralFillInverseHoverDelta;
/** @public @deprecated Use neutralFillInverseActiveDelta */
const neutralContrastFillActiveDelta = neutralFillInverseActiveDelta;
/** @public @deprecated Use neutralFillInverseFocusDelta */
const neutralContrastFillFocusDelta = neutralFillInverseFocusDelta;
/** @public @deprecated Use neutralFillLayerRestDelta */
const neutralFillCardDelta = neutralFillLayerRestDelta;
/** @public @deprecated Use neutralFillStrongRestDelta */
const neutralFillToggleRestDelta = neutralFillStrongRestDelta;
/** @public @deprecated Use neutralFillStrongHoverDelta */
const neutralFillToggleHoverDelta = neutralFillStrongHoverDelta;
/** @public @deprecated Use neutralFillStrongActiveDelta */
const neutralFillToggleActiveDelta = neutralFillStrongActiveDelta;
/** @public @deprecated Use neutralFillStrongFocusDelta */
const neutralFillToggleFocusDelta = neutralFillStrongFocusDelta;
/** @public @deprecated Use neutralStrokeDividerRestDelta */
const neutralDividerRestDelta = neutralStrokeDividerRestDelta;
/** @public @deprecated Use neutralLayer1 */
const neutralLayerL1 = neutralLayer1;
/** @public @deprecated Use neutralLayer2 */
const neutralLayerL2 = neutralLayer2;
/** @public @deprecated Use neutralLayer3 */
const neutralLayerL3 = neutralLayer3;
/** @public @deprecated Use neutralLayer4 */
const neutralLayerL4 = neutralLayer4;
/** @public @deprecated Use foregroundOnAccentRest */
const accentForegroundCut = foregroundOnAccentRest;
/** @public @deprecated Use foregroundOnAccentRestLarge */
const accentForegroundCutLarge = foregroundOnAccentRestLarge;
/** @public @deprecated Use neutralStrokeDividerRest */
const neutralDivider = neutralStrokeDividerRest;
/** @public @deprecated Use neutralFillLayerRest */
const neutralFillCard = neutralFillLayerRest;
/** @public @deprecated Use neutralFillInverseRest */
const neutralContrastFillRest = neutralFillInverseRest;
/** @public @deprecated Use neutralFillInverseHover */
const neutralContrastFillHover = neutralFillInverseHover;
/** @public @deprecated Use neutralFillInverseActive */
const neutralContrastFillActive = neutralFillInverseActive;
/** @public @deprecated Use neutralFillInverseFocus */
const neutralContrastFillFocus = neutralFillInverseFocus;
/** @public @deprecated Use neutralFillStrongRest */
const neutralFillToggleRest = neutralFillStrongRest;
/** @public @deprecated Use neutralFillStrongHover */
const neutralFillToggleHover = neutralFillStrongHover;
/** @public @deprecated Use neutralFillStrongActive */
const neutralFillToggleActive = neutralFillStrongActive;
/** @public @deprecated Use neutralFillStrongFocus */
const neutralFillToggleFocus = neutralFillStrongFocus;
/** @public @deprecated Use focusStrokeOuter */
const neutralFocus = focusStrokeOuter;
/** @public @deprecated Use focusStrokeInner */
const neutralFocusInnerAccent = focusStrokeInner;
/** @public @deprecated Use neutralStrokeRest */
const neutralOutlineRest = neutralStrokeRest;
/** @public @deprecated Use neutralStrokeHover */
const neutralOutlineHover = neutralStrokeHover;
/** @public @deprecated Use neutralStrokeActive */
const neutralOutlineActive = neutralStrokeActive;
/** @public @deprecated Use neutralStrokeFocus */
const neutralOutlineFocus = neutralStrokeFocus;


/***/ }),

/***/ "./node_modules/@fluentui/web-components/dist/esm/fluent-design-system.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@fluentui/web-components/dist/esm/fluent-design-system.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   provideFluentDesignSystem: () => (/* binding */ provideFluentDesignSystem)
/* harmony export */ });
/* harmony import */ var _microsoft_fast_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/fast-foundation */ "./node_modules/@microsoft/fast-foundation/dist/esm/design-system/design-system.js");

/**
 * Provides a design system for the specified element either by returning one that was
 * already created for that element or creating one.
 * @param element - The element to root the design system at. By default, this is the body.
 * @returns A Fluent Design System
 * @public
 */
function provideFluentDesignSystem(element) {
    return _microsoft_fast_foundation__WEBPACK_IMPORTED_MODULE_0__.DesignSystem.getOrCreate(element).withPrefix('fluent');
}


/***/ }),

/***/ "./node_modules/@fluentui/web-components/dist/esm/progress/progress-ring/index.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/@fluentui/web-components/dist/esm/progress/progress-ring/index.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProgressRing: () => (/* binding */ ProgressRing),
/* harmony export */   fluentProgressRing: () => (/* binding */ fluentProgressRing),
/* harmony export */   progressRingStyles: () => (/* binding */ progressRingStyles)
/* harmony export */ });
/* harmony import */ var _microsoft_fast_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/fast-foundation */ "./node_modules/@microsoft/fast-foundation/dist/esm/progress/base-progress.js");
/* harmony import */ var _microsoft_fast_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/fast-foundation */ "./node_modules/@microsoft/fast-foundation/dist/esm/progress-ring/progress-ring.template.js");
/* harmony import */ var _progress_ring_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./progress-ring.styles */ "./node_modules/@fluentui/web-components/dist/esm/progress/progress-ring/progress-ring.styles.js");


/**
 * Progress Ring base class
 * @public
 */
class ProgressRing extends _microsoft_fast_foundation__WEBPACK_IMPORTED_MODULE_0__.BaseProgress {
}
/**
 * The Fluent Progress Ring Element. Implements {@link @microsoft/fast-foundation#BaseProgress},
 * {@link @microsoft/fast-foundation#progressRingTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-progress-ring\>
 */
const fluentProgressRing = ProgressRing.compose({
    baseName: 'progress-ring',
    template: _microsoft_fast_foundation__WEBPACK_IMPORTED_MODULE_1__.progressRingTemplate,
    styles: _progress_ring_styles__WEBPACK_IMPORTED_MODULE_2__.progressRingStyles,
    indeterminateIndicator: `
    <svg class="progress" part="progress" viewBox="0 0 16 16">
        <circle
            class="background"
            part="background"
            cx="8px"
            cy="8px"
            r="7px"
        ></circle>
        <circle
            class="indeterminate-indicator-1"
            part="indeterminate-indicator-1"
            cx="8px"
            cy="8px"
            r="7px"
        ></circle>
    </svg>
  `,
});
/**
 * Styles for ProgressRing
 * @public
 */
const progressRingStyles = _progress_ring_styles__WEBPACK_IMPORTED_MODULE_2__.progressRingStyles;


/***/ }),

/***/ "./node_modules/@fluentui/web-components/dist/esm/progress/progress-ring/progress-ring.styles.js":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/@fluentui/web-components/dist/esm/progress/progress-ring/progress-ring.styles.js ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   progressRingStyles: () => (/* binding */ progressRingStyles)
/* harmony export */ });
/* harmony import */ var _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/fast-element */ "./node_modules/@microsoft/fast-element/dist/esm/styles/css.js");
/* harmony import */ var _microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @microsoft/fast-web-utilities */ "./node_modules/@microsoft/fast-web-utilities/dist/system-colors.js");
/* harmony import */ var _microsoft_fast_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/fast-foundation */ "./node_modules/@microsoft/fast-foundation/dist/esm/utilities/style/display.js");
/* harmony import */ var _microsoft_fast_foundation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @microsoft/fast-foundation */ "./node_modules/@microsoft/fast-foundation/dist/esm/utilities/match-media-stylesheet-behavior.js");
/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../styles */ "./node_modules/@fluentui/web-components/dist/esm/styles/size.js");
/* harmony import */ var _design_tokens__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../design-tokens */ "./node_modules/@fluentui/web-components/dist/esm/design-tokens.js");





const progressRingStyles = (context, definition) => (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_0__.css) `
    ${(0,_microsoft_fast_foundation__WEBPACK_IMPORTED_MODULE_1__.display)('flex')} :host {
      align-items: center;
      height: calc(${_styles__WEBPACK_IMPORTED_MODULE_2__.heightNumber} * 1px);
      width: calc(${_styles__WEBPACK_IMPORTED_MODULE_2__.heightNumber} * 1px);
    }

    .progress {
      height: 100%;
      width: 100%;
    }

    .background {
      fill: none;
      stroke-width: 2px;
    }

    .determinate {
      stroke: ${_design_tokens__WEBPACK_IMPORTED_MODULE_3__.accentFillRest};
      fill: none;
      stroke-width: 2px;
      stroke-linecap: round;
      transform-origin: 50% 50%;
      transform: rotate(-90deg);
      transition: all 0.2s ease-in-out;
    }

    .indeterminate-indicator-1 {
      stroke: ${_design_tokens__WEBPACK_IMPORTED_MODULE_3__.accentFillRest};
      fill: none;
      stroke-width: 2px;
      stroke-linecap: round;
      transform-origin: 50% 50%;
      transform: rotate(-90deg);
      transition: all 0.2s ease-in-out;
      animation: spin-infinite 2s linear infinite;
    }

    :host(.paused) .indeterminate-indicator-1 {
      animation: none;
      stroke: ${_design_tokens__WEBPACK_IMPORTED_MODULE_3__.neutralForegroundHint};
    }

    :host(.paused) .determinate {
      stroke: ${_design_tokens__WEBPACK_IMPORTED_MODULE_3__.neutralForegroundHint};
    }

    @keyframes spin-infinite {
      0% {
        stroke-dasharray: 0.01px 43.97px;
        transform: rotate(0deg);
      }
      50% {
        stroke-dasharray: 21.99px 21.99px;
        transform: rotate(450deg);
      }
      100% {
        stroke-dasharray: 0.01px 43.97px;
        transform: rotate(1080deg);
      }
    }
  `.withBehaviors((0,_microsoft_fast_foundation__WEBPACK_IMPORTED_MODULE_4__.forcedColorsStylesheetBehavior)((0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_0__.css) `
        .background {
          stroke: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_5__.SystemColors.Field};
        }
        .determinate,
        .indeterminate-indicator-1 {
          stroke: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_5__.SystemColors.ButtonText};
        }
        :host(.paused) .determinate,
        :host(.paused) .indeterminate-indicator-1 {
          stroke: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_5__.SystemColors.GrayText};
        }
      `));


/***/ }),

/***/ "./node_modules/@fluentui/web-components/dist/esm/styles/focus.js":
/*!************************************************************************!*\
  !*** ./node_modules/@fluentui/web-components/dist/esm/styles/focus.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   focusTreatmentBase: () => (/* binding */ focusTreatmentBase),
/* harmony export */   focusTreatmentTight: () => (/* binding */ focusTreatmentTight)
/* harmony export */ });
/* harmony import */ var _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/fast-element */ "./node_modules/@microsoft/fast-element/dist/esm/styles/css.js");
/* harmony import */ var _design_tokens__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../design-tokens */ "./node_modules/@fluentui/web-components/dist/esm/design-tokens.js");


/**
 * Partial CSS for the focus treatment for most typical sized components like Button, Menu Item, etc.
 *
 * @public
 */
const focusTreatmentBase = (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_0__.cssPartial) `
  outline: calc(${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.focusStrokeWidth} * 1px) solid ${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.focusStrokeOuter};
  outline-offset: calc(${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.focusStrokeWidth} * -1px);
`;
/**
 * Partial CSS for the focus treatment for tighter components with spacing constraints, like Checkbox
 * and Radio, or plain text like Hypertext appearance Anchor or Breadcrumb Item.
 *
 * @public
 */
const focusTreatmentTight = (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_0__.cssPartial) `
  outline: calc(${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.focusStrokeWidth} * 1px) solid ${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.focusStrokeOuter};
  outline-offset: calc(${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.strokeWidth} * 1px);
`;


/***/ }),

/***/ "./node_modules/@fluentui/web-components/dist/esm/styles/patterns/button.styles.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/@fluentui/web-components/dist/esm/styles/patterns/button.styles.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AccentButtonStyles: () => (/* binding */ AccentButtonStyles),
/* harmony export */   HypertextStyles: () => (/* binding */ HypertextStyles),
/* harmony export */   LightweightButtonStyles: () => (/* binding */ LightweightButtonStyles),
/* harmony export */   NeutralButtonStyles: () => (/* binding */ NeutralButtonStyles),
/* harmony export */   OutlineButtonStyles: () => (/* binding */ OutlineButtonStyles),
/* harmony export */   StealthButtonStyles: () => (/* binding */ StealthButtonStyles),
/* harmony export */   baseButtonStyles: () => (/* binding */ baseButtonStyles)
/* harmony export */ });
/* harmony import */ var _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/fast-element */ "./node_modules/@microsoft/fast-element/dist/esm/styles/css.js");
/* harmony import */ var _microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @microsoft/fast-web-utilities */ "./node_modules/@microsoft/fast-web-utilities/dist/system-colors.js");
/* harmony import */ var _microsoft_fast_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/fast-foundation */ "./node_modules/@microsoft/fast-foundation/dist/esm/utilities/style/display.js");
/* harmony import */ var _microsoft_fast_foundation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @microsoft/fast-foundation */ "./node_modules/@microsoft/fast-foundation/dist/esm/utilities/style/focus.js");
/* harmony import */ var _microsoft_fast_foundation__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @microsoft/fast-foundation */ "./node_modules/@microsoft/fast-foundation/dist/esm/utilities/match-media-stylesheet-behavior.js");
/* harmony import */ var _size__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../size */ "./node_modules/@fluentui/web-components/dist/esm/styles/size.js");
/* harmony import */ var _design_tokens__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../design-tokens */ "./node_modules/@fluentui/web-components/dist/esm/design-tokens.js");
/* harmony import */ var _styles_patterns_type_ramp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../styles/patterns/type-ramp */ "./node_modules/@fluentui/web-components/dist/esm/styles/patterns/type-ramp.js");
/* harmony import */ var _focus__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../focus */ "./node_modules/@fluentui/web-components/dist/esm/styles/focus.js");







/**
 * The base styles for button controls, without `appearance` visual differences.
 *
 * @internal
 */
const baseButtonStyles = (context, definition, interactivitySelector, nonInteractivitySelector = '[disabled]') => (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_0__.css) `
    ${(0,_microsoft_fast_foundation__WEBPACK_IMPORTED_MODULE_1__.display)('inline-flex')}
    
    :host {
      position: relative;
      box-sizing: border-box;
      ${_styles_patterns_type_ramp__WEBPACK_IMPORTED_MODULE_2__.typeRampBase}
      height: calc(${_size__WEBPACK_IMPORTED_MODULE_3__.heightNumber} * 1px);
      min-width: calc(${_size__WEBPACK_IMPORTED_MODULE_3__.heightNumber} * 1px);
      color: ${_design_tokens__WEBPACK_IMPORTED_MODULE_4__.neutralForegroundRest};
      border-radius: calc(${_design_tokens__WEBPACK_IMPORTED_MODULE_4__.controlCornerRadius} * 1px);
      fill: currentcolor;
    }

    .control {
      border: calc(${_design_tokens__WEBPACK_IMPORTED_MODULE_4__.strokeWidth} * 1px) solid transparent;
      flex-grow: 1;
      box-sizing: border-box;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      padding: 0 calc((10 + (${_design_tokens__WEBPACK_IMPORTED_MODULE_4__.designUnit} * 2 * ${_design_tokens__WEBPACK_IMPORTED_MODULE_4__.density})) * 1px);
      white-space: nowrap;
      outline: none;
      text-decoration: none;
      color: inherit;
      border-radius: inherit;
      fill: inherit;
      font-family: inherit;
    }

    .control,
    .end,
    .start {
      font: inherit;
    }

    .control.icon-only {
      padding: 0;
      line-height: 0;
    }

    .control:${_microsoft_fast_foundation__WEBPACK_IMPORTED_MODULE_5__.focusVisible} {
      ${_focus__WEBPACK_IMPORTED_MODULE_6__.focusTreatmentBase}
    }

    .control::-moz-focus-inner {
      border: 0;
    }

    .content {
      pointer-events: none;
    }

    .start,
    .end {
      display: flex;
      pointer-events: none;
    }

    .start {
      margin-inline-end: 11px;
    }

    .end {
      margin-inline-start: 11px;
    }
  `;
/**
 * @internal
 */
const NeutralButtonStyles = (context, definition, interactivitySelector, nonInteractivitySelector = '[disabled]') => (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_0__.css) `
    .control {
      background: padding-box linear-gradient(${_design_tokens__WEBPACK_IMPORTED_MODULE_4__.neutralFillRest}, ${_design_tokens__WEBPACK_IMPORTED_MODULE_4__.neutralFillRest}),
        border-box ${_design_tokens__WEBPACK_IMPORTED_MODULE_4__.neutralStrokeControlRest};
    }

    :host(${interactivitySelector}:hover) .control {
      background: padding-box linear-gradient(${_design_tokens__WEBPACK_IMPORTED_MODULE_4__.neutralFillHover}, ${_design_tokens__WEBPACK_IMPORTED_MODULE_4__.neutralFillHover}),
        border-box ${_design_tokens__WEBPACK_IMPORTED_MODULE_4__.neutralStrokeControlHover};
    }

    :host(${interactivitySelector}:active) .control {
      background: padding-box linear-gradient(${_design_tokens__WEBPACK_IMPORTED_MODULE_4__.neutralFillActive}, ${_design_tokens__WEBPACK_IMPORTED_MODULE_4__.neutralFillActive}),
        border-box ${_design_tokens__WEBPACK_IMPORTED_MODULE_4__.neutralStrokeControlActive};
    }

    :host(${nonInteractivitySelector}) .control {
      background: padding-box linear-gradient(${_design_tokens__WEBPACK_IMPORTED_MODULE_4__.neutralFillRest}, ${_design_tokens__WEBPACK_IMPORTED_MODULE_4__.neutralFillRest}),
        border-box ${_design_tokens__WEBPACK_IMPORTED_MODULE_4__.neutralStrokeRest};
    }
  `.withBehaviors((0,_microsoft_fast_foundation__WEBPACK_IMPORTED_MODULE_7__.forcedColorsStylesheetBehavior)((0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_0__.css) `
        .control {
          background: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_8__.SystemColors.ButtonFace};
          border-color: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_8__.SystemColors.ButtonText};
          color: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_8__.SystemColors.ButtonText};
        }

        :host(${interactivitySelector}:hover) .control,
        :host(${interactivitySelector}:active) .control {
          forced-color-adjust: none;
          background: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_8__.SystemColors.HighlightText};
          border-color: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_8__.SystemColors.Highlight};
          color: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_8__.SystemColors.Highlight};
        }

        :host(${nonInteractivitySelector}) .control {
          background: transparent;
          border-color: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_8__.SystemColors.GrayText};
          color: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_8__.SystemColors.GrayText};
        }

        .control:${_microsoft_fast_foundation__WEBPACK_IMPORTED_MODULE_5__.focusVisible} {
          outline-color: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_8__.SystemColors.CanvasText};
        }

        :host([href]) .control {
          background: transparent;
          border-color: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_8__.SystemColors.LinkText};
          color: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_8__.SystemColors.LinkText};
        }

        :host([href]:hover) .control,
        :host([href]:active) .control {
          background: transparent;
          border-color: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_8__.SystemColors.CanvasText};
          color: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_8__.SystemColors.CanvasText};
        }
    `));
/**
 * @internal
 */
const AccentButtonStyles = (context, definition, interactivitySelector, nonInteractivitySelector = '[disabled]') => (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_0__.css) `
    .control {
      background: padding-box linear-gradient(${_design_tokens__WEBPACK_IMPORTED_MODULE_4__.accentFillRest}, ${_design_tokens__WEBPACK_IMPORTED_MODULE_4__.accentFillRest}),
        border-box ${_design_tokens__WEBPACK_IMPORTED_MODULE_4__.accentStrokeControlRest};
      color: ${_design_tokens__WEBPACK_IMPORTED_MODULE_4__.foregroundOnAccentRest};
    }

    :host(${interactivitySelector}:hover) .control {
      background: padding-box linear-gradient(${_design_tokens__WEBPACK_IMPORTED_MODULE_4__.accentFillHover}, ${_design_tokens__WEBPACK_IMPORTED_MODULE_4__.accentFillHover}),
        border-box ${_design_tokens__WEBPACK_IMPORTED_MODULE_4__.accentStrokeControlHover};
      color: ${_design_tokens__WEBPACK_IMPORTED_MODULE_4__.foregroundOnAccentHover};
    }

    :host(${interactivitySelector}:active) .control {
      background: padding-box linear-gradient(${_design_tokens__WEBPACK_IMPORTED_MODULE_4__.accentFillActive}, ${_design_tokens__WEBPACK_IMPORTED_MODULE_4__.accentFillActive}),
        border-box ${_design_tokens__WEBPACK_IMPORTED_MODULE_4__.accentStrokeControlActive};
      color: ${_design_tokens__WEBPACK_IMPORTED_MODULE_4__.foregroundOnAccentActive};
    }

    :host(${nonInteractivitySelector}) .control {
      background: ${_design_tokens__WEBPACK_IMPORTED_MODULE_4__.accentFillRest};
    }

    .control:${_microsoft_fast_foundation__WEBPACK_IMPORTED_MODULE_5__.focusVisible} {
      box-shadow: 0 0 0 calc(${_design_tokens__WEBPACK_IMPORTED_MODULE_4__.focusStrokeWidth} * 1px) ${_design_tokens__WEBPACK_IMPORTED_MODULE_4__.focusStrokeInner} inset !important;
    }
  `.withBehaviors((0,_microsoft_fast_foundation__WEBPACK_IMPORTED_MODULE_7__.forcedColorsStylesheetBehavior)((0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_0__.css) `
        .control {
          forced-color-adjust: none;
          background: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_8__.SystemColors.Highlight};
          color: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_8__.SystemColors.HighlightText};
        }

        :host(${interactivitySelector}:hover) .control,
        :host(${interactivitySelector}:active) .control {
          background: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_8__.SystemColors.HighlightText};
          border-color: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_8__.SystemColors.Highlight};
          color: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_8__.SystemColors.Highlight};
        }

        :host(${nonInteractivitySelector}) .control {
          background: transparent;
          border-color: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_8__.SystemColors.GrayText};
          color: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_8__.SystemColors.GrayText};
        }

        .control:${_microsoft_fast_foundation__WEBPACK_IMPORTED_MODULE_5__.focusVisible} {
          outline-color: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_8__.SystemColors.CanvasText};
          box-shadow: 0 0 0 calc(${_design_tokens__WEBPACK_IMPORTED_MODULE_4__.focusStrokeWidth} * 1px) ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_8__.SystemColors.HighlightText} inset !important;
        }

        :host([href]) .control {
          background: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_8__.SystemColors.LinkText};
          color: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_8__.SystemColors.HighlightText};
        }

        :host([href]:hover) .control,
        :host([href]:active) .control {
          background: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_8__.SystemColors.ButtonFace};
          border-color: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_8__.SystemColors.LinkText};
          color: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_8__.SystemColors.LinkText};
        }
      `));
/**
 * @internal
 */
const HypertextStyles = (context, definition, interactivitySelector, nonInteractivitySelector = '[disabled]') => (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_0__.css) `
    :host {
      height: auto;
      font-family: inherit;
      font-size: inherit;
      line-height: inherit;
      min-width: 0;
    }

    .control {
      display: inline;
      padding: 0;
      border: none;
      box-shadow: none;
      line-height: 1;
    }

    :host(${interactivitySelector}) .control {
      color: ${_design_tokens__WEBPACK_IMPORTED_MODULE_4__.accentForegroundRest};
      text-decoration: underline 1px;
    }

    :host(${interactivitySelector}:hover) .control {
      color: ${_design_tokens__WEBPACK_IMPORTED_MODULE_4__.accentForegroundHover};
      text-decoration: none;
    }

    :host(${interactivitySelector}:active) .control {
      color: ${_design_tokens__WEBPACK_IMPORTED_MODULE_4__.accentForegroundActive};
      text-decoration: none;
    }

    .control:${_microsoft_fast_foundation__WEBPACK_IMPORTED_MODULE_5__.focusVisible} {
      ${_focus__WEBPACK_IMPORTED_MODULE_6__.focusTreatmentTight}
    }
  `.withBehaviors((0,_microsoft_fast_foundation__WEBPACK_IMPORTED_MODULE_7__.forcedColorsStylesheetBehavior)((0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_0__.css) `
        :host(${interactivitySelector}) .control {
          color: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_8__.SystemColors.LinkText};
        }

        :host(${interactivitySelector}:hover) .control,
        :host(${interactivitySelector}:active) .control {
          color: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_8__.SystemColors.CanvasText};
        }

        .control:${_microsoft_fast_foundation__WEBPACK_IMPORTED_MODULE_5__.focusVisible} {
          outline-color: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_8__.SystemColors.CanvasText};
        }
      `));
/**
 * @internal
 */
const LightweightButtonStyles = (context, definition, interactivitySelector, nonInteractivitySelector = '[disabled]') => (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_0__.css) `
    :host {
      color: ${_design_tokens__WEBPACK_IMPORTED_MODULE_4__.accentForegroundRest};
    }

    .control {
      background: ${_design_tokens__WEBPACK_IMPORTED_MODULE_4__.neutralFillStealthRest};
    }

    :host(${interactivitySelector}:hover) .control {
      background: ${_design_tokens__WEBPACK_IMPORTED_MODULE_4__.neutralFillStealthHover};
      color: ${_design_tokens__WEBPACK_IMPORTED_MODULE_4__.accentForegroundHover};
    }

    :host(${interactivitySelector}:active) .control {
      background: ${_design_tokens__WEBPACK_IMPORTED_MODULE_4__.neutralFillStealthActive};
      color: ${_design_tokens__WEBPACK_IMPORTED_MODULE_4__.accentForegroundActive};
    }

    :host(${nonInteractivitySelector}) .control {
      background: ${_design_tokens__WEBPACK_IMPORTED_MODULE_4__.neutralFillStealthRest};
    }
  `.withBehaviors((0,_microsoft_fast_foundation__WEBPACK_IMPORTED_MODULE_7__.forcedColorsStylesheetBehavior)((0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_0__.css) `
        :host {
          color: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_8__.SystemColors.ButtonText};
        }

        .control {
          forced-color-adjust: none;
          background: transparent;
        }

        :host(${interactivitySelector}:hover) .control,
        :host(${interactivitySelector}:active) .control {
          background: transparent;
          border-color: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_8__.SystemColors.ButtonText};
          color: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_8__.SystemColors.ButtonText};
        }

        :host(${nonInteractivitySelector}) .control {
          background: transparent;
          color: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_8__.SystemColors.GrayText};
        }

        .control:${_microsoft_fast_foundation__WEBPACK_IMPORTED_MODULE_5__.focusVisible} {
          outline-color: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_8__.SystemColors.CanvasText};
        }

        :host([href]) .control {
          color: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_8__.SystemColors.LinkText};
        }

        :host([href]:hover) .control,
        :host([href]:active) .control {
          border-color: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_8__.SystemColors.LinkText};
          color: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_8__.SystemColors.LinkText};
        }
      `));
/**
 * @internal
 */
const OutlineButtonStyles = (context, definition, interactivitySelector, nonInteractivitySelector = '[disabled]') => (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_0__.css) `
    .control {
      background: transparent !important;
      border-color: ${_design_tokens__WEBPACK_IMPORTED_MODULE_4__.neutralStrokeRest};
    }

    :host(${interactivitySelector}:hover) .control {
      border-color: ${_design_tokens__WEBPACK_IMPORTED_MODULE_4__.neutralStrokeHover};
    }

    :host(${interactivitySelector}:active) .control {
      border-color: ${_design_tokens__WEBPACK_IMPORTED_MODULE_4__.neutralStrokeActive};
    }

    :host(${nonInteractivitySelector}) .control {
      background: transparent !important;
      border-color: ${_design_tokens__WEBPACK_IMPORTED_MODULE_4__.neutralStrokeRest};
    }
  `.withBehaviors((0,_microsoft_fast_foundation__WEBPACK_IMPORTED_MODULE_7__.forcedColorsStylesheetBehavior)((0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_0__.css) `
        .control {
          border-color: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_8__.SystemColors.ButtonText};
          color: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_8__.SystemColors.ButtonText};
        }

        :host(${interactivitySelector}:hover) .control,
        :host(${interactivitySelector}:active) .control {
          background: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_8__.SystemColors.HighlightText};
          border-color: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_8__.SystemColors.Highlight};
          color: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_8__.SystemColors.Highlight};
        }

        :host(${nonInteractivitySelector}) .control {
          border-color: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_8__.SystemColors.GrayText};
          color: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_8__.SystemColors.GrayText};
        }

        .control:${_microsoft_fast_foundation__WEBPACK_IMPORTED_MODULE_5__.focusVisible} {
          outline-color: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_8__.SystemColors.CanvasText};
        }

        :host([href]) .control {
          border-color: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_8__.SystemColors.LinkText};
          color: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_8__.SystemColors.LinkText};
        }

        :host([href]:hover) .control,
        :host([href]:active) .control {
          border-color: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_8__.SystemColors.CanvasText};
          color: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_8__.SystemColors.CanvasText};
        }
      `));
/**
 * @internal
 */
const StealthButtonStyles = (context, definition, interactivitySelector, nonInteractivitySelector = '[disabled]') => (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_0__.css) `
    .control {
      background: ${_design_tokens__WEBPACK_IMPORTED_MODULE_4__.neutralFillStealthRest};
    }

    :host(${interactivitySelector}:hover) .control {
      background: ${_design_tokens__WEBPACK_IMPORTED_MODULE_4__.neutralFillStealthHover};
    }

    :host(${interactivitySelector}:active) .control {
      background: ${_design_tokens__WEBPACK_IMPORTED_MODULE_4__.neutralFillStealthActive};
    }

    :host(${nonInteractivitySelector}) .control {
      background: ${_design_tokens__WEBPACK_IMPORTED_MODULE_4__.neutralFillStealthRest};
    }
  `.withBehaviors((0,_microsoft_fast_foundation__WEBPACK_IMPORTED_MODULE_7__.forcedColorsStylesheetBehavior)((0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_0__.css) `
        .control {
          forced-color-adjust: none;
          background: transparent;
          color: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_8__.SystemColors.ButtonText};
        }

        :host(${interactivitySelector}:hover) .control,
        :host(${interactivitySelector}:active) .control {
          background: transparent;
          border-color: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_8__.SystemColors.ButtonText};
          color: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_8__.SystemColors.ButtonText};
        }

        :host(${nonInteractivitySelector}) .control {
          background: transparent;
          color: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_8__.SystemColors.GrayText};
        }
        
        .control:${_microsoft_fast_foundation__WEBPACK_IMPORTED_MODULE_5__.focusVisible} {
          outline-color: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_8__.SystemColors.CanvasText};
        }

        :host([href]) .control {
          color: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_8__.SystemColors.LinkText};
        }

        :host([href]:hover) .control,
        :host([href]:active) .control {
          background: transparent;
          border-color: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_8__.SystemColors.LinkText};
          color: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_8__.SystemColors.LinkText};
        }
      `));


/***/ }),

/***/ "./node_modules/@fluentui/web-components/dist/esm/styles/patterns/input.styles.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/@fluentui/web-components/dist/esm/styles/patterns/input.styles.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   baseInputStyles: () => (/* binding */ baseInputStyles),
/* harmony export */   inputFilledStyles: () => (/* binding */ inputFilledStyles),
/* harmony export */   inputForcedColorStyles: () => (/* binding */ inputForcedColorStyles),
/* harmony export */   inputOutlineStyles: () => (/* binding */ inputOutlineStyles),
/* harmony export */   inputStateStyles: () => (/* binding */ inputStateStyles)
/* harmony export */ });
/* harmony import */ var _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/fast-element */ "./node_modules/@microsoft/fast-element/dist/esm/styles/css.js");
/* harmony import */ var _microsoft_fast_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/fast-foundation */ "./node_modules/@microsoft/fast-foundation/dist/esm/design-token/design-token.js");
/* harmony import */ var _microsoft_fast_foundation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @microsoft/fast-foundation */ "./node_modules/@microsoft/fast-foundation/dist/esm/utilities/style/disabled.js");
/* harmony import */ var _microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @microsoft/fast-web-utilities */ "./node_modules/@microsoft/fast-web-utilities/dist/system-colors.js");
/* harmony import */ var _design_tokens__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../design-tokens */ "./node_modules/@fluentui/web-components/dist/esm/design-tokens.js");
/* harmony import */ var _patterns_type_ramp__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../patterns/type-ramp */ "./node_modules/@fluentui/web-components/dist/esm/styles/patterns/type-ramp.js");
/* harmony import */ var _size__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../size */ "./node_modules/@fluentui/web-components/dist/esm/styles/size.js");
/* harmony import */ var _focus__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../focus */ "./node_modules/@fluentui/web-components/dist/esm/styles/focus.js");







const placeholderRest = _microsoft_fast_foundation__WEBPACK_IMPORTED_MODULE_0__.DesignToken.create('input-placeholder-rest').withDefault((target) => {
    const baseRecipe = _design_tokens__WEBPACK_IMPORTED_MODULE_1__.neutralFillInputRecipe.getValueFor(target);
    const hintRecipe = _design_tokens__WEBPACK_IMPORTED_MODULE_1__.neutralForegroundHintRecipe.getValueFor(target);
    return hintRecipe.evaluate(target, baseRecipe.evaluate(target).rest);
});
const placeholderHover = _microsoft_fast_foundation__WEBPACK_IMPORTED_MODULE_0__.DesignToken.create('input-placeholder-hover').withDefault((target) => {
    const baseRecipe = _design_tokens__WEBPACK_IMPORTED_MODULE_1__.neutralFillInputRecipe.getValueFor(target);
    const hintRecipe = _design_tokens__WEBPACK_IMPORTED_MODULE_1__.neutralForegroundHintRecipe.getValueFor(target);
    return hintRecipe.evaluate(target, baseRecipe.evaluate(target).hover);
});
const filledPlaceholderRest = _microsoft_fast_foundation__WEBPACK_IMPORTED_MODULE_0__.DesignToken.create('input-filled-placeholder-rest').withDefault((target) => {
    const baseRecipe = _design_tokens__WEBPACK_IMPORTED_MODULE_1__.neutralFillSecondaryRecipe.getValueFor(target);
    const hintRecipe = _design_tokens__WEBPACK_IMPORTED_MODULE_1__.neutralForegroundHintRecipe.getValueFor(target);
    return hintRecipe.evaluate(target, baseRecipe.evaluate(target).rest);
});
const filledPlaceholderHover = _microsoft_fast_foundation__WEBPACK_IMPORTED_MODULE_0__.DesignToken.create('input-filled-placeholder-hover').withDefault((target) => {
    const baseRecipe = _design_tokens__WEBPACK_IMPORTED_MODULE_1__.neutralFillSecondaryRecipe.getValueFor(target);
    const hintRecipe = _design_tokens__WEBPACK_IMPORTED_MODULE_1__.neutralForegroundHintRecipe.getValueFor(target);
    return hintRecipe.evaluate(target, baseRecipe.evaluate(target).hover);
});
/**
 * The base styles for input controls, without `appearance` visual differences.
 *
 * @internal
 */
const baseInputStyles = (context, definition, logicalControlSelector) => (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_2__.css) `
  :host {
    ${_patterns_type_ramp__WEBPACK_IMPORTED_MODULE_3__.typeRampBase}
    color: ${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.neutralForegroundRest};
    fill: currentcolor;
    user-select: none;
    position: relative;
  }

  ${logicalControlSelector} {
    box-sizing: border-box;
    position: relative;
    color: inherit;
    border: calc(${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.strokeWidth} * 1px) solid transparent;
    border-radius: calc(${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.controlCornerRadius} * 1px);
    height: calc(${_size__WEBPACK_IMPORTED_MODULE_4__.heightNumber} * 1px);
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }

  .control {
    width: 100%;
    outline: none;
  }

  .label {
    display: block;
    color: ${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.neutralForegroundRest};
    cursor: pointer;
    ${_patterns_type_ramp__WEBPACK_IMPORTED_MODULE_3__.typeRampBase}
    margin-bottom: 4px;
  }

  .label__hidden {
    display: none;
    visibility: hidden;
  }

  :host([disabled]) ${logicalControlSelector},
  :host([readonly]) ${logicalControlSelector},
  :host([disabled]) .label,
  :host([readonly]) .label,
  :host([disabled]) .control,
  :host([readonly]) .control {
    cursor: ${_microsoft_fast_foundation__WEBPACK_IMPORTED_MODULE_5__.disabledCursor};
  }

  :host([disabled]) {
    opacity: ${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.disabledOpacity};
  }
`;
/**
 * The styles for active and focus interactions for input controls.
 *
 * @internal
 */
const inputStateStyles = (context, definition, logicalControlSelector) => (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_2__.css) `
  @media (forced-colors: none) {
    :host(:not([disabled]):active)::after {
      left: 50%;
      width: 40%;
      transform: translateX(-50%);
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }

    :host(:not([disabled]):focus-within)::after {
      left: 0;
      width: 100%;
      transform: none;
    }

    :host(:not([disabled]):active)::after,
    :host(:not([disabled]):focus-within:not(:active))::after {
      content: '';
      position: absolute;
      height: calc(${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.focusStrokeWidth} * 1px);
      bottom: 0;
      border-bottom: calc(${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.focusStrokeWidth} * 1px) solid ${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.accentFillRest};
      border-bottom-left-radius: calc(${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.controlCornerRadius} * 1px);
      border-bottom-right-radius: calc(${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.controlCornerRadius} * 1px);
      z-index: 2;
      transition: all 300ms cubic-bezier(0.1, 0.9, 0.2, 1);
    }
  }
`;
/**
 * The visual styles for inputs with `appearance='outline'`.
 *
 * @internal
 */
const inputOutlineStyles = (context, definition, logicalControlSelector, interactivitySelector = ':not([disabled]):not(:focus-within)') => (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_2__.css) `
  ${logicalControlSelector} {
    background: padding-box linear-gradient(${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.neutralFillInputRest}, ${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.neutralFillInputRest}),
      border-box ${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.neutralStrokeInputRest};
  }

  :host(${interactivitySelector}:hover) ${logicalControlSelector} {
    background: padding-box linear-gradient(${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.neutralFillInputHover}, ${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.neutralFillInputHover}),
      border-box ${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.neutralStrokeInputHover};
  }

  :host(:not([disabled]):focus-within) ${logicalControlSelector} {
    background: padding-box linear-gradient(${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.neutralFillInputFocus}, ${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.neutralFillInputFocus}),
      border-box ${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.neutralStrokeInputRest};
  }
  
  :host([disabled]) ${logicalControlSelector} {
    background: padding-box linear-gradient(${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.neutralFillInputRest}, ${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.neutralFillInputRest}),
      border-box ${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.neutralStrokeRest};
  }

  .control::placeholder {
    color: ${placeholderRest};
  }

  :host(${interactivitySelector}:hover) .control::placeholder {
    color: ${placeholderHover};
  }
`;
/**
 * The visual styles for inputs with `appearance='filled'`.
 *
 * @internal
 */
const inputFilledStyles = (context, definition, logicalControlSelector, interactivitySelector = ':not([disabled]):not(:focus-within)') => (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_2__.css) `
  ${logicalControlSelector} {
    background: ${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.neutralFillSecondaryRest};
  }

  :host(${interactivitySelector}:hover) ${logicalControlSelector} {
    background: ${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.neutralFillSecondaryHover};
  }

  :host(:not([disabled]):focus-within) ${logicalControlSelector} {
    background: ${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.neutralFillSecondaryFocus};
  }

  :host([disabled]) ${logicalControlSelector} {
    background: ${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.neutralFillSecondaryRest};
  }

  .control::placeholder {
    color: ${filledPlaceholderRest};
  }

  :host(${interactivitySelector}:hover) .control::placeholder {
    color: ${filledPlaceholderHover};
  }
`;
/**
 * @internal
 */
const inputForcedColorStyles = (context, definition, logicalControlSelector, interactivitySelector = ':not([disabled]):not(:focus-within)') => (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_2__.css) `
  :host {
    color: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_6__.SystemColors.ButtonText};
  }

  ${logicalControlSelector} {
    background: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_6__.SystemColors.ButtonFace};
    border-color: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_6__.SystemColors.ButtonText};
  }

  :host(${interactivitySelector}:hover) ${logicalControlSelector},
  :host(:not([disabled]):focus-within) ${logicalControlSelector} {
    border-color: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_6__.SystemColors.Highlight};
  }

  :host([disabled]) ${logicalControlSelector} {
    opacity: 1;
    background: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_6__.SystemColors.ButtonFace};
    border-color: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_6__.SystemColors.GrayText};
  }

  .control::placeholder,
  :host(${interactivitySelector}:hover) .control::placeholder {
    color: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_6__.SystemColors.CanvasText};
  }

  :host(:not([disabled]):focus) ${logicalControlSelector} {
    ${_focus__WEBPACK_IMPORTED_MODULE_7__.focusTreatmentBase}
    outline-color: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_6__.SystemColors.Highlight};
  }

  :host([disabled]) {
    opacity: 1;
    color: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_6__.SystemColors.GrayText};
  }

  :host([disabled]) ::placeholder,
  :host([disabled]) ::-webkit-input-placeholder {
    color: ${_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_6__.SystemColors.GrayText};
  }
`;


/***/ }),

/***/ "./node_modules/@fluentui/web-components/dist/esm/styles/patterns/type-ramp.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/@fluentui/web-components/dist/esm/styles/patterns/type-ramp.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   typeRampBase: () => (/* binding */ typeRampBase),
/* harmony export */   typeRampMinus1: () => (/* binding */ typeRampMinus1),
/* harmony export */   typeRampMinus2: () => (/* binding */ typeRampMinus2),
/* harmony export */   typeRampPlus1: () => (/* binding */ typeRampPlus1),
/* harmony export */   typeRampPlus2: () => (/* binding */ typeRampPlus2),
/* harmony export */   typeRampPlus3: () => (/* binding */ typeRampPlus3),
/* harmony export */   typeRampPlus4: () => (/* binding */ typeRampPlus4),
/* harmony export */   typeRampPlus5: () => (/* binding */ typeRampPlus5),
/* harmony export */   typeRampPlus6: () => (/* binding */ typeRampPlus6)
/* harmony export */ });
/* harmony import */ var _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/fast-element */ "./node_modules/@microsoft/fast-element/dist/esm/styles/css.js");
/* harmony import */ var _design_tokens__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../design-tokens */ "./node_modules/@fluentui/web-components/dist/esm/design-tokens.js");


/** @public */
const typeRampBase = (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_0__.cssPartial) `
  font-family: ${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.bodyFont};
  font-size: ${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.typeRampBaseFontSize};
  line-height: ${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.typeRampBaseLineHeight};
  font-weight: initial;
  font-variation-settings: ${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.typeRampBaseFontVariations};
`;
/** @public */
const typeRampMinus1 = (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_0__.cssPartial) `
  font-family: ${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.bodyFont};
  font-size: ${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.typeRampMinus1FontSize};
  line-height: ${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.typeRampMinus1LineHeight};
  font-weight: initial;
  font-variation-settings: ${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.typeRampMinus1FontVariations};
`;
/** @public */
const typeRampMinus2 = (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_0__.cssPartial) `
  font-family: ${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.bodyFont};
  font-size: ${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.typeRampMinus2FontSize};
  line-height: ${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.typeRampMinus2LineHeight};
  font-weight: initial;
  font-variation-settings: ${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.typeRampMinus2FontVariations};
`;
/** @public */
const typeRampPlus1 = (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_0__.cssPartial) `
  font-family: ${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.bodyFont};
  font-size: ${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.typeRampPlus1FontSize};
  line-height: ${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.typeRampPlus1LineHeight};
  font-weight: initial;
  font-variation-settings: ${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.typeRampPlus1FontVariations};
`;
/** @public */
const typeRampPlus2 = (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_0__.cssPartial) `
  font-family: ${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.bodyFont};
  font-size: ${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.typeRampPlus2FontSize};
  line-height: ${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.typeRampPlus2LineHeight};
  font-weight: initial;
  font-variation-settings: ${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.typeRampPlus2FontVariations};
`;
/** @public */
const typeRampPlus3 = (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_0__.cssPartial) `
  font-family: ${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.bodyFont};
  font-size: ${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.typeRampPlus3FontSize};
  line-height: ${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.typeRampPlus3LineHeight};
  font-weight: initial;
  font-variation-settings: ${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.typeRampPlus3FontVariations};
`;
/** @public */
const typeRampPlus4 = (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_0__.cssPartial) `
  font-family: ${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.bodyFont};
  font-size: ${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.typeRampPlus4FontSize};
  line-height: ${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.typeRampPlus4LineHeight};
  font-weight: initial;
  font-variation-settings: ${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.typeRampPlus4FontVariations};
`;
/** @public */
const typeRampPlus5 = (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_0__.cssPartial) `
  font-family: ${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.bodyFont};
  font-size: ${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.typeRampPlus5FontSize};
  line-height: ${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.typeRampPlus5LineHeight};
  font-weight: initial;
  font-variation-settings: ${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.typeRampPlus5FontVariations};
`;
/** @public */
const typeRampPlus6 = (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_0__.cssPartial) `
  font-family: ${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.bodyFont};
  font-size: ${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.typeRampPlus6FontSize};
  line-height: ${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.typeRampPlus6LineHeight};
  font-weight: initial;
  font-variation-settings: ${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.typeRampPlus6FontVariations};
`;


/***/ }),

/***/ "./node_modules/@fluentui/web-components/dist/esm/styles/size.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@fluentui/web-components/dist/esm/styles/size.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   heightNumber: () => (/* binding */ heightNumber)
/* harmony export */ });
/* harmony import */ var _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/fast-element */ "./node_modules/@microsoft/fast-element/dist/esm/styles/css.js");
/* harmony import */ var _design_tokens__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../design-tokens */ "./node_modules/@fluentui/web-components/dist/esm/design-tokens.js");


/**
 * A formula to retrieve the control height.
 * Use this as the value of any CSS property that
 * accepts a pixel size.
 * @public
 */
const heightNumber = (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_0__.cssPartial) `(${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.baseHeightMultiplier} + ${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.density}) * ${_design_tokens__WEBPACK_IMPORTED_MODULE_1__.designUnit}`;


/***/ }),

/***/ "./node_modules/@fluentui/web-components/dist/esm/text-field/index.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@fluentui/web-components/dist/esm/text-field/index.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TextField: () => (/* binding */ TextField),
/* harmony export */   fluentTextField: () => (/* binding */ fluentTextField),
/* harmony export */   textFieldStyles: () => (/* binding */ textFieldStyles)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/fast-element */ "./node_modules/@microsoft/fast-element/dist/esm/components/attributes.js");
/* harmony import */ var _microsoft_fast_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/fast-foundation */ "./node_modules/@microsoft/fast-foundation/dist/esm/text-field/text-field.js");
/* harmony import */ var _microsoft_fast_foundation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/fast-foundation */ "./node_modules/@microsoft/fast-foundation/dist/esm/text-field/text-field.template.js");
/* harmony import */ var _text_field_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./text-field.styles */ "./node_modules/@fluentui/web-components/dist/esm/text-field/text-field.styles.js");




/**
 * The Fluent text field class
 * @internal
 */
class TextField extends _microsoft_fast_foundation__WEBPACK_IMPORTED_MODULE_0__.TextField {
    /**
     * @internal
     */
    appearanceChanged(oldValue, newValue) {
        if (oldValue !== newValue) {
            this.classList.add(newValue);
            this.classList.remove(oldValue);
        }
    }
    /**
     * @internal
     */
    connectedCallback() {
        super.connectedCallback();
        if (!this.appearance) {
            this.appearance = 'outline';
        }
    }
}
(0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_2__.attr
], TextField.prototype, "appearance", void 0);
/**
 * The Fluent Text Field Custom Element. Implements {@link @microsoft/fast-foundation#TextField},
 * {@link @microsoft/fast-foundation#textFieldTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-text-field\>
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/delegatesFocus | delegatesFocus}
 */
const fluentTextField = TextField.compose({
    baseName: 'text-field',
    baseClass: _microsoft_fast_foundation__WEBPACK_IMPORTED_MODULE_0__.TextField,
    template: _microsoft_fast_foundation__WEBPACK_IMPORTED_MODULE_3__.textFieldTemplate,
    styles: _text_field_styles__WEBPACK_IMPORTED_MODULE_4__.textFieldStyles,
    shadowOptions: {
        delegatesFocus: true,
    },
});
/**
 * Styles for TextField
 * @public
 */
const textFieldStyles = _text_field_styles__WEBPACK_IMPORTED_MODULE_4__.textFieldStyles;


/***/ }),

/***/ "./node_modules/@fluentui/web-components/dist/esm/text-field/text-field.styles.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/@fluentui/web-components/dist/esm/text-field/text-field.styles.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   textFieldStyles: () => (/* binding */ textFieldStyles)
/* harmony export */ });
/* harmony import */ var _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/fast-element */ "./node_modules/@microsoft/fast-element/dist/esm/styles/css.js");
/* harmony import */ var _microsoft_fast_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/fast-foundation */ "./node_modules/@microsoft/fast-foundation/dist/esm/utilities/style/display.js");
/* harmony import */ var _microsoft_fast_foundation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @microsoft/fast-foundation */ "./node_modules/@microsoft/fast-foundation/dist/esm/utilities/match-media-stylesheet-behavior.js");
/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../styles */ "./node_modules/@fluentui/web-components/dist/esm/styles/patterns/input.styles.js");
/* harmony import */ var _utilities_behaviors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utilities/behaviors */ "./node_modules/@fluentui/web-components/dist/esm/utilities/behaviors.js");
/* harmony import */ var _design_tokens__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../design-tokens */ "./node_modules/@fluentui/web-components/dist/esm/design-tokens.js");





const logicalControlSelector = '.root';
const textFieldStyles = (context, definition) => (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_0__.css) `
    ${(0,_microsoft_fast_foundation__WEBPACK_IMPORTED_MODULE_1__.display)('inline-block')}

    ${(0,_styles__WEBPACK_IMPORTED_MODULE_2__.baseInputStyles)(context, definition, logicalControlSelector)}

    ${(0,_styles__WEBPACK_IMPORTED_MODULE_2__.inputStateStyles)(context, definition, logicalControlSelector)}

    .root {
      display: flex;
      flex-direction: row;
    }

    .control {
      -webkit-appearance: none;
      color: inherit;
      background: transparent;
      border: 0;
      height: calc(100% - 4px);
      margin-top: auto;
      margin-bottom: auto;
      padding: 0 calc(${_design_tokens__WEBPACK_IMPORTED_MODULE_3__.designUnit} * 2px + 1px);
      font-family: inherit;
      font-size: inherit;
      line-height: inherit;
    }

    .start,
    .end {
      display: flex;
      margin: auto;
    }

    .start {
      display: flex;
      margin-inline-start: 11px;
    }

    .end {
      display: flex;
      margin-inline-end: 11px;
    }
  `.withBehaviors((0,_utilities_behaviors__WEBPACK_IMPORTED_MODULE_4__.appearanceBehavior)('outline', (0,_styles__WEBPACK_IMPORTED_MODULE_2__.inputOutlineStyles)(context, definition, logicalControlSelector)), (0,_utilities_behaviors__WEBPACK_IMPORTED_MODULE_4__.appearanceBehavior)('filled', (0,_styles__WEBPACK_IMPORTED_MODULE_2__.inputFilledStyles)(context, definition, logicalControlSelector)), (0,_microsoft_fast_foundation__WEBPACK_IMPORTED_MODULE_5__.forcedColorsStylesheetBehavior)((0,_styles__WEBPACK_IMPORTED_MODULE_2__.inputForcedColorStyles)(context, definition, logicalControlSelector)));


/***/ }),

/***/ "./node_modules/@fluentui/web-components/dist/esm/utilities/behaviors.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@fluentui/web-components/dist/esm/utilities/behaviors.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   appearanceBehavior: () => (/* binding */ appearanceBehavior)
/* harmony export */ });
/* harmony import */ var _microsoft_fast_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/fast-foundation */ "./node_modules/@microsoft/fast-foundation/dist/esm/utilities/property-stylesheet-behavior.js");

/**
 * Behavior that will conditionally apply a stylesheet based on the elements
 * appearance property
 *
 * @param value - The value of the appearance property
 * @param styles - The styles to be applied when condition matches
 *
 * @public
 */
function appearanceBehavior(value, styles) {
    return new _microsoft_fast_foundation__WEBPACK_IMPORTED_MODULE_0__.PropertyStyleSheetBehavior('appearance', value, styles);
}


/***/ }),

/***/ "./node_modules/@fluentui/web-components/dist/esm/utilities/type-ramp.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@fluentui/web-components/dist/esm/utilities/type-ramp.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StandardFontWeight: () => (/* binding */ StandardFontWeight)
/* harmony export */ });
/** @public */
const StandardFontWeight = {
    Thin: 100,
    ExtraLight: 200,
    Light: 300,
    Normal: 400,
    Medium: 500,
    SemiBold: 600,
    Bold: 700,
    ExtraBold: 800,
    Black: 900,
};


/***/ }),

/***/ "./node_modules/@microsoft/fast-colors/dist/color-blending.js":
/*!********************************************************************!*\
  !*** ./node_modules/@microsoft/fast-colors/dist/color-blending.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ColorBlendMode: () => (/* binding */ ColorBlendMode),
/* harmony export */   blend: () => (/* binding */ blend),
/* harmony export */   blendBurn: () => (/* binding */ blendBurn),
/* harmony export */   blendBurnChannel: () => (/* binding */ blendBurnChannel),
/* harmony export */   blendColor: () => (/* binding */ blendColor),
/* harmony export */   blendDarken: () => (/* binding */ blendDarken),
/* harmony export */   blendDarkenChannel: () => (/* binding */ blendDarkenChannel),
/* harmony export */   blendDodge: () => (/* binding */ blendDodge),
/* harmony export */   blendDodgeChannel: () => (/* binding */ blendDodgeChannel),
/* harmony export */   blendLighten: () => (/* binding */ blendLighten),
/* harmony export */   blendLightenChannel: () => (/* binding */ blendLightenChannel),
/* harmony export */   blendMultiply: () => (/* binding */ blendMultiply),
/* harmony export */   blendMultiplyChannel: () => (/* binding */ blendMultiplyChannel),
/* harmony export */   blendOverlay: () => (/* binding */ blendOverlay),
/* harmony export */   blendOverlayChannel: () => (/* binding */ blendOverlayChannel),
/* harmony export */   blendScreen: () => (/* binding */ blendScreen),
/* harmony export */   blendScreenChannel: () => (/* binding */ blendScreenChannel),
/* harmony export */   computeAlphaBlend: () => (/* binding */ computeAlphaBlend),
/* harmony export */   darkenViaLAB: () => (/* binding */ darkenViaLAB),
/* harmony export */   desaturateViaLCH: () => (/* binding */ desaturateViaLCH),
/* harmony export */   lightenViaLAB: () => (/* binding */ lightenViaLAB),
/* harmony export */   saturateViaLCH: () => (/* binding */ saturateViaLCH)
/* harmony export */ });
/* harmony import */ var _color_converters_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./color-converters.js */ "./node_modules/@microsoft/fast-colors/dist/color-converters.js");
/* harmony import */ var _color_hsl_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./color-hsl.js */ "./node_modules/@microsoft/fast-colors/dist/color-hsl.js");
/* harmony import */ var _color_lab_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./color-lab.js */ "./node_modules/@microsoft/fast-colors/dist/color-lab.js");
/* harmony import */ var _color_lch_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./color-lch.js */ "./node_modules/@microsoft/fast-colors/dist/color-lch.js");
/* harmony import */ var _color_rgba_64_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./color-rgba-64.js */ "./node_modules/@microsoft/fast-colors/dist/color-rgba-64.js");
/* harmony import */ var _math_utilities_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./math-utilities.js */ "./node_modules/@microsoft/fast-colors/dist/math-utilities.js");






/**
 * Saturate a color using LCH color space
 *
 * @remarks
 * The alpha channel of the input is ignored
 *
 * @public
 */
function saturateViaLCH(input, saturation, saturationConstant = 18) {
    const lch = (0,_color_converters_js__WEBPACK_IMPORTED_MODULE_0__.rgbToLCH)(input);
    let sat = lch.c + saturation * saturationConstant;
    if (sat < 0) {
        sat = 0;
    }
    return (0,_color_converters_js__WEBPACK_IMPORTED_MODULE_0__.lchToRGB)(new _color_lch_js__WEBPACK_IMPORTED_MODULE_1__.ColorLCH(lch.l, sat, lch.h));
}
/**
 * De-saturate a color using LCH color space
 *
 * @remarks
 * The alpha channel of the input is ignored
 *
 * @public
 */
function desaturateViaLCH(input, saturation, saturationConstant = 18) {
    return saturateViaLCH(input, -1 * saturation, saturationConstant);
}
/**
 * Darken a color using LAB color space
 *
 * @remarks
 * The alpha channel of the input is ignored
 *
 * @public
 */
function darkenViaLAB(input, amount, darkenConstant = 18) {
    const lab = (0,_color_converters_js__WEBPACK_IMPORTED_MODULE_0__.rgbToLAB)(input);
    const darkened = lab.l - amount * darkenConstant;
    return (0,_color_converters_js__WEBPACK_IMPORTED_MODULE_0__.labToRGB)(new _color_lab_js__WEBPACK_IMPORTED_MODULE_2__.ColorLAB(darkened, lab.a, lab.b));
}
/**
 * Lighten a color using LAB color space
 *
 * @remarks
 * The alpha channel of the input is ignored
 *
 * @public
 */
function lightenViaLAB(input, amount, darkenConstant = 18) {
    return darkenViaLAB(input, -1 * amount, darkenConstant);
}
/**
 * @public
 */
function blendBurnChannel(bottom, top) {
    if (top === 0.0) {
        // Despite the discontinuity, other sources seem to use 0.0 here instead of 1
        return 0.0;
    }
    return 1.0 - (1.0 - bottom) / top;
}
/**
 * Blends two colors with the burn mode
 *
 * @remarks
 * The alpha channel of the input is ignored
 *
 * @public
 */
function blendBurn(bottom, top) {
    return new _color_rgba_64_js__WEBPACK_IMPORTED_MODULE_3__.ColorRGBA64(blendBurnChannel(bottom.r, top.r), blendBurnChannel(bottom.g, top.g), blendBurnChannel(bottom.b, top.b), 1);
}
/**
 * Blends two colors
 *
 * @remarks
 * The alpha channel of the input is ignored
 *
 * @public
 */
function blendColor(bottom, top) {
    const bottomHSL = (0,_color_converters_js__WEBPACK_IMPORTED_MODULE_0__.rgbToHSL)(bottom);
    const topHSL = (0,_color_converters_js__WEBPACK_IMPORTED_MODULE_0__.rgbToHSL)(top);
    if (topHSL.s === 0) {
        return new _color_rgba_64_js__WEBPACK_IMPORTED_MODULE_3__.ColorRGBA64(bottomHSL.l, bottomHSL.l, bottomHSL.l, 1);
    }
    return (0,_color_converters_js__WEBPACK_IMPORTED_MODULE_0__.hslToRGB)(new _color_hsl_js__WEBPACK_IMPORTED_MODULE_4__.ColorHSL(topHSL.h, topHSL.s, bottomHSL.l));
}
/**
 * @public
 */
function blendDarkenChannel(bottom, top) {
    return Math.min(bottom, top);
}
/**
 * Blends two colors with the darken mode
 *
 * @remarks
 * The alpha channel of the input is ignored
 *
 * @public
 */
function blendDarken(bottom, top) {
    return new _color_rgba_64_js__WEBPACK_IMPORTED_MODULE_3__.ColorRGBA64(blendDarkenChannel(bottom.r, top.r), blendDarkenChannel(bottom.g, top.g), blendDarkenChannel(bottom.b, top.b), 1);
}
/**
 * @public
 */
function blendDodgeChannel(bottom, top) {
    if (top >= 1.0) {
        return 1.0;
    }
    const retVal = bottom / (1.0 - top);
    if (retVal >= 1.0) {
        return 1.0;
    }
    return retVal;
}
/**
 * Blends two colors with the dodge mode
 *
 * @remarks
 * The alpha channel of the input is ignored
 *
 * @public
 */
function blendDodge(bottom, top) {
    return new _color_rgba_64_js__WEBPACK_IMPORTED_MODULE_3__.ColorRGBA64(blendDodgeChannel(bottom.r, top.r), blendDodgeChannel(bottom.g, top.g), blendDodgeChannel(bottom.b, top.b), 1);
}
/**
 * @public
 */
function blendLightenChannel(bottom, top) {
    return Math.max(bottom, top);
}
/**
 * Blends two colors with the lighten mode
 *
 * @remarks
 * The alpha channel of the input is ignored
 *
 * @public
 */
function blendLighten(bottom, top) {
    return new _color_rgba_64_js__WEBPACK_IMPORTED_MODULE_3__.ColorRGBA64(blendLightenChannel(bottom.r, top.r), blendLightenChannel(bottom.g, top.g), blendLightenChannel(bottom.b, top.b), 1);
}
/**
 * @public
 */
function blendMultiplyChannel(bottom, top) {
    return bottom * top;
}
/**
 * Blends two colors with the multiply mode
 *
 * @remarks
 * The alpha channel of the input is ignored
 *
 * @public
 */
function blendMultiply(bottom, top) {
    return new _color_rgba_64_js__WEBPACK_IMPORTED_MODULE_3__.ColorRGBA64(blendMultiplyChannel(bottom.r, top.r), blendMultiplyChannel(bottom.g, top.g), blendMultiplyChannel(bottom.b, top.b), 1);
}
/**
 * @public
 */
function blendOverlayChannel(bottom, top) {
    if (bottom < 0.5) {
        return (0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_5__.clamp)(2.0 * top * bottom, 0, 1);
    }
    return (0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_5__.clamp)(1.0 - 2.0 * (1.0 - top) * (1.0 - bottom), 0, 1);
}
/**
 * Blends two colors with the overlay mode
 *
 * @remarks
 * The alpha channel of the input is ignored
 *
 * @public
 */
function blendOverlay(bottom, top) {
    return new _color_rgba_64_js__WEBPACK_IMPORTED_MODULE_3__.ColorRGBA64(blendOverlayChannel(bottom.r, top.r), blendOverlayChannel(bottom.g, top.g), blendOverlayChannel(bottom.b, top.b), 1);
}
/**
 * @public
 */
function blendScreenChannel(bottom, top) {
    return 1.0 - (1.0 - top) * (1.0 - bottom);
}
/**
 * Blends two colors with the screen mode
 *
 * @remarks
 * The alpha channel of the input is ignored
 *
 * @public
 */
function blendScreen(bottom, top) {
    return new _color_rgba_64_js__WEBPACK_IMPORTED_MODULE_3__.ColorRGBA64(blendScreenChannel(bottom.r, top.r), blendScreenChannel(bottom.g, top.g), blendScreenChannel(bottom.b, top.b), 1);
}
/**
 * Color blend modes.
 * @public
 */
var ColorBlendMode;
(function (ColorBlendMode) {
    ColorBlendMode[ColorBlendMode["Burn"] = 0] = "Burn";
    ColorBlendMode[ColorBlendMode["Color"] = 1] = "Color";
    ColorBlendMode[ColorBlendMode["Darken"] = 2] = "Darken";
    ColorBlendMode[ColorBlendMode["Dodge"] = 3] = "Dodge";
    ColorBlendMode[ColorBlendMode["Lighten"] = 4] = "Lighten";
    ColorBlendMode[ColorBlendMode["Multiply"] = 5] = "Multiply";
    ColorBlendMode[ColorBlendMode["Overlay"] = 6] = "Overlay";
    ColorBlendMode[ColorBlendMode["Screen"] = 7] = "Screen";
})(ColorBlendMode || (ColorBlendMode = {}));
/**
 * Blend two colors.
 *
 * @remarks
 * The alpha channel of the input is ignored
 *
 * @public
 */
function blend(mode, bottom, top) {
    switch (mode) {
        case ColorBlendMode.Burn:
            return blendBurn(bottom, top);
        case ColorBlendMode.Color:
            return blendColor(bottom, top);
        case ColorBlendMode.Darken:
            return blendDarken(bottom, top);
        case ColorBlendMode.Dodge:
            return blendDodge(bottom, top);
        case ColorBlendMode.Lighten:
            return blendLighten(bottom, top);
        case ColorBlendMode.Multiply:
            return blendMultiply(bottom, top);
        case ColorBlendMode.Overlay:
            return blendOverlay(bottom, top);
        case ColorBlendMode.Screen:
            return blendScreen(bottom, top);
        default:
            throw new Error("Unknown blend mode");
    }
}
/**
 * Alpha channel of bottom is ignored
 * The returned color always has an alpha channel of 1
 * Different programs (eg: paint.net, photoshop) will give different answers than this occasionally but within +/- 1/255 in each channel. Just depends on the details of how they round off decimals
 *
 * @public
 */
function computeAlphaBlend(bottom, top) {
    if (top.a >= 1) {
        return top;
    }
    else if (top.a <= 0) {
        return new _color_rgba_64_js__WEBPACK_IMPORTED_MODULE_3__.ColorRGBA64(bottom.r, bottom.g, bottom.b, 1);
    }
    const r = top.a * top.r + (1 - top.a) * bottom.r;
    const g = top.a * top.g + (1 - top.a) * bottom.g;
    const b = top.a * top.b + (1 - top.a) * bottom.b;
    return new _color_rgba_64_js__WEBPACK_IMPORTED_MODULE_3__.ColorRGBA64(r, g, b, 1);
}


/***/ }),

/***/ "./node_modules/@microsoft/fast-colors/dist/color-converters.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@microsoft/fast-colors/dist/color-converters.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   calculateOverlayColor: () => (/* binding */ calculateOverlayColor),
/* harmony export */   contrastRatio: () => (/* binding */ contrastRatio),
/* harmony export */   hslToRGB: () => (/* binding */ hslToRGB),
/* harmony export */   hsvToRGB: () => (/* binding */ hsvToRGB),
/* harmony export */   labToLCH: () => (/* binding */ labToLCH),
/* harmony export */   labToRGB: () => (/* binding */ labToRGB),
/* harmony export */   labToXYZ: () => (/* binding */ labToXYZ),
/* harmony export */   lchToLAB: () => (/* binding */ lchToLAB),
/* harmony export */   lchToRGB: () => (/* binding */ lchToRGB),
/* harmony export */   rgbToHSL: () => (/* binding */ rgbToHSL),
/* harmony export */   rgbToHSV: () => (/* binding */ rgbToHSV),
/* harmony export */   rgbToLAB: () => (/* binding */ rgbToLAB),
/* harmony export */   rgbToLCH: () => (/* binding */ rgbToLCH),
/* harmony export */   rgbToLinearLuminance: () => (/* binding */ rgbToLinearLuminance),
/* harmony export */   rgbToRelativeLuminance: () => (/* binding */ rgbToRelativeLuminance),
/* harmony export */   rgbToTemperature: () => (/* binding */ rgbToTemperature),
/* harmony export */   rgbToXYZ: () => (/* binding */ rgbToXYZ),
/* harmony export */   temperatureToRGB: () => (/* binding */ temperatureToRGB),
/* harmony export */   xyzToLAB: () => (/* binding */ xyzToLAB),
/* harmony export */   xyzToRGB: () => (/* binding */ xyzToRGB)
/* harmony export */ });
/* harmony import */ var _color_hsl_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./color-hsl.js */ "./node_modules/@microsoft/fast-colors/dist/color-hsl.js");
/* harmony import */ var _color_hsv_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./color-hsv.js */ "./node_modules/@microsoft/fast-colors/dist/color-hsv.js");
/* harmony import */ var _color_lab_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./color-lab.js */ "./node_modules/@microsoft/fast-colors/dist/color-lab.js");
/* harmony import */ var _color_lch_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./color-lch.js */ "./node_modules/@microsoft/fast-colors/dist/color-lch.js");
/* harmony import */ var _color_rgba_64_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./color-rgba-64.js */ "./node_modules/@microsoft/fast-colors/dist/color-rgba-64.js");
/* harmony import */ var _color_xyz_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./color-xyz.js */ "./node_modules/@microsoft/fast-colors/dist/color-xyz.js");
/* harmony import */ var _math_utilities_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./math-utilities.js */ "./node_modules/@microsoft/fast-colors/dist/math-utilities.js");







// All hue values are in degrees rather than radians or normalized
// All conversions use the D65 2 degree white point for XYZ
// Info on conversions and constants used can be found in the following:
// https://en.wikipedia.org/wiki/CIELAB_color_space
// https://en.wikipedia.org/wiki/Illuminant_D65
// https://ninedegreesbelow.com/photography/xyz-rgb.html
// http://user.engineering.uiowa.edu/~aip/Misc/ColorFAQ.html
// https://web.stanford.edu/~sujason/ColorBalancing/adaptation.html
// http://brucelindbloom.com/index.html
/**
 * Get the luminance of a color in the linear RGB space.
 * This is not the same as the relative luminance in the sRGB space for WCAG contrast calculations. Use rgbToRelativeLuminance instead.
 * @param rgb - The input color
 *
 * @public
 */
function rgbToLinearLuminance(rgb) {
    return rgb.r * 0.2126 + rgb.g * 0.7152 + rgb.b * 0.0722;
}
/**
 * Get the relative luminance of a color.
 * Adjusts the color to sRGB space, which is necessary for the WCAG contrast spec.
 * The alpha channel of the input is ignored.
 * @param rgb - The input color
 *
 * @public
 */
function rgbToRelativeLuminance(rgb) {
    function luminanceHelper(i) {
        if (i <= 0.03928) {
            return i / 12.92;
        }
        return Math.pow((i + 0.055) / 1.055, 2.4);
    }
    return rgbToLinearLuminance(new _color_rgba_64_js__WEBPACK_IMPORTED_MODULE_0__.ColorRGBA64(luminanceHelper(rgb.r), luminanceHelper(rgb.g), luminanceHelper(rgb.b), 1));
}
const calculateContrastRatio = (a, b) => (a + 0.05) / (b + 0.05);
/**
 * Calculate the contrast ratio between two colors. Uses the formula described by {@link https://www.w3.org/TR/WCAG20-TECHS/G17.html | WCAG 2.0}.
 *
 * @remarks
 * The alpha channel of the input is ignored
 *
 * @public
 */
function contrastRatio(a, b) {
    const luminanceA = rgbToRelativeLuminance(a);
    const luminanceB = rgbToRelativeLuminance(b);
    return luminanceA > luminanceB
        ? calculateContrastRatio(luminanceA, luminanceB)
        : calculateContrastRatio(luminanceB, luminanceA);
}
function calcChannelOverlay(match, background, overlay) {
    if (overlay - background === 0) {
        return 0;
    }
    else {
        return (match - background) / (overlay - background);
    }
}
function calcRgbOverlay(rgbMatch, rgbBackground, rgbOverlay) {
    const rChannel = calcChannelOverlay(rgbMatch.r, rgbBackground.r, rgbOverlay.r);
    const gChannel = calcChannelOverlay(rgbMatch.g, rgbBackground.g, rgbOverlay.g);
    const bChannel = calcChannelOverlay(rgbMatch.b, rgbBackground.b, rgbOverlay.b);
    return (rChannel + gChannel + bChannel) / 3;
}
/**
 * Calculate an overlay color that uses rgba (rgb + alpha) that matches the appearance of a given solid color when placed on the same background
 * @param rgbMatch - The solid color the overlay should match in appearance when placed over the rgbBackground
 * @param rgbBackground - The background on which the overlay rests
 * @param rgbOverlay - The rgb color of the overlay. Typically this is either pure white or pure black and when not provided will be determined automatically. This color will be used in the returned output
 * @returns The rgba (rgb + alpha) color of the overlay
 *
 * @public
 */
function calculateOverlayColor(rgbMatch, rgbBackground, rgbOverlay = null) {
    let alpha = 0;
    let overlay = rgbOverlay;
    if (overlay !== null) {
        alpha = calcRgbOverlay(rgbMatch, rgbBackground, overlay);
    }
    else {
        overlay = new _color_rgba_64_js__WEBPACK_IMPORTED_MODULE_0__.ColorRGBA64(0, 0, 0, 1);
        alpha = calcRgbOverlay(rgbMatch, rgbBackground, overlay);
        if (alpha <= 0) {
            overlay = new _color_rgba_64_js__WEBPACK_IMPORTED_MODULE_0__.ColorRGBA64(1, 1, 1, 1);
            alpha = calcRgbOverlay(rgbMatch, rgbBackground, overlay);
        }
    }
    alpha = Math.round(alpha * 1000) / 1000;
    return new _color_rgba_64_js__WEBPACK_IMPORTED_MODULE_0__.ColorRGBA64(overlay.r, overlay.g, overlay.b, alpha);
}
/**
 * Converts a {@link @microsoft/fast-colors#ColorRGBA64} to a {@link @microsoft/fast-colors#ColorHSL}
 * @param rgb - the rgb color to convert
 *
 * @remarks
 * The alpha channel of the input is ignored
 *
 * @public
 */
function rgbToHSL(rgb) {
    const max = Math.max(rgb.r, rgb.g, rgb.b);
    const min = Math.min(rgb.r, rgb.g, rgb.b);
    const delta = max - min;
    let hue = 0;
    if (delta !== 0) {
        if (max === rgb.r) {
            hue = 60 * (((rgb.g - rgb.b) / delta) % 6);
        }
        else if (max === rgb.g) {
            hue = 60 * ((rgb.b - rgb.r) / delta + 2);
        }
        else {
            hue = 60 * ((rgb.r - rgb.g) / delta + 4);
        }
    }
    if (hue < 0) {
        hue += 360;
    }
    const lum = (max + min) / 2;
    let sat = 0;
    if (delta !== 0) {
        sat = delta / (1 - Math.abs(2 * lum - 1));
    }
    return new _color_hsl_js__WEBPACK_IMPORTED_MODULE_1__.ColorHSL(hue, sat, lum);
}
/**
 * Converts a {@link @microsoft/fast-colors#ColorHSL} to a {@link @microsoft/fast-colors#ColorRGBA64}
 * @param hsl - the hsl color to convert
 * @param alpha - the alpha value
 *
 * @public
 */
function hslToRGB(hsl, alpha = 1) {
    const c = (1 - Math.abs(2 * hsl.l - 1)) * hsl.s;
    const x = c * (1 - Math.abs(((hsl.h / 60) % 2) - 1));
    const m = hsl.l - c / 2;
    let r = 0;
    let g = 0;
    let b = 0;
    if (hsl.h < 60) {
        r = c;
        g = x;
        b = 0;
    }
    else if (hsl.h < 120) {
        r = x;
        g = c;
        b = 0;
    }
    else if (hsl.h < 180) {
        r = 0;
        g = c;
        b = x;
    }
    else if (hsl.h < 240) {
        r = 0;
        g = x;
        b = c;
    }
    else if (hsl.h < 300) {
        r = x;
        g = 0;
        b = c;
    }
    else if (hsl.h < 360) {
        r = c;
        g = 0;
        b = x;
    }
    return new _color_rgba_64_js__WEBPACK_IMPORTED_MODULE_0__.ColorRGBA64(r + m, g + m, b + m, alpha);
}
/**
 * Converts a {@link @microsoft/fast-colors#ColorRGBA64} to a {@link @microsoft/fast-colors#ColorHSV}
 * @param rgb - the rgb color to convert
 *
 * @remarks
 * The alpha channel of the input is ignored
 *
 * @public
 */
function rgbToHSV(rgb) {
    const max = Math.max(rgb.r, rgb.g, rgb.b);
    const min = Math.min(rgb.r, rgb.g, rgb.b);
    const delta = max - min;
    let hue = 0;
    if (delta !== 0) {
        if (max === rgb.r) {
            hue = 60 * (((rgb.g - rgb.b) / delta) % 6);
        }
        else if (max === rgb.g) {
            hue = 60 * ((rgb.b - rgb.r) / delta + 2);
        }
        else {
            hue = 60 * ((rgb.r - rgb.g) / delta + 4);
        }
    }
    if (hue < 0) {
        hue += 360;
    }
    let sat = 0;
    if (max !== 0) {
        sat = delta / max;
    }
    return new _color_hsv_js__WEBPACK_IMPORTED_MODULE_2__.ColorHSV(hue, sat, max);
}
/**
 * Converts a {@link @microsoft/fast-colors#ColorHSV} to a {@link @microsoft/fast-colors#ColorRGBA64}
 * @param hsv - the hsv color to convert
 * @param alpha - the alpha value
 *
 * @public
 */
function hsvToRGB(hsv, alpha = 1) {
    const c = hsv.s * hsv.v;
    const x = c * (1 - Math.abs(((hsv.h / 60) % 2) - 1));
    const m = hsv.v - c;
    let r = 0;
    let g = 0;
    let b = 0;
    if (hsv.h < 60) {
        r = c;
        g = x;
        b = 0;
    }
    else if (hsv.h < 120) {
        r = x;
        g = c;
        b = 0;
    }
    else if (hsv.h < 180) {
        r = 0;
        g = c;
        b = x;
    }
    else if (hsv.h < 240) {
        r = 0;
        g = x;
        b = c;
    }
    else if (hsv.h < 300) {
        r = x;
        g = 0;
        b = c;
    }
    else if (hsv.h < 360) {
        r = c;
        g = 0;
        b = x;
    }
    return new _color_rgba_64_js__WEBPACK_IMPORTED_MODULE_0__.ColorRGBA64(r + m, g + m, b + m, alpha);
}
/**
 * Converts a {@link @microsoft/fast-colors#ColorLCH} to a {@link @microsoft/fast-colors#ColorLAB}
 * @param lch - the lch color to convert
 *
 * @public
 */
function lchToLAB(lch) {
    let a = 0;
    let b = 0;
    if (lch.h !== 0) {
        a = Math.cos((0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_3__.degreesToRadians)(lch.h)) * lch.c;
        b = Math.sin((0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_3__.degreesToRadians)(lch.h)) * lch.c;
    }
    return new _color_lab_js__WEBPACK_IMPORTED_MODULE_4__.ColorLAB(lch.l, a, b);
}
/**
 * Converts a {@link @microsoft/fast-colors#ColorLAB} to a {@link @microsoft/fast-colors#ColorLCH}
 * @param lab - the lab color to convert
 *
 * @remarks
 * The discontinuity in the C parameter at 0 means that floating point errors will often result in values near 0 giving unpredictable results.
 * EG: 0.0000001 gives a very different result than -0.0000001
 * In cases where both a and b are very near zero this function will return an LCH color with an H of 0
 * More info about the atan2 function: {@link https://en.wikipedia.org/wiki/Atan2}
 * @public
 */
function labToLCH(lab) {
    let h = 0;
    // Because of the discontinuity at 0 if a number is very close to 0 - often due to floating point errors - then
    // it gives unexpected results. EG: 0.000000000001 gives a different result than 0. So just avoid any number
    // that has both a and b very close to zero and lump it in with the h = 0 case.
    if (Math.abs(lab.b) > 0.001 || Math.abs(lab.a) > 0.001) {
        h = (0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_3__.radiansToDegrees)(Math.atan2(lab.b, lab.a));
    }
    if (h < 0) {
        h += 360;
    }
    const c = Math.sqrt(lab.a * lab.a + lab.b * lab.b);
    return new _color_lch_js__WEBPACK_IMPORTED_MODULE_5__.ColorLCH(lab.l, c, h);
}
/**
 * Converts a {@link @microsoft/fast-colors#ColorLAB} to a {@link @microsoft/fast-colors#ColorXYZ}
 * @param lab - the lab color to convert
 *
 * @public
 */
function labToXYZ(lab) {
    const fy = (lab.l + 16) / 116;
    const fx = fy + lab.a / 500;
    const fz = fy - lab.b / 200;
    const xcubed = Math.pow(fx, 3);
    const ycubed = Math.pow(fy, 3);
    const zcubed = Math.pow(fz, 3);
    let x = 0;
    if (xcubed > _color_lab_js__WEBPACK_IMPORTED_MODULE_4__.ColorLAB.epsilon) {
        x = xcubed;
    }
    else {
        x = (116 * fx - 16) / _color_lab_js__WEBPACK_IMPORTED_MODULE_4__.ColorLAB.kappa;
    }
    let y = 0;
    if (lab.l > _color_lab_js__WEBPACK_IMPORTED_MODULE_4__.ColorLAB.epsilon * _color_lab_js__WEBPACK_IMPORTED_MODULE_4__.ColorLAB.kappa) {
        y = ycubed;
    }
    else {
        y = lab.l / _color_lab_js__WEBPACK_IMPORTED_MODULE_4__.ColorLAB.kappa;
    }
    let z = 0;
    if (zcubed > _color_lab_js__WEBPACK_IMPORTED_MODULE_4__.ColorLAB.epsilon) {
        z = zcubed;
    }
    else {
        z = (116 * fz - 16) / _color_lab_js__WEBPACK_IMPORTED_MODULE_4__.ColorLAB.kappa;
    }
    x = _color_xyz_js__WEBPACK_IMPORTED_MODULE_6__.ColorXYZ.whitePoint.x * x;
    y = _color_xyz_js__WEBPACK_IMPORTED_MODULE_6__.ColorXYZ.whitePoint.y * y;
    z = _color_xyz_js__WEBPACK_IMPORTED_MODULE_6__.ColorXYZ.whitePoint.z * z;
    return new _color_xyz_js__WEBPACK_IMPORTED_MODULE_6__.ColorXYZ(x, y, z);
}
/**
 * Converts a {@link @microsoft/fast-colors#ColorXYZ} to a {@link @microsoft/fast-colors#ColorLAB}
 * @param xyz - the xyz color to convert
 *
 * @public
 */
function xyzToLAB(xyz) {
    function xyzToLABHelper(i) {
        if (i > _color_lab_js__WEBPACK_IMPORTED_MODULE_4__.ColorLAB.epsilon) {
            return Math.pow(i, 1 / 3);
        }
        return (_color_lab_js__WEBPACK_IMPORTED_MODULE_4__.ColorLAB.kappa * i + 16) / 116;
    }
    const x = xyzToLABHelper(xyz.x / _color_xyz_js__WEBPACK_IMPORTED_MODULE_6__.ColorXYZ.whitePoint.x);
    const y = xyzToLABHelper(xyz.y / _color_xyz_js__WEBPACK_IMPORTED_MODULE_6__.ColorXYZ.whitePoint.y);
    const z = xyzToLABHelper(xyz.z / _color_xyz_js__WEBPACK_IMPORTED_MODULE_6__.ColorXYZ.whitePoint.z);
    const l = 116 * y - 16;
    const a = 500 * (x - y);
    const b = 200 * (y - z);
    return new _color_lab_js__WEBPACK_IMPORTED_MODULE_4__.ColorLAB(l, a, b);
}
/**
 * Converts a {@link @microsoft/fast-colors#ColorRGBA64} to a {@link @microsoft/fast-colors#ColorXYZ}
 * @param rgb - the rgb color to convert
 *
 * @remarks
 * The alpha channel of the input is ignored
 * @public
 */
function rgbToXYZ(rgb) {
    function rgbToXYZHelper(i) {
        if (i <= 0.04045) {
            return i / 12.92;
        }
        return Math.pow((i + 0.055) / 1.055, 2.4);
    }
    const r = rgbToXYZHelper(rgb.r);
    const g = rgbToXYZHelper(rgb.g);
    const b = rgbToXYZHelper(rgb.b);
    const x = r * 0.4124564 + g * 0.3575761 + b * 0.1804375;
    const y = r * 0.2126729 + g * 0.7151522 + b * 0.072175;
    const z = r * 0.0193339 + g * 0.119192 + b * 0.9503041;
    return new _color_xyz_js__WEBPACK_IMPORTED_MODULE_6__.ColorXYZ(x, y, z);
}
/**
 * Converts a {@link @microsoft/fast-colors#ColorXYZ} to a {@link @microsoft/fast-colors#ColorRGBA64}
 * @param xyz - the xyz color to convert
 * @param alpha - the alpha value
 *
 * @remarks
 * Note that the xyz color space is significantly larger than sRGB. As such, this can return colors rgb values greater than 1 or less than 0
 * @public
 */
function xyzToRGB(xyz, alpha = 1) {
    function xyzToRGBHelper(i) {
        if (i <= 0.0031308) {
            return i * 12.92;
        }
        return 1.055 * Math.pow(i, 1 / 2.4) - 0.055;
    }
    const r = xyzToRGBHelper(xyz.x * 3.2404542 - xyz.y * 1.5371385 - xyz.z * 0.4985314);
    const g = xyzToRGBHelper(xyz.x * -0.969266 + xyz.y * 1.8760108 + xyz.z * 0.041556);
    const b = xyzToRGBHelper(xyz.x * 0.0556434 - xyz.y * 0.2040259 + xyz.z * 1.0572252);
    return new _color_rgba_64_js__WEBPACK_IMPORTED_MODULE_0__.ColorRGBA64(r, g, b, alpha);
}
/**
 * Converts a {@link @microsoft/fast-colors#ColorRGBA64} to a {@link @microsoft/fast-colors#ColorLAB}
 * @param rgb - the rgb color to convert
 *
 * @remarks
 * The alpha channel of the input is ignored
 *
 * @public
 */
function rgbToLAB(rgb) {
    return xyzToLAB(rgbToXYZ(rgb));
}
/**
 * Converts a {@link @microsoft/fast-colors#ColorLAB} to a {@link @microsoft/fast-colors#ColorRGBA64}
 * @param lab - the LAB color to convert
 * @param alpha - the alpha value
 *
 * @remarks
 * Note that the xyz color space (which the conversion from LAB uses) is significantly larger than sRGB. As such, this can return colors rgb values greater than 1 or less than 0
 *
 * @public
 */
function labToRGB(lab, alpha = 1) {
    return xyzToRGB(labToXYZ(lab), alpha);
}
/**
 * Convert a {@link @microsoft/fast-colors#ColorRGBA64} to a {@link @microsoft/fast-colors#ColorLCH}
 *
 * @param rgb - the rgb color to convert
 *
 * @remarks
 * The alpha channel of the input is ignored
 *
 * @public
 */
function rgbToLCH(rgb) {
    return labToLCH(rgbToLAB(rgb));
}
/**
 * Convert a {@link @microsoft/fast-colors#ColorLCH} to a {@link @microsoft/fast-colors#ColorRGBA64}
 * @param lch - the LCH color to convert
 * @param alpha - the alpha value
 *
 * @public
 */
function lchToRGB(lch, alpha = 1) {
    return labToRGB(lchToLAB(lch), alpha);
}
/**
 * Converts a color temperature to a {@link @microsoft/fast-colors#ColorRGBA64}
 * @param tempKelvin - the temperature to convert
 * @param alpha - the alpha value
 *
 * @public
 */
function temperatureToRGB(tempKelvin, alpha = 1) {
    // The constants I could find assumed a decimal range of [0,255] for each channel. Just going to put a /255.0 at the end
    let r = 0;
    let g = 0;
    let b = 0;
    if (tempKelvin <= 1000) {
        tempKelvin = 1000;
    }
    else if (tempKelvin >= 40000) {
        tempKelvin = 40000;
    }
    if (tempKelvin < 6600.0) {
        r = 255.0;
        g = tempKelvin / 100.0 - 2.0;
        g =
            -155.25485562709179 -
                0.44596950469579133 * g +
                104.49216199393888 * Math.log(g);
    }
    else {
        r = tempKelvin / 100.0 - 55.0;
        r = 351.97690566805693 + 0.114206453784165 * r - 40.25366309332127 * Math.log(r);
        g = tempKelvin / 100.0 - 50.0;
        g = 325.4494125711974 + 0.07943456536662342 * g - 28.0852963507957 * Math.log(g);
    }
    if (tempKelvin >= 6600.0) {
        b = 255.0;
    }
    else if (tempKelvin < 2000.0) {
        b = 0.0;
    }
    else {
        b = tempKelvin / 100.0 - 10;
        b =
            -254.76935184120902 +
                0.8274096064007395 * b +
                115.67994401066147 * Math.log(b);
    }
    return new _color_rgba_64_js__WEBPACK_IMPORTED_MODULE_0__.ColorRGBA64(r / 255, g / 255, b / 255, alpha);
}
/**
 * Convert a rgb color to a color temperature
 * @param rgb - the color to convert
 *
 * @remarks
 * The alpha channel of the input is ignored
 *
 * @public
 */
function rgbToTemperature(rgb) {
    let t = 0;
    let min = 1000;
    let max = 40000;
    while (max - min > 0.4) {
        t = (max + min) / 2.0;
        const testColor = temperatureToRGB(t);
        if (testColor.b / testColor.r >= rgb.b / rgb.r) {
            max = t;
        }
        else {
            min = t;
        }
    }
    return Math.round(t);
}


/***/ }),

/***/ "./node_modules/@microsoft/fast-colors/dist/color-hsl.js":
/*!***************************************************************!*\
  !*** ./node_modules/@microsoft/fast-colors/dist/color-hsl.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ColorHSL: () => (/* binding */ ColorHSL)
/* harmony export */ });
/* harmony import */ var _math_utilities_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math-utilities.js */ "./node_modules/@microsoft/fast-colors/dist/math-utilities.js");

/**
 * This uses Hue values in "degree" format. So expect a range of [0,360]. Some other implementations instead uses radians or a normalized Hue with range [0,1]. Be aware of this when checking values or using other libraries.
 *
 * @public
 */
class ColorHSL {
    constructor(hue, sat, lum) {
        this.h = hue;
        this.s = sat;
        this.l = lum;
    }
    /**
     * Construct a {@link ColorHSL} from a config object.
     */
    static fromObject(data) {
        if (data && !isNaN(data.h) && !isNaN(data.s) && !isNaN(data.l)) {
            return new ColorHSL(data.h, data.s, data.l);
        }
        return null;
    }
    /**
     * Determines if a color is equal to another
     * @param rhs - the value to compare
     */
    equalValue(rhs) {
        return this.h === rhs.h && this.s === rhs.s && this.l === rhs.l;
    }
    /**
     * Returns a new {@link ColorHSL} rounded to the provided precision
     * @param precision - the precision to round to
     */
    roundToPrecision(precision) {
        return new ColorHSL((0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_0__.roundToPrecisionSmall)(this.h, precision), (0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_0__.roundToPrecisionSmall)(this.s, precision), (0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_0__.roundToPrecisionSmall)(this.l, precision));
    }
    /**
     * Returns the {@link ColorHSL} formatted as an object.
     */
    toObject() {
        return { h: this.h, s: this.s, l: this.l };
    }
}


/***/ }),

/***/ "./node_modules/@microsoft/fast-colors/dist/color-hsv.js":
/*!***************************************************************!*\
  !*** ./node_modules/@microsoft/fast-colors/dist/color-hsv.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ColorHSV: () => (/* binding */ ColorHSV)
/* harmony export */ });
/* harmony import */ var _math_utilities_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math-utilities.js */ "./node_modules/@microsoft/fast-colors/dist/math-utilities.js");

/**
 * This uses Hue values in "degree" format. So expect a range of [0,360]. Some other implementations instead uses radians or a normalized Hue with range [0,1]. Be aware of this when checking values or using other libraries.
 *
 * @public
 */
class ColorHSV {
    constructor(hue, sat, val) {
        this.h = hue;
        this.s = sat;
        this.v = val;
    }
    /**
     * Construct a {@link ColorHSV} from a config object.
     */
    static fromObject(data) {
        if (data && !isNaN(data.h) && !isNaN(data.s) && !isNaN(data.v)) {
            return new ColorHSV(data.h, data.s, data.v);
        }
        return null;
    }
    /**
     * Determines if a color is equal to another
     * @param rhs - the value to compare
     */
    equalValue(rhs) {
        return this.h === rhs.h && this.s === rhs.s && this.v === rhs.v;
    }
    /**
     * Returns a new {@link ColorHSV} rounded to the provided precision
     * @param precision - the precision to round to
     */
    roundToPrecision(precision) {
        return new ColorHSV((0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_0__.roundToPrecisionSmall)(this.h, precision), (0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_0__.roundToPrecisionSmall)(this.s, precision), (0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_0__.roundToPrecisionSmall)(this.v, precision));
    }
    /**
     * Returns the {@link ColorHSV} formatted as an object.
     */
    toObject() {
        return { h: this.h, s: this.s, v: this.v };
    }
}


/***/ }),

/***/ "./node_modules/@microsoft/fast-colors/dist/color-interpolation.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@microsoft/fast-colors/dist/color-interpolation.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ColorInterpolationSpace: () => (/* binding */ ColorInterpolationSpace),
/* harmony export */   interpolateByColorSpace: () => (/* binding */ interpolateByColorSpace),
/* harmony export */   interpolateHSL: () => (/* binding */ interpolateHSL),
/* harmony export */   interpolateHSV: () => (/* binding */ interpolateHSV),
/* harmony export */   interpolateLAB: () => (/* binding */ interpolateLAB),
/* harmony export */   interpolateLCH: () => (/* binding */ interpolateLCH),
/* harmony export */   interpolateRGB: () => (/* binding */ interpolateRGB),
/* harmony export */   interpolateXYZ: () => (/* binding */ interpolateXYZ)
/* harmony export */ });
/* harmony import */ var _color_converters_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./color-converters.js */ "./node_modules/@microsoft/fast-colors/dist/color-converters.js");
/* harmony import */ var _color_hsl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./color-hsl.js */ "./node_modules/@microsoft/fast-colors/dist/color-hsl.js");
/* harmony import */ var _color_hsv_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./color-hsv.js */ "./node_modules/@microsoft/fast-colors/dist/color-hsv.js");
/* harmony import */ var _color_lab_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./color-lab.js */ "./node_modules/@microsoft/fast-colors/dist/color-lab.js");
/* harmony import */ var _color_lch_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./color-lch.js */ "./node_modules/@microsoft/fast-colors/dist/color-lch.js");
/* harmony import */ var _color_rgba_64_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./color-rgba-64.js */ "./node_modules/@microsoft/fast-colors/dist/color-rgba-64.js");
/* harmony import */ var _color_xyz_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./color-xyz.js */ "./node_modules/@microsoft/fast-colors/dist/color-xyz.js");
/* harmony import */ var _math_utilities_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./math-utilities.js */ "./node_modules/@microsoft/fast-colors/dist/math-utilities.js");








/**
 * Interpolate by RGB color space
 *
 * @public
 */
function interpolateRGB(position, left, right) {
    if (isNaN(position) || position <= 0) {
        return left;
    }
    else if (position >= 1) {
        return right;
    }
    return new _color_rgba_64_js__WEBPACK_IMPORTED_MODULE_0__.ColorRGBA64((0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_1__.lerp)(position, left.r, right.r), (0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_1__.lerp)(position, left.g, right.g), (0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_1__.lerp)(position, left.b, right.b), (0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_1__.lerp)(position, left.a, right.a));
}
/**
 * Interpolate by HSL color space
 *
 * @public
 */
function interpolateHSL(position, left, right) {
    if (isNaN(position) || position <= 0) {
        return left;
    }
    else if (position >= 1) {
        return right;
    }
    return new _color_hsl_js__WEBPACK_IMPORTED_MODULE_2__.ColorHSL((0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_1__.lerpAnglesInDegrees)(position, left.h, right.h), (0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_1__.lerp)(position, left.s, right.s), (0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_1__.lerp)(position, left.l, right.l));
}
/**
 * Interpolate by HSV color space
 *
 * @public
 */
function interpolateHSV(position, left, right) {
    if (isNaN(position) || position <= 0) {
        return left;
    }
    else if (position >= 1) {
        return right;
    }
    return new _color_hsv_js__WEBPACK_IMPORTED_MODULE_3__.ColorHSV((0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_1__.lerpAnglesInDegrees)(position, left.h, right.h), (0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_1__.lerp)(position, left.s, right.s), (0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_1__.lerp)(position, left.v, right.v));
}
/**
 * Interpolate by XYZ color space
 *
 * @public
 */
function interpolateXYZ(position, left, right) {
    if (isNaN(position) || position <= 0) {
        return left;
    }
    else if (position >= 1) {
        return right;
    }
    return new _color_xyz_js__WEBPACK_IMPORTED_MODULE_4__.ColorXYZ((0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_1__.lerp)(position, left.x, right.x), (0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_1__.lerp)(position, left.y, right.y), (0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_1__.lerp)(position, left.z, right.z));
}
/**
 * Interpolate by LAB color space
 *
 * @public
 */
function interpolateLAB(position, left, right) {
    if (isNaN(position) || position <= 0) {
        return left;
    }
    else if (position >= 1) {
        return right;
    }
    return new _color_lab_js__WEBPACK_IMPORTED_MODULE_5__.ColorLAB((0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_1__.lerp)(position, left.l, right.l), (0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_1__.lerp)(position, left.a, right.a), (0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_1__.lerp)(position, left.b, right.b));
}
/**
 * Interpolate by LCH color space
 *
 * @public
 */
function interpolateLCH(position, left, right) {
    if (isNaN(position) || position <= 0) {
        return left;
    }
    else if (position >= 1) {
        return right;
    }
    return new _color_lch_js__WEBPACK_IMPORTED_MODULE_6__.ColorLCH((0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_1__.lerp)(position, left.l, right.l), (0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_1__.lerp)(position, left.c, right.c), (0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_1__.lerpAnglesInDegrees)(position, left.h, right.h));
}
/**
 * Color interpolation spaces
 *
 * @public
 */
var ColorInterpolationSpace;
(function (ColorInterpolationSpace) {
    ColorInterpolationSpace[ColorInterpolationSpace["RGB"] = 0] = "RGB";
    ColorInterpolationSpace[ColorInterpolationSpace["HSL"] = 1] = "HSL";
    ColorInterpolationSpace[ColorInterpolationSpace["HSV"] = 2] = "HSV";
    ColorInterpolationSpace[ColorInterpolationSpace["XYZ"] = 3] = "XYZ";
    ColorInterpolationSpace[ColorInterpolationSpace["LAB"] = 4] = "LAB";
    ColorInterpolationSpace[ColorInterpolationSpace["LCH"] = 5] = "LCH";
})(ColorInterpolationSpace || (ColorInterpolationSpace = {}));
/**
 * Interpolate by color space
 *
 * @public
 */
function interpolateByColorSpace(position, space, left, right) {
    if (isNaN(position) || position <= 0) {
        return left;
    }
    else if (position >= 1) {
        return right;
    }
    switch (space) {
        case ColorInterpolationSpace.HSL:
            return (0,_color_converters_js__WEBPACK_IMPORTED_MODULE_7__.hslToRGB)(interpolateHSL(position, (0,_color_converters_js__WEBPACK_IMPORTED_MODULE_7__.rgbToHSL)(left), (0,_color_converters_js__WEBPACK_IMPORTED_MODULE_7__.rgbToHSL)(right)));
        case ColorInterpolationSpace.HSV:
            return (0,_color_converters_js__WEBPACK_IMPORTED_MODULE_7__.hsvToRGB)(interpolateHSV(position, (0,_color_converters_js__WEBPACK_IMPORTED_MODULE_7__.rgbToHSV)(left), (0,_color_converters_js__WEBPACK_IMPORTED_MODULE_7__.rgbToHSV)(right)));
        case ColorInterpolationSpace.XYZ:
            return (0,_color_converters_js__WEBPACK_IMPORTED_MODULE_7__.xyzToRGB)(interpolateXYZ(position, (0,_color_converters_js__WEBPACK_IMPORTED_MODULE_7__.rgbToXYZ)(left), (0,_color_converters_js__WEBPACK_IMPORTED_MODULE_7__.rgbToXYZ)(right)));
        case ColorInterpolationSpace.LAB:
            return (0,_color_converters_js__WEBPACK_IMPORTED_MODULE_7__.labToRGB)(interpolateLAB(position, (0,_color_converters_js__WEBPACK_IMPORTED_MODULE_7__.rgbToLAB)(left), (0,_color_converters_js__WEBPACK_IMPORTED_MODULE_7__.rgbToLAB)(right)));
        case ColorInterpolationSpace.LCH:
            return (0,_color_converters_js__WEBPACK_IMPORTED_MODULE_7__.lchToRGB)(interpolateLCH(position, (0,_color_converters_js__WEBPACK_IMPORTED_MODULE_7__.rgbToLCH)(left), (0,_color_converters_js__WEBPACK_IMPORTED_MODULE_7__.rgbToLCH)(right)));
        default:
            return interpolateRGB(position, left, right);
    }
}


/***/ }),

/***/ "./node_modules/@microsoft/fast-colors/dist/color-lab.js":
/*!***************************************************************!*\
  !*** ./node_modules/@microsoft/fast-colors/dist/color-lab.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ColorLAB: () => (/* binding */ ColorLAB)
/* harmony export */ });
/* harmony import */ var _math_utilities_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math-utilities.js */ "./node_modules/@microsoft/fast-colors/dist/math-utilities.js");

/**
 * {@link https://en.wikipedia.org/wiki/CIELAB_color_space | CIELAB color space}
 * This implementation uses the D65 constants for 2 degrees. That determines the constants used for the pure white point of the XYZ space of 0.95047, 1.0, 1.08883.
 * {@link https://en.wikipedia.org/wiki/Illuminant_D65}
 * These constants determine how the XYZ, LCH and LAB colors convert to/from RGB.
 *
 * @public
 */
class ColorLAB {
    constructor(l, a, b) {
        this.l = l;
        this.a = a;
        this.b = b;
    }
    /**
     * Construct a {@link ColorLAB} from a config object.
     */
    static fromObject(data) {
        if (data && !isNaN(data.l) && !isNaN(data.a) && !isNaN(data.b)) {
            return new ColorLAB(data.l, data.a, data.b);
        }
        return null;
    }
    /**
     * Determines if a color is equal to another
     * @param rhs - the value to compare
     */
    equalValue(rhs) {
        return this.l === rhs.l && this.a === rhs.a && this.b === rhs.b;
    }
    /**
     * Returns a new {@link ColorLAB} rounded to the provided precision
     * @param precision - the precision to round to
     */
    roundToPrecision(precision) {
        return new ColorLAB((0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_0__.roundToPrecisionSmall)(this.l, precision), (0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_0__.roundToPrecisionSmall)(this.a, precision), (0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_0__.roundToPrecisionSmall)(this.b, precision));
    }
    /**
     * Returns the {@link ColorLAB} formatted as an object.
     */
    toObject() {
        return { l: this.l, a: this.a, b: this.b };
    }
}
ColorLAB.epsilon = 216 / 24389;
ColorLAB.kappa = 24389 / 27;


/***/ }),

/***/ "./node_modules/@microsoft/fast-colors/dist/color-lch.js":
/*!***************************************************************!*\
  !*** ./node_modules/@microsoft/fast-colors/dist/color-lch.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ColorLCH: () => (/* binding */ ColorLCH)
/* harmony export */ });
/* harmony import */ var _math_utilities_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math-utilities.js */ "./node_modules/@microsoft/fast-colors/dist/math-utilities.js");

/**
 *
 * {@link https://en.wikipedia.org/wiki/CIELAB_color_space | CIELCH color space}
 *
 * This is a cylindrical representation of the CIELAB space useful for saturation operations
 * This uses Hue values in "degree" format. So expect a range of [0,360]. Some other implementations instead uses radians or a normalized Hue with range [0,1]. Be aware of this when checking values or using other libraries.
 * This implementation uses the D65 constants for 2 degrees. That determines the constants used for the pure white point of the XYZ space of 0.95047, 1.0, 1.08883.
 * {@link https://en.wikipedia.org/wiki/Illuminant_D65}
 * These constants determine how the XYZ, LCH and LAB colors convert to/from RGB.
 *
 * @public
 */
class ColorLCH {
    constructor(l, c, h) {
        this.l = l;
        this.c = c;
        this.h = h;
    }
    /**
     * Construct a {@link ColorLCH} from a config object.
     * @param data - the config object
     */
    static fromObject(data) {
        if (data && !isNaN(data.l) && !isNaN(data.c) && !isNaN(data.h)) {
            return new ColorLCH(data.l, data.c, data.h);
        }
        return null;
    }
    /**
     * Determines if one color is equal to another.
     * @param rhs - the color to compare
     */
    equalValue(rhs) {
        return this.l === rhs.l && this.c === rhs.c && this.h === rhs.h;
    }
    /**
     * Returns a new {@link ColorLCH} rounded to the provided precision
     * @param precision - the precision to round to
     */
    roundToPrecision(precision) {
        return new ColorLCH((0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_0__.roundToPrecisionSmall)(this.l, precision), (0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_0__.roundToPrecisionSmall)(this.c, precision), (0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_0__.roundToPrecisionSmall)(this.h, precision));
    }
    /**
     * Converts the {@link ColorLCH} to a config object.
     */
    toObject() {
        return { l: this.l, c: this.c, h: this.h };
    }
}


/***/ }),

/***/ "./node_modules/@microsoft/fast-colors/dist/color-rgba-64.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@microsoft/fast-colors/dist/color-rgba-64.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ColorRGBA64: () => (/* binding */ ColorRGBA64)
/* harmony export */ });
/* harmony import */ var _math_utilities_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math-utilities.js */ "./node_modules/@microsoft/fast-colors/dist/math-utilities.js");

/**
 * A RGBA color with 64 bit channels.
 *
 * @example
 * ```ts
 * new ColorRGBA64(1, 0, 0, 1) // red
 * ```
 * @public
 */
class ColorRGBA64 {
    /**
     *
     * @param red - the red value
     * @param green - the green value
     * @param blue - the blue value
     * @param alpha - the alpha value
     */
    constructor(red, green, blue, alpha) {
        this.r = red;
        this.g = green;
        this.b = blue;
        this.a = typeof alpha === "number" && !isNaN(alpha) ? alpha : 1;
    }
    /**
     * Construct a {@link ColorRGBA64} from a {@link ColorRGBA64Config}
     * @param data - the config object
     */
    static fromObject(data) {
        return data && !isNaN(data.r) && !isNaN(data.g) && !isNaN(data.b)
            ? new ColorRGBA64(data.r, data.g, data.b, data.a)
            : null;
    }
    /**
     * Determines if one color is equal to another.
     * @param rhs - the color to compare
     */
    equalValue(rhs) {
        return (this.r === rhs.r && this.g === rhs.g && this.b === rhs.b && this.a === rhs.a);
    }
    /**
     * Returns the color formatted as a string; #RRGGBB
     */
    toStringHexRGB() {
        return "#" + [this.r, this.g, this.b].map(this.formatHexValue).join("");
    }
    /**
     * Returns the color formatted as a string; #RRGGBBAA
     */
    toStringHexRGBA() {
        return this.toStringHexRGB() + this.formatHexValue(this.a);
    }
    /**
     * Returns the color formatted as a string; #AARRGGBB
     */
    toStringHexARGB() {
        return "#" + [this.a, this.r, this.g, this.b].map(this.formatHexValue).join("");
    }
    /**
     * Returns the color formatted as a string; "rgb(0xRR, 0xGG, 0xBB)"
     */
    toStringWebRGB() {
        return `rgb(${Math.round((0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_0__.denormalize)(this.r, 0.0, 255.0))},${Math.round((0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_0__.denormalize)(this.g, 0.0, 255.0))},${Math.round((0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_0__.denormalize)(this.b, 0.0, 255.0))})`;
    }
    /**
     * Returns the color formatted as a string; "rgba(0xRR, 0xGG, 0xBB, a)"
     * @remarks
     * Note that this follows the convention of putting alpha in the range [0.0,1.0] while the other three channels are [0,255]
     */
    toStringWebRGBA() {
        return `rgba(${Math.round((0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_0__.denormalize)(this.r, 0.0, 255.0))},${Math.round((0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_0__.denormalize)(this.g, 0.0, 255.0))},${Math.round((0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_0__.denormalize)(this.b, 0.0, 255.0))},${(0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_0__.clamp)(this.a, 0, 1)})`;
    }
    /**
     * Returns a new {@link ColorRGBA64} rounded to the provided precision
     * @param precision - the precision to round to
     */
    roundToPrecision(precision) {
        return new ColorRGBA64((0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_0__.roundToPrecisionSmall)(this.r, precision), (0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_0__.roundToPrecisionSmall)(this.g, precision), (0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_0__.roundToPrecisionSmall)(this.b, precision), (0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_0__.roundToPrecisionSmall)(this.a, precision));
    }
    /**
     * Returns a new {@link ColorRGBA64} with channel values clamped between 0 and 1.
     */
    clamp() {
        return new ColorRGBA64((0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_0__.clamp)(this.r, 0, 1), (0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_0__.clamp)(this.g, 0, 1), (0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_0__.clamp)(this.b, 0, 1), (0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_0__.clamp)(this.a, 0, 1));
    }
    /**
     * Converts the {@link ColorRGBA64} to a {@link ColorRGBA64Config}.
     */
    toObject() {
        return { r: this.r, g: this.g, b: this.b, a: this.a };
    }
    formatHexValue(value) {
        return (0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_0__.getHexStringForByte)((0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_0__.denormalize)(value, 0.0, 255.0));
    }
}


/***/ }),

/***/ "./node_modules/@microsoft/fast-colors/dist/color-xyz.js":
/*!***************************************************************!*\
  !*** ./node_modules/@microsoft/fast-colors/dist/color-xyz.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ColorXYZ: () => (/* binding */ ColorXYZ)
/* harmony export */ });
/* harmony import */ var _math_utilities_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math-utilities.js */ "./node_modules/@microsoft/fast-colors/dist/math-utilities.js");

/**
 * {@link https://en.wikipedia.org/wiki/CIE_1931_color_space | XYZ color space}
 *
 * This implementation uses the D65 constants for 2 degrees. That determines the constants used for the pure white point of the XYZ space of 0.95047, 1.0, 1.08883.
 * {@link https://en.wikipedia.org/wiki/Illuminant_D65}
 * These constants determine how the XYZ, LCH and LAB colors convert to/from RGB.
 *
 * @public
 */
class ColorXYZ {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    /**
     * Construct a {@link ColorXYZ} from a config object.
     */
    static fromObject(data) {
        if (data && !isNaN(data.x) && !isNaN(data.y) && !isNaN(data.z)) {
            return new ColorXYZ(data.x, data.y, data.z);
        }
        return null;
    }
    /**
     * Determines if a color is equal to another
     * @param rhs - the value to compare
     */
    equalValue(rhs) {
        return this.x === rhs.x && this.y === rhs.y && this.z === rhs.z;
    }
    /**
     * Returns a new {@link ColorXYZ} rounded to the provided precision
     * @param precision - the precision to round to
     */
    roundToPrecision(precision) {
        return new ColorXYZ((0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_0__.roundToPrecisionSmall)(this.x, precision), (0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_0__.roundToPrecisionSmall)(this.y, precision), (0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_0__.roundToPrecisionSmall)(this.z, precision));
    }
    /**
     * Returns the {@link ColorXYZ} formatted as an object.
     */
    toObject() {
        return { x: this.x, y: this.y, z: this.z };
    }
}
/**
 * D65 2 degree white point
 */
ColorXYZ.whitePoint = new ColorXYZ(0.95047, 1.0, 1.08883);


/***/ }),

/***/ "./node_modules/@microsoft/fast-colors/dist/math-utilities.js":
/*!********************************************************************!*\
  !*** ./node_modules/@microsoft/fast-colors/dist/math-utilities.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clamp: () => (/* binding */ clamp),
/* harmony export */   degreesToRadians: () => (/* binding */ degreesToRadians),
/* harmony export */   denormalize: () => (/* binding */ denormalize),
/* harmony export */   getHexStringForByte: () => (/* binding */ getHexStringForByte),
/* harmony export */   lerp: () => (/* binding */ lerp),
/* harmony export */   lerpAnglesInDegrees: () => (/* binding */ lerpAnglesInDegrees),
/* harmony export */   lerpAnglesInRadians: () => (/* binding */ lerpAnglesInRadians),
/* harmony export */   normalize: () => (/* binding */ normalize),
/* harmony export */   radiansToDegrees: () => (/* binding */ radiansToDegrees),
/* harmony export */   roundToPrecisionSmall: () => (/* binding */ roundToPrecisionSmall)
/* harmony export */ });
/**
 * Ensures that an input number does not exceed a max value and is not less than a min value.
 * @param i - the number to clamp
 * @param min - the maximum (inclusive) value
 * @param max - the minimum (inclusive) value
 * @public
 */
function clamp(i, min, max) {
    if (isNaN(i) || i <= min) {
        return min;
    }
    else if (i >= max) {
        return max;
    }
    return i;
}
/**
 * Scales an input to a number between 0 and 1
 * @param i - a number between min and max
 * @param min - the max value
 * @param max - the min value
 * @public
 */
function normalize(i, min, max) {
    if (isNaN(i) || i <= min) {
        return 0.0;
    }
    else if (i >= max) {
        return 1.0;
    }
    return i / (max - min);
}
/**
 * Scales a number between 0 and 1
 * @param i - the number to denormalize
 * @param min - the min value
 * @param max - the max value
 * @public
 */
function denormalize(i, min, max) {
    if (isNaN(i)) {
        return min;
    }
    return min + i * (max - min);
}
/**
 * Converts degrees to radians.
 * @param i - degrees
 * @public
 */
function degreesToRadians(i) {
    return i * (Math.PI / 180.0);
}
/**
 * Converts radians to degrees.
 * @param i - radians
 * @public
 */
function radiansToDegrees(i) {
    return i * (180.0 / Math.PI);
}
/**
 * Converts a number between 0 and 255 to a hex string.
 * @param i - the number to convert to a hex string
 * @public
 */
function getHexStringForByte(i) {
    const s = Math.round(clamp(i, 0.0, 255.0)).toString(16);
    if (s.length === 1) {
        return "0" + s;
    }
    return s;
}
/**
 * Linearly interpolate
 * @public
 */
function lerp(i, min, max) {
    if (isNaN(i) || i <= 0.0) {
        return min;
    }
    else if (i >= 1.0) {
        return max;
    }
    return min + i * (max - min);
}
/**
 * Linearly interpolate angles in degrees
 * @public
 */
function lerpAnglesInDegrees(i, min, max) {
    if (i <= 0.0) {
        return min % 360.0;
    }
    else if (i >= 1.0) {
        return max % 360.0;
    }
    const a = (min - max + 360.0) % 360.0;
    const b = (max - min + 360.0) % 360.0;
    if (a <= b) {
        return (min - a * i + 360.0) % 360.0;
    }
    return (min + a * i + 360.0) % 360.0;
}
const TwoPI = Math.PI * 2;
/**
 * Linearly interpolate angles in radians
 * @public
 */
function lerpAnglesInRadians(i, min, max) {
    if (isNaN(i) || i <= 0.0) {
        return min % TwoPI;
    }
    else if (i >= 1.0) {
        return max % TwoPI;
    }
    const a = (min - max + TwoPI) % TwoPI;
    const b = (max - min + TwoPI) % TwoPI;
    if (a <= b) {
        return (min - a * i + TwoPI) % TwoPI;
    }
    return (min + a * i + TwoPI) % TwoPI;
}
/**
 *
 * Will return infinity if i*10^(precision) overflows number
 * note that floating point rounding rules come into play here
 * so values that end up rounding on a .5 round to the nearest
 * even not always up so 2.5 rounds to 2
 * @param i - the number to round
 * @param precision - the precision to round to
 *
 * @public
 */
function roundToPrecisionSmall(i, precision) {
    const factor = Math.pow(10, precision);
    return Math.round(i * factor) / factor;
}


/***/ }),

/***/ "./node_modules/@microsoft/fast-colors/dist/named-colors.js":
/*!******************************************************************!*\
  !*** ./node_modules/@microsoft/fast-colors/dist/named-colors.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   namedColorsConfigs: () => (/* binding */ namedColorsConfigs)
/* harmony export */ });
const namedColorsConfigs = {
    aliceblue: {
        r: 0.941176,
        g: 0.972549,
        b: 1,
    },
    antiquewhite: {
        r: 0.980392,
        g: 0.921569,
        b: 0.843137,
    },
    aqua: {
        r: 0,
        g: 1,
        b: 1,
    },
    aquamarine: {
        r: 0.498039,
        g: 1,
        b: 0.831373,
    },
    azure: {
        r: 0.941176,
        g: 1,
        b: 1,
    },
    beige: {
        r: 0.960784,
        g: 0.960784,
        b: 0.862745,
    },
    bisque: {
        r: 1,
        g: 0.894118,
        b: 0.768627,
    },
    black: {
        r: 0,
        g: 0,
        b: 0,
    },
    blanchedalmond: {
        r: 1,
        g: 0.921569,
        b: 0.803922,
    },
    blue: {
        r: 0,
        g: 0,
        b: 1,
    },
    blueviolet: {
        r: 0.541176,
        g: 0.168627,
        b: 0.886275,
    },
    brown: {
        r: 0.647059,
        g: 0.164706,
        b: 0.164706,
    },
    burlywood: {
        r: 0.870588,
        g: 0.721569,
        b: 0.529412,
    },
    cadetblue: {
        r: 0.372549,
        g: 0.619608,
        b: 0.627451,
    },
    chartreuse: {
        r: 0.498039,
        g: 1,
        b: 0,
    },
    chocolate: {
        r: 0.823529,
        g: 0.411765,
        b: 0.117647,
    },
    coral: {
        r: 1,
        g: 0.498039,
        b: 0.313725,
    },
    cornflowerblue: {
        r: 0.392157,
        g: 0.584314,
        b: 0.929412,
    },
    cornsilk: {
        r: 1,
        g: 0.972549,
        b: 0.862745,
    },
    crimson: {
        r: 0.862745,
        g: 0.078431,
        b: 0.235294,
    },
    cyan: {
        r: 0,
        g: 1,
        b: 1,
    },
    darkblue: {
        r: 0,
        g: 0,
        b: 0.545098,
    },
    darkcyan: {
        r: 0,
        g: 0.545098,
        b: 0.545098,
    },
    darkgoldenrod: {
        r: 0.721569,
        g: 0.52549,
        b: 0.043137,
    },
    darkgray: {
        r: 0.662745,
        g: 0.662745,
        b: 0.662745,
    },
    darkgreen: {
        r: 0,
        g: 0.392157,
        b: 0,
    },
    darkgrey: {
        r: 0.662745,
        g: 0.662745,
        b: 0.662745,
    },
    darkkhaki: {
        r: 0.741176,
        g: 0.717647,
        b: 0.419608,
    },
    darkmagenta: {
        r: 0.545098,
        g: 0,
        b: 0.545098,
    },
    darkolivegreen: {
        r: 0.333333,
        g: 0.419608,
        b: 0.184314,
    },
    darkorange: {
        r: 1,
        g: 0.54902,
        b: 0,
    },
    darkorchid: {
        r: 0.6,
        g: 0.196078,
        b: 0.8,
    },
    darkred: {
        r: 0.545098,
        g: 0,
        b: 0,
    },
    darksalmon: {
        r: 0.913725,
        g: 0.588235,
        b: 0.478431,
    },
    darkseagreen: {
        r: 0.560784,
        g: 0.737255,
        b: 0.560784,
    },
    darkslateblue: {
        r: 0.282353,
        g: 0.239216,
        b: 0.545098,
    },
    darkslategray: {
        r: 0.184314,
        g: 0.309804,
        b: 0.309804,
    },
    darkslategrey: {
        r: 0.184314,
        g: 0.309804,
        b: 0.309804,
    },
    darkturquoise: {
        r: 0,
        g: 0.807843,
        b: 0.819608,
    },
    darkviolet: {
        r: 0.580392,
        g: 0,
        b: 0.827451,
    },
    deeppink: {
        r: 1,
        g: 0.078431,
        b: 0.576471,
    },
    deepskyblue: {
        r: 0,
        g: 0.74902,
        b: 1,
    },
    dimgray: {
        r: 0.411765,
        g: 0.411765,
        b: 0.411765,
    },
    dimgrey: {
        r: 0.411765,
        g: 0.411765,
        b: 0.411765,
    },
    dodgerblue: {
        r: 0.117647,
        g: 0.564706,
        b: 1,
    },
    firebrick: {
        r: 0.698039,
        g: 0.133333,
        b: 0.133333,
    },
    floralwhite: {
        r: 1,
        g: 0.980392,
        b: 0.941176,
    },
    forestgreen: {
        r: 0.133333,
        g: 0.545098,
        b: 0.133333,
    },
    fuchsia: {
        r: 1,
        g: 0,
        b: 1,
    },
    gainsboro: {
        r: 0.862745,
        g: 0.862745,
        b: 0.862745,
    },
    ghostwhite: {
        r: 0.972549,
        g: 0.972549,
        b: 1,
    },
    gold: {
        r: 1,
        g: 0.843137,
        b: 0,
    },
    goldenrod: {
        r: 0.854902,
        g: 0.647059,
        b: 0.12549,
    },
    gray: {
        r: 0.501961,
        g: 0.501961,
        b: 0.501961,
    },
    green: {
        r: 0,
        g: 0.501961,
        b: 0,
    },
    greenyellow: {
        r: 0.678431,
        g: 1,
        b: 0.184314,
    },
    grey: {
        r: 0.501961,
        g: 0.501961,
        b: 0.501961,
    },
    honeydew: {
        r: 0.941176,
        g: 1,
        b: 0.941176,
    },
    hotpink: {
        r: 1,
        g: 0.411765,
        b: 0.705882,
    },
    indianred: {
        r: 0.803922,
        g: 0.360784,
        b: 0.360784,
    },
    indigo: {
        r: 0.294118,
        g: 0,
        b: 0.509804,
    },
    ivory: {
        r: 1,
        g: 1,
        b: 0.941176,
    },
    khaki: {
        r: 0.941176,
        g: 0.901961,
        b: 0.54902,
    },
    lavender: {
        r: 0.901961,
        g: 0.901961,
        b: 0.980392,
    },
    lavenderblush: {
        r: 1,
        g: 0.941176,
        b: 0.960784,
    },
    lawngreen: {
        r: 0.486275,
        g: 0.988235,
        b: 0,
    },
    lemonchiffon: {
        r: 1,
        g: 0.980392,
        b: 0.803922,
    },
    lightblue: {
        r: 0.678431,
        g: 0.847059,
        b: 0.901961,
    },
    lightcoral: {
        r: 0.941176,
        g: 0.501961,
        b: 0.501961,
    },
    lightcyan: {
        r: 0.878431,
        g: 1,
        b: 1,
    },
    lightgoldenrodyellow: {
        r: 0.980392,
        g: 0.980392,
        b: 0.823529,
    },
    lightgray: {
        r: 0.827451,
        g: 0.827451,
        b: 0.827451,
    },
    lightgreen: {
        r: 0.564706,
        g: 0.933333,
        b: 0.564706,
    },
    lightgrey: {
        r: 0.827451,
        g: 0.827451,
        b: 0.827451,
    },
    lightpink: {
        r: 1,
        g: 0.713725,
        b: 0.756863,
    },
    lightsalmon: {
        r: 1,
        g: 0.627451,
        b: 0.478431,
    },
    lightseagreen: {
        r: 0.12549,
        g: 0.698039,
        b: 0.666667,
    },
    lightskyblue: {
        r: 0.529412,
        g: 0.807843,
        b: 0.980392,
    },
    lightslategray: {
        r: 0.466667,
        g: 0.533333,
        b: 0.6,
    },
    lightslategrey: {
        r: 0.466667,
        g: 0.533333,
        b: 0.6,
    },
    lightsteelblue: {
        r: 0.690196,
        g: 0.768627,
        b: 0.870588,
    },
    lightyellow: {
        r: 1,
        g: 1,
        b: 0.878431,
    },
    lime: {
        r: 0,
        g: 1,
        b: 0,
    },
    limegreen: {
        r: 0.196078,
        g: 0.803922,
        b: 0.196078,
    },
    linen: {
        r: 0.980392,
        g: 0.941176,
        b: 0.901961,
    },
    magenta: {
        r: 1,
        g: 0,
        b: 1,
    },
    maroon: {
        r: 0.501961,
        g: 0,
        b: 0,
    },
    mediumaquamarine: {
        r: 0.4,
        g: 0.803922,
        b: 0.666667,
    },
    mediumblue: {
        r: 0,
        g: 0,
        b: 0.803922,
    },
    mediumorchid: {
        r: 0.729412,
        g: 0.333333,
        b: 0.827451,
    },
    mediumpurple: {
        r: 0.576471,
        g: 0.439216,
        b: 0.858824,
    },
    mediumseagreen: {
        r: 0.235294,
        g: 0.701961,
        b: 0.443137,
    },
    mediumslateblue: {
        r: 0.482353,
        g: 0.407843,
        b: 0.933333,
    },
    mediumspringgreen: {
        r: 0,
        g: 0.980392,
        b: 0.603922,
    },
    mediumturquoise: {
        r: 0.282353,
        g: 0.819608,
        b: 0.8,
    },
    mediumvioletred: {
        r: 0.780392,
        g: 0.082353,
        b: 0.521569,
    },
    midnightblue: {
        r: 0.098039,
        g: 0.098039,
        b: 0.439216,
    },
    mintcream: {
        r: 0.960784,
        g: 1,
        b: 0.980392,
    },
    mistyrose: {
        r: 1,
        g: 0.894118,
        b: 0.882353,
    },
    moccasin: {
        r: 1,
        g: 0.894118,
        b: 0.709804,
    },
    navajowhite: {
        r: 1,
        g: 0.870588,
        b: 0.678431,
    },
    navy: {
        r: 0,
        g: 0,
        b: 0.501961,
    },
    oldlace: {
        r: 0.992157,
        g: 0.960784,
        b: 0.901961,
    },
    olive: {
        r: 0.501961,
        g: 0.501961,
        b: 0,
    },
    olivedrab: {
        r: 0.419608,
        g: 0.556863,
        b: 0.137255,
    },
    orange: {
        r: 1,
        g: 0.647059,
        b: 0,
    },
    orangered: {
        r: 1,
        g: 0.270588,
        b: 0,
    },
    orchid: {
        r: 0.854902,
        g: 0.439216,
        b: 0.839216,
    },
    palegoldenrod: {
        r: 0.933333,
        g: 0.909804,
        b: 0.666667,
    },
    palegreen: {
        r: 0.596078,
        g: 0.984314,
        b: 0.596078,
    },
    paleturquoise: {
        r: 0.686275,
        g: 0.933333,
        b: 0.933333,
    },
    palevioletred: {
        r: 0.858824,
        g: 0.439216,
        b: 0.576471,
    },
    papayawhip: {
        r: 1,
        g: 0.937255,
        b: 0.835294,
    },
    peachpuff: {
        r: 1,
        g: 0.854902,
        b: 0.72549,
    },
    peru: {
        r: 0.803922,
        g: 0.521569,
        b: 0.247059,
    },
    pink: {
        r: 1,
        g: 0.752941,
        b: 0.796078,
    },
    plum: {
        r: 0.866667,
        g: 0.627451,
        b: 0.866667,
    },
    powderblue: {
        r: 0.690196,
        g: 0.878431,
        b: 0.901961,
    },
    purple: {
        r: 0.501961,
        g: 0,
        b: 0.501961,
    },
    red: {
        r: 1,
        g: 0,
        b: 0,
    },
    rosybrown: {
        r: 0.737255,
        g: 0.560784,
        b: 0.560784,
    },
    royalblue: {
        r: 0.254902,
        g: 0.411765,
        b: 0.882353,
    },
    saddlebrown: {
        r: 0.545098,
        g: 0.270588,
        b: 0.07451,
    },
    salmon: {
        r: 0.980392,
        g: 0.501961,
        b: 0.447059,
    },
    sandybrown: {
        r: 0.956863,
        g: 0.643137,
        b: 0.376471,
    },
    seagreen: {
        r: 0.180392,
        g: 0.545098,
        b: 0.341176,
    },
    seashell: {
        r: 1,
        g: 0.960784,
        b: 0.933333,
    },
    sienna: {
        r: 0.627451,
        g: 0.321569,
        b: 0.176471,
    },
    silver: {
        r: 0.752941,
        g: 0.752941,
        b: 0.752941,
    },
    skyblue: {
        r: 0.529412,
        g: 0.807843,
        b: 0.921569,
    },
    slateblue: {
        r: 0.415686,
        g: 0.352941,
        b: 0.803922,
    },
    slategray: {
        r: 0.439216,
        g: 0.501961,
        b: 0.564706,
    },
    slategrey: {
        r: 0.439216,
        g: 0.501961,
        b: 0.564706,
    },
    snow: {
        r: 1,
        g: 0.980392,
        b: 0.980392,
    },
    springgreen: {
        r: 0,
        g: 1,
        b: 0.498039,
    },
    steelblue: {
        r: 0.27451,
        g: 0.509804,
        b: 0.705882,
    },
    tan: {
        r: 0.823529,
        g: 0.705882,
        b: 0.54902,
    },
    teal: {
        r: 0,
        g: 0.501961,
        b: 0.501961,
    },
    thistle: {
        r: 0.847059,
        g: 0.74902,
        b: 0.847059,
    },
    tomato: {
        r: 1,
        g: 0.388235,
        b: 0.278431,
    },
    transparent: {
        r: 0,
        g: 0,
        b: 0,
        a: 0,
    },
    turquoise: {
        r: 0.25098,
        g: 0.878431,
        b: 0.815686,
    },
    violet: {
        r: 0.933333,
        g: 0.509804,
        b: 0.933333,
    },
    wheat: {
        r: 0.960784,
        g: 0.870588,
        b: 0.701961,
    },
    white: {
        r: 1,
        g: 1,
        b: 1,
    },
    whitesmoke: {
        r: 0.960784,
        g: 0.960784,
        b: 0.960784,
    },
    yellow: {
        r: 1,
        g: 1,
        b: 0,
    },
    yellowgreen: {
        r: 0.603922,
        g: 0.803922,
        b: 0.196078,
    },
};


/***/ }),

/***/ "./node_modules/@microsoft/fast-colors/dist/parse-color.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@microsoft/fast-colors/dist/parse-color.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isColorNamed: () => (/* binding */ isColorNamed),
/* harmony export */   isColorStringHexARGB: () => (/* binding */ isColorStringHexARGB),
/* harmony export */   isColorStringHexRGB: () => (/* binding */ isColorStringHexRGB),
/* harmony export */   isColorStringHexRGBA: () => (/* binding */ isColorStringHexRGBA),
/* harmony export */   isColorStringWebRGB: () => (/* binding */ isColorStringWebRGB),
/* harmony export */   isColorStringWebRGBA: () => (/* binding */ isColorStringWebRGBA),
/* harmony export */   parseColor: () => (/* binding */ parseColor),
/* harmony export */   parseColorHexARGB: () => (/* binding */ parseColorHexARGB),
/* harmony export */   parseColorHexRGB: () => (/* binding */ parseColorHexRGB),
/* harmony export */   parseColorHexRGBA: () => (/* binding */ parseColorHexRGBA),
/* harmony export */   parseColorNamed: () => (/* binding */ parseColorNamed),
/* harmony export */   parseColorWebRGB: () => (/* binding */ parseColorWebRGB),
/* harmony export */   parseColorWebRGBA: () => (/* binding */ parseColorWebRGBA)
/* harmony export */ });
/* harmony import */ var _color_rgba_64_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./color-rgba-64.js */ "./node_modules/@microsoft/fast-colors/dist/color-rgba-64.js");
/* harmony import */ var _math_utilities_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./math-utilities.js */ "./node_modules/@microsoft/fast-colors/dist/math-utilities.js");
/* harmony import */ var _named_colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./named-colors.js */ "./node_modules/@microsoft/fast-colors/dist/named-colors.js");



// Matches rgb(R, G, B) where R, G, and B are integers [0 - 255]
const webRGBRegex = /^rgb\(\s*((?:(?:25[0-5]|2[0-4]\d|1\d\d|\d{1,2})\s*,\s*){2}(?:25[0-5]|2[0-4]\d|1\d\d|\d{1,2})\s*)\)$/i;
// Matches rgb(R, G, B, A) where R, G, and B are integers [0 - 255] and A is [0-1] floating
const webRGBARegex = /^rgba\(\s*((?:(?:25[0-5]|2[0-4]\d|1\d\d|\d{1,2})\s*,\s*){3}(?:0|1|0?\.\d*)\s*)\)$/i;
// Matches #RGB and #RRGGBB, where R, G, and B are [0-9] or [A-F]
const hexRGBRegex = /^#((?:[0-9a-f]{6}|[0-9a-f]{3}))$/i;
// Matches #RGB and #RRGGBBAA, where R, G, B, and A are [0-9] or [A-F]
const hexRGBARegex = /^#((?:[0-9a-f]{8}|[0-9a-f]{4}))$/i;
/**
 * Test if a color matches #RRGGBB or #RGB
 * @public
 */
function isColorStringHexRGB(raw) {
    return hexRGBRegex.test(raw);
}
/**
 * Test if a color matches #AARRGGBB or #ARGB
 * @public
 */
function isColorStringHexARGB(raw) {
    return hexRGBARegex.test(raw);
}
/**
 * Test if a color matches #RRGGBBAA or #RGBA
 * @public
 */
function isColorStringHexRGBA(raw) {
    return isColorStringHexARGB(raw); // No way to differentiate these two formats, so just use the same test
}
/**
 * Test if a color matches rgb(rr, gg, bb)
 * @public
 */
function isColorStringWebRGB(raw) {
    return webRGBRegex.test(raw);
}
/**
 * Test if a color matches rgba(rr, gg, bb, aa)
 *
 * @public
 */
function isColorStringWebRGBA(raw) {
    return webRGBARegex.test(raw);
}
/**
 * Tests whether a color is in {@link @microsoft/fast-colors#NamedColors}.
 * @param raw - the color name to test
 * @public
 */
function isColorNamed(raw) {
    return _named_colors_js__WEBPACK_IMPORTED_MODULE_0__.namedColorsConfigs.hasOwnProperty(raw);
}
/**
 * Converts a hexadecimal color string to a {@link @microsoft/fast-colors#ColorRGBA64}.
 * @param raw - a color string in the form of "#RRGGBB" or "#RGB"
 * @example
 * ```ts
 * parseColorHexRGBA("#FF0000");
 * parseColorHexRGBA("#F00");
 * ```
 * @public
 */
function parseColorHexRGB(raw) {
    const result = hexRGBRegex.exec(raw);
    if (result === null) {
        return null;
    }
    let digits = result[1];
    if (digits.length === 3) {
        const r = digits.charAt(0);
        const g = digits.charAt(1);
        const b = digits.charAt(2);
        digits = r.concat(r, g, g, b, b);
    }
    const rawInt = parseInt(digits, 16);
    if (isNaN(rawInt)) {
        return null;
    }
    // Note the use of >>> rather than >> as we want JS to manipulate these as unsigned numbers
    return new _color_rgba_64_js__WEBPACK_IMPORTED_MODULE_1__.ColorRGBA64((0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_2__.normalize)((rawInt & 0xff0000) >>> 16, 0, 255), (0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_2__.normalize)((rawInt & 0x00ff00) >>> 8, 0, 255), (0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_2__.normalize)(rawInt & 0x0000ff, 0, 255), 1);
}
/**
 * Converts a hexadecimal color string to a {@link @microsoft/fast-colors#ColorRGBA64}.
 * @param raw - a color string in the form of "#AARRGGBB" or "#ARGB"
 * @example
 * ```ts
 * parseColorHexRGBA("#AAFF0000");
 * parseColorHexRGBA("#AF00");
 * ```
 * @public
 */
function parseColorHexARGB(raw) {
    const result = hexRGBARegex.exec(raw);
    if (result === null) {
        return null;
    }
    let digits = result[1];
    if (digits.length === 4) {
        const a = digits.charAt(0);
        const r = digits.charAt(1);
        const g = digits.charAt(2);
        const b = digits.charAt(3);
        digits = a.concat(a, r, r, g, g, b, b);
    }
    const rawInt = parseInt(digits, 16);
    if (isNaN(rawInt)) {
        return null;
    }
    // Note the use of >>> rather than >> as we want JS to manipulate these as unsigned numbers
    return new _color_rgba_64_js__WEBPACK_IMPORTED_MODULE_1__.ColorRGBA64((0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_2__.normalize)((rawInt & 0x00ff0000) >>> 16, 0, 255), (0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_2__.normalize)((rawInt & 0x0000ff00) >>> 8, 0, 255), (0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_2__.normalize)(rawInt & 0x000000ff, 0, 255), (0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_2__.normalize)((rawInt & 0xff000000) >>> 24, 0, 255));
}
/**
 * Converts a hexadecimal color string to a {@link @microsoft/fast-colors#ColorRGBA64}.
 * @param raw - a color string in the form of "#RRGGBBAA" or "#RGBA"
 * @example
 * ```ts
 * parseColorHexRGBA("#FF0000AA");
 * parseColorHexRGBA("#F00A");
 * ```
 * @public
 */
function parseColorHexRGBA(raw) {
    const result = hexRGBARegex.exec(raw);
    if (result === null) {
        return null;
    }
    let digits = result[1];
    if (digits.length === 4) {
        const r = digits.charAt(0);
        const g = digits.charAt(1);
        const b = digits.charAt(2);
        const a = digits.charAt(3);
        digits = r.concat(r, g, g, b, b, a, a);
    }
    const rawInt = parseInt(digits, 16);
    if (isNaN(rawInt)) {
        return null;
    }
    // Note the use of >>> rather than >> as we want JS to manipulate these as unsigned numbers
    return new _color_rgba_64_js__WEBPACK_IMPORTED_MODULE_1__.ColorRGBA64((0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_2__.normalize)((rawInt & 0xff000000) >>> 24, 0, 255), (0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_2__.normalize)((rawInt & 0x00ff0000) >>> 16, 0, 255), (0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_2__.normalize)((rawInt & 0x0000ff00) >>> 8, 0, 255), (0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_2__.normalize)(rawInt & 0x000000ff, 0, 255));
}
/**
 * Converts a rgb color string to a {@link @microsoft/fast-colors#ColorRGBA64}.
 * @param raw - a color string format "rgba(RR,GG,BB)" where RR,GG,BB are [0,255]
 * @example
 * ```ts
 * parseColorWebRGB("rgba(255, 0, 0");
 * ```
 * @public
 */
function parseColorWebRGB(raw) {
    const result = webRGBRegex.exec(raw);
    if (result === null) {
        return null;
    }
    const split = result[1].split(",");
    return new _color_rgba_64_js__WEBPACK_IMPORTED_MODULE_1__.ColorRGBA64((0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_2__.normalize)(Number(split[0]), 0, 255), (0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_2__.normalize)(Number(split[1]), 0, 255), (0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_2__.normalize)(Number(split[2]), 0, 255), 1);
}
/**
 * Converts a rgba color string to a {@link @microsoft/fast-colors#ColorRGBA64}.
 * @param raw - a color string format "rgba(RR,GG,BB,a)" where RR,GG,BB are [0,255] and a is [0,1]
 * @example
 * ```ts
 * parseColorWebRGBA("rgba(255, 0, 0, 1");
 * ```
 * @public
 */
function parseColorWebRGBA(raw) {
    const result = webRGBARegex.exec(raw);
    if (result === null) {
        return null;
    }
    const split = result[1].split(",");
    if (split.length === 4) {
        return new _color_rgba_64_js__WEBPACK_IMPORTED_MODULE_1__.ColorRGBA64((0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_2__.normalize)(Number(split[0]), 0, 255), (0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_2__.normalize)(Number(split[1]), 0, 255), (0,_math_utilities_js__WEBPACK_IMPORTED_MODULE_2__.normalize)(Number(split[2]), 0, 255), Number(split[3]));
    }
    return null;
}
/**
 * Converts a named color to a {@link @microsoft/fast-colors#ColorRGBA64}.
 * @param raw - a {@link https://www.w3schools.com/colors/colors_names.asp | CSS color name}.
 * @example
 * ```ts
 * parseColorNamed("red");
 * ```
 * @public
 */
function parseColorNamed(raw) {
    // const rawLower: typeof raw =  raw.toLowerCase() : raw.toString();
    const config = _named_colors_js__WEBPACK_IMPORTED_MODULE_0__.namedColorsConfigs[raw.toLowerCase()];
    return config
        ? new _color_rgba_64_js__WEBPACK_IMPORTED_MODULE_1__.ColorRGBA64(config.r, config.g, config.b, config.hasOwnProperty("a") ? config.a : void 0)
        : null;
}
/**
 *
  Expects any of the following and attempts to determine which is being used
 * #RRGGBB, #AARRGGBB, rgb(RR,GG,BB) rgba(RR,GG,BB,a),
 * or any of the {@link https://www.w3schools.com/colors/colors_names.asp | CSS color names}.
 * @param raw - the color string to parse
 * @public
 */
function parseColor(raw) {
    const rawLower = raw.toLowerCase();
    return isColorStringHexRGB(rawLower)
        ? parseColorHexRGB(rawLower)
        : isColorStringHexRGBA(rawLower)
            ? parseColorHexARGB(rawLower)
            : isColorStringWebRGB(rawLower)
                ? parseColorWebRGB(rawLower)
                : isColorStringWebRGBA(rawLower)
                    ? parseColorWebRGBA(rawLower)
                    : isColorNamed(rawLower)
                        ? parseColorNamed(rawLower)
                        : null;
}


/***/ }),

/***/ "./node_modules/@microsoft/fast-element/dist/esm/components/attributes.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@microsoft/fast-element/dist/esm/components/attributes.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AttributeConfiguration: () => (/* binding */ AttributeConfiguration),
/* harmony export */   AttributeDefinition: () => (/* binding */ AttributeDefinition),
/* harmony export */   attr: () => (/* binding */ attr),
/* harmony export */   booleanConverter: () => (/* binding */ booleanConverter),
/* harmony export */   nullableNumberConverter: () => (/* binding */ nullableNumberConverter)
/* harmony export */ });
/* harmony import */ var _observation_observable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../observation/observable.js */ "./node_modules/@microsoft/fast-element/dist/esm/observation/observable.js");
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../dom.js */ "./node_modules/@microsoft/fast-element/dist/esm/dom.js");
/* harmony import */ var _platform_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../platform.js */ "./node_modules/@microsoft/fast-element/dist/esm/platform.js");



/**
 * Metadata used to configure a custom attribute's behavior.
 * @public
 */
const AttributeConfiguration = Object.freeze({
    /**
     * Locates all attribute configurations associated with a type.
     */
    locate: (0,_platform_js__WEBPACK_IMPORTED_MODULE_0__.createMetadataLocator)(),
});
/**
 * A {@link ValueConverter} that converts to and from `boolean` values.
 * @remarks
 * Used automatically when the `boolean` {@link AttributeMode} is selected.
 * @public
 */
const booleanConverter = {
    toView(value) {
        return value ? "true" : "false";
    },
    fromView(value) {
        if (value === null ||
            value === void 0 ||
            value === "false" ||
            value === false ||
            value === 0) {
            return false;
        }
        return true;
    },
};
/**
 * A {@link ValueConverter} that converts to and from `number` values.
 * @remarks
 * This converter allows for nullable numbers, returning `null` if the
 * input was `null`, `undefined`, or `NaN`.
 * @public
 */
const nullableNumberConverter = {
    toView(value) {
        if (value === null || value === undefined) {
            return null;
        }
        const number = value * 1;
        return isNaN(number) ? null : number.toString();
    },
    fromView(value) {
        if (value === null || value === undefined) {
            return null;
        }
        const number = value * 1;
        return isNaN(number) ? null : number;
    },
};
/**
 * An implementation of {@link Accessor} that supports reactivity,
 * change callbacks, attribute reflection, and type conversion for
 * custom elements.
 * @public
 */
class AttributeDefinition {
    /**
     * Creates an instance of AttributeDefinition.
     * @param Owner - The class constructor that owns this attribute.
     * @param name - The name of the property associated with the attribute.
     * @param attribute - The name of the attribute in HTML.
     * @param mode - The {@link AttributeMode} that describes the behavior of this attribute.
     * @param converter - A {@link ValueConverter} that integrates with the property getter/setter
     * to convert values to and from a DOM string.
     */
    constructor(Owner, name, attribute = name.toLowerCase(), mode = "reflect", converter) {
        this.guards = new Set();
        this.Owner = Owner;
        this.name = name;
        this.attribute = attribute;
        this.mode = mode;
        this.converter = converter;
        this.fieldName = `_${name}`;
        this.callbackName = `${name}Changed`;
        this.hasCallback = this.callbackName in Owner.prototype;
        if (mode === "boolean" && converter === void 0) {
            this.converter = booleanConverter;
        }
    }
    /**
     * Sets the value of the attribute/property on the source element.
     * @param source - The source element to access.
     * @param value - The value to set the attribute/property to.
     */
    setValue(source, newValue) {
        const oldValue = source[this.fieldName];
        const converter = this.converter;
        if (converter !== void 0) {
            newValue = converter.fromView(newValue);
        }
        if (oldValue !== newValue) {
            source[this.fieldName] = newValue;
            this.tryReflectToAttribute(source);
            if (this.hasCallback) {
                source[this.callbackName](oldValue, newValue);
            }
            source.$fastController.notify(this.name);
        }
    }
    /**
     * Gets the value of the attribute/property on the source element.
     * @param source - The source element to access.
     */
    getValue(source) {
        _observation_observable_js__WEBPACK_IMPORTED_MODULE_1__.Observable.track(source, this.name);
        return source[this.fieldName];
    }
    /** @internal */
    onAttributeChangedCallback(element, value) {
        if (this.guards.has(element)) {
            return;
        }
        this.guards.add(element);
        this.setValue(element, value);
        this.guards.delete(element);
    }
    tryReflectToAttribute(element) {
        const mode = this.mode;
        const guards = this.guards;
        if (guards.has(element) || mode === "fromView") {
            return;
        }
        _dom_js__WEBPACK_IMPORTED_MODULE_2__.DOM.queueUpdate(() => {
            guards.add(element);
            const latestValue = element[this.fieldName];
            switch (mode) {
                case "reflect":
                    const converter = this.converter;
                    _dom_js__WEBPACK_IMPORTED_MODULE_2__.DOM.setAttribute(element, this.attribute, converter !== void 0 ? converter.toView(latestValue) : latestValue);
                    break;
                case "boolean":
                    _dom_js__WEBPACK_IMPORTED_MODULE_2__.DOM.setBooleanAttribute(element, this.attribute, latestValue);
                    break;
            }
            guards.delete(element);
        });
    }
    /**
     * Collects all attribute definitions associated with the owner.
     * @param Owner - The class constructor to collect attribute for.
     * @param attributeLists - Any existing attributes to collect and merge with those associated with the owner.
     * @internal
     */
    static collect(Owner, ...attributeLists) {
        const attributes = [];
        attributeLists.push(AttributeConfiguration.locate(Owner));
        for (let i = 0, ii = attributeLists.length; i < ii; ++i) {
            const list = attributeLists[i];
            if (list === void 0) {
                continue;
            }
            for (let j = 0, jj = list.length; j < jj; ++j) {
                const config = list[j];
                if (typeof config === "string") {
                    attributes.push(new AttributeDefinition(Owner, config));
                }
                else {
                    attributes.push(new AttributeDefinition(Owner, config.property, config.attribute, config.mode, config.converter));
                }
            }
        }
        return attributes;
    }
}
function attr(configOrTarget, prop) {
    let config;
    function decorator($target, $prop) {
        if (arguments.length > 1) {
            // Non invocation:
            // - @attr
            // Invocation with or w/o opts:
            // - @attr()
            // - @attr({...opts})
            config.property = $prop;
        }
        AttributeConfiguration.locate($target.constructor).push(config);
    }
    if (arguments.length > 1) {
        // Non invocation:
        // - @attr
        config = {};
        decorator(configOrTarget, prop);
        return;
    }
    // Invocation with or w/o opts:
    // - @attr()
    // - @attr({...opts})
    config = configOrTarget === void 0 ? {} : configOrTarget;
    return decorator;
}


/***/ }),

/***/ "./node_modules/@microsoft/fast-element/dist/esm/components/controller.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@microsoft/fast-element/dist/esm/components/controller.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Controller: () => (/* binding */ Controller)
/* harmony export */ });
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../dom.js */ "./node_modules/@microsoft/fast-element/dist/esm/dom.js");
/* harmony import */ var _observation_notifier_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../observation/notifier.js */ "./node_modules/@microsoft/fast-element/dist/esm/observation/notifier.js");
/* harmony import */ var _observation_observable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../observation/observable.js */ "./node_modules/@microsoft/fast-element/dist/esm/observation/observable.js");
/* harmony import */ var _fast_definitions_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./fast-definitions.js */ "./node_modules/@microsoft/fast-element/dist/esm/components/fast-definitions.js");




const shadowRoots = new WeakMap();
const defaultEventOptions = {
    bubbles: true,
    composed: true,
    cancelable: true,
};
function getShadowRoot(element) {
    return element.shadowRoot || shadowRoots.get(element) || null;
}
/**
 * Controls the lifecycle and rendering of a `FASTElement`.
 * @public
 */
class Controller extends _observation_notifier_js__WEBPACK_IMPORTED_MODULE_0__.PropertyChangeNotifier {
    /**
     * Creates a Controller to control the specified element.
     * @param element - The element to be controlled by this controller.
     * @param definition - The element definition metadata that instructs this
     * controller in how to handle rendering and other platform integrations.
     * @internal
     */
    constructor(element, definition) {
        super(element);
        this.boundObservables = null;
        this.behaviors = null;
        this.needsInitialization = true;
        this._template = null;
        this._styles = null;
        this._isConnected = false;
        /**
         * This allows Observable.getNotifier(...) to return the Controller
         * when the notifier for the Controller itself is being requested. The
         * result is that the Observable system does not need to create a separate
         * instance of Notifier for observables on the Controller. The component and
         * the controller will now share the same notifier, removing one-object construct
         * per web component instance.
         */
        this.$fastController = this;
        /**
         * The view associated with the custom element.
         * @remarks
         * If `null` then the element is managing its own rendering.
         */
        this.view = null;
        this.element = element;
        this.definition = definition;
        const shadowOptions = definition.shadowOptions;
        if (shadowOptions !== void 0) {
            const shadowRoot = element.attachShadow(shadowOptions);
            if (shadowOptions.mode === "closed") {
                shadowRoots.set(element, shadowRoot);
            }
        }
        // Capture any observable values that were set by the binding engine before
        // the browser upgraded the element. Then delete the property since it will
        // shadow the getter/setter that is required to make the observable operate.
        // Later, in the connect callback, we'll re-apply the values.
        const accessors = _observation_observable_js__WEBPACK_IMPORTED_MODULE_1__.Observable.getAccessors(element);
        if (accessors.length > 0) {
            const boundObservables = (this.boundObservables = Object.create(null));
            for (let i = 0, ii = accessors.length; i < ii; ++i) {
                const propertyName = accessors[i].name;
                const value = element[propertyName];
                if (value !== void 0) {
                    delete element[propertyName];
                    boundObservables[propertyName] = value;
                }
            }
        }
    }
    /**
     * Indicates whether or not the custom element has been
     * connected to the document.
     */
    get isConnected() {
        _observation_observable_js__WEBPACK_IMPORTED_MODULE_1__.Observable.track(this, "isConnected");
        return this._isConnected;
    }
    setIsConnected(value) {
        this._isConnected = value;
        _observation_observable_js__WEBPACK_IMPORTED_MODULE_1__.Observable.notify(this, "isConnected");
    }
    /**
     * Gets/sets the template used to render the component.
     * @remarks
     * This value can only be accurately read after connect but can be set at any time.
     */
    get template() {
        return this._template;
    }
    set template(value) {
        if (this._template === value) {
            return;
        }
        this._template = value;
        if (!this.needsInitialization) {
            this.renderTemplate(value);
        }
    }
    /**
     * Gets/sets the primary styles used for the component.
     * @remarks
     * This value can only be accurately read after connect but can be set at any time.
     */
    get styles() {
        return this._styles;
    }
    set styles(value) {
        if (this._styles === value) {
            return;
        }
        if (this._styles !== null) {
            this.removeStyles(this._styles);
        }
        this._styles = value;
        if (!this.needsInitialization && value !== null) {
            this.addStyles(value);
        }
    }
    /**
     * Adds styles to this element. Providing an HTMLStyleElement will attach the element instance to the shadowRoot.
     * @param styles - The styles to add.
     */
    addStyles(styles) {
        const target = getShadowRoot(this.element) ||
            this.element.getRootNode();
        if (styles instanceof HTMLStyleElement) {
            target.append(styles);
        }
        else if (!styles.isAttachedTo(target)) {
            const sourceBehaviors = styles.behaviors;
            styles.addStylesTo(target);
            if (sourceBehaviors !== null) {
                this.addBehaviors(sourceBehaviors);
            }
        }
    }
    /**
     * Removes styles from this element. Providing an HTMLStyleElement will detach the element instance from the shadowRoot.
     * @param styles - the styles to remove.
     */
    removeStyles(styles) {
        const target = getShadowRoot(this.element) ||
            this.element.getRootNode();
        if (styles instanceof HTMLStyleElement) {
            target.removeChild(styles);
        }
        else if (styles.isAttachedTo(target)) {
            const sourceBehaviors = styles.behaviors;
            styles.removeStylesFrom(target);
            if (sourceBehaviors !== null) {
                this.removeBehaviors(sourceBehaviors);
            }
        }
    }
    /**
     * Adds behaviors to this element.
     * @param behaviors - The behaviors to add.
     */
    addBehaviors(behaviors) {
        const targetBehaviors = this.behaviors || (this.behaviors = new Map());
        const length = behaviors.length;
        const behaviorsToBind = [];
        for (let i = 0; i < length; ++i) {
            const behavior = behaviors[i];
            if (targetBehaviors.has(behavior)) {
                targetBehaviors.set(behavior, targetBehaviors.get(behavior) + 1);
            }
            else {
                targetBehaviors.set(behavior, 1);
                behaviorsToBind.push(behavior);
            }
        }
        if (this._isConnected) {
            const element = this.element;
            for (let i = 0; i < behaviorsToBind.length; ++i) {
                behaviorsToBind[i].bind(element, _observation_observable_js__WEBPACK_IMPORTED_MODULE_1__.defaultExecutionContext);
            }
        }
    }
    /**
     * Removes behaviors from this element.
     * @param behaviors - The behaviors to remove.
     * @param force - Forces unbinding of behaviors.
     */
    removeBehaviors(behaviors, force = false) {
        const targetBehaviors = this.behaviors;
        if (targetBehaviors === null) {
            return;
        }
        const length = behaviors.length;
        const behaviorsToUnbind = [];
        for (let i = 0; i < length; ++i) {
            const behavior = behaviors[i];
            if (targetBehaviors.has(behavior)) {
                const count = targetBehaviors.get(behavior) - 1;
                count === 0 || force
                    ? targetBehaviors.delete(behavior) && behaviorsToUnbind.push(behavior)
                    : targetBehaviors.set(behavior, count);
            }
        }
        if (this._isConnected) {
            const element = this.element;
            for (let i = 0; i < behaviorsToUnbind.length; ++i) {
                behaviorsToUnbind[i].unbind(element);
            }
        }
    }
    /**
     * Runs connected lifecycle behavior on the associated element.
     */
    onConnectedCallback() {
        if (this._isConnected) {
            return;
        }
        const element = this.element;
        if (this.needsInitialization) {
            this.finishInitialization();
        }
        else if (this.view !== null) {
            this.view.bind(element, _observation_observable_js__WEBPACK_IMPORTED_MODULE_1__.defaultExecutionContext);
        }
        const behaviors = this.behaviors;
        if (behaviors !== null) {
            for (const [behavior] of behaviors) {
                behavior.bind(element, _observation_observable_js__WEBPACK_IMPORTED_MODULE_1__.defaultExecutionContext);
            }
        }
        this.setIsConnected(true);
    }
    /**
     * Runs disconnected lifecycle behavior on the associated element.
     */
    onDisconnectedCallback() {
        if (!this._isConnected) {
            return;
        }
        this.setIsConnected(false);
        const view = this.view;
        if (view !== null) {
            view.unbind();
        }
        const behaviors = this.behaviors;
        if (behaviors !== null) {
            const element = this.element;
            for (const [behavior] of behaviors) {
                behavior.unbind(element);
            }
        }
    }
    /**
     * Runs the attribute changed callback for the associated element.
     * @param name - The name of the attribute that changed.
     * @param oldValue - The previous value of the attribute.
     * @param newValue - The new value of the attribute.
     */
    onAttributeChangedCallback(name, oldValue, newValue) {
        const attrDef = this.definition.attributeLookup[name];
        if (attrDef !== void 0) {
            attrDef.onAttributeChangedCallback(this.element, newValue);
        }
    }
    /**
     * Emits a custom HTML event.
     * @param type - The type name of the event.
     * @param detail - The event detail object to send with the event.
     * @param options - The event options. By default bubbles and composed.
     * @remarks
     * Only emits events if connected.
     */
    emit(type, detail, options) {
        if (this._isConnected) {
            return this.element.dispatchEvent(new CustomEvent(type, Object.assign(Object.assign({ detail }, defaultEventOptions), options)));
        }
        return false;
    }
    finishInitialization() {
        const element = this.element;
        const boundObservables = this.boundObservables;
        // If we have any observables that were bound, re-apply their values.
        if (boundObservables !== null) {
            const propertyNames = Object.keys(boundObservables);
            for (let i = 0, ii = propertyNames.length; i < ii; ++i) {
                const propertyName = propertyNames[i];
                element[propertyName] = boundObservables[propertyName];
            }
            this.boundObservables = null;
        }
        const definition = this.definition;
        // 1. Template overrides take top precedence.
        if (this._template === null) {
            if (this.element.resolveTemplate) {
                // 2. Allow for element instance overrides next.
                this._template = this.element.resolveTemplate();
            }
            else if (definition.template) {
                // 3. Default to the static definition.
                this._template = definition.template || null;
            }
        }
        // If we have a template after the above process, render it.
        // If there's no template, then the element author has opted into
        // custom rendering and they will managed the shadow root's content themselves.
        if (this._template !== null) {
            this.renderTemplate(this._template);
        }
        // 1. Styles overrides take top precedence.
        if (this._styles === null) {
            if (this.element.resolveStyles) {
                // 2. Allow for element instance overrides next.
                this._styles = this.element.resolveStyles();
            }
            else if (definition.styles) {
                // 3. Default to the static definition.
                this._styles = definition.styles || null;
            }
        }
        // If we have styles after the above process, add them.
        if (this._styles !== null) {
            this.addStyles(this._styles);
        }
        this.needsInitialization = false;
    }
    renderTemplate(template) {
        const element = this.element;
        // When getting the host to render to, we start by looking
        // up the shadow root. If there isn't one, then that means
        // we're doing a Light DOM render to the element's direct children.
        const host = getShadowRoot(element) || element;
        if (this.view !== null) {
            // If there's already a view, we need to unbind and remove through dispose.
            this.view.dispose();
            this.view = null;
        }
        else if (!this.needsInitialization) {
            // If there was previous custom rendering, we need to clear out the host.
            _dom_js__WEBPACK_IMPORTED_MODULE_2__.DOM.removeChildNodes(host);
        }
        if (template) {
            // If a new template was provided, render it.
            this.view = template.render(element, host, element);
        }
    }
    /**
     * Locates or creates a controller for the specified element.
     * @param element - The element to return the controller for.
     * @remarks
     * The specified element must have a {@link FASTElementDefinition}
     * registered either through the use of the {@link customElement}
     * decorator or a call to `FASTElement.define`.
     */
    static forCustomElement(element) {
        const controller = element.$fastController;
        if (controller !== void 0) {
            return controller;
        }
        const definition = _fast_definitions_js__WEBPACK_IMPORTED_MODULE_3__.FASTElementDefinition.forType(element.constructor);
        if (definition === void 0) {
            throw new Error("Missing FASTElement definition.");
        }
        return (element.$fastController = new Controller(element, definition));
    }
}


/***/ }),

/***/ "./node_modules/@microsoft/fast-element/dist/esm/components/fast-definitions.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/@microsoft/fast-element/dist/esm/components/fast-definitions.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FASTElementDefinition: () => (/* binding */ FASTElementDefinition)
/* harmony export */ });
/* harmony import */ var _platform_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../platform.js */ "./node_modules/@microsoft/fast-element/dist/esm/platform.js");
/* harmony import */ var _observation_observable_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../observation/observable.js */ "./node_modules/@microsoft/fast-element/dist/esm/observation/observable.js");
/* harmony import */ var _styles_element_styles_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../styles/element-styles.js */ "./node_modules/@microsoft/fast-element/dist/esm/styles/element-styles.js");
/* harmony import */ var _attributes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./attributes.js */ "./node_modules/@microsoft/fast-element/dist/esm/components/attributes.js");




const defaultShadowOptions = { mode: "open" };
const defaultElementOptions = {};
const fastRegistry = _platform_js__WEBPACK_IMPORTED_MODULE_0__.FAST.getById(4 /* elementRegistry */, () => {
    const typeToDefinition = new Map();
    return Object.freeze({
        register(definition) {
            if (typeToDefinition.has(definition.type)) {
                return false;
            }
            typeToDefinition.set(definition.type, definition);
            return true;
        },
        getByType(key) {
            return typeToDefinition.get(key);
        },
    });
});
/**
 * Defines metadata for a FASTElement.
 * @public
 */
class FASTElementDefinition {
    /**
     * Creates an instance of FASTElementDefinition.
     * @param type - The type this definition is being created for.
     * @param nameOrConfig - The name of the element to define or a config object
     * that describes the element to define.
     */
    constructor(type, nameOrConfig = type.definition) {
        if (typeof nameOrConfig === "string") {
            nameOrConfig = { name: nameOrConfig };
        }
        this.type = type;
        this.name = nameOrConfig.name;
        this.template = nameOrConfig.template;
        const attributes = _attributes_js__WEBPACK_IMPORTED_MODULE_1__.AttributeDefinition.collect(type, nameOrConfig.attributes);
        const observedAttributes = new Array(attributes.length);
        const propertyLookup = {};
        const attributeLookup = {};
        for (let i = 0, ii = attributes.length; i < ii; ++i) {
            const current = attributes[i];
            observedAttributes[i] = current.attribute;
            propertyLookup[current.name] = current;
            attributeLookup[current.attribute] = current;
        }
        this.attributes = attributes;
        this.observedAttributes = observedAttributes;
        this.propertyLookup = propertyLookup;
        this.attributeLookup = attributeLookup;
        this.shadowOptions =
            nameOrConfig.shadowOptions === void 0
                ? defaultShadowOptions
                : nameOrConfig.shadowOptions === null
                    ? void 0
                    : Object.assign(Object.assign({}, defaultShadowOptions), nameOrConfig.shadowOptions);
        this.elementOptions =
            nameOrConfig.elementOptions === void 0
                ? defaultElementOptions
                : Object.assign(Object.assign({}, defaultElementOptions), nameOrConfig.elementOptions);
        this.styles =
            nameOrConfig.styles === void 0
                ? void 0
                : Array.isArray(nameOrConfig.styles)
                    ? _styles_element_styles_js__WEBPACK_IMPORTED_MODULE_2__.ElementStyles.create(nameOrConfig.styles)
                    : nameOrConfig.styles instanceof _styles_element_styles_js__WEBPACK_IMPORTED_MODULE_2__.ElementStyles
                        ? nameOrConfig.styles
                        : _styles_element_styles_js__WEBPACK_IMPORTED_MODULE_2__.ElementStyles.create([nameOrConfig.styles]);
    }
    /**
     * Indicates if this element has been defined in at least one registry.
     */
    get isDefined() {
        return !!fastRegistry.getByType(this.type);
    }
    /**
     * Defines a custom element based on this definition.
     * @param registry - The element registry to define the element in.
     */
    define(registry = customElements) {
        const type = this.type;
        if (fastRegistry.register(this)) {
            const attributes = this.attributes;
            const proto = type.prototype;
            for (let i = 0, ii = attributes.length; i < ii; ++i) {
                _observation_observable_js__WEBPACK_IMPORTED_MODULE_3__.Observable.defineProperty(proto, attributes[i]);
            }
            Reflect.defineProperty(type, "observedAttributes", {
                value: this.observedAttributes,
                enumerable: true,
            });
        }
        if (!registry.get(this.name)) {
            registry.define(this.name, type, this.elementOptions);
        }
        return this;
    }
}
/**
 * Gets the element definition associated with the specified type.
 * @param type - The custom element type to retrieve the definition for.
 */
FASTElementDefinition.forType = fastRegistry.getByType;


/***/ }),

/***/ "./node_modules/@microsoft/fast-element/dist/esm/components/fast-element.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/@microsoft/fast-element/dist/esm/components/fast-element.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FASTElement: () => (/* binding */ FASTElement),
/* harmony export */   customElement: () => (/* binding */ customElement)
/* harmony export */ });
/* harmony import */ var _controller_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controller.js */ "./node_modules/@microsoft/fast-element/dist/esm/components/controller.js");
/* harmony import */ var _fast_definitions_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fast-definitions.js */ "./node_modules/@microsoft/fast-element/dist/esm/components/fast-definitions.js");


/* eslint-disable-next-line @typescript-eslint/explicit-function-return-type */
function createFASTElement(BaseType) {
    return class extends BaseType {
        constructor() {
            /* eslint-disable-next-line */
            super();
            _controller_js__WEBPACK_IMPORTED_MODULE_0__.Controller.forCustomElement(this);
        }
        $emit(type, detail, options) {
            return this.$fastController.emit(type, detail, options);
        }
        connectedCallback() {
            this.$fastController.onConnectedCallback();
        }
        disconnectedCallback() {
            this.$fastController.onDisconnectedCallback();
        }
        attributeChangedCallback(name, oldValue, newValue) {
            this.$fastController.onAttributeChangedCallback(name, oldValue, newValue);
        }
    };
}
/**
 * A minimal base class for FASTElements that also provides
 * static helpers for working with FASTElements.
 * @public
 */
const FASTElement = Object.assign(createFASTElement(HTMLElement), {
    /**
     * Creates a new FASTElement base class inherited from the
     * provided base type.
     * @param BaseType - The base element type to inherit from.
     */
    from(BaseType) {
        return createFASTElement(BaseType);
    },
    /**
     * Defines a platform custom element based on the provided type and definition.
     * @param type - The custom element type to define.
     * @param nameOrDef - The name of the element to define or a definition object
     * that describes the element to define.
     */
    define(type, nameOrDef) {
        return new _fast_definitions_js__WEBPACK_IMPORTED_MODULE_1__.FASTElementDefinition(type, nameOrDef).define().type;
    },
});
/**
 * Decorator: Defines a platform custom element based on `FASTElement`.
 * @param nameOrDef - The name of the element to define or a definition object
 * that describes the element to define.
 * @public
 */
function customElement(nameOrDef) {
    /* eslint-disable-next-line @typescript-eslint/explicit-function-return-type */
    return function (type) {
        new _fast_definitions_js__WEBPACK_IMPORTED_MODULE_1__.FASTElementDefinition(type, nameOrDef).define();
    };
}


/***/ }),

/***/ "./node_modules/@microsoft/fast-element/dist/esm/dom.js":
/*!**************************************************************!*\
  !*** ./node_modules/@microsoft/fast-element/dist/esm/dom.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DOM: () => (/* binding */ DOM),
/* harmony export */   _interpolationEnd: () => (/* binding */ _interpolationEnd),
/* harmony export */   _interpolationStart: () => (/* binding */ _interpolationStart)
/* harmony export */ });
/* harmony import */ var _platform_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./platform.js */ "./node_modules/@microsoft/fast-element/dist/esm/platform.js");

const updateQueue = _platform_js__WEBPACK_IMPORTED_MODULE_0__.$global.FAST.getById(1 /* updateQueue */, () => {
    const tasks = [];
    const pendingErrors = [];
    function throwFirstError() {
        if (pendingErrors.length) {
            throw pendingErrors.shift();
        }
    }
    function tryRunTask(task) {
        try {
            task.call();
        }
        catch (error) {
            pendingErrors.push(error);
            setTimeout(throwFirstError, 0);
        }
    }
    function process() {
        const capacity = 1024;
        let index = 0;
        while (index < tasks.length) {
            tryRunTask(tasks[index]);
            index++;
            // Prevent leaking memory for long chains of recursive calls to `DOM.queueUpdate`.
            // If we call `DOM.queueUpdate` within a task scheduled by `DOM.queueUpdate`, the queue will
            // grow, but to avoid an O(n) walk for every task we execute, we don't
            // shift tasks off the queue after they have been executed.
            // Instead, we periodically shift 1024 tasks off the queue.
            if (index > capacity) {
                // Manually shift all values starting at the index back to the
                // beginning of the queue.
                for (let scan = 0, newLength = tasks.length - index; scan < newLength; scan++) {
                    tasks[scan] = tasks[scan + index];
                }
                tasks.length -= index;
                index = 0;
            }
        }
        tasks.length = 0;
    }
    function enqueue(callable) {
        if (tasks.length < 1) {
            _platform_js__WEBPACK_IMPORTED_MODULE_0__.$global.requestAnimationFrame(process);
        }
        tasks.push(callable);
    }
    return Object.freeze({
        enqueue,
        process,
    });
});
/* eslint-disable */
const fastHTMLPolicy = _platform_js__WEBPACK_IMPORTED_MODULE_0__.$global.trustedTypes.createPolicy("fast-html", {
    createHTML: html => html,
});
/* eslint-enable */
let htmlPolicy = fastHTMLPolicy;
const marker = `fast-${Math.random().toString(36).substring(2, 8)}`;
/** @internal */
const _interpolationStart = `${marker}{`;
/** @internal */
const _interpolationEnd = `}${marker}`;
/**
 * Common DOM APIs.
 * @public
 */
const DOM = Object.freeze({
    /**
     * Indicates whether the DOM supports the adoptedStyleSheets feature.
     */
    supportsAdoptedStyleSheets: Array.isArray(document.adoptedStyleSheets) &&
        "replace" in CSSStyleSheet.prototype,
    /**
     * Sets the HTML trusted types policy used by the templating engine.
     * @param policy - The policy to set for HTML.
     * @remarks
     * This API can only be called once, for security reasons. It should be
     * called by the application developer at the start of their program.
     */
    setHTMLPolicy(policy) {
        if (htmlPolicy !== fastHTMLPolicy) {
            throw new Error("The HTML policy can only be set once.");
        }
        htmlPolicy = policy;
    },
    /**
     * Turns a string into trusted HTML using the configured trusted types policy.
     * @param html - The string to turn into trusted HTML.
     * @remarks
     * Used internally by the template engine when creating templates
     * and setting innerHTML.
     */
    createHTML(html) {
        return htmlPolicy.createHTML(html);
    },
    /**
     * Determines if the provided node is a template marker used by the runtime.
     * @param node - The node to test.
     */
    isMarker(node) {
        return node && node.nodeType === 8 && node.data.startsWith(marker);
    },
    /**
     * Given a marker node, extract the {@link HTMLDirective} index from the placeholder.
     * @param node - The marker node to extract the index from.
     */
    extractDirectiveIndexFromMarker(node) {
        return parseInt(node.data.replace(`${marker}:`, ""));
    },
    /**
     * Creates a placeholder string suitable for marking out a location *within*
     * an attribute value or HTML content.
     * @param index - The directive index to create the placeholder for.
     * @remarks
     * Used internally by binding directives.
     */
    createInterpolationPlaceholder(index) {
        return `${_interpolationStart}${index}${_interpolationEnd}`;
    },
    /**
     * Creates a placeholder that manifests itself as an attribute on an
     * element.
     * @param attributeName - The name of the custom attribute.
     * @param index - The directive index to create the placeholder for.
     * @remarks
     * Used internally by attribute directives such as `ref`, `slotted`, and `children`.
     */
    createCustomAttributePlaceholder(attributeName, index) {
        return `${attributeName}="${this.createInterpolationPlaceholder(index)}"`;
    },
    /**
     * Creates a placeholder that manifests itself as a marker within the DOM structure.
     * @param index - The directive index to create the placeholder for.
     * @remarks
     * Used internally by structural directives such as `repeat`.
     */
    createBlockPlaceholder(index) {
        return `<!--${marker}:${index}-->`;
    },
    /**
     * Schedules DOM update work in the next async batch.
     * @param callable - The callable function or object to queue.
     */
    queueUpdate: updateQueue.enqueue,
    /**
     * Immediately processes all work previously scheduled
     * through queueUpdate.
     * @remarks
     * This also forces nextUpdate promises
     * to resolve.
     */
    processUpdates: updateQueue.process,
    /**
     * Resolves with the next DOM update.
     */
    nextUpdate() {
        return new Promise(updateQueue.enqueue);
    },
    /**
     * Sets an attribute value on an element.
     * @param element - The element to set the attribute value on.
     * @param attributeName - The attribute name to set.
     * @param value - The value of the attribute to set.
     * @remarks
     * If the value is `null` or `undefined`, the attribute is removed, otherwise
     * it is set to the provided value using the standard `setAttribute` API.
     */
    setAttribute(element, attributeName, value) {
        if (value === null || value === undefined) {
            element.removeAttribute(attributeName);
        }
        else {
            element.setAttribute(attributeName, value);
        }
    },
    /**
     * Sets a boolean attribute value.
     * @param element - The element to set the boolean attribute value on.
     * @param attributeName - The attribute name to set.
     * @param value - The value of the attribute to set.
     * @remarks
     * If the value is true, the attribute is added; otherwise it is removed.
     */
    setBooleanAttribute(element, attributeName, value) {
        value
            ? element.setAttribute(attributeName, "")
            : element.removeAttribute(attributeName);
    },
    /**
     * Removes all the child nodes of the provided parent node.
     * @param parent - The node to remove the children from.
     */
    removeChildNodes(parent) {
        for (let child = parent.firstChild; child !== null; child = parent.firstChild) {
            parent.removeChild(child);
        }
    },
    /**
     * Creates a TreeWalker configured to walk a template fragment.
     * @param fragment - The fragment to walk.
     */
    createTemplateWalker(fragment) {
        return document.createTreeWalker(fragment, 133, // element, text, comment
        null, false);
    },
});


/***/ }),

/***/ "./node_modules/@microsoft/fast-element/dist/esm/interfaces.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@microsoft/fast-element/dist/esm/interfaces.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isFunction: () => (/* binding */ isFunction)
/* harmony export */ });
/**
 * Determines whether or not an object is a function.
 * @public
 */
const isFunction = (object) => typeof object === "function";


/***/ }),

/***/ "./node_modules/@microsoft/fast-element/dist/esm/observation/notifier.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@microsoft/fast-element/dist/esm/observation/notifier.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PropertyChangeNotifier: () => (/* binding */ PropertyChangeNotifier),
/* harmony export */   SubscriberSet: () => (/* binding */ SubscriberSet)
/* harmony export */ });
/**
 * An implementation of {@link Notifier} that efficiently keeps track of
 * subscribers interested in a specific change notification on an
 * observable source.
 *
 * @remarks
 * This set is optimized for the most common scenario of 1 or 2 subscribers.
 * With this in mind, it can store a subscriber in an internal field, allowing it to avoid Array#push operations.
 * If the set ever exceeds two subscribers, it upgrades to an array automatically.
 * @public
 */
class SubscriberSet {
    /**
     * Creates an instance of SubscriberSet for the specified source.
     * @param source - The object source that subscribers will receive notifications from.
     * @param initialSubscriber - An initial subscriber to changes.
     */
    constructor(source, initialSubscriber) {
        this.sub1 = void 0;
        this.sub2 = void 0;
        this.spillover = void 0;
        this.source = source;
        this.sub1 = initialSubscriber;
    }
    /**
     * Checks whether the provided subscriber has been added to this set.
     * @param subscriber - The subscriber to test for inclusion in this set.
     */
    has(subscriber) {
        return this.spillover === void 0
            ? this.sub1 === subscriber || this.sub2 === subscriber
            : this.spillover.indexOf(subscriber) !== -1;
    }
    /**
     * Subscribes to notification of changes in an object's state.
     * @param subscriber - The object that is subscribing for change notification.
     */
    subscribe(subscriber) {
        const spillover = this.spillover;
        if (spillover === void 0) {
            if (this.has(subscriber)) {
                return;
            }
            if (this.sub1 === void 0) {
                this.sub1 = subscriber;
                return;
            }
            if (this.sub2 === void 0) {
                this.sub2 = subscriber;
                return;
            }
            this.spillover = [this.sub1, this.sub2, subscriber];
            this.sub1 = void 0;
            this.sub2 = void 0;
        }
        else {
            const index = spillover.indexOf(subscriber);
            if (index === -1) {
                spillover.push(subscriber);
            }
        }
    }
    /**
     * Unsubscribes from notification of changes in an object's state.
     * @param subscriber - The object that is unsubscribing from change notification.
     */
    unsubscribe(subscriber) {
        const spillover = this.spillover;
        if (spillover === void 0) {
            if (this.sub1 === subscriber) {
                this.sub1 = void 0;
            }
            else if (this.sub2 === subscriber) {
                this.sub2 = void 0;
            }
        }
        else {
            const index = spillover.indexOf(subscriber);
            if (index !== -1) {
                spillover.splice(index, 1);
            }
        }
    }
    /**
     * Notifies all subscribers.
     * @param args - Data passed along to subscribers during notification.
     */
    notify(args) {
        const spillover = this.spillover;
        const source = this.source;
        if (spillover === void 0) {
            const sub1 = this.sub1;
            const sub2 = this.sub2;
            if (sub1 !== void 0) {
                sub1.handleChange(source, args);
            }
            if (sub2 !== void 0) {
                sub2.handleChange(source, args);
            }
        }
        else {
            for (let i = 0, ii = spillover.length; i < ii; ++i) {
                spillover[i].handleChange(source, args);
            }
        }
    }
}
/**
 * An implementation of Notifier that allows subscribers to be notified
 * of individual property changes on an object.
 * @public
 */
class PropertyChangeNotifier {
    /**
     * Creates an instance of PropertyChangeNotifier for the specified source.
     * @param source - The object source that subscribers will receive notifications from.
     */
    constructor(source) {
        this.subscribers = {};
        this.sourceSubscribers = null;
        this.source = source;
    }
    /**
     * Notifies all subscribers, based on the specified property.
     * @param propertyName - The property name, passed along to subscribers during notification.
     */
    notify(propertyName) {
        var _a;
        const subscribers = this.subscribers[propertyName];
        if (subscribers !== void 0) {
            subscribers.notify(propertyName);
        }
        (_a = this.sourceSubscribers) === null || _a === void 0 ? void 0 : _a.notify(propertyName);
    }
    /**
     * Subscribes to notification of changes in an object's state.
     * @param subscriber - The object that is subscribing for change notification.
     * @param propertyToWatch - The name of the property that the subscriber is interested in watching for changes.
     */
    subscribe(subscriber, propertyToWatch) {
        var _a;
        if (propertyToWatch) {
            let subscribers = this.subscribers[propertyToWatch];
            if (subscribers === void 0) {
                this.subscribers[propertyToWatch] = subscribers = new SubscriberSet(this.source);
            }
            subscribers.subscribe(subscriber);
        }
        else {
            this.sourceSubscribers =
                (_a = this.sourceSubscribers) !== null && _a !== void 0 ? _a : new SubscriberSet(this.source);
            this.sourceSubscribers.subscribe(subscriber);
        }
    }
    /**
     * Unsubscribes from notification of changes in an object's state.
     * @param subscriber - The object that is unsubscribing from change notification.
     * @param propertyToUnwatch - The name of the property that the subscriber is no longer interested in watching.
     */
    unsubscribe(subscriber, propertyToUnwatch) {
        var _a;
        if (propertyToUnwatch) {
            const subscribers = this.subscribers[propertyToUnwatch];
            if (subscribers !== void 0) {
                subscribers.unsubscribe(subscriber);
            }
        }
        else {
            (_a = this.sourceSubscribers) === null || _a === void 0 ? void 0 : _a.unsubscribe(subscriber);
        }
    }
}


/***/ }),

/***/ "./node_modules/@microsoft/fast-element/dist/esm/observation/observable.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@microsoft/fast-element/dist/esm/observation/observable.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ExecutionContext: () => (/* binding */ ExecutionContext),
/* harmony export */   Observable: () => (/* binding */ Observable),
/* harmony export */   defaultExecutionContext: () => (/* binding */ defaultExecutionContext),
/* harmony export */   observable: () => (/* binding */ observable),
/* harmony export */   volatile: () => (/* binding */ volatile)
/* harmony export */ });
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dom.js */ "./node_modules/@microsoft/fast-element/dist/esm/dom.js");
/* harmony import */ var _platform_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../platform.js */ "./node_modules/@microsoft/fast-element/dist/esm/platform.js");
/* harmony import */ var _notifier_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./notifier.js */ "./node_modules/@microsoft/fast-element/dist/esm/observation/notifier.js");



/**
 * Common Observable APIs.
 * @public
 */
const Observable = _platform_js__WEBPACK_IMPORTED_MODULE_0__.FAST.getById(2 /* observable */, () => {
    const volatileRegex = /(:|&&|\|\||if)/;
    const notifierLookup = new WeakMap();
    const queueUpdate = _dom_js__WEBPACK_IMPORTED_MODULE_1__.DOM.queueUpdate;
    let watcher = void 0;
    let createArrayObserver = (array) => {
        throw new Error("Must call enableArrayObservation before observing arrays.");
    };
    function getNotifier(source) {
        let found = source.$fastController || notifierLookup.get(source);
        if (found === void 0) {
            if (Array.isArray(source)) {
                found = createArrayObserver(source);
            }
            else {
                notifierLookup.set(source, (found = new _notifier_js__WEBPACK_IMPORTED_MODULE_2__.PropertyChangeNotifier(source)));
            }
        }
        return found;
    }
    const getAccessors = (0,_platform_js__WEBPACK_IMPORTED_MODULE_0__.createMetadataLocator)();
    class DefaultObservableAccessor {
        constructor(name) {
            this.name = name;
            this.field = `_${name}`;
            this.callback = `${name}Changed`;
        }
        getValue(source) {
            if (watcher !== void 0) {
                watcher.watch(source, this.name);
            }
            return source[this.field];
        }
        setValue(source, newValue) {
            const field = this.field;
            const oldValue = source[field];
            if (oldValue !== newValue) {
                source[field] = newValue;
                const callback = source[this.callback];
                if (typeof callback === "function") {
                    callback.call(source, oldValue, newValue);
                }
                getNotifier(source).notify(this.name);
            }
        }
    }
    class BindingObserverImplementation extends _notifier_js__WEBPACK_IMPORTED_MODULE_2__.SubscriberSet {
        constructor(binding, initialSubscriber, isVolatileBinding = false) {
            super(binding, initialSubscriber);
            this.binding = binding;
            this.isVolatileBinding = isVolatileBinding;
            this.needsRefresh = true;
            this.needsQueue = true;
            this.first = this;
            this.last = null;
            this.propertySource = void 0;
            this.propertyName = void 0;
            this.notifier = void 0;
            this.next = void 0;
        }
        observe(source, context) {
            if (this.needsRefresh && this.last !== null) {
                this.disconnect();
            }
            const previousWatcher = watcher;
            watcher = this.needsRefresh ? this : void 0;
            this.needsRefresh = this.isVolatileBinding;
            const result = this.binding(source, context);
            watcher = previousWatcher;
            return result;
        }
        disconnect() {
            if (this.last !== null) {
                let current = this.first;
                while (current !== void 0) {
                    current.notifier.unsubscribe(this, current.propertyName);
                    current = current.next;
                }
                this.last = null;
                this.needsRefresh = this.needsQueue = true;
            }
        }
        watch(propertySource, propertyName) {
            const prev = this.last;
            const notifier = getNotifier(propertySource);
            const current = prev === null ? this.first : {};
            current.propertySource = propertySource;
            current.propertyName = propertyName;
            current.notifier = notifier;
            notifier.subscribe(this, propertyName);
            if (prev !== null) {
                if (!this.needsRefresh) {
                    // Declaring the variable prior to assignment below circumvents
                    // a bug in Angular's optimization process causing infinite recursion
                    // of this watch() method. Details https://github.com/microsoft/fast/issues/4969
                    let prevValue;
                    watcher = void 0;
                    /* eslint-disable-next-line */
                    prevValue = prev.propertySource[prev.propertyName];
                    /* eslint-disable-next-line @typescript-eslint/no-this-alias */
                    watcher = this;
                    if (propertySource === prevValue) {
                        this.needsRefresh = true;
                    }
                }
                prev.next = current;
            }
            this.last = current;
        }
        handleChange() {
            if (this.needsQueue) {
                this.needsQueue = false;
                queueUpdate(this);
            }
        }
        call() {
            if (this.last !== null) {
                this.needsQueue = true;
                this.notify(this);
            }
        }
        records() {
            let next = this.first;
            return {
                next: () => {
                    const current = next;
                    if (current === undefined) {
                        return { value: void 0, done: true };
                    }
                    else {
                        next = next.next;
                        return {
                            value: current,
                            done: false,
                        };
                    }
                },
                [Symbol.iterator]: function () {
                    return this;
                },
            };
        }
    }
    return Object.freeze({
        /**
         * @internal
         * @param factory - The factory used to create array observers.
         */
        setArrayObserverFactory(factory) {
            createArrayObserver = factory;
        },
        /**
         * Gets a notifier for an object or Array.
         * @param source - The object or Array to get the notifier for.
         */
        getNotifier,
        /**
         * Records a property change for a source object.
         * @param source - The object to record the change against.
         * @param propertyName - The property to track as changed.
         */
        track(source, propertyName) {
            if (watcher !== void 0) {
                watcher.watch(source, propertyName);
            }
        },
        /**
         * Notifies watchers that the currently executing property getter or function is volatile
         * with respect to its observable dependencies.
         */
        trackVolatile() {
            if (watcher !== void 0) {
                watcher.needsRefresh = true;
            }
        },
        /**
         * Notifies subscribers of a source object of changes.
         * @param source - the object to notify of changes.
         * @param args - The change args to pass to subscribers.
         */
        notify(source, args) {
            getNotifier(source).notify(args);
        },
        /**
         * Defines an observable property on an object or prototype.
         * @param target - The target object to define the observable on.
         * @param nameOrAccessor - The name of the property to define as observable;
         * or a custom accessor that specifies the property name and accessor implementation.
         */
        defineProperty(target, nameOrAccessor) {
            if (typeof nameOrAccessor === "string") {
                nameOrAccessor = new DefaultObservableAccessor(nameOrAccessor);
            }
            getAccessors(target).push(nameOrAccessor);
            Reflect.defineProperty(target, nameOrAccessor.name, {
                enumerable: true,
                get: function () {
                    return nameOrAccessor.getValue(this);
                },
                set: function (newValue) {
                    nameOrAccessor.setValue(this, newValue);
                },
            });
        },
        /**
         * Finds all the observable accessors defined on the target,
         * including its prototype chain.
         * @param target - The target object to search for accessor on.
         */
        getAccessors,
        /**
         * Creates a {@link BindingObserver} that can watch the
         * provided {@link Binding} for changes.
         * @param binding - The binding to observe.
         * @param initialSubscriber - An initial subscriber to changes in the binding value.
         * @param isVolatileBinding - Indicates whether the binding's dependency list must be re-evaluated on every value evaluation.
         */
        binding(binding, initialSubscriber, isVolatileBinding = this.isVolatileBinding(binding)) {
            return new BindingObserverImplementation(binding, initialSubscriber, isVolatileBinding);
        },
        /**
         * Determines whether a binding expression is volatile and needs to have its dependency list re-evaluated
         * on every evaluation of the value.
         * @param binding - The binding to inspect.
         */
        isVolatileBinding(binding) {
            return volatileRegex.test(binding.toString());
        },
    });
});
/**
 * Decorator: Defines an observable property on the target.
 * @param target - The target to define the observable on.
 * @param nameOrAccessor - The property name or accessor to define the observable as.
 * @public
 */
function observable(target, nameOrAccessor) {
    Observable.defineProperty(target, nameOrAccessor);
}
/**
 * Decorator: Marks a property getter as having volatile observable dependencies.
 * @param target - The target that the property is defined on.
 * @param name - The property name.
 * @param name - The existing descriptor.
 * @public
 */
function volatile(target, name, descriptor) {
    return Object.assign({}, descriptor, {
        get: function () {
            Observable.trackVolatile();
            return descriptor.get.apply(this);
        },
    });
}
const contextEvent = _platform_js__WEBPACK_IMPORTED_MODULE_0__.FAST.getById(3 /* contextEvent */, () => {
    let current = null;
    return {
        get() {
            return current;
        },
        set(event) {
            current = event;
        },
    };
});
/**
 * Provides additional contextual information available to behaviors and expressions.
 * @public
 */
class ExecutionContext {
    constructor() {
        /**
         * The index of the current item within a repeat context.
         */
        this.index = 0;
        /**
         * The length of the current collection within a repeat context.
         */
        this.length = 0;
        /**
         * The parent data object within a repeat context.
         */
        this.parent = null;
        /**
         * The parent execution context when in nested context scenarios.
         */
        this.parentContext = null;
    }
    /**
     * The current event within an event handler.
     */
    get event() {
        return contextEvent.get();
    }
    /**
     * Indicates whether the current item within a repeat context
     * has an even index.
     */
    get isEven() {
        return this.index % 2 === 0;
    }
    /**
     * Indicates whether the current item within a repeat context
     * has an odd index.
     */
    get isOdd() {
        return this.index % 2 !== 0;
    }
    /**
     * Indicates whether the current item within a repeat context
     * is the first item in the collection.
     */
    get isFirst() {
        return this.index === 0;
    }
    /**
     * Indicates whether the current item within a repeat context
     * is somewhere in the middle of the collection.
     */
    get isInMiddle() {
        return !this.isFirst && !this.isLast;
    }
    /**
     * Indicates whether the current item within a repeat context
     * is the last item in the collection.
     */
    get isLast() {
        return this.index === this.length - 1;
    }
    /**
     * Sets the event for the current execution context.
     * @param event - The event to set.
     * @internal
     */
    static setEvent(event) {
        contextEvent.set(event);
    }
}
Observable.defineProperty(ExecutionContext.prototype, "index");
Observable.defineProperty(ExecutionContext.prototype, "length");
/**
 * The default execution context used in binding expressions.
 * @public
 */
const defaultExecutionContext = Object.seal(new ExecutionContext());


/***/ }),

/***/ "./node_modules/@microsoft/fast-element/dist/esm/platform.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@microsoft/fast-element/dist/esm/platform.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $global: () => (/* binding */ $global),
/* harmony export */   FAST: () => (/* binding */ FAST),
/* harmony export */   createMetadataLocator: () => (/* binding */ createMetadataLocator),
/* harmony export */   emptyArray: () => (/* binding */ emptyArray)
/* harmony export */ });
/**
 * A reference to globalThis, with support
 * for browsers that don't yet support the spec.
 * @public
 */
const $global = (function () {
    if (typeof globalThis !== "undefined") {
        // We're running in a modern environment.
        return globalThis;
    }
    if (typeof global !== "undefined") {
        // We're running in NodeJS
        return global;
    }
    if (typeof self !== "undefined") {
        // We're running in a worker.
        return self;
    }
    if (typeof window !== "undefined") {
        // We're running in the browser's main thread.
        return window;
    }
    try {
        // Hopefully we never get here...
        // Not all environments allow eval and Function. Use only as a last resort:
        // eslint-disable-next-line no-new-func
        return new Function("return this")();
    }
    catch (_a) {
        // If all fails, give up and create an object.
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        return {};
    }
})();
// API-only Polyfill for trustedTypes
if ($global.trustedTypes === void 0) {
    $global.trustedTypes = { createPolicy: (n, r) => r };
}
const propConfig = {
    configurable: false,
    enumerable: false,
    writable: false,
};
if ($global.FAST === void 0) {
    Reflect.defineProperty($global, "FAST", Object.assign({ value: Object.create(null) }, propConfig));
}
/**
 * The FAST global.
 * @internal
 */
const FAST = $global.FAST;
if (FAST.getById === void 0) {
    const storage = Object.create(null);
    Reflect.defineProperty(FAST, "getById", Object.assign({ value(id, initialize) {
            let found = storage[id];
            if (found === void 0) {
                found = initialize ? (storage[id] = initialize()) : null;
            }
            return found;
        } }, propConfig));
}
/**
 * A readonly, empty array.
 * @remarks
 * Typically returned by APIs that return arrays when there are
 * no actual items to return.
 * @internal
 */
const emptyArray = Object.freeze([]);
/**
 * Creates a function capable of locating metadata associated with a type.
 * @returns A metadata locator function.
 * @internal
 */
function createMetadataLocator() {
    const metadataLookup = new WeakMap();
    return function (target) {
        let metadata = metadataLookup.get(target);
        if (metadata === void 0) {
            let currentTarget = Reflect.getPrototypeOf(target);
            while (metadata === void 0 && currentTarget !== null) {
                metadata = metadataLookup.get(currentTarget);
                currentTarget = Reflect.getPrototypeOf(currentTarget);
            }
            metadata = metadata === void 0 ? [] : metadata.slice(0);
            metadataLookup.set(target, metadata);
        }
        return metadata;
    };
}


/***/ }),

/***/ "./node_modules/@microsoft/fast-element/dist/esm/styles/css-directive.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@microsoft/fast-element/dist/esm/styles/css-directive.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CSSDirective: () => (/* binding */ CSSDirective)
/* harmony export */ });
/**
 * Directive for use in {@link css}.
 *
 * @public
 */
class CSSDirective {
    /**
     * Creates a CSS fragment to interpolate into the CSS document.
     * @returns - the string to interpolate into CSS
     */
    createCSS() {
        return "";
    }
    /**
     * Creates a behavior to bind to the host element.
     * @returns - the behavior to bind to the host element, or undefined.
     */
    createBehavior() {
        return undefined;
    }
}


/***/ }),

/***/ "./node_modules/@microsoft/fast-element/dist/esm/styles/css.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@microsoft/fast-element/dist/esm/styles/css.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   css: () => (/* binding */ css),
/* harmony export */   cssPartial: () => (/* binding */ cssPartial)
/* harmony export */ });
/* harmony import */ var _css_directive_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./css-directive.js */ "./node_modules/@microsoft/fast-element/dist/esm/styles/css-directive.js");
/* harmony import */ var _element_styles_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./element-styles.js */ "./node_modules/@microsoft/fast-element/dist/esm/styles/element-styles.js");


function collectStyles(strings, values) {
    const styles = [];
    let cssString = "";
    const behaviors = [];
    for (let i = 0, ii = strings.length - 1; i < ii; ++i) {
        cssString += strings[i];
        let value = values[i];
        if (value instanceof _css_directive_js__WEBPACK_IMPORTED_MODULE_0__.CSSDirective) {
            const behavior = value.createBehavior();
            value = value.createCSS();
            if (behavior) {
                behaviors.push(behavior);
            }
        }
        if (value instanceof _element_styles_js__WEBPACK_IMPORTED_MODULE_1__.ElementStyles || value instanceof CSSStyleSheet) {
            if (cssString.trim() !== "") {
                styles.push(cssString);
                cssString = "";
            }
            styles.push(value);
        }
        else {
            cssString += value;
        }
    }
    cssString += strings[strings.length - 1];
    if (cssString.trim() !== "") {
        styles.push(cssString);
    }
    return {
        styles,
        behaviors,
    };
}
/**
 * Transforms a template literal string into styles.
 * @param strings - The string fragments that are interpolated with the values.
 * @param values - The values that are interpolated with the string fragments.
 * @remarks
 * The css helper supports interpolation of strings and ElementStyle instances.
 * @public
 */
function css(strings, ...values) {
    const { styles, behaviors } = collectStyles(strings, values);
    const elementStyles = _element_styles_js__WEBPACK_IMPORTED_MODULE_1__.ElementStyles.create(styles);
    if (behaviors.length) {
        elementStyles.withBehaviors(...behaviors);
    }
    return elementStyles;
}
class CSSPartial extends _css_directive_js__WEBPACK_IMPORTED_MODULE_0__.CSSDirective {
    constructor(styles, behaviors) {
        super();
        this.behaviors = behaviors;
        this.css = "";
        const stylesheets = styles.reduce((accumulated, current) => {
            if (typeof current === "string") {
                this.css += current;
            }
            else {
                accumulated.push(current);
            }
            return accumulated;
        }, []);
        if (stylesheets.length) {
            this.styles = _element_styles_js__WEBPACK_IMPORTED_MODULE_1__.ElementStyles.create(stylesheets);
        }
    }
    createBehavior() {
        return this;
    }
    createCSS() {
        return this.css;
    }
    bind(el) {
        if (this.styles) {
            el.$fastController.addStyles(this.styles);
        }
        if (this.behaviors.length) {
            el.$fastController.addBehaviors(this.behaviors);
        }
    }
    unbind(el) {
        if (this.styles) {
            el.$fastController.removeStyles(this.styles);
        }
        if (this.behaviors.length) {
            el.$fastController.removeBehaviors(this.behaviors);
        }
    }
}
/**
 * Transforms a template literal string into partial CSS.
 * @param strings - The string fragments that are interpolated with the values.
 * @param values - The values that are interpolated with the string fragments.
 * @public
 */
function cssPartial(strings, ...values) {
    const { styles, behaviors } = collectStyles(strings, values);
    return new CSSPartial(styles, behaviors);
}


/***/ }),

/***/ "./node_modules/@microsoft/fast-element/dist/esm/styles/element-styles.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@microsoft/fast-element/dist/esm/styles/element-styles.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdoptedStyleSheetsStyles: () => (/* binding */ AdoptedStyleSheetsStyles),
/* harmony export */   ElementStyles: () => (/* binding */ ElementStyles),
/* harmony export */   StyleElementStyles: () => (/* binding */ StyleElementStyles),
/* harmony export */   prependToAdoptedStyleSheetsSymbol: () => (/* binding */ prependToAdoptedStyleSheetsSymbol)
/* harmony export */ });
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom.js */ "./node_modules/@microsoft/fast-element/dist/esm/dom.js");

/**
 * Represents styles that can be applied to a custom element.
 * @public
 */
class ElementStyles {
    constructor() {
        this.targets = new WeakSet();
    }
    /** @internal */
    addStylesTo(target) {
        this.targets.add(target);
    }
    /** @internal */
    removeStylesFrom(target) {
        this.targets.delete(target);
    }
    /** @internal */
    isAttachedTo(target) {
        return this.targets.has(target);
    }
    /**
     * Associates behaviors with this set of styles.
     * @param behaviors - The behaviors to associate.
     */
    withBehaviors(...behaviors) {
        this.behaviors =
            this.behaviors === null ? behaviors : this.behaviors.concat(behaviors);
        return this;
    }
}
/**
 * Create ElementStyles from ComposableStyles.
 */
ElementStyles.create = (() => {
    if (_dom_js__WEBPACK_IMPORTED_MODULE_0__.DOM.supportsAdoptedStyleSheets) {
        const styleSheetCache = new Map();
        return (styles) => 
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        new AdoptedStyleSheetsStyles(styles, styleSheetCache);
    }
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return (styles) => new StyleElementStyles(styles);
})();
function reduceStyles(styles) {
    return styles
        .map((x) => x instanceof ElementStyles ? reduceStyles(x.styles) : [x])
        .reduce((prev, curr) => prev.concat(curr), []);
}
function reduceBehaviors(styles) {
    return styles
        .map((x) => (x instanceof ElementStyles ? x.behaviors : null))
        .reduce((prev, curr) => {
        if (curr === null) {
            return prev;
        }
        if (prev === null) {
            prev = [];
        }
        return prev.concat(curr);
    }, null);
}
/**
 * A Symbol that can be added to a CSSStyleSheet to cause it to be prepended (rather than appended) to adoptedStyleSheets.
 * @public
 */
const prependToAdoptedStyleSheetsSymbol = Symbol("prependToAdoptedStyleSheets");
function separateSheetsToPrepend(sheets) {
    const prepend = [];
    const append = [];
    sheets.forEach(x => (x[prependToAdoptedStyleSheetsSymbol] ? prepend : append).push(x));
    return { prepend, append };
}
let addAdoptedStyleSheets = (target, sheets) => {
    const { prepend, append } = separateSheetsToPrepend(sheets);
    target.adoptedStyleSheets = [...prepend, ...target.adoptedStyleSheets, ...append];
};
let removeAdoptedStyleSheets = (target, sheets) => {
    target.adoptedStyleSheets = target.adoptedStyleSheets.filter((x) => sheets.indexOf(x) === -1);
};
if (_dom_js__WEBPACK_IMPORTED_MODULE_0__.DOM.supportsAdoptedStyleSheets) {
    try {
        // Test if browser implementation uses FrozenArray.
        // If not, use push / splice to alter the stylesheets
        // in place. This circumvents a bug in Safari 16.4 where
        // periodically, assigning the array would previously
        // cause sheets to be removed.
        document.adoptedStyleSheets.push();
        document.adoptedStyleSheets.splice();
        addAdoptedStyleSheets = (target, sheets) => {
            const { prepend, append } = separateSheetsToPrepend(sheets);
            target.adoptedStyleSheets.splice(0, 0, ...prepend);
            target.adoptedStyleSheets.push(...append);
        };
        removeAdoptedStyleSheets = (target, sheets) => {
            for (const sheet of sheets) {
                const index = target.adoptedStyleSheets.indexOf(sheet);
                if (index !== -1) {
                    target.adoptedStyleSheets.splice(index, 1);
                }
            }
        };
    }
    catch (e) {
        // Do nothing if an error is thrown, the default
        // case handles FrozenArray.
    }
}
/**
 * https://wicg.github.io/construct-stylesheets/
 * https://developers.google.com/web/updates/2019/02/constructable-stylesheets
 *
 * @internal
 */
class AdoptedStyleSheetsStyles extends ElementStyles {
    constructor(styles, styleSheetCache) {
        super();
        this.styles = styles;
        this.styleSheetCache = styleSheetCache;
        this._styleSheets = void 0;
        this.behaviors = reduceBehaviors(styles);
    }
    get styleSheets() {
        if (this._styleSheets === void 0) {
            const styles = this.styles;
            const styleSheetCache = this.styleSheetCache;
            this._styleSheets = reduceStyles(styles).map((x) => {
                if (x instanceof CSSStyleSheet) {
                    return x;
                }
                let sheet = styleSheetCache.get(x);
                if (sheet === void 0) {
                    sheet = new CSSStyleSheet();
                    sheet.replaceSync(x);
                    styleSheetCache.set(x, sheet);
                }
                return sheet;
            });
        }
        return this._styleSheets;
    }
    addStylesTo(target) {
        addAdoptedStyleSheets(target, this.styleSheets);
        super.addStylesTo(target);
    }
    removeStylesFrom(target) {
        removeAdoptedStyleSheets(target, this.styleSheets);
        super.removeStylesFrom(target);
    }
}
let styleClassId = 0;
function getNextStyleClass() {
    return `fast-style-class-${++styleClassId}`;
}
/**
 * @internal
 */
class StyleElementStyles extends ElementStyles {
    constructor(styles) {
        super();
        this.styles = styles;
        this.behaviors = null;
        this.behaviors = reduceBehaviors(styles);
        this.styleSheets = reduceStyles(styles);
        this.styleClass = getNextStyleClass();
    }
    addStylesTo(target) {
        const styleSheets = this.styleSheets;
        const styleClass = this.styleClass;
        target = this.normalizeTarget(target);
        for (let i = 0; i < styleSheets.length; i++) {
            const element = document.createElement("style");
            element.innerHTML = styleSheets[i];
            element.className = styleClass;
            target.append(element);
        }
        super.addStylesTo(target);
    }
    removeStylesFrom(target) {
        target = this.normalizeTarget(target);
        const styles = target.querySelectorAll(`.${this.styleClass}`);
        for (let i = 0, ii = styles.length; i < ii; ++i) {
            target.removeChild(styles[i]);
        }
        super.removeStylesFrom(target);
    }
    isAttachedTo(target) {
        return super.isAttachedTo(this.normalizeTarget(target));
    }
    normalizeTarget(target) {
        return target === document ? document.body : target;
    }
}


/***/ }),

/***/ "./node_modules/@microsoft/fast-element/dist/esm/templating/binding.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@microsoft/fast-element/dist/esm/templating/binding.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BindingBehavior: () => (/* binding */ BindingBehavior),
/* harmony export */   HTMLBindingDirective: () => (/* binding */ HTMLBindingDirective)
/* harmony export */ });
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dom.js */ "./node_modules/@microsoft/fast-element/dist/esm/dom.js");
/* harmony import */ var _observation_observable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../observation/observable.js */ "./node_modules/@microsoft/fast-element/dist/esm/observation/observable.js");
/* harmony import */ var _html_directive_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./html-directive.js */ "./node_modules/@microsoft/fast-element/dist/esm/templating/html-directive.js");



function normalBind(source, context) {
    this.source = source;
    this.context = context;
    if (this.bindingObserver === null) {
        this.bindingObserver = _observation_observable_js__WEBPACK_IMPORTED_MODULE_0__.Observable.binding(this.binding, this, this.isBindingVolatile);
    }
    this.updateTarget(this.bindingObserver.observe(source, context));
}
function triggerBind(source, context) {
    this.source = source;
    this.context = context;
    this.target.addEventListener(this.targetName, this);
}
function normalUnbind() {
    this.bindingObserver.disconnect();
    this.source = null;
    this.context = null;
}
function contentUnbind() {
    this.bindingObserver.disconnect();
    this.source = null;
    this.context = null;
    const view = this.target.$fastView;
    if (view !== void 0 && view.isComposed) {
        view.unbind();
        view.needsBindOnly = true;
    }
}
function triggerUnbind() {
    this.target.removeEventListener(this.targetName, this);
    this.source = null;
    this.context = null;
}
function updateAttributeTarget(value) {
    _dom_js__WEBPACK_IMPORTED_MODULE_1__.DOM.setAttribute(this.target, this.targetName, value);
}
function updateBooleanAttributeTarget(value) {
    _dom_js__WEBPACK_IMPORTED_MODULE_1__.DOM.setBooleanAttribute(this.target, this.targetName, value);
}
function updateContentTarget(value) {
    // If there's no actual value, then this equates to the
    // empty string for the purposes of content bindings.
    if (value === null || value === undefined) {
        value = "";
    }
    // If the value has a "create" method, then it's a template-like.
    if (value.create) {
        this.target.textContent = "";
        let view = this.target.$fastView;
        // If there's no previous view that we might be able to
        // reuse then create a new view from the template.
        if (view === void 0) {
            view = value.create();
        }
        else {
            // If there is a previous view, but it wasn't created
            // from the same template as the new value, then we
            // need to remove the old view if it's still in the DOM
            // and create a new view from the template.
            if (this.target.$fastTemplate !== value) {
                if (view.isComposed) {
                    view.remove();
                    view.unbind();
                }
                view = value.create();
            }
        }
        // It's possible that the value is the same as the previous template
        // and that there's actually no need to compose it.
        if (!view.isComposed) {
            view.isComposed = true;
            view.bind(this.source, this.context);
            view.insertBefore(this.target);
            this.target.$fastView = view;
            this.target.$fastTemplate = value;
        }
        else if (view.needsBindOnly) {
            view.needsBindOnly = false;
            view.bind(this.source, this.context);
        }
    }
    else {
        const view = this.target.$fastView;
        // If there is a view and it's currently composed into
        // the DOM, then we need to remove it.
        if (view !== void 0 && view.isComposed) {
            view.isComposed = false;
            view.remove();
            if (view.needsBindOnly) {
                view.needsBindOnly = false;
            }
            else {
                view.unbind();
            }
        }
        this.target.textContent = value;
    }
}
function updatePropertyTarget(value) {
    this.target[this.targetName] = value;
}
function updateClassTarget(value) {
    const classVersions = this.classVersions || Object.create(null);
    const target = this.target;
    let version = this.version || 0;
    // Add the classes, tracking the version at which they were added.
    if (value !== null && value !== undefined && value.length) {
        const names = value.split(/\s+/);
        for (let i = 0, ii = names.length; i < ii; ++i) {
            const currentName = names[i];
            if (currentName === "") {
                continue;
            }
            classVersions[currentName] = version;
            target.classList.add(currentName);
        }
    }
    this.classVersions = classVersions;
    this.version = version + 1;
    // If this is the first call to add classes, there's no need to remove old ones.
    if (version === 0) {
        return;
    }
    // Remove classes from the previous version.
    version -= 1;
    for (const name in classVersions) {
        if (classVersions[name] === version) {
            target.classList.remove(name);
        }
    }
}
/**
 * A directive that configures data binding to element content and attributes.
 * @public
 */
class HTMLBindingDirective extends _html_directive_js__WEBPACK_IMPORTED_MODULE_2__.TargetedHTMLDirective {
    /**
     * Creates an instance of BindingDirective.
     * @param binding - A binding that returns the data used to update the DOM.
     */
    constructor(binding) {
        super();
        this.binding = binding;
        this.bind = normalBind;
        this.unbind = normalUnbind;
        this.updateTarget = updateAttributeTarget;
        this.isBindingVolatile = _observation_observable_js__WEBPACK_IMPORTED_MODULE_0__.Observable.isVolatileBinding(this.binding);
    }
    /**
     * Gets/sets the name of the attribute or property that this
     * binding is targeting.
     */
    get targetName() {
        return this.originalTargetName;
    }
    set targetName(value) {
        this.originalTargetName = value;
        if (value === void 0) {
            return;
        }
        switch (value[0]) {
            case ":":
                this.cleanedTargetName = value.substr(1);
                this.updateTarget = updatePropertyTarget;
                if (this.cleanedTargetName === "innerHTML") {
                    const binding = this.binding;
                    this.binding = (s, c) => _dom_js__WEBPACK_IMPORTED_MODULE_1__.DOM.createHTML(binding(s, c));
                }
                break;
            case "?":
                this.cleanedTargetName = value.substr(1);
                this.updateTarget = updateBooleanAttributeTarget;
                break;
            case "@":
                this.cleanedTargetName = value.substr(1);
                this.bind = triggerBind;
                this.unbind = triggerUnbind;
                break;
            default:
                this.cleanedTargetName = value;
                if (value === "class") {
                    this.updateTarget = updateClassTarget;
                }
                break;
        }
    }
    /**
     * Makes this binding target the content of an element rather than
     * a particular attribute or property.
     */
    targetAtContent() {
        this.updateTarget = updateContentTarget;
        this.unbind = contentUnbind;
    }
    /**
     * Creates the runtime BindingBehavior instance based on the configuration
     * information stored in the BindingDirective.
     * @param target - The target node that the binding behavior should attach to.
     */
    createBehavior(target) {
        /* eslint-disable-next-line @typescript-eslint/no-use-before-define */
        return new BindingBehavior(target, this.binding, this.isBindingVolatile, this.bind, this.unbind, this.updateTarget, this.cleanedTargetName);
    }
}
/**
 * A behavior that updates content and attributes based on a configured
 * BindingDirective.
 * @public
 */
class BindingBehavior {
    /**
     * Creates an instance of BindingBehavior.
     * @param target - The target of the data updates.
     * @param binding - The binding that returns the latest value for an update.
     * @param isBindingVolatile - Indicates whether the binding has volatile dependencies.
     * @param bind - The operation to perform during binding.
     * @param unbind - The operation to perform during unbinding.
     * @param updateTarget - The operation to perform when updating.
     * @param targetName - The name of the target attribute or property to update.
     */
    constructor(target, binding, isBindingVolatile, bind, unbind, updateTarget, targetName) {
        /** @internal */
        this.source = null;
        /** @internal */
        this.context = null;
        /** @internal */
        this.bindingObserver = null;
        this.target = target;
        this.binding = binding;
        this.isBindingVolatile = isBindingVolatile;
        this.bind = bind;
        this.unbind = unbind;
        this.updateTarget = updateTarget;
        this.targetName = targetName;
    }
    /** @internal */
    handleChange() {
        this.updateTarget(this.bindingObserver.observe(this.source, this.context));
    }
    /** @internal */
    handleEvent(event) {
        _observation_observable_js__WEBPACK_IMPORTED_MODULE_0__.ExecutionContext.setEvent(event);
        const result = this.binding(this.source, this.context);
        _observation_observable_js__WEBPACK_IMPORTED_MODULE_0__.ExecutionContext.setEvent(null);
        if (result !== true) {
            event.preventDefault();
        }
    }
}


/***/ }),

/***/ "./node_modules/@microsoft/fast-element/dist/esm/templating/compiler.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@microsoft/fast-element/dist/esm/templating/compiler.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   compileTemplate: () => (/* binding */ compileTemplate)
/* harmony export */ });
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dom.js */ "./node_modules/@microsoft/fast-element/dist/esm/dom.js");
/* harmony import */ var _binding_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./binding.js */ "./node_modules/@microsoft/fast-element/dist/esm/templating/binding.js");


let sharedContext = null;
class CompilationContext {
    addFactory(factory) {
        factory.targetIndex = this.targetIndex;
        this.behaviorFactories.push(factory);
    }
    captureContentBinding(directive) {
        directive.targetAtContent();
        this.addFactory(directive);
    }
    reset() {
        this.behaviorFactories = [];
        this.targetIndex = -1;
    }
    release() {
        /* eslint-disable-next-line @typescript-eslint/no-this-alias */
        sharedContext = this;
    }
    static borrow(directives) {
        const shareable = sharedContext || new CompilationContext();
        shareable.directives = directives;
        shareable.reset();
        sharedContext = null;
        return shareable;
    }
}
function createAggregateBinding(parts) {
    if (parts.length === 1) {
        return parts[0];
    }
    let targetName;
    const partCount = parts.length;
    const finalParts = parts.map((x) => {
        if (typeof x === "string") {
            return () => x;
        }
        targetName = x.targetName || targetName;
        return x.binding;
    });
    const binding = (scope, context) => {
        let output = "";
        for (let i = 0; i < partCount; ++i) {
            output += finalParts[i](scope, context);
        }
        return output;
    };
    const directive = new _binding_js__WEBPACK_IMPORTED_MODULE_0__.HTMLBindingDirective(binding);
    directive.targetName = targetName;
    return directive;
}
const interpolationEndLength = _dom_js__WEBPACK_IMPORTED_MODULE_1__._interpolationEnd.length;
function parseContent(context, value) {
    const valueParts = value.split(_dom_js__WEBPACK_IMPORTED_MODULE_1__._interpolationStart);
    if (valueParts.length === 1) {
        return null;
    }
    const bindingParts = [];
    for (let i = 0, ii = valueParts.length; i < ii; ++i) {
        const current = valueParts[i];
        const index = current.indexOf(_dom_js__WEBPACK_IMPORTED_MODULE_1__._interpolationEnd);
        let literal;
        if (index === -1) {
            literal = current;
        }
        else {
            const directiveIndex = parseInt(current.substring(0, index));
            bindingParts.push(context.directives[directiveIndex]);
            literal = current.substring(index + interpolationEndLength);
        }
        if (literal !== "") {
            bindingParts.push(literal);
        }
    }
    return bindingParts;
}
function compileAttributes(context, node, includeBasicValues = false) {
    const attributes = node.attributes;
    for (let i = 0, ii = attributes.length; i < ii; ++i) {
        const attr = attributes[i];
        const attrValue = attr.value;
        const parseResult = parseContent(context, attrValue);
        let result = null;
        if (parseResult === null) {
            if (includeBasicValues) {
                result = new _binding_js__WEBPACK_IMPORTED_MODULE_0__.HTMLBindingDirective(() => attrValue);
                result.targetName = attr.name;
            }
        }
        else {
            result = createAggregateBinding(parseResult);
        }
        if (result !== null) {
            node.removeAttributeNode(attr);
            i--;
            ii--;
            context.addFactory(result);
        }
    }
}
function compileContent(context, node, walker) {
    const parseResult = parseContent(context, node.textContent);
    if (parseResult !== null) {
        let lastNode = node;
        for (let i = 0, ii = parseResult.length; i < ii; ++i) {
            const currentPart = parseResult[i];
            const currentNode = i === 0
                ? node
                : lastNode.parentNode.insertBefore(document.createTextNode(""), lastNode.nextSibling);
            if (typeof currentPart === "string") {
                currentNode.textContent = currentPart;
            }
            else {
                currentNode.textContent = " ";
                context.captureContentBinding(currentPart);
            }
            lastNode = currentNode;
            context.targetIndex++;
            if (currentNode !== node) {
                walker.nextNode();
            }
        }
        context.targetIndex--;
    }
}
/**
 * Compiles a template and associated directives into a raw compilation
 * result which include a cloneable DocumentFragment and factories capable
 * of attaching runtime behavior to nodes within the fragment.
 * @param template - The template to compile.
 * @param directives - The directives referenced by the template.
 * @remarks
 * The template that is provided for compilation is altered in-place
 * and cannot be compiled again. If the original template must be preserved,
 * it is recommended that you clone the original and pass the clone to this API.
 * @public
 */
function compileTemplate(template, directives) {
    const fragment = template.content;
    // https://bugs.chromium.org/p/chromium/issues/detail?id=1111864
    document.adoptNode(fragment);
    const context = CompilationContext.borrow(directives);
    compileAttributes(context, template, true);
    const hostBehaviorFactories = context.behaviorFactories;
    context.reset();
    const walker = _dom_js__WEBPACK_IMPORTED_MODULE_1__.DOM.createTemplateWalker(fragment);
    let node;
    while ((node = walker.nextNode())) {
        context.targetIndex++;
        switch (node.nodeType) {
            case 1: // element node
                compileAttributes(context, node);
                break;
            case 3: // text node
                compileContent(context, node, walker);
                break;
            case 8: // comment
                if (_dom_js__WEBPACK_IMPORTED_MODULE_1__.DOM.isMarker(node)) {
                    context.addFactory(directives[_dom_js__WEBPACK_IMPORTED_MODULE_1__.DOM.extractDirectiveIndexFromMarker(node)]);
                }
        }
    }
    let targetOffset = 0;
    if (
    // If the first node in a fragment is a marker, that means it's an unstable first node,
    // because something like a when, repeat, etc. could add nodes before the marker.
    // To mitigate this, we insert a stable first node. However, if we insert a node,
    // that will alter the result of the TreeWalker. So, we also need to offset the target index.
    _dom_js__WEBPACK_IMPORTED_MODULE_1__.DOM.isMarker(fragment.firstChild) ||
        // Or if there is only one node and a directive, it means the template's content
        // is *only* the directive. In that case, HTMLView.dispose() misses any nodes inserted by
        // the directive. Inserting a new node ensures proper disposal of nodes added by the directive.
        (fragment.childNodes.length === 1 && directives.length)) {
        fragment.insertBefore(document.createComment(""), fragment.firstChild);
        targetOffset = -1;
    }
    const viewBehaviorFactories = context.behaviorFactories;
    context.release();
    return {
        fragment,
        viewBehaviorFactories,
        hostBehaviorFactories,
        targetOffset,
    };
}


/***/ }),

/***/ "./node_modules/@microsoft/fast-element/dist/esm/templating/html-directive.js":
/*!************************************************************************************!*\
  !*** ./node_modules/@microsoft/fast-element/dist/esm/templating/html-directive.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AttachedBehaviorHTMLDirective: () => (/* binding */ AttachedBehaviorHTMLDirective),
/* harmony export */   HTMLDirective: () => (/* binding */ HTMLDirective),
/* harmony export */   TargetedHTMLDirective: () => (/* binding */ TargetedHTMLDirective)
/* harmony export */ });
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom.js */ "./node_modules/@microsoft/fast-element/dist/esm/dom.js");

/**
 * Instructs the template engine to apply behavior to a node.
 * @public
 */
class HTMLDirective {
    constructor() {
        /**
         * The index of the DOM node to which the created behavior will apply.
         */
        this.targetIndex = 0;
    }
}
/**
 * A {@link HTMLDirective} that targets a named attribute or property on a node.
 * @public
 */
class TargetedHTMLDirective extends HTMLDirective {
    constructor() {
        super(...arguments);
        /**
         * Creates a placeholder string based on the directive's index within the template.
         * @param index - The index of the directive within the template.
         */
        this.createPlaceholder = _dom_js__WEBPACK_IMPORTED_MODULE_0__.DOM.createInterpolationPlaceholder;
    }
}
/**
 * A directive that attaches special behavior to an element via a custom attribute.
 * @public
 */
class AttachedBehaviorHTMLDirective extends HTMLDirective {
    /**
     *
     * @param name - The name of the behavior; used as a custom attribute on the element.
     * @param behavior - The behavior to instantiate and attach to the element.
     * @param options - Options to pass to the behavior during creation.
     */
    constructor(name, behavior, options) {
        super();
        this.name = name;
        this.behavior = behavior;
        this.options = options;
    }
    /**
     * Creates a placeholder string based on the directive's index within the template.
     * @param index - The index of the directive within the template.
     * @remarks
     * Creates a custom attribute placeholder.
     */
    createPlaceholder(index) {
        return _dom_js__WEBPACK_IMPORTED_MODULE_0__.DOM.createCustomAttributePlaceholder(this.name, index);
    }
    /**
     * Creates a behavior for the provided target node.
     * @param target - The node instance to create the behavior for.
     * @remarks
     * Creates an instance of the `behavior` type this directive was constructed with
     * and passes the target and options to that `behavior`'s constructor.
     */
    createBehavior(target) {
        return new this.behavior(target, this.options);
    }
}


/***/ }),

/***/ "./node_modules/@microsoft/fast-element/dist/esm/templating/node-observation.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/@microsoft/fast-element/dist/esm/templating/node-observation.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NodeObservationBehavior: () => (/* binding */ NodeObservationBehavior),
/* harmony export */   elements: () => (/* binding */ elements)
/* harmony export */ });
/* harmony import */ var _observation_observable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../observation/observable.js */ "./node_modules/@microsoft/fast-element/dist/esm/observation/observable.js");
/* harmony import */ var _platform_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../platform.js */ "./node_modules/@microsoft/fast-element/dist/esm/platform.js");


/**
 * Creates a function that can be used to filter a Node array, selecting only elements.
 * @param selector - An optional selector to restrict the filter to.
 * @public
 */
function elements(selector) {
    if (selector) {
        return function (value, index, array) {
            return value.nodeType === 1 && value.matches(selector);
        };
    }
    return function (value, index, array) {
        return value.nodeType === 1;
    };
}
/**
 * A base class for node observation.
 * @internal
 */
class NodeObservationBehavior {
    /**
     * Creates an instance of NodeObservationBehavior.
     * @param target - The target to assign the nodes property on.
     * @param options - The options to use in configuring node observation.
     */
    constructor(target, options) {
        this.target = target;
        this.options = options;
        this.source = null;
    }
    /**
     * Bind this behavior to the source.
     * @param source - The source to bind to.
     * @param context - The execution context that the binding is operating within.
     */
    bind(source) {
        const name = this.options.property;
        this.shouldUpdate = _observation_observable_js__WEBPACK_IMPORTED_MODULE_0__.Observable.getAccessors(source).some((x) => x.name === name);
        this.source = source;
        this.updateTarget(this.computeNodes());
        if (this.shouldUpdate) {
            this.observe();
        }
    }
    /**
     * Unbinds this behavior from the source.
     * @param source - The source to unbind from.
     */
    unbind() {
        this.updateTarget(_platform_js__WEBPACK_IMPORTED_MODULE_1__.emptyArray);
        this.source = null;
        if (this.shouldUpdate) {
            this.disconnect();
        }
    }
    /** @internal */
    handleEvent() {
        this.updateTarget(this.computeNodes());
    }
    computeNodes() {
        let nodes = this.getNodes();
        if (this.options.filter !== void 0) {
            nodes = nodes.filter(this.options.filter);
        }
        return nodes;
    }
    updateTarget(value) {
        this.source[this.options.property] = value;
    }
}


/***/ }),

/***/ "./node_modules/@microsoft/fast-element/dist/esm/templating/ref.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@microsoft/fast-element/dist/esm/templating/ref.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RefBehavior: () => (/* binding */ RefBehavior),
/* harmony export */   ref: () => (/* binding */ ref)
/* harmony export */ });
/* harmony import */ var _html_directive_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./html-directive.js */ "./node_modules/@microsoft/fast-element/dist/esm/templating/html-directive.js");

/**
 * The runtime behavior for template references.
 * @public
 */
class RefBehavior {
    /**
     * Creates an instance of RefBehavior.
     * @param target - The element to reference.
     * @param propertyName - The name of the property to assign the reference to.
     */
    constructor(target, propertyName) {
        this.target = target;
        this.propertyName = propertyName;
    }
    /**
     * Bind this behavior to the source.
     * @param source - The source to bind to.
     * @param context - The execution context that the binding is operating within.
     */
    bind(source) {
        source[this.propertyName] = this.target;
    }
    /**
     * Unbinds this behavior from the source.
     * @param source - The source to unbind from.
     */
    /* eslint-disable-next-line @typescript-eslint/no-empty-function */
    unbind() { }
}
/**
 * A directive that observes the updates a property with a reference to the element.
 * @param propertyName - The name of the property to assign the reference to.
 * @public
 */
function ref(propertyName) {
    return new _html_directive_js__WEBPACK_IMPORTED_MODULE_0__.AttachedBehaviorHTMLDirective("fast-ref", RefBehavior, propertyName);
}


/***/ }),

/***/ "./node_modules/@microsoft/fast-element/dist/esm/templating/slotted.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@microsoft/fast-element/dist/esm/templating/slotted.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SlottedBehavior: () => (/* binding */ SlottedBehavior),
/* harmony export */   slotted: () => (/* binding */ slotted)
/* harmony export */ });
/* harmony import */ var _html_directive_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./html-directive.js */ "./node_modules/@microsoft/fast-element/dist/esm/templating/html-directive.js");
/* harmony import */ var _node_observation_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node-observation.js */ "./node_modules/@microsoft/fast-element/dist/esm/templating/node-observation.js");


/**
 * The runtime behavior for slotted node observation.
 * @public
 */
class SlottedBehavior extends _node_observation_js__WEBPACK_IMPORTED_MODULE_0__.NodeObservationBehavior {
    /**
     * Creates an instance of SlottedBehavior.
     * @param target - The slot element target to observe.
     * @param options - The options to use when observing the slot.
     */
    constructor(target, options) {
        super(target, options);
    }
    /**
     * Begins observation of the nodes.
     */
    observe() {
        this.target.addEventListener("slotchange", this);
    }
    /**
     * Disconnects observation of the nodes.
     */
    disconnect() {
        this.target.removeEventListener("slotchange", this);
    }
    /**
     * Retrieves the nodes that should be assigned to the target.
     */
    getNodes() {
        return this.target.assignedNodes(this.options);
    }
}
/**
 * A directive that observes the `assignedNodes()` of a slot and updates a property
 * whenever they change.
 * @param propertyOrOptions - The options used to configure slotted node observation.
 * @public
 */
function slotted(propertyOrOptions) {
    if (typeof propertyOrOptions === "string") {
        propertyOrOptions = { property: propertyOrOptions };
    }
    return new _html_directive_js__WEBPACK_IMPORTED_MODULE_1__.AttachedBehaviorHTMLDirective("fast-slotted", SlottedBehavior, propertyOrOptions);
}


/***/ }),

/***/ "./node_modules/@microsoft/fast-element/dist/esm/templating/template.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@microsoft/fast-element/dist/esm/templating/template.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ViewTemplate: () => (/* binding */ ViewTemplate),
/* harmony export */   html: () => (/* binding */ html)
/* harmony export */ });
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom.js */ "./node_modules/@microsoft/fast-element/dist/esm/dom.js");
/* harmony import */ var _observation_observable_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../observation/observable.js */ "./node_modules/@microsoft/fast-element/dist/esm/observation/observable.js");
/* harmony import */ var _compiler_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./compiler.js */ "./node_modules/@microsoft/fast-element/dist/esm/templating/compiler.js");
/* harmony import */ var _view_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./view.js */ "./node_modules/@microsoft/fast-element/dist/esm/templating/view.js");
/* harmony import */ var _html_directive_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./html-directive.js */ "./node_modules/@microsoft/fast-element/dist/esm/templating/html-directive.js");
/* harmony import */ var _binding_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./binding.js */ "./node_modules/@microsoft/fast-element/dist/esm/templating/binding.js");






/**
 * A template capable of creating HTMLView instances or rendering directly to DOM.
 * @public
 */
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
class ViewTemplate {
    /**
     * Creates an instance of ViewTemplate.
     * @param html - The html representing what this template will instantiate, including placeholders for directives.
     * @param directives - The directives that will be connected to placeholders in the html.
     */
    constructor(html, directives) {
        this.behaviorCount = 0;
        this.hasHostBehaviors = false;
        this.fragment = null;
        this.targetOffset = 0;
        this.viewBehaviorFactories = null;
        this.hostBehaviorFactories = null;
        this.html = html;
        this.directives = directives;
    }
    /**
     * Creates an HTMLView instance based on this template definition.
     * @param hostBindingTarget - The element that host behaviors will be bound to.
     */
    create(hostBindingTarget) {
        if (this.fragment === null) {
            let template;
            const html = this.html;
            if (typeof html === "string") {
                template = document.createElement("template");
                template.innerHTML = _dom_js__WEBPACK_IMPORTED_MODULE_0__.DOM.createHTML(html);
                const fec = template.content.firstElementChild;
                if (fec !== null && fec.tagName === "TEMPLATE") {
                    template = fec;
                }
            }
            else {
                template = html;
            }
            const result = (0,_compiler_js__WEBPACK_IMPORTED_MODULE_1__.compileTemplate)(template, this.directives);
            this.fragment = result.fragment;
            this.viewBehaviorFactories = result.viewBehaviorFactories;
            this.hostBehaviorFactories = result.hostBehaviorFactories;
            this.targetOffset = result.targetOffset;
            this.behaviorCount =
                this.viewBehaviorFactories.length + this.hostBehaviorFactories.length;
            this.hasHostBehaviors = this.hostBehaviorFactories.length > 0;
        }
        const fragment = this.fragment.cloneNode(true);
        const viewFactories = this.viewBehaviorFactories;
        const behaviors = new Array(this.behaviorCount);
        const walker = _dom_js__WEBPACK_IMPORTED_MODULE_0__.DOM.createTemplateWalker(fragment);
        let behaviorIndex = 0;
        let targetIndex = this.targetOffset;
        let node = walker.nextNode();
        for (let ii = viewFactories.length; behaviorIndex < ii; ++behaviorIndex) {
            const factory = viewFactories[behaviorIndex];
            const factoryIndex = factory.targetIndex;
            while (node !== null) {
                if (targetIndex === factoryIndex) {
                    behaviors[behaviorIndex] = factory.createBehavior(node);
                    break;
                }
                else {
                    node = walker.nextNode();
                    targetIndex++;
                }
            }
        }
        if (this.hasHostBehaviors) {
            const hostFactories = this.hostBehaviorFactories;
            for (let i = 0, ii = hostFactories.length; i < ii; ++i, ++behaviorIndex) {
                behaviors[behaviorIndex] = hostFactories[i].createBehavior(hostBindingTarget);
            }
        }
        return new _view_js__WEBPACK_IMPORTED_MODULE_2__.HTMLView(fragment, behaviors);
    }
    /**
     * Creates an HTMLView from this template, binds it to the source, and then appends it to the host.
     * @param source - The data source to bind the template to.
     * @param host - The Element where the template will be rendered.
     * @param hostBindingTarget - An HTML element to target the host bindings at if different from the
     * host that the template is being attached to.
     */
    render(source, host, hostBindingTarget) {
        if (typeof host === "string") {
            host = document.getElementById(host);
        }
        if (hostBindingTarget === void 0) {
            hostBindingTarget = host;
        }
        const view = this.create(hostBindingTarget);
        view.bind(source, _observation_observable_js__WEBPACK_IMPORTED_MODULE_3__.defaultExecutionContext);
        view.appendTo(host);
        return view;
    }
}
// Much thanks to LitHTML for working this out!
const lastAttributeNameRegex = 
/* eslint-disable-next-line no-control-regex */
/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
/**
 * Transforms a template literal string into a renderable ViewTemplate.
 * @param strings - The string fragments that are interpolated with the values.
 * @param values - The values that are interpolated with the string fragments.
 * @remarks
 * The html helper supports interpolation of strings, numbers, binding expressions,
 * other template instances, and Directive instances.
 * @public
 */
function html(strings, ...values) {
    const directives = [];
    let html = "";
    for (let i = 0, ii = strings.length - 1; i < ii; ++i) {
        const currentString = strings[i];
        let value = values[i];
        html += currentString;
        if (value instanceof ViewTemplate) {
            const template = value;
            value = () => template;
        }
        if (typeof value === "function") {
            value = new _binding_js__WEBPACK_IMPORTED_MODULE_4__.HTMLBindingDirective(value);
        }
        if (value instanceof _html_directive_js__WEBPACK_IMPORTED_MODULE_5__.TargetedHTMLDirective) {
            const match = lastAttributeNameRegex.exec(currentString);
            if (match !== null) {
                value.targetName = match[2];
            }
        }
        if (value instanceof _html_directive_js__WEBPACK_IMPORTED_MODULE_5__.HTMLDirective) {
            // Since not all values are directives, we can't use i
            // as the index for the placeholder. Instead, we need to
            // use directives.length to get the next index.
            html += value.createPlaceholder(directives.length);
            directives.push(value);
        }
        else {
            html += value;
        }
    }
    html += strings[strings.length - 1];
    return new ViewTemplate(html, directives);
}


/***/ }),

/***/ "./node_modules/@microsoft/fast-element/dist/esm/templating/view.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@microsoft/fast-element/dist/esm/templating/view.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HTMLView: () => (/* binding */ HTMLView)
/* harmony export */ });
// A singleton Range instance used to efficiently remove ranges of DOM nodes.
// See the implementation of HTMLView below for further details.
const range = document.createRange();
/**
 * The standard View implementation, which also implements ElementView and SyntheticView.
 * @public
 */
class HTMLView {
    /**
     * Constructs an instance of HTMLView.
     * @param fragment - The html fragment that contains the nodes for this view.
     * @param behaviors - The behaviors to be applied to this view.
     */
    constructor(fragment, behaviors) {
        this.fragment = fragment;
        this.behaviors = behaviors;
        /**
         * The data that the view is bound to.
         */
        this.source = null;
        /**
         * The execution context the view is running within.
         */
        this.context = null;
        this.firstChild = fragment.firstChild;
        this.lastChild = fragment.lastChild;
    }
    /**
     * Appends the view's DOM nodes to the referenced node.
     * @param node - The parent node to append the view's DOM nodes to.
     */
    appendTo(node) {
        node.appendChild(this.fragment);
    }
    /**
     * Inserts the view's DOM nodes before the referenced node.
     * @param node - The node to insert the view's DOM before.
     */
    insertBefore(node) {
        if (this.fragment.hasChildNodes()) {
            node.parentNode.insertBefore(this.fragment, node);
        }
        else {
            const end = this.lastChild;
            if (node.previousSibling === end)
                return;
            const parentNode = node.parentNode;
            let current = this.firstChild;
            let next;
            while (current !== end) {
                next = current.nextSibling;
                parentNode.insertBefore(current, node);
                current = next;
            }
            parentNode.insertBefore(end, node);
        }
    }
    /**
     * Removes the view's DOM nodes.
     * The nodes are not disposed and the view can later be re-inserted.
     */
    remove() {
        const fragment = this.fragment;
        const end = this.lastChild;
        let current = this.firstChild;
        let next;
        while (current !== end) {
            next = current.nextSibling;
            fragment.appendChild(current);
            current = next;
        }
        fragment.appendChild(end);
    }
    /**
     * Removes the view and unbinds its behaviors, disposing of DOM nodes afterward.
     * Once a view has been disposed, it cannot be inserted or bound again.
     */
    dispose() {
        const parent = this.firstChild.parentNode;
        const end = this.lastChild;
        let current = this.firstChild;
        let next;
        while (current !== end) {
            next = current.nextSibling;
            parent.removeChild(current);
            current = next;
        }
        parent.removeChild(end);
        const behaviors = this.behaviors;
        const oldSource = this.source;
        for (let i = 0, ii = behaviors.length; i < ii; ++i) {
            behaviors[i].unbind(oldSource);
        }
    }
    /**
     * Binds a view's behaviors to its binding source.
     * @param source - The binding source for the view's binding behaviors.
     * @param context - The execution context to run the behaviors within.
     */
    bind(source, context) {
        const behaviors = this.behaviors;
        if (this.source === source) {
            return;
        }
        else if (this.source !== null) {
            const oldSource = this.source;
            this.source = source;
            this.context = context;
            for (let i = 0, ii = behaviors.length; i < ii; ++i) {
                const current = behaviors[i];
                current.unbind(oldSource);
                current.bind(source, context);
            }
        }
        else {
            this.source = source;
            this.context = context;
            for (let i = 0, ii = behaviors.length; i < ii; ++i) {
                behaviors[i].bind(source, context);
            }
        }
    }
    /**
     * Unbinds a view's behaviors from its binding source.
     */
    unbind() {
        if (this.source === null) {
            return;
        }
        const behaviors = this.behaviors;
        const oldSource = this.source;
        for (let i = 0, ii = behaviors.length; i < ii; ++i) {
            behaviors[i].unbind(oldSource);
        }
        this.source = null;
    }
    /**
     * Efficiently disposes of a contiguous range of synthetic view instances.
     * @param views - A contiguous range of views to be disposed.
     */
    static disposeContiguousBatch(views) {
        if (views.length === 0) {
            return;
        }
        range.setStartBefore(views[0].firstChild);
        range.setEndAfter(views[views.length - 1].lastChild);
        range.deleteContents();
        for (let i = 0, ii = views.length; i < ii; ++i) {
            const view = views[i];
            const behaviors = view.behaviors;
            const oldSource = view.source;
            for (let j = 0, jj = behaviors.length; j < jj; ++j) {
                behaviors[j].unbind(oldSource);
            }
        }
    }
}


/***/ }),

/***/ "./node_modules/@microsoft/fast-element/dist/esm/templating/when.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@microsoft/fast-element/dist/esm/templating/when.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   when: () => (/* binding */ when)
/* harmony export */ });
/* harmony import */ var _interfaces_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../interfaces.js */ "./node_modules/@microsoft/fast-element/dist/esm/interfaces.js");

const noTemplate = () => null;
function normalizeBinding(value) {
    return value === undefined ? noTemplate : (0,_interfaces_js__WEBPACK_IMPORTED_MODULE_0__.isFunction)(value) ? value : () => value;
}
/**
 * A directive that enables basic conditional rendering in a template.
 * @param binding - The condition to test for rendering.
 * @param templateOrTemplateBinding - The template or a binding that gets
 * the template to render when the condition is true.
 * @param elseTemplateOrTemplateBinding - Optional template or binding that that
 * gets the template to render when the conditional is false.
 * @public
 */
function when(binding, templateOrTemplateBinding, elseTemplateOrTemplateBinding) {
    const dataBinding = (0,_interfaces_js__WEBPACK_IMPORTED_MODULE_0__.isFunction)(binding) ? binding : () => binding;
    const templateBinding = normalizeBinding(templateOrTemplateBinding);
    const elseBinding = normalizeBinding(elseTemplateOrTemplateBinding);
    return (source, context) => dataBinding(source, context)
        ? templateBinding(source, context)
        : elseBinding(source, context);
}


/***/ }),

/***/ "./node_modules/@microsoft/fast-foundation/dist/esm/button/button.form-associated.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/@microsoft/fast-foundation/dist/esm/button/button.form-associated.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FormAssociatedButton: () => (/* binding */ FormAssociatedButton)
/* harmony export */ });
/* harmony import */ var _form_associated_form_associated_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../form-associated/form-associated.js */ "./node_modules/@microsoft/fast-foundation/dist/esm/form-associated/form-associated.js");
/* harmony import */ var _foundation_element_foundation_element_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../foundation-element/foundation-element.js */ "./node_modules/@microsoft/fast-foundation/dist/esm/foundation-element/foundation-element.js");


class _Button extends _foundation_element_foundation_element_js__WEBPACK_IMPORTED_MODULE_0__.FoundationElement {
}
/**
 * A form-associated base class for the {@link @microsoft/fast-foundation#(Button:class)} component.
 *
 * @internal
 */
class FormAssociatedButton extends (0,_form_associated_form_associated_js__WEBPACK_IMPORTED_MODULE_1__.FormAssociated)(_Button) {
    constructor() {
        super(...arguments);
        this.proxy = document.createElement("input");
    }
}


/***/ }),

/***/ "./node_modules/@microsoft/fast-foundation/dist/esm/button/button.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@microsoft/fast-foundation/dist/esm/button/button.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Button: () => (/* binding */ Button),
/* harmony export */   DelegatesARIAButton: () => (/* binding */ DelegatesARIAButton)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ "./node_modules/@microsoft/fast-foundation/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/fast-element */ "./node_modules/@microsoft/fast-element/dist/esm/components/attributes.js");
/* harmony import */ var _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/fast-element */ "./node_modules/@microsoft/fast-element/dist/esm/observation/observable.js");
/* harmony import */ var _patterns_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../patterns/index.js */ "./node_modules/@microsoft/fast-foundation/dist/esm/patterns/aria-global.js");
/* harmony import */ var _patterns_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../patterns/index.js */ "./node_modules/@microsoft/fast-foundation/dist/esm/patterns/start-end.js");
/* harmony import */ var _utilities_apply_mixins_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utilities/apply-mixins.js */ "./node_modules/@microsoft/fast-foundation/dist/esm/utilities/apply-mixins.js");
/* harmony import */ var _button_form_associated_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./button.form-associated.js */ "./node_modules/@microsoft/fast-foundation/dist/esm/button/button.form-associated.js");





/**
 * A Button Custom HTML Element.
 * Based largely on the {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button | <button> element }.
 *
 * @slot start - Content which can be provided before the button content
 * @slot end - Content which can be provided after the button content
 * @slot - The default slot for button content
 * @csspart control - The button element
 * @csspart content - The element wrapping button content
 *
 * @public
 */
class Button extends _button_form_associated_js__WEBPACK_IMPORTED_MODULE_0__.FormAssociatedButton {
    constructor() {
        super(...arguments);
        /**
         * Prevent events to propagate if disabled and has no slotted content wrapped in HTML elements
         * @internal
         */
        this.handleClick = (e) => {
            var _a;
            if (this.disabled && ((_a = this.defaultSlottedContent) === null || _a === void 0 ? void 0 : _a.length) <= 1) {
                e.stopPropagation();
            }
        };
        /**
         * Submits the parent form
         */
        this.handleSubmission = () => {
            if (!this.form) {
                return;
            }
            const attached = this.proxy.isConnected;
            if (!attached) {
                this.attachProxy();
            }
            // Browser support for requestSubmit is not comprehensive
            // so click the proxy if it isn't supported
            typeof this.form.requestSubmit === "function"
                ? this.form.requestSubmit(this.proxy)
                : this.proxy.click();
            if (!attached) {
                this.detachProxy();
            }
        };
        /**
         * Resets the parent form
         */
        this.handleFormReset = () => {
            var _a;
            (_a = this.form) === null || _a === void 0 ? void 0 : _a.reset();
        };
        /**
         * Overrides the focus call for where delegatesFocus is unsupported.
         * This check works for Chrome, Edge Chromium, FireFox, and Safari
         * Relevant PR on the Firefox browser: https://phabricator.services.mozilla.com/D123858
         */
        this.handleUnsupportedDelegatesFocus = () => {
            var _a;
            // Check to see if delegatesFocus is supported
            if (window.ShadowRoot &&
                !window.ShadowRoot.prototype.hasOwnProperty("delegatesFocus") &&
                ((_a = this.$fastController.definition.shadowOptions) === null || _a === void 0 ? void 0 : _a.delegatesFocus)) {
                this.focus = () => {
                    this.control.focus();
                };
            }
        };
    }
    formactionChanged() {
        if (this.proxy instanceof HTMLInputElement) {
            this.proxy.formAction = this.formaction;
        }
    }
    formenctypeChanged() {
        if (this.proxy instanceof HTMLInputElement) {
            this.proxy.formEnctype = this.formenctype;
        }
    }
    formmethodChanged() {
        if (this.proxy instanceof HTMLInputElement) {
            this.proxy.formMethod = this.formmethod;
        }
    }
    formnovalidateChanged() {
        if (this.proxy instanceof HTMLInputElement) {
            this.proxy.formNoValidate = this.formnovalidate;
        }
    }
    formtargetChanged() {
        if (this.proxy instanceof HTMLInputElement) {
            this.proxy.formTarget = this.formtarget;
        }
    }
    typeChanged(previous, next) {
        if (this.proxy instanceof HTMLInputElement) {
            this.proxy.type = this.type;
        }
        next === "submit" && this.addEventListener("click", this.handleSubmission);
        previous === "submit" && this.removeEventListener("click", this.handleSubmission);
        next === "reset" && this.addEventListener("click", this.handleFormReset);
        previous === "reset" && this.removeEventListener("click", this.handleFormReset);
    }
    /** {@inheritDoc (FormAssociated:interface).validate} */
    validate() {
        super.validate(this.control);
    }
    /**
     * @internal
     */
    connectedCallback() {
        var _a;
        super.connectedCallback();
        this.proxy.setAttribute("type", this.type);
        this.handleUnsupportedDelegatesFocus();
        const elements = Array.from((_a = this.control) === null || _a === void 0 ? void 0 : _a.children);
        if (elements) {
            elements.forEach((span) => {
                span.addEventListener("click", this.handleClick);
            });
        }
    }
    /**
     * @internal
     */
    disconnectedCallback() {
        var _a;
        super.disconnectedCallback();
        const elements = Array.from((_a = this.control) === null || _a === void 0 ? void 0 : _a.children);
        if (elements) {
            elements.forEach((span) => {
                span.removeEventListener("click", this.handleClick);
            });
        }
    }
}
(0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_2__.attr)({ mode: "boolean" })
], Button.prototype, "autofocus", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_2__.attr)({ attribute: "form" })
], Button.prototype, "formId", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_2__.attr
], Button.prototype, "formaction", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_2__.attr
], Button.prototype, "formenctype", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_2__.attr
], Button.prototype, "formmethod", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_2__.attr)({ mode: "boolean" })
], Button.prototype, "formnovalidate", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_2__.attr
], Button.prototype, "formtarget", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_2__.attr
], Button.prototype, "type", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_3__.observable
], Button.prototype, "defaultSlottedContent", void 0);
/**
 * Includes ARIA states and properties relating to the ARIA button role
 *
 * @public
 */
class DelegatesARIAButton {
}
(0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_2__.attr)({ attribute: "aria-expanded" })
], DelegatesARIAButton.prototype, "ariaExpanded", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_2__.attr)({ attribute: "aria-pressed" })
], DelegatesARIAButton.prototype, "ariaPressed", void 0);
(0,_utilities_apply_mixins_js__WEBPACK_IMPORTED_MODULE_4__.applyMixins)(DelegatesARIAButton, _patterns_index_js__WEBPACK_IMPORTED_MODULE_5__.ARIAGlobalStatesAndProperties);
(0,_utilities_apply_mixins_js__WEBPACK_IMPORTED_MODULE_4__.applyMixins)(Button, _patterns_index_js__WEBPACK_IMPORTED_MODULE_6__.StartEnd, DelegatesARIAButton);


/***/ }),

/***/ "./node_modules/@microsoft/fast-foundation/dist/esm/button/button.template.js":
/*!************************************************************************************!*\
  !*** ./node_modules/@microsoft/fast-foundation/dist/esm/button/button.template.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buttonTemplate: () => (/* binding */ buttonTemplate)
/* harmony export */ });
/* harmony import */ var _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/fast-element */ "./node_modules/@microsoft/fast-element/dist/esm/templating/template.js");
/* harmony import */ var _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/fast-element */ "./node_modules/@microsoft/fast-element/dist/esm/templating/ref.js");
/* harmony import */ var _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/fast-element */ "./node_modules/@microsoft/fast-element/dist/esm/templating/slotted.js");
/* harmony import */ var _patterns_start_end_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../patterns/start-end.js */ "./node_modules/@microsoft/fast-foundation/dist/esm/patterns/start-end.js");


/**
 * The template for the {@link @microsoft/fast-foundation#(Button:class)} component.
 * @public
 */
const buttonTemplate = (context, definition) => (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_0__.html) `
    <button
        class="control"
        part="control"
        ?autofocus="${x => x.autofocus}"
        ?disabled="${x => x.disabled}"
        form="${x => x.formId}"
        formaction="${x => x.formaction}"
        formenctype="${x => x.formenctype}"
        formmethod="${x => x.formmethod}"
        formnovalidate="${x => x.formnovalidate}"
        formtarget="${x => x.formtarget}"
        name="${x => x.name}"
        type="${x => x.type}"
        value="${x => x.value}"
        aria-atomic="${x => x.ariaAtomic}"
        aria-busy="${x => x.ariaBusy}"
        aria-controls="${x => x.ariaControls}"
        aria-current="${x => x.ariaCurrent}"
        aria-describedby="${x => x.ariaDescribedby}"
        aria-details="${x => x.ariaDetails}"
        aria-disabled="${x => x.ariaDisabled}"
        aria-errormessage="${x => x.ariaErrormessage}"
        aria-expanded="${x => x.ariaExpanded}"
        aria-flowto="${x => x.ariaFlowto}"
        aria-haspopup="${x => x.ariaHaspopup}"
        aria-hidden="${x => x.ariaHidden}"
        aria-invalid="${x => x.ariaInvalid}"
        aria-keyshortcuts="${x => x.ariaKeyshortcuts}"
        aria-label="${x => x.ariaLabel}"
        aria-labelledby="${x => x.ariaLabelledby}"
        aria-live="${x => x.ariaLive}"
        aria-owns="${x => x.ariaOwns}"
        aria-pressed="${x => x.ariaPressed}"
        aria-relevant="${x => x.ariaRelevant}"
        aria-roledescription="${x => x.ariaRoledescription}"
        ${(0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_1__.ref)("control")}
    >
        ${(0,_patterns_start_end_js__WEBPACK_IMPORTED_MODULE_2__.startSlotTemplate)(context, definition)}
        <span class="content" part="content">
            <slot ${(0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_3__.slotted)("defaultSlottedContent")}></slot>
        </span>
        ${(0,_patterns_start_end_js__WEBPACK_IMPORTED_MODULE_2__.endSlotTemplate)(context, definition)}
    </button>
`;


/***/ }),

/***/ "./node_modules/@microsoft/fast-foundation/dist/esm/design-system/component-presentation.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/@microsoft/fast-foundation/dist/esm/design-system/component-presentation.js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ComponentPresentation: () => (/* binding */ ComponentPresentation),
/* harmony export */   DefaultComponentPresentation: () => (/* binding */ DefaultComponentPresentation)
/* harmony export */ });
/* harmony import */ var _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/fast-element */ "./node_modules/@microsoft/fast-element/dist/esm/styles/element-styles.js");
/* harmony import */ var _di_di_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../di/di.js */ "./node_modules/@microsoft/fast-foundation/dist/esm/di/di.js");


function presentationKeyFromTag(tagName) {
    return `${tagName.toLowerCase()}:presentation`;
}
const presentationRegistry = new Map();
/**
 * An API gateway to component presentation features.
 * @public
 */
const ComponentPresentation = Object.freeze({
    /**
     * Defines a component presentation for an element.
     * @param tagName - The element name to define the presentation for.
     * @param presentation - The presentation that will be applied to matching elements.
     * @param container - The dependency injection container to register the configuration in.
     * @public
     */
    define(tagName, presentation, container) {
        const key = presentationKeyFromTag(tagName);
        const existing = presentationRegistry.get(key);
        if (existing === void 0) {
            presentationRegistry.set(key, presentation);
        }
        else {
            // false indicates that we have more than one presentation
            // registered for a tagName and we must resolve through DI
            presentationRegistry.set(key, false);
        }
        container.register(_di_di_js__WEBPACK_IMPORTED_MODULE_0__.Registration.instance(key, presentation));
    },
    /**
     * Finds a component presentation for the specified element name,
     * searching the DOM hierarchy starting from the provided element.
     * @param tagName - The name of the element to locate the presentation for.
     * @param element - The element to begin the search from.
     * @returns The component presentation or null if none is found.
     * @public
     */
    forTag(tagName, element) {
        const key = presentationKeyFromTag(tagName);
        const existing = presentationRegistry.get(key);
        if (existing === false) {
            const container = _di_di_js__WEBPACK_IMPORTED_MODULE_0__.DI.findResponsibleContainer(element);
            return container.get(key);
        }
        return existing || null;
    },
});
/**
 * The default implementation of ComponentPresentation, used by FoundationElement.
 * @public
 */
class DefaultComponentPresentation {
    /**
     * Creates an instance of DefaultComponentPresentation.
     * @param template - The template to apply to the element.
     * @param styles - The styles to apply to the element.
     * @public
     */
    constructor(template, styles) {
        this.template = template || null;
        this.styles =
            styles === void 0
                ? null
                : Array.isArray(styles)
                    ? _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_1__.ElementStyles.create(styles)
                    : styles instanceof _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_1__.ElementStyles
                        ? styles
                        : _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_1__.ElementStyles.create([styles]);
    }
    /**
     * Applies the presentation details to the specified element.
     * @param element - The element to apply the presentation details to.
     * @public
     */
    applyTo(element) {
        const controller = element.$fastController;
        if (controller.template === null) {
            controller.template = this.template;
        }
        if (controller.styles === null) {
            controller.styles = this.styles;
        }
    }
}


/***/ }),

/***/ "./node_modules/@microsoft/fast-foundation/dist/esm/design-system/design-system.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/@microsoft/fast-foundation/dist/esm/design-system/design-system.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DesignSystem: () => (/* binding */ DesignSystem),
/* harmony export */   ElementDisambiguation: () => (/* binding */ ElementDisambiguation)
/* harmony export */ });
/* harmony import */ var _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @microsoft/fast-element */ "./node_modules/@microsoft/fast-element/dist/esm/components/fast-definitions.js");
/* harmony import */ var _foundation_element_foundation_element_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../foundation-element/foundation-element.js */ "./node_modules/@microsoft/fast-foundation/dist/esm/foundation-element/foundation-element.js");
/* harmony import */ var _di_di_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../di/di.js */ "./node_modules/@microsoft/fast-foundation/dist/esm/di/di.js");
/* harmony import */ var _design_token_design_token_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../design-token/design-token.js */ "./node_modules/@microsoft/fast-foundation/dist/esm/design-token/design-token.js");
/* harmony import */ var _component_presentation_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./component-presentation.js */ "./node_modules/@microsoft/fast-foundation/dist/esm/design-system/component-presentation.js");





/* eslint-disable @typescript-eslint/no-non-null-assertion */
/**
 * Indicates what to do with an ambiguous (duplicate) element.
 * @public
 */
const ElementDisambiguation = Object.freeze({
    /**
     * Skip defining the element but still call the provided callback passed
     * to DesignSystemRegistrationContext.tryDefineElement
     */
    definitionCallbackOnly: null,
    /**
     * Ignore the duplicate element entirely.
     */
    ignoreDuplicate: Symbol(),
});
const elementTypesByTag = new Map();
const elementTagsByType = new Map();
let rootDesignSystem = null;
const designSystemKey = _di_di_js__WEBPACK_IMPORTED_MODULE_0__.DI.createInterface(x => x.cachedCallback(handler => {
    if (rootDesignSystem === null) {
        rootDesignSystem = new DefaultDesignSystem(null, handler);
    }
    return rootDesignSystem;
}));
/**
 * An API gateway to design system features.
 * @public
 */
const DesignSystem = Object.freeze({
    /**
     * Returns the HTML element name that the type is defined as.
     * @param type - The type to lookup.
     * @public
     */
    tagFor(type) {
        return elementTagsByType.get(type);
    },
    /**
     * Searches the DOM hierarchy for the design system that is responsible
     * for the provided element.
     * @param element - The element to locate the design system for.
     * @returns The located design system.
     * @public
     */
    responsibleFor(element) {
        const owned = element.$$designSystem$$;
        if (owned) {
            return owned;
        }
        const container = _di_di_js__WEBPACK_IMPORTED_MODULE_0__.DI.findResponsibleContainer(element);
        return container.get(designSystemKey);
    },
    /**
     * Gets the DesignSystem if one is explicitly defined on the provided element;
     * otherwise creates a design system defined directly on the element.
     * @param element - The element to get or create a design system for.
     * @returns The design system.
     * @public
     */
    getOrCreate(node) {
        if (!node) {
            if (rootDesignSystem === null) {
                rootDesignSystem = _di_di_js__WEBPACK_IMPORTED_MODULE_0__.DI.getOrCreateDOMContainer().get(designSystemKey);
            }
            return rootDesignSystem;
        }
        const owned = node.$$designSystem$$;
        if (owned) {
            return owned;
        }
        const container = _di_di_js__WEBPACK_IMPORTED_MODULE_0__.DI.getOrCreateDOMContainer(node);
        if (container.has(designSystemKey, false)) {
            return container.get(designSystemKey);
        }
        else {
            const system = new DefaultDesignSystem(node, container);
            container.register(_di_di_js__WEBPACK_IMPORTED_MODULE_0__.Registration.instance(designSystemKey, system));
            return system;
        }
    },
});
function extractTryDefineElementParams(params, elementDefinitionType, elementDefinitionCallback) {
    if (typeof params === "string") {
        return {
            name: params,
            type: elementDefinitionType,
            callback: elementDefinitionCallback,
        };
    }
    else {
        return params;
    }
}
class DefaultDesignSystem {
    constructor(owner, container) {
        this.owner = owner;
        this.container = container;
        this.designTokensInitialized = false;
        this.prefix = "fast";
        this.shadowRootMode = undefined;
        this.disambiguate = () => ElementDisambiguation.definitionCallbackOnly;
        if (owner !== null) {
            owner.$$designSystem$$ = this;
        }
    }
    withPrefix(prefix) {
        this.prefix = prefix;
        return this;
    }
    withShadowRootMode(mode) {
        this.shadowRootMode = mode;
        return this;
    }
    withElementDisambiguation(callback) {
        this.disambiguate = callback;
        return this;
    }
    withDesignTokenRoot(root) {
        this.designTokenRoot = root;
        return this;
    }
    register(...registrations) {
        const container = this.container;
        const elementDefinitionEntries = [];
        const disambiguate = this.disambiguate;
        const shadowRootMode = this.shadowRootMode;
        const context = {
            elementPrefix: this.prefix,
            tryDefineElement(params, elementDefinitionType, elementDefinitionCallback) {
                const extractedParams = extractTryDefineElementParams(params, elementDefinitionType, elementDefinitionCallback);
                const { name, callback, baseClass } = extractedParams;
                let { type } = extractedParams;
                let elementName = name;
                let typeFoundByName = elementTypesByTag.get(elementName);
                let needsDefine = true;
                while (typeFoundByName) {
                    const result = disambiguate(elementName, type, typeFoundByName);
                    switch (result) {
                        case ElementDisambiguation.ignoreDuplicate:
                            return;
                        case ElementDisambiguation.definitionCallbackOnly:
                            needsDefine = false;
                            typeFoundByName = void 0;
                            break;
                        default:
                            elementName = result;
                            typeFoundByName = elementTypesByTag.get(elementName);
                            break;
                    }
                }
                if (needsDefine) {
                    if (elementTagsByType.has(type) || type === _foundation_element_foundation_element_js__WEBPACK_IMPORTED_MODULE_1__.FoundationElement) {
                        type = class extends type {
                        };
                    }
                    elementTypesByTag.set(elementName, type);
                    elementTagsByType.set(type, elementName);
                    if (baseClass) {
                        elementTagsByType.set(baseClass, elementName);
                    }
                }
                elementDefinitionEntries.push(new ElementDefinitionEntry(container, elementName, type, shadowRootMode, callback, needsDefine));
            },
        };
        if (!this.designTokensInitialized) {
            this.designTokensInitialized = true;
            if (this.designTokenRoot !== null) {
                _design_token_design_token_js__WEBPACK_IMPORTED_MODULE_2__.DesignToken.registerRoot(this.designTokenRoot);
            }
        }
        container.registerWithContext(context, ...registrations);
        for (const entry of elementDefinitionEntries) {
            entry.callback(entry);
            if (entry.willDefine && entry.definition !== null) {
                entry.definition.define();
            }
        }
        return this;
    }
}
class ElementDefinitionEntry {
    constructor(container, name, type, shadowRootMode, callback, willDefine) {
        this.container = container;
        this.name = name;
        this.type = type;
        this.shadowRootMode = shadowRootMode;
        this.callback = callback;
        this.willDefine = willDefine;
        this.definition = null;
    }
    definePresentation(presentation) {
        _component_presentation_js__WEBPACK_IMPORTED_MODULE_3__.ComponentPresentation.define(this.name, presentation, this.container);
    }
    defineElement(definition) {
        this.definition = new _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_4__.FASTElementDefinition(this.type, Object.assign(Object.assign({}, definition), { name: this.name }));
    }
    tagFor(type) {
        return DesignSystem.tagFor(type);
    }
}
/* eslint-enable @typescript-eslint/no-non-null-assertion */


/***/ }),

/***/ "./node_modules/@microsoft/fast-foundation/dist/esm/design-token/custom-property-manager.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/@microsoft/fast-foundation/dist/esm/design-token/custom-property-manager.js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PropertyTargetManager: () => (/* binding */ PropertyTargetManager),
/* harmony export */   RootStyleSheetTarget: () => (/* binding */ RootStyleSheetTarget),
/* harmony export */   defaultElement: () => (/* binding */ defaultElement)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ "./node_modules/@microsoft/fast-foundation/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/fast-element */ "./node_modules/@microsoft/fast-element/dist/esm/components/fast-element.js");
/* harmony import */ var _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/fast-element */ "./node_modules/@microsoft/fast-element/dist/esm/dom.js");
/* harmony import */ var _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/fast-element */ "./node_modules/@microsoft/fast-element/dist/esm/styles/element-styles.js");
/* harmony import */ var _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/fast-element */ "./node_modules/@microsoft/fast-element/dist/esm/observation/observable.js");


const defaultElement = document.createElement("div");
function isFastElement(element) {
    return element instanceof _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_0__.FASTElement;
}
class QueuedStyleSheetTarget {
    setProperty(name, value) {
        _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_1__.DOM.queueUpdate(() => this.target.setProperty(name, value));
    }
    removeProperty(name) {
        _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_1__.DOM.queueUpdate(() => this.target.removeProperty(name));
    }
}
/**
 * Handles setting properties for a FASTElement using Constructable Stylesheets
 */
class ConstructableStyleSheetTarget extends QueuedStyleSheetTarget {
    constructor(source) {
        super();
        const sheet = new CSSStyleSheet();
        sheet[_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_2__.prependToAdoptedStyleSheetsSymbol] = true;
        this.target = sheet.cssRules[sheet.insertRule(":host{}")].style;
        source.$fastController.addStyles(_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_2__.ElementStyles.create([sheet]));
    }
}
class DocumentStyleSheetTarget extends QueuedStyleSheetTarget {
    constructor() {
        super();
        const sheet = new CSSStyleSheet();
        this.target = sheet.cssRules[sheet.insertRule(":root{}")].style;
        document.adoptedStyleSheets = [
            ...document.adoptedStyleSheets,
            sheet,
        ];
    }
}
class HeadStyleElementStyleSheetTarget extends QueuedStyleSheetTarget {
    constructor() {
        super();
        this.style = document.createElement("style");
        document.head.appendChild(this.style);
        const { sheet } = this.style;
        // Because the HTMLStyleElement has been appended,
        // there shouldn't exist a case where `sheet` is null,
        // but if-check it just in case.
        if (sheet) {
            // https://github.com/jsdom/jsdom uses https://github.com/NV/CSSOM for it's CSSOM implementation,
            // which implements the DOM Level 2 spec for CSSStyleSheet where insertRule() requires an index argument.
            const index = sheet.insertRule(":root{}", sheet.cssRules.length);
            this.target = sheet.cssRules[index].style;
        }
    }
}
/**
 * Handles setting properties for a FASTElement using an HTMLStyleElement
 */
class StyleElementStyleSheetTarget {
    constructor(target) {
        this.store = new Map();
        this.target = null;
        const controller = target.$fastController;
        this.style = document.createElement("style");
        controller.addStyles(this.style);
        _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_3__.Observable.getNotifier(controller).subscribe(this, "isConnected");
        this.handleChange(controller, "isConnected");
    }
    targetChanged() {
        if (this.target !== null) {
            for (const [key, value] of this.store.entries()) {
                this.target.setProperty(key, value);
            }
        }
    }
    setProperty(name, value) {
        this.store.set(name, value);
        _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_1__.DOM.queueUpdate(() => {
            if (this.target !== null) {
                this.target.setProperty(name, value);
            }
        });
    }
    removeProperty(name) {
        this.store.delete(name);
        _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_1__.DOM.queueUpdate(() => {
            if (this.target !== null) {
                this.target.removeProperty(name);
            }
        });
    }
    handleChange(source, key) {
        // HTMLStyleElement.sheet is null if the element isn't connected to the DOM,
        // so this method reacts to changes in DOM connection for the element hosting
        // the HTMLStyleElement.
        //
        // All rules applied via the CSSOM also get cleared when the element disconnects,
        // so we need to add a new rule each time and populate it with the stored properties
        const { sheet } = this.style;
        if (sheet) {
            // Safari will throw if we try to use the return result of insertRule()
            // to index the rule inline, so store as a const prior to indexing.
            // https://github.com/jsdom/jsdom uses https://github.com/NV/CSSOM for it's CSSOM implementation,
            // which implements the DOM Level 2 spec for CSSStyleSheet where insertRule() requires an index argument.
            const index = sheet.insertRule(":host{}", sheet.cssRules.length);
            this.target = sheet.cssRules[index].style;
        }
        else {
            this.target = null;
        }
    }
}
(0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_3__.observable
], StyleElementStyleSheetTarget.prototype, "target", void 0);
/**
 * Handles setting properties for a normal HTMLElement
 */
class ElementStyleSheetTarget {
    constructor(source) {
        this.target = source.style;
    }
    setProperty(name, value) {
        _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_1__.DOM.queueUpdate(() => this.target.setProperty(name, value));
    }
    removeProperty(name) {
        _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_1__.DOM.queueUpdate(() => this.target.removeProperty(name));
    }
}
/**
 * Controls emission for default values. This control is capable
 * of emitting to multiple {@link PropertyTarget | PropertyTargets},
 * and only emits if it has at least one root.
 *
 * @internal
 */
class RootStyleSheetTarget {
    setProperty(name, value) {
        RootStyleSheetTarget.properties[name] = value;
        for (const target of RootStyleSheetTarget.roots.values()) {
            PropertyTargetManager.getOrCreate(RootStyleSheetTarget.normalizeRoot(target)).setProperty(name, value);
        }
    }
    removeProperty(name) {
        delete RootStyleSheetTarget.properties[name];
        for (const target of RootStyleSheetTarget.roots.values()) {
            PropertyTargetManager.getOrCreate(RootStyleSheetTarget.normalizeRoot(target)).removeProperty(name);
        }
    }
    static registerRoot(root) {
        const { roots } = RootStyleSheetTarget;
        if (!roots.has(root)) {
            roots.add(root);
            const target = PropertyTargetManager.getOrCreate(this.normalizeRoot(root));
            for (const key in RootStyleSheetTarget.properties) {
                target.setProperty(key, RootStyleSheetTarget.properties[key]);
            }
        }
    }
    static unregisterRoot(root) {
        const { roots } = RootStyleSheetTarget;
        if (roots.has(root)) {
            roots.delete(root);
            const target = PropertyTargetManager.getOrCreate(RootStyleSheetTarget.normalizeRoot(root));
            for (const key in RootStyleSheetTarget.properties) {
                target.removeProperty(key);
            }
        }
    }
    /**
     * Returns the document when provided the default element,
     * otherwise is a no-op
     * @param root - the root to normalize
     */
    static normalizeRoot(root) {
        return root === defaultElement ? document : root;
    }
}
RootStyleSheetTarget.roots = new Set();
RootStyleSheetTarget.properties = {};
// Caches PropertyTarget instances
const propertyTargetCache = new WeakMap();
// Use Constructable StyleSheets for FAST elements when supported, otherwise use
// HTMLStyleElement instances
const propertyTargetCtor = _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_1__.DOM.supportsAdoptedStyleSheets
    ? ConstructableStyleSheetTarget
    : StyleElementStyleSheetTarget;
/**
 * Manages creation and caching of PropertyTarget instances.
 *
 * @internal
 */
const PropertyTargetManager = Object.freeze({
    getOrCreate(source) {
        if (propertyTargetCache.has(source)) {
            /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
            return propertyTargetCache.get(source);
        }
        let target;
        if (source === defaultElement) {
            target = new RootStyleSheetTarget();
        }
        else if (source instanceof Document) {
            target = _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_1__.DOM.supportsAdoptedStyleSheets
                ? new DocumentStyleSheetTarget()
                : new HeadStyleElementStyleSheetTarget();
        }
        else if (isFastElement(source)) {
            target = new propertyTargetCtor(source);
        }
        else {
            target = new ElementStyleSheetTarget(source);
        }
        propertyTargetCache.set(source, target);
        return target;
    },
});


/***/ }),

/***/ "./node_modules/@microsoft/fast-foundation/dist/esm/design-token/design-token.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/@microsoft/fast-foundation/dist/esm/design-token/design-token.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DesignToken: () => (/* binding */ DesignToken)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ "./node_modules/@microsoft/fast-foundation/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/fast-element */ "./node_modules/@microsoft/fast-element/dist/esm/styles/css-directive.js");
/* harmony import */ var _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/fast-element */ "./node_modules/@microsoft/fast-element/dist/esm/observation/observable.js");
/* harmony import */ var _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/fast-element */ "./node_modules/@microsoft/fast-element/dist/esm/components/fast-element.js");
/* harmony import */ var _utilities_composed_parent_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utilities/composed-parent.js */ "./node_modules/@microsoft/fast-foundation/dist/esm/utilities/composed-parent.js");
/* harmony import */ var _utilities_composed_contains_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utilities/composed-contains.js */ "./node_modules/@microsoft/fast-foundation/dist/esm/utilities/composed-contains.js");
/* harmony import */ var _custom_property_manager_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./custom-property-manager.js */ "./node_modules/@microsoft/fast-foundation/dist/esm/design-token/custom-property-manager.js");






/**
 * Implementation of {@link (DesignToken:interface)}
 */
class DesignTokenImpl extends _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_0__.CSSDirective {
    constructor(configuration) {
        super();
        this.subscribers = new WeakMap();
        this._appliedTo = new Set();
        this.name = configuration.name;
        if (configuration.cssCustomPropertyName !== null) {
            this.cssCustomProperty = `--${configuration.cssCustomPropertyName}`;
            this.cssVar = `var(${this.cssCustomProperty})`;
        }
        this.id = DesignTokenImpl.uniqueId();
        DesignTokenImpl.tokensById.set(this.id, this);
    }
    get appliedTo() {
        return [...this._appliedTo];
    }
    static from(nameOrConfig) {
        return new DesignTokenImpl({
            name: typeof nameOrConfig === "string" ? nameOrConfig : nameOrConfig.name,
            cssCustomPropertyName: typeof nameOrConfig === "string"
                ? nameOrConfig
                : nameOrConfig.cssCustomPropertyName === void 0
                    ? nameOrConfig.name
                    : nameOrConfig.cssCustomPropertyName,
        });
    }
    static isCSSDesignToken(token) {
        return typeof token.cssCustomProperty === "string";
    }
    static isDerivedDesignTokenValue(value) {
        return typeof value === "function";
    }
    /**
     * Gets a token by ID. Returns undefined if the token was not found.
     * @param id - The ID of the token
     * @returns
     */
    static getTokenById(id) {
        return DesignTokenImpl.tokensById.get(id);
    }
    getOrCreateSubscriberSet(target = this) {
        return (this.subscribers.get(target) ||
            (this.subscribers.set(target, new Set()) && this.subscribers.get(target)));
    }
    createCSS() {
        return this.cssVar || "";
    }
    getValueFor(element) {
        const value = DesignTokenNode.getOrCreate(element).get(this);
        if (value !== undefined) {
            return value;
        }
        throw new Error(`Value could not be retrieved for token named "${this.name}". Ensure the value is set for ${element} or an ancestor of ${element}.`);
    }
    setValueFor(element, value) {
        this._appliedTo.add(element);
        if (value instanceof DesignTokenImpl) {
            value = this.alias(value);
        }
        DesignTokenNode.getOrCreate(element).set(this, value);
        return this;
    }
    deleteValueFor(element) {
        this._appliedTo.delete(element);
        if (DesignTokenNode.existsFor(element)) {
            DesignTokenNode.getOrCreate(element).delete(this);
        }
        return this;
    }
    withDefault(value) {
        this.setValueFor(_custom_property_manager_js__WEBPACK_IMPORTED_MODULE_1__.defaultElement, value);
        return this;
    }
    subscribe(subscriber, target) {
        const subscriberSet = this.getOrCreateSubscriberSet(target);
        if (target && !DesignTokenNode.existsFor(target)) {
            DesignTokenNode.getOrCreate(target);
        }
        if (!subscriberSet.has(subscriber)) {
            subscriberSet.add(subscriber);
        }
    }
    unsubscribe(subscriber, target) {
        const list = this.subscribers.get(target || this);
        if (list && list.has(subscriber)) {
            list.delete(subscriber);
        }
    }
    /**
     * Notifies subscribers that the value for an element has changed.
     * @param element - The element to emit a notification for
     */
    notify(element) {
        const record = Object.freeze({ token: this, target: element });
        if (this.subscribers.has(this)) {
            this.subscribers.get(this).forEach(sub => sub.handleChange(record));
        }
        if (this.subscribers.has(element)) {
            this.subscribers.get(element).forEach(sub => sub.handleChange(record));
        }
    }
    /**
     * Alias the token to the provided token.
     * @param token - the token to alias to
     */
    alias(token) {
        return ((target) => token.getValueFor(target));
    }
}
DesignTokenImpl.uniqueId = (() => {
    let id = 0;
    return () => {
        id++;
        return id.toString(16);
    };
})();
/**
 * Token storage by token ID
 */
DesignTokenImpl.tokensById = new Map();
class CustomPropertyReflector {
    startReflection(token, target) {
        token.subscribe(this, target);
        this.handleChange({ token, target });
    }
    stopReflection(token, target) {
        token.unsubscribe(this, target);
        this.remove(token, target);
    }
    handleChange(record) {
        const { token, target } = record;
        this.add(token, target);
    }
    add(token, target) {
        _custom_property_manager_js__WEBPACK_IMPORTED_MODULE_1__.PropertyTargetManager.getOrCreate(target).setProperty(token.cssCustomProperty, this.resolveCSSValue(DesignTokenNode.getOrCreate(target).get(token)));
    }
    remove(token, target) {
        _custom_property_manager_js__WEBPACK_IMPORTED_MODULE_1__.PropertyTargetManager.getOrCreate(target).removeProperty(token.cssCustomProperty);
    }
    resolveCSSValue(value) {
        return value && typeof value.createCSS === "function" ? value.createCSS() : value;
    }
}
/**
 * A light wrapper around BindingObserver to handle value caching and
 * token notification
 */
class DesignTokenBindingObserver {
    constructor(source, token, node) {
        this.source = source;
        this.token = token;
        this.node = node;
        this.dependencies = new Set();
        this.observer = _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_2__.Observable.binding(source, this, false);
        // This is a little bit hacky because it's using internal APIs of BindingObserverImpl.
        // BindingObserverImpl queues updates to batch it's notifications which doesn't work for this
        // scenario because the DesignToken.getValueFor API is not async. Without this, using DesignToken.getValueFor()
        // after DesignToken.setValueFor() when setting a dependency of the value being retrieved can return a stale
        // value. Assigning .handleChange to .call forces immediate invocation of this classes handleChange() method,
        // allowing resolution of values synchronously.
        // TODO: https://github.com/microsoft/fast/issues/5110
        this.observer.handleChange = this.observer.call;
        this.handleChange();
    }
    disconnect() {
        this.observer.disconnect();
    }
    /**
     * @internal
     */
    handleChange() {
        try {
            this.node.store.set(this.token, this.observer.observe(this.node.target, _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_2__.defaultExecutionContext));
        }
        catch (e) {
            console.error(e);
        }
    }
}
/**
 * Stores resolved token/value pairs and notifies on changes
 */
class Store {
    constructor() {
        this.values = new Map();
    }
    set(token, value) {
        if (this.values.get(token) !== value) {
            this.values.set(token, value);
            _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_2__.Observable.getNotifier(this).notify(token.id);
        }
    }
    get(token) {
        _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_2__.Observable.track(this, token.id);
        return this.values.get(token);
    }
    delete(token) {
        this.values.delete(token);
        _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_2__.Observable.getNotifier(this).notify(token.id);
    }
    all() {
        return this.values.entries();
    }
}
const nodeCache = new WeakMap();
const childToParent = new WeakMap();
/**
 * A node responsible for setting and getting token values,
 * emitting values to CSS custom properties, and maintaining
 * inheritance structures.
 */
class DesignTokenNode {
    constructor(target) {
        this.target = target;
        /**
         * Stores all resolved token values for a node
         */
        this.store = new Store();
        /**
         * All children assigned to the node
         */
        this.children = [];
        /**
         * All values explicitly assigned to the node in their raw form
         */
        this.assignedValues = new Map();
        /**
         * Tokens currently being reflected to CSS custom properties
         */
        this.reflecting = new Set();
        /**
         * Binding observers for assigned and inherited derived values.
         */
        this.bindingObservers = new Map();
        /**
         * Emits notifications to token when token values
         * change the DesignTokenNode
         */
        this.tokenValueChangeHandler = {
            handleChange: (source, arg) => {
                const token = DesignTokenImpl.getTokenById(arg);
                if (token) {
                    // Notify any token subscribers
                    token.notify(this.target);
                    this.updateCSSTokenReflection(source, token);
                }
            },
        };
        nodeCache.set(target, this);
        // Map store change notifications to token change notifications
        _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_2__.Observable.getNotifier(this.store).subscribe(this.tokenValueChangeHandler);
        if (target instanceof _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_3__.FASTElement) {
            target.$fastController.addBehaviors([this]);
        }
        else if (target.isConnected) {
            this.bind();
        }
    }
    /**
     * Returns a DesignTokenNode for an element.
     * Creates a new instance if one does not already exist for a node,
     * otherwise returns the cached instance
     *
     * @param target - The HTML element to retrieve a DesignTokenNode for
     */
    static getOrCreate(target) {
        return nodeCache.get(target) || new DesignTokenNode(target);
    }
    /**
     * Determines if a DesignTokenNode has been created for a target
     * @param target - The element to test
     */
    static existsFor(target) {
        return nodeCache.has(target);
    }
    /**
     * Searches for and return the nearest parent DesignTokenNode.
     * Null is returned if no node is found or the node provided is for a default element.
     */
    static findParent(node) {
        if (!(_custom_property_manager_js__WEBPACK_IMPORTED_MODULE_1__.defaultElement === node.target)) {
            let parent = (0,_utilities_composed_parent_js__WEBPACK_IMPORTED_MODULE_4__.composedParent)(node.target);
            while (parent !== null) {
                if (nodeCache.has(parent)) {
                    return nodeCache.get(parent);
                }
                parent = (0,_utilities_composed_parent_js__WEBPACK_IMPORTED_MODULE_4__.composedParent)(parent);
            }
            return DesignTokenNode.getOrCreate(_custom_property_manager_js__WEBPACK_IMPORTED_MODULE_1__.defaultElement);
        }
        return null;
    }
    /**
     * Finds the closest node with a value explicitly assigned for a token, otherwise null.
     * @param token - The token to look for
     * @param start - The node to start looking for value assignment
     * @returns
     */
    static findClosestAssignedNode(token, start) {
        let current = start;
        do {
            if (current.has(token)) {
                return current;
            }
            current = current.parent
                ? current.parent
                : current.target !== _custom_property_manager_js__WEBPACK_IMPORTED_MODULE_1__.defaultElement
                    ? DesignTokenNode.getOrCreate(_custom_property_manager_js__WEBPACK_IMPORTED_MODULE_1__.defaultElement)
                    : null;
        } while (current !== null);
        return null;
    }
    /**
     * The parent DesignTokenNode, or null.
     */
    get parent() {
        return childToParent.get(this) || null;
    }
    updateCSSTokenReflection(source, token) {
        if (DesignTokenImpl.isCSSDesignToken(token)) {
            const parent = this.parent;
            const reflecting = this.isReflecting(token);
            if (parent) {
                const parentValue = parent.get(token);
                const sourceValue = source.get(token);
                if (parentValue !== sourceValue && !reflecting) {
                    this.reflectToCSS(token);
                }
                else if (parentValue === sourceValue && reflecting) {
                    this.stopReflectToCSS(token);
                }
            }
            else if (!reflecting) {
                this.reflectToCSS(token);
            }
        }
    }
    /**
     * Checks if a token has been assigned an explicit value the node.
     * @param token - the token to check.
     */
    has(token) {
        return this.assignedValues.has(token);
    }
    /**
     * Gets the value of a token for a node
     * @param token - The token to retrieve the value for
     * @returns
     */
    get(token) {
        const value = this.store.get(token);
        if (value !== undefined) {
            return value;
        }
        const raw = this.getRaw(token);
        if (raw !== undefined) {
            this.hydrate(token, raw);
            return this.get(token);
        }
    }
    /**
     * Retrieves the raw assigned value of a token from the nearest assigned node.
     * @param token - The token to retrieve a raw value for
     * @returns
     */
    getRaw(token) {
        var _a;
        if (this.assignedValues.has(token)) {
            return this.assignedValues.get(token);
        }
        return (_a = DesignTokenNode.findClosestAssignedNode(token, this)) === null || _a === void 0 ? void 0 : _a.getRaw(token);
    }
    /**
     * Sets a token to a value for a node
     * @param token - The token to set
     * @param value - The value to set the token to
     */
    set(token, value) {
        if (DesignTokenImpl.isDerivedDesignTokenValue(this.assignedValues.get(token))) {
            this.tearDownBindingObserver(token);
        }
        this.assignedValues.set(token, value);
        if (DesignTokenImpl.isDerivedDesignTokenValue(value)) {
            this.setupBindingObserver(token, value);
        }
        else {
            this.store.set(token, value);
        }
    }
    /**
     * Deletes a token value for the node.
     * @param token - The token to delete the value for
     */
    delete(token) {
        this.assignedValues.delete(token);
        this.tearDownBindingObserver(token);
        const upstream = this.getRaw(token);
        if (upstream) {
            this.hydrate(token, upstream);
        }
        else {
            this.store.delete(token);
        }
    }
    /**
     * Invoked when the DesignTokenNode.target is attached to the document
     */
    bind() {
        const parent = DesignTokenNode.findParent(this);
        if (parent) {
            parent.appendChild(this);
        }
        for (const key of this.assignedValues.keys()) {
            key.notify(this.target);
        }
    }
    /**
     * Invoked when the DesignTokenNode.target is detached from the document
     */
    unbind() {
        if (this.parent) {
            const parent = childToParent.get(this);
            parent.removeChild(this);
        }
        for (const token of this.bindingObservers.keys()) {
            this.tearDownBindingObserver(token);
        }
    }
    /**
     * Appends a child to a parent DesignTokenNode.
     * @param child - The child to append to the node
     */
    appendChild(child) {
        if (child.parent) {
            childToParent.get(child).removeChild(child);
        }
        const reParent = this.children.filter(x => child.contains(x));
        childToParent.set(child, this);
        this.children.push(child);
        reParent.forEach(x => child.appendChild(x));
        _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_2__.Observable.getNotifier(this.store).subscribe(child);
        // How can we not notify *every* subscriber?
        for (const [token, value] of this.store.all()) {
            child.hydrate(token, this.bindingObservers.has(token) ? this.getRaw(token) : value);
            // Need to stop reflecting any tokens that can now be inherited
            child.updateCSSTokenReflection(child.store, token);
        }
    }
    /**
     * Removes a child from a node.
     * @param child - The child to remove.
     */
    removeChild(child) {
        const childIndex = this.children.indexOf(child);
        if (childIndex !== -1) {
            this.children.splice(childIndex, 1);
        }
        _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_2__.Observable.getNotifier(this.store).unsubscribe(child);
        if (child.parent !== this) {
            return false;
        }
        const deleted = childToParent.delete(child);
        for (const [token] of this.store.all()) {
            child.hydrate(token, child.getRaw(token));
            // Need to start reflecting any assigned values that were previously inherited
            child.updateCSSTokenReflection(child.store, token);
        }
        return deleted;
    }
    /**
     * Tests whether a provided node is contained by
     * the calling node.
     * @param test - The node to test
     */
    contains(test) {
        return (0,_utilities_composed_contains_js__WEBPACK_IMPORTED_MODULE_5__.composedContains)(this.target, test.target);
    }
    /**
     * Instructs the node to reflect a design token for the provided token.
     * @param token - The design token to reflect
     */
    reflectToCSS(token) {
        if (!this.isReflecting(token)) {
            this.reflecting.add(token);
            DesignTokenNode.cssCustomPropertyReflector.startReflection(token, this.target);
        }
    }
    /**
     * Stops reflecting a DesignToken to CSS
     * @param token - The design token to stop reflecting
     */
    stopReflectToCSS(token) {
        if (this.isReflecting(token)) {
            this.reflecting.delete(token);
            DesignTokenNode.cssCustomPropertyReflector.stopReflection(token, this.target);
        }
    }
    /**
     * Determines if a token is being reflected to CSS for a node.
     * @param token - The token to check for reflection
     * @returns
     */
    isReflecting(token) {
        return this.reflecting.has(token);
    }
    /**
     * Handle changes to upstream tokens
     * @param source - The parent DesignTokenNode
     * @param property - The token ID that changed
     */
    handleChange(source, property) {
        const token = DesignTokenImpl.getTokenById(property);
        if (!token) {
            return;
        }
        this.hydrate(token, this.getRaw(token));
        this.updateCSSTokenReflection(this.store, token);
    }
    /**
     * Hydrates a token with a DesignTokenValue, making retrieval available.
     * @param token - The token to hydrate
     * @param value - The value to hydrate
     */
    hydrate(token, value) {
        if (!this.has(token)) {
            const observer = this.bindingObservers.get(token);
            if (DesignTokenImpl.isDerivedDesignTokenValue(value)) {
                if (observer) {
                    // If the binding source doesn't match, we need
                    // to update the binding
                    if (observer.source !== value) {
                        this.tearDownBindingObserver(token);
                        this.setupBindingObserver(token, value);
                    }
                }
                else {
                    this.setupBindingObserver(token, value);
                }
            }
            else {
                if (observer) {
                    this.tearDownBindingObserver(token);
                }
                this.store.set(token, value);
            }
        }
    }
    /**
     * Sets up a binding observer for a derived token value that notifies token
     * subscribers on change.
     *
     * @param token - The token to notify when the binding updates
     * @param source - The binding source
     */
    setupBindingObserver(token, source) {
        const binding = new DesignTokenBindingObserver(source, token, this);
        this.bindingObservers.set(token, binding);
        return binding;
    }
    /**
     * Tear down a binding observer for a token.
     */
    tearDownBindingObserver(token) {
        if (this.bindingObservers.has(token)) {
            this.bindingObservers.get(token).disconnect();
            this.bindingObservers.delete(token);
            return true;
        }
        return false;
    }
}
/**
 * Responsible for reflecting tokens to CSS custom properties
 */
DesignTokenNode.cssCustomPropertyReflector = new CustomPropertyReflector();
(0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([
    _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_2__.observable
], DesignTokenNode.prototype, "children", void 0);
function create(nameOrConfig) {
    return DesignTokenImpl.from(nameOrConfig);
}
/* eslint-enable @typescript-eslint/no-unused-vars */
/**
 * Factory object for creating {@link (DesignToken:interface)} instances.
 * @public
 */
const DesignToken = Object.freeze({
    create,
    /**
     * Informs DesignToken that an HTMLElement for which tokens have
     * been set has been connected to the document.
     *
     * The browser does not provide a reliable mechanism to observe an HTMLElement's connectedness
     * in all scenarios, so invoking this method manually is necessary when:
     *
     * 1. Token values are set for an HTMLElement.
     * 2. The HTMLElement does not inherit from FASTElement.
     * 3. The HTMLElement is not connected to the document when token values are set.
     *
     * @param element - The element to notify
     * @returns - true if notification was successful, otherwise false.
     */
    notifyConnection(element) {
        if (!element.isConnected || !DesignTokenNode.existsFor(element)) {
            return false;
        }
        DesignTokenNode.getOrCreate(element).bind();
        return true;
    },
    /**
     * Informs DesignToken that an HTMLElement for which tokens have
     * been set has been disconnected to the document.
     *
     * The browser does not provide a reliable mechanism to observe an HTMLElement's connectedness
     * in all scenarios, so invoking this method manually is necessary when:
     *
     * 1. Token values are set for an HTMLElement.
     * 2. The HTMLElement does not inherit from FASTElement.
     *
     * @param element - The element to notify
     * @returns - true if notification was successful, otherwise false.
     */
    notifyDisconnection(element) {
        if (element.isConnected || !DesignTokenNode.existsFor(element)) {
            return false;
        }
        DesignTokenNode.getOrCreate(element).unbind();
        return true;
    },
    /**
     * Registers and element or document as a DesignToken root.
     * {@link CSSDesignToken | CSSDesignTokens} with default values assigned via
     * {@link (DesignToken:interface).withDefault} will emit CSS custom properties to all
     * registered roots.
     * @param target - The root to register
     */
    registerRoot(target = _custom_property_manager_js__WEBPACK_IMPORTED_MODULE_1__.defaultElement) {
        _custom_property_manager_js__WEBPACK_IMPORTED_MODULE_1__.RootStyleSheetTarget.registerRoot(target);
    },
    /**
     * Unregister an element or document as a DesignToken root.
     * @param target - The root to deregister
     */
    unregisterRoot(target = _custom_property_manager_js__WEBPACK_IMPORTED_MODULE_1__.defaultElement) {
        _custom_property_manager_js__WEBPACK_IMPORTED_MODULE_1__.RootStyleSheetTarget.unregisterRoot(target);
    },
});
/* eslint-enable @typescript-eslint/no-non-null-assertion */


/***/ }),

/***/ "./node_modules/@microsoft/fast-foundation/dist/esm/di/di.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@microsoft/fast-foundation/dist/esm/di/di.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Container: () => (/* binding */ Container),
/* harmony export */   ContainerConfiguration: () => (/* binding */ ContainerConfiguration),
/* harmony export */   ContainerImpl: () => (/* binding */ ContainerImpl),
/* harmony export */   DI: () => (/* binding */ DI),
/* harmony export */   DefaultResolver: () => (/* binding */ DefaultResolver),
/* harmony export */   FactoryImpl: () => (/* binding */ FactoryImpl),
/* harmony export */   Registration: () => (/* binding */ Registration),
/* harmony export */   ResolverBuilder: () => (/* binding */ ResolverBuilder),
/* harmony export */   ResolverImpl: () => (/* binding */ ResolverImpl),
/* harmony export */   ServiceLocator: () => (/* binding */ ServiceLocator),
/* harmony export */   all: () => (/* binding */ all),
/* harmony export */   ignore: () => (/* binding */ ignore),
/* harmony export */   inject: () => (/* binding */ inject),
/* harmony export */   lazy: () => (/* binding */ lazy),
/* harmony export */   newInstanceForScope: () => (/* binding */ newInstanceForScope),
/* harmony export */   newInstanceOf: () => (/* binding */ newInstanceOf),
/* harmony export */   optional: () => (/* binding */ optional),
/* harmony export */   singleton: () => (/* binding */ singleton),
/* harmony export */   transient: () => (/* binding */ transient),
/* harmony export */   validateKey: () => (/* binding */ validateKey)
/* harmony export */ });
/* harmony import */ var _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/fast-element */ "./node_modules/@microsoft/fast-element/dist/esm/components/fast-element.js");
/* harmony import */ var _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/fast-element */ "./node_modules/@microsoft/fast-element/dist/esm/platform.js");
/**
 * Big thanks to https://github.com/fkleuver and the https://github.com/aurelia/aurelia project
 * for the bulk of this code and many of the associated tests.
 */

// Tiny polyfill for TypeScript's Reflect metadata API.
const metadataByTarget = new Map();
if (!("metadata" in Reflect)) {
    Reflect.metadata = function (key, value) {
        return function (target) {
            Reflect.defineMetadata(key, value, target);
        };
    };
    Reflect.defineMetadata = function (key, value, target) {
        let metadata = metadataByTarget.get(target);
        if (metadata === void 0) {
            metadataByTarget.set(target, (metadata = new Map()));
        }
        metadata.set(key, value);
    };
    Reflect.getOwnMetadata = function (key, target) {
        const metadata = metadataByTarget.get(target);
        if (metadata !== void 0) {
            return metadata.get(key);
        }
        return void 0;
    };
}
/**
 * A utility class used that constructs and registers resolvers for a dependency
 * injection container. Supports a standard set of object lifetimes.
 * @public
 */
class ResolverBuilder {
    /**
     *
     * @param container - The container to create resolvers for.
     * @param key - The key to register resolvers under.
     */
    constructor(container, key) {
        this.container = container;
        this.key = key;
    }
    /**
     * Creates a resolver for an existing object instance.
     * @param value - The instance to resolve.
     * @returns The resolver.
     */
    instance(value) {
        return this.registerResolver(0 /* instance */, value);
    }
    /**
     * Creates a resolver that enforces a singleton lifetime.
     * @param value - The type to create and cache the singleton for.
     * @returns The resolver.
     */
    singleton(value) {
        return this.registerResolver(1 /* singleton */, value);
    }
    /**
     * Creates a resolver that creates a new instance for every dependency request.
     * @param value - The type to create instances of.
     * @returns - The resolver.
     */
    transient(value) {
        return this.registerResolver(2 /* transient */, value);
    }
    /**
     * Creates a resolver that invokes a callback function for every dependency resolution
     * request, allowing custom logic to return the dependency.
     * @param value - The callback to call during resolution.
     * @returns The resolver.
     */
    callback(value) {
        return this.registerResolver(3 /* callback */, value);
    }
    /**
     * Creates a resolver that invokes a callback function the first time that a dependency
     * resolution is requested. The returned value is then cached and provided for all
     * subsequent requests.
     * @param value - The callback to call during the first resolution.
     * @returns The resolver.
     */
    cachedCallback(value) {
        return this.registerResolver(3 /* callback */, cacheCallbackResult(value));
    }
    /**
     * Aliases the current key to a different key.
     * @param destinationKey - The key to point the alias to.
     * @returns The resolver.
     */
    aliasTo(destinationKey) {
        return this.registerResolver(5 /* alias */, destinationKey);
    }
    registerResolver(strategy, state) {
        const { container, key } = this;
        /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
        this.container = this.key = (void 0);
        return container.registerResolver(key, new ResolverImpl(key, strategy, state));
    }
}
function cloneArrayWithPossibleProps(source) {
    const clone = source.slice();
    const keys = Object.keys(source);
    const len = keys.length;
    let key;
    for (let i = 0; i < len; ++i) {
        key = keys[i];
        if (!isArrayIndex(key)) {
            clone[key] = source[key];
        }
    }
    return clone;
}
/**
 * A set of default resolvers useful in configuring a container.
 * @public
 */
const DefaultResolver = Object.freeze({
    /**
     * Disables auto-registration and throws for all un-registered dependencies.
     * @param key - The key to create the resolver for.
     */
    none(key) {
        throw Error(`${key.toString()} not registered, did you forget to add @singleton()?`);
    },
    /**
     * Provides default singleton resolution behavior during auto-registration.
     * @param key - The key to create the resolver for.
     * @returns The resolver.
     */
    singleton(key) {
        return new ResolverImpl(key, 1 /* singleton */, key);
    },
    /**
     * Provides default transient resolution behavior during auto-registration.
     * @param key - The key to create the resolver for.
     * @returns The resolver.
     */
    transient(key) {
        return new ResolverImpl(key, 2 /* transient */, key);
    },
});
/**
 * Configuration for a dependency injection container.
 * @public
 */
const ContainerConfiguration = Object.freeze({
    /**
     * The default configuration used when creating a DOM-disconnected container.
     * @remarks
     * The default creates a root container, with no parent container. It does not handle
     * owner requests and it uses singleton resolution behavior for auto-registration.
     */
    default: Object.freeze({
        parentLocator: () => null,
        responsibleForOwnerRequests: false,
        defaultResolver: DefaultResolver.singleton,
    }),
});
const dependencyLookup = new Map();
function getParamTypes(key) {
    return (Type) => {
        return Reflect.getOwnMetadata(key, Type);
    };
}
let rootDOMContainer = null;
/**
 * The gateway to dependency injection APIs.
 * @public
 */
const DI = Object.freeze({
    /**
     * Creates a new dependency injection container.
     * @param config - The configuration for the container.
     * @returns A newly created dependency injection container.
     */
    createContainer(config) {
        return new ContainerImpl(null, Object.assign({}, ContainerConfiguration.default, config));
    },
    /**
     * Finds the dependency injection container responsible for providing dependencies
     * to the specified node.
     * @param node - The node to find the responsible container for.
     * @returns The container responsible for providing dependencies to the node.
     * @remarks
     * This will be the same as the parent container if the specified node
     * does not itself host a container configured with responsibleForOwnerRequests.
     */
    findResponsibleContainer(node) {
        const owned = node.$$container$$;
        if (owned && owned.responsibleForOwnerRequests) {
            return owned;
        }
        return DI.findParentContainer(node);
    },
    /**
     * Find the dependency injection container up the DOM tree from this node.
     * @param node - The node to find the parent container for.
     * @returns The parent container of this node.
     * @remarks
     * This will be the same as the responsible container if the specified node
     * does not itself host a container configured with responsibleForOwnerRequests.
     */
    findParentContainer(node) {
        const event = new CustomEvent(DILocateParentEventType, {
            bubbles: true,
            composed: true,
            cancelable: true,
            detail: { container: void 0 },
        });
        node.dispatchEvent(event);
        return event.detail.container || DI.getOrCreateDOMContainer();
    },
    /**
     * Returns a dependency injection container if one is explicitly owned by the specified
     * node. If one is not owned, then a new container is created and assigned to the node.
     * @param node - The node to find or create the container for.
     * @param config - The configuration for the container if one needs to be created.
     * @returns The located or created container.
     * @remarks
     * This API does not search for a responsible or parent container. It looks only for a container
     * directly defined on the specified node and creates one at that location if one does not
     * already exist.
     */
    getOrCreateDOMContainer(node, config) {
        if (!node) {
            return (rootDOMContainer ||
                (rootDOMContainer = new ContainerImpl(null, Object.assign({}, ContainerConfiguration.default, config, {
                    parentLocator: () => null,
                }))));
        }
        return (node.$$container$$ ||
            new ContainerImpl(node, Object.assign({}, ContainerConfiguration.default, config, {
                parentLocator: DI.findParentContainer,
            })));
    },
    /**
     * Gets the "design:paramtypes" metadata for the specified type.
     * @param Type - The type to get the metadata for.
     * @returns The metadata array or undefined if no metadata is found.
     */
    getDesignParamtypes: getParamTypes("design:paramtypes"),
    /**
     * Gets the "di:paramtypes" metadata for the specified type.
     * @param Type - The type to get the metadata for.
     * @returns The metadata array or undefined if no metadata is found.
     */
    getAnnotationParamtypes: getParamTypes("di:paramtypes"),
    /**
     *
     * @param Type - Gets the "di:paramtypes" metadata for the specified type. If none is found,
     * an empty metadata array is created and added.
     * @returns The metadata array.
     */
    getOrCreateAnnotationParamTypes(Type) {
        let annotationParamtypes = this.getAnnotationParamtypes(Type);
        if (annotationParamtypes === void 0) {
            Reflect.defineMetadata("di:paramtypes", (annotationParamtypes = []), Type);
        }
        return annotationParamtypes;
    },
    /**
     * Gets the dependency keys representing what is needed to instantiate the specified type.
     * @param Type - The type to get the dependencies for.
     * @returns An array of dependency keys.
     */
    getDependencies(Type) {
        // Note: Every detail of this getDependencies method is pretty deliberate at the moment, and probably not yet 100% tested from every possible angle,
        // so be careful with making changes here as it can have a huge impact on complex end user apps.
        // Preferably, only make changes to the dependency resolution process via a RFC.
        let dependencies = dependencyLookup.get(Type);
        if (dependencies === void 0) {
            // Type.length is the number of constructor parameters. If this is 0, it could mean the class has an empty constructor
            // but it could also mean the class has no constructor at all (in which case it inherits the constructor from the prototype).
            // Non-zero constructor length + no paramtypes means emitDecoratorMetadata is off, or the class has no decorator.
            // We're not doing anything with the above right now, but it's good to keep in mind for any future issues.
            const inject = Type.inject;
            if (inject === void 0) {
                // design:paramtypes is set by tsc when emitDecoratorMetadata is enabled.
                const designParamtypes = DI.getDesignParamtypes(Type);
                // di:paramtypes is set by the parameter decorator from DI.createInterface or by @inject
                const annotationParamtypes = DI.getAnnotationParamtypes(Type);
                if (designParamtypes === void 0) {
                    if (annotationParamtypes === void 0) {
                        // Only go up the prototype if neither static inject nor any of the paramtypes is defined, as
                        // there is no sound way to merge a type's deps with its prototype's deps
                        const Proto = Object.getPrototypeOf(Type);
                        if (typeof Proto === "function" && Proto !== Function.prototype) {
                            dependencies = cloneArrayWithPossibleProps(DI.getDependencies(Proto));
                        }
                        else {
                            dependencies = [];
                        }
                    }
                    else {
                        // No design:paramtypes so just use the di:paramtypes
                        dependencies = cloneArrayWithPossibleProps(annotationParamtypes);
                    }
                }
                else if (annotationParamtypes === void 0) {
                    // No di:paramtypes so just use the design:paramtypes
                    dependencies = cloneArrayWithPossibleProps(designParamtypes);
                }
                else {
                    // We've got both, so merge them (in case of conflict on same index, di:paramtypes take precedence)
                    dependencies = cloneArrayWithPossibleProps(designParamtypes);
                    let len = annotationParamtypes.length;
                    let auAnnotationParamtype;
                    for (let i = 0; i < len; ++i) {
                        auAnnotationParamtype = annotationParamtypes[i];
                        if (auAnnotationParamtype !== void 0) {
                            dependencies[i] = auAnnotationParamtype;
                        }
                    }
                    const keys = Object.keys(annotationParamtypes);
                    len = keys.length;
                    let key;
                    for (let i = 0; i < len; ++i) {
                        key = keys[i];
                        if (!isArrayIndex(key)) {
                            dependencies[key] = annotationParamtypes[key];
                        }
                    }
                }
            }
            else {
                // Ignore paramtypes if we have static inject
                dependencies = cloneArrayWithPossibleProps(inject);
            }
            dependencyLookup.set(Type, dependencies);
        }
        return dependencies;
    },
    /**
     * Defines a property on a web component class. The value of this property will
     * be resolved from the dependency injection container responsible for the element
     * instance, based on where it is connected in the DOM.
     * @param target - The target to define the property on.
     * @param propertyName - The name of the property to define.
     * @param key - The dependency injection key.
     * @param respectConnection - Indicates whether or not to update the property value if the
     * hosting component is disconnected and then re-connected at a different location in the DOM.
     * @remarks
     * The respectConnection option is only applicable to elements that descend from FASTElement.
     */
    defineProperty(target, propertyName, key, respectConnection = false) {
        const diPropertyKey = `$di_${propertyName}`;
        Reflect.defineProperty(target, propertyName, {
            get: function () {
                let value = this[diPropertyKey];
                if (value === void 0) {
                    const container = this instanceof HTMLElement
                        ? DI.findResponsibleContainer(this)
                        : DI.getOrCreateDOMContainer();
                    value = container.get(key);
                    this[diPropertyKey] = value;
                    if (respectConnection && this instanceof _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_0__.FASTElement) {
                        const notifier = this.$fastController;
                        const handleChange = () => {
                            const newContainer = DI.findResponsibleContainer(this);
                            const newValue = newContainer.get(key);
                            const oldValue = this[diPropertyKey];
                            if (newValue !== oldValue) {
                                this[diPropertyKey] = value;
                                notifier.notify(propertyName);
                            }
                        };
                        notifier.subscribe({ handleChange }, "isConnected");
                    }
                }
                return value;
            },
        });
    },
    /**
     * Creates a dependency injection key.
     * @param nameConfigOrCallback - A friendly name for the key or a lambda that configures a
     * default resolution for the dependency.
     * @param configuror - If a friendly name was provided for the first parameter, then an optional
     * lambda that configures a default resolution for the dependency can be provided second.
     * @returns The created key.
     * @remarks
     * The created key can be used as a property decorator or constructor parameter decorator,
     * in addition to its standard use in an inject array or through direct container APIs.
     */
    createInterface(nameConfigOrCallback, configuror) {
        const configure = typeof nameConfigOrCallback === "function"
            ? nameConfigOrCallback
            : configuror;
        const friendlyName = typeof nameConfigOrCallback === "string"
            ? nameConfigOrCallback
            : nameConfigOrCallback && "friendlyName" in nameConfigOrCallback
                ? nameConfigOrCallback.friendlyName || defaultFriendlyName
                : defaultFriendlyName;
        const respectConnection = typeof nameConfigOrCallback === "string"
            ? false
            : nameConfigOrCallback && "respectConnection" in nameConfigOrCallback
                ? nameConfigOrCallback.respectConnection || false
                : false;
        const Interface = function (target, property, index) {
            if (target == null || new.target !== undefined) {
                throw new Error(`No registration for interface: '${Interface.friendlyName}'`);
            }
            if (property) {
                DI.defineProperty(target, property, Interface, respectConnection);
            }
            else {
                const annotationParamtypes = DI.getOrCreateAnnotationParamTypes(target);
                annotationParamtypes[index] = Interface;
            }
        };
        Interface.$isInterface = true;
        Interface.friendlyName = friendlyName == null ? "(anonymous)" : friendlyName;
        if (configure != null) {
            Interface.register = function (container, key) {
                return configure(new ResolverBuilder(container, key !== null && key !== void 0 ? key : Interface));
            };
        }
        Interface.toString = function toString() {
            return `InterfaceSymbol<${Interface.friendlyName}>`;
        };
        return Interface;
    },
    /**
     * A decorator that specifies what to inject into its target.
     * @param dependencies - The dependencies to inject.
     * @returns The decorator to be applied to the target class.
     * @remarks
     * The decorator can be used to decorate a class, listing all of the classes dependencies.
     * Or it can be used to decorate a constructor paramter, indicating what to inject for that
     * parameter.
     * Or it can be used for a web component property, indicating what that property should resolve to.
     */
    inject(...dependencies) {
        return function (target, key, descriptor) {
            if (typeof descriptor === "number") {
                // It's a parameter decorator.
                const annotationParamtypes = DI.getOrCreateAnnotationParamTypes(target);
                const dep = dependencies[0];
                if (dep !== void 0) {
                    annotationParamtypes[descriptor] = dep;
                }
            }
            else if (key) {
                DI.defineProperty(target, key, dependencies[0]);
            }
            else {
                const annotationParamtypes = descriptor
                    ? DI.getOrCreateAnnotationParamTypes(descriptor.value)
                    : DI.getOrCreateAnnotationParamTypes(target);
                let dep;
                for (let i = 0; i < dependencies.length; ++i) {
                    dep = dependencies[i];
                    if (dep !== void 0) {
                        annotationParamtypes[i] = dep;
                    }
                }
            }
        };
    },
    /**
     * Registers the `target` class as a transient dependency; each time the dependency is resolved
     * a new instance will be created.
     *
     * @param target - The class / constructor function to register as transient.
     * @returns The same class, with a static `register` method that takes a container and returns the appropriate resolver.
     *
     * @example
     * On an existing class
     * ```ts
     * class Foo { }
     * DI.transient(Foo);
     * ```
     *
     * @example
     * Inline declaration
     *
     * ```ts
     * const Foo = DI.transient(class { });
     * // Foo is now strongly typed with register
     * Foo.register(container);
     * ```
     *
     * @public
     */
    transient(target) {
        target.register = function register(container) {
            const registration = Registration.transient(target, target);
            return registration.register(container);
        };
        target.registerInRequestor = false;
        return target;
    },
    /**
     * Registers the `target` class as a singleton dependency; the class will only be created once. Each
     * consecutive time the dependency is resolved, the same instance will be returned.
     *
     * @param target - The class / constructor function to register as a singleton.
     * @returns The same class, with a static `register` method that takes a container and returns the appropriate resolver.
     * @example
     * On an existing class
     * ```ts
     * class Foo { }
     * DI.singleton(Foo);
     * ```
     *
     * @example
     * Inline declaration
     * ```ts
     * const Foo = DI.singleton(class { });
     * // Foo is now strongly typed with register
     * Foo.register(container);
     * ```
     *
     * @public
     */
    singleton(target, options = defaultSingletonOptions) {
        target.register = function register(container) {
            const registration = Registration.singleton(target, target);
            return registration.register(container);
        };
        target.registerInRequestor = options.scoped;
        return target;
    },
});
/**
 * The interface key that resolves the dependency injection container itself.
 * @public
 */
const Container = DI.createInterface("Container");
/**
 * The interface key that resolves the service locator itself.
 * @public
 */
const ServiceLocator = Container;
function createResolver(getter) {
    return function (key) {
        const resolver = function (target, property, descriptor) {
            DI.inject(resolver)(target, property, descriptor);
        };
        resolver.$isResolver = true;
        resolver.resolve = function (handler, requestor) {
            return getter(key, handler, requestor);
        };
        return resolver;
    };
}
/**
 * A decorator that specifies what to inject into its target.
 * @param dependencies - The dependencies to inject.
 * @returns The decorator to be applied to the target class.
 * @remarks
 * The decorator can be used to decorate a class, listing all of the classes dependencies.
 * Or it can be used to decorate a constructor paramter, indicating what to inject for that
 * parameter.
 * Or it can be used for a web component property, indicating what that property should resolve to.
 *
 * @public
 */
const inject = DI.inject;
function transientDecorator(target) {
    return DI.transient(target);
}
function transient(target) {
    return target == null ? transientDecorator : transientDecorator(target);
}
const defaultSingletonOptions = { scoped: false };
function singletonDecorator(target) {
    return DI.singleton(target);
}
/**
 * @public
 */
function singleton(targetOrOptions) {
    if (typeof targetOrOptions === "function") {
        return DI.singleton(targetOrOptions);
    }
    return function ($target) {
        return DI.singleton($target, targetOrOptions);
    };
}
function createAllResolver(getter) {
    return function (key, searchAncestors) {
        searchAncestors = !!searchAncestors;
        const resolver = function (target, property, descriptor) {
            DI.inject(resolver)(target, property, descriptor);
        };
        resolver.$isResolver = true;
        resolver.resolve = function (handler, requestor) {
            /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
            return getter(key, handler, requestor, searchAncestors);
        };
        return resolver;
    };
}
/**
 * A decorator and DI resolver that will resolve an array of all dependencies
 * registered with the specified key.
 * @param key - The key to resolve all dependencies for.
 * @param searchAncestors - [optional] Indicates whether to search ancestor containers.
 * @public
 */
const all = createAllResolver((key, handler, requestor, searchAncestors) => requestor.getAll(key, searchAncestors));
/**
 * A decorator that lazily injects a dependency depending on whether the `Key` is present at the time of function call.
 *
 * @example
 * You need to make your argument a function that returns the type, for example
 * ```ts
 * class Foo {
 *   constructor( @lazy('random') public random: () => number )
 * }
 * const foo = container.get(Foo); // instanceof Foo
 * foo.random(); // throws
 * ```
 * would throw an exception because you haven't registered `'random'` before calling the method.
 * @example
 * This, would give you a new 'Math.random()' number each time.
 * ```ts
 * class Foo {
 *   constructor( @lazy('random') public random: () => random )
 * }
 * container.register(Registration.callback('random', Math.random ));
 * container.get(Foo).random(); // some random number
 * container.get(Foo).random(); // another random number
 * ```
 *
 * `@lazy` does not manage the lifecycle of the underlying key. If you want a singleton, you have to register as a
 * `singleton`, `transient` would also behave as you would expect, providing you a new instance each time.
 *
 * @param key - The key to lazily resolve.
 * see {@link DI.createInterface} on interactions with interfaces
 *
 * @public
 */
const lazy = createResolver((key, handler, requestor) => {
    return () => requestor.get(key);
});
/**
 * A decorator that allows you to optionally inject a dependency depending on whether the [[`Key`]] is present, for example:
 * @example
 * ```ts
 * class Foo {
 *   constructor( @inject('mystring') public str: string = 'somestring' )
 * }
 * container.get(Foo); // throws
 * ```
 * would fail
 *
 * @example
 * ```ts
 * class Foo {
 *   constructor( @optional('mystring') public str: string = 'somestring' )
 * }
 * container.get(Foo).str // somestring
 * ```
 * if you use it without a default it will inject `undefined`, so remember to mark your input type as
 * possibly `undefined`!
 *
 * @param key - The key to optionally resolve.
 * see {@link DI.createInterface} on interactions with interfaces
 *
 * @public
 */
const optional = createResolver((key, handler, requestor) => {
    if (requestor.has(key, true)) {
        return requestor.get(key);
    }
    else {
        return undefined;
    }
});
/**
 * A decorator that tells the container not to try to inject a dependency.
 *
 * @public
 */
function ignore(target, property, descriptor) {
    DI.inject(ignore)(target, property, descriptor);
}
// Hack: casting below used to prevent TS from generate a namespace which can't be commented
// and results in documentation validation errors.
ignore.$isResolver = true;
ignore.resolve = () => undefined;
/**
 * A decorator that indicates that a new instance should be injected scoped to the
 * container that requested the instance.
 * @param key - The dependency key for the new instance.
 * @remarks
 * This creates a resolver with an instance strategy pointing to the new instance, effectively
 * making this a singleton, scoped to the container or DOM's subtree.
 *
 * @public
 */
const newInstanceForScope = createResolver((key, handler, requestor) => {
    const instance = createNewInstance(key, handler);
    const resolver = new ResolverImpl(key, 0 /* instance */, instance);
    requestor.registerResolver(key, resolver);
    return instance;
});
/**
 * A decorator that indicates that a new instance should be injected.
 * @param key - The dependency key for the new instance.
 * @remarks
 * The instance is not internally cached with a resolver as newInstanceForScope does.
 *
 * @public
 */
const newInstanceOf = createResolver((key, handler, _requestor) => createNewInstance(key, handler));
function createNewInstance(key, handler) {
    /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
    return handler.getFactory(key).construct(handler);
}
/** @internal */
class ResolverImpl {
    constructor(key, strategy, state) {
        this.key = key;
        this.strategy = strategy;
        this.state = state;
        this.resolving = false;
    }
    get $isResolver() {
        return true;
    }
    register(container) {
        return container.registerResolver(this.key, this);
    }
    resolve(handler, requestor) {
        switch (this.strategy) {
            case 0 /* instance */:
                return this.state;
            case 1 /* singleton */: {
                if (this.resolving) {
                    throw new Error(`Cyclic dependency found: ${this.state.name}`);
                }
                this.resolving = true;
                this.state = handler
                    .getFactory(this.state)
                    .construct(requestor);
                this.strategy = 0 /* instance */;
                this.resolving = false;
                return this.state;
            }
            case 2 /* transient */: {
                // Always create transients from the requesting container
                const factory = handler.getFactory(this.state);
                if (factory === null) {
                    throw new Error(`Resolver for ${String(this.key)} returned a null factory`);
                }
                return factory.construct(requestor);
            }
            case 3 /* callback */:
                return this.state(handler, requestor, this);
            case 4 /* array */:
                return this.state[0].resolve(handler, requestor);
            case 5 /* alias */:
                return requestor.get(this.state);
            default:
                throw new Error(`Invalid resolver strategy specified: ${this.strategy}.`);
        }
    }
    getFactory(container) {
        var _a, _b, _c;
        switch (this.strategy) {
            case 1 /* singleton */:
            case 2 /* transient */:
                return container.getFactory(this.state);
            case 5 /* alias */:
                return (_c = (_b = (_a = container.getResolver(this.state)) === null || _a === void 0 ? void 0 : _a.getFactory) === null || _b === void 0 ? void 0 : _b.call(_a, container)) !== null && _c !== void 0 ? _c : null;
            default:
                return null;
        }
    }
}
function containerGetKey(d) {
    return this.get(d);
}
function transformInstance(inst, transform) {
    return transform(inst);
}
/** @internal */
class FactoryImpl {
    constructor(Type, dependencies) {
        this.Type = Type;
        this.dependencies = dependencies;
        this.transformers = null;
    }
    construct(container, dynamicDependencies) {
        let instance;
        if (dynamicDependencies === void 0) {
            instance = new this.Type(...this.dependencies.map(containerGetKey, container));
        }
        else {
            instance = new this.Type(...this.dependencies.map(containerGetKey, container), ...dynamicDependencies);
        }
        if (this.transformers == null) {
            return instance;
        }
        return this.transformers.reduce(transformInstance, instance);
    }
    registerTransformer(transformer) {
        (this.transformers || (this.transformers = [])).push(transformer);
    }
}
const containerResolver = {
    $isResolver: true,
    resolve(handler, requestor) {
        return requestor;
    },
};
function isRegistry(obj) {
    return typeof obj.register === "function";
}
function isSelfRegistry(obj) {
    return isRegistry(obj) && typeof obj.registerInRequestor === "boolean";
}
function isRegisterInRequester(obj) {
    return isSelfRegistry(obj) && obj.registerInRequestor;
}
function isClass(obj) {
    return obj.prototype !== void 0;
}
const InstrinsicTypeNames = new Set([
    "Array",
    "ArrayBuffer",
    "Boolean",
    "DataView",
    "Date",
    "Error",
    "EvalError",
    "Float32Array",
    "Float64Array",
    "Function",
    "Int8Array",
    "Int16Array",
    "Int32Array",
    "Map",
    "Number",
    "Object",
    "Promise",
    "RangeError",
    "ReferenceError",
    "RegExp",
    "Set",
    "SharedArrayBuffer",
    "String",
    "SyntaxError",
    "TypeError",
    "Uint8Array",
    "Uint8ClampedArray",
    "Uint16Array",
    "Uint32Array",
    "URIError",
    "WeakMap",
    "WeakSet",
]);
const DILocateParentEventType = "__DI_LOCATE_PARENT__";
const factories = new Map();
/**
 * @internal
 */
class ContainerImpl {
    constructor(owner, config) {
        this.owner = owner;
        this.config = config;
        this._parent = void 0;
        this.registerDepth = 0;
        this.context = null;
        if (owner !== null) {
            owner.$$container$$ = this;
        }
        this.resolvers = new Map();
        this.resolvers.set(Container, containerResolver);
        if (owner instanceof Node) {
            owner.addEventListener(DILocateParentEventType, (e) => {
                if (e.composedPath()[0] !== this.owner) {
                    e.detail.container = this;
                    e.stopImmediatePropagation();
                }
            });
        }
    }
    get parent() {
        if (this._parent === void 0) {
            this._parent = this.config.parentLocator(this.owner);
        }
        return this._parent;
    }
    get depth() {
        return this.parent === null ? 0 : this.parent.depth + 1;
    }
    get responsibleForOwnerRequests() {
        return this.config.responsibleForOwnerRequests;
    }
    registerWithContext(context, ...params) {
        this.context = context;
        this.register(...params);
        this.context = null;
        return this;
    }
    register(...params) {
        if (++this.registerDepth === 100) {
            throw new Error("Unable to autoregister dependency");
            // Most likely cause is trying to register a plain object that does not have a
            // register method and is not a class constructor
        }
        let current;
        let keys;
        let value;
        let j;
        let jj;
        const context = this.context;
        for (let i = 0, ii = params.length; i < ii; ++i) {
            current = params[i];
            if (!isObject(current)) {
                continue;
            }
            if (isRegistry(current)) {
                current.register(this, context);
            }
            else if (isClass(current)) {
                Registration.singleton(current, current).register(this);
            }
            else {
                keys = Object.keys(current);
                j = 0;
                jj = keys.length;
                for (; j < jj; ++j) {
                    value = current[keys[j]];
                    if (!isObject(value)) {
                        continue;
                    }
                    // note: we could remove this if-branch and call this.register directly
                    // - the extra check is just a perf tweak to create fewer unnecessary arrays by the spread operator
                    if (isRegistry(value)) {
                        value.register(this, context);
                    }
                    else {
                        this.register(value);
                    }
                }
            }
        }
        --this.registerDepth;
        return this;
    }
    registerResolver(key, resolver) {
        validateKey(key);
        const resolvers = this.resolvers;
        const result = resolvers.get(key);
        if (result == null) {
            resolvers.set(key, resolver);
        }
        else if (result instanceof ResolverImpl &&
            result.strategy === 4 /* array */) {
            result.state.push(resolver);
        }
        else {
            resolvers.set(key, new ResolverImpl(key, 4 /* array */, [result, resolver]));
        }
        return resolver;
    }
    registerTransformer(key, transformer) {
        const resolver = this.getResolver(key);
        if (resolver == null) {
            return false;
        }
        if (resolver.getFactory) {
            const factory = resolver.getFactory(this);
            if (factory == null) {
                return false;
            }
            // This type cast is a bit of a hacky one, necessary due to the duplicity of IResolverLike.
            // Problem is that that interface's type arg can be of type Key, but the getFactory method only works on
            // type Constructable. So the return type of that optional method has this additional constraint, which
            // seems to confuse the type checker.
            factory.registerTransformer(transformer);
            return true;
        }
        return false;
    }
    getResolver(key, autoRegister = true) {
        validateKey(key);
        if (key.resolve !== void 0) {
            return key;
        }
        /* eslint-disable-next-line @typescript-eslint/no-this-alias */
        let current = this;
        let resolver;
        while (current != null) {
            resolver = current.resolvers.get(key);
            if (resolver == null) {
                if (current.parent == null) {
                    const handler = isRegisterInRequester(key)
                        ? this
                        : current;
                    return autoRegister ? this.jitRegister(key, handler) : null;
                }
                current = current.parent;
            }
            else {
                return resolver;
            }
        }
        return null;
    }
    has(key, searchAncestors = false) {
        return this.resolvers.has(key)
            ? true
            : searchAncestors && this.parent != null
                ? this.parent.has(key, true)
                : false;
    }
    get(key) {
        validateKey(key);
        if (key.$isResolver) {
            return key.resolve(this, this);
        }
        /* eslint-disable-next-line @typescript-eslint/no-this-alias */
        let current = this;
        let resolver;
        while (current != null) {
            resolver = current.resolvers.get(key);
            if (resolver == null) {
                if (current.parent == null) {
                    const handler = isRegisterInRequester(key)
                        ? this
                        : current;
                    resolver = this.jitRegister(key, handler);
                    return resolver.resolve(current, this);
                }
                current = current.parent;
            }
            else {
                return resolver.resolve(current, this);
            }
        }
        throw new Error(`Unable to resolve key: ${String(key)}`);
    }
    getAll(key, searchAncestors = false) {
        validateKey(key);
        /* eslint-disable-next-line @typescript-eslint/no-this-alias */
        const requestor = this;
        let current = requestor;
        let resolver;
        if (searchAncestors) {
            let resolutions = _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_1__.emptyArray;
            while (current != null) {
                resolver = current.resolvers.get(key);
                if (resolver != null) {
                    resolutions = resolutions.concat(
                    /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
                    buildAllResponse(resolver, current, requestor));
                }
                current = current.parent;
            }
            return resolutions;
        }
        else {
            while (current != null) {
                resolver = current.resolvers.get(key);
                if (resolver == null) {
                    current = current.parent;
                    if (current == null) {
                        return _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_1__.emptyArray;
                    }
                }
                else {
                    return buildAllResponse(resolver, current, requestor);
                }
            }
        }
        return _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_1__.emptyArray;
    }
    getFactory(Type) {
        let factory = factories.get(Type);
        if (factory === void 0) {
            if (isNativeFunction(Type)) {
                throw new Error(`${Type.name} is a native function and therefore cannot be safely constructed by DI. If this is intentional, please use a callback or cachedCallback resolver.`);
            }
            factories.set(Type, (factory = new FactoryImpl(Type, DI.getDependencies(Type))));
        }
        return factory;
    }
    registerFactory(key, factory) {
        factories.set(key, factory);
    }
    createChild(config) {
        return new ContainerImpl(null, Object.assign({}, this.config, config, { parentLocator: () => this }));
    }
    jitRegister(keyAsValue, handler) {
        if (typeof keyAsValue !== "function") {
            throw new Error(`Attempted to jitRegister something that is not a constructor: '${keyAsValue}'. Did you forget to register this dependency?`);
        }
        if (InstrinsicTypeNames.has(keyAsValue.name)) {
            throw new Error(`Attempted to jitRegister an intrinsic type: ${keyAsValue.name}. Did you forget to add @inject(Key)`);
        }
        if (isRegistry(keyAsValue)) {
            const registrationResolver = keyAsValue.register(handler);
            if (!(registrationResolver instanceof Object) ||
                registrationResolver.resolve == null) {
                const newResolver = handler.resolvers.get(keyAsValue);
                if (newResolver != void 0) {
                    return newResolver;
                }
                throw new Error("A valid resolver was not returned from the static register method");
            }
            return registrationResolver;
        }
        else if (keyAsValue.$isInterface) {
            throw new Error(`Attempted to jitRegister an interface: ${keyAsValue.friendlyName}`);
        }
        else {
            const resolver = this.config.defaultResolver(keyAsValue, handler);
            handler.resolvers.set(keyAsValue, resolver);
            return resolver;
        }
    }
}
const cache = new WeakMap();
function cacheCallbackResult(fun) {
    return function (handler, requestor, resolver) {
        if (cache.has(resolver)) {
            return cache.get(resolver);
        }
        const t = fun(handler, requestor, resolver);
        cache.set(resolver, t);
        return t;
    };
}
/**
 * You can use the resulting Registration of any of the factory methods
 * to register with the container.
 *
 * @example
 * ```
 * class Foo {}
 * const container = DI.createContainer();
 * container.register(Registration.instance(Foo, new Foo()));
 * container.get(Foo);
 * ```
 *
 * @public
 */
const Registration = Object.freeze({
    /**
     * Allows you to pass an instance.
     * Every time you request this {@link Key} you will get this instance back.
     *
     * @example
     * ```
     * Registration.instance(Foo, new Foo()));
     * ```
     *
     * @param key - The key to register the instance under.
     * @param value - The instance to return when the key is requested.
     */
    instance(key, value) {
        return new ResolverImpl(key, 0 /* instance */, value);
    },
    /**
     * Creates an instance from the class.
     * Every time you request this {@link Key} you will get the same one back.
     *
     * @example
     * ```
     * Registration.singleton(Foo, Foo);
     * ```
     *
     * @param key - The key to register the singleton under.
     * @param value - The class to instantiate as a singleton when first requested.
     */
    singleton(key, value) {
        return new ResolverImpl(key, 1 /* singleton */, value);
    },
    /**
     * Creates an instance from a class.
     * Every time you request this {@link Key} you will get a new instance.
     *
     * @example
     * ```
     * Registration.instance(Foo, Foo);
     * ```
     *
     * @param key - The key to register the instance type under.
     * @param value - The class to instantiate each time the key is requested.
     */
    transient(key, value) {
        return new ResolverImpl(key, 2 /* transient */, value);
    },
    /**
     * Delegates to a callback function to provide the dependency.
     * Every time you request this {@link Key} the callback will be invoked to provide
     * the dependency.
     *
     * @example
     * ```
     * Registration.callback(Foo, () => new Foo());
     * Registration.callback(Bar, (c: Container) => new Bar(c.get(Foo)));
     * ```
     *
     * @param key - The key to register the callback for.
     * @param callback - The function that is expected to return the dependency.
     */
    callback(key, callback) {
        return new ResolverImpl(key, 3 /* callback */, callback);
    },
    /**
     * Delegates to a callback function to provide the dependency and then caches the
     * dependency for future requests.
     *
     * @example
     * ```
     * Registration.cachedCallback(Foo, () => new Foo());
     * Registration.cachedCallback(Bar, (c: Container) => new Bar(c.get(Foo)));
     * ```
     *
     * @param key - The key to register the callback for.
     * @param callback - The function that is expected to return the dependency.
     * @remarks
     * If you pass the same Registration to another container, the same cached value will be used.
     * Should all references to the resolver returned be removed, the cache will expire.
     */
    cachedCallback(key, callback) {
        return new ResolverImpl(key, 3 /* callback */, cacheCallbackResult(callback));
    },
    /**
     * Creates an alternate {@link Key} to retrieve an instance by.
     *
     * @example
     * ```
     * Register.singleton(Foo, Foo)
     * Register.aliasTo(Foo, MyFoos);
     *
     * container.getAll(MyFoos) // contains an instance of Foo
     * ```
     *
     * @param originalKey - The original key that has been registered.
     * @param aliasKey - The alias to the original key.
     */
    aliasTo(originalKey, aliasKey) {
        return new ResolverImpl(aliasKey, 5 /* alias */, originalKey);
    },
});
/** @internal */
function validateKey(key) {
    if (key === null || key === void 0) {
        throw new Error("key/value cannot be null or undefined. Are you trying to inject/register something that doesn't exist with DI?");
    }
}
function buildAllResponse(resolver, handler, requestor) {
    if (resolver instanceof ResolverImpl &&
        resolver.strategy === 4 /* array */) {
        const state = resolver.state;
        let i = state.length;
        const results = new Array(i);
        while (i--) {
            results[i] = state[i].resolve(handler, requestor);
        }
        return results;
    }
    return [resolver.resolve(handler, requestor)];
}
const defaultFriendlyName = "(anonymous)";
function isObject(value) {
    return (typeof value === "object" && value !== null) || typeof value === "function";
}
/**
 * Determine whether the value is a native function.
 *
 * @param fn - The function to check.
 * @returns `true` is the function is a native function, otherwise `false`
 */
const isNativeFunction = (function () {
    const lookup = new WeakMap();
    let isNative = false;
    let sourceText = "";
    let i = 0;
    return function (fn) {
        isNative = lookup.get(fn);
        if (isNative === void 0) {
            sourceText = fn.toString();
            i = sourceText.length;
            // http://www.ecma-international.org/ecma-262/#prod-NativeFunction
            isNative =
                // 29 is the length of 'function () { [native code] }' which is the smallest length of a native function string
                i >= 29 &&
                    // 100 seems to be a safe upper bound of the max length of a native function. In Chrome and FF it's 56, in Edge it's 61.
                    i <= 100 &&
                    // This whole heuristic *could* be tricked by a comment. Do we need to care about that?
                    sourceText.charCodeAt(i - 1) === 0x7d && // }
                    // TODO: the spec is a little vague about the precise constraints, so we do need to test this across various browsers to make sure just one whitespace is a safe assumption.
                    sourceText.charCodeAt(i - 2) <= 0x20 && // whitespace
                    sourceText.charCodeAt(i - 3) === 0x5d && // ]
                    sourceText.charCodeAt(i - 4) === 0x65 && // e
                    sourceText.charCodeAt(i - 5) === 0x64 && // d
                    sourceText.charCodeAt(i - 6) === 0x6f && // o
                    sourceText.charCodeAt(i - 7) === 0x63 && // c
                    sourceText.charCodeAt(i - 8) === 0x20 && //
                    sourceText.charCodeAt(i - 9) === 0x65 && // e
                    sourceText.charCodeAt(i - 10) === 0x76 && // v
                    sourceText.charCodeAt(i - 11) === 0x69 && // i
                    sourceText.charCodeAt(i - 12) === 0x74 && // t
                    sourceText.charCodeAt(i - 13) === 0x61 && // a
                    sourceText.charCodeAt(i - 14) === 0x6e && // n
                    sourceText.charCodeAt(i - 15) === 0x58; // [
            lookup.set(fn, isNative);
        }
        return isNative;
    };
})();
const isNumericLookup = {};
function isArrayIndex(value) {
    switch (typeof value) {
        case "number":
            return value >= 0 && (value | 0) === value;
        case "string": {
            const result = isNumericLookup[value];
            if (result !== void 0) {
                return result;
            }
            const length = value.length;
            if (length === 0) {
                return (isNumericLookup[value] = false);
            }
            let ch = 0;
            for (let i = 0; i < length; ++i) {
                ch = value.charCodeAt(i);
                if ((i === 0 && ch === 0x30 && length > 1) /* must not start with 0 */ ||
                    ch < 0x30 /* 0 */ ||
                    ch > 0x39 /* 9 */) {
                    return (isNumericLookup[value] = false);
                }
            }
            return (isNumericLookup[value] = true);
        }
        default:
            return false;
    }
}


/***/ }),

/***/ "./node_modules/@microsoft/fast-foundation/dist/esm/form-associated/form-associated.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/@microsoft/fast-foundation/dist/esm/form-associated/form-associated.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CheckableFormAssociated: () => (/* binding */ CheckableFormAssociated),
/* harmony export */   FormAssociated: () => (/* binding */ FormAssociated),
/* harmony export */   supportsElementInternals: () => (/* binding */ supportsElementInternals)
/* harmony export */ });
/* harmony import */ var _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/fast-element */ "./node_modules/@microsoft/fast-element/dist/esm/platform.js");
/* harmony import */ var _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/fast-element */ "./node_modules/@microsoft/fast-element/dist/esm/dom.js");
/* harmony import */ var _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/fast-element */ "./node_modules/@microsoft/fast-element/dist/esm/components/attributes.js");
/* harmony import */ var _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @microsoft/fast-element */ "./node_modules/@microsoft/fast-element/dist/esm/observation/observable.js");
/* harmony import */ var _microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/fast-web-utilities */ "./node_modules/@microsoft/fast-web-utilities/dist/key-codes.js");


const proxySlotName = "form-associated-proxy";
const ElementInternalsKey = "ElementInternals";
/**
 * @alpha
 */
const supportsElementInternals = ElementInternalsKey in window &&
    "setFormValue" in window[ElementInternalsKey].prototype;
const InternalsMap = new WeakMap();
/**
 * Base function for providing Custom Element Form Association.
 *
 * @alpha
 */
function FormAssociated(BaseCtor) {
    const C = class extends BaseCtor {
        constructor(...args) {
            super(...args);
            /**
             * Track whether the value has been changed from the initial value
             */
            this.dirtyValue = false;
            /**
             * Sets the element's disabled state. A disabled element will not be included during form submission.
             *
             * @remarks
             * HTML Attribute: disabled
             */
            this.disabled = false;
            /**
             * These are events that are still fired by the proxy
             * element based on user / programmatic interaction.
             *
             * The proxy implementation should be transparent to
             * the app author, so block these events from emitting.
             */
            this.proxyEventsToBlock = ["change", "click"];
            this.proxyInitialized = false;
            this.required = false;
            this.initialValue = this.initialValue || "";
            if (!this.elementInternals) {
                // When elementInternals is not supported, formResetCallback is
                // bound to an event listener, so ensure the handler's `this`
                // context is correct.
                this.formResetCallback = this.formResetCallback.bind(this);
            }
        }
        /**
         * Must evaluate to true to enable elementInternals.
         * Feature detects API support and resolve respectively
         *
         * @internal
         */
        static get formAssociated() {
            return supportsElementInternals;
        }
        /**
         * Returns the validity state of the element
         *
         * @alpha
         */
        get validity() {
            return this.elementInternals
                ? this.elementInternals.validity
                : this.proxy.validity;
        }
        /**
         * Retrieve a reference to the associated form.
         * Returns null if not associated to any form.
         *
         * @alpha
         */
        get form() {
            return this.elementInternals ? this.elementInternals.form : this.proxy.form;
        }
        /**
         * Retrieve the localized validation message,
         * or custom validation message if set.
         *
         * @alpha
         */
        get validationMessage() {
            return this.elementInternals
                ? this.elementInternals.validationMessage
                : this.proxy.validationMessage;
        }
        /**
         * Whether the element will be validated when the
         * form is submitted
         */
        get willValidate() {
            return this.elementInternals
                ? this.elementInternals.willValidate
                : this.proxy.willValidate;
        }
        /**
         * A reference to all associated label elements
         */
        get labels() {
            if (this.elementInternals) {
                return Object.freeze(Array.from(this.elementInternals.labels));
            }
            else if (this.proxy instanceof HTMLElement &&
                this.proxy.ownerDocument &&
                this.id) {
                // Labels associated by wrapping the element: <label><custom-element></custom-element></label>
                const parentLabels = this.proxy.labels;
                // Labels associated using the `for` attribute
                const forLabels = Array.from(this.proxy.getRootNode().querySelectorAll(`[for='${this.id}']`));
                const labels = parentLabels
                    ? forLabels.concat(Array.from(parentLabels))
                    : forLabels;
                return Object.freeze(labels);
            }
            else {
                return _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_0__.emptyArray;
            }
        }
        /**
         * Invoked when the `value` property changes
         * @param previous - the previous value
         * @param next - the new value
         *
         * @remarks
         * If elements extending `FormAssociated` implement a `valueChanged` method
         * They must be sure to invoke `super.valueChanged(previous, next)` to ensure
         * proper functioning of `FormAssociated`
         */
        valueChanged(previous, next) {
            this.dirtyValue = true;
            if (this.proxy instanceof HTMLElement) {
                this.proxy.value = this.value;
            }
            this.currentValue = this.value;
            this.setFormValue(this.value);
            this.validate();
        }
        currentValueChanged() {
            this.value = this.currentValue;
        }
        /**
         * Invoked when the `initialValue` property changes
         *
         * @param previous - the previous value
         * @param next - the new value
         *
         * @remarks
         * If elements extending `FormAssociated` implement a `initialValueChanged` method
         * They must be sure to invoke `super.initialValueChanged(previous, next)` to ensure
         * proper functioning of `FormAssociated`
         */
        initialValueChanged(previous, next) {
            // If the value is clean and the component is connected to the DOM
            // then set value equal to the attribute value.
            if (!this.dirtyValue) {
                this.value = this.initialValue;
                this.dirtyValue = false;
            }
        }
        /**
         * Invoked when the `disabled` property changes
         *
         * @param previous - the previous value
         * @param next - the new value
         *
         * @remarks
         * If elements extending `FormAssociated` implement a `disabledChanged` method
         * They must be sure to invoke `super.disabledChanged(previous, next)` to ensure
         * proper functioning of `FormAssociated`
         */
        disabledChanged(previous, next) {
            if (this.proxy instanceof HTMLElement) {
                this.proxy.disabled = this.disabled;
            }
            _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_1__.DOM.queueUpdate(() => this.classList.toggle("disabled", this.disabled));
        }
        /**
         * Invoked when the `name` property changes
         *
         * @param previous - the previous value
         * @param next - the new value
         *
         * @remarks
         * If elements extending `FormAssociated` implement a `nameChanged` method
         * They must be sure to invoke `super.nameChanged(previous, next)` to ensure
         * proper functioning of `FormAssociated`
         */
        nameChanged(previous, next) {
            if (this.proxy instanceof HTMLElement) {
                this.proxy.name = this.name;
            }
        }
        /**
         * Invoked when the `required` property changes
         *
         * @param previous - the previous value
         * @param next - the new value
         *
         * @remarks
         * If elements extending `FormAssociated` implement a `requiredChanged` method
         * They must be sure to invoke `super.requiredChanged(previous, next)` to ensure
         * proper functioning of `FormAssociated`
         */
        requiredChanged(prev, next) {
            if (this.proxy instanceof HTMLElement) {
                this.proxy.required = this.required;
            }
            _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_1__.DOM.queueUpdate(() => this.classList.toggle("required", this.required));
            this.validate();
        }
        /**
         * The element internals object. Will only exist
         * in browsers supporting the attachInternals API
         */
        get elementInternals() {
            if (!supportsElementInternals) {
                return null;
            }
            let internals = InternalsMap.get(this);
            if (!internals) {
                internals = this.attachInternals();
                InternalsMap.set(this, internals);
            }
            return internals;
        }
        /**
         * @internal
         */
        connectedCallback() {
            super.connectedCallback();
            this.addEventListener("keypress", this._keypressHandler);
            if (!this.value) {
                this.value = this.initialValue;
                this.dirtyValue = false;
            }
            if (!this.elementInternals) {
                this.attachProxy();
                if (this.form) {
                    this.form.addEventListener("reset", this.formResetCallback);
                }
            }
        }
        /**
         * @internal
         */
        disconnectedCallback() {
            super.disconnectedCallback();
            this.proxyEventsToBlock.forEach(name => this.proxy.removeEventListener(name, this.stopPropagation));
            if (!this.elementInternals && this.form) {
                this.form.removeEventListener("reset", this.formResetCallback);
            }
        }
        /**
         * Return the current validity of the element.
         */
        checkValidity() {
            return this.elementInternals
                ? this.elementInternals.checkValidity()
                : this.proxy.checkValidity();
        }
        /**
         * Return the current validity of the element.
         * If false, fires an invalid event at the element.
         */
        reportValidity() {
            return this.elementInternals
                ? this.elementInternals.reportValidity()
                : this.proxy.reportValidity();
        }
        /**
         * Set the validity of the control. In cases when the elementInternals object is not
         * available (and the proxy element is used to report validity), this function will
         * do nothing unless a message is provided, at which point the setCustomValidity method
         * of the proxy element will be invoked with the provided message.
         * @param flags - Validity flags
         * @param message - Optional message to supply
         * @param anchor - Optional element used by UA to display an interactive validation UI
         */
        setValidity(flags, message, anchor) {
            if (this.elementInternals) {
                this.elementInternals.setValidity(flags, message, anchor);
            }
            else if (typeof message === "string") {
                this.proxy.setCustomValidity(message);
            }
        }
        /**
         * Invoked when a connected component's form or fieldset has its disabled
         * state changed.
         * @param disabled - the disabled value of the form / fieldset
         */
        formDisabledCallback(disabled) {
            this.disabled = disabled;
        }
        formResetCallback() {
            this.value = this.initialValue;
            this.dirtyValue = false;
        }
        /**
         * Attach the proxy element to the DOM
         */
        attachProxy() {
            var _a;
            if (!this.proxyInitialized) {
                this.proxyInitialized = true;
                this.proxy.style.display = "none";
                this.proxyEventsToBlock.forEach(name => this.proxy.addEventListener(name, this.stopPropagation));
                // These are typically mapped to the proxy during
                // property change callbacks, but during initialization
                // on the initial call of the callback, the proxy is
                // still undefined. We should find a better way to address this.
                this.proxy.disabled = this.disabled;
                this.proxy.required = this.required;
                if (typeof this.name === "string") {
                    this.proxy.name = this.name;
                }
                if (typeof this.value === "string") {
                    this.proxy.value = this.value;
                }
                this.proxy.setAttribute("slot", proxySlotName);
                this.proxySlot = document.createElement("slot");
                this.proxySlot.setAttribute("name", proxySlotName);
            }
            (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.appendChild(this.proxySlot);
            this.appendChild(this.proxy);
        }
        /**
         * Detach the proxy element from the DOM
         */
        detachProxy() {
            var _a;
            this.removeChild(this.proxy);
            (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.removeChild(this.proxySlot);
        }
        /** {@inheritDoc (FormAssociated:interface).validate} */
        validate(anchor) {
            if (this.proxy instanceof HTMLElement) {
                this.setValidity(this.proxy.validity, this.proxy.validationMessage, anchor);
            }
        }
        /**
         * Associates the provided value (and optional state) with the parent form.
         * @param value - The value to set
         * @param state - The state object provided to during session restores and when autofilling.
         */
        setFormValue(value, state) {
            if (this.elementInternals) {
                this.elementInternals.setFormValue(value, state || value);
            }
        }
        _keypressHandler(e) {
            switch (e.key) {
                case _microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_2__.keyEnter:
                    if (this.form instanceof HTMLFormElement) {
                        // Implicit submission
                        const defaultButton = this.form.querySelector("[type=submit]");
                        defaultButton === null || defaultButton === void 0 ? void 0 : defaultButton.click();
                    }
                    break;
            }
        }
        /**
         * Used to stop propagation of proxy element events
         * @param e - Event object
         */
        stopPropagation(e) {
            e.stopPropagation();
        }
    };
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_3__.attr)({ mode: "boolean" })(C.prototype, "disabled");
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_3__.attr)({ mode: "fromView", attribute: "value" })(C.prototype, "initialValue");
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_3__.attr)({ attribute: "current-value" })(C.prototype, "currentValue");
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_3__.attr)(C.prototype, "name");
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_3__.attr)({ mode: "boolean" })(C.prototype, "required");
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_4__.observable)(C.prototype, "value");
    return C;
}
/**
 * @alpha
 */
function CheckableFormAssociated(BaseCtor) {
    class C extends FormAssociated(BaseCtor) {
    }
    class D extends C {
        constructor(...args) {
            super(args);
            /**
             * Tracks whether the "checked" property has been changed.
             * This is necessary to provide consistent behavior with
             * normal input checkboxes
             */
            this.dirtyChecked = false;
            /**
             * Provides the default checkedness of the input element
             * Passed down to proxy
             *
             * @public
             * @remarks
             * HTML Attribute: checked
             */
            this.checkedAttribute = false;
            /**
             * The checked state of the control.
             *
             * @public
             */
            this.checked = false;
            // Re-initialize dirtyChecked because initialization of other values
            // causes it to become true
            this.dirtyChecked = false;
        }
        checkedAttributeChanged() {
            this.defaultChecked = this.checkedAttribute;
        }
        /**
         * @internal
         */
        defaultCheckedChanged() {
            if (!this.dirtyChecked) {
                // Setting this.checked will cause us to enter a dirty state,
                // but if we are clean when defaultChecked is changed, we want to stay
                // in a clean state, so reset this.dirtyChecked
                this.checked = this.defaultChecked;
                this.dirtyChecked = false;
            }
        }
        checkedChanged(prev, next) {
            if (!this.dirtyChecked) {
                this.dirtyChecked = true;
            }
            this.currentChecked = this.checked;
            this.updateForm();
            if (this.proxy instanceof HTMLInputElement) {
                this.proxy.checked = this.checked;
            }
            if (prev !== undefined) {
                this.$emit("change");
            }
            this.validate();
        }
        currentCheckedChanged(prev, next) {
            this.checked = this.currentChecked;
        }
        updateForm() {
            const value = this.checked ? this.value : null;
            this.setFormValue(value, value);
        }
        connectedCallback() {
            super.connectedCallback();
            this.updateForm();
        }
        formResetCallback() {
            super.formResetCallback();
            this.checked = !!this.checkedAttribute;
            this.dirtyChecked = false;
        }
    }
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_3__.attr)({ attribute: "checked", mode: "boolean" })(D.prototype, "checkedAttribute");
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_3__.attr)({ attribute: "current-checked", converter: _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_3__.booleanConverter })(D.prototype, "currentChecked");
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_4__.observable)(D.prototype, "defaultChecked");
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_4__.observable)(D.prototype, "checked");
    return D;
}


/***/ }),

/***/ "./node_modules/@microsoft/fast-foundation/dist/esm/foundation-element/foundation-element.js":
/*!***************************************************************************************************!*\
  !*** ./node_modules/@microsoft/fast-foundation/dist/esm/foundation-element/foundation-element.js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FoundationElement: () => (/* binding */ FoundationElement),
/* harmony export */   FoundationElementRegistry: () => (/* binding */ FoundationElementRegistry)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ "./node_modules/@microsoft/fast-foundation/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/fast-element */ "./node_modules/@microsoft/fast-element/dist/esm/components/fast-element.js");
/* harmony import */ var _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/fast-element */ "./node_modules/@microsoft/fast-element/dist/esm/observation/observable.js");
/* harmony import */ var _design_system_component_presentation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../design-system/component-presentation.js */ "./node_modules/@microsoft/fast-foundation/dist/esm/design-system/component-presentation.js");



/**
 * Defines a foundation element class that:
 * 1. Connects the element to its ComponentPresentation
 * 2. Allows resolving the element template from the instance or ComponentPresentation
 * 3. Allows resolving the element styles from the instance or ComponentPresentation
 *
 * @public
 */
class FoundationElement extends _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_0__.FASTElement {
    constructor() {
        super(...arguments);
        this._presentation = void 0;
    }
    /**
     * A property which resolves the ComponentPresentation instance
     * for the current component.
     * @public
     */
    get $presentation() {
        if (this._presentation === void 0) {
            this._presentation = _design_system_component_presentation_js__WEBPACK_IMPORTED_MODULE_1__.ComponentPresentation.forTag(this.tagName, this);
        }
        return this._presentation;
    }
    templateChanged() {
        if (this.template !== undefined) {
            this.$fastController.template = this.template;
        }
    }
    stylesChanged() {
        if (this.styles !== undefined) {
            this.$fastController.styles = this.styles;
        }
    }
    /**
     * The connected callback for this FASTElement.
     * @remarks
     * This method is invoked by the platform whenever this FoundationElement
     * becomes connected to the document.
     * @public
     */
    connectedCallback() {
        if (this.$presentation !== null) {
            this.$presentation.applyTo(this);
        }
        super.connectedCallback();
    }
    /**
     * Defines an element registry function with a set of element definition defaults.
     * @param elementDefinition - The definition of the element to create the registry
     * function for.
     * @public
     */
    static compose(elementDefinition) {
        return (overrideDefinition = {}) => new FoundationElementRegistry(this === FoundationElement
            ? class extends FoundationElement {
            }
            : this, elementDefinition, overrideDefinition);
    }
}
(0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_3__.observable
], FoundationElement.prototype, "template", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_3__.observable
], FoundationElement.prototype, "styles", void 0);
function resolveOption(option, context, definition) {
    if (typeof option === "function") {
        return option(context, definition);
    }
    return option;
}
/**
 * Registry capable of defining presentation properties for a DOM Container hierarchy.
 *
 * @internal
 */
/* eslint-disable @typescript-eslint/no-unused-vars */
class FoundationElementRegistry {
    constructor(type, elementDefinition, overrideDefinition) {
        this.type = type;
        this.elementDefinition = elementDefinition;
        this.overrideDefinition = overrideDefinition;
        this.definition = Object.assign(Object.assign({}, this.elementDefinition), this.overrideDefinition);
    }
    register(container, context) {
        const definition = this.definition;
        const overrideDefinition = this.overrideDefinition;
        const prefix = definition.prefix || context.elementPrefix;
        const name = `${prefix}-${definition.baseName}`;
        context.tryDefineElement({
            name,
            type: this.type,
            baseClass: this.elementDefinition.baseClass,
            callback: x => {
                const presentation = new _design_system_component_presentation_js__WEBPACK_IMPORTED_MODULE_1__.DefaultComponentPresentation(resolveOption(definition.template, x, definition), resolveOption(definition.styles, x, definition));
                x.definePresentation(presentation);
                let shadowOptions = resolveOption(definition.shadowOptions, x, definition);
                if (x.shadowRootMode) {
                    // If the design system has overridden the shadow root mode, we need special handling.
                    if (shadowOptions) {
                        // If there are shadow options present in the definition, then
                        // either the component itself has specified an option or the
                        // registry function has overridden it.
                        if (!overrideDefinition.shadowOptions) {
                            // There were shadow options provided by the component and not overridden by
                            // the registry.
                            shadowOptions.mode = x.shadowRootMode;
                        }
                    }
                    else if (shadowOptions !== null) {
                        // If the component author did not provide shadow options,
                        // and did not null them out (light dom opt-in) then they
                        // were relying on the FASTElement default. So, if the
                        // design system provides a mode, we need to create the options
                        // to override the default.
                        shadowOptions = { mode: x.shadowRootMode };
                    }
                }
                x.defineElement({
                    elementOptions: resolveOption(definition.elementOptions, x, definition),
                    shadowOptions,
                    attributes: resolveOption(definition.attributes, x, definition),
                });
            },
        });
    }
}
/* eslint-enable @typescript-eslint/no-unused-vars */


/***/ }),

/***/ "./node_modules/@microsoft/fast-foundation/dist/esm/patterns/aria-global.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/@microsoft/fast-foundation/dist/esm/patterns/aria-global.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ARIAGlobalStatesAndProperties: () => (/* binding */ ARIAGlobalStatesAndProperties)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/@microsoft/fast-foundation/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/fast-element */ "./node_modules/@microsoft/fast-element/dist/esm/components/attributes.js");


/**
 * Some states and properties are applicable to all host language elements regardless of whether a role is applied.
 * The following global states and properties are supported by all roles and by all base markup elements.
 * {@link https://www.w3.org/TR/wai-aria-1.1/#global_states}
 *
 * This is intended to be used as a mixin. Be sure you extend FASTElement.
 *
 * @public
 */
class ARIAGlobalStatesAndProperties {
}
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_1__.attr)({ attribute: "aria-atomic" })
], ARIAGlobalStatesAndProperties.prototype, "ariaAtomic", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_1__.attr)({ attribute: "aria-busy" })
], ARIAGlobalStatesAndProperties.prototype, "ariaBusy", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_1__.attr)({ attribute: "aria-controls" })
], ARIAGlobalStatesAndProperties.prototype, "ariaControls", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_1__.attr)({ attribute: "aria-current" })
], ARIAGlobalStatesAndProperties.prototype, "ariaCurrent", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_1__.attr)({ attribute: "aria-describedby" })
], ARIAGlobalStatesAndProperties.prototype, "ariaDescribedby", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_1__.attr)({ attribute: "aria-details" })
], ARIAGlobalStatesAndProperties.prototype, "ariaDetails", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_1__.attr)({ attribute: "aria-disabled" })
], ARIAGlobalStatesAndProperties.prototype, "ariaDisabled", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_1__.attr)({ attribute: "aria-errormessage" })
], ARIAGlobalStatesAndProperties.prototype, "ariaErrormessage", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_1__.attr)({ attribute: "aria-flowto" })
], ARIAGlobalStatesAndProperties.prototype, "ariaFlowto", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_1__.attr)({ attribute: "aria-haspopup" })
], ARIAGlobalStatesAndProperties.prototype, "ariaHaspopup", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_1__.attr)({ attribute: "aria-hidden" })
], ARIAGlobalStatesAndProperties.prototype, "ariaHidden", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_1__.attr)({ attribute: "aria-invalid" })
], ARIAGlobalStatesAndProperties.prototype, "ariaInvalid", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_1__.attr)({ attribute: "aria-keyshortcuts" })
], ARIAGlobalStatesAndProperties.prototype, "ariaKeyshortcuts", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_1__.attr)({ attribute: "aria-label" })
], ARIAGlobalStatesAndProperties.prototype, "ariaLabel", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_1__.attr)({ attribute: "aria-labelledby" })
], ARIAGlobalStatesAndProperties.prototype, "ariaLabelledby", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_1__.attr)({ attribute: "aria-live" })
], ARIAGlobalStatesAndProperties.prototype, "ariaLive", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_1__.attr)({ attribute: "aria-owns" })
], ARIAGlobalStatesAndProperties.prototype, "ariaOwns", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_1__.attr)({ attribute: "aria-relevant" })
], ARIAGlobalStatesAndProperties.prototype, "ariaRelevant", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_1__.attr)({ attribute: "aria-roledescription" })
], ARIAGlobalStatesAndProperties.prototype, "ariaRoledescription", void 0);


/***/ }),

/***/ "./node_modules/@microsoft/fast-foundation/dist/esm/patterns/start-end.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@microsoft/fast-foundation/dist/esm/patterns/start-end.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StartEnd: () => (/* binding */ StartEnd),
/* harmony export */   endSlotTemplate: () => (/* binding */ endSlotTemplate),
/* harmony export */   endTemplate: () => (/* binding */ endTemplate),
/* harmony export */   startSlotTemplate: () => (/* binding */ startSlotTemplate),
/* harmony export */   startTemplate: () => (/* binding */ startTemplate)
/* harmony export */ });
/* harmony import */ var _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/fast-element */ "./node_modules/@microsoft/fast-element/dist/esm/templating/template.js");
/* harmony import */ var _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/fast-element */ "./node_modules/@microsoft/fast-element/dist/esm/templating/ref.js");

/**
 * A mixin class implementing start and end elements.
 * These are generally used to decorate text elements with icons or other visual indicators.
 * @public
 */
class StartEnd {
    handleStartContentChange() {
        this.startContainer.classList.toggle("start", this.start.assignedNodes().length > 0);
    }
    handleEndContentChange() {
        this.endContainer.classList.toggle("end", this.end.assignedNodes().length > 0);
    }
}
/**
 * The template for the end element.
 * For use with {@link StartEnd}
 *
 * @public
 */
const endSlotTemplate = (context, definition) => (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_0__.html) `
    <span
        part="end"
        ${(0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_1__.ref)("endContainer")}
        class=${x => (definition.end ? "end" : void 0)}
    >
        <slot name="end" ${(0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_1__.ref)("end")} @slotchange="${x => x.handleEndContentChange()}">
            ${definition.end || ""}
        </slot>
    </span>
`;
/**
 * The template for the start element.
 * For use with {@link StartEnd}
 *
 * @public
 */
const startSlotTemplate = (context, definition) => (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_0__.html) `
    <span
        part="start"
        ${(0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_1__.ref)("startContainer")}
        class="${x => (definition.start ? "start" : void 0)}"
    >
        <slot
            name="start"
            ${(0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_1__.ref)("start")}
            @slotchange="${x => x.handleStartContentChange()}"
        >
            ${definition.start || ""}
        </slot>
    </span>
`;
/**
 * The template for the end element.
 * For use with {@link StartEnd}
 *
 * @public
 * @deprecated - use endSlotTemplate
 */
const endTemplate = (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_0__.html) `
    <span part="end" ${(0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_1__.ref)("endContainer")}>
        <slot
            name="end"
            ${(0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_1__.ref)("end")}
            @slotchange="${x => x.handleEndContentChange()}"
        ></slot>
    </span>
`;
/**
 * The template for the start element.
 * For use with {@link StartEnd}
 *
 * @public
 * @deprecated - use startSlotTemplate
 */
const startTemplate = (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_0__.html) `
    <span part="start" ${(0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_1__.ref)("startContainer")}>
        <slot
            name="start"
            ${(0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_1__.ref)("start")}
            @slotchange="${x => x.handleStartContentChange()}"
        ></slot>
    </span>
`;


/***/ }),

/***/ "./node_modules/@microsoft/fast-foundation/dist/esm/progress-ring/progress-ring.template.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/@microsoft/fast-foundation/dist/esm/progress-ring/progress-ring.template.js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   progressRingTemplate: () => (/* binding */ progressRingTemplate)
/* harmony export */ });
/* harmony import */ var _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/fast-element */ "./node_modules/@microsoft/fast-element/dist/esm/templating/template.js");
/* harmony import */ var _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/fast-element */ "./node_modules/@microsoft/fast-element/dist/esm/templating/when.js");

const progressSegments = 44;
/**
 * The template for the {@link @microsoft/fast-foundation#BaseProgress} component.
 * @public
 */
const progressRingTemplate = (context, definition) => (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_0__.html) `
    <template
        role="progressbar"
        aria-valuenow="${x => x.value}"
        aria-valuemin="${x => x.min}"
        aria-valuemax="${x => x.max}"
        class="${x => (x.paused ? "paused" : "")}"
    >
        ${(0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_1__.when)(x => typeof x.value === "number", (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_0__.html) `
                <svg
                    class="progress"
                    part="progress"
                    viewBox="0 0 16 16"
                    slot="determinate"
                >
                    <circle
                        class="background"
                        part="background"
                        cx="8px"
                        cy="8px"
                        r="7px"
                    ></circle>
                    <circle
                        class="determinate"
                        part="determinate"
                        style="stroke-dasharray: ${x => (progressSegments * x.percentComplete) /
    100}px ${progressSegments}px"
                        cx="8px"
                        cy="8px"
                        r="7px"
                    ></circle>
                </svg>
            `, (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_0__.html) `
                <slot name="indeterminate" slot="indeterminate">
                    ${definition.indeterminateIndicator || ""}
                </slot>
            `)}
    </template>
`;


/***/ }),

/***/ "./node_modules/@microsoft/fast-foundation/dist/esm/progress/base-progress.js":
/*!************************************************************************************!*\
  !*** ./node_modules/@microsoft/fast-foundation/dist/esm/progress/base-progress.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BaseProgress: () => (/* binding */ BaseProgress)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ "./node_modules/@microsoft/fast-foundation/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/fast-element */ "./node_modules/@microsoft/fast-element/dist/esm/components/attributes.js");
/* harmony import */ var _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/fast-element */ "./node_modules/@microsoft/fast-element/dist/esm/observation/observable.js");
/* harmony import */ var _foundation_element_foundation_element_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../foundation-element/foundation-element.js */ "./node_modules/@microsoft/fast-foundation/dist/esm/foundation-element/foundation-element.js");



/**
 * An Progress HTML Element.
 * Implements the {@link https://www.w3.org/TR/wai-aria-1.1/#progressbar | ARIA progressbar }.
 *
 * @slot indeterminate - The slot for a custom indeterminate indicator
 * @csspart progress - Represents the progress element
 * @csspart determinate - The determinate indicator
 * @csspart indeterminate - The indeterminate indicator
 *
 * @public
 */
class BaseProgress extends _foundation_element_foundation_element_js__WEBPACK_IMPORTED_MODULE_0__.FoundationElement {
    constructor() {
        super(...arguments);
        /**
         * Indicates progress in %
         * @internal
         */
        this.percentComplete = 0;
    }
    valueChanged() {
        if (this.$fastController.isConnected) {
            this.updatePercentComplete();
        }
    }
    minChanged() {
        if (this.$fastController.isConnected) {
            this.updatePercentComplete();
        }
    }
    maxChanged() {
        if (this.$fastController.isConnected) {
            this.updatePercentComplete();
        }
    }
    /**
     * @internal
     */
    connectedCallback() {
        super.connectedCallback();
        this.updatePercentComplete();
    }
    updatePercentComplete() {
        const min = typeof this.min === "number" ? this.min : 0;
        const max = typeof this.max === "number" ? this.max : 100;
        const value = typeof this.value === "number" ? this.value : 0;
        const range = max - min;
        this.percentComplete =
            range === 0 ? 0 : Math.fround(((value - min) / range) * 100);
    }
}
(0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_2__.attr)({ converter: _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_2__.nullableNumberConverter })
], BaseProgress.prototype, "value", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_2__.attr)({ converter: _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_2__.nullableNumberConverter })
], BaseProgress.prototype, "min", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_2__.attr)({ converter: _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_2__.nullableNumberConverter })
], BaseProgress.prototype, "max", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_2__.attr)({ mode: "boolean" })
], BaseProgress.prototype, "paused", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_3__.observable
], BaseProgress.prototype, "percentComplete", void 0);


/***/ }),

/***/ "./node_modules/@microsoft/fast-foundation/dist/esm/text-field/text-field.form-associated.js":
/*!***************************************************************************************************!*\
  !*** ./node_modules/@microsoft/fast-foundation/dist/esm/text-field/text-field.form-associated.js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FormAssociatedTextField: () => (/* binding */ FormAssociatedTextField)
/* harmony export */ });
/* harmony import */ var _form_associated_form_associated_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../form-associated/form-associated.js */ "./node_modules/@microsoft/fast-foundation/dist/esm/form-associated/form-associated.js");
/* harmony import */ var _foundation_element_foundation_element_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../foundation-element/foundation-element.js */ "./node_modules/@microsoft/fast-foundation/dist/esm/foundation-element/foundation-element.js");


class _TextField extends _foundation_element_foundation_element_js__WEBPACK_IMPORTED_MODULE_0__.FoundationElement {
}
/**
 * A form-associated base class for the {@link @microsoft/fast-foundation#(TextField:class)} component.
 *
 * @internal
 */
class FormAssociatedTextField extends (0,_form_associated_form_associated_js__WEBPACK_IMPORTED_MODULE_1__.FormAssociated)(_TextField) {
    constructor() {
        super(...arguments);
        this.proxy = document.createElement("input");
    }
}


/***/ }),

/***/ "./node_modules/@microsoft/fast-foundation/dist/esm/text-field/text-field.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@microsoft/fast-foundation/dist/esm/text-field/text-field.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DelegatesARIATextbox: () => (/* binding */ DelegatesARIATextbox),
/* harmony export */   TextField: () => (/* binding */ TextField),
/* harmony export */   TextFieldType: () => (/* reexport safe */ _text_field_options_js__WEBPACK_IMPORTED_MODULE_0__.TextFieldType)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ "./node_modules/@microsoft/fast-foundation/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/fast-element */ "./node_modules/@microsoft/fast-element/dist/esm/dom.js");
/* harmony import */ var _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @microsoft/fast-element */ "./node_modules/@microsoft/fast-element/dist/esm/components/attributes.js");
/* harmony import */ var _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @microsoft/fast-element */ "./node_modules/@microsoft/fast-element/dist/esm/observation/observable.js");
/* harmony import */ var _patterns_index_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../patterns/index.js */ "./node_modules/@microsoft/fast-foundation/dist/esm/patterns/aria-global.js");
/* harmony import */ var _patterns_index_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../patterns/index.js */ "./node_modules/@microsoft/fast-foundation/dist/esm/patterns/start-end.js");
/* harmony import */ var _utilities_apply_mixins_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utilities/apply-mixins.js */ "./node_modules/@microsoft/fast-foundation/dist/esm/utilities/apply-mixins.js");
/* harmony import */ var _text_field_form_associated_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./text-field.form-associated.js */ "./node_modules/@microsoft/fast-foundation/dist/esm/text-field/text-field.form-associated.js");
/* harmony import */ var _text_field_options_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./text-field.options.js */ "./node_modules/@microsoft/fast-foundation/dist/esm/text-field/text-field.options.js");







/**
 * A Text Field Custom HTML Element.
 * Based largely on the {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/text | <input type="text" /> element }.
 *
 * @slot start - Content which can be provided before the number field input
 * @slot end - Content which can be provided after the number field input
 * @slot - The default slot for the label
 * @csspart label - The label
 * @csspart root - The element wrapping the control, including start and end slots
 * @csspart control - The text field element
 * @fires change - Fires a custom 'change' event when the value has changed
 *
 * @public
 */
class TextField extends _text_field_form_associated_js__WEBPACK_IMPORTED_MODULE_1__.FormAssociatedTextField {
    constructor() {
        super(...arguments);
        /**
         * Allows setting a type or mode of text.
         * @public
         * @remarks
         * HTML Attribute: type
         */
        this.type = _text_field_options_js__WEBPACK_IMPORTED_MODULE_0__.TextFieldType.text;
    }
    readOnlyChanged() {
        if (this.proxy instanceof HTMLInputElement) {
            this.proxy.readOnly = this.readOnly;
            this.validate();
        }
    }
    autofocusChanged() {
        if (this.proxy instanceof HTMLInputElement) {
            this.proxy.autofocus = this.autofocus;
            this.validate();
        }
    }
    placeholderChanged() {
        if (this.proxy instanceof HTMLInputElement) {
            this.proxy.placeholder = this.placeholder;
        }
    }
    typeChanged() {
        if (this.proxy instanceof HTMLInputElement) {
            this.proxy.type = this.type;
            this.validate();
        }
    }
    listChanged() {
        if (this.proxy instanceof HTMLInputElement) {
            this.proxy.setAttribute("list", this.list);
            this.validate();
        }
    }
    maxlengthChanged() {
        if (this.proxy instanceof HTMLInputElement) {
            this.proxy.maxLength = this.maxlength;
            this.validate();
        }
    }
    minlengthChanged() {
        if (this.proxy instanceof HTMLInputElement) {
            this.proxy.minLength = this.minlength;
            this.validate();
        }
    }
    patternChanged() {
        if (this.proxy instanceof HTMLInputElement) {
            this.proxy.pattern = this.pattern;
            this.validate();
        }
    }
    sizeChanged() {
        if (this.proxy instanceof HTMLInputElement) {
            this.proxy.size = this.size;
        }
    }
    spellcheckChanged() {
        if (this.proxy instanceof HTMLInputElement) {
            this.proxy.spellcheck = this.spellcheck;
        }
    }
    /**
     * @internal
     */
    connectedCallback() {
        super.connectedCallback();
        this.proxy.setAttribute("type", this.type);
        this.validate();
        if (this.autofocus) {
            _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_2__.DOM.queueUpdate(() => {
                this.focus();
            });
        }
    }
    /**
     * Selects all the text in the text field
     *
     * @public
     */
    select() {
        this.control.select();
        /**
         * The select event does not permeate the shadow DOM boundary.
         * This fn effectively proxies the select event,
         * emitting a `select` event whenever the internal
         * control emits a `select` event
         */
        this.$emit("select");
    }
    /**
     * Handles the internal control's `input` event
     * @internal
     */
    handleTextInput() {
        this.value = this.control.value;
    }
    /**
     * Change event handler for inner control.
     * @remarks
     * "Change" events are not `composable` so they will not
     * permeate the shadow DOM boundary. This fn effectively proxies
     * the change event, emitting a `change` event whenever the internal
     * control emits a `change` event
     * @internal
     */
    handleChange() {
        this.$emit("change");
    }
    /** {@inheritDoc (FormAssociated:interface).validate} */
    validate() {
        super.validate(this.control);
    }
}
(0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_4__.attr)({ attribute: "readonly", mode: "boolean" })
], TextField.prototype, "readOnly", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_4__.attr)({ mode: "boolean" })
], TextField.prototype, "autofocus", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_4__.attr
], TextField.prototype, "placeholder", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_4__.attr
], TextField.prototype, "type", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_4__.attr
], TextField.prototype, "list", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_4__.attr)({ converter: _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_4__.nullableNumberConverter })
], TextField.prototype, "maxlength", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_4__.attr)({ converter: _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_4__.nullableNumberConverter })
], TextField.prototype, "minlength", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_4__.attr
], TextField.prototype, "pattern", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_4__.attr)({ converter: _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_4__.nullableNumberConverter })
], TextField.prototype, "size", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_4__.attr)({ mode: "boolean" })
], TextField.prototype, "spellcheck", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_5__.observable
], TextField.prototype, "defaultSlottedNodes", void 0);
/**
 * Includes ARIA states and properties relating to the ARIA textbox role
 *
 * @public
 */
class DelegatesARIATextbox {
}
(0,_utilities_apply_mixins_js__WEBPACK_IMPORTED_MODULE_6__.applyMixins)(DelegatesARIATextbox, _patterns_index_js__WEBPACK_IMPORTED_MODULE_7__.ARIAGlobalStatesAndProperties);
(0,_utilities_apply_mixins_js__WEBPACK_IMPORTED_MODULE_6__.applyMixins)(TextField, _patterns_index_js__WEBPACK_IMPORTED_MODULE_8__.StartEnd, DelegatesARIATextbox);


/***/ }),

/***/ "./node_modules/@microsoft/fast-foundation/dist/esm/text-field/text-field.options.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/@microsoft/fast-foundation/dist/esm/text-field/text-field.options.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TextFieldType: () => (/* binding */ TextFieldType)
/* harmony export */ });
/**
 * Text field sub-types
 * @public
 */
const TextFieldType = {
    /**
     * An email TextField
     */
    email: "email",
    /**
     * A password TextField
     */
    password: "password",
    /**
     * A telephone TextField
     */
    tel: "tel",
    /**
     * A text TextField
     */
    text: "text",
    /**
     * A URL TextField
     */
    url: "url",
};


/***/ }),

/***/ "./node_modules/@microsoft/fast-foundation/dist/esm/text-field/text-field.template.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/@microsoft/fast-foundation/dist/esm/text-field/text-field.template.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   textFieldTemplate: () => (/* binding */ textFieldTemplate)
/* harmony export */ });
/* harmony import */ var _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/fast-element */ "./node_modules/@microsoft/fast-element/dist/esm/templating/template.js");
/* harmony import */ var _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/fast-element */ "./node_modules/@microsoft/fast-element/dist/esm/templating/slotted.js");
/* harmony import */ var _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @microsoft/fast-element */ "./node_modules/@microsoft/fast-element/dist/esm/templating/ref.js");
/* harmony import */ var _patterns_start_end_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../patterns/start-end.js */ "./node_modules/@microsoft/fast-foundation/dist/esm/patterns/start-end.js");
/* harmony import */ var _utilities_whitespace_filter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utilities/whitespace-filter.js */ "./node_modules/@microsoft/fast-foundation/dist/esm/utilities/whitespace-filter.js");



/**
 * The template for the {@link @microsoft/fast-foundation#(TextField:class)} component.
 * @public
 */
const textFieldTemplate = (context, definition) => (0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_0__.html) `
    <template
        class="
            ${x => (x.readOnly ? "readonly" : "")}
        "
    >
        <label
            part="label"
            for="control"
            class="${x => x.defaultSlottedNodes && x.defaultSlottedNodes.length
    ? "label"
    : "label label__hidden"}"
        >
            <slot
                ${(0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_1__.slotted)({ property: "defaultSlottedNodes", filter: _utilities_whitespace_filter_js__WEBPACK_IMPORTED_MODULE_2__.whitespaceFilter })}
            ></slot>
        </label>
        <div class="root" part="root">
            ${(0,_patterns_start_end_js__WEBPACK_IMPORTED_MODULE_3__.startSlotTemplate)(context, definition)}
            <input
                class="control"
                part="control"
                id="control"
                @input="${x => x.handleTextInput()}"
                @change="${x => x.handleChange()}"
                ?autofocus="${x => x.autofocus}"
                ?disabled="${x => x.disabled}"
                list="${x => x.list}"
                maxlength="${x => x.maxlength}"
                minlength="${x => x.minlength}"
                pattern="${x => x.pattern}"
                placeholder="${x => x.placeholder}"
                ?readonly="${x => x.readOnly}"
                ?required="${x => x.required}"
                size="${x => x.size}"
                ?spellcheck="${x => x.spellcheck}"
                :value="${x => x.value}"
                type="${x => x.type}"
                aria-atomic="${x => x.ariaAtomic}"
                aria-busy="${x => x.ariaBusy}"
                aria-controls="${x => x.ariaControls}"
                aria-current="${x => x.ariaCurrent}"
                aria-describedby="${x => x.ariaDescribedby}"
                aria-details="${x => x.ariaDetails}"
                aria-disabled="${x => x.ariaDisabled}"
                aria-errormessage="${x => x.ariaErrormessage}"
                aria-flowto="${x => x.ariaFlowto}"
                aria-haspopup="${x => x.ariaHaspopup}"
                aria-hidden="${x => x.ariaHidden}"
                aria-invalid="${x => x.ariaInvalid}"
                aria-keyshortcuts="${x => x.ariaKeyshortcuts}"
                aria-label="${x => x.ariaLabel}"
                aria-labelledby="${x => x.ariaLabelledby}"
                aria-live="${x => x.ariaLive}"
                aria-owns="${x => x.ariaOwns}"
                aria-relevant="${x => x.ariaRelevant}"
                aria-roledescription="${x => x.ariaRoledescription}"
                ${(0,_microsoft_fast_element__WEBPACK_IMPORTED_MODULE_4__.ref)("control")}
            />
            ${(0,_patterns_start_end_js__WEBPACK_IMPORTED_MODULE_3__.endSlotTemplate)(context, definition)}
        </div>
    </template>
`;


/***/ }),

/***/ "./node_modules/@microsoft/fast-foundation/dist/esm/utilities/apply-mixins.js":
/*!************************************************************************************!*\
  !*** ./node_modules/@microsoft/fast-foundation/dist/esm/utilities/apply-mixins.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   applyMixins: () => (/* binding */ applyMixins)
/* harmony export */ });
/* harmony import */ var _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/fast-element */ "./node_modules/@microsoft/fast-element/dist/esm/components/attributes.js");

/**
 * Apply mixins to a constructor.
 * Sourced from {@link https://www.typescriptlang.org/docs/handbook/mixins.html | TypeScript Documentation }.
 * @public
 */
function applyMixins(derivedCtor, ...baseCtors) {
    const derivedAttributes = _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_0__.AttributeConfiguration.locate(derivedCtor);
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            if (name !== "constructor") {
                Object.defineProperty(derivedCtor.prototype, name, 
                /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
                Object.getOwnPropertyDescriptor(baseCtor.prototype, name));
            }
        });
        const baseAttributes = _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_0__.AttributeConfiguration.locate(baseCtor);
        baseAttributes.forEach(x => derivedAttributes.push(x));
    });
}


/***/ }),

/***/ "./node_modules/@microsoft/fast-foundation/dist/esm/utilities/composed-contains.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/@microsoft/fast-foundation/dist/esm/utilities/composed-contains.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   composedContains: () => (/* binding */ composedContains)
/* harmony export */ });
/* harmony import */ var _composed_parent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./composed-parent.js */ "./node_modules/@microsoft/fast-foundation/dist/esm/utilities/composed-parent.js");

/**
 * Determines if the reference element contains the test element in a "composed" DOM tree that
 * ignores shadow DOM boundaries.
 *
 * Returns true of the test element is a descendent of the reference, or exist in
 * a shadow DOM that is a logical descendent of the reference. Otherwise returns false.
 * @param reference - The element to test for containment against.
 * @param test - The element being tested for containment.
 *
 * @public
 */
function composedContains(reference, test) {
    let current = test;
    while (current !== null) {
        if (current === reference) {
            return true;
        }
        current = (0,_composed_parent_js__WEBPACK_IMPORTED_MODULE_0__.composedParent)(current);
    }
    return false;
}


/***/ }),

/***/ "./node_modules/@microsoft/fast-foundation/dist/esm/utilities/composed-parent.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/@microsoft/fast-foundation/dist/esm/utilities/composed-parent.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   composedParent: () => (/* binding */ composedParent)
/* harmony export */ });
/**
 * Retrieves the "composed parent" element of a node, ignoring DOM tree boundaries.
 * When the parent of a node is a shadow-root, it will return the host
 * element of the shadow root. Otherwise it will return the parent node or null if
 * no parent node exists.
 * @param element - The element for which to retrieve the composed parent
 *
 * @public
 */
function composedParent(element) {
    const parentNode = element.parentElement;
    if (parentNode) {
        return parentNode;
    }
    else {
        const rootNode = element.getRootNode();
        if (rootNode.host instanceof HTMLElement) {
            // this is shadow-root
            return rootNode.host;
        }
    }
    return null;
}


/***/ }),

/***/ "./node_modules/@microsoft/fast-foundation/dist/esm/utilities/match-media-stylesheet-behavior.js":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/@microsoft/fast-foundation/dist/esm/utilities/match-media-stylesheet-behavior.js ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MatchMediaBehavior: () => (/* binding */ MatchMediaBehavior),
/* harmony export */   MatchMediaStyleSheetBehavior: () => (/* binding */ MatchMediaStyleSheetBehavior),
/* harmony export */   darkModeStylesheetBehavior: () => (/* binding */ darkModeStylesheetBehavior),
/* harmony export */   forcedColorsStylesheetBehavior: () => (/* binding */ forcedColorsStylesheetBehavior),
/* harmony export */   lightModeStylesheetBehavior: () => (/* binding */ lightModeStylesheetBehavior)
/* harmony export */ });
/**
 * An abstract behavior to react to media queries. Implementations should implement
 * the `constructListener` method to perform some action based on media query changes.
 *
 * @public
 */
class MatchMediaBehavior {
    /**
     *
     * @param query - The media query to operate from.
     */
    constructor(query) {
        /**
         * The behavior needs to operate on element instances but elements might share a behavior instance.
         * To ensure proper attachment / detachment per instance, we construct a listener for
         * each bind invocation and cache the listeners by element reference.
         */
        this.listenerCache = new WeakMap();
        this.query = query;
    }
    /**
     * Binds the behavior to the element.
     * @param source - The element for which the behavior is bound.
     */
    bind(source) {
        const { query } = this;
        const listener = this.constructListener(source);
        // Invoke immediately to add if the query currently matches
        listener.bind(query)();
        query.addListener(listener);
        this.listenerCache.set(source, listener);
    }
    /**
     * Unbinds the behavior from the element.
     * @param source - The element for which the behavior is unbinding.
     */
    unbind(source) {
        const listener = this.listenerCache.get(source);
        if (listener) {
            this.query.removeListener(listener);
            this.listenerCache.delete(source);
        }
    }
}
/**
 * A behavior to add or remove a stylesheet from an element based on a media query. The behavior ensures that
 * styles are applied while the a query matches the environment and that styles are not applied if the query does
 * not match the environment.
 *
 * @public
 */
class MatchMediaStyleSheetBehavior extends MatchMediaBehavior {
    /**
     * Constructs a {@link MatchMediaStyleSheetBehavior} instance.
     * @param query - The media query to operate from.
     * @param styles - The styles to coordinate with the query.
     */
    constructor(query, styles) {
        super(query);
        this.styles = styles;
    }
    /**
     * Defines a function to construct {@link MatchMediaStyleSheetBehavior | MatchMediaStyleSheetBehaviors} for
     * a provided query.
     * @param query - The media query to operate from.
     *
     * @public
     * @example
     *
     * ```ts
     * import { css } from "@microsoft/fast-element";
     * import { MatchMediaStyleSheetBehavior } from "@microsoft/fast-foundation";
     *
     * const landscapeBehavior = MatchMediaStyleSheetBehavior.with(
     *   window.matchMedia("(orientation: landscape)")
     * );
     * const styles = css`
     *   :host {
     *     width: 200px;
     *     height: 400px;
     *   }
     * `
     * .withBehaviors(landscapeBehavior(css`
     *   :host {
     *     width: 400px;
     *     height: 200px;
     *   }
     * `))
     * ```
     */
    static with(query) {
        return (styles) => {
            return new MatchMediaStyleSheetBehavior(query, styles);
        };
    }
    /**
     * Constructs a match-media listener for a provided element.
     * @param source - the element for which to attach or detach styles.
     * @internal
     */
    constructListener(source) {
        let attached = false;
        const styles = this.styles;
        return function listener() {
            const { matches } = this;
            if (matches && !attached) {
                source.$fastController.addStyles(styles);
                attached = matches;
            }
            else if (!matches && attached) {
                source.$fastController.removeStyles(styles);
                attached = matches;
            }
        };
    }
    /**
     * Unbinds the behavior from the element.
     * @param source - The element for which the behavior is unbinding.
     * @internal
     */
    unbind(source) {
        super.unbind(source);
        source.$fastController.removeStyles(this.styles);
    }
}
/**
 * This can be used to construct a behavior to apply a forced-colors only stylesheet.
 * @public
 */
const forcedColorsStylesheetBehavior = MatchMediaStyleSheetBehavior.with(window.matchMedia("(forced-colors)"));
/**
 * This can be used to construct a behavior to apply a prefers color scheme: dark only stylesheet.
 * @public
 */
const darkModeStylesheetBehavior = MatchMediaStyleSheetBehavior.with(window.matchMedia("(prefers-color-scheme: dark)"));
/**
 * This can be used to construct a behavior to apply a prefers color scheme: light only stylesheet.
 * @public
 */
const lightModeStylesheetBehavior = MatchMediaStyleSheetBehavior.with(window.matchMedia("(prefers-color-scheme: light)"));


/***/ }),

/***/ "./node_modules/@microsoft/fast-foundation/dist/esm/utilities/property-stylesheet-behavior.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/@microsoft/fast-foundation/dist/esm/utilities/property-stylesheet-behavior.js ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PropertyStyleSheetBehavior: () => (/* binding */ PropertyStyleSheetBehavior)
/* harmony export */ });
/* harmony import */ var _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/fast-element */ "./node_modules/@microsoft/fast-element/dist/esm/observation/observable.js");

/**
 * A behavior to add or remove a stylesheet from an element based on a property. The behavior ensures that
 * styles are applied while the property matches and that styles are not applied if the property does
 * not match.
 *
 * @public
 */
class PropertyStyleSheetBehavior {
    /**
     * Constructs a {@link PropertyStyleSheetBehavior} instance.
     * @param propertyName - The property name to operate from.
     * @param value - The property value to operate from.
     * @param styles - The styles to coordinate with the property.
     */
    constructor(propertyName, value, styles) {
        this.propertyName = propertyName;
        this.value = value;
        this.styles = styles;
    }
    /**
     * Binds the behavior to the element.
     * @param elementInstance - The element for which the property is applied.
     */
    bind(elementInstance) {
        _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_0__.Observable.getNotifier(elementInstance).subscribe(this, this.propertyName);
        this.handleChange(elementInstance, this.propertyName);
    }
    /**
     * Unbinds the behavior from the element.
     * @param source - The element for which the behavior is unbinding.
     * @internal
     */
    unbind(source) {
        _microsoft_fast_element__WEBPACK_IMPORTED_MODULE_0__.Observable.getNotifier(source).unsubscribe(this, this.propertyName);
        source.$fastController.removeStyles(this.styles);
    }
    /**
     * Change event for the provided element.
     * @param source - the element for which to attach or detach styles.
     * @param key - the key to lookup to know if the element already has the styles
     * @internal
     */
    handleChange(source, key) {
        if (source[key] === this.value) {
            source.$fastController.addStyles(this.styles);
        }
        else {
            source.$fastController.removeStyles(this.styles);
        }
    }
}


/***/ }),

/***/ "./node_modules/@microsoft/fast-foundation/dist/esm/utilities/style/disabled.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/@microsoft/fast-foundation/dist/esm/utilities/style/disabled.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   disabledCursor: () => (/* binding */ disabledCursor)
/* harmony export */ });
/**
 * The CSS value for disabled cursors.
 * @public
 */
const disabledCursor = "not-allowed";


/***/ }),

/***/ "./node_modules/@microsoft/fast-foundation/dist/esm/utilities/style/display.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/@microsoft/fast-foundation/dist/esm/utilities/style/display.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   display: () => (/* binding */ display),
/* harmony export */   hidden: () => (/* binding */ hidden)
/* harmony export */ });
/**
 * A CSS fragment to set `display: none;` when the host is hidden using the [hidden] attribute.
 * @public
 */
const hidden = `:host([hidden]){display:none}`;
/**
 * Applies a CSS display property.
 * Also adds CSS rules to not display the element when the [hidden] attribute is applied to the element.
 * @param display - The CSS display property value
 * @public
 */
function display(displayValue) {
    return `${hidden}:host{display:${displayValue}}`;
}


/***/ }),

/***/ "./node_modules/@microsoft/fast-foundation/dist/esm/utilities/style/focus.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@microsoft/fast-foundation/dist/esm/utilities/style/focus.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   focusVisible: () => (/* binding */ focusVisible)
/* harmony export */ });
/* harmony import */ var _microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/fast-web-utilities */ "./node_modules/@microsoft/fast-web-utilities/dist/dom.js");

/**
 * The string representing the focus selector to be used. Value
 * will be "focus-visible" when https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo
 * is supported and "focus" when it is not.
 *
 * @public
 */
const focusVisible = (0,_microsoft_fast_web_utilities__WEBPACK_IMPORTED_MODULE_0__.canUseFocusVisible)() ? "focus-visible" : "focus";


/***/ }),

/***/ "./node_modules/@microsoft/fast-foundation/dist/esm/utilities/whitespace-filter.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/@microsoft/fast-foundation/dist/esm/utilities/whitespace-filter.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   whitespaceFilter: () => (/* binding */ whitespaceFilter)
/* harmony export */ });
/**
 * a method to filter out any whitespace _only_ nodes, to be used inside a template
 * @param value - The Node that is being inspected
 * @param index - The index of the node within the array
 * @param array - The Node array that is being filtered
 *
 * @public
 */
function whitespaceFilter(value, index, array) {
    return value.nodeType !== Node.TEXT_NODE
        ? true
        : typeof value.nodeValue === "string" && !!value.nodeValue.trim().length;
}


/***/ }),

/***/ "./node_modules/@microsoft/fast-foundation/node_modules/tslib/tslib.es6.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@microsoft/fast-foundation/node_modules/tslib/tslib.es6.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __assign: () => (/* binding */ __assign),
/* harmony export */   __asyncDelegator: () => (/* binding */ __asyncDelegator),
/* harmony export */   __asyncGenerator: () => (/* binding */ __asyncGenerator),
/* harmony export */   __asyncValues: () => (/* binding */ __asyncValues),
/* harmony export */   __await: () => (/* binding */ __await),
/* harmony export */   __awaiter: () => (/* binding */ __awaiter),
/* harmony export */   __classPrivateFieldGet: () => (/* binding */ __classPrivateFieldGet),
/* harmony export */   __classPrivateFieldSet: () => (/* binding */ __classPrivateFieldSet),
/* harmony export */   __createBinding: () => (/* binding */ __createBinding),
/* harmony export */   __decorate: () => (/* binding */ __decorate),
/* harmony export */   __exportStar: () => (/* binding */ __exportStar),
/* harmony export */   __extends: () => (/* binding */ __extends),
/* harmony export */   __generator: () => (/* binding */ __generator),
/* harmony export */   __importDefault: () => (/* binding */ __importDefault),
/* harmony export */   __importStar: () => (/* binding */ __importStar),
/* harmony export */   __makeTemplateObject: () => (/* binding */ __makeTemplateObject),
/* harmony export */   __metadata: () => (/* binding */ __metadata),
/* harmony export */   __param: () => (/* binding */ __param),
/* harmony export */   __read: () => (/* binding */ __read),
/* harmony export */   __rest: () => (/* binding */ __rest),
/* harmony export */   __spread: () => (/* binding */ __spread),
/* harmony export */   __spreadArrays: () => (/* binding */ __spreadArrays),
/* harmony export */   __values: () => (/* binding */ __values)
/* harmony export */ });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __createBinding(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}

function __exportStar(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
}

function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
}


/***/ }),

/***/ "./node_modules/@microsoft/fast-web-utilities/dist/dom.js":
/*!****************************************************************!*\
  !*** ./node_modules/@microsoft/fast-web-utilities/dist/dom.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   canUseCssGrid: () => (/* binding */ canUseCssGrid),
/* harmony export */   canUseFocusVisible: () => (/* binding */ canUseFocusVisible),
/* harmony export */   canUseForcedColors: () => (/* binding */ canUseForcedColors),
/* harmony export */   canUsedForcedColors: () => (/* binding */ canUsedForcedColors),
/* harmony export */   getDisplayedNodes: () => (/* binding */ getDisplayedNodes),
/* harmony export */   getKeyCode: () => (/* binding */ getKeyCode),
/* harmony export */   isHTMLElement: () => (/* binding */ isHTMLElement),
/* harmony export */   resetDocumentCache: () => (/* binding */ resetDocumentCache)
/* harmony export */ });
/* harmony import */ var exenv_es6__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! exenv-es6 */ "./node_modules/exenv-es6/dist/can-use-dom.js");

/**
 * A test that ensures that all arguments are HTML Elements
 */
function isHTMLElement(...args) {
    return args.every((arg) => arg instanceof HTMLElement);
}
/**
 * Returns all displayed elements inside of a root node that match a provided selector
 */
function getDisplayedNodes(rootNode, selector) {
    if (!rootNode || !selector || !isHTMLElement(rootNode)) {
        return;
    }
    const nodes = Array.from(rootNode.querySelectorAll(selector));
    // offsetParent will be null if the element isn't currently displayed,
    // so this will allow us to operate only on visible nodes
    return nodes.filter((node) => node.offsetParent !== null);
}
/**
 * Gets the numeric key code associated with a keyboard event. This method is for use with DOM level 3 events
 * that still use the deprecated keyCode property.
 */
function getKeyCode(event) {
    return event === null ? null : event.which || event.keyCode || event.charCode;
}
/**
 * Returns the nonce used in the page, if any.
 *
 * Based on https://github.com/cssinjs/jss/blob/master/packages/jss/src/DomRenderer.js
 */
function getNonce() {
    const node = document.querySelector('meta[property="csp-nonce"]');
    if (node) {
        return node.getAttribute("content");
    }
    else {
        return null;
    }
}
/**
 * Test if the document supports :focus-visible
 */
let _canUseFocusVisible;
function canUseFocusVisible() {
    if (typeof _canUseFocusVisible === "boolean") {
        return _canUseFocusVisible;
    }
    if (!(0,exenv_es6__WEBPACK_IMPORTED_MODULE_0__.canUseDOM)()) {
        _canUseFocusVisible = false;
        return _canUseFocusVisible;
    }
    // Check to see if the document supports the focus-visible element
    const styleElement = document.createElement("style");
    // If nonces are present on the page, use it when creating the style element
    // to test focus-visible support.
    const styleNonce = getNonce();
    if (styleNonce !== null) {
        styleElement.setAttribute("nonce", styleNonce);
    }
    document.head.appendChild(styleElement);
    try {
        styleElement.sheet.insertRule("foo:focus-visible {color:inherit}", 0);
        _canUseFocusVisible = true;
    }
    catch (e) {
        _canUseFocusVisible = false;
    }
    finally {
        document.head.removeChild(styleElement);
    }
    return _canUseFocusVisible;
}
let _canUseCssGrid;
function canUseCssGrid() {
    if (typeof _canUseCssGrid === "boolean") {
        return _canUseCssGrid;
    }
    try {
        _canUseCssGrid = CSS.supports("display", "grid");
    }
    catch (_a) {
        _canUseCssGrid = false;
    }
    return _canUseCssGrid;
}
function canUseForcedColors() {
    return ((0,exenv_es6__WEBPACK_IMPORTED_MODULE_0__.canUseDOM)() &&
        (window.matchMedia("(forced-colors: none)").matches ||
            window.matchMedia("(forced-colors: active)").matches));
}
function resetDocumentCache() {
    _canUseCssGrid = undefined;
    _canUseFocusVisible = undefined;
}
/**
 * @deprecated Use 'canUseForcedColors' instead
 */
const canUsedForcedColors = canUseForcedColors;


/***/ }),

/***/ "./node_modules/@microsoft/fast-web-utilities/dist/key-codes.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@microsoft/fast-web-utilities/dist/key-codes.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ArrowKeys: () => (/* binding */ ArrowKeys),
/* harmony export */   KeyCodes: () => (/* binding */ KeyCodes),
/* harmony export */   keyArrowDown: () => (/* binding */ keyArrowDown),
/* harmony export */   keyArrowLeft: () => (/* binding */ keyArrowLeft),
/* harmony export */   keyArrowRight: () => (/* binding */ keyArrowRight),
/* harmony export */   keyArrowUp: () => (/* binding */ keyArrowUp),
/* harmony export */   keyBackspace: () => (/* binding */ keyBackspace),
/* harmony export */   keyCodeAlt: () => (/* binding */ keyCodeAlt),
/* harmony export */   keyCodeArrowDown: () => (/* binding */ keyCodeArrowDown),
/* harmony export */   keyCodeArrowLeft: () => (/* binding */ keyCodeArrowLeft),
/* harmony export */   keyCodeArrowRight: () => (/* binding */ keyCodeArrowRight),
/* harmony export */   keyCodeArrowUp: () => (/* binding */ keyCodeArrowUp),
/* harmony export */   keyCodeBack: () => (/* binding */ keyCodeBack),
/* harmony export */   keyCodeBackSlash: () => (/* binding */ keyCodeBackSlash),
/* harmony export */   keyCodeBreak: () => (/* binding */ keyCodeBreak),
/* harmony export */   keyCodeCapsLock: () => (/* binding */ keyCodeCapsLock),
/* harmony export */   keyCodeCloseBracket: () => (/* binding */ keyCodeCloseBracket),
/* harmony export */   keyCodeColon: () => (/* binding */ keyCodeColon),
/* harmony export */   keyCodeColon2: () => (/* binding */ keyCodeColon2),
/* harmony export */   keyCodeComma: () => (/* binding */ keyCodeComma),
/* harmony export */   keyCodeCtrl: () => (/* binding */ keyCodeCtrl),
/* harmony export */   keyCodeDelete: () => (/* binding */ keyCodeDelete),
/* harmony export */   keyCodeEnd: () => (/* binding */ keyCodeEnd),
/* harmony export */   keyCodeEnter: () => (/* binding */ keyCodeEnter),
/* harmony export */   keyCodeEquals: () => (/* binding */ keyCodeEquals),
/* harmony export */   keyCodeEquals2: () => (/* binding */ keyCodeEquals2),
/* harmony export */   keyCodeEquals3: () => (/* binding */ keyCodeEquals3),
/* harmony export */   keyCodeEscape: () => (/* binding */ keyCodeEscape),
/* harmony export */   keyCodeForwardSlash: () => (/* binding */ keyCodeForwardSlash),
/* harmony export */   keyCodeFunction1: () => (/* binding */ keyCodeFunction1),
/* harmony export */   keyCodeFunction10: () => (/* binding */ keyCodeFunction10),
/* harmony export */   keyCodeFunction11: () => (/* binding */ keyCodeFunction11),
/* harmony export */   keyCodeFunction12: () => (/* binding */ keyCodeFunction12),
/* harmony export */   keyCodeFunction2: () => (/* binding */ keyCodeFunction2),
/* harmony export */   keyCodeFunction3: () => (/* binding */ keyCodeFunction3),
/* harmony export */   keyCodeFunction4: () => (/* binding */ keyCodeFunction4),
/* harmony export */   keyCodeFunction5: () => (/* binding */ keyCodeFunction5),
/* harmony export */   keyCodeFunction6: () => (/* binding */ keyCodeFunction6),
/* harmony export */   keyCodeFunction7: () => (/* binding */ keyCodeFunction7),
/* harmony export */   keyCodeFunction8: () => (/* binding */ keyCodeFunction8),
/* harmony export */   keyCodeFunction9: () => (/* binding */ keyCodeFunction9),
/* harmony export */   keyCodeHome: () => (/* binding */ keyCodeHome),
/* harmony export */   keyCodeInsert: () => (/* binding */ keyCodeInsert),
/* harmony export */   keyCodeMenu: () => (/* binding */ keyCodeMenu),
/* harmony export */   keyCodeMinus: () => (/* binding */ keyCodeMinus),
/* harmony export */   keyCodeMinus2: () => (/* binding */ keyCodeMinus2),
/* harmony export */   keyCodeNumLock: () => (/* binding */ keyCodeNumLock),
/* harmony export */   keyCodeNumPad0: () => (/* binding */ keyCodeNumPad0),
/* harmony export */   keyCodeNumPad1: () => (/* binding */ keyCodeNumPad1),
/* harmony export */   keyCodeNumPad2: () => (/* binding */ keyCodeNumPad2),
/* harmony export */   keyCodeNumPad3: () => (/* binding */ keyCodeNumPad3),
/* harmony export */   keyCodeNumPad4: () => (/* binding */ keyCodeNumPad4),
/* harmony export */   keyCodeNumPad5: () => (/* binding */ keyCodeNumPad5),
/* harmony export */   keyCodeNumPad6: () => (/* binding */ keyCodeNumPad6),
/* harmony export */   keyCodeNumPad7: () => (/* binding */ keyCodeNumPad7),
/* harmony export */   keyCodeNumPad8: () => (/* binding */ keyCodeNumPad8),
/* harmony export */   keyCodeNumPad9: () => (/* binding */ keyCodeNumPad9),
/* harmony export */   keyCodeNumPadDivide: () => (/* binding */ keyCodeNumPadDivide),
/* harmony export */   keyCodeNumPadDot: () => (/* binding */ keyCodeNumPadDot),
/* harmony export */   keyCodeNumPadMinus: () => (/* binding */ keyCodeNumPadMinus),
/* harmony export */   keyCodeNumPadMultiply: () => (/* binding */ keyCodeNumPadMultiply),
/* harmony export */   keyCodeNumPadPlus: () => (/* binding */ keyCodeNumPadPlus),
/* harmony export */   keyCodeOpenBracket: () => (/* binding */ keyCodeOpenBracket),
/* harmony export */   keyCodePageDown: () => (/* binding */ keyCodePageDown),
/* harmony export */   keyCodePageUp: () => (/* binding */ keyCodePageUp),
/* harmony export */   keyCodePeriod: () => (/* binding */ keyCodePeriod),
/* harmony export */   keyCodePrint: () => (/* binding */ keyCodePrint),
/* harmony export */   keyCodeQuote: () => (/* binding */ keyCodeQuote),
/* harmony export */   keyCodeScrollLock: () => (/* binding */ keyCodeScrollLock),
/* harmony export */   keyCodeShift: () => (/* binding */ keyCodeShift),
/* harmony export */   keyCodeSpace: () => (/* binding */ keyCodeSpace),
/* harmony export */   keyCodeTab: () => (/* binding */ keyCodeTab),
/* harmony export */   keyCodeTilde: () => (/* binding */ keyCodeTilde),
/* harmony export */   keyCodeWindowsLeft: () => (/* binding */ keyCodeWindowsLeft),
/* harmony export */   keyCodeWindowsOpera: () => (/* binding */ keyCodeWindowsOpera),
/* harmony export */   keyCodeWindowsRight: () => (/* binding */ keyCodeWindowsRight),
/* harmony export */   keyDelete: () => (/* binding */ keyDelete),
/* harmony export */   keyEnd: () => (/* binding */ keyEnd),
/* harmony export */   keyEnter: () => (/* binding */ keyEnter),
/* harmony export */   keyEscape: () => (/* binding */ keyEscape),
/* harmony export */   keyFunction2: () => (/* binding */ keyFunction2),
/* harmony export */   keyHome: () => (/* binding */ keyHome),
/* harmony export */   keyPageDown: () => (/* binding */ keyPageDown),
/* harmony export */   keyPageUp: () => (/* binding */ keyPageUp),
/* harmony export */   keySpace: () => (/* binding */ keySpace),
/* harmony export */   keyTab: () => (/* binding */ keyTab)
/* harmony export */ });
/**
 * Key Code values
 * @deprecated - KeyCodes are deprecated, use individual string key exports
 */
var KeyCodes;
(function (KeyCodes) {
    KeyCodes[KeyCodes["alt"] = 18] = "alt";
    KeyCodes[KeyCodes["arrowDown"] = 40] = "arrowDown";
    KeyCodes[KeyCodes["arrowLeft"] = 37] = "arrowLeft";
    KeyCodes[KeyCodes["arrowRight"] = 39] = "arrowRight";
    KeyCodes[KeyCodes["arrowUp"] = 38] = "arrowUp";
    KeyCodes[KeyCodes["back"] = 8] = "back";
    KeyCodes[KeyCodes["backSlash"] = 220] = "backSlash";
    KeyCodes[KeyCodes["break"] = 19] = "break";
    KeyCodes[KeyCodes["capsLock"] = 20] = "capsLock";
    KeyCodes[KeyCodes["closeBracket"] = 221] = "closeBracket";
    KeyCodes[KeyCodes["colon"] = 186] = "colon";
    KeyCodes[KeyCodes["colon2"] = 59] = "colon2";
    KeyCodes[KeyCodes["comma"] = 188] = "comma";
    KeyCodes[KeyCodes["ctrl"] = 17] = "ctrl";
    KeyCodes[KeyCodes["delete"] = 46] = "delete";
    KeyCodes[KeyCodes["end"] = 35] = "end";
    KeyCodes[KeyCodes["enter"] = 13] = "enter";
    KeyCodes[KeyCodes["equals"] = 187] = "equals";
    KeyCodes[KeyCodes["equals2"] = 61] = "equals2";
    KeyCodes[KeyCodes["equals3"] = 107] = "equals3";
    KeyCodes[KeyCodes["escape"] = 27] = "escape";
    KeyCodes[KeyCodes["forwardSlash"] = 191] = "forwardSlash";
    KeyCodes[KeyCodes["function1"] = 112] = "function1";
    KeyCodes[KeyCodes["function10"] = 121] = "function10";
    KeyCodes[KeyCodes["function11"] = 122] = "function11";
    KeyCodes[KeyCodes["function12"] = 123] = "function12";
    KeyCodes[KeyCodes["function2"] = 113] = "function2";
    KeyCodes[KeyCodes["function3"] = 114] = "function3";
    KeyCodes[KeyCodes["function4"] = 115] = "function4";
    KeyCodes[KeyCodes["function5"] = 116] = "function5";
    KeyCodes[KeyCodes["function6"] = 117] = "function6";
    KeyCodes[KeyCodes["function7"] = 118] = "function7";
    KeyCodes[KeyCodes["function8"] = 119] = "function8";
    KeyCodes[KeyCodes["function9"] = 120] = "function9";
    KeyCodes[KeyCodes["home"] = 36] = "home";
    KeyCodes[KeyCodes["insert"] = 45] = "insert";
    KeyCodes[KeyCodes["menu"] = 93] = "menu";
    KeyCodes[KeyCodes["minus"] = 189] = "minus";
    KeyCodes[KeyCodes["minus2"] = 109] = "minus2";
    KeyCodes[KeyCodes["numLock"] = 144] = "numLock";
    KeyCodes[KeyCodes["numPad0"] = 96] = "numPad0";
    KeyCodes[KeyCodes["numPad1"] = 97] = "numPad1";
    KeyCodes[KeyCodes["numPad2"] = 98] = "numPad2";
    KeyCodes[KeyCodes["numPad3"] = 99] = "numPad3";
    KeyCodes[KeyCodes["numPad4"] = 100] = "numPad4";
    KeyCodes[KeyCodes["numPad5"] = 101] = "numPad5";
    KeyCodes[KeyCodes["numPad6"] = 102] = "numPad6";
    KeyCodes[KeyCodes["numPad7"] = 103] = "numPad7";
    KeyCodes[KeyCodes["numPad8"] = 104] = "numPad8";
    KeyCodes[KeyCodes["numPad9"] = 105] = "numPad9";
    KeyCodes[KeyCodes["numPadDivide"] = 111] = "numPadDivide";
    KeyCodes[KeyCodes["numPadDot"] = 110] = "numPadDot";
    KeyCodes[KeyCodes["numPadMinus"] = 109] = "numPadMinus";
    KeyCodes[KeyCodes["numPadMultiply"] = 106] = "numPadMultiply";
    KeyCodes[KeyCodes["numPadPlus"] = 107] = "numPadPlus";
    KeyCodes[KeyCodes["openBracket"] = 219] = "openBracket";
    KeyCodes[KeyCodes["pageDown"] = 34] = "pageDown";
    KeyCodes[KeyCodes["pageUp"] = 33] = "pageUp";
    KeyCodes[KeyCodes["period"] = 190] = "period";
    KeyCodes[KeyCodes["print"] = 44] = "print";
    KeyCodes[KeyCodes["quote"] = 222] = "quote";
    KeyCodes[KeyCodes["scrollLock"] = 145] = "scrollLock";
    KeyCodes[KeyCodes["shift"] = 16] = "shift";
    KeyCodes[KeyCodes["space"] = 32] = "space";
    KeyCodes[KeyCodes["tab"] = 9] = "tab";
    KeyCodes[KeyCodes["tilde"] = 192] = "tilde";
    KeyCodes[KeyCodes["windowsLeft"] = 91] = "windowsLeft";
    KeyCodes[KeyCodes["windowsOpera"] = 219] = "windowsOpera";
    KeyCodes[KeyCodes["windowsRight"] = 92] = "windowsRight";
})(KeyCodes || (KeyCodes = {}));
/**
 * @deprecated - KeyCodes are deprecated, use string key exports
 */
const keyCodeAlt = 18;
/**
 * @deprecated - KeyCodes are deprecated, use string key exports
 */
const keyCodeArrowDown = 40;
/**
 * @deprecated - KeyCodes are deprecated, use string key exports
 */
const keyCodeArrowLeft = 37;
/**
 * @deprecated - KeyCodes are deprecated, use string key exports
 */
const keyCodeArrowRight = 39;
/**
 * @deprecated - KeyCodes are deprecated, use string key exports
 */
const keyCodeArrowUp = 38;
/**
 * @deprecated - KeyCodes are deprecated, use string key exports
 */
const keyCodeBack = 8;
/**
 * @deprecated - KeyCodes are deprecated, use string key exports
 */
const keyCodeBackSlash = 220;
/**
 * @deprecated - KeyCodes are deprecated, use string key exports
 */
const keyCodeBreak = 19;
/**
 * @deprecated - KeyCodes are deprecated, use string key exports
 */
const keyCodeCapsLock = 20;
/**
 * @deprecated - KeyCodes are deprecated, use string key exports
 */
const keyCodeCloseBracket = 221;
/**
 * @deprecated - KeyCodes are deprecated, use string key exports
 */
const keyCodeColon = 186;
/**
 * @deprecated - KeyCodes are deprecated, use string key exports
 */
const keyCodeColon2 = 59; // Opera and Firefox
/**
 * @deprecated - KeyCodes are deprecated, use string key exports
 */
const keyCodeComma = 188;
/**
 * @deprecated - KeyCodes are deprecated, use string key exports
 */
const keyCodeCtrl = 17;
/**
 * @deprecated - KeyCodes are deprecated, use string key exports
 */
const keyCodeDelete = 46;
/**
 * @deprecated - KeyCodes are deprecated, use string key exports
 */
const keyCodeEnd = 35;
/**
 * @deprecated - KeyCodes are deprecated, use string key exports
 */
const keyCodeEnter = 13;
/**
 * @deprecated - KeyCodes are deprecated, use string key exports
 */
const keyCodeEquals = 187;
/**
 * @deprecated - KeyCodes are deprecated, use string key exports
 */
const keyCodeEquals2 = 61; // Opera
/**
 * @deprecated - KeyCodes are deprecated, use string key exports
 */
const keyCodeEquals3 = 107; // Firefox
/**
 * @deprecated - KeyCodes are deprecated, use string key exports
 */
const keyCodeEscape = 27;
/**
 * @deprecated - KeyCodes are deprecated, use string key exports
 */
const keyCodeForwardSlash = 191;
/**
 * @deprecated - KeyCodes are deprecated, use string key exports
 */
const keyCodeFunction1 = 112;
/**
 * @deprecated - KeyCodes are deprecated, use string key exports
 */
const keyCodeFunction10 = 121;
/**
 * @deprecated - KeyCodes are deprecated, use string key exports
 */
const keyCodeFunction11 = 122;
/**
 * @deprecated - KeyCodes are deprecated, use string key exports
 */
const keyCodeFunction12 = 123;
/**
 * @deprecated - KeyCodes are deprecated, use string key exports
 */
const keyCodeFunction2 = 113;
/**
 * @deprecated - KeyCodes are deprecated, use string key exports
 */
const keyCodeFunction3 = 114;
/**
 * @deprecated - KeyCodes are deprecated, use string key exports
 */
const keyCodeFunction4 = 115;
/**
 * @deprecated - KeyCodes are deprecated, use string key exports
 */
const keyCodeFunction5 = 116;
/**
 * @deprecated - KeyCodes are deprecated, use string key exports
 */
const keyCodeFunction6 = 117;
/**
 * @deprecated - KeyCodes are deprecated, use string key exports
 */
const keyCodeFunction7 = 118;
/**
 * @deprecated - KeyCodes are deprecated, use string key exports
 */
const keyCodeFunction8 = 119;
/**
 * @deprecated - KeyCodes are deprecated, use string key exports
 */
const keyCodeFunction9 = 120;
/**
 * @deprecated - KeyCodes are deprecated, use string key exports
 */
const keyCodeHome = 36;
/**
 * @deprecated - KeyCodes are deprecated, use string key exports
 */
const keyCodeInsert = 45;
/**
 * @deprecated - KeyCodes are deprecated, use string key exports
 */
const keyCodeMenu = 93;
/**
 * @deprecated - KeyCodes are deprecated, use string key exports
 */
const keyCodeMinus = 189;
/**
 * @deprecated - KeyCodes are deprecated, use string key exports
 */
const keyCodeMinus2 = 109; // Opera and Firefox
/**
 * @deprecated - KeyCodes are deprecated, use string key exports
 */
const keyCodeNumLock = 144;
/**
 * @deprecated - KeyCodes are deprecated, use string key exports
 */
const keyCodeNumPad0 = 96;
/**
 * @deprecated - KeyCodes are deprecated, use string key exports
 */
const keyCodeNumPad1 = 97;
/**
 * @deprecated - KeyCodes are deprecated, use string key exports
 */
const keyCodeNumPad2 = 98;
/**
 * @deprecated - KeyCodes are deprecated, use string key exports
 */
const keyCodeNumPad3 = 99;
/**
 * @deprecated - KeyCodes are deprecated, use string key exports
 */
const keyCodeNumPad4 = 100;
/**
 * @deprecated - KeyCodes are deprecated, use string key exports
 */
const keyCodeNumPad5 = 101;
/**
 * @deprecated - KeyCodes are deprecated, use string key exports
 */
const keyCodeNumPad6 = 102;
/**
 * @deprecated - KeyCodes are deprecated, use string key exports
 */
const keyCodeNumPad7 = 103;
/**
 * @deprecated - KeyCodes are deprecated, use string key exports
 */
const keyCodeNumPad8 = 104;
/**
 * @deprecated - KeyCodes are deprecated, use string key exports
 */
const keyCodeNumPad9 = 105;
/**
 * @deprecated - KeyCodes are deprecated, use string key exports
 */
const keyCodeNumPadDivide = 111;
/**
 * @deprecated - KeyCodes are deprecated, use string key exports
 */
const keyCodeNumPadDot = 110;
/**
 * @deprecated - KeyCodes are deprecated, use string key exports
 */
const keyCodeNumPadMinus = 109;
/**
 * @deprecated - KeyCodes are deprecated, use string key exports
 */
const keyCodeNumPadMultiply = 106;
/**
 * @deprecated - KeyCodes are deprecated, use string key exports
 */
const keyCodeNumPadPlus = 107;
/**
 * @deprecated - KeyCodes are deprecated, use string key exports
 */
const keyCodeOpenBracket = 219;
/**
 * @deprecated - KeyCodes are deprecated, use string key exports
 */
const keyCodePageDown = 34;
/**
 * @deprecated - KeyCodes are deprecated, use string key exports
 */
const keyCodePageUp = 33;
/**
 * @deprecated - KeyCodes are deprecated, use string key exports
 */
const keyCodePeriod = 190;
/**
 * @deprecated - KeyCodes are deprecated, use string key exports
 */
const keyCodePrint = 44;
/**
 * @deprecated - KeyCodes are deprecated, use string key exports
 */
const keyCodeQuote = 222;
/**
 * @deprecated - KeyCodes are deprecated, use string key exports
 */
const keyCodeScrollLock = 145;
/**
 * @deprecated - KeyCodes are deprecated, use string key exports
 */
const keyCodeShift = 16;
/**
 * @deprecated - KeyCodes are deprecated, use string key exports
 */
const keyCodeSpace = 32;
/**
 * @deprecated - KeyCodes are deprecated, use string key exports
 */
const keyCodeTab = 9;
/**
 * @deprecated - KeyCodes are deprecated, use string key exports
 */
const keyCodeTilde = 192;
/**
 * @deprecated - KeyCodes are deprecated, use string key exports
 */
const keyCodeWindowsLeft = 91;
/**
 * @deprecated - KeyCodes are deprecated, use string key exports
 */
const keyCodeWindowsOpera = 219; // Opera
/**
 * @deprecated - KeyCodes are deprecated, use string key exports
 */
const keyCodeWindowsRight = 92;
/**
 * String values for use with KeyboardEvent.key
 */
const keyArrowDown = "ArrowDown";
const keyArrowLeft = "ArrowLeft";
const keyArrowRight = "ArrowRight";
const keyArrowUp = "ArrowUp";
const keyEnter = "Enter";
const keyEscape = "Escape";
const keyHome = "Home";
const keyEnd = "End";
const keyFunction2 = "F2";
const keyPageDown = "PageDown";
const keyPageUp = "PageUp";
const keySpace = " ";
const keyTab = "Tab";
const keyBackspace = "Backspace";
const keyDelete = "Delete";
const ArrowKeys = {
    ArrowDown: keyArrowDown,
    ArrowLeft: keyArrowLeft,
    ArrowRight: keyArrowRight,
    ArrowUp: keyArrowUp,
};


/***/ }),

/***/ "./node_modules/@microsoft/fast-web-utilities/dist/localization.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@microsoft/fast-web-utilities/dist/localization.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Direction: () => (/* binding */ Direction)
/* harmony export */ });
/**
 * Expose ltr and rtl strings
 */
var Direction;
(function (Direction) {
    Direction["ltr"] = "ltr";
    Direction["rtl"] = "rtl";
})(Direction || (Direction = {}));


/***/ }),

/***/ "./node_modules/@microsoft/fast-web-utilities/dist/system-colors.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@microsoft/fast-web-utilities/dist/system-colors.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SystemColors: () => (/* binding */ SystemColors)
/* harmony export */ });
/**
 * Define system colors for use in CSS stylesheets.
 *
 * https://drafts.csswg.org/css-color/#css-system-colors
 */
var SystemColors;
(function (SystemColors) {
    SystemColors["Canvas"] = "Canvas";
    SystemColors["CanvasText"] = "CanvasText";
    SystemColors["LinkText"] = "LinkText";
    SystemColors["VisitedText"] = "VisitedText";
    SystemColors["ActiveText"] = "ActiveText";
    SystemColors["ButtonFace"] = "ButtonFace";
    SystemColors["ButtonText"] = "ButtonText";
    SystemColors["Field"] = "Field";
    SystemColors["FieldText"] = "FieldText";
    SystemColors["Highlight"] = "Highlight";
    SystemColors["HighlightText"] = "HighlightText";
    SystemColors["GrayText"] = "GrayText";
})(SystemColors || (SystemColors = {}));


/***/ }),

/***/ "./node_modules/exenv-es6/dist/can-use-dom.js":
/*!****************************************************!*\
  !*** ./node_modules/exenv-es6/dist/can-use-dom.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   canUseDOM: () => (/* binding */ canUseDOM)
/* harmony export */ });
/**
 * Checks if the DOM is available to access and use
 */
function canUseDOM() {
    return !!(typeof window !== "undefined" && window.document && window.document.createElement);
}


/***/ }),

/***/ "./node_modules/tslib/tslib.es6.mjs":
/*!******************************************!*\
  !*** ./node_modules/tslib/tslib.es6.mjs ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __addDisposableResource: () => (/* binding */ __addDisposableResource),
/* harmony export */   __assign: () => (/* binding */ __assign),
/* harmony export */   __asyncDelegator: () => (/* binding */ __asyncDelegator),
/* harmony export */   __asyncGenerator: () => (/* binding */ __asyncGenerator),
/* harmony export */   __asyncValues: () => (/* binding */ __asyncValues),
/* harmony export */   __await: () => (/* binding */ __await),
/* harmony export */   __awaiter: () => (/* binding */ __awaiter),
/* harmony export */   __classPrivateFieldGet: () => (/* binding */ __classPrivateFieldGet),
/* harmony export */   __classPrivateFieldIn: () => (/* binding */ __classPrivateFieldIn),
/* harmony export */   __classPrivateFieldSet: () => (/* binding */ __classPrivateFieldSet),
/* harmony export */   __createBinding: () => (/* binding */ __createBinding),
/* harmony export */   __decorate: () => (/* binding */ __decorate),
/* harmony export */   __disposeResources: () => (/* binding */ __disposeResources),
/* harmony export */   __esDecorate: () => (/* binding */ __esDecorate),
/* harmony export */   __exportStar: () => (/* binding */ __exportStar),
/* harmony export */   __extends: () => (/* binding */ __extends),
/* harmony export */   __generator: () => (/* binding */ __generator),
/* harmony export */   __importDefault: () => (/* binding */ __importDefault),
/* harmony export */   __importStar: () => (/* binding */ __importStar),
/* harmony export */   __makeTemplateObject: () => (/* binding */ __makeTemplateObject),
/* harmony export */   __metadata: () => (/* binding */ __metadata),
/* harmony export */   __param: () => (/* binding */ __param),
/* harmony export */   __propKey: () => (/* binding */ __propKey),
/* harmony export */   __read: () => (/* binding */ __read),
/* harmony export */   __rest: () => (/* binding */ __rest),
/* harmony export */   __rewriteRelativeImportExtension: () => (/* binding */ __rewriteRelativeImportExtension),
/* harmony export */   __runInitializers: () => (/* binding */ __runInitializers),
/* harmony export */   __setFunctionName: () => (/* binding */ __setFunctionName),
/* harmony export */   __spread: () => (/* binding */ __spread),
/* harmony export */   __spreadArray: () => (/* binding */ __spreadArray),
/* harmony export */   __spreadArrays: () => (/* binding */ __spreadArrays),
/* harmony export */   __values: () => (/* binding */ __values),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */

var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
      function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
  return extendStatics(d, b);
};

function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() { this.constructor = d; }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
  __assign = Object.assign || function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
  }
  return __assign.apply(this, arguments);
}

function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
              t[p[i]] = s[p[i]];
      }
  return t;
}

function __decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
  return function (target, key) { decorator(target, key, paramIndex); }
}

function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _, done = false;
  for (var i = decorators.length - 1; i >= 0; i--) {
      var context = {};
      for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
      for (var p in contextIn.access) context.access[p] = contextIn.access[p];
      context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
      var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
      if (kind === "accessor") {
          if (result === void 0) continue;
          if (result === null || typeof result !== "object") throw new TypeError("Object expected");
          if (_ = accept(result.get)) descriptor.get = _;
          if (_ = accept(result.set)) descriptor.set = _;
          if (_ = accept(result.init)) initializers.unshift(_);
      }
      else if (_ = accept(result)) {
          if (kind === "field") initializers.unshift(_);
          else descriptor[key] = _;
      }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};

function __runInitializers(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i = 0; i < initializers.length; i++) {
      value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
  }
  return useValue ? value : void 0;
};

function __propKey(x) {
  return typeof x === "symbol" ? x : "".concat(x);
};

function __setFunctionName(f, name, prefix) {
  if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
  return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};

function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
  return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
      function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
      function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

function __generator(thisArg, body) {
  var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
  return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
  function verb(n) { return function (v) { return step([n, v]); }; }
  function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (g && (g = 0, op[0] && (_ = 0)), _) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
              case 0: case 1: t = op; break;
              case 4: _.label++; return { value: op[1], done: false };
              case 5: _.label++; y = op[1]; op = [0]; continue;
              case 7: op = _.ops.pop(); _.trys.pop(); continue;
              default:
                  if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                  if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                  if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                  if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                  if (t[2]) _.ops.pop();
                  _.trys.pop(); continue;
          }
          op = body.call(thisArg, _);
      } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
      if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
  }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
  }
  Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

function __exportStar(m, o) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
      next: function () {
          if (o && i >= o.length) o = void 0;
          return { value: o && o[i++], done: !o };
      }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  }
  catch (error) { e = { error: error }; }
  finally {
      try {
          if (r && !r.done && (m = i["return"])) m.call(i);
      }
      finally { if (e) throw e.error; }
  }
  return ar;
}

/** @deprecated */
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++)
      ar = ar.concat(__read(arguments[i]));
  return ar;
}

/** @deprecated */
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
          r[k] = a[j];
  return r;
}

function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
      }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function () { return this; }, i;
  function awaitReturn(f) { return function (v) { return Promise.resolve(v).then(f, reject); }; }
  function verb(n, f) { if (g[n]) { i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; if (f) i[n] = f(i[n]); } }
  function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
  function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
  function fulfill(value) { resume("next", value); }
  function reject(value) { resume("throw", value); }
  function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
  function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
  function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
  function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
  return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
  Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
  o["default"] = v;
};

var ownKeys = function(o) {
  ownKeys = Object.getOwnPropertyNames || function (o) {
    var ar = [];
    for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
    return ar;
  };
  return ownKeys(o);
};

function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
  __setModuleDefault(result, mod);
  return result;
}

function __importDefault(mod) {
  return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

function __classPrivateFieldIn(state, receiver) {
  if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
  return typeof state === "function" ? receiver === state : state.has(receiver);
}

function __addDisposableResource(env, value, async) {
  if (value !== null && value !== void 0) {
    if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
    var dispose, inner;
    if (async) {
      if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
      dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
      if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
      dispose = value[Symbol.dispose];
      if (async) inner = dispose;
    }
    if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
    if (inner) dispose = function() { try { inner.call(this); } catch (e) { return Promise.reject(e); } };
    env.stack.push({ value: value, dispose: dispose, async: async });
  }
  else if (async) {
    env.stack.push({ async: true });
  }
  return value;
}

var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function __disposeResources(env) {
  function fail(e) {
    env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
    env.hasError = true;
  }
  var r, s = 0;
  function next() {
    while (r = env.stack.pop()) {
      try {
        if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
        if (r.dispose) {
          var result = r.dispose.call(r.value);
          if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
        }
        else s |= 1;
      }
      catch (e) {
        fail(e);
      }
    }
    if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
    if (env.hasError) throw env.error;
  }
  return next();
}

function __rewriteRelativeImportExtension(path, preserveJsx) {
  if (typeof path === "string" && /^\.\.?\//.test(path)) {
      return path.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function (m, tsx, d, ext, cm) {
          return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : (d + ext + "." + cm.toLowerCase() + "js");
      });
  }
  return path;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __extends,
  __assign,
  __rest,
  __decorate,
  __param,
  __esDecorate,
  __runInitializers,
  __propKey,
  __setFunctionName,
  __metadata,
  __awaiter,
  __generator,
  __createBinding,
  __exportStar,
  __values,
  __read,
  __spread,
  __spreadArrays,
  __spreadArray,
  __await,
  __asyncGenerator,
  __asyncDelegator,
  __asyncValues,
  __makeTemplateObject,
  __importStar,
  __importDefault,
  __classPrivateFieldGet,
  __classPrivateFieldSet,
  __classPrivateFieldIn,
  __addDisposableResource,
  __disposeResources,
  __rewriteRelativeImportExtension,
});


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!************************!*\
  !*** ./js/balances.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _fluentui_web_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @fluentui/web-components */ "./node_modules/@fluentui/web-components/dist/esm/fluent-design-system.js");
/* harmony import */ var _fluentui_web_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fluentui/web-components */ "./node_modules/@fluentui/web-components/dist/esm/progress/progress-ring/index.js");
/* harmony import */ var _fluentui_web_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @fluentui/web-components */ "./node_modules/@fluentui/web-components/dist/esm/text-field/index.js");
/* harmony import */ var _fluentui_web_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fluentui/web-components */ "./node_modules/@fluentui/web-components/dist/esm/button/index.js");
/* harmony import */ var _fluentui_web_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @fluentui/web-components */ "./node_modules/@fluentui/web-components/dist/esm/design-system-provider/index.js");



(0,_fluentui_web_components__WEBPACK_IMPORTED_MODULE_0__.provideFluentDesignSystem)().register((0,_fluentui_web_components__WEBPACK_IMPORTED_MODULE_1__.fluentProgressRing)(), (0,_fluentui_web_components__WEBPACK_IMPORTED_MODULE_2__.fluentTextField)(), (0,_fluentui_web_components__WEBPACK_IMPORTED_MODULE_3__.fluentButton)(), (0,_fluentui_web_components__WEBPACK_IMPORTED_MODULE_4__.fluentDesignSystemProvider)())

let selected
let chains
let sumElt
let list
let nativeLogo
let explorer
let errorOutput

document.addEventListener('DOMContentLoaded', () => {
    errorOutput = document.getElementById("errorOutput")
    sumElt = document.getElementById("sum")
    list = document.getElementById("tokens")
    document.getElementById("queryBtn").addEventListener('click', () => {
        getTokens(selected.wallet, chains[selected.chainId].id, document.getElementById("date").value)
    })

    const now = new Date()
    document.getElementById("date").value = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`

    init()
})

chrome.storage.local.onChanged.addListener(async changes => {
    if (changes.selected) {
        sumElt.textContent=""
        list.innerHTML = ""
        init()
    }
})


async function init() {
    selected = (await chrome.storage.local.get('selected')).selected
    chains = (await chrome.storage.local.get('chains')).chains
    explorer = chains[selected.chainId].explorer.replace("tx","address")

    nativeLogo = "https://tokens.app.pulsex.com/images/tokens/0xA1077a294dDE1B09bB078844df40758a5D0f9a27.png" 

    document.getElementById("title").textContent = "Balance on " + chains[selected.chainId].name
    document.getElementById("wallet").textContent = "For " + selected.wallet
}

async function getTokens(wallet, chain, date) {

    errorOutput.textContent=""
    sumElt.textContent=""
    list.innerHTML = "<fluent-progress-ring></fluent-progress-ring>"

    const options = {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'X-API-Key': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImE1MTNhYWFlLTE1NjYtNDkzMS05NDg3LTk3ODdkYTBkODBiYyIsIm9yZ0lkIjoiNDQ4NDAzIiwidXNlcklkIjoiNDYxMzU0IiwidHlwZUlkIjoiYTMxZGJkZjYtZjM2MS00OTZmLWI4ZWEtZGNhNWQ3MjY2NGRkIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3NDc4NTczMDcsImV4cCI6NDkwMzYxNzMwN30.xCrcAj6yG34xZm-GRwjVppiksIQwyq0D8dmM_J-Cry0"
        }
    };

    try {
        const urlDate = `https://deep-index.moralis.io/api/v2.2/dateToBlock?chain=${chain}&date=${date}`
        const blockResponse = await fetch(urlDate, options)

        if (!blockResponse.ok) {
            throw new Error(`HTTP error! Status: ${blockResponse.status}`);
        }
        const block = await blockResponse.json();

        const urlTokens = `https://deep-index.moralis.io/api/v2.2/wallets/${wallet}/tokens?chain=${chain}&to_block=${block.block}&exclude_spam=true`;
        const response = await fetch(urlTokens, options);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        //console.log(JSON.stringify(data, null, 2)); // Pretty-print the response

        list.innerHTML = ""
        let sum = 0;

        for (var token of data.result) {
            const v = parseFloat(token.usd_value)
            if (v > 1) {
                sum+=v;
                const listItem = document.createElement('fluent-list-item');
                list.appendChild(listItem)

                const maximumFractionDigits = Math.max(0, (token.usd_price.toString().split('.')[0].length) - 2)
                console.log(token.usd_price, maximumFractionDigits,(token.balance / 10 ** token.decimals))

                listItem.innerHTML = `
                    <div class="line">
                        <img src="${token.native_token && selected.chainId=="0x171"? nativeLogo : token.logo}">
                        <div class="line0">
                        <div class="line1"> <a href="${explorer}${token.token_address}">${token.name}</a> <div>${parseInt(token.usd_value).toLocaleString(navigator.language)} USD</div> </div>
                        <div class="line2"> ${(token.balance / 10 ** token.decimals).toLocaleString(navigator.language,{maximumFractionDigits})} ${token.symbol}</div>
                        </div>
                    </div>`
            }
        }
        
        sumElt.innerHTML = `Total: ${sum.toLocaleString(navigator.language,{maximumFractionDigits:0})} USD`

    } catch (error) {
        list.innerHTML = ""
        errorOutput.textContent = "Error fetching tokens: "+error.message
    }
}


})();

/******/ })()
;