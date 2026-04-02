// Background script for Universal Ad Blocker Firefox Extension (MV3)
// Network-level ad blocking is handled declaratively via rules/ad_block_rules.json
// Firefox MV3 uses browser.* namespace and background scripts (not service workers)

console.log('Universal Ad Blocker background script loaded (Firefox MV3)');
console.log('Ad blocking rules active via declarativeNetRequest');
