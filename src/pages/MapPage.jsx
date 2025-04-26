import { useEffect } from "react";

export default function MapPage() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=6a6492f8fb8e1c114d50540c547a6b65&libraries=services,clusterer`;
    script.async = true;
    script.onload = () => {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 초기 중심
        level: 5, // 적당한 줌 레벨
      };

      const map = new window.kakao.maps.Map(mapContainer, mapOption);

      // ✅ 마커 이미지 미리 정의
      const myMarkerImage = new window.kakao.maps.MarkerImage(
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
        new window.kakao.maps.Size(40, 40)
      );

      const hospitalMarkerImage = new window.kakao.maps.MarkerImage(
        "https://cdn-icons-png.flaticon.com/512/2991/2991148.png",
        new window.kakao.maps.Size(30, 30)
      );

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const locPosition = new window.kakao.maps.LatLng(lat, lon);

          // ✅ 내 위치 마커 찍기
          new window.kakao.maps.Marker({
            map: map,
            position: locPosition,
            title: "내 위치",
            image: myMarkerImage,
          });

          // ✅ 내 위치 중심으로 지도 이동
          map.setCenter(locPosition);

          // ✅ 주변 피부과 검색 (반경 5000m)
          const ps = new window.kakao.maps.services.Places();
          const options = {
            location: locPosition,
            radius: 5000, // ✅ 반경 5km로 수정
            sort: window.kakao.maps.services.SortBy.DISTANCE,
          };

          ps.keywordSearch("피부과", (data, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
              for (let i = 0; i < data.length; i++) {
                const place = data[i];

                const marker = new window.kakao.maps.Marker({
                  map: map,
                  position: new window.kakao.maps.LatLng(place.y, place.x),
                  title: place.place_name,
                  image: hospitalMarkerImage,
                });

                const infowindow = new window.kakao.maps.InfoWindow({
                  content: `<div style="padding:5px;font-size:14px;">${place.place_name}</div>`,
                });

                window.kakao.maps.event.addListener(marker, "click", function () {
                  infowindow.open(map, marker);
                });
              }
            }
          }, options);
        });
      }
    };

    document.head.appendChild(script);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">주변 피부과 추천</h2>
      <div id="map" className="w-full h-[500px] rounded-xl shadow" />
    </div>
  );
}
