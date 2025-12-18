# backend/api/urls.py
from django.urls import include, path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (TokenObtainPairView,
                                            TokenRefreshView)

# 建立 Router（之後會用到）
router = DefaultRouter()

# 目前先不註冊任何 ViewSet，之後再加
# router.register(r'submissions', SubmissionViewSet, basename='submission')

urlpatterns = [
    # JWT 認證端點
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # Router 自動生成的 URL
    path('', include(router.urls)),
]
