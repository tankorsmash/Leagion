from django.views.generic import TemplateView

class Main(TemplateView):
    template_name = "react/main.html"

class PatternLibrary(TemplateView):
    template_name = "react/component_library.html"
