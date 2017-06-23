import os
import json

from django.conf import settings
from django.contrib.admindocs.views import simplify_regex
from django.core.management.base import BaseCommand
from django.core.urlresolvers import RegexURLPattern, RegexURLResolver

from django.template import Context, Template

from leagion.utils import viewnames_exposed_js


class Command(BaseCommand):
    help = "Create a js version of reverse"

    def handle(self, *args, **kwargs):
        from leagion_server import urls as urlconf
        print("starting to generate reverse for django views")
        view_functions = self.extract_views_from_urlpatterns(urlconf.urlpatterns)
        views = {
            url_name: url for url_name, url in view_functions
        }

        reverse_js_path = os.path.join(
            settings.ROOT_PATH,
            'assets/js/common/reverse.js'
        )

        with open(reverse_js_path, 'wt') as reverse_js_file:
            template = Template(viewnames_template)
            reverse_js_file.write(template.render(Context({
                'viewnames_json': json.dumps(views, sort_keys=True, indent=4, separators=(',', ': '))
            })))

        print("found {} views".format(len(views)))

    def extract_views_from_urlpatterns(self, urlpatterns, base='', namespace=None):
        views = []
        for pattern in urlpatterns:
            if isinstance(pattern, RegexURLPattern):
                view = pattern.callback
                view_class = getattr(view, 'view_class', None)
                expose_js_viewname = view in viewnames_exposed_js or view_class in viewnames_exposed_js
                name = '{0}:{1}'.format(namespace, pattern.name) if namespace else pattern.name

                if expose_js_viewname and name:
                    views.append((name, simplify_regex(base + pattern.regex.pattern)))

            elif isinstance(pattern, RegexURLResolver):
                patterns = pattern.url_patterns
                if namespace and pattern.namespace:
                    _namespace = '{0}:{1}'.format(namespace, pattern.namespace)
                else:
                    _namespace = (pattern.namespace or namespace)
                views.extend(self.extract_views_from_urlpatterns(patterns, base + pattern.regex.pattern, namespace=_namespace))
            else:
                raise TypeError("%s does not appear to be a urlpattern object" % pattern)

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

module.exports = reverse;
'''

