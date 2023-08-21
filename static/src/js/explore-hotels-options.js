/** @odoo-module **/

import options from 'web_editor.snippets.options';

options.registry.ExploreHotelsOptions = options.Class.extend({
    start() {
        let hotelsRow = this.$target.find('#ap-hotels-row')

        if (hotelsRow){
            this._rpc({
                route: '/hotels/',
                params:{}
            }).then(data=>{
                let html = ``
                data.forEach(ap_hotels=>{
                    html += `<div class="col-lg-3 mb-5">
                        <div class="d-flex align-items-center">
                            <div class="img-container mr-3 rounded">
//                                <img class="country-image rounded" src="data:image/png;base64,${ap_hotels.image}"/>
                            </div>
                            <div>
                                <h5 class="mb-0">${ap_hotels.name}</h5>
                                <div>${ap_hotels.name ? ap_hotels.name[1] : ''}</div>
                            </div>
                        </div>
                    </div>`
                })
                hotelsRow.html(html)
            })
        }
    },
})

export default {
    ExploreHotelsOptions: options.registry.ExploreHotelsOptions,
};