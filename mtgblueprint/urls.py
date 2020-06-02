from django.conf.urls import url, include
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets
from mtgblueprint.views import CardsViewSet, CardsListView, CardDetailView, DeckListView, DeckDetailView
import mtgblueprint.views as views
from django.views.decorators.csrf import csrf_exempt
# Serializers define the API representation.


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'is_staff']

# ViewSets define the view behavior.


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'users', UserViewSet)

#router.register(r'cards', CardsViewSet)


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    url(r'^deck/create', csrf_exempt(views.create)),
    url(r'^deck/save_changes', csrf_exempt(views.save_changes)),
    url(r'^cards/(?P<name>.+)/$', CardsListView.as_view()),
    url(r'^card/(?P<pk>.+)/$', CardDetailView.as_view()),
    url(r'^deck/(?P<pk>.+)/$', DeckDetailView.as_view()),
    url(r'^deck-list/$', DeckListView.as_view()),
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]
