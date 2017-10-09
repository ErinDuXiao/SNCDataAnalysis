"""
Copyright (C) octo-pi All Rights Reserved.

"""
import logging

from app.views.page_controller import PageController


class SubPage( PageController ):

    def get_markup(self):

        tValues = {
            'sub_panel_message': "Hello this is sub.html"
        }

        markup = self.render_html( '../templates/partials/sub.html', tValues )
        return markup
