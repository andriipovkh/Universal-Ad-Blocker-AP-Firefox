// Background script for Universal Ad Blocker Firefox Extension

console.log('Universal Ad Blocker background script loaded');

// List of ad script domains to block
const adDomains = [
    '*://googleads.g.doubleclick.net/*',
    '*://pagead2.googlesyndication.com/*',
    '*://www.googletagservices.com/*',
    '*://adservice.google.com/*',
    '*://partner.googleadservices.com/*',
    '*://tpc.googlesyndication.com/*',
    '*://adx.ws/*',
    '*://czilladx.com/*',
    '*://schulist.link/*',
    '*://bashirian.biz/*',
    '*://srv224.com/*',
    '*://trackadrequest.com/*',
    '*://imasdk.googleapis.com/*',
    '*://innovid.com/*',
    '*://polls.services.disqus.com/*',
    '*://ookla.com/pgrecirc/*',
    '*://cdnst.net/*pgrecirc*'
];

// Block ad requests
browser.webRequest.onBeforeRequest.addListener(
    function(details) {
        console.log('Blocked ad request:', details.url);
        return { cancel: true };
    },
    { urls: adDomains },
    ["blocking"]
);

console.log('Ad blocking filters active');
