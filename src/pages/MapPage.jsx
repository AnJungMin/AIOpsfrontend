import { useEffect } from "react";

export default function MapPage() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=6a6492f8fb8e1c114d50540c547a6b65&libraries=services`;
    script.async = true;
    script.onload = () => {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 초기 중심
        level: 5, // 적당히 넓게 보기
      };

      const map = new window.kakao.maps.Map(mapContainer, mapOption);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const locPosition = new window.kakao.maps.LatLng(lat, lon);

          // ✅ 내 위치 기본 마커 (커스텀 X)
          new window.kakao.maps.Marker({
            map: map,
            position: locPosition,
            title: "내 위치",
          });

          // ✅ 내 위치 중심으로 지도 이동
          map.setCenter(locPosition);

          // ✅ 병원 검색
          const ps = new window.kakao.maps.services.Places();
          const options = {
            location: locPosition,
            radius: 5000, // 🔥 반경 5km
            sort: window.kakao.maps.services.SortBy.DISTANCE,
          };

          ps.keywordSearch("피부과", (data, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
              for (let i = 0; i < data.length; i++) {
                const place = data[i];

                // ✅ 병원 마커 (붉은 십자가 아이콘 사용)
                const marker = new window.kakao.maps.Marker({
                  map: map,
                  position: new window.kakao.maps.LatLng(place.y, place.x),
                  title: place.place_name,
                  image: new window.kakao.maps.MarkerImage(
                    "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png", // 붉은 십자가
                    new window.kakao.maps.Size(32, 32)
                  ),
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
