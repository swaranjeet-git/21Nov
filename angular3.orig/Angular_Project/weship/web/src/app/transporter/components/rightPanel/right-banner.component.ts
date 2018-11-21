import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'app-google-adsense',
    template: ` <div>
            <ins class="adsbygoogle"
                style="display:block"
                data-ad-client="ca-pub-5793065966726175"
                data-ad-slot="3273242328"
                data-ad-format="auto"
                enable-page-level-ads=true></ins>
             </div>
                <br>
      `,

})

export class RightBannerComponent implements AfterViewInit {

    constructor() {
    }

    ngAfterViewInit() {
        // try { 
        //     window.localStorage.removeItem('google_pub_config');
        //  }catch (e) { }
        setTimeout(() => {
            try {
                (window['adsbygoogle'] = window['adsbygoogle'] || []).push({
                    google_ad_client: 'ca-pub-5793065966726175',
                    enable_page_level_ads: true
                });
            } catch (e) {
                console.error('error');
            }
        }, 2000);
    }
}
