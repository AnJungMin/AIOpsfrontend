import { useEffect } from "react";

export default function MapPage() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=6a6492f8fb8e1c114d50540c547a6b65&libraries=services`;
    script.async = true;
    script.onload = () => {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new window.kakao.maps.LatLng(37.5665, 126.9780),
        level: 3,
      };

      const map = new window.kakao.maps.Map(mapContainer, mapOption);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const locPosition = new window.kakao.maps.LatLng(lat, lon);

          // 내 위치 마커 (기본)
          new window.kakao.maps.Marker({
            map: map,
            position: locPosition,
            title: "내 위치",
          });

          map.setCenter(locPosition);

          // 주변 피부과 검색
          const ps = new window.kakao.maps.services.Places();
          const options = {
            location: locPosition,
            radius: 5000, // 5km 반경
            sort: window.kakao.maps.services.SortBy.DISTANCE,
          };

          ps.keywordSearch("피부과", (data, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
              for (let i = 0; i < data.length; i++) {
                const place = data[i];

                // 병원 마커 (기본 마커 + 붉은색 십자가 대신 info window로)
                const marker = new window.kakao.maps.Marker({
                  map: map,
                  position: new window.kakao.maps.LatLng(place.y, place.x),
                });

                const infowindow = new window.kakao.maps.InfoWindow({
                  content: `
                    <div style="padding:5px;font-size:14px;">
                      🏥 ${place.place_name}
                    </div>
                  `,
                });

                // 클릭하면 InfoWindow 열기
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
