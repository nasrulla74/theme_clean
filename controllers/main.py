from odoo import http
# from odoo import models, fields, api, _
from odoo.http import request


class AppeulGetHotelsAll(http.Controller):
    @http.route('/hotels/', auth="public", type="json", methods=['POST'])
    def all_cities_appeul(self):
        hotels = http.request.env['hotel.hotel'].search_read([('active', '=', True), ('company_id', '=', request.env.company.id)],
                                                             ['id', 'name', 'description', 'image_1920', 'featured_amenity_ids'])
        for rec in hotels:
            rec["f_amenity_ids"] = http.request.env['feat.amenities'].search_read([('id', 'in', rec['featured_amenity_ids'])], ['id', 'icon', 'name'])
        return hotels

    @http.route('/get_hotel/<hotel_id>', type='http', auth='public', website=True)
    def hotel_info_appeul(self, hotel_id):
        hotel = http.request.env['hotel.hotel'].search([('id', '=', hotel_id)])
        r_types = http.request.env['product.product'].search([('hotel_id', '=', int(hotel_id))])
        rooms_datas = hotel.get_room_type_data(r_types)

        #print('hotels', hotel)

        hotel_amenities = []
        for h in hotel:
            hotel_amenities = hotel.mapped('amenities_ids')

        #print(hotel_amenities)
        values = {
            'hotel': hotel,
            'r_types': r_types,
            'rooms_datas': rooms_datas,
            'hotel_amenities': hotel_amenities or [],

        }

        return request.render('theme_clean.appeul_hotels_info_travel', values)
