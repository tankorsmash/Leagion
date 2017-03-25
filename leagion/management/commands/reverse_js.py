import json
import os

from django.conf import settings
from django.contrib.admindocs.views import simplify_regex
from django.core.management.base import BaseCommand
from django.core.urlresolvers import RegexURLPattern, RegexURLResolver
from django.template import Context, Template

from leagion.utils import viewnames_exposed_js


class Command(BaseCommand):
    help = "Create a js version of reverse"

    def handle(self, *args, **options):
        from leagion_server import urls as urlconf
        template = Template(viewnames_template)
        view_functions = self.extract_views_from_urlpatterns(urlconf.urlpatterns)
        views = {  # dict(view_functions) would work as well but I find this more readable
            url_name: url
            for url_name, url in view_functions
            }
        reverse_js_path = os.path.join(
            settings.ROOT_PATH,
            'assets/js/common/reverse.js'
            )

        with open(reverse_js_path, 'wt') as reverse_js_file:
            reverse_js_file.write(template.render(Context({
                'viewnames_json': json.dumps(views, sort_keys=True, indent=4, separators=(',', ': '))
                })))

    def extract_views_from_urlpatterns(self, urlpatterns, base='', namespace=None):
        views = []
        for p in urlpatterns:
            if isinstance(p, RegexURLPattern):
                view = p.callback
                view_class = getattr(view, 'view_class', None)
                expose_js_viewname = view in viewnames_exposed_js or view_class in viewnames_exposed_js
                name = '{0}:{1}'.format(namespace, p.name) if namespace else p.name

                if expose_js_viewname and name:
                    views.append((name, simplify_regex(base + p.regex.pattern)))
            elif isinstance(p, RegexURLResolver):
                patterns = p.url_patterns
                if namespace and p.namespace:
                    _namespace = '{0}:{1}'.format(namespace, p.namespace)
                else:
                    _namespace = (p.namespace or namespace)
                views.extend(self.extract_views_from_urlpatterns(patterns, base + p.regex.pattern, namespace=_namespace))
            else:
                raise TypeError("%s does not appear to be a urlpattern object" % p)
        return views


viewnames_template = '''
//Generated File
//Do not modify by hand, it will get overwritten
//see leagion reverse_js for what you want
var viewnames = {{ viewnames_json|safe }};

function reverse(urlname, kwargs) {
    var url = viewnames[urlname];
    kwargs = kwargs || {};

    if (url === undefined) {
        throw 'reverse failed. Incorrect urlname: ' + urlname;
    }

    for(var kwarg in kwargs) {
        var value = kwargs[kwarg];
        url = url.replace('<' + kwarg + '>', value);
    }
    if (url.includes('<')) {
        throw 'reverse failed. Missing kwargs. urlname: ' + urlname + '. kwargs: ' + JSON.stringify(kwargs) + '. url: ' + url;
    }
    return url;
}
window.reverse = reverse;
'''

