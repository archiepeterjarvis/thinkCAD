from django.urls import path

from chat.apis import GenerateModelApi

urlpatterns = [
    path("generate/", GenerateModelApi.as_view(), name="generate"),
]
