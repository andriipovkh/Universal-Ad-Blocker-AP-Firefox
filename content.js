// Content script for Universal Ad Blocker Firefox Extension
(function() {
    'use strict';
    
    console.log('Universal Ad Blocker loaded...');
    
    // Function to remove Google ads and LinkedIn ads
    function removeGoogleAds() {
        let adsRemoved = 0;
        
        // Skip YouTube entirely to avoid breaking functionality
        if (window.location.hostname.includes('youtube.com')) {
            return false;
        }
        
        // Remove Google ad iframes
        const adIframes = document.querySelectorAll('iframe[id*="google_ads"], iframe[src*="googlesyndication"], iframe[src*="doubleclick"], iframe[data-google-container-id]');
        adIframes.forEach(iframe => {
            iframe.remove();
            adsRemoved++;
        });
        
        // Remove ad containers
        const adContainers = document.querySelectorAll(
            '[id*="google_ads"], ' +
            '[class*="google_ads"], ' +
            '[id*="sda-"], ' +
            '.sdaContainer, ' +
            '[id*="google_ad"], ' +
            '[class*="google_ad"], ' +
            'div[aria-label="Advertisement"]'
        );
        adContainers.forEach(container => {
            // Check if it's actually an ad container
            if (container.innerHTML.includes('google') || 
                container.innerHTML.includes('advertisement') ||
                container.querySelector('iframe[src*="google"]')) {
                container.remove();
                adsRemoved++;
            }
        });
        
        // Remove specific ad slots
        const adSlots = document.querySelectorAll('[data-google-query-id]');
        adSlots.forEach(slot => {
            slot.remove();
            adsRemoved++;
        });
        
        // Remove ins elements (AdSense)
        const adsenseElements = document.querySelectorAll('ins.adsbygoogle, ins[class*="adsbygoogle"]');
        adsenseElements.forEach(ins => {
            ins.remove();
            adsRemoved++;
        });
        
        // Remove LinkedIn sponsored ads
        const linkedinAds = document.querySelectorAll(
            '#ads-container, ' +
            '[id="ads-container"], ' +
            'div[data-creative*="sponsoredCreative"], ' +
            'div[data-account*="sponsoredAccount"], ' +
            '.da-card-creative, ' +
            'div.da, ' +
            'div[class*="da--"], ' +
            '.ad-banner-container, ' +
            'section.ad-banner-container, ' +
            'iframe[data-ad-banner], ' +
            'iframe.ad-banner'
        );
        linkedinAds.forEach(ad => {
            // Double-check it's a LinkedIn ad
            if (ad.querySelector('.al__label') || 
                ad.querySelector('[class*="da-card"]') ||
                ad.innerHTML.includes('sponsoredCreative') ||
                ad.classList.contains('ad-banner-container') ||
                ad.querySelector('iframe[data-ad-banner]') ||
                ad.querySelector('iframe.ad-banner')) {
                ad.remove();
                adsRemoved++;
            }
        });
        
        // Remove banner ads (like unit_list_banner, nts-ad, sevio ads)
        const bannerAds = document.querySelectorAll(
            '.unit_list_banner, ' +
            '.banner, ' +
            '.nts-ad, ' +
            '[class*="nts-ad"], ' +
            '.advtext, ' +
            '.sevioads, ' +
            '[class*="sevioads"], ' +
            '[id*="sevio"], ' +
            '[id*="wrapper-sevio"], ' +
            '.noindex-section, ' +
            '[data-nosnippet]'
        );
        bannerAds.forEach(banner => {
            // Check if it's an ad banner
            if (banner.classList.contains('unit_list_banner') ||
                banner.querySelector('.advtext') ||
                banner.querySelector('.nts-ad') ||
                banner.classList.contains('nts-ad') ||
                banner.classList.contains('sevioads') ||
                banner.id.includes('sevio') ||
                banner.querySelector('.sevioads') ||
                banner.querySelector('[id*="sevio"]') ||
                banner.innerHTML.includes('Реклама') ||
                banner.innerHTML.includes('adx.ws') ||
                banner.innerHTML.includes('czilladx.com')) {
                banner.remove();
                adsRemoved++;
            }
        });
        
        // Remove ad labels/badges
        const adLabels = document.querySelectorAll('span.bg-white');
        adLabels.forEach(label => {
            if (label.textContent.trim() === 'Ad') {
                const parent = label.closest('.position-relative');
                if (parent) {
                    parent.remove();
                    adsRemoved++;
                }
            }
        });
        
        // Remove Reddit ads
        const redditAds = document.querySelectorAll(
            'shreddit-comments-page-ad, ' +
            '[class*="promotedlink"], ' +
            'shreddit-ad-post, ' +
            '[slot="full-comments-page-ad-link"], ' +
            '[data-testid*="promoted"], ' +
            '[class*="promoted"]'
        );
        redditAds.forEach(ad => {
            // Check if it's a Reddit ad
            if (ad.tagName === 'SHREDDIT-COMMENTS-PAGE-AD' ||
                ad.classList.contains('promotedlink') ||
                ad.tagName === 'SHREDDIT-AD-POST' ||
                ad.querySelector('shreddit-dynamic-ad-link') ||
                ad.querySelector('[class*="promoted-name-container"]') ||
                ad.querySelector('[class*="promoted-label"]') ||
                ad.hasAttribute('post-promoted') ||
                ad.innerHTML.includes('alb.reddit.com')) {
                ad.remove();
                adsRemoved++;
            }
        });
        
        // Remove full-page overlay ads (brnd/schulist.link and similar)
        const overlayAds = document.querySelectorAll(
            'div[id*="brnd"], ' +
            'iframe[id*="ibrnd"], ' +
            'iframe[src*="schulist.link"], ' +
            'iframe[name*="nibrnd"], ' +
            'div[style*="position: fixed"][style*="z-index"], ' +
            'div[id^="b"], ' +
            'a[href*="bashirian.biz"], ' +
            'img[src*="schulist.link"]'
        );
        overlayAds.forEach(ad => {
            // Check if it's an overlay ad
            if (ad.id && ad.id.includes('brnd') ||
                ad.src && ad.src.includes('schulist.link') ||
                ad.name && ad.name.includes('nibrnd') ||
                (ad.style.position === 'fixed' && ad.querySelector('iframe[src*="schulist"]')) ||
                ad.href && ad.href.includes('bashirian.biz') ||
                (ad.tagName === 'IMG' && ad.src.includes('schulist.link'))) {
                // Remove the ad or its parent container
                const parent = ad.closest('div[id]');
                if (parent && parent.querySelector('a[href*="bashirian.biz"]')) {
                    parent.remove();
                    adsRemoved++;
                } else {
                    ad.remove();
                    adsRemoved++;
                }
            }
        });
        
        // Remove bashirian.biz ad containers
        const bashirianAds = document.querySelectorAll('div[id], a[href*="bashirian.biz"]');
        bashirianAds.forEach(element => {
            const link = element.querySelector('a[href*="bashirian.biz"]');
            const img = element.querySelector('img[src*="schulist.link"]');
            const isBashirianLink = element.tagName === 'A' && element.href.includes('bashirian.biz');
            
            if (link || img || isBashirianLink) {
                // Remove parent container if exists, otherwise remove the element itself
                const parent = element.closest('div[id]');
                if (parent && parent !== element) {
                    parent.remove();
                    adsRemoved++;
                } else {
                    element.remove();
                    adsRemoved++;
                }
            }
        });
        
        // Remove srv224.com and trackadrequest.com ads
        const srv224Ads = document.querySelectorAll(
            'div[id*="eas-"], ' +
            'a[href*="srv224.com"], ' +
            'a[href*="trackadrequest.com"], ' +
            'img[id*="eas-"], ' +
            'img[src*="srv224.com"]'
        );
        srv224Ads.forEach(ad => {
            // Check if it's a srv224/trackadrequest ad
            if (ad.id && ad.id.includes('eas-') ||
                ad.href && (ad.href.includes('srv224.com') || ad.href.includes('trackadrequest.com')) ||
                ad.src && ad.src.includes('srv224.com')) {
                // Remove the ad or its parent container
                const parent = ad.closest('div[id*="eas-"]');
                if (parent) {
                    parent.remove();
                    adsRemoved++;
                } else {
                    ad.remove();
                    adsRemoved++;
                }
            }
        });
        
        // Remove Ookla video ads (pgrecirc campaign)
        const ooklaAds = document.querySelectorAll(
            'div.VP, ' +
            'a.VPA[href*="ookla.com"], ' +
            'a.VPA[href*="pgrecirc"], ' +
            'video.VPP[src*="cdnst.net"], ' +
            'div.VPUI, ' +
            'span.VPTitle, ' +
            'div.pgVPCMD'
        );
        ooklaAds.forEach(ad => {
            // Check if it's an Ookla video ad
            if (ad.classList.contains('VP') ||
                (ad.classList.contains('VPA') && (ad.href.includes('ookla.com') || ad.href.includes('pgrecirc'))) ||
                (ad.classList.contains('VPP') && ad.src && ad.src.includes('cdnst.net')) ||
                ad.querySelector('.VPA[href*="ookla.com"]') ||
                ad.querySelector('.VPA[href*="pgrecirc"]') ||
                ad.querySelector('video.VPP[src*="cdnst.net"]') ||
                ad.querySelector('.VPUI') ||
                ad.querySelector('.VPTitle') ||
                ad.querySelector('.pgVPCMD')) {
                // Find the root container (div.VP) and remove it
                const vpContainer = ad.closest('div.VP') || ad;
                vpContainer.remove();
                adsRemoved++;
            }
        });
        
        // Remove outstream/pgrecircvideo ads (innovid, imasdk)
        const outstreamAds = document.querySelectorAll(
            'div[data-pogo="outstream"], ' +
            '#pgrecircvideo, ' +
            'div.pgOts, ' +
            'div.VPV, ' +
            'span.pgCloseBtn, ' +
            'span.pgClose, ' +
            'div.paused.adplaying, ' +
            'video[title="Advertisement"], ' +
            'iframe[src*="imasdk.googleapis.com"], ' +
            'iframe[src*="innovid.com"], ' +
            'video[src*="innovid.com"]'
        );
        outstreamAds.forEach(ad => {
            // Check if it's an outstream video ad
            if (ad.hasAttribute('data-pogo') && ad.getAttribute('data-pogo') === 'outstream' ||
                ad.id === 'pgrecircvideo' ||
                ad.classList.contains('pgOts') ||
                ad.classList.contains('VPV') ||
                ad.classList.contains('pgCloseBtn') ||
                ad.classList.contains('pgClose') ||
                (ad.classList.contains('paused') && ad.classList.contains('adplaying')) ||
                (ad.tagName === 'VIDEO' && ad.title === 'Advertisement') ||
                (ad.tagName === 'IFRAME' && ad.src && ad.src.includes('imasdk.googleapis.com')) ||
                (ad.tagName === 'IFRAME' && ad.src && ad.src.includes('innovid.com')) ||
                (ad.tagName === 'VIDEO' && ad.src && ad.src.includes('innovid.com')) ||
                ad.querySelector('div[data-pogo="outstream"]') ||
                ad.querySelector('#pgrecircvideo') ||
                ad.querySelector('.pgOts') ||
                ad.querySelector('.VPV') ||
                ad.querySelector('video[title="Advertisement"]') ||
                ad.querySelector('iframe[src*="imasdk.googleapis.com"]') ||
                ad.querySelector('iframe[src*="innovid.com"]') ||
                ad.querySelector('video[src*="innovid.com"]')) {
                // Find the root container and remove it
                const outstreamContainer = ad.closest('div[data-pogo="outstream"]') || ad;
                outstreamContainer.remove();
                adsRemoved++;
            }
        });
        
        // Remove IMA SDK and Fluid Player video ads (disqus, ad-container-poll)
        const imaFluidAds = document.querySelectorAll(
            '#ad-container-poll, ' +
            'div[data-role="ad-container"], ' +
            '#wrapper-ad, ' +
            '#ima-ad, ' +
            '#fluid_video_wrapper_video-ad, ' +
            'video#video-ad, ' +
            'video.js-fluid-player, ' +
            '.fluid_video_wrapper, ' +
            '.fluid_controls_container, ' +
            '.vast_clickthrough_layer, ' +
            '.ad_countdown, ' +
            'div.fluid_player_layout_default'
        );
        imaFluidAds.forEach(ad => {
            // Check if it's an IMA/Fluid Player ad
            if (ad.id === 'ad-container-poll' ||
                ad.getAttribute('data-role') === 'ad-container' ||
                ad.id === 'wrapper-ad' ||
                ad.id === 'ima-ad' ||
                ad.id === 'fluid_video_wrapper_video-ad' ||
                (ad.id === 'video-ad' && ad.tagName === 'VIDEO') ||
                ad.classList.contains('js-fluid-player') ||
                ad.classList.contains('fluid_video_wrapper') ||
                ad.classList.contains('fluid_controls_container') ||
                ad.classList.contains('vast_clickthrough_layer') ||
                ad.classList.contains('ad_countdown') ||
                ad.classList.contains('fluid_player_layout_default') ||
                ad.querySelector('#ima-ad') ||
                ad.querySelector('#fluid_video_wrapper_video-ad') ||
                ad.querySelector('video.js-fluid-player') ||
                ad.querySelector('.fluid_video_wrapper') ||
                ad.querySelector('.vast_clickthrough_layer') ||
                ad.querySelector('.ad_countdown') ||
                (ad.querySelector('iframe[src*="imasdk.googleapis.com"]') && ad.querySelector('video[src*="innovid.com"]'))) {
                // Find the root container and remove it
                const adRootContainer = ad.closest('#ad-container-poll') || 
                                       ad.closest('div[data-role="ad-container"]') || 
                                       ad.closest('#wrapper-ad') || 
                                       ad;
                adRootContainer.remove();
                adsRemoved++;
            }
        });
        
        // Remove Disqus Polls ads
        const disqusPollsAds = document.querySelectorAll(
            '.disqus_poll, ' +
            'div[data-disqus-poll-id], ' +
            'iframe[id*="dsq-poll"], ' +
            'iframe[name*="dsq-poll"], ' +
            'iframe[src*="polls.services.disqus.com"], ' +
            'iframe[title="Disqus Polls"]'
        );
        disqusPollsAds.forEach(ad => {
            // Check if it's a Disqus Poll ad
            if (ad.classList.contains('disqus_poll') ||
                ad.hasAttribute('data-disqus-poll-id') ||
                (ad.id && ad.id.includes('dsq-poll')) ||
                (ad.name && ad.name.includes('dsq-poll')) ||
                (ad.tagName === 'IFRAME' && ad.src && ad.src.includes('polls.services.disqus.com')) ||
                (ad.tagName === 'IFRAME' && ad.title === 'Disqus Polls') ||
                ad.querySelector('iframe[src*="polls.services.disqus.com"]') ||
                ad.querySelector('iframe[title="Disqus Polls"]') ||
                ad.querySelector('iframe[id*="dsq-poll"]') ||
                ad.innerHTML.includes('DISQUS_POLLS.reset') ||
                ad.innerHTML.includes('disqus-social-icon')) {
                // Find the root container and remove it
                const pollsContainer = ad.closest('.disqus_poll') || 
                                      ad.closest('div[data-disqus-poll-id]') || 
                                      ad;
                pollsContainer.remove();
                adsRemoved++;
            }
        });
        
        if (adsRemoved > 0) {
            console.log(`Removed ${adsRemoved} ad(s)`);
        }
        
        return adsRemoved > 0;
    }
    
    // Block ad scripts from loading
    function blockAdScripts() {
        // Block Google ad scripts
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.tagName === 'SCRIPT') {
                        const src = node.src || '';
                        if (src.includes('googlesyndication') || 
                            src.includes('googletagservices') ||
                            src.includes('doubleclick') ||
                            src.includes('adsbygoogle')) {
                            console.log('Blocked ad script:', src);
                            node.remove();
                        }
                    }
                });
            });
        });
        
        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });
    }
    
    // Wait for page to load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    function init() {
        // Start blocking ad scripts
        blockAdScripts();
        
        // Run immediately
        removeGoogleAds();
        
        // Monitor for ads appearing using MutationObserver
        const observer = new MutationObserver(function(mutations) {
            removeGoogleAds();
        });
        
        // Start observing the document body for changes
        if (document.body) {
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
        
        // Also check periodically as a backup (every 1 second)
        setInterval(removeGoogleAds, 1000);
        
        console.log('Ad blocking active on', window.location.hostname);
    }
    
    // Add CSS to hide common ad elements
    const style = document.createElement('style');
    style.textContent = `
        iframe[id*="google_ads"],
        iframe[src*="googlesyndication"],
        iframe[src*="doubleclick"],
        iframe[src*="adx.ws"],
        iframe[src*="czilladx"],
        iframe[src*="schulist.link"],
        iframe[data-ad-banner],
        iframe.ad-banner,
        iframe[id*="ibrnd"],
        iframe[name*="nibrnd"],
        div[id*="brnd"],
        div[id*="eas-"],
        a[href*="bashirian.biz"],
        a[href*="srv224.com"],
        a[href*="trackadrequest.com"],
        img[src*="schulist.link"],
        img[src*="srv224.com"],
        img[id*="eas-"],
        div:has(> a[href*="bashirian.biz"]),
        div:has(> a[href*="srv224.com"]),
        div:has(> a[href*="trackadrequest.com"]),
        .adsbygoogle,
        [id*="google_ads"],
        .sdaContainer,
        div[aria-label="Advertisement"],
        #ads-container,
        div[data-creative*="sponsoredCreative"],
        .da-card-creative,
        div.da,
        div[class*="da--"],
        .unit_list_banner,
        .nts-ad,
        [class*="nts-ad"],
        .advtext,
        .sevioads,
        [id*="sevio"],
        [id*="wrapper-sevio"],
        div[id*="sevio_iframe"],
        .noindex-section[data-nosnippet],
        .ad-banner-container,
        section.ad-banner-container,
        shreddit-comments-page-ad,
        shreddit-ad-post,
        [class*="promotedlink"],
        [slot="full-comments-page-ad-link"],
        [post-promoted],
        div.VP,
        a.VPA[href*="ookla.com"],
        a.VPA[href*="pgrecirc"],
        video.VPP[src*="cdnst.net"],
        div.VPUI,
        span.VPTitle,
        span.VProgCnt,
        span.VProgress,
        div.pgVPCMD,
        span.pgVPlayBtn,
        span.pgVMuteBtn,
        div[data-pogo="outstream"],
        #pgrecircvideo,
        div.pgOts,
        div.VPV,
        span.pgCloseBtn,
        span.pgClose,
        div.paused.adplaying,
        video[title="Advertisement"],
        iframe[src*="imasdk.googleapis.com"],
        iframe[src*="innovid.com"],
        video[src*="innovid.com"],
        #ad-container-poll,
        div[data-role="ad-container"],
        #wrapper-ad,
        #ima-ad,
        #fluid_video_wrapper_video-ad,
        video#video-ad,
        video.js-fluid-player,
        .fluid_video_wrapper,
        .fluid_controls_container,
        .fluid_player_layout_default,
        .vast_clickthrough_layer,
        .ad_countdown,
        .fluid_subtitles_container,
        .vast_video_loading,
        .fluid_context_menu,
        .fluid_html_on_pause,
        .disqus_poll,
        div[data-disqus-poll-id],
        iframe[id*="dsq-poll"],
        iframe[name*="dsq-poll"],
        iframe[src*="polls.services.disqus.com"],
        iframe[title="Disqus Polls"] {
            display: none !important;
            visibility: hidden !important;
        }
    `;
    document.head.appendChild(style);
})();
