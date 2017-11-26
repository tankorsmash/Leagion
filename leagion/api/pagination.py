from rest_framework import pagination


class DefaultPaginator(pagination.PageNumberPagination):
    page_size_query_param = 'page_size'
    page_size = None
