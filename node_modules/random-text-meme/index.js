const dict = require('./emoji.json');
let cache = false;
const NOT_FOUND_EMOJI = `(╯°□°）╯︵ ᔭ0ᔭ`;

/**
 * Loads emoji from dictionary by provided key (theme).
 * If the key wasn't  provided, than go through all dictionary and combines all arrays together.
 * For faster performance, resulting array is stored into the cache.
 * @param {string?} theme - optional key from the dictionary.
 * @returns {string[]} list of memes.
 */
const loadEmoji = (theme) => {
    if (theme) {
        return dict[theme] || [];
    } else {
        if (!cache)
            cache = Object.keys(dict).reduce((memo, acc) => {
                return [...memo, ...dict[acc]];
            }, []);
        return cache;
    }
};

/**
 * Get single random emoji, by given theme or without one.
 * @param {string?} theme - optional key from the dictionary.
 * @returns {string} random emoji from subset of emoji.
 */
const loadOneEmoji = (theme = '') => {
    const emoji = loadEmoji(theme);
    const i = Math.floor(Math.random() * (emoji.length - 1)) + 1;
    return emoji[i] || NOT_FOUND_EMOJI;
};

/**
 * Get list of keys (themes) from dictionary.
 * @returns {string[]} list of keys.
 */
const loadDictKeys = () => {
    return Object.keys(dict);
};

module.exports.getEmoji = loadOneEmoji;
module.exports.getAllEmoji = loadEmoji;
module.exports.getThemes = loadDictKeys;
