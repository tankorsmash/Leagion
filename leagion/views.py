import re
import json
import datetime
import pprint

from django.shortcuts import render, render_to_response, get_object_or_404

from django.template.response import TemplateResponse
from django.utils.html import mark_safe
from django.views.generic import TemplateView


from django.http import HttpResponse, JsonResponse

from leagion.models import User, Team, League

# views
class Index(TemplateView):
    template_name = "index.html"

    def get_context_data(self):
        return {}
